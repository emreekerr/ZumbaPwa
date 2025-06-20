// Basit bir Service Worker kurulum dosyasi
const CACHE_NAME = 'zumba-pwa-v1'
const urlsToCache = ['/', '/index.html', '/manifest.json', '/favicon.ico']

self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME).then(cache => cache.addAll(urlsToCache))
  )
})

self.addEventListener('fetch', event => {
  if (event.request.method !== 'GET') return
  event.respondWith(
    caches.match(event.request).then(response => response || fetch(event.request))
  )
})

self.addEventListener('activate', event => {
  const cacheWhitelist = [CACHE_NAME]
  event.waitUntil(
    caches.keys().then(cacheNames =>
      Promise.all(
        cacheNames.map(cacheName => {
          if (!cacheWhitelist.includes(cacheName)) {
            return caches.delete(cacheName)
          }
        })
      )
    )
  )
})

// Push bildirimlerini yakalama
self.addEventListener('push', event => {
  let data = {}
  if (event.data) {
    data = event.data.json()
  }
  const title = data.title || 'Zumba Bildirimi'
  const options = {
    body: data.body || 'Yeni bir bildiriminiz var!',
    icon: '/logo192.png',
    badge: '/logo192.png',
    data: { url: data.url || '/' }
  }
  event.waitUntil(self.registration.showNotification(title, options))
})

// Bildirime tiklama
self.addEventListener('notificationclick', event => {
  event.notification.close()
  event.waitUntil(clients.openWindow(event.notification.data.url))
})
