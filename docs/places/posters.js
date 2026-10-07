// Poster hall: MultiQC. Placeholder art; phase 5 replaces it.
(window.KEYNOTE_PLACES = window.KEYNOTE_PLACES || {}).posters = g => {
  const { R, T, person, look, time, hash } = g;
  const exit = 384, PC = ['#e85d5d', '#6c8cff', '#3cc87a', '#b28dff', '#2ec4d6'];
  const board = (x, y, w, h, c) => { R(x - 1, y + h, 2, 146 - y - h, '#5a3a22'); R(x + w - 1, y + h, 2, 146 - y - h, '#5a3a22'); R(x, y, w, h, '#ffffff'); R(x + 2, y + 2, w - 4, 5, c); };
  const report = (x, y, w, h) => { R(x, y, w, h, '#ffffff'); R(x, y, w, 6, '#f5a623'); for (let i = 0; i < 4; i++) R(x + 3 + i * (w - 6) / 4, y + h - 4 - (i + 2) * (h - 14) / 6, (w - 12) / 4, (i + 2) * (h - 14) / 6, '#f5a623'); };
  return {
    width: 400, floor: 154, spawn: 20, exit, host: 300,
    focus: { messy: 70, bin: 160, features: 236, empty: 340 },
    props: [{ id: 'easel', x: 196, label: 'Wobble the easel' }],
    poke(id, st) { if (id === 'easel') { st.wob = time(); return; } },
    draw(st, ev) {
      const t = time(), id = ev.beat && !ev.walking ? (ev.beat.id || ev.beat.at) : '', merged = ev.beatIdx >= 1;
      R(0, 0, 400, 146, '#e8e2d8'); R(0, 0, 400, 10, '#cfc8bb'); R(0, 120, 400, 26, '#ddd5c7');
      if (merged) report(40, 50, 60, 48); else for (let i = 0; i < 5; i++) board(30 + i * 16 + (i % 2) * 4, 46 + (i % 3) * 14, 20, 26, PC[i]);
      R(150, 120, 20, 26, '#4a5563'); R(148, 118, 24, 3, '#6f7a80');
      if (id === 'inputs') { const k = (t * 1.5) % 1; R(156, 100 + k * 18, 8, 6, ['#ffffff', '#1b1b1b', '#f5a623'][Math.floor(t * 1.5) % 3]); }
      const wob = st.wob && time() - st.wob < 1 ? Math.round(Math.sin((time() - st.wob) * 30) * 2) : 0;
      board(186 + wob, 54, 22, 30, '#f5a623');
      for (let i = 0; i < 2; i++) board(216 + i * 26, 50, 22, 30, '#f5a623');
      board(320, 48, 40, 40, '#cfc8bb'); T('YOUR', 340, 60, 4, '#1b2332', 'center'); T('MODULE', 340, 67, 4, '#1b2332', 'center'); T('HERE', 340, 74, 4, '#1b2332', 'center');
      if (id === 'logs' || id === 'modules') for (let i = 0; i < 3; i++) R(326 + i * 10, 80 - ((t * 20 + i * 7) % 10), 6, 2, '#f5a623');
      for (let i = 0; i < 3; i++) person(look(['lukas', 'luca', 'greeter'][i]), 110 + i * 90 + Math.round(Math.sin(t * 0.7 + i) * 6), 146, t + i, i % 2 ? -1 : 1, false);
      R(exit - 12, 100, 24, 54, '#f7f3ea'); R(exit - 9, 103, 18, 51, '#1b2030'); R(exit - 12, 88, 24, 9, '#2fb67c'); T('EXIT', exit, 89.5, 5, '#ffffff', 'center');
      person(look('multiqc'), 300, 150, t, -1, false);
      R(0, 146, 400, 34, '#8a3a2a'); for (let i = 0; i < 40; i++) R(Math.floor(hash(i) * 400), 148 + Math.floor(hash(i + 3) * 30), 2, 1, '#a04a38');
    },
    features: {
      poster: { steps: 4, draw(step, t) {
        R(0, 0, 320, 180, '#e8e2d8'); R(60, 10, 200, 160, '#ffffff'); R(60, 10, 200, 20, '#f5a623');
        T(['CONFIG BUILDER', 'LICENCES + DOIS', 'ECHARTS', 'PARQUET'][step], 160, 16, 8, '#ffffff', 'center');
        if (step === 0) for (let i = 0; i < 5; i++) { R(76, 42 + i * 24, 60, 14, '#e8e2d8'); R(150, 42 + i * 24, 90, 14, i === Math.floor(t * 2) % 5 ? '#ffd166' : '#f2efe6'); }
        if (step === 1) for (let i = 0; i < 6; i++) { T(`tool ${i + 1}`, 80, 44 + i * 18, 6, '#1b2332'); R(170, 42 + i * 18, 60, 10, '#3cc87a'); T('MIT', 200, 44 + i * 18, 5, '#ffffff', 'center'); }
        if (step === 2) for (let i = 0; i < 8; i++) { const h = 20 + Math.abs(Math.sin(t * 2 + i)) * 80; R(78 + i * 21, 160 - h, 16, h, '#f5a623'); }
        if (step === 3) for (let r = 0; r < 6; r++) for (let c = 0; c < 5; c++) R(76 + c * 34, 40 + r * 20, 30, 16, (r + c) % 2 ? '#f2efe6' : '#fde7c0');
      } },
    },
  };
};
