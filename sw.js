const CACHE_NAME = 'harbor-whispers-v11';
const APP_FILES = [
  './',
  './index.html',
  './main.js',
  './manifest.webmanifest',
  './app-icon.svg',
  './rosebud-game-defaults.css',
  './rosebud-game-defaults.js',
  './assets/harbor-bg.webp',
  './assets/restore-cafe-before.webp',
  './assets/restore-pier-before.webp',
  './assets/restore-garden-before.webp',
  './assets/restore-gazette-before.webp',
  './assets/restore-cafe-scene.webp',
  './assets/restore-pier-scene.webp',
  './assets/restore-garden-scene.webp',
  './assets/restore-gazette-scene.webp',
  './assets/restore-cafe-room-before.webp',
  './assets/restore-cafe-room-after.webp',
  './assets/char-mae.webp',
  './assets/char-theo.webp',
  './assets/char-iris.webp',
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
