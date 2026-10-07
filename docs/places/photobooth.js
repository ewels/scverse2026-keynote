// Photo booth: Python tooling. Placeholder art; phase 6 replaces it.
(window.KEYNOTE_PLACES = window.KEYNOTE_PLACES || {}).photobooth = g => {
  const { R, T, person, look, time } = g;
  const exit = 306;
  return {
    width: 320, floor: 154, spawn: 14, exit, host: 170,
    focus: { booth: 112, printer: 216 },
    props: [{ id: 'hat', x: 262, label: 'Try on a hat' }, { id: 'booth', x: 92, label: 'Take a photo' }],
    poke(id, st) { if (id === 'hat') return 'Very fetching'; if (id === 'booth') { st.flash = time(); return; } },
    draw(st, ev) {
      const t = time(), id = ev.beat && !ev.walking ? (ev.beat.id || ev.beat.at) : '';
      R(0, 0, 320, 146, '#3a2a4a'); for (let x = 0; x < 320; x += 8) R(x, 0, 2, 146, '#43305a');
      R(70, 40, 70, 106, '#ffd43b'); R(74, 52, 30, 94, '#8b2f8f'); for (let x = 76; x < 104; x += 5) R(x, 52, 1, 94, '#6f1f73');
      R(108, 60, 26, 20, '#1b2332'); R(114, 66, 14, 8, '#3b3f47'); T('PHOTOS', 105, 44, 5, '#1b2332', 'center');
      const fl = (id === 'richclick' && ev.stepT < 0.4) || (st.flash && t - st.flash < 0.3); if (fl) { g.ctx.fillStyle = 'rgba(255,255,255,.35)'; g.ctx.fillRect(0, 0, 320, 180); }
      if (id === 'richclick') person({ skin: '#c8c8c8', hair: '#9a9a9a', top: ev.stepT > 0.4 ? '#3776ab' : '#8a8a8a', topStyle: 'tee', pants: ev.stepT > 0.4 ? '#ffd43b' : '#6a6a6a' }, 120, 150, t, 1, false);
      R(204, 100, 26, 24, '#c8d0dc'); R(208, 104, 18, 4, '#1b2332'); R(204, 124, 2, 26, '#8a8f94'); R(228, 124, 2, 26, '#8a8f94');
      const k = id === 'pydocs' ? Math.min(1, ev.stepT / 1.5) : 0; if (k) { R(211, 108, 12, Math.round(36 * k), '#ffffff'); for (let i = 0; i < 4 * k; i++) R(213, 112 + i * 8, 8, 2, '#3776ab'); }
      R(256, 112, 14, 2, '#8a8f94'); R(262, 114, 2, 36, '#8a8f94'); R(254, 104, 18, 6, '#1b1b1b'); R(258, 98, 10, 6, '#1b1b1b');
      R(exit - 12, 100, 24, 54, '#f7f3ea'); R(exit - 9, 103, 18, 51, '#1b2030'); R(exit - 12, 88, 24, 9, '#2fb67c'); T('EXIT', exit, 89.5, 5, '#ffffff', 'center');
      person(look('python'), 170, 150, t, -1, false);
      R(0, 146, 320, 34, '#2a1f36'); for (let x = 0; x < 320; x += 20) R(x, 146, 10, 34, '#33264a');
    },
  };
};
