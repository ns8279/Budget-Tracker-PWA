const FILES_TO_CACHE = [
    "../index.html",
    "./idb.js",
    "./index.js",
    "../css/styles.css",
    "../icons/icon-72x72.png",
    "../icons/icon-96x96.png",
    "../icons/icon-128x128.png",
    "../icons/icon-144x144.png",
    "../icons/icon-152x152.png",
    "../icons/icon-192x192.png",
    "../icons/icon-384x384.png",
    "../icons/icon-512x512.png"
];

const APP_PREFIX = 'BudgetTracker-';
const VERSION = 'version_01';
const CACHE_NAME = APP_PREFIX + VERSION;


self.addEventListener('install', function(e) {
    e.waitUntil(
        caches.open(CACHE_NAME).then(function(cache) {
            console.log('installing cache: ' + CACHE_NAME)
            return cache.addAll(FILES_TO_CACHE)
        })
    )
});

self.addEventListener('fetch', function(e) {
    console.log('fetch request: ' + e.request.url)
    e.respondWith(
        caches.match(e.request)
        .then(function(request) {
            if(request) {
                //if cache is available, respond with cache
                console.log('responding with cache: ' + e.request.url)
                return request
            } else {
                //if there is no cache, try fetching request
                console.log('file not cached, fetching: ' + e.request.url);
                return fetch(e.request);
            }

            //You can omit if/else fir console.log & put one line below like this too
            //return request || fetch(e.request)
        })

    )
})
