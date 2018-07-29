
let contentImgsCache = 'reviews-static-imgs';
let staticCacheName = 'reviews-static-v0';
let urlsToCache = [
  '/',
  'index.html',
  'restaurant.html',
  'js/main.js',
  'js/idb.js',
  'js/dbhelper.js',
  'js/restaurant_info.js',
  'css/styles.css',
  'css/responsive.css',
]

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(staticCacheName).then((cache) => {
      return cache.addAll(urlsToCache);
    })
  );
});

self.addEventListener('activate', (event) => {

  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.filter((cacheName) => {
          return cacheName.startsWith('reviews-') &&
                  cacheName != staticCacheName;
        }).map((cacheName) => {
          return caches.delete(cacheName);
        })
      );
    })
  );
});

self.addEventListener('fetch', (event) => {
  let requestURL = new URL(event.request.url);

  if (requestURL.pathname.startsWith('/img/')) {
    event.respondWith(serveImage(event.request));
    return;
  }

  event.respondWith(
    caches.match(event.request).then((response) => {
      return response || fetch(event.request);
    })
  );
});

function serveImage(request) {
  return caches.open(contentImgsCache).then((cache) => {
    return cache.match(request.url).then((response) => {
      if (response) return response;

      return fetch(request).then((networkResponse) => {
        cache.put(request.url, networkResponse.clone());
        return networkResponse;
      });
    });
  });
}
