// Cloakroom: building tools for agents. One counter, two queues: humans on the left, robots on the right.
(window.KEYNOTE_PLACES = window.KEYNOTE_PLACES || {}).cloakroom = g => {
  const { R, T, disc, line, map2d, mix, person, look, hash, time, ctx } = g;
  const W = 600, EXIT = 584, DISP = 50, HH = 126, ADA = 290, BELL = 206, DESK = BELL + 16, STAND = 368, LANE0 = 478, LANE1 = 570;
  const ORDER = ['two', 'llms', 'env', 'skills', 'context', 'richclick', 'tokens'];
  const clamp = (v, a, b) => Math.max(a, Math.min(b, v)), k01 = v => clamp(v, 0, 1);
  const COAT = ['#8b2f2f', '#2b3445', '#3f6b4c', '#d9a441', '#6c8cff', '#4a3a2a', '#b8b8b8', '#7a4a8c', '#c8643c']
    .map(c => ({ c, d: mix(c, '#000000', 0.28), l: mix(c, '#ffffff', 0.22) }));
  const V = (s, x, y, size, col, align = 'left') => { ctx.font = `${size}px VT323, VT323Local, monospace`; ctx.textAlign = align; ctx.textBaseline = 'top'; ctx.fillStyle = col; ctx.fillText(s, x, y); };
  const vw = (s, size) => { ctx.font = `${size}px VT323, VT323Local, monospace`; return ctx.measureText(s).width; };
  const out = (s, x, y, size, col, edge, align = 'center') => { for (const [a, b] of [[-1, 0], [1, 0], [0, -1], [0, 1], [-1, -1], [1, 1], [1, -1], [-1, 1]]) T(s, x + a, y + b, size, edge, align); T(s, x, y, size, col, align); };
  const tick = (x, y, c) => { line(x, y + 2, x + 2, y + 4, c); line(x + 2, y + 4, x + 6, y - 2, c); line(x + 1, y + 2, x + 2, y + 3, c); line(x + 2, y + 3, x + 6, y - 3, c); };

  const LOOKS = {
    att: { skin: '#efc6a3', hair: '#dcdcdc', hairStyle: 'swept', top: '#6b1f2a', topStyle: 'sweat', pants: '#2b2b36' },
    q1: { skin: '#f1c7a5', hair: '#d9b36a', hairStyle: 'long', top: '#c8322c', topStyle: 'sweat', pants: '#2f3a55' },
    q2: { skin: '#8d5a3b', hair: '#1f1f1f', hairStyle: 'short', top: '#3b6fb6', topStyle: 'hoodie', pants: '#2b2f36' },
    q3: { skin: '#e8b894', hair: '#6b3f22', hairStyle: 'messy', top: '#e8c547', topStyle: 'tee', pants: '#3b4a6b' },
  };
  const HUMANS = [LOOKS.q1, LOOKS.q2, LOOKS.q3];
  const BOTS = [{ o: '#9fb0c4', d: '#6d7f96' }, { o: '#d9a441', d: '#a87a2a' }, { o: '#7fc8a9', d: '#4f9a7c' }];

  const BOT = ['....a....', '....d....', '.ooooooo.', '.ossssso.', '.oseseso.', '.ossssso.', '.ooooooo.', '...ddd...', '.ooooooo.', 'oo.olo.oo', 'o..ooo..o', '...ooo...', '..dd.dd..', '.rr...rr.'];
  const bot = (x, feet, t, c, o = {}) => {
    const s = o.s || 1, bob = o.moving ? (Math.floor(t * 10) % 2) : 0, agent = o.agent;
    const pal = { o: c.o, d: c.d, s: '#1b2332', e: o.blink ? '#1b2332' : agent ? '#4be06f' : '#ff4d4d', a: Math.sin(t * 4 + x) > 0 ? (agent ? '#4be06f' : '#ffd166') : '#5a6270', l: Math.sin(t * 3 + x * 0.3) > 0 ? '#6c8cff' : '#2b3550', r: '#2b2f36' };
    let rows = BOT;
    if (o.armsUp) rows = ['o...a...o', 'o...d...o', 'ooooooooo', '.ossssso.', BOT[4], '.ossssso.', '.ooooooo.', '...ddd...', '.ooooooo.', '...olo...', '...ooo...', '...ooo...', BOT[12], BOT[13]];
    map2d(rows, Math.round(x) - 4 * s, Math.round(feet) - 14 * s - bob * s, pal, s);
  };

  const coat = (x, y, k, len, tag) => {
    const c = COAT[k % COAT.length];
    R(x, y, 1, 2, '#c9a24a'); R(x - 4, y + 2, 9, 1, '#9aa0a6');
    R(x - 4, y + 3, 9, len, c.c); R(x - 5, y + 5, 1, len - 6, c.d); R(x + 5, y + 5, 1, len - 6, c.d);
    R(x, y + 6, 1, len - 3, c.d); R(x - 2, y + 3, 2, 4, c.l); R(x + 1, y + 3, 2, 4, c.l); R(x - 4, y + len + 2, 9, 1, c.d);
    if (tag) { R(x + 2, y + 9, 3, 4, '#f7f3ea'); R(x + 3, y + 10, 1, 2, '#c8322c'); }
  };
  const hoodie = (x, y, s) => {
    const H = g.hero(), pal = { h: H.top, d: mix(H.top, '#ffffff', 0.12), l: H.logoColour || '#eeeeee' };
    const rows = ['...hhhh...', '..hh..hh..', '.hhhddhhh.', 'hhhhhhhhhh', 'hhhhllhhhh', 'hhhhllhhhh', 'hh.hhhh.hh', 'hh.hhhh.hh', 'hh.hhhh.hh', 'hd.dddd.dh'], x0 = Math.round(x) - 5 * s, y0 = Math.round(y);
    ctx.fillStyle = 'rgba(255,236,190,.22)'; for (let r = 18; r > 6; r -= 4) { ctx.beginPath(); ctx.arc(x, y0 + 5 * s, r, 0, 6.283); ctx.fill(); }
    const edge = mix(H.top, '#ffffff', 0.55);
    for (const [ox, oy] of [[-1, 0], [1, 0], [0, -1], [0, 1]]) map2d(rows, x0 + ox, y0 + oy, { h: edge, d: edge, l: edge }, s);
    map2d(rows, x0, y0, pal, s);
    if (Math.sin(g.time() * 5) > 0.3) { R(x0 - 3, y0 + 2, 1, 3, '#ffffff'); R(x0 - 4, y0 + 3, 3, 1, '#ffffff'); }
  };
  const callout = (cx, y, w, h, bg, edge, tailX, tailY, a) => {
    ctx.globalAlpha = a; const x = Math.round(cx - w / 2);
    R(x + 2, y + 2, w, h, 'rgba(0,0,0,.35)'); R(x - 1, y - 1, w + 2, h + 2, edge); R(x, y, w, h, bg);
    if (tailY != null) for (let i = 0; i < 4; i++) R(Math.round(tailX) - 3 + i, y + h + i, 7 - 2 * i, 1, edge);
    return x;
  };

  const room = (t, st, k) => {
    R(0, 0, W, 146, '#4a3226'); for (let x = 0; x < W; x += 12) R(x, 12, 1, 134, '#3f2a20');
    R(0, 0, W, 10, '#2e1f17'); R(0, 10, W, 2, '#6b4a2f'); R(0, 96, W, 2, '#6b4a2f'); R(0, 98, W, 48, '#3a271d');
    for (let x = 6; x < W; x += 24) { R(x, 104, 18, 36, '#33221a'); R(x, 104, 18, 1, '#4a3226'); }
    for (const lx of [160, 300, 470]) { R(lx, 10, 1, 8, '#1b1b1b'); R(lx - 5, 18, 11, 4, '#c9a24a'); R(lx - 3, 22, 7, 1, '#fff2c0');
      ctx.fillStyle = 'rgba(255,230,170,.07)'; for (let y = 23; y < 96; y += 2) { const w = 4 + (y - 23) * 0.45; ctx.fillRect(lx - w, y, w * 2, 2); } }
    R(0, 30, 30, 116, '#e7d8bc'); R(0, 30, 30, 2, '#c9b48a'); for (let y = 40; y < 146; y += 10) R(0, y, 30, 1, '#d8c7a6');
    R(28, 26, 6, 120, '#6b4a2f'); R(0, 24, 34, 4, '#6b4a2f');
  };

  const humanAlcove = (t, st) => {
    R(88, 26, 162, 95, '#24170f'); R(88, 26, 162, 3, '#6b4a2f'); R(88, 26, 3, 95, '#6b4a2f'); R(247, 26, 3, 95, '#6b4a2f');
    R(92, 39, 154, 2, '#c9a24a'); R(92, 39, 154, 1, '#ffe48a');
    for (let i = 0; i < 19; i++) coat(96 + i * 8, 40, i * 4 + 1, 26 + Math.floor(hash(i + 11) * 12), hash(i + 3) > 0.35);
    R(96, 6, 146, 16, '#2e1f17'); R(98, 8, 142, 12, '#3a271d'); R(96, 6, 146, 1, '#c9a24a'); R(96, 21, 146, 1, '#c9a24a');
    T('CLOAKROOM', 169, 9, 8, '#ffd166', 'center');
    R(HH - 13, 84, 1, 4, '#9aa0a6'); R(HH + 13, 84, 1, 4, '#9aa0a6');
    R(HH - 18, 88, 37, 11, '#c9a24a'); R(HH - 17, 89, 35, 9, '#f2e3bd'); T('HUMANS', HH, 90, 6, '#6b1f2a', 'center');
  };

  const robotAlcove = (t, st, k, ev) => {
    const agent = k >= 2, flipK = k === 2 && !ev.walking ? k01(ev.stepT / 0.6) : agent ? 1 : 0;
    R(254, 26, 92, 95, '#16202e'); R(254, 26, 92, 3, '#3b4b63'); R(254, 26, 3, 95, '#3b4b63'); R(343, 26, 3, 95, '#3b4b63');
    for (let y = 34; y < 118; y += 8) R(257, y, 86, 1, '#1d2a3c');
    const led = agent ? '#4be06f' : '#f5a623';
    for (let x = 260; x < 342; x += 4) R(x, 108, 2, 1, Math.sin(t * 6 - x * 0.3) > 0 ? led : '#2b3550');
    R(256, 29, 88, 2, '#9aa0a6'); R(256, 29, 88, 1, '#dfe7f1');
    const sp = agent ? 34 : 12, off = (t * sp) % 12;
    ctx.save(); ctx.beginPath(); ctx.rect(258, 26, 82, 80); ctx.clip();
    for (let i = 0; i < 8; i++) coat(252 + ((i * 12 + off) % 96), 30, i * 2 + 3, 28 + (i % 3) * 3, true);
    ctx.restore();
    for (const px of [258, 342]) { disc(px, 30, 4, '#3b3f47'); disc(px, 30, 2, '#9aa0a6'); const a = t * sp / 4; R(Math.round(px + Math.cos(a) * 3), Math.round(30 + Math.sin(a) * 3), 1, 1, '#ffd166'); }
    const sh = Math.abs(Math.cos(flipK * Math.PI)), h = Math.max(1, Math.round(14 * sh)), y0 = 7 + Math.round((14 - h) / 2), on = flipK > 0.5;
    R(258, y0, 70, h, on ? '#14532d' : '#2a2014'); R(258, y0, 70, 1, on ? '#4be06f' : '#f5a623'); R(258, y0 + h - 1, 70, 1, on ? '#4be06f' : '#f5a623');
    if (h > 10) T(on ? 'AGENT MODE' : 'HUMAN MODE', 293, y0 + 3, 7, on ? (Math.sin(t * 3) > -0.6 ? '#bfffd4' : '#4be06f') : '#f5a623', 'center');
    R(ADA - 13, 84, 1, 4, '#9aa0a6'); R(ADA + 13, 84, 1, 4, '#9aa0a6');
    R(ADA - 18, 88, 37, 11, '#3b4b63'); R(ADA - 17, 89, 35, 9, '#0e1424'); T('ROBOTS', ADA, 90, 6, agent ? '#4be06f' : '#6c8cff', 'center');
  };

  const bellArt = (x, y, ring) => { R(x - 5, y, 10, 2, '#6f6a62'); R(x - 4 + ring, y - 3, 8, 3, '#e2b52c'); R(x - 3 + ring, y - 4, 6, 1, '#e2b52c'); R(x - 1 + ring, y - 6, 2, 2, '#c99a1d'); R(x - 3 + ring, y - 3, 2, 1, '#ffe48a'); };
  const puffer = (x, y) => { R(x - 6, y, 13, 7, '#ff8fb1'); R(x - 6, y + 2, 13, 1, '#d9658a'); R(x - 6, y + 5, 13, 1, '#d9658a'); R(x - 7, y - 1, 15, 2, '#fff6ea'); };
  const board = () => {
    R(158, 86, 44, 30, '#f7f3ea'); R(158, 86, 44, 2, '#c8322c'); R(158, 114, 44, 2, '#c8322c');
    T('PLEASE', 180, 90, 6, '#1b2332', 'center'); T('TAKE A', 180, 98, 6, '#1b2332', 'center'); T('TICKET', 180, 106, 6, '#c8322c', 'center');
    R(179, 116, 2, 5, '#6f6a62');
  };
  const counter = (t, st) => {
    R(84, 121, 266, 4, '#c99a62'); R(84, 121, 266, 1, '#e8c08a'); R(84, 125, 266, 1, '#8a5a34'); R(86, 126, 262, 28, '#7d5230');
    for (let x = 86; x < 348; x += 22) { R(x + 3, 129, 16, 21, '#6f4728'); R(x + 3, 129, 16, 1, '#8a5a34'); }
    R(252, 126, 2, 28, '#5a3a20');
    if (!st.snatched && !st.kept) bellArt(BELL, 119, t - st.bellT < 0.5 ? Math.round(Math.sin(t * 60)) : 0);
    if (t - st.bellT < 0.9) { const a = t - st.bellT; ctx.globalAlpha = k01(1.6 - a * 1.8); T('DING', BELL, 104 - Math.round(a * 10), 5, '#ffd166', 'center'); ctx.globalAlpha = 1; }
    const n = 41 + Math.floor(t / 6) % 58, fl = (t % 6) < 0.4;
    R(158, 128, 40, 21, '#1b1b1b'); R(159, 129, 38, 19, '#2a1414'); T('SERVING', 178, 131, 5, '#ff9a7a', 'center');
    T(String(n).padStart(3, '0'), 178, 138, 9, fl ? '#ffd166' : '#ff4d4d', 'center');
    R(150, 117, 12, 4, '#f7f3ea'); R(150, 117, 12, 1, '#e85d75'); R(170, 118, 14, 3, '#2b3445'); R(171, 118, 12, 1, '#c9a24a');
  };

  const railCoat = i => ({ x: 482 + i * 9, k: i * 5 + 2, len: 24 + Math.floor(hash(i + 40) * 10) });
  const rightWall = (t, gone) => {
    R(476, 44, 92, 2, '#c9a24a');
    for (let i = 0; i < 10; i++) { if (gone.includes(i)) continue; const c = railCoat(i); coat(c.x, 45, c.k, c.len, true); }
    R(EXIT - 12, 100, 24, 46, '#f7f3ea'); R(EXIT - 9, 103, 18, 43, '#1b2030'); R(EXIT - 12, 88, 24, 9, '#2fb67c'); T('EXIT', EXIT, 89.5, 5, '#ffffff', 'center');
  };

  const floor = () => {
    R(0, 146, W, 34, '#5a1f2a'); R(0, 146, W, 1, '#3a141b');
    for (let x = 0; x < W; x += 16) for (let r = 0; r < 3; r++) { const y = 152 + r * 9, ox = x + (r % 2) * 8; R(ox + 3, y, 2, 1, '#6e2a36'); R(ox + 2, y + 1, 4, 1, '#6e2a36'); R(ox + 3, y + 2, 2, 1, '#6e2a36'); }
  };

  const stanchion = (x, top) => { R(x - 1, 132, 3, 22, '#c9a24a'); R(x - 2, 130, 5, 2, '#ffe48a'); R(x - 3, 152, 7, 2, '#8a6a2a'); };
  const rope = (x0, x1, c) => { for (let x = x0; x <= x1; x++) { const k = (x - x0) / (x1 - x0); R(x, Math.round(134 + Math.sin(k * Math.PI) * 5), 1, 2, c); } };

  const dispenser = (t, st) => {
    R(DISP - 1, 108, 3, 46, '#3b3f47'); R(DISP - 5, 152, 11, 2, '#2b2e31');
    const sh = t - st.tixT < 0.4 ? Math.round(Math.sin(t * 50)) : 0;
    R(DISP - 8 + sh, 94, 16, 15, '#c8322c'); R(DISP - 8 + sh, 94, 16, 2, '#e85d5d'); R(DISP - 5 + sh, 99, 10, 5, '#ffffff'); R(DISP - 4 + sh, 101, 8, 1, '#c8322c');
    R(DISP + 3 + sh, 104, 6, 3, '#f7f3ea');
  };

  const bigCoat = (x, top) => {
    const c = '#9a7a4a', d = '#7a5c34', l = '#b8966a';
    for (let y = top + 4; y < top + 56; y++) { const h = Math.round(7 + (y - top) * 0.07); R(x - h, y, 2 * h + 1, 1, c); }
    R(x - 6, top, 13, 5, c); R(x - 6, top, 4, 9, l); R(x + 3, top, 4, 9, l);
    line(x - 5, top + 4, x, top + 18, d); line(x + 5, top + 4, x, top + 18, d);
    R(x - 11, top + 6, 3, 38, d); R(x + 9, top + 6, 3, 38, d); R(x - 11, top + 42, 3, 3, l); R(x + 9, top + 42, 3, 3, l);
    R(x - 10, top + 28, 21, 2, '#5a4026'); R(x - 2, top + 27, 5, 4, '#c9a24a'); R(x - 1, top + 28, 3, 2, '#5a4026');
    for (let y = top + 20; y < top + 52; y += 7) { R(x - 3, y, 1, 1, '#3a2a1a'); R(x + 3, y, 1, 1, '#3a2a1a'); }
    R(x - 10, top + 54, 21, 1, d);
  };
  const coatStand = (t, st) => {
    R(STAND - 1, 90, 3, 62, '#6b4a2f'); R(STAND - 8, 151, 17, 3, '#4a3424'); R(STAND - 7, 91, 15, 2, '#6b4a2f'); R(STAND - 8, 88, 2, 4, '#6b4a2f'); R(STAND + 7, 88, 2, 4, '#6b4a2f'); disc(STAND, 89, 2, '#8a6a4a');
    if (g.carry('coat') === true) return;
    bigCoat(STAND + Math.round(Math.sin(t * 0.8) * 0.6), 93);
  };

  const humanTicket = (cx, y, a, t) => {
    const x = callout(cx, y, 66, 46, '#f6ead0', '#7a2a1a', cx, y, a);
    for (let i = 0; i < 6; i++) { R(x - 2, y + 3 + i * 7, 2, 3, '#7a2a1a'); R(x + 66, y + 3 + i * 7, 2, 3, '#7a2a1a'); }
    R(x, y, 66, 11, '#c8322c'); T('No. 42', cx, y + 3, 6, '#ffd166', 'center');
    R(x + 5, y + 14, 56, 21, '#ffffff'); R(x + 5, y + 14, 56, 4, '#6c8cff'); R(x + 7, y + 15, 2, 2, '#ffffff');
    R(x + 8, y + 21, 18, 11, '#f5a623'); disc(x + 13, y + 25, 2, '#ffd166'); R(x + 9, y + 29, 16, 3, '#3cc87a');
    R(x + 30, y + 21, 26, 2, '#2b3445'); R(x + 30, y + 25, 22, 1, '#9aa0aa'); R(x + 30, y + 27, 24, 1, '#9aa0aa'); R(x + 30, y + 29, 18, 1, '#9aa0aa'); R(x + 30, y + 31, 10, 2, '#e85d75');
    T('page.html', cx, y + 37, 5, '#7a2a1a', 'center'); ctx.globalAlpha = 1;
  };
  const robotTicket = (cx, y, a) => {
    const x = callout(cx, y, 66, 46, '#ffffff', '#1b2332', cx, y, a);
    V('llms.txt', x + 5, y + 2, 11, '#1b2332'); R(x + 5, y + 12, 34, 1, '#1b2332');
    ['- install.md', '- usage.md', '- api.md'].forEach((s, i) => V(s, x + 5, y + 15 + i * 9, 10, '#33415c'));
    ctx.globalAlpha = 1;
  };
  const envPanel = (t, a) => {
    const x = callout(300, 36, 100, 54, '#0b0f1c', '#4be06f', null, null, a);
    V('$ env', x + 5, 38, 10, '#7f8aab');
    ['CLAUDECODE=1', 'CODEX_SANDBOX=1', 'GEMINI_CLI=1', 'CURSOR_AGENT=1'].forEach((s, i) => {
      const on = t > 0.5 + i * 0.5; if (!on) return;
      V(s, x + 5, 47 + i * 10, 10, '#dfe7f1'); if (t > 0.8 + i * 0.5) tick(x + 89, 50 + i * 10, '#4be06f'); });
    ctx.globalAlpha = 1;
  };
  const welcomePack = (t, a) => {
    const cx = 286, y = 46, x = callout(cx, y, 92, 58, '#e8f6ec', '#2f8f5a', 290, y, a);
    R(x, y, 92, 11, '#2f8f5a'); T('WELCOME PACK', cx, y + 3, 6, '#ffffff', 'center');
    if (t > 0.5) { R(x + 6, y + 15, 26, 30, '#ffffff'); R(x + 26, y + 15, 6, 6, '#c9d6e8'); R(x + 6, y + 15, 26, 1, '#1b2332');
      for (let i = 0; i < 6; i++) R(x + 9, y + 23 + i * 3, 12 + ((i * 7) % 9), 1, i ? '#9aa0aa' : '#1b2332');
      T('AGENTS.md', x + 19, y + 48, 5, '#1b4a32', 'center'); }
    ['#6c8cff', '#f5a623', '#e85d75'].forEach((c, i) => { if (t < 0.9 + i * 0.25) return;
      const sx = x + 44 + i * 14, sy = y + 18 + (i === 1 ? -3 : 0);
      R(sx, sy, 14, 24, '#1b2332'); R(sx + 1, sy + 1, 12, 22, c); map2d(['..w..', '.www.', 'wwwww', '.www.', '.w.w.'], sx + 4, sy + 6, { w: '#ffffff' }); R(sx + 3, sy + 15, 8, 1, '#ffffff'); R(sx + 3, sy + 18, 6, 1, '#ffffff'); });
    if (t > 1.6) T('skills/', x + 65, y + 48, 5, '#1b4a32', 'center');
    ctx.globalAlpha = 1;
  };
  const humanPack = (t, a) => {
    const cx = 150, y = 46, x = callout(cx, y, 92, 58, '#f6ead0', '#7a2a1a', 126, y, a);
    R(x, y, 92, 11, '#7a2a1a'); T('WELCOME PACK', cx, y + 3, 6, '#ffd166', 'center');
    if (t > 0.5) { const bx = x + 5, by = y + 15;
      R(bx, by, 38, 30, '#1b2332'); R(bx + 1, by + 1, 36, 28, '#ffffff'); R(bx + 1, by + 1, 36, 4, '#d9dee6');
      ['#ff5f56', '#ffbd2e', '#27c93f'].forEach((c, i) => R(bx + 3 + i * 3, by + 2, 2, 2, c));
      R(bx + 1, by + 5, 9, 24, '#eef2f8'); for (let i = 0; i < 5; i++) R(bx + 3, by + 8 + i * 4, 5, 1, i === 1 ? '#6c8cff' : '#9aa0aa');
      R(bx + 13, by + 8, 16, 2, '#1b2332'); for (let i = 0; i < 4; i++) R(bx + 13, by + 13 + i * 3, 21 - (i * 5) % 9, 1, '#9aa0aa'); R(bx + 13, by + 25, 14, 2, '#2b3445');
      T('docs site', bx + 19, y + 48, 5, '#7a2a1a', 'center'); }
    if (t > 0.9) { const bx = x + 49, by = y + 15, k = k01((t - 0.9) / 0.6);
      R(bx, by, 38, 30, '#1b2332'); R(bx + 1, by + 1, 36, 28, '#ffffff');
      ['#6c8cff', '#f5a623', '#3cc87a', '#e85d75'].forEach((c, i) => { const h = Math.round([14, 20, 10, 24][i] * k); R(bx + 5 + i * 8, by + 26 - h, 6, h, c); });
      R(bx + 3, by + 26, 32, 1, '#1b2332');
      T('visuals', bx + 19, y + 48, 5, '#7a2a1a', 'center'); }
    ctx.globalAlpha = 1;
  };

  const PICKS = [0, 3, 1], RIGHT = 8, FEET = 152, HOOK = 47;
  const briefGone = s => PICKS.filter((_, j) => s > 1.45 + j).concat(s > 2.2 ? [RIGHT] : []);
  const folder = (x, y) => { R(x, y + 1, 9, 7, '#e2b65a'); R(x, y, 4, 2, '#e2b65a'); R(x, y + 1, 9, 1, '#f2d38a'); ['#6c8cff', '#f5a623', '#e85d75'].forEach((c, i) => R(x + 9, y + 2 + i * 2, 2, 1, c)); };
  const lying = (x, k) => { const c = COAT[k % COAT.length]; R(x - 7, 147, 15, 4, c.c); R(x - 7, 147, 15, 1, c.l); R(x - 1, 148, 1, 3, c.d); };
  const grab = (x, u, i) => {
    const c = railCoat(i), top = 108 - c.len - 5, y = u < 0.2 ? FEET - 28 - (FEET - 28 - HOOK) * k01(u / 0.2) : HOOK + (top - 45) * k01((u - 0.2) / 0.2);
    R(x, Math.round(y), 1, FEET - 28 - Math.round(y), '#9aa0a6'); R(x - 2, Math.round(y) - 1, 5, 1, '#dfe7f1');
    if (u >= 0.2) coat(x, Math.round(y) - 2, c.k, c.len, true);
  };
  const briefing = (t, s) => {
    const ax0 = 368, X = i => railCoat(i).x;
    let ax = s < 1 ? ax0 + (X(PICKS[0]) - ax0) * k01(s) : X(PICKS[Math.min(2, Math.floor(s - 1))]), j = Math.floor(s - 1), u = s - 1 - j;
    if (j > 0 && j < 3 && u < 0.25) ax = X(PICKS[j - 1]) + (X(PICKS[j]) - X(PICKS[j - 1])) * (u / 0.25);
    PICKS.forEach((i, n) => { const v = s - 2 - n; if (v < 0) return;
      const x = X(i) + (n % 2 ? 16 : -16) * k01(v / 0.4); if (v < 0.4) { const c = railCoat(i); coat(Math.round(x), Math.round(108 - c.len - 5 + (40 + c.len) * (v / 0.4) ** 2), c.k, c.len, false); } else lying(Math.round(x), railCoat(i).k); });
    const working = j >= 0 && j < 3, holding = working && u >= 0.25 && u < 1, gaveUp = s >= 4;
    bot(ax, FEET, t, BOTS[0], { s: 2, moving: s < 1 || working && u < 0.25, armsUp: holding });
    if (holding) grab(ax, u - 0.25, PICKS[j]);
    if (holding && u > 0.6) out('?', ax + 12, 82 - Math.round(Math.abs(Math.sin(t * 6)) * 2), 9, '#ffd166', '#1b2332');
    if (gaveUp) out('???', ax, 96 - Math.round(Math.abs(Math.sin(t * 3)) * 2), 9, '#ffd166', '#1b2332');
    const bx0 = 352, bx = s < 0.8 ? bx0 : bx0 + (X(RIGHT) - bx0) * k01((s - 0.8) / 1.2), w = s - 2;
    if (s < 0.8 || s > 2 || Math.abs(ax - bx) > 44) out('NO BRIEFING', ax, 112, 6, '#ffb08a', '#4a1c14');
    bot(bx, FEET, t, BOTS[2], { s: 2, agent: true, moving: s > 0.8 && s < 2, armsUp: w >= 0 });
    if (s < 0.8) { const p = k01(s / 0.8); folder(Math.round(340 + (bx0 + 6 - 340) * p), Math.round(116 + 22 * p - Math.sin(p * Math.PI) * 10)); }
    else { folder(Math.round(bx) + 6, 138); out('AGENTS.md', bx, 112, 6, '#bfffd4', '#14532d'); }
    if (w >= 0) grab(bx, w, RIGHT);
    if (w > 0.6) { const y = 84 - Math.round(Math.abs(Math.sin(t * 4)) * 2); disc(bx - 14, y, 6, '#1b2332'); disc(bx - 14, y, 5, '#2f8f5a'); tick(Math.round(bx) - 17, y, '#ffffff'); }
    if (s > 4.3) { ctx.globalAlpha = k01((s - 4.3) / 0.4); out('GIVE AGENTS THE BRIEFING', 470, 28, 7, '#ffd166', '#1b2332'); ctx.globalAlpha = 1; }
  };

  const tokens = (t, s) => {
    const ax = Math.min(LANE0 + 8 + s * 5, LANE1 - 34), sway = Math.sin(t * 2.4) * (0.6 + Math.min(1, s / 4));
    for (let i = 0; i < 26; i++) { const sx = Math.round(ax - 7 + sway * i * i * 0.012); R(sx, 134 - i * 2, 15, 2, i % 2 ? '#f7f3ea' : '#e2ddd0'); R(sx + 2, 134 - i * 2, 9, 1, '#c9c4b6'); }
    const fp = (s % 1.7) / 1.7; if (s > 1) { const fx = ax - 8 - fp * 22 * Math.sign(sway || 1), fy = 84 + fp * fp * 66; ctx.save(); ctx.translate(Math.round(fx), Math.round(fy)); ctx.rotate(fp * 3); R(-6, -1, 12, 2, '#f7f3ea'); ctx.restore(); }
    bot(ax, 152, t, BOTS[1], { armsUp: true, moving: true });
    out('2,025 CHARS', ax + Math.round(sway * 8), 74, 6, '#ffffff', '#7a2a1a');
    if (s > 0.6) {
      const span = LANE1 - LANE0 + 40, bx = LANE0 - 20 + ((s - 0.6) * 80) % span;
      for (let i = 1; i < 4; i++) R(Math.round(bx) - 8 - i * 6, 141 + i * 3, 5, 1, '#9fe0b8');
      R(Math.round(bx) - 5, 136, 10, 7, '#ffffff'); R(Math.round(bx) - 4, 138, 8, 1, '#33415c'); R(Math.round(bx) - 4, 140, 5, 1, '#33415c');
      bot(bx, 158, t, BOTS[2], { armsUp: true, moving: true, agent: true });
      out('511 CHARS', Math.round(bx), 124, 6, '#bfffd4', '#14532d');
    }
    if (s > 2.2) { ctx.globalAlpha = k01((s - 2.2) / 0.4); out('SAME TOKENS', (LANE0 + LANE1) / 2, 32, 7, '#ffd166', '#1b2332'); ctx.globalAlpha = 1; }
  };

  const eggBot = (t, st) => {
    const a = t - st.eggT; if (!(a >= 0 && a < 9.6)) return false;
    const from = 338, to = DISP + 18, x = a < 2.4 ? from + (to - from) * k01(a / 2.4) : a < 7 ? to : to + (from - to) * k01((a - 7) / 2.4);
    const moving = a < 2.4 || a > 7, up = a > 2.2 && a < 7;
    bot(x, 154, t, BOTS[2], { armsUp: up, moving, agent: true });
    if (up) hoodie(x, 116 - Math.round(Math.abs(Math.sin(t * 4)) * 2), 2);
    return true;
  };

  let cur = '', kNow = -1;
  return {
    width: W, floor: 154, spawn: 20, exit: EXIT, host: ADA,
    focus: { counter: BELL + 10, rail: 304, rack: 456, coats: 452 },
    props: [
      { id: 'tickets', x: DISP, label: 'Take a ticket' },
      { id: 'bell', x: BELL, r: 10, label: 'Ring the bell' },
      { id: 'coat', x: STAND, r: 6, label: 'Try on the big coat' },
    ],
    enter(st) { Object.assign(st, { tix: 0, tixT: -99, bellT: -99, bellSaid: 0, rings: [], grab: false, snatched: false, kept: false, snatchT: -99, dearT: -99, ax: HH, eggT: -99, eggSaid: false, hostN: 0, fly: [], floorTix: [] }); },
    update(dt, st, ev) {
      const t = time(); cur = ev.beat ? ev.beat.id || ev.beat.at : ''; kNow = ev.beat ? ORDER.indexOf(cur) : ev.beatIdx >= 0 ? ORDER.length : -1;
      const live = !ev.walking;
      for (const p of st.fly) { p.vy += 260 * dt; p.x += p.vx * dt; p.y += p.vy * dt; p.age += dt;
        if (p.y >= p.floor) { p.y = p.floor; p.vx = 0; p.vy = 0; if (p.kind === 'tix') p.done = true; } }
      st.fly.forEach(p => { if (p.done) st.floorTix.push(p); });
      st.fly = st.fly.filter(p => !p.done && p.age < 3.5);
      if (st.floorTix.length > 48) st.floorTix.splice(0, st.floorTix.length - 48);
      const b = t - st.bellT;
      if (st.bellT > 0 && b > 3.5 && st.bellSaid === 0) { st.bellSaid = 1; g.say('Coming...', HH, 104, 2.2); }
      const angry = st.grab || t - st.snatchT < 6, target = angry || st.bellT > 0 && st.bellSaid < 9 && b > 4 && b < 20 ? DESK : HH;
      const dx = target - st.ax, v = st.grab || st.snatched ? 36 : 12; st.aMoving = Math.abs(dx) > 0.5; if (st.aMoving) { st.ax += Math.sign(dx) * Math.min(Math.abs(dx), v * dt); st.aFace = Math.sign(dx); }
      if (st.grab && !st.aMoving) Object.assign(st, { grab: false, snatched: true, snatchT: t });
      if (st.snatched && !angry && !st.aMoving) Object.assign(st, { snatched: false, kept: true });
      if (b < 20 && st.bellSaid === 1 && !st.aMoving && Math.abs(st.ax - DESK) < 1) { st.bellSaid = 2; st.dearT = t; g.say('Yes, dear?', st.ax, 104, 2.5); }
      if (st.bellSaid === 2 && t - st.dearT > 2.6) { st.bellSaid = 3;
        if (g.carry('coat') === 'puffer') g.say('Still wearing it? Good.', st.ax, 104, 2.5);
        else { g.carry('coat', 'puffer'); g.say('Your jacket, dear. Wrap up warm.', st.ax, 104, 3); } }
      const e = t - st.eggT;
      if (st.eggT > 0 && e > 2.4 && !st.eggSaid) { st.eggSaid = true; g.say('Ticket 10. Yours, I think?', DISP + 18, 108, 3); g.egg('hoodie', 'Your own hoodie'); }
    },
    poke(id, st) {
      const t = time();
      if (id === 'tickets') {
        st.tixT = t; st.tix++;
        for (let i = 0; i < 5; i++) st.fly.push({ kind: 'tix', x: DISP + 6, y: 105, vx: 20 + Math.random() * 60, vy: -60 - Math.random() * 70, floor: 150 + Math.random() * 4, age: 0, c: i % 2 });
        g.say(`No. ${41 + st.tix}`, DISP, 92, 1.5);
        if (st.tix === 10 && st.eggT < 0) { st.eggT = t; st.eggSaid = false; }
        return true;
      }
      if (id === 'bell') {
        if (st.grab || st.snatched || st.kept) { g.say('No more bell, dear.', Math.round(st.ax), 104, 2); return true; }
        st.rings = st.rings.filter(r => t - r < 3).concat(t); st.bellT = t;
        if (st.rings.length >= 5) {
          Object.assign(st, { rings: [], grab: true, bellSaid: 9 });
          g.say('I HEARD YOU THE FIRST TIME!', Math.round(st.ax), 100, 3); g.egg('cloakbell', 'The attendant took the bell'); return true;
        }
        st.bellSaid = 0; g.say('Yes? How can I help?', ADA, 104, 2.2); return true;
      }
      if (id === 'coat') { const on = g.carry('coat') !== true; g.carry('coat', on || null); g.say(on ? 'Far too big' : 'Back on the stand', Math.round(g.heroX()), 128, 2.5); return true; }
      if (id === 'host') {
        const H = g.hero(), org = H === look('lukas') || H === look('luca');
        const lines = ['Ticket, please.', 'Do you have that in markdown?', 'I read llms.txt for fun.', 'My context window is full of coats.', 'Beep. Sorry, habit.'];
        g.say(org && st.hostN === 0 ? 'You’re not Phil. Ticket anyway?' : lines[st.hostN % lines.length], ADA, 104, 2.5); st.hostN++; return true;
      }
    },
    draw(st, ev) {
      const t = time(), k = kNow, live = !ev.walking, s = ev.stepT, on = id => cur === id && live;
      room(t, st, k);
      humanAlcove(t, st); robotAlcove(t, st, k, ev); board();
      const face = st.aMoving ? st.aFace : 1;
      person(LOOKS.att, st.ax, 126, t, face, st.aMoving);
      if (st.snatched) bellArt(Math.round(st.ax) + 7 * face, 112, t - st.snatchT < 1.5 ? Math.round(Math.sin(t * 60)) : 0);
      if (st.kept) bellArt(HH - 14, 119, 0);
      const push = on('skills') && s < 0.8;
      person(look('agents'), ADA + (push ? 2 : Math.round(Math.sin(t * 0.9) * 2)), 126, t, 1, false);
      counter(t, st);
      if (st.bellSaid === 2) puffer(DESK - 2, 114);
      if (on('skills') && s < 1) { const p = k01(s / 0.6); R(ADA - 2 + Math.round(p * 6), 116 - Math.round(p * 6), 7, 5, '#2f8f5a'); R(ADA - 2 + Math.round(p * 6), 116 - Math.round(p * 6), 7, 1, '#ffd166'); }
      floor();
      rightWall(t, on('context') ? briefGone(s) : []);
      for (const p of st.floorTix) R(Math.round(p.x), Math.round(p.y), 4, 2, p.c ? '#f7f3ea' : '#ffb3c0');
      stanchion(72); stanchion(140); rope(72, 140, '#a01c2c');
      stanchion(282); stanchion(350); for (let x = 282; x <= 350; x++) R(x, Math.round(134 + Math.sin((x - 282) / 68 * Math.PI) * 5), 1, 1, Math.sin(t * 8 - x * 0.4) > 0.6 ? '#bfe0ff' : '#6c8cff');
      const adv = k > 0 ? 1 : k === 0 && live ? k01(s / 0.9) : 0, stepping = adv > 0 && adv < 1;
      [2, 1, 0].forEach(i => {
        const x = 112 - i * 16 + adv * 12, L = HUMANS[i];
        const face = i === 2 && !stepping && Math.sin(t * 0.3 + 1) > 0.75 ? -1 : 1;
        person(L, x, 154, t, face, stepping || (i === 0 && Math.sin(t * 0.7) > 0.96));
        if (i === 1 && !stepping && Math.sin(t * 0.5) > -0.2) { R(Math.round(x) + 3, 140, 2, 3, '#1b2332'); R(Math.round(x) + 3, 140, 2, 2, '#9fe0ff'); }
        if (i === 0 && k >= 1) R(Math.round(x) + 5, 141, 4, 3, k >= 3 ? '#f6ead0' : '#e85d75');
      });
      const eggOn = eggBot(t, st);
      [2, 1, 0].forEach(i => {
        if (i === 2 && eggOn) return;
        const x = 306 + i * 16 - adv * 12, blink = Math.sin(t * 1.3 + i * 2) > 0.97;
        bot(x, 154 - (Math.sin(t * 3 + i) > 0.6 ? 1 : 0), t, BOTS[i], { agent: k >= 2, blink, moving: stepping });
        if (i === 0 && k >= 1) { if (k >= 3) { R(Math.round(x) - 9, 139, 7, 5, '#2f8f5a'); R(Math.round(x) - 9, 139, 7, 1, '#ffd166'); } else { R(Math.round(x) - 9, 139, 6, 4, '#ffffff'); R(Math.round(x) - 8, 140, 4, 1, '#33415c'); } }
      });
      coatStand(t, st);
      dispenser(t, st);
      for (const p of st.fly) R(Math.round(p.x), Math.round(p.y), 4, 2, p.c ? '#f7f3ea' : '#ffb3c0');
      if (on('two')) {
        const a = k01((s - 0.7) / 0.3);
        if (a > 0) { ctx.globalAlpha = a; out('HUMAN', 124, 118 - Math.round(Math.abs(Math.sin(t * 3)) * 2), 7, '#ffd166', '#1b2332'); out('AGENT', 294, 118 - Math.round(Math.abs(Math.sin(t * 3 + 1)) * 2), 7, '#bfe0ff', '#1b2332'); ctx.globalAlpha = 1; }
        if (s > 1.4) { const p = k01((s - 1.4) / 0.4); ctx.globalAlpha = p; R(BELL - 52, 46, 104, 18, '#1b2332'); R(BELL - 52, 46, 104, 1, '#6c8cff'); R(BELL - 52, 63, 104, 1, '#6c8cff'); out('2 AUDIENCES', BELL, 50, 9, '#ffffff', '#1b2332'); ctx.globalAlpha = 1; }
      }
      if (on('llms')) { const a = k01(s / 0.4), r = Math.round((1 - a) * 12); humanTicket(124, 58 + r, a, t); if (s > 0.6) robotTicket(294, 58 + Math.round((1 - k01((s - 0.6) / 0.4)) * 12), k01((s - 0.6) / 0.4)); }
      if (on('env')) envPanel(s, k01((s - 0.6) / 0.3));
      if (on('skills')) { if (s > 0.6) welcomePack(s - 0.6, k01((s - 0.6) / 0.3)); if (s > 1.4) humanPack(s - 1.4, k01((s - 1.4) / 0.3)); }
      if (on('context')) briefing(t, s);
      if (on('tokens')) tokens(t, s);
    },
    features: {
      richclick: { steps: 3, draw(step, t) {
        const H = 11, X = 22, Y = 24;
        R(0, 0, 320, 180, '#0b0f1c');
        R(10, 5, 300, 146, '#3b4252'); R(11, 6, 298, 144, '#0d1117'); R(11, 6, 298, 11, '#252b36');
        ['#ff5f56', '#ffbd2e', '#27c93f'].forEach((c, i) => disc(19 + i * 8, 11, 2, c));
        V(['plain click', 'rich-click', 'agent mode'][step], 160, 6, 10, '#9aa3b2', 'center');
        const env = step === 2 ? 'CLAUDECODE=1 ' : '', cmd = env + 'mytool --help', typed = Math.min(cmd.length, Math.floor(t * 28)), shown = t > cmd.length / 28 + 0.15;
        V('$', X, Y, H, '#7f8aab');
        const pre = cmd.slice(0, typed), envPart = pre.slice(0, Math.min(pre.length, env.length));
        V(envPart, X + 8, Y, H, '#6c8cff'); V(pre.slice(env.length), X + 8 + vw(env, H), Y, H, '#ffffff');
        if (!shown) { if (Math.floor(t * 4) % 2 === 0) R(X + 9 + vw(pre, H), Y + 1, 5, 9, '#dfe7f1'); return; }
        const row = i => Y + (i + 1.4) * H;
        if (step === 0) {
          const g0 = '#b0b6c0';
          ['Usage: mytool [OPTIONS] COMMAND [ARGS]...', '', '  Count and plot cells.', '', 'Options:', '  --help  Show this message and exit.', '', 'Commands:', '  count  Count the cells in a sample.', '  plot   Plot the counts.']
            .forEach((s, i) => V(s, X, row(i), H, g0));
        }
        if (step === 1) {
          const seg = (parts, y, x0 = X) => { let x = x0; for (const [s, c] of parts) { V(s, x, y, H, c); x += vw(s, H); } };
          seg([[' Usage: ', '#e5c07b'], ['mytool ', '#ffffff'], ['[OPTIONS] COMMAND [ARGS]...', '#e5c07b']], row(0));
          V(' Count and plot cells.', X, row(2), H, '#dfe7f1');
          const bx0 = X, bx1 = 300, by0 = row(4) + 5, by1 = row(7) + 5, p = k01((t - 0.35) / 0.5), bc = '#5c6370';
          const wx = Math.round(bx0 + (bx1 - bx0) * p);
          R(bx0 + 2, by0, wx - bx0 - 2, 1, bc); R(bx0 + 2, by1, wx - bx0 - 2, 1, bc);
          if (p > 0) { R(bx0, by0 + 2, 1, by1 - by0 - 3, bc); R(bx0 + 1, by0 + 1, 1, 1, bc); R(bx0 + 1, by1 - 1, 1, 1, bc); }
          if (p >= 1) { R(bx1, by0 + 2, 1, by1 - by0 - 3, bc); R(bx1 - 1, by0 + 1, 1, 1, bc); R(bx1 - 1, by1 - 1, 1, 1, bc); }
          R(bx0 + 4, by0 - 3, vw(' Commands ', H), 7, '#0d1117'); V(' Commands ', bx0 + 4, by0 - 5, H, '#9aa3b2');
          const c = k01((t - 0.6) / 0.4);
          ctx.globalAlpha = c;
          [['count', 'Count the cells in a sample.'], ['plot ', 'Plot the counts.']].forEach((r, i) => {
            const y = row(5 + i) + 2; seg([[r[0] + '  ', '#56d4e8'], [r[1], '#dfe7f1']], y, bx0 + 6); });
          ctx.globalAlpha = 1;
          if (t > 1.2) { const tag = 'import rich_click as click', w = vw(tag, 10) + 10; R(bx1 - w, 134, w, 12, '#1d2738'); R(bx1 - w, 134, w, 1, '#6c8cff'); V(tag, bx1 - w + 5, 135, 10, '#bfe0ff'); }
        }
        if (step === 2) {
          const lines = ['# mytool — Count and plot cells.', '# mytool count — Count the cells in a sample.', 'usage: mytool count INPUT', '--output, -o PATH  Where to save results', 'examples:', '- mytool count s1.bam -o s1.csv',
            '# mytool plot — Plot the counts.', '--format png|svg  Image format', 'examples:', '- mytool plot s1.csv --format svg'];
          lines.forEach((s, i) => { if (t > 0.05 * i) V(s, X, Y + (i + 1.2) * 10, 10, s[0] === '#' ? '#7ee787' : s[0] === '-' && s[1] === ' ' || s === 'examples:' ? '#ffd166' : '#c8f7d6'); });
          const bx = 270, look = Math.round(Math.sin(t * 2) * 1);
          bot(bx, 148, t, BOTS[0], { s: 3, agent: true, blink: Math.sin(t * 1.7) > 0.96 });
          R(bx - 8 + look * 3, 112, 3, 3, '#bfffd4'); R(bx + 4 + look * 3, 112, 3, 3, '#bfffd4');
          if (t > 0.9) { const tag = 'every subcommand · with examples · one call', w = vw(tag, 10) + 10; R(X, 137, w, 12, '#14532d'); V(tag, X + 5, 138, 10, '#bfffd4'); }
        }
      } },
    },
  };
};
