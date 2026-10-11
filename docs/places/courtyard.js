// Outdoor courtyard: rewrites.bio. Park gates, a three-armed signpost and a departures board.
(window.KEYNOTE_PLACES = window.KEYNOTE_PLACES || {}).courtyard = g => {
  const { R, T, disc, line, map2d, tri, blob, cumulus, person, hash, time, ctx } = g;
  const W = 820, EXIT = 798, GX = 114, POST = 244, DX = 560, DB = 104, BX = 627;
  const SIGNS = ['rewrite', 'upstream', 'combine'];
  const clamp = (v, a, b) => Math.max(a, Math.min(b, v));
  const ORANGE = '#e0602e';

  const CRAB = ['........o.o.o.o........', '......o..ooooo..o......', '.......ooooooooo.......', 'o.o.o.ooooooooooo.o.o.o', '.oo..ooooooooooooo..oo.', '..o..oooowkowkoooo..o..', '...ooooookkokkoooooo...', '....odooooooooooodo....', '...do.ddddddddddd.od...'];
  const SHUT = '.oo.o.ooooooooooo.o.oo.';
  const LEGS = [['....do.d.......d.od....', '.....d...........d.....', '......d.........d......'], ['....do.d.......d.od....', '.....d...........d.....', '....d.............d....']];
  const CRAB_PAL = { o: ORANGE, d: '#b84a20', w: '#ffffff', k: '#1b1b1b' };
  const crab = (x, feet, s, t, moving, shut) => {
    const body = shut ? CRAB.slice(0, 3).concat(SHUT, CRAB.slice(4)) : CRAB;
    map2d(body.concat(LEGS[moving ? Math.floor(t * 14) % 2 : 0]), Math.round(x) - 11 * s, Math.round(feet) - 12 * s, CRAB_PAL, s);
  };
  const tick = (x, y, c) => { line(x, y + 2, x + 2, y + 4, c); line(x + 2, y + 4, x + 6, y, c); line(x + 1, y + 2, x + 2, y + 3, c); };
  const outlined = (s, x, y, size, col, out, align) => { for (const [a, b] of [[-1, 0], [1, 0], [0, -1], [0, 1], [-1, -1], [1, 1], [1, -1], [-1, 1]]) T(s, x + a, y + b, size, out, align); T(s, x, y, size, col, align); };

  const LOOKS = {
    walker: { skin: '#f1c7a5', hair: '#d9b36a', hairStyle: 'long', top: '#4f9c6b', topStyle: 'tee', pants: '#2f3a55' },
    feeder: { skin: '#8d5a3b', hair: '#1f1f1f', hairStyle: 'short', top: '#e8c547', topStyle: 'sweat', pants: '#3b4a6b' },
    snapper: { skin: '#e8b894', hair: '#6b3f22', hairStyle: 'messy', top: '#3b6fb6', topStyle: 'hoodie', pants: '#2b2f36' },
    chaos: { skin: '#e8b894', hair: '#1b1b1b', hairStyle: 'messy', shades: true, top: '#232323', topStyle: 'sweat', pants: '#1b1b1b', shoes: '#111111' },
    founder: { skin: '#f2c8a8', hair: '#f4f4f4', hairStyle: 'short', beard: true, top: '#f2efe6', topStyle: 'sweat', pants: '#e8e4d8', shoes: '#8a6a4a' },
  };
  const MAL = 172, HAM = 154;
  const QUOTE = [[0, MAL, 'Your scientists were so preoccupied\nwith whether or not they could,\nthey didn’t stop to think if they should', 5.5], [5.7, HAM, 'Spared no expense!', 2.6]];
  let fx = 122;
  const cur = ev => (ev.beat ? ev.beat.id || ev.beat.at : '');

  const palm = (x, t, k) => {
    R(x - 8, 136, 16, 14, '#b4683e'); R(x - 9, 134, 18, 3, '#cf7c4c'); R(x - 8, 142, 16, 1, '#9a5532');
    const sway = Math.sin(t * 0.9 + x) * 1.5 + k, top = 64;
    for (let y = 134; y > top; y -= 3) { const bx = Math.round(x + (134 - y) * 0.06 + sway * (134 - y) / 70); R(bx - 2, y - 3, 5, 3, '#8a6a4a'); R(bx - 2, y - 1, 5, 1, '#6d5238'); }
    const cx = Math.round(x + (134 - top) * 0.06 + sway), cy = top;
    for (let f = 0; f < 7; f++) {
      const a = -Math.PI + f * Math.PI / 6 + Math.sin(t * 1.3 + f) * 0.06 + k * 0.05;
      for (let j = 0; j < 16; j++) {
        const px = Math.round(cx + Math.cos(a) * j * 1.4), py = Math.round(cy + Math.sin(a) * j * 1.1 + j * j * 0.045);
        R(px, py, 2, 2, f % 2 ? '#2f7a3a' : '#3f8f45'); if (j > 3 && j % 2) R(px, py + 2, 1, 2, '#58a852');
      }
    }
    disc(cx - 2, cy + 3, 2, '#6b4a2f'); disc(cx + 2, cy + 4, 2, '#5b3f2a');
  };

  const gates = (st, t) => {
    const o = st.gate, lit = st.torch;
    R(86, 64, 56, 82, '#244a30'); R(86, 64, 56, 10, '#1d3d27');
    for (let i = 0; i < 9; i++) blob(90 + i * 6.5, 88 + (i % 3) * 14, 6, '#2f6e3d', '#3f8a4a', '#25553a');
    R(108, 112, 12, 34, '#6b5a3e'); R(110, 112, 8, 34, '#7d6a4a');
    const door = (x0, w, dir) => {
      const shade = o > 0.5 ? '#4f3622' : '#6b4a2f';
      R(x0, 66, w, 80, shade); for (let x = x0; x < x0 + w; x += 4) R(x, 66, 1, 80, '#3f2a1a');
      R(x0, 74, w, 3, '#3a2818'); R(x0, 132, w, 3, '#3a2818'); if (w > 8) line(x0 + 1, 132, x0 + w - 2, 77, '#3a2818');
      for (let x = x0 + 1; x < x0 + w - 1; x += 4) { R(x, 62, 2, 4, '#3a2818'); R(x, 61, 1, 1, '#5b4632'); }
      if (dir && w > 6) { R(dir > 0 ? x0 + w - 3 : x0 + 1, 100, 2, 6, '#c8a14a'); }
    };
    const w = Math.max(3, Math.round(28 * (1 - 0.88 * o)));
    door(86, w, 1); door(142 - w, w, -1);
    for (const px of [70, 142]) {
      R(px, 34, 16, 112, '#5b4030'); R(px + 2, 34, 3, 112, '#6d4f3b'); R(px + 12, 34, 4, 112, '#4a3424');
      for (let y = 44; y < 146; y += 12) R(px, y, 16, 1, '#3f2c1f');
      for (let i = 0; i < 9; i++) { const vy = 50 + Math.floor(hash(px + i) * 90), vx = px + Math.floor(hash(px * 3 + i) * 14); R(vx, vy, 2, 3, '#4f8f45'); R(vx + 1, vy + 3, 1, 3, '#3f7a3a'); }
      R(px - 2, 26, 20, 4, '#3b3f47'); R(px, 30, 16, 4, '#2b2e31');
      if (lit) for (let i = 0; i < 4; i++) { const h = 6 + Math.round(Math.sin(t * 7 + i * 1.9 + px) * 2); R(px + 2 + i * 3, 26 - h, 3, h, i % 2 ? '#f5a623' : '#ff7a2e'); R(px + 3 + i * 3, 27 - Math.round(h * 0.6), 1, Math.round(h * 0.5), '#ffd166'); }
    }
    R(64, 38, 100, 7, '#4a3424'); R(64, 38, 100, 2, '#5b4030');
    R(70, 45, 88, 19, '#1d1a16'); R(71, 46, 86, 17, '#2a241d'); R(70, 45, 88, 1, '#c8a14a'); R(70, 63, 88, 1, '#c8a14a');
    outlined('REWRITES.BIO', GX, 50, 8, '#d8402a', '#ffd166', 'center');
  };

  const arm = (x0, x1, y, h, dir, on, lines, t) => {
    const fill = on ? '#ffd166' : '#cdb98f', ink = on ? '#1b2332' : '#6b5a3e', edge = on ? '#1b2332' : '#5a4630';
    R(x0, y, x1 - x0, h, edge); R(x0 + 1, y + 1, x1 - x0 - 2, h - 2, fill);
    const tipX = dir < 0 ? x0 : x1, half = Math.floor(h / 2);
    for (let i = 0; i <= half; i++) { const wd = half - i; R(dir < 0 ? tipX - i - 1 : tipX + i, y + i, 1, h - 2 * i, edge); if (i < half) R(dir < 0 ? tipX - i : tipX + i - 1, y + i + 1, 1, Math.max(0, h - 2 * i - 2), fill); }
    lines.forEach((s, i) => T(s, (x0 + x1) / 2, y + 3 + i * 8, 6, ink, 'center'));
    if (on) for (let x = x0 + 2; x < x1 - 1; x += 4) { const b = Math.floor(t * 3 + x / 4) % 2 ? '#fff6d6' : '#f5a623'; R(x, y - 2, 2, 1, b); R(x, y + h + 1, 2, 1, b); }
  };

  const easel = (id, t) => {
    R(194, 116, 2, 34, '#6d5238'); R(232, 116, 2, 34, '#6d5238');
    R(188, 113, 52, 31, '#3b3f47'); R(190, 115, 48, 27, '#f7f3ea');
    const k = (t % 3.5) / 3.5, old = '#9aa0a6', nu = ORANGE, ink = '#1b2332';
    if (id === 'rewrite') {
      R(194, 122, 12, 12, old); R(194, 122, 12, 1, '#b8bdc2'); if (k > 0.2) { line(198, 122, 201, 127, '#5f656b'); line(201, 127, 199, 133, '#5f656b'); }
      R(209, 127, 6, 2, ink); tri(215, 128, 1, ink);
      for (let i = 0; i < 4; i++) if (k > 0.2 + i * 0.15) R(221 + (i % 2) * 7, 128 - Math.floor(i / 2) * 7, 6, 6, nu);
    } else if (id === 'upstream') {
      R(196, 118, 26, 11, old); R(196, 118, 26, 1, '#b8bdc2'); if (k > 0.7) R(196, 126, 26, 3, nu);
      if (k <= 0.7) R(206, Math.round(138 - Math.min(1, k / 0.6) * 9), 6, 4, nu);
      R(229, 125, 2, 12, ink); R(226, 125, 8, 1, ink); R(227, 124, 6, 1, ink); R(228, 123, 4, 1, ink); R(229, 122, 2, 1, ink);
    } else if (id === 'combine') {
      const m = Math.min(1, k * 2.2);
      if (m < 1) for (const [x0, y0] of [[194, 120], [222, 120], [208, 132]]) R(Math.round(x0 + (208 - x0) * m), Math.round(y0 + (126 - y0) * m), 8, 8, old);
      else { R(206, 124, 12, 12, nu); tick(220, 117, '#2fb67c'); }
    } else { crab(214, 136, 1, t, false); T('?', 228, 117, 7, '#586274'); }
  };

  const bread = (x, y, n) => { const xx = Math.round(x) - 1, yy = Math.round(y); R(xx, yy, n, 2, '#efd08e'); R(xx, yy, n, 1, '#b5793a'); if (n > 2) R(xx + n - 1, yy, 1, 2, '#b5793a'); };
  const pond = (st, id, t) => {
    R(272, 130, 74, 16, '#a9a497'); R(272, 130, 74, 2, '#c4bfb1'); for (let x = 276; x < 346; x += 9) R(x, 134 + (x % 2), 6, 1, '#918c80');
    R(275, 126, 68, 5, '#4f8cc0'); R(275, 126, 68, 1, '#78b6ea');
    for (let i = 0; i < 6; i++) { const x = 276 + ((i * 13 - t * 6) % 64 + 64) % 64; R(Math.round(x), 128 + (i % 2), 3, 1, '#9cc3dd'); }
    R(288, 127, 4, 2, '#3f8f45'); R(318, 128, 5, 2, '#3f8f45'); R(320, 127, 1, 1, '#ff9fc4');
    R(338, 114, 6, 12, '#a9a497'); R(337, 112, 7, 3, '#c4bfb1'); disc(338, 114, 2, '#9aa0a6');
    for (let i = 0; i < 5; i++) { const p = ((t * 0.9 + i / 5) % 1), x = Math.round(336 - p * 10), y = Math.round(114 - Math.sin(p * Math.PI) * 6 + p * 10); R(x, y, 1, 1, '#cfe4f2'); }
    for (let i = 0; i < 2; i++) {
      const dx = 300 + Math.round(Math.sin(t * 0.35 + i * 2.4) * 18 + i * 6), face = Math.cos(t * 0.35 + i * 2.4) > 0 ? 1 : -1, y = 124 + Math.round(Math.sin(t * 2 + i));
      R(dx - 3, y, 7, 3, '#f2f2f2'); R(dx - 3, y + 2, 7, 1, '#d8d8d8'); R(dx + (face > 0 ? 2 : -3), y - 2, 2, 2, i ? '#2f7a4a' : '#f2f2f2'); R(dx + (face > 0 ? 4 : -4), y - 1, 1, 1, '#f5a623');
    }
    if (id === 'upstream') {
      const p = (t * 0.12) % 1, bx = Math.round(278 + p * 56), by = 123 + Math.round(Math.sin(t * 3));
      R(bx - 3, by + 2, 7, 1, '#ffffff'); R(bx - 2, by + 3, 5, 1, '#dfe7f1'); line(bx, by + 1, bx, by - 3, '#ffffff'); R(bx + 1, by - 2, 2, 2, ORANGE);
      outlined('UPSTREAM >', 306, 112, 5, '#ffffff', '#2f6fd6', 'center');
    }
    for (const c of st.crumbs) {
      const f = (t - c.t) / 0.7;
      if (f < 1) { const x = c.from + (c.x - c.from) * f, y = 136 + (126 - 136) * f - Math.sin(f * Math.PI) * 16; bread(x, y, 3); continue; }
      const r = t - c.t - 0.7;
      if (r < 1.4) for (let i = 0; i < 2; i++) { const w = Math.round(r * 10 + i * 5); if (w > 2) { R(Math.round(c.x) - w - 2, 128 + i, 3, 1, '#cfe4f2'); R(Math.round(c.x) + w, 128 + i, 3, 1, '#cfe4f2'); } }
      if (!c.gone) bread(c.x, 126 + Math.round(Math.sin(t * 2 + c.x)), c.bite ? 2 : 3);
    }
  };

  // f: walk frame 0-3, or -1 standing. Facing right mirrors about the feet.
  const dinoBody = (ox, by, face, f, dy, glow, blink) => {
    const c = '#9a9f97', hi = '#b8bdb4', lo = '#7a7f78', s = f < 0 ? 0 : [1, 0, -1, 0][f], b = by + dy - (f % 2 ? 1 : 0);
    if (face > 0) { ctx.save(); ctx.translate(2 * ox + 40, 0); ctx.scale(-1, 1); }
    R(ox + 34, b - 32, 10, 10, c); R(ox + 42, b - 28, 10, 7, c); R(ox + 50, b - 24, 8, 5, c); R(ox + 56, b - 21, 6, 3, c); R(ox + 60, b - 19, 4, 2, lo);
    R(ox + 12 - 3 * s, b - 14, 6, by - b + 12, lo); R(ox + 9 - 3 * s, by - 2 - (s > 0 ? 2 : 0), 10, 2, lo);
    R(ox + 8, b - 34, 28, 18, c); R(ox + 12, b - 34, 20, 2, hi); R(ox + 8, b - 20, 28, 4, lo);
    R(ox + 18, b - 20, 12, 12, c); R(ox + 19, b - 20, 4, 8, hi); R(ox + 22 + 3 * s, b - 8, 6, by - b + 6, c); R(ox + 18 + 3 * s, by - 2 - (s < 0 ? 2 : 0), 12, 2, c);
    R(ox + 8, b - 28, 4, 2, lo); R(ox + 7, b - 26, 2, 3, lo);
    R(ox + 6, b - 48, 10, 14, c); R(ox + 10, b - 40, 10, 8, c);
    const hy = b - 58;
    R(ox - 10, hy, 22, 10, c); R(ox - 10, hy, 22, 2, hi); R(ox - 14, hy + 3, 4, 7, c); R(ox - 13, hy + 4, 1, 1, lo);
    for (let x = ox - 13; x < ox + 6; x += 3) R(x, hy + 10, 1, 2, '#e8e6dc');
    R(ox - 12, hy + 10, 18, 4, c); R(ox - 12, hy + 13, 18, 1, lo); for (let x = ox - 11; x < ox + 4; x += 3) R(x, hy + 9, 1, 1, '#e8e6dc');
    if (blink) R(ox + 1, hy + 4, 4, 1, lo); else { R(ox + 1, hy + 3, 3, 3, '#6a6f68'); if (glow) { R(ox + 1, hy + 3, 3, 3, '#ffd166'); R(ox + 2, hy + 3, 1, 3, '#1b1b1b'); } }
    R(ox + 1, hy + 2, 5, 1, lo);
    for (let i = 0; i < 6; i++) R(ox + 10 + i * 6, b - 35 - (i % 2), 3, 2, '#6f8f5a');
    if (face > 0) ctx.restore();
  };

  // Once it leaves it turns, so it is drawn in front of the departures board from then on.
  const HOP = 1.7, LAND = 2.3, WALK = 2.6, FEET = 140;
  const dino = (st, t, front) => {
    const k = st.leave != null ? t - st.leave : -1, pk = st.dinoT != null ? t - st.dinoT : 99;
    if (!front) {
      R(DX - 4, DB, 62, 24, '#cfc6b2'); R(DX - 6, DB - 1, 66, 3, '#e0d8c6'); R(DX - 4, DB + 21, 62, 3, '#b3a990'); R(DX + 9, DB + 7, 40, 10, '#b3a990'); T('LEGACY', DX + 29, DB + 9, 5, '#f7f3ea', 'center');
      if (k < 0) dinoBody(DX, DB, -1, -1, 0, pk < 1.6, pk > 0.7 && pk < 0.9);
      else if (k < 0.6) dinoBody(DX + Math.round(Math.sin(t * 30)), DB, -1, -1, 0, true, false);
      return;
    }
    if (k < 0.6) return;
    if (k < 1.4) return dinoBody(DX + Math.round((k - 0.6) * 30), DB, 1, Math.floor(k * 8) % 4, 0, true, false);
    if (k < HOP) return dinoBody(DX + 24, DB, 1, -1, 2, true, false);
    if (k < LAND) { const p = (k - HOP) / (LAND - HOP); return dinoBody(DX + 24 + Math.round(p * 36), Math.round(DB + (FEET - DB) * p - Math.sin(p * Math.PI) * 14), 1, -1, 0, true, false); }
    if (k < WALK) {
      const d = Math.round((k - LAND) * 30);
      for (const sx of [-1, 1]) { R(DX + 80 + sx * (12 + d), FEET - 3 - (d >> 2), 3, 2, '#e8dcc0'); R(DX + 80 + sx * (8 + d), FEET - 1, 2, 1, '#e8dcc0'); }
      return dinoBody(DX + 60, FEET, 1, -1, 2, true, false);
    }
    const ox = DX + 60 + Math.round((k - WALK) * 50);
    if (ox < W + 30) dinoBody(ox, FEET, 1, Math.floor(k * 8) % 4, 0, true, false);
  };

  // Rows follow the signpost arms' order: rewrite, upstream, combine.
  const ROWS = { rustar: ['RUSTAR', 'REWRITE', '99.9%'], fastqc: ['FASTQC-RUST', 'UPSTREAM', '12.4X'], rustqc: ['RUSTQC', 'COMBINE', '>60X'] };
  const BOARD = Object.keys(ROWS), COLS = [[0, 11, '#f7f3ea'], [12, 8, '#ffd166'], [21, 7, '#2fb67c']], FLAPS = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789-';
  const board = (st, t) => {
    R(BX + 12, 96, 3, 32, '#3b3f47'); R(BX + 142, 96, 3, 32, '#3b3f47');
    R(BX, 38, 157, 60, '#1b2332'); R(BX + 2, 40, 153, 56, '#0e1424'); R(BX, 38, 157, 1, '#ffd166');
    T('DEPARTURES', BX + 6, 43, 7, '#ffd166');
    const hh = (10 + Math.floor(t / 60)) % 24, mm = Math.floor(t) % 60;
    T(`${String(hh).padStart(2, '0')}${Math.floor(t * 2) % 2 ? ':' : ' '}${String(mm).padStart(2, '0')}`, BX + 151, 44, 5, '#f7f3ea', 'right');
    ['TOOL', 'ROUTE', 'RESULT'].forEach((s, i) => T(s, BX + 6 + COLS[i][0] * 5, 54, 5, '#7f8aab'));
    BOARD.forEach((key, r) => {
      const y = 61 + r * 11, f = st.row && r === st.row.p ? t - st.row.at : st.row && r < st.row.p ? 99 : -1;
      COLS.forEach(([c0, n, col], i) => { const word = ROWS[key][i];
        for (let j = 0; j < n; j++) {
          const x = BX + 6 + (c0 + j) * 5, ch = word[j] || ' ', due = 0.2 + (c0 + j) * 0.05, flip = f >= 0 && f < due;
          R(x, y, 4, 9, '#232c40'); R(x, y + 4, 4, 1, '#0a0f1a');
          if (f < 0) continue;
          const c = flip ? FLAPS[Math.floor(hash(j + r * 31 + Math.floor(t * 18)) * FLAPS.length)] : ch;
          if (c !== ' ') T(c, x + 2, y + 1.5, 5, flip ? '#9aa3bd' : col, 'center');
          if (flip && Math.floor(t * 18 + j) % 2) R(x, y, 4, 4, '#2e3953');
        }
      });
    });
  };

  return {
    width: W, floor: 154, spawn: 24, exit: EXIT,
    get host() { return fx; },
    focus: { gates: GX, sign: 266, board: 740 },
    props: [
      { id: 'palm', x: 36, label: 'Shake the palm tree' },
      { id: 'pond', x: 278, label: 'Throw bread in the pond' },
      { id: 'pair', x: MAL, label: 'Listen in' },
      { id: 'dino', x: DX + 36, label: 'Poke the dinosaur' },
    ],
    enter(st) {
      fx = 122; st.quote = null; st.said = 0; st.bread = 0; st.gulls = []; st.crumbs = []; st.flock = null; st.gate = 0; st.torch = false; st.cocos = []; st.shakes = 0; st.palmFall = null; st.dinoN = 0; st.clicks = 0; st.npcs = [
        { L: LOOKS.walker, x: 420, face: 1, home: t => 390 + (Math.sin(t * 0.13) * 0.5 + 0.5) * 100, coffee: true },
        { L: LOOKS.feeder, x: 358, face: -1, face0: -1, home: () => 358 },
        { L: LOOKS.snapper, x: 470, face: 1, face0: 1, home: () => 470, camera: true },
      ];
    },
    update(dt, st, ev) {
      const t = time(), id = cur(ev), rT = st.leave != null ? t - st.leave : 99, flee = rT > HOP && rT < 8;
      const open = rT < 8 ? 0 : ev.beatIdx > 0 || (ev.beatIdx === 0 && !ev.walking) ? 1 : 0;
      if (open) st.torch = true;
      st.gate += clamp(open - st.gate, -dt * (rT < 8 ? 2.5 : 0.7), dt * 0.7);
      // at the board Ferris must stay further from the hero than the dinosaur, or Action walks to him instead
      const ft = flee ? 900 : BOARD.includes(id) ? 532 : SIGNS.includes(id) ? 300 : 122;
      const fdx = ft - fx; st.fMoving = Math.abs(fdx) > 0.5; fx += Math.sign(fdx) * Math.min(Math.abs(fdx), (flee ? 170 : 80) * dt);
      for (const n of st.npcs) {
        const tg = flee ? 900 + n.home(t) : n.home(t), dx = tg - n.x, sp = flee ? 120 : rT < 12 && n.x > n.home(t) + 2 ? 60 : 28;
        n.moving = Math.abs(dx) > 0.4; if (n.moving) { n.x += Math.sign(dx) * Math.min(Math.abs(dx), sp * dt); n.face = Math.sign(dx); } else if (n.face0) n.face = n.face0;
      }
      if (flee && !st.yelled) { st.yelled = true; st.npcs.forEach((n, i) => g.say(['Run!', 'Aaah!', 'Not again!'][i], n.x, 128, 1.6)); }
      if (rT > 8) st.yelled = false;
      if (st.quote == null && g.heroX() > 90) st.quote = t;
      while (st.quote != null && st.said < QUOTE.length && t - st.quote >= QUOTE[st.said][0]) { const [, x, s, secs] = QUOTE[st.said++]; g.say(s, x, 128, secs); }
      if (st.flock != null && t - st.flock > 14) { st.flock = null; st.bread = 0; st.gulls = []; st.crumbs = []; }
      // the first few gulls drop to the water, eat a floating chunk and fly off again
      for (const c of st.crumbs) if (!c.claimed && t - c.t > 0.7) { const q = st.gulls.find((q, i) => i < 4 && !q.c && t - q.at > 1.6); if (q) { c.claimed = true; q.c = c; q.dive = t; } }
      for (const q of st.gulls) if (q.c) { const ph = t - q.dive; if (ph > 1.8) q.c.bite = true; if (ph > 2.4) q.c.gone = true; if (ph > 3.6) q.c = null; }
      st.crumbs = st.crumbs.filter(c => !c.gone);
      st.cocos.forEach(c => { if (c.y < 148) { c.vy += 300 * dt; c.y = Math.min(148, c.y + c.vy * dt); } else if (Math.abs(c.vx) > 1) { c.x += c.vx * dt; c.vx *= 1 - dt * 2; } });
      const p = BOARD.indexOf(id);
      if (p < 0) { if (ev.beat) st.row = null; }
      else if (!ev.walking && (!st.row || st.row.p !== p)) st.row = { p, at: t };
    },
    poke(id, st) {
      const t = time();
      if (id === 'palm') {
        if (st.palmFall != null) return 'It has had enough';
        st.palmT = t; if (st.cocos.length < 6) st.cocos.push({ x: 40 + (st.cocos.length % 3) * 3, y: 68, vy: 0, vx: (st.cocos.length % 2 ? 1 : -1) * 30 });
        const n = ++st.shakes;
        if (n === 6) g.say('No more coconuts', 36, 128); else if (n === 8) g.say('*creak*', 36, 128);
        else if (n === 10) { st.palmFall = t; g.say('TIMBER!', 36, 128); g.egg('palm', 'You felled the palm tree'); }
        return true; }
      if (id === 'pond') { st.crumbs.push({ x: 288 + hash(st.bread * 7 + 1) * 46, from: g.heroX() + 4, t }); if (st.flock != null) return true;
        const n = ++st.bread; if (n >= 2) while (st.gulls.length < Math.min(10, (n - 1) * 2)) st.gulls.push({ at: t + st.gulls.length % 2 * 0.4 });
        if (n === 10) { st.flock = t; g.egg('gulls', 'You summoned the gulls'); st.npcs.forEach((p, i) => g.say(['My sandwich!', 'Not the gulls!', 'Run!'][i], p.x, 128, 2)); }
        return true; }
      if (id === 'pair') { if (st.said >= QUOTE.length) { st.quote = t; st.said = 0; } return true; }
      if (id === 'dino') {
        if (st.leave != null) return 'Life found a way';
        st.dinoT = t; if (++st.dinoN === 3) { st.leave = t; g.egg('dino', 'The dinosaur escaped'); }
        return true;
      }
      if (id === 'host') { st.clickT = t; g.say(['Click click!', 'I only go sideways', 'No garbage collector. Just me.', 'Snip snip!'][st.clicks++ % 4], fx, 132); return true; }
    },
    draw(st, ev) {
      const t = time(), id = ev.beat && !ev.walking ? cur(ev) : '';
      R(0, 0, W, 112, '#c4e1f6');
      ['#5fa8e6', '#72b4ea', '#86c0ee', '#9bcbf1', '#b0d7f4', '#c4e1f6'].forEach((c, i) => R(0, i * 9, W, 10, c));
      for (let i = 0; i < 6; i++) cumulus(Math.round(((i * 160 + t * 4) % (W + 120)) - 60), 12 + (i * 11) % 22, i % 2 ? 1.1 : 0.8);
      for (let bx = -20, k = 0; bx < W; bx += 118, k++) {
        const top = 30 + Math.floor(hash(k + 5) * 14), bw = 104;
        R(bx, top, bw, 112 - top, k % 2 ? '#d6c9ad' : '#cbbd9f'); R(bx, top, bw, 3, '#e4d9c2');
        for (let y = top + 8; y < 104; y += 12) for (let x = bx + 6; x < bx + bw - 8; x += 12) { R(x, y, 8, 7, '#5d7891'); R(x, y, 8, 1, '#8fb1cc'); if (hash(k * 50 + x + y) > 0.85) R(x + 1, y + 2, 6, 4, '#ffe9a8'); }
      }
      R(0, 108, W, 20, '#3f7a3a'); for (let x = 0; x < W; x += 14) blob(x + 7, 110 + (x % 3), 7, '#3f7a3a', '#58a852', '#2f6e2f');
      dino(st, t);
      board(st, t);
      R(0, 128, W, 18, '#d9cdb4'); for (let x = 0; x < W; x += 16) { R(x, 128, 1, 18, '#c4b79c'); R(x + 8, 137, 1, 9, '#c4b79c'); } R(0, 137, W, 1, '#c4b79c');
      dino(st, t, true);
      R(0, 146, W, 34, '#c9b48a'); R(0, 146, W, 1, '#b39d72'); for (let x = 0; x < W; x += 12) { R(x, 146, 1, 34, '#b8a275'); R(x + 6, 156, 6, 1, '#b39d72'); }
      R(0, 24, 30, 126, '#c2b393'); R(0, 24, 30, 3, '#d8cbb0'); R(4, 70, 22, 80, '#2b3a4f'); R(6, 72, 18, 78, '#9cc3dd'); R(14, 72, 2, 78, '#2b3a4f'); R(8, 76, 2, 20, '#d6ecf8');
      pond(st, id, t);
      gates(st, t);
      R(POST - 2, 50, 5, 100, '#6d5238'); R(POST - 1, 50, 2, 100, '#8a6a4a'); R(POST - 4, 46, 9, 5, '#5b4632');
      easel(id, t);
      arm(196, POST - 3, 56, 13, -1, id === 'rewrite', ['REWRITE'], t);
      arm(POST + 3, 330, 74, 21, 1, id === 'upstream', ['CONTRIBUTE', 'UPSTREAM'], t);
      arm(200, POST - 3, 96, 13, -1, id === 'combine', ['COMBINE'], t);
      // shaken too often, it tips over on the pot's right edge
      const pf = st.palmFall != null ? Math.min(1, (t - st.palmFall) / 0.8) : 0;
      if (pf) { ctx.save(); ctx.translate(48, 150); ctx.rotate(pf * pf * 1.45); ctx.translate(-48, -150); }
      palm(40, t, pf ? 0 : st.palmT != null && t - st.palmT < 1 ? Math.sin((t - st.palmT) * 18) * 3 * (1 - (t - st.palmT)) : 0);
      if (pf) ctx.restore();
      palm(500, t, 0);
      st.cocos.forEach(c => disc(Math.round(c.x), Math.round(c.y), 2, '#6b4a2f'));
      for (const n of st.npcs) {
        person(n.L, n.x, 154, t, n.face, n.moving);
        if (n.coffee && !n.moving) R(Math.round(n.x) + n.face * 5, 141, 2, 3, '#f7f3ea');
        if (n.camera && !n.moving) { const up = Math.sin(t * 0.7) > 0.3; R(Math.round(n.x) + n.face * 4, up ? 137 : 142, 4, 3, '#2b2e31'); if (up && Math.sin(t * 0.7) > 0.95) R(Math.round(n.x) + n.face * 6, 136, 1, 1, '#ffffff'); }
        if (n.L === LOOKS.feeder && !n.moving) { const p = (t * 0.6) % 1; R(Math.round(n.x - 8 - p * 14), Math.round(140 + p * p * 12), 1, 1, '#e8c547'); }
      }
      person(LOOKS.founder, HAM, 154, t, 1, false); R(HAM - 4, 133, 8, 1, '#e8dcb5'); R(HAM - 3, 130, 6, 3, '#e8dcb5'); R(HAM - 3, 132, 6, 1, '#8a6a4a'); line(HAM + 5, 144, HAM + 6, 153, '#6b4a2f'); disc(HAM + 5, 143, 1, '#d9a53a');
      person(LOOKS.chaos, MAL, 154, t, -1, false); R(MAL - 1, 143, 2, 2, LOOKS.chaos.skin);
      const clicking = st.clickT != null && t - st.clickT < 1.2, fr = Math.round(fx) + (st.fMoving ? 0 : Math.round(Math.sin(t * 1.5) * 2));
      crab(fr, 154, 2, t, st.fMoving || Math.sin(t * 1.5) > 0.9, clicking ? Math.floor(t * 8) % 2 : Math.sin(t * 0.8) > 0.97);
      R(EXIT - 12, 100, 24, 50, '#f7f3ea'); R(EXIT - 9, 103, 18, 47, '#1b2030'); R(EXIT - 12, 88, 24, 9, '#2fb67c'); T('EXIT', EXIT, 89.5, 5, '#ffffff', 'center');
      R(812, 24, 8, 126, '#c2b393');
      const gull = (x, y, i) => { const f = Math.sin(t * 9 + i * 1.3) > 0 ? 1 : 0, xx = Math.round(x), yy = Math.round(y); line(xx - 3, yy - f, xx, yy + 1, '#f7f7f7'); line(xx, yy + 1, xx + 3, yy - f, '#f7f7f7'); };
      st.gulls.forEach((q, i) => { const k = clamp((t - q.at) / 1.6, 0, 1), e = 1 - k;
        const bx = 306 + Math.sin(t * 0.9 + i * 2.1) * (30 + i * 3) + e * 260, by = 64 + (i % 5) * 9 + Math.sin(t * 1.7 + i) * 5 - e * 70;
        if (!q.c) return gull(bx, by, i);
        const ph = t - q.dive, sx = q.c.x - 4, sy = 124, ease = v => v * v * (3 - 2 * v);
        if (ph < 1.2) { const a = ease(ph / 1.2); return gull(bx + (sx - bx) * a, by + (sy - 2 - by) * a, i); }
        if (ph > 2.4) { const a = ease(Math.min(1, (ph - 2.4) / 1.2)); return gull(sx + (bx - sx) * a, sy - 2 + (by - sy + 2) * a, i); }
        const pk = Math.floor(ph * 6) % 2, x = Math.round(sx);
        R(x - 3, sy, 6, 2, '#f7f7f7'); R(x - 3, sy + 1, 6, 1, '#d8d8d8'); R(x - 3, sy, 2, 1, '#9aa0a6'); R(x + 2, sy - 2 + pk, 2, 2, '#f7f7f7'); R(x + 4, sy - 1 + pk, 1, 1, '#f5a623'); });
      if (st.flock != null) { const ft = t - st.flock, k = clamp(ft / 2.5, 0, 1), up = Math.max(0, ft - 11) * 90, hx = g.heroX();
        for (let i = 0; i < 320; i++) { const r = 40 + hash(i) * 170, a = t * (0.5 + hash(i + 7) * 0.6) + i * 2.4;
          gull(hx + Math.cos(a) * r + (1 - k) * (500 + hash(i + 3) * 300), 16 + hash(i + 11) * 120 + Math.sin(a * 1.7) * 10 - up - (1 - k) * 60, i); } }
      for (let i = 0; i < 10; i++) { const x = ((t * (18 + i * 2) + i * 97) % (W + 40)) - 20, y = 40 + i * 9 + Math.sin(t * 2 + i) * 5; R(Math.round(x), Math.round(y), 2, 1, i % 3 ? '#58a852' : '#d9b45a'); R(Math.round(x) + 1, Math.round(y) + 1, 1, 1, i % 3 ? '#3f8f45' : '#c9953f'); }
    },
    drawFront() { g.storm(0, 0, W, 180); },
  };
};
