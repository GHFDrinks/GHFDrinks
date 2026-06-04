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
        urlPattern: /^https:\/\/meitlqrtqebmuovjqtei\.supabase\.co\/.*/i,
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
