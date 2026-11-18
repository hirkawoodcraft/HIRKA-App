const C='hirka33-v2',F=['./','./index.html','./manifest.json','./icon-192.png','./icon-512.png'];
self.addEventListener('install',e=>e.waitUntil(caches.open(C).then(c=>c.addAll(F)).then(()=>self.skipWaiting())));
self.addEventListener('activate',e=>e.waitUntil(self.clients.claim()));
self.addEventListener('fetch',e=>{if(e.request.method!=='GET'||new URL(e.request.url).origin!==location.origin||!e.request.url.startsWith(self.registration.scope))return;if(e.request.mode==='navigate')e.respondWith(fetch(e.request).then(r=>{if(r.ok){const copy=r.clone();caches.open(C).then(c=>c.put('./index.html',copy));}return r}).catch(()=>caches.open(C).then(c=>c.match('./index.html'))));else e.respondWith(caches.open(C).then(c=>c.match(e.request)).then(r=>r||fetch(e.request)));});
