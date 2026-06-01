"use client";

import { useEffect } from "react";
import { mockBrands } from "@/data/brands";

/**
 * Iterates through all brand data and forces the browser to fetch and cache
 * the high-res images so they are available offline.
 */
export function AssetPreloader() {
  useEffect(() => {
    // Only preload if we're online and the browser supports Service Workers
    if (!navigator.onLine || !('serviceWorker' in navigator)) return;

    // Use requestIdleCallback so we don't block the main thread during initial load
    const preloadAssets = () => {
      const urlsToCache = new Set<string>();

      mockBrands.forEach(brand => {
        if (brand.heroImage?.url) urlsToCache.add(brand.heroImage.url);
        if (brand.story?.image?.url) urlsToCache.add(brand.story.image.url);
        
        brand.variants.forEach(v => {
          if (v.image?.url) urlsToCache.add(v.image.url);
        });
        
        brand.serves.forEach(s => {
          if (s.image?.url) urlsToCache.add(s.image.url);
        });
        
        brand.activations.forEach(a => {
          if (a.image?.url) urlsToCache.add(a.image.url);
        });
        
        brand.mediaGallery.forEach(m => {
          if (m.url) urlsToCache.add(m.url);
        });
      });

      // Silently fetch all images to populate the PWA cache
      urlsToCache.forEach(url => {
        const img = new Image();
        img.src = url;
      });
    };

    if ('requestIdleCallback' in window) {
      window.requestIdleCallback(preloadAssets);
    } else {
      setTimeout(preloadAssets, 5000);
    }
  }, []);

  return null;
}
