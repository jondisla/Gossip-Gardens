// Harbor Whispers — original harbor-town merge adventure. The save key is intentionally stable.
import { FAMILIES, MAIN_FAMILIES, GENERATOR_DEFS, CHARS, REQUEST_NOTES, CHAPTER_EXPANSION, TASK_TEMPLATES, DAILY_OBJECTIVES, BOOSTERS } from './game-content.js';
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
    boards: { main: makeBoard(MAIN_FAMILIES), event: makeBoard(['shell']) },
    tasks: [], levels, inventory: [], inventoryCapacity: 30, unlockedFamilies: [...MAIN_FAMILIES],
    generatorLevels: Object.fromEntries(GENERATOR_DEFS.map(generator => [generator.family, 1])), pendingGenerators: [],
    familyMastery, discoveredItems, boosters, stats: { merges: 0, generated: 0, orders: 0, restorations: 0, discoveries: 0, fiveMerges: 0, eventPoints: 0 },
    achievements: [], relationships: Object.fromEntries(Object.keys(CHARS).map(id => [id, 1])),
    eventPoints: 0, eventClaimed: [], dailyClaimedAt: '', dailyDay: today, dailyStreak: 0, dailyObjectives: makeDailyObjectives(today),
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
    migrated.dailyStreak = Math.max(0, Number(saved.dailyStreak) || 0);
    migrated.eventClaimed = Array.isArray(saved.eventClaimed) ? saved.eventClaimed : [];
    migrated.cafeFloor = CAFE_FLOORS.some(floor => floor.id === saved.cafeFloor) ? saved.cafeFloor : fresh.cafeFloor;
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
  const requirement = currentRequirement(task);
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
  state.relationships[task.who] = Math.min(10, (state.relationships[task.who] || 1) + 1);
  updateDailyProgress('orders');
  state.tasks.splice(index, 1);
  fillTasks();
  placePendingGenerators();
  checkAchievements();
  playPop();
  showFloat(`+${task.coins}🪙${task.energy ? ` +${task.energy}⚡` : ''} +${task.stars}⭐${task.pearls ? ` +${task.pearls}🫧` : ''}`);
  render();
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
  const quantity = requirement.quantity || 1;
  const ready = taskReady(task);
  const stageCount = task.requirements?.length || 1;
  const stageNumber = Math.min(stageCount, (task.stage || 0) + 1);
  const stageDots = Array.from({length:stageCount},(_,stage)=>`<span class="${stage < stageNumber - 1 ? 'done' : stage === stageNumber - 1 ? 'current' : ''}" aria-label="Stage ${stage + 1}"></span>`).join('');
  showModal(`<div class="task-sheet" style="--quest-accent:${character.accent}"><div class="task-sheet-head"><div><small>${task.kind === 'multi-stage' ? 'MULTI-STEP HARBOR ORDER' : 'HARBOR REQUEST'}</small><h2>${task.title || 'A little favor'}</h2></div><button class="btn quest-close" aria-label="Close">✕</button></div><div class="quest-letter">${characterPortrait(task.who, 'quest-portrait')}<div><b>${character.name} · ${character.role}</b><span>is hoping for…</span><strong>${item.icon}${quantity > 1 ? ` ×${quantity}` : ''}</strong><p>“${task.note || 'Could you find me one? I’ll make it worth your while!'}”</p></div></div>${stageCount > 1 ? `<div class="order-stages">${stageDots}<small>Step ${stageNumber} of ${stageCount}</small></div>` : ''}<div class="quest-rewards"><div class="reward-heading"><span>✦</span><b>REWARDS</b><span>✦</span></div><div class="reward-items"><span>🪙 <b>${task.coins}</b></span><span>⚡ <b>${task.energy}</b></span><span>⭐ <b>${task.stars}</b></span>${task.pearls ? `<span>🫧 <b>${task.pearls}</b></span>` : ''}</div></div><div class="quest-status">${ready ? 'Ready to deliver!' : `Find ${quantity > 1 ? `${quantity} ` : 'a '}${family.name.toLowerCase()} item · Tier ${requirement.tier}`}</div><button class="btn quest-deliver ${ready ? 'ready' : ''}" ${ready ? '' : 'disabled'}>${ready ? `Deliver ${item.icon}${quantity > 1 ? ` ×${quantity}` : ''}` : 'Keep merging to find it'}</button></div>`, modal => {
    modal.classList.add('task-modal');
    modal.querySelector('.quest-close').onclick = () => modal.remove();
    modal.querySelector('.quest-deliver').onclick = () => {
      if (!taskReady(task)) return;
      modal.remove();
      completeTask(index);
    };
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
  showModal(`<div class="sheet-heading"><div><div class="story-kicker">${family.name.toUpperCase()} · TIER ${cell.tier}/8</div><h2>${item.icon} ${item.name}</h2></div><button class="btn close-sheet" aria-label="Close">✕</button></div><p>${item.description}</p><div class="item-stats"><span>Sell value <b>${item.sellValue}🪙</b></span><span>Merge XP <b>+${item.xpValue} XP</b></span><span>Family mastery <b>Lv ${state.familyMastery[cell.fam]?.level || 1}</b></span></div><div class="item-detail-actions"><button class="btn item-lock">${cell.locked ? 'Unlock item' : 'Lock item'}</button><button class="btn item-store" ${state.inventory.length >= state.inventoryCapacity || cell.covered ? 'disabled' : ''}>Store</button><button class="btn item-sell" ${cell.locked || cell.covered ? 'disabled' : ''}>Sell · ${item.sellValue}🪙</button></div><div class="item-detail-actions merge-options">${matchCount >= 3 && cell.tier < 8 ? '<button class="btn primary merge-three">Merge 3 → 1</button>' : ''}${matchCount >= 5 && cell.tier < 8 ? '<button class="btn primary merge-five">Merge 5 → 2</button>' : ''}</div><p class="item-chain">${family.tiers.map((tier,index)=>`<span class="${index + 1 === cell.tier ? 'current' : state.discoveredItems.includes(tier.id) ? '' : 'unknown'}">${state.discoveredItems.includes(tier.id) ? tier.icon : '◆'}<small>T${index + 1}</small></span>`).join('<i>›</i>')}</p>`, modal => {
    modal.querySelector('.close-sheet').onclick = () => modal.remove();
    modal.querySelector('.item-lock').onclick = () => { modal.remove(); toggleItemLock(index); };
    modal.querySelector('.item-store').onclick = () => { if (state.inventory.length >= state.inventoryCapacity) return; modal.remove(); putItemInInventory(index); };
    modal.querySelector('.item-sell').onclick = () => { modal.remove(); sellBoardItem(index); };
    modal.querySelector('.merge-three')?.addEventListener('click', () => { modal.remove(); mergeSelectedGroup(index, 3); });
    modal.querySelector('.merge-five')?.addEventListener('click', () => { modal.remove(); mergeSelectedGroup(index, 5); });
  });
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
    drag.ghost.textContent = FAMILIES[drag.cell.fam].items[drag.cell.tier - 1];
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
  const chapterIndex = CHAPTERS.indexOf(chapter);
  if (chapterIndex >= 0) return STORY_SCENES[chapterIndex % STORY_SCENES.length];
  if (chapter?.title === 'The Harbor Comes Home') return 'assets/restore-pier-scene.webp';
  return 'assets/harbor-bg.webp';
}

function showDialogue(chapter, onClose = () => {}) {
  let lineIndex = 0;
  let closed = false;
  const sceneArt = storyArtwork(chapter);
  const modal = document.createElement('div');
  modal.className = 'story-scene';
  modal.setAttribute('role', 'dialog');
  modal.setAttribute('aria-modal', 'true');
  document.body.appendChild(modal);
  function finishDialogue() {
    if (closed) return;
    closed = true;
    modal.remove();
    onClose();
  }
  function drawLine() {
    const [speaker, text] = chapter.lines[lineIndex];
    const character = CHARS[speaker];
    const side = lineIndex % 2 === 0 ? 'right' : 'left';
    const speakerColor = character.accent || '#e879aa';
    const progress = ((lineIndex + 1) / chapter.lines.length) * 100;
    modal.innerHTML = `<div class="story-backdrop" style="--dialogue-art:url('${sceneArt}')" aria-hidden="true"></div><div class="story-topline"><div><small>HARBOR JOURNAL · ILLUSTRATED STORY</small><b>${chapter.title}</b></div><button class="story-skip" aria-label="Skip story">▶▶</button></div><button class="story-advance ${side} speaker-${speaker}" data-speaker="${speaker}" style="--speaker-accent:${speakerColor}" aria-label="Continue story"><span class="story-character">${characterPortrait(speaker, 'story-portrait')}<b>${character.name}</b></span><span class="story-bubble"><span>${text}</span></span></button><div class="story-bottom"><div class="story-progress-track"><span style="width:${progress}%"></span></div><b>Tap anywhere to continue</b><small>${lineIndex + 1} / ${chapter.lines.length}</small></div>`;
    modal.querySelector('.story-skip').onclick = finishDialogue;
    modal.querySelector('.story-advance').onclick = () => {
      beep(660);
      lineIndex += 1;
      if (lineIndex >= chapter.lines.length) finishDialogue();
      else drawLine();
    };
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
  showModal(`<div class="sheet-heading"><div><div class="story-kicker">YOUR HARBOR, YOUR PACE</div><h2>How to play</h2></div><button class="btn close-sheet" aria-label="Close">✕</button></div><div class="guide-section"><b>1 · Make and merge</b><p>Tap a generator to spend 1⚡. Merge two matching items to build the goods needed for a request. Drag a match together, or tap one item and then its match. Tap the selected item again to open details, storage and larger-merge options.</p></div><div class="guide-section"><b>2 · Help neighbors and rebuild</b><p>Deliver requests for coins and ⭐. Use <b>Restore</b> to explore the ten-landmark harbor map and fund step-by-step improvements. Items, inventory, generators and family mastery are in <b>Items</b>; daily goals and achievements are in <b>Goals</b>.</p></div><div class="guide-section"><b>3 · Finish the campaign, then free play</b><p>Find all ${CHAPTERS.length} chapters <em>and</em> complete all ${totalRestorationCount()} harbor improvements to unlock the epilogue. After that, keep merging on either board at your own pace.</p></div><div class="guide-section guide-calm"><b>No fail state</b><p>No lives, countdown, or losing screen. Energy refills over time; you can pause and come back whenever you like. Your progress is saved on this device.</p></div><div class="guide-actions"><button class="btn primary replay-guide">Replay the first-time guide</button><button class="btn fresh-save">Start a new harbor…</button></div>`, modal => {
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
  const tabs = [['items','Items'],['inventory','Inventory'],['generators','Generators'],['mastery','Mastery']];
  return `<div class="collection-tabs" role="tablist">${tabs.map(([id,label]) => `<button type="button" data-collection-tab="${id}" class="${activeTab === id ? 'active' : ''}" role="tab" aria-selected="${activeTab === id}">${label}</button>`).join('')}</div>`;
}

function renderCollectionPage(tab) {
  if (tab === 'inventory') {
    const entries = state.inventory.map((entry,index) => {
      const family = FAMILIES[entry.fam];
      const item = family?.tiers[entry.tier - 1];
      if (!item) return '';
      return `<div class="inventory-entry"><span class="inventory-icon">${item.icon}</span><div class="entry-copy"><b>${item.name}</b><small>${family.name} · Tier ${entry.tier} · ${entry.locked ? 'stored locked' : 'ready to retrieve'}</small></div><div class="item-detail-actions"><button class="btn primary entry-action" data-withdraw="${index}">Take out</button><button class="btn entry-action" data-inventory-sell="${index}">Sell</button></div></div>`;
    }).join('');
    return `<p class="panel-note">${state.inventory.length}/${state.inventoryCapacity} spaces used. Stored items are safe from board clutter; retrieve them to the Town board when a space is free.</p><div class="inventory-list">${entries || '<div class="guide-section"><b>Your inventory is empty</b><p>Tap an item on the board, then choose Store to keep it here.</p></div>'}</div>`;
  }

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
      return `<div class="collection-tier" title="${found ? item.name : `Undiscovered tier ${item.tier}`}"><span>${found ? item.icon : '◇'}</span><small>${found ? item.name : `Tier ${item.tier}`}</small></div>`;
    }).join('<span class="tree-arrow">›</span>');
    return `<section class="collection-family ${unlocked ? '' : 'locked'}"><div class="collection-family-head"><span>${family.icon}</span><b>${family.name}</b><small>${unlocked ? `${discovered}/8 discovered` : 'Story locked'}</small></div><div class="collection-chain">${chain}</div></section>`;
  }).join('');
  return `<p class="panel-note">Merge two identical family items to discover the next tier. Unknown tiers stay hidden until you find them. Picnic bites are a separate optional chain.</p>${rows}`;
}

function showCollection(initialTab = 'items') {
  let activeTab = initialTab;
  const modal = showModal(`<div class="sheet-heading"><div><div class="story-kicker">MERGE COLLECTION</div><h2>Harbor collection</h2></div><button class="btn close-sheet" aria-label="Close">✕</button></div><div class="collection-body"></div>`, root => {
    root.classList.add('collection-modal');
    root.querySelector('.close-sheet').onclick = () => root.remove();
  });
  const draw = () => {
    const body = modal.querySelector('.collection-body');
    body.innerHTML = `${renderCollectionTabs(activeTab)}${renderCollectionPage(activeTab)}`;
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
          : { title: 'Help the townsfolk', text: 'Tap a request to see what your neighbor needs and what it pays. Deliver treats for coins and stars; tougher requests sometimes return a little energy too.', action: 'Your turn ✨' };
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

function showRestorationMoment(location, level) {
  const stage = RESTORATION_STAGES[location.id][level - 1];
  const film = RESTORATION_FILMS[location.film] || RESTORATION_FILMS[location.id] || RESTORATION_FILMS.cafe;
  const helper = CHARS[film.helper] || CHARS.mae;
  const isCafeFloorRepair = location.id === 'cafe' && level === 4;
  const beforeArt = isCafeFloorRepair ? 'assets/restore-cafe-room-before.webp' : film.beforeArt;
  const afterArt = isCafeFloorRepair ? 'assets/restore-cafe-room-after.webp' : film.art;
  const progress = location.decos.map((deco, index) => `<span class="${index < level ? 'built' : 'locked-deco'}">${deco}</span>`).join('');
  const frameNames = ['BEFORE THE REPAIR', 'NEIGHBORS AT WORK', 'THE BIG REVEAL'];
  const frameTitles = ['A fresh start', 'Making it together', 'Look what we made!'];
  const frameIcons = ['🌧️', film.actions?.[level - 1] || '🛠️', location.decos[level - 1] || '✨'];
  const floorControls = isCafeFloorRepair ? `<div class="floor-picker"><small>CHOOSE MAE’S CAFÉ FLOOR</small><div class="floor-choices" role="group" aria-label="Choose café floor color">${renderCafeFloorChoices()}</div></div>` : '';
  showModal(`<div class="restoration-moment" style="--repair-accent:${film.accent}">
    <div class="repair-film-heading"><div class="repair-place"><span>${location.icon}</span><b>${location.name}</b><small>${level} / ${location.decos.length}</small></div><button class="repair-skip" type="button" aria-label="Skip to the finished scene">Skip <span>⏭</span></button></div>
    <div class="repair-scene repair-${location.id}" data-beat="0" ${isCafeFloorRepair ? `data-floor-preview style="--floor-tone:${getCafeFloor().color}"` : ''} role="group" aria-label="${location.name} restoration story">
      <img class="repair-art" src="${beforeArt}" alt="${isCafeFloorRepair ? 'Storm-worn interior of Mae’s café' : `Storm-damaged ${location.name} before the repair}`}" fetchpriority="high">
      <img class="repair-after-art" src="${afterArt}" alt="${location.name} restored after the repair}">
      ${isCafeFloorRepair ? '<span class="repair-floor" aria-hidden="true"></span>' : ''}
      <span class="repair-weather" aria-hidden="true"></span>
      <div class="repair-film-speech"><small>${helper.name}</small><b></b></div>
      <span class="repair-action-stamp" aria-hidden="true">🌧️</span>
      <div class="repair-frame-label"><small>BEFORE THE REPAIR</small><b>A fresh start</b></div>
      <img class="repair-character" src="${helper.img}" alt="${helper.name} helping rebuild the ${location.name.toLowerCase()}">
    </div>
    <div class="repair-film-steps" aria-label="Scene progress"><span class="active" aria-current="step" aria-label="Before">🌧️</span><span aria-label="At work">🛠️</span><span aria-label="Restored">✨</span></div>
    <div class="repair-copy"><h2>${stage[0]}</h2><div class="deco repair-progress" aria-label="${level} of ${location.decos.length} improvements">${progress}</div><div class="repair-reward">${location.decos[level - 1]} Added · +1⭐</div></div>
    ${floorControls}
    <button class="btn repair-continue" type="button">Next scene ›</button>
  </div>`, modal => {
    modal.classList.add('restoration-modal', 'keep-open');
    const scene = modal.querySelector('.repair-scene');
    const stepLabels = [...modal.querySelectorAll('.repair-film-steps span')];
    const skipButton = modal.querySelector('.repair-skip');
    const continueButton = modal.querySelector('.repair-continue');
    const frameLabel = modal.querySelector('.repair-frame-label');
    const speech = modal.querySelector('.repair-film-speech b');
    let beat = 0;
    let beatTimer = 0;

    const setBeat = nextBeat => {
      beat = Math.max(0, Math.min(2, nextBeat));
      scene.dataset.beat = String(beat);
      scene.querySelector('.repair-action-stamp').textContent = frameIcons[beat];
      frameLabel.querySelector('small').textContent = frameNames[beat];
      frameLabel.querySelector('b').textContent = frameTitles[beat];
      speech.textContent = film.words[beat];
      stepLabels.forEach((label, index) => {
        label.classList.toggle('active', index === beat);
        if (index === beat) label.setAttribute('aria-current', 'step');
        else label.removeAttribute('aria-current');
      });
      skipButton.hidden = beat === 2;
      continueButton.textContent = beat === 2 ? 'Back to the harbor' : 'Next scene ›';
    };
    const scheduleNextBeat = () => {
      window.clearTimeout(beatTimer);
      if (beat < 2) beatTimer = window.setTimeout(() => {
        setBeat(beat + 1);
        scheduleNextBeat();
      }, 1850);
    };

    bindCafeFloorChoices(modal);
    skipButton.onclick = () => {
      window.clearTimeout(beatTimer);
      setBeat(2);
    };
    continueButton.onclick = () => {
      if (beat < 2) {
        setBeat(beat + 1);
        scheduleNextBeat();
        return;
      }
      window.clearTimeout(beatTimer);
      modal.remove();
      render();
      advanceStory();
    };
    setBeat(0);
    scheduleNextBeat();
  });
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

function showLocations() {
  const rows = LOCATIONS.map(location => {
    const level = Math.min(location.decos.length, Number(state.levels[location.id]) || 0);
    const done = level >= location.decos.length;
    const unlocked = isLocationUnlocked(location);
    const decorations = location.decos.map((emoji, index) => `<span class="${index < level ? 'built' : 'locked-deco'}">${emoji}</span>`).join('');
    const nextStage = RESTORATION_STAGES[location.id]?.[level];
    const floorButton = location.id === 'cafe' && level >= 4 ? `<button class="btn floor-customize-trigger" type="button" data-floor-customize>🎨 ${getCafeFloor().name} floor</button>` : '';
    const nextLabel = nextStage?.[0] || 'All improvements complete';
    const status = !unlocked ? `Opens after Chapter ${location.unlockChapter}` : done ? 'Fully restored · all eight improvements complete.' : `Next: ${nextLabel} · +1⭐`;
    const action = !unlocked ? `<span class="location-lock">🔒 Chapter ${location.unlockChapter}</span>` : done ? '<span class="built-check">✅</span>' : `<button class="btn upgrade-button ${state.coins < upgradeCost(location) ? 'off' : ''}" data-loc="${location.id}" aria-label="${nextLabel} for ${upgradeCost(location)} coins">${upgradeCost(location)}🪙</button>`;
    return `<div class="loc ${unlocked ? '' : 'location-locked'}"><div class="loc-details"><b>${location.icon} ${location.name} · ${level}/${location.decos.length} improvements</b><div class="deco">${decorations}</div><small>${status}</small>${floorButton}</div>${action}</div>`;
  }).join('');
  const totalRestorations = totalRestorationCount();
  const completedChapters = Math.min(state.chapter, CHAPTERS.length);
  showModal(`<div class="sheet-heading"><div><div class="story-kicker">REBUILDING IS PART OF THE STORY</div><h2>Restore the harbor</h2></div><button class="btn close-sheet" aria-label="Close">✕</button></div><div class="restoration-progress"><span>Waterfront restored</span><b>${restoredCount()} / ${totalRestorations}</b><div class="restoration-track"><i style="width:${(restoredCount() / totalRestorations) * 100}%"></i></div></div><div class="campaign-explainer"><b>Your campaign goal</b><p>Spend coins to restore ten harbor landmarks, from Mae’s café and Theo’s pier to the lighthouse, archive and festival plaza. Every improvement earns 1⭐ and reveals a short illustrated scene. Discover all ${CHAPTERS.length} chapters and complete all ${totalRestorations} improvements for the epilogue; boards remain open for free play.</p><small>Story chapters found: ${completedChapters}/${CHAPTERS.length} · No timer or fail state.</small></div><div class="map-heading">HARBOR RESTORATION MAP · 10 LANDMARKS</div>${rows}`, modal => {
    modal.querySelector('.close-sheet').onclick = () => modal.remove();
    modal.querySelectorAll('[data-floor-customize]').forEach(button => {
      button.onclick = () => {
        modal.remove();
        showCafeFloorCustomizer();
      };
    });
    modal.querySelectorAll('[data-loc]').forEach(button => {
      button.onclick = () => {
        const location = LOCATIONS.find(entry => entry.id === button.dataset.loc);
        const cost = upgradeCost(location);
        if (!location || !isLocationUnlocked(location) || state.levels[location.id] >= location.decos.length || state.coins < cost) return;
        state.coins -= cost;
        state.levels[location.id] += 1;
        const newLevel = state.levels[location.id];
        state.starsToward += 1;
        state.stats.restorations = (state.stats.restorations || 0) + 1;
        updateDailyProgress('restorations');
        grantXP(20);
        checkAchievements();
        playPop();
        modal.remove();
        showFloat(`${location.name} restored! +1⭐`);
        render();
        showRestorationMoment(location, newLevel);
      };
    });
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
  const chapters = CHAPTERS.map((chapter, index) => {
    const unlocked = index < state.chapter;
    const hint = unlocked ? 'Discovered · tap Replay to read this scene again' : index === state.chapter ? `Next chapter · earn ${remainingStars} more ⭐ from orders or repairs` : 'Locked · chapters unlock in order';
    return `<div class="loc story-row"><div><b>${unlocked ? '📖' : '🔒'} ${index + 1}. ${chapter.title}</b><small>${hint}</small></div>${unlocked ? `<button class="btn replay-button" data-ch="${index}">Replay</button>` : ''}</div>`;
  }).join('');
  const campaignFinished = storyComplete && restored >= totalRestorations;
  const nextGoal = campaignFinished
    ? `The campaign is finished: all ${CHAPTERS.length} chapters and all ${totalRestorations} improvements are complete. The epilogue has played; your boards stay open for relaxed free play.`
    : !storyComplete
      ? `Earn ${remainingStars} more ⭐ to unlock “${CHAPTERS[state.chapter].title}.” Deliver townsfolk requests or buy a harbor repair; both give story stars. You can work on the ${totalRestorations - restored} remaining improvements along the way.`
      : `The mystery is solved, but the campaign is not finished yet. Restore ${totalRestorations - restored} more improvements${nextLocation ? `; ${nextLocation.name} is next` : ''} to unlock the epilogue.`;
  showModal(`<div class="sheet-heading"><div><div class="story-kicker">A HARBOR TOWN MYSTERY</div><h2>The Harbor Journal</h2></div><button class="btn close-sheet" aria-label="Close">✕</button></div><div class="journal-goals"><div class="journal-goal"><div class="goal-heading"><b>📖 Mystery chapters</b><strong>${Math.min(state.chapter, CHAPTERS.length)} / ${CHAPTERS.length}</strong></div><div class="restoration-track"><i style="width:${chapterProgress * 100}%"></i></div><small>${storyComplete ? 'Mystery solved · replay any chapter below' : `${remainingStars} more ⭐ to open the next chapter`}</small></div><div class="journal-goal"><div class="goal-heading"><b>🛠️ Harbor repairs</b><strong>${restored} / ${totalRestorations}</strong></div><div class="restoration-track"><i style="width:${restorationProgress * 100}%"></i></div><small>${storyComplete && restored < totalRestorations ? `${totalRestorations - restored} more improvements until the epilogue` : storyComplete ? 'All places rebuilt · campaign finished' : 'Spend coins in Restore; each repair gives 1⭐'}</small></div></div><div class="journal-next"><b>${campaignFinished ? 'CAMPAIGN COMPLETE · FREE PLAY' : storyComplete ? 'WHAT ENDS THE CAMPAIGN?' : 'WHAT TO DO NEXT'}</b><p>${nextGoal}</p></div><p>There is no timer, life limit, or way to fail. Energy only pauses new items while it refills. Choose your own pace; your progress stays saved.</p><div class="story-list-heading">${Math.min(state.chapter, CHAPTERS.length)} of ${CHAPTERS.length} chapters discovered</div>${chapters}`, modal => {
    modal.querySelector('.close-sheet').onclick = () => modal.remove();
    modal.querySelectorAll('[data-ch]').forEach(button => {
      button.onclick = () => {
        modal.remove();
        showDialogue(CHAPTERS[Number(button.dataset.ch)]);
      };
    });
  });
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
  showModal(`<div class="sheet-heading"><div><div class="story-kicker">HARBOR MENU</div><h2>A few more things</h2></div><button class="btn close-sheet" aria-label="Close">✕</button></div><div class="quick-menu"><button class="btn menu-board">${boardLabel}</button><button class="btn menu-collection">🧺 Items & storage</button><button class="btn menu-goals">🧭 Daily goals & rewards</button><button class="btn menu-gift">🎁 Daily harbor gift</button><button class="btn menu-guide">❔ How to play</button></div>`, modal => {
    modal.querySelector('.close-sheet').onclick = () => modal.remove();
    modal.querySelector('.menu-board').onclick = () => {
      modal.remove();
      currentBoardKey = currentBoardKey === 'main' ? 'event' : 'main';
      selectedIndex = -1;
      feedbackMessage = currentBoardKey === 'event' ? 'Optional picnic board: merge seaside bites for bonus milestone rewards. Your energy is shared.' : 'Back to the harbor town: deliver requests and restore places to move the campaign forward.';
      render();
    };
    modal.querySelector('.menu-collection').onclick = () => { modal.remove(); showCollection('items'); };
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
    return `<button class="task neighbor-card ${ready ? 'task-ready' : ''}" data-task="${index}" style="--neighbor-accent:${character.accent}" aria-label="Review ${character.name}'s request for ${item.name}${quantity > 1 ? `, quantity ${quantity}` : ''}${stageCount > 1 ? `, delivery ${task.stage + 1} of ${stageCount}` : ''}. Rewards: ${task.coins} coins, ${task.energy} energy, ${task.stars} stars."><img class="neighbor-portrait" src="${character.img}" alt=""><span class="neighbor-reward"><span>🪙</span><b>+${task.coins}</b></span><span class="neighbor-bonus">${task.energy ? `⚡ ${task.energy}` : ''}${task.stars ? ` ⭐ ${task.stars}` : ''}</span><span class="neighbor-plate"><span class="neighbor-item">${item.icon}${quantity > 1 ? `<i>×${quantity}</i>` : ''}</span><span class="neighbor-ready-mark">${ready ? '✓' : ''}</span></span></button>`;
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
    const item = FAMILIES[cell.fam]?.tiers[cell.tier - 1];
    content = `<span class="cell-icon">${item?.icon || '◇'}</span><span class="tier">${cell.tier}</span>${cell.locked ? '<span class="lock-mark" aria-hidden="true">🔒</span>' : ''}${cell.covered ? '<span class="webbing" aria-hidden="true"></span>' : ''}`;
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
  const selectedCell = selectedIndex >= 0 ? cells[selectedIndex] : null;
  const selectedItem = selectedCell && !selectedCell.gen ? FAMILIES[selectedCell.fam]?.tiers[selectedCell.tier - 1] : null;
  const selectedGenerator = selectedCell?.gen ? generatorDefinition(selectedCell.gen) : null;
  const footerIcon = selectedItem?.icon || selectedGenerator?.icon || (currentBoardKey === 'event' ? '🏖️' : '🧺');
  const footerTitle = selectedItem ? `${selectedItem.name} (Lvl ${selectedCell.tier})` : selectedGenerator ? `${selectedGenerator.name} · Lv ${generatorLevel(selectedCell.gen)}` : currentBoardKey === 'event' ? 'Seaside picnic' : 'Harbor board';
  const footerDescription = selectedItem
    ? selectedCell.tier < (FAMILIES[selectedCell.fam]?.tiers.length || 8) ? 'MERGE to reach its next level.' : 'TOP TIER · READY FOR A NEIGHBOR REQUEST.'
    : selectedGenerator ? 'Tap to make an item with 1⚡.' : feedbackMessage;
  const canQuickSell = Boolean(selectedCell && !selectedCell.gen && !selectedCell.covered && !selectedCell.locked);
  container.innerHTML = `<div class="app">
    <header class="topline">
      <div class="profile-badge" aria-label="${chapterBadgeLabel}" title="${chapterBadgeLabel}"><img src="${CHARS.iris.img}" alt=""><b>${chapterBadge}</b></div>
      <div class="resource-pills"><div class="resource-pill energy-pill" title="Energy regenerates over time · ${maxEnergy()} maximum"><span>⚡</span><b>${state.energy}/${maxEnergy()}</b></div><div class="resource-pill coin-pill" title="Coins fund harbor improvements"><span>🪙</span><b>${state.coins}</b></div><div class="resource-pill gem-pill" title="Pearls"><span>💎</span><b>${state.pearls}</b></div></div>
      <div class="top-actions"><button class="btn sound-button" id="mute" aria-label="Toggle sound">${muted ? '🔇' : '🔊'}</button></div>
    </header>
    <section class="orders-section ${currentBoardKey === 'main' ? 'neighbor-section' : 'event-section'}"><div class="section-heading"><b>${currentBoardKey === 'event' ? 'PICNIC REWARDS' : 'HARBOR NEIGHBORS'}</b><small>${currentBoardKey === 'event' ? 'Optional seaside side board' : 'Swipe for all neighbors'}${currentBoardKey === 'main' ? '<button class="story-link" id="open-story">Read story <span>›</span></button>' : ''}</small></div><div class="tasks ${currentBoardKey === 'event' ? 'event-tasks' : 'neighbor-rail'}" ${currentBoardKey === 'main' ? `role="region" tabindex="0" aria-label="Neighbor requests. Scroll horizontally to browse all ${Object.keys(CHARS).length} neighbors."` : ''}>${renderTasks()}</div></section>
    <div class="board ${currentBoardKey === 'event' ? 'event' : ''}" role="grid" aria-label="${currentBoardKey === 'main' ? 'Harbor town' : 'Seaside picnic'} merge board, ${BOARD_COLS} columns by ${BOARD_ROWS} rows">${cells.map((cell, index) => renderCell(cell, index, -1)).join('')}</div>
    <div class="board-footer"><span class="footer-item-icon" aria-hidden="true">${footerIcon}</span><div class="info item-info" aria-live="polite"><div class="item-info-copy"><b class="item-info-title">${footerTitle}</b><small class="item-info-description">${footerDescription}</small></div><button class="item-info-button" id="item-details" type="button" aria-label="Open item details" ${selectedItem ? '' : 'disabled'}>i</button></div><button class="btn quick-sell" id="quick-sell" aria-label="Sell selected item" title="Sell selected item" ${canQuickSell ? '' : 'disabled'}>🗑️</button></div>
    <nav class="nav" aria-label="Game menu"><button class="btn" id="story-nav">📖 <span>Journal</span></button><button class="btn" id="upgrade-nav">🛠️ <span>Restore</span></button><button class="btn" id="more-nav">☰ <span>More</span></button></nav>
  </div>`;
  const milestones = container.querySelector('.event-milestones');
  if (milestones) milestones.scrollLeft = eventScroll;
  const neighborRail = container.querySelector('.neighbor-rail');
  if (neighborRail) neighborRail.scrollLeft = neighborScroll;
  container.querySelectorAll('[data-task]').forEach(button => {
    button.onclick = () => {
      if (tutorialStep !== null && tutorialStep !== 3) return;
      if (tutorialStep === 3) finishTutorial();
      showTask(Number(button.dataset.task));
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
  container.querySelector('#story-nav').onclick = showStory;
  container.querySelector('#open-story')?.addEventListener('click', showStory);
  container.querySelector('#upgrade-nav').onclick = showLocations;
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
