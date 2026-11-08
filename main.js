// Harbor Whispers — original harbor-town merge adventure. The save key is intentionally stable.
import { FAMILIES, MAIN_FAMILIES, GENERATOR_DEFS, CHARS, REQUEST_NOTES, CHAPTER_EXPANSION, TASK_TEMPLATES, DAILY_OBJECTIVES, BOOSTERS } from './game-content.js';
import { repairDetailState, REGIONS } from './repair-details.js';
import { RESTORATION_CAST, restorationCastFor } from './scenes.js';
const GEN_CHARGES = 12;
const GEN_COOLDOWN_MS = 20_000;
const MERGE_ENERGY_COST = 1;
const MAX_ENERGY = 100;
const ENERGY_TICK_MS = 60_000;
const OFFLINE_CAP_MS = 8 * 60 * 60 * 1000;
const BOARD_COLS = 7;
const BOARD_ROWS = 9;
const BOARD_SIZE = BOARD_COLS * BOARD_ROWS;
const SAVE_KEY = 'harbor-whispers-v1';
const SAVE_VERSION = 5;
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
  { id:'market', name:'Market Square', icon:'🏪', decos:['🧹','🧺','🏷️','☂️','🪧','🪴','🛍️','🎏'], film:'garden', unlockChapter:6 },
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
    7: { key:'garden-seating', title:'Choose a garden style', prompt:'Set out a welcoming table and planters for people who like the sea breeze.', choices:[
      {id:'coastal',name:'Coastal',description:'Sea-glass chairs, pale timber and soft blue-green pots.',icon:'🪑',color:'#78b9bd'},
      {id:'cottage',name:'Cottage',description:'Rose cushions, warm wood and flower-filled planters.',icon:'🌷',color:'#e88fa0'},
      {id:'sunny-market',name:'Sunny market',description:'Golden seats, a sturdy table and bright market blooms.',icon:'🌼',color:'#eab44d'}
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
    cells[33] = { cache: 'energy', amount: 8, covered: 1 };
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
    locationStyles: Object.fromEntries(LOCATIONS.map(location => [location.id, {}])), pendingRestoration: null, restorationLedger: {},
    boards: { main: makeBoard(MAIN_FAMILIES), event: makeBoard(['shell']) },
    tasks: [], levels, inventory: [], inventoryCapacity: 30, unlockedFamilies: [...MAIN_FAMILIES],
    generatorLevels: Object.fromEntries(GENERATOR_DEFS.map(generator => [generator.family, 1])), pendingGenerators: [],
    familyMastery, discoveredItems, boosters, stats: { merges: 0, generated: 0, orders: 0, restorations: 0, discoveries: 0, fiveMerges: 0, eventPoints: 0 },
    achievements: [], relationships: Object.fromEntries(Object.keys(CHARS).map(id => [id, 1])),
    eventPoints: 0, eventClaimed: [], dailyClaimedAt: '', dailyDay: today, dailyStreak: 0, dailyObjectives: makeDailyObjectives(today),
    storyChores: {}, storyMoments: [],
    completionQueue: [], completionSequence: 0, completionMilestones: {},
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

function spendEnergy(amount = 1) {
  const cost = Math.max(0, Number(amount) || 0);
  if (state.energy < cost) return false;
  state.energy -= cost;
  return true;
}

function grantXP(amount) {
  state.xp = Math.max(0, (Number(state.xp) || 0) + Math.max(0, amount));
  while (state.playerLevel < 50 && state.xp >= xpForNextLevel()) {
    state.xp -= xpForNextLevel();
    state.playerLevel += 1;
    const level = state.playerLevel;
    const coinReward = 60 + level * 12;
    const energyBefore = state.energy;
    state.coins += coinReward;
    grantEnergy(12);
    const energyReward = state.energy - energyBefore;
    const pearlReward = level % 3 === 0 ? 2 : 0;
    if (pearlReward) state.pearls += pearlReward;
    const boosterReward = level % 5 === 0 ? 1 : 0;
    if (boosterReward) state.boosters.energyFlask = (state.boosters.energyFlask || 0) + boosterReward;
    const maxEnergyReward = level % 5 === 0 ? 5 : 0;
    if (maxEnergyReward) state.maxEnergy = Math.min(200, maxEnergy() + maxEnergyReward);
    const unlockedBefore = [...state.unlockedFamilies];
    unlockAvailableGenerators();
    const newlyUnlocked = state.unlockedFamilies.filter(familyId => !unlockedBefore.includes(familyId));
    enqueueCompletion({
      kind:'level', priority:80, level, title:'Level Up!',
      message:level >= 50 ? 'You have reached the harbor’s highest level. Keep playing at your own easy pace.' : 'A little more experience brings you closer to the next harbor milestone.',
      rewards:[
        {icon:'🪙',amount:coinReward,label:'coins'},
        ...(energyReward ? [{icon:'⚡',amount:energyReward,label:'energy'}] : []),
        ...(pearlReward ? [{icon:'💎',amount:pearlReward,label:'pearls'}] : []),
        ...(boosterReward ? [{icon:'🧪',amount:boosterReward,label:'Energy Flask'}] : []),
        ...(maxEnergyReward ? [{icon:'↗',amount:maxEnergyReward,label:'energy capacity'}] : [])
      ],
      newlyUnlocked:newlyUnlocked.map(familyId => GENERATOR_DEFS.find(entry => entry.family === familyId)?.name).filter(Boolean)
    }, `level-${level}`);
    showFloat(`Level ${level}! +${coinReward}🪙 +${energyReward}⚡`);
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
  if (cell.cache === 'energy') {
    const amount = Number(cell.amount);
    return { cache:'energy', amount:Number.isFinite(amount) ? Math.max(1,Math.min(25,amount)) : 8, covered:1 };
  }
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
    migrated.levels = Object.fromEntries(LOCATIONS.map(location => [
      location.id,
      Math.max(0, Math.min(location.decos.length, Math.floor(Number(saved.levels?.[location.id]) || 0)))
    ]));
    migrated.coins = Math.max(0, Math.floor(Number(saved.coins) || 0));
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
    const savedCompletions = Array.isArray(saved.completionQueue) ? saved.completionQueue.filter(event => event && typeof event === 'object' && typeof event.kind === 'string' && typeof event.id === 'string') : [];
    const visibleCompletionKinds = new Set(['restoration','area','epilogue']);
    migrated.completionQueue = savedCompletions.filter(event => visibleCompletionKinds.has(event.kind) && !(event.kind === 'area' && savedCompletions.some(other => other.kind === 'restoration' && other.locationName === event.locationName && other.progress === event.progress))).slice(0, 20);
    migrated.completionSequence = Math.max(0, Math.floor(Number(saved.completionSequence) || 0));
    migrated.completionMilestones = saved.completionMilestones && typeof saved.completionMilestones === 'object' && !Array.isArray(saved.completionMilestones) ? saved.completionMilestones : {};
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
    const priorLedger = saved.restorationLedger && typeof saved.restorationLedger === 'object' && !Array.isArray(saved.restorationLedger)
      ? saved.restorationLedger
      : {};
    migrated.restorationLedger = {};
    LOCATIONS.forEach(location => {
      for (let level = 1; level <= migrated.levels[location.id]; level += 1) {
        const key = `${location.id}:${level}`;
        const receipt = priorLedger[key];
        migrated.restorationLedger[key] = receipt && receipt.committed
          ? { transactionId:String(receipt.transactionId || `legacy-${key}`), locationId:location.id, level, cost:Math.max(0,Number(receipt.cost)||0), committed:true, rewardsGranted:true, committedAt:Math.max(0,Number(receipt.committedAt)||0) }
          : { transactionId:`legacy-${key}`, locationId:location.id, level, cost:0, committed:true, rewardsGranted:true, committedAt:0, legacy:true };
      }
    });
    const pending = saved.pendingRestoration;
    const pendingLocation = LOCATIONS.find(location => location.id === pending?.locationId);
    if (pendingLocation && Number.isInteger(Number(pending.level))) {
      const level = Math.max(1,Math.min(pendingLocation.decos.length,Math.floor(Number(pending.level))));
      const key = `${pendingLocation.id}:${level}`;
      const priorReceipt = priorLedger[key];
      const isRecoverablePaid = Number(saved.saveVersion) >= 5
        && level === migrated.levels[pendingLocation.id] + 1
        && (!priorReceipt || (priorReceipt.status === 'paid' && !priorReceipt.committed && !priorReceipt.rewardsGranted));
      if (isRecoverablePaid) {
        const transactionId = String(pending.transactionId || priorReceipt?.transactionId || `repair-${key}-${Date.now()}`);
        const receipt = {
          transactionId, locationId:pendingLocation.id, level,
          cost:Math.max(0,Math.floor(Number(pending.cost ?? priorReceipt?.cost) || 0)),
          status:'paid', committed:false, rewardsGranted:false, createdAt:Math.max(0,Number(priorReceipt?.createdAt) || Number(pending.workStartedAt) || Date.now())
        };
        migrated.restorationLedger[key] = receipt;
        const requestedPhase = ['work','design'].includes(pending.phase) ? pending.phase : (RESTORATION_DESIGNS[pendingLocation.id]?.[level] ? 'design' : 'work');
        migrated.pendingRestoration = {
          locationId:pendingLocation.id, level, phase:requestedPhase,
          designKey:String(pending.designKey || (RESTORATION_DESIGNS[pendingLocation.id]?.[level]?.key || '')),
          choiceId:String(pending.choiceId || ''), transactionId,
          cost:receipt.cost, coinReward:Math.max(0,Math.floor(Number(pending.coinReward) || 20 + level * 5)),
          committed:false, rewardsGranted:false,
          workStartedAt:Math.max(0,Number(pending.workStartedAt) || Date.now()),
          workDurationMs:Math.max(0,Math.min(5000,Number(pending.workDurationMs) || 1800))
        };
      } else {
        const receipt = migrated.restorationLedger[key] || {
          transactionId:String(pending.transactionId || `legacy-${key}`), locationId:pendingLocation.id, level,
          cost:Math.max(0,Math.floor(Number(pending.cost) || 0)), committed:true, rewardsGranted:true, committedAt:0, legacy:true
        };
        migrated.restorationLedger[key] = { ...receipt, transactionId:String(pending.transactionId || receipt.transactionId), status:'committed', committed:true, rewardsGranted:true };
        const phase = pending.phase === 'design' ? 'design' : 'complete';
        migrated.pendingRestoration = {
          locationId:pendingLocation.id, level, phase, designKey:String(pending.designKey || ''), choiceId:String(pending.choiceId || ''),
          transactionId:migrated.restorationLedger[key].transactionId,
          cost:Math.max(0,Math.floor(Number(pending.cost ?? receipt.cost) || 0)),
          coinReward:Math.max(0,Math.floor(Number(pending.coinReward) || 20 + level * 5)), committed:true, rewardsGranted:true,
          workStartedAt:Math.max(0,Number(pending.workStartedAt) || Date.now()), workDurationMs:Math.max(0,Math.min(5000,Number(pending.workDurationMs) || 1800))
        };
      }
    } else {
      migrated.pendingRestoration = null;
    }
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

function recordStoryAction(kind, amount = 1, persist = true) {
  const context = storyChoreContext();
  if (!context.chore || context.chore.kind !== kind) return;
  const key = String(context.chapterIndex);
  const track = state.storyChores[key] || (state.storyChores[key] = { step: 0, progress: 0 });
  track.progress = Math.min(context.chore.target, context.progress + Math.max(1, Number(amount) || 1));
  if (track.progress >= context.chore.target) {
    track.step = Math.min(STORY_CHORE_STEPS.length, context.stepIndex + 1);
    track.progress = 0;
    const choreXP = 15;
    grantXP(choreXP);
    const chapterLocation = LOCATIONS.find(entry => entry.id === CHAPTER_LOCATION_IDS[context.chapterIndex]) || LOCATIONS[0];
    enqueueCompletion({
      kind:'chore', priority:40, title:'Task Completed!', taskName:context.chore.title,
      character:context.chore.character, icon:chapterLocation.icon,
      message:'One more helpful promise kept. The harbor story moves forward.',
      progress:`${track.step} / ${STORY_CHORE_STEPS.length} story tasks`,
      rewards:[{icon:'✦',amount:choreXP,label:'XP'}]
    });
    feedbackMessage = `Story chore complete: ${context.chore.title}. The harbor day moves on.`;
    showFloat('CHORE COMPLETE!');
    if (track.step >= STORY_CHORE_STEPS.length) {
      const nextChapterReady = context.chapterIndex + 1 < state.chapter;
      const storyFinished = context.chapterIndex + 1 >= CHAPTERS.length && state.chapter >= CHAPTERS.length;
      const nextMessage = nextChapterReady
        ? `“${CHAPTERS[context.chapterIndex + 1].title}” is already ready in the journal.`
        : state.chapter < CHAPTERS.length
          ? 'Keep helping neighbors and collecting stars to reveal the next chapter.'
          : 'The harbor story has reached its final chapter. Your boards remain open for relaxed play.';
      enqueueCompletion({
        kind:'story-day', priority:50, title:'Story Day Completed!',
        chapterTitle:context.chapter.title, art:storyArtwork(context.chapter),
        progress:`${STORY_CHORE_STEPS.length} / ${STORY_CHORE_STEPS.length} story tasks`,
        message:nextMessage, nextChapterReady,
        rewards:[]
      }, `story-day-${context.chapterIndex}`);
      if (storyFinished) {
        enqueueCompletion({
          kind:'caught-up', priority:70, title:'You’re All Caught Up!',
          chapterTitle:context.chapter.title, art:storyArtwork(context.chapter),
          progress:`${CHAPTERS.length} / ${CHAPTERS.length} chapters · all story tasks complete`,
          message:'You have reached the end of the available harbor story. The merge boards and repairs are still here for cozy free play.',
          rewards:[]
        }, 'story-caught-up');
      }
    }
  }
  if (persist) saveState();
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
let storySceneOpen = false;
let completionModalOpen = false;
let storyDialogsDeferred = false;
const defaultBoardHint = 'Make treats, fill requests for stars, and spend coins to restore the harbor!';
let feedbackMessage = defaultBoardHint;
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
    return true;
  } catch (error) {
    // The session stays playable if browser storage is unavailable.
    return false;
  }
}

function enqueueCompletion(event, milestoneKey = '') {
  const popupWorthyKinds = new Set(['restoration','area','epilogue']);
  if (!event || !popupWorthyKinds.has(event.kind) || !Array.isArray(state.completionQueue)) return null;
  if (milestoneKey && state.completionMilestones?.[milestoneKey]) return null;
  if (milestoneKey) state.completionMilestones[milestoneKey] = true;
  state.completionSequence = Math.max(0, Number(state.completionSequence) || 0) + 1;
  const queued = {
    ...event,
    id:`completion-${state.completionSequence}`,
    sequence:state.completionSequence,
    priority:Number(event.priority) || 50,
    queuedAt:Date.now()
  };
  state.completionQueue.push(queued);
  state.completionQueue.sort((first, second) => first.priority - second.priority || first.sequence - second.sequence);
  return queued;
}

function pumpCompletionQueue() {
  if (completionModalOpen || storySceneOpen || dialogueOpen || tutorialStep !== null || !state.completionQueue?.length) return false;
  if (document.querySelector('.modal, .story-scene, .restoration-scene-screen')) return false;
  const next = state.completionQueue[0];
  if (!next || typeof showCompletionPopup !== 'function') return false;
  showCompletionPopup(next);
  return true;
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
    const chapterIndex = state.chapter;
    const chapter = CHAPTERS[chapterIndex];
    state.starsToward -= storyStarGoal(state.chapter);
    unlocked.push(chapter);
    state.chapter += 1;
    state.coins += 70;
    grantEnergy(8);
    grantXP(60);
    unlockAvailableGenerators();
    enqueueCompletion({
      kind:'chapter-unlock', priority:60, chapterIndex,
      chapterTitle:chapter.title, art:storyArtwork(chapter),
      message:`“${chapter.title}” is ready to read. Your star progress and chapter rewards are saved.`,
      rewards:[{icon:'🪙',amount:70,label:'coins'},{icon:'⚡',amount:8,label:'energy'},{icon:'✦',amount:60,label:'XP'}]
    }, `chapter-unlock-${chapterIndex}`);
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
    enqueueCompletion({
      kind:'task', priority:10, title:'Task Completed!',
      taskName:`${task.title} · Delivery ${task.stage} of ${task.requirements.length}`,
      character:task.who, itemIcon:deliveredItem?.icon || '📦',
      message:'That delivery is safely with the crew. One more helpful hand will finish the request.',
      rewards:[{icon:'🪙',amount:25,label:'coins'},{icon:'⚡',amount:2,label:'energy'},{icon:'✦',amount:20,label:'XP'}]
    });
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
  enqueueCompletion({
    kind:'task', priority:10, title:'Task Completed!',
    taskName:deliveredItem?.name || task.title,
    character:task.who, itemIcon:deliveredItem?.icon || '📦',
    message:`${CHARS[task.who]?.name || 'Your neighbor'} is grateful for your help. The rewards are already added to your harbor supplies.`,
    rewards:[
      {icon:'🪙',amount:task.coins,label:'coins'},
      ...(task.energy ? [{icon:'⚡',amount:task.energy,label:'energy'}] : []),
      {icon:'⭐',amount:task.stars,label:'stars'},
      ...(task.pearls ? [{icon:'💎',amount:task.pearls,label:'pearls'}] : []),
      {icon:'✦',amount:task.xp || 35,label:'XP'}
    ].filter(reward => reward.amount > 0)
  });
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
  if (storyDialogsDeferred || dialogueOpen || storySceneOpen || completionModalOpen) return;
  if (state.completionQueue?.length) {
    pumpCompletionQueue();
    return;
  }
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
  enqueueCompletion({
    kind:'epilogue', priority:90, title:'The Harbor Comes Home',
    chapterTitle:'A story made by everyone', art:'assets/restore-pier-scene.webp',
    message:'Every chapter has been discovered and every harbor improvement is complete. Your boards remain open for relaxed free play.',
    rewards:[],
    lines:[
      ['mae', 'Look at us! The café is warm again, the pier is safe, the garden is in bloom, and every corner of the harbor has found its people again.'],
      ['theo', 'The harbor light is shining for everyone who needs a way home. We could not have done it without this town.'],
      ['iris', 'I am printing the whole story. Not as gossip this time—as a thank-you to everyone who helped bring Harbor Whispers back to life.'],
      ['mae', 'The mystery is solved, every place is mended, and the harbor is ours again. The story may be finished, but there is always room for one more order at my café.']
    ]
  }, 'campaign-epilogue');
  saveState();
  pumpCompletionQueue();
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
    feedbackMessage = `You need ${energyCost}⚡. Energy refills over time; orders, daily gifts, level-ups and Town-board straw stashes can help.`;
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

function spawnEnergyCache() {
  if (currentBoardKey !== 'main' || state.energy >= maxEnergy()) return false;
  const boardCells = mainBoard();
  if (boardCells.filter(cell => cell?.cache === 'energy').length >= 2 || Math.random() >= 0.14) return false;
  const emptySpots = boardCells.map((cell, index) => cell ? -1 : index).filter(index => index >= 0);
  if (!emptySpots.length) return false;
  const spot = emptySpots[Math.floor(Math.random() * emptySpots.length)];
  const amount = 5 + Math.floor(Math.random() * 6);
  boardCells[spot] = { cache:'energy', amount, covered:1 };
  feedbackMessage = 'A hidden energy stash appeared under a straw bundle. Tap it to collect the ⚡!';
  showFloat('Hidden energy found!');
  return true;
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
  spawnEnergyCache();
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
    if (!spendEnergy(MERGE_ENERGY_COST)) {
      feedbackMessage = `Merging costs ${MERGE_ENERGY_COST}⚡. Energy refills over time; tap a hidden straw bundle for a bonus stash.`;
      render();
      return true;
    }
    const uncoveredBundle = Boolean(second.covered);
    cells[from] = null;
    cells[to] = { fam:first.fam, tier:first.tier + 1 };
    feedbackMessage = uncoveredBundle
      ? `${FAMILIES[first.fam].name} bundle uncovered! Merge cost: ${MERGE_ENERGY_COST}⚡.`
      : `${FAMILIES[first.fam].name}: ${FAMILIES[first.fam].items[first.tier - 1]} → ${FAMILIES[first.fam].items[first.tier]} · −${MERGE_ENERGY_COST}⚡`;
    recordMerge(first.fam, first.tier);
    if (uncoveredBundle) showFloat(`Bundle uncovered · −${MERGE_ENERGY_COST}⚡`);
    playPop();
    if (tutorialStep === 1) advanceTutorial(2);
    placePendingGenerators();
    render(to);
    return true;
  }
  if (second?.covered) {
    feedbackMessage = 'Merge an uncovered matching item into this straw bundle to reveal its hidden upgrade.';
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
  if (!spendEnergy(MERGE_ENERGY_COST)) {
    feedbackMessage = `Merging costs ${MERGE_ENERGY_COST}⚡. Energy refills over time; hidden straw bundles may hold bonus energy.`;
    render();
    return;
  }
  const cells = board();
  const outputCount = groupSize === 5 ? 2 : 1;
  matches.forEach(cellIndex => { cells[cellIndex] = null; });
  cells[matches[0]] = { fam:cell.fam, tier:cell.tier + 1 };
  if (outputCount === 2) cells[matches[1]] = { fam:cell.fam, tier:cell.tier + 1 };
  recordMerge(cell.fam, cell.tier, groupSize, outputCount - 1);
  playPop();
  showFloat(groupSize === 5 ? `Five merge · 2 higher-tier items · −${MERGE_ENERGY_COST}⚡` : `Three merge · higher-tier item · −${MERGE_ENERGY_COST}⚡`);
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
  if (cell.cache === 'energy') return 'Hidden energy stash under straw · tap to collect bonus ⚡; it stays if your energy is full.';
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

function collectEnergyCache(index) {
  const cache = board()[index];
  if (cache?.cache !== 'energy') return;
  if (state.energy >= maxEnergy()) {
    feedbackMessage = 'Your energy is full. Leave this hidden stash here and collect it after spending some ⚡.';
    render();
    return;
  }
  const energyBefore = state.energy;
  grantEnergy(Number(cache.amount) || 8);
  const gained = state.energy - energyBefore;
  board()[index] = null;
  selectedIndex = -1;
  placePendingGenerators();
  feedbackMessage = `Hidden energy stash collected: +${gained}⚡.`;
  showFloat(`+${gained}⚡ hidden stash!`);
  playPop();
  render();
}

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
  if (item?.cache === 'energy') {
    collectEnergyCache(index);
    return;
  }
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
    selectedIndex = index;
    tapGenerator(index);
    return;
  }
  selectedIndex = item ? index : -1;
  feedbackMessage = item
    ? describeItem(item)
    : 'Empty board space · tap a generator to create an item here.';
  render();
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

function completionRewardsMarkup(rewards = []) {
  const available = rewards.filter(reward => Number(reward?.amount) > 0);
  if (!available.length) return '';
  return `<div class="completion-rewards" aria-label="Rewards collected">${available.map((reward,index) => `<div class="completion-reward" style="--reward-delay:${index * 80}ms"><span>${reward.icon || '✦'}</span><b data-reward-count="${Math.max(0,Number(reward.amount) || 0)}">${Math.max(0,Number(reward.amount) || 0)}</b><small>${reward.label || ''}</small></div>`).join('')}</div>`;
}

function completionCropMarkup(src, style = '', label = '', direct = false) {
  if (!src) return '';
  const className = direct ? 'completion-art-direct' : 'completion-art-atlas';
  return `<img class="${className}" src="${src}" alt="${label}" style="${style}" draggable="false">`;
}

function completionVisualMarkup(event) {
  const character = CHARS[event.character] ? event.character : 'mae';
  const actor = CHARS[character];
  if (event.kind === 'task' || event.kind === 'chore') {
    return `<div class="completion-character-stage"><span class="completion-halo" aria-hidden="true"></span>${characterPortrait(character,'completion-character-portrait')}<span class="completion-item-bubble" aria-label="Completed item">${event.itemIcon || event.icon || actor.icon}</span><i class="completion-sparkle sparkle-a" aria-hidden="true">✦</i><i class="completion-sparkle sparkle-b" aria-hidden="true">✧</i></div>`;
  }
  if (event.kind === 'restoration') {
    const before = completionCropMarkup(event.beforeArt,event.beforeStyle,event.beforeLabel,event.beforeDirect);
    const after = completionCropMarkup(event.afterArt,event.afterStyle,event.afterLabel,event.afterDirect);
    return `<div class="completion-before-after"><div class="completion-scene-frame before">${before}<small>BEFORE</small></div><span class="completion-scene-arrow" aria-hidden="true">›</span><div class="completion-scene-frame after">${after}<small>AFTER</small><i aria-hidden="true">✦</i></div></div>`;
  }
  if (event.kind === 'area') {
    return `<div class="completion-area-stage">${event.directArt ? `<img src="${event.art}" alt="Fully restored ${event.locationName}" class="completion-area-image">` : `<div class="completion-area-crop">${completionCropMarkup(event.art,event.artStyle,`Fully restored ${event.locationName}`,false)}</div>`}<div class="completion-area-ribbon">${event.locationIcon || '🏡'} ${event.locationName}</div><span class="completion-garland" aria-hidden="true">✦ ✧ ✦</span></div>`;
  }
  if (event.kind === 'level') {
    return `<div class="completion-level-stage"><span class="completion-level-rays" aria-hidden="true">✦　✧　✦</span>${characterPortrait('iris','completion-level-portrait')}<b class="completion-level-number">${event.level}</b><small>HARBOR LEVEL</small></div>`;
  }
  return `<div class="completion-story-stage" style="--completion-story-art:url('${event.art || 'assets/harbor-bg.webp'}')"><img src="${event.art || 'assets/harbor-bg.webp'}" alt="${event.chapterTitle || 'Harbor story'}"><span class="completion-story-badge">${event.kind === 'caught-up' ? '📖' : event.kind === 'chapter-unlock' ? '✨' : '🌅'}</span><i class="completion-sparkle sparkle-a" aria-hidden="true">✦</i><i class="completion-sparkle sparkle-b" aria-hidden="true">✧</i></div>`;
}

function completionHeading(event) {
  const headings = {
    task:'Task Completed!', chore:'Task Completed!', restoration:'Restoration Complete!',
    area:'Area Completely Restored!', 'story-day':'Story Day Completed!',
    'chapter-unlock':'A New Chapter!', 'caught-up':'You’re All Caught Up!',
    level:'Level Up!', epilogue:'The Harbor Comes Home'
  };
  return headings[event.kind] || event.title || 'Harbor Milestone!';
}

function showCompletionPopup(event) {
  if (!event || completionModalOpen || document.querySelector('.modal, .story-scene')) return;
  completionModalOpen = true;
  const modal = document.createElement('div');
  modal.className = `completion-overlay completion-${event.kind}`;
  modal.setAttribute('role','dialog');
  modal.setAttribute('aria-modal','true');
  modal.setAttribute('aria-label',completionHeading(event));
  const subtitle = event.taskName || event.repairName || event.chapterTitle || event.locationName || (event.kind === 'level' ? `Level ${event.level}` : '');
  const progress = event.progress ? `<div class="completion-progress">${event.progress}</div>` : '';
  const unlocks = event.newlyUnlocked?.length
    ? `<div class="completion-unlocks"><small>NEWLY UNLOCKED</small><b>${event.newlyUnlocked.join(' · ')}</b></div>`
    : '';
  const buttonLabel = event.kind === 'caught-up' ? 'Return to Game' : 'Continue';
  modal.innerHTML = `<div class="completion-card" role="document"><div class="completion-confetti" aria-hidden="true">${Array.from({length:12},(_,index)=>`<i style="--confetti-index:${index}">${['✦','•','✧','★'][index%4]}</i>`).join('')}</div><div class="completion-rim" aria-hidden="true"></div><header class="completion-heading"><small>${event.kind === 'task' || event.kind === 'chore' ? 'A HARBOR FAVOR FINISHED' : event.kind === 'restoration' ? 'A VISIBLE CHANGE IN TOWN' : event.kind === 'area' ? 'A HARBOR-WIDE MILESTONE' : event.kind === 'level' ? 'YOUR HARBOR JOURNEY' : 'THE HARBOR JOURNAL'}</small><h2>${completionHeading(event)}</h2>${subtitle ? `<b class="completion-subtitle">${subtitle}</b>` : ''}</header>${completionVisualMarkup(event)}${progress}${event.message ? `<p class="completion-message">${event.message}</p>` : ''}${unlocks}${completionRewardsMarkup(event.rewards)}<button class="completion-continue" type="button">${buttonLabel}<span aria-hidden="true">›</span></button></div>`;
  document.body.appendChild(modal);
  const continueButton = modal.querySelector('.completion-continue');
  continueButton?.focus({preventScroll:true});
  modal.querySelectorAll('[data-reward-count]').forEach(counter => {
    const amount = Number(counter.dataset.rewardCount) || 0;
    const start = performance.now();
    const duration = window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 0 : 620;
    const animate = now => {
      const ratio = duration ? Math.min(1,(now - start) / duration) : 1;
      counter.textContent = String(Math.round(amount * (1 - Math.pow(1 - ratio,3))));
      if (ratio < 1 && modal.isConnected) requestAnimationFrame(animate);
    };
    requestAnimationFrame(animate);
  });
  continueButton?.addEventListener('click', () => {
    if (continueButton.disabled) return;
    continueButton.disabled = true;
    const queueIndex = state.completionQueue.findIndex(queued => queued.id === event.id);
    if (queueIndex >= 0) state.completionQueue.splice(queueIndex,1);
    completionModalOpen = false;
    modal.remove();
    saveState();
    playPop();
    if (event.kind === 'caught-up') {
      currentBoardKey = 'main';
      selectedIndex = -1;
      feedbackMessage = 'You’re all caught up on the available story. Your Town board and relaxed free play are ready.';
      render();
    }
    if (event.kind === 'epilogue') {
      showDialogue({title:event.title || 'The Harbor Comes Home',lines:event.lines || []},() => {
        render();
        openNextDialogue();
      });
      return;
    }
    if (!pumpCompletionQueue()) openNextDialogue();
  },{once:true});
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
  storySceneOpen = true;
  document.body.appendChild(modal);
  function finishDialogue() {
    if (closed) return;
    closed = true;
    window.clearInterval(typewriterTimer);
    modal.remove();
    storySceneOpen = false;
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
  showModal(`<div class="sheet-heading"><div><div class="story-kicker">OPTIONAL SIDE CHALLENGE</div><h2>Seaside picnic board</h2></div><button class="btn close-sheet" aria-label="Close">✕</button></div><p>This is a bonus board, not the next story chapter. Tap the picnic generator to spend 1 shared ⚡; each merge also costs 1⚡. Merge matching seaside bites and collect event points. Reach a milestone and tap <b>Claim</b> for its coins, energy, or occasional story ⭐.</p><p>Picnic rewards are one-time milestones; the main campaign moves forward through townsfolk requests and harbor repairs on the Town board. There is no event timer and nothing to lose if you ignore the picnic.</p><button class="btn primary event-return">Got it</button>`, modal => {
    modal.querySelector('.close-sheet').onclick = () => modal.remove();
    modal.querySelector('.event-return').onclick = () => modal.remove();
  });
}

function showGuide() {
  showModal(`<div class="sheet-heading"><div><div class="story-kicker">YOUR HARBOR, YOUR PACE</div><h2>How to play</h2></div><button class="btn close-sheet" aria-label="Close">✕</button></div><div class="guide-section"><b>1 · Make and merge</b><p>Tap a generator to spend 1⚡. Every merge action costs 1⚡ too, including three- and five-item merges. Drag two matching items together, or tap one item and then its match, to build the goods needed for a request. Tap the selected item again to open details, storage and larger-merge options. Matching pairs glow after a short pause. Energy refills over time; requests, daily gifts, level-ups and hidden energy stashes can restore it. On the Town board, tap a straw-covered blue ⚡ stash to collect its energy. If you are full, it stays on the board until you have room.</p></div><div class="guide-section"><b>2 · Help neighbors and rebuild</b><p>Tap the green <b>SERVE</b> button on a ready neighbor card to deliver immediately, including requests for multiple items. Tap the card itself to review the merge chain and rewards. Deliver requests for coins and ⭐. Tap <b>Repairs</b> at the bottom to go straight to the next worksite in the story. Only the current repair is available; its cost and any shortage are shown before you begin. Finish it to reveal the next story-led improvement. The <b>Story journal &amp; repairs</b> option in <b>More</b> tracks chores, chapters and repair progress, and lets you revisit locations you have already restored. Open <b>More</b>, then choose <b>Inventory</b> to store or retrieve items. Daily goals and other harbor options are also in <b>More</b>.</p></div><div class="guide-section"><b>3 · Finish the campaign, then free play</b><p>Find all ${CHAPTERS.length} chapters <em>and</em> complete all ${totalRestorationCount()} harbor improvements to unlock the epilogue. After that, keep merging on either board at your own pace.</p></div><div class="guide-section guide-calm"><b>No fail state</b><p>No lives, countdown, or losing screen. Energy refills over time, and you can find extra ⚡ in straw-covered stashes on the Town board—tap a stash to collect it. A full energy bar will not waste a stash; it stays on the board until you have room. Pause and come back whenever you like. Your progress is saved on this device.</p></div><div class="guide-actions"><button class="btn primary replay-guide">Replay the first-time guide</button><button class="btn fresh-save">Start a new harbor…</button></div>`, modal => {
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
  const giftClaimed = state.dailyClaimedAt === today;
  const giftAction = `<button class="btn daily-gift-action" type="button" data-claim-daily-gift ${giftClaimed ? 'disabled' : ''}>${giftClaimed ? '🎁 Gift claimed today' : '🎁 Claim daily gift · +60🪙 +12⚡'}</button>`;
  return `${profile}<p class="panel-note">Daily harbor goals refresh each day. Progress comes from playing normally; there is no streak penalty for taking a break.</p>${giftAction}<div class="objective-list">${rows}</div><div class="map-heading">HARBOR SUPPLIES</div><div class="inventory-list">${boosterRows || '<p class="panel-note">No boosters in your supply basket yet.</p>'}</div><small class="panel-note">Today · ${today}</small>`;
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
    body.querySelector('[data-claim-daily-gift]')?.addEventListener('click', () => { claimDailyGift(); draw(); });
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
      ? { title: 'Merge matching treats', text: 'Drag one treat onto an identical one, or tap each in turn. Each merge action costs 1⚡; matching treats become a higher-tier item.', action: 'Continue ›' }
      : tutorialStep === 1
        ? { title: 'Merge matching treats', text: `Drag one highlighted ${mergeItem} onto its match. You can also tap the pair one after the other. Each merge action costs 1⚡.`, action: 'Your turn ✨' }
        : tutorialStep === 2
          ? { title: 'Uncover a straw-covered treat', text: hasWebbedTreat ? 'Some treats are tucked beneath straw bundles. Merge an uncovered match into a covered treat to uncover its upgrade. A blue ⚡ stash under straw is different: after the guide, tap it to collect the hidden energy.' : 'Some treats hide under straw; merge an uncovered match into one to reveal its upgrade. After the guide, tap a blue ⚡ stash to collect hidden energy.', action: 'Got it ›' }
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

// Nine cumulative plates per location. Garden and pier already have individual
// files; the other locations keep per-step URL slots ready for standalone plates
// and use their matching atlas frame until those files are supplied.
const PLATES = Object.freeze({
  cafe:Array.from({length:9},(_,step)=>`assets/restore-cafe-step-${step}.webp`),
  pier:Array.from({length:9},(_,step)=>`assets/restore-pier-${step}.webp`),
  garden:Array.from({length:9},(_,step)=>`assets/restore-garden-${step}.webp`),
  office:Array.from({length:9},(_,step)=>`assets/restore-office-${step}.webp`),
  market:Array.from({length:9},(_,step)=>`assets/restore-market-${step}.webp`),
  lighthouse:Array.from({length:9},(_,step)=>`assets/restore-lighthouse-${step}.webp`),
  workshop:Array.from({length:9},(_,step)=>`assets/restore-workshop-${step}.webp`),
  archive:Array.from({length:9},(_,step)=>`assets/restore-archive-${step}.webp`),
  wharf:Array.from({length:9},(_,step)=>`assets/restore-wharf-${step}.webp`),
  festival:Array.from({length:9},(_,step)=>`assets/restore-festival-${step}.webp`)
});
const PLATE_FALLBACKS = Object.freeze({
  cafe:{src:'assets/restore-cafe-plates.webp',width:1164,height:1544,cellWidth:288,cellHeight:512,gapX:4,gapY:4},
  pier:{src:'assets/restore-pier-plates.webp',width:1164,height:1544,cellWidth:288,cellHeight:512,gapX:4,gapY:4},
  garden:{src:'assets/restore-garden-plates-improved.webp',width:1152,height:1536,cellWidth:288,cellHeight:512,gapX:0,gapY:0},
  office:{src:'assets/restore-gazette-plates-improved.webp',width:1152,height:1536,cellWidth:288,cellHeight:512,gapX:0,gapY:0},
  market:{src:'assets/restore-market-plates-improved.webp',width:1152,height:1536,cellWidth:288,cellHeight:512,gapX:0,gapY:0},
  lighthouse:{src:'assets/restore-lighthouse-plates.webp',width:1164,height:1544,cellWidth:288,cellHeight:512,gapX:4,gapY:4},
  workshop:{src:'assets/restore-workshop-plates.webp',width:1164,height:1544,cellWidth:288,cellHeight:512,gapX:4,gapY:4},
  archive:{src:'assets/restore-archive-plates-improved.webp',width:1152,height:1536,cellWidth:288,cellHeight:512,gapX:0,gapY:0},
  wharf:{src:'assets/restore-wharf-plates.webp',width:1164,height:1544,cellWidth:288,cellHeight:512,gapX:4,gapY:4},
  festival:{src:'assets/restore-festival-plates-improved.webp',width:1152,height:1536,cellWidth:288,cellHeight:512,gapX:0,gapY:0}
});
const INDIVIDUAL_PLATE_LOCATIONS = new Set(['pier','garden']);

function getPlate(locationId, step) {
  const index = Math.max(0,Math.min(8,Math.floor(Number(step) || 0)));
  const candidate = PLATES[locationId]?.[index];
  if (candidate && INDIVIDUAL_PLATE_LOCATIONS.has(locationId)) return {src:candidate};
  const fallback = PLATE_FALLBACKS[locationId] || PLATE_FALLBACKS.cafe;
  const column = index % 4;
  const row = Math.floor(index / 4);
  return {
    src:fallback.src,
    frame:{x:column * (fallback.cellWidth + fallback.gapX),y:row * (fallback.cellHeight + fallback.gapY),w:fallback.cellWidth,h:fallback.cellHeight,atlasWidth:fallback.width,atlasHeight:fallback.height}
  };
}

function plateKey(plate) {
  return `${plate.src}|${plate.frame ? `${plate.frame.x},${plate.frame.y},${plate.frame.w},${plate.frame.h}` : 'full'}`;
}

function plateImageStyle(plate) {
  const frame = plate?.frame;
  if (!frame) return '';
  return `--plate-atlas-width:${(frame.atlasWidth / frame.w * 100).toFixed(4)}%;--plate-atlas-height:${(frame.atlasHeight / frame.h * 100).toFixed(4)}%;--plate-atlas-left:${(-frame.x / frame.w * 100).toFixed(4)}%;--plate-atlas-top:${(-frame.y / frame.h * 100).toFixed(4)}%`;
}

function restorationBaseArt(location, step = Number(state.levels[location.id]) || 0) {
  return getPlate(location.id,step);
}

function restorationArt(location, level) {
  const detail = repairDetailState(location.id, level) || {};
  return {
    ...detail,
    before:getPlate(location.id,Math.max(0,level - 1)),
    after:getPlate(location.id,Math.min(8,level)),
    beforeFrame:Math.max(0,level - 1),
    afterFrame:Math.min(8,level),
    interior:detail.zone === 'indoor', focused:false
  };
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

function restorationStylesFor(locationId) {
  const styles = {};
  Object.entries(RESTORATION_DESIGNS[locationId] || {}).forEach(([stage, design]) => {
    styles[stage] = state.locationStyles?.[locationId]?.[design.key] || '';
  });
  return styles;
}

function commitRestoration(choice = null) {
  const pending = state.pendingRestoration;
  const location = LOCATIONS.find(entry => entry.id === pending?.locationId);
  if (!pending || !location || !Number.isInteger(Number(pending.level))) return false;
  const level = Math.max(1, Math.min(location.decos.length, Number(pending.level)));
  const key = `${location.id}:${level}`;
  const receipt = state.restorationLedger?.[key];
  if (!receipt || receipt.transactionId !== pending.transactionId) return false;
  const design = RESTORATION_DESIGNS[location.id]?.[level];
  if (choice && (!design || !design.choices.some(option => option.id === choice.id))) return false;
  if (!receipt.committed && !receipt.rewardsGranted && (Number(state.levels[location.id]) || 0) !== level - 1) return false;
  if (choice && design) {
    if (!state.locationStyles[location.id]) state.locationStyles[location.id] = {};
    state.locationStyles[location.id][design.key] = choice.id;
    if (location.id === 'cafe' && design.key === 'floor') state.cafeFloor = choice.id;
    pending.choiceId = choice.id;
  }

  if (!receipt.committed && !receipt.rewardsGranted) {
    state.levels[location.id] = level;
    state.stars = Math.max(0, Number(state.stars) || 0) + 1;
    state.starsToward = Math.max(0, Number(state.starsToward) || 0) + 1;
    const coinReward = Math.max(0, Math.floor(Number(pending.coinReward) || 20 + level * 5));
    state.coins = Math.max(0, Number(state.coins) || 0) + coinReward;
    grantXP(20);
    state.stats.restorations = (Number(state.stats.restorations) || 0) + 1;
    recordStoryAction('restorations', 1, false);
    updateDailyProgress('restorations');
    receipt.committed = true;
    receipt.rewardsGranted = true;
    receipt.status = 'committed';
    receipt.committedAt = Date.now();
    checkAchievements();
    const stageTitle = RESTORATION_STAGES[location.id]?.[level - 1]?.[0] || `${location.name} improvement`;
    const detail = repairDetailState(location.id, level) || {};
    const visual = restorationArt(location, level);
    const beforeDirect = !visual.before.frame;
    const afterDirect = !visual.after.frame;
    const areaComplete = level >= location.decos.length;
    enqueueCompletion({
      kind:areaComplete ? 'area' : 'restoration', priority:20, locationName:location.name,
      locationIcon:location.icon, repairName:detail.repairItem || stageTitle, icon:location.decos[level - 1],
      ...(areaComplete
        ? { art:visual.after.src, artStyle:plateImageStyle(visual.after), directArt:afterDirect }
        : { beforeArt:visual.before.src, afterArt:visual.after.src, beforeStyle:plateImageStyle(visual.before), afterStyle:plateImageStyle(visual.after), beforeDirect, afterDirect, beforeLabel:detail.beforeState || stageTitle, afterLabel:detail.afterState || stageTitle }),
      progress:`${location.icon} ${level} / ${location.decos.length} improvements`,
      message:areaComplete
        ? `${detail.repairItem || stageTitle} is repaired, and every restoration task in the ${location.name.toLowerCase()} is complete. The finished scene is saved for every visit.`
        : `${detail.repairItem || stageTitle} is repaired and now appears in ${location.name}.`,
      rewards:[{icon:'🪙',amount:coinReward,label:'coins'},{icon:'⭐',amount:1,label:'star'},{icon:'✦',amount:20,label:'XP'}]
    }, areaComplete ? `area-complete-${location.id}` : `restoration-${location.id}-${level}`);
  } else {
    state.levels[location.id] = Math.max(Number(state.levels[location.id]) || 0, level);
    receipt.committed = true;
    receipt.rewardsGranted = true;
    receipt.status = 'committed';
  }
  pending.phase = 'complete';
  pending.committed = true;
  pending.rewardsGranted = true;
  saveState();
  return true;
}

function restorationEnergyCountdown() {
  if (state.energy >= maxEnergy()) return 'FULL';
  const elapsed = Math.max(0, Date.now() - (Number(state.lastTick) || Date.now()));
  const remaining = Math.max(0, ENERGY_TICK_MS - (elapsed % ENERGY_TICK_MS));
  const seconds = Math.ceil(remaining / 1000);
  return `${String(Math.floor(seconds / 60)).padStart(2, '0')}:${String(seconds % 60).padStart(2, '0')}`;
}

/* Retired legacy restoration HUD and navigation renderers.
function restorationHudMarkupLegacy(locationId = '') {
  const xpPercent = Math.min(100, state.xp / Math.max(1, xpForNextLevel()) * 100);
  if (locationId === 'cafe') {
    return `<section class="restoration-hud cafe-game-hud" aria-label="Player status">
      <button class="cafe-level-badge" type="button" data-repair-utility="goals" aria-label="Player level ${state.playerLevel}, open goals"><img src="${CHARS.iris.img}" alt=""><b>${state.playerLevel}</b><i>★</i></button>
      <div class="cafe-resource-row" aria-label="Harbor resources">
        <button class="cafe-resource-pill energy-pill" type="button" data-repair-utility="goals" aria-label="${state.energy} of ${maxEnergy()} energy. Open daily goals"><span>⚡</span><b data-repair-energy-value>${state.energy}</b><i>＋</i><small data-energy-countdown>${restorationEnergyCountdown()}</small></button>
        <button class="cafe-resource-pill coin-pill" type="button" data-restoration-return aria-label="${state.coins} coins. Return to the town board"><span>🪙</span><b>${state.coins}</b></button>
        <button class="cafe-resource-pill gem-pill" type="button" data-repair-utility="more" aria-label="${state.pearls} pearls. Open harbor menu"><span>💎</span><b>${state.pearls}</b><i>＋</i></button>
        <span class="cafe-star-count" aria-label="${state.stars} story stars">⭐ ${state.stars}</span>
      </div>
      <button class="cafe-cart-button" type="button" data-repair-utility="more" aria-label="Open harbor shop and menu"><span aria-hidden="true">🛒</span></button>
      <div class="cafe-top-utilities"><button type="button" data-repair-utility="journal" aria-label="Open story journal">✉️</button><button type="button" data-repair-utility="more" aria-label="Open settings and more">⚙️</button><button type="button" class="cafe-sound-toggle" data-repair-utility="sound" aria-label="${muted ? 'Turn sound on' : 'Turn sound off'}"><span>${muted ? '🔇' : '🔊'}</span></button></div>
      <aside class="cafe-event-rail" aria-label="Harbor events">
        <button type="button" data-repair-utility="goals" aria-label="Daily harbor goals"><span>🥐</span><small>GOALS</small></button>
        <button type="button" data-repair-utility="journal" aria-label="Open harbor story"><span>🏆</span><small>STORY</small></button>
        <button type="button" data-repair-utility="event" aria-label="Open picnic bonus board, no timer"><span>🎁</span><small>PICNIC</small></button>
      </aside>
    </section>`;
  }
  return `<section class="restoration-hud" aria-label="Player status">
    <div class="restoration-hud-top">
      <div class="restoration-level" aria-label="Level ${state.playerLevel}, ${state.xp} of ${xpForNextLevel()} experience"><img src="${CHARS.iris.img}" alt=""><span><b>LV ${state.playerLevel}</b><small>${state.xp}/${xpForNextLevel()} XP</small><i><b style="width:${xpPercent}%"></b></i></span></div>
      <div class="restoration-resources" aria-label="Harbor resources">
        <div class="repair-resource repair-energy" aria-label="${state.energy} of ${maxEnergy()} energy. ${restorationEnergyCountdown() === 'FULL' ? 'Energy is full' : `Next energy in ${restorationEnergyCountdown()}`}"><span>⚡</span><b data-repair-energy-value>${state.energy}/${maxEnergy()}</b><small data-energy-countdown>${restorationEnergyCountdown()}</small></div>
        <div class="repair-resource repair-coins" aria-label="${state.coins} coins"><span>🪙</span><b>${state.coins}</b></div>
        <div class="repair-resource repair-stars" aria-label="${state.stars} stars"><span>⭐</span><b>${state.stars}</b></div>
        <div class="repair-resource repair-gems" aria-label="${state.pearls} pearls"><span>💎</span><b>${state.pearls}</b></div>
      </div>
    </div>
    <div class="restoration-tools" aria-label="Game utilities">
      <button type="button" data-repair-utility="inventory" aria-label="Open inventory"><span>🧺</span><small>Items</small></button>
      <button type="button" data-repair-utility="goals" aria-label="Open daily goals"><span>🧭</span><small>Goals</small></button>
      <button type="button" data-repair-utility="journal" aria-label="Open story journal"><span>✉️</span><small>Mail</small></button>
      <button type="button" class="repair-sound-toggle" data-repair-utility="sound" aria-label="${muted ? 'Turn sound on' : 'Turn sound off'}"><span>${muted ? '🔇' : '🔊'}</span><small>Sound</small></button>
      <button type="button" class="restoration-cart-link" data-repair-utility="more" aria-label="Open harbor shop and settings"><span>🛒</span><small>Shop</small></button>
      <button type="button" class="restoration-event-link" data-repair-utility="event" aria-label="Open the optional picnic event, ${state.eventPoints} points, no timer"><span>🏖️</span><b>Picnic<small>${state.eventPoints} pts · no timer</small></b><i>›</i></button>
    </div>
  </section>`;
}

function restorationNavMarkupLegacy(locationId = '') {
  if (locationId === 'cafe') {
    return `<nav class="restoration-nav cafe-corner-nav" aria-label="Game navigation">
      <button type="button" data-repair-utility="inventory" aria-label="Open inventory"><span>📘</span><small>Items</small></button>
      <button type="button" data-restoration-nav="journal" aria-label="Open story journal"><span>📖</span><small>Journal</small></button>
      <button type="button" data-restoration-nav="repairs" class="active" aria-current="page" aria-label="Repair tools"><img src="assets/harbor-power-tool-button.webp" alt=""><small>Repair</small></button>
    </nav>`;
  }
  return `<nav class="restoration-nav" aria-label="Game navigation">
    <button type="button" data-restoration-nav="town"><span>🏘️</span><small>Town</small></button>
    <button type="button" data-restoration-nav="repairs" class="active" aria-current="page"><span>🛠️</span><small>Repair</small></button>
    <button type="button" data-restoration-nav="picnic"><span>🏖️</span><small>Event</small></button>
    <button type="button" data-restoration-nav="journal"><span>📖</span><small>Journal</small></button>
    <button type="button" data-restoration-nav="more"><span>☰</span><small>More</small></button>
  </nav>`;
}

*/

function restorationHudMarkup(location) {
  const xpPercent = Math.min(100, state.xp / Math.max(1, xpForNextLevel()) * 100);
  const completed = Math.min(location?.decos.length || 0, Math.max(0, Number(state.levels[location?.id]) || 0));
  const total = Math.max(1, location?.decos.length || 1);
  const percent = Math.round(completed / total * 100);
  return `<section class="restoration-hud" aria-label="Player status"><div class="restoration-hud-top">
    <div class="restoration-level" aria-label="Level ${state.playerLevel}, ${state.xp} of ${xpForNextLevel()} experience"><b>${state.playerLevel}</b><i><b style="width:${xpPercent}%"></b></i></div>
    <div class="restoration-resources" aria-label="Harbor resources"><div class="repair-resource repair-energy" aria-label="${state.energy} of ${maxEnergy()} energy"><span>⚡</span><b data-repair-energy-value>${state.energy}</b></div><div class="repair-resource repair-coins" aria-label="${state.coins} coins"><span>🪙</span><b>${state.coins}</b></div><div class="repair-resource repair-stars" aria-label="${state.stars} stars"><span>⭐</span><b>${state.stars}</b></div><div class="repair-resource repair-gems" aria-label="${state.pearls} gems"><span>💎</span><b>${state.pearls}</b></div></div>
  </div><div class="restoration-hud-utilities" aria-label="Harbor shortcuts"><button type="button" data-repair-utility="journal" aria-label="Open mail and story journal">✉️</button><button type="button" data-repair-utility="more" aria-label="Open settings and more">⚙️</button></div></section>
  <button class="restoration-story-progress" type="button" data-repair-story aria-label="${location?.icon || '⚓'} ${location?.name || 'Location'}, ${percent}% restored, open chapter and step details"><span><b>${location?.icon || '⚓'} ${percent}%</b><small>${completed}/${total}</small></span><i><b style="width:${percent}%"></b></i></button>
  <div class="repair-subcontrols"><button class="restoration-back" type="button" data-restoration-return aria-label="Back to Town">‹</button><div class="restoration-hud-utilities"><button type="button" class="repair-sound-toggle" data-repair-utility="sound" aria-label="${muted ? 'Turn sound on' : 'Turn sound off'}"><span>${muted ? '🔇' : '🔊'}</span></button></div></div>`;
}

function restorationNavMarkup() {
  return `<nav class="restoration-nav" aria-label="Game navigation"><button type="button" data-restoration-nav="town"><span>🏘️</span><small>Town</small></button><button type="button" data-restoration-nav="repairs" class="active" aria-current="page"><span>🛠️</span><small>Repair</small></button><button type="button" data-restoration-nav="picnic"><span>🏖️</span><small>Picnic</small></button><button type="button" data-restoration-nav="journal"><span>📖</span><small>Journal</small></button><button type="button" data-restoration-nav="more"><span>☰</span><small>More</small></button></nav>`;
}

const PLATE_DEBUG = new URLSearchParams(location.search).get('debug') === 'plates';
const measuredRepairRegions = new Map();
const reportedPlateErrors = new Set();

function restorationCastMarkup(locationId, level) {
  return restorationCastFor(locationId, level).map(actor => {
    const sort = Math.round(actor.feetY * 10000);
    const label = actor.id[0].toUpperCase() + actor.id.slice(1);
    return `<button class="repair-stage-actor" type="button" data-repair-actor="${actor.id}" style="--actor-x:${actor.x * 100}%;--actor-feet:${actor.feetY * 100}%;--actor-height:${actor.heightScale * 100}%;--actor-sort:${sort}" aria-label="${label}, tap to hear them"><i aria-hidden="true"></i><img src="${actor.src}" alt=""><span class="repair-actor-speech" aria-live="polite"></span></button>`;
  }).join('');
}

function repairDesignArtMarkup(locationId, level, option) {
  const plate = getPlate(locationId, level);
  const frame = plate.frame;
  const imageStyle = frame
    ? `left:${(-frame.x / frame.w * 100).toFixed(4)}%;top:${(-frame.y / frame.h * 100).toFixed(4)}%;width:${(frame.atlasWidth / frame.w * 100).toFixed(4)}%;height:${(frame.atlasHeight / frame.h * 100).toFixed(4)}%`
    : 'left:0;top:0;width:100%;height:100%';
  return `<span class="repair-choice-crop" style="--choice-color:${option?.color || '#e5b66b'}"><img class="repair-choice-plate" src="${plate.src}" style="${imageStyle}" alt=""><i aria-hidden="true"></i></span>`;
}

function repairRegion(locationId, level) {
  return measuredRepairRegions.get(`${locationId}:${level}`) || REGIONS[locationId]?.[level - 1] || {x:.38,y:.32,w:.24,h:.18};
}

function platePixels(plate) {
  return new Promise((resolve,reject) => {
    const image = new Image();
    image.onload = () => {
      const frame = plate.frame || {x:0,y:0,w:image.naturalWidth,h:image.naturalHeight};
      const canvas = document.createElement('canvas');
      canvas.width = frame.w;
      canvas.height = frame.h;
      const context = canvas.getContext('2d',{willReadFrequently:true});
      if (!context) return reject(new Error('Canvas is unavailable for plate comparison.'));
      context.drawImage(image,frame.x,frame.y,frame.w,frame.h,0,0,frame.w,frame.h);
      resolve({width:frame.w,height:frame.h,pixels:context.getImageData(0,0,frame.w,frame.h).data});
    };
    image.onerror = () => reject(new Error(`Could not load ${plate.src}`));
    image.src = plate.src;
  });
}

async function measurePlateRegion(locationId, level, drawBox) {
  const beforePlate = getPlate(locationId,level - 1);
  const afterPlate = getPlate(locationId,level);
  try {
    const [before,after] = await Promise.all([platePixels(beforePlate),platePixels(afterPlate)]);
    const width = Math.min(before.width,after.width);
    const height = Math.min(before.height,after.height);
    let minX = width, minY = height, maxX = -1, maxY = -1, total = 0, insideTotal = 0, insideCount = 0, outsideTotal = 0, outsideCount = 0;
    const changed = new Uint8Array(width * height);
    for (let y = 0; y < height; y += 1) for (let x = 0; x < width; x += 1) {
      const index = (y * before.width + x) * 4;
      const diff = (Math.abs(before.pixels[index] - after.pixels[(y * after.width + x) * 4]) + Math.abs(before.pixels[index + 1] - after.pixels[(y * after.width + x) * 4 + 1]) + Math.abs(before.pixels[index + 2] - after.pixels[(y * after.width + x) * 4 + 2])) / 3;
      total += diff;
      if (diff > 28) {
        changed[y * width + x] = 1;
        minX = Math.min(minX,x); minY = Math.min(minY,y); maxX = Math.max(maxX,x); maxY = Math.max(maxY,y);
      }
    }
    if (maxX < 0) {
      console.error(`[Harbor Whispers] Plate ${locationId}:${level} did not change between steps.`);
      return null;
    }
    for (let y = 0; y < height; y += 1) for (let x = 0; x < width; x += 1) {
      const index = (y * before.width + x) * 4;
      const diff = (Math.abs(before.pixels[index] - after.pixels[(y * after.width + x) * 4]) + Math.abs(before.pixels[index + 1] - after.pixels[(y * after.width + x) * 4 + 1]) + Math.abs(before.pixels[index + 2] - after.pixels[(y * after.width + x) * 4 + 2])) / 3;
      if (x >= minX && x <= maxX && y >= minY && y <= maxY) { insideTotal += diff; insideCount += 1; }
      else { outsideTotal += diff; outsideCount += 1; }
    }
    const region = {x:minX / width,y:minY / height,w:(maxX - minX + 1) / width,h:(maxY - minY + 1) / height};
    const insideMean = insideTotal / Math.max(1,insideCount);
    const outsideMean = outsideTotal / Math.max(1,outsideCount);
    console.info(`[Plate debug] ${locationId}:${level}`,{changedBox:region,insideMean:+insideMean.toFixed(2),outsideMean:+outsideMean.toFixed(2),overallMean:+(total / (width * height)).toFixed(2)});
    if (insideMean < 2) console.error(`[Harbor Whispers] Plate ${locationId}:${level} has almost no difference inside its repair box.`);
    if (outsideMean > 12) console.error(`[Harbor Whispers] Plate ${locationId}:${level} changes substantially outside its repair box (mean ${outsideMean.toFixed(1)}).`);
    measuredRepairRegions.set(`${locationId}:${level}`,region);
    drawBox?.(region,insideMean,outsideMean);
    return region;
  } catch (error) {
    console.error(`[Harbor Whispers] Plate debug failed for ${locationId}:${level}.`,error);
    return null;
  }
}

function showRepairProgressModal(location, activeLevel, exitToBoard) {
  if (!location) return;
  const completed = Math.min(location.decos.length, Math.max(0, Number(state.levels[location.id]) || 0));
  const chapterIndex = Math.max(0, Math.min(CHAPTERS.length - 1, Number(state.chapter) || 0));
  const chapterNumber = Math.min(CHAPTERS.length, chapterIndex + 1);
  const chapter = CHAPTERS[chapterIndex];
  const modal = showModal(`<div class="repair-story-sheet"><header><small>CHAPTER ${chapterNumber} · ${location.name.toUpperCase()}</small><button class="repair-sheet-close" type="button" aria-label="Close">×</button></header><h2>${chapter.title}</h2><p>${chapter.lines?.[0]?.[1] || 'The harbor story is still unfolding.'}</p><div class="repair-story-location"><span>${location.icon}</span><b>${location.name}</b><strong>${completed}/${location.decos.length}</strong></div><div class="repair-story-track"><i style="width:${Math.round(completed / location.decos.length * 100)}%"></i></div><small class="repair-story-caption">${completed >= location.decos.length ? 'Location restored' : `Step ${Math.max(1, Number(activeLevel) || completed + 1)} of ${location.decos.length} · next improvement`}</small><button class="btn primary repair-story-open" type="button">Open Journal</button></div>`, root => {
    root.classList.add('repair-story-modal');
    root.style.zIndex = '120';
    root.querySelector('.repair-sheet-close').onclick = () => root.remove();
    root.querySelector('.repair-story-open').onclick = () => { root.remove(); exitToBoard?.('main'); showStory(); };
  });
  return modal;
}

function bindRestorationChrome(overlay, exitToBoard) {
  overlay.querySelectorAll('[data-restoration-return]').forEach(button => {
    button.addEventListener('click', () => exitToBoard('main'));
  });
  overlay.querySelector('[data-repair-story]')?.addEventListener('click', () => {
    const world = overlay.querySelector('.restoration-world');
    const location = LOCATIONS.find(entry => entry.id === world?.dataset.location);
    const level = Number(world?.dataset.repairLevel) || (location ? (Number(state.levels[location.id]) || 0) + 1 : 1);
    showRepairProgressModal(location, level, exitToBoard);
  });

  overlay.querySelectorAll('[data-restoration-nav], [data-repair-utility]').forEach(button => {
    button.addEventListener('click', () => {
      const destination = button.dataset.restorationNav || button.dataset.repairUtility;
      if (destination === 'sound') {
        muted = !muted;
        try { localStorage.setItem('harbor-whispers-muted', String(muted)); } catch (error) { /* Sound still changes for this session. */ }
        if (muted) music.pause();
        else unlockAudio();
        const icon = button.querySelector('span');
        if (icon) icon.textContent = muted ? '🔇' : '🔊';
        button.setAttribute('aria-label', muted ? 'Turn sound on' : 'Turn sound off');
        return;
      }
      if (destination === 'repairs') return;
      if (destination === 'town') { exitToBoard('main'); return; }
      if (destination === 'picnic' || destination === 'event') { exitToBoard('event'); return; }
      exitToBoard('main');
      if (destination === 'journal') showStory();
      else if (destination === 'more') showMoreMenu();
      else if (destination === 'inventory') showCollection('inventory');
      else if (destination === 'goals') showProgress('daily');
    });
  });
}

function showRestorationMoment(location, level, resume = false) {
  if (!location || !RESTORATION_STAGES[location.id]?.[level - 1]) return;
  saveState();
  const stage = RESTORATION_STAGES[location.id][level - 1];
  const film = RESTORATION_FILMS[location.film] || RESTORATION_FILMS.cafe;
  const design = RESTORATION_DESIGNS[location.id]?.[level] || null;
  const art = restorationArt(location, level);
  const savedPending = resume && state.pendingRestoration?.locationId === location.id && state.pendingRestoration.level === level
    ? state.pendingRestoration
    : null;
  const cost = Math.max(0, Math.floor(Number(savedPending?.cost ?? upgradeCost(location)) || 0));
  const coinReward = Math.max(0, Math.floor(Number(savedPending?.coinReward) || 20 + level * 5));
  let phase = savedPending
    ? ['work','design','complete'].includes(savedPending.phase) ? savedPending.phase : 'complete'
    : 'objective';
  let selectedChoice = 0;
  let selectedSceneTarget = 0;
  let sceneTimer = 0;
  let hudTimer = 0;
  let speechTimer = 0;
  let speechHideTimer = 0;
  let cameraAnimationFrame = 0;
  let nextSpeechIndex = 0;
  let purchasePreviewOpen = false;
  let insufficient = false;
  let locationRestoredNotice = false;
  let repairLocked = phase !== 'objective';
  const savedStyle = design && (state.locationStyles?.[location.id]?.[design.key] || (design.key === 'floor' && state.cafeFloor !== 'honey' ? state.cafeFloor : ''));
  const pendingChoice = resume && state.pendingRestoration?.choiceId;
  const savedIndex = design?.choices.findIndex(choice => choice.id === (pendingChoice || savedStyle)) ?? -1;
  if (savedIndex >= 0) selectedChoice = savedIndex;

  const overlay = document.createElement('section');
  overlay.className = `restoration-scene-screen restoration-repair-screen ${location.id === 'cafe' ? 'restoration-cafe-screen' : 'restoration-portrait-screen'}`;
  overlay.setAttribute('role', 'dialog');
  overlay.setAttribute('aria-modal', 'true');
  overlay.setAttribute('aria-label', `${location.name} restoration scene`);
  document.body.appendChild(overlay);
  function returnToBoard(boardKey = 'main') {
    window.clearTimeout(sceneTimer);
    window.clearInterval(hudTimer);
    window.clearInterval(speechTimer);
    window.clearTimeout(speechHideTimer);
    if (cameraAnimationFrame) window.cancelAnimationFrame(cameraAnimationFrame);
    releaseCamera();
    const resumeQueuedStory = storyDialogsDeferred;
    storyDialogsDeferred = false;
    overlay.remove();
    currentBoardKey = boardKey;
    selectedIndex = -1;
    feedbackMessage = boardKey === 'event'
      ? 'Optional picnic board: merge seaside bites for bonus milestones. Your energy is shared; there is no timer.'
      : 'Back at the harbor board. Your next restoration is ready when you are.';
    saveState();
    render();
    if (resumeQueuedStory) openNextDialogue();
  }

  function selectedDesign() {
    return design?.choices[selectedChoice] || null;
  }

  function openRepairDetails() {
    if (phase !== 'objective') return;
    const detail = repairDetailState(location.id, level) || {};
    const canAfford = state.coins >= cost;
    const preview = overlay.querySelector('.repair-purchase-preview');
    const previewImage = preview?.querySelector('img');
    if (preview && previewImage) {
      const region = repairRegion(location.id,level);
      setPlateLayer(previewImage,sceneRevealPlate,`${location.name} repair preview`);
      preview.style.clipPath = `inset(${region.y * 100}% ${100 - (region.x + region.w) * 100}% ${100 - (region.y + region.h) * 100}% ${region.x * 100}%)`;
      purchasePreviewOpen = true;
      preview.hidden = false;
    }
    const modal = showModal(`<div class="repair-confirm-sheet"><header><small>${location.icon} ${location.name} · ${level}/${location.decos.length}</small><button class="repair-sheet-close" type="button" aria-label="Close repair details">×</button></header><h2>${stage[0]}</h2><p>${detail.beforeState || stage[1]}</p><div class="repair-confirm-rewards"><span>⭐ <b>+1</b></span><span>✦ <b>+20 XP</b></span></div><div class="repair-confirm-cost ${canAfford ? '' : 'short'}"><span>🪙</span><b>${cost}</b></div><button class="btn primary repair-confirm-action ${canAfford ? '' : 'earn-coins'}" type="button">${canAfford ? 'Repair' : 'Earn coins'}</button></div>`, root => {
      root.classList.add('repair-confirm-modal');
      root.style.zIndex = '120';
      const removePreview = () => {
        purchasePreviewOpen = false;
        if (preview) preview.hidden = true;
      };
      root.querySelector('.repair-sheet-close').onclick = () => { removePreview(); root.remove(); };
      root.addEventListener('pointerdown', event => { if (event.target === root) removePreview(); });
      root.querySelector('.repair-confirm-action').onclick = () => {
        removePreview();
        root.remove();
        if (canAfford) beginRestoration();
        else returnToBoard('main');
      };
    });
    return modal;
  }

  const CAMERA_WIDTH = 1000;
  const CAMERA_DEFAULT_HEIGHT = 1000 * 16 / 9;
  const camera = {
    zoom:0, min:0, max:0, x:0, y:0, planeHeight:CAMERA_DEFAULT_HEIGHT,
    initialized:false, lastViewWidth:0, lastViewHeight:0, lastPlaneHeight:CAMERA_DEFAULT_HEIGHT,
    pointers:new Map(), pan:null, pinch:null
  };
  function cameraLimits(world) {
    const scaledWidth = CAMERA_WIDTH * camera.zoom;
    const scaledHeight = camera.planeHeight * camera.zoom;
    return {
      minX:scaledWidth > world.clientWidth ? world.clientWidth - scaledWidth : (world.clientWidth - scaledWidth) / 2,
      maxX:scaledWidth > world.clientWidth ? 0 : (world.clientWidth - scaledWidth) / 2,
      minY:scaledHeight > world.clientHeight ? world.clientHeight - scaledHeight : (world.clientHeight - scaledHeight) / 2,
      maxY:scaledHeight > world.clientHeight ? 0 : (world.clientHeight - scaledHeight) / 2
    };
  }
  function applyCamera() {
    const world = overlay.querySelector('.restoration-world');
    const canvas = overlay.querySelector('.restoration-art-canvas');
    const beforeArt = overlay.querySelector('.restoration-world-before');
    if (!world || !canvas) return;
    const frame = beforeArt?.dataset.frameWidth && beforeArt?.dataset.frameHeight
      ? {width:Number(beforeArt.dataset.frameWidth),height:Number(beforeArt.dataset.frameHeight)}
      : beforeArt?.naturalWidth ? {width:beforeArt.naturalWidth,height:beforeArt.naturalHeight} : null;
    if (frame?.width && frame?.height) camera.planeHeight = CAMERA_WIDTH * frame.height / frame.width;
    const viewWidth = Math.max(1,world.clientWidth);
    const viewHeight = Math.max(1,world.clientHeight);
    const fitZoom = Math.max(viewWidth / CAMERA_WIDTH, viewHeight / camera.planeHeight) * (location.id === 'cafe' ? 1.16 : 1);
    const resized = camera.initialized && (viewWidth !== camera.lastViewWidth || viewHeight !== camera.lastViewHeight || Math.abs(camera.planeHeight - camera.lastPlaneHeight) > .5);
    if (!camera.initialized) {
      camera.zoom = fitZoom;
      camera.x = (viewWidth - CAMERA_WIDTH * camera.zoom) / 2;
      camera.y = location.id === 'cafe' ? 0 : (viewHeight - camera.planeHeight * camera.zoom) / 2;
      camera.initialized = true;
    } else if (resized) {
      const normalizedX = camera.lastViewWidth > 0 ? (camera.lastViewWidth / 2 - camera.x) / (CAMERA_WIDTH * camera.zoom) : .5;
      const normalizedY = camera.lastPlaneHeight > 0 ? (camera.lastViewHeight / 2 - camera.y) / (camera.lastPlaneHeight * camera.zoom) : .5;
      const relativeZoom = camera.min > 0 ? camera.zoom / camera.min : 1;
      camera.zoom = Math.max(fitZoom,Math.min(fitZoom * 2.5,fitZoom * relativeZoom));
      camera.x = viewWidth / 2 - normalizedX * CAMERA_WIDTH * camera.zoom;
      camera.y = viewHeight / 2 - normalizedY * camera.planeHeight * camera.zoom;
    } else {
      camera.zoom = Math.max(fitZoom,Math.min(fitZoom * 2.5,camera.zoom || fitZoom));
    }
    camera.min = fitZoom;
    camera.max = fitZoom * 2.5;
    camera.lastViewWidth = viewWidth;
    camera.lastViewHeight = viewHeight;
    camera.lastPlaneHeight = camera.planeHeight;
    const bounds = cameraLimits(world);
    camera.x = Math.max(bounds.minX,Math.min(bounds.maxX,camera.x));
    camera.y = Math.max(bounds.minY,Math.min(bounds.maxY,camera.y));
    canvas.style.setProperty('--camera-plane-height',`${camera.planeHeight}px`);
    canvas.style.setProperty('--camera-x',`${camera.x}px`);
    canvas.style.setProperty('--camera-y',`${camera.y}px`);
    canvas.style.setProperty('--camera-zoom',String(camera.zoom));
    canvas.style.setProperty('--camera-counter-zoom',String(1 / Math.max(.01,camera.zoom)));
  }
  function focusCameraOnHotspot(targetLevel = level) {
    const world = overlay.querySelector('.restoration-world');
    if (!world) return;
    const region = repairRegion(location.id,Math.max(1,Math.min(location.decos.length,targetLevel)));
    const artX = (region.x + region.w / 2) * CAMERA_WIDTH;
    const artY = (region.y + region.h / 2) * camera.planeHeight;
    camera.x = world.clientWidth / 2 - artX * camera.zoom;
    camera.y = world.clientHeight * (location.id === 'cafe' ? .52 : .5) - artY * camera.zoom;
    clampCamera(world);
    applyCamera();
  }
  function animateCameraTo(targetX,targetY,targetZoom = camera.zoom,duration = 520) {
    const world = overlay.querySelector('.restoration-world');
    if (!world) return;
    if (cameraAnimationFrame) window.cancelAnimationFrame(cameraAnimationFrame);
    const fromX = camera.x;
    const fromY = camera.y;
    const fromZoom = camera.zoom;
    camera.zoom = Math.max(camera.min,Math.min(camera.max,targetZoom));
    camera.x = targetX;
    camera.y = targetY;
    clampCamera(world);
    const endX = camera.x;
    const endY = camera.y;
    const endZoom = camera.zoom;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      applyCamera();
      cameraAnimationFrame = 0;
      return;
    }
    camera.x = fromX;
    camera.y = fromY;
    camera.zoom = fromZoom;
    const start = performance.now();
    const animate = now => {
      const ratio = Math.min(1,(now - start) / duration);
      const eased = 1 - Math.pow(1 - ratio,3);
      camera.x = fromX + (endX - fromX) * eased;
      camera.y = fromY + (endY - fromY) * eased;
      camera.zoom = fromZoom + (endZoom - fromZoom) * eased;
      applyCamera();
      if (ratio < 1 && overlay.isConnected) cameraAnimationFrame = window.requestAnimationFrame(animate);
      else cameraAnimationFrame = 0;
    };
    cameraAnimationFrame = window.requestAnimationFrame(animate);
  }
  function easeCameraToRegion(targetLevel) {
    const world = overlay.querySelector('.restoration-world');
    if (!world || targetLevel > location.decos.length) return;
    const region = repairRegion(location.id,targetLevel);
    const targetX = world.clientWidth / 2 - (region.x + region.w / 2) * CAMERA_WIDTH * camera.zoom;
    const targetY = world.clientHeight / 2 - (region.y + region.h / 2) * camera.planeHeight * camera.zoom;
    animateCameraTo(targetX,targetY,camera.zoom,560);
  }
  function easeCameraToFullPlate() {
    const world = overlay.querySelector('.restoration-world');
    if (!world) return;
    const targetZoom = camera.min || Math.max(world.clientWidth / CAMERA_WIDTH,world.clientHeight / camera.planeHeight);
    const targetX = (world.clientWidth - CAMERA_WIDTH * targetZoom) / 2;
    const targetY = location.id === 'cafe' ? 0 : (world.clientHeight - camera.planeHeight * targetZoom) / 2;
    animateCameraTo(targetX,targetY,targetZoom,680);
  }
  function showActorSpeech(actorId) {
    const actors = [...overlay.querySelectorAll('.repair-stage-actor')];
    if (!actors.length) return;
    const target = actors.find(actor => actor.dataset.repairActor === actorId) || actors[0];
    const lines = RESTORATION_DIALOGUE[location.id] || RESTORATION_DIALOGUE.cafe;
    const matchingLine = lines.find(line => line[0] === target.dataset.repairActor);
    const entry = matchingLine || lines[nextSpeechIndex % lines.length] || lines[0];
    nextSpeechIndex = (nextSpeechIndex + 1) % Math.max(1,lines.length);
    actors.forEach(actor => {
      actor.classList.remove('speaking');
      const bubble = actor.querySelector('.repair-actor-speech');
      if (bubble) bubble.textContent = '';
    });
    const bubble = target.querySelector('.repair-actor-speech');
    if (!bubble || !entry) return;
    bubble.textContent = `“${entry[1]}”`;
    target.classList.add('speaking');
    window.clearTimeout(speechHideTimer);
    speechHideTimer = window.setTimeout(() => target.classList.remove('speaking'),3200);
  }
  function cameraPoint(event, world) {
    const rect = world.getBoundingClientRect();
    return {x:event.clientX - rect.left, y:event.clientY - rect.top};
  }
  function distanceBetween(first, second) { return Math.hypot(first.x - second.x, first.y - second.y); }
  function clampCamera(world) {
    const bounds = cameraLimits(world);
    camera.x = Math.max(bounds.minX, Math.min(bounds.maxX, camera.x));
    camera.y = Math.max(bounds.minY, Math.min(bounds.maxY, camera.y));
  }
  function canPanAtCurrentZoom(world) {
    return CAMERA_WIDTH * camera.zoom > world.clientWidth + .5 || camera.planeHeight * camera.zoom > world.clientHeight + .5;
  }
  function cameraPointerDown(event) {
    if (event.target.closest('.repair-hotspot-marker, .repair-stage-actor, .restoration-nav, .restoration-hud, .repair-subcontrols, .restoration-topbar, .repair-design-dialog, .restoration-bottom, .restoration-story-progress')) return;
    if (event.pointerType === 'mouse' && event.button !== 0) return;
    const world = overlay.querySelector('.restoration-world');
    if (!world) return;
    world.setPointerCapture?.(event.pointerId);
    const point = cameraPoint(event,world);
    camera.pointers.set(event.pointerId,point);
    if (camera.pointers.size === 1) camera.pan = {point,start:point,x:camera.x,y:camera.y,moved:false};
    if (camera.pointers.size === 2) {
      const points = [...camera.pointers.values()];
      camera.pinch = {distance:Math.max(1,distanceBetween(points[0],points[1])),zoom:camera.zoom,x:camera.x,y:camera.y,midpointX:(points[0].x+points[1].x)/2,midpointY:(points[0].y+points[1].y)/2};
      camera.pan = null;
    }
  }
  function cameraPointerMove(event) {
    if (!camera.pointers.has(event.pointerId)) return;
    const world = overlay.querySelector('.restoration-world');
    if (!world) return;
    const point = cameraPoint(event,world);
    camera.pointers.set(event.pointerId,point);
    if (camera.pointers.size >= 2 && camera.pinch) {
      const points = [...camera.pointers.values()].slice(0,2);
      const midpointX = (points[0].x + points[1].x) / 2;
      const midpointY = (points[0].y + points[1].y) / 2;
      const pinchFactor = distanceBetween(points[0],points[1]) / camera.pinch.distance;
      const nextZoom = Math.max(camera.min,Math.min(camera.max,camera.pinch.zoom * pinchFactor));
      const anchorX = (camera.pinch.midpointX - camera.pinch.x) / camera.pinch.zoom;
      const anchorY = (camera.pinch.midpointY - camera.pinch.y) / camera.pinch.zoom;
      camera.zoom = nextZoom;
      camera.x = midpointX - anchorX * nextZoom;
      camera.y = midpointY - anchorY * nextZoom;
      event.preventDefault();
    } else if (camera.pan && canPanAtCurrentZoom(world)) {
      if (!camera.pan.moved && distanceBetween(point,camera.pan.start) < 8) return;
      camera.pan.moved = true;
      camera.x = camera.pan.x + point.x - camera.pan.point.x;
      camera.y = camera.pan.y + point.y - camera.pan.point.y;
      event.preventDefault();
    }
    clampCamera(world);
    applyCamera();
  }
  function cameraPointerUp(event) {
    camera.pointers.delete(event.pointerId);
    camera.pinch = null;
    camera.pan = camera.pointers.size === 1
      ? {point:[...camera.pointers.values()][0],start:[...camera.pointers.values()][0],x:camera.x,y:camera.y,moved:false}
      : null;
  }
  function cameraWheel(event) {
    const world = overlay.querySelector('.restoration-world');
    if (!world || event.target.closest('.restoration-nav, .restoration-hud, .repair-subcontrols, .restoration-topbar, .repair-design-dialog, .restoration-bottom')) return;
    event.preventDefault();
    const point = cameraPoint(event,world);
    const anchorX = (point.x - camera.x) / camera.zoom;
    const anchorY = (point.y - camera.y) / camera.zoom;
    camera.zoom = Math.max(camera.min,Math.min(camera.max,camera.zoom * (event.deltaY < 0 ? 1.12 : .89)));
    camera.x = point.x - anchorX * camera.zoom;
    camera.y = point.y - anchorY * camera.zoom;
    clampCamera(world);
    applyCamera();
  }
  const cameraResize = () => applyCamera();
  overlay.addEventListener('pointerdown', cameraPointerDown, {passive:false});
  overlay.addEventListener('pointermove', cameraPointerMove, {passive:false});
  overlay.addEventListener('pointerup', cameraPointerUp);
  overlay.addEventListener('pointercancel', cameraPointerUp);
  overlay.addEventListener('wheel', cameraWheel, {passive:false});
  window.addEventListener('resize', cameraResize);
  window.visualViewport?.addEventListener('resize', cameraResize);
  function releaseCamera() {
    window.removeEventListener('resize', cameraResize);
    window.visualViewport?.removeEventListener('resize', cameraResize);
    camera.pointers.clear();
    camera.pan = null;
    camera.pinch = null;
  }

  /* Retired single-frame renderer; the persistent plate renderer below owns repair scenes.
  function renderSceneLegacy() {
    if (!overlay.isConnected) return;
    window.clearInterval(hudTimer);
    const choice = selectedDesign();
    const baseStyle = choice || (location.id === 'cafe' ? getCafeFloor() : null);
    const designColor = baseStyle?.color || film.accent;
    const restoredLevel = Math.min(location.decos.length, Number(state.levels[location.id]) || 0);
    const progressPercent = Math.round(restoredLevel / location.decos.length * 100);
    const repairState = repairDetailState(location.id, level) || {};
    const designStylesByLevel = Object.fromEntries(Object.entries(RESTORATION_DESIGNS[location.id] || {}).map(([stageLevel, style]) => [
      Number(stageLevel), state.locationStyles?.[location.id]?.[style.key] || (style.key === 'floor' ? state.cafeFloor : '')
    ]));
    const bubbleMarkup = restorationHotspotsMarkup(location.id, level, 0, phase, cost);
    const castMarkup = restorationCastMarkup(location.id, level);
    const targetX = ((repairState.x + repairState.width / 2) / 576) * 100;
    const targetY = ((repairState.y + repairState.height / 2) / 1024) * 100;
    const isBeforePhase = phase === 'objective' || phase === 'work';
    const plateStep = isBeforePhase ? art.beforeFrame : art.afterFrame;
    const currentPlate = isBeforePhase ? art.before : art.after;
    const plateFrame = restorationPlateFrameSize(location.id, plateStep, currentPlate);
    const directPlateClass = location.id === 'cafe' && CAFE_DIRECT_PLATES[currentPlate] ? ' restoration-world-direct-plate' : '';
    const plateMarkup = `<img class="restoration-world-before restoration-world-plate${directPlateClass}" src="${currentPlate}" alt="${isBeforePhase ? art.beforeState : art.afterState || `Restored ${location.name} worksite`}" style="${restorationPlateImageStyle(location.id, plateStep, currentPlate)}" data-frame-width="${plateFrame.w}" data-frame-height="${plateFrame.h}" draggable="false">`;
    const floorStyle = location.id === 'cafe' && level === 4 && phase === 'design' ? selectedDesign() : getCafeFloor();
    const floorTintMarkup = location.id === 'cafe' ? cafeFloorTintMarkup(currentPlate, floorStyle) : '';
    const revealFrame = restorationPlateFrameSize(location.id, art.afterFrame, art.after);
    const revealAtlas = location.id === 'cafe' && CAFE_DIRECT_PLATES[art.after]
      ? {width:revealFrame.w,height:revealFrame.h}
      : restorationPlateAtlas(location.id);
    const maskX = ((revealFrame.x + targetX / 100 * revealFrame.w) / revealAtlas.width * 100).toFixed(3);
    const maskY = ((revealFrame.y + targetY / 100 * revealFrame.h) / revealAtlas.height * 100).toFixed(3);
    const revealRadius = Math.hypot(repairState.width, repairState.height) * .72 * (1620 / 576);
    const revealDirectClass = location.id === 'cafe' && CAFE_DIRECT_PLATES[art.after] ? ' restoration-world-direct-plate' : '';
    const revealMarkup = phase === 'work' ? `<img class="restoration-world-reveal${revealDirectClass}" src="${art.after}" alt="" style="${restorationPlateImageStyle(location.id, art.afterFrame, art.after)};--repair-mask-x:${maskX}%;--repair-mask-y:${maskY}%;--repair-mask-radius:${revealRadius.toFixed(1)}px" data-frame-width="${revealFrame.w}" data-frame-height="${revealFrame.h}" draggable="false">` : '';
    const workEffects = phase === 'work' ? `<div class="repair-action-fx" aria-hidden="true"><span>🔨</span><i>✦</i><i>✧</i><i>✦</i></div>` : '';
    const choiceCards = design ? design.choices.map((option,index) => `
      <button class="restoration-choice ${selectedChoice === index ? 'selected' : ''}" type="button" data-restoration-choice="${index}" aria-label="Preview ${option.name}: ${option.description}" aria-pressed="${selectedChoice === index}" style="--choice-color:${option.color}">
        <span class="restoration-choice-art">${repairDesignArtMarkup(location.id, level, option.id)}</span>
        <b>${option.name}</b><small>${option.description}</small>${selectedChoice === index ? '<em aria-hidden="true">✓</em>' : ''}
      </button>`).join('') : '';
    let content = '';
    if (phase === 'design') {
      content = `<div class="repair-design-dialog"><header><small>YOUR HARBOR · YOUR CHOICE</small><button class="repair-design-close" type="button" aria-label="Close design choices">×</button></header><h2>${design?.title || 'Choose a finish'}</h2><p>${design?.prompt || ''}</p><div class="restoration-choices" role="group" aria-label="Preview designs in the location">${choiceCards}</div><button class="btn primary restoration-confirm" type="button" data-restoration-confirm>Confirm ${choice?.name || 'this design'}</button></div>`;
    }
    const successToast = phase === 'complete' && (state.pendingRestoration?.committed || locationRestoredNotice)
      ? `<div class="repair-toast" role="status">${level >= location.decos.length ? 'Location restored' : 'Complete!'}</div>${state.pendingRestoration?.committed ? `<div class="repair-floating-reward" style="--repair-target-x:${targetX}%;--repair-target-y:${targetY}%" aria-hidden="true">+⭐ <b>+20 XP</b><i>✦</i><i>✧</i></div>` : ''}`
      : '';
    overlay.innerHTML = `<div class="restoration-shell repair-scene-shell" style="--repair-accent:${film.accent};--restoration-design-color:${designColor};--restoration-backdrop:url('${art.before}')">
      ${restorationHudMarkup(location)}
      <div class="restoration-world" data-phase="${phase}" data-location="${location.id}" data-repair-level="${level}" data-repair-mode="${repairState.mode || ''}" style="--repair-target-x:${targetX}%;--repair-target-y:${targetY}%" role="group" aria-label="${location.name} ${stage[0]} worksite">
        <div class="restoration-art-frame"><div class="restoration-art-canvas">
          ${plateMarkup}${revealMarkup}${floorTintMarkup}${castMarkup}${bubbleMarkup}${workEffects}${successToast}
        </div></div>
      </div>
      ${content ? `<main class="restoration-bottom">${content}</main>` : ''}
      ${restorationNavMarkup()}
    </div>`;
    applyCamera();
    const beforeImage = overlay.querySelector('.restoration-world-plate');
    const revealImage = overlay.querySelector('.restoration-world-reveal');
    [beforeImage, revealImage].filter(Boolean).forEach(image => {
      const handlePlateError = () => {
        console.error(`[Harbor Whispers] Failed to load restoration plate ${image.src}.`);
        if (image.classList.contains('restoration-world-reveal')) {
          image.remove();
          return;
        }
        const fallback = RESTORATION_FALLBACK_ART[location.id];
        if (fallback && image.dataset.fallbackAttempted !== 'true') {
          image.dataset.fallbackAttempted = 'true';
          image.classList.remove('restoration-world-plate');
          image.style.cssText = '';
          image.removeAttribute('data-frame-width');
          image.removeAttribute('data-frame-height');
          image.addEventListener('load', applyCamera, {once:true});
          image.src = fallback;
          return;
        }
        image.style.visibility = 'hidden';
      };
      image.addEventListener('error', handlePlateError);
      if (!image.complete) image.addEventListener('load', applyCamera, {once:true});
    });
    overlay.querySelector('[data-open-repair]')?.addEventListener('click', openRepairDetails);
    overlay.querySelectorAll('[data-restoration-choice]').forEach(button => button.onclick = () => {
      if (phase !== 'design' || !design) return;
      selectedChoice = Number(button.dataset.restorationChoice);
      if (state.pendingRestoration) state.pendingRestoration.choiceId = selectedDesign()?.id || '';
      saveState();
      renderScene();
    });
    overlay.querySelector('.repair-design-close')?.addEventListener('click', () => returnToBoard());
    overlay.querySelector('[data-restoration-confirm]')?.addEventListener('click', confirmDesign);
    bindRestorationChrome(overlay, returnToBoard);
    hudTimer = window.setInterval(() => {
      const energyValue = overlay.querySelector('[data-repair-energy-value]');
      const energyPill = overlay.querySelector('.repair-energy');
      if (!energyValue || !energyPill) return;
      energyValue.textContent = `${state.energy}`;
      energyPill.setAttribute('aria-label', `${state.energy} of ${maxEnergy()} energy`);
    }, 1000);
  }
  */

  let sceneInitialized = false;
  let sceneBasePlate = art.before;
  let sceneRevealPlate = art.after;
  let lastSceneCardMarkup = null;
  let normalizedScene = false;
  let sceneFxTimer = 0;

  function setPlateLayer(image, plate, altText = '') {
    if (!image || !plate) return;
    const key = plateKey(plate);
    if (image.dataset.plateKey !== key) {
      image.dataset.plateKey = key;
      image.style.left = plate.frame ? `${(-plate.frame.x / plate.frame.w) * 100}%` : '0%';
      image.style.top = plate.frame ? `${(-plate.frame.y / plate.frame.h) * 100}%` : '0%';
      image.style.width = plate.frame ? `${(plate.frame.atlasWidth / plate.frame.w) * 100}%` : '100%';
      image.style.height = plate.frame ? `${(plate.frame.atlasHeight / plate.frame.h) * 100}%` : '100%';
      image.dataset.frameWidth = String(plate.frame?.w || 0);
      image.dataset.frameHeight = String(plate.frame?.h || 0);
      if (image.getAttribute('src') !== plate.src) image.src = plate.src;
    }
    if (image.alt !== altText) image.alt = altText;
  }

  function samplePlateEdges(image, plate, world) {
    if (!image?.naturalWidth || !image?.naturalHeight) return;
    try {
      const frame = plate.frame || {x:0,y:0,w:image.naturalWidth,h:image.naturalHeight};
      const canvas = document.createElement('canvas');
      canvas.width = frame.w;
      canvas.height = frame.h;
      const context = canvas.getContext('2d',{willReadFrequently:true});
      if (!context) return;
      context.drawImage(image,frame.x,frame.y,frame.w,frame.h,0,0,frame.w,frame.h);
      const rows = [context.getImageData(0,0,frame.w,1).data,context.getImageData(0,frame.h - 1,frame.w,1).data];
      const sampleEdgeColor = (row,fallback) => {
        let r = 0, g = 0, b = 0, count = 0;
        for (let x = 0; x < frame.w; x += 4) {
          const index = x * 4;
          const alpha = row[index + 3];
          const red = row[index], green = row[index + 1], blue = row[index + 2];
          if (alpha < 32 || (red > 245 && green > 245 && blue > 245)) continue;
          r += red; g += green; b += blue; count += 1;
        }
        if (count < Math.max(4,Math.floor(frame.w / 24))) return fallback;
        return `rgb(${Math.round(r / count)},${Math.round(g / count)},${Math.round(b / count)})`;
      };
      const topColor = sampleEdgeColor(rows[0],'#b9dfe0');
      const bottomColor = sampleEdgeColor(rows[1],'#dfc79d');
      const edgeFill = `linear-gradient(180deg,${topColor},${bottomColor})`;
      world.style.background = edgeFill;
      world.querySelector('.restoration-art-canvas')?.style.setProperty('background',edgeFill);
    } catch (error) {
      // The plate remains usable if a browser disallows canvas sampling.
    }
  }

  function preloadNearbyPlates() {
    [level - 1,level,level + 1].filter(step => step >= 0 && step <= 8).forEach(step => {
      const plate = getPlate(location.id,step);
      const image = new Image();
      image.src = plate.src;
    });
  }

  function renderScene() {
    if (!overlay.isConnected) return;
    const choice = selectedDesign();
    const accent = choice?.color || (location.id === 'cafe' ? getCafeFloor().color : film.accent);
    const detail = repairDetailState(location.id,level) || {};
    const region = repairRegion(location.id,level);
    const centerX = region.x + region.w / 2;
    const centerY = region.y + region.h / 2;
    const plateErrorKey = `${location.id}:${level}`;
    if (art.before.src === art.after.src && (!art.before.frame || !art.after.frame || (art.before.frame.x === art.after.frame.x && art.before.frame.y === art.after.frame.y)) && !reportedPlateErrors.has(plateErrorKey)) {
      reportedPlateErrors.add(plateErrorKey);
      console.error(`[Harbor Whispers] Repair plate ${location.id}:${level} resolves to the same image frame before and after.`);
    }

    if (!sceneInitialized) {
      overlay.innerHTML = `<div class="restoration-shell repair-scene-shell" style="--repair-accent:${film.accent};--restoration-design-color:${accent}">
        ${restorationHudMarkup(location)}
        <div class="restoration-world" data-location="${location.id}" data-repair-level="${level}" role="group" aria-label="${location.name} ${stage[0]} worksite">
          <div class="restoration-art-frame"><div class="restoration-art-canvas">
            <img class="restoration-world-before" alt="${art.beforeState || `${location.name} before restoration`}" draggable="false">
            <div class="restoration-plate-reveal" aria-hidden="true"><img class="restoration-world-after" alt="" draggable="false"></div>
            <div class="repair-purchase-preview" aria-hidden="true" hidden><img class="repair-purchase-preview-image" alt="" draggable="false"></div>
            <div class="repair-stage-actors" aria-label="Harbor crew">${restorationCastMarkup(location.id,level)}</div>
            <div class="restoration-ambient" aria-hidden="true"></div>
            <div class="repair-scene-effects" aria-hidden="true"><div class="repair-action-fx"><span class="repair-action-tool">${detail.tool || '🔨'}</span><i>✦</i><i>✧</i><i>✦</i></div><div class="repair-sparkle-burst">✦　✧　✦</div></div>
            <div class="restoration-hotspot-layer"><button class="repair-hotspot-marker" type="button" data-open-repair><span class="repair-hotspot-ring" aria-hidden="true"></span><span class="repair-cost-bubble"><span class="repair-bubble-tool" aria-hidden="true">${detail.tool || '🔨'}</span><span class="repair-bubble-coin" aria-hidden="true">🪙</span><b>${cost}</b><i aria-hidden="true"></i></span></button></div>
            <div class="repair-floating-reward" aria-hidden="true" hidden>+⭐ <b>+20 XP</b><i>✦</i><i>✧</i></div>
            <div class="repair-toast" role="status" hidden>Complete!</div>
            <div class="plate-debug-box" aria-hidden="true" hidden></div>
          </div></div>
        </div>
        ${restorationNavMarkup()}
      </div>`;
      sceneInitialized = true;
      const beforeImage = overlay.querySelector('.restoration-world-before');
      const afterImage = overlay.querySelector('.restoration-world-after');
      const world = overlay.querySelector('.restoration-world');
      const onPlateLoad = event => {
        applyCamera();
        if (event.currentTarget === beforeImage) samplePlateEdges(beforeImage,sceneBasePlate,world);
      };
      [beforeImage,afterImage].forEach(image => {
        image.addEventListener('load',onPlateLoad);
        image.addEventListener('error',() => {
          console.error(`[Harbor Whispers] Failed to load restoration plate ${image.getAttribute('src') || 'unknown'}.`);
          image.closest('.repair-stage-actor')?.remove();
        });
      });
      overlay.querySelectorAll('.repair-stage-actor img').forEach(image => image.addEventListener('error',() => {
        const actor = image.closest('.repair-stage-actor');
        console.error(`[Harbor Whispers] Missing restoration sprite ${image.getAttribute('src') || 'unknown'}; actor skipped.`);
        actor?.remove();
      },{once:true}));
      overlay.querySelectorAll('.repair-stage-actor').forEach(actor => actor.addEventListener('click',() => showActorSpeech(actor.dataset.repairActor)));
      if (!speechTimer) speechTimer = window.setInterval(() => {
        if (!overlay.isConnected || phase === 'design' || purchasePreviewOpen || Math.random() < .28) return;
        const actors = [...overlay.querySelectorAll('.repair-stage-actor')];
        if (actors.length) showActorSpeech(actors[Math.floor(Math.random() * actors.length)].dataset.repairActor);
      },9500);
      overlay.querySelector('[data-open-repair]')?.addEventListener('click',openRepairDetails);
      bindRestorationChrome(overlay,returnToBoard);
      preloadNearbyPlates();
      if (PLATE_DEBUG) {
        const debugBox = overlay.querySelector('.plate-debug-box');
        measurePlateRegion(location.id,level,(measured,insideMean,outsideMean) => {
          if (!overlay.isConnected || !measured || !debugBox?.isConnected) return;
          debugBox.hidden = false;
          debugBox.style.left = `${measured.x * 100}%`;
          debugBox.style.top = `${measured.y * 100}%`;
          debugBox.style.width = `${measured.w * 100}%`;
          debugBox.style.height = `${measured.h * 100}%`;
          debugBox.textContent = `Δ ${insideMean.toFixed(1)} / ${outsideMean.toFixed(1)}`;
          renderScene();
        });
      }
    }

    const world = overlay.querySelector('.restoration-world');
    const canvas = overlay.querySelector('.restoration-art-canvas');
    const beforeImage = overlay.querySelector('.restoration-world-before');
    const afterImage = overlay.querySelector('.restoration-world-after');
    const revealMask = overlay.querySelector('.restoration-plate-reveal');
    const hotspot = overlay.querySelector('.repair-hotspot-marker');
    const bubble = overlay.querySelector('.repair-cost-bubble');
    const effects = overlay.querySelector('.repair-scene-effects');
    const reward = overlay.querySelector('.repair-floating-reward');
    const toast = overlay.querySelector('.repair-toast');
    const baseAlt = phase === 'complete' ? art.afterState || `Restored ${location.name}` : art.beforeState || `${location.name} before restoration`;
    setPlateLayer(beforeImage,sceneBasePlate,baseAlt);
    setPlateLayer(afterImage,sceneRevealPlate,'');
    world.dataset.phase = phase;
    world.dataset.repairMode = detail.mode || '';
    world.setAttribute('aria-label',`${location.name} ${stage[0]} worksite`);
    world.style.setProperty('--repair-target-x',`${centerX * 100}%`);
    world.style.setProperty('--repair-target-y',`${centerY * 100}%`);
    world.style.setProperty('--region-width',`${region.w * 100}%`);
    world.style.setProperty('--region-height',`${region.h * 100}%`);
    canvas.style.setProperty('--repair-mask-x',`${centerX * 100}%`);
    canvas.style.setProperty('--repair-mask-y',`${centerY * 100}%`);
    canvas.style.setProperty('--repair-mask-radius','160%');
    revealMask?.style.setProperty('--repair-mask-x',`${centerX * 100}%`);
    revealMask?.style.setProperty('--repair-mask-y',`${centerY * 100}%`);
    revealMask?.style.setProperty('--repair-mask-radius','160%');
    canvas.style.setProperty('--repair-accent',film.accent);
    overlay.querySelector('.restoration-shell')?.style.setProperty('--restoration-design-color',accent);
    const completed = Math.min(location.decos.length,Math.max(0,Number(state.levels[location.id]) || 0));
    const progressPercent = Math.round(completed / Math.max(1,location.decos.length) * 100);
    const progressChip = overlay.querySelector('.restoration-story-progress');
    if (progressChip) {
      const progressLabel = progressChip.querySelector('span b');
      const progressCount = progressChip.querySelector('span small');
      const progressFill = progressChip.querySelector('i b');
      if (progressLabel) progressLabel.textContent = `${location.icon} ${progressPercent}%`;
      if (progressCount) progressCount.textContent = `${completed}/${location.decos.length}`;
      if (progressFill) progressFill.style.width = `${progressPercent}%`;
      progressChip.setAttribute('aria-label',`${location.name}, ${progressPercent}% restored, open chapter and step details`);
    }
    const unaffordable = state.coins < cost;
    hotspot.classList.toggle('unaffordable',unaffordable);
    bubble.classList.toggle('unaffordable',unaffordable);
    hotspot.disabled = phase !== 'objective';
    hotspot.hidden = phase !== 'objective';
    hotspot.style.setProperty('--repair-hit-x',`${centerX * 100}%`);
    hotspot.style.setProperty('--repair-hit-y',`${centerY * 100}%`);
    hotspot.style.setProperty('--repair-hit-width',`${region.w * 100}%`);
    hotspot.style.setProperty('--repair-hit-height',`${region.h * 100}%`);
    hotspot.setAttribute('aria-label',`${detail.repairItem || stage[0]}, repair cost ${cost} coins${unaffordable ? ', not enough coins' : ''}`);
    const tool = detail.tool || '🔨';
    const bubbleTool = hotspot.querySelector('.repair-bubble-tool');
    if (bubbleTool) bubbleTool.textContent = tool;
    const costValue = hotspot.querySelector('.repair-cost-bubble b');
    if (costValue) costValue.textContent = String(cost);
    const actionTool = overlay.querySelector('.repair-action-tool');
    if (actionTool) actionTool.textContent = tool;
    effects.classList.toggle('is-working',phase === 'work');
    effects.classList.toggle('is-celebrating',phase === 'complete');
    effects.style.left = `${centerX * 100}%`;
    effects.style.top = `${centerY * 100}%`;
    const committed = Boolean(state.pendingRestoration?.committed || locationRestoredNotice);
    const locationComplete = level >= location.decos.length && phase === 'complete' && committed;
    world.classList.toggle('final-location-complete',locationComplete);
    if (toast) {
      toast.hidden = phase !== 'complete' || !committed;
      toast.textContent = locationComplete ? `${location.icon} ${location.name} restored!` : 'Complete!';
      toast.classList.toggle('location-complete',locationComplete);
    }
    reward.hidden = phase !== 'complete' || !committed;
    reward.style.left = `${centerX * 100}%`;
    reward.style.top = `${centerY * 100}%`;
    const xpValue = reward.querySelector('b');
    if (xpValue) xpValue.textContent = '+20 XP';

    const choiceCards = design ? design.choices.map((option,index) => `
      <button class="restoration-choice ${selectedChoice === index ? 'selected' : ''}" type="button" data-restoration-choice="${index}" aria-label="Preview ${option.name}: ${option.description}" aria-pressed="${selectedChoice === index}" style="--choice-color:${option.color}">
        <span class="restoration-choice-art">${repairDesignArtMarkup(location.id,level,option)}</span>
        <b>${option.name}</b><small>${option.description}</small>${selectedChoice === index ? '<em aria-hidden="true">✓</em>' : ''}
      </button>`).join('') : '';
    const content = phase === 'design'
      ? `<div class="repair-design-dialog"><header><small>YOUR HARBOR · YOUR CHOICE</small><button class="repair-design-close" type="button" aria-label="Close design choices">×</button></header><h2>${design?.title || 'Choose a finish'}</h2><p>${design?.prompt || ''}</p><div class="restoration-choices" role="group" aria-label="Choose a saved design">${choiceCards}</div><button class="btn primary restoration-confirm" type="button" data-restoration-confirm>Confirm ${choice?.name || 'this design'}</button></div>`
      : '';
    let bottom = overlay.querySelector('.restoration-bottom');
    if (!content) {
      bottom?.remove();
      lastSceneCardMarkup = null;
    } else {
      if (!bottom) {
        overlay.querySelector('.restoration-nav')?.insertAdjacentHTML('beforebegin','<main class="restoration-bottom"><section class="restoration-card"></section></main>');
        bottom = overlay.querySelector('.restoration-bottom');
      }
      const card = bottom?.querySelector('.restoration-card');
      if (card && content !== lastSceneCardMarkup) {
        lastSceneCardMarkup = content;
        card.innerHTML = content;
        card.querySelectorAll('[data-restoration-choice]').forEach(button => button.addEventListener('click',() => {
          if (phase !== 'design' || !design) return;
          selectedChoice = Number(button.dataset.restorationChoice);
          if (state.pendingRestoration) state.pendingRestoration.choiceId = selectedDesign()?.id || '';
          saveState();
          renderScene();
        }));
        card.querySelector('.repair-design-close')?.addEventListener('click',() => returnToBoard());
        card.querySelector('[data-restoration-confirm]')?.addEventListener('click',confirmDesign);
      }
    }
    const energyValue = overlay.querySelector('[data-repair-energy-value]');
    if (energyValue) energyValue.textContent = `${state.energy}`;
    if (overlay.querySelector('.repair-energy')) overlay.querySelector('.repair-energy').setAttribute('aria-label',`${state.energy} of ${maxEnergy()} energy`);
    const coinValue = overlay.querySelector('.repair-coins b');
    if (coinValue) coinValue.textContent = String(state.coins);
    const starValue = overlay.querySelector('.repair-stars b');
    if (starValue) starValue.textContent = String(state.stars);
    const gemValue = overlay.querySelector('.repair-gems b');
    if (gemValue) gemValue.textContent = String(state.pearls);
    applyCamera();
    if (!hudTimer) hudTimer = window.setInterval(() => {
      const value = overlay.querySelector('[data-repair-energy-value]');
      if (value) value.textContent = `${state.energy}`;
      const pill = overlay.querySelector('.repair-energy');
      pill?.setAttribute('aria-label',`${state.energy} of ${maxEnergy()} energy`);
    },1000);
  }

  function beginRestoration() {
    if (repairLocked || state.pendingRestoration || phase !== 'objective') return;
    const currentLevel = Math.max(0, Math.floor(Number(state.levels[location.id]) || 0));
    const receiptKey = `${location.id}:${level}`;
    const safeCost = Math.max(0, Math.floor(Number(cost) || 0));
    if (level !== currentLevel + 1 || level > location.decos.length || !isLocationUnlocked(location) || nextRestorationGoal()?.id !== location.id || state.restorationLedger?.[receiptKey]) {
      feedbackMessage = 'This restoration is no longer the next available harbor improvement.';
      returnToBoard();
      return;
    }
    if (state.coins < safeCost) {
      insufficient = true;
      renderScene();
      return;
    }

    const previousCoins = state.coins;
    const transactionId = window.crypto?.randomUUID?.() || `repair-${Date.now().toString(36)}-${Math.random().toString(36).slice(2)}`;
    const workDurationMs = window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 0 : 1800;
    const workStartedAt = Date.now();
    state.coins = Math.max(0, Math.floor(Number(state.coins) || 0) - safeCost);
    state.restorationLedger[receiptKey] = {
      transactionId, locationId:location.id, level, cost:safeCost,
      status:'paid', committed:false, rewardsGranted:false, createdAt:workStartedAt
    };
    state.pendingRestoration = {
      locationId:location.id, level, phase:'work', designKey:design?.key || '', choiceId:selectedDesign()?.id || '',
      transactionId, cost:safeCost, coinReward, committed:false, rewardsGranted:false,
      workStartedAt, workDurationMs
    };
    if (!saveState()) {
      state.coins = previousCoins;
      state.pendingRestoration = null;
      delete state.restorationLedger[receiptKey];
      insufficient = true;
      feedbackMessage = 'The repair could not be saved, so no coins were spent. Check device storage and try again.';
      renderScene();
      return;
    }

    repairLocked = true;
    insufficient = false;
    phase = 'work';
    playPop();
    const repairState = repairDetailState(location.id, level) || {};
    beep(repairState.mode === 'plants' ? 520 : repairState.mode === 'window' ? 790 : repairState.mode === 'roof' ? 460 : 650);
    renderScene();
    focusCameraOnHotspot();
    sceneTimer = window.setTimeout(finishWork, workDurationMs);
  }

  function finishWork() {
    window.clearTimeout(sceneTimer);
    const activePending = state.pendingRestoration;
    if (!overlay.isConnected || phase !== 'work' || !activePending || activePending.locationId !== location.id || activePending.level !== level) return;
    phase = design ? 'design' : 'complete';
    if (state.pendingRestoration) state.pendingRestoration.phase = phase;
    if (!design && !commitRestoration()) {
      phase = 'work';
      if (state.pendingRestoration) state.pendingRestoration.phase = 'work';
      feedbackMessage = 'This repair is safely paid for and can be resumed from the board.';
      saveState();
      renderScene();
      return;
    }
    if (design) saveState();
    beep(880);
    renderScene();
    if (level >= location.decos.length) {
      easeCameraToFullPlate();
      sceneTimer = window.setTimeout(completeRestorationScene, 2900);
    } else {
      easeCameraToRegion(level + 1);
      sceneTimer = window.setTimeout(completeRestorationScene, 1900);
    }
  }

  function confirmDesign() {
    const choice = selectedDesign();
    if (phase !== 'design' || !choice || !design || !commitRestoration(choice)) return;
    repairLocked = true;
    phase = 'complete';
    playPop();
    beep(980);
    renderScene();
    if (level >= location.decos.length) {
      easeCameraToFullPlate();
      sceneTimer = window.setTimeout(completeRestorationScene, 2900);
    } else {
      easeCameraToRegion(level + 1);
      sceneTimer = window.setTimeout(completeRestorationScene, 1900);
    }
  }

  function completeRestorationScene() {
    if (phase !== 'complete' || !repairLocked || !state.pendingRestoration?.committed) return;
    const sourcePoint = captureElementPoint(overlay.querySelector('.repair-floating-reward') || overlay.querySelector('.repair-cost-bubble'));
    const completedPending = state.pendingRestoration;
    state.pendingRestoration = null;
    if (!saveState()) {
      state.pendingRestoration = completedPending;
      feedbackMessage = 'Your completed repair is safe, but the device could not save the final scene yet. Try again when storage is available.';
      renderScene();
      return;
    }
    window.clearTimeout(sceneTimer);
    window.clearInterval(hudTimer);
    window.clearInterval(speechTimer);
    window.clearTimeout(speechHideTimer);
    if (cameraAnimationFrame) window.cancelAnimationFrame(cameraAnimationFrame);
    releaseCamera();
    overlay.remove();
    currentBoardKey = 'main';
    selectedIndex = -1;
    feedbackMessage = `${location.name} improved. Your saved harbor changes are ready to see on every visit.`;
    render();
    const rewards = [['coins',coinReward,'.coin-pill'],['stars',1,'.star-pill'],['xp',20,'.profile-badge']];
    rewards.forEach(([type,amount,selector],index) => window.setTimeout(() => flyReward({sourcePoint,targetElement:container.querySelector(selector),type,amount}), index * 85));
    showFloat(`${location.name} improved · +⭐ +${coinReward}🪙 +20 XP`);
    storyDialogsDeferred = false;
    advanceStory();
  }

  renderScene();
  if (!resume && phase === 'objective') window.requestAnimationFrame(focusCameraOnHotspot);
  if (phase === 'work' && savedPending) {
    const startedAtValue = Number(savedPending.workStartedAt);
    const startedAt = Number.isFinite(startedAtValue) && startedAtValue > 0 ? startedAtValue : Date.now();
    const durationValue = Number(savedPending.workDurationMs);
    const duration = Number.isFinite(durationValue) ? Math.max(0, Math.min(5000, durationValue)) : 1800;
    const remaining = window.matchMedia('(prefers-reduced-motion: reduce)').matches
      ? 0
      : Math.max(0, duration - Math.max(0, Date.now() - startedAt));
    sceneTimer = window.setTimeout(finishWork, remaining);
  } else if (phase === 'complete' && savedPending?.committed && state.pendingRestoration?.committed) {
    if (level >= location.decos.length) {
      easeCameraToFullPlate();
      sceneTimer = window.setTimeout(completeRestorationScene,2900);
    } else {
      easeCameraToRegion(level + 1);
      sceneTimer = window.setTimeout(completeRestorationScene,1900);
    }
  }
}

function showRestoredLocationScene(location) {
  const level = Math.min(location.decos.length, Number(state.levels[location.id]) || 0);
  if (!level) return showRestorationMoment(location, 1);
  const film = RESTORATION_FILMS[location.film] || RESTORATION_FILMS.cafe;
  const plate = getPlate(location.id, level);
  const designEntries = Object.entries(RESTORATION_DESIGNS[location.id] || {}).map(([step, design]) => {
    const selectedId = design.key === 'floor'
      ? state.locationStyles?.[location.id]?.[design.key] || state.cafeFloor
      : state.locationStyles?.[location.id]?.[design.key];
    const choice = design.choices.find(option => option.id === selectedId);
    return choice ? {step:Number(step), title:design.title, choice} : null;
  }).filter(Boolean);
  const latestDesign = designEntries.filter(entry => entry.step <= level).at(-1);
  const artClass = plate.frame ? 'restoration-world-plate' : 'restoration-world-direct-plate';
  const overlay = document.createElement('section');
  overlay.className = `restoration-scene-screen restoration-repair-screen restoration-visit-screen ${location.id === 'cafe' ? 'restoration-cafe-screen' : 'restoration-portrait-screen'}`;
  overlay.setAttribute('role','dialog');
  overlay.setAttribute('aria-modal','true');
  overlay.setAttribute('aria-label',`Visit restored ${location.name}`);
  overlay.innerHTML = `<div class="restoration-shell repair-scene-shell restoration-visit-shell" style="--repair-accent:${film.accent};--restoration-design-color:${latestDesign?.choice.color || film.accent}">
    ${restorationHudMarkup(location)}
    <header class="restoration-topbar"><button class="restoration-back" type="button" data-restoration-return aria-label="Back to Town">‹ <span>Board</span></button><div class="restoration-location-title"><small>YOUR RESTORED HARBOR · ${level} IMPROVEMENTS</small><b>${location.icon} ${location.name}</b></div><span class="restoration-step-count">${level} / ${location.decos.length}</span></header>
    <div class="restoration-world restoration-visit-world" data-location="${location.id}" data-phase="complete" role="img" aria-label="Restored ${location.name}, improvement ${level} of ${location.decos.length}">
      <div class="restoration-art-frame"><div class="restoration-art-canvas">
        <img class="restoration-world-before ${artClass}" src="${plate.src}" alt="${location.name}, restored through improvement ${level}" style="${plateImageStyle(plate)}" draggable="false">
        <div class="repair-stage-actors" aria-hidden="true">${restorationCastMarkup(location.id, level)}</div>
      </div></div>
    </div>
    <main class="restoration-bottom"><section class="restoration-card restoration-visit-card">
      <small class="restoration-kicker">A PLACE MADE BY THE HARBOR</small>
      <h2>${location.name} feels like home.</h2>
      <p>${latestDesign ? `Your saved ${latestDesign.choice.name.toLowerCase()} finish is part of this harbor story.` : `${level} of ${location.decos.length} improvements are complete.`}</p>
      <div class="location-style-history">${designEntries.length ? designEntries.map(entry => `<span>${entry.title} · <b>${entry.choice.name}</b></span>`).join('') : `<span>${location.decos.slice(0,level).join('  ')}</span>`}</div>
      <button class="btn restoration-action" type="button" data-restoration-return>Back to the harbor board</button>
    </section></main>
    ${restorationNavMarkup()}
  </div>`;
  document.body.appendChild(overlay);
  const canvas = overlay.querySelector('.restoration-art-canvas');
  const fitVisitArt = () => {
    if (!canvas) return;
    const coverWidth = Math.max(1,window.innerWidth,window.innerHeight * 9 / 16);
    const width = coverWidth * (location.id === 'cafe' ? 1.16 : 1);
    canvas.style.setProperty('--visit-canvas-width',`${width}px`);
    canvas.style.setProperty('--visit-canvas-height',`${width * 16 / 9}px`);
  };
  fitVisitArt();
  window.addEventListener('resize',fitVisitArt);
  const exitVisit = (boardKey = 'main') => {
    window.removeEventListener('resize',fitVisitArt);
    overlay.remove();
    currentBoardKey = boardKey;
    selectedIndex = -1;
    render();
  };
  bindRestorationChrome(overlay,exitVisit);
}

function showLocationVisit(location) {
  return showRestoredLocationScene(location);
  /* Retired legacy visit renderer; restored scenes now use the saved final plate.

  const level = Math.min(location.decos.length, Number(state.levels[location.id]) || 0);
  if (!level) return showRestorationMoment(location, 1);
  const film = RESTORATION_FILMS[location.film] || RESTORATION_FILMS.cafe;
  const visitDetail = repairDetailState(location.id, level);
  const art = location.id === 'cafe'
    ? visitDetail?.plateAfter || restorationBaseArt(location)
    : restorationBaseArt(location);
  const plateFrame = restorationPlateFrameSize(location.id, level, art);
  const plateStyle = restorationPlateImageStyle(location.id, level, art);
  const plateClassSuffix = location.id === 'cafe' && CAFE_DIRECT_PLATES[art] ? ' restoration-world-direct-plate' : '';
  const floorTintMarkup = location.id === 'cafe' ? cafeFloorTintMarkup(art, getCafeFloor()) : '';
  const styles = { ...(state.locationStyles?.[location.id] || {}) };
  const visualStyles = restorationStylesFor(location.id);
  const styleLevel = level >= 8 ? 8 : level >= 7 ? 7 : level >= 4 ? 4 : 0;
  const styleData = RESTORATION_DESIGNS[location.id]?.[styleLevel];
  const savedChoice = styleData?.choices.find(choice => choice.id === (styleData.key === 'floor' ? state.cafeFloor : styles[styleData.key]));
  const cafeFinish = location.id === 'cafe' && styleLevel === 4 ? getCafeFloor() : null;
  const chosen = cafeFinish ? { name:cafeFinish.name, color:cafeFinish.color, icon:savedChoice?.icon || '🪵' } : savedChoice;
  if (cafeFinish && styles.floor) styles.floor = state.cafeFloor;
  const overlay = document.createElement('section');
  overlay.className = `restoration-scene-screen ${location.id === 'cafe' ? 'restoration-cafe-screen' : 'restoration-portrait-screen'} ${location.id === 'cafe' && CAFE_DIRECT_PLATES[art] ? 'restoration-direct-cafe-stage' : ''}`;
  overlay.setAttribute('role','dialog');
  overlay.setAttribute('aria-modal','true');
  overlay.setAttribute('aria-label',`Visit restored ${location.name}`);
  overlay.innerHTML = `<div class="restoration-shell restoration-visit ${location.id === 'cafe' ? 'restoration-cafe-shell' : 'restoration-portrait-shell'}" style="--repair-accent:${film.accent};--restoration-design-color:${chosen?.color || film.accent};--restoration-backdrop:url('${art}')">${restorationHudMarkupLegacy(location.id)}<header class="restoration-topbar"><button class="restoration-back" type="button" data-visit-close>‹ <span>Board</span></button><div class="restoration-location-title"><small>YOUR HARBOR · ${level} IMPROVEMENTS</small><b>${location.icon} ${location.name}</b></div><span class="restoration-step-count">${level} / ${location.decos.length}</span></header><div class="restoration-world ${location.id === 'cafe' ? 'cafe-isometric-world' : 'restoration-portrait-world'} ${location.id === 'cafe' && level <= 5 ? 'cafe-interior' : ''} ${location.id === 'cafe' && level === 6 ? 'cafe-kitchen' : ''}" data-phase="complete" data-location="${location.id}" role="group" aria-label="Restored ${location.name} with your saved design"><div class="restoration-art-frame"><div class="restoration-art-canvas"><img class="restoration-world-before restoration-world-plate${plateClassSuffix}" src="${art}" alt="${location.name}, restored" style="${plateStyle}" data-frame-width="${plateFrame.w}" data-frame-height="${plateFrame.h}">${floorTintMarkup}<div class="restoration-world-shade" aria-hidden="true"></div><div class="restoration-design-preview has-design"><span>${chosen?.icon || location.decos[level - 1]}</span><small>${chosen?.name || 'A harbor improvement'}</small></div><div class="restoration-progress-dots">${location.decos.map((deco,index)=>`<span class="${index < level ? 'built' : 'locked-deco'}">${deco}</span>`).join('')}</div></div></div><main class="restoration-bottom"><div class="restoration-card visit-card"><small class="restoration-kicker">A PLACE MADE BY THE HARBOR</small><h2>${location.name} feels like home.</h2><p>${chosen ? `Your ${chosen.name.toLowerCase()} finish is part of the scene.` : `${level} of ${location.decos.length} improvements are complete.`}</p><div class="location-style-history">${Object.entries(styles).map(([key,value])=>`<span>${key.replaceAll('-',' ')} · <b>${String(value).replaceAll('-',' ')}</b></span>`).join('') || `<span>${location.decos.slice(0,level).join('  ')}</span>`}</div><button class="btn restoration-action" type="button" data-visit-close>Back to the harbor board</button></div></main>${restorationNavMarkupLegacy(location.id)}</div>`;
  document.body.appendChild(overlay);
  let visitHudTimer = 0;
  const exitVisit = (boardKey = 'main') => {
    window.clearInterval(visitHudTimer);
    overlay.remove();
    currentBoardKey = boardKey;
    feedbackMessage = boardKey === 'event' ? 'Optional picnic board: merge seaside bites for bonus milestones. Your energy is shared; there is no timer.' : feedbackMessage;
    render();
  };
  overlay.querySelectorAll('[data-visit-close]').forEach(button => button.onclick = () => exitVisit());
  bindRestorationChrome(overlay, exitVisit);
  visitHudTimer = window.setInterval(() => {
    const countdown = overlay.querySelector('[data-energy-countdown]');
    const energyValue = overlay.querySelector('[data-repair-energy-value]');
    const energyPill = overlay.querySelector('.repair-energy, .cafe-resource-pill.energy-pill');
    if (!countdown || !energyValue || !energyPill) return;
    const timerText = restorationEnergyCountdown();
    countdown.textContent = timerText;
    energyValue.textContent = overlay.classList.contains('restoration-cafe-screen') ? `${state.energy}` : `${state.energy}/${maxEnergy()}`;
    energyPill.setAttribute('aria-label', `${state.energy} of ${maxEnergy()} energy. ${timerText === 'FULL' ? 'Energy is full' : `Next energy in ${timerText}`}`);
  }, 1000);
}
  */
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
  const restoredPlaces = LOCATIONS.filter(location => isLocationUnlocked(location) && Number(state.levels[location.id]) > 0);
  const restoredPlaceRows = restoredPlaces.map(location => {
    const level = Math.min(location.decos.length, Number(state.levels[location.id]) || 0);
    return `<div class="loc story-row restored-place-row"><div><b>${location.icon} ${location.name}</b><small>${level} of ${location.decos.length} improvements · Visit your saved scene</small></div><button class="btn replay-button restored-place-action" type="button" data-visit-location="${location.id}" aria-label="Visit restored ${location.name}">Visit</button></div>`;
  }).join('');
  const restoredPlacesSection = restoredPlaceRows ? `<div class="story-list-heading">Restored places · visit again</div>${restoredPlaceRows}` : '';
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
  const modal = showModal(`<div class="sheet-heading"><div><div class="story-kicker">STORY · CHORES · REPAIRS</div><h2>The Harbor Journal</h2></div><button class="btn close-sheet" aria-label="Close">✕</button></div><div class="storybook-cover" style="--chapter-art:url('${storyCover}')"><div><small>CHAPTER ${context.chapterIndex + 1} · ${context.stepIndex < 4 ? 'DAY 1' : 'DAY 2'}</small><h3>${context.chapter.title}</h3><p>${context.chapter.lines?.[0]?.[1] || 'The harbor is still putting its story back together.'}</p></div><span>${context.chapterIndex + 1}</span></div><div class="storybook-summary"><div class="goal-heading"><b>📖 TODAY’S HARBOR CHORES</b><strong>${context.stepIndex} / ${stepCount}</strong></div><div class="restoration-track"><i style="width:${choreProgress}%"></i></div><small>${context.chore ? `${context.chore.day} · ${context.chore.title}` : 'All eight chores complete · follow story stars to the next episode.'}</small><div class="storybook-objective-card"><span>${CHARS[context.chore?.character || 'iris']?.icon || '📖'}</span><div><small>${context.chore ? 'WHY THIS MATTERS' : 'NEXT STORY BEAT'}</small><b>${context.chore ? context.chore.detail : nextGoal}</b></div></div></div><div class="story-quest-list">${choreRows}</div><div class="journal-goals"><div class="journal-goal"><div class="goal-heading"><b>📖 Mystery chapters</b><strong>${Math.min(state.chapter, CHAPTERS.length)} / ${CHAPTERS.length}</strong></div><div class="restoration-track"><i style="width:${chapterProgress * 100}%"></i></div><small>${storyComplete ? 'Mystery solved · scenes are replayable below' : `${remainingStars} more ⭐ to open the next chapter`}</small></div><div class="journal-goal"><div class="goal-heading"><b>🛠️ Harbor repairs</b><strong>${restored} / ${totalRestorations}</strong></div><div class="restoration-track"><i style="width:${restorationProgress * 100}%"></i></div><small>${storyComplete && restored < totalRestorations ? `${totalRestorations - restored} improvements until the epilogue` : storyComplete ? 'All places rebuilt · campaign finished' : 'Every paid repair gives 1⭐ and changes the harbor.'}</small></div></div>${journalRepairCard}${restoredPlacesSection}<div class="journal-next"><b>${storyReady ? 'STORY READY · A NEIGHBOR HAS A NOTE' : campaignFinished ? 'CAMPAIGN COMPLETE · FREE PLAY' : storyComplete ? 'THE MYSTERY IS SOLVED' : 'WHAT HAPPENS NEXT?'}</b><p>${storyReady ? 'A character is ready to react to your recent help. Read their note using the “Read story” link on the board.' : nextGoal}</p></div><div class="story-list-heading">${Math.min(state.chapter, CHAPTERS.length)} of ${CHAPTERS.length} chapters discovered · replay a completed scene</div>${chapters}`, root => {
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
    root.querySelectorAll('[data-visit-location]').forEach(button => {
      button.onclick = () => {
        const location = LOCATIONS.find(entry => entry.id === button.dataset.visitLocation);
        if (!location || !isLocationUnlocked(location) || !(Number(state.levels[location.id]) > 0)) return;
        root.remove();
        showLocationVisit(location);
      };
    });
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
  showModal(`<div class="sheet-heading"><div><div class="story-kicker">HARBOR MENU</div><h2>More</h2></div><button class="btn close-sheet" aria-label="Close">✕</button></div><p class="menu-balance">💎 ${state.pearls} pearls</p><div class="quick-menu"><button class="btn menu-board">${boardLabel}</button><button class="btn menu-inventory">🧺 Inventory</button><button class="btn menu-collection">📚 Item collection</button><button class="btn menu-journal">📖 Story journal & repairs</button><button class="btn menu-goals">🧭 Daily goals & gift</button><button class="btn menu-guide">❔ How to play</button><button class="btn menu-restart">🔄 Start story over…</button></div>`, modal => {
    modal.querySelector('.close-sheet').onclick = () => modal.remove();
    modal.querySelector('.menu-board').onclick = () => {
      modal.remove();
      currentBoardKey = currentBoardKey === 'main' ? 'event' : 'main';
      selectedIndex = -1;
      feedbackMessage = currentBoardKey === 'event' ? 'Optional picnic board: merge seaside bites for bonus milestone rewards. Your energy is shared.' : 'Back to the harbor town: deliver requests and restore places to move the campaign forward.';
      render();
    };
    modal.querySelector('.menu-inventory').onclick = () => { modal.remove(); showCollection('inventory'); };
    modal.querySelector('.menu-collection').onclick = () => { modal.remove(); showCollection('items'); };
    modal.querySelector('.menu-journal').onclick = () => { modal.remove(); showStory(); };
    modal.querySelector('.menu-goals').onclick = () => { modal.remove(); showProgress('daily'); };
    modal.querySelector('.menu-guide').onclick = () => { modal.remove(); showGuide(); };
    modal.querySelector('.menu-restart').onclick = () => { modal.remove(); showResetConfirmation(); };
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
  if (cell?.cache === 'energy') {
    classes.push('energy-cache', 'covered');
    content = '<span class="cell-icon energy-cache-icon" aria-hidden="true">⚡</span><span class="cache-glint" aria-hidden="true">✦</span><span class="webbing" aria-hidden="true"></span>';
  } else if (cell?.gen) {
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
  const selectedCell = selectedIndex >= 0 ? cells[selectedIndex] : null;
  const selectedItem = selectedCell && !selectedCell.gen ? FAMILIES[selectedCell.fam]?.tiers[selectedCell.tier - 1] : null;
  const selectedGenerator = selectedCell?.gen ? generatorDefinition(selectedCell.gen) : null;
  const footerTitle = selectedItem
    ? `${selectedItem.name} · Tier ${selectedCell.tier}`
    : selectedGenerator
      ? `${selectedGenerator.name} · Lv ${generatorLevel(selectedCell.gen)}`
      : currentBoardKey === 'event' ? 'Seaside picnic' : 'Harbor board';
  const generatorCost = selectedGenerator ? generatorDefinition(selectedCell.gen).energyCost || 1 : 1;
  const generatorCooldown = selectedGenerator ? generatorTimeLeft(selectedCell) : 0;
  const generatorItemName = selectedGenerator ? FAMILIES[selectedCell.gen]?.tiers[0]?.name || 'an item' : '';
  const footerDescription = selectedItem
    ? `${selectedCell.covered ? 'Covered bundle · merge a matching item to uncover it. ' : ''}${selectedItem.description}${selectedCell.locked ? ' Locked · open details to unlock.' : selectedCell.tier < (FAMILIES[selectedCell.fam]?.tiers.length || 8) ? ' Merge a match to make the next tier.' : ' This is the top tier.'}`
    : selectedGenerator
      ? generatorCooldown
        ? `Recharging · ready in ${generatorCooldown}s.`
        : state.energy < generatorCost
          ? `Need ${generatorCost}⚡ to make ${generatorItemName}. Orders restore energy.`
          : nearestEmpty(selectedIndex) < 0
            ? 'Board is full · merge, store or deliver an item to make room.'
            : `Tap to make ${generatorItemName} · costs ${generatorCost}⚡ · ${selectedCell.charges}/${generatorCapacity(selectedCell.gen)} drops left.`
      : currentBoardKey === 'event' ? 'Merge seaside bites for optional picnic rewards.' : feedbackMessage;
  const showDefaultFooterHint = !selectedItem && !selectedGenerator && currentBoardKey === 'main' && feedbackMessage === defaultBoardHint;
  container.innerHTML = `<div class="app">
    <header class="topline">
      <div class="profile-badge" aria-label="${chapterBadgeLabel}" title="${chapterBadgeLabel}"><img src="${CHARS.iris.img}" alt=""><b>${chapterBadge}</b></div>
      <div class="resource-pills"><div class="resource-pill energy-pill" title="Energy regenerates over time · ${maxEnergy()} maximum"><img class="currency-icon" src="assets/harbor-energy-bolt.webp" alt=""><b>${state.energy}/${maxEnergy()}</b></div><div class="resource-pill coin-pill" data-resource="coins" title="Coins fund harbor improvements"><img class="currency-icon" src="assets/harbor-gold-coin.webp" alt=""><b>${state.coins}</b></div><div class="resource-pill star-pill" data-resource="stars" title="Stars reveal story chapters and track restoration"><span aria-hidden="true">⭐</span><b>${state.stars}</b></div><div class="resource-pill gem-pill" data-resource="pearls" title="Pearls are saved for special harbor supplies"><img class="currency-icon" src="assets/harbor-pink-gem.webp" alt=""><b>${state.pearls}</b></div></div>
      <div class="top-actions"><button class="btn more-button" id="more-nav" aria-label="Open harbor menu" title="Harbor menu"><svg class="cart-icon" viewBox="0 0 32 32" aria-hidden="true"><path d="M3 5h4l3 15h15l4-11H9"/><path d="M11 20l-1 4h16"/><circle cx="13" cy="28" r="2"/><circle cx="24" cy="28" r="2"/></svg></button><button class="btn sound-button" id="mute" aria-label="Toggle sound">${muted ? '🔇' : '🔊'}</button></div>
    </header>
    <button class="story-objective ${storyMoment ? 'story-objective-ready' : ''}" id="story-focus" type="button" aria-label="${storyMoment ? 'Read a neighbor story' : 'Open the story journal'}"><span class="story-objective-icon" aria-hidden="true">${storyMoment ? '✉️' : '📖'}</span><span class="story-objective-copy"><small>CHAPTER ${storyContext.chapterIndex + 1} · ${storyContext.chapter.title}</small><b>${storyMoment ? 'A neighbor’s story is ready' : storyObjectiveTitle}</b><i class="story-objective-track"><i style="width:${choreTrackPercent}%"></i></i></span><span class="story-objective-chevron" aria-hidden="true">›</span></button>
    <section class="orders-section ${currentBoardKey === 'main' ? 'neighbor-section' : 'event-section'}"><div class="section-heading"><b>${currentBoardKey === 'event' ? 'PICNIC REWARDS' : 'NEIGHBOR REQUESTS'}</b></div><div class="tasks ${currentBoardKey === 'event' ? 'event-tasks' : 'neighbor-rail'}" ${currentBoardKey === 'main' ? `role="region" tabindex="0" aria-label="Neighbor requests. Scroll horizontally to browse all ${Object.keys(CHARS).length} neighbors."` : ''}>${renderTasks()}</div></section>
    <div class="board ${currentBoardKey === 'event' ? 'event' : ''}" role="grid" aria-label="${currentBoardKey === 'main' ? 'Harbor town' : 'Seaside picnic'} merge board, ${BOARD_COLS} columns by ${BOARD_ROWS} rows">${cells.map((cell, index) => renderCell(cell, index, -1)).join('')}</div>
    <div class="board-footer"><button class="footer-storage" id="storage-nav" type="button" aria-label="Open inventory" title="Open inventory"><img src="assets/harbor-storage-button.webp" alt=""></button><div class="info item-info" role="status" aria-live="polite" aria-label="${footerTitle}. ${footerDescription}"><div class="item-info-copy"><b class="item-info-title">${showDefaultFooterHint ? 'Tap an item' : footerTitle}</b><small class="item-info-description">${showDefaultFooterHint ? 'to view its details.' : footerDescription}</small></div></div><button class="footer-repairs" id="repairs-nav" type="button" aria-label="Open harbor repairs" title="Restore the harbor"><span aria-hidden="true">🛠️</span><b>Repair</b></button></div>
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
  container.querySelector('#repairs-nav').onclick = () => openNextRestoration();
  container.querySelector('#storage-nav').onclick = () => showCollection('inventory');
  container.querySelector('#story-focus').onclick = () => storyMoment ? openStoryExperience() : showStory();
  container.querySelector('#more-nav').onclick = showMoreMenu;
  saveState();
  refreshTutorial();
  pumpCompletionQueue();
}

function refreshGeneratorClocks() {
  const cells = board();
  cells.forEach((cell,index) => {
    if (!cell?.gen) return;
    const element = container.querySelector(`.cell[data-i="${index}"]`);
    if (!element) return;
    const seconds = generatorTimeLeft(cell);
    element.classList.toggle('cd',seconds > 0);
    const caption = element.querySelector('.cell-caption');
    if (caption) caption.textContent = seconds ? `${seconds}s` : `${cell.charges}/${generatorCapacity(cell.gen)}`;
    element.setAttribute('aria-label',describeItem(cell));
    if (index !== selectedIndex) return;
    const definition = generatorDefinition(cell.gen);
    const cost = definition.energyCost || 1;
    const itemName = FAMILIES[cell.gen]?.tiers[0]?.name || 'an item';
    const description = seconds
      ? `Recharging · ready in ${seconds}s.`
      : state.energy < cost
        ? `Need ${cost}⚡ to make ${itemName}. Orders restore energy.`
        : nearestEmpty(index) < 0
          ? 'Board is full · merge, store or deliver an item to make room.'
          : `Tap to make ${itemName} · costs ${cost}⚡ · ${cell.charges}/${generatorCapacity(cell.gen)} drops left.`;
    const info = container.querySelector('.item-info');
    const detail = info?.querySelector('.item-info-description');
    if (detail) {
      detail.textContent = description;
      info.setAttribute('aria-label',`${definition.name} · Lv ${generatorLevel(cell.gen)}. ${description}`);
    }
  });
}

function refreshEnergyDisplays() {
  const cap = maxEnergy();
  const mainValue = container.querySelector('.energy-pill b');
  if (mainValue) mainValue.textContent = `${state.energy}/${cap}`;
  document.querySelectorAll('[data-repair-energy-value]').forEach(value => { value.textContent = String(state.energy); });
  document.querySelectorAll('.repair-energy').forEach(pill => pill.setAttribute('aria-label',`${state.energy} of ${cap} energy`));
  document.querySelectorAll('.cafe-resource-pill.energy-pill').forEach(pill => pill.setAttribute('aria-label',`${state.energy} of ${cap} energy. Open daily goals`));
  document.querySelectorAll('[data-energy-countdown]').forEach(value => { value.textContent = restorationEnergyCountdown(); });
}

function tickEnergy() {
  const now = Date.now();
  const cap = maxEnergy();
  const gained = Math.floor((now - state.lastTick) / ENERGY_TICK_MS);
  if (gained > 0) {
    state.energy = Math.min(cap, state.energy + gained);
    state.lastTick = state.energy >= cap ? now : state.lastTick + gained * ENERGY_TICK_MS;
    saveState();
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
  refreshEnergyDisplays();
  refreshGeneratorClocks();
  if (tutorialStep === null) {
    const nextHint = Date.now() - lastPlayerActionAt >= 6500 ? findMergePair() : null;
    const hintChanged = JSON.stringify(nextHint) !== JSON.stringify(mergeHintPair);
    if (hintChanged) {
      mergeHintPair = nextHint;
      if (!drag) render();
    }
  }
  pumpCompletionQueue();
}, 1000);
window.ProgressLogger?.logProgress?.('game_start', {});
