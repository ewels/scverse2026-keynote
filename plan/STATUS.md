# Status

## Progress

- [x] Plan written
- [ ] Phase 1: engine
- [ ] Phase 2: lecture theatre
- [ ] Phase 3: registration desk and foyer hub
- [ ] Phase 4: hackathon room, courtyard
- [ ] Phase 5: cloakroom, poster hall
- [ ] Phase 6: coffee queue, corridor, photo booth
- [ ] Phase 7: venue-wide play and easter eggs
- [ ] Phase 8: live changes
- [ ] Phase 9: final checks

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

(Added as they come up.)

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
