// Shared steps for driving the game through window.__game (only exposed with ?debug).

// Google Fonts may be unreachable; an empty stylesheet keeps runs offline and quiet.
export async function stubFonts(context) {
  await context.route(/fonts\.(googleapis|gstatic)\.com/, r => r.fulfill({ status: 200, contentType: 'text/css', body: '' }));
}

export const ENTRANCE = 420;

// Keys pressed during a fade are dropped, so keep pressing until the game reacts.
export async function pressUntil(page, key, cond, arg) {
  for (let i = 0; i < 60; i++) {
    if (await page.evaluate(cond, arg)) return;
    await page.keyboard.press(key);
    await page.waitForTimeout(150);
  }
  throw new Error(`Pressing ${key} never satisfied: ${cond}`);
}

export const setX = (page, x) => page.evaluate(x => { window.__game.p.x = x; }, x);

export async function pickPhil(page) {
  await page.waitForFunction(() => window.__game && window.__game.scene === 'menu');
  await pressUntil(page, 'ArrowRight', () => window.__game.scene === 'select');
  await pressUntil(page, 'ArrowRight', () => window.__game.sel === 1);
  await pressUntil(page, 'ArrowRight', () => window.__game.sel === 2);
  await pressUntil(page, 'b', () => window.__game.chosen && window.__game.chosen.id === 'phil');
  await page.waitForFunction(() => window.__game.scene === 'outside');
}

export async function enterFoyer(page) {
  await setX(page, ENTRANCE);
  await pressUntil(page, 'b', () => window.__game.scene === 'foyer');
}

// side: 'left' or 'right' door in the foyer.
export async function enterDoor(page, side) {
  await setX(page, side === 'left' ? 30 : 290);
  await pressUntil(page, 'b', () => window.__game.scene === 'room');
}

export async function leaveRoom(page) {
  await page.evaluate(() => { window.__game.talked = true; window.__game.p.x = 300; });
  await pressUntil(page, 'b', () => window.__game.scene === 'foyer');
}
