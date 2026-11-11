/* Ped-thon service worker v3
   The v1 worker cached cross-origin ES modules (Pyodide's pyodide.asm.js).
   Chrome on Android then failed with:
   "TypeError: Failed to fetch dynamically imported module".
   This worker never intercepts cross-origin script/module fetches, and it
   serves self-hosted Pyodide same-origin instead. */
const CACHE = "ped-thon-v3";
const SHELL = [
  "./",
  "./index.html",
  "./manifest.json",
  "./css/app.css",
  "./js/app.js",
  "./js/storage.js",
  "./js/python.js",
  "./js/python-worker.js",
  "./js/editor.js",
  "./js/complete.js",
  "./js/curriculum.js",
  "./js/daily.js",
  "./js/ai.js",
  "./js/visual.js",
  "./js/advanced.js",
  "./js/build-projects.js",
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
    ).then(() => self.clients.claim()).then(() => {
      return self.clients.matchAll({ type: "window" }).then((clients) => {
        for (const c of clients) c.postMessage({ type: "SW_ACTIVATED", cache: CACHE });
      });
    })
  );
});

self.addEventListener("message", (event) => {
  if (event.data === "SKIP_WAITING" || event.data?.type === "SKIP_WAITING") {
    self.skipWaiting();
  }
});

self.addEventListener("fetch", (event) => {
  const req = event.request;
  if (req.method !== "GET") return;
  const url = new URL(req.url);

  // Never intercept cross-origin module/script/worker loads. A cached CORS
  // response for a dynamic import() is a common cause of "Failed to fetch
  // dynamically imported module" on Chrome for Android.
  if (url.origin !== self.location.origin) {
    const dest = req.destination;
    if (
      dest === "script" ||
      dest === "worker" ||
      dest === "sharedworker" ||
      dest === "audioworklet" ||
      dest === "paintworklet" ||
      dest === "serviceworker"
    ) {
      return;
    }
    // CSS and other CDN assets can still be cached after a good fetch.
    if (
      url.hostname.endsWith("cdnjs.cloudflare.com") ||
      url.hostname.endsWith("cdn.jsdelivr.net") ||
      url.hostname.endsWith("jsdelivr.net") ||
      url.hostname.endsWith("unpkg.com")
    ) {
      event.respondWith(
        caches.match(req).then((cached) => {
          const fetched = fetch(req)
            .then((res) => {
              if (res && res.ok && res.type !== "opaque") {
                const copy = res.clone();
                caches.open(CACHE).then((c) => c.put(req, copy));
              }
              return res;
            })
            .catch(() => cached);
          return cached || fetched;
        })
      );
    }
    return;
  }

  if (req.mode === "navigate") {
    event.respondWith(
      fetch(req)
        .then((res) => {
          if (res && res.ok) {
            const copy = res.clone();
            caches.open(CACHE).then((c) => c.put("./index.html", copy));
          }
          return res;
        })
        .catch(() => caches.match("./index.html"))
    );
    return;
  }

  const path = url.pathname;
  const isPyodide = path.includes("/pyodide/");
  const isAppCode =
    /\/(js|css)\//.test(path) ||
    path.endsWith("/sw.js") ||
    path.endsWith("/index.html") ||
    path.endsWith("/manifest.json");

  // App source: network first so updates reach a phone that already has the PWA.
  if (isAppCode) {
    event.respondWith(
      fetch(req)
        .then((res) => {
          if (res && res.ok) {
            const copy = res.clone();
            caches.open(CACHE).then((c) => c.put(req, copy));
          }
          return res;
        })
        .catch(() => caches.match(req))
    );
    return;
  }

  // Self-hosted Pyodide and other same-origin assets: cache-first after
  // the first successful download (these files are versioned and large).
  event.respondWith(
    caches.match(req).then((cached) => {
      if (cached && isPyodide) return cached;
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
});
