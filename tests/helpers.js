// Shared steps for driving the game through window.__game (only exposed with ?debug).

// Google Fonts may be unreachable; an empty stylesheet keeps runs offline and quiet.
export async function stubFonts(context) {
  await context.route(/fonts\.(googleapis|gstatic)\.com/, r => r.fulfill({ status: 200, contentType: 'text/css', body: '' }));
}

export const ENTRANCE = 420, DESK_GREETER = -170, DESK_DOOR = -28, QA_DOOR = 784;

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

// Outside → registration desk (left end of the foyer) → badge → lecture theatre.
export async function enterTheatre(page) {
  await setX(page, ENTRANCE);
  await pressUntil(page, 'b', () => window.__game.scene === 'foyer');
  await setX(page, DESK_GREETER);
  await pressUntil(page, 'b', () => window.__game.badge);
  await pressUntil(page, 'b', () => document.querySelector('#big').classList.contains('hidden'));
  await setX(page, DESK_DOOR);
  await pressUntil(page, 'b', () => window.__game.scene === 'place');
}

// Teleports to each beat's spot instead of waiting for the walk.
export async function settle(page) {
  await page.waitForFunction(() => { const g = window.__game;
    if (g.pl && g.pl.target != null) g.p.x = g.pl.target;
    return !g.busy && !(g.pl && g.pl.target != null); });
}

// 'beat/featurette step' inside a place, or null once out of it.
const where = () => { const g = window.__game; return g.scene === 'place' ? `${g.beatIdx}/${g.pl.feat ? g.pl.feat.step : -1}` : null; };

// Right through every beat (and featurette step) and out to the foyer; returns where each press landed.
export async function playPlace(page) {
  const seen = [];
  for (let i = 0; i < 80; i++) {
    await settle(page);
    const s = await page.evaluate(where);
    if (!s) return seen;
    seen.push(s);
    await page.keyboard.press('ArrowRight');
    await page.waitForFunction(prev => { const g = window.__game;
      return g.busy || (g.scene === 'place' ? `${g.beatIdx}/${g.pl.feat ? g.pl.feat.step : -1}` : null) !== prev; }, s);
  }
  throw new Error('Never left the place');
}

export async function enterPlace(page, key) {
  await setX(page, await page.evaluate(k => { const T = window.KEYNOTE_CONTENT.TOPICS; return 112 + 96 * Object.keys(T).filter(t => !T[t].opener).indexOf(k); }, key));
  await pressUntil(page, 'b', k => window.__game.scene === 'place' && window.__game.topic === k, key);
}
