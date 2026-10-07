// Coffee break queue: side projects. Each person in the queue is a project; the last in line is this game.
(window.KEYNOTE_PLACES = window.KEYNOTE_PLACES || {}).coffee = g => {
  const { R, T, disc, line, person, look, time, hash, ctx } = g;
  const EXIT = 306, CX = 266, CAB_SCALE = 18 / 320, TOWER = 70, URN = 56, BIS = 88, FLOOR = 154;
  const Q = ['graphs', 'docs', 'metro', 'deck', 'tidy'], QX = [120, 148, 176, 204, 232];
  const NAME = { urn: 'SIDE PROJECTS', graphs: 'CONTRIBUTOR GRAPHS', docs: 'NF-DOCS', metro: 'NF-METRO', deck: 'STREAM DECK PLUGINS', tidy: 'GFM-TIDY', game: 'THIS GAME' };
  const TAG = { urn: 'the coffee queue', graphs: 'who built it, over time', docs: 'API docs for pipelines', metro: 'metro maps of pipelines', deck: 'DeckCal and friends', tidy: 'tidy GitHub comments', game: 'you are in it' };
  const LOOKS = [
    { skin: '#efc6a3', hair: '#3a2a1f', hairStyle: 'short', top: '#e85d5d', topStyle: 'tee', pants: '#2f3a4f' },
    { skin: '#a86f4c', hair: '#1f1f1f', hairStyle: 'long', top: '#6c8cff', topStyle: 'hoodie', pants: '#2f3a4f' },
    { skin: '#e8b894', hair: '#d9a441', hairStyle: 'swept', top: '#3cc87a', topStyle: 'tee', pants: '#2f3a4f' },
    { skin: '#c98e62', hair: '#8b2f2f', hairStyle: 'messy', glasses: true, top: '#f5a623', topStyle: 'sweat', pants: '#2f3a4f' },
    { skin: '#f2c9a0', hair: '#4a403a', hairStyle: 'bald', top: '#2ec4d6', topStyle: 'tee', pants: '#2f3a4f' },
  ];
  const CLEANER = { skin: '#d9a27c', hair: '#3a3a3a', hairStyle: 'short', top: '#3d6f8e', topStyle: 'tee', pants: '#3d6f8e', shoes: '#2b2b2b' };
  const BISCUIT = '#c8903c';
  const clamp = (v, a, b) => Math.max(a, Math.min(b, v));
  const at = ev => (ev.beat && !ev.walking ? ev.beat.at : '');

  // small prop held in the hand, drawn with its top-left at (x, y), roughly 10x10
  const small = (i, x, y, t, col) => {
    if (i === 0) { R(x, y + 9, 11, 1, '#1b2332'); for (let k = 0; k < 4; k++) R(x + 1 + k * 3, y + 8 - (k + 1) * 2, 2, (k + 1) * 2, ['#e85d5d', '#f5a623', '#3cc87a', '#6c8cff'][k]); }
    else if (i === 1) { R(x, y + 1, 10, 9, '#6c3fb0'); R(x + 1, y + 2, 8, 7, '#f7f3ea'); R(x + 5, y + 1, 1, 9, '#6c3fb0'); R(x + 2, y + 4, 2, 1, '#1b2332'); R(x + 7, y + 4, 2, 1, '#1b2332'); }
    else if (i === 2) { R(x, y + 4, 11, 2, '#e85d5d'); R(x + 5, y, 2, 11, '#2f6fd6'); disc(x + 1, y + 5, 2, '#ffffff'); disc(x + 10, y + 5, 2, '#ffffff'); disc(x + 6, y + 1, 2, '#ffffff'); }
    else if (i === 3) { R(x, y + 1, 11, 9, '#1b2332'); for (let k = 0; k < 6; k++) R(x + 1 + (k % 3) * 3, y + 2 + Math.floor(k / 3) * 4, 2, 3, Math.floor(t * 2 + k) % 6 === k ? '#ffd166' : '#3cc8d6'); }
    else { R(x + 5, y - 2, 1, 9, '#8a6a4a'); R(x + 1, y + 7, 9, 4, '#d9a441'); for (let k = 0; k < 5; k++) R(x + 2 + k * 2, y + 10, 1, 2, '#a8782c'); }
  };

  // large version on the card above the active person; 44x32 design box at (x, y)
  const big = (i, x, y, t, k) => {
    R(x, y, 44, 32, '#10162a'); R(x, y, 44, 1, '#ffffff'); R(x, y + 31, 44, 1, '#2b3550');
    if (i === 0) {
      R(x + 3, y + 3, 1, 25, '#7f8aab'); R(x + 3, y + 27, 38, 1, '#7f8aab');
      for (let c = 0; c < 9; c++) { const a = Math.round((3 + c * 1.6) * k), b = Math.round((2 + Math.sin(c) * 2 + c * 1.2) * k), d = Math.round((1 + (c % 3)) * k);
        R(x + 5 + c * 4, y + 27 - a, 3, a, '#3cc87a'); R(x + 5 + c * 4, y + 27 - a - b, 3, b, '#6c8cff'); R(x + 5 + c * 4, y + 27 - a - b - d, 3, d, '#f5a623'); }
    } else if (i === 1) {
      R(x + 4, y + 6, 36, 22, '#6c3fb0'); R(x + 6, y + 8, 16, 18, '#f7f3ea'); R(x + 22, y + 8, 16, 18, '#f7f3ea'); R(x + 21, y + 6, 2, 22, '#4a2a80');
      for (let r = 0; r < 5; r++) { R(x + 8, y + 11 + r * 3, 12, 1, '#7f8aab'); R(x + 24, y + 11 + r * 3, 12, 1, '#7f8aab'); }
      R(x + 8, y + 9, 5, 1, '#6c3fb0'); const f = Math.abs(Math.sin(t * 1.4)); R(Math.round(x + 22 + 16 - 16 * f), y + 8, Math.max(1, Math.round(16 * f)), 18, '#e6e0d2');
    } else if (i === 2) {
      const ln = (pts, c) => { for (let p = 0; p < pts.length - 1; p++) { line(x + pts[p][0], y + pts[p][1], x + pts[p + 1][0], y + pts[p + 1][1], c); line(x + pts[p][0], y + pts[p][1] + 1, x + pts[p + 1][0], y + pts[p + 1][1] + 1, c); } };
      const A = [[4, 8], [16, 8], [24, 16], [40, 16]], B = [[10, 28], [10, 16], [24, 16], [34, 6]], C = [[4, 24], [20, 24], [28, 18]];
      ln(A, '#e85d5d'); ln(B, '#2f9be6'); ln(C, '#3cc87a');
      for (const [px, py] of [[4, 8], [16, 8], [24, 16], [40, 16], [10, 28], [10, 16], [34, 6], [20, 24]]) { disc(x + px, y + py, 2, '#ffffff'); disc(x + px, y + py, 1, '#10162a'); }
      const u = (t * 0.25) % 1, seg = Math.min(2, Math.floor(u * 3)), f = u * 3 - seg; disc(Math.round(x + A[seg][0] + (A[seg + 1][0] - A[seg][0]) * f), Math.round(y + A[seg][1] + (A[seg + 1][1] - A[seg][1]) * f), 2, '#ffd166');
    } else if (i === 3) {
      for (let n = 0; n < 6; n++) { const kx = x + 4 + (n % 3) * 13, ky = y + 4 + Math.floor(n / 3) * 13, on = Math.floor(t * 1.6) % 6 === n;
        R(kx, ky, 11, 11, on ? '#ffd166' : '#2b3550'); R(kx + 1, ky + 1, 9, 9, on ? '#fff3c4' : ['#2f9be6', '#3cc87a', '#e85d5d', '#b28dff', '#3cc8d6', '#f5a623'][n]); }
      T('4:12', x + 14, y + 6, 5, '#10162a');
    } else {
      for (let n = 0; n < 7; n++) { const s = (t * 0.8 + n / 7) % 1; R(x + 4 + Math.round(s * 28), y + 22 + (n % 3), 6, 1, s > 0.8 ? '#2fb67c' : '#7f8aab'); }
      R(x + 33, y + 22, 8, 3, '#2fb67c'); const sw = Math.round(Math.sin(t * 4) * 5); line(x + 22 + sw, y + 4, x + 18 + sw, y + 18, '#8a6a4a'); R(x + 13 + sw, y + 18, 11, 5, '#d9a441');
    }
  };

  const steamAt = (x, y, t, n) => { for (let i = 0; i < n; i++) { const p = (t * 0.7 + i / n) % 1; R(Math.round(x + Math.sin(t * 2 + i * 2) * 2 + i - 1), Math.round(y - p * 16), 2, 2, `rgba(255,255,255,${(1 - p) * 0.75})`); } };

  const cabinet = (st, t, depth, x, y, on, ev) => {
    R(x - 12, y - 46, 24, 46, '#2b2160'); R(x - 12, y - 46, 2, 46, '#4a3aa0'); R(x - 11, y - 46, 22, 8, '#b28dff'); T('GAME', x, y - 45, 5, '#2b2160', 'center');
    const sx = x - 9, sy = y - 36; R(sx - 1, sy - 1, 20, 12, '#0b0b12');
    ctx.save(); ctx.beginPath(); ctx.rect(sx, sy, 18, 10); ctx.clip();
    if (st.arcade && depth < 4) { ctx.translate(sx, sy); ctx.scale(CAB_SCALE, CAB_SCALE); scene(st, ev, depth + 1, true); }
    else { R(sx, sy, 18, 10, '#0e1a2a'); for (let k = 0; k < 6; k++) R(sx + Math.round(hash(k) * 16), sy + ((k * 3 + Math.floor(t * 6)) % 10), 1, 1, '#ffffff');
      const hop = Math.abs(Math.sin(t * 3)) * 3; R(sx + 7, sy + 6 - Math.round(hop), 3, 4, on ? '#ffd166' : '#6c8cff'); }
    ctx.restore();
    R(x - 11, y - 33 + 14, 22, 2, '#4a3aa0'); R(x - 4, y - 18, 2, 4, '#1b1b1b'); disc(x - 3, y - 19, 2, '#e85d5d'); disc(x + 4, y - 17, 2, '#ffd166'); disc(x + 8, y - 17, 2, '#3cc8d6');
    R(x - 3, y - 8, 6, 1, '#0b0b12'); R(x - 12, y - 4, 24, 4, '#1b1440');
  };

  function scene(st, ev, depth, inner) {
    const t = time(), id = at(ev), act = Q.indexOf(id), gameOn = id === 'game', stare = st.stare != null && t - st.stare < 2.6;
    // back wall
    R(0, 0, 320, 146, '#e4d9c6'); R(0, 96, 320, 50, '#d3c5ad'); R(0, 94, 320, 3, '#b9a98d');
    for (let x = 0; x < 320; x += 20) R(x, 97, 1, 49, '#c9bba2');
    // window with drifting clouds and a bird
    R(222, 28, 52, 40, '#8a6a4a'); R(225, 31, 46, 34, '#9fd0f0'); R(247, 31, 2, 34, '#8a6a4a'); R(225, 47, 46, 2, '#8a6a4a');
    const cx = 226 + ((t * 3) % 60) - 8; R(clamp(Math.round(cx), 225, 262), 36, 10, 3, '#ffffff'); R(clamp(Math.round(cx) + 3, 225, 262), 34, 6, 2, '#ffffff');
    const bx = 225 + ((t * 9) % 60); if (bx < 266) { R(Math.round(bx), 54, 2, 1, '#1b2332'); R(Math.round(bx) + 2, Math.floor(t * 8) % 2 ? 53 : 55, 2, 1, '#1b2332'); }
    // clock
    disc(88, 38, 9, '#1b2332'); disc(88, 38, 8, '#fffbe6'); line(88, 38, 88 + Math.round(Math.sin(t * 0.1) * 5), 38 - Math.round(Math.cos(t * 0.1) * 5), '#1b2332'); line(88, 38, 88 + Math.round(Math.sin(t * 0.6) * 6), 38 - Math.round(Math.cos(t * 0.6) * 6), '#e85d5d');
    // banner
    const nm = NAME[id] || (ev.beat ? NAME.urn : 'COFFEE BREAK');
    R(100, 12, 116, 30, '#2b2140'); R(100, 12, 116, 2, '#b28dff'); R(100, 40, 116, 2, '#b28dff');
    T(nm, 158, 17, nm.length > 14 ? 6 : 8, '#ffffff', 'center'); T(TAG[id] || TAG.urn, 158, 31, 5, '#d9c8ff', 'center');
    // table
    R(6, 116, 96, 4, '#f7f3ea'); R(8, 120, 92, 26, '#8b5e3c'); R(8, 120, 92, 2, '#a87a4a'); for (let x = 12; x < 98; x += 14) R(x, 124, 1, 20, '#7a5232');
    // host behind the table
    person(look('side'), 20, 127, t, 1, false); R(8, 128, 92, 18, '#8b5e3c'); R(8, 128, 92, 2, '#a87a4a');
    R(6, 116, 96, 4, '#f7f3ea');
    // two urns
    for (const [ux, hot] of [[34, 0], [URN, 1]]) { R(ux - 7, 96, 14, 20, '#9aa3ab'); R(ux - 7, 96, 3, 20, '#c4cbd1'); R(ux - 8, 94, 16, 3, '#6f7a80'); R(ux - 2, 90, 4, 4, '#6f7a80');
      R(ux - 3, 104, 6, 5, hot ? '#e85d5d' : '#3cc87a'); R(ux - 1, 112, 2, 5, '#6f7a80'); R(ux + 4, 108, 5, 2, '#6f7a80');
      if (st.pourT != null && hot && t - st.pourT < 0.5) R(ux, 114, 1, 4, '#5a3320'); steamAt(ux, 90, t + hot, 3); }
    // cup tower, or the fallen cups
    const fl = st.flood != null ? t - st.flood : -1, cups = st.cups || 0;
    const wob = cups >= 10 && fl < 0 ? Math.min(1, (cups - 9) / 5) : 0;
    if (fl < 0) for (let i = 0; i < cups; i++) { const dx = Math.round(Math.sin(t * 11 + i) * wob * (0.4 + i * 0.12)); R(TOWER - 4 + dx, 116 - 5 - i * 3, 9, 5, '#ffffff'); R(TOWER - 4 + dx, 116 - 5 - i * 3, 9, 1, '#5a3320'); R(TOWER - 4 + dx, 116 - 2 - i * 3, 9, 1, '#d6d0c2'); }
    else for (let i = 0; i < 15 && fl < 8; i++) {
      const vx = (hash(i + 3) - 0.3) * 60, y0 = 116 - 5 - i * 3, q = Math.min(fl, 1.6), yy = Math.min(146, y0 + 40 * q * q * (1 + hash(i) * 0.5));
      const rest = yy >= 146, x = TOWER + vx * (rest ? Math.min(fl, 1.1) * 0.9 : q) * (0.6 + hash(i) * 0.5);
      R(Math.round(x) - 4, Math.round(yy) - (rest ? 3 : 5), rest ? 9 : 9, rest ? 3 : 5, '#ffffff'); if (rest) R(Math.round(x) - 4, Math.round(yy) - 3, 9, 1, '#5a3320'); }
    // biscuits
    R(BIS - 12, 113, 24, 3, '#e8e2d2'); R(BIS - 10, 115, 20, 1, '#cfc8b6');
    for (let i = 0; i < (st.bis == null ? 8 : st.bis); i++) { const bx = BIS - 10 + (i % 4) * 5, by = 110 - Math.floor(i / 4) * 3; disc(bx + 2, by + 1, 2, BISCUIT); R(bx + 1, by, 1, 1, '#6b4420'); }
    if (st.bis === 0) for (let i = 0; i < 4; i++) R(BIS - 8 + i * 5, 113, 1, 1, '#a8782c');
    // floor
    R(0, 146, 320, 34, '#b0a48c'); for (let x = 0; x < 320; x += 16) R(x, 146, 8, 34, '#a89c84');
    // coffee flood
    if (fl >= 0) { const k = fl < 7.5 ? clamp((fl - 0.6) / 2.5, 0, 1) : clamp(1 - (fl - 7.5) / 4, 0, 1);
      for (let r = 0; r < 12; r++) { const wv = Math.round(Math.sqrt(1 - Math.pow((r - 6) / 6.5, 2)) * 150 * k); if (wv > 0) R(TOWER + 24 - wv / 2, 148 + r * 2, wv, 2, r < 2 ? '#7a4a2a' : '#5a3320'); } }
    // queue
    Q.forEach((q, i) => {
      const on = act === i, tg = on ? 1 : 0, s = st.step[i] = (st.step[i] || 0) + (tg - (st.step[i] || 0)) * 0.12;
      const x = QX[i] + Math.round(Math.sin(t * 0.4 + i * 2) * 1.2) - Math.round(s * 4), y = 146 + Math.round(s * 5) - (Math.sin(t * 1.7 + i * 3) > 0.96 ? 1 : 0);
      person(LOOKS[i], x, y, t + i, stare ? -1 : on ? -1 : 1, false);
      small(i, x - 5 + (stare || on ? -6 : 7), y - 11 - Math.round(s * 4 + (on ? 6 : 0)), t, LOOKS[i].top);
      if (stare) { R(x - 6, y - 24, 4, 1, '#1b1b1b'); R(x + 2, y - 24, 4, 1, '#1b1b1b'); R(x - 1, y - 30 - Math.round(Math.abs(Math.sin(t * 8))), 2, 4, '#e85d5d'); R(x - 1, y - 25, 2, 1, '#e85d5d'); }
    });
    // active project card
    if (act >= 0) { const sx = Math.round(QX[act] - 4 - 22 + 4), x0 = clamp(sx, 106, 200); const k = clamp(ev.stepT / 1.4, 0, 1);
      big(act, x0, 68, t, k); R(QX[act] - 4, 100, 1, 18, '#7f8aab'); }
    // cabinet
    const cs = st.step[5] = (st.step[5] || 0) + ((gameOn ? 1 : 0) - (st.step[5] || 0)) * 0.12;
    cabinet(st, t, depth, CX - Math.round(cs * 6), 146 + Math.round(cs * 5), gameOn, ev);
    if (!inner) {
      // cleaner after the flood
      if (fl >= 3.5 && fl < 15) { let x, mv = true, face = -1;
        if (fl < 7.5) x = 345 - (fl - 3.5) * 51; else if (fl < 11.5) { x = 142 - (fl - 7.5) * 7 + Math.sin(fl * 5) * 7; mv = Math.abs(Math.cos(fl * 5)) > 0.3; } else { x = 114 + (fl - 11.5) * 60; face = 1; }
        person(CLEANER, x, 152, t, face, mv); const mx = Math.round(x) + face * 9, sw = fl >= 7.5 && fl < 11.5 ? Math.round(Math.sin(fl * 5) * 3) : 0;
        line(mx, 150, mx + face * 4 + sw, 130, '#8a6a4a'); R(mx - 4 + face * 2 + sw, 148, 9, 4, '#c8c8c8');
        if (fl >= 7.5 && fl < 11.5) { T('...', Math.round(x), 120, 6, '#1b2332', 'center'); } }
    }
  }

  return {
    width: 320, floor: FLOOR, spawn: 14, exit: EXIT, host: 20,
    focus: { urn: URN, graphs: 106, docs: 134, metro: 162, deck: 190, tidy: 218, game: 250 },
    props: [
      { id: 'urn', x: URN, label: 'Pour a coffee' },
      { id: 'biscuits', x: BIS, label: 'Take a biscuit' },
      { id: 'queue', x: 104, label: 'Skip the queue' },
      { id: 'game', x: CX - 4, label: 'Poke the arcade cabinet' },
    ],
    enter(st) { st.cups = 0; st.bis = 8; st.step = []; st.flood = null; st.stare = null; st.pourT = null; st.zoom = null; st.arcade = false; st.said = 0; },
    update(dt, st) { if (st.flood != null && time() - st.flood > 15) { st.flood = null; st.cups = 0; } },
    poke(id, st) {
      const t = time();
      if (id === 'host') { g.say(['Flat white?', 'One at a time, please', 'That is a lot of coffee'][st.said++ % 3], 20, 112); return true; }
      if (id === 'urn') {
        if (st.flood != null) { g.say('Mind the floor', URN, 84); return true; }
        st.cups++; st.pourT = t;
        if (st.cups === 10) g.say('The stack is wobbling', TOWER, 56);
        if (st.cups >= 15) { st.flood = t; g.say('Oh no', TOWER, 60); g.egg('coffee', 'Too much coffee'); }
        return true;
      }
      if (id === 'biscuits') {
        if (st.bis > 0) st.bis--;
        g.say(st.bis ? `Nom. ${st.bis} biscuits left` : 'No biscuits left', BIS, 96); return true;
      }
      if (id === 'queue') { st.stare = t; g.say('The queue starts back there', 190, 104, 2.4); return true; }
      if (id === 'game') { st.arcade = true; st.zoom = t; g.egg('arcade', 'The game inside the game'); return true; }
    },
    draw(st, ev) { scene(st, ev, 0, false); R(EXIT - 12, 100, 24, 54, '#f7f3ea'); R(EXIT - 9, 103, 18, 51, '#1b2030'); R(EXIT - 12, 88, 24, 9, '#2fb67c'); T('EXIT', EXIT, 89.5, 5, '#ffffff', 'center'); },
    drawFront(st, ev) {
      const t = time(), z = st.zoom != null ? t - st.zoom : 99; if (z > 5) return;
      ctx.save(); ctx.globalAlpha = clamp(Math.min(z * 3, (5 - z) * 3), 0, 1);
      R(54, 14, 212, 126, '#0b0b12'); R(58, 18, 204, 118, '#2b2160'); R(62, 22, 196, 110, '#0b0b12');
      ctx.beginPath(); ctx.rect(64, 24, 192, 106); ctx.clip(); ctx.translate(64, 24); ctx.scale(0.6, 0.6); scene(st, ev, 1, true);
      ctx.restore(); ctx.save(); ctx.globalAlpha = clamp(Math.min(z * 3, (5 - z) * 3), 0, 1); T('THIS ROOM, AGAIN', 160, 143, 7, '#ffffff', 'center'); ctx.restore();
    },
  };
};
