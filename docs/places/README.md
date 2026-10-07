# Places

One classic script per place (no modules: `index.html` must run from `file://`). Add a `<script src="places/<place>.js">` tag next to the others in `index.html`. A topic in `content.js` points at its place with `place: '<place>'`. A topic whose place has no file gets a plain fallback room.

```js
(window.KEYNOTE_PLACES = window.KEYNOTE_PLACES || {}).theatre = g => ({
  width: 480,                 // world width; wider than 320 scrolls
  floor: 154,                 // y of the hero's feet
  spawn: 24, exit: 460,       // hero start x, exit x (after the last beat, Right walks here)
  host: 420,                  // x of the host NPC, for Action and the default speech bubble
  focus: { podium: 96, screen: 330 },                 // beat `at` id -> x the hero walks to
  props: [{ id: 'glass', x: 112, label: 'Drink some water' }],   // Action within 14px pokes it
  enter(st) {},               // st: this visit's state object (fresh each visit)
  update(dt, st, ev) {},
  draw(st, ev) {},            // draw the whole place in world coordinates; the engine draws the hero after
  drawFront(st, ev) {},       // optional: drawn over the hero and NPCs
  beat(id, st) {},            // a beat started (beat.id, or its at)
  poke(id, st) {},            // id is a prop id or 'host'; return a string to toast it,
                              // true if you handled it yourself, nothing for the default
  features: { lego: { steps: 5, draw(step, t, st) {} } },  // full-screen 320x180, screen coordinates
});
```

`ev` is `{ beat, beatIdx, stepT, poked: { id, t } | null, walking }`. `beat` is the current beat from `content.js` (`null` before the first), `stepT` is seconds since the beat (or featurette step) started, and `walking` is true while the hero is still walking to it.

`g` holds the engine helpers: `R, T, disc, line, map2d, tri, blob, pine, cumulus, mix, hash, person, ctx, VW, VH`, plus:

- `look(id)`: a sprite look by character id (`phil`, `lukas`, `luca`), `greeter`, or a topic or place id (its host).
- `hero()`: the current hero's look. `time()`: seconds since the game started.
- `say(text, x, y, secs)`: a speech bubble whose tail points at `(x, y)` in world coordinates.
- `storm(x, y, w, h)`: while the post-fight storm is on, darkens that rectangle and draws rain and lightning over it; otherwise does nothing.
- `toast(text)`: a banner at the top. `egg(id, label)`: records an easter egg once and toasts `EASTER EGG: label`.
- `heroX()`: the hero's x in world coordinates.
- `visited(topic)`: true once that topic's place has been entered this game.
- `carry(key, value)` / `carry(key)`: a value that lasts for the rest of the game, across scenes. The engine draws a carried `hat` (`tophat`, `beret`, `party`, `shades`) and the cloakroom's `coat` (`true`) on the hero everywhere; `null` takes them off.

A new egg id must also be added to `EGGS` in `index.html`, or the end screen's total will be short (`?debug` warns in the console).

The engine owns some play across every place: the venue cat (after the hackathon) walks in and is stroked with Action when it is the nearest thing, poking the host six times fast starts a fight (the place's `poke('host')` is skipped from the third quick poke on), and a fight saves the place's `st` and beat so the next visit resumes there without calling `enter` again. `egg('coffee')` gives the hero a jittery walk until they leave the next place.

Controls inside a place: Right goes to the next beat (or featurette step), Left replays the previous one, Action pokes the prop or host in reach; with nothing in reach the hero walks to the nearest one on screen and pokes it. Action never moves the talk on. Left before the first beat, or on it, walks the hero back to `spawn` and out to the foyer (the opener goes back to the registration desk); Right during that walk cancels it.

Debug: open `index.html?debug` and run `__game.goto('theatre')` (a place, topic or scene id). `__game.beatIdx` is the current beat.
