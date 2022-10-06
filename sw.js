const web_cache = 'grocery-app-v1.2';
const filesToCache = [
  'index.html',
  'css/style.css',
  'main.js'
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
        if (key !== web_cache) {
          console.log("[ServiceWorker] - Removing old cache", key);
          return caches.delete(key);
        }
      })
    );
  });
});

self.addEventListener("fetch", event => {
  event.respondWith(
    caches.match(event.request, { ignoreSearch: true }).then(response => {
      return response || fetch(event.request);
    })
  );
});