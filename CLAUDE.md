# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## What this is

A conference keynote presented as a pixel-art side-scrolling game, plus phone companion pages for live audience ranking and Q&A. There is no build step, no bundler and no test suite: the pages are hand-written HTML with inline CSS/JS, and the backend is one Worker file.

- `docs/` — static site. During the talk the Worker serves it; afterwards it moves to GitHub Pages (`main:/docs`) with live features off. `index.html` is the game (and the stage view with `?stage`), `join/` is the audience phone page, `mod/` is the presenter's moderation phone page.
- `worker/` — Cloudflare Worker + one SQLite-backed Durable Object (`Room`, fixed id `keynote`) that holds all live state and talks to every client over a single WebSocket endpoint, `/api/ws`. Every other path goes to the `ASSETS` binding, which serves `../docs`.

## Project rules

- No build step, bundler, framework or new runtime dependencies in `docs/`.
- Classic `<script>` tags only, no ES modules: `docs/index.html` must still run straight from disk (`file://`) with live features off.
- Clicker keys must keep working: ArrowLeft/ArrowRight and PageUp/PageDown walk, choose and continue; Space, Enter, B and Shift+F5 take action. F5 must never reload the page.
- Don't change gameplay, art or wording unless asked. All art is drawn in code; no image assets.
- British English in anything user-facing.
- Keep diffs small; don't reformat whole files.
- Never deploy, push, make the repo public or touch GitHub Pages settings. The repo stays private until after the talk.

## Running locally

```sh
cd worker && cp .dev.vars.example .dev.vars && npx wrangler dev   # site and backend on :8787, presenter key "dev"
```

Then open `http://localhost:8787/?stage&key=dev`, `/join/` and `/mod/?key=dev`. `docs/config.js` points the pages at their own origin, except on `*.github.io` and `file://`, where live features are off and the game still works.

Verify changes by driving the pages in a browser — there are no automated tests.

## Architecture

**Live protocol.** Clients connect to `/api/ws?role=presenter|mod|audience&key=…&device=…`. Presenter and mod roles require `PRESENTER_KEY`; audience is rate-limited by a per-socket token bucket. All state lives in one object `s` (stored under storage key `'s'`) and is rewritten on every change. Broadcasts are coalesced to one per 250 ms, and `messageFor()` tailors the payload per role: the presenter gets only promoted questions in order, the mod gets every question with vote counts, and audience phones get open questions plus their own dismissed ones (shown to the asker as still "new").

**Message types** (the `t` field) are the contract between the pages and `worker/src/worker.js` — change both sides together:
- presenter → `config`, `visited`, `asked`, `ended`, `reset`
- mod → `promote`, `unpromote`, `restore`, `answered`, `dismiss`, `reset`
- audience → `rank`, `upvote`, `ask`
- server → `state` (plus `pong` for the `ping` keepalive, auto-answered by the Durable Object)

**Topics are defined once, on stage.** `TOPICS` in `docs/index.html` is the source of truth. When the stage connects it sends a `config` message with titles, colours, blurbs and pixel icons, and the worker stores and re-broadcasts that, so the phone pages render topics from server state and never hard-code them. Any new topic field the phones need must also be added to the worker's `config` sanitiser, which drops unknown fields.

**Ranking.** Borda count over rooms not yet visited, computed in `Room.shared()`. Walking into a room in the game sends `visited`, which removes its bar.

**Questions on stage.** Questions the mod promotes are brought up in the game by a character with a "?"; dismissing that dialog sends `asked`, which marks them answered.

**Game page (`docs/index.html`).** One IIFE split by `/* ===== section ===== */` banners: characters (`EDIT ME`), content (`TOPICS`, `FORKS` route layout, `ICONS` as string pixel maps), input (keyboard/clicker map in `KEYMAP`), overlays, the `Live` object (WebSocket, QR code, sidebar bars), canvas pixel helpers, sprites (12×20 built from `look` objects), scenes, and the main loop. The game runs with no backend; `Live.send` is a no-op unless the URL has `?stage` and an API URL is set. The presenter key is moved from the URL into `sessionStorage` and stripped from the address bar.

Limits (question length, cooldowns, max open per phone, etc.) are constants at the top of `worker/src/worker.js`. Vendored assets (`docs/fonts/`, `docs/vendor/qrcode.js`) are third-party; don't edit them.
