
const CACHE = 'hidebeep-v1';
const ASSETS = [
  './',
  './index.html',
  './manifest.json'
  // Add './icons/icon-192.png', './icons/icon-512.png' when available
];

self.addEventListener('install', (e) => {
  e.waitUntil(
    caches.open(CACHE).then(c => c.addAll(ASSETS))
  );
});

self.addEventListener('activate', (e) => {
  e.waitUntil(
    caches.keys().then(keys => Promise.all(keys.filter(k => k !== CACHE).map(k => caches.delete(k))))
  );
});

self.addEventListener('fetch', (e) => {
  const { request } = e;
  // Network-first for everything except the start URL
  e.respondWith(
    caches.match(request).then(cached => {
      const fetchPromise = fetch(request).then(resp => {
        const clone = resp.clone();
        if (request.method === 'GET' && resp.ok) {
          caches.open(CACHE).then(c => c.put(request, clone));
        }
        return resp;
      }).catch(() => cached || Promise.reject('offline'));
      return cached || fetchPromise;
    })
  );
});
