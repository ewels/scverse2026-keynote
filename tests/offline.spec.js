import { test, expect } from '@playwright/test';
import { pathToFileURL } from 'node:url';
import { stubFonts, pickPhil, enterTheatre, playPlace, enterPlace } from './helpers.js';

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
