import { test, expect } from '@playwright/test';
import { stubFonts, pickPhil, enterTheatre, playPlace, setX, pressUntil, QA_DOOR } from './helpers.js';

async function open(browser, url) {
  const context = await browser.newContext();
  await stubFonts(context);
  const page = await context.newPage();
  await page.goto(url);
  return page;
}

const stageState = stage => stage.evaluate(() => window.__live.state);

test('stage, phones and moderator stay in sync', async ({ browser }) => {
  test.setTimeout(180_000);

  const stage = await open(browser, '/?stage&key=dev&debug');
  await stage.waitForFunction(() => window.__live.ws && window.__live.ws.readyState === 1);
  await stage.evaluate(() => window.__live.ws.send(JSON.stringify({ t: 'reset' })));
  await stage.waitForFunction(() => { const s = window.__live.state;
    return s && s.voters === 0 && s.onScreen === 0 && !s.visited.length && !s.ended; });
  await pickPhil(stage);

  // Rankings: Borda count over 8 open rooms, 8 points for first down to 1 for last.
  const ana = await open(browser, '/join/'), bea = await open(browser, '/join/');
  const orders = [];
  for (const phone of [ana, bea]) {
    await expect(phone.locator('#topics .topic')).toHaveCount(8);
    await phone.locator('#topics .topic').first().locator('.down').click();
    orders.push(await phone.$$eval('#topics .topic', els => els.map(e => e.dataset.key)));
    await phone.locator('#submit').click();
    await expect(phone.locator('#summary')).toBeVisible();
  }
  const expected = {};
  for (const order of orders) order.forEach((k, i) => { expected[k] = (expected[k] || 0) + order.length - i; });
  const strip = () => stage.$$eval('#strip .tb', els => {
    const byShort = Object.fromEntries(Object.entries(window.KEYNOTE_CONTENT.TOPICS).map(([k, t]) => [t.short, k]));
    return Object.fromEntries(els.map(e => [byShort[e.querySelector('.tt').textContent], Number(e.querySelector('.n').textContent)]));
  });
  await expect.poll(strip).toEqual(expected);
  await expect(stage.locator('#voterCount')).toHaveText('2');

  // Questions: Bea asks first, Ana asks second and gets Bea's vote, so votes beat age.
  const ask = async (phone, name, text) => {
    await phone.fill('#name', name); await phone.fill('#q', text); await phone.click('#send');
    await expect(phone.locator('#status')).toContainText('Sent');
  };
  const older = 'Is there a slide deck too?', popular = 'Will the game stay online after the talk?';
  await ask(bea, 'Bea', older);
  await ask(ana, 'Ana', popular);
  const vote = bea.locator('#qs li', { hasText: popular }).locator('.vote');
  await vote.click();
  await expect(vote).toHaveAttribute('aria-pressed', 'true');

  const mod = await open(browser, '/mod/?key=dev');
  await expect(mod.locator('#main')).toBeVisible();
  await expect(mod.locator('#new .card .text')).toHaveText([popular, older]);
  await expect(mod.locator('#new .card').first().locator('.votes')).toHaveText('▲ 1');

  // On screen: the carrier walks up, action shows the question, and it's then answered.
  await mod.locator('#new .card', { hasText: popular }).locator('[data-a=promote]').click();
  await stage.waitForFunction(() => { const a = window.__game.asker; return a && a.phase === 'wait' && a.near; }, null, { timeout: 20_000 });
  await expect(stage.locator('#prompt')).toContainText('Question from Ana');
  const dialogueOpen = () => !document.querySelector('#dialogue').classList.contains('hidden');
  await pressUntil(stage, 'b', dialogueOpen);
  await expect(stage.locator('#dialogue .speaker')).toHaveText('Ana asks');
  await expect(stage.locator('#dialogue li')).toHaveText(popular);
  await pressUntil(stage, 'b', () => document.querySelector('#dialogue').classList.contains('hidden'));
  await expect(mod.locator('#done .card', { hasText: popular }).locator('.tag.answered')).toHaveText('Answered');

  // Visiting a place removes its bar.
  await enterTheatre(stage);
  await expect(stage.locator('#strip .tb')).toHaveCount(7);
  await expect(stage.locator('#strip .tb .tt', { hasText: 'WHY' })).toHaveCount(0);

  // The Q&A door ends the talk and sends the phones to the game link.
  await playPlace(stage);
  await setX(stage, QA_DOOR);
  await pressUntil(stage, 'b', () => window.__game.ended);
  for (const phone of [ana, bea]) {
    await expect(phone.locator('#end')).toBeVisible();
    await expect(phone.locator('#end a')).toHaveText('Play the game');
    await expect(phone.locator('#vote')).toBeHidden();
  }

  // A stage with the wrong key can't change anything.
  const before = await stageState(stage);
  const rogue = await open(browser, '/?stage&key=wrong&debug');
  await expect(rogue.locator('#conn')).toHaveText('Reconnecting');
  await rogue.evaluate(async () => {
    window.__live.send({ t: 'reset' });
    window.__live.send({ t: 'visited', topic: 'nfcore' });
    window.__live.send({ t: 'ended', on: false });
    const tries = ['presenter', 'mod', 'audience'].map(role => new Promise(done => {
      const ws = new WebSocket(`${location.origin.replace(/^http/, 'ws')}/api/ws?role=${role}&key=wrong`);
      ws.onopen = () => { for (const t of ['reset', 'visited', 'ended', 'dismiss']) ws.send(JSON.stringify({ t, topic: 'nfcore', on: false, id: 1 })); setTimeout(done, 500); };
      ws.onerror = done;
    }));
    await Promise.all(tries);
  });
  await stage.waitForTimeout(1000);
  const after = await stageState(stage);
  expect({ counts: after.counts, voters: after.voters, visited: after.visited, ended: after.ended })
    .toEqual({ counts: before.counts, voters: before.voters, visited: before.visited, ended: before.ended });
  await expect(mod.locator('#done .card', { hasText: popular }).locator('.tag.answered')).toHaveText('Answered');
  await expect(mod.locator('#done .card', { hasText: older })).toHaveCount(0);
});
