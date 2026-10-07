# Phase 1: engine

Goal: replace the single recoloured topic room with a framework where every place is its own drawing, with focus objects the presenter steps through, and a new flow (registration → lecture theatre → foyer hub → places → Q&A). Nothing here needs final art: phase 1 ships simple placeholder drawings for every place so the whole talk can be walked end to end, and later phases replace them.

Project rules from `CLAUDE.md` still apply: no build step, classic `<script>` tags only, runs from `file://`, clicker keys unchanged, F5 never reloads, British English, art drawn in code.

## Files

- `docs/index.html`: the engine. Keeps input, overlays, `Live`, pixel helpers, sprites, outside scene, menu and select.
- `docs/content.js`: talk content only (characters, topics, beats, words).
- `docs/places/<place>.js`: one classic script per place. Each registers its drawing and behaviour. Loaded with `<script>` tags after `content.js` and before the engine script.
- `docs/places/README.md`: short reference of the place API below, for whoever writes the next place.

## Place API

Each place file does:

```js
(window.KEYNOTE_PLACES = window.KEYNOTE_PLACES || {}).theatre = gfx => ({
  width: 480,             // world width in pixels; wider than 320 scrolls the camera
  floor: 154,             // y of the hero's feet
  spawn: 30, exit: 450,   // hero start x, exit door x
  focus: { podium: 120, screen: 200, wall: 330 },   // focus id -> x the hero walks to
  props: [ { id:'plant', x:60, label:'Kick the plant' } ],  // things Action can poke anywhere
  enter(st) {},           // called on entry; st is this place's own state object, kept per visit
  update(dt, st, ev) {},  // ev: { beat, beatIdx, stepT, poked } for animation
  draw(st, ev) {},        // draws the whole place in world coordinates
  beat(id, st) {},        // a beat with this id has started (start animations here)
  poke(propId, st) {},    // Action pressed near a prop; return a string to show as a toast, or nothing
  features: { lego: { steps: 5, draw(step, t, st) {} } },   // zoomed featurettes, drawn full screen
});
```

`gfx` gives the place the engine's helpers so places never reach into the IIFE: `R, T, disc, line, map2d, tri, blob, pine, cumulus, mix, hash, person, look(id)` (a sprite look by character or NPC id), `hero()` (the current hero's look), `VW, VH`, `time()`, `toast(text)`, `egg(id, label)`, `ctx`.

If a place id has no file, the engine falls back to a plain room so the game never breaks.

## Content schema (`docs/content.js`)

Topics keep `title, short, colour, icon, blurb` (the phones need these) and gain:

- `place`: the place id that draws it.
- `size`: `thick | medium | thin`, used only for the foyer layout and the sidebar.
- `opener: true` on `why` only. The opener is never sent to the phones for ranking.
- `host`: the NPC who presents with you: `{ name, look }`.
- `beats`: the talk, in order. Each beat is:
  - `at`: the focus id the hero walks to.
  - `say`: optional short caption (one line, under ~60 characters). Shown as a caption bar, not a bullet list.
  - `big`: optional huge text card (a word or a number) that fills the screen for that beat.
  - `feature`: optional featurette id from the place; its steps become extra right-presses inside this beat.
  - `id`: optional; passed to the place's `beat()` so the place can animate it. Defaults to `at`.

`FORKS`, `bonus` and the old `lines` arrays go. `GREETER` stays (now at the registration desk). `OUTRO` stays.

The phase 1 agent writes the beats for every topic from Phil's outline (in `STATUS.md` under "Outline") as first drafts. Place agents refine them.

## Controls inside a place

The clicker is the controller, so stepping is explicit:

- **Right**: next beat. The hero walks automatically to the beat's focus x (normal walk animation, quicker than manual walking), the camera follows, then the beat starts: caption appears, the place animates, the big card or featurette shows. If a featurette is open, Right moves to its next step. After the last beat, Right walks the hero to the exit; Right again leaves.
- **Left**: previous beat (replays it). On the first beat, does nothing.
- **Action (Space, Enter, B, Shift+F5)**: poke whatever is nearest the hero (a prop, the host NPC, the cat). Never advances the talk. This is where the fun lives.
- Keys pressed while the hero is auto-walking are queued, so a fast double-press of Right skips ahead cleanly.

Free walking (hold left/right) stays outside, in the registration area and in the foyer.

## Captions instead of bullets

Replace the dialogue box for talk content with:

- **Caption bar**: one line in VT323, bottom third of the screen, coloured speaker tab if a host says it. Types on quickly. Replaced, not appended, on each beat.
- **Speech bubble**: small pixel bubble above an NPC for jokes and pokes (2–3 seconds).
- **Big card**: full-width, huge Silkscreen text over a dimmed scene, for one key word or number.
- **Toast**: small banner at the top for easter eggs ("EASTER EGG: you stroked the cat"), using the existing sea banner style. `egg(id,label)` also records the egg for the end screen count.

The existing `Dlg` stays for audience questions only.

## Featurettes

A featurette is a full-screen zoomed scene owned by a place (the Lego build, a poster zoom, a terminal printout). The engine:

- fades to it, calls `features[id].draw(step, t, st)` every frame in screen coordinates (320 × 180),
- advances `step` on Right, goes back on Left, closes after the last step and continues the beat list,
- draws a small "1/5" step counter in the corner.

## Flow and scenes

Scenes: `menu, select, outside, desk, foyer, place, end`.

- `outside`: unchanged, except the entrance leads to `desk`.
- `desk`: registration desk. Free walking. The greeter hands over a badge with the hero's name (badge pops up as a big card), explains voting in one caption, and points to the QR in the sidebar. Then the theatre doors open at the right of the desk area.
- First visit to the theatre is forced: the foyer can't be reached until the opener is done.
- `foyer`: the hub, 640 pixels wide, free walking. Every non-opener place has an entrance along the hall (doors, an archway, a glass door to the courtyard, the coffee table, the photo booth). Places already visited show a tick. The top two by audience ranking get a "CROWD FAVOURITE" banner and bouncing arrows (offline: no banners). The far right is the Q&A door.
- `place`: any place by id.
- `end`: the Q&A screen. Shows "THANKS! Questions?" and the number of easter eggs found.

Live messages stay compatible: `visited` is sent on entering a place, `ended` on entering the Q&A door.

## Debug and tests

- Keep `window.__game` and `window.__live` behind `?debug`. Add `__game.goto(sceneOrPlaceId)` to jump straight to a place, and `__game.beatIdx`.
- Update `tests/helpers.js` and both specs for the new flow (desk → theatre → foyer → a place → Q&A). Add one offline test that walks every place through every beat with Right and fails on any console error.
- `npm test` must pass at the end of the phase.

## Out of scope for phase 1

Final art for any place, venue-wide easter eggs (phase 7), phone and worker changes (phase 8). Keep the plant kick and the sea easter egg working.
