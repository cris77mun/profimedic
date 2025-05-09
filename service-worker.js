const CACHE_NAME = 'profimedic-optik-v1';
const FILES_TO_CACHE = [
  '/',
  '/index.html',
  '/manifest.json',
  '/favicon.png',
  '/style.css',
  '/app.js'
];

// Instalare - cachează fișierele esențiale
self.addEventListener('install', event => {
  console.log('[ServiceWorker] Instalare...');
  event.waitUntil(
    caches.open(CACHE_NAME).then(cache => {
      console.log('[ServiceWorker] Se cachează fișierele');
      return cache.addAll(FILES_TO_CACHE);
    })
  );
  self.skipWaiting();
});

// Activare - curăță cache-urile vechi
self.addEventListener('activate', event => {
  console.log('[ServiceWorker] Activare');
  event.waitUntil(
    caches.keys().then(keyList =>
      Promise.all(
        keyList.map(key => {
          if (key !== CACHE_NAME) {
            console.log('[ServiceWorker] Șterge cache-ul vechi', key);
            return caches.delete(key);
          }
        })
      )
    )
  );
  self.clients.claim();
});

// Fetch - servește din cache sau din rețea
self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request).then(response => {
      return response || fetch(event.request);
    })
  );
});
