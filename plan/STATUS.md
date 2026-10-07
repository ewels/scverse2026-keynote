# Status

## Progress

- [x] Plan written
- [x] Phase 1: engine
- [x] Phase 2: lecture theatre
- [x] Phase 3: registration desk and foyer hub
- [x] Phase 4: hackathon room, courtyard
- [x] Phase 5: cloakroom, poster hall
- [x] Phase 6: coffee queue, corridor, photo booth
- [x] Phase 7: venue-wide play and easter eggs
- [x] Phase 8: live changes
- [ ] Phase 9: final checks (review done and fixed; playthrough done, polish round in progress; egg hunt running)

## Subagent models

To save usage, simpler phases go to Sonnet; anything with tricky engine logic, heavy original pixel art or a code review stays on the default model.

| Phase | Model | Why |
|---|---|---|
| 1 engine | default | core control flow, many edge cases |
| 2 theatre, 3 desk and foyer, 4, 5 big places | default | most art and animation |
| 6 thin places | Sonnet | one screen each, pattern set by earlier places |
| 7 eggs | default | touches engine state across scenes |
| 8 live | Sonnet | small, well-specified protocol change |
| 9 playthrough and egg hunt | Sonnet; code review on default | |

## Decisions made without Phil

- Topic ids: `why, nfcore, rewrites, agents, multiqc, side, docs, python`.
- Every place, including the thin ones, is its own scene entered from the foyer hub. The coffee table and photo booth sit in the foyer and zoom into their own scene when entered.
- Side projects is no longer the secret room behind the kicked plant. It is a normal votable place. The plant kick stays as an easter egg.
- The audience's top two picks get a banner in the foyer, but Phil can walk into any place. The vote advises; it does not lock doors.
- The Q&A door ends the talk at any time, rather than after a fixed number of rooms.
- Rich-click appears in both the cloakroom (help story) and the photo booth (Python tooling), as Phil said the overlap is intentional.

## Open questions for Phil

- **Phil's character card** (`content.js`) has stat bars at 96–100 and lore listing his projects. QA flagged it as a bit self-flattering. It is your original wording, so I left it. Want it toned down or made jokier?
- **Ovation by one person:** a single person with three browser tabs counts as three phones, so they could trigger the standing ovation alone. Harmless, so I left it.
- **Leaving a place early still marks it visited** (its ranking bar goes and it gets a tick), because `visited` is sent on entry. Say if you'd rather it only counted after the last beat.
- **Thin places reuse a little content:** rich-click appears in the cloakroom featurette and the photo booth, as you said the overlap is intentional.
- **Captions are first drafts.** Every place's captions were written by agents from your outline and website; worth a read-through.

## Outline (from Phil, verbatim)

MUST: start with this, audience doesn't get a choice
* Why bother writing software any more?
    * Vibe-coded tools: fast, private, disposable. Fine for one-off exploration
        * Science needs more than "it ran"
    * Deterministic building blocks
        * Same input, same output, every time
        * Reusable: validate once, use everywhere
        * Understandable: read once, trust everywhere
        * Comparable: same tool, comparable results
    * Agents assemble, blocks execute (nextflow modules)
    * Spend AI effort on the commons, everyone benefits
        * Example: you think you've fully agentically built something, other reviews always find more

* Community building with nf-core
    * Back story
    * Key aspects
        * Start with a shared vision / problem
        * Agree on scope and methodology
        * Place to talk online
        * Hackathons to meet real people
        * Make it somewhere people want to work
            * Trust people (let them get on with stuff)
            * docs and onboarding
            * putting real time into welcomes
            * cat photos
        * Only as much bureaucracy as you absolutely need
        * Can't rush

* MultiQC
    * What it does. NB: works with any inputs
    * New stuff: config builder, licenses and DOIs, echarts, parquet + preprocessing
    * CTA: Make nice log outputs with filename suffixes, make more MultiQC modules please

* Side projects - AI means you can build crazy ideas
    * contributor graphs
    * nf-docs
    * nf-metro
    * Streamdeck plugins
    * gfm-tidy

* Building tools for agents
    * Cater to two audiences
        * llms.txt + .md URLs
        * Agent env vars
        * AGENTS.md and project skills
    * Context is everything
        * rich-click help story
        * Also token efficiency

* Building awesome documentation sites
    * starlight quiz, pydocs, codeblocks

* rewrites.bio
    * _"Your scientists were so preoccupied with whether or not they could, they didn't stop to think if they should"_
    * When you should rewrite, contribute upstream, combine
    * RustQC, ruSTAR, FastQC-Rust

* Python tooling
    * rich-click
    * starlight-pydocs

## Log

(One entry per phase: what was done, what was skipped, anything to look at.)

### Phase 1: engine

- Done: place framework (`docs/places/<place>.js` on `window.KEYNOTE_PLACES`, `gfx` helpers, API in `docs/places/README.md`), placeholder places for all eight topics, new content schema with first-draft beats for all eight topics, step-through controls, caption bar, speech bubbles, big text cards, toasts and `egg()`, featurettes with a step counter, and the new flow: outside, registration desk (badge card, voting caption, theatre doors open), theatre (forced first), foyer hub (640 wide, an entrance per place, ticks, crowd favourite banners from `Live.state.counts`), places, Q&A door, end screen with the egg count. Question carrier, plant kick (now an egg), sea (now an egg via the toast), `visited`/`ended` and the presenter key all still work. `__game.goto(id)` and `__game.beatIdx` added.
- Tests: helpers and both specs rewritten for the new flow; new offline test plays every place through every beat and featurette step with Right and fails on any console error. `npm test` passes (3 tests).
- Decisions:
  - Place state `st` is fresh on every visit and beats restart from the top. Phase 7 (fight keeps progress) will need to keep it.
  - Right while the hero is still walking retargets straight to the next beat, so a fast double press skips the beat in between.
  - Right on the last featurette step closes it and goes straight on to the next beat. Left on the first step closes it and replays the previous beat.
  - Beats gained two optional fields: `who: 'host'` (host name tab on the caption) and `steps` (one caption per featurette step).
  - Place defs gained `host` (x of the host NPC). Action near it calls `poke('host')`; with no answer the host says "Hi, I'm <name>!". `poke` returns a string to toast it, or `true` to suppress the default.
  - The prompt moves to the top of the stage inside places and whenever a caption is showing, so it never covers the caption.
  - `look(id)` also accepts a topic or place id (returns its host's look).
  - There is no way out of a place mid-talk except stepping through to the end (Right repeatedly). Worth a look if Phil wants a bail-out.
  - New icons: `brick` (why), `crab` (rewrites), `sign` (docs), `snake` (python). Colours: why pink, nf-core green, rewrites rust, agents blue, MultiQC orange, side purple, docs cyan, python yellow.
  - Hosts named Sam the Session Chair, Mo the Maintainer, Ferris the Crab, Ada the Agent, Rita the Reporter, Sid the Barista, Dot the Docent, Pip the Photographer. Ferris is drawn as a crab by the courtyard, the others as people.
- Known issues: in stage mode the sidebar strip now has eight bars and pushes the question and voter counts below the bottom edge (phase 8 drops the opener; it may still need tighter bars). Badge always says SPEAKER (hero variants are phase 3/7).


### Phase 7: venue-wide play and easter eggs

- Done (all in `docs/index.html`): the venue cat (ginger, white chest; only after the hackathon; wanders into the foyer and places, sits, washes, leaves; Action strokes it with hearts and "prrr"; three strokes and it follows through one door, and the next door closes on it), annoyance (third quick poke on a host, cameo or greeter gets "Yes?", "What now?", "Stop. It."; the sixth starts the fight), the fight (dust cloud with stars and fists, two hi-vis security staff march the hero out, outside by the entrance with "BADGE REVOKED"; the greeter then prints a VISITOR badge and the desk door goes straight back into the interrupted place), idle chat after 25 s (nearest NPCs chat, then "*taps watch*"), moonwalk with sparkles, the dance code (Left Right Left Right Action within 2 s, everyone dances 3 s; the Action is swallowed), the foyer coffee urn (cups stack, wobble at 10, fall and flood at 15, the cleaner comes over and mops), kicking both foyer plants (the cleaner sighs and sweeps them back), leaving mid-talk (exits added: foyer far left back to registration, registration far left outside; after the opener it rains and the next speaker waits with a laptop), Lukas/Luca get a line from each host on first entry, hackathon sticker on the hero, a carried hat, jittery walk after `egg('coffee')` until the next place is left, end screen shows found/total.
- Hooks for places: `g.visited(topic)`, `g.heroX()`, `g.carry(key, value)`. `photobooth.js` now carries its hat with `carry('hat')` so the engine draws it everywhere (the only place file touched). Hooks for phase 8: `Game.react(kind, n)` floats `clap`, `heart`, `laugh`, `coffee` or `star` icons up from the bottom (capped at 40 on screen); `Game.ovation()` makes every sprite hop for 4 s with a burst of claps.
- Decisions:
  - Place progress (st and beat) is kept only when a fight throws you out; a normal re-visit still starts fresh. Resuming skips the place's `enter`.
  - Right in a place during a fight cancels it on the spot (the egg is still recorded). In free-walk scenes the fight runs its 6 s course.
  - From the third quick host poke the place's own `poke('host')` is skipped in favour of the cross replies. Pokes more than 4 s apart reset the count.
  - The egg total is a static `EGGS` list in the engine (22 ids, place eggs included); `?debug` warns if an egg is recorded that is not in it. The foyer urn and the coffee place share the `coffee` egg. Idle chat and annoyance are not eggs.
  - "Every plant in the venue" means the two foyer plants.
  - The fight cloud covers the hero only; the poked NPC stays visible beside it (places draw their own hosts).
- Not done: phone reactions and the hidden phone egg (phase 8 wires `react`/`ovation`); victory jump for the golden star.
- Known issues: the cleaner walks the whole hall to reach far plants (15 s or so). The dance and ovation move sprites drawn with `person()` only, so the crab, the theatre audience and other custom-drawn NPCs stay still. The hat and sticker are not drawn while dancing.

### Phases 2–6: places

- Theatre (640 wide, 70-seat raked audience, latecomer, brick featurette), registration desk and foyer hub, hackathon room (12 beats, fills up over the talk), courtyard (gates, Ferris, races), cloakroom (two queues, rich-click terminal featurette, real benchmark numbers), poster hall (posters merge into one report, any-inputs machine, features featurette), coffee queue, docs corridor and photo booth.
- Engine additions on the way: Left on the first beat leaves a place early; Action with nothing in reach walks to the nearest prop on screen (so the clicker can reach everything); `drawFront` hook; prop prompts hidden mid-talk so they never cover the scene.

### Phase 8: live

- Opener left out of ranking end to end. Phones get reaction buttons (clap, heart, laugh, coffee) and a hidden seven-tap golden star. The worker batches reactions to the stage with the number of distinct phones in the last five seconds; the stage floats them up and gives a standing ovation when a third of connected phones (at least three) react together. Sidebar clock (amber at 30:00, red at 35:00) and a tighter sidebar that fits seven bars.

### Phase 9: checks

- Code review: no serious bugs. Fixed: idle NPC chatter firing mid-talk (would have happened on stage), ovation timing after a reset, the worker's reaction map growing forever, the dance code swallowing a B press on the menu, per-frame allocation.
- Playthrough: no errors or stuck states. Polish round launched for the coffee queue (least finished), clipped signs in the stage crop (courtyard, cloakroom, corridor), slow-starting beats (hackathon, posters, photo booth) and the theatre review beat.

