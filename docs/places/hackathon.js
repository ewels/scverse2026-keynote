// Hackathon room: nf-core. Placeholder art; phase 4 replaces it. The room fills up as the beats go by.
(window.KEYNOTE_PLACES = window.KEYNOTE_PLACES || {}).hackathon = g => {
  const { R, T, disc, person, look, time } = g;
  const exit = 464;
  return {
    width: 480, floor: 154, spawn: 20, exit, host: 230,
    focus: { door: 50, board: 128, screen: 196, tables: 290, photos: 362, stamp: 412, clock: 444 },
    props: [{ id: 'pizza', x: 330, label: 'Grab a slice' }, { id: 'laptop', x: 262, label: 'Run nf-core lint' }],
    enter(st) { st.slices = 8; },
    poke(id, st) {
      if (id === 'pizza') return st.slices > 0 ? `${--st.slices} slices left` : 'No pizza left';
      if (id === 'laptop') return (st.lint = !st.lint) ? 'nf-core lint: all tests passed' : 'nf-core lint: 1 failure';
    },
    draw(st, ev) {
      const t = time(), lvl = ev.beatIdx;
      R(0, 0, 480, 146, '#eef2ee'); R(0, 0, 480, 8, '#cfd8cf'); R(0, 118, 480, 28, '#dfe6df');
      R(150, 12, 180, 18, '#24b064'); T('NF-CORE HACKATHON', 240, 17, 7, '#ffffff', 'center');
      R(100, 44, 56, 40, '#ffffff'); R(98, 42, 60, 2, '#8a8f94'); R(98, 84, 60, 2, '#8a8f94');
      if (lvl >= 1) { R(108, 52, 22, 2, '#1b2332'); R(108, 58, 30, 2, '#1b2332'); disc(142, 54, 4, '#e85d5d'); }
      if (lvl >= 2) for (let i = 0; i < 3; i++) { R(108, 66 + i * 6, 3, 3, '#24b064'); R(114, 67 + i * 6, 24, 1, '#1b2332'); }
      R(176, 40, 44, 30, '#1b2332'); if (lvl >= 3) for (let i = 0; i < 3; i++) if ((t * 2 + i) % 4 < 3) R(180 + (i % 2) * 14, 44 + i * 8, 22, 5, ['#ffffff', '#9fe0b8', '#ffd166'][i]);
      R(346, 36, 44, 40, '#c8b89a'); if (lvl >= 7) for (let i = 0; i < 6; i++) { const x = 350 + (i % 3) * 13, y = 40 + Math.floor(i / 3) * 18; R(x, y, 11, 14, '#ffffff'); R(x + 3, y + 5, 5, 5, '#f5a623'); R(x + 3, y + 3, 1, 2, '#f5a623'); R(x + 7, y + 3, 1, 2, '#f5a623'); }
      disc(444, 30, 9, '#ffffff'); disc(444, 30, 8, '#1b2332'); disc(444, 30, 7, '#ffffff'); g.line(444, 30, 444 + Math.round(Math.cos(t) * 5), 30 + Math.round(Math.sin(t) * 5), '#1b2332');
      R(400, 122, 26, 4, '#7d5230'); R(402, 126, 2, 22, '#5a3a22'); R(422, 126, 2, 22, '#5a3a22'); R(410, 116, 6, 6, '#e85d5d');
      R(30, 92, 36, 62, '#24b064'); R(33, 95, 30, 59, '#1b2030');
      R(240, 128, 110, 4, '#a0a8b0'); R(244, 132, 2, 18, '#6f7a80'); R(344, 132, 2, 18, '#6f7a80');
      const laptops = Math.min(8, Math.max(1, lvl * 2));
      for (let i = 0; i < laptops; i++) { const x = 246 + i * 12; R(x, 120, 9, 7, '#4a5563'); R(x + 1, 121, 7, 5, (t * 3 + i) % 5 < 4 ? '#9fe0b8' : '#ffffff'); R(x + 2, 122, 2, 2, ['#e85d5d', '#ffd166', '#6c8cff'][i % 3]); }
      R(320, 124, 18, 4, '#d9a441'); R(321, 125, Math.round(16 * (st.slices || 0) / 8), 2, '#e85d5d');
      if (lvl >= 4) for (let i = 0; i < 4; i++) person(look(['lukas', 'luca', 'nfcore', 'greeter'][i]), 256 + i * 26, 146, t + i, 1, false);
      if (lvl >= 5) T('WELCOME!', 50, 82, 5, '#24b064', 'center');
      R(exit - 12, 100, 24, 54, '#f7f3ea'); R(exit - 9, 103, 18, 51, '#1b2030'); R(exit - 12, 88, 24, 9, '#2fb67c'); T('EXIT', exit, 89.5, 5, '#ffffff', 'center');
      person(look('nfcore'), 230, 150, t, -1, false);
      R(0, 146, 480, 34, '#9aa3a0'); for (let x = 0; x < 480; x += 16) R(x, 146, 1, 34, '#8a938f');
    },
  };
};
