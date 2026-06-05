"use client";

import React from "react";
import { Brand } from "@/types/brand";
import { getBrandImages } from "@/lib/brand-images";

export function BrandActivationSlide({ brand }: { brand: Brand }) {
  if (!brand.activations || brand.activations.length === 0) return null;

  const local = getBrandImages(brand.slug);
  const act1 = brand.activations[0];
  const act2 = brand.activations[1];
  const allDates = brand.activations.flatMap(a => a.keyDates || []);
  const tickerText = allDates.join("   ·   ");

  const act1Photo = local?.activations?.[0] || act1.photo1?.url || act1.image?.url || "";
  const act2Photo = local?.activations?.[1] || act2?.photo1?.url || act2?.image?.url || "";

  return (
    <div className="flex flex-col h-screen w-full bg-white overflow-hidden">
      <div className="flex flex-1 overflow-hidden">

        {/* LEFT COLUMN — badges */}
        <div className="flex-shrink-0 flex flex-col items-center justify-between py-6 border-r border-gray-100 bg-gray-50/50" style={{ width: "72px" }}>
          {act1?.activationType && (
            <div className="w-14 h-14 rounded-full border-2 flex items-center justify-center text-center p-1"
                 style={{ borderColor: "var(--accent)", color: "var(--accent)" }}>
              <span className="text-[7px] font-bold leading-tight uppercase">{act1.activationType}</span>
            </div>
          )}
          {act1?.mixerPairings?.[0] && (
            <div className="flex flex-col items-center gap-2">
              <span className="text-[8px] tracking-widest uppercase text-gray-400"
                    style={{ writingMode: "vertical-rl", transform: "rotate(180deg)" }}>Try with...</span>
              <img src={act1.mixerPairings[0].imageUrl} alt={act1.mixerPairings[0].name} className="w-10 object-contain" />
            </div>
          )}
        </div>

        {/* ACTIVATION 1 */}
        {act1 && (
          <div className="flex-1 flex flex-col border-r border-gray-100 overflow-hidden bg-white">
            <div className="overflow-hidden bg-gray-50" style={{ height: "52%" }}>
              {act1Photo && <img src={act1Photo} alt={act1.title} className="w-full h-full object-cover transition-transform duration-[2000ms] hover:scale-105" />}
            </div>
            <div className="flex-1 px-6 py-4 flex flex-col justify-between overflow-hidden">
              <div>
                <p className="text-[9px] tracking-widest uppercase text-gray-400 mb-0.5">Activation</p>
                <h3 className="text-base font-medium mb-1.5 leading-tight" style={{ color: "var(--accent)" }}>{act1.title}</h3>
                <p className="text-xs text-gray-500 leading-relaxed mb-3 line-clamp-3">{act1.description}</p>
              </div>
              {act1.keyDates?.length > 0 && (
                <div className="border-t border-gray-100 pt-2.5">
                  <p className="text-[9px] font-bold tracking-widest uppercase text-gray-400 mb-0.5">Key Dates</p>
                  <p className="text-xs text-gray-700 font-medium">{act1.keyDates.join(" | ")}</p>
                </div>
              )}
            </div>
          </div>
        )}

        {/* ACTIVATION 2 */}
        {act2 && (
          <div className="flex-1 flex flex-col overflow-hidden bg-white">
            <div className="overflow-hidden bg-gray-50" style={{ height: "52%" }}>
              {act2Photo && <img src={act2Photo} alt={act2.title} className="w-full h-full object-cover transition-transform duration-[2000ms] hover:scale-105" />}
            </div>
            <div className="flex-1 px-6 py-4 flex flex-col justify-between overflow-hidden">
              <div>
                <p className="text-[9px] tracking-widest uppercase text-gray-400 mb-0.5">Activation</p>
                <h3 className="text-base font-medium mb-1.5 leading-tight" style={{ color: "var(--accent)" }}>{act2.title}</h3>
                <p className="text-xs text-gray-500 leading-relaxed mb-3 line-clamp-3">{act2.description}</p>
              </div>
              {act2.keyDates?.length > 0 && (
                <div className="border-t border-gray-100 pt-2.5">
                  <p className="text-[9px] font-bold tracking-widest uppercase text-gray-400 mb-0.5">Key Dates</p>
                  <p className="text-xs text-gray-700 font-medium">{act2.keyDates.join(" | ")}</p>
                </div>
              )}
            </div>
          </div>
        )}
      </div>

      {/* Marquee Ticker */}
      {tickerText && (
        <div className="h-8 flex items-center overflow-hidden border-t border-gray-100 bg-gray-50 flex-shrink-0">
          <div className="flex animate-marquee whitespace-nowrap">
            <span className="text-[9px] tracking-widest uppercase font-semibold text-gray-500 px-4">
              · {tickerText} · {tickerText} · {tickerText} · {tickerText} ·
            </span>
          </div>
        </div>
      )}

      {/* Slide Footer Navigation */}
      <div className="px-6 py-2.5 flex justify-between text-[10px] text-gray-400 tracking-widest uppercase border-t border-gray-100 flex-shrink-0 bg-white">
        <span>&lt;&lt; back</span>
        <span>next &gt;&gt;</span>
      </div>
    </div>
  );
}
