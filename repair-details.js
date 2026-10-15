const REPAIR_DETAILS = {
  cafe: [
    { item:'Café storm debris', before:'Broken boards and storm grit cover the floor', after:'Floor cleared; debris removed', glyph:'🧹', mode:'remove' },
    { item:'Café roof section', before:'Roof section missing — rafters exposed', after:'Roof boards and shingles fitted', glyph:'🏠', mode:'roof' },
    { item:'Café windows', before:'Empty window openings — no glass or frames', after:'Wood-framed harbor windows installed', glyph:'🪟', mode:'window' },
    { item:'Café tables and chairs', before:'Dining area has no tables or chairs', after:'Tables and chairs set out for guests', glyph:'🪑', mode:'furniture' },
    { item:'Café front doors', before:'Open doorway — no doors fitted', after:'Double timber doors installed and open', glyph:'🚪', mode:'door' },
    { item:'Kitchen prep counter', before:'Cracked, unusable prep counter', after:'Sound counter restored for food prep', glyph:'🍳', mode:'counter' },
    { item:'Garden seating and planters', before:'Empty patio — no seats or planters', after:'Outdoor chairs and planters in place', glyph:'🪴', mode:'furniture' },
    { item:'Café welcome bell', before:'Bare entrance — no welcome bell', after:'Brass welcome bell fitted above the door', glyph:'🔔', mode:'add' }
  ],
  pier: [
    { item:'Pier walking boards', before:'Split, missing boards leave gaps over water', after:'New timber boards cover the unsafe gaps', glyph:'🪵', mode:'broken' },
    { item:'Boat moorings', before:'No mooring cleats or tie-up line', after:'Cleat and secure boat line installed', glyph:'🪢', mode:'add' },
    { item:'Pier harbor lantern', before:'Lantern post is bare — no light fitted', after:'Harbor lantern mounted and glowing', glyph:'🏮', mode:'add' },
    { item:'Seabird lookout perch', before:'Empty rail — no bird perch or visitor', after:'Seabird perched on the pier rail', glyph:'🐦', mode:'add' },
    { item:'Sunrise gathering platform', before:'No gathering platform at the pier end', after:'Small platform ready for the sunrise crowd', glyph:'🌅', mode:'add' },
    { item:'Pier handrail', before:'Handrail is missing along the exposed edge', after:'Continuous safety handrail secured in place', glyph:'🛟', mode:'add' },
    { item:'Boat station shelter', before:'No covered place to mend nets or gear', after:'Roofed boat-work shelter built beside the pier', glyph:'⛵', mode:'add' },
    { item:'Harbor overlook deck', before:'Pier ends without a viewing deck', after:'Wide overlook deck added above the water', glyph:'🧭', mode:'add' }
  ],
  garden: [
    { item:'Garden path and beds', before:'Storm tangle buries the path and garden beds', after:'Path uncovered and beds cleared for planting', glyph:'🧹', mode:'remove' },
    { item:'Garden flowers', before:'Bare prepared beds — no flowers planted', after:'Fresh flowers planted in the garden beds', glyph:'🌷', mode:'plants' },
    { item:'Butterfly host plants', before:'No nectar flowers for butterflies', after:'Nectar blooms planted; butterflies return', glyph:'🦋', mode:'plants' },
    { item:'Garden shade tree', before:'Open corner has no shade tree', after:'Young tree planted in the garden corner', glyph:'🌳', mode:'plants' },
    { item:'Garden rainbow arch', before:'Garden gathering area has no celebration arch', after:'Colorful rainbow arch raised over the garden', glyph:'🌈', mode:'add' },
    { item:'Pollinator walking path', before:'Plain path has no pollinator planting edge', after:'Winding herb-and-flower border planted', glyph:'🪻', mode:'plants' },
    { item:'Community seed library', before:'No seed-sharing box at the garden', after:'Weatherproof seed library installed', glyph:'📦', mode:'add' },
    { item:'Community garden beds', before:'No shared growing plots are laid out', after:'Raised plots opened for community planting', glyph:'💐', mode:'plants' }
  ],
  office: [
    { item:'Gazette editor’s desk', before:'Desk buried beneath wet pages and debris', after:'Desk cleared; typewriter and pages rescued', glyph:'📄', mode:'remove' },
    { item:'Newsroom window', before:'Empty window opening lets rain into the room', after:'Glazed newsroom window fitted in the opening', glyph:'🪟', mode:'window' },
    { item:'Gazette archive shelves', before:'No shelves to hold the rescued papers', after:'Archive shelves installed for Elian’s papers', glyph:'📚', mode:'shelves' },
    { item:'Newsroom coffee station', before:'No coffee cup or serving spot in the newsroom', after:'Coffee corner set up for the newsroom', glyph:'☕', mode:'add' },
    { item:'Printed harbor edition', before:'No finished edition on the Gazette counter', after:'Fresh harbor story printed and ready to read', glyph:'📰', mode:'add' },
    { item:'Gazette reading table', before:'No table for neighbors to read together', after:'Reading table placed in the newsroom', glyph:'🪑', mode:'furniture' },
    { item:'Public archive cabinet', before:'Records have no public cabinet or labels', after:'Catalogued archive cabinet opened to visitors', glyph:'🗄️', mode:'shelves' },
    { item:'Harbor history edition', before:'No community history edition displayed', after:'Harbor history edition published for the town', glyph:'📖', mode:'add' }
  ],
  market: [
    { item:'Market square paving', before:'Storm grit and litter cover the square', after:'Square swept clean and ready for market', glyph:'🧹', mode:'remove' },
    { item:'Market stalls', before:'Empty square — no vendor tables or stalls', after:'Sturdy vendor stalls installed in the square', glyph:'🧺', mode:'furniture' },
    { item:'Market direction sign', before:'Visitors have no sign to find the market', after:'Hand-painted market sign mounted in place', glyph:'🪧', mode:'add' },
    { item:'Market cart lane markings', before:'Cart route has no visible lane markings', after:'Clear painted lane guides carts through the square', glyph:'🛣️', mode:'add' },
    { item:'Market shade canopy', before:'Stalls have no canopy or sun shade', after:'Canvas canopy raised above the stalls', glyph:'⛱️', mode:'add' },
    { item:'Square edge planters', before:'Square edges are bare — no planted pots', after:'Herb and flower planters set around the square', glyph:'🪴', mode:'plants' },
    { item:'Shared maker stall', before:'No shared stall for small local makers', after:'Community stall fitted for local makers', glyph:'🛍️', mode:'furniture' },
    { item:'Market-day bunting', before:'Square has no festival bunting or welcome flags', after:'Colorful bunting hung for market day', glyph:'🎏', mode:'add' }
  ],
  lighthouse: [
    { item:'Lighthouse storehouse floor', before:'Storehouse clutter blocks the signal-room floor', after:'Signal room cleared for repair work', glyph:'🧹', mode:'remove' },
    { item:'Lighthouse stairs and handrail', before:'Stair run is broken and unsafe to climb', after:'Complete timber stairs and handrail installed', glyph:'🪜', mode:'broken' },
    { item:'Keeper’s window', before:'Empty tower opening — no keeper’s window', after:'Framed glass window installed in the tower', glyph:'🪟', mode:'window' },
    { item:'Beacon lens frame', before:'Lens frame is bent; no stable lens support', after:'Straightened frame now holds the beacon lens', glyph:'🪜', mode:'broken' },
    { item:'Lantern-room wiring and fitting', before:'No protected lamp fitting in the lantern room', after:'New wiring and weather-safe light fitting installed', glyph:'💡', mode:'add' },
    { item:'Beacon lens', before:'Clouded lens cannot focus the beacon light', after:'Polished glass lens fitted to focus the beam', glyph:'🔆', mode:'broken' },
    { item:'Keeper’s story ledger', before:'No dry shelf or open ledger for keeper records', after:'Keeper’s log preserved on a dry record shelf', glyph:'📖', mode:'shelves' },
    { item:'Harbor beacon light', before:'Beacon lamp is dark — no signal reaches the water', after:'Beacon lamp shines across the harbor', glyph:'🌟', mode:'add' }
  ],
  workshop: [
    { item:'Workshop workbench', before:'Workbench buried beneath clutter', after:'Workbench cleared and ready for careful repairs', glyph:'🧰', mode:'remove' },
    { item:'Workshop timber rack', before:'Timber is loose on the floor with no rack', after:'Useful boards sorted onto a timber rack', glyph:'🪵', mode:'shelves' },
    { item:'Workshop hand saw', before:'Saw blade is damaged and missing teeth', after:'Saw repaired with a straight, sharp blade', glyph:'🪚', mode:'broken' },
    { item:'Workshop roof brace', before:'Roof span has no supporting brace beam', after:'New brace beam fitted under the roof', glyph:'🪵', mode:'add' },
    { item:'Workshop entry door', before:'Workshop doorway has no door to secure supplies', after:'Solid timber workshop door hung in its frame', glyph:'🚪', mode:'door' },
    { item:'Teaching workbench', before:'No second bench for shared lessons', after:'Teaching bench and learner stool set in place', glyph:'🪑', mode:'furniture' },
    { item:'Workshop tool wall', before:'Tools have no wall rack or assigned hooks', after:'Tool wall fitted with visible hanging tools', glyph:'🛠️', mode:'shelves' },
    { item:'Harbor workshop sign', before:'Workshop entrance has no open-for-neighbors sign', after:'Workshop sign welcomes the harbor crew', glyph:'🏠', mode:'add' }
  ],
  archive: [
    { item:'Archive record boxes', before:'Record boxes are damp and piled on the floor', after:'Records dried and sorted into safe bundles', glyph:'📦', mode:'remove' },
    { item:'Lower archive shelf', before:'No raised shelf keeps records above damp stone', after:'Replacement lower shelf installed above the floor', glyph:'📚', mode:'shelves' },
    { item:'Archive entry door', before:'Archive doorway has no secure door', after:'Archive door fitted; records can be secured', glyph:'🚪', mode:'door' },
    { item:'Harbor tide charts', before:'Tide charts are rolled up and not displayed', after:'Tide charts laid out and pinned for reference', glyph:'🗺️', mode:'add' },
    { item:'Archive reading desk', before:'No desk for neighbors consulting the records', after:'Reading desk installed for archive visitors', glyph:'🪑', mode:'furniture' },
    { item:'Collection labels', before:'Archive shelves have no names or labels', after:'Records labelled by harbor name and place', glyph:'🏷️', mode:'add' },
    { item:'Public records shelves', before:'Town records are not arranged for public access', after:'Open, sorted shelves ready for public use', glyph:'🗄️', mode:'shelves' },
    { item:'Living harbor archive', before:'No new-memory ledger beside the old records', after:'Community memory book added to the archive', glyph:'📖', mode:'add' }
  ],
  wharf: [
    { item:'Old wharf landing', before:'Storm debris hides the safe landing stones', after:'Landing cleared; safe stones exposed', glyph:'🧹', mode:'remove' },
    { item:'Wharf mooring rope', before:'Mooring post has no sound tie-up rope', after:'Fresh rope secured to the mooring post', glyph:'🪢', mode:'add' },
    { item:'Wharf access steps', before:'No safe steps connect the landing to the wharf', after:'Sturdy access steps installed at the landing', glyph:'🪜', mode:'broken' },
    { item:'Fishing net rack', before:'Fishing nets have no raised, dry storage rack', after:'Net rack built above the wet landing', glyph:'🪢', mode:'shelves' },
    { item:'Old wharf piling', before:'Harbor piling is split and poorly braced', after:'Original piling reinforced with a strong brace', glyph:'⚓', mode:'broken' },
    { item:'Tide marker', before:'No tide scale marks the changing waterline', after:'Visible tide marker fixed beside the landing', glyph:'📏', mode:'add' },
    { item:'Wharf lantern', before:'Landing post has no lantern for evening arrivals', after:'Warm lantern hung above the old landing', glyph:'🏮', mode:'add' },
    { item:'Reopened boat landing', before:'Landing has no ready mooring for visiting boats', after:'Wharf reopened with a safe boat tie-up', glyph:'🛶', mode:'add' }
  ],
  festival: [
    { item:'Festival plaza paving', before:'Storm grit and litter cover the gathering plaza', after:'Plaza swept clean for the festival crew', glyph:'🧹', mode:'remove' },
    { item:'Festival flag posts', before:'Flag posts are broken and cannot hold bunting', after:'Upright flag posts repaired and ready for flags', glyph:'🎏', mode:'broken' },
    { item:'Plaza benches', before:'No benches for neighbors to sit and share a meal', after:'Benches installed around the plaza', glyph:'🪑', mode:'furniture' },
    { item:'Festival lanterns', before:'Plaza has no lanterns for after-sunset gatherings', after:'Warm lanterns hung around the square', glyph:'🏮', mode:'add' },
    { item:'Welcome mural', before:'Plaza wall is bare — no community mural', after:'Painted harbor welcome mural on the plaza wall', glyph:'🎨', mode:'mural' },
    { item:'Festival maker stalls', before:'No stalls for local makers and food', after:'Festival stalls arranged for local makers', glyph:'🎁', mode:'furniture' },
    { item:'Plaza performance stage', before:'Open plaza has no raised performance stage', after:'Small timber stage built for the harbor crew', glyph:'🎤', mode:'add' },
    { item:'Harbor festival bunting', before:'Festival entrance has no finishing decorations', after:'Bunting and welcome decorations complete the plaza', glyph:'🎉', mode:'add' }
  ]
};

function architecturalDrawing(mode, installed) {
  const backdrop = '<rect width="160" height="102" rx="12" fill="#e7f1ed"/><rect y="70" width="160" height="32" fill="#c89863"/><path d="M0 81h160M0 92h160" stroke="#ab7950" stroke-width="2" opacity=".55"/><path d="M20 70V25h120v45" fill="#f4dfb8" stroke="#80634c" stroke-width="3" stroke-linejoin="round"/>';
  if (mode === 'door') {
    const opening = '<path d="M58 70V39a22 22 0 0 1 44 0v31Z" fill="#33525b" stroke="#80634c" stroke-width="3"/>';
    const door = '<path d="M59 70V39a21 21 0 0 1 42 0v31Z" fill="#ad7048" stroke="#70452f" stroke-width="3"/><path d="M65 70V40a15 15 0 0 1 30 0v30M80 31v39M64 52h15M81 52h15" fill="none" stroke="#d9a774" stroke-width="2"/><circle cx="92" cy="56" r="2.5" fill="#f4d174"/>';
    return backdrop + opening + (installed ? door : '<path d="M61 69V40a19 19 0 0 1 38 0v29" fill="none" stroke="#f7f0de" stroke-width="2" stroke-dasharray="4 4"/>');
  }
  if (mode === 'window') {
    const opening = '<rect x="55" y="34" width="50" height="36" fill="#456876" stroke="#80634c" stroke-width="3"/><path d="M59 38h42v28H59Z" fill="#88b7c0"/>';
    const fitted = '<rect x="55" y="34" width="50" height="36" rx="2" fill="#a5d7df" stroke="#81553a" stroke-width="5"/><rect x="61" y="40" width="38" height="24" fill="#85c3d3" stroke="#f3e6c8" stroke-width="2"/><path d="M80 40v24M61 52h38" stroke="#83593e" stroke-width="3"/><path d="m64 45 10-4" stroke="#fff" stroke-width="2" opacity=".8"/>';
    return backdrop + opening + (installed ? fitted : '<rect x="56" y="35" width="48" height="34" fill="none" stroke="#fff8e7" stroke-width="2" stroke-dasharray="4 4"/>');
  }
  const wall = '<path d="M22 70V34l58-25 58 25v36Z" fill="#e4c99a" stroke="#80634c" stroke-width="3" stroke-linejoin="round"/>';
  if (mode === 'roof') {
    const frame = '<path d="M24 34 80 10l56 24M38 36l42-19 42 19" fill="none" stroke="#82583c" stroke-width="5" stroke-linecap="round"/><path d="M47 39 80 24l33 15" fill="none" stroke="#d0a56d" stroke-width="4"/>';
    const shingles = '<path d="M23 34 80 9l57 25-5 8-52-23-52 23Z" fill="#9d6549" stroke="#704a39" stroke-width="3" stroke-linejoin="round"/><path d="m38 32 42-19 43 19M49 37l31-14 32 14M59 42l21-10 22 10" fill="none" stroke="#d69a62" stroke-width="3"/>';
    return backdrop + wall + (installed ? shingles : frame + '<path d="M55 25 80 14l25 11" fill="#87bcc7" stroke="#fff3d5" stroke-width="2" stroke-dasharray="4 4"/>');
  }
  return backdrop + wall;
}

function siteBackdrop(locationId) {
  if (locationId === 'garden') {
    return '<rect width="160" height="102" rx="12" fill="#d9eff0"/><circle cx="130" cy="18" r="10" fill="#f6cf72"/><path d="M0 55q35-10 70 0t90-1v48H0Z" fill="#90b87c"/><path d="M0 72q38-9 75 0t85-1v31H0Z" fill="#77a467"/><path d="M20 78h120" stroke="#d5b27d" stroke-width="15" stroke-linecap="round"/><path d="M20 78h120" stroke="#e6ca99" stroke-width="2" stroke-dasharray="7 5"/>';
  }
  if (locationId === 'pier' || locationId === 'wharf') {
    return '<rect width="160" height="102" rx="12" fill="#b9e1e5"/><path d="M0 38q18-6 36 0t36 0 36 0 52 0v38H0Z" fill="#6eb3b8"/><path d="M0 49q18-5 36 0t36 0 36 0 52 0M0 63q18-5 36 0t36 0 36 0 52 0" fill="none" stroke="#d7f3e8" stroke-width="2" opacity=".75"/><path d="M0 75h160v27H0Z" fill="#b7834f"/><path d="M0 83h160M0 94h160M30 75v27m35-27v27m37-27v27m34-27v27" stroke="#8d613d" stroke-width="2" opacity=".8"/>';
  }
  if (locationId === 'market' || locationId === 'festival') {
    return '<rect width="160" height="102" rx="12" fill="#e6efdf"/><path d="M0 49h160v53H0Z" fill="#d1b58a"/><path d="M0 61h160M0 76h160M0 91h160M28 49v53m38-53v53m38-53v53m38-53v53" stroke="#b1946d" stroke-width="1.7" opacity=".7"/><path d="M14 49V24h28v25m77 0V18h27v31" fill="#f3ddae" stroke="#9d7956" stroke-width="2"/>';
  }
  if (['lighthouse','archive','office','workshop'].includes(locationId)) {
    const wall = locationId === 'workshop' ? '#dfc49b' : locationId === 'lighthouse' ? '#eadfc8' : '#f1e4c9';
    const floor = locationId === 'workshop' ? '#9a704d' : locationId === 'lighthouse' ? '#9e917d' : '#bd9469';
    return `<rect width="160" height="102" rx="12" fill="#d8e4df"/><path d="M0 0h160v71H0Z" fill="${wall}"/><path d="M0 72h160v30H0Z" fill="${floor}"/><path d="M0 83h160M0 94h160" stroke="#817665" stroke-width="2" opacity=".5"/><path d="M12 12h34v38H12Z" fill="#8bbbc2" stroke="#856b50" stroke-width="3"/><path d="M29 12v38M12 31h34" stroke="#f5e7ca" stroke-width="2"/><path d="M0 68h160" stroke="#a17b58" stroke-width="3" opacity=".65"/>`;
  }
  return '<rect width="160" height="102" rx="12" fill="#e7f1ed"/><path d="M0 0h160v70H0Z" fill="#f1e4c9"/><path d="M0 70h160v32H0Z" fill="#c89863"/><path d="M0 81h160M0 92h160" stroke="#ab7950" stroke-width="2" opacity=".55"/><path d="M18 70V22h25v29m74 19V19h25v51" fill="#dcc397" stroke="#9a7859" stroke-width="2"/>';
}

function missingOrDamagedObject(spec, locationId, after) {
  const glyph = `<text x="135" y="28" text-anchor="middle" font-size="17" font-family="Apple Color Emoji,Segoe UI Emoji,Noto Color Emoji,sans-serif">${spec.glyph}</text>`;
  if (spec.mode === 'remove') {
    const debris = '<path d="m32 72 12-17 12 13 10-27 12 30 12-18 13 19 13-10 17 17H28Z" fill="#8c8170" stroke="#675f55" stroke-width="2"/><path d="m43 58 8 6m25-15 7 9m17 10 8 1" stroke="#ead5a9" stroke-width="2"/>';
    return after ? '<path d="M22 76h116" stroke="#78946e" stroke-width="2" stroke-dasharray="4 4" opacity=".6"/>' : debris;
  }
  if (spec.mode === 'broken') {
    const damaged = '<path d="M37 47 123 39 128 57 43 66Z" fill="#a8774e" stroke="#714b35" stroke-width="3"/><path d="m81 43 8 8-9 3 10 9" fill="none" stroke="#4d3d33" stroke-width="3"/><path d="m44 68-7 8m79-34 10-9" stroke="#755039" stroke-width="3"/>';
    const repaired = '<path d="M32 47h96v20H32Z" fill="#bd8b59" stroke="#765239" stroke-width="3"/><path d="M38 53h84M38 61h84" stroke="#d9b17a" stroke-width="2"/><path d="M50 48v18m60-18v18" stroke="#6e4d37" stroke-width="2"/><circle cx="50" cy="57" r="2" fill="#e8d3aa"/><circle cx="110" cy="57" r="2" fill="#e8d3aa"/>';
    return after ? `${repaired}${glyph}` : damaged;
  }
  if (spec.mode === 'counter') {
    const broken = '<path d="M31 56h98v10H31Zm8 10v18m82-18v18" fill="#b37a4d" stroke="#684b39" stroke-width="3"/><path d="m70 56 8 5-5 4 9 2" fill="none" stroke="#533b31" stroke-width="2.5"/>';
    const finished = '<path d="M27 53h106v14H27Zm9 14v20m88-20v20" fill="#b88557" stroke="#684b39" stroke-width="3"/><path d="M36 58h88" stroke="#e1bc83" stroke-width="3"/><path d="M48 51v-7h20v7" fill="#e2a55c" stroke="#8d633f" stroke-width="2"/>';
    return after ? `${finished}${glyph}` : broken;
  }
  if (!after) return '';
  if (spec.mode === 'furniture') {
    return '<path d="M38 50h84v9H38Zm8 9v20m68-20v20" fill="#ba8753" stroke="#765338" stroke-width="3"/><path d="M28 58h14v8H28Zm2 8v17m10-17v17m80-25h13v8h-13Zm2 8v17m9-17v17" fill="#c4945e" stroke="#765338" stroke-width="2.5"/><path d="M44 54h72" stroke="#e5c48c" stroke-width="2"/>' + glyph;
  }
  if (spec.mode === 'plants') {
    return '<path d="M26 70h108l-8 12H35Z" fill="#986b4d" stroke="#72503b" stroke-width="2"/><path d="M35 70q22-10 44 0t45 0" fill="#594833"/><path d="M78 68V39m-18 29V49m38 19V45" stroke="#557848" stroke-width="4" stroke-linecap="round"/><path d="M78 49q-17-15-24-4 8 15 24 4m0-8q13-17 23-8-5 15-23 8m-18 14q-13-13-20-5 8 12 20 5m56 2q12-14 20-5-5 13-20 5" fill="#80a958" stroke="#557848" stroke-width="1.5"/><circle cx="78" cy="39" r="6" fill="#e982a0"/><circle cx="58" cy="49" r="5" fill="#f3c764"/><circle cx="98" cy="45" r="5" fill="#b185c1"/><circle cx="78" cy="39" r="2" fill="#f5d87b"/>' + glyph;
  }
  if (spec.mode === 'shelves') {
    return '<path d="M43 25v52m74-52v52M40 34h80M40 52h80M40 72h80" stroke="#805938" stroke-width="5" stroke-linecap="round"/><path d="M48 27h14v6H48m21 0h14v-6H69m27 5h16v-6H96M47 37h17v13H47m22-13h12v13H69m24-13h22v13H93m-45 5h15v13H48m23-13h18v13H71m24-13h20v13H95" fill="#d9b982" stroke="#9b724b" stroke-width="1.5"/><path d="M46 79h70" stroke="#755239" stroke-width="3"/>' + glyph;
  }
  if (spec.mode === 'mural') {
    return '<rect x="34" y="22" width="92" height="56" rx="4" fill="#fff0c8" stroke="#765b46" stroke-width="4"/><path d="M39 62q20-14 42 0t40 0v11H39Z" fill="#71b8bc"/><circle cx="99" cy="39" r="9" fill="#f4c65c"/><path d="m48 61 16-17 13 17m7-1 14-14 19 18" fill="#80a36a"/><path d="M46 28h23" stroke="#e17d86" stroke-width="4" stroke-linecap="round"/>' + glyph;
  }
  if (spec.mode === 'add') {
    const item = spec.item.toLowerCase();
    if (/lantern|beacon|light|lamp/.test(item)) return '<path d="M80 29v48" stroke="#795a3f" stroke-width="5"/><path d="M63 34h34l-4 23H67Z" fill="#e5a64f" stroke="#78583b" stroke-width="3"/><path d="M70 40h20v12H70Z" fill="#fff0a5"/><path d="M57 31h46m-40-6h34" stroke="#805d3e" stroke-width="3"/><path d="M66 62h28" stroke="#805d3e" stroke-width="3"/>' + glyph;
    if (/sign|marker|label|chart|edition|book|ledger|paper|record|shelf|library|archive/.test(item)) return '<path d="M80 64v20" stroke="#76583d" stroke-width="4"/><rect x="44" y="24" width="72" height="43" rx="4" fill="#c78f5c" stroke="#76583d" stroke-width="3"/><rect x="50" y="30" width="60" height="31" rx="2" fill="#f5e6bd"/><path d="M58 39h43m-43 7h33m-33 7h38" stroke="#9b7150" stroke-width="2"/>' + glyph;
    if (/rope|mooring/.test(item)) return '<path d="M51 64h58" stroke="#8b6943" stroke-width="7"/><path d="M80 64V45c0-13 19-13 19 0s-19 13-19 0" fill="none" stroke="#d2a35c" stroke-width="6" stroke-linecap="round"/><circle cx="51" cy="64" r="6" fill="#806044"/><circle cx="109" cy="64" r="6" fill="#806044"/>' + glyph;
    if (/platform|deck|board|rail|step|stair|piling|brace|rack/.test(item)) return '<path d="M35 42h90v14H35Zm6 16h78v12H41Zm9 14v8m60-8v8" fill="#b98553" stroke="#765239" stroke-width="2.5"/><path d="M43 48h74m-66 16h58" stroke="#dfb77f" stroke-width="2"/>' + glyph;
    return `<ellipse cx="80" cy="76" rx="40" ry="6" fill="#537c72" opacity=".22"/><circle cx="80" cy="49" r="27" fill="#fffaf0" stroke="#b69a72" stroke-width="3"/><text x="80" y="64" text-anchor="middle" font-size="39" font-family="Apple Color Emoji,Segoe UI Emoji,Noto Color Emoji,sans-serif">${spec.glyph}</text>`;
  }
  return `<ellipse cx="80" cy="76" rx="39" ry="7" fill="#537c72" opacity=".22"/><text x="80" y="67" text-anchor="middle" font-size="42" font-family="Apple Color Emoji,Segoe UI Emoji,Noto Color Emoji,sans-serif">${spec.glyph}</text><path d="M42 79h76" stroke="#719081" stroke-width="2" stroke-linecap="round"/>`;
}

function detailIllustration(spec, locationId, after) {
  if (['door','window','roof'].includes(spec.mode)) return `<svg viewBox="0 0 160 102" role="img" aria-label="${after ? spec.after : spec.before}">${architecturalDrawing(spec.mode, after)}</svg>`;
  const backdrop = siteBackdrop(locationId);
  const object = missingOrDamagedObject(spec, locationId, after);
  return `<svg viewBox="0 0 160 102" role="img" aria-label="${after ? spec.after : spec.before}">${backdrop}${object}</svg>`;
}

function repairTool(spec) {
  if (spec.mode === 'remove') return '🧹';
  if (spec.mode === 'plants') return '🪣';
  if (spec.mode === 'mural') return '🖌️';
  if (spec.mode === 'furniture') return '🪚';
  if (spec.mode === 'counter' || spec.mode === 'shelves') return '🔧';
  if (spec.mode === 'window' || spec.mode === 'door' || spec.mode === 'roof' || spec.mode === 'broken') return '🔨';
  return '🛠️';
}

function repairAction(spec) {
  const actions = {
    remove:'The crew clears away storm damage',
    roof:'Fresh boards and shingles are fitted into place',
    window:'The frame is squared and the new glass is set',
    door:'The door is lifted, aligned and secured',
    furniture:'The crew carries in and sets the new furniture',
    plants:'The crew plants, waters and tends the new growth',
    broken:'The broken section is braced and repaired',
    counter:'The counter is patched, sanded and fitted',
    shelves:'The shelf frame is built and secured',
    mural:'The welcome mural is painted by hand',
    add:'The new feature is mounted and secured'
  };
  return actions[spec.mode] || 'The crew fits the new improvement';
}

export function repairDetailState(locationId, level) {
  const spec = REPAIR_DETAILS[locationId]?.[level - 1];
  if (!spec) return null;
  const anchor = RESTORATION_OBJECT_REGISTRY[repairObjectId(locationId, level)];
  return {
    beforeState:spec.before,
    afterState:spec.after,
    repairItem:spec.item,
    mode:spec.mode,
    tool:repairTool(spec),
    action:repairAction(spec),
    x:anchor?.x ?? 384,
    y:anchor?.y ?? 300,
    width:anchor?.width ?? 256,
    height:anchor?.height ?? 180
  };
}

const FEATURE_COLORS = {
  coastal: { wood:'#7b9f9a', trim:'#d7eee1', cushion:'#78b9bd', pot:'#b9d9cf', flower:'#ef9a8f' },
  cottage: { wood:'#a87354', trim:'#f2d9b7', cushion:'#e88fa0', pot:'#c99073', flower:'#dd7190' },
  'sunny-market': { wood:'#b77c43', trim:'#f4df9f', cushion:'#eab44d', pot:'#d38c59', flower:'#f0c247' },
  default: { wood:'#a8734e', trim:'#f0d3a0', cushion:'#d9b477', pot:'#b97859', flower:'#e88991' }
};

function furnitureDrawing(colors, compact = false) {
  const scale = compact ? 'translate(0 0)' : '';
  return `${scale}<ellipse cx="130" cy="139" rx="115" ry="10" fill="#493d2d" opacity=".19"/>
    <g stroke="#614733" stroke-width="5" stroke-linecap="round" stroke-linejoin="round">
      <path d="M78 74 82 131m83-55-4 55" fill="none"/><path d="m90 91-5 40m68-40 7 40" fill="none"/>
      <path d="M50 81v48m26-52v53m-26-38h26" fill="none"/><path d="M187 83v47m27-51v52m-27-38h27" fill="none"/>
      <path d="M68 67q0-7 7-7h87q7 0 7 7v19H68Z" fill="${colors.wood}"/><path d="M73 70h91" stroke="${colors.trim}" stroke-width="3"/>
      <path d="M48 80q0-7 7-7h17q7 0 7 7v12H48Z" fill="${colors.cushion}"/><path d="M185 82q0-7 7-7h18q7 0 7 7v12h-32Z" fill="${colors.cushion}"/>
      <path d="M21 112h18l-3 27H24Zm200 0h18l-3 27h-12Z" fill="${colors.pot}"/><path d="M30 112q-15-17-17-4 5 10 17 8m1-4q15-19 18-6-4 12-18 12m177-7q-13-17-17-6 5 11 17 11m0-5q15-18 18-5-6 10-18 10" fill="#79a267" stroke="#567b4c" stroke-width="2"/>
      <circle cx="29" cy="99" r="5" fill="${colors.flower}" stroke="white" stroke-width="1.5"/><circle cx="210" cy="99" r="5" fill="#f3c55d" stroke="white" stroke-width="1.5"/>
    </g>`;
}

function plantDrawing(item, colors) {
  const tree = /tree|shade/.test(item);
  const shrub = /butterfly|pollinator|flowers|flower|beds|garden/.test(item);
  if (tree) return `<ellipse cx="130" cy="142" rx="59" ry="8" fill="#51412f" opacity=".17"/><path d="M113 142 117 64h25l6 78Z" fill="#98704e" stroke="#634a35" stroke-width="5"/><path d="M127 88 88 56m44 28 39-35m-42 20-4-36" fill="none" stroke="#765638" stroke-width="7" stroke-linecap="round"/><g fill="#78975c" stroke="#526f48" stroke-width="3"><circle cx="91" cy="52" r="31"/><circle cx="130" cy="36" r="39"/><circle cx="169" cy="53" r="31"/><circle cx="111" cy="68" r="29"/><circle cx="151" cy="69" r="29"/></g><g fill="${colors.flower}"><circle cx="104" cy="39" r="5"/><circle cx="150" cy="27" r="5"/><circle cx="173" cy="57" r="5"/></g>`;
  const flowerCount = /butterfly|pollinator/.test(item) ? 5 : 4;
  const stems = Array.from({length:flowerCount},(_,index)=>{
    const x=48+index*38, height=43+(index%3)*12;
    const bloom=['#ee8fa0','#f1c454','#9a91c5','#e98a72','#f3d36b'][index];
    return `<path d="M${x} 127V${127-height}" stroke="#547a4e" stroke-width="4" stroke-linecap="round"/><path d="M${x} 107q-15-14-22-3 8 14 22 8m0-16q13-16 21-6-5 14-21 12" fill="#77a55d" stroke="#527c4d" stroke-width="2"/><g fill="${bloom}" stroke="#fff4d9" stroke-width="1.4"><circle cx="${x}" cy="${127-height}" r="7"/><circle cx="${x-6}" cy="${121-height}" r="5"/><circle cx="${x+6}" cy="${121-height}" r="5"/><circle cx="${x}" cy="${121-height}" r="5"/></g><circle cx="${x}" cy="${122-height}" r="2.3" fill="#f5d669"/>`;
  }).join('');
  return `<ellipse cx="130" cy="139" rx="113" ry="8" fill="#51412f" opacity=".18"/><path d="M20 111h220l-10 30H31Z" fill="${colors.pot}" stroke="#704e3b" stroke-width="5"/><path d="M29 112q50-15 98 0t103 0v12H29Z" fill="#604a34" stroke="#493d2d" stroke-width="3"/>${stems}${shrub ? '<path d="M197 92q13-20 25-8-6 15-25 14m-6 4q-18-15-26-1 12 12 26 5" fill="#83a45b" stroke="#597c4b" stroke-width="2"/>' : ''}`;
}

function objectDrawing(spec, locationId, installed, designId = '') {
  const mode = spec.mode;
  const item = spec.item.toLowerCase();
  const colors = FEATURE_COLORS[designId] || FEATURE_COLORS.default;
  const outline = '#604a39';
  const shadow = '<ellipse cx="130" cy="144" rx="112" ry="8" fill="#3b342a" opacity=".18"/>';
  if (mode === 'window') {
    if (locationId === 'cafe') {
      const fitted = '<rect x="86" y="10" width="82" height="142" rx="2" fill="#f0cf7f" stroke="#6e4c38" stroke-width="8"/><path d="M95 18h64v126H95Z" fill="#f4d98f"/><path d="M127 18v126M95 81h64" stroke="#80583e" stroke-width="7"/><path d="M78 158h98" stroke="#8e7156" stroke-width="5"/><path d="m101 29 19-5m27 71 13-10" stroke="#fff6d8" stroke-width="4" opacity=".76"/>';
      const opening = '<rect x="86" y="10" width="82" height="142" fill="#36545a" stroke="#806049" stroke-width="8"/><path d="M95 19h64v124H95Z" fill="#29464d"/><path d="M82 158h90" stroke="#c58a60" stroke-width="6"/>';
      return installed ? fitted : opening;
    }
    const glass = installed ? '<rect x="63" y="27" width="134" height="101" rx="4" fill="#a7d7d9" stroke="#6e4c38" stroke-width="8"/><path d="M130 30v95M66 78h128" stroke="#8a5e3d" stroke-width="7"/><path d="m76 39 35-8m57 59 22-17" stroke="#fff" stroke-width="5" opacity=".72"/>' : '<rect x="61" y="25" width="138" height="105" fill="#36545a" stroke="#806049" stroke-width="9"/><path d="M72 36 99 63m80-24-33 31m-68 43 23-22m54 22 29-26" stroke="#ddf1e7" stroke-width="4"/><path d="M65 23h136" stroke="#c58a60" stroke-width="7"/>';
    return `${shadow}<path d="M34 25h192v118H34Z" fill="#edcfa6" stroke="#9b7757" stroke-width="5"/>${glass}<path d="M49 143h163" stroke="#b78459" stroke-width="8"/>`;
  }
  if (mode === 'door') {
    const door = installed ? `<path d="M75 142V48q0-35 55-35t55 35v94Z" fill="#${designId==='coastal'?'739c91':designId==='modern'?'84999a':'a56b45'}" stroke="${outline}" stroke-width="8"/><path d="M87 139V51q0-25 43-25t43 25v88Z" fill="${colors.wood}" stroke="#704a32" stroke-width="4"/><path d="M97 49h27v34H97Zm39 0h27v34h-27Zm-39 44h27v34H97Zm39 0h27v34h-27Z" fill="${colors.trim}" stroke="#725038" stroke-width="3"/><circle cx="157" cy="96" r="5" fill="#f4d17a"/>` : '<path d="M68 145V49q0-41 62-41t62 41v96Z" fill="#344d55" stroke="#7a563b" stroke-width="8"/><path d="M82 143V50q0-29 48-29t48 29v93" fill="none" stroke="#efdec0" stroke-width="5" stroke-dasharray="8 7"/>';
    return `${shadow}<path d="M37 147V50q0-62 93-62t93 62v97" fill="#eacb9a" stroke="#8f6d4e" stroke-width="8"/>${door}`;
  }
  if (mode === 'roof') {
    // A roof repair is a fitted shingle patch, not a wall panel. Keep the
    // drawing's transparent margins so its artwork-space anchor stays stable.
    const patch = installed
      ? `<path d="m53 83 77-54 77 54-10 12-67-45-67 46Z" fill="${colors.wood}" stroke="#654731" stroke-width="6" stroke-linejoin="round"/><path d="m71 79 59-41 60 41M83 88l47-33 48 33" fill="none" stroke="${colors.trim}" stroke-width="5" stroke-linecap="round"/><path d="m64 94 66-46 67 46" fill="none" stroke="#76523a" stroke-width="4"/>`
      : '<path d="m53 83 77-54 77 54M68 94l62-43 60 43" fill="none" stroke="#76533b" stroke-width="7" stroke-linecap="round"/><path d="m91 65 39-27 38 27" fill="#3d3936" stroke="#fff3d8" stroke-width="2.5" stroke-dasharray="7 5"/><path d="m105 65 19-13m10 17 17-12" stroke="#ba8655" stroke-width="4" stroke-linecap="round"/>';
    return patch;
  }
  if (mode === 'furniture') return `${shadow}${installed ? furnitureDrawing(colors, true) : '<path d="M20 133h220" stroke="#8a7152" stroke-width="5" stroke-dasharray="9 8"/><path d="M40 120h180" stroke="#fff3d8" stroke-width="3" opacity=".7"/>'}`;
  if (mode === 'plants') return `${shadow}${installed ? plantDrawing(item, colors) : '<path d="M20 112h220l-10 30H30Z" fill="#b3815e" stroke="#704e3a" stroke-width="5"/><path d="M33 111q54-14 98 0t104 0" fill="#604b35" stroke="#48392a" stroke-width="3"/><path d="M72 104v-12m58 12V88m54 16v-9" stroke="#82946a" stroke-width="3" opacity=".5"/>'}`;
  if (mode === 'remove') {
    const debris = '<path d="m30 131 17-22 17 15 15-36 21 37 17-25 17 30 16-19 26 25H24Z" fill="#8b7b68" stroke="#625849" stroke-width="4"/><path d="m53 112 13 11m30-25 12 14m34 1 11 6" stroke="#e0c69a" stroke-width="4"/>';
    return `${shadow}${installed ? '<path d="M24 133h212" stroke="#a47d59" stroke-width="5"/><path d="M44 138h172" stroke="#f2e2c3" stroke-width="3" stroke-dasharray="8 9"/>' : debris}`;
  }
  if (mode === 'broken') {
    const label = /stair|step/.test(item) ? 'steps' : /lens/.test(item) ? 'lens' : /saw/.test(item) ? 'saw' : 'beam';
    if (label === 'steps') return `${shadow}<path d="M28 130h57v-25h51V80h54V53h42" fill="none" stroke="${installed?'#b98756':'#80523a'}" stroke-width="21" stroke-linejoin="round"/><path d="M85 130v-25m51 0V80m54 0V53" stroke="#e1bd8b" stroke-width="4"/>${installed ? '<path d="M27 51 223 13" stroke="#8e603e" stroke-width="7"/><path d="m35 46 13 14m153-56 14 15" stroke="#e5c48e" stroke-width="4"/>' : '<path d="m117 71 12 12-11 10 12 10" fill="none" stroke="#43362f" stroke-width="5"/>'}`;
    if (label === 'lens') return `${shadow}<circle cx="130" cy="78" r="49" fill="${installed?'#b9e8e4':'#6d7772'}" stroke="#845d3c" stroke-width="10"/><circle cx="130" cy="78" r="34" fill="${installed?'#fff4b5':'#56635f'}" stroke="#d6aa5c" stroke-width="5"/>${installed ? '<path d="M72 78h116" stroke="#fff" stroke-width="8" opacity=".78"/>' : '<path d="m104 50 17 20-13 13 20 21" fill="none" stroke="#493c35" stroke-width="5"/>'}`;
    return `${shadow}<path d="M31 76 220 63l9 33-189 18Z" fill="${installed?'#b98755':'#9c704c'}" stroke="#634a37" stroke-width="6"/><path d="M52 120v18m150-47 5 30" stroke="#76533b" stroke-width="8"/>${installed ? '<path d="M48 83h158M57 97h133" stroke="#e0bd87" stroke-width="5"/>' : '<path d="m120 70 14 15-16 8 15 11" fill="none" stroke="#41362f" stroke-width="6"/>'}`;
  }
  if (mode === 'counter') {
    const surface = installed ? '<path d="M22 73h216l-12 23H35Z" fill="#c38f5d" stroke="#704d34" stroke-width="6"/><path d="M37 97v43m171-43v43" stroke="#79543a" stroke-width="10"/><path d="M44 79h171" stroke="#f0d09a" stroke-width="5"/><rect x="73" y="51" width="37" height="22" rx="4" fill="#f7e7bf" stroke="#8a6446" stroke-width="4"/><path d="M82 51v-11h19v11" fill="none" stroke="#8a6446" stroke-width="4"/>' : '<path d="M28 74h208l-10 24H38Z" fill="#9d704d" stroke="#664a36" stroke-width="6"/><path d="M42 99v42m169-42v42" stroke="#76533b" stroke-width="10"/><path d="m115 76 12 10-10 5 14 5" fill="none" stroke="#43352d" stroke-width="5"/><path d="M55 91h40" stroke="#40362d" stroke-width="4"/>';
    return `${shadow}${surface}`;
  }
  if (mode === 'shelves') {
    const books = '<path d="M55 42h18v30H55Zm25-5h14v35H80Zm20 8h18v27h-18Zm30-3h15v30h-15Zm22 5h19v25h-19Zm-93 44h18v25H59Zm24-4h15v29H83Zm23 5h18v24h-18Zm26-5h19v29h-19Zm28 7h19v22h-19Z" fill="#e6c88d" stroke="#8a6644" stroke-width="3"/>';
    return `${shadow}${installed ? '<path d="M43 29v112m177-112v112M37 42h190M37 83h190M37 125h190" fill="none" stroke="#80583a" stroke-width="9" stroke-linecap="round"/>'+books : '<path d="M42 30v110m180-110v110" stroke="#a58362" stroke-width="6" stroke-dasharray="9 9"/><path d="M39 82h187" stroke="#c7ae8b" stroke-width="4" stroke-dasharray="8 8"/>'}`;
  }
  if (mode === 'mural') {
    return `${shadow}<rect x="29" y="22" width="202" height="117" rx="5" fill="${installed?'#f5e8c7':'#e8d6b8'}" stroke="#745b46" stroke-width="7"/>${installed ? '<path d="M39 96q47-40 93 0t88 0v34H39Z" fill="#6db5bb"/><path d="m50 95 37-37 32 37m23-1 32-34 35 35" fill="#85a768"/><circle cx="178" cy="52" r="15" fill="#efbf55"/><path d="M51 46h38" stroke="#e88991" stroke-width="8" stroke-linecap="round"/>' : '<path d="M48 43h94m-94 18h145m-145 18h79" stroke="#d8c7aa" stroke-width="4" stroke-dasharray="7 8"/>'}`;
  }
  if (mode === 'add') {
    if (/shelter/.test(item)) {
      const roof = '<path d="M42 57 130 16l88 41-8 13-80-36-80 36Z" fill="#9e6947" stroke="#604733" stroke-width="6" stroke-linejoin="round"/><path d="m61 58 69-32 70 32" fill="none" stroke="#d7ad74" stroke-width="5" stroke-linecap="round"/><path d="M48 70v72m164-72v72M59 73v66m142-66v66" stroke="#76553b" stroke-width="8" stroke-linecap="round"/><path d="M46 142h168" stroke="#604733" stroke-width="8"/>';
      const shelterBefore = '<path d="M42 57 130 16l88 41M48 70v72m164-72v72" fill="none" stroke="#8e7256" stroke-width="6" stroke-dasharray="9 8"/><path d="M55 143h150" fill="none" stroke="#8e7256" stroke-width="5" stroke-dasharray="8 7"/>';
      const shelterAfter = `${roof}<path d="M55 70h150v72H55Z" fill="#e2c899" fill-opacity=".22" stroke="#76553b" stroke-width="4"/><path d="M73 111h72v7H73Zm7 8v19m57-19v19" fill="#b98553" stroke="#765239" stroke-width="3"/><path d="M164 91v42m0-34 27-13m-27 25 27 13" fill="none" stroke="#946b46" stroke-width="5" stroke-linecap="round"/><path d="M158 88h12m-12 8h12" stroke="#d3ae7b" stroke-width="3"/>`;
      return `${shadow}${installed ? shelterAfter : shelterBefore}`;
    }
    if (/lantern|beacon|light|lamp/.test(item)) return `${shadow}<path d="M130 137V44" stroke="#75563c" stroke-width="9"/><path d="M92 50h76l-9 49h-58Z" fill="${installed?'#e4aa51':'#657d7a'}" stroke="#674a34" stroke-width="6"/><path d="M105 60h50v27h-50Z" fill="${installed?'#fff2a9':'#526d70'}" stroke="#f4dfae" stroke-width="4"/><path d="M84 48h92m-73-11h55" stroke="#78583c" stroke-width="7" stroke-linecap="round"/>${installed ? '<path d="M83 72h-20m123 0h20" stroke="#ffef9c" stroke-width="5" opacity=".85"/>' : ''}`;
    if (/bell/.test(item)) return `${shadow}<path d="M130 49v-7" stroke="#76563a" stroke-width="5" stroke-linecap="round"/><circle cx="130" cy="39" r="4" fill="#e6c779" stroke="#76563a" stroke-width="2"/><path d="M109 69q1-25 21-25t21 25l7 9h-56Z" fill="${installed?'#d5a34e':'#d2b998'}" stroke="#755538" stroke-width="4"/><path d="M103 79h54" stroke="#efcf75" stroke-width="4" stroke-linecap="round"/><circle cx="130" cy="84" r="3" fill="#a6703b"/>${installed ? '<path d="m113 53 6-5m28 5-6-5" stroke="#fff5c3" stroke-width="2"/>' : ''}`;
    if (/sign|marker|label|chart/.test(item)) return `${shadow}<path d="M128 83v62" stroke="#76583d" stroke-width="9"/><path d="M48 27h164v74H48Z" fill="${installed?'#c68a54':'#b19b7c'}" stroke="#6f523a" stroke-width="7"/><path d="M61 40h138v48H61Z" fill="#f4e6c7" stroke="#a67b50" stroke-width="3"/>${installed ? '<path d="M79 54h101m-101 15h79" stroke="#8b6444" stroke-width="6" stroke-linecap="round"/><circle cx="70" cy="48" r="3" fill="#fff"/>' : '<path d="M77 62h83" stroke="#c2ae91" stroke-width="5" stroke-dasharray="8 7"/>'}`;
    if (/rope|mooring/.test(item)) return `${shadow}<path d="M42 121h177" stroke="#76583e" stroke-width="16" stroke-linecap="round"/><path d="M67 117V74q0-24 23-24t23 24v18q0 21 22 21t22-21V64q0-18 21-18" fill="none" stroke="${installed?'#d5a661':'#827562'}" stroke-width="10" stroke-linecap="round"/>${installed ? '<path d="M71 86h35m53 4h34" stroke="#f1d18e" stroke-width="3"/>' : '<path d="m128 87 11 11-13 8 11 11" fill="none" stroke="#493b30" stroke-width="5"/>'}`;
    if (/seed|library|cabinet|records/.test(item)) return `${shadow}<path d="M55 62 130 23l75 39" fill="#a76f47" stroke="#604633" stroke-width="6"/><rect x="61" y="61" width="138" height="77" rx="4" fill="${installed?'#c18a5a':'#aa7d59'}" stroke="#654a34" stroke-width="6"/><rect x="75" y="76" width="109" height="45" rx="5" fill="#f1dfb8" stroke="#76543a" stroke-width="4"/><path d="M89 89h80m-80 13h57" stroke="#b2895d" stroke-width="4"/>${installed ? '<path d="M91 115v-16q12-15 24 0v16m22 0V99q12-16 24 0v16" fill="#83a35d" stroke="#577847" stroke-width="3"/>' : ''}`;
    if (/platform|deck|board|rail|step|stair|piling|brace|stage/.test(item)) return `${shadow}<path d="M25 76h220v22H25Zm13 25h194v18H38Zm18 21h158v15H56Z" fill="${installed?'#b7844f':'#9e7958'}" stroke="#654a35" stroke-width="5"/><path d="M44 82h181m-169 27h157m-140 21h121" stroke="#e5c28c" stroke-width="4"/>${installed ? '<path d="M42 75v-37m185 37V38M42 47h185" fill="none" stroke="#78563a" stroke-width="7"/>' : '<path d="m108 76 13 12-12 8 16 9" fill="none" stroke="#4a392e" stroke-width="5"/>'}`;
    if (/canopy|awning|shade/.test(item)) return `${shadow}<path d="M54 138V54m150 84V54M49 55h161" fill="none" stroke="#75543a" stroke-width="8"/><path d="M42 57 69 27h120l28 30Z" fill="${installed?colors.cushion:'#b5a78d'}" stroke="#684a36" stroke-width="6"/><path d="M71 29v26m40-26v26m42-26v26" stroke="#fff3d9" stroke-width="5"/>`;
    if (/bird|perch/.test(item)) return `${shadow}<path d="M132 138V46m-39 39h79" stroke="#78563c" stroke-width="9" stroke-linecap="round"/>${installed ? '<path d="M116 64q16-19 34 0l-4 17h-28Z" fill="#f1eee0" stroke="#5f594d" stroke-width="4"/><circle cx="139" cy="68" r="2.5" fill="#453d32"/><path d="m148 72 12 4-12 4m-20 1-12 12" fill="none" stroke="#5f594d" stroke-width="3"/>' : ''}`;
    return `${shadow}<path d="M46 136V72h168v64" fill="#e3cda4" stroke="#73543b" stroke-width="7"/><path d="M60 82h140m-140 20h140m-140 20h140" stroke="#a27d54" stroke-width="5"/>${installed ? '<path d="M76 69h105" stroke="#f2d68e" stroke-width="7"/>' : ''}`;
  }
  return `${shadow}<path d="M30 128h200" stroke="${outline}" stroke-width="5"/>`;
}

function featureSvg(spec, locationId, installed, designId = '', className = '') {
  const drawing = objectDrawing(spec, locationId, installed, designId);
  return `<svg class="${className}" viewBox="0 0 260 160" role="img" aria-label="${installed ? spec.after : spec.before}" xmlns="http://www.w3.org/2000/svg">${drawing}</svg>`;
}

function patioGroundMarkup() {
  return `<path d="M0 535q138-33 258-9t245 0q170-18 521 12v230H0Z" fill="#d9c6a0" fill-opacity=".12" stroke="#ab8e69" stroke-width="2" stroke-opacity=".35"/><path d="M0 582q162-22 320 0t345-1q172-13 359 1M0 635q148-17 309 0t360-2q177-12 355 0M0 690q168-14 324 0t353-1q171-9 347 0M122 540l-7 42m106-45-6 45m151-39-5 47m157-50-8 45m165-39-6 46m99-42-7 45M60 634l7 53m199-49-5 51m176-52-7 50m170-48-5 52m176-53-7 54" fill="none" stroke="#b99d78" stroke-width="3" opacity=".3"/>`;
}

function patioFurnitureMarkup(styleId) {
  const colors = FEATURE_COLORS[styleId] || FEATURE_COLORS.default;
  const set = (x, y, scale) => `<g transform="translate(${x} ${y}) scale(${scale})">${furnitureDrawing(colors)}</g>`;
  return `<g class="repair-patio-furniture">${set(115,518,.92)}${set(588,517,.93)}</g>`;
}

const SCENE_LAYOUTS = {
  // Positions match the actual object centers in each 1024 × 768 scene,
  // including the strong diagonal perspective of the pier and wharf artwork.
  garden: [[380,475,300,170],[100,465,300,230],[660,440,300,230],[700,35,270,350],[370,300,290,250],[170,535,690,150],[665,400,260,200],[70,430,360,245]],
  pier: [[340,520,470,230],[500,420,300,190],[420,300,180,220],[700,245,190,180],[600,500,340,210],[100,375,350,250],[700,330,250,230],[400,510,480,230]],
  wharf: [[340,520,470,230],[500,420,300,190],[420,300,180,220],[700,245,190,180],[600,500,340,210],[100,375,350,250],[700,330,250,230],[400,510,480,230]],
  office: [[370,475,300,190],[390,230,260,230],[665,235,240,310],[565,425,220,180],[380,450,300,200],[420,480,260,180],[680,290,230,250],[390,405,280,210]],
  archive: [[370,475,300,190],[665,400,240,180],[170,410,250,250],[330,390,260,180],[390,455,300,210],[680,290,230,220],[665,400,240,250],[390,445,300,200]],
  market: [[340,540,360,180],[180,410,280,220],[600,270,250,210],[300,520,430,190],[310,260,400,250],[650,440,280,230],[320,410,370,230],[300,195,430,180]],
  festival: [[340,540,360,180],[180,410,280,220],[600,270,250,210],[300,520,430,190],[310,260,400,250],[650,440,280,230],[320,410,370,230],[300,195,430,180]],
  lighthouse: [[400,520,280,190],[350,420,320,220],[630,190,200,250],[420,285,210,220],[440,300,220,210],[410,275,240,220],[210,350,250,230],[440,220,230,250]]
};

const CAFE_ANCHORS = {
  // Every target is in source-art coordinates; the scene camera follows these
  // points so the active repair stays on screen on narrow portrait devices.
  1: { x:360, y:566, width:300, height:130, layer:'damaged', zIndex:20, renderedByScene:true },
  2: { x:340, y:72, width:360, height:210, layer:'architecture', zIndex:30, renderedByScene:true },
  3: { x:248, y:285, width:230, height:225, layer:'architecture', zIndex:32, renderedByScene:true },
  4: { x:260, y:432, width:500, height:250, layer:'restored', zIndex:35, renderedByScene:true },
  5: { x:390, y:390, width:250, height:280, layer:'architecture', zIndex:34, renderedByScene:true },
  6: { x:280, y:335, width:470, height:285, layer:'restored', zIndex:35, renderedByScene:true },
  7: { x:190, y:492, width:640, height:235, layer:'decorations', zIndex:45, renderedByScene:true },
  // Small brass fitting above the café's centered front doorway.
  8: { x:480, y:343, width:110, height:80, layer:'decorations', zIndex:46, animationAnchor:'bell' }
};

function repairObjectId(locationId, level) {
  const cafeIds = {
    1:'cafe_storm_debris', 2:'cafe_roof_section_01', 3:'cafe_window_01',
    4:'cafe_dining_set', 5:'cafe_front_door', 6:'cafe_kitchen_counter',
    7:'cafe_garden_seating', 8:'cafe_welcome_bell'
  };
  if (locationId === 'cafe') return cafeIds[level];
  const spec = REPAIR_DETAILS[locationId]?.[level - 1];
  const stem = String(spec?.item || `repair_${level}`).toLowerCase().replace(/[^a-z0-9]+/g, '_').replace(/^_|_$/g, '');
  return `${locationId}_${stem}`;
}

function sceneAnchor(locationId, level) {
  if (locationId === 'cafe') return CAFE_ANCHORS[level] || { x:365,y:450,width:290,height:200,layer:'decorations',zIndex:40 };
  const [x,y,width,height] = SCENE_LAYOUTS[locationId]?.[level - 1] || [394,370,280,206];
  const mode = REPAIR_DETAILS[locationId]?.[level - 1]?.mode || '';
  const layer = ['roof','window','door','counter','shelves','mural'].includes(mode)
    ? 'architecture'
    : mode === 'remove' || mode === 'broken' ? 'damaged'
      : mode === 'furniture' || mode === 'plants' || mode === 'add' ? 'decorations' : 'restored';
  return { x,y,width,height,layer,zIndex:layer === 'architecture' ? 30 : layer === 'damaged' ? 25 : 40 };
}

export const RESTORATION_OBJECT_REGISTRY = Object.freeze(Object.fromEntries(
  Object.entries(REPAIR_DETAILS).flatMap(([locationId, repairs]) => repairs.map((spec,index) => {
    const level = index + 1;
    const anchor = sceneAnchor(locationId, level);
    const id = repairObjectId(locationId, level);
    return [id, Object.freeze({
      id, locationId, level, damagedImage:spec.before, restoredImage:spec.after,
      x:anchor.x, y:anchor.y, width:anchor.width, height:anchor.height,
      zIndex:anchor.zIndex, layer:anchor.layer,
      transform:anchor.transform || '', animationAnchor:anchor.animationAnchor || '',
      renderedByScene:Boolean(anchor.renderedByScene), item:spec.item, mode:spec.mode
    })];
  }))
));

export function getRestorationObject(objectId) {
  return RESTORATION_OBJECT_REGISTRY[objectId] || null;
}

export function restorationObjectIds(locationId) {
  return Object.values(RESTORATION_OBJECT_REGISTRY).filter(object => object.locationId === locationId).map(object => object.id);
}

function featureGroup(locationId, level, installed, styleId = '', isCurrent = false, allowSceneCurrent = false) {
  const spec = REPAIR_DETAILS[locationId]?.[level - 1];
  const id = repairObjectId(locationId, level);
  const anchor = RESTORATION_OBJECT_REGISTRY[id];
  if (!spec || !anchor || (anchor.renderedByScene && !allowSceneCurrent)) return '';
  const contents = isCurrent
    ? `<g class="repair-feature-before">${objectDrawing(spec, locationId, false, styleId)}</g><g class="repair-feature-after">${objectDrawing(spec, locationId, true, styleId)}</g>`
    : `<g class="repair-feature-built">${objectDrawing(spec, locationId, true, styleId)}</g>`;
  return `<svg class="repair-scene-feature ${isCurrent ? 'repair-feature-current' : 'repair-feature-built'} ${isCurrent ? `feature-mode-${spec.mode}` : ''}" data-restoration-object="${id}" data-scene-layer="${anchor.layer}" x="${anchor.x}" y="${anchor.y}" width="${anchor.width}" height="${anchor.height}" viewBox="0 0 260 160" preserveAspectRatio="none" aria-label="${isCurrent ? spec.item : `Restored ${spec.item}`}">${contents}</svg>`;
}

function repairWorkEffectMarkup(locationId, level, phase) {
  const spec = REPAIR_DETAILS[locationId]?.[level - 1];
  const anchor = RESTORATION_OBJECT_REGISTRY[repairObjectId(locationId, level)];
  if (!spec || !anchor || !['objective','work'].includes(phase)) return '';
  const cx = anchor.x + anchor.width / 2;
  const cy = anchor.y + anchor.height / 2;
  const radius = Math.max(46, Math.min(94, Math.min(anchor.width, anchor.height) * .38));
  if (phase === 'objective') {
    return `<g class="repair-target-reticle" transform="translate(${cx} ${cy})" aria-hidden="true"><circle r="${radius}"/><path d="M0 ${-radius - 22}v14M0 ${radius + 8}v14M${-radius - 22} 0h14M${radius + 8} 0h14"/></g>`;
  }
  const toolX = cx + radius * .76;
  const toolY = cy - radius * .72;
  return `<g class="repair-work-action feature-mode-${spec.mode}" transform="translate(${cx} ${cy})" aria-hidden="true">
    <circle class="repair-work-halo" r="${radius}"/>
    <circle class="repair-work-orbit" r="${radius * .78}"/>
    <path class="repair-work-spark" d="M${-radius * .72} ${-radius * .35}l8 13 13-8-8 13 12 8-15-2-6 14-2-16-14-3 14-5Z"/>
    <path class="repair-work-spark repair-work-spark-two" d="M${radius * .55} ${radius * .48}l5 9 9-5-5 9 9 5-11-1-4 10-2-11-10-2 10-4Z"/>
    <g transform="translate(${toolX - cx} ${toolY - cy})"><g class="repair-work-tool"><circle r="35"/><text y="13" text-anchor="middle">${repairTool(spec)}</text></g></g>
  </g>`;
}

export function repairEnvironmentMarkup(locationId, restoredThrough = 0, activeLevel = 0, activeCompleted = false, activeStyle = '', stylesByLevel = {}, phase = 'objective') {
  const levels = Math.max(0, Math.min(8, Number(restoredThrough) || 0));
  const active = Math.max(0, Math.min(8, Number(activeLevel) || 0));
  const layers = { architecture:[], damaged:[], restored:[], decorations:[], effects:[] };
  const addFeature = (level, styleId = '', isCurrent = false) => {
    const id = repairObjectId(locationId, level);
    const object = RESTORATION_OBJECT_REGISTRY[id];
    if (!object) return;
    if (object.renderedByScene && !(isCurrent && phase === 'work')) {
      layers[object.layer].push(`<g data-restoration-object="${id}" data-scene-layer="${object.layer}" data-anchor="${object.x},${object.y},${object.width},${object.height}" aria-hidden="true"></g>`);
      return;
    }
    const markup = featureGroup(locationId, level, isCurrent ? activeCompleted : true, styleId, isCurrent, isCurrent && phase === 'work');
    if (markup) layers[object.layer].push(markup);
  };
  for (let level = 1; level <= levels; level += 1) addFeature(level, stylesByLevel[level] || '', false);
  if (active && active <= 8 && REPAIR_DETAILS[locationId]?.[active - 1]) {
    addFeature(active, activeStyle || stylesByLevel[active] || '', true);
    const effect = repairWorkEffectMarkup(locationId, active, phase);
    if (effect) layers.effects.push(effect);
  }
  const layerMarkup = Object.entries(layers).map(([layer,items]) =>
    `<g class="restoration-layer-${layer}" data-scene-layer="${layer}">${items.join('')}</g>`
  ).join('');
  return `<svg class="restoration-object-layer" viewBox="0 0 1024 768" preserveAspectRatio="xMidYMid slice" aria-hidden="true" focusable="false" xmlns="http://www.w3.org/2000/svg">${layerMarkup}</svg>`;
}

export function repairDesignArtMarkup(locationId, level, designId = '') {
  const spec = REPAIR_DETAILS[locationId]?.[level - 1];
  if (!spec) return '';
  if (locationId === 'cafe' && level === 7) {
    const colors = FEATURE_COLORS[designId] || FEATURE_COLORS.default;
    return `<svg class="repair-choice-drawing patio-choice-drawing" viewBox="0 0 260 160" role="img" aria-label="${designId.replaceAll('-', ' ')} garden table, chairs and flower planters" xmlns="http://www.w3.org/2000/svg"><path d="M0 121q65-13 128 0t132 0v39H0Z" fill="#dac59e"/><path d="M0 137h260M54 124v36m70-36v36m73-36v36" stroke="#b59a73" stroke-width="3"/>${furnitureDrawing(colors, true)}</svg>`;
  }
  if (locationId === 'cafe' && level === 4) {
    const colors = FEATURE_COLORS[designId] || FEATURE_COLORS.default;
    const floor = designId === 'seafoam' ? '#88aaa0' : designId === 'rose' ? '#bd796d' : '#d9a75f';
    return `<svg class="repair-choice-drawing" viewBox="0 0 260 160" role="img" aria-label="${designId} stained café floor with tables and chairs" xmlns="http://www.w3.org/2000/svg"><path d="M0 0h260v160H0Z" fill="#eed7b4"/><path d="M0 0h260v160H0Z" fill="${floor}" opacity=".72"/><path d="M0 35h260M0 77h260M0 119h260M65 0v160m68-160v160m64-160v160" stroke="#fff2d8" stroke-width="3" opacity=".7"/><g transform="translate(5 4) scale(.94)">${furnitureDrawing(colors, true)}</g></svg>`;
  }
  const svg = featureSvg(spec, locationId, true, designId, 'repair-choice-drawing');
  return svg.replace('role="img"', `role="img"`);
}

export function repairFocusSceneMarkup(locationId, level, installed = false, designId = '') {
  const spec = REPAIR_DETAILS[locationId]?.[level - 1];
  if (!spec) return '';
  const illustration = objectDrawing(spec, locationId, installed, designId);
  const ariaLabel = installed ? spec.after : spec.before;
  return `<svg class="repair-focus-illustration" viewBox="0 0 260 160" preserveAspectRatio="xMidYMid slice" role="img" aria-label="${ariaLabel}" xmlns="http://www.w3.org/2000/svg"><defs><linearGradient id="repairFocusLight" x1="0" y1="0" x2="1" y2="1"><stop stop-color="#fff7e5"/><stop offset="1" stop-color="#dfeddf"/></linearGradient></defs><rect width="260" height="160" rx="13" fill="url(#repairFocusLight)"/><svg x="0" y="0" width="260" height="160" viewBox="0 0 160 102" preserveAspectRatio="none">${siteBackdrop(locationId)}</svg><path d="M0 151q65-9 130 0t130 0v9H0Z" fill="#fff7e3" fill-opacity=".68"/><g class="repair-focus-object">${illustration}</g></svg>`;
}
