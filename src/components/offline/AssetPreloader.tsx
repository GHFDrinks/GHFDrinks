"use client";

import { useEffect } from "react";
import { BRAND_IMAGES } from "@/lib/brand-images";

export function AssetPreloader() {
  useEffect(() => {
    if (!navigator.onLine || !("serviceWorker" in navigator)) return;

    const preload = () => {
      const urls = new Set<string>();

      Object.values(BRAND_IMAGES).forEach((b) => {
        if (b.hero) urls.add(b.hero);
        if (b.logo) urls.add(b.logo);
        b.lifestyle?.forEach((u) => urls.add(u));
        b.activations?.forEach((u) => urls.add(u));
        b.variants?.forEach((u) => urls.add(u));
      });

      urls.forEach((url) => {
        const img = new Image();
        img.src = url;
      });
    };

    if ("requestIdleCallback" in window) {
      window.requestIdleCallback(preload);
    } else {
      setTimeout(preload, 3000);
    }
  }, []);

  return null;
}
