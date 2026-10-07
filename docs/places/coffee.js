// Coffee break queue: side projects. Each person in the queue is a project and shows it on the big screen; the last in line is this game.
(window.KEYNOTE_PLACES = window.KEYNOTE_PLACES || {}).coffee = g => {
  const { R, T, disc, line, mix, hash, person, look, time, ctx } = g;
  const W = 560, EXIT = 548, FLOOR = 154, INK = '#1b2332';
  const SIDE = [83, 90, 97], MAXCUPS = 8, TOSS = 0.5; // cups waiting on the counter, by the urn
  const URN = 74, TOWER = 118, BIS = 140, HOST = 104, SPOT = 434, QX = 200, GAP = 24, BACK = 144;
  const SX = 216, SY = 10, SW = 200, SH = 98; // screen frame; content sits in (SX+4..SX+SW-4, SY+18..SY+SH-4)
  const ORDER = ['graphs', 'docs', 'metro', 'deck', 'tidy', 'game'];
  const NAME = { graphs: 'CONTRIBUTOR GRAPHS', docs: 'NF-DOCS', metro: 'NF-METRO', deck: 'STREAM DECK PLUGINS', tidy: 'GFM-TIDY', game: 'THIS GAME' };
  const TAG = { graphs: 'who, and when', docs: 'docs from code', metro: 'pipelines as maps', deck: 'DeckCal', tidy: 'unwrap AI comments', game: 'you are in it' };
  const COL = { graphs: '#2fb67c', docs: '#1f9fb0', metro: '#d8342e', deck: '#d99a1a', tidy: '#8250df', game: '#6c4fc8' };
  const LOOKS = [
    { skin: '#efc6a3', hair: '#3a2a1f', hairStyle: 'short', top: '#e85d5d', topStyle: 'tee', pants: '#2f3a4f' },
    { skin: '#a86f4c', hair: '#1f1f1f', hairStyle: 'long', top: '#2ec4d6', topStyle: 'hoodie', pants: '#2f3a4f' },
    { skin: '#e8b894', hair: '#d9a441', hairStyle: 'swept', top: '#3cc87a', topStyle: 'tee', pants: '#2f3a4f' },
    { skin: '#c98e62', hair: '#8b2f2f', hairStyle: 'messy', glasses: true, top: '#f5a623', topStyle: 'sweat', pants: '#2f3a4f' },
    { skin: '#f2c9a0', hair: '#4a403a', hairStyle: 'bald', beard: true, top: '#9b6cf0', topStyle: 'tee', pants: '#2f3a4f' },
  ];
  const GUESTS = [
    { L: { skin: '#f6d3bd', hair: '#c86a3a', hairStyle: 'long', top: '#4a7a9a', topStyle: 'sweat', pants: '#2b3445' }, x: 458, f: 1 },
    { L: { skin: '#8a5a3c', hair: '#1f1f1f', hairStyle: 'short', glasses: true, top: '#ff8fa3', topStyle: 'tee', pants: '#2b3445' }, x: 530, f: -1 },
  ];
  const DONE = [[482, -1], [506, 1], [444, 1], [542, -1], [494, 1]];
  const CLEANER = { skin: '#d9a27c', hair: '#3a3a3a', hairStyle: 'short', top: '#3d6f8e', topStyle: 'tee', pants: '#3d6f8e', shoes: '#2b2b2b' };
  const BISCUIT = '#c8903c';
  const clamp = (v, a, b) => Math.max(a, Math.min(b, v));
  const c01 = v => clamp(v, 0, 1);
  const tw = (s, n) => { ctx.font = `${n}px Silkscreen, SilkscreenLocal, "Courier New", monospace`; return ctx.measureText(s).width; };
  const topic = Object.values(window.KEYNOTE_CONTENT.TOPICS).find(t => t.place === 'coffee');
  const NBEATS = topic ? topic.beats.length : 7;
  // -1 until the first project; stays on the game once the talk has moved past the last beat
  const actOf = ev => ev.beatIdx < 0 ? -1 : ev.beatIdx >= NBEATS || !ev.beat ? 5 : ORDER.indexOf(ev.beat.at);
  const target = (i, act) => i > act ? [QX + GAP * (i - act - 1), BACK, -1] : i === act ? [SPOT, FLOOR, -1] : [DONE[i][0], BACK, DONE[i][1]];

  // small prop held in the hand, roughly 10x10 with its top-left at (x, y)
  const small = (i, x, y, t) => {
    if (i === 0) { R(x, y + 9, 11, 1, INK); for (let k = 0; k < 4; k++) R(x + 1 + k * 3, y + 8 - (k + 1) * 2, 2, (k + 1) * 2, ['#e85d5d', '#f5a623', '#3cc87a', '#6c8cff'][k]); }
    else if (i === 1) { R(x, y + 1, 10, 9, '#1f9fb0'); R(x + 1, y + 2, 8, 7, '#f7f3ea'); R(x + 5, y + 1, 1, 9, '#1f9fb0'); R(x + 2, y + 4, 2, 1, INK); R(x + 7, y + 4, 2, 1, INK); }
    else if (i === 2) { R(x, y + 4, 11, 2, '#e85d5d'); R(x + 5, y, 2, 11, '#2f6fd6'); disc(x + 1, y + 5, 2, '#ffffff'); disc(x + 10, y + 5, 2, '#ffffff'); disc(x + 6, y + 1, 2, '#ffffff'); }
    else if (i === 3) { R(x, y + 1, 11, 9, INK); for (let k = 0; k < 6; k++) R(x + 1 + (k % 3) * 3, y + 2 + Math.floor(k / 3) * 4, 2, 3, Math.floor(t * 2 + k) % 6 === k ? '#ffd166' : '#3cc8d6'); }
    else { R(x + 5, y - 2, 1, 9, '#8a6a4a'); R(x + 1, y + 7, 9, 4, '#d9a441'); for (let k = 0; k < 5; k++) R(x + 2 + k * 2, y + 10, 1, 2, '#a8782c'); }
  };
  // a cup in someone's hand: the same small cup the hero drinks from
  const cup = (x, y, steam, t) => { R(x, y, 3, 4, '#ffffff'); R(x, y, 3, 1, '#6b4423'); R(x, y + 2, 3, 1, '#c8322c'); if (steam && Math.sin(t * 2 + x) > 0) R(x + 1 + Math.round(Math.sin(t * 3 + x)), y - 3, 1, 2, 'rgba(255,255,255,0.7)'); };
  const steamAt = (x, y, t, n) => { for (let i = 0; i < n; i++) { const p = (t * 0.7 + i / n) % 1; R(Math.round(x + Math.sin(t * 2 + i * 2) * 2 + i - 1), Math.round(y - p * 16), 2, 2, `rgba(255,255,255,${(1 - p) * 0.75})`); } };
  // a thick pixel polyline, drawn up to `k` of its length
  const path = (pts, k, c, ox, oy) => {
    let len = 0; for (let p = 1; p < pts.length; p++) len += Math.hypot(pts[p][0] - pts[p - 1][0], pts[p][1] - pts[p - 1][1]);
    let left = len * k;
    for (let p = 1; p < pts.length && left > 0; p++) { const [ax, ay] = pts[p - 1], [bx, by] = pts[p], d = Math.hypot(bx - ax, by - ay), f = Math.min(1, left / d); left -= d;
      const ex = ax + (bx - ax) * f, ey = ay + (by - ay) * f; for (let o = -1; o <= 1; o++) line(Math.round(ox + ax), Math.round(oy + ay + o), Math.round(ox + ex), Math.round(oy + ey + o), c); }
  };

  /* ---------- the big screen: one mock per project ---------- */
  const SHOW = {
    intro(x, y, a, t) {
      R(x, y, 192, 76, '#20183a');
      for (let k = 0; k < 18; k++) R(x + Math.floor(hash(k * 5) * 190), y + Math.floor(hash(k * 9) * 74), 1, 1, Math.sin(t * 1.5 + k) > 0 ? '#5a4a8a' : '#3a2f60');
      T('SIDE', x + 8, y + 10, 14, '#ffd166'); T('PROJECTS', x + 8, y + 28, 14, '#ffffff'); T('made with AI', x + 9, y + 52, 6, '#d9c8ff');
      const cx = x + 160, cy = y + 36; R(cx - 12, cy, 24, 22, '#ffffff'); R(cx - 12, cy, 24, 3, '#6b3d22'); R(cx + 12, cy + 5, 4, 2, '#ffffff'); R(cx + 15, cy + 5, 2, 9, '#ffffff'); R(cx + 12, cy + 12, 4, 2, '#ffffff');
      R(cx - 16, cy + 22, 32, 3, '#d6d0c2'); steamAt(cx - 4, cy - 2, t, 3); steamAt(cx + 4, cy - 2, t + 1.3, 3);
    },
    graphs(x, y, a) {
      R(x, y, 192, 76, '#101a2c'); const cols = 57, shown = a * 26, AFF = ['#3cc87a', '#6c8cff', '#f5a623'];
      for (let r = 0; r < 9; r++) {
        const ry = y + 3 + r * 7, s = Math.floor(r * 5.4 + hash(r + 3) * 3), e = r < 2 ? cols : Math.min(cols, s + 8 + Math.floor(hash(r + 20) * 34)), c = AFF[Math.floor(hash(r + 7) * 3)];
        R(x + 4, ry, 5, 5, c); R(x + 5, ry + 1, 1, 1, '#101a2c'); R(x + 7, ry + 1, 1, 1, '#101a2c'); R(x + 5, ry + 3, 3, 1, '#101a2c');
        R(x + 12, ry + 2, 172, 1, '#1b2740');
        for (let k = s; k < e && k < shown; k++) { const v = hash(r * 131 + k * 7); if (v < 0.12) continue; R(x + 13 + k * 3, ry, 3, 5, mix('#101a2c', c, 0.3 + 0.7 * v)); }
      }
      const cur = Math.min(cols, shown); if (cur < cols) R(x + 13 + Math.floor(cur) * 3, y + 2, 1, 64, '#ffffff');
      R(x + 12, y + 66, 172, 1, '#7f8aab'); T('2015', x + 12, y + 69, 5, '#a8b4cc'); T('2026', x + 184, y + 69, 5, '#a8b4cc', 'right'); T('rows: people', x + 98, y + 69, 5, '#5f6b88', 'center');
    },
    docs(x, y, a, t) {
      R(x, y, 192, 76, '#e9edf3'); R(x, y, 192, 8, '#2b3550'); for (let k = 0; k < 3; k++) disc(x + 5 + k * 5, y + 4, 1, ['#e85d5d', '#f5a623', '#3cc87a'][k]);
      R(x + 22, y + 2, 90, 5, '#4a5578'); T('rnaseq/docs.html', x + 25, y + 2, 4, '#c8d2e8');
      if (a < 1.4) { R(x, y + 8, 192, 68, '#0e1424'); const cmd = '$ nf-docs generate ./rnaseq', n = Math.floor(a * 30);
        T(cmd.slice(0, n), x + 8, y + 20, 6, '#9fe0b8'); if (Math.floor(t * 3) % 2) R(x + 9 + tw(cmd.slice(0, n), 6), y + 20, 4, 7, '#9fe0b8');
        if (a > 1) T('writing docs...', x + 8, y + 32, 5, '#7f8aab'); return; }
      const on = Math.floor((a - 1.4) / 1.2) % 4;
      R(x, y + 8, 46, 68, '#1b2440'); ['PARAMS', 'PROCESSES', 'WORKFLOWS', 'CONFIG'].forEach((s, i) => { if (i === on) R(x, y + 14 + i * 11, 46, 9, '#2ec4d6'); T(s, x + 4, y + 16 + i * 11, 5, i === on ? INK : '#c8d2e8'); });
      T('rnaseq', x + 52, y + 12, 8, INK); R(x + 136, y + 12, 50, 8, '#ffffff'); R(x + 136, y + 12, 50, 1, '#b8c0d0'); disc(x + 141, y + 15, 2, '#7f8aab'); R(x + 142, y + 17, 2, 2, '#7f8aab'); T('search', x + 147, y + 14, 4, '#9aa3b4');
      const P = [['--input', 'path'], ['--outdir', 'path'], ['--genome', 'string'], ['--skip_qc', 'boolean']];
      P.forEach(([p, ty], i) => { if (a < 1.6 + i * 0.25) return; const ry = y + 26 + i * 12; R(x + 52, ry, 134, 10, '#ffffff');
        R(x + 54, ry + 2, tw(p, 5) + 4, 7, '#1b2440'); T(p, x + 56, ry + 3, 5, '#9fe0b8'); const px = x + 62 + tw(p, 5); T(ty, px, ry + 3, 5, '#2f6fd6'); R(px + tw(ty, 5) + 6, ry + 4, 40 - i * 6, 2, '#c8ccd6'); });
    },
    metro(x, y, a, t) {
      R(x, y, 192, 76, '#f4f1ea');
      const red = [[12, 30], [56, 30], [74, 12], [132, 12], [150, 30], [180, 30]], blue = [[44, 36], [180, 36]], green = [[44, 42], [58, 42], [74, 58], [136, 58], [152, 42], [180, 42]];
      path(red, c01(a / 1.2), '#e3342f', x, y); path(blue, c01((a - 0.5) / 1.2), '#2f6fd6', x, y); path(green, c01((a - 1) / 1.2), '#2fb67c', x, y);
      const stop = (sx, sy, lbl, ly, k) => { if (a < k) return; disc(x + sx, y + sy, 3, INK); disc(x + sx, y + sy, 2, '#ffffff'); T(lbl, x + sx, y + ly, 5, INK, 'center'); };
      const hub = (sx, lbl, k) => { if (a < k) return; R(x + sx - 4, y + 26, 9, 21, INK); R(x + sx - 3, y + 27, 7, 19, '#ffffff'); T(lbl, x + sx, y + 18, 5, INK, 'center'); };
      stop(12, 30, 'FASTQC', 20, 0.1); stop(98, 12, 'STAR', 2, 0.5); stop(124, 12, 'RSEM', 2, 0.7); stop(110, 36, 'SALMON', 41, 1.2); stop(92, 58, 'BOWTIE2', 64, 1.7); stop(124, 58, 'MACS2', 64, 1.9);
      hub(44, 'TRIM', 0.3); hub(178, 'MULTIQC', 2.1);
      if (a > 2.3) { const u = (t * 0.22) % 1, n = red.length - 1, seg = Math.min(n - 1, Math.floor(u * n)), f = u * n - seg, [ax, ay] = red[seg], [bx, by] = red[seg + 1];
        const tx = Math.round(x + ax + (bx - ax) * f), ty = Math.round(y + ay + (by - ay) * f); R(tx - 3, ty - 2, 7, 5, '#ffd166'); R(tx - 3, ty - 2, 7, 1, INK); R(tx - 1, ty - 1, 3, 2, INK); }
    },
    deck(x, y, a, t) {
      R(x, y, 192, 76, '#2a2f3a'); const bx = x + 16, by = y + 4; R(bx, by, 160, 68, '#121317'); R(bx + 1, by + 1, 158, 1, '#2e3038'); R(bx, by, 1, 1, '#2a2f3a'); R(bx + 159, by, 1, 1, '#2a2f3a');
      const p = (a % 8) / 8, now = p > 0.72, mins = Math.max(1, Math.ceil(5 * (1 - p / 0.72))), fill = c01(p / 0.72);
      for (let r = 0; r < 3; r++) for (let c = 0; c < 5; c++) {
        const kx = bx + 6 + c * 30, ky = by + 6 + r * 20, k = (s, col, sz = 6) => T(s, kx + 13, ky + 6, sz, col, 'center');
        R(kx, ky, 26, 17, '#000000'); R(kx + 1, ky + 1, 24, 15, '#1d2129');
        if (r === 1) { // the countdown band: one yellow bar sweeping across all five keys
          const f = c01(fill * 5 - c); if (now) R(kx + 1, ky + 1, 24, 15, Math.floor(t * 1.5) % 2 ? '#ffd166' : '#f5a623'); else if (f > 0) R(kx + 1, ky + 1, Math.round(24 * f), 15, '#e8b923');
          if (now) k('NOW'[c - 1] || '', INK, 9); else if (c === 2) k(`${mins}m`, '#ffffff', 8); else if (c === 0) T('TEAM', kx + 13, ky + 2, 5, '#ffffff', 'center'), T('SYNC', kx + 13, ky + 9, 5, '#ffffff', 'center');
        } else if (r === 0) { R(kx + 1, ky + 1, 24, 2, '#3cc87a'); R(kx + 1, ky + 1, Math.round(24 * ((t * 0.05 + c * 0.2) % 1)), 2, '#7af0a8');
          if (c === 0) { R(kx + 7, ky + 5, 12, 10, '#ffffff'); R(kx + 7, ky + 5, 12, 3, '#e85d5d'); T(String(7 + Math.floor(a / 8)), kx + 13, ky + 9, 5, INK, 'center'); }
          else k(['', '1:1', 'LUNCH', 'DEMO', 'MEET'][c], '#c8d2e8', 5);
        } else { if (c === 4) { R(kx + 1, ky + 1, 24, 15, now ? '#2fb67c' : '#1f6a46'); k('JOIN', '#ffffff', 5); }
          else if (c === 0) { R(kx + 10, ky + 4, 6, 7, '#c8d2e8'); R(kx + 12, ky + 11, 2, 3, '#c8d2e8'); }
          else if (c === 1) { R(kx + 7, ky + 5, 9, 7, '#c8d2e8'); R(kx + 16, ky + 6, 3, 5, '#c8d2e8'); }
          else { R(kx + 9, ky + 4, 2, 9, '#c8d2e8'); R(kx + 15, ky + 4, 2, 9, '#c8d2e8'); R(kx + 9, ky + 4, 8, 2, '#c8d2e8'); disc(kx + 9, ky + 13, 2, '#c8d2e8'); disc(kx + 15, ky + 13, 2, '#c8d2e8'); } }
      }
    },
    tidy(x, y, a, t) {
      R(x, y, 192, 76, '#d0d7de'); const px = x + 6, py = y + 3; R(px, py, 180, 70, '#ffffff'); R(px, py, 180, 12, '#f6f8fa'); R(px, py + 12, 180, 1, '#d0d7de');
      R(px + 3, py + 3, 22, 9, '#ffffff'); T('Write', px + 5, py + 4, 5, INK); T('Preview', px + 30, py + 4, 5, '#6a737d');
      const p = a % 8, done = p > 2, press = p > 1.7 && p < 2.1;
      ['B', 'I', '<>'].forEach((s, i) => T(s, px + 86 + i * 10, py + 4, 5, '#6a737d'));
      const ub = px + 116; R(ub, py + 2, 40, 9, press ? '#8250df' : done ? '#e9dcff' : '#f6f8fa'); R(ub, py + 2, 40, 1, '#8250df'); R(ub, py + 10, 40, 1, '#8250df'); R(ub, py + 2, 1, 9, '#8250df'); R(ub + 39, py + 2, 1, 9, '#8250df');
      T('UNWRAP', ub + 20, py + 4, 5, press ? '#ffffff' : '#8250df', 'center'); T(done ? 'AFTER' : 'BEFORE', px + 176, py + 16, 5, done ? '#2fb67c' : '#d03a3a', 'right');
      if (!done) { const ws = [92, 98, 88, 95, 90, 96, 84]; ws.forEach((w, i) => { const ly = py + 18 + i * 7; R(px + 6, ly, w - 6, 3, '#57606a');
          if (i === 2) { R(px + 40, ly - 2, 36, 7, '#eaeef2'); T('a1b2c3d', px + 58, ly - 1, 5, '#57606a', 'center'); } });
        R(px + 104, py + 18, 1, 48, '#f0b4b4'); T('80', px + 107, py + 61, 4, '#d03a3a'); }
      else { const k = c01((p - 2) / 0.5); [168, 168, 120, 0, 168, 96].forEach((w, i) => { if (!w) return; const ly = py + 22 + i * 7; R(px + 6, ly, Math.round(6 + (w - 6) * k), 3, '#57606a');
          if (i === 1 && k === 1) { R(px + 70, ly - 1, 32, 5, '#ffffff'); T('a1b2c3d', px + 86, ly - 1, 5, '#0969da', 'center'); R(px + 72, ly + 4, 28, 1, '#0969da'); } }); }
      const cx = done ? ub + 30 : Math.round(px + 150 - c01((p - 0.6) / 1.1) * 20), cy = done ? py + 8 : Math.round(py + 40 - c01((p - 0.6) / 1.1) * 32);
      if (p < 3.5) for (let r = 0; r < 7; r++) { R(cx, cy + r, Math.min(r + 1, 5), 1, '#ffffff'); R(cx, cy + r, 1, 1, INK); R(cx + Math.min(r + 1, 5), cy + r, 1, 1, INK); }
    },
    game(x, y, a, t) {
      R(x, y, 192, 76, '#0b0b1e'); for (let k = 0; k < 30; k++) { const sx = (hash(k * 3) * 192 - t * (4 + (k % 3) * 4)) % 192; R(x + Math.floor(sx < 0 ? sx + 192 : sx), y + Math.floor(hash(k * 7) * 70), 1, 1, k % 4 ? '#5a6a9a' : '#ffffff'); }
      T('1UP 00000', x + 6, y + 3, 5, '#e85d5d'); T('HI 99999', x + 186, y + 3, 5, '#ffffff', 'right');
      const drop = Math.round((1 - c01(a / 0.8)) ** 2 * -40);
      T('THE KEYNOTE', x + 97, y + 15 + drop, 14, '#6c3aa0', 'center'); T('THE KEYNOTE', x + 96, y + 14 + drop, 14, '#ffd166', 'center');
      T('scverse 2026', x + 96, y + 32, 6, '#d9c8ff', 'center');
      if (a > 1 && Math.floor(t * 1.2) % 2 === 0) T('PRESS START', x + 96, y + 42, 6, '#ffffff', 'center');
      R(x, y + 70, 192, 6, '#3a2f60'); for (let k = 0; k < 12; k++) R(x + ((k * 17 - Math.floor(t * 20)) % 192 + 192) % 192, y + 70, 8, 1, '#5a4a8a');
      person(g.hero(), x + 20 + ((t * 28) % 152), y + 70, t, 1, true);
    },
  };

  function screen(st, t, act) {
    const id = act < 0 ? 'intro' : ORDER[act], a = t - (st.showT || 0), x = SX + 4, y = SY + 18;
    line(SX + 30, 0, SX + 30, SY, '#6f7a80'); line(SX + SW - 30, 0, SX + SW - 30, SY, '#6f7a80');
    R(SX, SY, SW, SH, '#15171d'); R(SX + 1, SY + 1, SW - 2, 1, '#3a3f4a'); R(SX + SW / 2 - 6, SY + SH, 12, 2, '#15171d');
    const bar = act < 0 ? '#2b2140' : COL[id], name = act < 0 ? 'COFFEE BREAK' : NAME[id], tag = act < 0 ? 'side projects' : TAG[id];
    R(x, SY + 4, SW - 8, 14, bar); T(name, x + 4, SY + 7, 8, '#ffffff');
    if (tw(name, 8) + tw(tag, 5) + 14 < SW - 8) T(tag, SX + SW - 8, SY + 9, 5, mix(bar, '#ffffff', 0.7), 'right');
    ctx.save(); ctx.beginPath(); ctx.rect(x, y, 192, 76); ctx.clip(); SHOW[id](x, y, a, t); ctx.restore();
    if (a < 0.35) { ctx.globalAlpha = 1 - a / 0.35; for (let r = 0; r < 76; r += 2) R(x, y + r, 192, 1, hash(r + Math.floor(t * 20)) > 0.5 ? '#3a3f4a' : '#20232b'); ctx.globalAlpha = 1; }
  }

  const cabinet = (st, t, depth, x, y, on) => {
    R(x - 12, y - 38, 24, 36, '#2b2160'); R(x - 12, y - 38, 2, 36, '#4a3aa0'); R(x - 11, y - 38, 22, 7, '#b28dff'); T('GAME', x, y - 37, 5, '#2b2160', 'center');
    const sx = x - 9, sy = y - 29; R(sx - 1, sy - 1, 20, 12, '#0b0b12');
    ctx.save(); ctx.beginPath(); ctx.rect(sx, sy, 18, 10); ctx.clip();
    if (st.arcade && depth < 3) { ctx.translate(sx, sy); ctx.scale(18 / 320, 18 / 320); ctx.translate(-camX(), 0); scene(st, depth + 1); }
    else { R(sx, sy, 18, 10, '#0e1a2a'); for (let k = 0; k < 6; k++) R(sx + Math.round(hash(k) * 16), sy + ((k * 3 + Math.floor(t * 6)) % 10), 1, 1, '#ffffff');
      const hop = Math.abs(Math.sin(t * 3)) * 3; R(sx + 7, sy + 6 - Math.round(hop), 3, 4, on ? '#ffd166' : '#6c8cff'); }
    ctx.restore();
    R(x - 11, y - 16, 22, 2, '#4a3aa0'); R(x - 4, y - 15, 2, 4, '#1b1b1b'); disc(x - 3, y - 16, 2, '#e85d5d'); disc(x + 4, y - 14, 2, '#ffd166'); disc(x + 8, y - 14, 2, '#3cc8d6');
    R(x - 3, y - 7, 6, 1, '#0b0b12'); R(x - 12, y - 4, 24, 3, '#1b1440'); disc(x - 8, y - 1, 1, '#555555'); disc(x + 8, y - 1, 1, '#555555');
  };
  const camX = () => clamp(g.heroX() - 160, 0, W - 320);

  function scene(st, depth) {
    const t = time(), act = st.act, stare = st.stare != null && t - st.stare < 2.6, inner = depth > 0;
    /* shell */
    R(0, 0, W, 140, '#ece2cf'); for (let x = 12; x < W; x += 24) R(x, 8, 1, 96, '#e2d6c0');
    R(0, 0, W, 6, '#c9b99c'); R(0, 6, W, 1, '#b4a384'); R(0, 104, W, 32, '#d6c6a8'); R(0, 102, W, 2, '#b9a98d'); R(0, 136, W, 4, '#9a8a6e');
    R(0, 140, W, 40, '#a38a6a'); for (let y = 140, r = 0; y < 180; y += 8, r++) { R(0, y, W, 1, '#8f7758'); for (let x = (r % 2) * 16; x < W; x += 32) R(x, y + 1, 1, 7, '#8f7758'); }
    /* entrance and exit */
    R(2, 92, 24, 48, '#9a8a6e'); R(5, 95, 18, 45, '#8a5a32'); R(8, 99, 12, 14, '#c9dfe8'); R(19, 118, 2, 2, '#ffd166');
    R(EXIT - 12, 92, 24, 48, '#9a8a6e'); R(EXIT - 9, 95, 18, 45, '#1b2030'); R(EXIT - 12, 80, 24, 9, '#2fb67c'); T('EXIT', EXIT, 81.5, 5, '#ffffff', 'center');
    /* chalkboard menu, shelf, pendant lamps */
    R(32, 18, 120, 46, '#6b4a2c'); R(34, 20, 116, 42, '#2b3a32');
    T('MENU', 92, 23, 7, '#f2efe6', 'center'); R(62, 32, 60, 1, '#8aa094');
    [['COFFEE', 'KR 15'], ['TEA', 'KR 10'], ['BISCUIT', 'KR 5']].forEach(([a, b], i) => { T(a, 40, 36 + i * 7, 5, '#e6ecd8'); T(b, 144, 36 + i * 7, 5, '#e6ecd8', 'right'); });
    T('IDEAS: FREE', 92, 57, 5, '#ffd166', 'center');
    R(32, 76, 120, 3, '#8b5e3c'); for (let i = 0; i < 9; i++) { const mx = 38 + i * 13; R(mx, 69, 7, 7, ['#e85d5d', '#ffffff', '#6c8cff', '#f5a623', '#ffffff', '#3cc87a', '#b28dff', '#ffffff', '#2ec4d6'][i]); R(mx + 7, 71, 2, 3, '#d6d0c2'); }
    for (const lx of [62, 122]) { R(lx, 0, 1, 8, '#6f7a80'); R(lx - 5, 8, 11, 5, '#2b2140'); R(lx - 3, 13, 7, 1, '#ffe7a0'); ctx.fillStyle = 'rgba(255,236,170,0.08)'; for (let y = 14; y < 112; y += 2) { const w = 3 + (y - 14) * 0.2; ctx.fillRect(lx - w, y, w * 2, 2); } }
    /* clock and window */
    disc(192, 34, 9, INK); disc(192, 34, 8, '#fffbe6'); line(192, 34, 192 + Math.round(Math.sin(t * 0.1) * 5), 34 - Math.round(Math.cos(t * 0.1) * 5), INK); line(192, 34, 192 + Math.round(Math.sin(t * 0.6) * 6), 34 - Math.round(Math.cos(t * 0.6) * 6), '#e85d5d');
    R(448, 22, 80, 60, '#8a6a4a'); ctx.save(); ctx.beginPath(); ctx.rect(451, 25, 74, 54); ctx.clip(); R(451, 25, 74, 54, '#9fd0f0'); R(451, 64, 74, 15, '#86c76a'); R(470, 56, 26, 10, '#c8b8a0'); R(474, 59, 4, 4, '#7d8a96'); R(484, 59, 4, 4, '#7d8a96');
    for (let k = 0; k < 2; k++) { const cx = 440 + ((t * (3 + k) + k * 40) % 110); R(Math.round(cx), 32 + k * 9, 12, 3, '#ffffff'); R(Math.round(cx) + 3, 30 + k * 9, 6, 2, '#ffffff'); }
    const bx = 446 + ((t * 9) % 100); R(Math.round(bx), 46, 2, 1, INK); R(Math.round(bx) + 2, Math.floor(t * 8) % 2 ? 45 : 47, 2, 1, INK); ctx.restore();
    R(487, 25, 2, 54, '#8a6a4a'); R(451, 51, 74, 2, '#8a6a4a'); R(444, 82, 88, 3, '#d8d8d0');
    /* the screen */
    screen(st, t, act);
    /* queue sign */
    R(186, 112, 2, 30, '#6f7a80'); R(178, 104, 18, 12, '#2b2140'); T('QUEUE', 187, 106, 4, '#ffffff', 'center'); T('HERE', 187, 111, 4, '#ffd166', 'center'); R(182, 141, 10, 2, '#6f7a80');
    /* barista and counter */
    // Sid puts a fresh cup back on the counter after each one the hero drinks
    const rf = st.refill, ra = rf ? t - rf.t : 9, pour = !rf && (t % 7) < 1.2;
    person(look('side'), HOST, 126, t, rf || pour ? -1 : 1, false);
    if (pour) R(HOST - 10, 110, 4, 3, '#ffffff');
    R(28, 116, 148, 4, '#f7f3ea'); R(30, 120, 144, 22, '#8b5e3c'); R(30, 120, 144, 2, '#a87a4a'); for (let x = 36; x < 172; x += 14) R(x, 124, 1, 16, '#7a5232');
    for (const [ux, hot] of [[50, 0], [URN, 1]]) { R(ux - 7, 96, 14, 20, '#9aa3ab'); R(ux - 7, 96, 3, 20, '#c4cbd1'); R(ux - 8, 94, 16, 3, '#6f7a80'); R(ux - 2, 90, 4, 4, '#6f7a80');
      R(ux - 3, 102, 6, 5, hot ? '#e85d5d' : '#3cc87a'); T(hot ? 'C' : 'T', ux, 102, 4, '#ffffff', 'center'); R(ux - 1, 110, 2, 4, '#6f7a80'); R(ux + 4, 106, 5, 2, '#6f7a80');
      if (st.pourT != null && hot && t - st.pourT < 0.5) R(ux, 114, 1, 2, '#5a3320'); steamAt(ux, 90, t + hot, 3); }
    st.side.forEach((on, i) => { if (on) g.cup(SIDE[i], 110, true); });
    if (rf) { const k = c01((ra - 0.3) / 0.6); g.cup(Math.round(HOST - 12 + (SIDE[rf.i] - HOST + 12) * k), Math.round(108 + 2 * k - Math.sin(k * Math.PI) * 5), true); }
    const fl = st.flood != null ? t - st.flood : -1, cups = st.cups || 0, wob = cups >= 6 && fl < 0 ? Math.min(1, (cups - 5) / 3) : 0;
    // coffee on the floor
    if (fl >= 0) { const k = fl < 10 ? c01((fl - 0.6) / 2.5) : c01(1 - (fl - 10) / 3);
      for (let r = 0; r < 8; r++) { const wv = Math.round(Math.sqrt(1 - Math.pow((r - 4) / 4.5, 2)) * 140 * k); if (wv > 0) R(Math.round(TOWER - 5 - wv / 2), 143 + r * 2, wv, 2, r < 1 ? '#7a4a2a' : '#5a3320'); } }
    // cup tower, or the fallen cups
    if (st.toss) { const k = c01((t - st.toss.t) / TOSS); g.cup(Math.round(st.toss.x + (TOWER - 3 - st.toss.x) * k), Math.round(FLOOR - 18 + (110 - cups * 6 - FLOOR + 18) * k - Math.sin(k * Math.PI) * 24), false); }
    if (fl < 0) for (let i = 0; i < cups; i++) { const dx = Math.round(Math.sin(t * 11 + i) * wob * (0.4 + i * 0.12)); g.cup(TOWER - 3 + dx, 110 - i * 6, i === cups - 1); }
    else for (let i = 0; i < MAXCUPS && fl < 14; i++) {
      const vx = (hash(i + 3) - 0.4) * 70, y0 = 116 - i * 6, q = Math.min(fl, 1.6), yy = Math.min(146 + hash(i * 5) * 10, y0 + 40 * q * q * (1 + hash(i) * 0.5)), rest = yy >= 146 + hash(i * 5) * 10 - 0.1;
      const x = TOWER + vx * (rest ? Math.min(fl, 1.1) * 0.9 : q) * (0.6 + hash(i) * 0.5); g.cup(Math.round(x) - 3, Math.round(yy) - 6, false); }
    // biscuits
    R(BIS - 12, 113, 24, 3, '#e8e2d2'); R(BIS - 10, 115, 20, 1, '#cfc8b6');
    for (let i = 0; i < (st.bis == null ? 8 : st.bis); i++) { const bx = BIS - 10 + (i % 4) * 5, by = 110 - Math.floor(i / 4) * 3; disc(bx + 2, by + 1, 2, BISCUIT); R(bx + 1, by, 1, 1, '#6b4420'); }
    if (st.bis === 0) for (let i = 0; i < 4; i++) R(BIS - 8 + i * 5, 113, 1, 1, '#a8782c');
    /* standing tables and the people who have had their turn */
    for (const tx of [470, 518]) { R(tx - 9, 128, 19, 3, '#f7f3ea'); R(tx - 1, 131, 3, 12, '#6f7a80'); R(tx - 5, 142, 11, 2, '#6f7a80'); g.cup(tx - 3, 122, true); }
    GUESTS.forEach((G, i) => { const sip = Math.sin(t * 0.7 + i * 2) > 0.85; person(G.L, G.x, BACK, t + i, G.f, false); cup(G.x + G.f * 5 - 2, sip ? 126 : 131, false, t); });
    if (Math.sin(t * 0.5) > 0.3 && !inner) { const s = Math.floor(t * 0.5 / 6.28) % 2, gx = GUESTS[s].x; R(gx - 6, 112, 12, 8, '#ffffff'); R(gx - 1, 120, 2, 1, '#ffffff'); T('...', gx, 112, 5, INK, 'center'); }
    /* the queue, the presenter and the cabinet */
    const q = st.q || [], order = q.map((p, i) => i).sort((a, b) => q[a].y - q[b].y);
    for (const i of order) { const p = q[i], x = Math.round(p.x), y = Math.round(p.y), inLine = i > act, presenting = i === act && !p.mv;
      if (i === 5) { cabinet(st, t, depth, x, y, presenting); continue; }
      const face = stare && inLine ? Math.sign(g.heroX() - x) || 1 : p.face;
      person(LOOKS[i], x, y - (inLine && !p.mv && Math.sin(t * 1.7 + i * 3) > 0.96 ? 1 : 0), t + i, face, p.mv);
      if (i < act) { const sip = Math.sin(t * 0.8 + i * 1.7) > 0.8; cup(x + face * 5 - 2, y - (sip ? 18 : 13), !sip, t); }
      else if (presenting) { for (let k = 0; k < 9; k++) R(x - 6 - Math.round(k * 0.6), y - 13 - k, 2, 1, k < 6 ? LOOKS[i].top : LOOKS[i].skin); small(i, x - 16, y - 33, t); }
      else small(i, x - 5 + face * 7, y - 12, t);
      if (stare && inLine) { R(x - 6, y - 24, 4, 1, INK); R(x + 2, y - 24, 4, 1, INK); R(x - 1, y - 30 - Math.round(Math.abs(Math.sin(t * 8))), 2, 4, '#e85d5d'); R(x - 1, y - 25, 2, 1, '#e85d5d'); } }
    if (inner) person(g.hero(), g.heroX(), FLOOR, t, 1, false);
    /* the cleaner, after the flood */
    if (!inner && fl >= 3.5 && fl < 14) { let x, mv = true, face = 1;
      if (fl < 6) x = -10 + (fl - 3.5) * 48; else if (fl < 10.5) { x = 110 + Math.sin(fl * 2.5) * 14; mv = Math.abs(Math.cos(fl * 2.5)) > 0.3; face = Math.cos(fl * 2.5) > 0 ? 1 : -1; } else { x = 110 - (fl - 10.5) * 40; face = -1; }
      person(CLEANER, x, 156, t, face, mv); const mx = Math.round(x) + face * 9, sw = fl >= 6 && fl < 10.5 ? Math.round(Math.sin(fl * 5) * 3) : 0;
      line(mx, 154, mx + face * 4 + sw, 134, '#8a6a4a'); R(mx - 4 + face * 2 + sw, 152, 9, 4, '#c8c8c8');
      if (fl >= 6 && fl < 10.5) { R(Math.round(x) - 8, 124, 16, 9, '#ffffff'); T('...', Math.round(x), 125, 6, INK, 'center'); } }
  }

  const place = {
    width: W, floor: FLOOR, spawn: 14, exit: EXIT, host: HOST,
    focus: { urn: 160, graphs: 340, docs: 340, metro: 340, deck: 340, tidy: 340, game: 340 },
    get props() { return [
      { id: 'urn', x: URN, label: 'Pour a coffee' },
      { id: 'biscuits', x: BIS, label: 'Take a biscuit' },
      { id: 'queue', x: 236, label: 'Skip the queue' },
      { id: 'game', x: place._cab || QX + GAP * 5, label: 'Poke the arcade cabinet' },
    ]; },
    enter(st) { Object.assign(st, { cups: 0, side: [true, true, true], refill: null, sip: null, toss: null, bis: 8, flood: null, stare: null, pourT: null, zoom: null, arcade: false, said: 0, act: -1, showT: time(), chgT: time(),
      q: ORDER.map((_, i) => { const [x, y, face] = target(i, -1); return { x, y, face, mv: false }; }) }); },
    update(dt, st, ev) {
      const t = time(), act = actOf(ev);
      if (act !== st.act) { st.act = act; st.showT = t; st.chgT = t; }
      st.q.forEach((p, i) => { const [tx, ty, face] = target(i, act), dx = tx - p.x, slot = i - act - 1;
        if (slot > 0 && dx < 0 && t - st.chgT < slot * 0.2) { p.mv = false; return; }
        p.mv = Math.abs(dx) > 0.5; if (p.mv) { p.face = Math.sign(dx); p.x += Math.sign(dx) * Math.min(Math.abs(dx), Math.max(30, Math.min(130, Math.abs(dx) * 2)) * dt); } else { p.x = tx; p.face = face; }
        p.y += Math.sign(ty - p.y) * Math.min(Math.abs(ty - p.y), 10 * dt); });
      place._cab = Math.round(st.q[5].x);
      if (st.grumps && st.grumps.length && t >= st.grumps[0][0]) { const [, line] = st.grumps.shift(), waiting = st.q.filter((_, i) => i > act), who = (waiting.length ? waiting : st.q)[st.grumps.length ? 0 : (waiting.length || st.q.length) - 1];
        g.say(line, Math.round(who.x), 118, 2.6); }
      if (st.flood != null && t - st.flood > 14) { st.flood = null; st.cups = 0; }
      // the hero's cup is drunk after 1.2 s: the empty joins the tower and Sid refills the counter
      if (st.sip != null && t - st.sip.t > 1.2) { const i = st.sip.i; st.sip = null; st.refill = { i, t }; st.toss = { t, x: g.heroX() }; }
      // the empty cup arcs from the hero's hand on to the top of the tower
      if (st.toss && t - st.toss.t > TOSS) { st.toss = null; st.cups++;
        g.drank(st.cups);
        if (st.cups >= MAXCUPS) { st.flood = t; g.say('Oh no', TOWER, 54); g.egg('coffee', 'Too much coffee'); } }
      if (st.refill && t - st.refill.t > 0.9) { st.side[st.refill.i] = true; st.refill = null; }
    },
    poke(id, st) {
      const t = time();
      if (id === 'host') { g.say(['Flat white?', 'One at a time, please', 'Oat milk is extra', 'That is a lot of coffee'][st.said++ % 4], HOST, 100); return true; }
      if (id === 'urn') {
        if (st.flood != null) { g.say('Mind the floor', URN, 84); return true; }
        const i = st.side.lastIndexOf(true);
        if (i >= 0 && st.sip == null && !st.toss && g.drink(SIDE[i], 110)) { st.side[i] = false; st.sip = { i, t }; st.pourT = t; }
        return true;
      }
      if (id === 'biscuits') { if (st.bis === 1) st.grumps = [[t + 0.7, 'Oi! Those were for everyone'], [t + 2.2, 'Not even a custard cream?']]; if (st.bis > 0) st.bis--; g.say(st.bis ? `Nom. ${st.bis} biscuits left` : 'No biscuits left', BIS, 100); return true; }
      if (id === 'queue') { st.stare = t; const end = QX + GAP * Math.max(0, 5 - Math.max(-1, st.act) - 1); g.say('The queue starts back there', end, 118, 2.4); return true; }
      if (id === 'game') { st.arcade = true; st.zoom = t; g.egg('arcade', 'The game inside the game'); return true; }
    },
    draw(st) { scene(st, 0); },
    drawFront(st) {
      const t = time(), z = st.zoom != null ? t - st.zoom : 99; if (z > 5) return;
      const m = ctx.getTransform(), vx = -m.e / m.a, vw = ctx.canvas.width / m.a, fx = Math.round(vx + vw / 2 - 106), a = c01(Math.min(z * 3, (5 - z) * 3));
      ctx.save(); ctx.globalAlpha = a; R(fx, 14, 212, 126, '#0b0b12'); R(fx + 4, 18, 204, 118, '#2b2160'); R(fx + 8, 22, 196, 110, '#0b0b12');
      ctx.beginPath(); ctx.rect(fx + 10, 24, 192, 106); ctx.clip(); ctx.translate(fx + 10, 24); ctx.scale(0.6, 0.6); ctx.translate(-camX(), 0); scene(st, 1);
      ctx.restore(); ctx.save(); ctx.globalAlpha = a; R(fx + 50, 138, 112, 11, '#0b0b12'); T('THIS ROOM, AGAIN', fx + 106, 140, 7, '#ffffff', 'center'); ctx.restore();
    },
  };
  return place;
};
