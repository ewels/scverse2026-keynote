# Places

Every place is a real space in a conference venue. Each has its own palette, layout and life (people moving, steam, flickering screens) so none looks like a recoloured copy. Sizes follow the topic: thick topics get big scrolling rooms, thin ones get a compact single screen.

Content sources for words and facts: Phil's website at `../phil.ewels.co.uk/src/content/projects/*.md(x)` (multiqc, nf-core, rewrites-bio, rustqc, rich-click, contributor-graphs, deckcal, gfm-tidy, nf-docs, starlight-quiz, starlight-pydocs, starlight-codeblocks, type-deck, mkdocs-quiz) and the repos next to this one in `..`. Captions stay short: Phil does the talking.

Every place must have:

- a host NPC with their own look,
- 3+ background people or objects that move on their own,
- 2+ props to poke with Action that do something visible,
- 1 secret easter egg, recorded with `egg()`,
- beats that each change something on screen.

## Registration desk (not a topic)

- **Look:** long desk with lanyards on hooks, a badge printer, a stack of tote bags, a queue barrier tape, a big "REGISTRATION" banner and a scverse 2026 roll-up. Glass entrance behind with the campus visible.
- **Play:** the greeter prints the hero's badge (big card: the badge with the hero's name and "SPEAKER"). One caption about voting: scan the QR, rank the rooms, ask questions. The theatre double doors at the right open with a "KEYNOTE: NOW" sign.
- **Pokes:** the badge printer (jams, spits out a long paper streamer), the tote bag stack (falls over), the bell on the desk (greeter glares after three rings).
- **Secret:** pick Lukas or Luca as hero and the greeter says they are not on the speaker list ("Organiser badge, then").

## Main lecture theatre: `why` (10 min, thick)

- **Look:** the biggest space. Raked rows of seats with 15+ audience sprites (back of heads, some laptops glowing), a podium with a lamp, a huge projector screen across the back wall, a lectern clock. Warm dark palette, spotlight on the podium.
- **Audience life:** heads bob, someone yawns, laptops flicker, a latecomer squeezes along a row.
- **Beats:**
  1. Podium: "Why bother writing software any more?" as a big card.
  2. Screen: vibe-coded tools. Paper planes fly across the screen, looping nicely, one nosedives.
  3. Screen: "Science needs more than 'it ran'". A paper plane crash-lands in the front row.
  4. Featurette `lego`: deterministic building blocks. A zoomed tabletop: bricks click together one per step, each labelled (same input same output; reusable; understandable; comparable). Five steps, the last shows the finished wall.
  5. Screen: agents assemble, blocks execute. A small robot picks up bricks (nf-core modules) and builds a pipeline shape.
  6. Front row: spend AI effort on the commons. Audience sprites stand and each add a brick to one shared wall on screen.
  7. Screen: a reviewer sprite with a magnifying glass finds three cracks the robot missed (each crack flashes red).
- **Pokes:** the podium water glass (hero drinks, then spills it), the projector (slides go blue "NO SIGNAL" for two seconds), a sleeping audience member (wakes with a start).
- **Secret:** poke the "NO SIGNAL" projector three times and the screen shows the game's own title screen, then the audience applauds.

## Hackathon room: `nfcore` (7–8 min, thick)

- **Look:** long tables, laptops covered in stickers, power strips, a whiteboard, pizza boxes, a big "nf-core hackathon" banner, a wall that becomes a photo wall. Bright green accents.
- **Beats** build the room up over the talk: it starts empty.
  1. Doorway: the back story. A single laptop on an empty table.
  2. Whiteboard: start with a shared vision. A problem gets drawn on the whiteboard.
  3. Whiteboard: agree on scope and methodology. A checklist appears.
  4. Laptop wall screen: a place to talk online. Chat bubbles pop up on a big screen.
  5. Tables: hackathons to meet real people. People stream in and sit at the tables.
  6. Doorway: make it somewhere people want to work. A newcomer arrives and gets a welcome (a sticker, a wave from every table).
  7. Photo wall: cat photos. Pixel cat photos appear all over the wall.
  8. Stamp desk: only as much bureaucracy as you need. One tiny desk with one rubber stamp.
  9. Clock: can't rush. The window behind cycles through the seasons and the room ages (posters fade, plants grow).
- **Pokes:** the pizza (slices vanish), a laptop (`nf-core lint` passes, then fails), the stamp desk (hero kicks the paperwork off; papers flutter).
- **Secret:** stamp the paperwork five times and an "APPROVED IN TRIPLICATE" form fills the screen.

## Outdoor courtyard: `rewrites` (5 min, medium)

- **Look:** an outdoor courtyard between buildings with large iron gates styled after Jurassic Park ("REWRITES.BIO" across the arch), palms in planters, a dinosaur statue, a small pond. Daylight palette, leaves blowing.
- **Host:** Ferris, the orange Rust crab (scuttles sideways, never walks forwards).
- **Beats:**
  1. Gates: big card with the quote "Your scientists were so preoccupied with whether or not they could, they didn't stop to think if they should".
  2. Signpost: when should you rewrite? A three-armed signpost: REWRITE / CONTRIBUTE UPSTREAM / COMBINE; the matching arm lights up on each of beats 2–4.
  3. Signpost: contribute upstream.
  4. Signpost: combine.
  5. Race track: RustQC. A small crab races an old tortoise across the courtyard.
  6. Race track: ruSTAR. A second race.
  7. Race track: FastQC-Rust. Third race; the crab wins and gets a medal.
- **Pokes:** the dinosaur statue (its eye blinks; the ground ripples like the water glass), the pond (ripples), Ferris (clicks claws).
- **Secret:** poke the dinosaur three times and it roars silently, the gates shut, and every NPC runs.

## Cloakroom: `agents` (5 min, medium)

- **Look:** a cloakroom counter with a long rail of coats behind it, numbered tickets, a "PLEASE TAKE A TICKET" sign, a second tall rail with a conveyor run by a small robot attendant. Two queues at the counter: humans and robots.
- **Beats:**
  1. Counter: cater to two audiences. A human and a robot step up at the same time.
  2. Robot rail: `llms.txt` and `.md` URLs. The robot gets a neat plain-text ticket, the human gets a pretty printed one.
  3. Robot rail: agent env vars. A sign flips: "AGENT MODE".
  4. Counter: AGENTS.md and project skills. The robot is handed a welcome pack.
  5. Coat mountain: context is everything. Without a ticket, the robot digs through a mountain of coats.
  6. Featurette `richclick`: the rich-click help story. A zoomed terminal: plain `--help` text, then the rich-click version, then the version an agent reads.
  7. Coat rail: token efficiency. One robot carries a huge stack of paper and wobbles; another carries a single card and zips past.
- **Pokes:** the ticket dispenser (spews tickets), the bell (robot answers instantly, human attendant much later), a coat (hero puts it on; it is far too big).
- **Secret:** take ten tickets and the robot hands back a coat that is the hero's own hoodie.

## Poster hall: `multiqc` (4–5 min, medium)

- **Look:** rows of poster boards on easels, a carpeted hall, people standing in front of posters with coffee, one poster presenter waving a pointer. Orange accents.
- **Beats:**
  1. Messy posters: what MultiQC does. Ten different-looking posters, one per tool.
  2. Messy posters: press Right and they fly together into one MultiQC report poster.
  3. Bin: works with any inputs. Random objects (a coffee cup, a shoe, and the cat only if the hackathon room has been visited) go in and come out as report sections.
  4. Feature posters, one beat each: config builder, licences and DOIs, ECharts, Parquet and preprocessing. Each zooms in as a featurette `poster` step.
  5. Empty board: "YOUR MODULE HERE". The call to action: nice log outputs with filename suffixes, and more MultiQC modules please.
- **Pokes:** a poster presenter (starts a long explanation; walk away and they follow), the coffee table (cups), an easel (wobbles, falls).
- **Secret:** poke the empty "YOUR MODULE HERE" board and the hero's sprite appears on it as a poster.

## Coffee break queue: `side` (2–3 min, thin)

- **Look:** a coffee table with urns, cups, biscuits and steam, and a queue of people. One screen, no scrolling.
- **Beats:** each person in the queue is a side project and steps forward in turn with a prop: contributor graphs (holding a chart), nf-docs (a book), nf-metro (a metro map), Stream Deck plugins (a glowing button pad), gfm-tidy (a broom). The last one in the queue is this game: a tiny arcade cabinet.
- **Pokes:** the coffee urn (see the coffee egg in `03-play.md`), the biscuits (vanish one by one), the queue (hero tries to skip it; everyone turns and stares).
- **Secret:** the arcade cabinet, when poked, shows a tiny version of the current scene, recursively.

## Corridor signage: `docs` (2 min, thin)

- **Look:** a corridor with wayfinding signs, a venue map on the wall, a noticeboard and arrows on the floor. One screen.
- **Beats:**
  1. Signs: good docs are signposts. Signs light up one by one.
  2. Noticeboard: starlight-codeblocks. Code snippets pinned up with highlights.
  3. Map: starlight-pydocs. The map fills in from the code.
  4. Quiz board: starlight-quiz. A big multiple-choice question appears; pressing Action picks an answer, wrong ones buzz red, the right one turns green.
- **Pokes:** a sign (spins to point the wrong way), the map ("YOU ARE HERE" moves to wherever the hero stands).
- **Secret:** turn every sign the wrong way and a lost attendee wanders in circles.

## Photo booth: `python` (2 min, thin)

- **Look:** a photo booth with a curtain and a flash, a strip printer outside, props on a stand (hats, glasses, a snake plushie). One screen.
- **Beats:**
  1. Booth: rich-click. A grey, plain CLI sprite goes in; flash; it comes out in full rich-click colours.
  2. Strip printer: starlight-pydocs. The photo strip that prints out is API docs made from the code.
- **Pokes:** the booth (the hero goes in; flash; a photo strip of the hero pulling faces prints), the props (hero wears a hat for the rest of the talk).
- **Secret:** take five photos and the strip prints the cat (if the hackathon room has been visited; otherwise a pigeon).

## Foyer hub

- **Look:** wide hall (640 px) with tall windows on to the campus, a high ceiling with hanging banners, a floor of warm tiles. Entrances along the hall: theatre double doors (closed after the opener), hackathon room door, poster hall archway, cloakroom counter hatch, glass door to the courtyard, corridor opening with signs, the coffee table and the photo booth (no doors; walk up to them). Q&A door at the far right.
- **Life:** people chatting in groups, someone on a phone, a cleaner with a mop, the plants (kickable).
- **Navigation:** each entrance shows its topic short name and icon. Visited places get a tick. The audience's top two get a "CROWD FAVOURITE" banner.
- **Pokes:** the plants (kick), the windows (hero waves; someone outside waves back), the other characters (cameos, as now).
