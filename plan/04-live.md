# Phase 8: live changes

Change both sides of every message together (`docs/` and `worker/src/worker.js`), and keep the presenter key check in the Worker's `fetch`.

## Voting without the opener

- The stage's `config` message leaves out the opener (`opener: true`). Phones rank the seven others.
- The sidebar ranking strip shows the seven, and the foyer reads the top two unvisited for the "crowd favourite" banners.
- The worker's config sanitiser keeps any new fields the phones need (for example `size`, so a phone can show "short" / "long" next to each room).

## Reactions from phones

- New audience message `react` with `kind` in a fixed list: `clap`, `heart`, `laugh`, `coffee`, `star` (the hidden one).
- The worker rate-limits it with the existing token bucket, plus a per-phone cooldown of one reaction per second.
- The worker sends presenters a new `react` server message with a small batch of counts per kind, coalesced like state broadcasts (at most four per second). Reactions are not stored.
- The phone page gets a row of reaction buttons under the ranking, and the hidden logo tap from `03-play.md`.
- The stage floats a small pixel icon up from the bottom of the scene per reaction (capped on screen), and triggers the standing ovation when 20+ arrive within five seconds.

## Clock

- The sidebar shows the time since the opener started (`mm:ss`). It turns amber at 30 minutes and red at 35. It only shows in stage mode.

## Tests

- Update `tests/live.spec.js` for seven ranked rooms and the new flow.
- Add a check that a reaction from a phone reaches the stage, and that a presenter or mod can't send `react` as an audience message from the wrong role.
