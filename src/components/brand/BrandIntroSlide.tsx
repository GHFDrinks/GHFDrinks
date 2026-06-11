"use client";

import React from "react";
import { Brand } from "@/types/brand";
import { getBrandImages } from "@/lib/brand-images";

export function BrandIntroSlide({ brand }: { brand: Brand }) {
  const local = getBrandImages(brand.slug);

  const bottleShots: string[] =
    local?.variants && local.variants.length > 0
      ? local.variants
      : (brand.variants
          .map((v) => v.image?.url)
          .filter(Boolean) as string[]);

  const lifestyle: string[] =
    local?.lifestyle && local.lifestyle.length > 0
      ? local.lifestyle
      : (brand.lifestyleImages?.map((l) => l.url).filter(Boolean) as string[]);

  const logoSrc = local?.logo || brand.logo?.url || "";
  const venueBadges = brand.venueBadges || [];

  return (
    <section className="w-full h-screen flex overflow-hidden bg-[var(--background)]">
      
      {/* LEFT 50% — Editorial Brand Info */}
      <div className="w-1/2 h-full flex flex-col justify-between p-16 relative z-10 border-r border-[var(--border)] bg-gradient-to-br from-[#0b1310] via-[#090f0d] to-[#060a08]">
        
        {/* Top Header */}
        <div className="flex items-center justify-between">
          <span className="text-[10px] tracking-[0.35em] uppercase text-[var(--gold)] font-bold">
            {brand.category} Presentation
          </span>
          {brand.bcorp && (
            <span className="text-[9px] font-bold tracking-widest uppercase border border-[var(--gold)] text-[var(--gold)] px-3 py-1 rounded-full">
              B-Corp Certified
            </span>
          )}
        </div>

        {/* Center Info */}
        <div className="my-auto max-w-lg space-y-6">
          {logoSrc ? (
            <img
              src={logoSrc}
              alt={brand.name}
              className="max-h-20 max-w-[260px] object-contain mb-4 filter brightness-100"
            />
          ) : (
            <h1 className="text-6xl font-light tracking-tight text-[var(--gold)] mb-4">
              {brand.name}
            </h1>
          )}
          
          <h2 className="text-xl font-light tracking-wide text-[var(--foreground)]/90 italic leading-relaxed">
            "{brand.tagline || brand.story?.headline || brand.story?.title || 'Crafted for discerning tastes.'}"
          </h2>

          <p className="text-sm leading-relaxed text-[var(--muted-foreground)]">
            {brand.story?.description || brand.tagline}
          </p>
          
          {brand.variants.length > 0 && (
            <div className="pt-4">
              <p className="text-xs font-bold tracking-[0.2em] uppercase text-[var(--foreground)] mb-3">
                Range Available
              </p>
              <div className="flex flex-wrap gap-2">
                {brand.variants.map((v) => (
                  <span
                    key={v.id}
                    className="text-[11px] font-medium px-3.5 py-1.5 rounded-full border border-[var(--border)] bg-[var(--card)] text-[var(--foreground)]/80 hover:border-[var(--gold)] hover:text-white transition-colors cursor-default"
                  >
                    {v.name}{v.volume ? ` (${v.volume})` : ""}
                  </span>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Bottom indicator */}
        <div className="text-[10px] tracking-widest text-[var(--muted-foreground)] uppercase">
          GHF Portfolio © 2026
        </div>
      </div>

      {/* RIGHT 50% — Lifestyle & Overlapping Bottle Showcase */}
      <div className="w-1/2 h-full relative overflow-hidden flex items-center justify-center bg-[#070b09]">
        
        {/* Full-bleed lifestyle backdrop */}
        {lifestyle.length > 0 ? (
          <>
            <img
              src={lifestyle[0]}
              alt=""
              className="absolute inset-0 w-full h-full object-cover scale-105"
              style={{ filter: "brightness(0.25) contrast(1.1) saturate(0.85)" }}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[var(--background)] via-transparent to-black/40" />
            <div className="absolute inset-0 bg-gradient-to-r from-[var(--background)] via-transparent to-transparent" />
          </>
        ) : (
          <div className="absolute inset-0 bg-gradient-to-br from-[#111c18] to-[#070b09]" />
        )}

        {/* Floating Overlapping Bottle Shot lineup */}
        <div className="relative z-10 flex items-end justify-center w-full h-[78%] px-12 pb-4">
          {bottleShots.length > 0 ? (
            bottleShots.slice(0, 3).map((src, i) => {
              // Calculate beautiful overlapping offsets
              let zIndex = 10;
              let scale = 1;
              let transX = 0;
              let transY = 0;
              
              if (bottleShots.length > 1) {
                if (i === 0) {
                  zIndex = 5;
                  scale = 0.9;
                  transX = 36;
                  transY = 16;
                } else if (i === 1 && bottleShots.length > 2) {
                  zIndex = 15;
                  scale = 1.05;
                  transX = 0;
                  transY = -4;
                } else if (i === 2) {
                  zIndex = 5;
                  scale = 0.9;
                  transX = -36;
                  transY = 16;
                } else if (i === 1 && bottleShots.length === 2) {
                  zIndex = 15;
                  scale = 0.98;
                  transX = -20;
                  transY = 8;
                }
              }

              return (
                <div
                  key={i}
                  className="relative transition-all duration-500 ease-out hover:scale-[1.1] hover:z-30 hover:-translate-y-4"
                  style={{
                    zIndex,
                    transform: `translateX(${transX}px) translateY(${transY}px) scale(${scale})`,
                    maxHeight: "90%",
                    width: bottleShots.length > 1 ? "36%" : "55%",
                  }}
                >
                  <img
                    src={src}
                    alt={brand.name}
                    className="h-full w-auto object-contain mx-auto filter drop-shadow-[0_30px_50px_rgba(0,0,0,0.95)]"
                    style={{ maxHeight: "58vh" }}
                  />
                </div>
              );
            })
          ) : (
            <div className="text-sm font-bold tracking-widest text-[var(--gold)] uppercase">
              Showcase Visual
            </div>
          )}
        </div>

        {/* Venue badges display bottom right */}
        {venueBadges.length > 0 && (
          <div className="absolute bottom-6 right-8 z-20 flex gap-3">
            {venueBadges.slice(0, 3).map((v, i) => (
              <div
                key={i}
                className="w-12 h-12 rounded-full bg-[var(--background)]/90 backdrop-blur border border-[var(--border)] flex items-center justify-center p-1.5 shadow-2xl"
              >
                {v.logoUrl ? (
                  <img src={v.logoUrl} alt={v.name} className="w-full h-full object-contain filter brightness-95" />
                ) : (
                  <span className="text-[7px] font-bold text-[var(--foreground)]/80 text-center leading-tight">
                    {v.name.slice(0, 3)}
                  </span>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
