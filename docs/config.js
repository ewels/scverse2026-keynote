// Where the live backend (the Cloudflare Worker in ../worker) runs. During the
// talk the Worker serves these pages too, so it's the same origin. On GitHub
// Pages, and from disk, the live features are off: the game still works, and
// the phone pages tell people live voting is closed.
window.KEYNOTE_API = location.hostname.endsWith('github.io') ? '' : location.origin;
