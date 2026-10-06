import { test, expect } from '@playwright/test';
import { pathToFileURL } from 'node:url';
import { stubFonts, pickPhil, enterFoyer, enterDoor } from './helpers.js';

const fromDisk = path => pathToFileURL(path).href;

test('the game runs from disk with live features off', async ({ page, context }) => {
  await stubFonts(context);
  const errors = [];
  page.on('console', m => { if (m.type() === 'error') errors.push(m.text()); });
  page.on('pageerror', e => errors.push(e.message));

  await page.goto(fromDisk('docs/index.html') + '?debug');
  await pickPhil(page);
  await enterFoyer(page);
  await enterDoor(page, 'left');
  expect(await page.evaluate(() => window.__game.room)).toBe('agents');

  await page.goto(fromDisk('docs/join/index.html'));
  await expect(page.locator('#end h2')).toHaveText('Live voting is closed');

  expect(errors).toEqual([]);
});
