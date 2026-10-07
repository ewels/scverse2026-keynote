// Cloakroom: building tools for agents. Placeholder art; phase 5 replaces it.
(window.KEYNOTE_PLACES = window.KEYNOTE_PLACES || {}).cloakroom = g => {
  const { R, T, person, look, time, hash } = g;
  const exit = 384, COATS = ['#8b2f2f', '#2b3445', '#3f6b4c', '#d9a441', '#6c8cff', '#4a3a2a', '#c8c8c8'];
  const coat = (x, y, c) => { R(x, y, 2, 3, '#8a8f94'); R(x - 3, y + 3, 8, 16, c); R(x - 3, y + 3, 8, 1, 'rgba(255,255,255,.2)'); };
  return {
    width: 400, floor: 154, spawn: 20, exit, host: 140,
    focus: { counter: 86, rail: 186, pile: 262, coats: 334 },
    props: [{ id: 'tickets', x: 104, label: 'Take a ticket' }, { id: 'coat', x: 300, label: 'Try on a coat' }],
    poke(id, st) {
      if (id === 'tickets') return `Ticket #${(st.tickets = (st.tickets || 0) + 1)}`;
      if (id === 'coat') return 'Far too big';
    },
    draw(st, ev) {
      const t = time(), id = ev.beat && !ev.walking ? (ev.beat.id || ev.beat.at) : '';
      R(0, 0, 400, 146, '#5a4030'); for (let x = 0; x < 400; x += 20) R(x, 0, 1, 146, '#4a3428'); R(0, 90, 400, 2, '#3a2a20');
      R(150, 40, 220, 2, '#c8c8c8'); for (let i = 0; i < 20; i++) coat(156 + i * 11, 42, COATS[i % 7]);
      R(60, 116, 100, 34, '#7d5230'); R(58, 113, 104, 4, '#a87a4a'); T('CLOAKROOM', 110, 128, 5, '#f2d8b0', 'center');
      R(98, 104, 10, 9, '#e85d5d'); R(100, 106, 6, 2, '#ffffff'); T('TAKE A TICKET', 103, 96, 3, '#f2d8b0', 'center');
      if (id === 'two') { person(look('lukas'), 60, 154, t, 1, false); person(look('agents'), 40, 154, t, 1, false); }
      if (id === 'env') { R(176, 64, 40, 12, '#34c38f'); T('AGENT MODE', 196, 67, 4, '#ffffff', 'center'); }
      if (id === 'llms') { R(180, 70, 22, 14, '#ffffff'); for (let i = 0; i < 3; i++) R(183, 73 + i * 3, 16, 1, '#1b2332'); }
      const pile = id === 'context' || id === 'tokens' ? 1 : 0.4;
      for (let i = 0; i < 26 * pile; i++) R(236 + Math.floor(hash(i) * 50), 146 - Math.floor(hash(i + 9) * 30 * pile) - 6, 10, 6, COATS[i % 7]);
      if (id === 'tokens') { const x = 300 + ((t * 60) % 80); R(x, 100, 12, 30, '#ffffff'); R(330, 124, 6, 4, '#ffffff'); }
      R(exit - 12, 100, 24, 54, '#f7f3ea'); R(exit - 9, 103, 18, 51, '#1b2030'); R(exit - 12, 88, 24, 9, '#2fb67c'); T('EXIT', exit, 89.5, 5, '#ffffff', 'center');
      person(look('agents'), 140, 146, t, -1, false);
      R(0, 146, 400, 34, '#3a2a24'); for (let x = 0; x < 400; x += 10) R(x, 150 + (x % 20 ? 0 : 10), 10, 1, '#4a3a30');
    },
    features: {
      richclick: { steps: 3, draw(step, t) {
        R(20, 14, 280, 152, '#1b1f2a'); R(20, 14, 280, 10, '#3b3f47'); [0, 1, 2].forEach(i => R(26 + i * 8, 17, 4, 4, ['#ff5f56', '#ffbd2e', '#27c93f'][i]));
        T('$ mytool --help', 28, 30, 6, '#ffffff');
        const rows = ['Usage: mytool [OPTIONS] INPUT', '--input   Input file', '--output  Output folder', '--threads Number of threads'];
        rows.forEach((r, i) => { const y = 46 + i * 14;
          if (step === 0) T(r, 28, y, 5, '#b0b6c0');
          else if (step === 1) { if (i) { R(28, y - 2, 264, 12, i % 2 ? '#232838' : '#1b1f2a'); T(r.slice(0, 9), 32, y, 5, '#2ec4d6'); T(r.slice(10), 110, y, 5, '#ffd166'); } else T(r, 28, y, 5, '#e85d75'); }
          else T((i ? '- `' + r.slice(0, 9).trim() + '`: ' + r.slice(10).trim() : '# ' + r), 28, y, 5, '#9fe0b8'); });
      } },
    },
  };
};
