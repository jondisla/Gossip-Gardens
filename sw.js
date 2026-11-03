const CACHE_NAME = 'harbor-whispers-v69';
const APP_FILES = [
  './',
  './index.html',
  './main.js',
  './repair-details.js',
  './scenes.js',
  './game-content.js',
  './harbor-ui.css',
  './restoration-ui.css',
  './manifest.webmanifest',
  './app-icon.svg',
  './rosebud-game-defaults.css',
  './rosebud-game-defaults.js',
  './assets/harbor-bg.webp',
  './assets/restore-cafe-before.webp',
  './assets/restore-cafe-after-cleanup.webp',
  './assets/restore-pier-before.webp',
  './assets/restore-garden-before.webp',
  './assets/restore-garden-after-clearing.webp',
  './assets/restore-gazette-before.webp',
  './assets/restore-cafe-scene.webp',
  './assets/restore-pier-scene.webp',
  './assets/restore-garden-scene.webp',
  './assets/restore-garden-0.webp',
  './assets/restore-garden-1.webp',
  './assets/restore-garden-2.webp',
  './assets/restore-garden-3.webp',
  './assets/restore-garden-4.webp',
  './assets/restore-garden-5.webp',
  './assets/restore-garden-6.webp',
  './assets/restore-garden-7.webp',
  './assets/restore-garden-8.webp',
  './assets/restore-pier-0.webp',
  './assets/restore-pier-1.webp',
  './assets/restore-pier-2.webp',
  './assets/restore-pier-3.webp',
  './assets/restore-pier-4.webp',
  './assets/restore-pier-5.webp',
  './assets/restore-pier-6.webp',
  './assets/restore-pier-7.webp',
  './assets/restore-pier-8.webp',
  './assets/restore-gazette-scene.webp',
  './assets/restore-cafe-plates.webp',
  './assets/restore-pier-plates.webp',
  './assets/restore-garden-plates.webp',
  './assets/restore-gazette-plates.webp',
  './assets/restore-market-plates.webp',
  './assets/restore-lighthouse-plates.webp',
  './assets/restore-workshop-plates.webp',
  './assets/restore-archive-plates.webp',
  './assets/restore-wharf-plates.webp',
  './assets/restore-festival-plates.webp',
  './assets/restore-market-square.webp',
  './assets/restore-lighthouse-yard.webp',
  './assets/restore-workshop-yard.webp',
  './assets/restore-archive-room.webp',
  './assets/restore-old-wharf.webp',
  './assets/restore-festival-plaza.webp',
  './assets/restore-cafe-room-before.webp',
  './assets/restore-cafe-room-after.webp',
  './assets/restore-cafe-room-0.webp',
  './assets/restore-cafe-room-1.webp',
  './assets/restore-cafe-room-2.webp',
  './assets/restore-cafe-room-3.webp',
  './assets/restore-cafe-room-4.webp',
  './assets/restore-cafe-room-5.webp',
  './assets/restore-cafe-deck-0.webp',
  './assets/restore-cafe-deck-8.webp',
  './assets/restore-cafe-7.webp',
  './assets/restore-cafe-kitchen-before.webp',
  './assets/restore-cafe-kitchen-after.webp',
  './assets/repair-isometric-cafe-2.webp',
  './assets/cafe-isometric-worksite.webp',
  './assets/market-square-worksite-portrait.webp',
  './assets/workshop-worksite-portrait.webp',
  './assets/archive-worksite-portrait.webp',
  './assets/gazette-worksite-portrait.webp',
  './assets/pier-isometric-worksite.webp',
  './assets/garden-isometric-worksite.webp',
  './assets/harbor-interior-cutaway.webp',
  './assets/lighthouse-isometric-worksite.webp',
  './assets/wharf-isometric-worksite.webp',
  './assets/festival-isometric-worksite.webp',
  './assets/cafe-pet-cushion.webp',
  './assets/repair-iris-fullbody.webp',
  './assets/repair-mae-fullbody.webp',
  './assets/repair-rowan-fullbody.webp',
  './assets/repair-theo-fullbody.webp',
  './assets/char-mae.webp',
  './assets/char-theo.webp',
  './assets/char-iris.webp',
  './assets/char-cora.webp',
  './assets/char-rowan.webp',
  './assets/char-jules.webp',
  './assets/char-adrian.webp',
  './assets/char-nora.webp',
  './assets/char-milo.webp',
  './assets/char-selene.webp',
  './assets/char-tamsin.webp',
  './assets/harbor-bakery-atlas.webp',
  './assets/harbor-market-atlas.webp',
  './assets/harbor-seafood-atlas.webp',
  './assets/harbor-pantry-atlas.webp',
  './assets/harbor-storage-button.webp',
  './assets/harbor-power-tool-button.webp',
  './assets/harbor-gold-coin.webp',
  './assets/harbor-energy-bolt.webp',
  './assets/harbor-pink-gem.webp',
  './assets/audio/harbor-music.mp3',
  './assets/audio/merge-pop.mp3'
];

self.addEventListener('install', event => {
  event.waitUntil(caches.open(CACHE_NAME).then(cache => cache.addAll(APP_FILES)));
  self.skipWaiting();
});

self.addEventListener('activate', event => {
  event.waitUntil(caches.keys().then(keys => Promise.all(
    keys.filter(key => key.startsWith('harbor-whispers-') && key !== CACHE_NAME).map(key => caches.delete(key))
  )));
  self.clients.claim();
});

self.addEventListener('fetch', event => {
  if (event.request.method !== 'GET' || new URL(event.request.url).origin !== self.location.origin) return;
  event.respondWith(caches.match(event.request).then(cached => {
    if (cached) return cached;
    return fetch(event.request).then(response => {
      if (response.ok) {
        const copy = response.clone();
        caches.open(CACHE_NAME).then(cache => cache.put(event.request, copy));
      }
      return response;
    }).catch(() => {
      if (event.request.mode === 'navigate') return caches.match('./index.html');
      return Response.error();
    });
  }));
});
