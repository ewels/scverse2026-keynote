// Poster hall: MultiQC. Messy tool posters merge into one report, the any-inputs bin, new-feature easels and an empty board.
(window.KEYNOTE_PLACES = window.KEYNOTE_PLACES || {}).posters = g => {
  const { R, T, disc, line, map2d, mix, hash, person, look, time, ctx } = g;
  const W = 780, EXIT = 760, OR = '#f5a623', ORD = '#c97d0e', INK = '#1b2332', PAPER = '#fbf8f1';
  const F = { messy: 154, bin: 322, features: 536, empty: 664 };
  const REP = { x: 112, y: 22, w: 84, h: 98 };
  const PRES = 266, MACH = 354, TABLE = 432, BOARD = 664, EASELS = [476, 516, 556, 596];
  const clamp01 = k => Math.max(0, Math.min(1, k));
  const ease = k => { k = clamp01(k); return k * k * (3 - 2 * k); };
  const lerp = (a, b, k) => a + (b - a) * k;
  const font = size => `${size}px Silkscreen, SilkscreenLocal, "Courier New", monospace`;
  const tw = (s, size) => { ctx.font = font(size); return ctx.measureText(s).width; };
  const shadowT = (s, x, y, size, col, align = 'center', sh = '#1b1016') => { T(s, x + 1, y + 1, size, sh, align); T(s, x, y, size, col, align); };
  const cur = ev => (ev.beat && !ev.walking ? ev.beat.id || ev.beat.at : '');
  // the hackathon cat may only turn up once that room has been visited; the engine has to expose that
  const catOK = () => { try { return typeof g.visited === 'function' && !!g.carry('cat'); } catch (e) { return false; } };

  const LOOKS = {
    reader: { skin: '#f2c9a0', hair: '#5a3d2b', hairStyle: 'swept', top: '#4a7a9a', topStyle: 'sweat', pants: '#2b3445' },
    wander: { skin: '#a86f4c', hair: '#1f1f1f', hairStyle: 'long', top: '#3cc87a', topStyle: 'tee', pants: '#3b3b46' },
    sipA: { skin: '#e8b894', hair: '#d9a441', hairStyle: 'messy', top: '#b28dff', topStyle: 'hoodie', pants: '#2f3a55' },
    sipB: { skin: '#8a5a3c', hair: '#2a1f18', hairStyle: 'bald', beard: true, top: '#e9e9e9', topStyle: 'tee', pants: '#394257' },
    pres: { skin: '#f6d3bd', hair: '#8b5a2b', hairStyle: 'short', top: '#2e8b57', topStyle: 'sweat', pants: '#2b2b36' },
    c1: { skin: '#d9a27c', hair: '#c86a3a', hairStyle: 'long', top: '#6c8cff', topStyle: 'hoodie', pants: '#2b3445' },
    c2: { skin: '#efc6a3', hair: '#1f1f1f', hairStyle: 'short', top: '#e85d5d', topStyle: 'tee', pants: '#3a3f4b' },
    c3: { skin: '#5a3a28', hair: '#111111', hairStyle: 'messy', top: '#2ec4b6', topStyle: 'sweat', pants: '#2b2b36' },
  };

  /* ---------- the ten messy tool posters ---------- */
  const TOOLS = [
    { n: 'FASTQC', bg: '#ffffff', hd: '#e85d5d' }, { n: 'SAMTOOLS', bg: '#fff3c4', hd: '' },
    { n: 'STAR', bg: '#1b2332', hd: '#ffd166' }, { n: 'SALMON', bg: '#fde2e4', hd: '#ff8fa3' },
    { n: 'PICARD', bg: '#e6eeff', hd: '#3b5bdb' }, { n: 'QUALIMAP', bg: '#e9f6e9', hd: '#2f9e44' },
    { n: 'CUTADAPT', bg: '#ffffff', hd: '#9b59b6' }, { n: 'KRAKEN', bg: '#2b2140', hd: '#b28dff' },
    { n: 'BOWTIE2', bg: '#efe4d2', hd: '#8b5a2b' }, { n: 'BCFTOOLS', bg: '#dff6f8', hd: '#1098ad' },
  ];
  const JIT = [[0, 1], [2, -1], [-1, 2], [1, 0], [-2, 1], [0, -2], [2, 2], [-1, -1], [1, 1], [-2, 0]];
  const src = i => { const p = Math.floor(i / 2), b = i % 2, [jx, jy] = JIT[i]; return { x: 60 + p * 40 + jx, y: (b ? 74 : 34) + jy, w: 31 + (i % 3), h: 34 + (i % 2) * 2 }; };
  const dst = i => ({ x: REP.x + 4, y: REP.y + 32 + i * 6.3, w: REP.w - 8, h: 5 });

  const posterArt = (tl, x, y, w, h, t, i) => {
    R(x, y, w, h, tl.bg); R(x, y + h, w, 1, 'rgba(0,0,0,0.25)');
    if (tl.hd) R(x, y, w, 6, tl.hd);
    T(tl.n, x + w / 2, y + 1, 4, tl.hd ? (tl.hd === '#ffd166' ? INK : '#ffffff') : '#c0392b', 'center');
    const sw = w - 12, sh = h - 15;
    for (let f = 2; f >= 0; f--) {
      const sx = x + 3 + f * 3, sy = y + 8 + f * 2;
      R(sx, sy, sw, sh, '#ffffff'); R(sx, sy + sh, sw, 1, '#9aa0a6'); R(sx + sw, sy, 1, sh + 1, '#9aa0a6');
    }
    T('S1', x + 5, y + 9, 4, '#e8590c');
    for (let r = 0; r < 5; r++) { const ry = y + 16 + r * 3; R(x + 5, ry, 3 + Math.floor(hash(i * 7 + r) * 6), 1, '#9aa0a6'); const vw = 2 + Math.floor(hash(i * 5 + r + 50) * 4); R(x + 3 + sw - 2 - vw, ry, vw, 1, '#3a3f4a'); }
    R(x + w / 2 - 1, y - 1, 2, 2, ['#e85d5d', '#2fb67c', '#6c8cff'][i % 3]);
  };

  // The merged report: header, a general stats table and one section strip per tool that has landed.
  const mergeK = ev => ev.beatIdx > 1 || (ev.beatIdx === 1 && ev.walking) ? 99 : cur(ev) === 'merge' ? ev.stepT : -1;
  const landing = ev => { const k = mergeK(ev); if (k < 0) return null; const land = []; for (let i = 0; i < 10; i++) land.push(ease((k - 0.6 - i * 0.16) / 0.9)); return land; };
  const reportFrame = ev => {
    const k = mergeK(ev); if (k < 0) return;
    const a = clamp01((k - 0.1) / 0.5), { x, y, w, h } = REP;
    if (a > 0) {
      const lx = x + w / 2;
      R(lx - 26, y + h, 3, 28, '#5a3a22'); R(lx + 23, y + h, 3, 28, '#5a3a22'); R(lx - 1, y + h, 2, 26, '#4a2e1a'); R(lx - 26, 132, 52, 2, '#4a2e1a');
      const ht = Math.round(h * ease(a));
      R(x - 2, y - 2, w + 4, ht + 4, '#3b3f47'); R(x, y, w, ht, PAPER);
      if (a >= 1) {
        R(x, y, w, 12, OR); R(x, y + 11, w, 1, ORD);
        for (let b = 0; b < 4; b++) R(x + 4 + b * 3, y + 9 - (b + 1) * 2, 2, (b + 1) * 2, '#ffffff');
        T('MULTIQC', x + w / 2 + 6, y + 3, 6, '#ffffff', 'center');
        for (let r = 0; r < 4; r++) for (let c = 0; c < 5; c++) R(x + 4 + c * 15.2, y + 15 + r * 4, 14, 3, r === 0 ? '#3a3f4a' : mix('#ffffff', ['#2fb67c', '#f5a623', '#6c8cff', '#e85d5d', '#2fb67c'][c], 0.25 + hash(r * 5 + c) * 0.45));
      }
    }
  };
  const section = (i, t) => {
    const d = dst(i), tl = TOOLS[i];
    R(d.x, d.y, d.w, d.h, '#ffffff'); R(d.x, d.y, 2, d.h, tl.hd || '#c0392b');
    T(tl.n, d.x + 4, d.y, 4, '#3a3f4a');
    for (let b = 0; b < 8; b++) R(d.x + 44 + b * 4, d.y + d.h - 1 - Math.round(1 + hash(i * 9 + b) * 3), 3, Math.round(1 + hash(i * 9 + b) * 3), tl.hd || '#c0392b');
  };

  /* ---------- things for the bin ---------- */
  const CAT = ['f.......f', 'ff.....ff', 'fffsfsfff', 'fefffffef', 'fffffffff', 'ffwwnwwff', '.fwwwwwf.', '..fffff..'];
  const OBJ = {
    cup: { c: '#6b4a2f', d: (x, y) => { R(x - 3, y - 3, 6, 7, '#f7f3ea'); R(x - 3, y - 3, 6, 1, '#6b4a2f'); R(x + 3, y - 1, 2, 1, '#f7f3ea'); R(x + 4, y - 1, 1, 3, '#f7f3ea'); R(x + 3, y + 1, 2, 1, '#f7f3ea'); R(x - 3, y + 2, 6, 1, OR); } },
    shoe: { c: '#c0392b', d: (x, y) => { R(x - 4, y - 3, 4, 4, '#c0392b'); R(x - 4, y, 9, 3, '#c0392b'); R(x - 4, y + 3, 9, 1, '#f7f3ea'); R(x - 1, y - 1, 1, 1, '#ffffff'); R(x + 1, y, 1, 1, '#ffffff'); } },
    duck: { c: '#f2c230', d: (x, y) => { disc(x, y + 1, 3, '#f2c230'); disc(x + 2, y - 3, 2, '#f2c230'); R(x + 4, y - 3, 2, 1, '#e8590c'); R(x + 2, y - 4, 1, 1, INK); } },
    log: { c: '#3a3f4a', d: (x, y) => { R(x - 3, y - 4, 7, 9, '#ffffff'); R(x + 2, y - 4, 2, 2, '#c8ccd2'); for (let r = 0; r < 3; r++) R(x - 2, y - 1 + r * 2, 4 + (r % 2), 1, '#3a3f4a'); } },
    banana: { c: '#e8c547', d: (x, y) => { for (let k = 0; k < 9; k++) R(x - 4 + k, y + Math.round(Math.pow((k - 4) / 4, 2) * 3) - 2, 1, 2, '#e8c547'); R(x - 5, y, 1, 1, '#6b4a2f'); } },
    sock: { c: '#2ec4b6', d: (x, y) => { R(x - 2, y - 4, 4, 7, '#2ec4b6'); R(x - 2, y + 1, 7, 3, '#2ec4b6'); R(x - 2, y - 2, 4, 1, '#ffffff'); R(x - 2, y, 4, 1, '#ffffff'); } },
    cat: { c: '#e8913a', d: (x, y) => map2d(CAT, x - 4, y - 4, { f: '#e8913a', s: '#c06a22', e: '#3d8a3a', w: '#f6efe2', n: '#e88aa0' }) },
  };
  const binList = () => { const l = ['cup', 'shoe', 'log', 'duck', 'banana', 'sock']; if (catOK()) l.splice(2, 0, 'cat'); return l; };
  const card = (x, y, kind) => {
    x = Math.round(x); y = Math.round(y);
    R(x, y, 16, 11, '#ffffff'); R(x, y + 11, 16, 1, '#9aa0a6'); R(x, y, 16, 3, OBJ[kind].c);
    for (let b = 0; b < 4; b++) { const hh = 1 + Math.round(hash(kind.length * 7 + b) * 5); R(x + 2 + b * 3, y + 10 - hh, 2, hh, OBJ[kind].c); }
    R(x + 14, y + 5, 1, 4, '#c8ccd2');
  };
  const BIN_P = 2.4;

  const machine = (st, ev, t) => {
    const run = cur(ev) === 'inputs' || (st.throwT != null && t - st.throwT < BIN_P), u = run ? ((cur(ev) === 'inputs' ? ev.stepT : t - st.throwT) % BIN_P) / BIN_P : 0;
    const churn = run && u > 0.35 && u < 0.62, sh = churn ? Math.round(Math.sin(t * 40) * 0.6) : 0, x = MACH - 20 + sh;
    R(MACH - 34, 32, 68, 13, '#3b3f47'); R(MACH - 33, 33, 66, 11, OR); shadowT('ANY INPUTS', MACH, 35, 7, '#ffffff', 'center', ORD);
    R(MACH - 24, 26, 1, 6, '#6f7a80'); R(MACH + 23, 26, 1, 6, '#6f7a80');
    for (let r = 0; r < 26; r++) { const hw = Math.round(24 - r * 0.5); R(MACH - hw + sh, 64 + r, hw * 2, 1, r === 0 ? '#9aa7b8' : r % 6 ? '#6f7f93' : '#5a6878'); }
    R(MACH - 25 + sh, 62, 50, 3, '#9aa7b8');
    R(x, 90, 40, 56, '#4a5563'); R(x, 90, 40, 2, '#6f7f93'); R(x + 38, 90, 2, 56, '#3a4250'); R(x, 104, 40, 3, OR);
    R(x + 5, 110, 30, 18, '#232a36'); R(x + 6, 111, 28, 16, '#2d3646');
    for (const [gx, gy, gr, sp] of [[x + 14, 119, 6, 1], [x + 26, 117, 5, -1.3]]) {
      disc(gx, gy, gr, '#8a96a8'); disc(gx, gy, 2, '#2d3646');
      const a0 = t * (run ? 4 : 0.6) * sp; for (let k = 0; k < 6; k++) { const a = a0 + k * 1.047; R(Math.round(gx + Math.cos(a) * (gr + 1)) - 1, Math.round(gy + Math.sin(a) * (gr + 1)) - 1, 2, 2, '#8a96a8'); }
    }
    for (let k = 0; k < 3; k++) { const on = run ? Math.floor(t * 2 + k) % 3 === 0 : k === 0; disc(x + 9 + k * 11, 97, 2, on ? ['#2fb67c', '#ffd166', '#e85d5d'][k] : '#2b313b'); }
    T('MULTIQC', x + 20, 133, 5, '#e6e9f0', 'center');
    R(x + 40, 112, 10, 3, '#3a4250'); R(x + 40, 115, 12, 1, '#2b313b');
    R(MACH + 30, 128, 28, 2, '#6f7a80'); R(MACH + 32, 130, 2, 18, '#5a6470'); R(MACH + 54, 130, 2, 18, '#5a6470');
    return { run, u };
  };

  /* ---------- feature easels ---------- */
  const easelLegs = (cx, top, w) => { R(cx - w / 2 + 1, top, 2, 148 - top, '#5a3a22'); R(cx + w / 2 - 3, top, 2, 148 - top, '#5a3a22'); R(cx - 1, top, 2, 146 - top, '#4a2e1a'); R(cx - w / 2 - 1, top - 1, w + 2, 2, '#4a2e1a'); R(cx - w / 2 + 1, 130, w - 2, 1, '#4a2e1a'); };
  const star = (x, y, t, s = 1) => { const r = 5 * s; for (let k = 0; k < 8; k++) { const a = k * 0.785 + t * 0.6; line(x, y, Math.round(x + Math.cos(a) * r), Math.round(y + Math.sin(a) * r), '#e8590c'); } disc(x, y, Math.round(3.5 * s), '#e8590c'); T('NEW', x, y - 2 * s, 3 * s, '#ffffff', 'center'); };
  const miniFeature = (k, x, y, w, h, t) => {
    R(x, y, w, h, PAPER); R(x, y, w, 7, OR); T(['CONFIG', 'LICENCE', 'ECHARTS', 'PARQUET'][k], x + w / 2, y + 1, 4, '#ffffff', 'center');
    const cx = x + 3, cy = y + 10;
    if (k === 0) { for (let r = 0; r < 4; r++) { R(cx, cy + r * 7, 12, 4, '#e6dccb'); R(cx + 15, cy + r * 7, 13, 4, r % 2 ? '#2fb67c' : '#c8ccd2'); } }
    if (k === 1) { for (let r = 0; r < 5; r++) { R(cx, cy + r * 6, 10, 2, '#5a6478'); R(cx + 12, cy + r * 6 - 1, 7, 4, '#2fb67c'); R(cx + 21, cy + r * 6 - 1, 7, 4, '#3b6fb6'); } }
    if (k === 2) { R(cx, cy + 26, w - 6, 1, '#9aa0a6'); [['#6c8cff', 0], ['#e85d5d', 1], ['#2fb67c', 2]].forEach(([c, s]) => { for (let q = 0; q < w - 7; q++) R(cx + q, cy + 22 - Math.round(Math.sin(q * 0.25 + s + t * 0.6) * 4 + s * 4 + q * 0.15), 1, 1, c); }); }
    if (k === 3) { ['#f5a623', '#6c8cff', '#2fb67c', '#b28dff', '#e85d5d'].forEach((c, j) => { R(cx + j * 6, cy, 5, 26, mix(c, '#ffffff', 0.55)); for (let r = 0; r < 26; r += 3) R(cx + j * 6, cy + r, 5, 2, c); }); }
  };

  /* ---------- the empty board ---------- */
  const BX = BOARD - 42, BY = 32, BW = 84, BH = 76;
  const suffixLine = (pre, suf, x, y, size, ink) => { const w = tw(pre + suf, size), x0 = x - w / 2; T(pre, x0, y, size, ink); T(suf, x0 + tw(pre, size), y, size, '#e8590c'); return x0 + w; };
  const tick = (x, y, c) => { line(x, y + 2, x + 2, y + 4, c); line(x + 2, y + 4, x + 6, y, c); };
  const emptyBoard = (st, ev, t) => {
    const id = cur(ev), done = ev.beatIdx >= 5 && id !== 'logs';
    easelLegs(BOARD, BY + BH, BW);
    R(BX - 2, BY - 2, BW + 4, BH + 4, '#3b3f47'); R(BX, BY, BW, BH, '#5b6472');
    for (let k = 0; k < 20; k++) R(BX + Math.floor(hash(k + 70) * BW), BY + Math.floor(hash(k + 90) * BH), 1, 1, '#66707e');
    if (st.selfie != null && t - st.selfie < 4) {
      R(BX + 4, BY + 4, BW - 8, BH - 8, PAPER); R(BX + 4, BY + 4, BW - 8, 12, OR); shadowT('YOU', BOARD, BY + 6, 7, '#ffffff', 'center', ORD);
      person(g.hero(), BOARD, BY + BH - 8, t, 1, false, 2);
      return;
    }
    if (id === 'logs') {
      if (st.lkB !== ev.beatIdx) { st.lkB = ev.beatIdx; st.lk0 = null; }
      if (ev.walking) st.lk0 = null; else if (st.lk0 == null) st.lk0 = t;
      const k = st.lk0 == null ? 0 : t - st.lk0;
      R(BX + 4, BY + 4, BW - 8, BH - 8, PAPER);
      T('OUT.TXT', BOARD, BY + 8, 6, '#9aa0a6', 'center'); if (k > 0.3) { const w = tw('OUT.TXT', 6); R(Math.round(BOARD - w / 2 - 2), BY + 11, Math.min(w + 4, (k - 0.3) * 120), 2, '#e03131'); }
      ['S1', 'S2', 'S3'].forEach((s, i) => { if (k > 0.6 + i * 0.3) { const e = suffixLine(s, '.mytool.json', BOARD - 4, BY + 19 + i * 9, 5, INK); tick(e + 2, BY + 19 + i * 9, '#2fb67c'); } });
      if (k > 1.6) {
        R(BX + 6, BY + 46, BW - 12, 26, '#1b2332');
        const L = ['MYTOOL V2.1', 'SAMPLE   S1', 'READS  1.2M', 'PASSED  98%'], n = Math.floor((k - 1.6) * 30);
        let c = n; L.forEach((s, i) => { const vis = s.slice(0, Math.max(0, Math.min(s.length, c))); c -= s.length; T(vis, BX + 9, BY + 48 + i * 6, 5, i ? '#a9e34b' : '#ffd166'); });
      }
      return;
    }
    if (id === 'modules' || done) {
      const k = id === 'modules' ? ev.stepT : 9, a = ease(k / 0.6);
      R(BX + 4, BY + 4, BW - 8, Math.round((BH - 8) * a), PAPER);
      if (a >= 1) {
        R(BX + 4, BY + 4, BW - 8, 12, OR); shadowT('MYTOOL', BOARD, BY + 6, 7, '#ffffff', 'center', ORD);
        T('NEW MODULE', BOARD, BY + 19, 5, INK, 'center');
        R(BX + 10, BY + 66, BW - 20, 1, '#9aa0a6');
        for (let b = 0; b < 8; b++) { const hh = Math.round((8 + hash(b + 31) * 30) * ease((k - 0.7 - b * 0.12) / 0.5)); R(BX + 12 + b * 8, BY + 66 - hh, 6, hh, b % 2 ? OR : '#6c8cff'); }
        if (k > 2) star(BX + BW - 6, BY + 4, t, 1.3);
      }
      return;
    }
    for (let x = BX + 5; x < BX + BW - 5; x += 6) { R(x, BY + 5, 3, 1, '#c8ccd2'); R(x, BY + BH - 6, 3, 1, '#c8ccd2'); }
    for (let y = BY + 5; y < BY + BH - 5; y += 6) { R(BX + 5, y, 1, 3, '#c8ccd2'); R(BX + BW - 6, y, 1, 3, '#c8ccd2'); }
    ['YOUR', 'MODULE', 'HERE'].forEach((s, i) => shadowT(s, BOARD, BY + 18 + i * 13, 9, '#ffffff', 'center', '#2b313b'));
  };

  /* ---------- the hall ---------- */
  const hall = t => {
    R(0, 0, W, 146, '#e6dccb');
    for (let x = 0; x < W; x += 40) R(x, 12, 1, 128, '#ddd2bf');
    R(0, 0, W, 12, '#2f2a35'); R(0, 12, W, 2, '#4a4252');
    for (let x = 4; x < W; x += 16) line(x, 1, x + 8, 10, '#3d3645');
    for (let x = 60; x < W; x += 120) { R(x - 4, 12, 8, 4, '#4a4252'); R(x - 3, 16, 6, 2, '#ffe9a8');
      ctx.globalAlpha = 0.07; for (let y = 18; y < 146; y += 2) { const hw = 3 + (y - 18) * 0.28; R(Math.round(x - hw), y, Math.round(hw * 2), 2, '#fff3c4'); } ctx.globalAlpha = 1; }
    for (let x = 12, k = 0; x < W - 20; x += 22, k++) {
      if (x > 40 && x < 250) continue;
      R(x, 18, 18, 22, '#cfc3ae'); R(x + 1, 19, 16, 20, mix(['#f2e6d6', '#e6eef6', '#f6e6e6', '#eaf2e2'][k % 4], '#e6dccb', 0.3)); R(x + 1, 19, 16, 3, mix(['#e85d5d', '#6c8cff', '#2fb67c', OR, '#b28dff'][k % 5], '#e6dccb', 0.45));
      for (let r = 0; r < 4; r++) R(x + 3, 24 + r * 4, 6 + Math.floor(hash(k * 4 + r) * 7), 1, '#c8bfae');
      T(`A${k + 1}`, x + 9, 41, 4, '#a89c88', 'center');
    }
    R(0, 138, W, 8, '#c8b89e'); R(0, 138, W, 1, '#b3a387');
  };
  const carpet = () => {
    R(0, 146, W, 34, '#7a2e2a'); R(0, 146, W, 1, '#5e221f');
    for (let y = 150; y < 180; y += 8) for (let x = ((y / 8) % 2) * 8; x < W; x += 16) { R(x + 3, y, 2, 1, '#9a3d32'); R(x + 2, y + 1, 4, 1, '#9a3d32'); R(x + 3, y + 2, 2, 1, '#9a3d32'); }
    for (let x = 0; x < W; x += 4) R(x, 172, 2, 1, '#8c3a30');
  };
  const panel = (cx, posters) => {
    R(cx - 19, 30, 38, 82, '#3b3f47'); R(cx - 18, 31, 36, 80, '#5b6472');
    for (let k = 0; k < 8; k++) R(cx - 17 + Math.floor(hash(cx + k) * 34), 33 + Math.floor(hash(cx * 2 + k) * 76), 1, 1, '#66707e');
    R(cx - 15, 112, 3, 36, '#3b3f47'); R(cx + 12, 112, 3, 36, '#3b3f47'); R(cx - 18, 146, 9, 2, '#2b2e31'); R(cx + 9, 146, 9, 2, '#2b2e31');
    if (!posters) { R(cx - 1, 33, 2, 2, '#e85d5d'); R(cx + 3, 74, 2, 2, '#2fb67c'); }
  };
  const signEasel = (st, t) => { ctx.save(); ctx.translate(-6, 0); signEasel0(st, t); ctx.restore(); };
  const signEasel0 = (st, t) => {
    const dt = st.easelT != null ? t - st.easelT : 99, down = st.easelDown;
    if (down) {
      const fall = clamp01(dt / 0.35);
      if (fall < 1) { const tilt = fall * 26; R(22 + tilt * 0.4, 100 + tilt, 30, 32 - tilt * 0.6, '#3b3f47'); return; }
      R(16, 141, 40, 6, '#5a3a22'); R(18, 140, 34, 5, PAPER); R(18, 140, 34, 1, OR); return;
    }
    const wob = dt < 1.2 ? Math.round(Math.sin(dt * 22) * 3 * (1.2 - dt) * (1 + st.easelN * 0.5)) : 0;
    line(26 + wob, 100, 20, 148, '#5a3a22'); line(46 + wob, 100, 52, 148, '#5a3a22'); line(36 + wob, 100, 36, 146, '#4a2e1a');
    R(20 + wob, 96, 32, 34, '#3b3f47'); R(22 + wob, 98, 28, 30, PAPER); R(22 + wob, 98, 28, 7, OR);
    T('POSTERS', 36 + wob, 99, 4, '#ffffff', 'center'); T('A1-A20', 36 + wob, 108, 5, INK, 'center');
    R(28 + wob, 118, 14, 2, INK); R(42 + wob, 116, 1, 6, INK); R(43 + wob, 117, 1, 4, INK); R(44 + wob, 118, 1, 2, INK);
  };
  const coffeeTable = (st, t) => {
    R(TABLE - 20, 124, 40, 3, '#f7f3ea'); R(TABLE - 20, 127, 40, 8, OR); R(TABLE - 20, 134, 40, 1, ORD);
    R(TABLE - 18, 135, 2, 13, '#4a2e1a'); R(TABLE + 16, 135, 2, 13, '#4a2e1a');
    R(TABLE - 17, 108, 9, 16, '#b8c0c8'); R(TABLE - 18, 106, 11, 3, '#8a96a8'); R(TABLE - 14, 104, 3, 2, '#8a96a8'); R(TABLE - 8, 116, 3, 2, '#8a96a8');
    for (let i = 0; i < 3; i++) { const p = ((t * 0.5 + i / 3) % 1); R(Math.round(TABLE - 13 + Math.sin(p * 6 + i) * 2), Math.round(103 - p * 12), 1, 2, '#ffffff'); }
    const n = st.cups, rows = [4, 3, 2, 1]; let c = 0;
    rows.forEach((m, r) => { for (let j = 0; j < m; j++) { if (c++ >= n) return; const x = TABLE - 4 + r * 2.5 + j * 5, y = 119 - r * 5; R(Math.round(x), y, 4, 5, '#f7f3ea'); R(Math.round(x), y, 4, 1, '#d8d0c0'); } });
    for (const f of st.fallen) { R(Math.round(f.x), Math.round(f.y), 4, 3, '#f7f3ea'); R(Math.round(f.x) + (f.vx > 0 ? 3 : 0), Math.round(f.y), 1, 3, '#d8d0c0'); }
  };
  const presBoard = t => {
    R(PRES + 10, 40, 36, 60, '#3b3f47'); R(PRES + 12, 42, 32, 56, PAPER); R(PRES + 12, 42, 32, 7, '#2e8b57'); T('P < 0.05?', PRES + 28, 43, 4, '#ffffff', 'center');
    R(PRES + 16, 86, 24, 1, '#9aa0a6');
    [[0, 18], [1, 22], [2, 15], [3, 24]].forEach(([i, hh]) => { R(PRES + 17 + i * 6, 86 - hh, 4, hh, i % 2 ? '#2e8b57' : '#9aa0a6'); R(PRES + 18 + i * 6, 86 - hh - 5, 1, 9, INK); R(PRES + 17 + i * 6, 86 - hh - 5, 3, 1, INK); });
    T('*', PRES + 38, 52, 6, '#e03131', 'center'); T('???', PRES + 28, 89, 4, '#5a6478', 'center');
    easelLegs(PRES + 28, 100, 36);
  };
  const exitDoor = () => { R(EXIT - 12, 100, 24, 46, '#f7f3ea'); R(EXIT - 9, 103, 18, 43, '#1b2030'); R(EXIT - 12, 88, 24, 9, '#2fb67c'); T('EXIT', EXIT, 89.5, 5, '#ffffff', 'center'); };
  const cupInHand = (x, face, feet, up) => { R(Math.round(x) + face * 5 - (face < 0 ? 1 : 0), feet - (up ? 15 : 11), 3, 4, '#f7f3ea'); R(Math.round(x) + face * 5 - (face < 0 ? 1 : 0), feet - (up ? 15 : 11), 3, 1, '#6b4a2f'); };

  let hx = 66;
  const HOSTX = { messy: 210, merge: 210, inputs: 396, logs: 630, modules: 630 };
  const PRES_LINES = ['So, in my first year...', 'As you can see in panel C...', 'It is nearly significant!', 'Wait, where are you going?', '...and that was the intro.'];

  /* ---------- featurette: the new-feature posters, zoomed ---------- */
  const fFrame = (title, t) => {
    R(0, 0, 320, 180, '#3a2c33'); for (let x = 0; x < 320; x += 24) R(x, 0, 12, 150, '#3f3038');
    R(0, 150, 320, 30, '#7a2e2a'); for (let x = 0; x < 320; x += 16) R(x + 6, 160 + (x % 32 ? 0 : 6), 4, 2, '#9a3d32');
    line(84, 150, 70, 178, '#5a3a22'); line(236, 150, 250, 178, '#5a3a22');
    R(42, 6, 236, 148, '#2b2e31'); R(44, 8, 232, 144, PAPER);
    R(44, 8, 232, 20, OR); R(44, 27, 232, 1, ORD);
    const ts = tw(title, 11) > 196 ? 8 : 11; shadowT(title, 152, 18 - ts * 0.6, ts, '#ffffff', 'center', ORD);
    star(262, 14, t, 1.8);
  };
  const cursor = (x, y, click) => { x = Math.round(x); y = Math.round(y); map2d(['k.....', 'kk....', 'kwk...', 'kwwk..', 'kwwwk.', 'kwwwwk', 'kwwkkk', 'kk.k..', 'k...k.'], x, y, { k: INK, w: '#ffffff' });
    if (click > 0) { const r = Math.round(2 + (1 - click) * 6); for (let a = 0; a < 16; a++) R(Math.round(x + Math.cos(a * 0.39) * r), Math.round(y + Math.sin(a * 0.39) * r), 1, 1, '#e8590c'); } };

  const fConfig = t => {
    fFrame('CONFIG BUILDER', t);
    const P = 10, k = t % P;
    const FIELDS = [['TITLE', 'My QC report'], ['LOGO', 'lab_logo.png'], ['SAMPLE NAMES', 'Trim "_R1"'], ['HIDE COLUMN', 'FastQC dups']];
    const YAML = [['title: "My QC report"'], ['custom_logo: lab_logo.png'], ['fn_clean_exts:', '  - "_R1"'], ['table_columns_visible:', '  fastqc:', '    dups: false']];
    R(52, 34, 98, 112, '#f1ece2');
    FIELDS.forEach(([l, v], i) => { const y = 38 + i * 27, on = k > 0.8 + i * 1.6;
      T(l, 56, y, 5, '#5a6478'); R(56, y + 8, 88, 12, '#ffffff'); R(56, y + 8, 88, 1, on ? OR : '#c8ccd2'); R(56, y + 19, 88, 1, on ? OR : '#c8ccd2');
      if (on) { const n = Math.min(v.length, Math.floor((k - 0.8 - i * 1.6) * 18)); T(v.slice(0, n), 59, y + 11, 5, INK); } });
    R(156, 34, 112, 112, '#1b2332'); T('multiqc_config.yaml', 160, 37, 4, '#7f8aab'); R(156, 44, 112, 1, '#2b3550');
    let y = 48;
    YAML.forEach((ls, i) => { if (k > 1.2 + i * 1.6) ls.forEach(s => { const [key, ...rest] = s.split(':'); T(key + (rest.length ? ':' : ''), 160, y, 5, '#ffd166'); if (rest.length) T(rest.join(':'), 160 + tw(key + ':', 5), y, 5, '#a9e34b'); y += 9; }); });
    // four fields then the copy button; the first move starts from the button, where the last loop ended
    const TG = [[120, 52], [120, 79], [120, 106], [120, 133], [212, 136]];
    const seg = Math.max(0, k - 0.2) / 1.6, fi = k > 7 ? 4 : Math.min(3, Math.floor(seg)), u = seg >= 4 ? 9 : (seg % 1) * 1.6;
    const m = fi === 4 ? ease((k - 7) / 0.5) : k < 0.2 ? 0 : ease(u / 0.6), [ax, ay] = TG[(fi + 4) % 5], [bx, by] = TG[fi];
    if (k > 7) { R(178, 130, 68, 12, k > 7.6 ? '#2fb67c' : OR); T(k > 7.6 ? 'COPIED!' : 'COPY YAML', 212, 133, 5, '#ffffff', 'center'); }
    cursor(lerp(ax, bx, m), lerp(ay, by, m), k > 7.5 && k < 7.9 ? (7.9 - k) / 0.4 : fi < 4 && u >= 0.6 && u < 0.9 ? 1 - (u - 0.6) / 0.3 : 0);
  };
  const fLicences = t => {
    fFrame('LICENCES AND DOIS', t);
    const ROWS = [['FASTQC', 'GPL-3.0'], ['SAMTOOLS', 'MIT'], ['STAR', 'MIT'], ['SALMON', 'GPL-3.0'], ['CUTADAPT', 'MIT']];
    T('TOOL', 56, 34, 5, '#7f8aab'); T('LICENCE', 152, 34, 5, '#7f8aab'); T('CITE', 222, 34, 5, '#7f8aab'); R(52, 42, 216, 1, '#c8ccd2');
    ROWS.forEach(([n, l], i) => { const y = 48 + i * 17;
      T(n, 56, y + 1, 7, INK); R(52, y + 13, 216, 1, '#ebe5da');
      const a = t - 0.5 - i * 0.55;
      if (a > 0) { const s = a < 0.15 ? 2 : 0; R(150 - s, y - s, 52 + s * 2, 11 + s * 2, '#2f9e44'); T(l, 176, y + 2, 6, '#ffffff', 'center'); }
      if (a > 0.25) { const s = a < 0.4 ? 2 : 0; R(214 - s, y - s, 44 + s * 2, 11 + s * 2, '#3b6fb6'); T('DOI', 230, y + 2, 6, '#ffffff', 'center');
        R(244, y + 4, 4, 3, '#ffffff'); R(249, y + 4, 4, 3, '#ffffff'); R(245, y + 5, 2, 1, '#3b6fb6'); R(250, y + 5, 2, 1, '#3b6fb6'); R(247, y + 5, 2, 1, '#ffffff'); }
    });
    if (t > 3.6) { R(52, 134, 216, 14, '#fff3c4'); T('CREDIT THE TOOLS YOU USED', 160, 137, 6, '#8a5a00', 'center'); }
  };
  const SER = ['#6c8cff', '#e85d5d', '#2fb67c', '#f5a623', '#b28dff'];
  const fy = (s, v) => 30 + 34 * Math.exp(-((v - 30 - s * 5) ** 2) / (120 + s * 40)) + 10 * Math.sin(v * 0.12 + s) * 0.4 + s * 3;
  const fEcharts = t => {
    fFrame('ECHARTS PLOTS', t);
    const P = 7, k = t % P, X0 = 66, X1 = 262, Y0 = 38, Y1 = 130, d0 = 0, d1 = 100;
    const px = v => X0 + (v - d0) / (d1 - d0) * (X1 - X0), py = v => Y1 - (v / 80) * (Y1 - Y0);
    for (let v = 0; v <= 80; v += 20) { R(X0, Math.round(py(v)), X1 - X0, 1, '#ebe5da'); T(String(v), X0 - 3, Math.round(py(v)) - 3, 4, '#7f8aab', 'right'); }
    R(X0, Y0, 1, Y1 - Y0, '#9aa0a6'); R(X0, Y1, X1 - X0, 1, '#9aa0a6');
    const reveal = ease(k / 1.6);
    SER.forEach((c, s) => { let last = null;
      for (let sx = X0; sx <= X0 + (X1 - X0) * reveal; sx++) { const v = d0 + (sx - X0) / (X1 - X0) * (d1 - d0), y = Math.round(py(fy(s, v)));
        if (last != null) line(sx - 1, last, sx, y, c); last = y; } });
    if (k > 1.8 && k < 4.6) {
      const hv = lerp(15, 70, ease((k - 1.8) / 2.6)), hxp = Math.round(px(hv));
      for (let y = Y0; y < Y1; y += 3) R(hxp, y, 1, 2, '#7f8aab');
      SER.forEach((c, s) => disc(hxp, Math.round(py(fy(s, hv))), 2, c));
      const bx = hxp + (hxp > 190 ? -66 : 8); R(bx, 46, 58, 34, '#ffffff'); R(bx, 46, 58, 1, '#9aa0a6'); R(bx, 79, 58, 1, '#9aa0a6'); R(bx, 46, 1, 34, '#9aa0a6'); R(bx + 57, 46, 1, 34, '#9aa0a6');
      T(`POS ${Math.round(hv)}`, bx + 4, 49, 5, INK);
      [0, 1, 2].forEach(s => { R(bx + 4, 60 + s * 7, 3, 3, SER[s]); T(`S${s + 1} ${fy(s, hv).toFixed(1)}`, bx + 10, 58 + s * 7, 5, '#3a3f4a'); });
      cursor(hxp + 1, 100, 0);
    }
    if (k > 4.8) { R(52, 134, 216, 14, '#fff3c4'); T('STATIC EXPORTS WITHOUT CHROMIUM', 160, 137, 6, '#8a5a00', 'center'); }
    else SER.forEach((c, s) => { R(72 + s * 38, 138, 6, 4, c); T(`S${s + 1}`, 81 + s * 38, 137, 5, '#3a3f4a'); });
  };
  const arrow = (x0, y, x1, c, t) => { R(x0, y, x1 - x0, 2, c); for (let i = 0; i < 4; i++) R(x1 - 4 + i, y - 3 + i, 1, 8 - i * 2, c); const p = ((t * 0.9) % 1); R(Math.round(lerp(x0, x1 - 6, p)), y - 1, 4, 4, '#e8590c'); };
  const pq = (x, y, s, lab) => { ['#f5a623', '#6c8cff', '#2fb67c', '#b28dff'].forEach((c, j) => { R(x + j * 7 * s, y, 6 * s, 26 * s, mix(c, '#ffffff', 0.55)); for (let r = 0; r < 26 * s; r += 4) R(x + j * 7 * s, y + r, 6 * s, 2, c); }); if (lab) T(lab, x + 14 * s, y + 26 * s + 3, 5, INK, 'center'); };
  const fParquet = t => {
    fFrame('PARQUET + PREPROCESSING', t);
    for (let i = 0; i < 6; i++) { const x = 54 + i * 3, y = 36 + i * 2; R(x, y, 22, 28, '#ffffff'); R(x, y, 22, 1, '#9aa0a6'); R(x, y + 27, 22, 1, '#9aa0a6'); R(x, y, 1, 28, '#9aa0a6'); R(x + 21, y, 1, 28, '#9aa0a6'); for (let r = 0; r < 4; r++) R(x + 3, y + 6 + r * 5, 12 + (r % 2) * 4, 1, '#c8ccd2'); }
    T('1000s', 70, 77, 6, INK, 'center'); T('OF LOGS', 70, 86, 5, '#5a6478', 'center');
    arrow(96, 56, 124, '#9aa0a6', t);
    R(126, 42, 56, 30, OR); R(126, 71, 56, 2, ORD); shadowT('MULTIQC', 154, 47, 7, '#ffffff', 'center', ORD); T('ONCE', 154, 59, 5, '#ffffff', 'center');
    arrow(184, 56, 210, '#9aa0a6', t + 0.4);
    pq(214, 38, 1, '.PARQUET');
    R(52, 96, 216, 1, '#ebe5da');
    const runs = ['RUN 1', 'RUN 2', 'RUN 3'];
    runs.forEach((r, i) => { const y = 102 + i * 16; pq(56, y, 0.45, ''); T(r, 74, y + 3, 6, INK); });
    const p = (t * 0.6) % 1;
    for (let i = 0; i < 3; i++) { line(108, 108 + i * 16, 168, 124, '#9aa0a6'); const q = (p + i * 0.33) % 1; R(Math.round(lerp(108, 166, q)) - 1, Math.round(lerp(108 + i * 16, 124, q)) - 1, 3, 3, '#e8590c'); }
    R(172, 104, 44, 40, '#ffffff'); R(172, 104, 44, 7, OR); T('MULTIQC', 194, 105, 4, '#ffffff', 'center');
    for (let b = 0; b < 6; b++) { const hh = 6 + Math.round(hash(b + 3) * 20); R(176 + b * 6, 140 - hh, 4, hh, SER[b % 5]); }
    T('ONE', 244, 112, 7, INK, 'center'); T('REPORT', 244, 122, 6, INK, 'center');
  };

  return {
    width: W, floor: 154, spawn: 20, exit: EXIT,
    get host() { return hx; },
    focus: F,
    props: [
      { id: 'easel', x: 30 },
      { id: 'presenter', get x() { return Math.round(this.st ? this.st.pres.x : PRES); }, label: 'Ask about the poster' },
      { id: 'bin', x: MACH - 14, label: 'Throw something in' },
      { id: 'coffee', x: TABLE, label: 'Stack another cup' },
      { id: 'board', x: BOARD, label: 'Look at the board' },
    ],
    enter(st) {
      hx = 66; st.cups = 3; st.fallen = []; st.easelN = 0; st.easelDown = false; st.pile = []; st.binN = 0; st.hostN = 0; st.viewC = 160;
      st.pres = { x: PRES, face: 1, talkT: -99, said: -1, moving: false };
      st.wander = { x: 300, face: 1, moving: false };
      st.crew = [{ L: LOOKS.c1, x: 800, q: 698, c: '#6c8cff' }, { L: LOOKS.c2, x: 830, q: 714, c: '#e85d5d' }, { L: LOOKS.c3, x: 860, q: 730, c: '#2ec4b6' }];
      this.props[1].st = st;
    },
    update(dt, st, ev) {
      const t = time(), id = cur(ev);
      const ht = ev.beat ? HOSTX[ev.beat.id || ev.beat.at] ?? (ev.beat.at === 'features' ? 640 : hx) : ev.beatIdx >= 6 ? 630 : 66;
      const hd = ht - hx; st.hMoving = Math.abs(hd) > 0.5; hx += Math.sign(hd) * Math.min(Math.abs(hd), 70 * dt); st.hFace = st.hMoving ? Math.sign(hd) : -1;
      const P = st.pres, talking = t - P.talkT < 15;
      let target = PRES;
      if (talking) { const v = st.viewC; target = Math.abs(v - P.x) > 26 ? Math.max(40, Math.min(720, v + (v > P.x ? -22 : 22))) : P.x;
        const n = Math.floor((t - P.talkT) / 2.8); if (n !== P.said && n < PRES_LINES.length) { P.said = n; g.say(PRES_LINES[n], P.x, 126, 2.6); } }
      const pd = target - P.x; P.moving = Math.abs(pd) > 0.5; if (P.moving) { P.x += Math.sign(pd) * Math.min(Math.abs(pd), 60 * dt); P.face = Math.sign(pd); } else P.face = talking ? (st.viewC > P.x ? 1 : -1) : 1;
      const Wd = st.wander, cyc = (t * 0.035) % 1, wt = 70 + (cyc < 0.5 ? cyc * 2 : 2 - cyc * 2) * 540, stop = Math.sin(t * 0.9) > 0.35;
      const wd = wt - Wd.x; Wd.moving = !stop && Math.abs(wd) > 0.5; if (Wd.moving) { Wd.x += Math.sign(wd) * Math.min(Math.abs(wd), 22 * dt); Wd.face = Math.sign(wd); }
      const mod = id === 'modules';
      st.crew.forEach((c, i) => { const tg = mod && ev.stepT > 1 + i * 0.7 ? c.q : 800 + i * 30, d = tg - c.x; c.moving = Math.abs(d) > 0.5; if (c.moving) { c.x += Math.sign(d) * Math.min(Math.abs(d), 50 * dt); c.face = Math.sign(d); } else c.face = -1; });
      if (id === 'inputs') { const L = binList(), n = Math.floor((ev.stepT - BIN_P * 0.9) / BIN_P) + 1; while (st.pile.length < Math.min(n, 9) && st.binN < L.length) st.pile.push(L[st.binN++]); }
      st.fallen.forEach(f => { if (f.y < 145) { f.vy += 260 * dt; f.x += f.vx * dt; f.y = Math.min(145, f.y + f.vy * dt); } else if (Math.abs(f.vx) > 2) { f.x += f.vx * dt; f.vx *= 1 - dt * 3; } });
      if (st.throwT != null && t - st.throwT > BIN_P * 0.9 && !st.thrown) { st.thrown = true; if (st.pile.length < 9) st.pile.push(st.throwKind); }
    },
    beat(id, st) { if (id === 'messy') g.say('So many files, not one plot', 112, 126, 2.4); if (id === 'inputs') { st.pile = []; st.binN = 0; } },
    poke(id, st) {
      const t = time();
      if (id === 'easel') {
        if (st.easelDown) { st.easelDown = false; st.easelN = 0; st.easelT = t; return 'Back on its feet'; }
        st.easelT = t; st.easelN++; if (st.easelN >= 3) { st.easelDown = true; g.say('Oops', 30, 92, 1.5); } return true;
      }
      if (id === 'presenter') { const P = st.pres; if (t - P.talkT < 15) { g.say('I am getting to the good bit', P.x, 126, 2); return true; } P.talkT = t; P.said = -1; return true; }
      if (id === 'bin') { if (st.throwT != null && t - st.throwT < BIN_P) return true; const L = ['sock', 'banana', 'duck', 'cup', 'shoe']; st.throwKind = L[(st.thrN = (st.thrN || 0) + 1) % L.length]; st.throwT = t; st.thrown = false; return true; }
      if (id === 'coffee') {
        if (st.cups >= 10) { for (let i = 0; i < 10; i++) st.fallen.push({ x: TABLE - 4 + (i % 4) * 5, y: 104 + Math.floor(i / 4) * 5, vx: (hash(i + t) - 0.5) * 120, vy: -40 - hash(i * 3 + t) * 60 }); st.cups = 0; g.say('Oh no', TABLE, 100, 1.5); return true; }
        st.cups++; if (st.cups === 10) g.say('A perfect pyramid', TABLE, 100, 2); return true;
      }
      if (id === 'board') { if (st.selfie == null) g.egg('poster', 'You are the poster now'); else g.say(['Looking good', 'Peer review: approved', 'Best in show', 'Needs more bar charts', 'Frame-worthy', 'Hire this poster'][st.selfieN = ((st.selfieN ?? -1) + 1) % 6], BOARD, 26, 1.6); st.selfie = t; return true; }
      if (id === 'host') { g.say(['I file a report on everything', 'One report. Not forty tabs.', 'Got a log file? I will take it.', 'Rita. The Reporter. Yes, really.'][st.hostN++ % 4], hx, 128); return true; }
    },
    draw(st, ev) {
      const t = time(), id = cur(ev), m = ctx.getTransform();
      st.viewC = -m.e / m.a + ctx.canvas.width / m.a / 2;
      hall(t);
      // poster banner over the hall
      R(479, 14, 1, 6, '#6f7a80'); R(593, 14, 1, 6, '#6f7a80');
      R(471, 20, 130, 11, OR); R(471, 30, 130, 1, ORD); for (let x = 471; x < 601; x += 10) R(x, 31, 5, 2, OR);
      shadowT('POSTER SESSION', 536, 22, 7, '#ffffff', 'center', ORD);
      signEasel(st, t);
      const land = landing(ev);
      for (let p = 0; p < 5; p++) panel(74 + p * 40, !land || land[p * 2] < 0.01 || land[p * 2 + 1] < 0.01);
      reportFrame(ev);
      const hot = id === 'messy' ? Math.floor(ev.stepT / 0.5) % 10 : -1;
      for (let i = 0; i < 10; i++) {
        const s = src(i), k = land ? land[i] : 0;
        if (k <= 0) { if (hot === i) R(s.x - 2, s.y - 2, s.w + 4, s.h + 4, '#e8590c'); posterArt(TOOLS[i], s.x, s.y, s.w, s.h, t, i); continue; }
        if (k >= 1) { section(i, t); continue; }
        const d = dst(i), arc = Math.sin(k * Math.PI) * -18, x = lerp(s.x, d.x, k), y = lerp(s.y, d.y, k) + arc, w = lerp(s.w, d.w, k), h = lerp(s.h, d.h, k);
        R(Math.round(x), Math.round(y), Math.round(w), Math.round(h), TOOLS[i].bg); R(Math.round(x), Math.round(y), Math.round(w), Math.max(1, Math.round(h * 0.17)), TOOLS[i].hd || '#c0392b');
      }
      if (land && land[9] >= 1 && id === 'merge' && ev.stepT < 4.6) for (let i = 0; i < 6; i++) { const a = i * 1.05 + t * 1.5, r = 54 + Math.sin(t * 3 + i) * 3; R(Math.round(REP.x + REP.w / 2 + Math.cos(a) * r), Math.round(REP.y + REP.h / 2 + Math.sin(a) * r * 0.6), 2, 2, '#ffd166'); }
      presBoard(t);
      const mc = machine(st, ev, t);
      st.pile.forEach((k, i) => card(MACH + 36, 116 - i * 3, k));
      if (mc.run) {
        const u = mc.u, kind = id === 'inputs' ? binList()[Math.min(binList().length - 1, Math.floor(ev.stepT / BIN_P) % binList().length)] : st.throwKind;
        if (u < 0.36) { const p = u / 0.36; OBJ[kind].d(Math.round(lerp(F.bin + 4, MACH, p)), Math.round(lerp(138, 66, p) - Math.sin(p * Math.PI) * 30)); }
        if (u > 0.62 && u < 0.92) { const p = ease((u - 0.62) / 0.3); card(lerp(MACH + 18, MACH + 36, p), lerp(108, 116 - st.pile.length * 3, p), kind); }
      }
      coffeeTable(st, t);
      EASELS.forEach((x, k) => { const lit = ev.beat && ev.beat.at === 'features';
        if (lit) { ctx.globalAlpha = 0.18; R(x - 22, 44, 44, 102, '#fff3c4'); ctx.globalAlpha = 1; }
        easelLegs(x, 94, 34); R(x - 18, 48, 36, 47, '#3b3f47'); miniFeature(k, x - 17, 49, 34, 45, t);
        star(x + 15, 50, t + k, 1); if (ev.beatIdx > 3) tick(x - 3, 86, '#2fb67c'); });
      emptyBoard(st, ev, t);
      exitDoor();
      carpet();
      // people
      const sip = ph => Math.sin(t * 0.8 + ph) > 0.75;
      person(LOOKS.reader, 112 + (Math.sin(t * 0.5) > 0 ? 2 : 0), 151, t, 1, false);
      if (id === 'messy' || id === '') { if (Math.sin(t * 1.3) > 0) { T('?', 119, 121, 6, '#e8590c'); } }
      const Wd = st.wander; person(LOOKS.wander, Wd.x, 151, t, Wd.face, Wd.moving); cupInHand(Wd.x, Wd.face, 151, !Wd.moving && sip(1));
      person(LOOKS.sipA, 466, 151, t, 1, false); cupInHand(466, 1, 151, sip(0));
      person(LOOKS.sipB, 590, 151, t, -1, false); cupInHand(590, -1, 151, sip(2.5));
      if (Math.sin(t * 0.8 + 2.5) < -0.8) T('...', 590, 122, 5, '#5a6478', 'center');
      const P = st.pres, talking = t - P.talkT < 15;
      person(LOOKS.pres, P.x, 152, t, P.face, P.moving);
      { const hxp = Math.round(P.x) + P.face * 5, hy = 139, wav = talking ? Math.sin(t * 6) * 6 : Math.sin(t * 1.6) * 4,
          tx = talking ? hxp + P.face * 10 : PRES + 22 + wav, ty = talking ? hy - 14 + wav * 0.6 : 66 + Math.cos(t * 1.6) * 6;
        line(hxp, hy, Math.round(tx), Math.round(ty), '#2b2e31'); R(Math.round(tx), Math.round(ty), 1, 1, '#e03131'); }
      st.crew.forEach(c => { if (c.x > W + 10) return; person(c.L, c.x, 152, t, c.face, c.moving); const px = Math.round(c.x) - 5 + c.face * 3; R(px, 128, 10, 13, '#ffffff'); R(px, 128, 10, 3, c.c); R(px + 2, 133, 6, 1, '#c8ccd2'); R(px + 2, 136, 4, 1, '#c8ccd2'); });
      person(look('multiqc'), hx, 154, t, st.hFace, st.hMoving);
      if (!st.hMoving) { const rx = Math.round(hx) + st.hFace * 5 - (st.hFace < 0 ? 3 : 0); R(rx, 138, 4, 8, '#ffffff'); R(rx, 138, 4, 2, OR); }
    },
    features: { poster: { steps: 4, draw(step, t) { [fConfig, fLicences, fEcharts, fParquet][step](t); } } },
  };
};
