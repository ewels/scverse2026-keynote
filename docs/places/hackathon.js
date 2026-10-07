// Hackathon room: nf-core. The room starts dark and empty and fills up beat by beat.
(window.KEYNOTE_PLACES = window.KEYNOTE_PLACES || {}).hackathon = g => {
  const { R, T, disc, line, map2d, blob, cumulus, mix, hash, person, look, time, ctx } = g;
  const W = 1150, EXIT = 1122, INK = '#1b2332', GREEN = '#24b064', LIGHT = '#3cc87a', PAPER = '#fbfaf4';
  const topic = Object.values(window.KEYNOTE_CONTENT.TOPICS).find(t => t.place === 'hackathon');
  const IDS = (topic ? topic.beats : []).map(b => b.id || b.at);
  const c01 = v => Math.max(0, Math.min(1, v));
  const tw = (s, n) => { ctx.font = `${n}px Silkscreen, SilkscreenLocal, "Courier New", monospace`; return ctx.measureText(s).width; };
  const bubble = (s, x, y) => { const w = Math.ceil(tw(s, 5)) + 6, bx = Math.round(x - w / 2), by = Math.round(y) - 12, tx = Math.round(x);
    R(bx - 1, by - 1, w + 2, 11, INK); R(bx, by, w, 9, '#ffffff'); R(tx - 2, by + 9, 5, 1, '#ffffff'); R(tx - 1, by + 10, 3, 1, '#ffffff'); R(tx, by + 11, 1, 1, '#ffffff'); T(s, bx + 3, by + 2, 5, INK); };

  // x positions
  const FOCUS = { door: 52, board: 204, screen: 360, start: 463, tables: 596, photos: 837, stamp: 912, clock: 1044 };
  const SEATS = [516, 540, 564, 588, 644, 668, 692, 716], ENTER_X = 486, MO_X = 372;
  const FOLK = [
    { skin: '#f1c9a5', hair: '#2b1d14', hairStyle: 'short', top: '#e85d5d', topStyle: 'tee', pants: '#2f3a55' },
    { skin: '#8d5a3b', hair: '#1b1b1b', hairStyle: 'long', top: '#6c8cff', topStyle: 'hoodie', pants: '#2f3a55' },
    { skin: '#e8b894', hair: '#c96a2b', hairStyle: 'messy', glasses: true, top: '#ffd166', topStyle: 'tee', pants: '#3b3b3b' },
    { skin: '#c68a5e', hair: '#3a2a20', hairStyle: 'swept', beard: true, top: '#2d3a4a', topStyle: 'hoodie', logo: 'nfcore', logoColour: LIGHT, pants: '#2f3a55' },
    { skin: '#f6d3bd', hair: '#d9c27a', hairStyle: 'long', top: '#9b59b6', topStyle: 'sweat', pants: '#2f3a55' },
    { skin: '#5a3a28', hair: '#111111', hairStyle: 'bald', glasses: true, top: '#3cc8b4', topStyle: 'tee', pants: '#333a44' },
    { skin: '#f2d0b5', hair: '#6b4a2f', hairStyle: 'short', top: '#f5a623', topStyle: 'hoodie', pants: '#2f3a55' },
  ];
  const NEWBIE = { skin: '#d9a37c', hair: '#2b2b2b', hairStyle: 'messy', top: '#e0602e', topStyle: 'sweat', pants: '#2f3a55' };
  const LIDS = ['#b8c0c8', '#4a5563', '#2b2f36', '#c8ccd2', '#5a6b8c', '#b8c0c8', '#3a3f4a', '#c8ccd2'];
  const STICK = ['#e85d5d', '#ffd166', '#6c8cff', '#f5a623', '#9b59b6', '#3cc8b4', '#ffffff'];

  const CAT = ['f.......f', 'ff.....ff', 'fffsfsfff', 'fefffffef', 'fffffffff', 'ffwwnwwff', '.fwwwwwf.', '..fffff..'];
  // the venue cat (ginger, white chest) is cats[0]; phase 7 lets it wander the venue
  const CATS = [
    { f: '#e8913a', s: '#c06a22', w: '#f6efe2', e: '#3d8a3a' }, { f: '#8a9099', s: '#6a707a', w: '#e6e6e6', e: '#e0b030' },
    { f: '#2a2a30', s: '#1a1a1e', w: '#2a2a30', e: '#e0c030' }, { f: '#efe8dc', s: '#d9cbb4', w: '#ffffff', e: '#5aa0e0' },
    { f: '#9a7a5a', s: '#5a4430', w: '#efe3d0', e: '#6aa040' },
  ];
  const SLOTS = [2, 3, 4, 5, 6, 7, 10, 11, 12, 13, 14];
  const cat = (x, y, c, s = 1) => map2d(CAT, x, y, { f: c.f, s: c.s, e: c.e, w: c.w, n: '#e88aa0' }, s);

  const CHAT = [
    ['#e85d5d', 'hi! first PR here'], ['#3cc87a', 'welcome! I will review'], ['#6c8cff', 'help: conda error :('],
    ['#f5a623', 'try -profile docker'], ['#6c8cff', 'that worked, thanks!'], ['#9b59b6', 'new rnaseq release!'],
    ['#3cc8b4', 'obligatory cat pic'], ['#ffd166', 'who is at the hackathon?'],
  ];
  const STORY = ['rnaseq.nf', 'rnaseq_v2.nf', 'rnaseq_final.nf', 'rnaseq_final_2.nf', 'rnaseq_REAL_final.nf'];
  const RULES = ['NEXTFLOW', 'CONTAINERS', 'CI TESTS', 'DOCS', 'PEER REVIEW', 'MIT LICENCE'];
  const DOCS = ['1 READ DOCS', '2 SAY HI', '3 FIRST PR'];
  const MO = ['First hackathon? Welcome!', 'Say hi on Slack!', 'There is pizza by the tables', 'Need a review? Ping me'];
  const SEASONS = [
    { sky: '#a8d8f0', leaf: '#8fd17a', leaf2: '#f4b6c8', grass: '#86c76a', fall: '#f7c6d4' },
    { sky: '#7fc3ee', leaf: '#3f9a4a', leaf2: '#57b05a', grass: '#5fae4a', fall: null },
    { sky: '#b7c6d3', leaf: '#d9822b', leaf2: '#e8b04a', grass: '#9a9a4a', fall: '#e07a2b' },
    { sky: '#cfd8e2', leaf: null, leaf2: null, grass: '#eef2f6', fall: '#ffffff' },
  ];

  // seconds since a beat started; 1e3 once it has passed; -1 if not reached
  const age = (st, id) => { const i = IDS.indexOf(id); return i < 0 || i > st.cur ? -1 : i === st.cur ? time() - st.t0 : 1e3; };
  // quarter-years since spring 2018; the clock beat runs it up to autumn 2026
  const quarters = st => { const a = age(st, 'time'); return a < 0 ? 1 : Math.min(34, 1 + a / 0.75); };

  function view(x0, y0, w, h, s, t) {
    const S = SEASONS[s];
    R(x0, y0, w, h, S.sky); cumulus(x0 + ((t * 3) % (w + 30)) - 15, y0 + 14, 0.5); cumulus(x0 + ((t * 2 + 50) % (w + 30)) - 15, y0 + 26, 0.35);
    R(x0, y0 + h - 18, w, 18, mix(S.grass, '#7a8a96', 0.15)); R(x0 + 46, y0 + h - 30, 30, 12, '#c8b8a0'); R(x0 + 50, y0 + h - 27, 4, 4, '#7d8a96'); R(x0 + 60, y0 + h - 27, 4, 4, '#7d8a96');
    R(x0, y0 + h - 10, w, 10, S.grass);
    const tx = x0 + 24, ty = y0 + h - 10; R(tx - 1, ty - 22, 3, 22, '#6b4a2f');
    if (S.leaf) blob(tx, ty - 28, 12, S.leaf, mix(S.leaf, '#ffffff', 0.2), S.leaf2);
    else { line(tx, ty - 18, tx - 9, ty - 30, '#6b4a2f'); line(tx, ty - 20, tx + 8, ty - 34, '#6b4a2f'); line(tx, ty - 22, tx, ty - 38, '#6b4a2f'); R(tx - 9, ty - 31, 3, 1, '#ffffff'); R(tx + 6, ty - 35, 3, 1, '#ffffff'); }
    if (S.fall) for (let i = 0; i < 14; i++) { const px = x0 + ((hash(i * 7) * w + Math.sin(t + i) * 6 + t * 4) % w + w) % w, py = y0 + (hash(i * 3) * h + t * (8 + i % 4) * (s === 2 ? 1.6 : 1)) % h; R(Math.round(px), Math.round(py), s === 3 ? 1 : 2, 1, S.fall); }
  }

  function wave(L, x, feet, t, face) { const x0 = Math.round(x), top = feet - 20, w = Math.round(Math.sin(t * 10) * 1.5), ax = x0 + (face > 0 ? 4 : -6);
    R(ax, top + 3, 2, 7, L.top); R(ax + w, top - 1, 3, 4, L.skin); }
  function laptop(x, i, h, ag) { if (h <= 0) return; const lx = Math.round(x) - 5; R(lx, 134 - h, 11, h, LIDS[i]); R(lx - 1, 133, 13, 1, '#8a8f94');
    if (h < 5) return; const n = 2 + Math.floor(ag * 4);
    for (let k = 0; k < n; k++) R(lx + 1 + Math.floor(hash(i * 13 + k) * 8), 130 - h + 1 + Math.floor(hash(i * 7 + k * 3) * 3), 2, 2, k === 0 ? LIGHT : STICK[(i + k) % STICK.length]); }
  function pill(s, x, y, c) { const w = Math.ceil(tw(s, 5)) + 6; R(Math.round(x - w / 2), y, w, 9, c); R(Math.round(x - w / 2), y + 8, w, 1, mix(c, '#000000', 0.3)); T(s, Math.round(x), y + 2, 5, '#ffffff', 'center'); }

  return {
    width: W, floor: 154, spawn: 20, exit: EXIT, focus: FOCUS,
    get host() { return this._mo || MO_X; },
    props: [
      { id: 'laptop', x: 62, label: 'Run nf-core lint' },
      { id: 'board', x: 210, label: 'Doodle on the whiteboard' },
      { id: 'docs', x: 470, label: 'Read the docs' },
      { id: 'pizza', x: 606, label: 'Grab a slice of pizza' },
      { id: 'photo', x: 842, label: 'Pin up another cat photo' },
      { id: 'stamp', x: 922, label: 'Stamp the paperwork' },
      { id: 'plant', x: 1052, label: 'Water the plants' },
    ],
    enter(st) { Object.assign(st, { cur: -1, t0: 0, slices: 8, lint: 0, lintT: -9, doodles: 0, extra: 0, stamps: 0, stampT: -9, trip: -9, water: 0, mo: 0, docs: 0, papers: [] }); this._mo = MO_X; },
    beat(id, st) { st.cur = IDS.indexOf(id); st.t0 = time(); if (id === 'cats') g.carry('cat', true); },
    poke(id, st) {
      const t = time();
      if (id === 'host') { g.say(MO[st.mo++ % MO.length], this.host, 128); return true; }
      if (id === 'laptop') { st.lint++; st.lintT = t; g.say(st.lint % 2 ? 'nf-core lint: all passed' : 'nf-core lint: 1 FAILED', 78, 112); return true; }
      if (id === 'board') { st.doodles++; return true; }
      if (id === 'docs') { g.say(['Step 1: read the docs', 'Step 2: say hi on Slack', 'Step 3: pick an issue'][st.docs++ % 3], 463, 108); return true; }
      if (id === 'pizza') { if (st.slices > 0) st.slices--; g.say(st.slices ? `Nom. ${st.slices} slices left` : 'No pizza left. Classic.', 619, 128); return true; }
      if (id === 'photo') { if (st.extra < 14) st.extra++; g.say(['Another cat photo', 'And another', 'Cats all the way down'][Math.min(2, Math.floor(st.extra / 4))], 842, 128); return true; }
      if (id === 'stamp') {
        st.stamps++; st.stampT = t; if (st.papers.length < 14) st.papers.push({ t0: t, d: hash(st.stamps * 17) < 0.5 ? -1 : 1, k: st.stamps });
        g.say(['APPROVED', 'APPROVED AGAIN', 'DOUBLY APPROVED', 'VERY APPROVED', 'IN TRIPLICATE?'][Math.min(4, st.stamps - 1)], 928, 116);
        if (st.stamps === 5) { st.trip = t; g.egg('triplicate', 'Approved in triplicate'); }
        return true;
      }
      if (id === 'plant') { if (st.water < 6) st.water++; g.say(st.water < 6 ? 'Grow, little plants' : 'That is plenty of water', 1048, 128); return true; }
    },
    draw(st, ev) {
      const t = time(), A = id => age(st, id), has = id => A(id) >= 0;
      const q = quarters(st), year = 2018 + Math.floor(q / 4), ag = c01((q - 1) / 33);
      const fade = c => mix(c, '#e6dfcc', ag * 0.45);

      /* room shell */
      const wall = mix('#eef1ea', '#ebe4cf', ag * 0.6);
      R(0, 0, W, 140, wall); for (let x = 20; x < W; x += 40) R(x, 10, 1, 96, mix(wall, '#000000', 0.05));
      R(0, 0, W, 9, '#c9d0c6'); R(0, 9, W, 1, '#b5bdb2');
      R(0, 108, W, 30, mix('#cfe0d1', '#d8d2bc', ag * 0.5)); R(0, 106, W, 2, '#9fbfa6'); R(0, 138, W, 2, '#7f9a86');
      R(0, 140, W, 40, '#b98d5e'); for (let y = 140, r = 0; y < 180; y += 7, r++) { R(0, y, W, 1, '#a67c50'); for (let x = (r % 2) * 23; x < W; x += 46) R(x, y + 1, 1, 6, '#a67c50'); }

      /* lights: off until the vision beat */
      const lit = has('vision') ? c01(A('vision') / 1.5) : 0;
      for (const lx of [204, 360, 463, 560, 680, 837, 925, 1044]) { R(lx, 9, 1, 4, '#6f7a80'); R(lx - 5, 13, 11, 4, '#3a4450'); R(lx - 3, 17, 7, 1, lit > 0.5 ? '#ffe7a0' : '#8a8f94');
        if (lit > 0) { ctx.fillStyle = `rgba(255,236,170,${0.07 * lit})`; for (let y = 18; y < 140; y += 2) { const w = 4 + (y - 18) * 0.28; ctx.fillRect(lx - w, y, w * 2, 2); } } }

      /* entrance door */
      R(6, 92, 30, 48, '#7f9a86'); R(9, 95, 24, 45, '#8a5a32'); R(12, 99, 18, 14, '#c9dfe8'); R(28, 118, 3, 2, '#ffd166');

      /* the first laptop, on its own */
      const lintOn = t - st.lintT < 2.5, scr = lintOn ? (st.lint % 2 ? '#4be06f' : '#ff4d4d') : has('story') ? '#9fe0b8' : '#2a3a44';
      R(60, 124, 40, 3, '#c8a878'); R(62, 127, 2, 13, '#8a6a48'); R(96, 127, 2, 13, '#8a6a48');
      R(70, 117, 12, 7, '#4a5563'); R(71, 118, 10, 5, scr); R(68, 123, 16, 1, '#8a8f94'); R(73, 115 + 4, 2, 2, LIGHT);
      R(94, 122, 4, 2, '#3a4450'); line(95, 122, 91, 112, '#3a4450'); R(87, 110, 7, 3, '#3a4450'); if (has('story')) R(88, 113, 5, 1, '#ffe7a0');

      /* whiteboard: shared problem, then the agreed rules */
      R(114, 20, 180, 86, '#8a8f94'); R(116, 22, 176, 82, PAPER); R(140, 104, 128, 3, '#8a8f94'); R(150, 102, 8, 2, '#e85d5d'); R(162, 102, 8, 2, '#2a5ad0'); R(174, 102, 8, 2, GREEN);
      const va = A('vision');
      if (va >= 0) { const on = k => va > k * 0.45;
        if (on(0)) T('SHARED PROBLEM', 204, 25, 6, '#d03a3a', 'center');
        ['#2a5ad0', '#e85d5d', '#f5a623'].forEach((c, i) => { if (!on(i + 1)) return; const y = 36 + i * 7, wob = k => Math.round(Math.sin(i * 3 + k) * 1.5);
          disc(124, y, 2, c); line(127, y + wob(1), 136, y - wob(2), c); disc(139, y - 1, 2, c); line(142, y - wob(3), 151, y + wob(4), c); disc(154, y + 1, 2, c); });
        if (on(4)) { line(162, 48, 182, 48, INK); line(178, 44, 182, 48, INK); line(178, 52, 182, 48, INK); T('EVERY LAB', 139, 55, 5, '#5a6270', 'center'); }
        if (on(5)) { R(196, 46, 82, 4, GREEN); for (const x of [198, 224, 250, 276]) { disc(x, 48, 4, GREEN); disc(x, 48, 2, PAPER); } }
        if (on(6)) T('ONE, SHARED', 237, 56, 5, GREEN, 'center');
        if (on(4)) for (let x = 120; x < 288; x += 4) R(x, 64, 2, 1, '#c4c8cc'); }
      const sa = A('scope');
      if (sa >= 0) { T('WE AGREE ON:', 120, 67, 5, INK);
        RULES.forEach((r, i) => { const x = i < 3 ? 122 : 196, y = 77 + (i % 3) * 9; R(x, y, 6, 6, INK); R(x + 1, y + 1, 4, 4, PAPER); T(r, x + 9, y, 5, INK);
          if (sa > 0.5 + i * 0.6) { line(x + 1, y + 3, x + 3, y + 5, GREEN); line(x + 3, y + 5, x + 7, y - 1, GREEN); line(x + 2, y + 3, x + 3, y + 4, GREEN); } }); }
      for (let i = 0; i < Math.min(3, st.doodles); i++) { const k = (st.doodles - 1 - i) % 4, x = 270, y = 70 + i * 11;
        if (k === 0) cat(x, y, CATS[0]); else if (k === 1) { disc(x + 2, y + 2, 2, '#e85d5d'); disc(x + 6, y + 2, 2, '#e85d5d'); R(x + 1, y + 3, 7, 2, '#e85d5d'); R(x + 3, y + 5, 3, 2, '#e85d5d'); }
        else if (k === 2) T('DSL2', x - 2, y + 1, 5, '#2a5ad0'); else { disc(x + 4, y + 4, 4, '#f5a623'); R(x + 2, y + 2, 1, 1, INK); R(x + 6, y + 2, 1, 1, INK); R(x + 2, y + 6, 5, 1, INK); } }

      /* wall screen: a place to talk online */
      R(298, 22, 124, 74, '#2a2f38'); R(300, 24, 120, 70, '#141821'); R(358, 96, 4, 10, '#3a4450');
      const ca = A('chat');
      if (ca >= 0) { R(300, 24, 120, 10, '#3f0e40'); T('# nf-core', 304, 26, 5, '#ffffff'); T('10,000+', 416, 26, 5, '#ffd166', 'right');
        const n = Math.floor(ca / 1.1) + 1;
        for (let r = 0; r < 5; r++) { const m = n - 5 + r; if (m < 0) continue; const [c, s] = CHAT[m % CHAT.length], y = 37 + r * 11, pop = m === n - 1 ? c01((ca % 1.1) / 0.2) : 1;
          if (pop < 1) ctx.globalAlpha = pop; R(304, y, 8, 8, c); R(306, y + 2, 1, 1, '#ffffff'); R(309, y + 2, 1, 1, '#ffffff'); T(s, 316, y + 1, 5, '#e8ecf2');
          if (s.includes('cat')) cat(404, y, CATS[0]); ctx.globalAlpha = 1; } }
      else { R(304, 28, 30, 2, '#20262f'); R(304, 32, 18, 2, '#20262f'); }

      /* docs and onboarding */
      R(428, 36, 70, 64, '#7f9a86'); R(430, 38, 66, 60, PAPER);
      const da = A('docs');
      if (da >= 0) { R(430, 38, 66, 12, GREEN); T('START HERE', 463, 41, 6, '#ffffff', 'center');
        DOCS.forEach((s, i) => { if (da > 0.4 + i * 0.7) T(s, 436, 56 + i * 13, 6, INK); }); }
      R(432, 112, 62, 26, '#8a6a48'); R(434, 114, 58, 10, '#6b4f36'); R(434, 126, 58, 10, '#6b4f36');
      if (da >= 0) for (let i = 0; i < 18; i++) { if (da < 0.2 + i * 0.06) break; const sh = i < 9 ? 114 : 126, x = 435 + (i % 9) * 6, h = 7 + Math.floor(hash(i) * 3); R(x, sh + 10 - h, 5, h, STICK[i % 6]); R(x, sh + 10 - h + 2, 5, 1, mix(STICK[i % 6], '#ffffff', 0.4)); }

      /* tables, people, laptops */
      const ha = A('hackathon'), wa = A('welcomes'), ka = A('workplace');
      if (ka >= 0) { const rug = c01(ka / 0.6); R(Math.round(596 - 118 * rug), 141, Math.round(236 * rug), 6, '#c86a5a'); for (let x = 480; x < 712; x += 8) if (Math.abs(x - 596) < 118 * rug) R(x, 143, 4, 2, '#e8c36a'); }
      for (const sx of SEATS) { R(sx - 4, 125, 9, 11, '#5a3a22'); R(sx - 3, 126, 7, 9, '#6b4a2f'); }
      const seated = [], walkers = [];
      if (ha >= 0) FOLK.forEach((L, i) => { const si = 6 - i, sx = SEATS[si], s0 = 0.1 + i * 0.5, arrive = s0 + (sx - ENTER_X) / 90;
        if (ha < s0) return; if (ha < arrive) walkers.push([L, ENTER_X + (ha - s0) * 90]); else seated.push([L, sx, si, ha - arrive]); });
      // the newcomer: walks in along the front, gets the welcome, then goes round the end of the table to the last seat
      let nb = null;
      if (wa >= 0) { const w = wa;
        if (w < 2.1) nb = { x: 430 + w * 70, f: 152, face: 1, mv: true };
        else if (w < 5.2) nb = { x: 577, f: 152, face: -1, mv: false };
        else if (w < 7.4) nb = { x: 577 + (w - 5.2) * 72, f: 152, face: 1, mv: true };
        else if (w < 7.9) nb = { x: 736, f: 152 - (w - 7.4) * 22, face: 1, mv: true, back: true };
        else if (w < 8.2) nb = { x: 736 - (w - 7.9) * 66, f: 141, face: -1, mv: true, back: true };
        else seated.push([NEWBIE, SEATS[7], 7, w - 8.2]); }
      const waving = wa > 2.2 && wa < 6.5;
      for (const [L, sx, si] of seated) { const bob = Math.sin(t * 3 + si * 1.3) > 0.9 ? 1 : 0, face = si < 4 ? (si % 2 ? -1 : 1) : (si % 2 ? 1 : -1);
        person(L, sx, 141 + bob, t, face, false); if (waving && L !== NEWBIE) wave(L, sx, 141, t + si, face); if (L === NEWBIE) R(sx - 1, 132, 3, 3, LIGHT); }
      for (const [L, x] of walkers) person(L, x, 138, t, 1, true);
      if (nb && nb.back) { person(NEWBIE, nb.x, nb.f, t, nb.face, nb.mv); R(Math.round(nb.x) - 1, Math.round(nb.f) - 9, 3, 3, LIGHT); }
      for (const [x0, x1] of [[504, 600], [632, 728]]) { R(x0, 134, x1 - x0, 3, '#d8c7a5'); R(x0, 137, x1 - x0, 4, '#a88a5f'); R(x0 + 2, 141, 2, 6, '#7d5f3e'); R(x1 - 4, 141, 2, 6, '#7d5f3e');
        }
      for (const [, sx, si, since] of seated) laptop(sx, si, Math.round(c01(since / 0.3) * 5), ag);
      // trolley and pizza
      R(608, 126, 22, 2, '#9aa3a8'); R(608, 138, 22, 2, '#9aa3a8'); R(609, 128, 1, 16, '#6f7a80'); R(628, 128, 1, 16, '#6f7a80'); R(609, 144, 2, 2, '#2a2a2a'); R(627, 144, 2, 2, '#2a2a2a');
      if (ka >= 0) { R(611, 132, 5, 6, '#ffffff'); R(616, 133, 2, 3, '#ffffff'); R(620, 131, 6, 7, '#c8322c'); R(621, 129, 4, 2, '#3a3f44'); if (Math.sin(t * 2) > 0) R(623, 126, 1, 2, '#ffffff'); }
      if (ha >= 0) { R(608, 120, 22, 3, '#d9b77a'); R(608, 123, 22, 3, '#c9a060');
        R(608, 104, 22, 12, '#d9b77a'); R(610, 106, 18, 8, '#c9a060'); T('PIZZA', 619, 107, 4, '#8a3a1a', 'center');
        R(608, 116, 22, 2, '#c9a060'); for (let k = 0; k < 8; k++) if (k < st.slices) { R(610 + k * 2, 115, 2, 2, '#e8b04a'); if (k % 3 === 0) R(610 + k * 2, 115, 1, 1, '#c8322c'); } }

      /* banner, bunting, plants, code of conduct */
      if (ha >= 0) { const u = c01(ha / 0.9), h = Math.round(20 * u); line(524, 10, 528, 36, '#6f7a80'); line(672, 10, 668, 36, '#6f7a80');
        R(526, 36, 144, h, fade(GREEN)); if (h > 2) R(526, 36 + h - 2, 144, 2, fade('#1a8a4e')); if (u === 1) { T('NF-CORE', 564, 39, 7, '#ffffff', 'center'); T('HACKATHON', 628, 39, 7, '#ffd166', 'center'); T('nf-co.re', 598, 49, 4, '#d8f5e2', 'center'); } }
      if (ka >= 0) { const reach = 300 + ka * 500;
        for (let x = 300; x < Math.min(900, reach); x += 10) { const y = 11 + Math.round(Math.sin((x - 300) / 60 * Math.PI) * -1 + Math.abs(Math.sin((x - 300) / 100 * Math.PI)) * 5);
          R(x, y, 10, 1, '#6f7a80'); for (let k = 0; k < 4; k++) R(x + 2 + k, y + 1 + k, 6 - k * 2, 1, fade(STICK[(x / 10) % 6])); }
        const grow = c01((ka - 0.8) / 1.2);
        for (const [px, big] of [[498, 0], [760, 1]]) { R(px - 5, 128, 11, 12, '#b0603a'); R(px - 6, 127, 13, 2, '#c8724a'); const h = Math.round((big ? 22 : 14) * grow * (1 + ag));
          for (let k = 0; k < h; k += 3) { R(px, 127 - k, 1, 3, '#3f7a3a'); R(px + (k % 6 ? 1 : -4), 126 - k, 4, 2, k % 6 ? '#4f9c49' : '#3f8a3a'); } }
        if (ka > 1.2) { R(740, 42, 34, 44, fade('#3cc87a')); R(742, 44, 30, 40, PAPER); T('BE', 757, 48, 6, GREEN, 'center'); T('KIND', 757, 57, 6, GREEN, 'center'); for (let k = 0; k < 4; k++) R(746, 68 + k * 4, 22 - (k % 2) * 6, 1, '#9aa3a8'); } }

      /* trust: merges land without anyone hovering */
      const ta = A('trust');
      if (ta >= 0 && !(wa >= 0 && wa < 1e3)) for (const [, sx, si] of seated) { const per = ta < 1e3 ? 2.6 : 7, ph = ((t + si * 0.83) % per + per) % per; if (ph > 1.4) continue;
        pill('MERGED', sx, 100 - (si % 2) * 11 - Math.round(ph * 3), si === 7 ? '#d08a1a' : '#8250df'); }

      /* cat photo wall */
      R(780, 24, 114, 84, '#8a6a3f'); R(782, 26, 110, 80, '#c9a46a'); for (let i = 0; i < 30; i++) R(783 + Math.floor(hash(i * 5) * 107), 27 + Math.floor(hash(i * 9) * 77), 1, 1, '#b8915a');
      R(790, 34, 26, 18, '#fff3a0'); T('AGENDA', 803, 37, 4, INK, 'center'); R(793, 44, 18, 1, '#9aa3a8'); R(793, 47, 14, 1, '#9aa3a8');
      R(850, 64, 30, 14, '#bfe3ff'); T('WIFI: nfc', 865, 68, 4, INK, 'center');
      const pa = A('cats'), photo = (x, y, k, s) => { const c = CATS[k % CATS.length], bg = fade(['#9fc8e8', '#f3d27a', '#c8e6b0', '#e8b8c8', '#c8c0e8'][(k * 3) % 5]);
        R(x, y, 16 * s, 19 * s, fade('#f7f5ee')); R(x + s, y + s, 14 * s, 13 * s, bg); cat(x + 3 * s, y + 3 * s, c, s); R(x + 4 * s, y + 11 * s, 8 * s, 3 * s, c.f); R(x + 7 * s, y - 1, 2, 2, '#e85d5d'); };
      if (pa >= 0) { const n = Math.min(SLOTS.length, Math.floor(pa / 0.15 + 1));
        for (let k = 0; k < n; k++) { const slot = SLOTS[k], col = slot % 5, row = Math.floor(slot / 5), x = 785 + col * 21, y = 29 + row * 25 + Math.round(hash(k) * 2), drop = k === n - 1 ? Math.round(-3 * (1 - c01((pa - k * 0.15) / 0.1))) : 0;
          photo(x, y + drop, k === 4 || k === 9 ? 0 : k, 1); }
        if (pa > 1.9) { photo(817, 52, 0, 2); T('#CATS', 833, 82, 5, INK, 'center'); } }
      for (let k = 0; k < st.extra; k++) photo(781 + Math.floor(hash(k * 31 + 3) * 96), 22 + Math.floor(hash(k * 17 + 5) * 66), k * 2 + 1, 1);

      /* bureaucracy: one tiny desk, one stamp */
      const ba = A('bureaucracy');
      if (ba >= 0) { const dy = ba < 0.6 ? -Math.round((1 - ba / 0.6) ** 2 * 80) : 0;
        R(898, 58, 68, 13, '#5a6b8c'); R(899, 59, 66, 11, '#6c7fa4'); T('BUREAUCRACY', 932, 61, 5, '#ffffff', 'center'); if (ba > 0.6) { line(932, 72, 932, 118, '#5a6b8c'); line(928, 114, 932, 118, '#5a6b8c'); line(936, 114, 932, 118, '#5a6b8c'); }
        R(918, 132 + dy, 22, 2, '#8a6a48'); R(919, 134 + dy, 2, 12, '#6b4f36'); R(937, 134 + dy, 2, 12, '#6b4f36'); R(942, 138 + dy, 6, 2, '#6b4f36'); R(946, 130 + dy, 2, 16, '#6b4f36');
        R(921, 131 + dy, 10, 1, '#ffffff'); if (ba > 1.4 || st.stamps) R(924, 131 + dy, 3, 1, '#d03a3a');
        const lift = t - st.stampT < 0.3 || (ba > 1.1 && ba < 1.4) ? 0 : 3; R(933, 128 + dy - lift, 4, 3, '#2a2a2a'); R(934, 125 + dy - lift, 2, 3, '#8a5a32'); disc(935, 124 + dy - lift, 1, '#c8322c');
        if (ba > 1.4 && ba < 3.4) bubble('APPROVED', 926, 120); }
      if (ba >= 0) for (const p of st.papers) { const e = t - p.t0, k = c01(e / 1.6), x = 926 + p.d * (8 + k * 22 + p.k * 3) + Math.round(Math.sin(e * 7) * 3 * (1 - k)), y = Math.round(128 - Math.sin(k * Math.PI) * 20 + k * (20 + (p.k % 3) * 3));
        R(x - 3, y, 7, k < 1 ? 3 + Math.round(Math.sin(e * 9)) : 1, '#ffffff'); if (k < 1) R(x - 1, y + 1, 2, 1, '#d03a3a'); }

      /* clock, calendar, window: you can't rush it */
      const ta2 = A('time'), spin = ta2 >= 0 && q < 34;
      disc(990, 36, 10, '#3a4450'); disc(990, 36, 9, '#ffffff'); for (let k = 0; k < 12; k++) R(990 + Math.round(Math.cos(k * Math.PI / 6) * 7), 36 + Math.round(Math.sin(k * Math.PI / 6) * 7), 1, 1, '#8a8f94');
      const mh = spin ? ta2 * 9 : t * 0.1, hh = spin ? ta2 * 0.75 : t * 0.01;
      line(990, 36, 990 + Math.round(Math.sin(mh) * 7), 36 - Math.round(Math.cos(mh) * 7), INK); line(990, 36, 990 + Math.round(Math.sin(hh) * 4), 36 - Math.round(Math.cos(hh) * 4), '#d03a3a');
      R(976, 52, 28, 28, '#c8ccd2'); R(977, 53, 26, 26, '#ffffff'); R(977, 53, 26, 7, '#d03a3a'); T(['SPRING', 'SUMMER', 'AUTUMN', 'WINTER'][Math.floor(q) % 4], 990, 54, 4, '#ffffff', 'center'); T(String(year), 990, 63, 7, INK, 'center');
      if (spin && (ta2 % 0.75) < 0.25) { R(977, 60, 26, 3, '#e8e8e8'); }
      ctx.save(); ctx.beginPath(); ctx.rect(1014, 26, 76, 72); ctx.clip();
      const s0 = Math.floor(q) % 4, f = c01(((q % 1) - 0.6) / 0.4); view(1014, 26, 76, 72, s0, t); if (f > 0) { ctx.globalAlpha = f; view(1014, 26, 76, 72, (s0 + 1) % 4, t); ctx.globalAlpha = 1; } ctx.restore();
      R(1010, 22, 84, 4, '#f7f7f2'); R(1010, 98, 84, 4, '#f7f7f2'); R(1010, 22, 4, 80, '#f7f7f2'); R(1090, 22, 4, 80, '#f7f7f2'); R(1050, 26, 2, 72, '#f7f7f2'); R(1014, 60, 76, 2, '#f7f7f2'); R(1006, 101, 92, 3, '#d8d8d0');
      const ph = Math.min(28, 4 + ag * 16 + st.water * 3);
      for (const px of [1024, 1046, 1074]) { R(px - 3, 95, 7, 6, '#b0603a'); for (let k = 0; k < ph * (px === 1046 ? 1 : 0.7); k += 3) { R(px, 94 - k, 1, 3, '#3f7a3a'); R(px + (k % 6 ? 1 : -3), 93 - k, 3, 2, k % 6 ? '#5fae4a' : '#3f8a3a'); } }
      if (ag > 0) { const fx = 1000, h = Math.round(10 + ag * 40); R(fx - 5, 128, 11, 12, '#7a8a96'); for (let k = 0; k < h; k += 4) { R(fx, 127 - k, 1, 4, '#3f7a3a'); blob(fx + (k % 8 ? 4 : -4), 125 - k, 3, '#3f8a3a', '#5fae4a', '#2f6a30'); } }

      /* ageing: ivy along the ceiling, cobwebs */
      if (ag > 0) { const len = Math.round(ag * 900); for (let x = 1010; x > 1010 - len && x > 0; x -= 3) { const y = 10 + Math.round(Math.sin(x / 9) * 2); R(x, y, 3, 1, '#3f7a3a'); if (x % 9 === 0) R(x, y + 1, 3, 3, (x / 9) % 2 ? '#4f9c49' : '#3f8a3a'); if (x % 27 === 0) R(x + 1, y + 2, 1, 8 + Math.floor(hash(x) * 10), '#3f7a3a'); }
        if (ag > 0.5) for (const [cx, dir] of [[0, 1], [W, -1]]) { for (let k = 0; k < 4; k++) line(cx, 10, cx + dir * (14 - k * 3), 10 + k * 4, '#cfd4d8'); line(cx, 18, cx + dir * 10, 10, '#cfd4d8'); } }

      /* exit */
      R(EXIT - 12, 92, 24, 48, '#7f9a86'); R(EXIT - 9, 95, 18, 45, '#1b2030'); R(EXIT - 12, 80, 24, 9, '#2fb67c'); T('EXIT', EXIT, 81.5, 5, '#ffffff', 'center');

      /* docs: arrows on the floor to the free seat */
      if (da >= 0) for (let i = 0; i < 14; i++) { if (da < 1.6 + i * 0.12) break; const x = 488 + i * 18, y = 149; for (let k = 0; k < 4; k++) { R(x + k, y - 3 + k, 2, 1, LIGHT); R(x + k, y + 3 - k, 2, 1, LIGHT); } }

      /* Mo the Maintainer, and the welcome */
      let mo = MO_X, moFace = -1, moMv = false;
      if (wa >= 0 && wa < 1e3) { if (wa < 4.6) { mo = Math.min(552, MO_X + Math.max(0, wa - 0.2) * 90); moMv = mo < 552; moFace = 1; } else { mo = Math.max(MO_X, 552 - (wa - 4.6) * 90); moMv = mo > MO_X; moFace = moMv ? -1 : -1; } }
      this._mo = Math.round(mo);
      person(look('nfcore'), mo, 150, t, moFace, moMv);
      if (nb && !nb.back) { person(NEWBIE, nb.x, nb.f, t, nb.face, nb.mv); if (wa > 4) R(Math.round(nb.x) - 1, nb.f - 10, 3, 3, LIGHT); }
      if (wa > 3.4 && wa < 4) { const k = (wa - 3.4) / 0.6; R(Math.round(556 + k * 20) - 1, Math.round(140 - Math.sin(k * Math.PI) * 10), 3, 3, LIGHT); }
      if (wa > 2.6 && wa < 4.4) bubble('Have a sticker!', 552, 128);
      if (waving) { if (wa < 5) bubble('WELCOME!', 516, 110); if (wa > 3.2) bubble('HI!', 692, 112); if (wa > 4.2) bubble('WELCOME!', 644, 102); }

      /* dark until the lights come on, apart from the desk lamp */
      const dk = 1 - lit;
      if (dk > 0) { const lamp = has('story') ? 1 : 0;
        for (let x = 0; x < W; x += 2) { const pool = lamp ? c01((Math.abs(x - 84) - 18) / 46) : 1; ctx.fillStyle = `rgba(8,12,28,${0.62 * dk * (0.12 + 0.88 * pool)})`; ctx.fillRect(x, 0, 2, 180); } }

      /* the back story: every lab, its own pipeline */
      const sa0 = A('story');
      if (sa0 >= 0 && sa0 < 1e3) { const n = Math.min(STORY.length, Math.floor(sa0 / 1.1) + 1);
        for (let i = 0; i < n; i++) { const s = STORY[i], y = 98 - (n - i) * 12, w = Math.ceil(tw(s, 5)) + 8, x = 80 - Math.round(w / 2) + (i % 2 ? 6 : -4);
          R(x - 1, y - 1, w + 2, 11, INK); R(x, y, w, 9, i === STORY.length - 1 ? '#ffd9d9' : '#ffffff'); T(s, x + 4, y + 2, 5, i === STORY.length - 1 ? '#c02a2a' : INK); } }

      /* egg: approved in triplicate */
      const te = t - st.trip;
      if (te < 4.5) { const m = ctx.getTransform(), vx = -m.e / m.a, vw = ctx.canvas.width / m.a, a = c01(Math.min(te / 0.4, (4.5 - te) / 0.5));
        ctx.globalAlpha = a * 0.6; R(vx, 0, vw, 180, '#0b0f1c'); ctx.globalAlpha = a; const cx = Math.round(vx + vw / 2);
        for (let k = 2; k >= 0; k--) { const x = cx - 70 + k * 6, y = 18 + k * 6, rise = Math.round((1 - c01((te - k * 0.25) / 0.3)) * 160);
          R(x, y + rise, 140, 104, '#efe9d8'); R(x, y + rise, 140, 1, '#c8c0a8'); T(`FORM NFC-${k + 1}`, x + 8, y + 6 + rise, 5, '#5a6270');
          for (let r = 0; r < 7; r++) R(x + 8, y + 22 + r * 10 + rise, 100 - (r * 13) % 40, 1, '#b8b0a0'); }
        if (te > 0.9) { const x = cx - 58, y = 66; R(x, y, 116, 34, '#c02a2a'); R(x + 2, y + 2, 112, 30, '#efe9d8'); R(x + 3, y + 3, 110, 28, '#c02a2a'); R(x + 4, y + 4, 108, 26, '#efe9d8');
          T('APPROVED', cx, y + 6, 10, '#c02a2a', 'center'); T('IN TRIPLICATE', cx, y + 19, 6, '#c02a2a', 'center'); }
        ctx.globalAlpha = 1; }
    },
  };
};
