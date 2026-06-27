"use client";

import React, { useEffect, useState } from "react";
import { getBrandImages } from "@/lib/brand-images";

export interface TileImageCarouselProps {
  brandSlugs: string[];
  intervalMs?: number;
}

export function TileImageCarousel({ brandSlugs, intervalMs = 1000 }: TileImageCarouselProps) {
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
    const id = setInterval(() => {
      setIndex((i) => (i + 1) % images.length);
    }, intervalMs);
    return () => clearInterval(id);
  }, [images.length, intervalMs]);

  if (images.length === 0) {
    return <div className="absolute inset-0 bg-[var(--muted)]/20" />;
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
