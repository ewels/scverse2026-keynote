import { test, expect } from '@playwright/test';
import { pathToFileURL } from 'node:url';
import { stubFonts, pickPhil, enterTheatre, playPlace, enterPlace, settle, setX, pressUntil, ENTRANCE, DESK_GREETER, DESK_DOOR } from './helpers.js';

const fromDisk = path => pathToFileURL(path).href;

async function openGame(page, context) {
  await stubFonts(context);
  const errors = [];
  page.on('console', m => { if (m.type() === 'error') errors.push(m.text()); });
  page.on('pageerror', e => errors.push(e.message));
  await page.goto(fromDisk('docs/index.html') + '?debug');
  return errors;
}

test('the game runs from disk with live features off', async ({ page, context }) => {
  const errors = await openGame(page, context);
  await pickPhil(page);
  await enterTheatre(page);
  expect(await page.evaluate(() => window.__game.topic)).toBe('why');
  await playPlace(page);
  expect(await page.evaluate(() => window.__game.scene)).toBe('foyer');
  await enterPlace(page, 'agents');

  await page.goto(fromDisk('docs/join/index.html'));
  await expect(page.locator('#end h2')).toHaveText('Live voting is closed');

  expect(errors).toEqual([]);
});

test('every place steps through every beat and featurette step', async ({ page, context }) => {
  test.setTimeout(180_000);
  const errors = await openGame(page, context);
  await page.waitForFunction(() => window.__game && window.__game.scene === 'menu');
  const topics = await page.evaluate(() => window.KEYNOTE_CONTENT.TOPICS);
  for (const [key, t] of Object.entries(topics)) {
    await page.evaluate(k => window.__game.goto(k), key);
    const seen = new Set(await playPlace(page));
    const want = ['-1/-1', `${t.beats.length}/-1`];
    t.beats.forEach((b, i) => {
      if (!b.feature) return want.push(`${i}/-1`);
      for (let s = 0; s < (b.steps || []).length; s++) want.push(`${i}/${s}`);
    });
    for (const w of want) expect(seen, `${key} reached ${w}`).toContain(w);
    expect(await page.evaluate(() => window.__game.scene)).toBe('foyer');
  }
  expect(errors).toEqual([]);
});

test('a fight throws you out and the place resumes; the cat waits for the hackathon', async ({ page, context }) => {
  const errors = await openGame(page, context);
  await pickPhil(page);
  await page.evaluate(() => { const g = window.__game; g.goto('foyer'); g.catNext = 0; });
  await page.waitForTimeout(500);
  expect(await page.evaluate(() => window.__game.cat)).toBeNull();

  await page.evaluate(() => window.__game.goto('agents'));
  await pressUntil(page, 'ArrowRight', () => window.__game.beatIdx === 1);
  await settle(page);
  const idx = await page.evaluate(() => { const g = window.__game; g.pl.st.mark = 7; g.p.x = g.pl.d.host; return g.beatIdx; });
  for (let i = 0; i < 6; i++) { await page.keyboard.press('b'); await page.waitForTimeout(150); }
  await page.waitForFunction(() => window.__game.scene === 'outside', null, { timeout: 15_000 });
  expect(await page.evaluate(() => [window.__game.eggs.has('fight'), window.__game.badge, window.__game.resume])).toEqual([true, false, 'agents']);

  await setX(page, ENTRANCE);
  await pressUntil(page, 'b', () => window.__game.scene === 'desk');
  await setX(page, DESK_GREETER);
  await pressUntil(page, 'b', () => window.__game.badge);
  await expect(page.locator('#big p')).toHaveText('VISITOR');
  await pressUntil(page, 'b', () => document.querySelector('#big').classList.contains('hidden'));
  await setX(page, DESK_DOOR);
  await pressUntil(page, 'b', () => window.__game.scene === 'place');
  await settle(page);
  expect(await page.evaluate(() => [window.__game.topic, window.__game.beatIdx, window.__game.pl.st.mark])).toEqual(['agents', idx, 7]);

  await page.evaluate(() => { const g = window.__game; g.visited.add('nfcore'); g.goto('foyer'); g.catNext = 0; });
  await page.waitForFunction(() => window.__game.cat);
  expect(errors).toEqual([]);
});
