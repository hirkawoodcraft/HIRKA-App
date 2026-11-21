// HIRKA 1.13 - network-first navigation; old cached HTML must not override deployments.
const CACHE = 'hirka-app-v1.13';
self.addEventListener('install', event => {
  self.skipWaiting();
});
self.addEventListener('activate', event => {
  event.waitUntil((async () => {
    const keys = await caches.keys();
    await Promise.all(keys.filter(k => k.startsWith('hirka-app-') && k !== CACHE).map(k => caches.delete(k)));
    await self.clients.claim();
  })());
});
self.addEventListener('fetch', event => {
  const req = event.request;
  if (req.method !== 'GET') return;
  if (req.mode === 'navigate') {
    event.respondWith(fetch(req, {cache:'no-store'}).catch(async () => {
      const cached = await caches.match(req);
      return cached || Response.error();
    }));
    return;
  }
  if (new URL(req.url).origin !== self.location.origin) return;
  event.respondWith(fetch(req).catch(() => caches.match(req)));
});
