# Checks

## After every phase

- `npm test` passes (head session only; it starts `wrangler dev` on a fixed port).
- The page opened from disk (`docs/index.html?debug`) shows no console errors when walked through every scene.
- Screenshots of each new place at 1920 × 1080 and at the stage-view crop (narrower than 16:9, beside the sidebar) look right: nothing important cut off at the edges, text readable from the back of a lecture hall.
- Clicker keys only: the whole place can be played with ArrowLeft, ArrowRight and B.
- Diff is limited to the files the phase owns.

## Final check (phase 9)

- One agent plays the whole talk start to finish with only Left, Right and B, taking screenshots at each beat, and lists anything that looks broken, ugly, hard to read or dull.
- One agent tries every easter egg in `03-play.md` and `02-places.md` and reports which work.
- One agent reviews the code diff since the plan commit for bugs (project rules, `file://`, key handling, message contract with the worker).
- The head session fixes what it can, logs the rest in `STATUS.md`, and commits.

## Visual quality bar

- Each place is recognisable in a two-second glance as that kind of space.
- Every beat visibly changes something on screen.
- Something moves in every scene at all times.
- Text on screen is large: captions at least as big as the current dialogue text.
