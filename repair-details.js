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

const STEP_ZONES = {
  cafe: [
    {zone:'indoor',room:'dining room'}, {zone:'indoor',room:'dining room'},
    {zone:'indoor',room:'dining room'}, {zone:'indoor',room:'dining room'},
    {zone:'indoor',room:'front entry'}, {zone:'indoor',room:'kitchen'},
    {zone:'outdoor',area:'café deck'}, {zone:'outdoor',area:'café deck'}
  ],
  pier: Array.from({length:8}, () => ({zone:'outdoor',area:'pier dock'})),
  garden: Array.from({length:8}, () => ({zone:'outdoor',area:'garden yard'})),
  office: Array.from({length:8}, () => ({zone:'indoor',room:'Gazette newsroom'})),
  market: Array.from({length:8}, () => ({zone:'outdoor',area:'market square'})),
  lighthouse: [
    {zone:'indoor',room:'storehouse'}, {zone:'indoor',room:'stairwell'},
    {zone:'indoor',room:'keeper room'}, {zone:'indoor',room:'lantern room'},
    {zone:'indoor',room:'lantern room'}, {zone:'indoor',room:'lantern room'},
    {zone:'indoor',room:'record nook'}, {zone:'indoor',room:'lantern room'}
  ],
  workshop: Array.from({length:8}, () => ({zone:'indoor',room:'workshop'})),
  archive: Array.from({length:8}, () => ({zone:'indoor',room:'archive room'})),
  wharf: Array.from({length:8}, () => ({zone:'outdoor',area:'old wharf landing'})),
  festival: Array.from({length:8}, () => ({zone:'outdoor',area:'festival plaza'}))
};

// Repair target regions use normalized top-left coordinates on each plate.
// These authored boxes remain the default; the ?debug=plates tool can measure
// and visualize a step's actual pixel-difference bounds in the running scene.
export const REGIONS = Object.freeze({
  cafe: [
    {x:.30,y:.66,w:.23,h:.19}, {x:.06,y:.03,w:.88,h:.24}, {x:.50,y:.19,w:.38,h:.29},
    {x:.05,y:.63,w:.87,h:.30}, {x:.72,y:.27,w:.25,h:.43}, {x:.30,y:.42,w:.43,h:.23},
    {x:.06,y:.62,w:.87,h:.31}, {x:.72,y:.12,w:.24,h:.18}
  ],
  pier: [
    {x:.24,y:.62,w:.42,h:.20}, {x:.34,y:.72,w:.48,h:.16}, {x:.67,y:.36,w:.19,h:.28},
    {x:.13,y:.35,w:.22,h:.17}, {x:.22,y:.64,w:.44,h:.24}, {x:.04,y:.36,w:.92,h:.47},
    {x:.53,y:.16,w:.40,h:.31}, {x:.38,y:.08,w:.42,h:.22}
  ],
  garden: [
    {x:.14,y:.14,w:.40,h:.33}, {x:.10,y:.18,w:.40,h:.23}, {x:.08,y:.29,w:.34,h:.23},
    {x:.25,y:.05,w:.42,h:.37}, {x:.30,y:.27,w:.38,h:.35}, {x:.06,y:.40,w:.40,h:.25},
    {x:.72,y:.17,w:.24,h:.22}, {x:.35,y:.40,w:.43,h:.29}
  ],
  office: [
    {x:.26,y:.58,w:.40,h:.29}, {x:.15,y:.24,w:.33,h:.36}, {x:.55,y:.26,w:.36,h:.44},
    {x:.45,y:.48,w:.30,h:.23}, {x:.25,y:.60,w:.40,h:.28}, {x:.42,y:.64,w:.40,h:.26},
    {x:.63,y:.35,w:.31,h:.43}, {x:.31,y:.55,w:.34,h:.32}
  ],
  archive: [
    {x:.02,y:.65,w:.35,h:.34}, {x:.03,y:.42,w:.30,h:.34}, {x:.42,y:.29,w:.30,h:.35},
    {x:.42,y:.55,w:.44,h:.22}, {x:.59,y:.54,w:.36,h:.30}, {x:.02,y:.33,w:.25,h:.35},
    {x:.64,y:.28,w:.31,h:.37}, {x:.34,y:.60,w:.31,h:.27}
  ],
  market: [
    {x:.29,y:.65,w:.40,h:.26}, {x:.10,y:.39,w:.32,h:.33}, {x:.65,y:.24,w:.32,h:.25},
    {x:.27,y:.55,w:.48,h:.18}, {x:.52,y:.32,w:.34,h:.29}, {x:.68,y:.61,w:.27,h:.34},
    {x:.08,y:.54,w:.30,h:.33}, {x:.29,y:.22,w:.41,h:.20}
  ],
  lighthouse: [
    {x:.31,y:.69,w:.42,h:.29}, {x:.14,y:.42,w:.25,h:.57}, {x:.33,y:.28,w:.19,h:.29},
    {x:.34,y:.15,w:.30,h:.29}, {x:.35,y:.14,w:.30,h:.20}, {x:.35,y:.16,w:.30,h:.29},
    {x:.63,y:.37,w:.30,h:.35}, {x:.36,y:.12,w:.28,h:.35}
  ],
  workshop: [
    {x:.30,y:.55,w:.43,h:.33}, {x:.64,y:.42,w:.28,h:.37}, {x:.33,y:.58,w:.37,h:.23},
    {x:.35,y:.06,w:.38,h:.35}, {x:.71,y:.32,w:.25,h:.46}, {x:.54,y:.57,w:.38,h:.32},
    {x:.62,y:.29,w:.33,h:.32}, {x:.69,y:.22,w:.26,h:.19}
  ],
  wharf: [
    {x:.26,y:.72,w:.44,h:.27}, {x:.57,y:.52,w:.31,h:.25}, {x:.35,y:.59,w:.32,h:.37},
    {x:.47,y:.40,w:.35,h:.39}, {x:.21,y:.30,w:.31,h:.50}, {x:.66,y:.42,w:.18,h:.39},
    {x:.63,y:.48,w:.26,h:.35}, {x:.30,y:.52,w:.40,h:.33}
  ],
  festival: [
    {x:.29,y:.65,w:.40,h:.27}, {x:.43,y:.23,w:.26,h:.49}, {x:.14,y:.64,w:.31,h:.23},
    {x:.55,y:.34,w:.28,h:.37}, {x:.52,y:.25,w:.41,h:.37}, {x:.10,y:.51,w:.31,h:.33},
    {x:.31,y:.46,w:.42,h:.29}, {x:.33,y:.20,w:.42,h:.28}
  ]
});

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

function repairTool(spec) {
  if (spec.mode === 'remove') return '🧹';
  if (spec.mode === 'plants') return '🪣';
  if (spec.mode === 'mural') return '🖌️';
  if (spec.mode === 'furniture') return '🪚';
  if (spec.mode === 'counter' || spec.mode === 'shelves') return '🔧';
  if (['window','door','roof','broken'].includes(spec.mode)) return '🔨';
  return '🛠️';
}

function repairAction(spec) {
  const actions = {
    remove:'The crew clears away storm damage', roof:'Fresh boards and shingles are fitted into place',
    window:'The frame is squared and the new glass is set', door:'The door is lifted, aligned and secured',
    furniture:'The crew carries in and sets the new furniture', plants:'The crew plants, waters and tends the new growth',
    broken:'The broken section is braced and repaired', counter:'The counter is patched, sanded and fitted',
    shelves:'The shelf frame is built and secured', mural:'The welcome mural is painted by hand',
    add:'The new feature is mounted and secured'
  };
  return actions[spec.mode] || 'The crew fits the new improvement';
}

function sceneAnchor(locationId, level) {
  const region = REGIONS[locationId]?.[level - 1] || {x:.38,y:.32,w:.24,h:.18};
  const mode = REPAIR_DETAILS[locationId]?.[level - 1]?.mode || '';
  const layer = ['roof','window','door','counter','shelves','mural'].includes(mode)
    ? 'architecture'
    : mode === 'remove' || mode === 'broken' ? 'damaged'
      : mode === 'furniture' || mode === 'plants' || mode === 'add' ? 'decorations' : 'restored';
  return {x:region.x * 576,y:region.y * 1024,width:region.w * 576,height:region.h * 1024,layer,zIndex:layer === 'architecture' ? 30 : layer === 'damaged' ? 25 : 40};
}

export const RESTORATION_OBJECT_REGISTRY = Object.freeze(Object.fromEntries(
  Object.entries(REPAIR_DETAILS).flatMap(([locationId, repairs]) => repairs.map((spec,index) => {
    const level = index + 1;
    const anchor = sceneAnchor(locationId, level);
    const id = repairObjectId(locationId, level);
    return [id, Object.freeze({id,locationId,level,damagedImage:spec.before,restoredImage:spec.after,zone:STEP_ZONES[locationId]?.[index]?.zone || '',room:STEP_ZONES[locationId]?.[index]?.room || '',area:STEP_ZONES[locationId]?.[index]?.area || '',x:anchor.x,y:anchor.y,width:anchor.width,height:anchor.height,zIndex:anchor.zIndex,layer:anchor.layer,item:spec.item,mode:spec.mode})];
  }))
));

export function getRestorationObject(objectId) {
  return RESTORATION_OBJECT_REGISTRY[objectId] || null;
}

export function restorationObjectIds(locationId) {
  return Object.values(RESTORATION_OBJECT_REGISTRY).filter(object => object.locationId === locationId).map(object => object.id);
}

export function repairDetailState(locationId, level) {
  const spec = REPAIR_DETAILS[locationId]?.[level - 1];
  if (!spec) return null;
  const anchor = RESTORATION_OBJECT_REGISTRY[repairObjectId(locationId, level)];
  const region = REGIONS[locationId]?.[level - 1] || {x:.38,y:.32,w:.24,h:.18};
  const zoneData = STEP_ZONES[locationId]?.[level - 1] || {};
  return {
    beforeState:spec.before, afterState:spec.after, repairItem:spec.item, mode:spec.mode,
    zone:zoneData.zone || '', room:zoneData.room || '', area:zoneData.area || '', region,
    tool:repairTool(spec), action:repairAction(spec),
    x:anchor?.x ?? 384, y:anchor?.y ?? 300, width:anchor?.width ?? 256, height:anchor?.height ?? 180
  };
}
