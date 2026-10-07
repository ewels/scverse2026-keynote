// Corridor signage: docs sites. Wayfinding signs, a noticeboard of code, an API map and a quiz board.
(window.KEYNOTE_PLACES = window.KEYNOTE_PLACES || {}).corridor = g => {
  const { R, T, disc, line, tri, person, look, time, hash, ctx } = g;
  const EXIT = 306, SX = [28, 62, 96], QX = 262, DOT = [128, 222];
  const WORDS = ['START', 'GUIDE', 'API'], OPTS = ['JEKYLL', 'STARLIGHT', 'SPHINX'], ROOMS = ['CLI', 'CORE', 'UTIL', 'API', 'DOCS', 'TEST'];
  const ROOM_COL = ['#2ec4d6', '#6c8cff', '#3cc87a', '#f5a623', '#e85d5d', '#b28dff'];
  const clamp = (v, a, b) => Math.max(a, Math.min(b, v));
  const PASSER = { skin: '#efc6a3', hair: '#3a2a1f', hairStyle: 'short', top: '#3cc87a', topStyle: 'hoodie', pants: '#2b2f45' };
  const LOST = { skin: '#c98e62', hair: '#1f1f1f', hairStyle: 'messy', glasses: true, top: '#f5a623', topStyle: 'tee', pants: '#4a403a' };
  let lastX = 14, dotX = 150, dotFace = 1, dotMoving = false;

  const sign = (st, i, t, lit) => {
    const s = st.sd[i], x = SX[i], p = s.t0 == null ? 1 : clamp((t - s.t0) / 0.6, 0, 1), dir = p < 0.5 ? -s.dir : s.dir, w = Math.max(2, Math.round(30 * Math.abs(Math.cos(p * Math.PI))));
    R(x - 11, 14, 1, 13, '#6f7a80'); R(x + 10, 14, 1, 13, '#6f7a80');
    const wrong = s.dir < 0, on = lit > i, c = !on ? '#7d8a99' : wrong ? '#e85d5d' : '#2ec4d6';
    R(x - w / 2, 26, w, 20, '#1b2332'); R(x - w / 2 + 1, 27, w - 2, 18, c);
    if (w > 18) { T(WORDS[i], x, 38, 6, '#ffffff', 'center'); if (dir > 0) { R(x - 10, 31, 12, 2, '#ffffff'); tri(x + 8, 32, -1, '#ffffff'); } else { R(x - 2, 31, 12, 2, '#ffffff'); tri(x - 8, 32, 1, '#ffffff'); } }
    if (on) { R(x - 11, 24, 3, 2, '#ffd166'); R(x + 8, 24, 3, 2, '#ffd166'); ctx.fillStyle = 'rgba(255,240,170,0.10)'; for (let y = 46; y < 100; y += 2) { const ww = 6 + (y - 46) * 0.3; ctx.fillRect(x - ww, y, ww * 2, 2); } }
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
    const age = ev.beatIdx > 1 ? 99 : ev.beatIdx === 1 ? ev.stepT : -1;
    CARDS.forEach((c, i) => {
      const x = 113 + (i % 2) * 26, y = 46 + Math.floor(i / 2) * 29, a = age - i * 0.55; if (a < 0) { disc(x + 12, y + 2, 1, '#e85d5d'); return; }
      const dy = a < 0.3 ? Math.round((1 - a / 0.3) * -12) : 0, yy = y + dy;
      R(x + 1, yy + 1, 24, 22, 'rgba(0,0,0,.25)'); R(x, yy, 24, 22, '#fffbe6'); R(x, yy, 24, 1, '#ffffff'); c.draw(x, yy, t); R(x + 1, yy + 17, 22, 5, '#1b2332'); T(c.tag, x + 12, yy + 17.5, 4, '#ffd166', 'center'); disc(x + 12, yy + 1, 1, '#e85d5d'); R(x + 11, yy, 2, 2, '#e85d5d');
      if (a > 0.3 && a < 0.8) { ctx.fillStyle = 'rgba(255,255,255,.35)'; ctx.fillRect(x, yy, 24, 22); }
    });
  };

  const map = (st, ev, t, hx) => {
    R(172, 38, 54, 66, '#f7f3ea'); R(172, 38, 54, 1, '#ffffff'); R(172, 38, 54, 9, '#1b2332'); T('MAP', 199, 40, 6, '#ffffff', 'center');
    const age = ev.beatIdx > 2 ? 99 : ev.beatIdx === 2 ? ev.stepT : -1;
    ROOMS.forEach((r, i) => { const x = 175 + (i % 2) * 25, y = 50 + Math.floor(i / 2) * 13, a = age - i * 0.45, on = a >= 0;
      R(x, y, 23, 11, on ? ROOM_COL[i] : '#e6e1d4'); R(x, y, 23, 1, on ? 'rgba(255,255,255,.4)' : '#d6d0c0'); if (!on) { for (let k = 0; k < 11; k += 2) { R(x, y + k, 1, 1, '#b8b2a0'); R(x + 22, y + k, 1, 1, '#b8b2a0'); } }
      if (on) T(r, x + 11, y + 3, 5, '#ffffff', 'center'); if (on && a < 0.3) { ctx.fillStyle = 'rgba(255,255,255,.5)'; ctx.fillRect(x, y, 23, 11); } });
    R(175, 90, 48, 4, '#d6d0c0');
    if (age >= 0 && age < 6 * 0.45 + 0.3) { const sy = 50 + ((age * 30) % 39); R(172, Math.round(sy), 54, 1, 'rgba(46,196,214,.7)'); }
    const mx = Math.round(177 + clamp(hx / 320, 0, 1) * 44), pulse = st.hereT != null && t - st.hereT < 1.5 ? Math.round(Math.abs(Math.sin((t - st.hereT) * 8)) * 3) : 0;
    R(mx - 1, 93 - pulse, 3, 6, '#e85d5d'); disc(mx, 91 - pulse, 3, '#e85d5d'); R(mx, 90 - pulse, 1, 1, '#ffffff');
    T('HERE', mx, 98, 4, '#e85d5d', 'center');
  };

  const quiz = (st, ev, t) => {
    const on = ev.beatIdx >= 3, age = on ? (ev.beatIdx === 3 ? ev.stepT : 99) : -1;
    R(230, 28, 64, 92, '#3b4252'); R(232, 30, 60, 88, '#1b2332'); R(232, 30, 60, 1, '#2ec4d6');
    if (!on) { T('QUIZ', 262, 44, 10, '#3b4a66', 'center'); T('?', 262, 70, 20, '#2b3550', 'center'); return; }
    T('QUIZ', 262, 33, 6, '#2ec4d6', 'center');
    const q1 = 'BEST DOCS', q2 = 'FRAMEWORK?', n = Math.floor(age * 14);
    T(q1.slice(0, n), 262, 45, 7, '#ffffff', 'center'); if (n > q1.length) T(q2.slice(0, n - q1.length), 262, 56, 7, '#ffffff', 'center');
    OPTS.forEach((o, i) => {
      const a = age - 1.2 - i * 0.3; if (a < 0) return;
      const pk = st.pick[i], pt = pk != null ? t - pk : 99, right = i === 1, shake = pk != null && !right && pt < 0.4 ? Math.round(Math.sin(pt * 60) * 2) : 0;
      const c = pk == null ? '#3b4a66' : right ? '#2fb67c' : '#d8402a', x = 234 + shake, y = 70 + i * 15;
      R(x, y, 56, 12, c); R(x, y, 56, 1, 'rgba(255,255,255,.25)'); R(x, y + 11, 56, 1, 'rgba(0,0,0,.3)');
      T(o, x + 28, y + 3, 6, '#ffffff', 'center');
      if (pk != null) { if (right) { line(x + 4, y + 6, x + 6, y + 8, '#ffffff'); line(x + 6, y + 8, x + 10, y + 3, '#ffffff'); } else { line(x + 4, y + 3, x + 9, y + 8, '#ffffff'); line(x + 9, y + 3, x + 4, y + 8, '#ffffff'); } }
    });
    if (st.pick.some(p => p != null)) { const ok = st.pick[1] != null; T(ok ? 'CORRECT!' : 'WRONG', 262, 112, 6, ok ? '#3cc87a' : '#ff8a7a', 'center'); }
  };

  return {
    width: 320, floor: 154, spawn: 14, exit: EXIT,
    get host() { return dotX; },
    focus: { signs: 62, board: 136, map: 198, quiz: 250 },
    props: [
      { id: 's0', x: SX[0], label: 'Spin the sign', r: 15 },
      { id: 's1', x: SX[1], label: 'Spin the sign', r: 15 },
      { id: 's2', x: SX[2], label: 'Spin the sign', r: 15 },
      { id: 'map', x: 198, label: 'Check the map', r: 18 },
      { id: 'quiz', x: QX, label: 'Answer the quiz', r: 22 },
    ],
    enter(st) { st.sd = [0, 1, 2].map(() => ({ dir: 1, t0: null })); st.pick = []; st.qi = 0; st.hereT = null; st.lost = null; st.said = 0; dotX = 150; lastX = 14; },
    update(dt, st, ev) {
      const t = time(); if (ev.beat && !ev.walking) lastX = this.focus[ev.beat.at] ?? lastX;
      const goal = DOT[0] + (Math.sin(t * 0.18) * 0.5 + 0.5) * (DOT[1] - DOT[0]), d = goal - dotX; dotMoving = Math.abs(d) > 1; if (dotMoving) { dotX += Math.sign(d) * Math.min(Math.abs(d), 14 * dt); dotFace = Math.sign(d); }
      if (st.lost == null && st.sd.every(s => s.dir < 0)) { st.lost = t; g.egg('lost', 'Someone followed the signs'); }
      if (st.lost != null && st.sd.some(s => s.dir > 0)) st.lost = null;
    },
    poke(id, st) {
      const t = time();
      if (id === 'host') { g.say(['Follow the signs', 'Good docs point somewhere', 'Which way is it, again?'][st.said++ % 3], dotX, 126); return true; }
      if (id[0] === 's' && id.length === 2) { const i = +id[1], s = st.sd[i]; s.dir = -s.dir; s.t0 = t; lastX = SX[i]; return true; }
      if (id === 'map') { st.hereT = t; lastX = g.heroX ? g.heroX() : 198; g.say('YOU ARE HERE', 198, 82, 1.8); return true; }
      if (id === 'quiz') {
        lastX = QX;
        const i = st.qi; if (i === 0) st.pick = []; st.pick[i] = t; st.qi = (i + 1) % 3;
        g.say(i === 1 ? 'Correct!' : 'BZZT', QX, 22, 1.2); return true;
      }
    },
    draw(st, ev) {
      const t = time(), hx = g.heroX ? g.heroX() : lastX, lit = ev.beatIdx > 0 ? 3 : ev.beatIdx === 0 ? Math.min(3, Math.floor(ev.stepT * 2) + 1) : 0;
      // walls
      R(0, 0, 320, 146, '#a9c5c9'); R(0, 100, 320, 46, '#3a5568'); R(0, 98, 320, 3, '#cfdde0'); for (let x = 0; x < 320; x += 24) R(x, 101, 1, 45, '#33495a');
      for (let x = 0; x < 320; x += 40) R(x, 0, 1, 98, '#9bb8bc');
      // ceiling lights
      R(0, 0, 320, 12, '#8aa5a9'); for (let x = 10; x < 320; x += 50) { const off = Math.sin(t * 3 + x * 7) > 0.97 && x === 160; R(x, 3, 30, 5, off ? '#9aa6b2' : '#fffbe6'); R(x - 1, 2, 32, 1, '#6f7a80'); }
      T('DOCS WING', 160, 18, 6, '#33495a', 'center');
      for (let i = 0; i < 3; i++) sign(st, i, t, lit);
      board(st, ev, t); map(st, ev, t, hx); quiz(st, ev, t);
      // fire door and extinguisher
      R(300, 60, 2, 30, '#d8402a'); R(299, 58, 4, 3, '#1b2332');
      // floor
      R(0, 146, 320, 34, '#8793a1'); for (let x = 0; x < 320; x += 20) R(x, 146, 1, 34, '#7b8795'); R(0, 146, 320, 2, '#6f7a89'); R(0, 162, 320, 2, '#ffd166');
      for (let x = -20; x < 330; x += 40) { const ax = Math.round(x + (t * 14) % 40); R(ax, 170, 14, 2, '#ffd166'); tri(ax + 14, 171, -1, '#ffd166'); }
      // people
      const cyc = t % 22; if (cyc < 11) { const px = -10 + cyc * 31; person(PASSER, px, 150, t, 1, true); }
      if (st.lost != null) { const w = (t - st.lost) * 1.1, lx = 170 + Math.cos(w) * 80, ly = 151 + Math.sin(w) * 4.5, f = Math.sin(w) > 0 ? -1 : 1; person(LOST, lx, ly, t, f, true); T('?', Math.round(lx), Math.round(ly) - 32 - Math.round(Math.abs(Math.sin(t * 5)) * 2), 8, '#ffd166', 'center'); R(Math.round(lx) + f * 7, Math.round(ly) - 12, 6, 5, '#f7f3ea'); }
      person(look('docs'), dotX, 150, t, dotFace, dotMoving);
      R(Math.round(dotX) + dotFace * 5, 142, 5, 6, '#f7f3ea'); R(Math.round(dotX) + dotFace * 5, 142, 5, 1, '#2ec4d6');
      R(EXIT - 12, 100, 24, 54, '#f7f3ea'); R(EXIT - 9, 103, 18, 51, '#1b2030'); R(EXIT - 12, 88, 24, 9, '#2fb67c'); T('EXIT', EXIT, 89.5, 5, '#ffffff', 'center');
    },
  };
};
