self.addEventListener('install', function(event) {
  event.waitUntil(
    caches.open('rumy-cache-v1').then(function(cache) {
      return cache.addAll(['/', '/index.html', '/offline.html']);
    })
  );
});

self.addEventListener('fetch', function(event) {
  event.respondWith(
    fetch(event.request).catch(function() {
      return caches.match('/offline.html');
    })
  );
});