"use client";

import React from "react";
import { Brand } from "@/types/brand";

export function BrandIntroSlide({ brand }: { brand: Brand }) {
  return (
    <div className="flex h-screen w-full overflow-hidden bg-white">

      {/* LEFT PANEL — lifestyle photo mosaic, ~20% width */}
      <div className="relative flex-shrink-0 overflow-hidden" style={{ width: "20%" }}>

        {/* 3 stacked lifestyle images */}
        <div className="flex flex-col h-full">
          {brand.lifestyleImages.length > 0
            ? brand.lifestyleImages.slice(0, 3).map((img, i) => (
                <div key={i} className="flex-1 overflow-hidden relative">
                  <img
                    src={img.url}
                    alt={img.alt}
                    className="w-full h-full object-cover"
                  />
                </div>
              ))
            : [0, 1, 2].map((i) => (
                <div
                  key={i}
                  className="flex-1"
                  style={{ backgroundColor: "var(--muted)" }}
                />
              ))}
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
          {brand.variants.length > 0
            ? brand.variants.slice(0, 4).map((v, i) => (
                <img
                  key={i}
                  src={v.image?.url}
                  alt={v.name}
                  className="object-contain max-h-full"
                  style={{ maxWidth: "140px" }}
                />
              ))
            : brand.heroImage?.url && (
                <img
                  src={brand.heroImage.url}
                  alt={brand.name}
                  className="object-contain max-h-full"
                  style={{ maxWidth: "220px" }}
                />
              )}
        </div>
      </div>

      {/* RIGHT PANEL — logo, description, SKU list, ~38% width */}
      <div
        className="flex-shrink-0 flex flex-col justify-center px-10 py-8 border-l border-gray-100"
        style={{ width: "38%" }}
      >

        {/* Brand logo or name fallback */}
        {brand.logo?.url ? (
          <img
            src={brand.logo.url}
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
