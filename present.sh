#!/bin/sh
# Opens the keynote pages with the presenter key and address from .env, so neither needs copying by hand.
set -eu
cd "$(dirname "$0")"

command -v gum >/dev/null || { echo "Needs gum: brew install gum"; exit 1; }
KEY=$(sed -n 's/^PRESENTER_KEY=//p' .env 2>/dev/null)
BASE="${KEYNOTE_URL:-$(sed -n 's/^KEYNOTE_URL=//p' .env 2>/dev/null)}"
[ -n "$KEY" ] || { gum style --foreground 1 "No PRESENTER_KEY in .env"; exit 1; }
[ -n "$BASE" ] || { gum style --foreground 1 "No KEYNOTE_URL in .env"; exit 1; }

BOTH="Start the talk: open the stage here and copy the moderator link for your phone"
SEP="──────────"
STAGE="Stage only: open the game on this laptop"
MOD="Moderator: open on this laptop"
COPY="Moderator: copy the link for your phone"
JOIN="Audience page: check what phones see"

stage() { open "$BASE/?stage&key=$KEY"
          gum style --foreground 212 "Press F for full screen. Then \"Reset votes and questions\" if you rehearsed."; }
copy()  { printf '%s' "$BASE/mod/?key=$KEY" | pbcopy
          gum style --foreground 212 "Moderator link copied. Paste it into Safari on your phone; the page remembers the key after that."; }

gum style --border rounded --padding "0 2" --border-foreground 212 "scverse 2026 keynote" "$BASE"
case "$(gum choose "$BOTH" "$SEP" "$STAGE" "$MOD" "$COPY" "$JOIN")" in
  "$BOTH")  stage; copy ;;
  "$STAGE") stage ;;
  "$MOD")   open "$BASE/mod/?key=$KEY" ;;
  "$COPY")  copy ;;
  "$JOIN")  open "$BASE/join/" ;;
esac
