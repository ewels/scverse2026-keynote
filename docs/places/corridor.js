// Corridor signage: docs sites. Wayfinding signs, an Astro Starlight poster, a quiz board, an API map and a noticeboard of code.
(window.KEYNOTE_PLACES = window.KEYNOTE_PLACES || {}).corridor = g => {
  const { R, T, disc, line, tri, map2d, person, look, time, hash, ctx } = g;
  const W = 400, EXIT = 386, SX = [22, 54, 86], QX = 200, SL = 131, MAPX = 272, DOT = [150, 300];
  // quiz, map and board are drawn at their original coordinates and shifted into the talk's order
  const QDX = -62, MDX = 74, BDX = 204;
  const WORDS = ['START', 'GUIDE', 'API'], OPTS = ['SIDEBAR', 'HOME PAGE', 'SEARCH BOX', 'CHANGELOG'], RIGHT = 2, ROOMS = ['CLI', 'CORE', 'UTIL', 'API', 'DOCS', 'TEST'];
  const ROOM_COL = ['#2ec4d6', '#6c8cff', '#3cc87a', '#f5a623', '#e85d5d', '#b28dff'];
  const clamp = (v, a, b) => Math.max(a, Math.min(b, v));
  const PASSER = { skin: '#efc6a3', hair: '#3a2a1f', hairStyle: 'short', top: '#3cc87a', topStyle: 'hoodie', pants: '#2b2f45' };
  const LOST = { skin: '#c98e62', hair: '#1f1f1f', hairStyle: 'messy', top: '#f5a623', topStyle: 'tee', pants: '#4a403a' };
  const age = (ev, i) => ev.beatIdx > i ? 99 : ev.beatIdx === i ? ev.stepT : -1;
  let lastX = 14, dotX = 150, dotFace = 1, dotMoving = false, dotEnd = 1, dotRest = 0;

  const sign = (st, i, t, litF) => {
    const s = st.sd[i], x = SX[i], p = s.t0 == null ? 1 : clamp((t - s.t0) / 0.6, 0, 1), dir = p < 0.5 ? -s.dir : s.dir, w = Math.max(2, Math.round(30 * Math.abs(Math.cos(p * Math.PI))));
    R(x - 11, 14, 1, 13, '#6f7a80'); R(x + 10, 14, 1, 13, '#6f7a80');
    const wrong = s.dir < 0, on = litF >= i, la = (litF - i) * 0.8, c = !on ? '#7d8a99' : la < 0.3 ? '#ffffff' : wrong ? '#e85d5d' : '#2ec4d6';
    R(x - w / 2, 26, w, 20, '#1b2332'); R(x - w / 2 + 1, 27, w - 2, 18, c);
    if (w > 18) { T(WORDS[i], x, 38, 6, '#ffffff', 'center'); if (dir > 0) { R(x - 10, 31, 12, 2, '#ffffff'); tri(x + 8, 32, -1, '#ffffff'); } else { R(x - 2, 31, 12, 2, '#ffffff'); tri(x - 8, 32, 1, '#ffffff'); } }
    if (on) { R(x - 11, 24, 3, 2, '#ffd166'); R(x + 8, 24, 3, 2, '#ffd166'); ctx.fillStyle = 'rgba(255,240,170,0.2)'; for (let y = 46; y < 100; y += 2) { const ww = 6 + (y - 46) * 0.3; ctx.fillRect(x - ww, y, ww * 2, 2); } }
  };

  const CARDS = [
    { tag: 'FOCUS', draw: (x, y, t) => { for (let r = 0; r < 4; r++) R(x + 2, y + 3 + r * 4, 10 + (r * 5) % 9, 2, r === 1 ? '#ffd166' : '#5a6270'); R(x + 1, y + 6, 1, 4, '#ffd166'); } },
    { tag: 'DIFF', draw: (x, y) => { R(x + 2, y + 3, 14, 3, '#fbd0d0'); R(x + 3, y + 4, 8, 1, '#e85d5d'); R(x + 2, y + 7, 18, 3, '#cfeedd'); R(x + 3, y + 8, 12, 1, '#2f9b5a'); R(x + 2, y + 11, 10, 2, '#5a6270'); R(x + 2, y + 14, 14, 2, '#5a6270'); } },
    { tag: 'NOTE', draw: (x, y) => { for (let r = 0; r < 3; r++) R(x + 2, y + 3 + r * 5, 12 + r * 3, 2, '#5a6270'); R(x + 17, y + 3, 7, 6, '#ffd166'); R(x + 18, y + 4, 5, 1, '#8a6a20'); R(x + 18, y + 6, 4, 1, '#8a6a20'); } },
    { tag: 'RUN', draw: (x, y, t) => { for (let r = 0; r < 2; r++) R(x + 2, y + 3 + r * 4, 10 + r * 6, 2, '#5a6270'); R(x + 3, y + 12, 7, 4, '#2fb67c'); tri(x + 5, y + 14, 1, '#ffffff'); R(x + 12, y + 12, 10, 4, '#1b2332'); R(x + 13, y + 13, Math.round((Math.sin(t * 3) * 0.5 + 0.5) * 8), 2, '#3cc87a'); } },
  ];

  const board = (st, ev, t) => {
    R(108, 32, 58, 72, '#7a5232'); R(110, 34, 54, 68, '#c8a46a'); for (let k = 0; k < 40; k++) R(111 + Math.floor(hash(k) * 52), 35 + Math.floor(hash(k + 40) * 66), 1, 1, '#b08a52');
    R(108, 32, 58, 3, '#8a6240'); T('NOTICES', 137, 36, 5, '#4a2f1a', 'center');
    const a0 = age(ev, 4);
    CARDS.forEach((c, i) => {
      const x = 113 + (i % 2) * 26, y = 46 + Math.floor(i / 2) * 29, a = a0 - i * 0.55; if (a < 0) { disc(x + 12, y + 2, 1, '#e85d5d'); return; }
      const dy = a < 0.3 ? Math.round((1 - a / 0.3) * -12) : 0, yy = y + dy;
      R(x + 1, yy + 1, 24, 22, 'rgba(0,0,0,.25)'); R(x, yy, 24, 22, '#fffbe6'); R(x, yy, 24, 1, '#ffffff'); c.draw(x, yy, t); R(x + 1, yy + 17, 22, 5, '#1b2332'); T(c.tag, x + 12, yy + 17.5, 4, '#ffd166', 'center'); disc(x + 12, yy + 1, 1, '#e85d5d'); R(x + 11, yy, 2, 2, '#e85d5d');
      if (a > 0.3 && a < 0.8) { ctx.fillStyle = 'rgba(255,255,255,.35)'; ctx.fillRect(x, yy, 24, 22); }
    });
  };

  const map = (st, ev, t, hx) => {
    R(172, 38, 54, 66, '#f7f3ea'); R(172, 38, 54, 1, '#ffffff'); R(172, 38, 54, 9, '#1b2332'); T('MAP', 199, 40, 6, '#ffffff', 'center');
    const a0 = age(ev, 3);
    ROOMS.forEach((r, i) => { const x = 175 + (i % 2) * 25, y = 50 + Math.floor(i / 2) * 13, a = a0 - i * 0.45, on = a >= 0;
      R(x, y, 23, 11, on ? ROOM_COL[i] : '#e6e1d4'); R(x, y, 23, 1, on ? 'rgba(255,255,255,.4)' : '#d6d0c0'); if (!on) { for (let k = 0; k < 11; k += 2) { R(x, y + k, 1, 1, '#b8b2a0'); R(x + 22, y + k, 1, 1, '#b8b2a0'); } }
      if (on) T(r, x + 11, y + 3, 5, '#ffffff', 'center'); if (on && a < 0.3) { ctx.fillStyle = 'rgba(255,255,255,.5)'; ctx.fillRect(x, y, 23, 11); } });
    R(175, 90, 48, 4, '#d6d0c0');
    if (a0 >= 0 && a0 < 6 * 0.45 + 0.3) { const sy = 50 + ((a0 * 30) % 39); R(172, Math.round(sy), 54, 1, 'rgba(46,196,214,.7)'); }
    const mx = Math.round(177 + clamp(hx / W, 0, 1) * 44), pulse = st.hereT != null && t - st.hereT < 1.5 ? Math.round(Math.abs(Math.sin((t - st.hereT) * 8)) * 3) : 0;
    R(mx - 1, 93 - pulse, 3, 6, '#e85d5d'); disc(mx, 91 - pulse, 3, '#e85d5d'); R(mx, 90 - pulse, 1, 1, '#ffffff');
    T('HERE', mx, 98, 4, '#e85d5d', 'center');
  };

  const quiz = (st, ev, t) => {
    const on = ev.beatIdx >= 2, a0 = age(ev, 2);
    R(230, 28, 64, 92, '#3b4252'); R(232, 30, 60, 88, '#1b2332'); R(232, 30, 60, 1, '#2ec4d6');
    if (!on) { T('QUIZ', 262, 44, 10, '#3b4a66', 'center'); T('?', 262, 70, 20, '#2b3550', 'center'); return; }
    T('QUIZ', 262, 33, 6, '#2ec4d6', 'center');
    const QL = ['WHERE DO', 'READERS LOOK', 'FIRST?'];
    let n = Math.floor(a0 * 16); QL.forEach((l, i) => { T(l.slice(0, Math.max(0, n)), 262, 41 + i * 7, 5, '#ffffff', 'center'); n -= l.length; });
    OPTS.forEach((o, i) => {
      const a = a0 - 1.2 - i * 0.3; if (a < 0) return;
      const pk = st.pick[i], pt = pk != null ? t - pk : 99, right = i === RIGHT, shake = pk != null && !right && pt < 0.4 ? Math.round(Math.sin(pt * 60) * 2) : 0;
      const c = pk == null ? '#3b4a66' : right ? '#2fb67c' : '#d8402a', x = 234 + shake, y = 63 + i * 12;
      R(x, y, 56, 10, c); R(x, y, 56, 1, 'rgba(255,255,255,.25)'); R(x, y + 9, 56, 1, 'rgba(0,0,0,.3)');
      T(o, x + 28, y + 3, 5, '#ffffff', 'center');
      if (pk != null) { if (right) { line(x + 3, y + 5, x + 5, y + 7, '#ffffff'); line(x + 5, y + 7, x + 8, y + 3, '#ffffff'); } else { line(x + 3, y + 3, x + 7, y + 7, '#ffffff'); line(x + 7, y + 3, x + 3, y + 7, '#ffffff'); } }
    });
    if (st.pick.some(p => p != null)) { const ok = st.pick[RIGHT] != null; T(ok ? 'CORRECT!' : 'NOT QUITE', 262, 111, 5, ok ? '#3cc87a' : '#ff8a7a', 'center'); }
  };

  const ROCKET = ['....w....', '...wvw...', '...www...', '..wwwww..', '..wwbww..', '..wbbbw..', '..wwbww..', '..wwwww..', '..wwwww..', '.vwwwwwv.', 'vvwwwwwvv', 'vv.www.vv', 'v..fff..v', '...fyf...', '....f....'];
  const starlight = (st, ev, t) => {
    R(105, 28, 52, 78, '#3b4252'); R(107, 30, 48, 74, '#17132e');
    for (let k = 0; k < 16; k++) if (Math.sin(t * 2 + k * 2.3) > -0.3) R(108 + Math.floor(hash(k + 90) * 46), 31 + Math.floor(hash(k + 120) * 44), 1, 1, k % 4 ? '#c9c2ff' : '#ffffff');
    const sp = 2 + Math.round(Math.abs(Math.sin(t * 2))); R(146, 37 - sp, 1, sp * 2 + 1, '#ffd166'); R(146 - sp, 37, sp * 2 + 1, 1, '#ffd166'); R(145, 36, 3, 3, '#fff3c4');
    const a = age(ev, 1), lift = a < 0 ? 0 : Math.min(1, a / 1.2) ** 2 * 10, lp = st.launch != null ? (t - st.launch) / 1.6 : 1;
    const fly = lp < 0.5 ? -lp * 2 * 70 : lp < 1 ? (1 - lp) * 2 * 70 : 0, fl = Math.floor(t * 8) % 2;
    ctx.save(); ctx.beginPath(); ctx.rect(107, 30, 48, 52); ctx.clip();
    const ry = Math.round(56 - lift + fly + Math.sin(t * 2) * 1.5);
    map2d(ROCKET, SL - 4, ry, { w: '#f4f1ff', v: '#8b5cf6', b: '#2ec4d6', f: fl ? '#ff5d8f' : '#f5a623', y: '#ffd166' });
    if (a >= 0 || lp < 1) for (let k = 0; k < 4; k++) R(SL - 1 + (k % 2), ry + 15 + k * 2 + fl, 1, 2, k < 2 ? '#ff5d8f' : '#8b5cf6');
    ctx.restore();
    R(109, 82, 44, 1, '#3b3570'); T('ASTRO', SL, 85, 5, '#ff8fb8', 'center'); T('STARLIGHT', SL, 93, 5, '#ffffff', 'center');
  };

  const CK = '#e6e8f2', font = size => `${size}px Silkscreen, SilkscreenLocal, "Courier New", monospace`;
  const tw = (s, size) => { ctx.font = font(size); return ctx.measureText(s).width; };
  const lerpC = (a, b, k) => a + (b - a) * k * k * (3 - 2 * k);
  const code = (s, x, y, alpha = 1) => {
    ctx.globalAlpha = alpha;
    s.split(/("[^"]*"|\bimport\b|\bas\b|#.*$)/).forEach(p => { if (!p) return; T(p, x, y, 6, p[0] === '"' ? '#a9e34b' : p[0] === '#' ? '#7f8aab' : p === 'import' || p === 'as' ? '#c792ea' : CK); x += tw(p, 6); });
    ctx.globalAlpha = 1;
  };
  const cursor = (x, y, click) => { x = Math.round(x); y = Math.round(y); map2d(['k.....', 'kk....', 'kwk...', 'kwwk..', 'kwwwk.', 'kwwwwk', 'kwwkkk', 'kk.k..', 'k...k.'], x, y, { k: '#1b2332', w: '#ffffff' });
    if (click > 0) { const r = Math.round(2 + (1 - click) * 6); for (let a = 0; a < 16; a++) R(Math.round(x + Math.cos(a * 0.39) * r), Math.round(y + Math.sin(a * 0.39) * r), 1, 1, '#ffd166'); } };
  const fFrame = (src, t) => {
    R(0, 0, 320, 180, '#0e1020'); for (let k = 0; k < 30; k++) if (Math.sin(t * 2 + k) > 0) R(Math.floor(hash(k + 7) * 320), Math.floor(hash(k + 70) * 180), 1, 1, '#3b3570');
    R(22, 6, 276, 166, '#2b2f45'); R(24, 8, 272, 162, '#17181f'); R(24, 8, 272, 14, '#23263a');
    [0, 1, 2].forEach(i => disc(32 + i * 7, 15, 2, ['#e85d5d', '#f5a623', '#3cc87a'][i])); T('STARLIGHT-CODEBLOCKS', 160, 12, 6, '#c9c2ff', 'center');
    R(32, 27, 256, 13, '#0e1020'); T(src, 37, 30, 6, '#ffd166');
    R(32, 46, 256, 116, '#1f2230');
  };
  const NUM = (n, y) => T(String(n), 46, y, 6, '#4a5068', 'right');
  const PIPE = ['import scanpy as sc', 'adata = sc.read_h5ad("pbmc.h5ad")', 'sc.pp.normalize_total(adata)', 'sc.pp.log1p(adata)', 'sc.pp.neighbors(adata)', 'sc.tl.leiden(adata)', 'sc.pl.umap(adata, color="leiden")'];
  const fFocus = t => {
    fFrame('```py focus={3-4}', t);
    const k = Math.min(1, Math.max(0, (t % 7 - 0.6) / 0.6)) * (t % 7 < 6.4 ? 1 : 0);
    if (k > 0) { ctx.globalAlpha = k; R(32, 75, 256, 26, '#2b3050'); R(32, 75, 2, 26, '#8b5cf6'); ctx.globalAlpha = 1; }
    PIPE.forEach((s, i) => { const y = 50 + i * 13, on = i === 2 || i === 3, al = on ? 1 : 1 - k * 0.75; NUM(i + 1, y + 2);
      // two offset faint copies read as a blur at this resolution
      if (!on && k > 0) { code(s, 51, y + 2, al * 0.5); code(s, 53, y + 2, al * 0.5); } else code(s, 52, y + 2, al); });
  };
  const DIFF = [[' ', 'sc.pp.normalize_total(adata)'], ['-', 'sc.pp.pca(adata, n_comps=30)'], ['+', 'sc.pp.pca(adata, n_comps=50)'], [' ', 'sc.pp.neighbors(adata)'], ['-', 'sc.tl.louvain(adata)'], ['+', 'sc.tl.leiden(adata)'], [' ', 'sc.pl.umap(adata)']];
  const fDiff = t => {
    fFrame('```diff lang="py"', t);
    const k = t % 6 > 0.8;
    DIFF.forEach(([m, s], i) => { const y = 52 + i * 15;
      if (m !== ' ') { R(32, y - 1, 256, 13, m === '-' ? '#4a1f2a' : '#1f4a32'); T(m, 40, y + 2, 6, m === '-' ? '#ff8a7a' : '#7ee2a8');
        if (k) { const o = DIFF[m === '-' ? i + 1 : i - 1][1]; let a = 0, b = 0; while (s[a] === o[a]) a++; while (b < s.length - a && s[s.length - 1 - b] === o[o.length - 1 - b]) b++;
          const x0 = 52 + tw(s.slice(0, a), 6), w = tw(s.slice(a, s.length - b), 6); R(x0 - 1, y, w + 2, 11, m === '-' ? '#a83a4a' : '#2f9b5a'); } }
      code(s, 52, y + 2); });
  };
  const fCallout = t => {
    fFrame('# [!callout /resolution/] More clusters', t);
    const L = ['sc.pp.neighbors(adata, n_neighbors=15)', 'sc.tl.leiden(adata, resolution=0.8)', 'sc.pl.umap(adata, color="leiden")'];
    const NOTES = [[0, 'n_neighbors', 'Local vs global structure', 0.6], [1, 'resolution', 'Higher means more clusters', 1.6]];
    L.forEach((s, i) => { const y = 54 + i * 30; NUM(i + 1, y + 2); code(s, 52, y + 2); });
    NOTES.forEach(([i, wd, note, at]) => { const a = t % 8 - at; if (a < 0) return;
      const s = L[i], y = 54 + i * 30, x0 = 52 + tw(s.slice(0, s.indexOf(wd)), 6), w = tw(wd, 6), nw = tw(note, 5) + 10, bx = Math.round(Math.min(x0, 284 - nw)), ax = Math.round(x0 + w / 2);
      R(x0, y + 11, w, 1, '#ffd166'); R(ax, y + 12, 1, 5, '#ffd166'); R(ax - 1, y + 15, 3, 1, '#ffd166');
      if (a > 0.2) { R(bx, y + 17, nw, 12, '#3a3220'); R(bx, y + 17, 2, 12, '#ffd166'); T(note, bx + 6, y + 20, 5, '#ffe7a3'); } });
    const a = t % 8 - 2.8; if (a > 0) { const y = 114; disc(278, y + 5, 5, '#8b5cf6'); T('1', 278, y + 2, 6, '#ffffff', 'center');
      if (a > 0.5) { R(150, 127, 136, 19, '#2b3050'); R(150, 127, 136, 1, '#8b5cf6'); T('ANNOTATIONS OPEN', 156, 130, 5, '#c9c2ff'); T('IN A POPOVER', 156, 138, 5, '#c9c2ff'); }
      if (a < 0.6) cursor(282, y + 8, a > 0.3 ? (0.6 - a) / 0.3 : 0); }
  };
  const fRun = t => {
    fFrame('```py runnable', t);
    const k = t % 7, L = ['import numpy as np', 'x = np.arange(1, 6)', 'print(x ** 2)'];
    L.forEach((s, i) => { NUM(i + 1, 54 + i * 13); code(s, 52, 54 + i * 13); });
    const hit = k > 1.2 && k < 1.5; R(206, 96, 76, 14, hit ? '#6d4bd6' : '#8b5cf6'); tri(218, 103, -1, '#ffffff'); T('RUN CODE', 249, 100, 6, '#ffffff', 'center');
    if (k < 1.5) cursor(lerpC(150, 250, Math.min(1, k)), lerpC(150, 104, Math.min(1, k)), k > 1.2 ? (1.5 - k) / 0.3 : 0);
    R(32, 116, 256, 46, '#0e1020'); T('OUTPUT', 40, 120, 5, '#4a5068');
    if (k > 1.5 && k < 2.2) T('RUNNING' + '.'.repeat(Math.floor(k * 6) % 4), 40, 134, 6, '#7f8aab');
    if (k >= 2.2) T('[ 1  4  9 16 25]'.slice(0, Math.floor((k - 2.2) * 24)), 40, 134, 6, '#a9e34b');
  };

  const MORE = ['SCROLLYCODING', 'FOOTNOTES', 'CODE TABS', 'FILE ICONS', 'API AUTO-LINKING', 'PLAYGROUND'];
  const fMore = t => {
    fFrame('npm install starlight-codeblocks', t);
    T('+21 MORE', 160, 52, 16, '#ffd166', 'center');
    MORE.forEach((s, i) => { if (t < 0.4 + i * 0.25) return; const x = 37 + (i % 3) * 84, y = 80 + Math.floor(i / 3) * 18; R(x, y, 78, 13, '#2b3050'); R(x, y, 2, 13, '#8b5cf6'); T(s, x + 40, y + 4, 5, '#c9c2ff', 'center'); });
    R(32, 124, 256, 38, '#0e1020'); T('DOCS AND LIVE EXAMPLES', 160, 130, 5, '#7f8aab', 'center'); T('ewels.github.io/starlight-codeblocks', 160, 143, 7, '#2ec4d6', 'center');
  };

  return {
    width: W, floor: 154, spawn: 14, exit: EXIT,
    get host() { return dotX; },
    focus: { signs: 62, starlight: SL, quiz: QX - 12, map: MAPX, board: 136 + BDX },
    props: [
      { id: 's0', x: SX[0], label: 'Spin the sign', r: 15 },
      { id: 's1', x: SX[1], label: 'Spin the sign', r: 15 },
      { id: 's2', x: SX[2], label: 'Spin the sign', r: 15 },
      { id: 'rocket', x: SL, label: 'Launch the rocket', r: 18 },
      { id: 'quiz', x: QX, label: 'Answer the quiz', r: 22 },
      { id: 'map', x: MAPX, label: 'Check the map', r: 18 },
    ],
    features: { codeblocks: { steps: 5, draw(step, t) { [fFocus, fDiff, fCallout, fRun, fMore][step](t); } } },
    enter(st) { st.sd = [0, 1, 2].map(() => ({ dir: 1, t0: null })); st.pick = []; st.qi = 0; st.hereT = null; st.lost = null; st.said = 0; st.launch = null; dotX = 150; lastX = 14; },
    update(dt, st, ev) {
      const t = time(); if (ev.beat && !ev.walking) lastX = this.focus[ev.beat.at] ?? lastX;
      const goal = DOT[dotEnd], d = goal - dotX; dotMoving = Math.abs(d) > 0.5 && t > dotRest;
      if (dotMoving) { dotX += Math.sign(d) * Math.min(Math.abs(d), 14 * dt); dotFace = Math.sign(d); } else if (t > dotRest) { dotEnd = 1 - dotEnd; dotRest = t + 2; }
      if (st.lost == null && st.sd.every(s => s.dir < 0)) { st.lost = t; g.egg('lost', 'Someone followed the signs'); }
      if (st.lost != null && st.sd.some(s => s.dir > 0)) st.lost = null;
    },
    poke(id, st) {
      const t = time();
      if (id === 'host') { g.say(['Follow the signs', 'Good docs point somewhere', 'Which way is it, again?'][st.said++ % 3], dotX, 126); return true; }
      if (id[0] === 's' && id.length === 2) { const i = +id[1], s = st.sd[i]; s.dir = -s.dir; s.t0 = t; lastX = SX[i]; return true; }
      if (id === 'map') { st.hereT = t; lastX = g.heroX ? g.heroX() : MAPX; g.say('YOU ARE HERE', MAPX, 82, 1.8); return true; }
      if (id === 'rocket') { st.launch = t; lastX = SL; return true; }
      if (id === 'quiz') {
        lastX = QX;
        const i = st.qi; if (i === 0) st.pick = []; st.pick[i] = t; st.qi = (i + 1) % OPTS.length;
        g.say(i === RIGHT ? 'Correct!' : 'Not quite', QX, 22, 1.2); return true;
      }
    },
    draw(st, ev) {
      const t = time(), hx = g.heroX ? g.heroX() : lastX, litF = ev.beatIdx > 0 ? 99 : ev.beatIdx === 0 && !ev.walking ? (st.lt0 = st.lt0 ?? t, (t - st.lt0 - 0.4) / 0.8) : -1;
      // walls
      R(0, 0, W, 146, '#a9c5c9'); R(0, 100, W, 46, '#3a5568'); R(0, 98, W, 3, '#cfdde0'); for (let x = 0; x < W; x += 24) R(x, 101, 1, 45, '#33495a');
      for (let x = 0; x < W; x += 40) R(x, 0, 1, 98, '#9bb8bc');
      // ceiling lights
      R(0, 0, W, 12, '#8aa5a9'); for (let x = 10; x < W; x += 50) { const off = Math.sin(t * 3 + x * 7) > 0.97 && x === 160; R(x, 3, 30, 5, off ? '#9aa6b2' : '#fffbe6'); R(x - 1, 2, 32, 1, '#6f7a80'); }
      T('DOCS WING', 160, 18, 6, '#33495a', 'center');
      for (let i = 0; i < 3; i++) sign(st, i, t, litF);
      starlight(st, ev, t);
      [[quiz, QDX], [map, MDX], [board, BDX]].forEach(([f, dx]) => { ctx.save(); ctx.translate(dx, 0); f(st, ev, t, hx); ctx.restore(); });
      // fire door and extinguisher
      R(239, 60, 2, 30, '#d8402a'); R(238, 58, 4, 3, '#1b2332');
      // floor
      R(0, 146, W, 34, '#8793a1'); for (let x = 0; x < W; x += 20) R(x, 146, 1, 34, '#7b8795'); R(0, 146, W, 2, '#6f7a89'); R(0, 162, W, 2, '#ffd166');
      for (let x = -20; x < W + 10; x += 40) { const ax = Math.round(x + (t * 14) % 40); R(ax, 170, 14, 2, '#ffd166'); tri(ax + 14, 171, -1, '#ffd166'); }
      // people
      const cyc = t % 22; if (cyc < 11) { const px = -10 + cyc * (W + 20) / 11; person(PASSER, px, 150, t, 1, true); }
      if (st.lost != null) { const w = (t - st.lost) * 1.1, lx = W / 2 + Math.cos(w) * 110, ly = 151 + Math.sin(w) * 4.5, f = Math.sin(w) > 0 ? -1 : 1; person(LOST, lx, ly, t, f, true); T('?', Math.round(lx), Math.round(ly) - 32 - Math.round(Math.abs(Math.sin(t * 5)) * 2), 8, '#ffd166', 'center'); R(Math.round(lx) + f * 7, Math.round(ly) - 12, 6, 5, '#f7f3ea'); }
      person(look('docs'), dotX, 150, t, dotFace, dotMoving);
      R(Math.round(dotX) + dotFace * 5, 142, 5, 6, '#f7f3ea'); R(Math.round(dotX) + dotFace * 5, 142, 5, 1, '#2ec4d6');
      R(EXIT - 12, 100, 24, 54, '#f7f3ea'); R(EXIT - 9, 103, 18, 51, '#1b2030'); R(EXIT - 12, 88, 24, 9, '#2fb67c'); T('EXIT', EXIT, 89.5, 5, '#ffffff', 'center');
    },
  };
};
