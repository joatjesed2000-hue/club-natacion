const CACHE='duo-gym-shell-v1';
const ROOT=new URL('./',self.location).href;
const FILES=['./','./index.html','./styles.css','./app.js','./icon.svg','./manifest.webmanifest'].map(p=>new URL(p,ROOT).href);
self.addEventListener('install',event=>{event.waitUntil(caches.open(CACHE).then(cache=>cache.addAll(FILES)).then(()=>self.skipWaiting()));});
self.addEventListener('activate',event=>{event.waitUntil(caches.keys().then(keys=>Promise.all(keys.filter(k=>k.startsWith('duo-gym-shell-')&&k!==CACHE).map(k=>caches.delete(k)))).then(()=>self.clients.claim()));});
self.addEventListener('fetch',event=>{
 const url=new URL(event.request.url);
 if(event.request.method!=='GET'||!url.href.startsWith(ROOT)||url.origin!==self.location.origin)return;
 const file=FILES.includes(url.href);
 if(!file&&event.request.mode!=='navigate')return;
 event.respondWith(fetch(event.request).then(response=>{
  if(response.ok&&file){const copy=response.clone();event.waitUntil(caches.open(CACHE).then(cache=>cache.put(event.request,copy)));}
  return response;
 }).catch(async()=>{const hit=await caches.match(event.request);return hit||(event.request.mode==='navigate'?await caches.match(new URL('./index.html',ROOT).href):Response.error());}));
});