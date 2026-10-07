// Coffee break queue: side projects. Placeholder art; phase 6 replaces it. Each person in the queue is a project.
(window.KEYNOTE_PLACES = window.KEYNOTE_PLACES || {}).coffee = g => {
  const { R, T, person, look, time } = g;
  const exit = 306, Q = ['graphs', 'docs', 'metro', 'deck', 'tidy', 'game'];
  const LOOKS = Q.map((_, i) => ({ skin: ['#efc6a3', '#a86f4c', '#e8b894', '#c98e62', '#f2c9a0', '#d9a27c'][i], hair: ['#3a2a1f', '#1f1f1f', '#d9a441', '#8b2f2f', '#4a403a', '#b28dff'][i],
    hairStyle: ['short', 'long', 'swept', 'messy', 'bald', 'short'][i], top: ['#e85d5d', '#6c8cff', '#3cc87a', '#f5a623', '#2ec4d6', '#b28dff'][i], topStyle: 'tee', pants: '#2f3a4f' }));
  const ITEM = [c => { for (let i = 0; i < 4; i++) R(i * 3, 8 - i * 2, 2, 2 + i * 2, c); }, c => { R(0, 2, 10, 8, c); R(5, 2, 1, 8, '#ffffff'); },
    c => { R(0, 5, 10, 1, c); R(5, 0, 1, 10, '#e85d5d'); R(4, 4, 3, 3, '#ffffff'); }, c => { for (let i = 0; i < 6; i++) R((i % 3) * 4, Math.floor(i / 3) * 4 + 2, 3, 3, Math.sin(time() * 4 + i) > 0 ? '#ffd166' : c); },
    c => { R(4, 0, 1, 8, '#8a6a4a'); R(1, 8, 7, 3, c); }, c => { R(1, 0, 8, 11, '#1b2332'); R(2, 1, 6, 5, '#3cc87a'); R(3, 8, 4, 1, '#e85d5d'); }];
  return {
    width: 320, floor: 154, spawn: 14, exit, host: 34,
    focus: { urn: 70, graphs: 98, docs: 128, metro: 158, deck: 188, tidy: 218, game: 248 },
    props: [{ id: 'urn', x: 54, label: 'Pour a coffee' }],
    poke(id, st) { if (id === 'urn') return `${(st.cups = (st.cups || 0) + 1)} cups of coffee`; },
    draw(st, ev) {
      const t = time(), at = ev.beat && !ev.walking ? ev.beat.at : '';
      R(0, 0, 320, 146, '#dfe8dc'); R(0, 100, 320, 46, '#cfd9cb'); R(0, 98, 320, 2, '#b8c4b4');
      R(90, 20, 140, 16, '#b28dff'); T('COFFEE BREAK', 160, 24, 7, '#ffffff', 'center');
      R(18, 122, 60, 4, '#f7f3ea'); R(20, 126, 56, 24, '#c8d0c4');
      R(48, 104, 12, 18, '#8a8f94'); R(50, 100, 8, 4, '#6f7a80'); for (let i = 0; i < 3; i++) R(52 + Math.round(Math.sin(t * 3 + i) * 2), 94 - i * 4 - ((t * 8) % 4), 2, 2, '#ffffff');
      for (let i = 0; i < Math.min(12, st.cups || 0); i++) R(64 + (i % 4) * 3, 118 - Math.floor(i / 4) * 4, 2, 4, '#ffffff');
      R(24, 119, 14, 3, '#d9a441');
      Q.forEach((q, i) => { const on = at === q, x = 108 + i * 30, y = on ? 152 : 146;
        person(LOOKS[i], x, y, t + i, -1, false); if (on) { g.ctx.save(); g.ctx.translate(x - 5, y - 34 + Math.round(Math.sin(t * 4) * 1)); ITEM[i](LOOKS[i].top); g.ctx.restore(); } });
      R(exit - 12, 100, 24, 54, '#f7f3ea'); R(exit - 9, 103, 18, 51, '#1b2030'); R(exit - 12, 88, 24, 9, '#2fb67c'); T('EXIT', exit, 89.5, 5, '#ffffff', 'center');
      person(look('side'), 34, 128, t, 1, false); R(18, 122, 60, 4, '#f7f3ea');
      R(0, 146, 320, 34, '#b0a48c'); for (let x = 0; x < 320; x += 16) R(x, 146, 8, 34, '#a89c84');
    },
  };
};
