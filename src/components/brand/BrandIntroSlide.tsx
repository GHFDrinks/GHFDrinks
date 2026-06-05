"use client";

import React from "react";
import { Brand } from "@/types/brand";
import { getBrandImages } from "@/lib/brand-images";

export function BrandIntroSlide({ brand }: { brand: Brand }) {
  const local = getBrandImages(brand.slug);
  console.log('Brand slug:', brand.slug, 'Local images:', local);

  const bottleShots = (() => {
    let shots = local?.variants?.length
      ? [...local.variants]
      : brand.variants.slice(0, 4).map(v => v.image?.url).filter(Boolean);

    // Filter out logo-like or lifestyle-like duplicate files from variants
    if (['fielden', 'pensador', 'coates-and-seely', 'quinta-da-romaneira'].includes(brand.slug)) {
      shots = shots.slice(0, 1);
    } else if (brand.slug === 'mirabeau') {
      shots = shots.slice(1, 3);
    }
    return shots;
  })();

  const lifestyle = local?.lifestyle?.length
    ? local.lifestyle
    : brand.lifestyleImages?.map(l => l.url) || [];

  const logoSrc = local?.logo || brand.logo?.url;
  const showTextLogo = !logoSrc || ['fielden', 'coates-and-seely'].includes(brand.slug);
  const hasNoRealBottles = ['coates-and-seely', 'quinta-da-romaneira'].includes(brand.slug);

  return (
    <div className="flex flex-col h-screen w-full overflow-hidden bg-white">
      
      {/* TOP — Lifestyle Banner (landscape photos showing humans/places) */}
      <div className="relative h-[42%] w-full overflow-hidden border-b border-gray-100 flex-shrink-0">
        <div className="flex h-full w-full">
          {lifestyle.length > 0
            ? lifestyle.slice(0, 3).map((url, i) => (
                <div key={i} className="flex-1 h-full overflow-hidden relative group">
                  <img src={url} alt="" className="w-full h-full object-cover transition-transform duration-[2000ms] group-hover:scale-105" />
                  <div className="absolute inset-0 bg-black/5" />
                </div>
              ))
            : [0, 1, 2].map(i => (
                <div key={i} className="flex-1 h-full bg-gray-50 border-r last:border-r-0 border-gray-100" />
              ))}
        </div>
        
        {/* Floating circular venue badges */}
        {brand.venueBadges?.slice(0, 4).map((v, i) => (
          <div key={i} className="absolute w-14 h-14 rounded-full bg-white/95 backdrop-blur-md shadow-lg flex items-center justify-center p-2 border border-white/20 transition-transform duration-300 hover:scale-110"
               style={{ top: "15px", left: `${20 + i * 70}px`, zIndex: 10 }}>
            {v.logoUrl
              ? <img src={v.logoUrl} alt={v.name} className="w-full h-full object-contain" />
              : <span className="text-[8px] font-bold leading-tight text-gray-800 uppercase text-center">{v.name}</span>
            }
          </div>
        ))}
      </div>

      {/* BOTTOM — Split Content */}
      <div className="flex flex-1 w-full overflow-hidden">
        {/* BOTTOM LEFT — Content area */}
        {hasNoRealBottles ? (
          <div className="flex-1 h-full overflow-hidden relative">
            <img 
              src={lifestyle[1] || lifestyle[0] || brand.heroImage?.url} 
              alt={brand.name} 
              className="w-full h-full object-cover transition-transform duration-[2000ms] hover:scale-105" 
            />
            <div className="absolute inset-0 bg-black/10" />
            
            {/* Elegant overlay badge */}
            <div className="absolute bottom-6 left-6 px-4 py-2 bg-white/90 backdrop-blur-md rounded border border-white/20 z-10 shadow-md">
              <span className="text-[9px] tracking-widest uppercase font-bold text-gray-800">
                Heritage & Lifestyle
              </span>
            </div>
          </div>
        ) : (
          /* Bottles shelf */
          <div className="flex-1 flex items-end justify-center pb-10 overflow-hidden relative" 
               style={{ background: "linear-gradient(to bottom, #ffffff, #f7f7f4)" }}>
            
            {/* Subtle shelf line */}
            <div className="absolute bottom-10 left-12 right-12 h-[1px] bg-gray-250/50 shadow-sm" />
            
            <div className="flex items-end justify-center gap-6 px-8 h-4/5 relative z-10">
              {bottleShots.length > 0
                ? bottleShots.map((src, i) => (
                    <img key={i} src={src as string} alt={brand.name}
                         className="object-contain max-h-full transition-transform duration-500 hover:scale-105 hover:-translate-y-2"
                         style={{
                           maxWidth: "160px",
                           width: "auto",
                           height: "auto",
                           mixBlendMode: "multiply",
                           filter: "drop-shadow(0 10px 8px rgba(0,0,0,0.04))"
                         }} />
                  ))
                : null}
            </div>
          </div>
        )}

        {/* BOTTOM RIGHT — Brand Info */}
        <div className="w-[36%] flex-shrink-0 flex flex-col justify-center px-12 py-8 border-l border-gray-100 relative bg-white">
          {!showTextLogo && logoSrc
            ? <img src={logoSrc} alt={brand.name + " logo"} className="max-h-16 max-w-[200px] object-contain mb-5" />
            : <h1 className="text-3xl font-normal tracking-wider mb-5 uppercase" style={{ color: "var(--accent)", fontFamily: "var(--font-serif)" }}>{brand.name}</h1>
          }
          
          <div className="flex items-center gap-3 mb-4">
            {brand.category && (
              <span className="text-[10px] tracking-widest uppercase font-semibold text-gray-400">
                {brand.category}
              </span>
            )}
            {brand.bcorp && (
              <span className="text-[9px] font-bold tracking-wider border px-2 py-0.5 rounded uppercase"
                    style={{ borderColor: "var(--accent)", color: "var(--accent)" }}>
                B-Corp
              </span>
            )}
          </div>

          <p className="text-sm leading-relaxed text-gray-600 mb-6 max-w-sm">
            {brand.story?.description || brand.tagline}
          </p>
          
          {brand.variants.length > 0 && (
            <div className="border-t border-gray-100 pt-5">
              <p className="text-[10px] font-bold tracking-widest uppercase text-gray-400 mb-3">Range Available</p>
              <ul className="grid grid-cols-1 gap-1.5 max-h-[160px] overflow-y-auto pr-2">
                {brand.variants.map(v => (
                  <li key={v.id} className="text-xs text-gray-700 flex items-center justify-between">
                    <span className="font-medium">{v.name}</span>
                    <span className="text-gray-400 text-[10px]">{v.volume ? `${v.volume}` : ""}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}
          
          <div className="mt-auto pt-6 flex items-center justify-between text-[10px] text-gray-400 tracking-widest uppercase border-t border-gray-100">
            <span>&lt;&lt; back</span>
            <span>next &gt;&gt;</span>
          </div>
        </div>
      </div>
    </div>
  );
}
