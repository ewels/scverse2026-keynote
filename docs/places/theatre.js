// Main lecture theatre: the opener (why). Placeholder art; phase 2 replaces it.
(window.KEYNOTE_PLACES = window.KEYNOTE_PLACES || {}).theatre = g => {
  const { R, T, disc, line, person, look, hash, time } = g;
  const BR = ['#e85d5d', '#ffd166', '#6c8cff', '#3cc87a', '#f5a623'];
  const brick = (x, y, w, c) => { R(x, y, w, 6, c); for (let i = 2; i < w - 1; i += 5) R(x + i, y - 2, 3, 2, c); R(x, y + 5, w, 1, 'rgba(0,0,0,.3)'); };
  const plane = (x, y, d) => { R(x, y, 7, 1, '#ffffff'); R(x + (d > 0 ? 2 : 1), y - 1, 4, 1, '#dfe7f1'); R(x + (d > 0 ? 4 : 0), y + 1, 3, 1, '#c8d0e6'); };
  return {
    width: 480, floor: 154, spawn: 24, exit: 460, host: 420,
    focus: { podium: 96, table: 176, front: 250, screen: 330 },
    props: [{ id: 'glass', x: 112, label: 'Drink some water' }, { id: 'sleeper', x: 210, label: 'Wake the sleeper' }],
    poke(id, st) {
      if (id === 'glass') return (st.sips = (st.sips || 0) + 1) > 2 ? 'Oops, spilt it' : 'Glug glug';
      if (id === 'sleeper') { g.say('Huh? Wha?', 210, 122); return true; }
    },
    draw(st, ev) {
      const t = time(), id = ev.beat && !ev.walking ? (ev.beat.id || ev.beat.at) : '';
      R(0, 0, 480, 150, '#2a1a14'); for (let x = 0; x < 480; x += 24) R(x, 0, 12, 146, '#2f1e17');
      R(236, 14, 188, 100, '#141018'); R(240, 18, 180, 92, '#f2efe6');
      if (id === 'vibes') for (let i = 0; i < 4; i++) plane(240 + ((t * 40 + i * 47) % 172), 34 + i * 16 + Math.round(Math.sin(t * 3 + i) * 4), 1);
      else if (id === 'ran') { plane(250 + Math.min(150, ev.stepT * 60), 30 + Math.min(70, ev.stepT * ev.stepT * 20), 1); T('IT RAN!', 330, 50, 8, '#e85d5d', 'center'); }
      else if (id === 'assemble' || id === 'commons' || id === 'review') {
        const n = id === 'assemble' ? Math.min(12, Math.floor(ev.stepT * 3)) : 24;
        for (let i = 0; i < n; i++) brick(270 + (i % 6) * 20 + (Math.floor(i / 6) % 2) * 6, 96 - Math.floor(i / 6) * 9, 18, BR[i % 5]);
        if (id === 'review') for (let i = 0; i < 3; i++) if (Math.sin(t * 4 + i * 2) > 0) line(290 + i * 40, 60 + i * 6, 296 + i * 40, 74 + i * 6, '#ff2d2d');
      } else T('WHY?', 330, 50, 16, '#2a1a14', 'center');
      g.ctx.fillStyle = 'rgba(255,230,160,.10)'; for (let y = 0; y < 146; y++) { const w = 6 + y * 0.18; g.ctx.fillRect(96 - w, y, w * 2, 1); }
      R(84, 118, 24, 32, '#5a3a22'); R(82, 116, 28, 3, '#7d5230'); R(102, 108, 2, 8, '#8a8f94'); R(100, 106, 6, 2, '#ffd166');
      R(110, 111, 3, 5, (st.sips || 0) > 2 ? '#9aa4a8' : '#9fd0ec');
      R(160, 130, 34, 4, '#7d5230'); R(162, 134, 2, 16, '#5a3a22'); R(190, 134, 2, 16, '#5a3a22'); brick(166, 124, 10, BR[0]); brick(178, 124, 10, BR[1]);
      R(452, 100, 22, 54, '#f7f3ea'); R(455, 103, 16, 51, '#1b2030'); R(451, 88, 24, 9, '#2fb67c'); g.T('EXIT', 463, 89.5, 5, '#ffffff', 'center');
      person(look('why'), 420, 150, t, -1, false);
      R(0, 146, 480, 34, '#3a2418');
      for (let row = 0; row < 2; row++) for (let i = 0; i < 18; i++) { const x = 14 + i * 26 + row * 13, y = 166 + row * 8 + Math.round(Math.sin(t * 2 + i * 1.7 + row) * 0.6);
        disc(x, y, 4, ['#3a2a1f', '#1f1f1f', '#8b2f2f', '#d9a441', '#c8c8c8'][Math.floor(hash(i + row * 20) * 5)]); R(x - 6, y + 4, 12, 10, '#4a2a2a'); }
    },
    features: {
      lego: { steps: 5, draw(step, t) {
        R(0, 0, 320, 180, '#2a1a14'); R(0, 130, 320, 50, '#7d5230'); R(0, 128, 320, 3, '#a87a4a');
        const n = step === 4 ? 16 : step + 1, k = Math.min(1, t * 3);
        for (let i = 0; i < n; i++) { const last = i === n - 1 && step < 4, x = 70 + (i % 4) * 46 + (Math.floor(i / 4) % 2) * 12, y = 112 - Math.floor(i / 4) * 22 - (last ? Math.round((1 - k) * 40) : 0);
          R(x, y, 44, 18, BR[i % 5]); for (let j = 4; j < 40; j += 11) R(x + j, y - 4, 7, 4, BR[i % 5]); R(x, y + 16, 44, 2, 'rgba(0,0,0,.3)'); }
      } },
    },
  };
};
