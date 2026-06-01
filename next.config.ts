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
        urlPattern: /^https:\/\/images\.unsplash\.com\/.*/i,
        handler: 'CacheFirst',
        options: {
          cacheName: 'ghf-external-images',
          expiration: {
            maxEntries: 100,
            maxAgeSeconds: 30 * 24 * 60 * 60, // 30 Days
          },
          cacheableResponse: {
            statuses: [0, 200],
          },
        },
      },
      {
        urlPattern: /\.(?:png|jpg|jpeg|svg|webp|gif)$/i,
        handler: 'CacheFirst',
        options: {
          cacheName: 'ghf-local-images',
          expiration: {
            maxEntries: 100,
            maxAgeSeconds: 30 * 24 * 60 * 60,
          },
        },
      },
      {
        urlPattern: /\/brands.*/i,
        handler: 'NetworkFirst',
        options: {
          cacheName: 'ghf-pages',
          expiration: {
            maxEntries: 50,
          },
        },
      }
    ]
  }
});

/** @type {import('next').NextConfig} */
const nextConfig = {
  // config options here
};

export default withPWA(nextConfig);

