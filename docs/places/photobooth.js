// Photo booth: Python tooling. A booth with a curtain and flash, a strip printer and a props stand.
(window.KEYNOTE_PLACES = window.KEYNOTE_PLACES || {}).photobooth = g => {
  const { R, T, disc, line, tri, map2d, person, look, hero, time, hash, ctx } = g;
  const EXIT = 306, BX = 44, PRX = 158, SLOT = 100, STAND = 256, SNAKE = 286, STRIP_W = 36, STRIP_H = 86;
  const clamp = (v, a, b) => Math.max(a, Math.min(b, v));
  const PY_BLUE = '#3776ab', PY_YEL = '#ffd43b';
  const VISITOR = { skin: '#a86f4c', hair: '#2b1b12', hairStyle: 'long', top: '#e8d8b0', topStyle: 'tee', pants: '#4a3b2f' };
  const PIGEON = ['..ggg.....', '.gggggg...', '.ggwggg...', 'ogggggggg.', '.pgggggggd', '..gggggdd.', '...ggdd...', '...o.o....'];
  const PIGEON_PAL = { g: '#8a93a3', w: '#ffffff', o: '#e8884a', p: '#9a5fb8', d: '#5a6270' };
  const CAT = ['.o....o...', '.oo..oo...', '.oooooo...', '.owoowo...', '.oooooo.oo', '..ooooooo.', '.ooooooo..', '.oo.oo....'];
  const CAT_PAL = { o: '#e8913a', w: '#2a2a30' };
  const HATS = ['', 'tophat', 'beret', 'party', 'shades'];
  const rcol = ['#e85d5d', '#ffd166', '#3cc87a'];
  let lastX = 14, visFace = 1;

  const hat = (k, x, y, s) => {
    if (k === 'tophat') { R(x - 4 * s, y - 7 * s, 8 * s, 7 * s, '#1b1b1b'); R(x - 6 * s, y, 12 * s, 2 * s, '#1b1b1b'); R(x - 4 * s, y - 2 * s, 8 * s, s, '#d8402a'); }
    else if (k === 'beret') { R(x - 5 * s, y - 3 * s, 10 * s, 3 * s, '#c0392b'); R(x - 3 * s, y - 4 * s, 6 * s, s, '#c0392b'); R(x - s, y - 5 * s, 2 * s, s, '#c0392b'); }
    else if (k === 'party') { for (let i = 0; i < 8; i++) R(x - 4 * s + Math.floor(i / 2) * s, y - i * s, (8 - i) * s, s, i % 2 ? '#ffd166' : '#b28dff'); disc(x, y - 8 * s, s, '#ffffff'); }
    else if (k === 'shades') { R(x - 4 * s, y, 3 * s, 2 * s, '#1b1b1b'); R(x + s, y, 3 * s, 2 * s, '#1b1b1b'); R(x - s, y, 2 * s, s, '#1b1b1b'); }
  };

  const cli = (x, feet, col, t, moving, pose) => {
    const bob = moving ? Math.round(Math.abs(Math.sin(t * 9))) : 0, y = feet - 22 - bob + (pose ? -Math.round(Math.abs(Math.sin(t * 8)) * 3) : 0), body = col ? '#1b2340' : '#6a6a6a', bar = col ? '#7c5cff' : '#9a9a9a';
    R(x - 8, y, 16, 15, col ? '#ff4fa3' : '#8a8a8a'); R(x - 7, y + 1, 14, 14, body); R(x - 7, y + 1, 14, 3, bar);
    if (col) { R(x - 6, y + 2, 1, 1, '#ff5f56'); R(x - 4, y + 2, 1, 1, '#ffbd2e'); R(x - 2, y + 2, 1, 1, '#27c93f'); }
    const ec = col ? '#2ec4d6' : '#c8c8c8'; R(x - 5, y + 6, 2, 2, ec); R(x + 3, y + 6, 2, 2, ec); R(x - 3, y + 11, 6, 1, col ? '#ffd166' : '#c8c8c8');
    if (col) R(x - 5, y + 12, 2, 1, '#3cc87a');
    const l = moving && Math.floor(t * 8) % 2; R(x - 4, y + 15, 3, 5 - (l ? 1 : 0), col ? '#7c5cff' : '#5a5a5a'); R(x + 1, y + 15, 3, 5 - (l ? 0 : 1), col ? '#7c5cff' : '#5a5a5a');
    R(x - 5, y + 20 - (l ? 1 : 0), 4, 2, '#1b1b1b'); R(x + 1, y + 20 - (l ? 0 : 1), 4, 2, '#1b1b1b');
  };

  const cliPos = a => (a < 0.5 ? { x: 232, m: false } : a < 2.3 ? { x: 232 - (a - 0.5) / 1.8 * 190, m: true } : a < 4.2 ? { x: 42, m: false } : a < 6 ? { x: 42 + (a - 4.2) * 30, m: true } : { x: 96, m: false });
  const drawCli = (a, t) => { const p = cliPos(a); cli(Math.round(p.x), 146, a > 2.8, t, p.m, a > 6.2); };

  const helpCard = (x, y, col, k) => {
    R(x - 1, y - 1, 82, 50, col ? '#ff4fa3' : '#5a5a5a'); R(x, y, 80, 48, col ? '#10162a' : '#2a2a2a');
    const c = (a, b) => col ? a : b;
    T('Usage: cli [OPTIONS]', x + 3, y + 3, 6, c('#ffd166', '#b0b0b0'));
    R(x + 3, y + 13, 74, 33, c('#10162a', '#2a2a2a')); for (let i = 0; i < 74; i += 2) { R(x + 3 + i, y + 13, 1, 1, c('#2ec4d6', '#6a6a6a')); R(x + 3 + i, y + 45, 1, 1, c('#2ec4d6', '#6a6a6a')); }
    for (let j = 13; j < 46; j += 2) { R(x + 3, y + j, 1, 1, c('#2ec4d6', '#6a6a6a')); R(x + 76, y + j, 1, 1, c('#2ec4d6', '#6a6a6a')); }
    R(x + 6, y + 11, 24, 5, c('#10162a', '#2a2a2a')); T('Options', x + 8, y + 11, 5, c('#2ec4d6', '#9a9a9a'));
    [['--name', 'TEXT'], ['--count', 'INT'], ['--help', '']].forEach((r, i) => { const yy = y + 19 + i * 9; T(r[0], x + 8, yy, 6, c('#3cc87a', '#b0b0b0')); T(r[1], x + 42, yy, 6, c('#ffd166', '#b0b0b0')); });
  };

  const frameFace = (x, y, kind, hl, t) => {
    // 32x20 photo frame; head at scale 2
    R(x, y, 32, 20, kind === 'hero' ? '#c8d8f0' : '#f7f3ea'); ctx.save(); ctx.beginPath(); ctx.rect(x, y, 32, 20); ctx.clip();
    const L = hero(), cx = x + 16, top = y + 3, x0 = cx - 12, s = 2, sk = L.skin; person(L, cx, top + 20 * s, 0, 1, false, 2);
    const ex = k => x0 + k * s;
    if (hl === 1) { R(ex(8), top + 14, 2, 4, '#e85d75'); R(ex(7), top + 12, 4, 2, '#1b1b1b'); R(ex(6), top + 8, 2, 2, sk); R(ex(8), top + 8, 2, 2, sk); R(ex(6), top + 9, 2, 1, '#1b1b1b'); R(ex(8), top + 9, 2, 1, '#1b1b1b'); }
    if (hl === 2) { R(ex(2), top + 8, 2, 6, sk); R(ex(9), top + 8, 2, 6, sk); R(ex(2), top + 9, 1, 3, '#d99a7a'); R(ex(10), top + 9, 1, 3, '#d99a7a'); }
    if (hl === 3) { R(ex(6), top + 8, 4, 2, sk); R(ex(7), top + 8, 2, 2, '#1b1b1b'); R(ex(7), top + 14, 4, 2, '#1b1b1b'); R(ex(7), top + 14, 1, 1, '#ffffff'); hat('party', x + 16, top + 3, 1); }
    ctx.restore();
  };
  const frameApi = (x, y, i) => {
    R(x, y, 32, 20, '#fffdf4'); R(x, y, 32, 4, PY_BLUE);
    if (i === 0) { T('main()', x + 2, y + 6, 5, '#10162a'); R(x + 2, y + 13, 28, 2, '#aab4c8'); R(x + 2, y + 16, 20, 2, '#aab4c8'); }
    else if (i === 1) { T('PARAMS', x + 2, y + 6, 4, PY_BLUE); for (let r = 0; r < 3; r++) { R(x + 2, y + 11 + r * 3, 9, 2, '#e85d5d'); R(x + 13, y + 11 + r * 3, 8, 2, '#3cc87a'); R(x + 23, y + 11 + r * 3, 7, 2, '#aab4c8'); } }
    else if (i === 2) { T('RETURNS', x + 2, y + 6, 4, PY_BLUE); R(x + 2, y + 12, 12, 3, '#ffd43b'); R(x + 16, y + 12, 14, 2, '#aab4c8'); R(x + 2, y + 16, 24, 2, '#aab4c8'); }
    else { R(x + 1, y + 5, 30, 14, '#10162a'); R(x + 3, y + 7, 8, 2, '#ff79c6'); R(x + 12, y + 7, 10, 2, '#8be9fd'); R(x + 5, y + 11, 14, 2, '#f1fa8c'); R(x + 5, y + 15, 9, 2, '#50fa7b'); }
  };
  const frameAnimal = (x, y, kind, i) => {
    R(x, y, 32, 20, ['#bfe0ff', '#ffe0b8', '#d6f0c8', '#f0d0e8'][i]); const m = kind === 'cat' ? CAT : PIGEON, pal = kind === 'cat' ? CAT_PAL : PIGEON_PAL;
    ctx.save(); ctx.beginPath(); ctx.rect(x, y, 32, 20); ctx.clip();
    const fx = x + 16 + (i === 1 ? 3 : i === 3 ? -3 : 0), fy = y + 3 + (i === 2 ? 2 : 0); map2d(m, fx - 10, fy, pal, 2);
    if (i === 3) R(fx + 6, fy + 4, 4, 2, '#ffffff'); ctx.restore();
  };
  const stripFrames = (st, x, y, h) => {
    const s = st.strip; R(x - 2, y, STRIP_W, h, '#f7f3ea'); ctx.save(); ctx.beginPath(); ctx.rect(x - 2, y, STRIP_W, h); ctx.clip();
    for (let i = 0; i < 4; i++) { const fy = y + 2 + i * 21, fx = x;
      if (s.kind === 'api') frameApi(fx, fy, i); else if (s.kind === 'hero') frameFace(fx, fy, 'hero', i, 0); else frameAnimal(fx, fy, s.kind, i); }
    R(x - 2, y + STRIP_H - 1, STRIP_W, 1, '#d6d0c0'); ctx.restore();
  };

  const strip = (st, ev, t) => {
    const s = st.strip; if (!s) return; const a = t - s.t0, k = clamp(a / 3, 0, 1);
    let drop = 0; if (s.kind !== 'api' && a > 9) drop = (a - 9) * 60; if (drop > 120) return;
    const h = Math.round(STRIP_H * k), y = SLOT - h + Math.round(drop);
    if (a < 3) { R(PRX - 17, SLOT - 2, 34, 3, '#1b1b1b'); }
    stripFrames(st, PRX - 16, y, h);
    if (a > 3 && s.kind !== 'api') T(s.label, PRX + 2, y - 8, 6, '#ffd166', 'center');
  };

  return {
    width: 320, floor: 154, spawn: 14, exit: EXIT, host: 122,
    focus: { booth: 100, printer: 150 },
    props: [
      { id: 'booth', x: BX + 24, label: 'Take a photo', r: 18 },
      { id: 'stand', x: STAND, label: 'Try on a hat', r: 16 },
      { id: 'snake', x: SNAKE, label: 'Squeeze the snake', r: 10 },
    ],
    enter(st) { st.photos = 0; st.worn = Math.max(0, HATS.indexOf(g.carry ? g.carry('hat') : '')); st.flash = -9; st.strip = null; st.said = 0; st.hiss = -9; lastX = 14; },
    update(dt, st, ev) { if (ev.beat && !ev.walking) lastX = this.focus[ev.beat.at] ?? lastX; },
    poke(id, st) {
      const t = time();
      if (id === 'host') { g.say(['Say cheese', 'Look at the lens', 'One more, please'][st.said++ % 3], 122, 126); return true; }
      if (id === 'booth') {
        st.photos++; st.flash = t; lastX = BX + 24;
        const five = st.photos === 5, kind = five ? ((g.visited && g.visited('nfcore')) ? 'cat' : 'pigeon') : 'hero';
        st.strip = { kind, t0: t + 0.9, label: five ? (kind === 'cat' ? 'A CAT?' : 'A PIGEON?') : `PHOTO ${st.photos}` };
        if (five) { g.say('That is not you', 100, 100, 3); g.egg('photobooth', kind === 'cat' ? 'The booth photographed a cat' : 'The booth photographed a pigeon'); }
        return true;
      }
      if (id === 'stand') { st.worn = (st.worn + 1) % HATS.length; if (g.carry) g.carry('hat', HATS[st.worn] || null); g.say(['Back on the hook', 'Very fetching', 'Très chic', 'Party time', 'Cool'][st.worn], STAND, 78); return true; }
      if (id === 'snake') { st.hiss = t; g.say('Sssss', SNAKE, 96, 1.4); return true; }
    },
    draw(st, ev) {
      const t = time(), id = ev.beat && !ev.walking ? (ev.beat.id || ev.beat.at) : '', a = ev.beat && ev.beat.id === 'richclick' ? ev.stepT : -1;
      // wall and floor
      R(0, 0, 320, 146, '#3a2a4a'); for (let x = 0; x < 320; x += 8) R(x, 0, 2, 146, '#43305a'); for (let y = 8; y < 146; y += 16) for (let x = (y / 16) % 2 * 8; x < 320; x += 16) R(x, y, 2, 2, '#52396e');
      R(0, 110, 320, 36, '#2e2040'); R(0, 108, 320, 2, '#6b4a8c');
      R(0, 146, 320, 34, '#1d1428'); for (let y = 146, r = 0; y < 180; y += 8, r++) for (let x = (r % 2) * 16; x < 320; x += 32) R(x, y, 16, 8, '#2a1d3a');
      // string lights
      for (let x = 0; x < 320; x += 20) { const y = 12 + Math.round(Math.sin(x * 0.07) * 3 + 3); R(x, y, 20, 1, '#6f7a80'); R(x + 9, y + 1, 2, 3, ['#e85d5d', '#ffd166', '#3cc87a', '#6c8cff'][(x / 20 + Math.floor(t * 1.2)) % 4]); }
      // booth
      R(10, 36, 66, 110, '#ffd43b'); R(10, 36, 66, 4, '#ffe680'); R(14, 44, 58, 14, '#8b2f8f'); T('PHOTOS', 43, 48, 8, '#ffffff', 'center');
      R(14, 62, 58, 80, '#2a1030'); const closed = clamp(a < 2.3 ? 0 : a < 2.6 ? (a - 2.3) / 0.3 : a < 4.2 ? 1 : a < 4.5 ? 1 - (a - 4.2) / 0.3 : 0, 0, 1)
      R(14, 62, 58, 80, '#3a1844'); R(34, 98, 18, 4, '#6b3f7a');
      const inside = a >= 2.3 && a < 4.5; if (inside) drawCli(a, t);
      R(14, 62, 58, 5, '#6f7a80'); for (let i = 0; i < 12; i++) R(16 + i * 5, 60, 2, 5, '#c8c8c8');
      const cw = Math.round(14 + closed * 15); R(14, 64, cw, 72, '#d8402a'); R(14 + 58 - cw, 64, cw, 72, '#d8402a');
      for (let x = 14; x < 14 + cw; x += 3) { R(x, 64, 1, 72, '#b8301e'); R(72 - (x - 14) - 1, 64, 1, 72, '#b8301e'); }
      R(14, 136, 58, 6, '#1d1428');
      // flash lamp
      const fl = Math.max(st.flash != null && t - st.flash > 0.4 && t - st.flash < 0.8 ? 1 - Math.abs((t - st.flash - 0.6) / 0.2) : 0, (a > 2.8 && a < 3.2) ? 1 - Math.abs((a - 3) / 0.2) : 0, (a > 3.6 && a < 4) ? 1 - Math.abs((a - 3.8) / 0.2) : 0);
      R(32, 26, 24, 9, '#c8d0dc'); R(34, 28, 20, 5, fl > 0 ? '#ffffff' : '#8a93a3');
      if (fl > 0) { ctx.fillStyle = `rgba(255,255,240,${0.28 * fl})`; ctx.fillRect(0, 20, 130, 126); }
      // printer
      R(PRX - 18, 102, 36, 30, '#c8d0dc'); R(PRX - 18, 102, 36, 3, '#e8edf5'); R(PRX - 14, 100, 28, 3, '#1b1b1b'); R(PRX - 16, 132, 4, 14, '#6f7a80'); R(PRX + 12, 132, 4, 14, '#6f7a80');
      const pr = st.strip && t - st.strip.t0 > 0 && t - st.strip.t0 < 3; R(PRX - 12, 108, 24, 10, '#10162a'); T(pr ? 'PRINT' : 'READY', PRX, 110, 5, pr ? '#ffd166' : '#3cc87a', 'center'); R(PRX + 8, 122, 3, 3, Math.floor(t * 3) % 2 || pr ? '#e85d5d' : '#5a2020');
      strip(st, ev, t);
      // docs strip printed in the second beat
      if (id === 'pydocs' && !st.strip) st.strip = { kind: 'api', t0: time(), label: '' };
      if (a >= 0) { const col = a > 3.4; if (a > 0.6) helpCard(146, 40, col, 0); }
      // stand
      R(244, 58, 54, 64, '#6b4a2f'); R(246, 60, 50, 60, '#8b6a4a'); for (let y = 66; y < 118; y += 8) for (let x = 250; x < 294; x += 8) R(x, y, 1, 1, '#5a3f26');
      for (const [hx, k] of [[252, 1], [264, 2], [276, 3]]) { R(hx, 64, 2, 5, '#c8c8c8'); if (st.worn !== k) hat(HATS[k], hx + 1, 78, 1); }
      R(282, 64, 2, 5, '#c8c8c8'); if (st.worn !== 4) { R(280, 72, 3, 2, '#1b1b1b'); R(285, 72, 3, 2, '#1b1b1b'); R(283, 72, 2, 1, '#1b1b1b'); }
      const mx = 270; R(mx - 1, 104, 3, 14, '#6f7a80'); disc(mx, 98, 7, '#d8b890'); hat(HATS[st.worn], mx, 93, 1); if (st.worn === 4) hat('shades', mx, 97, 1);
      R(244, 122, 54, 5, '#8b6a4a'); R(244, 127, 3, 19, '#6b4a2f'); R(295, 127, 3, 19, '#6b4a2f');
      // snake plushie
      const hiss = t - st.hiss < 1, wg = Math.round(Math.sin(t * (hiss ? 14 : 2)) * (hiss ? 2 : 1));
      for (let i = 0; i < 7; i++) { const sx = SNAKE - 12 + i * 4 + (i % 2 ? wg : -wg), sy = 118 - (i % 2) * 2; R(sx, sy, 5, 4, i % 2 ? PY_YEL : PY_BLUE); }
      R(SNAKE + 16, 112, 7, 7, PY_BLUE); R(SNAKE + 18, 114, 2, 2, '#ffffff'); R(SNAKE + 19, 114, 1, 1, '#1b1b1b'); if (hiss || Math.sin(t * 2) > 0.8) R(SNAKE + 23, 116, 4, 1, '#e85d5d');
      // visitor
      const vp = Math.sin(t * 0.3) > 0.3; person(VISITOR, 204 + (vp ? 0 : 3), 146, t, visFace, false); R(204 + (vp ? 0 : 3) + 4, 134, 3, 4, '#c8d0dc');
      // photographer with a camera
      person(look('python'), 122, 148, t, -1, false); const up = Math.sin(t * 0.8) > 0.5; R(114, up ? 126 : 134, 7, 5, '#1b1b1b'); R(116, up ? 127 : 135, 3, 3, '#6c8cff');
      if (up && Math.sin(t * 0.8) > 0.92) { ctx.fillStyle = 'rgba(255,255,240,0.18)'; ctx.fillRect(90, 100, 40, 46); }
      if (a >= 0 && !inside) drawCli(a, t);
      R(EXIT - 12, 100, 24, 54, '#f7f3ea'); R(EXIT - 9, 103, 18, 51, '#1b2030'); R(EXIT - 12, 88, 24, 9, '#2fb67c'); T('EXIT', EXIT, 89.5, 5, '#ffffff', 'center');
    },
    drawFront(st) {
      const k = HATS[st.worn]; if (g.carry || !g.heroX || !k) return;
      const x = Math.round(g.heroX()); if (k === 'shades') hat('shades', x - 1, 138, 1); else hat(k, x, 135, 1);
    },
  };
};
