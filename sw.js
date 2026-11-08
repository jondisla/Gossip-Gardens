const CACHE_NAME = 'harbor-whispers-v76';
const APP_FILES = [
  './', './index.html', './main.js', './repair-details.js', './scenes.js', './game-content.js',
  './harbor-ui.css', './restoration-ui.css', './completion-ui.css', './manifest.webmanifest',
  './app-icon.svg', './rosebud-game-defaults.css', './rosebud-game-defaults.js',
  './assets/harbor-bg.webp',
  './assets/restore-cafe-plates.webp', './assets/restore-pier-plates.webp',
  './assets/restore-garden-plates-improved.webp', './assets/restore-gazette-plates-improved.webp',
  './assets/restore-market-plates-improved.webp', './assets/restore-lighthouse-plates.webp',
  './assets/restore-workshop-plates.webp', './assets/restore-archive-plates-improved.webp',
  './assets/restore-wharf-plates.webp', './assets/restore-festival-plates-improved.webp',
  ...Array.from({length:9},(_,index)=>`./assets/restore-garden-${index}.webp`),
  ...Array.from({length:9},(_,index)=>`./assets/restore-pier-${index}.webp`),
  './assets/repair-iris-fullbody.webp', './assets/repair-mae-fullbody.webp',
  './assets/repair-rowan-fullbody.webp', './assets/repair-theo-fullbody.webp',
  './assets/repair-cora-fullbody.webp', './assets/repair-jules-fullbody.webp',
  './assets/repair-adrian-fullbody.webp', './assets/repair-nora-fullbody.webp',
  './assets/repair-milo-fullbody.webp', './assets/repair-selene-fullbody.webp',
  './assets/repair-tamsin-fullbody.webp',
  './assets/char-mae.webp', './assets/char-theo.webp', './assets/char-iris.webp',
  './assets/char-cora.webp', './assets/char-rowan.webp', './assets/char-jules.webp',
  './assets/char-adrian.webp', './assets/char-nora.webp', './assets/char-milo.webp',
  './assets/char-selene.webp', './assets/char-tamsin.webp',
  './assets/harbor-bakery-atlas.webp', './assets/harbor-market-atlas.webp',
  './assets/harbor-seafood-atlas.webp', './assets/harbor-pantry-atlas.webp',
  './assets/harbor-storage-button.webp', './assets/harbor-power-tool-button.webp',
  './assets/harbor-gold-coin.webp', './assets/harbor-energy-bolt.webp', './assets/harbor-pink-gem.webp',
  './assets/audio/harbor-music.mp3', './assets/audio/merge-pop.mp3'
];

self.addEventListener('install', event => {
  event.waitUntil((async () => {
    const cache = await caches.open(CACHE_NAME);
    await Promise.allSettled(APP_FILES.map(url => cache.add(url)));
    await self.skipWaiting();
  })());
});

self.addEventListener('activate', event => {
  event.waitUntil((async () => {
    const keys = await caches.keys();
    await Promise.all(keys.filter(key => key.startsWith('harbor-whispers-') && key !== CACHE_NAME).map(key => caches.delete(key)));
    await self.clients.claim();
  })());
});

self.addEventListener('fetch', event => {
  const request = event.request;
  if (request.method !== 'GET' || new URL(request.url).origin !== self.location.origin) return;
  const isRestorationPlate = new URL(request.url).pathname.includes('/assets/restore-');
  if (isRestorationPlate) {
    event.respondWith((async () => {
      const cache = await caches.open(CACHE_NAME);
      try {
        const response = await fetch(request);
        if (response.ok) await cache.put(request, response.clone());
        if (response.ok) return response;
        return await cache.match(request) || response;
      } catch (error) {
        return await cache.match(request) || (request.mode === 'navigate' ? await cache.match('./index.html') : Response.error());
      }
    })());
    return;
  }
  event.respondWith((async () => {
    const cached = await caches.match(request);
    if (cached) return cached;
    try {
      const response = await fetch(request);
      if (response.ok) {
        const cache = await caches.open(CACHE_NAME);
        await cache.put(request, response.clone());
      }
      return response;
    } catch (error) {
      return request.mode === 'navigate' ? await caches.match('./index.html') || Response.error() : Response.error();
    }
  })());
});
