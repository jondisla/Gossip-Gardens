// Harbor Whispers content registry: original merge chains, generators, characters and chapter continuation.
const VALUES = [2, 6, 14, 32, 75, 170, 410, 900];
const XP_VALUES = [1, 2, 4, 7, 12, 20, 32, 48];

function family(id, name, icon, generator, chain) {
  const tiers = chain.map(([itemIcon, itemName, description], index) => ({
    tier: index + 1,
    id: `${id}-${index + 1}`,
    name: itemName,
    description,
    icon: itemIcon,
    sellValue: VALUES[index],
    xpValue: XP_VALUES[index],
    mergeResult: index < chain.length - 1 ? `${id}-${index + 2}` : null
  }));
  return { id, name, icon, description: `A complete eight-step ${name.toLowerCase()} collection.`, items: tiers.map(item => item.icon), tiers, generatorIds: [generator] };
}

export const FAMILIES = {
  coffee: family('coffee', 'Harbor bakery', '🥐', 'bakery-oven', [
    ['🫘','Roasted coffee beans','A fragrant handful, ready for the morning brew.'],['☕','Harbor coffee','A warm cup for the early crew.'],['🥐','Butter croissant','Flaky, golden and still warm from Mae’s oven.'],['🍞','Garden herb loaf','A crusty loaf with herbs from the harbor garden.'],['🥪','Dockside sandwich','A hearty lunch wrapped for the pier crew.'],['🍰','Honey layer cake','Mae’s soft, golden cake with a ribbon of honey.'],['🥧','Sunrise berry tart','Bright berries tucked beneath a glossy glaze.'],['🎂','Grand reopening cake','A celebration cake made for the whole town.']
  ]),
  flower: family('flower', 'Harbor garden harvest', '🧺', 'produce-crate', [
    ['🌱','Seed packet','A promise of something green.'],['🪴','Potted sprout','The first tender leaves in a little clay pot.'],['🥬','Market greens','Fresh leaves gathered just after dawn.'],['🥕','Sunshine carrots','A bright bunch pulled from the garden beds.'],['🍎','Orchard apple basket','Crisp fruit packed for the market.'],['🧺','Harbor harvest crate','A full basket of the season’s best.'],['🥗','Garden table salad','A colorful mix picked for a shared meal.'],['🌾','Neighbor’s harvest hamper','The whole community’s finest harvest, gathered together.']
  ]),
  fish: family('fish', 'Harbor seafood', '🎣', 'fishing-crate', [
    ['🪱','Tidepool bait','A little wriggler for a big catch.'],['🪝','Painted fishing lure','A bright lure that catches a sailor’s eye.'],['🐟','Silver harbor catch','Fresh from the morning tide.'],['🍣','Lemon-kissed fillet','Carefully cleaned and ready for the kitchen.'],['🍤','Pan of seasoned prawns','A savory plate of harbor favorites.'],['🦞','Dockside seafood platter','A generous supper gathered from the docks.'],['🦀','Crab feast','A festive harbor supper with lemon and herbs.'],['🍲','Captain’s seafood stew','A warming feast after a long voyage.']
  ]),
  office: family('office', 'Café pantry', '🧁', 'pantry-cabinet', [
    ['🥚','Fresh farm egg','A fresh egg for Mae’s pantry.'],['🧈','Creamery butter','Soft butter wrapped in paper.'],['🥣','Cake batter bowl','Ready for Mae’s next recipe.'],['🍪','Sea-salt biscuit tin','A tin of crisp little treats for the counter.'],['🧁','Peach-frosted cupcake','A swirl of frosting and harbor cheer.'],['🍮','Caramel pudding','Silky, sweet and carefully chilled.'],['🍨','Berry sundae','A tall, cool treat for a sunny afternoon.'],['🎂','Café dessert tower','A grand assortment for the harbor’s sweetest celebration.']
  ]),
  cleaning: family('cleaning', 'Cleaning supplies', '🧽', 'supply-caddy', [
    ['🧹','Hand broom','For the corners saltwater missed.'],['🧽','Soft sponge','Gentle on old painted wood.'],['🪣','Rinse bucket','A fresh start in every dip.'],['🧴','Window polish','Brings the harbor view back.'],['🧺','Laundry basket','Clean linens for a busy café.'],['🫧','Soap bubbles','A bright, sudsy cloud of progress.'],['✨','Shine kit','Everything needed for a sparkling finish.'],['🧼','Harbor clean set','A full set for the town’s grand tidy-up.']
  ]),
  gardening: family('gardening', 'Garden finds', '🌷', 'garden-shed', [
    ['🌰','Acorn','A tiny start beneath the soil.'],['🪴','Seedling pot','A tender green in a clay pot.'],['🌷','First bloom','A brave splash of color.'],['🌻','Sunflower bunch','A bright handful for the garden path.'],['💐','Harbor bouquet','Flowers tied with a blue ribbon.'],['🪻','Pollinator bed','A welcoming patch for busy bees.'],['🌹','Dawn rose basket','Fragrant roses gathered before sunrise.'],['🌺','Community flower arch','A living archway for the celebration.']
  ]),
  tools: family('tools', 'Workshop tools', '🔨', 'workshop-bench', [
    ['🪛','Loose screw','Small, but worth keeping.'],['🔩','Spare fittings','A tidy handful of useful hardware.'],['🔧','Adjustable wrench','A reliable tool for stubborn bolts.'],['🪚','Hand saw','Sharp enough for careful repair work.'],['🧰','Tool roll','The crew’s everyday essentials.'],['🪜','Repair ladder','Steady footing for high-up fixes.'],['⚙️','Workshop kit','A well-balanced set for the whole crew.'],['🛠️','Master repair chest','Everything Rowan needs for a big job.']
  ]),
  woodworking: family('woodworking', 'Woodworking', '🪵', 'woodshop-rack', [
    ['🪵','Driftwood offcut','A smooth piece salvaged from the tide.'],['🪚','Cut plank','Trimmed to fit a simple repair.'],['🪑','Stool blank','A sturdy shape waiting for a maker.'],['🪵','Joined boards','Two lengths fitted cleanly together.'],['🪟','Window frame','Measured for the Gazette newsroom.'],['🪑','Carved harbor chair','A comfortable seat with curved arms.'],['🛶','Polished skiff model','A little tribute to the working harbor.'],['⚓','Heirloom harbor sign','Hand-carved to welcome everyone home.']
  ]),
  drinks: family('drinks', 'Harbor drinks', '🫖', 'drink-cart', [
    ['🍋','Lemon slice','A bright start for a cool drink.'],['🫖','Tea sachet','A fragrant blend from the hills.'],['🥛','Cream bottle','Fresh and ready for the café.'],['🧋','Iced tea','A cool glass for a warm day.'],['🍹','Citrus spritz','Bubbly, bright and alcohol-free.'],['🧉','Garden cooler','Mint and fruit from Jules’s beds.'],['🍵','Tea service','A proper pot for a long conversation.'],['🥂','Harbor toast','A sparkling toast to neighbors.']
  ]),
  market: family('market', 'Market goods', '🧺', 'market-stall', [
    ['🏷️','Price tag','A blank tag for a local find.'],['🧵','Twine bundle','Strong enough for a neat parcel.'],['📦','Small parcel','Wrapped with care for a customer.'],['🧺','Market basket','Room for the day’s discoveries.'],['🫙','Preserve jar','A season of fruit sealed inside.'],['🛍️','Shopper’s tote','A reusable bag for market morning.'],['🎁','Neighbor’s hamper','A basket of thoughtful local goods.'],['🏪','Harbor market hamper','The square’s finest shared collection.']
  ]),
  textiles: family('textiles', 'Harbor textiles', '🧶', 'sewing-basket', [
    ['🧵','Thread spool','A strong strand in sea-glass blue.'],['🪡','Needle and thread','Ready to mend a favorite thing.'],['🧶','Soft yarn ball','Warm wool from a nearby farm.'],['🧣','Knitted scarf','A little warmth for the sea breeze.'],['🪡','Patchwork square','Each patch has its own story.'],['🧺','Picnic blanket','Large enough for friends and snacks.'],['🪟','Cafe curtain set','Light curtains stitched for the café.'],['🧵','Harbor quilt','A community quilt full of familiar colors.']
  ]),
  decor: family('decor', 'Seaside décor', '🪴', 'decor-cabinet', [
    ['🪨','Beach pebble','A smooth keepsake from the shore.'],['🐚','Shell ornament','A shell polished by the tide.'],['🕯️','Tea light','A small glow for a quiet evening.'],['🪴','Table plant','A green touch for the windowsill.'],['🖼️','Harbor print','A little view of home in a frame.'],['🏺','Painted vase','Glazed in a soft coastal blue.'],['🏮','Window lantern','A friendly light for the dusk.'],['🎐','Harbor wind chime','A gentle welcome whenever the breeze turns.']
  ]),
  fishing: family('fishing', 'Fishing supplies', '🪝', 'fishing-locker', [
    ['🪶','Feather float','A lightweight marker on the water.'],['🪢','Short rope','Knotted securely for the trip.'],['🪝','Tackle hook','A strong hook for a careful catch.'],['🧵','Braided line','Tough line for the changing tide.'],['🛟','Dockside float','Easy to spot in a gray morning mist.'],['🎣','Balanced rod','A dependable rod for the long pier.'],['🧭','Tide compass','Points the way through familiar waters.'],['⛵','Skipper’s kit','A complete kit for a safe harbor run.']
  ]),
  documents: family('documents', 'Harbor records', '🗄️', 'archive-desk', [
    ['📄','Blank page','A clean sheet ready for a clue.'],['✉️','Sealed note','A message kept dry and safe.'],['🖋️','Ink and nib','The start of a careful account.'],['📜','Ledger leaf','An old entry from the harbor books.'],['🗂️','Sorted papers','Dates and names finally in order.'],['📚','Archive bundle','A stack of records rescued from the storm.'],['📰','Gazette proof','A story ready for the editor’s eye.'],['📖','Harbor history folio','A shared record of the town’s changing tides.']
  ]),
  lighting: family('lighting', 'Harbor lighting', '🏮', 'lantern-workshop', [
    ['🕯️','Wick stub','A little light waiting to return.'],['🕯️','Fresh candle','A steady flame for a dark corner.'],['🔦','Pocket lamp','A beam to search old store rooms.'],['🏮','Paper lantern','Warm color for a waterfront evening.'],['💡','Signal bulb','Bright enough to guide a boat in.'],['🔆','Beacon lens','A clear lens shaped for the old lamp.'],['🚨','Signal assembly','A careful blend of craft and history.'],['🌟','Restored harbor beacon','A guiding light shared by the whole town.']
  ]),
  hospitality: family('hospitality', 'Guest comforts', '🛎️', 'hospitality-cabinet', [
    ['🧻','Fresh napkin','Folded neatly for a guest.'],['🛏️','Soft cushion','A welcoming place to rest.'],['🧺','Welcome basket','A few local comforts in one bundle.'],['🧴','Guest soap set','Small thoughtful comforts for visitors.'],['☂️','Rainy-day umbrella','A dry walk through a sea shower.'],['🧳','Traveler’s kit','Practical comforts for an overnight stay.'],['🛎️','Guest-room service','Everything a visitor needs close at hand.'],['🏡','Harbor welcome set','A warm welcome to anyone who arrives.']
  ]),
  materials: family('materials', 'Carpentry materials', '🪚', 'carpenter-rack', [
    ['📏','Measuring tape','A careful measurement comes first.'],['🪵','Dry timber','Seasoned boards from Rowan’s store.'],['🧱','Masonry block','A sound base for a lasting repair.'],['🪟','Window glass','Cut to fit the old frame.'],['🪜','Scaffold section','A safe platform for careful work.'],['🪚','Joinery set','Precise pieces for strong connections.'],['🏗️','Restoration bundle','Materials gathered for a community build.'],['🏛️','Waterfront timber set','A lasting finish for the harbor’s oldest places.']
  ]),
  festival: family('festival', 'Festival supplies', '🎏', 'festival-worktable', [
    ['🎏','Harbor ribbon','A bright strip of festival color.'],['🌼','Paper flower','Folded by hand for the square.'],['🎈','Festive balloon','A splash of color over the stalls.'],['🏮','Lantern string','A row of warm lights for dusk.'],['🍪','Festival biscuits','A tray for the volunteer table.'],['🎨','Painted bunting','Hand-painted flags flutter in the breeze.'],['🎁','Celebration bundle','Small surprises for the helpers.'],['🎉','Grand festival kit','Ready for the harbor’s biggest gathering.']
  ])
};

// A separate, optional event chain preserves the original seaside picnic board.
FAMILIES.shell = family('shell', 'Seaside picnic bites', '🏖️', 'picnic-basket', [
  ['🦪','Sea glass shell','A tiny tidepool treasure.'],['🦐','Picnic prawn','A fresh bite for the blanket.'],['🍣','Seaside roll','A savory picnic favorite.'],['🍥','Harbor fish cake','A neat little lunchbox treat.'],['🦀','Crab salad','A chilled bowl for a sunny day.'],['🍲','Picnic pot','A warm dish shared among friends.'],['🧺','Seaside feast','A whole picnic gathered together.'],['🏖️','Harbor day banquet','A joyful meal for every neighbor.']
]);
export const MAIN_FAMILIES = ['coffee', 'flower', 'fish', 'office'];

const generatorRows = [
  ['coffee','bakery-oven','Bakery oven','🍞',0],['flower','produce-crate','Produce crate','🧺',0],['fish','fishing-crate','Fishing crate','🎣',0],['office','pantry-cabinet','Pantry cabinet','🗄️',0],
  ['cleaning','supply-caddy','Supply caddy','🧽',5],['gardening','garden-shed','Garden shed','🌷',6],['tools','workshop-bench','Workshop bench','🛠️',6],['woodworking','woodshop-rack','Woodshop rack','🪵',7],['drinks','drink-cart','Drink cart','🫖',7],['market','market-stall','Market stall','🏪',8],['textiles','sewing-basket','Sewing basket','🧶',9],['decor','decor-cabinet','Décor cabinet','🪴',10],['fishing','fishing-locker','Fishing locker','🪝',11],['documents','archive-desk','Archive desk','🗄️',12],['lighting','lantern-workshop','Lantern workshop','🏮',13],['hospitality','hospitality-cabinet','Hospitality cabinet','🛎️',14],['materials','carpenter-rack','Carpenter’s rack','🪚',15],['festival','festival-worktable','Festival worktable','🎏',16]
];
export const GENERATOR_DEFS = generatorRows.map(([familyId,id,name,icon,unlockChapter], index) => ({
  id, family: familyId, name, icon, unlockChapter, unlockLevel: index === 16 ? 12 : index === 17 ? 16 : 1,
  maxLevel: 6, energyCost: 1,
  drops: [
    [{tier:1,weight:84},{tier:2,weight:14},{tier:3,weight:2}],
    [{tier:1,weight:74},{tier:2,weight:22},{tier:3,weight:4}],
    [{tier:1,weight:68},{tier:2,weight:25},{tier:3,weight:7}],
    [{tier:1,weight:58},{tier:2,weight:32},{tier:3,weight:10}],
    [{tier:1,weight:52},{tier:2,weight:34},{tier:3,weight:12},{tier:4,weight:2}],
    [{tier:1,weight:45},{tier:2,weight:36},{tier:3,weight:15},{tier:4,weight:4}]
  ]
}));

export const CHARS = {
  mae: { name:'Mae', img:'assets/char-mae.webp', role:'Café keeper', icon:'🥐', accent:'#ed995c', personality:'Warm, practical and quietly determined.', favorite:'coffee', arc:'Makes room at her table for the whole harbor.' },
  theo: { name:'Theo', img:'assets/char-theo.webp', role:'Boatwright', icon:'⚓', accent:'#57b8ba', personality:'Inventive, dry-humored and dependable.', favorite:'tools', arc:'Learns that asking for help is its own kind of craft.' },
  iris: { name:'Iris', img:'assets/char-iris.webp', role:'Gazette reporter', icon:'📰', accent:'#e879aa', personality:'Curious, observant and generous with a good question.', favorite:'documents', arc:'Finds a story that belongs to everyone, not just the paper.' },
  cora: { name:'Cora Bell', img:'assets/char-cora.webp', role:'Retired harbor keeper', icon:'🔔', accent:'#668eaa', personality:'Patient, wry and keeper of tide-worn memories.', favorite:'lighting', arc:'Shares the old harbor signal records she kept private.' },
  rowan: { name:'Rowan Hale', img:'assets/char-rowan.webp', role:'Restoration carpenter', icon:'🪚', accent:'#ba8054', personality:'Exacting, kind and happiest with a square corner.', favorite:'materials', arc:'Finds pride in teaching the next pair of hands.' },
  jules: { name:'Jules Rowan', img:'assets/char-jules.webp', role:'Garden designer', icon:'🌼', accent:'#83a85a', personality:'Thoughtful, playful and attentive to small things.', favorite:'gardening', arc:'Builds a garden that grows with the changing waterfront.' },
  adrian: { name:'Adrian Pike', img:'assets/char-adrian.webp', role:'Market organizer', icon:'🏪', accent:'#d18b56', personality:'Quick-thinking, cheerful and fond of a fair bargain.', favorite:'market', arc:'Makes the square a home for more than commerce.' },
  nora: { name:'Nora Finch', img:'assets/char-nora.webp', role:'Town archivist', icon:'📚', accent:'#8f7cb3', personality:'Methodical, warm-hearted and very hard to distract.', favorite:'documents', arc:'Connects the missing pages to the town’s shared history.' },
  milo: { name:'Milo Hart', img:'assets/char-milo.webp', role:'Dock apprentice', icon:'🪝', accent:'#5698a1', personality:'Eager, observant and more capable than he thinks.', favorite:'fishing', arc:'Takes responsibility for carrying the harbor light forward.' },
  selene: { name:'Selene Ward', img:'assets/char-selene.webp', role:'Travel writer', icon:'✒️', accent:'#a579a1', personality:'Perceptive, open-minded and always ready to listen.', favorite:'hospitality', arc:'Chooses to tell the town’s story in its own voice.' },
  tamsin: { name:'Tamsin Bell', img:'assets/char-tamsin.webp', role:'Ferry cook', icon:'🍲', accent:'#cb7d62', personality:'Big-hearted, quick-witted and generous with seconds.', favorite:'drinks', arc:'Brings the far-shore neighbors into the celebration.' }
};

export const REQUEST_NOTES = {
  mae:['I am making a welcome basket for the neighbors helping with the old café. A good harbor starts with a shared table.','I found another line in Elian’s ledger. Bring me a treat and I will tell you what it says.','The repair crew has been out since dawn. Let us make sure nobody works through lunch.'],
  theo:['I am sorting old supplies by the pier. This mark matches something I saw on the lighthouse door.','The boards are finally holding. I owe the crew a proper thank-you, not just a wave from the boat.','Could you bring this down to the pier? I found a clue tucked behind the old mooring post.'],
  iris:['I am piecing together the story of the silent harbor bell. Every little detail helps.','The Gazette needs a cheerful headline for once. I have a feeling this town is about to give me one.','I found a note addressed to everyone in town. Help me finish the story before the tide turns.'],
  cora:['The old keeper’s marks are fading. Let us make a clean copy before the salt takes them.','I kept the lantern lit through rougher weather than this. Still, a warm drink would help.'],
  rowan:['I measured twice. I would measure a third time, but the crew has already brought the boards.','A sound repair deserves good tools and an even better lunch.'],
  jules:['A garden is mostly patience, with a little compost and a good neighbor.','These new beds need something colorful to welcome the bees.'],
  adrian:['The market square is nearly ready. I have space for one more local stall.','A good market is more than a row of tables. It is a reason to stop and talk.'],
  nora:['The archive boxes are in order. The handwriting, unfortunately, has other ideas.','I found a date that links Elian’s ledger to the old quay. Could you help me verify it?'],
  milo:['I can tie the knot now. I only need the right rope and a little practice.','The morning tide left a curious mark on the piling. I made a note before it washed away.'],
  selene:['I came to write about the view. The people have turned out to be the better story.','Could you help me find a local keepsake that is not just another postcard?'],
  tamsin:['The ferry brings hungry people and excellent news. I need a tray for both.','Nobody should miss the celebration just because the tide is high.']
};

const chapter = (title, lines) => ({ title, lines });
export const CHAPTER_EXPANSION = [
  chapter('The Tidekeeper’s Map', [['iris','Cora Bell recognizes the lantern mark in Elian’s ledger, but she has never seen it on a map.'],['cora','The old keepers used a tide map. It marked safe places, not property lines. That distinction mattered.'],['mae','A map that tells you where people can find shelter sounds like something we should have kept.'],['theo','There is a sealed drawer in the lighthouse storehouse. I can open it without taking the hinges off this time.'],['cora','That is a very specific promise, Theo. I will bring the key.'],['milo','Could I come along? I know the lower steps, and I can carry the dry box.'],['iris','Then this is our first map-making meeting. I will bring paper, not a headline.']]),
  chapter('The Joiner’s Mark', [['rowan','These old planks have a joiner’s mark hidden beneath the paint. It is not mine, but the cut is familiar.'],['theo','You have a family mark? I thought carpenters just signed the work where it would be least convenient to sand.'],['rowan','Some did. This one belonged to my grandmother. She repaired the first harbor store.'],['mae','Did anyone keep her plans? A good set of measurements could save us half a day.'],['nora','The archive has a box marked “shoreline works.” It has been waiting for someone to ask.'],['rowan','I would like to see it. I have spent years thinking the old work was lost.'],['iris','The Gazette can print the plans with her name attached. The craft deserves its maker.']]),
  chapter('A Garden with Room', [['jules','The garden path stops at a stone wall that is not on the council plan.'],['adrian','It is where the market carts turn around. We have called it “the corner” for as long as I can remember.'],['jules','There are old planting holes along it. Someone intended this corner to be a public garden.'],['mae','Then let us make it useful to the market and lovely for the neighbors. Both can fit.'],['adrian','I can move the cart turn a few steps if we mark it clearly. No one needs to lose their spot.'],['cora','The keepers used to leave a bench there for anyone waiting on the tide.'],['jules','A bench, a herb bed and enough space for a cart. That sounds like the harbor I want.']]),
  chapter('The Names in the Margin', [['nora','Elian wrote a list of names in the ledger margin. Beside each one is a different kind of repair.'],['iris','Not owners? Volunteers? The handwriting gets very small here.'],['nora','I think they were people who lent tools, meals and rooms after the old storm.'],['tamsin','My ferry kitchen has a tin recipe card from that same year. It says “feed the hands that mend.”'],['mae','That sounds like a rule worth bringing back. The café can host the first open table.'],['selene','May I write down the names as you read them? I want the story to stay with the town.'],['iris','We will print every name we can verify. This time, nobody gets left in the margin.']]),
  chapter('Market Morning', [['adrian','The square has three stalls, five opinions about stall order and exactly one working sign. We are doing well.'],['milo','I can repaint the sign after my dock shift. The old letters are still visible underneath.'],['rowan','I will brace it first. Paint looks better when the sign stays upright.'],['mae','Tamsin and I will make breakfast for the stallholders. A full stomach is excellent crowd management.'],['tamsin','I prefer to call it kindness with a ladle.'],['jules','I have small pots of herbs for the tables. Visitors can take one home and grow it.'],['adrian','Then the market will sell what we make here, not just what we can stack. That feels right.']]),
  chapter('A Page in Nora’s Hand', [['nora','I found a page in my own handwriting. I catalogued it years ago and put it in the wrong box.'],['iris','It happens. The trick is being honest about the box.'],['nora','The page describes a meeting about the harbor light, attended by every street on the waterfront.'],['cora','The light was never one keeper’s job. The bell called the whole town.'],['theo','So Elian’s note was not asking one person to carry a lamp. He was reminding us to answer together.'],['milo','I can ring the bell once the fittings are safe. I know the sound from the ferry.'],['nora','Let us find the rest of the meeting notes before we decide what the answer should be.']]),
  chapter('The Far-Shore Table', [['tamsin','The far-shore ferry crew would come to the reopening, but the old landing is too narrow for a crowd.'],['theo','We can widen the safe approach. Rowan, if I bring the timber, can you check the join?'],['rowan','I can check it, build it and explain why your first measurement is optimistic.'],['milo','I will mark the tide line before we start. Cora taught me how to read it.'],['cora','He learned faster than I did at his age. Do not tell him; he will become unbearable.'],['mae','I will set aside a table for the ferry crew. They have been part of this harbor story all along.'],['tamsin','Then I will bring the recipe my mother made for the crossing. It serves twelve, or six very hungry people.']]),
  chapter('The Visitor’s Draft', [['selene','I have a draft about the harbor ready. It sounds polished, and it sounds like nowhere in particular.'],['iris','What did you leave out?'],['selene','The pauses. The jokes. The way the market shares a sign and the café shares its last loaf.'],['adrian','We can lend you a better sign. The old one has character, even if the paint is on sideways.'],['mae','Keep the details that make it ours. We do not need to sound impressive to be worth visiting.'],['selene','I came looking for a pretty coast. I found people who know how to make room.'],['iris','Write it in your voice, but let the neighbors read it before it leaves the harbor.']]),
  chapter('Lanterns on Every Street', [['cora','One restored beacon is a fine thing. A row of small lanterns is safer in a fog.'],['theo','I can make brackets for the old street posts, if they are still sound.'],['rowan','Half are sound. The other half are excellent practice.'],['jules','I will trim the climbing vines so the light reaches the garden path.'],['adrian','The market can host a lantern-making table. Children are already asking for one.'],['milo','I will test the route at dusk and make a list of dark corners.'],['iris','A harbor light is not a single point anymore. It is every neighbor keeping watch.']]),
  chapter('The Empty Property', [['iris','The boarded shop by the old quay is not on the sale list, but someone has been clearing its windows.'],['nora','Its deed was never transferred after the last storm. The records are incomplete, not abandoned.'],['adrian','The market could use a shared store room, but no one should decide that without the neighbors.'],['rowan','We can make the building safe first. That does not commit it to anything.'],['cora','The old owner used to lend the room for storm shelter. It was meant to serve the waterfront.'],['selene','Let the town hear the options before the story gets ahead of the facts.'],['iris','Agreed. We will publish what we know, what we do not know, and invite people to the table.']]),
  chapter('What We Keep', [['mae','The meeting brought three plans, two strong disagreements and an extremely good tray of biscuits.'],['adrian','I still think a market store room would help. I also see why the ferry crew needs shelter.'],['tamsin','We could share the space by season. Supplies in winter, stalls in summer.'],['rowan','The building can be divided safely if we keep the old central beam. It was made for a reason.'],['nora','The original deed calls it a “common room for harbor use.” That is unusually clear.'],['selene','Then the story is not about choosing one neighbor over another. It is about keeping a promise broad enough for all of you.'],['iris','We will call it the Common House, and the first key belongs to the whole town.']]),
  chapter('The Bell’s New Rope', [['milo','The bell rope is ready. I tied the practice knots until my hands remembered them.'],['cora','Elian used a different knot. Not because it was better—because the old rope was shorter.'],['theo','I made a new handle that fits both. Sometimes a small improvement can respect an old design.'],['nora','The last ledger page says the bell should ring when the light is ready and the table is open.'],['mae','The café doors will be open. Tamsin has enough food for twice the people we invited.'],['milo','I would like to ring it with Cora beside me, if that is all right.'],['cora','It is more than all right. The harbor light belongs to the next keeper, too.']]),
  chapter('A Harbor of Many Hands', [['iris','Every restored place has a name beside it now: the people who mended, planted, carried, cooked and listened.'],['jules','The garden has room for herbs from every street. I saved one bed for whatever grows next.'],['rowan','The Common House is sturdy. I left the joinery visible so the next carpenter can read it.'],['selene','My article is ready. It is not a story about a perfect town. It is about a town that keeps showing up.'],['theo','The lamp is lit, the bell is mended and nobody had to pretend the first plan was flawless.'],['mae','Then let us celebrate with the doors open and the tables pulled together.'],['iris','Elian’s final note asked that no one find their way home alone. Tonight, every window answers.']])
];

export const DAILY_OBJECTIVES = [
  {id:'merge-10', title:'Bring a few things together', kind:'merges', target:10, reward:{coins:80, energy:4, pearls:1, xp:35}},
  {id:'orders-2', title:'Help two harbor neighbors', kind:'orders', target:2, reward:{coins:120, energy:6, pearls:1, xp:50}},
  {id:'make-8', title:'Set the generators humming', kind:'generated', target:8, reward:{coins:90, energy:5, pearls:2, xp:40}},
  {id:'discover-1', title:'Discover a new item tier', kind:'discoveries', target:1, reward:{coins:100, energy:4, pearls:2, xp:55}},
  {id:'restore-1', title:'Improve a harbor place', kind:'restorations', target:1, reward:{coins:150, energy:8, pearls:3, xp:75}}
];

export const BOOSTERS = {
  energyFlask:{name:'Energy Flask',icon:'🧪',description:'Restore 25 energy, up to your current cap.',use:'energy'},
  timeSkip:{name:'Time Skip',icon:'⏩',description:'Finish the longest generator cooldown on this board.',use:'cooldown'},
  mergeMagnet:{name:'Merge Magnet',icon:'🧲',description:'Highlight every matching pair on the board.',use:'hint'},
  doubleDrop:{name:'Double Drop',icon:'🎁',description:'Your next generator tap makes one extra item.',use:'double'},
  luckyToken:{name:'Lucky Token',icon:'🍀',description:'Improve rare generator drops for five taps.',use:'lucky'},
  boardShuffle:{name:'🔀',icon:'🔀',description:'Rearrange movable board items without losing them.',use:'shuffle'},
  extraStorage:{name:'Extra Storage',icon:'🧺',description:'Add five inventory slots.',use:'storage'},
  instantOrder:{name:'Order Bell',icon:'🔔',description:'Refresh one request with a new accessible order.',use:'order'},
  generatorRecharge:{name:'Recharge Charm',icon:'⚡',description:'Refill one selected generator’s charges.',use:'recharge'},
  itemFinder:{name:'Item Finder',icon:'🔎',description:'Highlight the best current match for an order.',use:'finder'}
};

export const TASK_TEMPLATES = Object.values(FAMILIES).filter(entry => entry.id !== 'shell').flatMap(entry => entry.tiers.flatMap(tier => [
  {id:`quick-${tier.id}`, family:entry.id, tier:tier.tier, kind:'quick', quantity:1},
  {id:`standard-${tier.id}`, family:entry.id, tier:tier.tier, kind:'standard', quantity:tier.tier > 4 ? 1 : 2}
]));
