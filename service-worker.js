const CACHE_NAME = 'caloriesnap-v2';
const APP_SHELL = [
  new URL('./index.html', self.registration.scope).toString(),
  new URL('./manifest.webmanifest', self.registration.scope).toString(),
  new URL('./icons/caloriesnap-icon.svg', self.registration.scope).toString()
];

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches
      .open(CACHE_NAME)
      .then((cache) => cache.addAll(APP_SHELL))
      .then(() => self.skipWaiting())
  );
});

self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches
      .keys()
      .then((keys) =>
        Promise.all(keys.filter((key) => key !== CACHE_NAME).map((key) => caches.delete(key)))
      )
      .then(() => self.clients.claim())
  );
});

self.addEventListener('fetch', (event) => {
  if (event.request.method !== 'GET') return;

  const requestUrl = new URL(event.request.url);
  if (requestUrl.origin !== self.location.origin) return;

  if (event.request.mode === 'navigate') {
    event.respondWith(
      (async () => {
        try {
          const response = await fetch(event.request);
          const cache = await caches.open(CACHE_NAME);
          cache.put(APP_SHELL[0], response.clone());
          return response;
        } catch (err) {
          const cache = await caches.open(CACHE_NAME);
          const cached = await cache.match(APP_SHELL[0]);
          return cached || new Response('Offline', { status: 503, statusText: 'Offline' });
        }
      })()
    );
    return;
  }

  event.respondWith(
    (async () => {
      const cache = await caches.open(CACHE_NAME);
      const cached = await cache.match(event.request);
      if (cached) return cached;

      try {
        const response = await fetch(event.request);
        if (response && response.ok) {
          cache.put(event.request, response.clone());
        }
        return response;
      } catch (err) {
        return cached || new Response('Offline', { status: 503, statusText: 'Offline' });
      }
    })()
  );
});
