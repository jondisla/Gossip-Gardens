// Harbor Whispers — original harbor-town merge adventure. The save key is intentionally stable.
import { FAMILIES, MAIN_FAMILIES, GENERATOR_DEFS, CHARS, REQUEST_NOTES, CHAPTER_EXPANSION, TASK_TEMPLATES, DAILY_OBJECTIVES, BOOSTERS } from './game-content.js';
import { repairDetailMarkup, repairDetailState } from './repair-details.js';
const GEN_CHARGES = 12;
const GEN_COOLDOWN_MS = 20_000;
const MAX_ENERGY = 100;
const ENERGY_TICK_MS = 60_000;
const OFFLINE_CAP_MS = 8 * 60 * 60 * 1000;
const BOARD_COLS = 7;
const BOARD_ROWS = 9;
const BOARD_SIZE = BOARD_COLS * BOARD_ROWS;
const SAVE_KEY = 'harbor-whispers-v1';
const SAVE_VERSION = 3;
const CHAPTER_STAR_GOALS = [6, 8, 10, 12, 14, 16, 18, 20, 22, 24, 26, 28, 30, 32, 34, 36, 38, 40];
const EVENT_MILESTONES = [
  { points: 10, reward: '30🪙', coins: 30, energy: 0, stars: 0, pearls: 0 },
  { points: 22, reward: '45🪙 + 3⚡', coins: 45, energy: 3, stars: 0, pearls: 0 },
  { points: 38, reward: '60🪙 + 2🫧', coins: 60, energy: 0, stars: 0, pearls: 0 },
  { points: 58, reward: '80🪙 + 1⭐', coins: 80, energy: 0, stars: 1, pearls: 0 },
  { points: 82, reward: '95🪙 + 5⚡', coins: 95, energy: 5, stars: 0, pearls: 0 },
  { points: 110, reward: '2 Pearls', coins: 0, energy: 0, stars: 0, pearls: 2 },
  { points: 145, reward: '120🪙 + 🧪', coins: 120, energy: 0, stars: 0, pearls: 0, booster: 'energyFlask' },
  { points: 185, reward: '150🪙 + 1⭐', coins: 150, energy: 0, stars: 1, pearls: 0 },
  { points: 230, reward: '8⚡ + 2 Pearls', coins: 0, energy: 8, stars: 0, pearls: 2 },
  { points: 280, reward: '180🪙', coins: 180, energy: 0, stars: 0, pearls: 0 },
  { points: 335, reward: '3 Pearls', coins: 0, energy: 0, stars: 0, pearls: 3 },
  { points: 395, reward: '200🪙 + 🧲', coins: 200, energy: 0, stars: 0, pearls: 0, booster: 'mergeMagnet' },
  { points: 460, reward: '12⚡ + 1⭐', coins: 0, energy: 12, stars: 1, pearls: 0 },
  { points: 530, reward: '250🪙 + 4 Pearls', coins: 250, energy: 0, stars: 0, pearls: 4 },
  { points: 610, reward: 'Harbor festival chest', coins: 300, energy: 15, stars: 2, pearls: 5 }
];
const CHAPTERS = [
  { title: 'The Salt-Stained Ledger', lines: [['mae', 'That storm took half the café roof. I found this old ledger under the flour bins while we were cleaning up.'], ['iris', 'The handwriting stops on the night the harbor bell went silent. Someone wrote “bring the light home” in the margin.'], ['theo', 'The old signal lamp is still in the lighthouse storehouse. If we mend the pier, I can get it back safely.'], ['mae', 'Then we rebuild together. And, Iris? You are writing all of this down.']] },
  { title: 'Ink on the Pier', lines: [['iris', 'The ledger belonged to Elian Vale, the first keeper of the harbor light. I found his name on a crate by the pier.'], ['theo', 'He kept a journal here. The last page is missing, but the ink on this rope matches the note in Mae’s book.'], ['mae', 'A mystery, a storm, and a very handsome handwriting sample. This town does know how to keep me busy.']] },
  { title: 'The Unsent Letter', lines: [['theo', 'I found an envelope behind a loose board at the Gazette. It is addressed to “the people who call this harbor home.”'], ['iris', 'It was never meant for one person. Elian wanted the whole town to keep the light burning.'], ['mae', 'Well, we are very good at showing up for each other. Let us give him a proper answer.']] },
  { title: 'Roses at Dawn', lines: [['theo', 'I have one more confession before the Gazette prints this. The roses at dawn were for you, Iris. I read every column you write.'], ['iris', 'I wondered why you kept asking me to meet you on the pier. I thought you were hiding a clue.'], ['mae', 'Both things can be true, dear. I am already saving a table for the two of you.']] },
  { title: 'The Bell’s Last Note', lines: [['iris', 'Elian’s last journal page was tucked inside the bell. The note says the lamp was a promise: “No one should have to find their way home alone.”'], ['theo', 'The pier is steady again. I can carry the lamp to the lighthouse at first light.'], ['mae', 'And I will make enough pastries to feed every person who comes to help. That is how a harbor works.']] },
  { title: 'A Harbor for All', lines: [['theo', 'The light is burning again. I thought the whole town would come to watch, but I did not expect this many people.'], ['iris', 'Elian’s letter says the harbor belongs to whoever makes a home here. I think we have answered him.'], ['mae', 'The café is open, the garden is blooming, and the pier is full of friends. This is the best story I have ever served.'], ['iris', 'Then let us leave the Gazette open on the counter. There will always be another story in this town.']] },
  ...CHAPTER_EXPANSION
];
const LOCATIONS = [
  { id:'cafe', name:'Café', icon:'☕', decos:['🪑','☂️','🪴','🎐','✨','🍽️','🌿','🎉'], film:'cafe', unlockChapter:0 },
  { id:'pier', name:'Pier', icon:'⚓', decos:['🪵','⛵','🏮','🐦','🌅','🛟','🧭','✨'], film:'pier', unlockChapter:0 },
  { id:'garden', name:'Garden', icon:'🌷', decos:['🌼','⛲','🦋','🌳','🌈','🪻','🌱','💐'], film:'garden', unlockChapter:0 },
  { id:'office', name:'Gazette', icon:'📰', decos:['🖨️','🪟','📚','☕','🏅','🗞️','🖋️','📖'], film:'office', unlockChapter:0 },
  { id:'market', name:'Market Square', icon:'🏪', decos:['🧹','🧺','🏷️','☂️','🪧','🪴','🛍️','🎏'], film:'cafe', unlockChapter:6 },
  { id:'lighthouse', name:'Lighthouse', icon:'🏮', decos:['🗝️','🧹','🪟','🪜','🔆','🏮','🧭','🌟'], film:'pier', unlockChapter:7 },
  { id:'workshop', name:'Workshop', icon:'🛠️', decos:['🧰','🪵','🪚','🪜','⚙️','🪟','🪑','🏠'], film:'pier', unlockChapter:8 },
  { id:'archive', name:'Archive', icon:'📚', decos:['📦','📄','🗄️','🪟','📚','🗂️','🖋️','📖'], film:'office', unlockChapter:9 },
  { id:'wharf', name:'Old Wharf', icon:'🛶', decos:['🪵','🪢','🛟','🪜','🧱','⚓','🏮','🌅'], film:'pier', unlockChapter:10 },
  { id:'festival', name:'Festival Plaza', icon:'🎏', decos:['🧹','🎏','🪑','🎈','🏮','🎨','🎁','🎉'], film:'garden', unlockChapter:11 }
];

// A compact, data-driven eight-beat story day for every existing campaign chapter.
// These chores add a narrative guide without replacing the original chapter/star unlocks.
const STORY_CHORE_STEPS = [
  { kind:'orders', target:1, character:'mae', title:'Answer a neighbor’s call', detail:'Someone nearby needs a hand before the day can move forward.' },
  { kind:'merges', target:3, character:'theo', title:'Prepare useful supplies', detail:'Build a few better items for the harbor crew.' },
  { kind:'orders', target:1, character:'iris', title:'Check in with the Gazette', detail:'A small delivery may help Iris connect another detail.' },
  { kind:'restorations', target:1, character:'rowan', title:'Make a lasting repair', detail:'Put coins toward a visible improvement at this chapter’s location.' },
  { kind:'discoveries', target:1, character:'iris', title:'Uncover something new', detail:'Create an item tier the harbor collection has not seen before.' },
  { kind:'merges', target:3, character:'theo', title:'Gather the crew’s materials', detail:'Keep merging; every careful combination helps the work.' },
  { kind:'orders', target:2, character:'mae', title:'Help two more neighbors', detail:'The harbor mystery belongs to everyone who shows up.' },
  { kind:'restorations', target:1, character:'cora', title:'Leave the place better', detail:'Finish one more improvement and see what the next chapter brings.' }
];
const CHAPTER_LOCATION_IDS = ['cafe','pier','office','garden','pier','cafe','lighthouse','archive','archive','market','lighthouse','office','wharf','office','festival','lighthouse','festival','cafe'];
const STORY_LOCATION_ART = {
  cafe:'assets/restore-cafe-scene.webp', theo:'assets/restore-pier-scene.webp',
  iris:'assets/restore-gazette-scene.webp', cora:'assets/restore-pier-scene.webp',
  rowan:'assets/restore-pier-scene.webp', jules:'assets/restore-garden-scene.webp',
  adrian:'assets/restore-cafe-scene.webp', nora:'assets/restore-gazette-scene.webp',
  milo:'assets/restore-pier-scene.webp', selene:'assets/restore-garden-scene.webp',
  tamsin:'assets/restore-cafe-scene.webp'
};
const RESTORATION_STAGES = {
  cafe: [
    ['Clear the storm damage','Mae and the neighbors sweep saltwater from the floor and salvage what they can from the battered café.'],['Patch the roof','Fresh rafters go up where the storm tore the roof away. At last, the ovens can stay dry.'],['Fit the windows','Warm light returns to the front windows, and Mae can see the harbor from her counter again.'],['Set the tables','The crew carries in sturdy tables. The first pot of coffee is already brewing for the helpers.'],['Open the café doors','The café is whole again. Mae sets out a welcome feast for everyone who helped bring it back.'],['Refresh the kitchen','A repaired prep counter lets Mae cook for a full room again.'],['Add garden seating','Jules brings a few planters outside for guests who like the sea breeze.'],['Host the grand reopening','The café becomes the harbor’s shared table, with room for every neighbor.']
  ],
  pier: [
    ['Replace the broken boards','Theo and the crew pull away splintered planks and lay a safe path over the water.'],['Secure the moorings','New ropes and a small sail make it possible for boats to return to the pier.'],['Raise a harbor lantern','A lantern marks the way through the evening fog, just as the old keeper once did.'],['Welcome the seabirds','The pier is busy again, and a little bird has claimed the new railing as its lookout.'],['Watch the sunrise together','The pier is steady and bright. The whole town gathers here to greet the morning.'],['Renew the handrail','Rowan braces the rail so young apprentices can work safely.'],['Reopen the boat station','Milo’s crew has a dry place to mend nets and prepare for the tide.'],['Build the harbor overlook','A broad, welcoming lookout gives the whole town a place to watch the light.']
  ],
  garden: [
    ['Clear the tangled beds','Neighbors pull out storm-torn branches and uncover the garden paths beneath them.'],['Bring back the flowers','Fresh blooms take root, and the first patch of color brightens the harbor road.'],['Make a home for butterflies','Butterflies return to the garden as the restored beds begin to flourish.'],['Grow a shady corner','A young tree gives the volunteers a cool place to rest between repairs.'],['Celebrate in the garden','The garden is in bloom, ready for a town-wide celebration beneath the rainbow.'],['Plant a pollinator walk','Jules lays a winding bed of herbs and blooms for bees and neighbors.'],['Add a seed library','Gardeners can leave extra seeds for anyone starting a new bed.'],['Open the community garden','The garden grows into a shared place to learn, rest and celebrate.']
  ],
  office: [
    ['Clear the Gazette desk','Iris rescues the typewriter and dries the pages scattered by the storm.'],['Repair the newsroom window','A new window keeps the sea breeze in and the rain off the next edition.'],['Restore the story shelves','Elian’s rescued papers finally have a safe home beside the Gazette archives.'],['Brew a newsroom coffee','The Gazette becomes the harbor’s coziest place to swap clues and fresh headlines.'],['Print the harbor’s story','The final edition honors everyone who helped bring the light—and the town—back home.'],['Fit a reading table','Nora makes room for neighbors to check a name or share a memory.'],['Open the public archive','The rescued records are catalogued and easy for the whole town to consult.'],['Publish the harbor history','The Gazette prints a community edition with every street represented.']
  ],
  market: [['Sweep the square','Neighbors clear the storm grit from the old meeting place.'],['Set sturdy stalls','Adrian lays out safe, welcoming market tables.'],['Hang a clear sign','A hand-painted sign helps visitors find local makers.'],['Mark the cart lane','A brighter route keeps market mornings moving smoothly.'],['Add a shade canopy','Stallholders can work comfortably in the midday sun.'],['Plant the square','Jules softens the edges with herbs and flowers.'],['Open the shared stall','Small makers share a welcoming place to sell their work.'],['Celebrate market day','The square opens for a lively harbor-wide market.']],
  lighthouse: [['Clear the storehouse','Cora and Theo begin with the old signal room.'],['Repair the stair','Rowan makes the climb safe for the whole crew.'],['Fit the keeper’s window','Clear glass brings the waterline back into view.'],['Restore the lens frame','The old beacon can finally sit straight again.'],['Rewire the lantern room','A careful new fitting protects the restored light.'],['Polish the beacon lens','The signal brightens across the evening water.'],['Record the keeper’s story','Nora and Cora preserve the lighthouse memories.'],['Light the harbor beacon','The restored light welcomes every boat home.']],
  workshop: [['Clear the bench','The crew makes space for safe, careful work.'],['Sort the timber','Rowan finds useful boards beneath the storm cover.'],['Tune the saw','The old tool is repaired instead of replaced.'],['Brace the roof','A stronger beam keeps the workbench dry.'],['Fit a proper door','Materials can be stored safely at last.'],['Build a teaching bench','Rowan makes a place for Milo to learn.'],['Organize the tool wall','Every tool has a home and every neighbor may borrow one.'],['Open the harbor workshop','The workshop becomes a shared place to mend and make.']],
  archive: [['Dry the record boxes','Nora rescues the papers one careful bundle at a time.'],['Replace the lower shelf','A sound shelf keeps records away from damp stone.'],['Repair the archive door','The old collection can be secured without being hidden.'],['Sort the tide charts','Cora helps date the harbor’s changing shoreline.'],['Create a reading desk','Neighbors have a comfortable place to look things up.'],['Label the local collection','Names and places are easier to find.'],['Open the records room','The town can consult its history together.'],['Celebrate the living archive','New memories join the old records on the shelves.']],
  wharf: [['Clear the old landing','The crew uncovers the safe stones beneath storm debris.'],['Replace the mooring rope','A fresh line secures small boats at low tide.'],['Repair the steps','The approach becomes safe for every neighbor.'],['Rebuild the net rack','Milo’s fishing crew has a dry place for their gear.'],['Brace the old piling','Rowan preserves the wharf’s original structure.'],['Add a tide marker','Cora’s marks make the changing water easier to read.'],['Hang a welcoming lantern','A warm light returns to the old landing.'],['Reopen the old wharf','The landing is ready for work, stories and visitors.']],
  festival: [['Clear the plaza','A volunteer crew sweeps the town’s gathering place.'],['Repair the flag posts','The old posts are ready for festival bunting.'],['Set the benches','Neighbors have a place to rest and share a meal.'],['Hang the first lanterns','Warm light makes the square inviting after sunset.'],['Paint a welcome mural','Local colors brighten the plaza walls.'],['Arrange the maker stalls','The festival has room for crafts and good food.'],['Build a small stage','Milo and the ferry crew test the boards.'],['Open the harbor festival','Every street gathers beneath the new lanterns.']]
};
const RESTORATION_FILMS = {
  cafe: {
    beforeArt: 'assets/restore-cafe-before.webp', art: 'assets/restore-cafe-scene.webp', helper: 'mae', accent: '#ee9463',
    actions: ['🧹', '🪜', '🪟', '🪑', '🥐', '🍽️', '🌿', '🎉'],
    before: ['Saltwater and storm debris still cover Mae’s café floor.', 'A ragged gap in the roof lets rain fall over the ovens.', 'Empty window frames leave the counter open to the sea breeze.', 'The café has walls again, but nowhere for neighbors to gather.', 'The room is nearly ready; its doors have not welcomed anyone back.'],
    after: ['Mae saves a dry corner for the neighbors.', 'Fresh rafters hold firm above the kitchen.', 'Sunlight and harbor views return to Mae’s counter.', 'Neighbors can sit down over a shared pot of coffee.', 'Mae opens wide the doors for a welcome feast.'],
    words: ['We can make this feel like home again.', 'One little repair at a time!', 'I can almost smell the first fresh pastries.']
  },
  pier: {
    beforeArt: 'assets/restore-pier-before.webp', art: 'assets/restore-pier-scene.webp', helper: 'theo', accent: '#55b9bd',
    actions: ['🪵', '🪢', '🏮', '🐦', '🌅', '🛟', '🧭', '✨'],
    before: ['Storm waves left broken, uneven planks along Theo’s pier.', 'The boards are sound again, but boats still need safe moorings.', 'Evening fog swallows the pier without its old lantern.', 'The pier is busy again, but the new railing is still waiting.', 'The harbor is waking up. The town has one last sunrise to share.'],
    after: ['A safe path over the water leads back to shore.', 'Boats can tie up safely again.', 'A warm lantern marks a way through the evening fog.', 'A tiny lookout has claimed the new railing.', 'Everyone greets the sun from a pier made whole.'],
    words: ['We’ll make this pier safe again.', 'The tide can’t stop a good crew.', 'Look at that light on the water.']
  },
  garden: {
    beforeArt: 'assets/restore-garden-before.webp', art: 'assets/restore-garden-scene.webp', helper: 'mae', accent: '#8fae66',
    actions: ['🧹', '🌷', '🦋', '🌳', '🌈', '🪻', '🌱', '💐'],
    before: ['Storm-tangled branches hide the garden paths and beds.', 'The beds are ready for new flowers after a gray season.', 'The first blooms need time before butterflies return.', 'A new garden needs shade as well as color.', 'Flowers are back; now the garden needs a celebration.'],
    after: ['The garden paths emerge from beneath the storm’s tangle.', 'Color returns to the harbor road.', 'Butterflies find their way back to the blooms.', 'Volunteers rest beneath a young shade tree.', 'Neighbors gather beneath a rainbow in the garden.'],
    words: ['There’s always room for one more bloom.', 'A little color changes everything.', 'The whole garden feels alive again.']
  },
  office: {
    beforeArt: 'assets/restore-gazette-before.webp', art: 'assets/restore-gazette-scene.webp', helper: 'iris', accent: '#7f9da9',
    actions: ['📄', '🪟', '📚', '☕', '📰', '🗞️', '🖋️', '📖'],
    before: ['Water-stained pages and a cluttered desk wait in the Gazette.', 'A loose newsroom window lets the wind scatter Iris’s stories.', 'Elian’s rescued papers still need a proper archive home.', 'The archive is safe, but the newsroom misses its cozy ritual.', 'The Gazette is ready to tell the harbor’s story again.'],
    after: ['Clean pages and the old typewriter find a dry desk.', 'A clear window brightens every new edition.', 'Elian’s papers rest safely beside the archive.', 'A steaming mug makes the newsroom feel like home.', 'The Gazette thanks everyone who brought the light home.'],
    words: ['Every good story starts with a little hope.', 'Let’s make room for one more story.', 'I know just how I’ll begin the headline.']
  }
};
const CAFE_FLOORS = [
  { id: 'honey', name: 'Honey oak', color: '#d9a75f' },
  { id: 'rose', name: 'Rosewood', color: '#bd796d' },
  { id: 'seafoam', name: 'Sea glass', color: '#88aaa0' },
  { id: 'cream', name: 'Cream', color: '#e6cf9a' },
  { id: 'walnut', name: 'Walnut', color: '#89604a' }
];

// Location-specific choices are presented at the two big story milestones.
// The illustration stays visible while the player previews and confirms a finish.
const RESTORATION_DESIGNS = {
  cafe: {
    4: { key:'floor', title:'Choose Mae’s café finish', prompt:'Which floor should welcome the harbor crew?', choices:[
      {id:'seafoam',name:'Coastal',description:'Sea-glass tones and a breezy feel.',icon:'🪑',color:'#88aaa0'},
      {id:'rose',name:'Garden',description:'A warm rosewood glow with room to linger.',icon:'🌷',color:'#bd796d'},
      {id:'honey',name:'Classic',description:'Honey oak, as sunny as Mae’s kitchen.',icon:'☕',color:'#d9a75f'}
    ]},
    8: { key:'welcome', title:'Choose the café welcome', prompt:'Give the reopened café its own finishing touch.', choices:[
      {id:'coastal',name:'Harbor blue',description:'A bright welcome for every sailor.',icon:'⚓',color:'#57b9c2'},
      {id:'garden',name:'Garden blooms',description:'Mae’s doorway framed with flowers.',icon:'🌼',color:'#8cb66a'},
      {id:'classic',name:'Warm brass',description:'A timeless bell above the door.',icon:'🔔',color:'#d7a54f'}
    ]}
  },
  pier: {
    4: { key:'rail', title:'Choose the pier rail', prompt:'What should greet everyone coming in with the tide?', choices:[
      {id:'maritime',name:'Maritime',description:'Rope details and a sturdy sea-green rail.',icon:'🛟',color:'#55b9bd'},
      {id:'vintage',name:'Tideworn',description:'A little history in every weathered board.',icon:'🪵',color:'#b98555'},
      {id:'bright',name:'Fresh paint',description:'A clear, cheerful landmark by the water.',icon:'⛵',color:'#80b9d1'}
    ]},
    8: { key:'lookout', title:'Shape the harbor overlook', prompt:'Set the tone for the town’s favorite view.', choices:[
      {id:'lantern',name:'Lantern glow',description:'A warm beacon against the evening tide.',icon:'🏮',color:'#eba85e'},
      {id:'classic',name:'Classic harbor',description:'Natural timber and familiar details.',icon:'⚓',color:'#b98555'},
      {id:'festival',name:'Festival colors',description:'Bunting for every sunrise gathering.',icon:'🎏',color:'#e77f91'}
    ]}
  },
  garden: {
    4: { key:'shade', title:'Choose the garden’s shady nook', prompt:'Make a restful corner for helpers and butterflies.', choices:[
      {id:'cottage',name:'Cottage',description:'Soft blooms and a tucked-away seat.',icon:'🌷',color:'#d88ca5'},
      {id:'botanical',name:'Botanical',description:'Leafy greens and a little plant table.',icon:'🌿',color:'#83a85a'},
      {id:'seaside',name:'Seaside',description:'Pale stone with a view of the water.',icon:'🐚',color:'#74b6b2'}
    ]},
    8: { key:'arch', title:'Choose the garden arch', prompt:'Give the community garden a memorable entrance.', choices:[
      {id:'cottage',name:'Cottage roses',description:'A soft arch woven with garden color.',icon:'🌹',color:'#dc86a5'},
      {id:'botanical',name:'Green bower',description:'A leafy welcome for pollinators.',icon:'🌱',color:'#77a759'},
      {id:'seaside',name:'Sea-glass arch',description:'A fresh, open frame for celebrations.',icon:'🦋',color:'#60b9bd'}
    ]}
  },
  office: {
    4: { key:'newsroom', title:'Choose the newsroom touch', prompt:'Make the Gazette a place to pause and share a clue.', choices:[
      {id:'traditional',name:'Traditional',description:'Ink, oak and a tidy editor’s desk.',icon:'🖋️',color:'#9c7957'},
      {id:'colorful',name:'Colorful',description:'Bright pages and a little harbor cheer.',icon:'📰',color:'#e28b77'},
      {id:'refined',name:'Refined',description:'Quiet shelves and sea-glass accents.',icon:'📚',color:'#7e9ea9'}
    ]},
    8: { key:'edition', title:'Choose the Gazette edition', prompt:'Set the look of the story the whole town will read.', choices:[
      {id:'traditional',name:'Town chronicle',description:'A classic keepsake for the archive.',icon:'📜',color:'#b18a5e'},
      {id:'colorful',name:'Harbor voices',description:'A lively page full of neighbors.',icon:'🗞️',color:'#e68a6c'},
      {id:'refined',name:'The light returns',description:'A clear, elegant edition to remember.',icon:'✨',color:'#789faa'}
    ]}
  },
  market: {
    4: { key:'canopy', title:'Choose a market canopy', prompt:'Make the square comfortable on bright mornings.', choices:[
      {id:'coastal',name:'Coastal',description:'Sea-blue shade with crisp white trim.',icon:'⛵',color:'#62b7c4'},
      {id:'garden',name:'Garden',description:'Leafy shade beside the herb stalls.',icon:'🌿',color:'#86ad66'},
      {id:'classic',name:'Classic',description:'Warm canvas for a traditional market.',icon:'🧺',color:'#dfa45f'}
    ]},
    8: { key:'market-day', title:'Set the market-day mood', prompt:'Make the shared square feel like a celebration.', choices:[
      {id:'maker',name:'Makers’ row',description:'A handmade welcome for local crafts.',icon:'🎨',color:'#d58497'},
      {id:'harvest',name:'Harvest morning',description:'Fresh colors from the garden plots.',icon:'🌻',color:'#d7a847'},
      {id:'harbor',name:'Harbor fair',description:'Bunting and lanterns by the quay.',icon:'🎏',color:'#5faeb1'}
    ]}
  },
  lighthouse: {
    4: { key:'lens-frame', title:'Choose the lens frame', prompt:'Honor the old beacon while making it safe again.', choices:[
      {id:'maritime',name:'Maritime',description:'Deep sea-green metal and brass fittings.',icon:'⚓',color:'#4caab1'},
      {id:'vintage',name:'Vintage',description:'A faithful finish for the keeper’s room.',icon:'🏮',color:'#c08a56'},
      {id:'modern',name:'Clear light',description:'Simple lines for a brighter signal.',icon:'🔆',color:'#89bdc0'}
    ]},
    8: { key:'beacon', title:'Choose the beacon’s glow', prompt:'Decide how the restored light will greet the harbor.', choices:[
      {id:'maritime',name:'Maritime',description:'A steady blue-green harbor signal.',icon:'🌊',color:'#55b9bd'},
      {id:'vintage',name:'Keeper’s gold',description:'Warm brass and an old familiar glow.',icon:'🌟',color:'#e8b454'},
      {id:'modern',name:'Clear white',description:'A crisp beam for the far shore.',icon:'💡',color:'#a5d4d1'}
    ]}
  },
  workshop: {
    4: { key:'bench', title:'Choose the teaching bench', prompt:'Make a good place for the next pair of hands.', choices:[
      {id:'rustic',name:'Rustic',description:'Honest timber with room for every tool.',icon:'🪵',color:'#b98555'},
      {id:'nautical',name:'Nautical',description:'Sea-glass paint and rope-bound corners.',icon:'⚓',color:'#59aeb5'},
      {id:'industrial',name:'Workshop steel',description:'A sturdy, precise maker’s station.',icon:'⚙️',color:'#8295a0'}
    ]},
    8: { key:'toolwall', title:'Arrange the tool wall', prompt:'Give every borrowed tool a visible home.', choices:[
      {id:'rustic',name:'Pegboard oak',description:'A warm wall of well-loved tools.',icon:'🔨',color:'#b98555'},
      {id:'nautical',name:'Harbor blue',description:'A bright, easy-to-read workshop wall.',icon:'🛠️',color:'#56aeb8'},
      {id:'industrial',name:'Maker’s steel',description:'Clean lines for careful repair work.',icon:'⚙️',color:'#8399a2'}
    ]}
  },
  archive: {
    4: { key:'desk', title:'Choose the reading desk', prompt:'Give neighbors a comfortable place to follow a clue.', choices:[
      {id:'antique',name:'Antique',description:'A desk with the patina of old stories.',icon:'📜',color:'#b18b61'},
      {id:'organized',name:'Organized',description:'Clear labels and a calm, tidy surface.',icon:'🗂️',color:'#7b9ca4'},
      {id:'cozy',name:'Cozy',description:'A lamp and a place to settle in.',icon:'🕯️',color:'#d99d5a'}
    ]},
    8: { key:'collection', title:'Choose the archive finish', prompt:'Make the town’s shared history feel at home.', choices:[
      {id:'antique',name:'Antique stacks',description:'Old wood for well-traveled records.',icon:'📚',color:'#b18b61'},
      {id:'organized',name:'Open collection',description:'Bright shelves, easy for everyone to use.',icon:'🗄️',color:'#789da6'},
      {id:'cozy',name:'Story corner',description:'A welcoming nook for reading together.',icon:'📖',color:'#d69b5e'}
    ]}
  },
  wharf: {
    4: { key:'net-rack', title:'Choose the net rack', prompt:'Make a dry, dependable space for the fishing crew.', choices:[
      {id:'weathered',name:'Weathered',description:'Keep the old wharf’s familiar character.',icon:'🪵',color:'#a87e59'},
      {id:'festival',name:'Bright harbor',description:'A little color for the old landing.',icon:'🏮',color:'#e7a454'},
      {id:'classic',name:'Classic',description:'Simple rope and sturdy timber.',icon:'🪢',color:'#72aeb1'}
    ]},
    8: { key:'lantern', title:'Choose the wharf lantern', prompt:'Mark the old landing as a place to return to.', choices:[
      {id:'weathered',name:'Old keeper',description:'A lantern in the style of the first pier.',icon:'🏮',color:'#d39a59'},
      {id:'festival',name:'Festival glow',description:'A bright light for gathering evenings.',icon:'🎏',color:'#df8298'},
      {id:'classic',name:'Classic harbor',description:'A steady, familiar light above the tide.',icon:'⚓',color:'#6eabb2'}
    ]}
  },
  festival: {
    4: { key:'lanterns', title:'Choose the plaza lanterns', prompt:'Set a warm mood for neighbors meeting after sunset.', choices:[
      {id:'cottage',name:'Garden glow',description:'Soft colors among the plaza flowers.',icon:'🌼',color:'#89ae65'},
      {id:'harbor',name:'Harbor blue',description:'Sea-glass shades along the square.',icon:'🏮',color:'#59adb6'},
      {id:'bright',name:'Festival bright',description:'A joyful splash of lantern color.',icon:'🎏',color:'#df8298'}
    ]},
    8: { key:'stage', title:'Choose the celebration stage', prompt:'Make a place for every street to share the day.', choices:[
      {id:'cottage',name:'Garden stage',description:'A flower-framed place for music.',icon:'🌷',color:'#88ad63'},
      {id:'harbor',name:'Harbor stage',description:'Blue boards and familiar dock details.',icon:'⚓',color:'#5aaab2'},
      {id:'bright',name:'Festival stage',description:'Bunting, color and room to dance.',icon:'🎉',color:'#df8298'}
    ]}
  }
};

const RESTORATION_CAST = {
  cafe:['mae','rowan','iris'], pier:['theo','cora','milo'], garden:['jules','mae','selene'], office:['iris','nora','rowan'],
  market:['adrian','mae','jules'], lighthouse:['cora','theo','milo'], workshop:['rowan','milo','theo'],
  archive:['nora','iris','cora'], wharf:['theo','milo','rowan'], festival:['mae','jules','tamsin']
};
const RESTORATION_DIALOGUE = {
  cafe:[['mae','The storm left its mark, but this café is still ours.'],['rowan','I’ve checked the frame. We can make this safe, one careful repair at a time.'],['mae','Then let’s build a place where everyone has a seat.']],
  pier:[['theo','The boards are rough, but I can hear the harbor waking up already.'],['cora','A steady hand and a few neighbors will see it right.'],['theo','Let’s give the tide a pier worth coming home to.']],
  garden:[['jules','The beds look tired. The soil underneath is still full of promise.'],['mae','We’ll bring the color back together.'],['jules','And leave room for whatever wants to bloom next.']],
  office:[['iris','A few pages made it through the storm. The rest of the room can, too.'],['nora','The records are safe. Now let’s make space for the next story.'],['iris','This Gazette belongs to the whole harbor.']],
  market:[['adrian','The square is quiet without its morning crowd.'],['jules','A little shade and somewhere to stop will bring them back.'],['adrian','Let’s make this a place to meet, not just a place to shop.']],
  lighthouse:[['cora','The old light has guided this harbor for generations.'],['theo','We’ll repair it carefully. The sea deserves a clear signal.'],['cora','And no one will have to find the way home alone.']],
  workshop:[['rowan','A good repair starts with a bench that doesn’t wobble.'],['milo','I’ve got the timber ready. Show me how you’d fit it.'],['rowan','That’s the spirit. We’ll make a place to learn together.']],
  archive:[['nora','These records hold the names of everyone who helped before us.'],['iris','Then let’s give them a room the whole town can visit.'],['nora','Carefully kept, and never locked away.']],
  wharf:[['milo','The old landing looks smaller than I remember.'],['theo','It only needs a safe path and a little attention.'],['milo','Then let’s make it ready for the next crossing.']],
  festival:[['mae','This square has heard every harbor celebration.'],['jules','Soon it’ll be full of lanterns and familiar faces again.'],['mae','Let’s make room for the whole town.']]
};

function getCafeFloor() {
  return CAFE_FLOORS.find(floor => floor.id === state.cafeFloor) || CAFE_FLOORS[0];
}

function renderCafeFloorChoices() {
  return CAFE_FLOORS.map(floor => `<button class="floor-choice ${getCafeFloor().id === floor.id ? 'selected' : ''}" type="button" data-floor="${floor.id}" aria-label="Choose ${floor.name} floor" aria-pressed="${getCafeFloor().id === floor.id}"><span class="floor-swatch" style="--swatch-color:${floor.color}"></span><small>${floor.name}</small></button>`).join('');
}

function bindCafeFloorChoices(root) {
  root.querySelectorAll('.floor-choice').forEach(button => {
    button.onclick = () => {
      const floor = CAFE_FLOORS.find(option => option.id === button.dataset.floor);
      if (!floor) return;
      state.cafeFloor = floor.id;
      saveState();
      root.querySelectorAll('.floor-choice').forEach(choice => {
        const selected = choice.dataset.floor === floor.id;
        choice.classList.toggle('selected', selected);
        choice.setAttribute('aria-pressed', String(selected));
      });
      root.querySelectorAll('[data-floor-preview]').forEach(preview => preview.style.setProperty('--floor-tone', floor.color));
    };
  });
}

function makeBoard(families) {
  const cells = Array(BOARD_SIZE).fill(null);
  const generatorSpots = [0, 6, 56, 62];
  families.forEach((fam, i) => {
    const spot = families.length === 1 ? 31 : generatorSpots[i] ?? 55 - i;
    cells[spot] = { gen: fam, level: 1, charges: GEN_CHARGES, readyAt: 0 };
  });
  if (families.length > 1) {
    cells[24] = { fam: families[2], tier: 1, covered: 1 };
    cells[25] = { fam: families[2], tier: 1 };
    cells[17] = { fam: families[0], tier: 1 };
    cells[18] = { fam: families[0], tier: 1 };
    cells[31] = { fam: families[1], tier: 1 };
    cells[32] = { fam: families[1], tier: 1 };
    cells[38] = { fam: families[3], tier: 1 };
    cells[39] = { fam: families[3], tier: 1 };
  }
  return cells;
}

function dailyDateKey(date = new Date()) {
  return date.toLocaleDateString('en-CA');
}

function makeDailyObjectives(dayKey = dailyDateKey()) {
  const dayNumber = Math.floor(new Date(`${dayKey}T00:00:00`).getTime() / 86_400_000) || 0;
  return [0, 1, 2].map(offset => {
    const template = DAILY_OBJECTIVES[(dayNumber + offset * 2) % DAILY_OBJECTIVES.length];
    return { ...template, reward: { ...template.reward }, progress: 0, claimed: false };
  });
}

function newState() {
  const now = Date.now();
  const today = dailyDateKey();
  const levels = Object.fromEntries(LOCATIONS.map(location => [location.id, 0]));
  const familyMastery = Object.fromEntries(Object.keys(FAMILIES).filter(id => id !== 'shell').map(id => [id, { xp: 0, level: 1 }]));
  const boosters = Object.fromEntries(Object.keys(BOOSTERS).map(id => [id, id === 'energyFlask' || id === 'mergeMagnet' ? 1 : 0]));
  const discoveredItems = MAIN_FAMILIES.flatMap(fam => [`${fam}-1`]);
  return {
    saveVersion: SAVE_VERSION,
    coins: 120, pearls: 5, energy: 60, maxEnergy: MAX_ENERGY, stars: 0, chapter: 0, starsToward: 0,
    playerLevel: 1, xp: 0, xpToNext: 100, cafeFloor: 'honey',
    locationStyles: Object.fromEntries(LOCATIONS.map(location => [location.id, {}])), pendingRestoration: null,
    boards: { main: makeBoard(MAIN_FAMILIES), event: makeBoard(['shell']) },
    tasks: [], levels, inventory: [], inventoryCapacity: 30, unlockedFamilies: [...MAIN_FAMILIES],
    generatorLevels: Object.fromEntries(GENERATOR_DEFS.map(generator => [generator.family, 1])), pendingGenerators: [],
    familyMastery, discoveredItems, boosters, stats: { merges: 0, generated: 0, orders: 0, restorations: 0, discoveries: 0, fiveMerges: 0, eventPoints: 0 },
    achievements: [], relationships: Object.fromEntries(Object.keys(CHARS).map(id => [id, 1])),
    eventPoints: 0, eventClaimed: [], dailyClaimedAt: '', dailyDay: today, dailyStreak: 0, dailyObjectives: makeDailyObjectives(today),
    storyChores: {}, storyMoments: [],
    introSeen: false, tutorialSeen: false, tutorialStarted: false, tutorialStep: 0,
    victorySeen: false, lastTick: now, offlineEnergyGained: 0
  };
}

function taskEnergy(tier) {
  return Math.min(6, Math.floor((Math.max(1, Math.min(8, Number(tier) || 1)) - 1) / 2));
}

function taskCoins(tier) {
  const safeTier = Math.max(1, Math.min(8, Number(tier) || 1));
  return 18 * safeTier * safeTier + 2 * safeTier;
}

function storyStarGoal(chapter) {
  return CHAPTER_STAR_GOALS[Math.min(chapter, CHAPTER_STAR_GOALS.length - 1)];
}

function isLocationUnlocked(location) {
  return state.chapter >= (location.unlockChapter || 0);
}

function restoredCount() {
  return LOCATIONS.reduce((total, location) => total + Math.min(location.decos.length, Number(state.levels[location.id]) || 0), 0);
}

function totalRestorationCount() {
  return LOCATIONS.reduce((total, location) => total + location.decos.length, 0);
}

function nextRestorationGoal() {
  return LOCATIONS.find(location => isLocationUnlocked(location) && (state.levels[location.id] || 0) < location.decos.length) || null;
}

function maxEnergy() {
  return Math.max(MAX_ENERGY, Math.min(200, Number(state.maxEnergy) || MAX_ENERGY));
}

function xpForNextLevel(level = state.playerLevel) {
  return 100 + Math.max(0, level - 1) * 35;
}

function updateDailyProgress(kind, amount = 1) {
  const today = dailyDateKey();
  if (state.dailyDay !== today) {
    state.dailyDay = today;
    state.dailyObjectives = makeDailyObjectives(today);
  }
  state.dailyObjectives.forEach(objective => {
    if (objective.kind === kind && !objective.claimed) objective.progress = Math.min(objective.target, objective.progress + amount);
  });
}

function grantEnergy(amount) {
  state.energy = Math.min(maxEnergy(), Math.max(0, state.energy + amount));
}

function grantXP(amount) {
  state.xp = Math.max(0, (Number(state.xp) || 0) + Math.max(0, amount));
  while (state.playerLevel < 50 && state.xp >= xpForNextLevel()) {
    state.xp -= xpForNextLevel();
    state.playerLevel += 1;
    state.coins += 60 + state.playerLevel * 12;
    grantEnergy(12);
    if (state.playerLevel % 3 === 0) state.pearls += 2;
    if (state.playerLevel % 5 === 0) state.boosters.energyFlask = (state.boosters.energyFlask || 0) + 1;
    if (state.playerLevel % 5 === 0) state.maxEnergy = Math.min(200, maxEnergy() + 5);
    showFloat(`Level ${state.playerLevel}! +${60 + state.playerLevel * 12}🪙 +12⚡`);
  }
  if (state.playerLevel >= 50) state.xp = Math.min(state.xp, xpForNextLevel(50) - 1);
  state.xpToNext = xpForNextLevel();
  unlockAvailableGenerators();
}

function addMastery(familyId, amount) {
  if (!state.familyMastery[familyId]) state.familyMastery[familyId] = { xp: 0, level: 1 };
  const mastery = state.familyMastery[familyId];
  mastery.xp += amount;
  while (mastery.level < 10 && mastery.xp >= mastery.level * 45) {
    mastery.xp -= mastery.level * 45;
    mastery.level += 1;
    if (mastery.level % 2 === 0) state.coins += 30 * mastery.level;
    if (mastery.level % 3 === 0) state.pearls += 1;
  }
}

function recordDiscovery(familyId, tier) {
  const item = FAMILIES[familyId]?.tiers[tier - 1];
  if (!item) return;
  if (!state.discoveredItems.includes(item.id)) {
    state.discoveredItems.push(item.id);
    state.stats.discoveries += 1;
    state.coins += 8 + tier * 4;
    grantXP(8 + tier * 3);
    updateDailyProgress('discoveries');
    if (familyId !== 'shell') recordStoryAction('discoveries');
    showFloat(`New discovery · ${item.name}`);
  }
}

function migrateBoard(previous, fallback = [], overflow = []) {
  const source = Array.isArray(previous) ? previous : fallback;
  if (source.length === BOARD_SIZE) return source.slice();
  const migrated = Array(BOARD_SIZE).fill(null);
  const oldCols = source.length >= 63 ? Math.ceil(source.length / BOARD_ROWS) : 7;
  source.forEach((cell, index) => {
    if (!cell) return;
    const row = Math.floor(index / oldCols);
    const col = index % oldCols;
    if (row >= BOARD_ROWS) {
      overflow.push(cell);
      return;
    }
    const originCol = Math.min(col, BOARD_COLS - 1);
    let choice = -1;
    let distance = Infinity;
    migrated.forEach((target, targetIndex) => {
      if (target) return;
      const nextDistance = Math.abs(targetIndex % BOARD_COLS - originCol) + Math.abs(Math.floor(targetIndex / BOARD_COLS) - row);
      if (nextDistance < distance) {
        choice = targetIndex;
        distance = nextDistance;
      }
    });
    if (choice >= 0) migrated[choice] = cell;
    else overflow.push(cell);
  });
  return migrated;
}

function normalizeBoardCell(cell, savedGeneratorLevels = {}) {
  if (!cell) return null;
  if (cell.gen) {
    if (!FAMILIES[cell.gen]) return null;
    const level = Math.max(1, Math.min(6, Number(savedGeneratorLevels[cell.gen] || cell.level) || 1));
    const capacity = GEN_CHARGES + (level - 1) * 2;
    const rawCharges = Number(cell.charges);
    return { ...cell, level, charges:Number.isFinite(rawCharges) ? Math.max(0,Math.min(capacity,rawCharges)) : capacity, readyAt:Math.max(0,Number(cell.readyAt)||0) };
  }
  const family = FAMILIES[cell.fam];
  const tier = Number(cell.tier);
  if (!family || !Number.isInteger(tier) || tier < 1 || tier > family.tiers.length) return null;
  return { ...cell, tier, locked:Boolean(cell.locked), covered:cell.covered ? Math.max(1,Number(cell.covered)||1) : 0 };
}

function loadState() {
  try {
    const saved = JSON.parse(localStorage.getItem(SAVE_KEY));
    if (!saved || typeof saved !== 'object') return null;
    const fresh = newState();
    const boards = {};
    const boardOverflow = [];
    for (const key of ['main', 'event']) boards[key] = migrateBoard(saved.boards?.[key], fresh.boards[key], boardOverflow).map(cell => normalizeBoardCell(cell,saved.generatorLevels || {}));
    const migrated = { ...fresh, ...saved, saveVersion: SAVE_VERSION, boards };
    migrated.levels = { ...fresh.levels, ...(saved.levels || {}) };
    migrated.tasks = Array.isArray(saved.tasks) ? saved.tasks.map(task => ({
      ...task,
      quantity: Math.max(1, Number(task.quantity) || 1),
      coins: Number(task.coins) || taskCoins(task?.tier),
      energy: Number(task.energy) || taskEnergy(task?.tier),
      stars: Number(task.stars) || (Number(task.tier) >= 3 ? 2 : 1),
      note: task?.note || REQUEST_NOTES[task?.who]?.[0] || REQUEST_NOTES.mae[0],
      stage: Math.max(0, Number(task.stage) || 0)
    })) : [];
    migrated.energy = Math.min(maxEnergyFor(migrated), Math.max(0, Number(saved.energy) || 0));
    migrated.maxEnergy = Math.max(MAX_ENERGY, Math.min(200, Number(saved.maxEnergy) || MAX_ENERGY));
    migrated.playerLevel = Math.max(1, Math.min(50, Number(saved.playerLevel) || 1));
    migrated.xp = Math.max(0, Number(saved.xp) || 0);
    migrated.xpToNext = xpForNextLevel(migrated.playerLevel);
    migrated.pearls = Math.max(0, Number(saved.pearls) || 0);
    migrated.inventory = Array.isArray(saved.inventory) ? saved.inventory.filter(item => FAMILIES[item?.fam]?.tiers[item?.tier - 1]).slice(0, 100) : [];
    const overflowItems = boardOverflow.filter(cell => !cell?.gen && FAMILIES[cell?.fam]?.tiers[Number(cell?.tier) - 1]);
    migrated.inventory.push(...overflowItems.map(cell => ({ fam:cell.fam, tier:Number(cell.tier), locked:Boolean(cell.locked), covered:cell.covered ? 1 : 0, quantity:1 })));
    migrated.inventoryCapacity = Math.max(30, Math.min(80, Number(saved.inventoryCapacity) || 30), Math.min(100, migrated.inventory.length));
    migrated.unlockedFamilies = [...new Set([...(Array.isArray(saved.unlockedFamilies) ? saved.unlockedFamilies : MAIN_FAMILIES), ...boards.main.filter(cell => cell?.gen).map(cell => cell.gen)])].filter(id => FAMILIES[id] && id !== 'shell');
    migrated.generatorLevels = { ...fresh.generatorLevels, ...(saved.generatorLevels || {}) };
    Object.keys(migrated.generatorLevels).forEach(id => { migrated.generatorLevels[id] = Math.max(1,Math.min(6,Number(migrated.generatorLevels[id])||1)); });
    const overflowGenerators = boardOverflow.filter(cell => cell?.gen && FAMILIES[cell.gen] && cell.gen !== 'shell').map(cell => cell.gen);
    migrated.pendingGenerators = [...new Set([...(Array.isArray(saved.pendingGenerators) ? saved.pendingGenerators : []), ...overflowGenerators])].filter(id => FAMILIES[id] && id !== 'shell');
    migrated.familyMastery = { ...fresh.familyMastery, ...(saved.familyMastery || {}) };
    Object.keys(migrated.familyMastery).forEach(id => { const entry=migrated.familyMastery[id]||{}; migrated.familyMastery[id]={xp:Math.max(0,Number(entry.xp)||0),level:Math.max(1,Math.min(10,Number(entry.level)||1))}; });
    migrated.discoveredItems = [...new Set([...(Array.isArray(saved.discoveredItems) ? saved.discoveredItems : fresh.discoveredItems), ...boards.main.filter(cell => cell?.fam && FAMILIES[cell.fam]).map(cell => FAMILIES[cell.fam].tiers[cell.tier - 1]?.id).filter(Boolean)])];
    migrated.boosters = { ...fresh.boosters, ...(saved.boosters || {}) };
    migrated.stats = { ...fresh.stats, ...(saved.stats || {}) };
    migrated.stats.restorations = Math.max(Number(migrated.stats.restorations) || 0, LOCATIONS.reduce((sum, location) => sum + Math.min(location.decos.length, Number(migrated.levels[location.id]) || 0), 0));
    migrated.achievements = Array.isArray(saved.achievements) ? saved.achievements : [];
    migrated.relationships = { ...fresh.relationships, ...(saved.relationships || {}) };
    migrated.dailyDay = saved.dailyDay || dailyDateKey();
    migrated.dailyObjectives = Array.isArray(saved.dailyObjectives) && migrated.dailyDay === dailyDateKey() ? saved.dailyObjectives.map(objective => ({...objective, progress:Math.max(0,Number(objective.progress)||0), claimed:Boolean(objective.claimed), reward:{...(objective.reward||{})}})) : makeDailyObjectives();
    migrated.storyChores = saved.storyChores && typeof saved.storyChores === 'object' && !Array.isArray(saved.storyChores) ? saved.storyChores : {};
    migrated.storyMoments = Array.isArray(saved.storyMoments) ? saved.storyMoments.filter(moment => moment && Array.isArray(moment.lines)).slice(-10) : [];
    migrated.dailyStreak = Math.max(0, Number(saved.dailyStreak) || 0);
    migrated.eventClaimed = Array.isArray(saved.eventClaimed) ? saved.eventClaimed : [];
    migrated.cafeFloor = CAFE_FLOORS.some(floor => floor.id === saved.cafeFloor) ? saved.cafeFloor : fresh.cafeFloor;
    migrated.locationStyles = Object.fromEntries(LOCATIONS.map(location => {
      const savedStyles = saved.locationStyles?.[location.id] && typeof saved.locationStyles[location.id] === 'object' ? saved.locationStyles[location.id] : {};
      const validStyles = {};
      Object.entries(RESTORATION_DESIGNS[location.id] || {}).forEach(([, design]) => {
        const choiceId = savedStyles[design.key];
        if (design.choices.some(choice => choice.id === choiceId)) validStyles[design.key] = choiceId;
      });
      return [location.id, validStyles];
    }));
    const pending = saved.pendingRestoration;
    migrated.pendingRestoration = pending && LOCATIONS.some(location => location.id === pending.locationId) && Number.isInteger(Number(pending.level))
      ? { locationId:pending.locationId, level:Math.max(1,Math.min(8,Number(pending.level))), phase:['design','install','reaction','complete'].includes(pending.phase) ? pending.phase : 'reaction', designKey:String(pending.designKey || '') }
      : null;
    migrated.victorySeen = Boolean(saved.victorySeen);
    const now = Date.now();
    const rawElapsed = Math.max(0, now - (Number(saved.lastTick) || now));
    const elapsed = Math.min(rawElapsed, OFFLINE_CAP_MS);
    const gained = Math.floor(elapsed / ENERGY_TICK_MS);
    migrated.offlineEnergyGained = Math.min(gained, Math.max(0, maxEnergyFor(migrated) - migrated.energy));
    migrated.energy = Math.min(maxEnergyFor(migrated), migrated.energy + migrated.offlineEnergyGained);
    migrated.lastTick = rawElapsed > OFFLINE_CAP_MS ? now : now - (elapsed % ENERGY_TICK_MS);
    return migrated;
  } catch (error) {
    return null;
  }
}

function maxEnergyFor(data) {
  return Math.max(MAX_ENERGY, Math.min(200, Number(data?.maxEnergy) || MAX_ENERGY));
}

function storyChapterIndex() {
  return Math.max(0, Math.min(CHAPTERS.length - 1, (Number(state?.chapter) || 0) - 1));
}

function storyChoreContext() {
  const chapterIndex = storyChapterIndex();
  const savedTrack = state.storyChores?.[chapterIndex] || {};
  const stepIndex = Math.max(0, Math.min(STORY_CHORE_STEPS.length, Number(savedTrack.step) || 0));
  const template = STORY_CHORE_STEPS[stepIndex] || null;
  const chapterLocation = LOCATIONS.find(entry => entry.id === CHAPTER_LOCATION_IDS[chapterIndex]) || LOCATIONS[0];
  const location = template?.kind === 'restorations' ? nextRestorationGoal() || chapterLocation : chapterLocation;
  const locationStage = location && RESTORATION_STAGES[location.id]?.[Number(state.levels[location.id]) || 0];
  const chore = template ? {
    ...template,
    day: stepIndex === 7 ? 'FINAL BEAT' : stepIndex < 4 ? 'DAY 1 · HARBOR MORNING' : 'DAY 2 · THE THREAD DEEPENS',
    title: template.kind === 'restorations' && locationStage ? locationStage[0] : template.title,
    detail: template.kind === 'restorations' && locationStage ? `${location.name}: ${locationStage[1]}` : `${template.detail} ${location ? `The ${location.name.toLowerCase()} is at the heart of “${CHAPTERS[chapterIndex].title}.”` : ''}`,
    location
  } : null;
  return {
    chapterIndex,
    chapter: CHAPTERS[chapterIndex],
    stepIndex,
    progress: Math.max(0, Number(savedTrack.progress) || 0),
    chore
  };
}

function recordStoryAction(kind, amount = 1) {
  const context = storyChoreContext();
  if (!context.chore || context.chore.kind !== kind) return;
  const key = String(context.chapterIndex);
  const track = state.storyChores[key] || (state.storyChores[key] = { step: 0, progress: 0 });
  track.progress = Math.min(context.chore.target, context.progress + Math.max(1, Number(amount) || 1));
  if (track.progress >= context.chore.target) {
    track.step = Math.min(STORY_CHORE_STEPS.length, context.stepIndex + 1);
    track.progress = 0;
    feedbackMessage = `Story chore complete: ${context.chore.title}. The harbor day moves on.`;
    showFloat('CHORE COMPLETE!');
  }
  saveState();
}

function isStoryPriorityTask(task) {
  const chore = storyChoreContext().chore;
  return Boolean(chore?.kind === 'orders' && task?.who === chore.character);
}

function queueOrderStory(task, deliveredItem) {
  const who = CHARS[task?.who] ? task.who : 'mae';
  const character = CHARS[who];
  const reply = who === 'iris' ? 'mae' : 'iris';
  const reactions = {
    mae: `That ${deliveredItem?.name || 'item'} is just what the crew needed. Thank you for looking after all of us.`,
    theo: `Good timing. I checked the measurements twice, so this should fit on the first try. Probably.`,
    iris: `Another detail in place. The harbor story is easier to read when everyone adds a line.`,
    cora: `A useful thing, delivered at the right tide. You are learning how this harbor works.`,
    rowan: `Sound materials and a steady hand. That is how a lasting repair begins.`,
    jules: `This will help something lovely take root. The little things matter, too.`,
    adrian: `Exactly what the square needed. I will make sure the whole crew hears who helped.`,
    nora: `I have recorded the delivery carefully. It belongs in the account of how we rebuilt.`,
    milo: `You came through! I will get this to the crew before the tide changes.`,
    selene: `That is a detail worth keeping. The best harbor stories are made together.`,
    tamsin: `Perfect! The crew will have what they need—and I can finally serve the good biscuits.`
  };
  const replyLine = who === 'iris'
    ? 'I will save you a place at Mae’s table. Good work deserves a proper thank-you.'
    : 'I am adding this to the Gazette: the harbor gets stronger whenever someone shows up.';
  state.storyMoments.push({
    title: `${character.name} · A neighbor’s thanks`,
    art: STORY_LOCATION_ART[who] || 'assets/harbor-bg.webp',
    lines: [[who, reactions[who]], [reply, replyLine]]
  });
  if (state.storyMoments.length > 10) state.storyMoments.splice(0, state.storyMoments.length - 10);
}

let state = loadState() || newState();
let currentBoardKey = 'main';
let selectedIndex = -1;
let drag = null;
let dialogueQueue = [];
let dialogueOpen = false;
let feedbackMessage = 'Make treats, fill requests for stars, and spend coins to restore the harbor!';
let tutorialStep = null;
let tutorialGeneratorIndex = 6;
let tutorialMergeTargets = null;
let tutorialShade = null;
let tutorialPanel = null;
let mergeHintPair = null;
let lastPlayerActionAt = Date.now();
let audioContext = null;
let muted = false;
try {
  muted = localStorage.getItem('harbor-whispers-muted') === 'true';
} catch (error) {
  // Sound remains enabled by default when browser storage is unavailable.
}
const container = document.getElementById('game-container');
const music = new Audio('assets/audio/harbor-music.mp3');
music.loop = true;
music.volume = 0.28;
const popSfx = new Audio('assets/audio/merge-pop.mp3');

function saveState() {
  try {
    localStorage.setItem(SAVE_KEY, JSON.stringify(state));
  } catch (error) {
    // The session stays playable if browser storage is unavailable.
  }
}

function unlockAudio() {
  if (!audioContext) {
    const AudioContextClass = window.AudioContext || window.webkitAudioContext;
    if (AudioContextClass) audioContext = new AudioContextClass();
  }
  if (audioContext?.state === 'suspended') audioContext.resume().catch(() => {});
  if (!muted && music.paused) music.play().catch(() => {});
}

function beep(frequency = 600) {
  if (muted || !audioContext) return;
  const oscillator = audioContext.createOscillator();
  const gain = audioContext.createGain();
  oscillator.type = 'triangle';
  oscillator.frequency.value = frequency;
  gain.gain.setValueAtTime(0.12, audioContext.currentTime);
  gain.gain.exponentialRampToValueAtTime(0.001, audioContext.currentTime + 0.2);
  oscillator.connect(gain).connect(audioContext.destination);
  oscillator.start();
  oscillator.stop(audioContext.currentTime + 0.2);
}

function playPop() {
  if (muted) return;
  popSfx.currentTime = 0;
  popSfx.play().catch(() => {});
  beep(740);
}

function mainBoard() {
  return state.boards.main;
}
function activeBoard() {
  return state.boards[currentBoardKey];
}

function findItems(familyId, tier, quantity = 1) {
  const matches = [];
  mainBoard().forEach((cell, index) => {
    if (matches.length < quantity && cell && !cell.gen && !cell.covered && cell.fam === familyId && cell.tier === tier) matches.push(index);
  });
  return matches.length === quantity ? matches : [];
}

function findItem(familyId, tier) {
  return findItems(familyId, tier, 1)[0] ?? -1;
}

function currentRequirement(task) {
  return task?.requirements?.[task.stage || 0] || { fam: task?.fam, tier: task?.tier, quantity: task?.quantity || 1 };
}

function taskReady(task) {
  const requirement = currentRequirement(task);
  return findItems(requirement.fam, requirement.tier, requirement.quantity || 1).length > 0;
}

function accessibleFamilies() {
  return state.unlockedFamilies.filter(id => FAMILIES[id] && id !== 'shell');
}

function makeTask(requestedWho = '') {
  const depth = Math.min(8, 2 + Math.floor(state.chapter / 2) + Math.floor(state.playerLevel / 8));
  const pool = TASK_TEMPLATES.filter(template => accessibleFamilies().includes(template.family) && template.tier <= depth);
  const template = pool[Math.floor(Math.random() * pool.length)] || TASK_TEMPLATES[0];
  const family = template.family;
  const tier = template.tier;
  const characters = Object.keys(CHARS);
  const who = CHARS[requestedWho] ? requestedWho : characters[Math.floor(Math.random() * characters.length)];
  const notes = REQUEST_NOTES[who] || REQUEST_NOTES.mae;
  const task = {
    fam: family, tier, who, kind: template.kind, title: template.kind === 'quick' ? 'Quick harbor favor' : 'Neighbor request',
    quantity: template.quantity > 1 && tier <= 3 ? template.quantity : 1,
    coins: taskCoins(tier) + (state.chapter * 8), energy: taskEnergy(tier), stars: tier >= 6 ? 3 : tier >= 3 ? 2 : 1,
    pearls: tier >= 6 ? 1 : 0, xp: 25 + tier * 10,
    note: notes[Math.floor(Math.random() * notes.length)], stage: 0
  };
  if ((state.chapter >= 5 || state.playerLevel >= 8) && Math.random() < 0.16) {
    task.kind = 'multi-stage';
    task.title = 'A few things for the crew';
    task.requirements = Array.from({ length: 3 }, (_, index) => {
      const stageTemplate = pool[Math.floor(Math.random() * pool.length)] || template;
      return { fam: stageTemplate.family, tier: Math.min(stageTemplate.tier, Math.max(2, depth - index)), quantity: 1 };
    });
    task.fam = task.requirements[0].fam;
    task.tier = task.requirements[0].tier;
    task.quantity = 1;
    task.coins = Math.round(task.coins * 1.7);
    task.energy += 2;
    task.stars += 1;
    task.pearls += 1;
  }
  return task;
}

function fillTasks() {
  const characters = Object.keys(CHARS);
  const assigned = new Set(state.tasks.map(task => task.who).filter(id => characters.includes(id)));
  while (characters.some(id => !assigned.has(id))) {
    const nextCharacter = characters.find(id => !assigned.has(id));
    state.tasks.push(makeTask(nextCharacter));
    assigned.add(nextCharacter);
  }
}

function placePendingGenerators() {
  if (!Array.isArray(state.pendingGenerators)) state.pendingGenerators = [];
  const cells = mainBoard();
  while (state.pendingGenerators.length) {
    const spot = cells.findIndex(cell => !cell);
    if (spot < 0) return;
    const familyId = state.pendingGenerators.shift();
    if (cells.some(cell => cell?.gen === familyId)) continue;
    cells[spot] = { gen: familyId, level: state.generatorLevels[familyId] || 1, charges: GEN_CHARGES, readyAt: 0 };
  }
}

function unlockAvailableGenerators() {
  GENERATOR_DEFS.forEach(definition => {
    if (state.chapter < definition.unlockChapter || state.playerLevel < definition.unlockLevel || state.unlockedFamilies.includes(definition.family)) return;
    state.unlockedFamilies.push(definition.family);
    if (!Array.isArray(state.pendingGenerators)) state.pendingGenerators = [];
    state.pendingGenerators.push(definition.family);
    showFloat(`${definition.icon} ${definition.name} unlocked!`);
  });
  placePendingGenerators();
}

const ACHIEVEMENT_DEFS = (() => {
  const sets = [
    ['merges','Harbor Merges',[1,10,25,50,100,200,500,1000]],
    ['orders','Neighborly Orders',[1,5,10,25,50,100,200,400]],
    ['discoveries','Curious Collector',[1,5,10,20,40]],
    ['restorations','Restoration Crew',[1,5,10,20]],
    ['playerLevel','Steady Sailor',[5,10,20,30,50]],
    ['chapters','Story Keeper',[1,6,10,14,18]],
    ['eventPoints','Picnic Pal',[10,50,150]],
    ['fiveMerges','Tidy Combiner',[1,10,50]]
  ];
  return sets.flatMap(([kind,label,thresholds]) => thresholds.map((target,index) => ({ id:`${kind}-${target}`, kind, target, title:`${label} ${index + 1}`, reward:25 + (index + 1) * 10 })));
})();

function checkAchievements() {
  ACHIEVEMENT_DEFS.forEach(achievement => {
    if (state.achievements.includes(achievement.id)) return;
    const current = achievement.kind === 'playerLevel' ? state.playerLevel : achievement.kind === 'chapters' ? state.chapter : state.stats[achievement.kind] || 0;
    if (current < achievement.target) return;
    state.achievements.push(achievement.id);
    state.coins += achievement.reward;
    if (state.achievements.length % 4 === 0) state.pearls += 1;
    grantXP(30);
    showFloat(`Achievement · ${achievement.title} +${achievement.reward}🪙`);
  });
}

function advanceStory() {
  const unlocked = [];
  while (state.chapter < CHAPTERS.length && state.starsToward >= storyStarGoal(state.chapter)) {
    state.starsToward -= storyStarGoal(state.chapter);
    unlocked.push(CHAPTERS[state.chapter]);
    state.chapter += 1;
    state.coins += 70;
    grantEnergy(8);
    grantXP(60);
    unlockAvailableGenerators();
  }
  checkAchievements();
  if (unlocked.length) dialogueQueue.push(...unlocked);
  saveState();
  openNextDialogue();
}

function completeTask(index) {
  const task = state.tasks[index];
  if (!task || !taskReady(task)) return;
  const sourcePoint = captureElementPoint(container.querySelector(`[data-serve-task="${index}"]`) || container.querySelector(`[data-task="${index}"]`));
  const requirement = currentRequirement(task);
  const deliveredItem = FAMILIES[requirement.fam]?.tiers[requirement.tier - 1];
  const indices = findItems(requirement.fam, requirement.tier, requirement.quantity || 1);
  if (!indices.length) return;
  indices.forEach(itemIndex => { mainBoard()[itemIndex] = null; });
  const lastStage = !task.requirements || (task.stage || 0) >= task.requirements.length - 1;
  if (!lastStage) {
    task.stage = (task.stage || 0) + 1;
    const next = currentRequirement(task);
    task.fam = next.fam;
    task.tier = next.tier;
    state.coins += 25;
    grantEnergy(2);
    grantXP(20);
    updateDailyProgress('orders');
    feedbackMessage = `Delivery ${task.stage} of ${task.requirements.length} complete. One more helpful hand!`;
    showFloat(`Stage ${task.stage}/${task.requirements.length} · +25🪙 +2⚡`);
    placePendingGenerators();
    render();
    return;
  }
  state.coins += task.coins;
  grantEnergy(task.energy);
  state.pearls += task.pearls || 0;
  state.stars += task.stars;
  state.starsToward += task.stars;
  grantXP(task.xp || 35);
  addMastery(task.fam, 12 + task.tier * 3);
  state.stats.orders += 1;
  queueOrderStory(task, deliveredItem);
  recordStoryAction('orders');
  state.relationships[task.who] = Math.min(10, (state.relationships[task.who] || 1) + 1);
  updateDailyProgress('orders');
  state.tasks.splice(index, 1);
  fillTasks();
  placePendingGenerators();
  checkAchievements();
  playPop();
  showFloat(`ORDER COMPLETE! +${task.coins}🪙${task.energy ? ` +${task.energy}⚡` : ''} +${task.stars}⭐${task.pearls ? ` +${task.pearls}🫧` : ''}`);
  render();
  animateOrderRewards(sourcePoint, task);
  advanceStory();
}

function characterPortrait(who, className = 'character-portrait') {
  const character = CHARS[who] || CHARS.mae;
  if (character.img) return `<img class="${className}" src="${character.img}" alt="${character.name}">`;
  const initials = character.name.split(' ').map(part => part[0]).join('').slice(0, 2);
  return `<span class="${className} character-placeholder" style="--portrait-accent:${character.accent}" role="img" aria-label="${character.name}"><i>${character.icon}</i><b>${initials}</b></span>`;
}

function showTask(index) {
  const task = state.tasks[index];
  if (!task) return;
  const character = CHARS[task.who] || CHARS.mae;
  const requirement = currentRequirement(task);
  const family = FAMILIES[requirement.fam] || FAMILIES.coffee;
  const item = family.tiers[requirement.tier - 1];
  if (!item) return;
  const quantity = requirement.quantity || 1;
  const ready = taskReady(task);
  const stageCount = task.requirements?.length || 1;
  const stageNumber = Math.min(stageCount, (task.stage || 0) + 1);
  const stageDots = Array.from({length:stageCount},(_,stage)=>`<span class="${stage < stageNumber - 1 ? 'done' : stage === stageNumber - 1 ? 'current' : ''}" aria-label="Stage ${stage + 1}"></span>`).join('');
  const source = GENERATOR_DEFS.find(generator => generator.family === requirement.fam) || generatorDefinition(requirement.fam);
  const chain = family.tiers.map((tier, tierIndex) => {
    const tierNumber = tierIndex + 1;
    const revealed = tierNumber <= requirement.tier || state.discoveredItems.includes(tier.id);
    const current = tierNumber === requirement.tier;
    const corners = current ? '<i class="request-chain-corner corner-tl"></i><i class="request-chain-corner corner-tr"></i><i class="request-chain-corner corner-bl"></i><i class="request-chain-corner corner-br"></i>' : '';
    return `<div class="request-chain-tile ${revealed ? 'revealed' : 'mystery'} ${current ? 'current' : ''}" role="listitem" aria-label="${revealed ? `Tier ${tierNumber}: ${tier.name}${current ? ', requested item' : ''}` : `Undiscovered tier ${tierNumber}`}" title="${revealed ? tier.name : `Undiscovered tier ${tierNumber}`}" ${current ? `data-request-tier="${tierNumber}"` : ''}>${revealed ? itemArtMarkup(requirement.fam,tierNumber,'request-tier-art') : '<span>?</span>'}<small>T${tierNumber}</small>${current ? `<b class="request-quantity">${quantity}</b>${corners}` : ''}</div>`;
  }).join('');
  showModal(`<div class="request-collection" style="--quest-accent:${character.accent}">
    <header class="request-collection-title"><span class="request-title-leaf leaf-left" aria-hidden="true">🌿</span><div><small>${isStoryPriorityTask(task) ? '📖 STORY PRIORITY · ' : ''}HARBOR REQUEST</small><h2>${item.name}</h2></div><span class="request-title-leaf leaf-right" aria-hidden="true">🌿</span><button class="btn quest-close" aria-label="Close">✕</button></header>
    <h3 class="request-chain-level"><span aria-hidden="true">〰</span>Level ${requirement.tier}<span aria-hidden="true">〰</span></h3>
    <div class="request-chain-grid" role="list" aria-label="${family.name} item merge chain">${chain}</div>
    <section class="request-generator-section" aria-label="Item source"><div class="request-section-label"><i></i><b>Generated by:</b><i></i></div><div class="request-generator-card"><span class="request-generator-icon" aria-hidden="true">${source.icon}</span><span class="request-generator-copy"><b>${source.name}</b><small>Tap the matching generator to make an item</small></span><span class="request-generator-family" aria-hidden="true">${family.icon}</span></div></section>
    <section class="request-neighbor-note">${characterPortrait(task.who, 'request-neighbor-portrait')}<div><b>${character.name} · ${character.role}</b><small>is hoping for ${item.icon}${quantity > 1 ? ` ×${quantity}` : ''}</small><p>“${task.note || 'Could you find me one? I’ll make it worth your while!'}”</p></div></section>
    ${stageCount > 1 ? `<div class="request-order-stages">${stageDots}<small>Step ${stageNumber} of ${stageCount}</small></div>` : ''}
    <div class="request-rewards" aria-label="Request rewards"><span>🪙 <b>${task.coins}</b></span><span>⚡ <b>${task.energy}</b></span><span>⭐ <b>${task.stars}</b></span>${task.pearls ? `<span>🫧 <b>${task.pearls}</b></span>` : ''}</div>
    <div class="request-delivery-status">${ready ? 'Ready — tap SERVE on the neighbor card.' : quantity > 1 ? `Find ${quantity} matching ${family.name.toLowerCase()} items · Tier ${requirement.tier}` : `Find a matching ${family.name.toLowerCase()} · Tier ${requirement.tier}`}</div>
  </div>`, modal => {
    modal.classList.add('task-modal', 'order-chain-modal');
    modal.querySelector('.quest-close').onclick = () => modal.remove();
  });
}

function activeStories() {
  return dialogueQueue.length > 0 || dialogueOpen;
}

function openNextDialogue() {
  if (dialogueOpen) return;
  if (!dialogueQueue.length) {
    checkVictory();
    return;
  }
  dialogueOpen = true;
  showDialogue(dialogueQueue.shift(), () => {
    dialogueOpen = false;
    render();
    openNextDialogue();
  });
}

function checkVictory() {
  const allRestored = restoredCount() >= totalRestorationCount();
  if (state.victorySeen || state.chapter < CHAPTERS.length || !allRestored) return;
  state.victorySeen = true;
  saveState();
  showDialogue({
    title: 'The Harbor Comes Home',
    lines: [
      ['mae', 'Look at us! The café is warm again, the pier is safe, the garden is in bloom, and every corner of the harbor has found its people again.'],
      ['theo', 'The harbor light is shining for everyone who needs a way home. We could not have done it without this town.'],
      ['iris', 'I am printing the whole story. Not as gossip this time—as a thank-you to everyone who helped bring Harbor Whispers back to life.'],
      ['mae', 'The mystery is solved, every place is mended, and the harbor is ours again. The story may be finished, but there is always room for one more order at my café.']
    ]
  });
}

function board() {
  return activeBoard();
}

function nearestEmpty(fromIndex) {
  const cells = board();
  const originX = fromIndex % BOARD_COLS;
  const originY = Math.floor(fromIndex / BOARD_COLS);
  let choice = -1;
  let distance = Infinity;
  cells.forEach((cell, index) => {
    if (cell) return;
    const nextDistance = Math.abs(index % BOARD_COLS - originX) + Math.abs(Math.floor(index / BOARD_COLS) - originY);
    if (nextDistance < distance) {
      choice = index;
      distance = nextDistance;
    }
  });
  return choice;
}

function generatorTimeLeft(generator) {
  return Math.max(0, Math.ceil((generator.readyAt - Date.now()) / 1000));
}

function generatorDefinition(familyId) {
  return GENERATOR_DEFS.find(definition => definition.family === familyId) || { name:FAMILIES[familyId]?.name || 'Event generator', icon:FAMILIES[familyId]?.icon || '🧺', energyCost:1, drops:[[{tier:1,weight:84},{tier:2,weight:14},{tier:3,weight:2}]] };
}

function generatorLevel(familyId) {
  return Math.max(1, Math.min(6, Number(state.generatorLevels[familyId]) || 1));
}

function generatorCapacity(familyId) {
  return GEN_CHARGES + (generatorLevel(familyId) - 1) * 2;
}

function rollDropTier(familyId) {
  const definition = generatorDefinition(familyId);
  const table = definition.drops?.[generatorLevel(familyId) - 1] || definition.drops?.[0] || [{tier:1,weight:1}];
  const total = table.reduce((sum, entry) => sum + entry.weight, 0);
  let roll = Math.random() * total;
  for (const entry of table) {
    roll -= entry.weight;
    if (roll <= 0) return entry.tier;
  }
  return 1;
}

function tapGenerator(index) {
  const generator = board()[index];
  if (!generator || !generator.gen) return;
  const seconds = generatorTimeLeft(generator);
  if (seconds > 0) {
    feedbackMessage = `${generatorDefinition(generator.gen).name} recharging — ready in ${seconds}s.`;
    render();
    return;
  }
  const definition = generatorDefinition(generator.gen);
  const energyCost = definition.energyCost || 1;
  if (state.energy < energyCost) {
    feedbackMessage = `You need ${energyCost}⚡. Orders, daily gifts and level-ups restore energy.`;
    render();
    return;
  }
  const empty = nearestEmpty(index);
  if (empty < 0) {
    feedbackMessage = 'The board is full. Merge, move, store, or deliver an item first!';
    render();
    return;
  }
  state.energy -= energyCost;
  const tier = rollDropTier(generator.gen);
  board()[empty] = { fam: generator.gen, tier };
  generator.charges = Number.isFinite(generator.charges) ? generator.charges - 1 : generatorCapacity(generator.gen) - 1;
  if (generator.charges <= 0) {
    generator.charges = generatorCapacity(generator.gen);
    generator.readyAt = Date.now() + Math.max(8_000, GEN_COOLDOWN_MS - (generatorLevel(generator.gen) - 1) * 2_000);
  }
  state.stats.generated += 1;
  updateDailyProgress('generated');
  addMastery(generator.gen, 2 + tier);
  recordDiscovery(generator.gen, tier);
  checkAchievements();
  feedbackMessage = `${definition.icon} ${definition.name} made a ${FAMILIES[generator.gen].tiers[tier - 1].name}.`;
  beep(500);
  render(empty);
  if (tutorialStep === 0) advanceTutorial(1);
}

function recordMerge(familyId, tier, mergeCount = 1, bonusOutputs = 0) {
  state.stats.merges += 1;
  updateDailyProgress('merges');
  addMastery(familyId, 8 + tier * 4 + mergeCount * 2);
  grantXP(12 + tier * 8 + (mergeCount === 5 ? 24 : 0));
  recordDiscovery(familyId, tier + 1);
  if (familyId === 'shell') {
    state.eventPoints += tier * (mergeCount === 5 ? 4 : mergeCount === 3 ? 2 : 1);
    state.stats.eventPoints = Math.max(state.stats.eventPoints, state.eventPoints);
  }
  if (mergeCount === 5) state.stats.fiveMerges += 1;
  if (currentBoardKey === 'main') recordStoryAction('merges', mergeCount);
  if (Math.random() < 0.08) {
    grantEnergy(1);
    showFloat('+1⚡ bonus');
  }
  checkAchievements();
  if (bonusOutputs) recordDiscovery(familyId, tier + 1);
}

function moveOrMerge(from, to) {
  if (tutorialStep !== null && (tutorialStep !== 1 || !tutorialMergeTargets || !tutorialMergeTargets.includes(from) || !tutorialMergeTargets.includes(to))) return false;
  const cells = board();
  const first = cells[from];
  const second = cells[to];
  if (from === to || !first || first.gen) return false;
  if (first.locked) {
    feedbackMessage = 'This item is locked. Unlock it from its item details before moving it.';
    render();
    return true;
  }
  if (first.covered) {
    feedbackMessage = 'That item is bundled under straw. Merge an uncovered match into it to uncover it!';
    render();
    return true;
  }
  if (second?.gen) {
    feedbackMessage = 'Generators stay in place. Drop items on a free space or a match.';
    render();
    return true;
  }
  if (second?.locked) {
    feedbackMessage = 'That item is locked. Unlock it before merging or moving it.';
    render();
    return true;
  }
  if (second && second.fam === first.fam && second.tier === first.tier && first.tier < FAMILIES[first.fam].items.length) {
    cells[from] = null;
    cells[to] = { fam:first.fam, tier:first.tier + 1 };
    feedbackMessage = `${FAMILIES[first.fam].name}: ${FAMILIES[first.fam].items[first.tier - 1]} → ${FAMILIES[first.fam].items[first.tier]}`;
    recordMerge(first.fam, first.tier);
    playPop();
    if (tutorialStep === 1) advanceTutorial(2);
    placePendingGenerators();
    render(to);
    return true;
  }
  if (second?.covered) {
    feedbackMessage = 'Match the same item to clear the straw and uncover what is underneath.';
    render();
    return true;
  }
  if (!second) {
    cells[to] = first;
    cells[from] = null;
  } else {
    cells[to] = first;
    cells[from] = second;
  }
  feedbackMessage = 'Items moved. Matching family and tier items merge; tap an item twice for details and larger merges.';
  render();
  return true;
}

function mergeSelectedGroup(index, groupSize) {
  const cell = board()[index];
  if (!cell || cell.gen || cell.covered || cell.locked || cell.tier >= FAMILIES[cell.fam].tiers.length) return;
  const matches = board().map((entry, cellIndex) => entry && !entry.gen && !entry.covered && !entry.locked && entry.fam === cell.fam && entry.tier === cell.tier ? cellIndex : -1).filter(cellIndex => cellIndex >= 0).slice(0, groupSize);
  if (matches.length < groupSize) return;
  const cells = board();
  const outputCount = groupSize === 5 ? 2 : 1;
  matches.forEach(cellIndex => { cells[cellIndex] = null; });
  cells[matches[0]] = { fam:cell.fam, tier:cell.tier + 1 };
  if (outputCount === 2) cells[matches[1]] = { fam:cell.fam, tier:cell.tier + 1 };
  recordMerge(cell.fam, cell.tier, groupSize, outputCount - 1);
  playPop();
  showFloat(groupSize === 5 ? 'Five merge · 2 higher-tier items!' : 'Three merge · higher-tier item!');
  selectedIndex = matches[0];
  render(matches[0]);
}

function toggleItemLock(index) {
  const cell = board()[index];
  if (!cell || cell.gen) return;
  cell.locked = !cell.locked;
  feedbackMessage = cell.locked ? 'Item locked · it cannot be moved, merged or sold.' : 'Item unlocked and ready to move.';
  render(index);
}

function putItemInInventory(index) {
  const cell = board()[index];
  if (!cell || cell.gen || cell.covered || state.inventory.length >= state.inventoryCapacity) return;
  state.inventory.push({ fam:cell.fam, tier:cell.tier, locked:Boolean(cell.locked), quantity:1 });
  board()[index] = null;
  selectedIndex = -1;
  placePendingGenerators();
  feedbackMessage = 'Item safely stored in your inventory.';
  render();
}

function sellBoardItem(index) {
  const cell = board()[index];
  if (!cell || cell.gen || cell.covered || cell.locked) return;
  const tier = FAMILIES[cell.fam].tiers[cell.tier - 1];
  if (cell.tier >= 5 && !window.confirm(`Sell ${tier.name} for ${tier.sellValue} coins?`)) return;
  board()[index] = null;
  state.coins += tier.sellValue;
  grantXP(Math.max(2, tier.xpValue));
  selectedIndex = -1;
  placePendingGenerators();
  showFloat(`+${tier.sellValue}🪙`);
  render();
}

function showItemDetails(index) {
  const cell = board()[index];
  if (!cell || cell.gen) return;
  const family = FAMILIES[cell.fam];
  const item = family.tiers[cell.tier - 1];
  const matchCount = board().filter(entry => entry && !entry.gen && !entry.covered && !entry.locked && entry.fam === cell.fam && entry.tier === cell.tier).length;
  showModal(`<div class="sheet-heading"><div><div class="story-kicker">${family.name.toUpperCase()} · TIER ${cell.tier}/8</div><h2>${itemArtMarkup(cell.fam,cell.tier,'detail-item-art')} ${item.name}</h2></div><button class="btn close-sheet" aria-label="Close">✕</button></div><p>${item.description}</p><div class="item-stats"><span>Sell value <b>${item.sellValue}🪙</b></span><span>Merge XP <b>+${item.xpValue} XP</b></span><span>Family mastery <b>Lv ${state.familyMastery[cell.fam]?.level || 1}</b></span></div><div class="item-detail-actions"><button class="btn item-lock">${cell.locked ? 'Unlock item' : 'Lock item'}</button><button class="btn item-store" ${state.inventory.length >= state.inventoryCapacity || cell.covered ? 'disabled' : ''}>Store</button><button class="btn item-sell" ${cell.locked || cell.covered ? 'disabled' : ''}>Sell · ${item.sellValue}🪙</button></div><div class="item-detail-actions merge-options">${matchCount >= 3 && cell.tier < 8 ? '<button class="btn primary merge-three">Merge 3 → 1</button>' : ''}${matchCount >= 5 && cell.tier < 8 ? '<button class="btn primary merge-five">Merge 5 → 2</button>' : ''}</div><p class="item-chain">${family.tiers.map((tier,index)=>`<span class="${index + 1 === cell.tier ? 'current' : state.discoveredItems.includes(tier.id) ? '' : 'unknown'}">${state.discoveredItems.includes(tier.id) ? itemArtMarkup(cell.fam,index + 1,'detail-chain-art') : '◆'}<small>T${index + 1}</small></span>`).join('<i>›</i>')}</p>`, modal => {
    modal.querySelector('.close-sheet').onclick = () => modal.remove();
    modal.querySelector('.item-lock').onclick = () => { modal.remove(); toggleItemLock(index); };
    modal.querySelector('.item-store').onclick = () => { if (state.inventory.length >= state.inventoryCapacity) return; modal.remove(); putItemInInventory(index); };
    modal.querySelector('.item-sell').onclick = () => { modal.remove(); sellBoardItem(index); };
    modal.querySelector('.merge-three')?.addEventListener('click', () => { modal.remove(); mergeSelectedGroup(index, 3); });
    modal.querySelector('.merge-five')?.addEventListener('click', () => { modal.remove(); mergeSelectedGroup(index, 5); });
  });
}

const ITEM_ART_ATLASES = {
  coffee: 'assets/harbor-bakery-atlas.webp',
  flower: 'assets/harbor-market-atlas.webp',
  fish: 'assets/harbor-seafood-atlas.webp',
  office: 'assets/harbor-pantry-atlas.webp'
};

function itemArtMarkup(familyId, tier, className = 'cell-icon') {
  const item = FAMILIES[familyId]?.tiers[tier - 1];
  if (!item) return '';
  const atlas = ITEM_ART_ATLASES[familyId];
  if (!atlas) return `<span class="${className}" aria-hidden="true">${item.icon}</span>`;
  const column = (tier - 1) % 4;
  const row = Math.floor((tier - 1) / 4);
  const position = `${column * (100 / 3)}% ${row * 100}%`;
  return `<span class="${className} item-art" style="--item-sheet:url('${atlas}');--item-position:${position}" aria-hidden="true"></span>`;
}

function describeItem(cell) {
  if (cell.gen) {
    const seconds = generatorTimeLeft(cell);
    const definition = generatorDefinition(cell.gen);
    return `${definition.icon} ${definition.name} · level ${generatorLevel(cell.gen)} · ${cell.charges}/${generatorCapacity(cell.gen)} drops${seconds ? ` · ready in ${seconds}s` : ' · ready!'}`;
  }
  const family = FAMILIES[cell.fam];
  const item = family.tiers[cell.tier - 1];
  return `${cell.covered ? 'Straw-covered ' : ''}${item.icon} ${item.name} · ${family.name}, tier ${cell.tier}/${family.tiers.length}${cell.locked ? ' · locked' : ''}${cell.covered ? ' · merge a matching item to uncover it' : ''}`;
}

function cellIndexAt(x, y) {
  const target = document.elementFromPoint(x, y);
  const cell = target?.closest('.cell');
  return cell ? Number(cell.dataset.i) : -1;
}

container.addEventListener('pointerdown', event => {
  lastPlayerActionAt = Date.now();
  mergeHintPair = null;
  container.querySelectorAll('.merge-hint').forEach(element => element.classList.remove('merge-hint'));
  container.querySelectorAll('.hint-finger').forEach(element => element.remove());
  unlockAudio();
  const cellElement = event.target.closest('.cell');
  if (!cellElement) return;
  const index = Number(cellElement.dataset.i);
  drag = { from: index, x: event.clientX, y: event.clientY, moved: false, ghost: null, cell: board()[index] };
});

window.addEventListener('pointermove', event => {
  if (!drag?.cell || drag.cell.gen) return;
  if (!drag.moved && Math.hypot(event.clientX - drag.x, event.clientY - drag.y) > 8) {
    drag.moved = true;
    drag.ghost = document.createElement('div');
    drag.ghost.className = 'drag';
    drag.ghost.innerHTML = itemArtMarkup(drag.cell.fam, drag.cell.tier, 'drag-item-art');
    document.body.appendChild(drag.ghost);
  }
  if (drag.ghost) {
    drag.ghost.style.left = `${event.clientX}px`;
    drag.ghost.style.top = `${event.clientY}px`;
  }
});

window.addEventListener('pointerup', event => {
  if (!drag) return;
  const currentDrag = drag;
  drag = null;
  if (currentDrag.ghost) {
    currentDrag.ghost.remove();
    const target = cellIndexAt(event.clientX, event.clientY);
    if (target >= 0) moveOrMerge(currentDrag.from, target);
    selectedIndex = -1;
    return;
  }
  handleTap(currentDrag.from);
});

function handleTap(index) {
  if (tutorialStep !== null) {
    const allowed = tutorialStep === 0
      ? index === tutorialGeneratorIndex
      : tutorialStep === 1 && tutorialMergeTargets?.includes(index);
    if (!allowed) {
      feedbackMessage = 'Follow Iris’s highlighted step to continue the guide.';
      render();
      return;
    }
  }
  const item = board()[index];
  if (selectedIndex === index && item && !item.gen) {
    showItemDetails(index);
    return;
  }
  if (item?.covered && selectedIndex < 0) {
    feedbackMessage = 'This treat is hidden under straw. Merge an uncovered match into it to reveal the next treat!';
    render();
    return;
  }
  if (selectedIndex >= 0 && selectedIndex !== index && board()[selectedIndex]) {
    const from = selectedIndex;
    selectedIndex = -1;
    if (moveOrMerge(from, index)) return;
  }
  if (item?.gen) {
    selectedIndex = -1;
    tapGenerator(index);
    return;
  }
  selectedIndex = item ? index : -1;
  render();
  if (item) feedbackMessage = describeItem(item);
}

function showFloat(text) {
  const element = document.createElement('div');
  element.className = 'float';
  element.textContent = text;
  element.style.left = '50%';
  element.style.top = '42%';
  document.body.appendChild(element);
  window.setTimeout(() => element.remove(), 1100);
}

function captureElementPoint(element) {
  const rect = element?.getBoundingClientRect?.();
  return rect ? { x: rect.left + rect.width / 2, y: rect.top + rect.height / 2 } : { x: window.innerWidth / 2, y: window.innerHeight * 0.45 };
}

function flyReward({ sourceElement, sourcePoint, targetElement, type = 'coins', amount = 0 }) {
  if (!targetElement) return;
  const start = sourcePoint || captureElementPoint(sourceElement);
  const end = captureElementPoint(targetElement);
  const icons = { coins:'🪙', stars:'⭐', energy:'⚡', pearls:'💎', xp:'✦' };
  const reward = document.createElement('div');
  reward.className = `reward-fly reward-fly-${type}`;
  reward.textContent = `${icons[type] || '✦'}${amount ? ` +${amount}` : ''}`;
  reward.setAttribute('aria-hidden', 'true');
  reward.style.left = `${start.x}px`;
  reward.style.top = `${start.y}px`;
  document.body.appendChild(reward);
  targetElement.classList.add('reward-target-pop');
  window.setTimeout(() => targetElement.classList.remove('reward-target-pop'), 700);
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches || typeof reward.animate !== 'function') {
    window.setTimeout(() => reward.remove(), 80);
    return;
  }
  const animation = reward.animate([
    { left:`${start.x}px`, top:`${start.y}px`, opacity:1, transform:'translate(-50%,-50%) scale(.9) rotate(-7deg)' },
    { left:`${(start.x + end.x) / 2 + (type === 'stars' ? -15 : 12)}px`, top:`${Math.min(start.y,end.y) - 34}px`, opacity:1, transform:'translate(-50%,-50%) scale(1.08) rotate(8deg)', offset:.58 },
    { left:`${end.x}px`, top:`${end.y}px`, opacity:.15, transform:'translate(-50%,-50%) scale(.48) rotate(18deg)' }
  ], { duration:640, easing:'cubic-bezier(.2,.72,.28,1)', fill:'forwards' });
  animation.onfinish = () => reward.remove();
}

function animateOrderRewards(sourcePoint, task) {
  const rewards = [
    ['coins', task.coins, '.coin-pill'],
    ['energy', task.energy, '.energy-pill'],
    ['stars', task.stars, '.star-pill'],
    ['pearls', task.pearls || 0, '.gem-pill']
  ].filter(([, amount]) => amount > 0);
  rewards.forEach(([type, amount, selector], index) => {
    window.setTimeout(() => flyReward({ sourcePoint, targetElement:container.querySelector(selector), type, amount }), index * 85);
  });
}

function showModal(content, bind) {
  const modal = document.createElement('div');
  modal.className = 'modal';
  modal.innerHTML = `<div class="sheet" role="dialog" aria-modal="true">${content}</div>`;
  modal.addEventListener('pointerdown', event => {
    if (event.target === modal && !modal.classList.contains('keep-open')) modal.remove();
  });
  document.body.appendChild(modal);
  bind?.(modal);
  return modal;
}

const STORY_SCENES = [
  'assets/restore-cafe-before.webp',
  'assets/restore-pier-before.webp',
  'assets/restore-gazette-before.webp',
  'assets/restore-garden-before.webp',
  'assets/restore-pier-scene.webp',
  'assets/restore-cafe-scene.webp',
  'assets/restore-gazette-scene.webp',
  'assets/restore-garden-scene.webp'
];

function storyArtwork(chapter) {
  if (chapter?.art && /^assets\/[\w/-]+\.webp$/.test(chapter.art)) return chapter.art;
  const chapterIndex = CHAPTERS.indexOf(chapter);
  if (chapterIndex >= 0) return STORY_SCENES[chapterIndex % STORY_SCENES.length];
  if (chapter?.title === 'The Harbor Comes Home') return 'assets/restore-pier-scene.webp';
  return 'assets/harbor-bg.webp';
}

function showDialogue(chapter, onClose = () => {}) {
  let lineIndex = 0;
  let closed = false;
  let isTyping = false;
  let typewriterTimer = 0;
  const lines = Array.isArray(chapter?.lines) && chapter.lines.length ? chapter.lines : [['mae', 'The harbor always has another story to tell.']];
  const sceneArt = storyArtwork(chapter);
  const chapterIndex = CHAPTERS.indexOf(chapter);
  const kicker = chapter.isOrderMoment ? 'A NEIGHBOR’S NOTE · HARBOR JOURNAL' : chapterIndex >= 0 ? `CHAPTER ${chapterIndex + 1} · ILLUSTRATED STORY` : 'HARBOR JOURNAL · ILLUSTRATED STORY';
  const modal = document.createElement('div');
  modal.className = 'story-scene';
  modal.setAttribute('role', 'dialog');
  modal.setAttribute('aria-modal', 'true');
  document.body.appendChild(modal);
  function finishDialogue() {
    if (closed) return;
    closed = true;
    window.clearInterval(typewriterTimer);
    modal.remove();
    onClose();
  }
  function advanceLine() {
    if (isTyping) {
      window.clearInterval(typewriterTimer);
      modal.querySelector('.story-dialogue').textContent = String(lines[lineIndex]?.[1] || '');
      modal.querySelector('.story-bottom b').textContent = 'Tap to continue';
      isTyping = false;
      return;
    }
    beep(660);
    lineIndex += 1;
    if (lineIndex >= lines.length) finishDialogue();
    else drawLine();
  }
  function drawLine() {
    window.clearInterval(typewriterTimer);
    const [rawSpeaker, rawText] = lines[lineIndex] || ['mae', ''];
    const speaker = CHARS[rawSpeaker] ? rawSpeaker : 'mae';
    const text = String(rawText || '');
    const character = CHARS[speaker];
    const side = lineIndex % 2 === 0 ? 'right' : 'left';
    const speakerColor = character.accent || '#e879aa';
    const progress = ((lineIndex + 1) / lines.length) * 100;
    modal.innerHTML = `<div class="story-backdrop" style="--dialogue-art:url('${sceneArt}')" aria-hidden="true"></div><div class="story-topline"><div><small>${kicker}</small><b>${chapter.title || 'Harbor Whispers'}</b></div><button class="story-skip" aria-label="Skip story">▶▶</button></div><button class="story-advance ${side} speaker-${speaker}" data-speaker="${speaker}" style="--speaker-accent:${speakerColor}" aria-label="Continue story"><span class="story-character">${characterPortrait(speaker, 'story-portrait')}<b>${character.name}</b></span><span class="story-bubble"><span class="story-dialogue" aria-live="polite"></span></span></button><div class="story-bottom"><div class="story-progress-track"><span style="width:${progress}%"></span></div><b>Tap to finish line</b><small>${lineIndex + 1} / ${lines.length}</small></div>`;
    const dialogueText = modal.querySelector('.story-dialogue');
    const characters = Array.from(text);
    let visibleCharacters = 0;
    isTyping = true;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      dialogueText.textContent = text;
      modal.querySelector('.story-bottom b').textContent = 'Tap to continue';
      isTyping = false;
    } else {
      typewriterTimer = window.setInterval(() => {
        visibleCharacters = Math.min(characters.length, visibleCharacters + 2);
        dialogueText.textContent = characters.slice(0, visibleCharacters).join('');
        if (visibleCharacters >= characters.length) {
          window.clearInterval(typewriterTimer);
          modal.querySelector('.story-bottom b').textContent = 'Tap to continue';
          isTyping = false;
        }
      }, 28);
    }
    modal.querySelector('.story-skip').onclick = finishDialogue;
    modal.querySelector('.story-advance').onclick = advanceLine;
    modal.onclick = event => {
      if (!event.target.closest('.story-advance, .story-skip')) modal.querySelector('.story-advance').click();
    };
  }
  drawLine();
}

function showEventHelp() {
  showModal(`<div class="sheet-heading"><div><div class="story-kicker">OPTIONAL SIDE CHALLENGE</div><h2>Seaside picnic board</h2></div><button class="btn close-sheet" aria-label="Close">✕</button></div><p>This is a bonus board, not the next story chapter. Tap the picnic generator to spend 1 shared ⚡, merge matching seaside bites, and collect event points. Reach a milestone and tap <b>Claim</b> for its coins, energy, or occasional story ⭐.</p><p>Picnic rewards are one-time milestones; the main campaign moves forward through townsfolk requests and harbor repairs on the Town board. There is no event timer and nothing to lose if you ignore the picnic.</p><button class="btn primary event-return">Got it</button>`, modal => {
    modal.querySelector('.close-sheet').onclick = () => modal.remove();
    modal.querySelector('.event-return').onclick = () => modal.remove();
  });
}

function showGuide() {
  showModal(`<div class="sheet-heading"><div><div class="story-kicker">YOUR HARBOR, YOUR PACE</div><h2>How to play</h2></div><button class="btn close-sheet" aria-label="Close">✕</button></div><div class="guide-section"><b>1 · Make and merge</b><p>Tap a generator to spend 1⚡. Merge two matching items to build the goods needed for a request. Drag a match together, or tap one item and then its match. Tap the selected item again to open details, storage and larger-merge options. Matching pairs glow after a short pause.</p></div><div class="guide-section"><b>2 · Help neighbors and rebuild</b><p>Tap the green <b>SERVE</b> button on a ready neighbor card to deliver immediately, including requests for multiple items. Tap the card itself to review the merge chain and rewards. Deliver requests for coins and ⭐. Tap <b>Repairs</b> at the bottom to go straight to the next worksite in the story. Only the current repair is available; its cost and any shortage are shown before you begin. Finish it to reveal the next story-led improvement. The <b>Story journal &amp; repairs</b> option in <b>More</b> still tracks chores, chapters and repair progress. Use the left <b>Inventory</b> button to store or retrieve items. Daily goals and other harbor options are in <b>More</b>.</p></div><div class="guide-section"><b>3 · Finish the campaign, then free play</b><p>Find all ${CHAPTERS.length} chapters <em>and</em> complete all ${totalRestorationCount()} harbor improvements to unlock the epilogue. After that, keep merging on either board at your own pace.</p></div><div class="guide-section guide-calm"><b>No fail state</b><p>No lives, countdown, or losing screen. Energy refills over time; you can pause and come back whenever you like. Your progress is saved on this device.</p></div><div class="guide-actions"><button class="btn primary replay-guide">Replay the first-time guide</button><button class="btn fresh-save">Start a new harbor…</button></div>`, modal => {
    modal.querySelector('.close-sheet').onclick = () => modal.remove();
    modal.querySelector('.replay-guide').onclick = () => {
      modal.remove();
      startTutorial(0);
    };
    modal.querySelector('.fresh-save').onclick = () => {
      modal.remove();
      showResetConfirmation();
    };
  });
}

function showResetConfirmation() {
  showModal(`<div class="sheet-heading"><div><div class="story-kicker">START OVER</div><h2>Begin a new harbor?</h2></div><button class="btn close-sheet" aria-label="Close">✕</button></div><p>This permanently clears your saved story, boards, coins, energy, event rewards, and restoration progress on this device. Your sound preference will stay the same.</p><div class="reset-actions"><button class="btn cancel-reset">Keep my save</button><button class="btn confirm-reset">Erase save & restart</button></div>`, modal => {
    modal.classList.add('reset-modal');
    modal.querySelector('.close-sheet').onclick = () => modal.remove();
    modal.querySelector('.cancel-reset').onclick = () => modal.remove();
    modal.querySelector('.confirm-reset').onclick = () => {
      try {
        localStorage.removeItem(SAVE_KEY);
        window.location.reload();
      } catch (error) {
        modal.querySelector('p').textContent = 'The browser would not allow the saved game to be cleared. Check this site’s storage permissions and try again.';
      }
    };
  });
}

function ensureDailyObjectives() {
  const today = dailyDateKey();
  if (state.dailyDay !== today) {
    state.dailyDay = today;
    state.dailyObjectives = makeDailyObjectives(today);
  }
  if (!Array.isArray(state.dailyObjectives)) state.dailyObjectives = makeDailyObjectives(today);
}

function renderCollectionTabs(activeTab) {
  const tabs = [['items','Items'],['generators','Generators'],['mastery','Mastery']];
  return `<div class="collection-tabs" role="tablist">${tabs.map(([id,label]) => `<button type="button" data-collection-tab="${id}" class="${activeTab === id ? 'active' : ''}" role="tab" aria-selected="${activeTab === id}">${label}</button>`).join('')}</div>`;
}

function renderInventoryCabinet() {
  const itemTiles = state.inventory.map((entry,index) => {
    const family = FAMILIES[entry.fam];
    const item = family?.tiers[entry.tier - 1];
    if (!item) return '';
    return `<div class="cabinet-slot" role="listitem">
      <button class="cabinet-item" type="button" data-withdraw="${index}" aria-label="Take ${item.name} out of inventory" title="${item.name} · Tier ${entry.tier} · tap to take out">
        ${itemArtMarkup(entry.fam,entry.tier,'cabinet-item-art')}
        <small class="cabinet-tier">T${entry.tier}</small>
        ${entry.locked ? '<span class="cabinet-lock" aria-label="Locked">🔒</span>' : ''}
      </button>
      <button class="cabinet-sell" type="button" data-inventory-sell="${index}" aria-label="Sell ${item.name} for ${item.sellValue} coins" title="Sell for ${item.sellValue} coins">🪙</button>
    </div>`;
  }).filter(Boolean);
  const newSlot = `<button class="cabinet-new-slot" type="button" data-new-storage ${state.inventoryCapacity >= 80 ? 'disabled' : ''} aria-label="Add five inventory slots with an Extra Storage booster">
    <span class="cabinet-slot-plus">＋</span><b>New Slot</b><small>EXTRA STORAGE</small>
  </button>`;
  const shelfRows = [];
  for (let start = 0; start < itemTiles.length; start += 4) {
    shelfRows.push(itemTiles.slice(start,start + 4));
  }
  if (!shelfRows.length || shelfRows[shelfRows.length - 1].length === 4) shelfRows.push([]);
  const finalRow = shelfRows[shelfRows.length - 1];
  while (finalRow.length < 3) finalRow.push('<span class="cabinet-spacer" aria-hidden="true"></span>');
  finalRow.push(newSlot);
  const shelves = shelfRows.map(row => `<div class="cabinet-shelf-row" role="group">${row.join('')}</div>`).join('');
  return `<div class="cabinet-capacity"><span>${state.inventory.length ? 'STORED ITEMS' : 'HARBOR STORAGE'}</span><b>${state.inventory.length} / ${state.inventoryCapacity}</b></div>
    <div class="cabinet-interior"><div class="cabinet-scroll" role="list" aria-label="Stored items on the inventory shelves">
      ${state.inventory.length ? '' : '<div class="cabinet-empty-note"><span>🧺</span><b>Your shelves are ready</b><small>Store an item from the board to see it here.</small></div>'}
      ${shelves}
    </div></div>
    <div class="cabinet-instruction">Tap an item to return it to your Town board <span aria-hidden="true">✿</span></div>`;
}

function renderCollectionPage(tab) {
  if (tab === 'inventory') return renderInventoryCabinet();

  if (tab === 'generators') {
    const rows = GENERATOR_DEFS.map(definition => {
      const unlocked = state.unlockedFamilies.includes(definition.family);
      const level = generatorLevel(definition.family);
      const gen = mainBoard().find(cell => cell?.gen === definition.family);
      const pending = state.pendingGenerators.includes(definition.family);
      const cost = 150 + level * level * 75;
      const gate = state.chapter < definition.unlockChapter ? `Chapter ${definition.unlockChapter} required` : `Player level ${definition.unlockLevel} required`;
      const description = unlocked ? gen ? `${gen.charges}/${generatorCapacity(definition.family)} drops · ${generatorTimeLeft(gen) ? `${generatorTimeLeft(gen)}s recharge` : 'ready'}` : pending ? 'Unlocked · waiting for an open board space' : 'Unlocked generator' : `${gate} to unlock`;
      const action = !unlocked ? `<span class="location-lock">🔒</span>` : level >= 6 ? '<span class="built-check">MAX</span>' : `<button class="btn primary entry-action" data-gen-upgrade="${definition.family}" ${state.coins < cost ? 'disabled' : ''}>Lv ${level + 1} · ${cost}🪙</button>`;
      return `<div class="generator-entry ${unlocked ? '' : 'locked'}"><span class="generator-icon">${definition.icon}</span><div class="entry-copy"><b>${definition.name} · Lv ${level}/6</b><small>${description}</small><small>Next upgrade improves drop odds and adds two charges.</small></div>${action}</div>`;
    }).join('');
    return `<p class="panel-note">Generator upgrades apply to every copy of that family. New generators unlock through chapters and player levels, and join your board when a space is available.</p><div class="generator-list">${rows}</div>`;
  }

  if (tab === 'mastery') {
    const rows = Object.entries(FAMILIES).filter(([id]) => id !== 'shell').map(([id,family]) => {
      const mastery = state.familyMastery[id] || {xp:0,level:1};
      const threshold = mastery.level >= 10 ? 1 : mastery.level * 45;
      const progress = mastery.level >= 10 ? 100 : Math.min(100, mastery.xp / threshold * 100);
      const unlocked = state.unlockedFamilies.includes(id);
      return `<div class="mastery-entry"><span class="entry-icon">${family.icon}</span><div class="entry-copy"><b>${family.name} · Mastery ${mastery.level}/10</b><small>${unlocked ? mastery.level >= 10 ? 'Family mastery complete' : `${mastery.xp}/${threshold} mastery XP to next level` : 'Unlock this family through the story to begin mastery'}</small><div class="entry-progress"><i style="width:${unlocked ? progress : 0}%"></i></div></div><span class="location-lock">${unlocked ? `Lv ${mastery.level}` : '🔒'}</span></div>`;
    }).join('');
    return `<p class="panel-note">Make family items and merge them to earn mastery XP. Higher mastery grants occasional coins and pearls.</p><div class="mastery-list">${rows}</div>`;
  }

  const rows = Object.entries(FAMILIES).map(([id,family]) => {
    const unlocked = id === 'shell' || state.unlockedFamilies.includes(id);
    const discovered = family.tiers.filter(item => state.discoveredItems.includes(item.id)).length;
    const chain = family.tiers.map(item => {
      const found = state.discoveredItems.includes(item.id);
      return `<div class="collection-tier" title="${found ? item.name : `Undiscovered tier ${item.tier}`}"><span>${found ? itemArtMarkup(id,item.tier,'collection-item-art') : '◇'}</span><small>${found ? item.name : `Tier ${item.tier}`}</small></div>`;
    }).join('<span class="tree-arrow">›</span>');
    return `<section class="collection-family ${unlocked ? '' : 'locked'}"><div class="collection-family-head"><span>${family.icon}</span><b>${family.name}</b><small>${unlocked ? `${discovered}/8 discovered` : 'Story locked'}</small></div><div class="collection-chain">${chain}</div></section>`;
  }).join('');
  return `<p class="panel-note">Merge two identical family items to discover the next tier. Unknown tiers stay hidden until you find them. Picnic bites are a separate optional chain.</p>${rows}`;
}

function showCollection(initialTab = 'items') {
  let activeTab = initialTab;
  const inventoryView = initialTab === 'inventory';
  const content = inventoryView
    ? `<section class="inventory-cabinet" aria-label="Inventory cabinet">
        <header class="cabinet-header"><span class="cabinet-flower flower-left" aria-hidden="true">🌼</span><div class="cabinet-plaque"><small>HARBOR STORAGE</small><b>Inventory</b></div><span class="cabinet-flower flower-right" aria-hidden="true">🌸</span><button class="btn cabinet-close" type="button" aria-label="Close inventory">✕</button></header>
        <div class="collection-body"></div>
        <footer class="cabinet-base" aria-hidden="true"><span>✿</span><span>✿</span></footer>
      </section>`
    : `<div class="sheet-heading"><div><div class="story-kicker">MERGE COLLECTION</div><h2>Harbor collection</h2></div><button class="btn close-sheet" aria-label="Close">✕</button></div><div class="collection-body"></div>`;
  const modal = showModal(content, root => {
    root.classList.add(inventoryView ? 'inventory-modal' : 'collection-modal');
    root.querySelector(inventoryView ? '.cabinet-close' : '.close-sheet').onclick = () => root.remove();
  });
  const draw = () => {
    const body = modal.querySelector('.collection-body');
    body.innerHTML = inventoryView ? renderInventoryCabinet() : `${renderCollectionTabs(activeTab)}${renderCollectionPage(activeTab)}`;
    body.querySelectorAll('[data-collection-tab]').forEach(button => button.onclick = () => { activeTab = button.dataset.collectionTab; draw(); });
    body.querySelectorAll('[data-withdraw]').forEach(button => button.onclick = () => {
      const index = Number(button.dataset.withdraw);
      const stored = state.inventory[index];
      if (!stored) return;
      const empty = mainBoard().findIndex(cell => !cell);
      if (empty < 0) {
        feedbackMessage = 'The Town board is full. Clear or merge a space before retrieving an item.';
        render();
        return;
      }
      state.inventory.splice(index,1);
      mainBoard()[empty] = {fam:stored.fam,tier:stored.tier,locked:Boolean(stored.locked),covered:stored.covered ? 1 : 0};
      currentBoardKey = 'main';
      selectedIndex = empty;
      modal.remove();
      feedbackMessage = 'Item returned from inventory to the Town board.';
      render(empty);
    });
    body.querySelector('[data-new-storage]')?.addEventListener('click', () => {
      if (state.inventoryCapacity >= 80) return;
      if (!(state.boosters.extraStorage > 0)) {
        showModal(`<div class="sheet-heading"><div><div class="story-kicker">HARBOR STORAGE</div><h2>New shelf space</h2></div><button class="btn close-sheet" aria-label="Close">✕</button></div><p>An Extra Storage booster adds five inventory spaces. Your stored items are safe here; you can also sell or return them to the Town board at any time.</p>`, info => info.querySelector('.close-sheet').onclick = () => info.remove());
        return;
      }
      state.boosters.extraStorage -= 1;
      state.inventoryCapacity = Math.min(80,state.inventoryCapacity + 5);
      feedbackMessage = 'Extra Storage added five spaces to the cabinet.';
      showFloat('＋5 inventory spaces');
      saveState();
      render();
      draw();
    });
    body.querySelectorAll('[data-inventory-sell]').forEach(button => button.onclick = () => {
      const index = Number(button.dataset.inventorySell);
      const stored = state.inventory[index];
      const item = stored && FAMILIES[stored.fam]?.tiers[stored.tier - 1];
      if (!item) return;
      state.inventory.splice(index,1);
      state.coins += item.sellValue;
      grantXP(Math.max(2,item.xpValue));
      showFloat(`+${item.sellValue}🪙`);
      render();
      draw();
      saveState();
    });
    body.querySelectorAll('[data-gen-upgrade]').forEach(button => button.onclick = () => {
      const familyId = button.dataset.genUpgrade;
      const level = generatorLevel(familyId);
      const cost = 150 + level * level * 75;
      if (state.coins < cost || level >= 6) return;
      state.coins -= cost;
      state.generatorLevels[familyId] = level + 1;
      mainBoard().forEach(cell => {
        if (cell?.gen !== familyId) return;
        cell.level = level + 1;
        cell.charges = Math.min(generatorCapacity(familyId), (Number(cell.charges) || 0) + 2);
      });
      showFloat(`${generatorDefinition(familyId).name} upgraded to Lv ${level + 1}!`);
      render();
      draw();
    });
  };
  draw();
}

function renderProgressTabs(activeTab) {
  return `<div class="progress-tabs" role="tablist"><button type="button" data-progress-tab="daily" class="${activeTab === 'daily' ? 'active' : ''}" role="tab" aria-selected="${activeTab === 'daily'}">Daily goals</button><button type="button" data-progress-tab="achievements" class="${activeTab === 'achievements' ? 'active' : ''}" role="tab" aria-selected="${activeTab === 'achievements'}">Achievements</button></div>`;
}

function renderProgressPage(tab) {
  const xpProgress = Math.min(100, state.xp / Math.max(1,xpForNextLevel()) * 100);
  const profile = `<div class="player-progress"><div><span>Harbor level ${state.playerLevel}</span><span>${state.xp}/${xpForNextLevel()} XP</span></div><div class="entry-progress"><i style="width:${xpProgress}%"></i></div><small>Level rewards include coins, energy, and occasional pearls or boosters.</small></div>`;
  if (tab === 'achievements') {
    const rows = ACHIEVEMENT_DEFS.map(achievement => {
      const current = achievement.kind === 'playerLevel' ? state.playerLevel : achievement.kind === 'chapters' ? state.chapter : Number(state.stats[achievement.kind]) || 0;
      const earned = state.achievements.includes(achievement.id);
      const progress = earned ? 100 : Math.min(100,current / achievement.target * 100);
      return `<div class="achievement-entry ${earned ? 'earned' : ''}"><span class="entry-icon">${earned ? '🏅' : '🎖️'}</span><div class="entry-copy"><b>${achievement.title}</b><small>${earned ? `Earned · ${achievement.reward}🪙 reward collected` : `${current}/${achievement.target} · auto-reward ${achievement.reward}🪙 + XP`}</small><div class="entry-progress"><i style="width:${progress}%"></i></div></div></div>`;
    }).join('');
    return `${profile}<p class="panel-note">Achievements reward milestones automatically and are saved with your harbor progress.</p><div class="achievement-list">${rows}</div>`;
  }

  ensureDailyObjectives();
  const today = dailyDateKey();
  const rows = state.dailyObjectives.map((objective,index) => {
    const ready = objective.progress >= objective.target;
    const reward = objective.reward || {};
    const rewardText = [`${reward.coins || 0}🪙`,`${reward.energy || 0}⚡`,...(reward.pearls ? [`${reward.pearls}🫧`] : []),`${reward.xp || 0} XP`].filter(Boolean).join(' · ');
    return `<div class="objective-entry ${objective.claimed ? 'claimed' : ''}"><span class="entry-icon">${objective.claimed ? '✅' : '🧭'}</span><div class="entry-copy"><b>${objective.title}</b><small>${objective.claimed ? 'Claimed today' : `${Math.min(objective.progress,objective.target)}/${objective.target} progress · ${rewardText}`}</small><div class="entry-progress"><i style="width:${Math.min(100,objective.progress / objective.target * 100)}%"></i></div></div><button class="btn ${ready && !objective.claimed ? 'primary' : ''} entry-action" data-daily-claim="${index}" ${ready && !objective.claimed ? '' : 'disabled'}>${objective.claimed ? 'Done ✓' : ready ? 'Claim' : 'In progress'}</button></div>`;
  }).join('');
  const boosterRows = Object.entries(BOOSTERS).filter(([id]) => (state.boosters[id] || 0) > 0).map(([id,booster]) => {
    const supported = id === 'energyFlask' || id === 'mergeMagnet';
    return `<div class="inventory-entry"><span class="inventory-icon">${booster.icon}</span><div class="entry-copy"><b>${booster.name} ×${state.boosters[id]}</b><small>${booster.description}</small></div><button class="btn primary entry-action" data-use-booster="${id}" ${supported ? '' : 'disabled'}>${supported ? 'Use' : 'Unavailable'}</button></div>`;
  }).join('');
  return `${profile}<p class="panel-note">Daily harbor goals refresh each day. Progress comes from playing normally; there is no streak penalty for taking a break.</p><div class="objective-list">${rows}</div><div class="map-heading">HARBOR SUPPLIES</div><div class="inventory-list">${boosterRows || '<p class="panel-note">No boosters in your supply basket yet.</p>'}</div><small class="panel-note">Today · ${today}</small>`;
}

function showProgress(initialTab = 'daily') {
  ensureDailyObjectives();
  let activeTab = initialTab;
  const modal = showModal(`<div class="sheet-heading"><div><div class="story-kicker">A LITTLE PROGRESS, EVERY DAY</div><h2>Harbor goals</h2></div><button class="btn close-sheet" aria-label="Close">✕</button></div><div class="progress-body"></div>`, root => {
    root.querySelector('.close-sheet').onclick = () => root.remove();
  });
  const draw = () => {
    const body = modal.querySelector('.progress-body');
    body.innerHTML = `${renderProgressTabs(activeTab)}${renderProgressPage(activeTab)}`;
    body.querySelectorAll('[data-progress-tab]').forEach(button => button.onclick = () => { activeTab = button.dataset.progressTab; draw(); });
    body.querySelectorAll('[data-daily-claim]').forEach(button => button.onclick = () => {
      const objective = state.dailyObjectives[Number(button.dataset.dailyClaim)];
      if (!objective || objective.claimed || objective.progress < objective.target) return;
      objective.claimed = true;
      const reward = objective.reward || {};
      state.coins += reward.coins || 0;
      grantEnergy(reward.energy || 0);
      state.pearls += reward.pearls || 0;
      grantXP(reward.xp || 0);
      checkAchievements();
      showFloat('Daily goal claimed!');
      render();
      draw();
      saveState();
    });
    body.querySelectorAll('[data-use-booster]').forEach(button => button.onclick = () => {
      const id = button.dataset.useBooster;
      if (!(state.boosters[id] > 0)) return;
      if (id === 'energyFlask') {
        if (state.energy >= maxEnergy()) return;
        state.boosters[id] -= 1;
        const energyBefore = state.energy;
        grantEnergy(25);
        showFloat(`+${state.energy - energyBefore}⚡`);
        render();
        draw();
      } else if (id === 'mergeMagnet') {
        const previousBoard = currentBoardKey;
        currentBoardKey = 'main';
        const pair = findMergePair();
        if (!pair) {
          currentBoardKey = previousBoard;
          return;
        }
        state.boosters[id] -= 1;
        mergeHintPair = pair;
        modal.remove();
        feedbackMessage = 'Merge Magnet found a matching pair on the Town board.';
        render();
      }
      saveState();
    });
  };
  draw();
}

function showItemTree() {
  showCollection('items');
}

function findMergePair() {
  const cells = board();
  for (let first = 0; first < cells.length; first += 1) {
    const item = cells[first];
    if (!item || item.gen || item.covered) continue;
    for (let second = first + 1; second < cells.length; second += 1) {
      const other = cells[second];
      if (other && !other.gen && other.fam === item.fam && other.tier === item.tier && item.tier < FAMILIES[item.fam].items.length) {
        return [first, second];
      }
    }
  }
  return null;
}

function clearTutorialOverlay() {
  document.querySelectorAll('.tutorial-target').forEach(element => element.classList.remove('tutorial-target'));
  tutorialShade?.remove();
  tutorialPanel?.remove();
  tutorialShade = null;
  tutorialPanel = null;
}

function finishTutorial() {
  tutorialStep = null;
  state.tutorialSeen = true;
  state.tutorialStarted = false;
  state.tutorialStep = 0;
  clearTutorialOverlay();
  saveState();
}

function startTutorial(step = 0) {
  currentBoardKey = 'main';
  selectedIndex = -1;
  tutorialStep = Math.max(0, Math.min(3, Number(step) || 0));
  tutorialGeneratorIndex = mainBoard().findIndex(cell => cell?.gen === 'coffee' && generatorTimeLeft(cell) === 0);
  if (tutorialGeneratorIndex < 0) tutorialGeneratorIndex = mainBoard().findIndex(cell => cell?.gen && generatorTimeLeft(cell) === 0);
  if (tutorialGeneratorIndex < 0) tutorialGeneratorIndex = mainBoard().findIndex(cell => cell?.gen);
  if (tutorialGeneratorIndex < 0) tutorialGeneratorIndex = 0;
  tutorialMergeTargets = findMergePair();
  state.tutorialSeen = false;
  state.tutorialStarted = true;
  state.tutorialStep = tutorialStep;
  render();
}

function advanceTutorial(step) {
  tutorialStep = step;
  state.tutorialStep = step;
  saveState();
  refreshTutorial();
}

function refreshTutorial() {
  if (tutorialStep === null) return;
  if (!tutorialShade || !tutorialShade.isConnected) {
    tutorialShade?.remove();
    tutorialShade = document.createElement('div');
    tutorialShade.className = 'tutorial-shade';
    tutorialShade.setAttribute('aria-hidden', 'true');
    container.appendChild(tutorialShade);
  }
  if (!tutorialPanel || !tutorialPanel.isConnected) {
    tutorialPanel?.remove();
    tutorialPanel = document.createElement('aside');
    tutorialPanel.className = 'tutorial-card';
    tutorialPanel.setAttribute('aria-live', 'polite');
    container.appendChild(tutorialPanel);
  }

  document.querySelectorAll('.tutorial-target').forEach(element => element.classList.remove('tutorial-target'));
  let selectors = [];
  if (tutorialStep === 0) selectors = [`#game-container [data-i="${tutorialGeneratorIndex}"]`];
  if (tutorialStep === 1 && tutorialMergeTargets) selectors = tutorialMergeTargets.map(index => `#game-container [data-i="${index}"]`);
  if (tutorialStep === 2) selectors = ['#game-container .cell.covered'];
  if (tutorialStep === 3) selectors = ['#game-container [data-task="0"]'];
  const targets = selectors.flatMap(selector => [...document.querySelectorAll(selector)]);
  targets.forEach(element => element.classList.add('tutorial-target'));

  const noPair = tutorialStep === 1 && !tutorialMergeTargets;
  const hasWebbedTreat = mainBoard().some(cell => cell?.covered);
  const generatorFamily = mainBoard()[tutorialGeneratorIndex]?.gen;
  const mergeCell = tutorialMergeTargets ? mainBoard()[tutorialMergeTargets[0]] : null;
  const mergeItem = mergeCell ? FAMILIES[mergeCell.fam].items[mergeCell.tier - 1] : 'matching treats';
  const content = tutorialStep === 0
    ? { title: 'Make your first treat', text: `Tap the highlighted ${FAMILIES[generatorFamily]?.icon || 'bakery'} to spend 1⚡ and make a fresh item.`, action: 'Your turn ✨' }
    : tutorialStep === 1 && noPair
      ? { title: 'Merge matching treats', text: 'Drag one treat onto an identical one, or tap each in turn. Matching treats become a higher-tier item.', action: 'Continue ›' }
      : tutorialStep === 1
        ? { title: 'Merge matching treats', text: `Drag one highlighted ${mergeItem} onto its match. You can also tap the pair one after the other.`, action: 'Your turn ✨' }
        : tutorialStep === 2
          ? { title: 'Uncover a straw-covered treat', text: hasWebbedTreat ? 'Some treats are tucked beneath bundles of straw. Merge an uncovered match into the covered treat to sweep the straw aside and reveal its upgraded surprise.' : 'Some treats are hidden under straw. Match an uncovered treat into one to uncover and upgrade it.', action: 'Got it ›' }
          : { title: 'Help the townsfolk', text: 'Tap a ready request’s green SERVE button to deliver it right away. Tap the neighbor card itself to review the item chain and rewards. Deliver treats for coins and stars; tougher requests sometimes return a little energy too.', action: 'Your turn ✨' };
  const stepNumber = tutorialStep + 1;
  const showContinue = noPair || tutorialStep === 2;
  tutorialPanel.innerHTML = `<div class="tutorial-avatar"><img src="${CHARS.iris.img}" alt="Iris"><b>Iris</b></div><div class="tutorial-copy"><small>HOW TO PLAY · ${stepNumber} / 4</small><h2>${content.title}</h2><p>${content.text}</p><div class="tutorial-actions">${showContinue ? '<button class="tutorial-continue">Continue ›</button>' : `<span>${content.action}</span>`}<button class="tutorial-skip">Skip guide</button></div></div>`;
  tutorialPanel.querySelector('.tutorial-skip').onclick = finishTutorial;
  tutorialPanel.querySelector('.tutorial-continue')?.addEventListener('click', () => advanceTutorial(tutorialStep === 1 ? 2 : 3));

  const anchor = targets[0];
  const anchorY = anchor ? anchor.getBoundingClientRect().top + anchor.getBoundingClientRect().height / 2 : window.innerHeight / 2;
  if (anchorY < window.innerHeight * 0.46) {
    tutorialPanel.style.top = 'auto';
    tutorialPanel.style.bottom = 'max(10px, env(safe-area-inset-bottom))';
  } else {
    tutorialPanel.style.top = 'max(58px, env(safe-area-inset-top))';
    tutorialPanel.style.bottom = 'auto';
  }
}

function upgradeCost(location) {
  const level = state.levels[location.id] || 0;
  return 110 + level * 150 + level * level * 30;
}

function renderLocationStrip() {
  return LOCATIONS.map(location => {
    const level = Math.min(location.decos.length, state.levels[location.id] || 0);
    const decoration = level ? location.decos[level - 1] : '·';
    return `<div class="location-chip"><span>${location.icon}</span><span class="location-name">${location.name}</span><span class="location-deco">${decoration}</span><small>Lv ${level}</small></div>`;
  }).join('');
}

function restorationArt(location, level) {
  const film = RESTORATION_FILMS[location.film] || RESTORATION_FILMS.cafe;
  const detail = repairDetailState(location.id, level) || {};
  let art;
  if (location.id === 'cafe' && level === 1) art = {
    before:'assets/restore-cafe-before.webp', after:'assets/restore-cafe-after-cleanup.webp', interior:false
  };
  else if (location.id === 'cafe' && level === 2) art = {
    before:'assets/restore-cafe-after-cleanup.webp', after:'assets/restore-cafe-scene.webp', interior:false
  };
  else if (location.id === 'cafe' && level === 4) art = {
    before:'assets/restore-cafe-room-before.webp', after:'assets/restore-cafe-room-after.webp', interior:true, floorChoice:true
  };
  else if (location.id === 'cafe' && level === 6) art = {
    before:'assets/restore-cafe-kitchen-before.webp', after:'assets/restore-cafe-kitchen-after.webp', interior:true, kitchen:true
  };
  else if (location.id === 'garden' && level === 1) art = {
    before:'assets/restore-garden-before.webp', after:'assets/restore-garden-after-clearing.webp', interior:false
  };
  else if (location.id === 'garden' && level === 2) art = {
    before:'assets/restore-garden-after-clearing.webp', after:'assets/restore-garden-scene.webp', interior:false
  };
  else {
    const alreadyRestored = (Number(state.levels[location.id]) || 0) > 0;
    art = { before:alreadyRestored ? film.art : film.beforeArt, after:film.art, interior:false };
  }
  return { ...art, ...detail };
}

function restorationSceneLines(location, kind, requestedLevel = 0) {
  if (kind === 'intro') {
    const level = requestedLevel || state.pendingRestoration?.level || 1;
    const fullScene = RESTORATION_DIALOGUE[location.id] || RESTORATION_DIALOGUE.cafe;
    if (level === 1 || level === 4 || level === 8) return fullScene;
    const stage = RESTORATION_STAGES[location.id]?.[level - 1];
    const film = RESTORATION_FILMS[location.film] || RESTORATION_FILMS.cafe;
    return [[film.helper, `${stage?.[0] || 'One more repair'} is a small job, but it will make this place feel more like home.`]];
  }
  const cast = RESTORATION_CAST[location.id] || RESTORATION_CAST.cafe;
  const speaker = cast[0] || 'mae';
  const helper = cast[1] || 'rowan';
  const stage = RESTORATION_STAGES[location.id][state.pendingRestoration?.level - 1];
  const design = RESTORATION_DESIGNS[location.id]?.[state.pendingRestoration?.level];
  const selected = design?.choices.find(choice => choice.id === state.locationStyles?.[location.id]?.[design.key]);
  const firstLine = selected
    ? `The ${selected.name.toLowerCase()} finish feels just right. We made this place ours.`
    : `${stage?.[0] || 'The repair'} is ready. You can feel the harbor coming back to life.`;
  const secondLine = (RESTORATION_FILMS[location.film] || RESTORATION_FILMS.cafe).words[2];
  return [[speaker, firstLine], [helper, secondLine]];
}

function showRestorationMoment(location, level, resume = false) {
  if (!location || !RESTORATION_STAGES[location.id]?.[level - 1]) return;
  saveState();
  const stage = RESTORATION_STAGES[location.id][level - 1];
  const film = RESTORATION_FILMS[location.film] || RESTORATION_FILMS.cafe;
  const design = RESTORATION_DESIGNS[location.id]?.[level] || null;
  const art = restorationArt(location, level);
  const cast = RESTORATION_CAST[location.id] || RESTORATION_CAST.cafe;
  const cost = upgradeCost(location);
  const coinReward = 20 + level * 5;
  let phase = resume && state.pendingRestoration?.locationId === location.id
    ? state.pendingRestoration.phase === 'design' ? 'design' : 'complete'
    : 'objective';
  let selectedChoice = 0;
  let sceneTimer = 0;
  let insufficient = false;
  if (design) {
    const savedStyle = state.locationStyles?.[location.id]?.[design.key] || (design.key === 'floor' && state.cafeFloor !== 'honey' ? state.cafeFloor : '');
    const savedIndex = design.choices.findIndex(choice => choice.id === savedStyle);
    selectedChoice = savedIndex >= 0 ? savedIndex : 0;
  }

  const overlay = document.createElement('section');
  overlay.className = 'restoration-scene-screen';
  overlay.setAttribute('role', 'dialog');
  overlay.setAttribute('aria-modal', 'true');
  overlay.setAttribute('aria-label', `${location.name} restoration scene`);
  document.body.appendChild(overlay);

  function returnToBoard() {
    window.clearTimeout(sceneTimer);
    overlay.remove();
    currentBoardKey = 'main';
    selectedIndex = -1;
    feedbackMessage = state.pendingRestoration ? 'Your restoration scene is saved. Open the Journal to continue whenever you like.' : 'Back at the harbor board. Your next restoration is ready when you are.';
    saveState();
    render();
  }

  function selectedDesign() {
    return design?.choices[selectedChoice] || null;
  }

  function renderScene() {
    if (!overlay.isConnected) return;
    const choice = selectedDesign();
    const baseStyle = choice || (location.id === 'cafe' ? getCafeFloor() : null);
    const designColor = baseStyle?.color || film.accent;
    const featureIcon = choice?.icon || location.decos[level - 1] || film.actions?.[level - 1] || '🛠️';
    const imageActionsAvailable = phase === 'objective';
    const restoredLevel = Math.min(location.decos.length, Number(state.levels[location.id]) || 0);
    const progressPercent = Math.round(restoredLevel / location.decos.length * 100);
    const castMarkup = cast.map((id,index) => {
      const character = CHARS[id] || CHARS.mae;
      return `<div class="restoration-cast-member cast-${index}" style="--cast-accent:${character.accent}"><img src="${character.img}" alt=""><b>${character.name}</b></div>`;
    }).join('');
    const choiceCards = design ? design.choices.map((option,index) => `
      <button class="restoration-choice" type="button" data-restoration-choice="${index}" aria-label="Choose ${option.name}: ${option.description}" style="--choice-color:${option.color}">
        <span class="restoration-choice-art" style="--scene-art:url('${art.after}')"><span class="restoration-choice-object">${option.icon}</span><i aria-hidden="true">${location.icon}</i></span>
        <b>${option.name}</b><small>${option.description}</small>
      </button>`).join('') : '';
    let content = '';
    if (phase === 'objective') {
      const shortage = insufficient && state.coins < cost;
      content = `<div class="restoration-card objective-card"><small class="restoration-kicker">CURRENT STORY OBJECTIVE · ${level} / ${location.decos.length}</small><h2>${stage[0]}</h2><p>${stage[1]}</p><div class="restoration-cost-row"><span>🪙 Repair materials</span><b>${cost}🪙</b></div>${shortage ? `<p class="restoration-inline-warning" role="status">Need ${cost - state.coins} more 🪙 to begin. Your Stars will not be spent. Tap Board to return and earn coins.</p>` : `<button class="btn restoration-action restoration-pay" type="button" data-restoration-pay>🪙 ${cost} · Make this repair</button><small class="restoration-reward-note">Earn +1⭐ · +${coinReward}🪙 · +20 XP with this repair</small>`}</div>`;
    } else if (phase === 'work') {
      content = `<div class="restoration-card work-card"><small class="restoration-kicker">THE REPAIR IS TAKING SHAPE</small><h2>${stage[0]}</h2><p>${stage[1]}</p></div>`;
    } else if (phase === 'design') {
      content = `<div class="restoration-card design-card"><small class="restoration-kicker">YOUR HARBOR · YOUR CHOICE</small><h2>${design?.title || 'Choose a finish'}</h2><p>${design?.prompt || ''}</p><div class="restoration-choices" role="group" aria-label="Choose a design">${choiceCards}</div><small class="restoration-reward-note">Tap a finish to save it and return to the game.</small></div>`;
    } else {
      const nextObjective = storyChoreContext().chore?.title || 'Help another neighbor and keep the harbor story moving.';
      const locationComplete = level >= location.decos.length;
      content = `<div class="restoration-card complete-card"><small class="restoration-kicker">${locationComplete ? `${location.name.toUpperCase()} RESTORED!` : 'RESTORATION COMPLETE'}</small><h2>${stage[0]}</h2><div class="restoration-earned"><span>⭐ <b>+1</b></span><span>🪙 <b>+${coinReward}</b></span><span>✦ <b>+20 XP</b></span></div><div class="restoration-next-objective"><small>NEW OBJECTIVE</small><b>${nextObjective}</b></div><button class="btn restoration-action restoration-home" type="button" data-restoration-finish>Back to the game</button></div>`;
    }
    const afterRepair = !imageActionsAvailable;
    overlay.innerHTML = `<div class="restoration-shell" style="--repair-accent:${film.accent};--restoration-design-color:${designColor}">
      <header class="restoration-topbar ${afterRepair ? 'after-repair' : ''}">${imageActionsAvailable ? '<button class="restoration-back" type="button" data-restoration-return aria-label="Return to the harbor board">‹ <span>Board</span></button>' : ''}<div class="restoration-location-title"><small>${afterRepair ? 'REPAIR COMPLETE' : `NEXT STORY REPAIR · CHAPTER ${Math.max(1,state.chapter)}`}</small><b>${location.icon} ${location.name}</b></div><span class="restoration-step-count">${Math.min(level,location.decos.length)} / ${location.decos.length}</span></header>
      <div class="restoration-world ${art.interior ? 'cafe-interior' : ''} ${art.kitchen ? 'cafe-kitchen' : ''}" data-phase="${phase}" data-location="${location.id}" role="group" aria-label="${location.name} ${stage[0]} worksite">
        <img class="restoration-world-before" src="${art.before}" alt="Before ${stage[0]}: ${art.beforeState || 'the current worksite'}" fetchpriority="high">
        <img class="restoration-world-after" src="${art.after}" alt="After ${stage[0]}: ${art.afterState || 'the improvement is complete'}">
        ${art.floorChoice && afterRepair ? '<span class="restoration-floor-wash" aria-hidden="true"></span>' : ''}
        ${repairDetailMarkup(location.id, level, afterRepair)}
        <div class="restoration-world-shade" aria-hidden="true"></div>
        <div class="restoration-site-wallet" aria-label="Harbor resources"><span>🪙 <b>${state.coins}</b></span><span>⭐ <b>${state.stars}</b></span></div>
        ${afterRepair ? `<div class="restoration-design-preview ${choice ? 'has-design' : ''}" aria-hidden="true"><span>${featureIcon}</span><small>${choice?.name || stage[0]}</small></div>` : ''}
        <div class="restoration-cast" aria-label="Neighbors helping with the restoration">${castMarkup}</div>
        <div class="restoration-story-progress" aria-label="${restoredLevel} of ${location.decos.length} repairs complete"><span>WORKSITE · ${progressPercent}% RESTORED</span><i><b style="width:${progressPercent}%"></b></i></div>
        <div class="restoration-work-dust" aria-hidden="true"><i>✦</i><i>✧</i><i>✦</i><i>·</i><i>✧</i></div>
      </div>
      <main class="restoration-bottom">${content}</main>
    </div>`;
    overlay.querySelector('[data-restoration-return]')?.addEventListener('click', returnToBoard);
    overlay.querySelector('[data-restoration-pay]')?.addEventListener('click', beginRestoration);
    overlay.querySelectorAll('[data-restoration-choice]').forEach(button => button.onclick = () => {
      selectedChoice = Number(button.dataset.restorationChoice);
      confirmDesign();
    });
    overlay.querySelector('[data-restoration-finish]')?.addEventListener('click', completeRestorationScene);
  }

  function beginRestoration() {
    if (state.coins < cost) {
      insufficient = true;
      phase = 'objective';
      renderScene();
      return;
    }
    insufficient = false;
    state.coins -= cost;
    state.levels[location.id] = Math.min(location.decos.length, (Number(state.levels[location.id]) || 0) + 1);
    state.stars += 1;
    state.starsToward += 1;
    state.coins += coinReward;
    grantXP(20);
    state.stats.restorations = (state.stats.restorations || 0) + 1;
    recordStoryAction('restorations');
    updateDailyProgress('restorations');
    checkAchievements();
    playPop();
    state.pendingRestoration = { locationId:location.id, level, phase:design ? 'design' : 'complete', designKey:design?.key || '' };
    phase = 'work';
    saveState();
    renderScene();
    sceneTimer = window.setTimeout(finishWork, window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 0 : 720);
  }

  function finishWork() {
    window.clearTimeout(sceneTimer);
    phase = design ? 'design' : 'complete';
    if (state.pendingRestoration) state.pendingRestoration.phase = phase;
    saveState();
    renderScene();
  }

  function confirmDesign() {
    const choice = selectedDesign();
    if (!choice || !design) return;
    if (!state.locationStyles[location.id]) state.locationStyles[location.id] = {};
    state.locationStyles[location.id][design.key] = choice.id;
    if (location.id === 'cafe' && design.key === 'floor') state.cafeFloor = choice.id;
    if (state.pendingRestoration) state.pendingRestoration.phase = 'complete';
    phase = 'complete';
    playPop();
    saveState();
    renderScene();
  }

  function completeRestorationScene() {
    const sourcePoint = captureElementPoint(overlay.querySelector('.repair-detail-after-result') || overlay.querySelector('.restoration-design-preview'));
    state.pendingRestoration = null;
    saveState();
    window.clearTimeout(sceneTimer);
    overlay.remove();
    currentBoardKey = 'main';
    selectedIndex = -1;
    feedbackMessage = `${location.name} improved. The next harbor story is waiting in the Journal.`;
    render();
    const rewards = [['coins',coinReward,'.coin-pill'],['stars',1,'.star-pill'],['xp',20,'.profile-badge']];
    rewards.forEach(([type,amount,selector],index) => window.setTimeout(() => flyReward({sourcePoint,targetElement:container.querySelector(selector),type,amount}), index * 85));
    showFloat(`${location.name} restored · +1⭐ +${coinReward}🪙 +20 XP`);
    advanceStory();
  }

  renderScene();
}

function showLocationVisit(location) {
  const level = Math.min(location.decos.length, Number(state.levels[location.id]) || 0);
  if (!level) return showRestorationMoment(location, 1);
  const film = RESTORATION_FILMS[location.film] || RESTORATION_FILMS.cafe;
  const art = location.id === 'cafe' && level >= 6
    ? 'assets/restore-cafe-kitchen-after.webp'
    : location.id === 'cafe' && level >= 4
      ? 'assets/restore-cafe-room-after.webp'
      : film.art;
  const cast = RESTORATION_CAST[location.id] || RESTORATION_CAST.cafe;
  const styles = { ...(state.locationStyles?.[location.id] || {}) };
  const styleLevel = level >= 8 ? 8 : level >= 4 ? 4 : 0;
  const styleData = RESTORATION_DESIGNS[location.id]?.[styleLevel];
  const savedChoice = styleData?.choices.find(choice => choice.id === (styleData.key === 'floor' ? state.cafeFloor : styles[styleData.key]));
  const cafeFinish = location.id === 'cafe' && styleLevel >= 4 ? getCafeFloor() : null;
  const chosen = cafeFinish ? { name:cafeFinish.name, color:cafeFinish.color, icon:savedChoice?.icon || '🪵' } : savedChoice;
  if (cafeFinish && styles.floor) styles.floor = state.cafeFloor;
  const overlay = document.createElement('section');
  overlay.className = 'restoration-scene-screen';
  overlay.setAttribute('role','dialog');
  overlay.setAttribute('aria-modal','true');
  overlay.setAttribute('aria-label',`Visit restored ${location.name}`);
  overlay.innerHTML = `<div class="restoration-shell restoration-visit" style="--repair-accent:${film.accent};--restoration-design-color:${chosen?.color || film.accent}"><header class="restoration-topbar"><button class="restoration-back" type="button" data-visit-close>‹ <span>Board</span></button><div class="restoration-location-title"><small>YOUR HARBOR · ${level} IMPROVEMENTS</small><b>${location.icon} ${location.name}</b></div><span class="restoration-step-count">${level} / ${location.decos.length}</span></header><div class="restoration-world ${location.id === 'cafe' && level >= 4 ? 'cafe-interior' : ''} ${location.id === 'cafe' && level >= 6 ? 'cafe-kitchen' : ''}" data-phase="complete" data-location="${location.id}" role="img" aria-label="Restored ${location.name} with your saved design"><img class="restoration-world-before" src="${art}" alt=""><img class="restoration-world-after" src="${art}" alt="${location.name}, restored"><div class="restoration-world-shade" aria-hidden="true"></div>${location.id === 'cafe' && level >= 4 && level < 6 ? `<span class="restoration-floor-wash" style="--restoration-design-color:${getCafeFloor().color}" aria-hidden="true"></span>` : ''}<div class="restoration-design-preview has-design"><span>${chosen?.icon || location.decos[level - 1]}</span><small>${chosen?.name || 'A harbor improvement'}</small></div><div class="restoration-cast">${cast.map((id,index)=>`<div class="restoration-cast-member cast-${index}" style="--cast-accent:${CHARS[id].accent}"><img src="${CHARS[id].img}" alt=""><b>${CHARS[id].name}</b></div>`).join('')}</div><div class="restoration-progress-dots">${location.decos.map((deco,index)=>`<span class="${index < level ? 'built' : 'locked-deco'}">${deco}</span>`).join('')}</div></div><main class="restoration-bottom"><div class="restoration-card visit-card"><small class="restoration-kicker">A PLACE MADE BY THE HARBOR</small><h2>${location.name} feels like home.</h2><p>${chosen ? `Your ${chosen.name.toLowerCase()} finish is part of the scene.` : `${level} of ${location.decos.length} improvements are complete.`}</p><div class="location-style-history">${Object.entries(styles).map(([key,value])=>`<span>${key.replaceAll('-',' ')} · <b>${String(value).replaceAll('-',' ')}</b></span>`).join('') || `<span>${location.decos.slice(0,level).join('  ')}</span>`}</div><button class="btn restoration-action" type="button" data-visit-close>Back to the harbor board</button></div></main></div>`;
  document.body.appendChild(overlay);
  overlay.querySelectorAll('[data-visit-close]').forEach(button => button.onclick = () => { overlay.remove(); currentBoardKey = 'main'; render(); });
}

function showCafeFloorCustomizer() {
  showModal(`<div class="floor-customizer">
    <div class="sheet-heading"><div><div class="story-kicker">MAE’S CAFÉ</div><h2>Choose a floor</h2></div><button class="btn close-sheet" aria-label="Close">✕</button></div>
    <div class="floor-showcase" data-floor-preview style="--floor-tone:${getCafeFloor().color}"><img src="assets/restore-cafe-room-after.webp" alt="Mae’s restored café interior"><span class="repair-floor" aria-hidden="true"></span></div>
    <div class="floor-picker"><small>Tap a finish to preview it</small><div class="floor-choices" role="group" aria-label="Choose café floor color">${renderCafeFloorChoices()}</div></div>
    <button class="btn primary floor-done">Done</button>
  </div>`, modal => {
    modal.classList.add('floor-customizer-modal');
    modal.querySelector('.close-sheet').onclick = () => modal.remove();
    modal.querySelector('.floor-done').onclick = () => modal.remove();
    bindCafeFloorChoices(modal);
  });
}

function openNextRestoration() {
  const pending = state.pendingRestoration;
  if (pending) {
    const pendingLocation = LOCATIONS.find(location => location.id === pending.locationId);
    if (pendingLocation) showRestorationMoment(pendingLocation, pending.level, true);
    return;
  }

  const location = nextRestorationGoal();
  if (!location) {
    const upcoming = LOCATIONS.find(entry => !isLocationUnlocked(entry) && (Number(state.levels[entry.id]) || 0) < entry.decos.length);
    const complete = !upcoming && restoredCount() >= totalRestorationCount();
    const title = complete ? 'The harbor is home again' : 'The next worksite is waiting';
    const message = complete
      ? 'Every place has been restored. Your harbor boards are still open for relaxed free play.'
      : `The ${upcoming?.name || 'next'} worksite opens as the story unfolds${upcoming ? ` · Chapter ${upcoming.unlockChapter}` : ''}. Help neighbors and earn stars to continue the story.`;
    const modal = showModal(`<div class="sheet-heading"><div><div class="story-kicker">${complete ? 'CAMPAIGN MILESTONE' : 'THE STORY LEADS THE WAY'}</div><h2>${title}</h2></div><button class="btn close-sheet" aria-label="Close">✕</button></div><p>${message}</p>${complete ? '' : '<button class="btn primary repair-follow-story" type="button">Follow the story ›</button>'}`, root => {
      root.classList.add('repair-next-modal');
      root.querySelector('.close-sheet').onclick = () => root.remove();
      root.querySelector('.repair-follow-story')?.addEventListener('click', () => { root.remove(); showStory(); });
    });
    return modal;
  }

  currentBoardKey = 'main';
  selectedIndex = -1;
  const level = Math.min(location.decos.length, Number(state.levels[location.id]) || 0) + 1;
  showRestorationMoment(location, level);
}

function goToStoryChore(modal) {
  const context = storyChoreContext();
  const chore = context.chore;
  modal.remove();
  if (!chore) return;
  if (chore.kind === 'restorations') {
    const pending = state.pendingRestoration;
    const pendingLocation = LOCATIONS.find(location => location.id === pending?.locationId);
    if (pendingLocation && pending) {
      showRestorationMoment(pendingLocation, pending.level, true);
      return;
    }
    const location = nextRestorationGoal();
    const level = Number(state.levels[location?.id]) || 0;
    if (location && level < location.decos.length) showRestorationMoment(location, level + 1);
    return;
  }
  currentBoardKey = 'main';
  selectedIndex = -1;
  mergeHintPair = chore.kind === 'merges' ? findMergePair() : null;
  feedbackMessage = chore.kind === 'orders'
    ? `${CHARS[chore.character]?.name || 'A neighbor'} has a story-priority request. Tap their portrait to help.`
    : chore.kind === 'discoveries'
      ? 'Make and merge harbor items to uncover a new collection tier.'
      : 'Follow the highlighted pair to prepare supplies for the crew.';
  render();
  window.setTimeout(() => {
    const target = chore.kind === 'orders'
      ? container.querySelector(`[data-task="${state.tasks.findIndex(task => task.who === chore.character)}"]`)
      : chore.kind === 'discoveries'
        ? container.querySelector(`.cell.gen-${CHARS[chore.character]?.favorite || 'coffee'}`)
        : container.querySelector('.merge-hint');
    target?.scrollIntoView?.({ behavior: 'smooth', block: 'nearest', inline: 'center' });
    target?.classList.add('story-go-target');
    window.setTimeout(() => target?.classList.remove('story-go-target'), 1500);
  }, 40);
}

function openStoryExperience() {
  const moment = state.storyMoments?.[0];
  if (!moment) {
    showStory();
    return;
  }
  showDialogue({ ...moment, isOrderMoment: true }, () => {
    if (state.storyMoments[0] === moment) state.storyMoments.shift();
    saveState();
    render();
  });
}

function showStory() {
  const storyComplete = state.chapter >= CHAPTERS.length;
  const needed = storyStarGoal(state.chapter);
  const remainingStars = Math.max(0, needed - state.starsToward);
  const chapterProgress = storyComplete ? 1 : Math.min(1, state.starsToward / needed);
  const restored = restoredCount();
  const totalRestorations = totalRestorationCount();
  const restorationProgress = Math.min(1, restored / totalRestorations);
  const nextLocation = nextRestorationGoal();
  const context = storyChoreContext();
  const stepCount = STORY_CHORE_STEPS.length;
  const choreRows = STORY_CHORE_STEPS.map((step, index) => {
    const done = index < context.stepIndex;
    const current = index === context.stepIndex;
    const character = CHARS[step.character] || CHARS.mae;
    const location = context.chapterIndex < CHAPTER_LOCATION_IDS.length ? LOCATIONS.find(entry => entry.id === CHAPTER_LOCATION_IDS[context.chapterIndex]) : LOCATIONS[0];
    const title = step.kind === 'restorations' && current ? context.chore?.title || step.title : step.title;
    const progressText = current ? ` · ${Math.min(context.progress, step.target)}/${step.target}` : '';
    const action = current && step.kind !== 'restorations' ? `<button class="btn primary story-go" type="button" data-story-go>${step.kind === 'orders' ? 'GO TO REQUEST' : 'GO TO BOARD'}</button>` : '';
    return `<div class="story-quest-row ${done ? 'completed' : ''} ${current ? 'current' : 'locked'}"><span class="story-quest-state">${done ? '✓' : current ? '●' : '○'}</span>${current ? `<img src="${character.img}" alt="${character.name}">` : ''}<div class="story-quest-copy"><small>${step.day || (index === 7 ? 'FINAL BEAT' : index < 4 ? 'DAY 1' : 'DAY 2')} · ${done ? 'COMPLETE' : current ? 'CURRENT OBJECTIVE' : 'UP NEXT'}</small><b>${title}${progressText}</b><span>${current ? context.chore?.detail || step.detail : step.detail}${location && step.kind === 'restorations' && !current ? ` · ${location.name}` : ''}</span></div>${action}</div>`;
  }).join('');
  const chapters = CHAPTERS.map((chapter, index) => {
    const unlocked = index < state.chapter;
    const hint = unlocked ? 'Read again · no rewards are repeated' : index === state.chapter ? `Next episode · ${remainingStars} more ⭐` : 'Locked · chapters unfold in order';
    return `<div class="loc story-row"><div><b>${unlocked ? '📖' : '🔒'} ${index + 1}. ${chapter.title}</b><small>${hint}</small></div>${unlocked ? `<button class="btn replay-button" data-ch="${index}">Replay</button>` : ''}</div>`;
  }).join('');
  const campaignFinished = storyComplete && restored >= totalRestorations;
  const nextGoal = campaignFinished
    ? `The campaign is complete: all ${CHAPTERS.length} chapters and all ${totalRestorations} improvements are finished. Your boards remain open for relaxed free play.`
    : !storyComplete
      ? `Earn ${remainingStars} more ⭐ from neighbor requests or repairs to reveal “${CHAPTERS[state.chapter].title}.” The current story day has ${Math.max(0, stepCount - context.stepIndex)} chores remaining.`
      : `The mystery is solved. Restore ${totalRestorations - restored} more improvements${nextLocation ? `; ${nextLocation.name} is next` : ''} to unlock the epilogue.`;
  const storyCover = storyArtwork(context.chapter);
  const choreProgress = Math.min(100, context.stepIndex / stepCount * 100);
  const storyReady = state.storyMoments?.length > 0;
  const pendingRepair = state.pendingRestoration;
  const pendingRepairLocation = LOCATIONS.find(location => location.id === pendingRepair?.locationId) || null;
  const journalRepairLocation = pendingRepairLocation || nextLocation;
  const journalRepairLevel = pendingRepairLocation ? Number(pendingRepair.level) || 1 : journalRepairLocation ? (Number(state.levels[journalRepairLocation.id]) || 0) + 1 : 0;
  const journalRepairStage = journalRepairLocation ? RESTORATION_STAGES[journalRepairLocation.id]?.[journalRepairLevel - 1] : null;
  const journalRepairCost = journalRepairLocation ? upgradeCost(journalRepairLocation) : 0;
  const journalRepairCard = pendingRepairLocation
    ? `<section class="journal-repair-card in-progress"><div class="journal-repair-copy"><small>HARBOR REPAIR · IN PROGRESS</small><b>${pendingRepairLocation.icon} ${pendingRepairLocation.name} · ${journalRepairStage?.[0] || 'Saved scene'}</b><span>Your scene is saved. Continue when you’re ready.</span></div><button class="journal-continue-action" type="button" data-journal-resume aria-label="Continue the saved ${pendingRepairLocation.name} repair">📖<small>Continue</small></button></section>`
    : journalRepairLocation && journalRepairStage
      ? `<section class="journal-repair-card"><div class="journal-repair-copy"><small>NEXT HARBOR REPAIR · ${journalRepairLocation.name.toUpperCase()}</small><b>${journalRepairLocation.icon} ${journalRepairStage[0]}</b><span>${journalRepairStage[1]}</span></div><button class="journal-repair-coin" type="button" data-journal-repair="${journalRepairLocation.id}" aria-label="Open ${journalRepairLocation.name} repair scene, cost ${journalRepairCost} coins"><span>🪙</span><b>${journalRepairCost}</b><small>Tap coin</small></button></section>`
      : `<section class="journal-repair-card all-restored"><div class="journal-repair-copy"><small>HARBOR RESTORED</small><b>Every improvement is complete</b><span>The harbor remains open for relaxed free play.</span></div><span class="journal-complete-mark">✓</span></section>`;
  const modal = showModal(`<div class="sheet-heading"><div><div class="story-kicker">STORY · CHORES · REPAIRS</div><h2>The Harbor Journal</h2></div><button class="btn close-sheet" aria-label="Close">✕</button></div><div class="storybook-cover" style="--chapter-art:url('${storyCover}')"><div><small>CHAPTER ${context.chapterIndex + 1} · ${context.stepIndex < 4 ? 'DAY 1' : 'DAY 2'}</small><h3>${context.chapter.title}</h3><p>${context.chapter.lines?.[0]?.[1] || 'The harbor is still putting its story back together.'}</p></div><span>${context.chapterIndex + 1}</span></div><div class="storybook-summary"><div class="goal-heading"><b>📖 TODAY’S HARBOR CHORES</b><strong>${context.stepIndex} / ${stepCount}</strong></div><div class="restoration-track"><i style="width:${choreProgress}%"></i></div><small>${context.chore ? `${context.chore.day} · ${context.chore.title}` : 'All eight chores complete · follow story stars to the next episode.'}</small><div class="storybook-objective-card"><span>${CHARS[context.chore?.character || 'iris']?.icon || '📖'}</span><div><small>${context.chore ? 'WHY THIS MATTERS' : 'NEXT STORY BEAT'}</small><b>${context.chore ? context.chore.detail : nextGoal}</b></div></div></div><div class="story-quest-list">${choreRows}</div><div class="journal-goals"><div class="journal-goal"><div class="goal-heading"><b>📖 Mystery chapters</b><strong>${Math.min(state.chapter, CHAPTERS.length)} / ${CHAPTERS.length}</strong></div><div class="restoration-track"><i style="width:${chapterProgress * 100}%"></i></div><small>${storyComplete ? 'Mystery solved · scenes are replayable below' : `${remainingStars} more ⭐ to open the next chapter`}</small></div><div class="journal-goal"><div class="goal-heading"><b>🛠️ Harbor repairs</b><strong>${restored} / ${totalRestorations}</strong></div><div class="restoration-track"><i style="width:${restorationProgress * 100}%"></i></div><small>${storyComplete && restored < totalRestorations ? `${totalRestorations - restored} improvements until the epilogue` : storyComplete ? 'All places rebuilt · campaign finished' : 'Every paid repair gives 1⭐ and changes the harbor.'}</small></div></div>${journalRepairCard}<div class="journal-next"><b>${storyReady ? 'STORY READY · A NEIGHBOR HAS A NOTE' : campaignFinished ? 'CAMPAIGN COMPLETE · FREE PLAY' : storyComplete ? 'THE MYSTERY IS SOLVED' : 'WHAT HAPPENS NEXT?'}</b><p>${storyReady ? 'A character is ready to react to your recent help. Read their note using the “Read story” link on the board.' : nextGoal}</p></div><div class="story-list-heading">${Math.min(state.chapter, CHAPTERS.length)} of ${CHAPTERS.length} chapters discovered · replay a completed scene</div>${chapters}`, root => {
    root.classList.add('storybook-modal');
    root.querySelector('.close-sheet').onclick = () => root.remove();
    root.querySelector('[data-journal-repair]')?.addEventListener('click', event => {
      const location = LOCATIONS.find(entry => entry.id === event.currentTarget.dataset.journalRepair);
      if (!location || state.pendingRestoration) return;
      root.remove();
      showRestorationMoment(location, (Number(state.levels[location.id]) || 0) + 1);
    });
    root.querySelector('[data-journal-resume]')?.addEventListener('click', () => {
      const pending = state.pendingRestoration;
      const location = LOCATIONS.find(entry => entry.id === pending?.locationId);
      if (!location || !pending) return;
      root.remove();
      showRestorationMoment(location, pending.level, true);
    });
    root.querySelector('[data-story-go]')?.addEventListener('click', () => goToStoryChore(root));
    root.querySelectorAll('[data-ch]').forEach(button => {
      button.onclick = () => {
        root.remove();
        showDialogue(CHAPTERS[Number(button.dataset.ch)]);
      };
    });
  });
  return modal;
}

function claimDailyGift() {
  const today = dailyDateKey();
  if (state.dailyClaimedAt === today) {
    feedbackMessage = 'Your daily gift is already claimed. Come back tomorrow for another!';
    render();
    return;
  }
  state.dailyClaimedAt = today;
  grantEnergy(12);
  state.coins += 60;
  feedbackMessage = 'Daily harbor gift claimed: +12 energy and +60 coins!';
  showFloat('Daily gift! +12⚡ +60🪙');
  playPop();
  render();
}

function showMoreMenu() {
  const boardLabel = currentBoardKey === 'main' ? '🏖️ Open the picnic board' : '⚓ Return to the town board';
  showModal(`<div class="sheet-heading"><div><div class="story-kicker">HARBOR MENU</div><h2>A few more things</h2></div><button class="btn close-sheet" aria-label="Close">✕</button></div><div class="quick-menu"><button class="btn menu-board">${boardLabel}</button><button class="btn menu-collection">🧺 Items & storage</button><button class="btn menu-journal">📖 Story journal & repairs</button><button class="btn menu-goals">🧭 Daily goals & rewards</button><button class="btn menu-gift">🎁 Daily harbor gift</button><button class="btn menu-guide">❔ How to play</button></div>`, modal => {
    modal.querySelector('.close-sheet').onclick = () => modal.remove();
    modal.querySelector('.menu-board').onclick = () => {
      modal.remove();
      currentBoardKey = currentBoardKey === 'main' ? 'event' : 'main';
      selectedIndex = -1;
      feedbackMessage = currentBoardKey === 'event' ? 'Optional picnic board: merge seaside bites for bonus milestone rewards. Your energy is shared.' : 'Back to the harbor town: deliver requests and restore places to move the campaign forward.';
      render();
    };
    modal.querySelector('.menu-collection').onclick = () => { modal.remove(); showCollection('items'); };
    modal.querySelector('.menu-journal').onclick = () => { modal.remove(); showStory(); };
    modal.querySelector('.menu-goals').onclick = () => { modal.remove(); showProgress('daily'); };
    modal.querySelector('.menu-gift').onclick = () => { modal.remove(); claimDailyGift(); };
    modal.querySelector('.menu-guide').onclick = () => { modal.remove(); showGuide(); };
  });
}

function claimEventReward(index) {
  const milestone = EVENT_MILESTONES[index];
  if (!milestone || state.eventClaimed.includes(index) || state.eventPoints < milestone.points) return;
  state.eventClaimed.push(index);
  state.coins += milestone.coins;
  grantEnergy(milestone.energy);
  state.stars += milestone.stars;
  state.starsToward += milestone.stars;
  playPop();
  showFloat(`Seaside reward! ${milestone.reward}`);
  render();
  advanceStory();
}

function renderTasks() {
  if (currentBoardKey === 'event') {
    const milestones = EVENT_MILESTONES.map((milestone, index) => {
      const claimed = state.eventClaimed.includes(index);
      const ready = state.eventPoints >= milestone.points;
      return `<div class="event-milestone ${claimed ? 'claimed' : ''}"><small>${milestone.points} pts</small><b>${milestone.reward}</b><button class="btn ${ready && !claimed ? 'primary' : 'off'}" data-event-claim="${index}" ${ready && !claimed ? '' : 'disabled'}>${claimed ? 'Claimed ✓' : ready ? 'Claim' : 'Locked'}</button></div>`;
    }).join('');
    const nextReward = EVENT_MILESTONES.find((milestone, index) => !state.eventClaimed.includes(index));
    const eventStatus = nextReward ? state.eventPoints >= nextReward.points ? 'A picnic reward is ready to claim below' : `${nextReward.points - state.eventPoints} pts to next reward` : 'All picnic rewards claimed · bonus board remains open';
    return `<div class="event-panel"><div class="event-title"><b>🏖️ Optional seaside picnic</b><span>${state.eventPoints} pts</span></div><small>Side challenge, not a story level. Spend shared ⚡ to make shell bites, merge them for points, then claim the milestone gifts. Some gifts include story ⭐.</small><div class="event-status">${eventStatus}</div><div class="event-milestones">${milestones}</div><button class="btn event-how" type="button">How this event works</button></div>`;
  }
  if (!state.tasks.length) return '<div class="empty-request">The harbor is quiet for a moment.</div>';
  return state.tasks.map((task, index) => {
    const requirement = currentRequirement(task);
    const ready = taskReady(task);
    const family = FAMILIES[requirement.fam] || FAMILIES.coffee;
    const item = family.tiers[requirement.tier - 1];
    const character = CHARS[task.who] || CHARS.mae;
    const quantity = requirement.quantity || 1;
    const stageCount = task.requirements?.length || 1;
    const stageNumber = Math.min(stageCount, (task.stage || 0) + 1);
    const storyPriority = isStoryPriorityTask(task);
    return `<article class="task neighbor-card ${ready ? 'task-ready' : ''} ${storyPriority ? 'story-critical' : ''}" data-task="${index}" style="--neighbor-accent:${character.accent}"><img class="neighbor-portrait" src="${character.img}" alt=""><span class="neighbor-reward"><span>🪙</span><b>+${task.coins}</b></span><span class="neighbor-bonus">${task.energy ? `⚡ ${task.energy}` : ''}${task.stars ? ` ⭐ ${task.stars}` : ''}</span>${storyPriority ? '<span class="neighbor-story-mark">📖 STORY</span>' : ''}<span class="neighbor-plate"><span class="neighbor-item">${itemArtMarkup(requirement.fam,requirement.tier,'neighbor-item-art')}${quantity > 1 ? `<i>×${quantity}</i>` : ''}</span></span><button class="neighbor-review" type="button" data-task-review="${index}" aria-label="${storyPriority ? 'Story priority. ' : ''}Review ${character.name}'s request for ${item.name}${quantity > 1 ? `, quantity ${quantity}` : ''}${stageCount > 1 ? `, delivery ${stageNumber} of ${stageCount}` : ''}. Rewards: ${task.coins} coins, ${task.energy} energy, ${task.stars} stars."></button>${ready ? `<button class="neighbor-serve" type="button" data-serve-task="${index}" aria-label="Serve ${item.name}${quantity > 1 ? ` ×${quantity}` : ''}${stageCount > 1 ? `, step ${stageNumber} of ${stageCount}` : ''}">SERVE</button>` : ''}</article>`;
  }).join('');
}

function renderCell(cell, index, popIndex) {
  const classes = ['cell'];
  let content = '';
  if (cell?.gen) {
    classes.push('gen', `gen-${cell.gen}`);
    const seconds = generatorTimeLeft(cell);
    if (seconds) classes.push('cd');
    const definition = generatorDefinition(cell.gen);
    content = `<span class="cell-icon">${definition.icon}</span><span class="cell-caption">${seconds ? `${seconds}s` : `${cell.charges}/${generatorCapacity(cell.gen)}`}</span><span class="gen-level">L${generatorLevel(cell.gen)}</span>`;
  } else if (cell) {
    classes.push(`fam-${cell.fam}`);
    if (cell.covered) classes.push('covered');
    if (cell.locked) classes.push('item-locked');
    content = `${itemArtMarkup(cell.fam,cell.tier)}<span class="tier">${cell.tier}</span>${cell.locked ? '<span class="lock-mark" aria-hidden="true">🔒</span>' : ''}${cell.covered ? '<span class="webbing" aria-hidden="true"></span>' : ''}`;
  }
  const hintPair = tutorialStep === 1 ? tutorialMergeTargets : mergeHintPair;
  if (hintPair?.includes(index)) classes.push('merge-hint');
  if (index === selectedIndex) classes.push('sel');
  if (index === popIndex) classes.push('pop');
  const finger = hintPair?.[1] === index ? '<span class="hint-finger" aria-hidden="true">👆🏻</span>' : '';
  return `<button class="${classes.join(' ')}" data-i="${index}" aria-label="${cell ? describeItem(cell) : 'Empty board space'}">${content}${finger}</button>`;
}

function render() {
  const eventScroll = container.querySelector('.event-milestones')?.scrollLeft || 0;
  const neighborScroll = container.querySelector('.neighbor-rail')?.scrollLeft || 0;
  const cells = board();
  const chapterBadge = Math.min(CHAPTERS.length, state.chapter + 1);
  const chapterBadgeLabel = state.chapter >= CHAPTERS.length ? `All ${CHAPTERS.length} story chapters discovered` : `Next story chapter ${chapterBadge} of ${CHAPTERS.length}; earn stars to unlock it`;
  const storyContext = storyChoreContext();
  const activeStoryChore = storyContext.chore;
  const storyMoment = state.storyMoments?.[0];
  const choreRatio = activeStoryChore ? Math.min(1, storyContext.progress / activeStoryChore.target) : 0;
  const choreTrackPercent = Math.min(100, ((storyContext.stepIndex + choreRatio) / STORY_CHORE_STEPS.length) * 100);
  const storyObjectiveTitle = storyMoment ? 'A neighbor has a note for you' : activeStoryChore ? activeStoryChore.title : 'The day’s harbor chores are complete';
  const storyObjectiveDetail = storyMoment ? `Read ${CHARS[storyMoment.lines?.[0]?.[0]]?.name || 'your neighbor'}’s reaction · ${state.storyMoments.length} scene${state.storyMoments.length === 1 ? '' : 's'} ready` : activeStoryChore ? `${activeStoryChore.day} · ${Math.min(storyContext.progress, activeStoryChore.target)}/${activeStoryChore.target} · ${activeStoryChore.location.name}${activeStoryChore.kind === 'restorations' ? ' · Ready to visit' : ''}` : `Earn ⭐ to open “${CHAPTERS[Math.min(state.chapter, CHAPTERS.length - 1)].title}.”`;
  const selectedCell = selectedIndex >= 0 ? cells[selectedIndex] : null;
  const selectedItem = selectedCell && !selectedCell.gen ? FAMILIES[selectedCell.fam]?.tiers[selectedCell.tier - 1] : null;
  const selectedGenerator = selectedCell?.gen ? generatorDefinition(selectedCell.gen) : null;
  const footerArt = selectedItem ? itemArtMarkup(selectedCell.fam,selectedCell.tier,'footer-item-art') : selectedGenerator?.icon || (currentBoardKey === 'event' ? '🏖️' : '🧺');
  const footerTitle = selectedItem ? `${selectedItem.name} (Lvl ${selectedCell.tier})` : selectedGenerator ? `${selectedGenerator.name} · Lv ${generatorLevel(selectedCell.gen)}` : currentBoardKey === 'event' ? 'Seaside picnic' : 'Harbor board';
  const footerDescription = selectedItem
    ? selectedCell.tier < (FAMILIES[selectedCell.fam]?.tiers.length || 8) ? 'MERGE to reach its next level.' : 'TOP TIER · READY FOR A NEIGHBOR REQUEST.'
    : selectedGenerator ? 'Tap to make an item with 1⚡.' : feedbackMessage;
  const canQuickSell = Boolean(selectedCell && !selectedCell.gen && !selectedCell.covered && !selectedCell.locked);
  container.innerHTML = `<div class="app">
    <header class="topline">
      <div class="profile-badge" aria-label="${chapterBadgeLabel}" title="${chapterBadgeLabel}"><img src="${CHARS.iris.img}" alt=""><b>${chapterBadge}</b></div>
      <div class="resource-pills"><div class="resource-pill energy-pill" title="Energy regenerates over time · ${maxEnergy()} maximum"><span>⚡</span><b>${state.energy}/${maxEnergy()}</b></div><div class="resource-pill coin-pill" data-resource="coins" title="Coins fund harbor improvements"><span>🪙</span><b>${state.coins}</b></div><div class="resource-pill star-pill" data-resource="stars" title="Stars reveal story chapters and track restoration"><span>⭐</span><b>${state.stars}</b></div><div class="resource-pill gem-pill" title="Pearls"><span>💎</span><b>${state.pearls}</b></div></div>
      <div class="top-actions"><button class="btn more-button" id="more-nav" aria-label="More harbor options" title="More harbor options">☰</button><button class="btn sound-button" id="mute" aria-label="Toggle sound">${muted ? '🔇' : '🔊'}</button></div>
    </header>
    <section class="story-objective ${storyMoment ? 'story-objective-ready' : ''}" aria-label="Current story objective"><img src="${CHARS[activeStoryChore?.character || 'iris']?.img || CHARS.iris.img}" alt=""><div class="story-objective-copy"><small>CHAPTER ${storyContext.chapterIndex + 1} · ${storyContext.chapter.title}</small><b>${storyObjectiveTitle}</b><span>${storyObjectiveDetail}</span><i class="story-objective-track"><i style="width:${choreTrackPercent}%"></i></i></div><button class="story-objective-action" id="story-focus" type="button">${storyMoment ? `STORY READY${state.storyMoments.length > 1 ? ` · ${state.storyMoments.length}` : ''}` : 'CHORE BOOK'}<span>›</span></button></section>
    <section class="orders-section ${currentBoardKey === 'main' ? 'neighbor-section' : 'event-section'}"><div class="section-heading"><b>${currentBoardKey === 'event' ? 'PICNIC REWARDS' : 'HARBOR NEIGHBORS'}</b><small>${currentBoardKey === 'event' ? 'Optional seaside side board' : 'Swipe for all neighbors'}${currentBoardKey === 'main' ? '<button class="story-link" id="open-story">Read story <span>›</span></button>' : ''}</small></div><div class="tasks ${currentBoardKey === 'event' ? 'event-tasks' : 'neighbor-rail'}" ${currentBoardKey === 'main' ? `role="region" tabindex="0" aria-label="Neighbor requests. Scroll horizontally to browse all ${Object.keys(CHARS).length} neighbors."` : ''}>${renderTasks()}</div></section>
    <div class="board ${currentBoardKey === 'event' ? 'event' : ''}" role="grid" aria-label="${currentBoardKey === 'main' ? 'Harbor town' : 'Seaside picnic'} merge board, ${BOARD_COLS} columns by ${BOARD_ROWS} rows">${cells.map((cell, index) => renderCell(cell, index, -1)).join('')}</div>
    <div class="board-footer"><span class="footer-item-icon" aria-hidden="true">${footerArt}</span><div class="info item-info" aria-live="polite"><div class="item-info-copy"><b class="item-info-title">${footerTitle}</b><small class="item-info-description">${footerDescription}</small></div><button class="item-info-button" id="item-details" type="button" aria-label="Open item details" ${selectedItem ? '' : 'disabled'}>i</button></div><button class="btn quick-sell" id="quick-sell" aria-label="Sell selected item" title="Sell selected item" ${canQuickSell ? '' : 'disabled'}>🗑️</button></div>
    <nav class="nav" aria-label="Main navigation"><button class="btn" id="inventory-nav" aria-label="Open inventory">🧺 <span>Inventory</span></button><button class="btn nav-repairs" id="repairs-nav" type="button" aria-label="Open harbor repairs" title="Restore the harbor"><svg class="repair-icon" viewBox="0 0 64 64" aria-hidden="true"><defs><linearGradient id="repairHead" x1="0" x2="1" y1="0" y2="1"><stop stop-color="#e4f8ff"/><stop offset="1" stop-color="#71c7e8"/></linearGradient><linearGradient id="repairHandle" x1="0" x2="1" y1="0" y2="1"><stop stop-color="#ffd477"/><stop offset="1" stop-color="#d98145"/></linearGradient></defs><circle cx="32" cy="32" r="28" fill="#f3fbff" stroke="#b8e5f0" stroke-width="3"/><path d="M17 47 41 23" fill="none" stroke="#8d4e32" stroke-width="9" stroke-linecap="round"/><path d="M17 47 41 23" fill="none" stroke="url(#repairHandle)" stroke-width="6" stroke-linecap="round"/><path d="m32 13 8-8 18 18-8 8-5-5-7 7-8-8 7-7z" fill="url(#repairHead)" stroke="#365d78" stroke-width="3" stroke-linejoin="round"/><path d="m35 15 4-4 13 13-4 4" fill="none" stroke="#fff" stroke-width="2" stroke-linecap="round"/><path d="m12 18 2 4 4 2-4 2-2 4-2-4-4-2 4-2zM49 43l1.5 3 3 1.5-3 1.5-1.5 3-1.5-3-3-1.5 3-1.5z" fill="#ffd36f" stroke="#fff7dd" stroke-width="1.5" stroke-linejoin="round"/></svg><span>Repairs</span></button></nav>
  </div>`;
  const milestones = container.querySelector('.event-milestones');
  if (milestones) milestones.scrollLeft = eventScroll;
  const neighborRail = container.querySelector('.neighbor-rail');
  if (neighborRail) neighborRail.scrollLeft = neighborScroll;
  container.querySelectorAll('[data-task-review]').forEach(button => {
    button.onclick = () => {
      if (tutorialStep !== null && tutorialStep !== 3) return;
      if (tutorialStep === 3) finishTutorial();
      showTask(Number(button.dataset.taskReview));
    };
  });
  container.querySelectorAll('[data-serve-task]').forEach(button => {
    button.onclick = () => {
      if (tutorialStep !== null && tutorialStep !== 3) return;
      if (tutorialStep === 3) finishTutorial();
      const index = Number(button.dataset.serveTask);
      if (!taskReady(state.tasks[index])) {
        render();
        return;
      }
      completeTask(index);
    };
  });
  container.querySelectorAll('[data-event-claim]').forEach(button => {
    button.onclick = () => claimEventReward(Number(button.dataset.eventClaim));
  });
  container.querySelector('.event-how')?.addEventListener('click', showEventHelp);
  // Board pointer input is delegated from the persistent game container.
  container.querySelector('#mute').onclick = () => {
    muted = !muted;
    localStorage.setItem('harbor-whispers-muted', String(muted));
    if (muted) music.pause();
    else unlockAudio();
    render();
  };
  container.querySelector('#quick-sell').onclick = () => {
    if (selectedIndex >= 0) sellBoardItem(selectedIndex);
  };
  container.querySelector('#item-details').onclick = () => {
    if (selectedIndex >= 0 && !board()[selectedIndex]?.gen) showItemDetails(selectedIndex);
  };
  container.querySelector('#inventory-nav').onclick = () => showCollection('inventory');
  container.querySelector('#repairs-nav').onclick = () => openNextRestoration();
  container.querySelector('#story-focus').onclick = () => storyMoment ? openStoryExperience() : showStory();
  container.querySelector('#open-story')?.addEventListener('click', openStoryExperience);
  container.querySelector('#more-nav').onclick = showMoreMenu;
  saveState();
  refreshTutorial();
}

function tickEnergy() {
  const now = Date.now();
  const cap = maxEnergy();
  const gained = Math.floor((now - state.lastTick) / ENERGY_TICK_MS);
  if (gained > 0) {
    state.energy = Math.min(cap, state.energy + gained);
    state.lastTick = state.energy >= cap ? now : state.lastTick + gained * ENERGY_TICK_MS;
    saveState();
    render();
  }
}

function registerServiceWorker() {
  if ('serviceWorker' in navigator && location.protocol.startsWith('http')) {
    navigator.serviceWorker.register('./sw.js').catch(() => {});
  }
}

fillTasks();
unlockAvailableGenerators();
checkAchievements();
render();
registerServiceWorker();
if (!state.introSeen) {
  state.introSeen = true;
  saveState();
  showDialogue({ title: 'Welcome to Harbor Whispers', lines: [['mae', 'Oh, a new face at the harbor! Help me bring the café back to life?'], ['iris', 'Fill orders, restore the waterfront, and you’ll hear every secret worth sharing.']] }, startTutorial);
} else if (state.tutorialStarted && !state.tutorialSeen) {
  startTutorial(state.tutorialStep);
}
window.setInterval(() => {
  tickEnergy();
  const hasCooldown = board().some(cell => cell?.gen && cell.readyAt > Date.now());
  if (tutorialStep === null) {
    const nextHint = Date.now() - lastPlayerActionAt >= 6500 ? findMergePair() : null;
    const hintChanged = JSON.stringify(nextHint) !== JSON.stringify(mergeHintPair);
    if (hintChanged) {
      mergeHintPair = nextHint;
      if (!drag) render();
    }
  }
  if (hasCooldown && !drag) render();
}, 1000);
window.ProgressLogger?.logProgress?.('game_start', {});
