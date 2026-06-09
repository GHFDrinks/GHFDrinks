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
    <section className="w-full h-screen flex overflow-hidden bg-white">

      {/* LEFT — lifestyle mosaic, fixed 18% width, fills full height */}
      <div className="relative h-full flex-shrink-0" style={{ width: "18%" }}>
        <div className="flex flex-col h-full">
          {lifestyle.length > 0 ? (
            lifestyle.slice(0, 3).map((url, i) => (
              <div key={i} className="flex-1 min-h-0 overflow-hidden">
                <img src={url} alt="" className="w-full h-full object-cover" />
              </div>
            ))
          ) : (
            <div className="flex-1" style={{ backgroundColor: "var(--muted)" }} />
          )}
        </div>

        {/* Venue badge circles overlaid down the left edge */}
        {venueBadges.length > 0 && (
          <div className="absolute inset-y-0 right-0 translate-x-1/2 flex flex-col justify-center gap-6 pointer-events-none">
            {venueBadges.slice(0, 3).map((v, i) => (
              <div
                key={i}
                className="w-16 h-16 rounded-full bg-white shadow-lg flex items-center justify-center p-2 border border-gray-100"
              >
                {v.logoUrl ? (
                  <img src={v.logoUrl} alt={v.name} className="w-full h-full object-contain" />
                ) : (
                  <span className="text-[9px] font-bold leading-tight text-gray-700 uppercase text-center">
                    {v.name}
                  </span>
                )}
              </div>
            ))}
          </div>
        )}
      </div>

      {/* CENTER — bottle shots, fixed 37% width, bottles centered + bottom-aligned */}
      <div
        className="h-full flex-shrink-0 flex items-end justify-center pb-12 px-6"
        style={{ width: "37%" }}
      >
        <div className="flex items-end justify-center gap-4 h-[78%] w-full">
          {bottleShots.length > 0 ? (
            bottleShots.slice(0, 4).map((src, i) => (
              <img
                key={i}
                src={src}
                alt={brand.name}
                className="h-full w-auto object-contain"
                style={{ maxWidth: `${Math.floor(90 / Math.min(bottleShots.length, 4))}%` }}
              />
            ))
          ) : (
            <div className="text-sm" style={{ color: "var(--muted-foreground)" }}>
              No image
            </div>
          )}
        </div>
      </div>

      {/* RIGHT — logo, description, range, fixed 45%, vertically centered */}
      <div
        className="h-full flex-shrink-0 flex flex-col items-center justify-center text-center px-12"
        style={{ width: "45%" }}
      >
        {logoSrc ? (
          <img
            src={logoSrc}
            alt={brand.name + " logo"}
            className="max-h-28 max-w-[260px] object-contain mb-8"
          />
        ) : (
          <h1
            className="text-4xl font-light tracking-tight mb-8"
            style={{ color: "var(--accent)" }}
          >
            {brand.name}
          </h1>
        )}

        <p className="text-base leading-relaxed text-gray-700 mb-8 max-w-md">
          {brand.story?.description || brand.tagline}
        </p>

        {brand.variants.length > 0 && (
          <div className="mb-6">
            <p className="text-base font-bold mb-3" style={{ color: "var(--foreground)" }}>
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

        {brand.bcorp && (
          <div className="mt-2">
            <span
              className="text-xs font-semibold border rounded-full px-3 py-1"
              style={{ borderColor: "var(--accent)", color: "var(--accent)" }}
            >
              Certified B Corporation
            </span>
          </div>
        )}
      </div>
    </section>
  );
}
