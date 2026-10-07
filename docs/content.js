// The talk's content. Edit this file to write the talk; the engine is in index.html.
// Plain script, not a module, so index.html still runs straight from disk.
//
// CHARACTERS  The player picks one on the select screen (max 3, drawn left to right;
//             the last is the default hero). The others stand in the foyer, say their
//             cameo when poked, and the first of them carries audience questions.
//   id, name, handle, accent (hex colour)
//   look      sprite: skin, hair, hairStyle (short | messy | long | swept | bald | antenna),
//             eye, beard, beardColour, glasses, top, topStyle (tee | sweat | hoodie),
//             logo (a LOGOS key), logoColour, pants, shoes
//   facts     [label, value] rows on the character card
//   bars      [label, 0-100] stat bars on the card
//   lore      bullet points on the card
//   special   "Special move: ..." line on the card
//   cameo     what they say in the foyer
//
// TOPICS      One place each, keyed by a short id. The stage sends these to the phones.
//   title     place name, shown on entrances, prompts and phones
//   short     entrance sign and ranking bar label (keep it under ~8 characters)
//   colour    hex colour for the entrance, place and bar
//   icon      an ICONS key
//   blurb     one or two sentences shown on the phones while ranking
//   place     the docs/places/<place>.js that draws it
//   size      thick | medium | thin
//   opener    true on the topic that opens the talk (never voted on)
//   host      the NPC who presents with you: { name, look } (look as for a character)
//   beats     the talk, in order; Right steps to the next one. Each beat:
//     at       focus id in the place; the hero walks there
//     say      optional caption (one short line, under ~60 characters)
//     who      'host' puts the host's name on the caption
//     big      optional huge text card for this beat
//     feature  optional featurette id from the place; its steps are extra Right presses
//     steps    optional captions, one per featurette step
//     id       optional id passed to the place's beat(); defaults to at
//
// GREETER     The registration desk character: name, colour, look.
// OUTRO       Shown on the Q&A screen.
// ICONS       Pixel art as rows of characters: o = topic colour, a = lighter colour,
//             w = white, k = near-black, anything else = transparent.
// LOGOS       Pixel logos for a sprite's top: rows use l = logoColour, n = brown,
//             w = white; r and c are the top-left row and column on the 12x20 sprite.
(() => {
'use strict';

const CHARACTERS = [
  { id:'lukas', name:'Lukas', handle:'@zethson', accent:'#76b900',
    look:{ skin:'#efc6a3', hair:'#3a2a1f', hairStyle:'short', beard:false, glasses:false, top:'#151515', topStyle:'tee', logo:'chip', logoColour:'#76b900', pants:'#2b3445', shoes:'#e9e9e9' },
    facts:[['Name','Lukas Heumos'],['Class','GPU enthusiast'],['Guild','scverse'],['Quests','pertpy, operations'],['Status','Not presenting today']],
    bars:[['Organising',99],['Green-ness',100],['Keynote slot',0]],
    lore:['Co-organises this conference','Would happily give this talk','Is not giving this talk'],
    special:'Accelerate everything',
    cameo:'Bold choice. I would have picked me.' },
  { id:'luca', name:'Luca', handle:'@LucaMarconato', accent:'#ef5a4f',
    look:{ skin:'#eec39d', hair:'#2a1f18', hairStyle:'messy', beard:false, glasses:false, top:'#c8322c', topStyle:'sweat', pants:'#2f3a4f', shoes:'#1b1b1b' },
    facts:[['Name','Luca Marconato'],['Class','Spatial explorer'],['Guild','scverse'],['Quest','spatialdata'],['Status','Not presenting today']],
    bars:[['Spatial awareness',99],['Jumper redness',100],['Keynote slot',0]],
    lore:['Co-organises this conference','Knows where everything is','Still not on stage'],
    special:'Map the room',
    cameo:'Good luck up there!' },
  { id:'phil', name:'Phil', handle:'@ewels', accent:'#2ec4b6',
    look:{ skin:'#f6d3bd', hair:'#4a403a', hairStyle:'messy', beard:false, glasses:false, top:'#111111', topStyle:'hoodie', logo:'nfcore', logoColour:'#3cc8b4', pants:'#2f3a55', shoes:'#1b1b1b' },
    facts:[['Name','Phil Ewels'],['Class','Product Manager, Open Source'],['Guild','Seqera'],['Base','Stockholm, via the UK']],
    bars:[['Open source',99],['Community',96],['QC reports',100],['Slide decks',0]],
    lore:['Co-founded nf-core','Created MultiQC','Works on Nextflow and nf-core','Makes the Nextflow Podcast'],
    special:'Summon a MultiQC report',
    cameo:"Hey, that's my talk!" },
];

const TOPICS = {
  why:      { title:'Why bother writing software?', short:'WHY', colour:'#ff6f91', icon:'brick', place:'theatre', size:'thick', opener:true,
              blurb:'If an agent can write a tool in minutes, why build software carefully at all? Deterministic building blocks, and spending AI effort on the commons.',
              host:{ name:'Sam the Session Chair', look:{ skin:'#d9a27c', hair:'#5a3d2b', hairStyle:'swept', glasses:true, top:'#3a3550', topStyle:'sweat', pants:'#2b2b36' } },
              beats:[
                { at:'podium', big:'Why bother writing software any more?' },
                { at:'screen', id:'vibes', say:'Vibe-coded tools: fast, private, disposable' },
                { at:'edge', id:'ran', say:'Science needs more than “it ran”' },
                { at:'table', feature:'lego', say:'Deterministic building blocks',
                  steps:['Same input, same output, every time','Reusable: validate once, use everywhere','Understandable: read once, trust everywhere','Comparable: same tool, comparable results','Small, tested, composable'] },
                { at:'screen', id:'assemble', say:'Agents assemble, blocks execute' },
                { at:'front', id:'commons', say:'Spend AI effort on the commons' },
                { at:'screen', id:'review', say:'Someone else always finds more' },
              ] },
  nfcore:   { title:'Community building with nf-core', short:'NF-CORE', colour:'#3cc87a', icon:'core', place:'hackathon', size:'thick',
              blurb:'What building nf-core taught us about growing an open-source community: a shared problem, real welcomes, and patience.',
              host:{ name:'Mo the Maintainer', look:{ skin:'#f2c9a0', hair:'#d9a441', hairStyle:'swept', top:'#3cc87a', topStyle:'tee', pants:'#3b4a3f' } },
              beats:[
                { at:'door', id:'story', say:'2018: every lab writing its own pipelines' },
                { at:'board', id:'vision', say:'Start with a shared vision and a shared problem' },
                { at:'board', id:'scope', say:'Agree on scope and methodology' },
                { at:'screen', id:'chat', say:'A place to talk online' },
                { at:'tables', id:'hackathon', say:'Hackathons: meet real people' },
                { at:'tables', id:'workplace', say:'Make it somewhere people want to work' },
                { at:'tables', id:'trust', say:'Trust people to get on with it' },
                { at:'start', id:'docs', say:'Docs and onboarding' },
                { at:'tables', id:'welcomes', say:'Put real time into welcomes' },
                { at:'photos', id:'cats', say:'Cat photos', who:'host' },
                { at:'stamp', id:'bureaucracy', say:'Only as much bureaucracy as you need' },
                { at:'clock', id:'time', say:'You can’t rush it' },
              ] },
  rewrites: { title:'rewrites.bio', short:'REWRITES', colour:'#e0602e', icon:'crab', place:'courtyard', size:'medium',
              blurb:'Rewriting bioinformatics tools in Rust: when you should, when to contribute upstream instead, and RustQC, ruSTAR and FastQC-Rust.',
              host:{ name:'Ferris the Crab', look:{ skin:'#f07a3a', hair:'#c8501e', hairStyle:'bald', eye:'#1b1b1b', top:'#e0602e', topStyle:'tee', pants:'#c8501e', shoes:'#a8401a' } },
              beats:[
                { at:'gates', big:'“Your scientists were so preoccupied with whether or not they could, they didn’t stop to think if they should”' },
                { at:'sign', id:'rewrite', say:'When should you rewrite?' },
                { at:'sign', id:'upstream', say:'When should you contribute upstream?' },
                { at:'sign', id:'combine', say:'When should you do both?' },
                { at:'track', id:'rustqc', say:'RustQC: six QC tools in one pass' },
                { at:'track', id:'rustar', say:'ruSTAR: the STAR aligner, in Rust' },
                { at:'track', id:'fastqc', say:'FastQC-Rust: speed-ups sent back upstream' },
              ] },
  agents:   { title:'Building tools for agents', short:'AGENTS', colour:'#6c8cff', icon:'robot', place:'cloakroom', size:'medium',
              blurb:'Your tools now have two audiences: people and AI agents. llms.txt, agent env vars, AGENTS.md, and why context is everything.',
              host:{ name:'Ada the Agent', look:{ skin:'#c4ced8', hair:'#7d8a99', hairStyle:'antenna', eye:'#ff4d4d', top:'#6c8cff', topStyle:'sweat', pants:'#4a5563', shoes:'#2b2f36' } },
              beats:[
                { at:'counter', id:'two', say:'Your tools now have two audiences' },
                { at:'counter', id:'llms', say:'llms.txt and .md URLs: plain text for agents' },
                { at:'rail', id:'env', say:'Agents announce themselves: env vars' },
                { at:'counter', id:'skills', say:'AGENTS.md and project skills: a welcome pack' },
                { at:'pile', id:'context', say:'Context is everything' },
                { at:'rail', id:'richclick', feature:'richclick', say:'The rich-click help story',
                  steps:['Plain click --help','rich-click: help that people enjoy reading','Agent mode: the same help, without the boxes'] },
                { at:'coats', id:'tokens', say:'Token efficiency: same help, a quarter of the size' },
              ] },
  multiqc:  { title:'MultiQC', short:'MULTIQC', colour:'#f5a623', icon:'bars', place:'posters', size:'medium',
              blurb:'What MultiQC does, what is new (config builder, licences and DOIs, ECharts, Parquet), and how you can help.',
              host:{ name:'Rita the Reporter', look:{ skin:'#e8b894', hair:'#8b2f2f', hairStyle:'long', top:'#f5a623', topStyle:'sweat', pants:'#2e3a4f' } },
              beats:[
                { at:'messy', id:'messy', say:'Every tool reports differently' },
                { at:'messy', id:'merge', say:'MultiQC: one report for all of them' },
                { at:'bin', id:'inputs', say:'Works with any inputs' },
                { at:'features', feature:'poster', say:'What’s new',
                  steps:['Config builder','Licences and DOIs','ECharts plots','Parquet and preprocessing'] },
                { at:'empty', id:'logs', say:'Write nice logs, with filename suffixes' },
                { at:'empty', id:'modules', say:'More MultiQC modules, please!', who:'host' },
              ] },
  side:     { title:'Side projects', short:'SIDE', colour:'#b28dff', icon:'pad', place:'coffee', size:'thin',
              blurb:'AI means you can build the crazy ideas: contributor graphs, nf-docs, nf-metro, Stream Deck plugins and gfm-tidy.',
              host:{ name:'Sid the Barista', look:{ skin:'#e8b894', hair:'#b28dff', hairStyle:'messy', top:'#2b2140', topStyle:'hoodie', logo:'chip', logoColour:'#b28dff', pants:'#3b3150' } },
              beats:[
                { at:'urn', id:'intro', say:'AI means you can build the crazy ideas' },
                { at:'graphs', say:'Contributor graphs: who built it, and when' },
                { at:'docs', say:'nf-docs: API docs from pipeline code' },
                { at:'metro', say:'nf-metro: pipelines as metro maps' },
                { at:'deck', say:'Stream Deck plugins, like DeckCal' },
                { at:'tidy', say:'gfm-tidy: unwrap what the AI wrote' },
                { at:'game', say:'And this game, obviously', who:'host' },
              ] },
  docs:     { title:'Building awesome docs sites', short:'DOCS', colour:'#2ec4d6', icon:'sign', place:'corridor', size:'thin',
              blurb:'Documentation sites people actually enjoy: starlight-quiz, starlight-pydocs and starlight-codeblocks.',
              host:{ name:'Dot the Docent', look:{ skin:'#a86f4c', hair:'#1f1f1f', hairStyle:'short', glasses:true, top:'#2ec4d6', topStyle:'hoodie', pants:'#263042' } },
              beats:[
                { at:'signs', say:'Good docs are signposts' },
                { at:'board', say:'starlight-codeblocks: 26 features for code' },
                { at:'map', say:'starlight-pydocs: the map fills in from code' },
                { at:'quiz', say:'starlight-quiz: quizzes in plain markdown' },
              ] },
  python:   { title:'Python tooling', short:'PYTHON', colour:'#ffd43b', icon:'snake', place:'photobooth', size:'thin',
              blurb:'Small Python tools that make a big difference: rich-click and starlight-pydocs.',
              host:{ name:'Pip the Photographer', look:{ skin:'#efc6a3', hair:'#3a2a1f', hairStyle:'long', top:'#3776ab', topStyle:'tee', pants:'#2b3445' } },
              beats:[
                { at:'booth', id:'richclick', say:'rich-click: command-line help in colour' },
                { at:'printer', id:'pydocs', say:'starlight-pydocs: API docs from your code' },
              ] },
};
const GREETER = { name:'Greeter', colour:'#ff8fa3', look:{ skin:'#c98e62', hair:'#2b2b2b', hairStyle:'long', top:'#e85d75', topStyle:'tee', pants:'#394257' } };
const OUTRO = ['THANKS!','Questions?'];
const ICONS = {
  robot:['....aa....','....aa....','.oooooooo.','.owwoowwo.','.owkoowko.','.oooooooo.','.oowwwwoo.','.oooooooo.','...o..o...','..oo..oo..'],
  core:['.....k.....','.....kaa...','..ooooooo..','.ooooooooo.','..wwwwwww..','...wwkww...','....www....','...wwkww...','..wwwwwww..','.ooooooooo.','..ooooooo..','....ooo....'],
  bars:['.......aa.','.......aa.','....oo.aa.','....oo.aa.','.ww.oo.aa.','.ww.oo.aa.','.ww.oo.aa.','.ww.oo.aa.','kkkkkkkkkk'],
  pad:['..oooooooo..','.oooooooooo.','ooowooooaooo','oowwwooakaoo','ooowooooaooo','oooooooooooo','oooo....oooo','ooo......ooo'],
  brick:['.aa..aa..aa.','.oo..oo..oo.','oooooooooooo','oaaaaaaaaaao','oooooooooooo','oooooooooooo','oooooooooooo'],
  crab:['oo........oo','o.o.w..w.o.o','oo..k..k..oo','.o.oooooo.o.','..oooooooo..','.oooaaaaooo.','.oooooooooo.','o.o.o..o.o.o'],
  sign:['.....ww.....','oooooooooo..','oowwwwwwooo.','oooooooooo..','.....ww.....','..aaaaaaaaaa','.aaawwwwwwaa','..aaaaaaaaaa','.....ww.....','.....ww.....'],
  snake:['..oooo......','.owoooo.....','.oooooo.....','....ooo.....','..aaaaoo....','.aaa...ooo..','.aa.....oo..','.aaaaaaaoo..','..aaaaaaa...'],
  chip:['..w.w.w.w..','.ooooooooo.','woaaaaaaaow','.oakkkkkao.','woakkkkkaow','.oakkkkkao.','woaaaaaaaow','.ooooooooo.','..w.w.w.w..'],
};
const LOGOS = { chip:{ r:10, c:5, rows:['lll','l.l','lll'] }, nfcore:{ r:10, c:3, rows:['l....l','.l..l.','..ll..','.l..l.','l....l'] } };

window.KEYNOTE_CONTENT = { CHARACTERS, TOPICS, GREETER, OUTRO, ICONS, LOGOS };
})();
