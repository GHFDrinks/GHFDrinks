import withPWAInit from "@ducanh2912/next-pwa";

const withPWA = withPWAInit({
  dest: "public",
  disable: process.env.NODE_ENV === "development",
  register: true,
  cacheOnFrontEndNav: true,
  aggressiveFrontEndNavCaching: true,
  workboxOptions: {
    disableDevLogs: true,
    runtimeCaching: [
      {
        // App Router RSC payloads (the data the client router fetches on every
        // in-app navigation). Keyed by the `RSC` request header. ignoreVary is
        // required because Next varies RSC responses on router-state headers that
        // differ between our warm-up fetch and the real navigation request; without
        // it the cache would never match offline. ignoreSearch drops the `?_rsc=`
        // cache-buster. This is what lets *every* page (not just visited ones) open
        // offline once SitePrecacher has warmed it.
        urlPattern: ({ url, sameOrigin, request }) =>
          sameOrigin &&
          request.headers.has("RSC") &&
          !url.pathname.startsWith("/api/"),
        handler: "NetworkFirst",
        options: {
          cacheName: "ghf-pages-rsc",
          networkTimeoutSeconds: 4,
          matchOptions: { ignoreSearch: true, ignoreVary: true },
          expiration: { maxEntries: 600, maxAgeSeconds: 30 * 24 * 60 * 60 },
          cacheableResponse: { statuses: [0, 200] },
        },
      },
      {
        // Full HTML documents — needed when the app is hard-loaded/refreshed
        // directly on a sub-route while offline. Matches real browser navigations
        // as well as SitePrecacher's `Accept: text/html` warm-up fetches. "/" is
        // left to next-pwa's own start-url handler.
        urlPattern: ({ url, sameOrigin, request }) =>
          sameOrigin &&
          url.pathname !== "/" &&
          !url.pathname.startsWith("/api/") &&
          !url.pathname.startsWith("/_next/") &&
          (request.mode === "navigate" ||
            request.destination === "document" ||
            (request.headers.get("accept") || "").includes("text/html")),
        handler: "NetworkFirst",
        options: {
          cacheName: "ghf-pages-doc",
          networkTimeoutSeconds: 4,
          matchOptions: { ignoreSearch: true },
          expiration: { maxEntries: 600, maxAgeSeconds: 30 * 24 * 60 * 60 },
          cacheableResponse: { statuses: [0, 200] },
        },
      },
      {
        urlPattern: /\/brands\/.*\.(?:png|jpg|jpeg|webp|svg)$/i,
        handler: "CacheFirst",
        options: {
          cacheName: "ghf-brand-images",
          expiration: {
            maxEntries: 500,
            maxAgeSeconds: 90 * 24 * 60 * 60,
          },
          cacheableResponse: { statuses: [0, 200] },
        },
      },
      {
        urlPattern: /\/fonts\/.*\.(?:otf|woff|woff2)$/i,
        handler: "CacheFirst",
        options: {
          cacheName: "ghf-fonts",
          expiration: { maxEntries: 10, maxAgeSeconds: 365 * 24 * 60 * 60 },
          cacheableResponse: { statuses: [0, 200] },
        },
      },
      {
        // Cache any Supabase project (was hardcoded to one project ref, which
        // broke offline data caching for a different project).
        urlPattern: /^https:\/\/[a-z0-9-]+\.supabase\.co\/.*/i,
        handler: "NetworkFirst",
        options: {
          cacheName: "ghf-supabase",
          networkTimeoutSeconds: 5,
          expiration: { maxEntries: 100, maxAgeSeconds: 7 * 24 * 60 * 60 },
          cacheableResponse: { statuses: [0, 200] },
        },
      },
      {
        urlPattern: /\.(?:js|css)$/i,
        handler: "StaleWhileRevalidate",
        options: {
          cacheName: "ghf-static",
          expiration: { maxEntries: 100 },
        },
      },
    ],
  },
});

const nextConfig = {};

export default withPWA(nextConfig);
