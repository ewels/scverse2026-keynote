// The talk's content. Edit this file to write the talk; the engine is in index.html.
// Plain script, not a module, so index.html still runs straight from disk.
//
// CHARACTERS  The player picks one on the select screen (max 3, drawn left to right;
//             the last is the default hero). The others stand in the foyer, say their
//             cameo when talked to, and the first of them carries audience questions.
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
// TOPICS      One room each, keyed by a short id. The stage sends these to the phones.
//   title     room name, shown on doors, prompts and phones
//   short     door sign and ranking bar label (keep it under ~8 characters)
//   colour    hex colour for the door, room and bar
//   npc       name of the character in the room
//   icon      an ICONS key
//   blurb     one or two sentences shown on the phones while ranking
//   look      the NPC's sprite, same fields as a character's look
//   lines     what the NPC says, one dialogue line each
//   bonus     true only for TOPICS.side, the secret room behind the kicked-over plant
//
// FORKS       The order of door choices in the foyer: [left topic, right topic] per fork.
//             The game ends after the last fork. TOPICS.side must exist.
// GREETER     The info-desk character: name, colour, look.
// OUTRO       What the greeter says once every fork is done.
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
  agents:   { title:'Agents need rigour', short:'AGENTS', colour:'#34c38f', npc:'Ada the Agent', icon:'robot',
              blurb:'AI agents can write pipelines in minutes. How Nextflow and nf-core modules bring testing and reproducibility to agentic development, with ruSTAR as a case study.',
              look:{ skin:'#c4ced8', hair:'#7d8a99', hairStyle:'antenna', eye:'#ff4d4d', top:'#34c38f', topStyle:'sweat', pants:'#4a5563', shoes:'#2b2f36' },
              lines:['Agents write pipelines fast. Who checks them?','nf-core modules: tested, versioned building blocks','Case study: ruSTAR','Reproducibility as the guardrail'] },
  community:{ title:'Lessons from nf-core', short:'NF-CORE', colour:'#58b85c', npc:'Mo the Maintainer', icon:'people',
              blurb:'What building nf-core taught us about running an open-source community: shared standards, review as teaching, and making newcomers welcome.',
              look:{ skin:'#f2c9a0', hair:'#d9a441', hairStyle:'swept', top:'#58b85c', topStyle:'tee', pants:'#3b4a3f' },
              lines:['Standards that outlive any one lab','Code review as teaching','Make the first pull request easy'] },
  multiqc:  { title:'The MultiQC story', short:'MULTIQC', colour:'#f0a53a', npc:'Rita the Reporter', icon:'bars',
              blurb:'How a small reporting script became a tool much of the field relies on, and what years of users have taught Phil about building software.',
              look:{ skin:'#e8b894', hair:'#8b2f2f', hairStyle:'long', top:'#f0a53a', topStyle:'sweat', pants:'#2e3a4f' },
              lines:['It started as a personal itch','One report across many tools','What years of users taught me'] },
  gpu:      { title:'Single-cell at GPU speed', short:'GPU', colour:'#6c8cff', npc:'Gus the GPU', icon:'chip',
              blurb:'Single-cell and spatial pipelines in nf-core, what GPU acceleration changes, and what it means for scverse users.',
              look:{ skin:'#a86f4c', hair:'#1f1f1f', hairStyle:'short', glasses:true, top:'#6c8cff', topStyle:'hoodie', pants:'#263042' },
              lines:['Single-cell and spatial at scale','GPU acceleration in nf-core pipelines','What it means for scverse users'] },
};
TOPICS.side = { title:'Side projects', short:'SIDE', colour:'#b28dff', npc:'Sid the Side Project', icon:'pad', bonus:true,
  blurb:'What Phil builds for fun: rich-click, DeckCal, Hemnet-Commuter, and the game you are watching right now.',
  look:{ skin:'#e8b894', hair:'#b28dff', hairStyle:'messy', top:'#2b2140', topStyle:'hoodie', logo:'chip', logoColour:'#b28dff', pants:'#3b3150' },
  lines:['You found the secret room!','rich-click: CLIs that agents can read','DeckCal for the Stream Deck','Hemnet-Commuter: house hunting by commute','And this game, obviously'] };
const FORKS = [['agents','community'],['multiqc','gpu']];
const GREETER = { name:'Greeter', colour:'#ff8fa3', look:{ skin:'#c98e62', hair:'#2b2b2b', hairStyle:'long', top:'#e85d75', topStyle:'tee', pants:'#394257' } };
const OUTRO = ["That's the tour!",'Questions? Grab a mic.'];
const ICONS = {
  robot:['....aa....','....aa....','.oooooooo.','.owwoowwo.','.owkoowko.','.oooooooo.','.oowwwwoo.','.oooooooo.','...o..o...','..oo..oo..'],
  people:['.w...w...w.','www.www.www','.w...w...w.','...........','ooo.ooo.ooo','ooo.ooo.ooo','ooo.ooo.ooo','o.o.o.o.o.o','o.o.o.o.o.o'],
  bars:['.......aa.','.......aa.','....oo.aa.','....oo.aa.','.ww.oo.aa.','.ww.oo.aa.','.ww.oo.aa.','.ww.oo.aa.','kkkkkkkkkk'],
  pad:['..oooooooo..','.oooooooooo.','ooowooooaooo','oowwwooakaoo','ooowooooaooo','oooooooooooo','oooo....oooo','ooo......ooo'],
  chip:['..w.w.w.w..','.ooooooooo.','woaaaaaaaow','.oakkkkkao.','woakkkkkaow','.oakkkkkao.','woaaaaaaaow','.ooooooooo.','..w.w.w.w..'],
};
const LOGOS = { chip:{ r:10, c:5, rows:['lll','l.l','lll'] }, nfcore:{ r:10, c:3, rows:['l....l','.l..l.','.l..l.','l....l'] } };

window.KEYNOTE_CONTENT = { CHARACTERS, TOPICS, FORKS, GREETER, OUTRO, ICONS, LOGOS };
})();
