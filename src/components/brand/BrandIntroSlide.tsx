"use client";

import React from "react";
import { Brand } from "@/types/brand";
import { getBrandImages } from "@/lib/brand-images";

export function BrandIntroSlide({ brand }: { brand: Brand }) {
  const localImages = getBrandImages(brand.slug);
  return (
    <div className="flex h-screen w-full overflow-hidden bg-white">

      {/* LEFT PANEL — lifestyle photo mosaic, ~20% width */}
      <div className="relative flex-shrink-0 overflow-hidden" style={{ width: "20%" }}>

        {/* 3 stacked lifestyle images */}
        <div className="flex flex-col h-full">
          {(() => {
            const items = [];
            for (let i = 0; i < 3; i++) {
              const src = localImages?.lifestyle?.[i] || brand.lifestyleImages?.[i]?.url;
              const alt = brand.lifestyleImages?.[i]?.alt || "";
              if (src) {
                items.push(
                  <div key={i} className="flex-1 overflow-hidden relative">
                    <img
                      src={src}
                      alt={alt}
                      className="w-full h-full object-cover"
                    />
                  </div>
                );
              } else {
                items.push(
                  <div
                    key={i}
                    className="flex-1"
                    style={{ backgroundColor: "var(--muted)" }}
                  />
                );
              }
            }
            return items;
          })()}
        </div>

        {/* Venue badge circles overlaid on mosaic */}
        <div className="absolute inset-0 flex flex-col justify-around items-center pointer-events-none py-6">
          {brand.venueBadges?.slice(0, 3).map((v, i) => (
            <div
              key={i}
              className="w-16 h-16 rounded-full bg-white shadow-md flex items-center justify-center p-2 border border-gray-100"
            >
              {v.logoUrl ? (
                <img
                  src={v.logoUrl}
                  alt={v.name}
                  className="w-full h-full object-contain"
                />
              ) : (
                <span className="text-center text-[9px] font-bold leading-tight text-gray-700 uppercase">
                  {v.name}
                </span>
              )}
            </div>
          ))}
        </div>

        {/* Bottom-left circular category insights badge */}
        <div
          className="absolute bottom-4 left-1/2 -translate-x-1/2 w-14 h-14 rounded-full border-2 flex items-center justify-center text-center p-1"
          style={{ borderColor: "var(--accent)", color: "var(--accent)" }}
        >
          <span className="text-[7px] font-bold leading-tight uppercase">
            INSIGHTS · CATEGORY
          </span>
        </div>
      </div>

      {/* CENTER — bottle shots */}
      <div
        className="flex-1 flex items-end justify-center pb-8 overflow-hidden"
        style={{ backgroundColor: "#f9f9f7" }}
      >
        <div className="flex items-end justify-center gap-3 px-4 h-5/6">
          {(() => {
            const hasVariants = (localImages?.variants && localImages.variants.length > 0) || brand.variants.length > 0;
            if (hasVariants) {
              const maxLen = Math.max(localImages?.variants?.length || 0, brand.variants.length);
              const items = [];
              for (let i = 0; i < Math.min(maxLen, 4); i++) {
                const src = localImages?.variants?.[i] || brand.variants[i]?.image?.url;
                const alt = brand.variants[i]?.name || brand.name;
                if (src) {
                  items.push(
                    <img
                      key={i}
                      src={src}
                      alt={alt}
                      className="object-contain max-h-full"
                      style={{ maxWidth: "140px" }}
                    />
                  );
                }
              }
              if (items.length > 0) return items;
            }

            const heroSrc = localImages?.hero || brand.heroImage?.url;
            if (heroSrc) {
              return (
                <img
                  src={heroSrc}
                  alt={brand.name}
                  className="object-contain max-h-full"
                  style={{ maxWidth: "220px" }}
                />
              );
            }

            return null;
          })()}
        </div>
      </div>

      {/* RIGHT PANEL — logo, description, SKU list, ~38% width */}
      <div
        className="flex-shrink-0 flex flex-col justify-center px-10 py-8 border-l border-gray-100"
        style={{ width: "38%" }}
      >

        {/* Brand logo or name fallback */}
        {localImages?.logo || brand.logo?.url ? (
          <img
            src={localImages?.logo || brand.logo?.url}
            alt={brand.name + " logo"}
            className="max-h-20 max-w-xs object-contain mb-6"
          />
        ) : (
          <h1
            className="text-4xl font-light tracking-tight mb-6"
            style={{ color: "var(--accent)" }}
          >
            {brand.name}
          </h1>
        )}

        {/* B-Corp badge */}
        {brand.bcorp && (
          <div className="mb-4">
            <span
              className="text-xs font-semibold border px-2 py-1 rounded"
              style={{ borderColor: "var(--accent)", color: "var(--accent)" }}
            >
              Certified B Corporation
            </span>
          </div>
        )}

        {/* Description */}
        <p className="text-sm leading-relaxed text-gray-600 mb-8 max-w-sm">
          {brand.story?.description || brand.tagline}
        </p>

        {/* Range Available */}
        {brand.variants.length > 0 && (
          <div>
            <p
              className="text-xs font-bold tracking-widest uppercase mb-3"
              style={{ color: "var(--foreground)" }}
            >
              Range Available
            </p>
            <ul className="space-y-1.5">
              {brand.variants.map((v) => (
                <li key={v.id} className="text-sm text-gray-700">
                  {v.name}
                  {v.volume ? ` ${v.volume}` : ""}
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* back / next */}
        <div className="mt-auto pt-6 flex items-center justify-between text-xs text-gray-400 tracking-widest uppercase">
          <span>&lt;&lt; back</span>
          <span>next &gt;&gt;</span>
        </div>
      </div>
    </div>
  );
}
