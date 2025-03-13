var cacheName = 'camelot_jsdos-v0.0.92';

var filesToCache = [
  './',
  './index.html',
  './js-dos.js',
  './js-dos.js.map',
  './js-dos.css',  
  './camelot.jsdos',  
  './emulators/emulators.js',
  './emulators/emulators.js.map',
  './emulators/wlibzip.wasm',
  './emulators/wdosbox.wasm',
  './emulators/wdosbox.js',
  './emulators/wdosbox.js.symbols',
  './emulators/wlibzip.js',
  './img/favicon.ico'
];

self.addEventListener('install', function(e) {
  console.log('[ServiceWorker] Install_');
  e.waitUntil(
    caches.open(cacheName).then(function(cache) {
      console.log('[ServiceWorker] Caching app shell');
      return cache.addAll(filesToCache);
    })
  );
});

self.addEventListener('activate', function(e) {
  console.log('[ServiceWorker] Activate_');
  e.waitUntil(
    caches.keys().then(function(keyList) {
      return Promise.all(keyList.map(function(key) {
        if (key.startsWith('polen-')){
          if (key !== cacheName) {
            console.log('[ServiceWorker] Removing old cache', key);
            return caches.delete(key);
          }
        }
      }));
    })
  );
});

self.addEventListener('fetch', function(event) {
  event.respondWith(
    caches.match(event.request).then(function(response) {
      return response || fetch(event.request);
    })
  );
});
