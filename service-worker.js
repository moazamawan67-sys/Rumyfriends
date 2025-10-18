// Install Event: تمام ضروری فائلوں کو کیش میں محفوظ کریں
self.addEventListener('install', function(event) {
  event.waitUntil(
    caches.open('rumy-cache-v1').then(function(cache) {
      // ضروری URLs کو شامل کریں
      return cache.addAll([
        '/', 
        '/index.html', 
        '/offline.html',
        '/icon-192.png',
        '/icon-512.png',
        '/manifest.json'
      ]);
    })
  );
});

// Fetch Event: نیٹ ورک فیل ہونے پر کیش اور آف لائن صفحہ استعمال کریں
self.addEventListener('fetch', function(event) {
  event.respondWith(
    // 1. کوشش کریں کہ ریکویسٹ کو کیش میں تلاش کریں۔
    caches.match(event.request)
      .then(function(response) {
        // اگر کیش میں موجود ہے، تو کیش والا رزلٹ دکھا دیں۔
        if (response) {
          return response;
        }

        // اگر کیش میں نہیں ہے، تو نیٹ ورک سے لانے کی کوشش کریں۔
        return fetch(event.request)
          .catch(function() {
            // اگر نیٹ ورک ریکویسٹ بھی ناکام ہو جائے (یعنی آف لائن ہو)، 
            // تو آف لائن پیج دکھا دیں۔
            return caches.match('/offline.html');
          });
      })
  );
});
