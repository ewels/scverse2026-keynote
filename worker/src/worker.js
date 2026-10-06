// Live backend for the keynote game. During the talk this Worker serves the
// pages in ../docs and runs the WebSocket that keeps the stage, the
// moderator's phone and every audience phone in sync. One Durable Object
// holds the rankings and questions.
import { DurableObject } from 'cloudflare:workers';

const MAX_QUESTION = 140;        // characters
const MAX_NAME = 24;
const ASK_COOLDOWN_MS = 20_000;  // between questions from one phone
const MAX_OPEN_PER_PHONE = 3;    // unanswered questions per phone
const MAX_STORED = 300;          // oldest finished questions are dropped past this
const MAX_TOPICS = 16;
const MAX_LISTED = 60;           // open questions sent to each phone

const clean = (s, max) => String(s ?? '').replace(/\s+/g, ' ').trim().slice(0, max);
const cleanKey = s => clean(s, 24).replace(/[^\w-]/g, '');
const fresh = (config = null) => ({ config, devices: {}, visited: [], questions: [], ended: false, nextId: 1, nextOrder: 1 });
const isOpen = q => q.status === 'new' || q.status === 'promoted';

export default {
  async fetch(request, env) {
    const url = new URL(request.url);
    if (url.pathname === '/api/ws') return env.ROOM.get(env.ROOM.idFromName('keynote')).fetch(request);
    return env.ASSETS.fetch(request);
  },
};

export class Room extends DurableObject {
  constructor(ctx, env) {
    super(ctx, env);
    this.env = env;
    this.timer = null;
    this.buckets = new WeakMap();
    ctx.setWebSocketAutoResponse(new WebSocketRequestResponsePair('ping', 'pong'));
    ctx.blockConcurrencyWhile(async () => {
      this.s = (await ctx.storage.get('s')) || fresh();
      if (!Array.isArray(this.s.questions)) this.s = fresh(this.s.config);
      for (const q of this.s.questions) q.up ||= [];
    });
  }

  keyOk(key) { return Boolean(this.env.PRESENTER_KEY) && key === this.env.PRESENTER_KEY; }

  async fetch(request) {
    const url = new URL(request.url);
    if (request.headers.get('Upgrade') !== 'websocket') return new Response('Expected a WebSocket', { status: 426 });
    const asked = url.searchParams.get('role');
    const role = asked === 'presenter' || asked === 'mod' ? asked : 'audience';
    if (role !== 'audience' && !this.keyOk(url.searchParams.get('key'))) return new Response('Wrong presenter key', { status: 403 });
    const device = cleanKey(url.searchParams.get('device')) || crypto.randomUUID();
    const { 0: client, 1: server } = new WebSocketPair();
    this.ctx.acceptWebSocket(server);
    server.serializeAttachment({ role, device });
    server.send(this.messageFor({ role, device }, this.shared()));
    return new Response(null, { status: 101, webSocket: client });
  }

  // Token bucket per phone: bursts of 8 messages, then 2 per second.
  allow(ws) {
    const now = Date.now();
    let b = this.buckets.get(ws);
    if (!b) { b = { tokens: 8, at: now }; this.buckets.set(ws, b); }
    b.tokens = Math.min(8, b.tokens + (now - b.at) / 500);
    b.at = now;
    if (b.tokens < 1) return false;
    b.tokens -= 1;
    return true;
  }

  async webSocketMessage(ws, raw) {
    if (typeof raw !== 'string' || raw.length > 40_000) return;
    const who = ws.deserializeAttachment() || {};
    if (who.role === 'audience' && (raw.length > 800 || !this.allow(ws))) return;
    let m;
    try { m = JSON.parse(raw); } catch { return; }
    if (who.role === 'presenter') await this.fromPresenter(m);
    else if (who.role === 'mod') await this.fromMod(m);
    else await this.fromAudience(ws, who.device, m);
  }

  async webSocketClose(ws, code) { try { ws.close(code, 'closing'); } catch {} }
  async webSocketError(ws) { try { ws.close(1011, 'error'); } catch {} }

  // The game on stage.
  async fromPresenter(m) {
    const s = this.s;
    if (m.t === 'reset') {
      this.s = fresh(s.config);
    } else if (m.t === 'config' && Array.isArray(m.topics)) {
      s.config = {
        maxQuestion: MAX_QUESTION,
        topics: m.topics.slice(0, MAX_TOPICS).map(t => ({
          key: cleanKey(t.key),
          title: clean(t.title, 60),
          short: clean(t.short, 16),
          colour: /^#[0-9a-f]{6}$/i.test(t.colour) ? t.colour : '#ffd166',
          blurb: clean(t.blurb, 300),
          icon: Array.isArray(t.icon) ? t.icon.slice(0, 16).map(r => clean(r, 16)) : [],
        })).filter(t => t.key),
      };
    } else if (m.t === 'visited') {
      const key = cleanKey(m.topic);
      if (!key || s.visited.includes(key)) return;
      s.visited.push(key);
    } else if (m.t === 'asked') {
      const q = s.questions.find(x => x.id === m.id);
      if (!q) return;
      q.status = 'answered';
    } else if (m.t === 'ended') {
      s.ended = Boolean(m.on);
    } else return;
    await this.save();
    this.broadcast();
  }

  // The speaker's moderation phone.
  async fromMod(m) {
    if (m.t === 'reset') return this.fromPresenter(m);
    const q = this.s.questions.find(x => x.id === m.id);
    if (!q) return;
    if (m.t === 'promote') { q.status = 'promoted'; q.order = this.s.nextOrder++; }
    else if (m.t === 'unpromote' || m.t === 'restore') { q.status = 'new'; delete q.order; }
    else if (m.t === 'answered') q.status = 'answered';
    else if (m.t === 'dismiss') q.status = 'dismissed';
    else return;
    q.changed = Date.now();
    await this.save();
    this.broadcast();
  }

  async fromAudience(ws, device, m) {
    const s = this.s;
    const d = (s.devices[device] ||= { rank: null, lastAsk: 0 });
    let notice = '';
    if (m.t === 'rank') {
      if (!Array.isArray(m.order) || !s.config) return;
      const known = new Set(s.config.topics.map(t => t.key));
      const order = [...new Set(m.order.slice(0, MAX_TOPICS).map(cleanKey))].filter(k => known.has(k));
      if (!order.length) return;
      d.rank = order;
    } else if (m.t === 'upvote') {
      const q = s.questions.find(x => x.id === m.id);
      if (!q || !isOpen(q) || q.device === device) return;
      q.up = q.up.filter(x => x !== device);
      if (m.on) q.up.push(device);
    } else if (m.t === 'ask') {
      const name = clean(m.name, MAX_NAME), text = clean(m.text, MAX_QUESTION);
      const wait = ASK_COOLDOWN_MS - (Date.now() - d.lastAsk);
      const open = s.questions.filter(q => q.device === device && isOpen(q)).length;
      if (!name || !text) notice = 'Add your name and a question.';
      else if (open >= MAX_OPEN_PER_PHONE) notice = `You have ${MAX_OPEN_PER_PHONE} questions waiting. Give Phil a chance to get to them.`;
      else if (wait > 0) notice = `Give it ${Math.ceil(wait / 1000)} seconds before asking again.`;
      else {
        s.questions.push({ id: s.nextId++, name, text, device, status: 'new', ts: Date.now(), up: [] });
        d.lastAsk = Date.now();
        while (s.questions.length > MAX_STORED) {
          const i = s.questions.findIndex(q => !isOpen(q));
          s.questions.splice(i < 0 ? 0 : i, 1);
        }
        notice = 'Sent. Phil picks which questions go up on screen.';
      }
    } else return;
    await this.save();
    ws.send(this.messageFor({ role: 'audience', device }, this.shared(), notice));
    this.broadcast();
  }

  // Borda count over the rooms not yet visited: with n rooms left,
  // someone's first choice scores n points and their last scores 1.
  shared() {
    const s = this.s;
    const counts = {};
    let voters = 0;
    for (const d of Object.values(s.devices)) {
      if (!d.rank) continue;
      const open = d.rank.filter(k => !s.visited.includes(k));
      if (!open.length) continue;
      voters++;
      open.forEach((k, i) => { counts[k] = (counts[k] || 0) + (open.length - i); });
    }
    const onScreen = s.questions.filter(q => q.status === 'promoted').length;
    return { t: 'state', config: s.config, counts, voters, visited: s.visited, onScreen, ended: s.ended };
  }

  messageFor(who, base, notice = '') {
    const s = this.s;
    if (who.role === 'presenter') {
      const up = s.questions.filter(q => q.status === 'promoted').sort((a, b) => a.order - b.order);
      return JSON.stringify({ ...base, questions: up.map(({ id, name, text }) => ({ id, name, text })) });
    }
    if (who.role === 'mod') {
      return JSON.stringify({ ...base, all: s.questions.map(({ id, name, text, status, ts, order, changed, up }) => ({ id, name, text, status, ts, order, changed, votes: up.length })) });
    }
    // Everyone sees open questions, most votes first. Dismissed ones vanish for
    // everyone except the person who asked, who still sees theirs as sent.
    const me = who.device;
    const view = q => ({ id: q.id, name: q.name, text: q.text, status: q.status === 'dismissed' ? 'new' : q.status, votes: q.up.length, voted: q.up.includes(me), own: q.device === me });
    const qs = s.questions.filter(q => isOpen(q) || (q.status === 'dismissed' && q.device === me)).map(view)
      .sort((a, b) => b.votes - a.votes || a.id - b.id).slice(0, MAX_LISTED);
    const answered = s.questions.filter(q => q.status === 'answered').slice(-20).reverse().map(view);
    const d = s.devices[me];
    return JSON.stringify({ ...base, qs, answered, mine: { rank: d ? d.rank : null, notice } });
  }

  // Coalesce bursts into one update every 250 ms.
  broadcast() {
    if (this.timer) return;
    this.timer = setTimeout(() => {
      this.timer = null;
      const base = this.shared();
      for (const ws of this.ctx.getWebSockets()) {
        try { ws.send(this.messageFor(ws.deserializeAttachment() || {}, base)); } catch {}
      }
    }, 250);
  }

  async save() { await this.ctx.storage.put('s', this.s); }
}
