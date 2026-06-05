"use client";

import React from "react";
import { Brand } from "@/types/brand";
import { getBrandImages } from "@/lib/brand-images";

export function BrandIntroSlide({ brand }: { brand: Brand }) {
  const local = getBrandImages(brand.slug);
  console.log('Brand slug:', brand.slug, 'Local images:', local);

  const bottleShots = local?.variants?.length
    ? local.variants
    : brand.variants.slice(0, 4).map(v => v.image?.url).filter(Boolean);

  const lifestyle = local?.lifestyle?.length
    ? local.lifestyle
    : brand.lifestyleImages?.map(l => l.url) || [];

  const logoSrc = local?.logo || brand.logo?.url;

  return (
    <div className="flex h-screen w-full overflow-hidden bg-white">

      {/* LEFT — lifestyle mosaic */}
      <div className="relative flex-shrink-0 overflow-hidden" style={{ width: "20%" }}>
        <div className="flex flex-col h-full">
          {lifestyle.length > 0
            ? lifestyle.slice(0, 3).map((url, i) => (
                <div key={i} className="flex-1 overflow-hidden">
                  <img src={url} alt="" className="w-full h-full object-cover" />
                </div>
              ))
            : [0,1,2].map(i => (
                <div key={i} className="flex-1" style={{ backgroundColor: "var(--muted)" }} />
              ))}
        </div>
        {brand.venueBadges?.slice(0,3).map((v, i) => (
          <div key={i} className="absolute w-16 h-16 rounded-full bg-white shadow-md flex items-center justify-center p-2 border border-gray-100"
               style={{ top: `${15 + i * 30}%`, left: "50%", transform: "translateX(-50%)" }}>
            {v.logoUrl
              ? <img src={v.logoUrl} alt={v.name} className="w-full h-full object-contain" />
              : <span className="text-[9px] font-bold leading-tight text-gray-700 uppercase text-center">{v.name}</span>
            }
          </div>
        ))}
        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 w-14 h-14 rounded-full border-2 flex items-center justify-center text-center p-1"
             style={{ borderColor: "var(--accent)", color: "var(--accent)" }}>
          <span className="text-[7px] font-bold leading-tight uppercase">INSIGHTS · CATEGORY</span>
        </div>
      </div>

      {/* CENTER — bottle shots */}
      <div className="flex-1 flex items-end justify-center pb-8 overflow-hidden" style={{ backgroundColor: "#f9f9f7" }}>
        <div className="flex items-end justify-center gap-3 px-4 h-5/6">
          {bottleShots.length > 0
            ? bottleShots.slice(0, 4).map((src, i) => (
                <img key={i} src={src as string} alt={brand.name}
                     className="object-contain max-h-full transition-transform duration-500 hover:scale-105"
                     style={{
                       maxWidth: "140px",
                       width: "auto",
                       height: "auto",
                       mixBlendMode: "multiply"
                     }} />
              ))
            : null}
        </div>
      </div>

      {/* RIGHT — brand info */}
      <div className="flex-shrink-0 flex flex-col justify-center px-10 py-8 border-l border-gray-100" style={{ width: "38%" }}>
        {logoSrc
          ? <img src={logoSrc} alt={brand.name + " logo"} className="max-h-20 max-w-xs object-contain mb-6" />
          : <h1 className="text-4xl font-light tracking-tight mb-6" style={{ color: "var(--accent)" }}>{brand.name}</h1>
        }
        {brand.bcorp && (
          <span className="text-xs font-semibold border px-2 py-1 rounded mb-4 inline-block"
                style={{ borderColor: "var(--accent)", color: "var(--accent)" }}>
            Certified B Corporation
          </span>
        )}
        <p className="text-sm leading-relaxed text-gray-600 mb-8 max-w-sm">
          {brand.story?.description || brand.tagline}
        </p>
        {brand.variants.length > 0 && (
          <div>
            <p className="text-xs font-bold tracking-widest uppercase mb-3">Range Available</p>
            <ul className="space-y-1.5">
              {brand.variants.map(v => (
                <li key={v.id} className="text-sm text-gray-700">{v.name}{v.volume ? ` ${v.volume}` : ""}</li>
              ))}
            </ul>
          </div>
        )}
        <div className="mt-auto pt-6 flex items-center justify-between text-xs text-gray-400 tracking-widest uppercase">
          <span>&lt;&lt; back</span>
          <span>next &gt;&gt;</span>
        </div>
      </div>
    </div>
  );
}
