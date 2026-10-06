// Where the live backend (the Cloudflare Worker in ../worker) runs during the talk.
// Paste the URL that `npx wrangler deploy` prints, e.g. 'https://keynote-live.you.workers.dev'.
// Leave it empty to switch the live features off: the game still works, and the
// phone pages tell people live voting is closed.
const LIVE_URL = '';

// Running locally? Use the Worker from `npx wrangler dev` instead.
window.KEYNOTE_API = /^(localhost|127\.0\.0\.1)$/.test(location.hostname) ? 'http://127.0.0.1:8787' : LIVE_URL;
