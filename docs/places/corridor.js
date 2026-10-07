// Corridor signage: building awesome docs sites. Placeholder art; phase 6 replaces it.
(window.KEYNOTE_PLACES = window.KEYNOTE_PLACES || {}).corridor = g => {
  const { R, T, person, look, time } = g;
  const exit = 306;
  return {
    width: 320, floor: 154, spawn: 14, exit, host: 240,
    focus: { signs: 66, board: 136, map: 196, quiz: 270 },
    props: [{ id: 'sign', x: 86, label: 'Spin the sign' }],
    poke(id, st) { if (id === 'sign') { st.flip = !st.flip; return; } },
    draw(st, ev) {
      const t = time(), at = ev.beat && !ev.walking ? ev.beat.at : '', lit = at === 'signs' ? Math.min(3, Math.floor(ev.stepT * 2) + 1) : ev.beatIdx > 0 ? 3 : 0;
      R(0, 0, 320, 146, '#b9c4cf'); R(0, 0, 320, 14, '#9aa6b2'); for (let x = 0; x < 320; x += 40) R(x + 16, 2, 8, 4, Math.sin(t * 9 + x) > 0.95 ? '#9aa6b2' : '#fffbe6');
      for (let i = 0; i < 3; i++) { const x = 40 + i * 28, on = i < lit; R(x + 9, 14, 1, 14, '#6f7a80'); R(x, 28, 20, 10, on ? '#2ec4d6' : '#7d8a99'); T(i === 0 && st.flip ? '<' : '>', x + 10, 30, 6, '#ffffff', 'center'); }
      R(112, 50, 48, 40, '#c8a46a'); for (let i = 0; i < 4; i++) { R(116 + (i % 2) * 22, 54 + Math.floor(i / 2) * 18, 18, 14, '#1b2332'); R(118 + (i % 2) * 22, 57 + Math.floor(i / 2) * 18, 10, 1, at === 'board' && i === Math.floor(t) % 4 ? '#ffd166' : '#9fe0b8'); }
      R(176, 46, 40, 44, '#ffffff'); R(178, 48, 36, 40, '#e8eef2'); const fill = at === 'map' ? Math.min(6, Math.floor(ev.stepT * 3)) : ev.beatIdx > 2 ? 6 : 1;
      for (let i = 0; i < fill; i++) R(180 + (i % 3) * 11, 52 + Math.floor(i / 3) * 16, 9, 12, '#2ec4d6'); R(196, 82, 3, 3, '#e85d5d');
      R(252, 44, 44, 46, '#1b2332'); T('QUIZ', 274, 48, 5, '#ffffff', 'center'); for (let i = 0; i < 3; i++) R(258, 58 + i * 10, 32, 7, at === 'quiz' && ev.stepT > 1.5 ? (i === 1 ? '#2fb67c' : '#e85d5d') : '#3b4252');
      R(exit - 12, 100, 24, 54, '#f7f3ea'); R(exit - 9, 103, 18, 51, '#1b2030'); R(exit - 12, 88, 24, 9, '#2fb67c'); T('EXIT', exit, 89.5, 5, '#ffffff', 'center');
      person(look('docs'), 240, 150, t, -1, false);
      R(0, 146, 320, 34, '#7d8a99'); for (let x = 20; x < 300; x += 40) { R(x, 160, 12, 2, '#ffd166'); R(x + 10, 158, 2, 6, '#ffd166'); }
    },
  };
};
