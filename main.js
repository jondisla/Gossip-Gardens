// Harbor Whispers — a cozy, original harbor-town merge game.
const FAMILIES = {
  coffee: { name: 'Café bakery', icon: '🥐', items: ['🫘', '☕', '🥐', '🍞', '🥪', '🍰'] },
  flower: { name: 'Market produce', icon: '🧺', items: ['🥕', '🍅', '🥬', '🥑', '🥗', '🍲'] },
  fish: { name: 'Harbor seafood', icon: '🎣', items: ['🦐', '🐟', '🍣', '🍤', '🦞', '🦀'] },
  office: { name: 'Sweet counter', icon: '🧁', items: ['🥚', '🧈', '🥣', '🍪', '🧁', '🎂'] },
  shell: { name: 'Seaside bites', icon: '🧺', items: ['🦪', '🍤', '🍣', '🍥', '🦀', '🍲'] }
};
const MAIN_FAMILIES = ['coffee', 'flower', 'fish', 'office'];
const GEN_CHARGES = 12;
const GEN_COOLDOWN_MS = 20_000;
const MAX_ENERGY = 75;
const ENERGY_TICK_MS = 100_000;
const BOARD_COLS = 7;
const BOARD_ROWS = 8;
const BOARD_SIZE = BOARD_COLS * BOARD_ROWS;
const SAVE_KEY = 'harbor-whispers-v1';
const CHAPTER_STAR_GOALS = [6, 8, 10, 12, 14, 16];
const EVENT_MILESTONES = [
  { points: 10, reward: '30🪙', coins: 30, energy: 0, stars: 0 },
  { points: 30, reward: '55🪙 + 3⚡', coins: 55, energy: 3, stars: 0 },
  { points: 65, reward: '100🪙 + 1⭐', coins: 100, energy: 0, stars: 1 },
  { points: 120, reward: '170🪙 + 8⚡', coins: 170, energy: 8, stars: 0 },
  { points: 190, reward: '260🪙 + 2⭐', coins: 260, energy: 0, stars: 2 }
];
const CHARS = {
  mae: { name: 'Mae', img: 'assets/char-mae.webp' },
  theo: { name: 'Theo', img: 'assets/char-theo.webp' },
  iris: { name: 'Iris', img: 'assets/char-iris.webp' }
};
const CHAPTERS = [
  { title: 'The Salt-Stained Ledger', lines: [['mae', 'That storm took half the café roof. I found this old ledger under the flour bins while we were cleaning up.'], ['iris', 'The handwriting stops on the night the harbor bell went silent. Someone wrote “bring the light home” in the margin.'], ['theo', 'The old signal lamp is still in the lighthouse storehouse. If we mend the pier, I can get it back safely.'], ['mae', 'Then we rebuild together. And, Iris? You are writing all of this down.']] },
  { title: 'Ink on the Pier', lines: [['iris', 'The ledger belonged to Elian Vale, the first keeper of the harbor light. I found his name on a crate by the pier.'], ['theo', 'He kept a journal here. The last page is missing, but the ink on this rope matches the note in Mae’s book.'], ['mae', 'A mystery, a storm, and a very handsome handwriting sample. This town does know how to keep me busy.']] },
  { title: 'The Unsent Letter', lines: [['theo', 'I found an envelope behind a loose board at the Gazette. It is addressed to “the people who call this harbor home.”'], ['iris', 'It was never meant for one person. Elian wanted the whole town to keep the light burning.'], ['mae', 'Well, we are very good at showing up for each other. Let us give him a proper answer.']] },
  { title: 'Roses at Dawn', lines: [['theo', 'I have one more confession before the Gazette prints this. The roses at dawn were for you, Iris. I read every column you write.'], ['iris', 'I wondered why you kept asking me to meet you on the pier. I thought you were hiding a clue.'], ['mae', 'Both things can be true, dear. I am already saving a table for the two of you.']] },
  { title: 'The Bell’s Last Note', lines: [['iris', 'Elian’s last journal page was tucked inside the bell. The note says the lamp was a promise: “No one should have to find their way home alone.”'], ['theo', 'The pier is steady again. I can carry the lamp to the lighthouse at first light.'], ['mae', 'And I will make enough pastries to feed every person who comes to help. That is how a harbor works.']] },
  { title: 'A Harbor for All', lines: [['theo', 'The light is burning again. I thought the whole town would come to watch, but I did not expect this many people.'], ['iris', 'Elian’s letter says the harbor belongs to whoever makes a home here. I think we have answered him.'], ['mae', 'The café is open, the garden is blooming, and the pier is full of friends. This is the best story I have ever served.'], ['iris', 'Then let us leave the Gazette open on the counter. There will always be another story in this town.']] }
];
const REQUEST_NOTES = {
  mae: ['I am making a welcome basket for the neighbors helping with the old café. A good harbor starts with a shared table.', 'I found another line in Elian’s ledger. Bring me a treat and I will tell you what it says.', 'The repair crew has been out since dawn. Let us make sure nobody works through lunch.'],
  theo: ['I am sorting old supplies by the pier. This mark matches something I saw on the lighthouse door.', 'The boards are finally holding. I owe the crew a proper thank-you, not just a wave from the boat.', 'Could you bring this down to the pier? I found a clue tucked behind the old mooring post.'],
  iris: ['I am piecing together the story of the silent harbor bell. Every little detail helps.', 'The Gazette needs a cheerful headline for once. I have a feeling this town is about to give me one.', 'I found a note addressed to everyone in town. Help me finish the story before the tide turns.']
};
const LOCATIONS = [
  { id: 'cafe', name: 'Café', icon: '☕', decos: ['🪑', '☂️', '🪴', '🎐', '✨'] },
  { id: 'pier', name: 'Pier', icon: '⚓', decos: ['🪵', '⛵', '🏮', '🐦', '🌅'] },
  { id: 'garden', name: 'Garden', icon: '🌷', decos: ['🌼', '⛲', '🦋', '🌳', '🌈'] },
  { id: 'office', name: 'Gazette', icon: '📰', decos: ['🖨️', '🪟', '📚', '☕', '🏅'] }
];
const RESTORATION_STAGES = {
  cafe: [
    ['Clear the storm damage', 'Mae and the neighbors sweep saltwater from the floor and salvage what they can from the battered café.'],
    ['Patch the roof', 'Fresh rafters go up where the storm tore the roof away. At last, the ovens can stay dry.'],
    ['Fit the windows', 'Warm light returns to the front windows, and Mae can see the harbor from her counter again.'],
    ['Set the tables', 'The crew carries in sturdy tables. The first pot of coffee is already brewing for the helpers.'],
    ['Open the café doors', 'The café is whole again. Mae sets out a welcome feast for everyone who helped bring it back.']
  ],
  pier: [
    ['Replace the broken boards', 'Theo and the crew pull away splintered planks and lay a safe path over the water.'],
    ['Secure the moorings', 'New ropes and a small sail make it possible for boats to return to the pier.'],
    ['Raise a harbor lantern', 'A lantern marks the way through the evening fog, just as the old keeper once did.'],
    ['Welcome the seabirds', 'The pier is busy again, and a little bird has claimed the new railing as its lookout.'],
    ['Watch the sunrise together', 'The pier is steady and bright. The whole town gathers here to greet the morning.']
  ],
  garden: [
    ['Clear the tangled beds', 'Neighbors pull out storm-torn branches and uncover the garden paths beneath them.'],
    ['Bring back the flowers', 'Fresh blooms take root, and the first patch of color brightens the harbor road.'],
    ['Make a home for butterflies', 'Butterflies return to the garden as the restored beds begin to flourish.'],
    ['Grow a shady corner', 'A young tree gives the volunteers a cool place to rest between repairs.'],
    ['Celebrate in the garden', 'The garden is in bloom, ready for a town-wide celebration beneath the rainbow.']
  ],
  office: [
    ['Clear the Gazette desk', 'Iris rescues the typewriter and dries the pages scattered by the storm.'],
    ['Repair the newsroom window', 'A new window keeps the sea breeze in and the rain off the next edition.'],
    ['Restore the story shelves', 'Elian’s rescued papers finally have a safe home beside the Gazette archives.'],
    ['Brew a newsroom coffee', 'The Gazette becomes the harbor’s coziest place to swap clues and fresh headlines.'],
    ['Print the harbor’s story', 'The final edition honors everyone who helped bring the light—and the town—back home.']
  ]
};
const RESTORATION_FILMS = {
  cafe: {
    beforeArt: 'assets/restore-cafe-before.webp', art: 'assets/restore-cafe-scene.webp', helper: 'mae', accent: '#ee9463',
    actions: ['🧹', '🪜', '🪟', '🪑', '🥐'],
    before: ['Saltwater and storm debris still cover Mae’s café floor.', 'A ragged gap in the roof lets rain fall over the ovens.', 'Empty window frames leave the counter open to the sea breeze.', 'The café has walls again, but nowhere for neighbors to gather.', 'The room is nearly ready; its doors have not welcomed anyone back.'],
    after: ['Mae saves a dry corner for the neighbors.', 'Fresh rafters hold firm above the kitchen.', 'Sunlight and harbor views return to Mae’s counter.', 'Neighbors can sit down over a shared pot of coffee.', 'Mae opens wide the doors for a welcome feast.'],
    words: ['We can make this feel like home again.', 'One little repair at a time!', 'I can almost smell the first fresh pastries.']
  },
  pier: {
    beforeArt: 'assets/restore-pier-before.webp', art: 'assets/restore-pier-scene.webp', helper: 'theo', accent: '#55b9bd',
    actions: ['🪵', '🪢', '🏮', '🐦', '🌅'],
    before: ['Storm waves left broken, uneven planks along Theo’s pier.', 'The boards are sound again, but boats still need safe moorings.', 'Evening fog swallows the pier without its old lantern.', 'The pier is busy again, but the new railing is still waiting.', 'The harbor is waking up. The town has one last sunrise to share.'],
    after: ['A safe path over the water leads back to shore.', 'Boats can tie up safely again.', 'A warm lantern marks a way through the evening fog.', 'A tiny lookout has claimed the new railing.', 'Everyone greets the sun from a pier made whole.'],
    words: ['We’ll make this pier safe again.', 'The tide can’t stop a good crew.', 'Look at that light on the water.']
  },
  garden: {
    beforeArt: 'assets/restore-garden-before.webp', art: 'assets/restore-garden-scene.webp', helper: 'mae', accent: '#8fae66',
    actions: ['🧹', '🌷', '🦋', '🌳', '🌈'],
    before: ['Storm-tangled branches hide the garden paths and beds.', 'The beds are ready for new flowers after a gray season.', 'The first blooms need time before butterflies return.', 'A new garden needs shade as well as color.', 'Flowers are back; now the garden needs a celebration.'],
    after: ['The garden paths emerge from beneath the storm’s tangle.', 'Color returns to the harbor road.', 'Butterflies find their way back to the blooms.', 'Volunteers rest beneath a young shade tree.', 'Neighbors gather beneath a rainbow in the garden.'],
    words: ['There’s always room for one more bloom.', 'A little color changes everything.', 'The whole garden feels alive again.']
  },
  office: {
    beforeArt: 'assets/restore-gazette-before.webp', art: 'assets/restore-gazette-scene.webp', helper: 'iris', accent: '#7f9da9',
    actions: ['📄', '🪟', '📚', '☕', '📰'],
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
  families.forEach((fam, i) => {
    const spot = families.length === 1 ? 28 : [0, 6, 49, 55][i];
    cells[spot] = { gen: fam, charges: GEN_CHARGES, readyAt: 0 };
  });
  if (families.length > 1) {
    cells[18] = { fam: families[2], tier: 1, covered: 1 };
    cells[19] = { fam: families[2], tier: 1 };
    cells[24] = { fam: families[0], tier: 1 };
    cells[25] = { fam: families[0], tier: 1 };
    cells[31] = { fam: families[1], tier: 1 };
    cells[32] = { fam: families[1], tier: 1 };
  }
  return cells;
}

function newState() {
  return {
    coins: 50, energy: 48, stars: 0, chapter: 0, starsToward: 0,
    cafeFloor: 'honey',
    boards: { main: makeBoard(MAIN_FAMILIES), event: makeBoard(['shell']) },
    tasks: [], levels: { cafe: 0, pier: 0, garden: 0, office: 0 },
    eventPoints: 0, eventClaimed: [], dailyClaimedAt: '', introSeen: false,
    tutorialSeen: false, tutorialStarted: false, tutorialStep: 0,
    victorySeen: false, lastTick: Date.now()
  };
}

function taskEnergy(tier) {
  return Math.min(3, Math.floor((Math.max(1, Math.min(6, Number(tier) || 1)) - 1) / 2));
}

function taskCoins(tier) {
  const safeTier = Math.max(1, Math.min(6, Number(tier) || 1));
  return 18 * safeTier * safeTier + 2 * safeTier;
}

function storyStarGoal(chapter) {
  return CHAPTER_STAR_GOALS[Math.min(chapter, CHAPTER_STAR_GOALS.length - 1)];
}

function restoredCount() {
  return LOCATIONS.reduce((total, location) => total + Math.min(location.decos.length, state.levels[location.id] || 0), 0);
}

function totalRestorationCount() {
  return LOCATIONS.reduce((total, location) => total + location.decos.length, 0);
}

function nextRestorationGoal() {
  return LOCATIONS.find(location => (state.levels[location.id] || 0) < location.decos.length) || null;
}

function grantEnergy(amount) {
  state.energy = Math.min(MAX_ENERGY, Math.max(0, state.energy + amount));
}

function loadState() {
  try {
    const saved = JSON.parse(localStorage.getItem(SAVE_KEY));
    if (!saved || typeof saved !== 'object') return null;
    const fresh = newState();
    const boards = { ...fresh.boards, ...(saved.boards || {}) };
    for (const key of Object.keys(boards)) {
      const previous = Array.isArray(boards[key]) ? boards[key] : [];
      const resized = Array.from({ length: BOARD_SIZE }, (_, index) => previous[index] || null);
      if (previous.length === 49) {
        if (resized[42]?.gen && !resized[49]) {
          resized[49] = resized[42];
          resized[42] = null;
        }
        if (resized[48]?.gen && !resized[55]) {
          resized[55] = resized[48];
          resized[48] = null;
        }
      }
      boards[key] = resized;
    }
    return {
      ...fresh,
      ...saved,
      boards,
      tasks: Array.isArray(saved.tasks) ? saved.tasks.map(task => ({
        ...task,
        coins: taskCoins(task?.tier),
        energy: taskEnergy(task?.tier),
        note: task?.note || REQUEST_NOTES[task?.who]?.[0] || REQUEST_NOTES.mae[0]
      })) : [],
      levels: { ...fresh.levels, ...(saved.levels || {}) },
      cafeFloor: CAFE_FLOORS.some(floor => floor.id === saved.cafeFloor) ? saved.cafeFloor : fresh.cafeFloor,
      eventClaimed: Array.isArray(saved.eventClaimed) ? saved.eventClaimed : [],
      energy: Math.min(MAX_ENERGY, Math.max(0, Number(saved.energy) || 0)),
      victorySeen: Boolean(saved.victorySeen),
      lastTick: Number(saved.lastTick) || Date.now()
    };
  } catch (error) {
    return null;
  }
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

function findItem(family, tier) {
  return mainBoard().findIndex(cell => cell && !cell.gen && !cell.covered && cell.fam === family && cell.tier === tier);
}

function makeTask() {
  const depth = Math.min(6, 1 + Math.floor((state.stars + state.chapter * 3) / 6));
  const family = MAIN_FAMILIES[Math.floor(Math.random() * MAIN_FAMILIES.length)];
  const tier = 1 + Math.floor(Math.random() * depth);
  const characters = Object.keys(CHARS);
  const who = characters[Math.floor(Math.random() * characters.length)];
  const notes = REQUEST_NOTES[who];
  return {
    fam: family, tier, who,
    coins: taskCoins(tier),
    energy: taskEnergy(tier),
    stars: tier >= 3 ? 2 : 1,
    note: notes[Math.floor(Math.random() * notes.length)]
  };
}

function fillTasks() {
  while (state.tasks.length < 4) state.tasks.push(makeTask());
}

function advanceStory() {
  const unlocked = [];
  while (state.chapter < CHAPTERS.length && state.starsToward >= storyStarGoal(state.chapter)) {
    state.starsToward -= storyStarGoal(state.chapter);
    unlocked.push(CHAPTERS[state.chapter]);
    state.chapter += 1;
    state.coins += 45;
  }
  if (unlocked.length) dialogueQueue.push(...unlocked);
  saveState();
  openNextDialogue();
}

function completeTask(index) {
  const task = state.tasks[index];
  if (!task) return;
  const itemIndex = findItem(task.fam, task.tier);
  if (itemIndex < 0) return;
  mainBoard()[itemIndex] = null;
  state.coins += task.coins;
  grantEnergy(task.energy);
  state.stars += task.stars;
  state.starsToward += task.stars;
  state.tasks.splice(index, 1);
  fillTasks();
  playPop();
  showFloat(`+${task.coins}🪙${task.energy ? `  +${task.energy}⚡` : ''}  +${task.stars}⭐`);
  render();
  advanceStory();
}

function showTask(index) {
  const task = state.tasks[index];
  if (!task) return;
  const character = CHARS[task.who];
  const family = FAMILIES[task.fam];
  const ready = findItem(task.fam, task.tier) >= 0;
  const item = family.items[task.tier - 1];
  const modal = showModal(`<div class="task-sheet" style="--quest-accent:${task.who === 'theo' ? '#56bdb6' : task.who === 'mae' ? '#f2a45d' : '#e87bac'}"><div class="task-sheet-head"><div><small>HARBOR REQUEST</small><h2>A little favor</h2></div><button class="btn quest-close" aria-label="Close">✕</button></div><div class="quest-letter"><img src="${character.img}" alt="${character.name}"><div><b>${character.name}</b><span>is hoping for…</span><strong>${item}</strong><p>“${task.note || 'Could you find me one? I’ll make it worth your while!'}”</p></div></div><div class="quest-rewards"><div class="reward-heading"><span>✦</span><b>REWARDS</b><span>✦</span></div><div class="reward-items"><span>🪙 <b>${task.coins}</b></span><span>⚡ <b>${task.energy}</b></span><span>⭐ <b>${task.stars}</b></span></div></div><div class="quest-status">${ready ? 'Ready to deliver!' : `Find a ${family.name.toLowerCase()} item · Tier ${task.tier}`}</div><button class="btn quest-deliver ${ready ? 'ready' : ''}" ${ready ? '' : 'disabled'}>${ready ? `Deliver ${item}  ·  ${task.coins} 🪙` : 'Keep merging to find it'}</button></div>`, modal => {
    modal.classList.add('task-modal');
    modal.querySelector('.quest-close').onclick = () => modal.remove();
    modal.querySelector('.quest-deliver').onclick = () => {
      if (!ready) return;
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
      ['mae', 'Look at us! The café is warm again, the pier is safe, the garden is in bloom, and the Gazette is full of good news.'],
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

function tapGenerator(index) {
  const generator = board()[index];
  if (!generator || !generator.gen) return;
  const seconds = generatorTimeLeft(generator);
  if (seconds > 0) {
    feedbackMessage = `Generator recharging — ready in ${seconds}s.`;
    render();
    return;
  }
  if (state.energy <= 0) {
    feedbackMessage = 'You are out of energy. Fill an order or claim your daily harbor gift!';
    render();
    return;
  }
  const empty = nearestEmpty(index);
  if (empty < 0) {
    feedbackMessage = 'The board is full. Merge, move, or deliver an item first!';
    render();
    return;
  }
  state.energy -= 1;
  board()[empty] = { fam: generator.gen, tier: 1 };
  generator.charges -= 1;
  if (generator.charges <= 0) {
    generator.charges = GEN_CHARGES;
    generator.readyAt = Date.now() + GEN_COOLDOWN_MS;
  }
  feedbackMessage = 'Fresh item! Merge matching treats to build the order you need.';
  beep(500);
  render(empty);
  if (tutorialStep === 0) advanceTutorial(1);
}

function moveOrMerge(from, to) {
  if (tutorialStep !== null && (tutorialStep !== 1 || !tutorialMergeTargets || !tutorialMergeTargets.includes(from) || !tutorialMergeTargets.includes(to))) return false;
  const cells = board();
  const first = cells[from];
  const second = cells[to];
  if (from === to || !first || first.gen) return false;
  if (first.covered) {
    feedbackMessage = 'That treat is bundled under straw. Merge an uncovered match into it to uncover it!';
    render();
    return true;
  }
  if (second?.gen) {
    feedbackMessage = 'Generators stay in place. Drop items on a free space or a match.';
    render();
    return true;
  }
  if (second && second.fam === first.fam && second.tier === first.tier && first.tier < FAMILIES[first.fam].items.length) {
    cells[from] = null;
    cells[to] = { fam: first.fam, tier: first.tier + 1 };
    feedbackMessage = `${FAMILIES[first.fam].name}: ${FAMILIES[first.fam].items[first.tier - 1]} → ${FAMILIES[first.fam].items[first.tier]}`;
    playPop();
    if (first.fam === 'shell') {
      state.eventPoints += first.tier;
      showFloat(`Seaside points +${first.tier}`);
    }
    if (Math.random() < 0.08) {
      grantEnergy(1);
      showFloat('+1⚡ bonus');
    }
    if (tutorialStep === 1) advanceTutorial(2);
    render(to);
    return true;
  }
  if (second?.covered) {
    feedbackMessage = 'Match the same treat to clear the straw and uncover what is underneath.';
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
  feedbackMessage = 'Items moved. Match two of the same family and tier to merge.';
  render();
  return true;
}

function describeItem(cell) {
  if (cell.gen) {
    const seconds = generatorTimeLeft(cell);
    return `${FAMILIES[cell.gen].icon} ${FAMILIES[cell.gen].name} generator · ${cell.charges}/${GEN_CHARGES} drops${seconds ? ` · ready in ${seconds}s` : ' · ready!'}`;
  }
  const family = FAMILIES[cell.fam];
  const item = family.items[cell.tier - 1];
  return `${cell.covered ? 'Straw-covered ' : ''}${item} · ${family.name}, tier ${cell.tier}/${family.items.length}${cell.covered ? ' · merge a matching item to uncover it' : ''}`;
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
  if (item) {
    feedbackMessage = describeItem(item);
    const info = document.querySelector('.info');
    if (info) info.textContent = feedbackMessage;
  }
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

function showDialogue(chapter, onClose = () => {}) {
  let lineIndex = 0;
  let closed = false;
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
    const speakerColor = speaker === 'mae' ? '#ed995c' : speaker === 'theo' ? '#57b8ba' : '#e879aa';
    const progress = ((lineIndex + 1) / chapter.lines.length) * 100;
    modal.innerHTML = `<div class="story-backdrop"></div><div class="story-topline"><div><small>HARBOR JOURNAL</small><b>${chapter.title}</b></div><button class="story-skip" aria-label="Skip story">▶▶</button></div><button class="story-advance ${side} speaker-${speaker}" data-speaker="${speaker}" style="--speaker-accent:${speakerColor}" aria-label="Continue story"><span class="story-character"><img src="${character.img}" alt=""><b>${character.name}</b></span><span class="story-bubble"><span>${text}</span></span></button><div class="story-bottom"><div class="story-progress-track"><span style="width:${progress}%"></span></div><b>Tap anywhere to continue</b><small>${lineIndex + 1} / ${chapter.lines.length}</small></div>`;
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
  showModal(`<div class="sheet-heading"><div><div class="story-kicker">YOUR HARBOR, YOUR PACE</div><h2>How to play</h2></div><button class="btn close-sheet" aria-label="Close">✕</button></div><div class="guide-section"><b>1 · Make and merge</b><p>Tap a generator to spend 1⚡. Merge two matching items to build the treats needed for a request. Drag a match together, or tap each item in turn.</p></div><div class="guide-section"><b>2 · Help neighbors and rebuild</b><p>Deliver a requested item for coins and ⭐. Spend coins in <b>Restore</b> to repair the storm-damaged café, pier, garden, and Gazette. Orders and repairs both unlock the six story chapters.</p></div><div class="guide-section"><b>3 · Know when the campaign ends</b><p>Find all six chapters <em>and</em> finish all 20 harbor repairs to unlock the epilogue. After that, the story campaign is complete and you can keep merging in free play.</p></div><div class="guide-section guide-calm"><b>No fail state</b><p>No lives, countdown, or losing screen. Energy refills over time; you can pause and come back whenever you like. Your progress is saved on this device.</p></div><div class="guide-actions"><button class="btn primary replay-guide">Replay the first-time guide</button><button class="btn fresh-save">Start a new harbor…</button></div>`, modal => {
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

function showItemTree() {
  const rows = Object.entries(FAMILIES).map(([key, family]) => `<section class="tree-family"><div class="tree-title"><span>${family.icon}</span><b>${family.name}</b><small>${key === 'shell' ? 'Event generator' : 'Board generator'}</small></div><div class="tree-chain">${family.items.map((item, index) => `<div class="tree-item"><span>${item}</span><small>T${index + 1}</small></div>`).join('<span class="tree-arrow">›</span>')}</div></section>`).join('');
  showModal(`<div class="sheet-heading"><div><div class="story-kicker">MERGE COLLECTION</div><h2>Item guide</h2></div><button class="btn close-sheet" aria-label="Close">✕</button></div><p>Make two of the same family and tier to discover the next item.</p>${rows}`, modal => {
    modal.querySelector('.close-sheet').onclick = () => modal.remove();
  });
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
    const level = Math.min(5, state.levels[location.id] || 0);
    const decoration = level ? location.decos[level - 1] : '·';
    return `<div class="location-chip"><span>${location.icon}</span><span class="location-name">${location.name}</span><span class="location-deco">${decoration}</span><small>Lv ${level}</small></div>`;
  }).join('');
}

function showRestorationMoment(location, level) {
  const stage = RESTORATION_STAGES[location.id][level - 1];
  const film = RESTORATION_FILMS[location.id];
  const helper = CHARS[film.helper];
  const isCafeFloorRepair = location.id === 'cafe' && level === 4;
  const beforeArt = isCafeFloorRepair ? 'assets/restore-cafe-room-before.webp' : film.beforeArt;
  const afterArt = isCafeFloorRepair ? 'assets/restore-cafe-room-after.webp' : film.art;
  const progress = location.decos.map((deco, index) => `<span class="${index < level ? 'built' : 'locked-deco'}">${deco}</span>`).join('');
  const frameNames = ['BEFORE THE REPAIR', 'NEIGHBORS AT WORK', 'THE BIG REVEAL'];
  const frameTitles = ['A fresh start', 'Making it together', 'Look what we made!'];
  const frameIcons = ['🌧️', film.actions[level - 1], location.decos[level - 1]];
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
    const decorations = location.decos.map((emoji, index) => `<span class="${index < level ? 'built' : 'locked-deco'}">${emoji}</span>`).join('');
    const nextStage = RESTORATION_STAGES[location.id][level];
    const floorButton = location.id === 'cafe' && level >= 4 ? `<button class="btn floor-customize-trigger" type="button" data-floor-customize>🎨 ${getCafeFloor().name} floor</button>` : '';
    return `<div class="loc"><div class="loc-details"><b>${location.icon} ${location.name} · ${level}/5 repairs</b><div class="deco">${decorations}</div><small>${done ? 'Fully rebuilt — all five improvements complete.' : `Next: ${nextStage[0]} · +1⭐`}</small>${floorButton}</div>${done ? '<span class="built-check">✅</span>' : `<button class="btn upgrade-button ${state.coins < upgradeCost(location) ? 'off' : ''}" data-loc="${location.id}" aria-label="${nextStage[0]} for ${upgradeCost(location)} coins">${upgradeCost(location)}🪙</button>`}</div>`;
  }).join('');
  const totalRestorations = totalRestorationCount();
  const completedChapters = Math.min(state.chapter, CHAPTERS.length);
  showModal(`<div class="sheet-heading"><div><div class="story-kicker">REBUILDING IS PART OF THE STORY</div><h2>Restore the harbor</h2></div><button class="btn close-sheet" aria-label="Close">✕</button></div><div class="restoration-progress"><span>Waterfront restored</span><b>${restoredCount()} / ${totalRestorations}</b><div class="restoration-track"><i style="width:${(restoredCount() / totalRestorations) * 100}%"></i></div></div><div class="campaign-explainer"><b>Your campaign goal</b><p>Spend coins to repair the storm-damaged café, pier, garden, and Gazette. Each improvement reveals a small rebuild scene and earns 1⭐. Deliver orders or restore places to unlock all six mystery chapters; finish all 20 repairs to see the epilogue. That is the campaign ending—afterward you can keep playing in free play.</p><small>Story chapters found: ${completedChapters}/${CHAPTERS.length} · No timer or fail state.</small></div>${rows}`, modal => {
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
        if (state.coins < cost) return;
        state.coins -= cost;
        state.levels[location.id] += 1;
        const newLevel = state.levels[location.id];
        state.starsToward += 1;
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
    ? 'The campaign is finished: all six chapters and all 20 repairs are complete. The epilogue has played; your boards stay open for relaxed free play.'
    : !storyComplete
      ? `Earn ${remainingStars} more ⭐ to unlock “${CHAPTERS[state.chapter].title}.” Deliver townsfolk requests or buy a harbor repair; both give story stars. You can work on the ${totalRestorations - restored} remaining repairs along the way.`
      : `The mystery is solved, but the campaign is not finished yet. Restore ${totalRestorations - restored} more details${nextLocation ? `; ${nextLocation.name} is next` : ''} to unlock the epilogue.`;
  showModal(`<div class="sheet-heading"><div><div class="story-kicker">A HARBOR TOWN MYSTERY</div><h2>The Harbor Journal</h2></div><button class="btn close-sheet" aria-label="Close">✕</button></div><div class="journal-goals"><div class="journal-goal"><div class="goal-heading"><b>📖 Mystery chapters</b><strong>${Math.min(state.chapter, CHAPTERS.length)} / ${CHAPTERS.length}</strong></div><div class="restoration-track"><i style="width:${chapterProgress * 100}%"></i></div><small>${storyComplete ? 'Mystery solved · replay any chapter below' : `${remainingStars} more ⭐ to open the next chapter`}</small></div><div class="journal-goal"><div class="goal-heading"><b>🛠️ Harbor repairs</b><strong>${restored} / ${totalRestorations}</strong></div><div class="restoration-track"><i style="width:${restorationProgress * 100}%"></i></div><small>${storyComplete && restored < totalRestorations ? `${totalRestorations - restored} more repairs until the epilogue` : storyComplete ? 'All places rebuilt · campaign finished' : 'Spend coins in Restore; each repair gives 1⭐'}</small></div></div><div class="journal-next"><b>${campaignFinished ? 'CAMPAIGN COMPLETE · FREE PLAY' : storyComplete ? 'WHAT ENDS THE CAMPAIGN?' : 'WHAT TO DO NEXT'}</b><p>${nextGoal}</p></div><p>There is no timer, life limit, or way to fail. Energy only pauses new items while it refills. Choose your own pace; your progress stays saved.</p><div class="story-list-heading">${Math.min(state.chapter, CHAPTERS.length)} of ${CHAPTERS.length} chapters discovered</div>${chapters}`, modal => {
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
  const today = new Date().toLocaleDateString('en-CA');
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
  return state.tasks.map((task, index) => {
    const ready = findItem(task.fam, task.tier) >= 0;
    const family = FAMILIES[task.fam];
    return `<button class="task ${ready ? 'task-ready' : ''}" data-task="${index}" aria-label="${CHARS[task.who].name} wants ${family.items[task.tier - 1]}. Rewards: ${task.coins} coins, ${task.energy} energy, ${task.stars} stars."><img src="${CHARS[task.who].img}" alt=""><span class="task-copy"><b>${CHARS[task.who].name} wants</b><span class="need">${family.items[task.tier - 1]}</span><small>🪙 ${task.coins} · ⚡ ${task.energy} · ⭐ ${task.stars}</small></span><span class="task-badge">${ready ? '✓' : `T${task.tier}`}</span></button>`;
  }).join('');
}

function renderCell(cell, index, popIndex) {
  const classes = ['cell'];
  let content = '';
  if (cell?.gen) {
    classes.push('gen', `gen-${cell.gen}`);
    const seconds = generatorTimeLeft(cell);
    if (seconds) classes.push('cd');
    content = `<span class="cell-icon">${FAMILIES[cell.gen].icon}</span><span class="cell-caption">${seconds ? `${seconds}s` : `${cell.charges}/${GEN_CHARGES}`}</span>`;
  } else if (cell) {
    classes.push(`fam-${cell.fam}`);
    if (cell.covered) classes.push('covered');
    content = `<span class="cell-icon">${FAMILIES[cell.fam].items[cell.tier - 1]}</span><span class="tier">${cell.tier}</span>${cell.covered ? '<span class="webbing" aria-hidden="true"></span>' : ''}`;
  }
  const hintPair = tutorialStep === 1 ? tutorialMergeTargets : mergeHintPair;
  if (hintPair?.includes(index)) classes.push('merge-hint');
  if (index === selectedIndex) classes.push('sel');
  if (index === popIndex) classes.push('pop');
  const finger = hintPair?.[1] === index ? '<span class="hint-finger" aria-hidden="true">👆🏻</span>' : '';
  return `<button class="${classes.join(' ')}" data-i="${index}" aria-label="${cell ? describeItem(cell) : 'Empty board space'}">${content}${finger}</button>`;
}

function render() {
  const horizontalScroll = [...container.querySelectorAll('.tasks, .event-milestones')].map(element => element.scrollLeft);
  const cells = board();
  const nextChapterNeed = storyStarGoal(state.chapter);
  const completeChapters = state.chapter >= CHAPTERS.length;
  const restored = restoredCount();
  const totalRestorations = totalRestorationCount();
  const chapterBadge = Math.min(CHAPTERS.length, state.chapter + 1);
  const chapterBadgeLabel = completeChapters ? 'All six story chapters discovered' : `Next story chapter ${chapterBadge} of ${CHAPTERS.length}; earn stars to unlock it`;
  const chapterLabel = `${Math.min(state.chapter, CHAPTERS.length)} / ${CHAPTERS.length} chapters found`;
  const today = new Date().toLocaleDateString('en-CA');
  const giftClaimed = state.dailyClaimedAt === today;
  const storyHeadline = !completeChapters ? CHAPTERS[state.chapter].title : restored < totalRestorations ? 'Rebuild for the epilogue' : 'The harbor is home again';
  const storyEyebrow = !completeChapters
    ? `NEXT CHAPTER · ${Math.max(0, nextChapterNeed - state.starsToward)}⭐ TO UNLOCK · ${restored}/${totalRestorations} REPAIRS`
    : restored < totalRestorations
      ? `MYSTERY SOLVED · ${totalRestorations - restored} REPAIRS TO THE EPILOGUE`
      : 'CAMPAIGN COMPLETE · FREE PLAY';
  container.innerHTML = `<div class="app">
    <header class="topline">
      <div class="profile-badge" aria-label="${chapterBadgeLabel}" title="${chapterBadgeLabel}"><img src="${CHARS.iris.img}" alt=""><b>${chapterBadge}</b></div>
      <div class="resource-pills"><div class="resource-pill energy-pill" title="Energy regenerates over time · ${MAX_ENERGY} maximum"><span>⚡</span><b>${state.energy}/${MAX_ENERGY}</b></div><div class="resource-pill coin-pill"><span>🪙</span><b>${state.coins}</b></div></div>
      <div class="top-actions"><button class="btn shop-button" id="gift" aria-label="Daily harbor gift" title="Daily harbor gift">${giftClaimed ? '🎁✓' : '🎁'}</button><button class="btn sound-button" id="mute" aria-label="Toggle sound">${muted ? '🔇' : '🔊'}</button></div>
    </header>
    <section class="scene-card">
      <div class="scene-meta"><span>HARBOR JOURNAL</span><b>${chapterLabel}</b></div>
      <div class="scene-lower"><div class="scene-copy"><small>${storyEyebrow}</small><strong>${storyHeadline}</strong><button class="story-link" id="story">View campaign goals <span>›</span></button></div><img class="scene-portrait" src="${CHARS.iris.img}" alt="Iris, the Harbor Gazette reporter"></div>
      <div class="scene-wave" aria-hidden="true"><span></span><span></span></div>
    </section>
    <section class="orders-section"><div class="section-heading"><b>${currentBoardKey === 'event' ? 'OPTIONAL EVENT · PICNIC REWARDS' : 'TOWNSFOLK REQUESTS · EARN STORY ⭐'}</b><small>${currentBoardKey === 'event' ? 'Bonus challenge · not needed to finish the story' : 'Swipe to see all requests →'}</small></div><div class="tasks ${currentBoardKey === 'event' ? 'event-tasks' : ''}">${renderTasks()}</div></section>
    <div class="board-heading"><b>${currentBoardKey === 'main' ? 'Harbor kitchen board' : 'Seaside picnic board'}</b><span>${BOARD_COLS} × ${BOARD_ROWS}</span></div>
    <div class="board ${currentBoardKey === 'event' ? 'event' : ''}" role="grid" aria-label="${BOARD_COLS} by ${BOARD_ROWS} merge board">${cells.map((cell, index) => renderCell(cell, index, -1)).join('')}</div>
    <div class="info" aria-live="polite">${feedbackMessage}</div>
    <nav class="nav" aria-label="Game menu"><button class="btn" id="story-nav">📖 <span>Story</span></button><button class="btn" id="upgrade-nav">🏘️ <span>Restore</span></button><button class="btn" id="swap">${currentBoardKey === 'main' ? '🏖️' : '⚓'} <span>${currentBoardKey === 'main' ? 'Picnic' : 'Town'}</span></button><button class="btn" id="tree">🧺 <span>Items</span></button><button class="btn" id="guide">❔ <span>Guide</span></button></nav>
  </div>`;
  container.querySelectorAll('.tasks, .event-milestones').forEach((element, index) => {
    element.scrollLeft = horizontalScroll[index] || 0;
  });
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
  container.querySelector('#gift').onclick = claimDailyGift;
  container.querySelector('#mute').onclick = () => {
    muted = !muted;
    localStorage.setItem('harbor-whispers-muted', String(muted));
    if (muted) music.pause();
    else unlockAudio();
    render();
  };
  container.querySelector('#story').onclick = showStory;
  container.querySelector('#story-nav').onclick = showStory;
  container.querySelector('#upgrade-nav').onclick = showLocations;
  container.querySelector('#swap').onclick = () => {
    currentBoardKey = currentBoardKey === 'main' ? 'event' : 'main';
    selectedIndex = -1;
    feedbackMessage = currentBoardKey === 'event' ? 'Optional picnic board: merge seaside bites for bonus milestone rewards. Your energy is shared.' : 'Back to the harbor town: deliver requests and restore places to move the campaign forward.';
    render();
  };
  container.querySelector('#tree').onclick = showItemTree;
  container.querySelector('#guide').onclick = showGuide;
  saveState();
  refreshTutorial();
}

function tickEnergy() {
  const now = Date.now();
  const gained = Math.floor((now - state.lastTick) / ENERGY_TICK_MS);
  if (gained > 0) {
    state.energy = Math.min(MAX_ENERGY, state.energy + gained);
    state.lastTick = state.energy >= MAX_ENERGY ? now : state.lastTick + gained * ENERGY_TICK_MS;
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
