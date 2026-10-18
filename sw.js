// ── Fuit'Eau — Service Worker ─────────────────────────────────────────────────
// Stratégie : réseau d'abord, cache en repli (offline).
// Incrémenter CACHE_NAME à chaque modification de fichier précaché.
const CACHE_NAME = 'fuiteau-v2';

const PRECACHE = [
  './',
  './index.html',
  './fiches.html',
  './carte.html',
  './parametres.html',
  './utilisateurs.html',
  // Libs auto-hébergées (étape 2 — plus de CDN)
  './libs/supabase.min.js',
  './libs/leaflet.min.css',
  './libs/leaflet.min.js',
  './libs/MarkerCluster.min.css',
  './libs/MarkerCluster.Default.min.css',
  './libs/leaflet.markercluster.min.js',
  './libs/jspdf.umd.min.js',
];

// ── Install : précache des ressources statiques ───────────────────────────────
self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => cache.addAll(PRECACHE))
      .then(() => self.skipWaiting())
  );
});

// ── Activate : supprime les anciens caches ────────────────────────────────────
self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys()
      .then(keys => Promise.all(
        keys.filter(k => k !== CACHE_NAME).map(k => caches.delete(k))
      ))
      .then(() => self.clients.claim())
  );
});

// ── Fetch : réseau d'abord, cache en repli ────────────────────────────────────
self.addEventListener('fetch', event => {
  // Ne pas intercepter les requêtes non-GET (Supabase API, etc.)
  if (event.request.method !== 'GET') return;

  // Ne pas intercepter les requêtes vers Supabase (temps réel, auth, data)
  const url = new URL(event.request.url);
  if (url.hostname.endsWith('supabase.co')) return;

  event.respondWith(
    fetch(event.request)
      .then(response => {
        // Mettre en cache la réponse fraîche (cloner car consommable une seule fois)
        if (response.ok) {
          const clone = response.clone();
          caches.open(CACHE_NAME).then(cache => cache.put(event.request, clone));
        }
        return response;
      })
      .catch(() => caches.match(event.request))
  );
});
