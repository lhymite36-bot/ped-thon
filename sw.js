/* Ped-thon service worker — caches the app shell and learned CDN files. */
const CACHE = "ped-thon-v1";
const SHELL = [
  "./",
  "./index.html",
  "./manifest.json",
  "./css/app.css",
  "./js/app.js",
  "./js/storage.js",
  "./js/python.js",
  "./js/editor.js",
  "./js/complete.js",
  "./js/curriculum.js",
  "./js/daily.js",
  "./js/ai.js",
  "./icons/icon-96.png",
  "./icons/icon-192.png",
  "./icons/icon-512.png",
  "./icons/icon-512-maskable.png",
  "./icons/apple-touch-icon.png",
  "./icons/favicon-32.png",
  "./icons/favicon.ico",
];

self.addEventListener("install", (event) => {
  event.waitUntil(
    caches.open(CACHE).then((cache) => cache.addAll(SHELL)).then(() => self.skipWaiting())
  );
});

self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches.keys().then((keys) =>
      Promise.all(keys.filter((k) => k !== CACHE).map((k) => caches.delete(k)))
    ).then(() => self.clients.claim())
  );
});

self.addEventListener("fetch", (event) => {
  const req = event.request;
  if (req.method !== "GET") return;
  const url = new URL(req.url);

  // App navigations: serve the shell so the PWA works offline.
  if (req.mode === "navigate") {
    event.respondWith(
      caches.match("./index.html").then((cached) => cached || fetch(req).catch(() => caches.match("./index.html")))
    );
    return;
  }

  // Same-origin app files: cache-first, then network and cache.
  if (url.origin === self.location.origin) {
    event.respondWith(
      caches.match(req).then((cached) => {
        const fetched = fetch(req)
          .then((res) => {
            if (res && res.ok) {
              const copy = res.clone();
              caches.open(CACHE).then((c) => c.put(req, copy));
            }
            return res;
          })
          .catch(() => cached);
        return cached || fetched;
      })
    );
    return;
  }

  // CDN (Pyodide, CodeMirror): cache-first after the first successful download.
  if (
    url.hostname.endsWith("cdn.jsdelivr.net") ||
    url.hostname.endsWith("cdnjs.cloudflare.com") ||
    url.hostname.endsWith("jsdelivr.net")
  ) {
    event.respondWith(
      caches.match(req).then((cached) => {
        if (cached) return cached;
        return fetch(req).then((res) => {
          if (res && res.ok) {
            const copy = res.clone();
            caches.open(CACHE).then((c) => c.put(req, copy));
          }
          return res;
        });
      })
    );
  }
});
