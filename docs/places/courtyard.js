// Outdoor courtyard: rewrites.bio. Park gates, a three-armed signpost and a race track.
(window.KEYNOTE_PLACES = window.KEYNOTE_PLACES || {}).courtyard = g => {
  const { R, T, disc, line, map2d, tri, blob, cumulus, person, hash, time } = g;
  const W = 820, EXIT = 798, GX = 114, POST = 244, S0 = 620, S1 = 752, DX = 592, DB = 104;
  const RACES = ['rustqc', 'rustar', 'fastqc'], SIGNS = ['rewrite', 'upstream', 'combine'];
  const clamp = (v, a, b) => Math.max(a, Math.min(b, v));
  const ORANGE = '#e0602e';

  const CRAB = ['.oo..........oo.', 'o..o........o..o', 'oo.o..w..w..o.oo', '.ooo..k..k..ooo.', '...oooooooooo...', '..ooaaaaaaaaoo..', '.oooooooooooooo.', '..dddddddddddd..'];
  const SHUT = ['................', 'oooo........oooo'];
  const LEGS = [['.o.o.o....o.o.o.', 'o.o.o......o.o.o'], ['..o.o.o..o.o.o..', '.o.o.o....o.o.o.']];
  const CRAB_PAL = { o: ORANGE, a: '#f59a62', d: '#b84a20', w: '#ffffff', k: '#1b1b1b' };
  const crab = (x, feet, s, t, moving, shut) => {
    const rows = (shut ? SHUT.concat(CRAB.slice(2)) : CRAB).concat(LEGS[moving ? Math.floor(t * 14) % 2 : 0]);
    map2d(rows, Math.round(x) - 8 * s, Math.round(feet) - 10 * s, CRAB_PAL, s);
  };
  const TORT = ['....ssssss......', '..ssSSssSSss....', '.sSSssSSssSSs.hk', '.sssssssssssshhh', 'hddddddddddddhh.'];
  const TLEG = [['..hh...hh...hh..'], ['.hh...hh....hh..']];
  const TORT_PAL = { s: '#3f7a3a', S: '#6aa84f', h: '#9bb36a', k: '#1b1b1b', d: '#c9b46a' };
  const tortoise = (x, feet, t, moving, kind) => {
    const x0 = Math.round(x) - 8, y0 = Math.round(feet) - 6;
    map2d(TORT.concat(TLEG[moving ? Math.floor(t * 4) % 2 : 0]), x0, y0, TORT_PAL);
    if (kind === 'star') { R(x0 + 6, y0, 1, 3, '#ffd166'); R(x0 + 5, y0 + 1, 3, 1, '#ffd166'); }
    if (kind === 'java') { R(x0 + 5, y0 - 3, 4, 3, '#f7f3ea'); R(x0 + 9, y0 - 2, 1, 1, '#f7f3ea'); R(x0 + 6, y0 - 2, 2, 1, '#6b4a2f'); if (Math.sin(t * 3) > 0) R(x0 + 6, y0 - 5, 1, 1, '#dfe7f1'); else R(x0 + 7, y0 - 6, 1, 1, '#dfe7f1'); }
  };
  const medal = (x, y, c) => { line(x - 3, y - 5, x, y, '#2f6fd6'); line(x + 3, y - 5, x, y, '#d8402a'); disc(x, y + 2, 2, c); R(x, y + 1, 1, 1, '#ffffff'); };
  const tick = (x, y, c) => { line(x, y + 2, x + 2, y + 4, c); line(x + 2, y + 4, x + 6, y, c); line(x + 1, y + 2, x + 2, y + 3, c); };
  const outlined = (s, x, y, size, col, out, align) => { for (const [a, b] of [[-1, 0], [1, 0], [0, -1], [0, 1], [-1, -1], [1, 1], [1, -1], [-1, 1]]) T(s, x + a, y + b, size, out, align); T(s, x, y, size, col, align); };

  const LOOKS = {
    walker: { skin: '#f1c7a5', hair: '#d9b36a', hairStyle: 'long', top: '#4f9c6b', topStyle: 'tee', pants: '#2f3a55' },
    feeder: { skin: '#8d5a3b', hair: '#1f1f1f', hairStyle: 'short', top: '#e8c547', topStyle: 'sweat', pants: '#3b4a6b' },
    snapper: { skin: '#e8b894', hair: '#6b3f22', hairStyle: 'messy', glasses: true, top: '#3b6fb6', topStyle: 'hoodie', pants: '#2b2f36' },
  };
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
      const sl = Math.round(Math.min(1, k * 2.2) * 8);
      R(193 + sl, 124, 13, 13, old); R(222 - sl, 124, 13, 13, nu);
      if (sl < 8) { R(212, 129, 4, 1, ink); R(213, 128, 2, 3, ink); } else tick(210, 117, '#2fb67c');
    } else { crab(214, 136, 1, t, false); T('?', 228, 117, 7, '#586274'); }
  };

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
    if (st.ripple != null) {
      const r = t - st.ripple;
      if (r < 2) { for (let i = 0; i < 3; i++) { const w = Math.round((r * 14 + i * 5) % 28); if (w > 2) { R(306 - w, 127 + (i % 2), 4, 1, '#cfe4f2'); R(306 + w - 4, 127 + (i % 2), 4, 1, '#cfe4f2'); } }
        if (r < 1) { const fx2 = 300 + r * 14, fy = 125 - Math.sin(r * Math.PI) * 12; R(Math.round(fx2), Math.round(fy), 4, 2, '#f5a623'); R(Math.round(fx2) - 1, Math.round(fy) + (r < 0.5 ? 1 : -1), 1, 2, '#f7f3ea'); } }
    }
  };

  const dino = (st, t) => {
    const rT = st.roar != null ? t - st.roar : 99, roar = rT < 2.6, pk = st.dinoT != null ? t - st.dinoT : 99;
    const sh = roar && rT > 0.2 ? Math.round(Math.sin(t * 30)) : 0, ox = DX + sh, by = DB, up = roar ? -3 : 0, open = roar ? 6 : 0;
    const c = '#9a9f97', hi = '#b8bdb4', lo = '#7a7f78';
    R(DX - 4, by, 62, 24, '#cfc6b2'); R(DX - 6, by - 1, 66, 3, '#e0d8c6'); R(DX - 4, by + 21, 62, 3, '#b3a990'); R(DX + 9, by + 7, 40, 10, '#b3a990'); T('LEGACY', DX + 29, by + 9, 5, '#f7f3ea', 'center');
    R(ox + 34, by - 32, 10, 10, c); R(ox + 42, by - 28, 10, 7, c); R(ox + 50, by - 24, 8, 5, c); R(ox + 56, by - 21, 6, 3, c); R(ox + 60, by - 19, 4, 2, lo);
    R(ox + 12, by - 14, 6, 12, lo); R(ox + 9, by - 2, 10, 2, lo);
    R(ox + 8, by - 34, 28, 18, c); R(ox + 12, by - 34, 20, 2, hi); R(ox + 8, by - 20, 28, 4, lo);
    R(ox + 18, by - 20, 12, 12, c); R(ox + 19, by - 20, 4, 8, hi); R(ox + 22, by - 8, 6, 6, c); R(ox + 18, by - 2, 12, 2, c);
    R(ox + 8, by - 28, 4, 2, lo); R(ox + 7, by - 26, 2, 3, lo);
    R(ox + 6, by - 48 + up, 10, 14 - up, c); R(ox + 10, by - 40, 10, 8, c);
    const hy = by - 58 + up;
    R(ox - 10, hy, 22, 10, c); R(ox - 10, hy, 22, 2, hi); R(ox - 14, hy + 3, 4, 7, c); R(ox - 13, hy + 4, 1, 1, lo);
    for (let x = ox - 13; x < ox + 6; x += 3) R(x, hy + 10, 1, 2, '#e8e6dc');
    if (open) R(ox - 12, hy + 10, 18, open, '#5b2a2a');
    R(ox - 12, hy + 10 + open, 18, 4, c); R(ox - 12, hy + 13 + open, 18, 1, lo); for (let x = ox - 11; x < ox + 4; x += 3) R(x, hy + 9 + open, 1, 1, '#e8e6dc');
    const glow = pk < 1.6 || roar, blink = pk > 0.7 && pk < 0.9;
    if (blink) R(ox + 1, hy + 4, 4, 1, lo); else { R(ox + 1, hy + 3, 3, 3, '#6a6f68'); if (glow) { R(ox + 1, hy + 3, 3, 3, '#ffd166'); R(ox + 2, hy + 3, 1, 3, '#1b1b1b'); } }
    R(ox + 1, hy + 2, 5, 1, lo);
    for (let i = 0; i < 6; i++) R(ox + 10 + i * 6, by - 35 - (i % 2), 3, 2, '#6f8f5a');
    R(DX - 1, by - 7, 5, 7, '#cfe4f2'); R(DX, by - 4, 3, 3, '#9fd0ec'); R(DX - 1, by - 7, 1, 7, '#ffffff');
    const rip = Math.min(pk, rT);
    if (rip < 2.4) {
      const cx = 560, cy = 76; disc(cx, cy, 14, '#1b2332'); disc(cx, cy, 13, '#f7f3ea'); disc(cx, cy, 11, '#6fb3dd');
      for (let i = 0; i < 3; i++) { const r = (rip * 7 + i * 4) % 11; if (r > 1) for (let a = 0; a < 28; a++) R(Math.round(cx + Math.cos(a / 28 * 6.283) * r), Math.round(cy + Math.sin(a / 28 * 6.283) * r), 1, 1, '#d6ecf8'); }
      line(cx + 9, cy + 10, DX - 1, by - 8, '#1b2332');
    }
  };

  const board = (rs, t) => {
    R(662, 98, 3, 30, '#3b3f47'); R(758, 98, 3, 30, '#3b3f47');
    R(650, 48, 120, 54, '#1b2332'); R(652, 50, 116, 50, '#0e1424'); R(650, 48, 120, 1, '#ffd166');
    if (!rs) { T('RACE DAY', 710, 58, 7, '#ffd166', 'center'); crab(676, 92, 1, t, false); tortoise(744, 92, t, false); T('VS', 710, 80, 5, '#ffffff', 'center'); return; }
    const L = rs.labels;
    T(`RACE ${rs.n} OF 3`, 710, 52, 5, '#ffd166', 'center'); R(654, 60, 112, 1, '#2b3550');
    if (rs.k < 1.5) { const n = rs.k < 0.5 ? '3' : rs.k < 1 ? '2' : '1'; T(n, 710, 66, 20, '#ffd166', 'center'); return; }
    if (rs.k < 2.1) { T('GO!', 710, 70, 14, '#2fb67c', 'center'); return; }
    crab(662, 74, 1, t, false); T(L[0], 676, 66, 5, '#ffffff'); T(rs.cDone ? L[2] : '...', 766, 66, 5, rs.cDone ? '#2fb67c' : '#7f8aab', 'right');
    tortoise(662, 90, t, false, rs.kind); T(L[1], 676, 83, 5, '#ffffff'); T(rs.tShow ? L[3] : '...', 766, 83, 5, rs.tShow ? '#ff9a7a' : '#7f8aab', 'right');
    if (rs.foot) T(rs.foot, 710, 92, 5, '#ffd166', 'center');
  };

  const track = t => {
    R(S0 - 16, 128, S1 - S0 + 40, 18, '#b9533e'); R(S0 - 16, 128, S1 - S0 + 40, 1, '#f7f3ea'); R(S0 - 16, 137, S1 - S0 + 40, 1, '#f7f3ea'); R(S0 - 16, 145, S1 - S0 + 40, 1, '#f7f3ea');
    R(S0, 128, 2, 18, '#f7f3ea');
    for (let j = 0; j < 6; j++) for (let i = 0; i < 2; i++) R(S1 + i * 3, 128 + j * 3, 3, 3, (j + i) % 2 ? '#1b1b1b' : '#f7f3ea');
    T('1', S0 - 9, 129, 5, '#f7f3ea'); T('2', S0 - 9, 138, 5, '#f7f3ea');
  };

  const initRace = (id, idx) => ({
    id, idx, k: 0, n: RACES.indexOf(id) + 1, cx: S0 + 6, tx: S0 + 4, cFace: 1, cDone: false, tDone: false, tShow: false, phase: 'run', ride: false, tMedal: false,
    kind: id === 'rustar' ? 'star' : id === 'fastqc' ? 'java' : '',
    tSpeed: (S1 - S0) / (id === 'rustqc' ? 24 : id === 'rustar' ? 16 : 20),
    tags: id === 'rustqc' ? ['RUSTQC', '6 QC TOOLS'] : id === 'rustar' ? ['RUSTAR', 'STAR'] : ['FASTQC-RUST', 'FASTQC'],
    labels: id === 'rustqc' ? ['RUSTQC', '6 TOOLS', '15 MIN', '15+ HRS'] : id === 'rustar' ? ['RUSTAR', 'STAR', '1ST', '2ND'] : ['FASTQC-RS', 'FASTQC', '1ST', 'FASTER'],
    foot: '',
  });

  const stepRace = (rs, dt) => {
    rs.k += dt; if (rs.k < 1.5) return;
    const tMove = !rs.tDone;
    if (tMove) { rs.tx += (rs.ride ? 90 : rs.tSpeed) * dt; if (rs.tx >= S1 + 4) { rs.tx = S1 + 4; rs.tDone = true; rs.tShow = true; if (rs.id === 'fastqc') { rs.tMedal = true; rs.foot = 'PR SENT UPSTREAM'; } } }
    if (rs.phase === 'run') { rs.cx += 150 * dt; if (rs.cx >= S1 + 8) { rs.cx = S1 + 8; rs.cDone = true; rs.phase = 'won'; rs.wonK = rs.k; if (rs.id === 'rustqc') rs.foot = 'SAME OUTPUT'; } }
    else if (rs.phase === 'won') { if (rs.k - rs.wonK > 1.2) rs.tShow = true; if (rs.id === 'fastqc' && rs.k - rs.wonK > 1.6) { rs.phase = 'back'; rs.cFace = -1; } }
    else if (rs.phase === 'back') { rs.cx -= 140 * dt; if (rs.cx <= rs.tx + 2) { rs.phase = 'ride'; rs.ride = true; } }
    else if (rs.phase === 'ride') { rs.cx = rs.tx; }
  };

  return {
    width: W, floor: 154, spawn: 24, exit: EXIT,
    get host() { return fx; },
    focus: { gates: GX, sign: 266, track: 774 },
    props: [
      { id: 'palm', x: 36, label: 'Shake the palm tree' },
      { id: 'pond', x: 278, label: 'Look in the pond' },
      { id: 'dino', x: 628, label: 'Poke the dinosaur' },
    ],
    enter(st) {
      fx = 122; st.gate = 0; st.torch = false; st.cocos = []; st.dinoN = 0; st.clicks = 0; st.npcs = [
        { L: LOOKS.walker, x: 420, face: 1, home: t => 390 + (Math.sin(t * 0.13) * 0.5 + 0.5) * 100, coffee: true },
        { L: LOOKS.feeder, x: 358, face: -1, face0: -1, home: () => 358 },
        { L: LOOKS.snapper, x: 470, face: 1, face0: 1, home: () => 470, camera: true },
      ];
    },
    update(dt, st, ev) {
      const t = time(), id = cur(ev), rT = st.roar != null ? t - st.roar : 99, flee = rT > 0.8 && rT < 7;
      const open = rT < 8 ? 0 : ev.beatIdx > 0 || (ev.beatIdx === 0 && !ev.walking) ? 1 : 0;
      if (open) st.torch = true;
      st.gate += clamp(open - st.gate, -dt * (rT < 8 ? 2.5 : 0.7), dt * 0.7);
      const ft = flee ? 900 : RACES.includes(id) ? 612 : SIGNS.includes(id) ? 300 : 122;
      const fdx = ft - fx; st.fMoving = Math.abs(fdx) > 0.5; fx += Math.sign(fdx) * Math.min(Math.abs(fdx), (flee ? 170 : 80) * dt);
      for (const n of st.npcs) {
        const tg = flee ? 900 + n.home(t) : n.home(t), dx = tg - n.x, sp = flee ? 120 : rT < 12 && n.x > n.home(t) + 2 ? 60 : 28;
        n.moving = Math.abs(dx) > 0.4; if (n.moving) { n.x += Math.sign(dx) * Math.min(Math.abs(dx), sp * dt); n.face = Math.sign(dx); } else if (n.face0) n.face = n.face0;
      }
      if (flee && !st.yelled) { st.yelled = true; st.npcs.forEach((n, i) => g.say(['Run!', 'Aaah!', 'Not again!'][i], n.x, 128, 1.6)); }
      if (rT > 7) st.yelled = false;
      st.cocos.forEach(c => { if (c.y < 148) { c.vy += 300 * dt; c.y = Math.min(148, c.y + c.vy * dt); } else if (Math.abs(c.vx) > 1) { c.x += c.vx * dt; c.vx *= 1 - dt * 2; } });
      const race = RACES.includes(id) && !ev.walking;
      if (!race) st.race = null;
      else if (!st.race || st.race.idx !== ev.beatIdx || ev.stepT < st.race.k - 0.2) st.race = initRace(id, ev.beatIdx);
      if (st.race) stepRace(st.race, dt);
    },
    poke(id, st) {
      const t = time();
      if (id === 'palm') { st.palmT = t; if (st.cocos.length < 6) st.cocos.push({ x: 40 + (st.cocos.length % 3) * 3, y: 68, vy: 0, vx: (st.cocos.length % 2 ? 1 : -1) * 30 }); if (st.cocos.length === 6) g.say('No more coconuts', 36, 128); return true; }
      if (id === 'pond') { st.ripple = t; return true; }
      if (id === 'dino') {
        st.dinoT = t; st.dinoN++;
        if (st.dinoN % 3 === 0 && (st.roar == null || t - st.roar > 9)) { st.roar = t; g.say('(silent roar)', DX - 6, DB - 50, 2.4); g.egg('dino', 'The dinosaur roared'); }
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
      board(st.race, t);
      R(0, 128, W, 18, '#d9cdb4'); for (let x = 0; x < W; x += 16) { R(x, 128, 1, 18, '#c4b79c'); R(x + 8, 137, 1, 9, '#c4b79c'); } R(0, 137, W, 1, '#c4b79c');
      track(t);
      R(0, 146, W, 34, '#c9b48a'); R(0, 146, W, 1, '#b39d72'); for (let x = 0; x < W; x += 12) { R(x, 146, 1, 34, '#b8a275'); R(x + 6, 156, 6, 1, '#b39d72'); }
      R(0, 24, 30, 126, '#c2b393'); R(0, 24, 30, 3, '#d8cbb0'); R(4, 70, 22, 80, '#2b3a4f'); R(6, 72, 18, 78, '#9cc3dd'); R(14, 72, 2, 78, '#2b3a4f'); R(8, 76, 2, 20, '#d6ecf8');
      pond(st, id, t);
      gates(st, t);
      R(POST - 2, 50, 5, 100, '#6d5238'); R(POST - 1, 50, 2, 100, '#8a6a4a'); R(POST - 4, 46, 9, 5, '#5b4632');
      easel(id, t);
      arm(196, POST - 3, 56, 13, -1, id === 'rewrite', ['REWRITE'], t);
      arm(POST + 3, 330, 74, 21, 1, id === 'upstream', ['CONTRIBUTE', 'UPSTREAM'], t);
      arm(200, POST - 3, 96, 13, -1, id === 'combine', ['COMBINE'], t);
      palm(40, t, st.palmT != null && t - st.palmT < 1 ? Math.sin((t - st.palmT) * 18) * 3 * (1 - (t - st.palmT)) : 0);
      palm(500, t, 0);
      st.cocos.forEach(c => disc(Math.round(c.x), Math.round(c.y), 2, '#6b4a2f'));
      for (const n of st.npcs) {
        person(n.L, n.x, 154, t, n.face, n.moving);
        if (n.coffee && !n.moving) R(Math.round(n.x) + n.face * 5, 141, 2, 3, '#f7f3ea');
        if (n.camera && !n.moving) { const up = Math.sin(t * 0.7) > 0.3; R(Math.round(n.x) + n.face * 4, up ? 137 : 142, 4, 3, '#2b2e31'); if (up && Math.sin(t * 0.7) > 0.95) R(Math.round(n.x) + n.face * 6, 136, 1, 1, '#ffffff'); }
        if (n.L === LOOKS.feeder && !n.moving) { const p = (t * 0.6) % 1; R(Math.round(n.x - 8 - p * 14), Math.round(140 + p * p * 12), 1, 1, '#e8c547'); }
      }
      const rs = st.race;
      if (rs) {
        if (rs.id === 'rustqc') for (let i = 5; i >= 0; i--) { const x = Math.min(rs.tx, S1 + 4) - i * 18; if (x > S0 - 120) tortoise(x, 145, t + i * 0.3, rs.k > 1.5 && !rs.tDone, ''); }
        else tortoise(rs.tx, 145, t, rs.k > 1.5 && !rs.tDone, rs.kind);
        if (rs.tMedal) medal(Math.round(rs.tx) + 4, 131, '#c0c6cc');
        const ride = rs.phase === 'ride', cy = ride ? 140 : 136;
        crab(rs.cx, cy, 1, t, rs.phase === 'run' && rs.k > 1.5 || rs.phase === 'back', false);
        if (rs.cDone) medal(Math.round(rs.cx), cy - 14, '#ffd166');
        if (rs.phase === 'back') { const ex = Math.round(rs.cx) - 10; R(ex, 126, 8, 6, '#f7f3ea'); line(ex, 126, ex + 4, 129, '#7f8aab'); line(ex + 7, 126, ex + 4, 129, '#7f8aab'); T('PR', ex + 4, 118, 5, '#2f6fd6', 'center'); }
        if (rs.id === 'rustar' && rs.cDone) for (let i = 0; i < 5; i++) { const a = i * 1.257 + t, r = 9 + Math.sin(t * 2 + i) * 2; R(Math.round(S1 + 8 + Math.cos(a) * r), Math.round(126 + Math.sin(a) * r * 0.6), 2, 2, '#ffd166'); }
        outlined(rs.tags[1], clamp(Math.round(Math.min(rs.tx, S1 + 4)), 632, 790), 124, 5, '#d8f0c0', '#1b2332', 'center');
        outlined(rs.tags[0], clamp(Math.round(rs.cx), 632, 790), cy - 30, 5, '#ffffff', '#1b2332', 'center');
      }
      const clicking = st.clickT != null && t - st.clickT < 1.2, flag = !!rs && rs.k > 1.5 && !rs.cDone;
      crab(fx + (st.fMoving ? 0 : Math.round(Math.sin(t * 1.5) * 2)), 154, 2, t, st.fMoving || !flag && Math.sin(t * 1.5) > 0.9, clicking ? Math.floor(t * 8) % 2 : Math.sin(t * 0.8) > 0.97);
      if (rs && rs.k > 0) { const fxx = Math.round(fx) + 14, fy = 112 + (flag ? Math.round(Math.sin(t * 10) * 2) : 6); R(fxx, fy, 1, 24, '#3b3f47'); for (let y = 0; y < 8; y++) for (let x = 0; x < 10; x++) R(fxx + 1 + x, fy + y + (flag ? Math.round(Math.sin(t * 8 + x) * 0.6) : 0), 1, 1, ((x >> 1) + (y >> 1)) % 2 ? '#1b1b1b' : '#f7f3ea'); }
      R(EXIT - 12, 100, 24, 50, '#f7f3ea'); R(EXIT - 9, 103, 18, 47, '#1b2030'); R(EXIT - 12, 88, 24, 9, '#2fb67c'); T('EXIT', EXIT, 89.5, 5, '#ffffff', 'center');
      R(812, 24, 8, 126, '#c2b393');
      for (let i = 0; i < 10; i++) { const x = ((t * (18 + i * 2) + i * 97) % (W + 40)) - 20, y = 40 + i * 9 + Math.sin(t * 2 + i) * 5; R(Math.round(x), Math.round(y), 2, 1, i % 3 ? '#58a852' : '#d9b45a'); R(Math.round(x) + 1, Math.round(y) + 1, 1, 1, i % 3 ? '#3f8f45' : '#c9953f'); }
    },
  };
};
