/* eslint-disable no-restricted-globals */

const CACHE_NAME = "vacation-manager-cache-v2";
const PRECACHE_ASSETS = [
  "/",
  "/index.html",
  "/manifest.json",
  "/logo192.png",
  "/logo512.png",
  "/favicon.ico",
  "/Images/bg1.png",
  "/Images/deleg-logo.png",
  "/Images/deleg.png",
  "/Images/vacation_login_illustration.png",
  "/Images/jjvacation_login_illustration.png",
  "/Images/rm.png"
];

// Install Event: cache core assets
self.addEventListener("install", (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      return cache.addAll(PRECACHE_ASSETS);
    }).then(() => {
      return self.skipWaiting();
    })
  );
});

// Activate Event: clean up old caches
self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cacheName) => {
          if (cacheName !== CACHE_NAME) {
            return caches.delete(cacheName);
          }
        })
      );
    }).then(() => {
      return self.clients.claim();
    })
  );
});

// Fetch Event
self.addEventListener("fetch", (event) => {
  const request = event.request;
  const url = new URL(request.url);

  // 1. Bypass non-GET requests (e.g., POST login, PUT settings, etc.)
  if (request.method !== "GET") {
    event.respondWith(fetch(request));
    return;
  }

  // 2. Bypass webpack hot updates or browser extensions
  if (url.pathname.includes("hot-update") || !url.protocol.startsWith("http")) {
    event.respondWith(fetch(request));
    return;
  }

  // 3. API Requests: Network-First (we want fresh data from backend, bypass cache)
  const isApiRequest = 
    url.pathname.includes("/employees") ||
    url.pathname.includes("/employee/") ||
    url.pathname.includes("/types") ||
    url.pathname.includes("/typesun") ||
    url.pathname.includes("/formations-sanitaires") ||
    url.pathname.includes("/grades") ||
    url.pathname.includes("/gradesun") ||
    url.pathname.includes("/corps") ||
    url.pathname.includes("/users") ||
    url.pathname.includes("/settings") ||
    url.pathname.includes("/vac/");

  if (isApiRequest) {
    event.respondWith(
      fetch(request).catch(() => {
        // Return a generic offline error for API calls when offline
        return new Response(JSON.stringify({ error: "Vous êtes hors ligne." }), {
          status: 503,
          headers: { "Content-Type": "application/json" }
        });
      })
    );
    return;
  }

  // 4. Navigation requests (SPA Routing)
  // Serve index.html so React Router can handle routing client-side
  if (request.mode === "navigate" || (request.headers.get("accept") || "").includes("text/html")) {
    event.respondWith(
      caches.match("/index.html").then((cachedResponse) => {
        if (cachedResponse) {
          // Serve from cache but update in background
          fetch(request).then((networkResponse) => {
            if (networkResponse.status === 200) {
              caches.open(CACHE_NAME).then((cache) => {
                cache.put("/index.html", networkResponse);
              });
            }
          }).catch(() => {/* Ignore network fail */});
          return cachedResponse;
        }
        return fetch(request);
      })
    );
    return;
  }

  // 5. Static Assets (JS, CSS, images, JSON locales)
  // Stale-While-Revalidate strategy
  event.respondWith(
    caches.match(request).then((cachedResponse) => {
      const fetchPromise = fetch(request).then((networkResponse) => {
        if (networkResponse && networkResponse.status === 200) {
          const responseToCache = networkResponse.clone();
          caches.open(CACHE_NAME).then((cache) => {
            cache.put(request, responseToCache);
          });
        }
        return networkResponse;
      }).catch(() => {
        // Ignore network errors (we are offline)
      });

      return cachedResponse || fetchPromise;
    })
  );
});
