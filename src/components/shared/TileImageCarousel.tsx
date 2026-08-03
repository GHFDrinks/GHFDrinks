"use client";

import React, { useEffect, useState } from "react";
import { getBrandImages } from "@/lib/brand-images";

export interface TileImageCarouselProps {
  brandSlugs: string[];
  /** Minimum time (ms) a single image stays on screen before changing. */
  minIntervalMs?: number;
  /** Random extra time (ms) added on top of the minimum, re-rolled each cycle. 0 = steady/in-sync. */
  maxJitterMs?: number;
}

export function TileImageCarousel({
  brandSlugs,
  minIntervalMs = 5000,
  maxJitterMs = 3000,
}: TileImageCarouselProps) {
  // Collect all lifestyle/hero images from all brands in the list.
  const images = React.useMemo(() => {
    return brandSlugs.flatMap((slug) => {
      const imgs = getBrandImages(slug);
      return imgs?.lifestyle?.length ? imgs.lifestyle : imgs?.hero ? [imgs.hero] : [];
    });
  }, [brandSlugs]);

  const [index, setIndex] = useState(0);

  useEffect(() => {
    if (images.length <= 1) return;

    // Self-rescheduling timeout: each cycle waits a fresh random duration
    // (>= minIntervalMs) so tiles drift out of sync and never all change at once.
    // Math.random() lives only in the effect (client-only) to avoid SSR hydration mismatch.
    let timeoutId: ReturnType<typeof setTimeout>;
    const scheduleNext = () => {
      const delay = minIntervalMs + Math.random() * maxJitterMs;
      timeoutId = setTimeout(() => {
        setIndex((i) => (i + 1) % images.length);
        scheduleNext();
      }, delay);
    };

    scheduleNext();
    return () => clearTimeout(timeoutId);
  }, [images.length, minIntervalMs, maxJitterMs]);

  if (images.length === 0) {
    // Dark fill so the pearl copy stays legible on imageless tiles too.
    return <div className="absolute inset-0 bg-[var(--foreground)]" />;
  }

  return (
    <div className="absolute inset-0 overflow-hidden">
      {images.map((src, i) => (
        <img
          key={src + "-" + i}
          src={src}
          alt=""
          className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-700 ease-out ${
            i === index ? "opacity-100" : "opacity-0"
          }`}
          style={{ pointerEvents: "none" }}
        />
      ))}
      {/* Overlay for text legibility */}
      <div className="absolute inset-0 bg-black/60 group-hover:bg-black/55 transition-colors" />
    </div>
  );
}
