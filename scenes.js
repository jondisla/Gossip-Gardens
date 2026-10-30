// Artwork-space actor placement for the repair scenes. Feet coordinates are
// normalized to the full portrait plate so characters stay grounded as the
// camera pans and zooms.
const GARDEN_CAST = [
  [{id:'iris',x:18,feetY:52},{id:'mae',x:80,feetY:57},{id:'theo',x:65,feetY:48}],
  [{id:'iris',x:18,feetY:55},{id:'mae',x:80,feetY:60},{id:'theo',x:64,feetY:49}],
  [{id:'iris',x:21,feetY:57},{id:'mae',x:79,feetY:61},{id:'theo',x:66,feetY:50}],
  [{id:'iris',x:19,feetY:58},{id:'mae',x:81,feetY:62},{id:'theo',x:67,feetY:51}],
  [{id:'iris',x:19,feetY:58},{id:'mae',x:81,feetY:62},{id:'theo',x:67,feetY:51}],
  [{id:'iris',x:16,feetY:60},{id:'mae',x:83,feetY:64},{id:'theo',x:66,feetY:53}],
  [{id:'iris',x:17,feetY:58},{id:'mae',x:82,feetY:64},{id:'theo',x:67,feetY:52}],
  [{id:'iris',x:16,feetY:59},{id:'mae',x:83,feetY:64},{id:'theo',x:66,feetY:53}]
];

const REPAIR_ACTORS = Object.freeze({
  iris: 'assets/repair-iris-fullbody.webp',
  mae: 'assets/repair-mae-fullbody.webp',
  theo: 'assets/repair-theo-fullbody.webp'
});

export function restorationCastFor(locationId, level) {
  if (locationId !== 'garden') return [];
  const actors = GARDEN_CAST[Math.max(0, Math.min(GARDEN_CAST.length - 1, Number(level) - 1))] || [];
  return actors.map(actor => ({...actor, src:REPAIR_ACTORS[actor.id]}));
}
