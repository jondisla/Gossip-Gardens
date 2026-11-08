// Restoration characters use only full-body worksite sprites; portraits stay in dialogue and request UI.
export const RESTORATION_CAST = Object.freeze({
  cafe:['mae','tamsin'], pier:['theo','milo'], garden:['jules','selene'], office:['iris','nora'],
  market:['adrian','tamsin'], lighthouse:['cora','theo'], workshop:['rowan','milo'],
  archive:['nora','selene'], wharf:['milo','cora'], festival:['mae','jules']
});

const REPAIR_ACTORS = Object.freeze({
  iris:'assets/repair-iris-fullbody.webp', mae:'assets/repair-mae-fullbody.webp',
  rowan:'assets/repair-rowan-fullbody.webp', theo:'assets/repair-theo-fullbody.webp',
  cora:'assets/repair-cora-fullbody.webp', jules:'assets/repair-jules-fullbody.webp',
  adrian:'assets/repair-adrian-fullbody.webp', nora:'assets/repair-nora-fullbody.webp',
  milo:'assets/repair-milo-fullbody.webp', selene:'assets/repair-selene-fullbody.webp',
  tamsin:'assets/repair-tamsin-fullbody.webp'
});

// Adult height is calibrated per location; Milo uses the child scale below.
export const ACTOR_SCALE = Object.freeze({
  cafe:.21, pier:.20, garden:.21, office:.20, market:.21,
  lighthouse:.20, workshop:.21, archive:.20, wharf:.20, festival:.21
});
const CHILD_ACTOR_SCALE = .16;
const INDOOR_LOCATIONS = new Set(['cafe','office','lighthouse','workshop','archive']);
const POSITIONS = Object.freeze({
  cafe:[[.16,.82],[.84,.82]], pier:[[.37,.84],[.64,.84]], garden:[[.15,.79],[.85,.79]],
  office:[[.16,.77],[.84,.77]], market:[[.15,.79],[.85,.79]], lighthouse:[[.17,.78],[.83,.78]],
  workshop:[[.16,.79],[.84,.79]], archive:[[.16,.78],[.84,.78]], wharf:[[.31,.83],[.70,.83]],
  festival:[[.15,.80],[.85,.80]]
});

const ACTOR_STAGES = Object.freeze(Object.fromEntries(Object.entries(RESTORATION_CAST).map(([locationId,cast]) => [
  locationId,
  Array.from({length:8},(_,stepIndex) => cast.map((id,index) => {
    const [baseX,baseY] = POSITIONS[locationId]?.[index] || [index ? .84 : .16,.78];
    const sideShift = ((stepIndex % 3) - 1) * .012;
    const feetShift = ((stepIndex + index) % 2) * .008;
    return {
      id,
      x:Math.max(.08,Math.min(.92,baseX + (index === 0 ? sideShift : -sideShift))),
      feetY:Math.max(.70,Math.min(.88,baseY + feetShift)),
      heightScale:id === 'milo' ? CHILD_ACTOR_SCALE : ACTOR_SCALE[locationId] || .12
    };
  }))
])));

const reportedMissing = new Set();
export function restorationCastFor(locationId, step) {
  const actors = ACTOR_STAGES[locationId]?.[Math.max(0,Math.min(7,Math.floor(Number(step) || 1) - 1))] || [];
  return actors.flatMap(actor => {
    const src = REPAIR_ACTORS[actor.id];
    if (!src) {
      if (!reportedMissing.has(actor.id)) {
        reportedMissing.add(actor.id);
        console.error(`[Harbor Whispers] Missing full-body restoration sprite for ${actor.id}; actor skipped.`);
      }
      return [];
    }
    return [{...actor,src}];
  });
}
