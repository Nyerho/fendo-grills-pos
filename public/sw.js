const CACHE_PREFIX = 'fendo-app-shell'
let CACHE_NAME = null

function uniq(arr) {
  return Array.from(new Set(arr))
}

async function getBuildManifestPaths() {
  const res = await fetch('/.vite/manifest.json', { cache: 'no-store' })
  if (!res.ok) return []
  const manifest = await res.json()
  const paths = []
  for (const entry of Object.values(manifest)) {
    if (entry?.file) paths.push(`/${String(entry.file).replace(/^\/+/, '')}`)
    if (Array.isArray(entry?.css)) {
      for (const css of entry.css) paths.push(`/${String(css).replace(/^\/+/, '')}`)
    }
    if (Array.isArray(entry?.assets)) {
      for (const asset of entry.assets) paths.push(`/${String(asset).replace(/^\/+/, '')}`)
    }
  }
  return uniq(paths)
}

async function getCacheName() {
  try {
    const paths = await getBuildManifestPaths()
    const fingerprint = paths.join('|')
    let hash = 0
    for (let i = 0; i < fingerprint.length; i++) {
      hash = (hash * 31 + fingerprint.charCodeAt(i)) >>> 0
    }
    return `${CACHE_PREFIX}-${hash.toString(16)}`
  } catch {
    return `${CACHE_PREFIX}-fallback`
  }
}

self.addEventListener('install', (event) => {
  event.waitUntil(
    (async () => {
      CACHE_NAME = await getCacheName()
      const cache = await caches.open(CACHE_NAME)
      const core = ['/', '/index.html', '/.vite/manifest.json', '/manifest.webmanifest']
      let manifestPaths = []
      try {
        manifestPaths = await getBuildManifestPaths()
      } catch {
        manifestPaths = []
      }
      const toCache = uniq([...core, ...manifestPaths])
      try {
        await cache.addAll(toCache)
      } catch {
        await cache.addAll(core)
      }
      self.skipWaiting()
    })()
  )
})

self.addEventListener('activate', (event) => {
  event.waitUntil(
    (async () => {
      CACHE_NAME = await getCacheName()
      const keep = CACHE_NAME
      const keys = await caches.keys()
      await Promise.all(
        keys
          .filter((k) => k.startsWith(CACHE_PREFIX) && k !== keep)
          .map((k) => caches.delete(k))
      )
      self.clients.claim()
    })()
  )
})

self.addEventListener('fetch', (event) => {
  const req = event.request
  const url = new URL(req.url)
  if (req.method !== 'GET') return
  if (url.origin !== self.location.origin) return

  const handle = async () => {
    const cacheName = CACHE_NAME || (await getCacheName())
    const cache = await caches.open(cacheName)

    if (req.mode === 'navigate') {
      try {
        const net = await fetch(req)
        const copy = net.clone()
        cache.put('/index.html', copy).catch(() => {})
        return net
      } catch {
        const cached = await cache.match('/index.html')
        if (cached) return cached
        return new Response('Offline', { status: 503 })
      }
    }

    const cached = await cache.match(req)
    if (cached) return cached

    try {
      const net = await fetch(req)
      if (net.ok) cache.put(req, net.clone()).catch(() => {})
      return net
    } catch {
      return new Response('Offline', { status: 503 })
    }
  }

  event.respondWith(handle())
})
