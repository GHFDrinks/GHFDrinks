"use client";

import React from "react";
import Link from "next/link";
import { STATIC_BRANDS } from "@/lib/static-brands";
import { getBrandImages } from "@/lib/brand-images";
import { getBrandVideo } from "@/data/brand-videos";

export default function BrandVideosPage() {
  return (
    <div className="min-h-screen py-16 px-6 md:px-14 bg-[var(--background)]">
      <div className="max-w-6xl mx-auto space-y-10">
        
        {/* Header & Back Link */}
        <div className="space-y-4">
          <Link
            href="/resources"
            className="text-xs tracking-widest uppercase text-[var(--sage)] hover:text-[var(--foreground)] transition-colors"
          >
            ← Back to resources
          </Link>
          <div>
            <h1 className="text-4xl font-light tracking-tight text-[var(--cream)]">
              Brand Videos
            </h1>
            <p className="text-sm text-[var(--sage)]">
              Explore films and promotional digital assets for GHF brands
            </p>
          </div>
        </div>

        {/* Video Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {STATIC_BRANDS.map((brand) => {
            const local = getBrandImages(brand.slug);
            const videoUrl = getBrandVideo(brand.slug);
            
            return (
              <div 
                key={brand.id}
                className="border border-[var(--border)]/20 rounded-2xl overflow-hidden bg-[var(--card)] shadow-xl flex flex-col"
              >
                {/* 16:9 Video or Placeholder */}
                <div className="relative aspect-[16/9] bg-[var(--muted)] overflow-hidden border-b border-[var(--border)]/20">
                  {videoUrl ? (
                    <video 
                      controls 
                      poster={local?.hero || brand.heroImage?.url || ""} 
                      className="w-full h-full object-cover"
                    >
                      <source src={videoUrl} type="video/mp4" />
                    </video>
                  ) : (
                    <div className="absolute inset-0 flex flex-col items-center justify-center p-6 bg-gradient-to-b from-[var(--card)] to-black/20">
                      {local?.logo ? (
                        <img 
                          src={local.logo} 
                          alt={brand.name} 
                          className="max-h-16 max-w-[200px] object-contain opacity-30 select-none mb-4" 
                        />
                      ) : (
                        <h2 className="text-2xl font-light tracking-wider uppercase text-[var(--cream)]/30 mb-2">
                          {brand.name}
                        </h2>
                      )}
                      <span className="text-[10px] tracking-[0.25em] uppercase text-[var(--sage)] font-bold">
                        Brand film coming soon
                      </span>
                    </div>
                  )}
                </div>

                {/* Footer Info */}
                <div className="p-5 flex justify-between items-center">
                  <div>
                    <h3 className="text-sm font-semibold text-[var(--cream)] tracking-wide">
                      {brand.name}
                    </h3>
                    <p className="text-[10px] tracking-wider uppercase text-[var(--sage)] mt-0.5">
                      {brand.category}
                    </p>
                  </div>
                  <Link
                    href={`/brands/${brand.slug}`}
                    className="text-xs font-bold tracking-widest uppercase text-[var(--sage)] hover:text-[var(--foreground)] transition-colors"
                  >
                    View Story →
                  </Link>
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </div>
  );
}
