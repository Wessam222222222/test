const CACHE_NAME = 'quran-app-v1';
const urlsToCache = [
  '/',
  '/index.html',
  '/styles.css',
  '/app.js',
  '/quran.html',
  '/azkar.html',
  '/hadith.html',
  '/favorites.html',
  '/settings.html',
  '/qibla.html',
  // أضف هنا جميع الملفات التي تريد تخزينها للاستخدام دون اتصال
];

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then((cache) => cache.addAll(urlsToCache))
  );
});

self.addEventListener('fetch', (event) => {
  event.respondWith(
    caches.match(event.request)
      .then((response) => response || fetch(event.request))
  );
});
