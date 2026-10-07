# Keynote rebuild plan

The game becomes a walk through a conference venue. Each topic has its own place in the venue, each place is drawn and animated differently, and the talk is driven by stepping through focus objects in the room rather than reading speech-bubble bullets. The venue is full of things to poke and easter eggs to find.

This folder is the working plan. Phases are done in order, each by one or more subagents, and the head session checks and commits after each phase.

- [01-engine.md](01-engine.md): flow, room framework, step-through, content schema
- [02-places.md](02-places.md): every location, what it looks like, its beats and its secrets
- [03-play.md](03-play.md): interactivity and easter eggs that run across the whole venue
- [04-live.md](04-live.md): phone and backend changes (voting without the opener, reactions, clock)
- [05-checks.md](05-checks.md): how each phase and the final build are verified
- [STATUS.md](STATUS.md): progress log, decisions made along the way, open questions for Phil

## What Phil asked for

- No location is reused. Every topic has its own distinct place, sized to how big the topic is.
- Places are real conference spaces only. No sponsor booths, no server rooms.
- Lots of interactivity with the world and lots of easter eggs (start a fight and get thrown out, stroke the cat when it appears, pour far too much coffee).
- Inside a place, the clicker's right key steps through focus objects as Phil talks. Visuals do the work, not bullet text.
- Zoomed-in featurettes for some moments (building with Lego bricks, for example).
- No sound. It is a presentation.
- Phil cares about how it looks and plays. Code decisions are delegated.

## The talk

45 minute slot including questions, so about 35 minutes of talking. The opener is fixed. The audience ranks the rest from their phones.

| Topic id | Topic | Size | Mins | Place |
|---|---|---|---|---|
| `why` | Why bother writing software any more? (opener, not voted) | Thick | 10 | Main lecture theatre |
| `nfcore` | Community building with nf-core | Thick | 7–8 | Hackathon room |
| `rewrites` | rewrites.bio | Medium | 5 | Outdoor courtyard |
| `agents` | Building tools for agents | Medium | 5 | Cloakroom |
| `multiqc` | MultiQC | Medium | 4–5 | Poster hall |
| `side` | Side projects | Thin | 2–3 | Coffee break queue |
| `docs` | Building awesome documentation sites | Thin | 2 | Corridor signage |
| `python` | Python tooling | Thin | 2 | Photo booth |

The registration desk is not a topic. It is where Phil explains voting at the start.

## Flow

1. Title menu, character select (unchanged).
2. Outside on the DTU campus (unchanged), walk to Building 101.
3. Registration desk: collect a badge with the hero's name, the greeter explains voting, the QR code is on screen.
4. The main lecture theatre opens. Phil gives the opener there.
5. The foyer hub: one wide hall with an entrance to every other place. The audience's top two picks get a "crowd favourite" banner and arrows. Phil can walk into any of them.
6. Each place is played by stepping through its focus objects, then Phil walks out back to the foyer.
7. A Q&A door at the far end of the foyer ends the talk at any time. A clock in the sidebar shows how long the talk has run.

## Build order

| Phase | What | File |
|---|---|---|
| 1 | Engine: flow, room framework, step-through, featurettes, toasts, content schema, tests | 01 |
| 2 | Main lecture theatre with the Lego featurette | 02 |
| 3 | Registration desk and the foyer hub | 02 |
| 4 | Hackathon room, courtyard | 02 |
| 5 | Cloakroom, poster hall | 02 |
| 6 | Coffee queue, corridor, photo booth | 02 |
| 7 | Venue-wide play and easter eggs | 03 |
| 8 | Live changes: voting without the opener, phone reactions, clock | 04 |
| 9 | Full check, fix list, final review | 05 |

## How the work is run

- The head session keeps context small. Each phase goes to a subagent with a self-contained brief: this folder, `CLAUDE.md`, the files it may touch and the checks it must pass.
- Subagents never commit or push. The head session reviews the diff, runs `npm test`, and commits unsigned (`git commit --no-gpg-sign`) after each phase that passes.
- Places live in separate files (`docs/places/<place>.js`) so two subagents can build two places at once without touching the same file. Only `docs/content.js` is shared, and each agent edits only its own topic's block.
- Only one process at a time may run `npm test`, because it starts `wrangler dev` on a fixed port. Place agents check their work with `agent-browser` against `docs/index.html?debug` opened from disk and leave the full test run to the head session.
- Decisions made without Phil are logged in `STATUS.md` so they can be reversed in the morning.
