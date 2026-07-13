const CACHE='jru-academy-v4';
const CORE=[
  './','./index.html','./manifest.webmanifest','./assets/jru-academy-icon.svg',
  './data/math-lessons.js','./data/reading-lessons.js','./data/quick-challenges.js',
  './data/roblox-course.js','./data/academy-expansion.js','./data/ui-upgrade.js',
  './data/avatar-studio.js','./data/kid-language.js','./data/creator-academy.js',
  './data/app-install.js','./data/music-workflow.js','./data/roblox-3d-lab.js',
  './data/block-focus-polish.js'
];
self.addEventListener('install',event=>{event.waitUntil(caches.open(CACHE).then(cache=>cache.addAll(CORE)).then(()=>self.skipWaiting()))});
self.addEventListener('activate',event=>{event.waitUntil(caches.keys().then(keys=>Promise.all(keys.filter(k=>k!==CACHE).map(k=>caches.delete(k)))).then(()=>self.clients.claim()))});
self.addEventListener('fetch',event=>{
  if(event.request.method!=='GET')return;
  event.respondWith(caches.match(event.request).then(cached=>cached||fetch(event.request).then(response=>{
    const copy=response.clone();
    if(new URL(event.request.url).origin===location.origin)caches.open(CACHE).then(cache=>cache.put(event.request,copy));
    return response;
  }).catch(()=>caches.match('./index.html'))));
});