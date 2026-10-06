# Choose your own keynote

Phil Ewels' scverse 2026 keynote as a side-scrolling game, plus two phone companions for the talk itself.

- `docs/` is a static site for **GitHub Pages**: the game, the audience page and the moderator page. It stays online for free after the talk.
- `worker/` is a small **Cloudflare Worker** that syncs rankings and questions in real time. It only needs to run during the talk, and the free plan covers it.

## Addresses

With the repo published at `https://USER.github.io/REPO/`:

| Address | Who | What |
| --- | --- | --- |
| `/` | Anyone | The game. Stays up after the talk. |
| `/?stage&key=KEY` | You, on the laptop | The game plus QR code, short link, ranking bars and questions up next |
| `/join/` | Audience | Rank the topics once, send and vote on questions, get the game link at the end |
| `/mod/?key=KEY` | You, on your phone | Put questions on screen, mark them answered, dismiss them |

The QR code on stage points at `/join/` on whatever site you opened the stage on. A custom domain on GitHub Pages gives a shorter link to read out.

## Set up

1. **GitHub Pages.** Push this repo to GitHub, then go to Settings → Pages → Build and deployment. Choose "Deploy from a branch", pick `main` and `/docs`, and save.
2. **Worker.**
   ```sh
   cd worker
   npm install
   npx wrangler login
   npx wrangler secret put PRESENTER_KEY    # any long random string
   npx wrangler deploy
   ```
3. **Connect them.** Paste the URL the deploy prints into `LIVE_URL` in `docs/config.js`, then commit and push.

## Before the talk

1. On the laptop, open `/?stage&key=KEY` and press F for full screen. Full screen also hides the address bar, and with it the key.
2. Click "Reset votes and questions" above the game to clear rehearsal data.
3. On your phone, open `/mod/?key=KEY` once. It remembers the key, so add it to your home screen.
4. The dots on the stage sidebar and the moderator page turn green when they're connected.

If the connection drops during the talk, the game carries on and the bars just stop moving.

## After the talk

The game at `/` keeps working with no backend. To switch the live parts off, set `LIVE_URL` back to `''` and push; the audience page then says voting is closed and links to the game. You can also delete the Worker with `npx wrangler delete`, or leave it, since it costs nothing idle.

## How it behaves

- **Rankings.** Everyone arranges the topics from a shuffled start and taps Submit, then gets told to put their phone away. Scoring is a Borda count over rooms not yet visited: with n rooms left, a first choice is worth n points and a last choice 1. A room's bar disappears once you walk into it.
- **Questions.** Name plus up to 140 characters, at most 3 unanswered per phone, 20 seconds apart. Everyone sees the open questions, most votes first, and can vote up any except their own. Dismissed questions disappear for everyone but the asker, who still sees theirs as sent. Anything you put on screen is brought up by a character with a "?", and reading it out in the game marks it answered.
- **Moderator page.** Two tabs: **New**, most votes first, and **On screen**, in the order they'll come up in the game. The New count flashes if a question arrives while you're on the other tab. Every action has a few seconds of Undo. The page keeps your phone awake, and buzzes on Android when a question arrives.
- **End of the talk.** Audience phones switch to a link to the game.

Limits are at the top of `worker/src/worker.js`. Topic titles, blurbs and colours are in `TOPICS` in `docs/index.html`, and the phone page picks them up from the stage.

## Run it locally

```sh
cd worker && cp .dev.vars.example .dev.vars && npx wrangler dev      # backend on :8787, key "dev"
cd docs && python3 -m http.server 8000                               # site on :8000
```

Open `http://localhost:8000/?stage&key=dev`, `http://localhost:8000/join/` and `http://localhost:8000/mod/?key=dev`. On localhost `config.js` points at the local Worker by itself.

## Credits

Fonts: Silkscreen and VT323, SIL Open Font License 1.1 (`docs/fonts/`). QR codes: qrcode-generator by Kazuhiko Arase, MIT licence (`docs/vendor/qrcode.js`).
