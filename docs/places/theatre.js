// Main lecture theatre: the opener (why). Raked seats on the left, stage and big screen on the right.
(window.KEYNOTE_PLACES = window.KEYNOTE_PLACES || {}).theatre = g => {
  const { R, T, disc, line, map2d, mix, hash, person, look, time, ctx } = g;
  const W = 640, STAGE = 276, SX = 300, SY = 14, SW = 200, SH = 100, PODIUM = 556, HOST = 316, EXIT = 626;
  const NEXT = { skin: '#e8b894', hair: '#6b4a2f', hairStyle: 'long', top: '#3a5a8c', topStyle: 'sweat', pants: '#2b2b36' };
  const F = { podium: 532, screen: 400, edge: 330, table: 330, front: 292 };
  const ease = k => k <= 0 ? 0 : k >= 1 ? 1 : 1 - Math.pow(1 - k, 3);
  const clamp01 = k => Math.max(0, Math.min(1, k));
  const lerp = (a, b, k) => a + (b - a) * k;
  const tw = (s, size) => { ctx.font = `${size}px Silkscreen, SilkscreenLocal, "Courier New", monospace`; return ctx.measureText(s).width; };
  const shadowT = (s, x, y, size, col, align = 'center', sh = '#1b1016') => { T(s, x + 1, y + 1, size, sh, align); T(s, x, y, size, col, align); };

  /* ---------- the audience ---------- */
  const SKIN = ['#f6d3bd', '#efc6a3', '#e8b894', '#d9a27c', '#c98e62', '#a86f4c', '#8a5a3c', '#f2c9a0'];
  const HAIR = ['#2a1f18', '#3a2a1f', '#5a3d2b', '#8b5a2b', '#d9a441', '#1f1f1f', '#8b2f2f', '#b8b8b8', '#c86a3a', '#4a403a'];
  const TOPS = ['#e85d5d', '#3cc87a', '#6c8cff', '#f5a623', '#b28dff', '#2ec4b6', '#ffd166', '#ff8fa3', '#3a3550', '#20252f', '#e9e9e9', '#4a7a9a', '#76b900', '#c8322c'];
  const STYLES = ['short', 'messy', 'long', 'swept', 'short', 'bald', 'long', 'messy'];
  const ROWS = 7, rowY = r => 140 - r * 13, rowEnd = r => 270 - r * 20;
  const seats = [];
  for (let r = 0; r < ROWS; r++) for (let x = 54 + (r % 2) * 8, i = 0; x <= rowEnd(r) - 8; x += 16, i++) {
    const n = r * 31 + i * 7 + 3, h = k => hash(n * 13 + k);
    seats.push({ r, x, by: rowY(r), ph: h(1) * 6.28, empty: h(2) > 0.9 && r > 0, laptop: h(3) > 0.72,
      look: { skin: SKIN[Math.floor(h(4) * SKIN.length)], hair: HAIR[Math.floor(h(5) * HAIR.length)], hairStyle: STYLES[Math.floor(h(6) * STYLES.length)],
        beard: h(8) > 0.82, top: TOPS[Math.floor(h(9) * TOPS.length)], topStyle: ['tee', 'sweat', 'hoodie'][Math.floor(h(10) * 3)], pants: '#2b3445' } });
  }
  const seatAt = (r, x) => seats.filter(s => s.r === r).sort((a, b) => Math.abs(a.x - x) - Math.abs(b.x - x))[0];
  const SLEEPER = seatAt(0, 258), CRASH = seatAt(0, 242), YAWNER = seatAt(2, 134), LATE = seatAt(3, 118);
  [SLEEPER, CRASH, YAWNER].forEach(s => { s.empty = false; s.laptop = false; });
  LATE.empty = true; LATE.laptop = false;
  const LATE_LOOK = { skin: '#e8b894', hair: '#d9a441', hairStyle: 'long', top: '#ff8fa3', topStyle: 'hoodie', pants: '#394257' };
  const THROWERS = seats.filter(s => !s.empty && s.x >= 160 && s !== LATE).sort((a, b) => a.r - b.r || b.x - a.x).slice(0, 14);
  const TECH = { skin: '#c98e62', hair: '#1f1f1f', hairStyle: 'short', top: '#20252f', topStyle: 'hoodie', pants: '#20252f' };

  /* ---------- bricks ---------- */
  const BRICK = ['#e3342f', '#2f6fe3', '#f7c51e', '#2fb67c', '#f5a623', '#b28dff', '#ff6f91'];
  // A small brick for the room and the big screen: studs on top, light top-left and dark bottom-right edges.
  const brick = (x, y, w, h, c, studs = Math.max(1, Math.round(w / 6))) => {
    x = Math.round(x); y = Math.round(y);
    const lt = mix(c, '#ffffff', 0.35), dk = mix(c, '#000000', 0.35);
    for (let i = 0; i < studs; i++) { const sx = Math.round(x + (i + 0.5) * w / studs) - 1; R(sx, y - 1, 3, 1, c); R(sx, y - 1, 1, 1, lt); }
    R(x, y, w, h, c); R(x, y, w, 1, lt); R(x, y, 1, h, lt); R(x, y + h - 1, w, 1, dk); R(x + w - 1, y, 1, h, dk);
  };
  // The featurette's big brick, with round studs.
  const bigBrick = (x, y, w, h, c, studs) => {
    x = Math.round(x); y = Math.round(y);
    const lt = mix(c, '#ffffff', 0.4), md = mix(c, '#ffffff', 0.15), dk = mix(c, '#000000', 0.3), dd = mix(c, '#000000', 0.5);
    for (let i = 0; i < studs; i++) { const sx = Math.round(x + (i + 0.5) * w / studs) - 7;
      R(sx, y - 5, 14, 5, c); R(sx, y - 5, 2, 5, md); R(sx + 12, y - 5, 2, 5, dk); R(sx + 1, y - 6, 12, 2, lt); R(sx + 3, y - 6, 4, 1, '#ffffff'); }
    R(x, y, w, h, c); R(x, y, w, 2, lt); R(x, y, 2, h, md); R(x + w - 2, y, 2, h, dk); R(x, y + h - 2, w, 2, dd);
  };

  /* ---------- paper planes ---------- */
  const PLANE = ['ww..........', 'kwww........', '.kwwwwww....', '.aaaaaaaaaww', '..kkkkkkk...'];
  const PLANE_PAL = { w: '#ffffff', a: '#d6dce8', k: '#8f9ab0' };
  // Nearest-neighbour rotation keeps the pixels square.
  const rot = (m, pal, cx, cy, ang, s = 1) => {
    const h = m.length, w = m[0].length, c = Math.cos(ang), sn = Math.sin(ang), r = Math.ceil(Math.hypot(w, h) / 2 * s) + 1;
    cx = Math.round(cx); cy = Math.round(cy);
    for (let dy = -r; dy <= r; dy++) for (let dx = -r; dx <= r; dx++) {
      const sx = Math.floor((dx * c + dy * sn) / s + w / 2), sy = Math.floor((-dx * sn + dy * c) / s + h / 2);
      if (sy < 0 || sy >= h || sx < 0 || sx >= w) continue; const col = pal[m[sy][sx]]; if (col) R(cx + dx, cy + dy, 1, 1, col);
    }
  };
  const fly = (path, u, s) => { const [x, y] = path(u), [x2, y2] = path(u + 0.002); rot(PLANE, PLANE_PAL, x, y, Math.atan2(y2 - y, x2 - x), s); };

  /* ---------- the big screen ---------- */
  const PIPE = ['fastqc', 'trimgalore', 'star', 'salmon', 'multiqc'];
  const PIPE_C = ['#3cc87a', '#f5a623', '#6c8cff', '#ff6f91', '#ffd166'];
  const slotX = i => SX + 14 + i * 36, PIPE_Y = 66;
  const robot = (x, y, t, mood) => {
    x = Math.round(x); y = Math.round(y); const spin = Math.floor(t * 20) % 2;
    R(x - 1, y - 9, 2, 3, '#8a95a5'); R(x - (spin ? 6 : 3), y - 10, spin ? 12 : 6, 1, '#c8d0dc');
    R(x - 6, y - 6, 12, 10, '#c4ced8'); R(x - 6, y - 6, 12, 1, '#e4eaf0'); R(x + 5, y - 6, 1, 10, '#8a95a5');
    R(x - 4, y - 4, 8, 4, '#1b2332'); const blink = Math.sin(t * 2.3) > 0.96;
    if (!blink) { R(x - 3, y - 3, 2, 2, mood === 'oh' ? '#ffd166' : '#6cf0ff'); R(x + 1, y - 3, 2, 2, mood === 'oh' ? '#ffd166' : '#6cf0ff'); }
    R(x - 3, y + 1, 6, 1, '#6c8cff'); R(x - 7, y - 2, 1, 4, '#8a95a5'); R(x + 6, y - 2, 1, 4, '#8a95a5');
    R(x - 3, y + 4, 2, 2, '#8a95a5'); R(x + 1, y + 4, 2, 2, '#8a95a5');
  };
  const modBrick = (i, x, y, hot) => { brick(x, y, 30, 12, hot ? mix(PIPE_C[i], '#ffffff', 0.45) : PIPE_C[i], 4); T(PIPE[i], x + 15, y + 3.5, 4, '#1b2332', 'center'); };
  const pipeline = (n, cracks, t, lit) => {
    for (let i = 0; i < 4; i++) if (i < n - 1) { const x0 = slotX(i) + 30, x1 = slotX(i + 1); R(x0, PIPE_Y + 5, x1 - x0, 2, '#4a6a9a'); }
    for (let i = 0; i < n; i++) modBrick(i, slotX(i), PIPE_Y, lit && lit(i));
    (cracks || []).forEach(([i, found]) => { if (!found) return; const x = slotX(i) + 9 + (i * 7) % 12, glow = 0.6 + 0.4 * Math.sin(t * 4);
      const c = mix('#7a0f0f', '#ff3030', glow), bx = slotX(i);
      for (const d of [0, 1]) { line(x + d, PIPE_Y + 12, x + 2 + d, PIPE_Y + 15, c); line(x + 2 + d, PIPE_Y + 15, x + d, PIPE_Y + 18, c); line(x + d, PIPE_Y + 18, x + 3 + d, PIPE_Y + 21, c); }
      R(bx - 2, PIPE_Y - 3, 34, 2, c); R(bx - 2, PIPE_Y + 13, 34, 2, c); R(bx - 2, PIPE_Y - 3, 2, 18, c); R(bx + 30, PIPE_Y - 3, 2, 18, c); });
  };
  const SCREENS = {
    idle(t) { R(SX, SY, SW, SH, '#1d1530'); for (let y = 0; y < SH; y += 2) R(SX, SY + y, SW, 1, mix('#2a1d45', '#151025', y / SH));
      for (let i = 0; i < 18; i++) if (Math.sin(t + i * 2.1) > -0.3) R(SX + Math.floor(hash(i * 5) * SW), SY + Math.floor(hash(i * 9) * 40), 1, 1, '#c9d6f2');
      shadowT('scverse', SX + SW / 2, SY + 26, 14, '#ffffff'); shadowT('2026 · DTU LYNGBY', SX + SW / 2, SY + 46, 6, '#ffd166');
      T('The keynote will begin shortly', SX + SW / 2, SY + 74, 5, '#b8b0d8', 'center');
      for (let i = 0; i < 3; i++) R(SX + SW / 2 - 6 + i * 5, SY + 86, 2, 2, Math.floor(t * 2) % 3 === i ? '#ffd166' : '#5a4a7a'); },
    podium(t) { R(SX, SY, SW, SH, '#141018'); const k = 0.5 + 0.5 * Math.sin(t * 1.5);
      for (let i = 0; i < 4; i++) brick(SX + 52 + i * 24, SY + 74, 22, 9, BRICK[i], 3);
      shadowT('WHY?', SX + SW / 2, SY + 18, 30, mix('#ff6f91', '#ffd166', k)); },
    vibes(t, s) { for (let y = 0; y < SH; y++) R(SX, SY + y, SW, 1, mix('#4f9be0', '#bfe0f7', y / SH));
      for (let i = 0; i < 3; i++) { const x = SX + ((i * 77 + t * 6) % (SW + 60)) - 30; R(x, SY + 70 + i * 9, 26, 4, 'rgba(255,255,255,.5)'); R(x + 5, SY + 67 + i * 9, 14, 3, 'rgba(255,255,255,.5)'); }
      shadowT('VIBE-CODED TOOLS', SX + SW / 2, SY + 6, 8, '#ffffff', 'center', '#2a5f9a');
      for (let i = 0; i < 5; i++) {
        const per = 7 + i * 0.9, u = ((t + i * 2.9) / per) % 1, base = SY + 36 + i * 13, loops = i % 2 === 0, dive = i === 3;
        const A = SX - 26, k = 60, L0 = 0.3 + i * 0.04, S = (SW + 52 - 0.25 * k) / 0.75, R0 = 13;
        const path = v => { let x, y = base + (loops ? 0 : Math.sin(v * 7 + i) * 3);
          if (!loops || v < L0) x = A + v * S;
          else if (v < L0 + 0.25) { const a = (v - L0) / 0.25 * 6.283; x = A + L0 * S + (v - L0) * k + Math.sin(a) * R0; y = base - (1 - Math.cos(a)) * R0; }
          else x = A + L0 * S + 0.25 * k + (v - L0 - 0.25) * S;
          if (dive && v > 0.42) { const d = v - 0.42; y += d * d * 1400; }
          return [x, y]; };
        fly(path, u, 2);
      } },
    ran(t, s) { R(SX, SY, SW, SH, '#10141c'); R(SX, SY, SW, 7, '#2a3142'); [0, 1, 2].forEach(i => disc(SX + 5 + i * 6, SY + 3, 1, ['#ff5f56', '#ffbd2e', '#27c93f'][i]));
      const cmd = '$ python vibe_analysis.py', n = Math.floor(clamp01(s / 0.7) * cmd.length);
      T(cmd.slice(0, n) + (Math.sin(t * 6) > 0 && n < cmd.length ? '_' : ''), SX + 6, SY + 11, 5, '#9fe0b8');
      if (s > 0.8) T('Done.  0 errors.', SX + 6, SY + 20, 5, '#c8d0e6');
      if (s > 1.0) { const k = ease((s - 1.0) / 0.3), y = SY + 34;
        ctx.globalAlpha = k; map2d(['.........gg', '........ggg', '.......ggg.', 'gg....ggg..', 'ggg..ggg...', '.ggggggg...', '..ggggg....', '...ggg.....'], SX + 34, y + 2, { g: '#3cc87a' }, 2);
        shadowT('IT RAN!', SX + 112, y, 18, '#3cc87a'); ctx.globalAlpha = 1; }
      if (s > 2.8) { const k = ease((s - 2.8) / 0.4); ctx.globalAlpha = k; shadowT('...but is it right?', SX + 100, SY + 72 + Math.round((1 - k) * 6), 8, '#ffd166'); ctx.globalAlpha = 1; }
      if (s < 1.2) fly(v => [SX + 170 - v * 120, SY + 60 + Math.sin(v * 8) * 5], clamp01(s / 1.2), 2); },
    table(t) { R(SX, SY, SW, SH, '#141018'); shadowT('BUILDING', SX + SW / 2, SY + 14, 12, '#ffffff'); shadowT('BLOCKS', SX + SW / 2, SY + 30, 12, '#ffffff');
      for (let i = 0; i < 5; i++) brick(SX + 44 + i * 22, SY + 72 - (i % 2) * 10 - Math.round(Math.max(0, Math.sin(t * 3 + i)) * 2), 20, 9, BRICK[i], 3); },
    assemble(t, s) { R(SX, SY, SW, SH, '#132544'); for (let x = 0; x < SW; x += 10) R(SX + x, SY, 1, SH, '#1a3058'); for (let y = 0; y < SH; y += 10) R(SX, SY + y, SW, 1, '#1a3058');
      shadowT('AGENT, MEET MODULES', SX + SW / 2, SY + 6, 7, '#ffffff', 'center', '#0a1428');
      R(SX + 8, SY + 84, 38, 14, '#5a3a22'); R(SX + 8, SY + 84, 38, 2, '#7d5230'); T('nf-core', SX + 27, SY + 90, 4, '#ffd166', 'center');
      const per = 1.1, done = Math.min(5, Math.floor(s / per)), k = (s % per) / per;
      for (let i = done; i < 5; i++) brick(SX + 12 + (i % 3) * 10, SY + 78 - Math.floor(i / 3) * 4, 9, 5, PIPE_C[i], 2);
      const flow = (s - 5 * per) * 40, dots = [0, 1, 2, 3].map(j => flow - j * 46).filter(d => d >= 0).map(d => slotX(0) + (d % 190));
      pipeline(done, null, t, i => done === 5 && dots.some(x => x >= slotX(i) && x < slotX(i) + 30));
      if (done < 5) { const ax = SX + 27, ay = SY + 70, bx = slotX(done) + 15, by = PIPE_Y - 14;
        const x = k < 0.2 ? ax : k < 0.7 ? lerp(ax, bx, ease((k - 0.2) / 0.5)) : k < 0.85 ? bx : lerp(bx, ax, (k - 0.85) / 0.15);
        const y = k < 0.2 ? ay : k < 0.7 ? lerp(ay, by, ease((k - 0.2) / 0.5)) - Math.sin((k - 0.2) / 0.5 * 3.14) * 14 : k < 0.85 ? by : lerp(by, ay, (k - 0.85) / 0.15);
        if (k > 0.1 && k < 0.8) modBrick(done, Math.round(x - 15), Math.round(y + 7 + (k > 0.7 ? (k - 0.7) * 40 : 0)));
        robot(x, y, t);
      } else {
        robot(SX + SW - 16, SY + 30 + Math.sin(t * 2) * 2, t);
        for (const x of dots) { if ([0, 1, 2, 3, 4].some(i => x >= slotX(i) && x < slotX(i) + 30)) continue; disc(x, PIPE_Y + 6, 2, '#ffffff'); disc(x, PIPE_Y + 6, 1, '#6cf0ff'); }
        if (s > 5 * per + 4.5) { const x = slotX(4) + 34; R(x, PIPE_Y - 4, 12, 16, '#ffffff'); R(x + 2, PIPE_Y + 6, 2, 4, '#3cc87a'); R(x + 5, PIPE_Y + 3, 2, 7, '#f5a623'); R(x + 8, PIPE_Y, 2, 10, '#6c8cff'); }
      } },
    pool(t, s, st) { R(SX, SY, SW, SH, '#1d2a1d'); for (let y = 0; y < SH; y += 2) R(SX, SY + y, SW, 1, mix('#2d4a2a', '#18241a', y / SH));
      shadowT('BUILD IT TOGETHER', SX + 8, SY + 8, 9, '#ffffff', 'left', '#0d1a0d'); T('built by many, used by everyone', SX + 8, SY + 22, 4, '#bfe8b0');
      R(SX + 6, SY + 96, 112, 2, '#4a6a3a');
      for (let i = 0; i < WALL.length; i++) { const w = WALL[i], c = i < 3 ? '#8a8f94' : BRICK[i % BRICK.length];
        if (i < 3 || s >= THROW_T(i - 3) + 1.2) brick(w.x, w.y, 17, 9, c, 3); }
      if (s > THROW_T(THROWERS.length) + 1.2) { const k = 0.5 + 0.5 * Math.sin(t * 3); for (let i = 0; i < 6; i++) { const a = i + t * 0.5; R(Math.round(SX + 62 + Math.cos(a) * 64), Math.round(SY + 70 + Math.sin(a) * 26), 2, 2, mix('#ffd166', '#ffffff', k)); } } },
    review(t, s) { R(SX, SY, SW, SH, '#132544'); for (let x = 0; x < SW; x += 10) R(SX + x, SY, 1, SH, '#1a3058'); for (let y = 0; y < SH; y += 10) R(SX, SY + y, SW, 1, '#1a3058');
      R(SX, SY + 92, SW, 8, '#0d1b33');
      const rx = SX - 10 + s * 60, cracks = [[0, rx > slotX(0) + 10], [2, rx > slotX(2) + 14], [3, rx > slotX(3) + 14]], found = cracks.filter(c => c[1]).length;
      const fixed = s > 4.2; pipeline(5, fixed ? null : cracks, t);
      if (fixed) for (const [i] of cracks) { const x = slotX(i) + 12, y = PIPE_Y + 18; for (const d of [0, 1]) { line(x, y + d, x + 2, y + 2 + d, '#3cc87a'); line(x + 2, y + 2 + d, x + 6, y - 2 + d, '#3cc87a'); } }
      const happy = found < 3 || fixed; robot(SX + SW - 18, SY + 28 + Math.sin(t * 2) * 2, t, happy ? '' : 'oh');
      const bub = fixed ? 'thanks!' : happy ? 'LGTM!' : 'oh.'; const bw = tw(bub, 5) + 6; R(SX + SW - 26 - bw, SY + 16, bw, 9, '#ffffff'); T(bub, SX + SW - 23 - bw, SY + 18, 5, happy ? '#2fb67c' : '#e85d5d');
      shadowT(fixed ? 'FIXED FOR EVERYONE' : `ISSUES FOUND: ${found}`, SX + 8, SY + 6, 7, fixed ? '#3cc87a' : found ? '#ff8a8a' : '#ffffff', 'left', '#0a1428');
      const walking = rx < SX + SW + 20, px = Math.min(rx, SX + SW - 40);
      person(REVIEWER, px, SY + 98, t, 1, walking && rx < SX + SW - 40);
      const gx = px + 9, gy = PIPE_Y + 18; line(px + 4, SY + 86, gx - 2, gy + 3, '#5a3a22'); line(px + 5, SY + 86, gx - 1, gy + 3, '#5a3a22');
      for (let a = 0; a < 20; a++) { const ang = a / 20 * 6.283; R(Math.round(gx + Math.cos(ang) * 5), Math.round(gy + Math.sin(ang) * 5), 1, 1, '#d4a017'); }
      R(gx - 3, gy - 3, 6, 6, 'rgba(200,230,255,.35)'); R(gx - 2, gy - 3, 2, 1, '#ffffff'); },
    nosig(t) { R(SX, SY, SW, SH, '#1f3fbf'); T('HDMI 1', SX + 6, SY + 5, 5, '#c8d4ff');
      const x = SX + 50 + Math.round(Math.sin(t * 0.9) * 40), y = SY + 40 + Math.round(Math.sin(t * 1.3) * 22); shadowT('NO SIGNAL', x + 50, y, 10, '#ffffff', 'center', '#10208a'); },
    title(t) { const sk = ['#121a33', '#172240', '#1e2c50', '#273a62', '#344b74', '#476186', '#627d9d'];
      sk.forEach((c, i) => R(SX, SY + i * 10, SW, 10, c)); R(SX, SY + 70, SW, 30, '#2c5829'); R(SX, SY + 68, SW, 4, '#e3a24a');
      for (let x = SX; x < SX + SW; x += 6) if (hash(x) > 0.5) R(x + 1, SY + 69, 4, 2, '#ffd27e');
      for (let i = 0; i < 24; i++) if (Math.sin(t * 1.6 + i * 1.7) > -0.2) R(SX + Math.floor(hash(i * 3 + 1) * SW), SY + Math.floor(hash(i * 7 + 2) * 50), 1, 1, '#ffffff');
      shadowT('CHOOSE YOUR', SX + SW / 2, SY + 24, 12, '#ffffff', 'center', '#0b0f1c'); shadowT('OWN KEYNOTE', SX + SW / 2, SY + 38, 12, '#ffffff', 'center', '#0b0f1c');
      T('scverse 2026 at DTU Lyngby', SX + SW / 2, SY + 56, 5, '#ffd166', 'center');
      if (Math.sin(t * 4) > 0) g.tri(SX + 72, SY + 85, 1, '#ffd166'); T('NEW GAME', SX + 80, SY + 82, 6, '#ffffff'); },
  };
  const REVIEWER = { skin: '#a86f4c', hair: '#1f1f1f', hairStyle: 'long', top: '#f5a623', topStyle: 'sweat', pants: '#2b3445' };
  const WALL = []; for (let r = 0; r < 4; r++) for (let i = 0; i < 6 - (r % 2); i++) if (WALL.length < 17) WALL.push({ x: SX + 8 + i * 18 + (r % 2) * 9, y: SY + 86 - r * 10 });
  const THROW_T = i => i < 5 ? 0.3 + i * 0.6 : 3.3 + (i - 5) * 0.3;

  /* ---------- room pieces ---------- */
  const seated = (st, t, s, scr, sT) => {
    for (let r = ROWS - 1; r >= 0; r--) {
      const by = rowY(r), xr = rowEnd(r);
      R(44, by, xr - 44, 146 - by, r % 2 ? '#3a221a' : '#3f251c'); R(44, by, xr - 44, 1, '#6a4030'); R(xr - 2, by, 2, 146 - by, '#24140f');
      R(22, by, 22, 13, mix('#4a2c20', '#2a1810', r / ROWS)); R(22, by, 22, 1, '#8a6a4a');
      for (const p of seats) { if (p.r !== r) continue; drawSeat(p, st, t, scr, sT); }
      if (r === 3) latecomer(st, t);
      if (r === ROWS - 1) avTech(t);
    }
  };
  const standOf = (p, scr, sT) => { if (scr !== 'pool') return 0; const i = THROWERS.indexOf(p); if (i < 0) return 0; const t0 = THROW_T(i); return sT >= t0 && sT < t0 + 0.9 ? 1 : 0; };
  const drawSeat = (p, st, t, scr, sT) => {
    const { x, by } = p;
    R(x - 6, by - 14, 12, 11, '#7a1f2a'); R(x - 5, by - 15, 10, 1, '#8a2430'); R(x - 6, by - 14, 1, 11, '#94303c');
    const late = p === LATE && st.late === 'sat';
    if (!p.empty || late) {
      const L = late ? LATE_LOOK : p.look, clap = st.title > 0 && st.title < 5.5;
      const up = standOf(p, scr, sT), asleep = p === SLEEPER && !(st.wake > 0) && !up && !clap;
      let bob = Math.sin(t * 1.3 + p.ph * 6) > 0.9 ? -1 : 0, face = Math.sin(t * 0.4 + p.ph * 9) > 0.93 ? -1 : 1;
      if (asleep) bob = 1 + (Math.sin(t * 1.5) > 0 ? 1 : 0);
      if (p === SLEEPER && st.wake > 3.4) bob = -3;
      if (p === CRASH && scr === 'ran' && sT > 2.4 && sT < 3.6) bob = -2;
      if (late && st.lateT < 1) bob = -2;
      const feet = by + 3 + bob - up * 8, top = feet - 20;
      person(L, x, feet, t, face, false);
      if (p === YAWNER && (t % 11) > 9 && !clap) { R(x - 7, top + 1, 2, 7, L.skin); R(x + 6, top + 1, 2, 7, L.skin); R(x + 1, top + 6, 2, 2, '#3a1010'); }
      if (clap) { const k = Math.sin(t * 14 + p.ph) > 0 ? 1 : 2; R(x - 1 - k, top - 2, 2, 2, L.skin); R(x + 1 + k, top - 2, 2, 2, L.skin); }
      if (up && sT < THROW_T(THROWERS.indexOf(p)) + 0.3) { R(x + 4, top - 2, 2, 6, L.skin); brick(x + 2, top - 6, 7, 4, BRICK[(THROWERS.indexOf(p) + 3) % BRICK.length], 2); }
      if (asleep) { const z = (t * 0.6) % 1; ctx.globalAlpha = 1 - z; T('z', x + 4 + z * 4, top - 3 - z * 8, 5, '#bfe8ff'); T('z', x + 7 + z * 3, top - 9 - z * 6, 4, '#bfe8ff'); ctx.globalAlpha = 1; }
      if (p === SLEEPER && st.wake > 2.6) { R(x - 1, top - 9, 2, 5, '#ffd166'); R(x - 1, top - 3, 2, 2, '#ffd166'); }
      if (p === CRASH && scr === 'ran' && sT > 2.4 && sT < 3.6) { R(x - 1, top - 9, 2, 5, '#ffd166'); R(x - 1, top - 3, 2, 2, '#ffd166'); }
    }
    R(x - 7, by - 6, 14, 7, '#6e1c26'); R(x - 7, by - 6, 14, 1, '#a8323e'); R(x - 7, by + 1, 14, 1, '#3a0e14');
    if (p.laptop && !p.empty) { const fl = hash(Math.floor(t * 2 + p.ph * 10)) > 0.9;
      R(x - 2, by - 12, 9, 6, '#b8bec8'); R(x - 2, by - 12, 9, 1, '#dfe4ea'); R(x + 1, by - 10, 2, 2, ['#ffd166', '#ff6f91', '#3cc87a', '#6c8cff'][Math.floor(p.ph) % 4]);
      p.glow = !fl; } else p.glow = false;
  };
  // Laptops stay lit when the house lights go down.
  const glows = dim => { if (dim < 0.05) return; for (const p of seats) if (p.glow) { const { x, by } = p;
    R(x - 2, by - 12, 9, 6, '#b8bec8'); R(x - 2, by - 12, 9, 1, '#dfe4ea'); R(x + 1, by - 10, 2, 2, ['#ffd166', '#ff6f91', '#3cc87a', '#6c8cff'][Math.floor(p.ph) % 4]);
    ctx.fillStyle = `rgba(150,200,255,${0.16 * dim})`; ctx.fillRect(x - 1, by - 19, 7, 7); } };
  // Late arrival: in at the top door, down the steps, along row 3, then sits.
  const LATE_PATH = [[0, 30, rowY(6)], [1.2, 33, rowY(6)], [3.6, 33, rowY(3)], [3.9, 46, rowY(3)], [7.2, 118, rowY(3)]];
  const latecomer = (st, t) => {
    if (st.late === 'sat' || st.lateT == null || st.lateT < 0) return;
    const lt = st.lateT; let i = 0; while (i < LATE_PATH.length - 2 && lt > LATE_PATH[i + 1][0]) i++;
    const [t0, x0, y0] = LATE_PATH[i], [t1, x1, y1] = LATE_PATH[i + 1], k = clamp01((lt - t0) / (t1 - t0));
    const x = lerp(x0, x1, k), y = i === 1 ? rowY(6) + Math.floor(k * 3) * 13 : lerp(y0, y1, k);
    person(LATE_LOOK, x, y + 2, lt, 1, k < 1);
  };
  const avTech = t => {
    const x = 166, by = rowY(6);
    R(150, by, 30, 146 - by, '#2e1b15'); R(150, by, 30, 1, '#6a4030');
    person(TECH, x - 4, by + 2, t, 1, false);
    R(x - 12, by - 8, 22, 3, '#3b3f47'); R(x - 12, by - 5, 22, 5, '#2a2e36');
    for (let i = 0; i < 6; i++) R(x - 10 + i * 3, by - 7, 1, 1, ['#3cc87a', '#ffd166', '#e85d5d'][(i + Math.floor(t * 2)) % 3]);
    R(x + 8, by - 22, 9, 7, '#1b1f2a'); R(x + 17, by - 20, 3, 3, '#3b3f47'); R(x + 11, by - 15, 1, 15, '#5a5f68'); line(x + 11, by - 8, x + 7, by, '#5a5f68'); line(x + 11, by - 8, x + 15, by, '#5a5f68');
    if (Math.sin(t * 3) > 0) R(x + 9, by - 21, 2, 2, '#ff3030');
  };

  // after the opener: the next speaker's slide on the screen and them at the podium
  const nextTalk = t => {
    R(SX, SY, SW, SH, '#f7f3ea'); R(SX, SY, SW, 14, '#3a5a8c'); T('SESSION 2', SX + SW / 2, SY + 4, 6, '#ffffff', 'center');
    T('SPATIAL DATA,', SX + SW / 2, SY + 32, 8, '#1b2332', 'center'); T('AT SCALE', SX + SW / 2, SY + 46, 8, '#1b2332', 'center');
    for (let i = 0; i < 3; i++) R(SX + 50, SY + 66 + i * 9, 100 - i * 24, 3, '#c8c0b0');
    const b = Math.floor(t * 3) % 4 === 0 ? -1 : 0; person(NEXT, F.podium, 151 + b, t, -1, false);
  };
  const stageBack = (st, t, ev) => {
    R(STAGE, 0, W - STAGE, 146, '#2b1a14'); for (let x = STAGE; x < W; x += 16) { R(x, 8, 1, 138, '#22140f'); R(x + 1, 8, 7, 138, '#2f1d16'); }
    R(STAGE, 118, W - STAGE, 2, '#3a241b'); R(STAGE, 120, W - STAGE, 26, '#24150f');
    // coloured washes on the back wall
    [[290, '255,111,145'], [530, '108,140,255'], [618, '255,209,102']].forEach(([cx, c]) => { for (let y = 8; y < 146; y += 2) { const w = 4 + (y - 8) * 0.12; ctx.fillStyle = `rgba(${c},.05)`; ctx.fillRect(cx - w, y, w * 2, 2); } });
    // curtains either side of the screen
    for (const cx of [287, 513]) for (let i = 0; i < 18; i++) { const x = cx - 9 + i, sh = (i + Math.round(Math.sin(t * 0.7 + cx) * 0.6)) % 4;
      R(x, 6, 1, 140, ['#7a1420', '#94202c', '#a82a36', '#86182a'][sh]); }
    R(277, 6, 20, 3, '#5a0e18'); R(503, 6, 20, 3, '#5a0e18');
    // screen
    R(SX - 4, SY - 4, SW + 8, SH + 8, '#0d0a0b'); R(SX - 4, SY + SH + 3, SW + 8, 1, '#3a2a22');
    ctx.save(); ctx.beginPath(); ctx.rect(SX, SY, SW, SH); ctx.clip();
    const scr = st.title > 0 ? 'title' : st.nosig > 0 ? 'nosig' : st.scr;
    (SCREENS[scr] || SCREENS.idle)(t, st.scrT, st);
    ctx.restore();
    R(SX, SY, SW, 1, 'rgba(255,255,255,.08)');
  };
  const truss = (t, st) => {
    R(0, 0, W, 8, '#1a100c'); for (let x = 0; x < W; x += 40) R(x, 0, 20, 8, '#1e130e');
    R(STAGE, 2, W - STAGE, 2, '#4a4f58'); R(STAGE, 6, W - STAGE, 1, '#3a3f48'); for (let x = STAGE; x < W; x += 6) line(x, 3, x + 3, 6, '#3a3f48');
    for (const [x, c] of [[296, '#ff6f91'], [356, '#ffe6a8'], [470, '#ffe6a8'], [540, '#ffe6a8'], [600, '#6c8cff']]) { R(x - 3, 7, 6, 5, '#22252c'); R(x - 2, 12, 4, 1, c); }
    // projector, hanging over the audience
    R(185, 0, 2, 6, '#3a3f48'); R(176, 6, 22, 9, '#c8ccd2'); R(176, 6, 22, 1, '#e4e8ec'); R(176, 14, 22, 1, '#8a8f94'); disc(198, 10, 3, '#3b3f47'); R(198, 9, 2, 2, '#fff6d8');
    R(179, 9, 6, 1, '#8a8f94'); R(179, 11, 6, 1, '#8a8f94'); R(188, 8, 2, 2, st.nosig > 0 ? '#ffd166' : '#3cc87a');
    const blue = st.nosig > 0, col = blue ? '120,150,255' : '255,245,220';
    for (let x = 200; x < SX; x++) { const k = (x - 200) / (SX - 200), y0 = Math.round(lerp(9, SY, k)), y1 = Math.round(lerp(11, SY + SH, k));
      ctx.fillStyle = `rgba(${col},${0.035 + 0.02 * k})`; ctx.fillRect(x, y0, 1, y1 - y0); }
    for (let i = 0; i < 16; i++) { const k = (hash(i * 3) + t * 0.02 * (0.5 + hash(i))) % 1, x = 200 + k * 100, y0 = lerp(9, SY, k), y1 = lerp(11, SY + SH, k);
      const y = y0 + ((hash(i * 7) + Math.sin(t * 0.3 + i) * 0.1 + 1) % 1) * (y1 - y0); R(Math.round(x), Math.round(y), 1, 1, 'rgba(255,240,200,.5)'); }
  };
  const podium = (st, t, ev) => {
    const x = PODIUM;
    R(x - 13, 112, 26, 42, '#4a2c1a'); R(x - 13, 112, 2, 42, '#6a4026'); R(x + 11, 112, 2, 42, '#2e1a10');
    R(x - 16, 108, 32, 5, '#7d5230'); R(x - 16, 108, 32, 1, '#a87a4a'); R(x - 12, 150, 24, 4, '#2e1a10');
    R(x - 9, 120, 18, 14, '#1f2a44'); T('sc', x, 122, 5, '#ffffff', 'center'); T('2026', x, 129, 3, '#ffd166', 'center');
    line(x - 8, 108, x - 10, 98, '#2a2e36'); R(x - 12, 96, 4, 3, '#1b1f2a');
    line(x + 6, 108, x + 9, 96, '#8a8f94'); line(x + 9, 96, x + 4, 92, '#8a8f94'); R(x + 1, 91, 6, 3, '#d4a017');
    ctx.fillStyle = 'rgba(255,214,120,.18)'; for (let i = 0; i < 6; i++) ctx.fillRect(x + 1 - i, 94 + i * 2, 6 + i * 2, 2);
    // the glass of water
    const gx = x + 9, sp = st.spilt;
    if (!sp) { R(gx, 101, 5, 7, 'rgba(220,240,255,.55)'); R(gx, 101, 1, 7, 'rgba(255,255,255,.8)'); const lvl = [5, 3, 1][Math.min(2, st.sips)]; R(gx + 1, 107 - lvl, 3, lvl, '#7fc4ec'); }
    else { const k = clamp01(st.spillT / 0.4); R(gx - 2, 105, 7, 3, 'rgba(220,240,255,.7)'); R(gx + 5, 107, 2, 2, 'rgba(255,255,255,.8)');
      R(gx - 6, 107, Math.round(14 * k), 1, '#7fc4ec'); const d = (st.spillT * 1.6) % 1; R(x + 15, 109 + Math.round(d * 40), 1, 2, '#7fc4ec');
      R(x + 10, 153, 10, 1, '#7fc4ec'); }
  };
  const lecternClock = (st, t) => {
    const x = 470, y = 140, left = Math.max(0, 600 - (st.talkT || 0)), m = Math.floor(left / 60), s = Math.floor(left % 60);
    R(x - 14, y, 28, 12, '#1b1f2a'); R(x - 14, y, 28, 1, '#3b3f47'); R(x - 12, y + 2, 24, 8, '#0b0d12');
    T(`${String(m).padStart(2, '0')}:${String(s).padStart(2, '0')}`, x, y + 3, 5, left < 60 ? '#ff5050' : '#ff8a3a', 'center'); R(x - 10, y + 12, 20, 2, '#2a2e36');
  };
  const cableBox = (st, t) => {
    const x = F.screen + 6; R(x - 5, 146, 12, 6, '#2a2e36'); R(x - 5, 146, 12, 1, '#4a4f58'); R(x - 3, 148, 3, 2, '#111');
    const wig = st.wiggle > 0 ? Math.round(Math.sin(st.wiggle * 40)) : 0;
    line(x - 2, 149, x - 12 + wig, 150, '#111'); line(x - 12 + wig, 150, x - 40, 151, '#111');
    R(x + 3, 147, 2, 2, st.nosig > 0 ? '#ff3030' : '#3cc87a');
  };
  // Sam the session chair keeps time from stage left, by a chair with a stack of time cards
  const hostAt = (st, t) => {
    R(HOST - 14, 134, 9, 2, '#3a3550'); R(HOST - 14, 126, 2, 8, '#3a3550'); R(HOST - 14, 136, 1, 15, '#22252c'); R(HOST - 6, 136, 1, 15, '#22252c');
    R(HOST - 12, 131, 6, 3, '#ffd166'); R(HOST - 12, 131, 6, 1, '#fff0b0');
    person(look('why'), HOST, 151, t, 1, false);
    if (st.cardT > 0) { R(HOST + 3, 117, 14, 10, '#1b2332'); R(HOST + 4, 118, 12, 8, '#ffd166'); T('5', HOST + 10, 119.5, 5, '#1b2332', 'center'); R(HOST + 4, 126, 2, 4, look('why').skin); }
  };
  const exitDoor = t => { R(EXIT - 10, 100, 22, 54, '#3a241b'); R(EXIT - 8, 102, 18, 52, '#1b1210'); R(EXIT - 7, 124, 16, 2, '#8a8f94');
    R(EXIT - 10, 90, 22, 8, '#16a35a'); T('EXIT', EXIT + 1, 91.5, 5, '#ffffff', 'center'); ctx.fillStyle = 'rgba(60,220,120,.12)'; ctx.fillRect(EXIT - 14, 86, 30, 16); };
  const leftDoors = t => {
    R(2, 104, 18, 42, '#3a241b'); R(4, 106, 14, 40, '#1b1210'); R(14, 124, 3, 2, '#8a8f94');
    R(2, 96, 18, 7, '#16a35a'); T('EXIT', 11, 97, 4, '#ffffff', 'center');
    const y = rowY(6); R(24, y - 26, 18, 26, '#3a241b'); R(26, y - 24, 14, 24, '#1b1210'); R(24, y - 33, 18, 6, '#16a35a'); T('EXIT', 33, y - 32, 4, '#ffffff', 'center');
    for (const sx of [70, 130, 228]) { R(sx - 2, 20, 4, 6, '#8a6a4a'); disc(sx, 19, 3, '#ffe6a8'); ctx.fillStyle = 'rgba(255,220,150,.08)'; for (let r = 4; r < 22; r += 3) { ctx.beginPath(); ctx.arc(sx, 22, r, 0, 6.283); ctx.fill(); } }
  };
  const demoTable = (st, t) => {
    const x = F.table + 24, y = 136; R(x - 15, y, 30, 3, '#7d5230'); R(x - 15, y, 30, 1, '#a87a4a'); R(x - 13, y + 3, 2, 151 - y, '#5a3a22'); R(x + 11, y + 3, 2, 151 - y, '#5a3a22');
    R(x - 13, y + 3, 26, 1, 'rgba(0,0,0,.35)');
    brick(x - 11, y - 4, 8, 4, BRICK[0], 2); brick(x - 2, y - 4, 8, 4, BRICK[1], 2); brick(x - 7, y - 8, 8, 4, BRICK[2], 2);
    R(x + 6, y - 7, 8, 7, '#ffd166'); R(x + 6, y - 7, 8, 1, '#fff0b0'); R(x + 8, y - 5, 4, 3, '#e3342f');
  };
  const floor = t => {
    R(0, 146, STAGE, 34, '#3d1a1e'); for (let y = 148; y < 180; y += 6) for (let x = (y / 6 % 2) * 6; x < STAGE; x += 12) R(x, y, 2, 2, '#4a2228');
    R(0, 146, STAGE, 1, '#24100f');
    R(STAGE, 146, W - STAGE, 11, '#8a5a34'); for (let x = STAGE; x < W; x += 22) R(x, 146, 1, 11, '#6a4226'); R(STAGE, 151, W - STAGE, 1, '#7a4e2c');
    R(STAGE, 146, W - STAGE, 1, '#a87a4a'); R(STAGE, 157, W - STAGE, 2, '#3a241b'); R(STAGE, 159, W - STAGE, 21, '#1e120d');
    for (let x = STAGE + 10; x < W; x += 30) R(x, 162, 4, 1, '#ffd166');
    R(STAGE - 2, 146, 2, 34, '#1a0e0a');
  };
  // backs of heads in the nearest row, between us and the room
  const heads = t => { for (let i = 0, x = 8; x < W; i++, x += 14 + Math.floor(hash(i * 3) * 6)) {
    const y = 173 + (Math.sin(t * 1.1 + i * 2.3) > 0.92 ? -1 : 0) + Math.floor(hash(i * 5) * 3), r = 5 + (hash(i * 7) > 0.6 ? 1 : 0);
    R(x - 9, y + 3, 18, 10, '#100808'); disc(x, y, r, '#140b0b'); R(x - r + 1, y - r + 1, 2, 1, '#3a2420');
    if (hash(i * 11) > 0.75) disc(x + 1, y - r - 1, 2, '#140b0b');
    if (i % 9 === 4 && Math.sin(t * 0.5 + i) > 0.6) { R(x + 4, y - 14, 5, 8, '#1b1f2a'); R(x + 5, y - 13, 3, 6, '#8fc0e6'); }
  } };
  const spotlight = (on) => { if (on < 0.02) return; const cx = PODIUM - 12;
    for (let y = 8; y < 154; y++) { const w = 4 + (y - 8) * 0.24; ctx.fillStyle = `rgba(255,226,160,${0.09 * on})`; ctx.fillRect(Math.round(cx - w), y, Math.round(w * 2), 1); }
    ctx.fillStyle = `rgba(255,226,160,${0.16 * on})`; for (let i = 0; i < 4; i++) ctx.fillRect(cx - 38 + i * 4, 149 + i, 76 - i * 8, 1); };

  const flyers = (st, t) => {
    const s = st.scrT;
    if (st.scr === 'ran') {
      const tx = CRASH.x + 2, ty = CRASH.by - 20;
      const path = v => [lerp(SX + 50, tx, v), lerp(SY + 60, ty, v * v) - Math.sin(v * 3.14) * 18 + Math.sin(v * 12) * 2];
      if (s > 1.2 && s < 2.4) { const k = (s - 1.2) / 1.2, [x, y] = path(k), [x2, y2] = path(k + 0.01); rot(PLANE, PLANE_PAL, x, y, Math.atan2(y2 - y, x2 - x)); }
      if (s < 2.4) st.ow = false; else if (!st.ow) { st.ow = true; g.say('Ow!', tx, ty - 10, 1.6); }
      if (s >= 2.4) { rot(PLANE, PLANE_PAL, tx + 1, ty - 2, 2.2); R(tx - 1, ty + 1, 3, 1, '#8f9ab0');
        if (s < 3.2) { const k = (s - 2.4) / 0.8; ctx.globalAlpha = 1 - k; for (let i = 0; i < 5; i++) { const a = i * 1.26; disc(tx + Math.cos(a) * (3 + k * 8), ty + Math.sin(a) * (2 + k * 5), 1, '#e8dcc8'); } ctx.globalAlpha = 1; } }
    }
    if (st.scr === 'pool') THROWERS.forEach((p, i) => { const t0 = THROW_T(i) + 0.3, k = (s - t0) / 0.9; if (k < 0 || k >= 1) return;
      const w = WALL[i + 3]; const x0 = p.x + 4, y0 = p.by - 26, x1 = w.x + 8, y1 = w.y + 4;
      brick(lerp(x0, x1, k) - 4, lerp(y0, y1, k) - Math.sin(k * 3.14) * 40, 8, 5, BRICK[(i + 3) % BRICK.length], 2); });
  };

  /* ---------- the lego featurette ---------- */
  const LEGO = [
    { x: 64, row: 0, w: 96, c: '#e3342f', label: ['SAME INPUT', 'SAME OUTPUT'] },
    { x: 160, row: 0, w: 96, c: '#2f6fe3', label: ['REUSABLE'] },
    { x: 112, row: 1, w: 96, c: '#f7c51e', label: ['UNDERSTANDABLE'], ink: '#4a3a00' },
    { x: 64, row: 2, w: 96, c: '#2fb67c', label: ['COMPARABLE'] },
  ];
  const FILL = [{ x: 64, row: 1, w: 48, c: '#f5a623', label: ['TESTED'] }, { x: 208, row: 1, w: 48, c: '#b28dff', label: ['SMALL'] }, { x: 160, row: 2, w: 96, c: '#ff6f91', label: ['COMPOSABLE'] }];
  const BH = 26, legoY = row => 108 - row * BH;
  const arm = (x, yb, open, t) => {
    x = Math.round(x); yb = Math.round(yb);
    R(0, 0, 320, 6, '#3b3f47'); R(0, 6, 320, 1, '#22252c'); for (let i = 0; i < 320; i += 12) R(i, 2, 6, 2, '#5a5f68');
    R(x - 10, 2, 20, 8, '#f7c51e'); for (let i = 0; i < 20; i += 6) R(x - 10 + i, 8, 3, 2, '#1b1f2a');
    R(x - 3, 10, 6, yb - 22, '#c8ccd2'); R(x - 3, 10, 1, yb - 22, '#e4e8ec'); R(x + 2, 10, 1, yb - 22, '#8a8f94');
    for (let y = 18; y < yb - 14; y += 14) R(x - 4, y, 8, 2, '#8a8f94');
    R(x - 8, yb - 14, 16, 6, '#f7c51e'); R(x - 8, yb - 14, 16, 1, '#fff0a0'); R(x - 2, yb - 12, 4, 2, Math.sin(t * 6) > 0 ? '#ff3030' : '#7a1010');
    const o = open ? 6 : 0; R(x - 12 - o, yb - 9, 4, 11, '#5a5f68'); R(x + 8 + o, yb - 9, 4, 11, '#5a5f68'); R(x - 12 - o, yb + 1, 6, 2, '#5a5f68'); R(x + 6 + o, yb + 1, 6, 2, '#5a5f68');
  };
  const legoBrick = (b, y) => { const studs = b.w / 24; bigBrick(b.x, y, b.w, BH, b.c, studs);
    if (b.label) { const ink = b.ink || '#ffffff', sh = mix(b.c, '#000000', 0.45), n = b.label.length;
      b.label.forEach((l, i) => { const yy = y + (n === 1 ? 9 : 4 + i * 9); T(l, b.x + b.w / 2 + 1, yy + 1, 7, b.ink ? mix(b.c, '#ffffff', 0.5) : sh, 'center'); T(l, b.x + b.w / 2, yy, 7, ink, 'center'); }); } };
  const shadowOn = (x, w, y, a) => { ctx.fillStyle = `rgba(20,8,0,${a})`; ctx.fillRect(Math.round(x + 4), Math.round(y), Math.round(w), 3); };
  const dropIn = (b, t, t0, dur, armOn) => {
    const ty = legoY(b.row), k = clamp01((t - t0) / dur), y = ty - (1 - ease(k)) * 130;
    const surface = b.row === 0 ? 134 : legoY(b.row - 1);
    if (k < 1) shadowOn(b.x, b.w, surface, 0.1 + 0.3 * k);
    legoBrick(b, y);
    if (armOn) { const up = clamp01((t - t0 - dur - 0.2) / 0.6); arm(b.x + b.w / 2, y - 6 - ease(up) * 140, t > t0 + dur + 0.1, t); }
    if (t > t0 + dur && t < t0 + dur + 0.5) { const q = (t - t0 - dur) / 0.5; ctx.globalAlpha = 1 - q;
      for (const sx of [b.x - 2, b.x + b.w + 2]) { const d = sx < b.x ? -1 : 1; for (let i = 0; i < 3; i++) line(sx, ty + 4 + i * 8, sx + d * (4 + q * 6), ty + 2 + i * 9, '#ffffff'); }
      shadowT('CLICK!', b.x + b.w / 2, ty - 18 - q * 6, 7, '#ffffff', 'center', '#000000'); ctx.globalAlpha = 1; }
  };
  const legoDraw = (step, t, st) => {
    R(0, 0, 320, 180, '#24150f'); for (let x = 0; x < 320; x += 20) R(x, 0, 10, 134, '#28180f');
    ctx.fillStyle = 'rgba(255,214,140,.05)'; for (let r = 20; r < 200; r += 14) { ctx.beginPath(); ctx.arc(70, -10, r, 0, 6.283); ctx.fill(); }
    R(0, 134, 320, 46, '#8a5a34'); R(0, 134, 320, 2, '#b07a4a'); R(0, 136, 320, 1, '#6a4226');
    for (let i = 0; i < 14; i++) { const y = 140 + i * 3, x = Math.floor(hash(i * 5) * 260); R(x, y, 30 + Math.floor(hash(i) * 50), 1, '#7a4e2c'); }
    ctx.fillStyle = 'rgba(20,8,0,.35)'; ctx.fillRect(68, 134, 192, 4);
    R(262, 140, 26, 14, '#f2efe6'); R(262, 140, 26, 1, '#ffffff'); R(275, 140, 1, 14, '#cfc8b8'); R(262, 154, 26, 1, 'rgba(20,8,0,.35)');
    T('1', 268, 143, 7, '#2f6fe3', 'center'); T('2', 282, 143, 7, '#e3342f', 'center');
    bigBrick(36, 142, 24, 9, '#2fb67c', 1); R(40, 151, 24, 2, 'rgba(20,8,0,.35)'); bigBrick(268, 128, 24, 6, '#6c8cff', 1);
    const shake = step < 4 && t > 0.7 && t < 0.8 ? 1 : 0; ctx.save(); ctx.translate(0, shake);
    // lower rows first, so studs never poke through the brick above
    const list = LEGO.slice(0, Math.min(step, 4)).map(b => ({ b, f: () => legoBrick(b, legoY(b.row)) }));
    if (step < 4) list.push({ b: LEGO[step], f: () => dropIn(LEGO[step], t, 0, 0.7, true) });
    else FILL.forEach((b, i) => { if (t > i * 0.45) list.push({ b, f: () => dropIn(b, t, i * 0.45, 0.35, i === FILL.length - 1 || t < (i + 1) * 0.45) }); });
    list.sort((p, q) => p.b.row - q.b.row).forEach(e => e.f());
    if (step === 4 && t > 2.0) { const k = clamp01((t - 2.0) / 0.4), y = Math.round(legoY(2) - 6 - Math.sin(k * 3.14) * 24), H = g.hero();
      person(H, 160, y, t, 1, false, 2, t > 2.4 ? (Math.sin(t * 7) > 0 ? 'cheerA' : 'cheerB') : null);
      if (t > 2.4) for (let i = 0; i < 10; i++) { const a = i * 0.628 + t * 0.5;
        if (Math.sin(t * 3 + i * 1.7) > 0) R(Math.round(160 + Math.cos(a) * 118), Math.round(56 + Math.sin(a) * 34), 2, 2, i % 2 ? '#ffd166' : '#ffffff'); } }
    ctx.restore();
  };

  return {
    width: W, floor: 154, spawn: 24, exit: EXIT, host: HOST + 14,
    focus: F,
    props: [
      { id: 'sleeper', x: SLEEPER.x, r: 40, label: 'Wake the sleeper' },
      { id: 'cable', x: F.screen + 4, label: 'Wiggle the HDMI cable' },
      { id: 'glass', x: PODIUM - 14, label: 'Drink some water' },
    ],
    enter(st) { Object.assign(st, { t: 0, scr: 'idle', scrT: 0, dim: 0, spot: 0, sips: 0, spilt: false, spillT: 0, cable: 0, nosig: 0, title: 0, wake: 0, wiggle: 0, lateT: -4, late: 'out', hostN: 0, cardT: 0 }); if (st.next) st.dim = st.spot = 1; },
    update(dt, st, ev) {
      st.t += dt; st.scrT += dt; st.spillT += dt;
      for (const k of ['nosig', 'title', 'wake', 'wiggle', 'cardT']) if (st[k] > 0) st[k] = Math.max(0, st[k] - dt);
      const on = ev.beatIdx >= 0 || st.next ? 1 : 0; st.dim += (on - st.dim) * Math.min(1, dt * 1.5); st.spot += (on - st.spot) * Math.min(1, dt * 2.5);
      if (ev.beatIdx >= 0) st.talkT = (st.talkT || 0) + dt;
      if (st.late !== 'sat') { st.lateT += dt; if (st.lateT > 7.2) { st.late = 'sat'; st.lateT = 0; } }
      else st.lateT += dt;
    },
    draw(st, ev) {
      const t = time();
      R(0, 0, STAGE, 146, '#2a1812'); for (let x = 0; x < STAGE; x += 24) R(x, 8, 12, 138, '#2e1b14');
      for (let x = 50; x < STAGE - 20; x += 36) { R(x, 30, 26, 2, '#3a241b'); }
      leftDoors(t);
      seated(st, t, st.scrT, st.scr, st.scrT);
      ctx.fillStyle = `rgba(10,4,6,${0.32 * st.dim})`; ctx.fillRect(0, 0, STAGE, 146);
      glows(st.dim);
      stageBack(st, t, ev);
      truss(t, st);
      floor(t);
      lecternClock(st, t); cableBox(st, t); podium(st, t, ev); hostAt(st, t); exitDoor(t); demoTable(st, t);
      if (st.next) nextTalk(t);
      spotlight(st.spot);
      flyers(st, t);
      heads(t);
    },
    beat(id, st) { if (id === 'next') return g.say('Do you mind? I’m presenting.', F.podium, 124, 3); st.scr = id; st.scrT = 0; },
    poke(id, st) {
      if (id === 'glass') {
        if (st.spilt) return 'The glass is empty';
        if (++st.sips < 3) { g.say(st.sips === 1 ? 'Glug glug' : 'Ahh', F.podium, 128); return true; }
        st.spilt = true; st.spillT = 0; g.say('Oops!', F.podium, 128); return 'Water all over the podium';
      }
      if (id === 'cable') {
        st.cable++; st.wiggle = 0.4;
        if (st.cable === 3) { st.title = 7; st.nosig = 0; g.egg('theatre-title', 'The game, on the big screen'); return true; }
        st.nosig = 2; return true;
      }
      if (id === 'sleeper') { st.wake = 4; g.say('Huh?! I was listening!', SLEEPER.x, SLEEPER.by - 26); return true; }
      if (id === 'host') {
        const lines = ['Ten minutes, then the other rooms.', 'Phones out: rank the rooms!', 'I have a little bell. I will use it.'];
        g.say(lines[st.hostN++ % lines.length], HOST, 124); st.cardT = 2.5; return true;
      }
    },
    features: { lego: { steps: 5, draw: legoDraw } },
  };
};
