const CACHE_NAME = "version-1";
const urlsToCache = ["index.html", "offline.html"];

const self = this;

// Install SW
self.addEventListener("install", (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      console.log("Opened cache");

      return cache.addAll(urlsToCache);
    })
  );
});

// Listen for requests
self.addEventListener("fetch", (event) => {
  if (event.request.url.startsWith("https://hacker-news.firebaseio.com/")) {
    event.respondWith(
      caches
        .match(event.request)
        .then((response) => {
          // Return the cached response if found
          if (response) {
            console.log(`cache hit ${event.request.url}`)
            return response;
          }

          console.log(`cache miss ${event.request.url}`)

          // Otherwise, fetch the request and cache it
          return fetch(event.request).then((newResponse) => {
            return caches.open(CACHE_NAME).then((cache) => {
              cache.put(event.request.url, newResponse.clone());
              return newResponse;
            });
          });
        })
        .catch(() => {
          // Fallback logic for when the request fails and isn't cached
        })
    );
  } else {
    // non-hacker news API requests fall back to the standard handler
    event.respondWith(
      fetch(event.request).catch(() => caches.match("error.html"))
    );
  }
});

// activate the service worker
self.addEventListener("activate", (event) => {
  const cacheWhitelist = [];
  cacheWhitelist.push(CACHE_NAME);

  event.waitUntil(
    caches.keys().then((cacheNames) =>
      Promise.all(
        cacheNames.map((cacheName) => {
          if (!cacheWhitelist.includes(cacheName)) {
            return caches.delete(cacheName);
          }
        })
      )
    )
  );
});
