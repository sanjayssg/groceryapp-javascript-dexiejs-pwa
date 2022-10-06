const web_cache = 'web-app-cache-v1.0';
const filesToCache = [
  '/',
  'index.html',
  './css/style.css',
  './main.js'
];

self.addEventListener('install',(event)=> {
  event.waitUntil(
    caches.open(web_cache)
      .then((cache)=> {
        //Cache has been opened successfully
        return cache.addAll(filesToCache);
      })
  );
});

self.addEventListener("activate", event => {
  caches.keys().then(keyList => {
    return Promise.all(
      keyList.map(key => {
        if (key !== cacheName) {
          console.log("[ServiceWorker] - Removing old cache", key);
          return caches.delete(key);
        }
      })
    );
  });
});

