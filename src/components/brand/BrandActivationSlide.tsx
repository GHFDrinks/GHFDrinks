"use client";

import React from "react";
import { Brand } from "@/types/brand";

export function BrandActivationSlide({ brand }: { brand: Brand }) {
  if (!brand.activations || brand.activations.length === 0) return null;

  const act1 = brand.activations[0];
  const act2 = brand.activations[1];

  // Build ticker text from all key dates across all activations
  const allDates = brand.activations.flatMap((a) => a.keyDates || []);
  const tickerText = allDates.length > 0 ? allDates.join("  ·  ") : "";

  return (
    <div className="flex flex-col h-screen w-full bg-white overflow-hidden">

      {/* MAIN ROW */}
      <div className="flex flex-1 overflow-hidden">

        {/* LEFT COLUMN — activation type badge + mixer pairing */}
        <div
          className="flex-shrink-0 flex flex-col items-center justify-between py-6 border-r border-gray-100"
          style={{ width: "72px" }}
        >
          {/* Activation type circular badge */}
          {act1?.activationType && (
            <div
              className="w-14 h-14 rounded-full border-2 flex items-center justify-center text-center p-1"
              style={{ borderColor: "var(--accent)", color: "var(--accent)" }}
            >
              <span className="text-[7px] font-bold leading-tight uppercase">
                {act1.activationType}
              </span>
            </div>
          )}

          {/* Second badge if act2 has a different type */}
          {act2?.activationType && act2.activationType !== act1?.activationType && (
            <div
              className="w-14 h-14 rounded-full border-2 flex items-center justify-center text-center p-1"
              style={{ borderColor: "var(--accent)", color: "var(--accent)" }}
            >
              <span className="text-[7px] font-bold leading-tight uppercase">
                {act2.activationType}
              </span>
            </div>
          )}

          {/* Try with... mixer strip */}
          {act1?.mixerPairings?.[0] && (
            <div className="flex flex-col items-center gap-2">
              <span
                className="text-[8px] tracking-widest uppercase text-gray-400"
                style={{ writingMode: "vertical-rl", transform: "rotate(180deg)" }}
              >
                Try with...
              </span>
              <img
                src={act1.mixerPairings[0].imageUrl}
                alt={act1.mixerPairings[0].name}
                className="w-10 object-contain"
              />
            </div>
          )}
        </div>

        {/* ACTIVATION 1 */}
        {act1 && (
          <div className="flex-1 flex flex-col border-r border-gray-100 overflow-hidden">
            {/* Photo */}
            <div className="overflow-hidden" style={{ height: "65%" }}>
              <img
                src={act1.photo1?.url || act1.image?.url || ""}
                alt={act1.title}
                className="w-full h-full object-cover"
              />
            </div>
            {/* Content */}
            <div className="flex-1 px-6 py-4 overflow-hidden">
              <p className="text-[10px] tracking-widest uppercase text-gray-400 mb-1">
                Activation
              </p>
              <h3
                className="text-lg font-light mb-2 leading-tight"
                style={{ color: "var(--accent)" }}
              >
                {act1.title}
              </h3>
              <p className="text-xs text-gray-600 leading-relaxed mb-3 line-clamp-3">
                {act1.description}
              </p>
              {act1.keyDates?.length > 0 && (
                <div>
                  <p className="text-[10px] font-bold tracking-widest uppercase mb-1">
                    Key Dates
                  </p>
                  <p className="text-xs text-gray-700 leading-relaxed">
                    {act1.keyDates.join(" | ")}
                  </p>
                </div>
              )}
            </div>
          </div>
        )}

        {/* ACTIVATION 2 */}
        {act2 && (
          <div className="flex-1 flex flex-col overflow-hidden">
            <div className="overflow-hidden" style={{ height: "65%" }}>
              <img
                src={act2.photo1?.url || act2.image?.url || ""}
                alt={act2.title}
                className="w-full h-full object-cover"
              />
            </div>
            <div className="flex-1 px-6 py-4 overflow-hidden">
              <p className="text-[10px] tracking-widest uppercase text-gray-400 mb-1">
                Activation
              </p>
              <h3
                className="text-lg font-light mb-2 leading-tight"
                style={{ color: "var(--accent)" }}
              >
                {act2.title}
              </h3>
              <p className="text-xs text-gray-600 leading-relaxed mb-3 line-clamp-3">
                {act2.description}
              </p>
              {act2.keyDates?.length > 0 && (
                <div>
                  <p className="text-[10px] font-bold tracking-widest uppercase mb-1">
                    Key Dates
                  </p>
                  <p className="text-xs text-gray-700 leading-relaxed">
                    {act2.keyDates.join(" | ")}
                  </p>
                </div>
              )}
            </div>
          </div>
        )}
      </div>

      {/* SCROLLING TICKER — campaign dates */}
      {tickerText && (
        <div
          className="h-8 flex items-center overflow-hidden border-t border-gray-200"
          style={{ backgroundColor: "var(--muted)" }}
        >
          <div className="flex animate-marquee whitespace-nowrap">
            <span className="text-[10px] tracking-widest uppercase text-gray-500 px-8">
              · {tickerText} · {tickerText} ·
            </span>
          </div>
        </div>
      )}

      {/* back / next */}
      <div className="px-6 py-2 flex justify-between text-xs text-gray-400 tracking-widest uppercase border-t border-gray-100">
        <span>&lt;&lt; back</span>
        <span>next &gt;&gt;</span>
      </div>
    </div>
  );
}
