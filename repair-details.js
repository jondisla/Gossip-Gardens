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
  if (locationId === 'lighthouse' || locationId === 'archive') {
    return '<rect width="160" height="102" rx="12" fill="#d8e4df"/><path d="M0 0h160v71H0Z" fill="#eadfc8"/><path d="M0 72h160v30H0Z" fill="#9e917d"/><path d="M0 83h160M0 94h160" stroke="#817665" stroke-width="2" opacity=".5"/><path d="M12 12h18v36H12Z" fill="#8bbbc2" stroke="#856b50" stroke-width="3"/><path d="M21 12v36m-9-18h18" stroke="#f5e7ca" stroke-width="2"/>';
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

export function repairDetailMarkup(locationId, level, afterOnly = false) {
  const spec = REPAIR_DETAILS[locationId]?.[level - 1];
  if (!spec) return '';
  if (afterOnly) {
    return `<section class="repair-detail-comparison repair-detail-after-only" aria-label="Repaired feature: ${spec.item}">
      <header><span>REPAIRED</span><b>${spec.item}</b></header>
      <div class="repair-detail-after-result">${detailIllustration(spec, locationId, true)}<b>${spec.after}</b></div>
    </section>`;
  }
  return `<section class="repair-detail-comparison" aria-label="Exact repair detail: ${spec.item}">
    <header><span>EXACT REPAIR</span><b>${spec.item}</b></header>
    <div class="repair-detail-pair">
      <div class="repair-detail-side before"><small>BEFORE</small>${detailIllustration(spec, locationId, false)}<b>${spec.before}</b></div>
      <span class="repair-detail-arrow" aria-hidden="true">›</span>
      <div class="repair-detail-side after"><small>AFTER</small>${detailIllustration(spec, locationId, true)}<b>${spec.after}</b></div>
    </div>
  </section>`;
}

export function repairDetailState(locationId, level) {
  const spec = REPAIR_DETAILS[locationId]?.[level - 1];
  return spec ? { beforeState:spec.before, afterState:spec.after, repairItem:spec.item } : null;
}
