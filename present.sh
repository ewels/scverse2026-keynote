#!/bin/sh
# Opens the keynote pages with the presenter key and address from .env, so neither needs copying by hand.
set -eu
cd "$(dirname "$0")"

command -v gum >/dev/null || { echo "Needs gum: brew install gum"; exit 1; }
KEY=$(sed -n 's/^PRESENTER_KEY=//p' .env 2>/dev/null)
BASE="${KEYNOTE_URL:-$(sed -n 's/^KEYNOTE_URL=//p' .env 2>/dev/null)}"
need()  { [ -n "$KEY" ] || { gum style --foreground 1 "No PRESENTER_KEY in .env"; exit 1; }
          [ -n "$BASE" ] || { gum style --foreground 1 "No KEYNOTE_URL in .env"; exit 1; }; }

BOTH="Start the talk: open the stage here and copy the moderator link for your phone"
SEP="──────────"
STAGE="Stage only: open the game on this laptop"
MOD="Moderator: open on this laptop"
COPY="Moderator: copy the link for your phone"
JOIN="Audience page: check what phones see"
LOCAL="Local dev: run wrangler dev and open stage, audience and moderator pages"

stage() { open "$BASE/?stage&key=$KEY"
          gum style --foreground 212 "Press F for full screen. Then \"Reset votes and questions\" if you rehearsed."; }
copy()  { printf '%s' "$BASE/mod/?key=$KEY" | pbcopy
          gum style --foreground 212 "Moderator link copied. Paste it into Safari on your phone; the page remembers the key after that."; }
local_dev() {
  [ -f worker/.dev.vars ] || cp worker/.dev.vars.example worker/.dev.vars
  LKEY=$(sed -n 's/^PRESENTER_KEY=//p' worker/.dev.vars); L=http://localhost:8787
  (cd worker && npx wrangler dev) & PID=$!
  trap 'trap - EXIT; kill 0' EXIT INT TERM
  until curl -sf "$L/" >/dev/null; do kill -0 $PID 2>/dev/null || exit 1; sleep 0.5; done
  open "$L/join/"; open "$L/mod/?key=$LKEY"; open "$L/?stage&key=$LKEY"
  gum style --foreground 212 "Serving $L from docs/; edits show on reload. Ctrl+C to stop."
  wait $PID; }

gum style --border rounded --padding "0 2" --border-foreground 212 "scverse 2026 keynote" "${BASE:-no KEYNOTE_URL in .env}"
case "$(gum choose "$BOTH" "$LOCAL" "$SEP" "$STAGE" "$MOD" "$COPY" "$JOIN")" in
  "$BOTH")  need; stage; copy ;;
  "$STAGE") need; stage ;;
  "$MOD")   need; open "$BASE/mod/?key=$KEY" ;;
  "$COPY")  need; copy ;;
  "$JOIN")  need; open "$BASE/join/" ;;
  "$LOCAL") local_dev ;;
esac
