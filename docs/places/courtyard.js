// Outdoor courtyard: rewrites.bio. Placeholder art; phase 4 replaces it.
(window.KEYNOTE_PLACES = window.KEYNOTE_PLACES || {}).courtyard = g => {
  const { R, T, disc, map2d, blob, time } = g;
  const exit = 384, ARMS = ['rewrite', 'upstream', 'combine'], CRAB = ['oo........oo', 'o.o.w..w.o.o', 'oo..k..k..oo', '.o.oooooo.o.', '..oooooooo..', '.oooooooooo.', 'o.o.o..o.o.o'];
  const crab = (x, y, s) => map2d(CRAB, Math.round(x) - 6 * s, y, { o: '#e0602e', w: '#ffffff', k: '#1b1b1b' }, s);
  return {
    width: 400, floor: 154, spawn: 20, exit, host: 138,
    focus: { gates: 60, sign: 168, track: 270 },
    props: [{ id: 'pond', x: 210, label: 'Look in the pond' }, { id: 'dino', x: 340, label: 'Poke the dinosaur' }],
    poke(id, st) {
      if (id === 'pond') { st.ripple = time(); return; }
      if (id === 'dino') { g.say('...', 340, 96); return true; }
      if (id === 'host') { g.say('Click click!', 138, 128); return true; }
    },
    draw(st, ev) {
      const t = time(), id = ev.beat && !ev.walking ? (ev.beat.id || ev.beat.at) : '';
      ['#7ec0ee', '#94cbf0', '#acd8f3', '#c6e4f6', '#d8ecf8', '#e4efe0'].forEach((c, i) => R(0, i * 25, 400, 26, c));
      R(0, 60, 24, 86, '#b9b0a0'); R(376, 60, 24, 86, '#b9b0a0');
      R(30, 40, 6, 106, '#3b3f47'); R(84, 40, 6, 106, '#3b3f47'); R(28, 30, 64, 14, '#3b3f47'); T('REWRITES.BIO', 60, 34, 5, '#ffd166', 'center');
      for (let x = 38; x < 84; x += 6) R(x, 50, 1, 96, '#555b66');
      for (const x of [110, 250]) { R(x - 5, 132, 10, 14, '#a8653a'); R(x - 1, 96, 2, 36, '#8a6a4a'); blob(x, 92, 9, '#3f8a3f', '#58a852', '#2f6e2f'); }
      R(167, 92, 2, 54, '#8a6a4a');
      ARMS.forEach((a, i) => { const on = id === a, y = 94 + i * 12, x = i % 2 ? 140 : 170; R(x, y, 28, 9, on ? '#ffd166' : '#e9e2d0'); T(['REWRITE', 'UPSTREAM', 'COMBINE'][i], x + 14, y + 2, 4, '#1b2332', 'center'); });
      R(190, 146, 60, 6, '#4f8cc0'); if (st.ripple && t - st.ripple < 1.5) R(215 - (t - st.ripple) * 10, 147, 10 + (t - st.ripple) * 20, 1, '#cfe4f2');
      R(330, 120, 26, 26, '#8a8f94'); R(336, 96, 10, 26, '#8a8f94'); R(340, 90, 14, 8, '#8a8f94'); R(350, 92, 2, 2, '#1b1b1b');
      const race = ['rustqc', 'rustar', 'fastqc'].indexOf(id);
      if (race >= 0) { const k = Math.min(1, ev.stepT / 3); R(220, 152, 120, 1, '#ffffff'); crab(224 + k * 104, 140, 1); R(222 + k * 50, 141, 10, 6, '#6b8e4e'); R(230 + k * 50, 143, 3, 3, '#8aa86a'); if (k >= 1 && race === 2) disc(328, 132, 3, '#ffd166'); }
      R(exit - 12, 100, 24, 54, '#f7f3ea'); R(exit - 9, 103, 18, 51, '#1b2030'); R(exit - 12, 88, 24, 9, '#2fb67c'); T('EXIT', exit, 89.5, 5, '#ffffff', 'center');
      crab(138 + Math.round(Math.sin(t * 2) * 4), 140, 2);
      R(0, 146, 400, 34, '#c9b48a'); for (let x = 0; x < 400; x += 12) R(x, 146 + (x % 24 ? 0 : 4), 6, 1, '#b39d72');
      for (let i = 0; i < 5; i++) R(Math.round((t * 30 + i * 90) % 400), 60 + i * 15 + Math.round(Math.sin(t * 2 + i) * 4), 2, 1, '#58a852');
    },
  };
};
