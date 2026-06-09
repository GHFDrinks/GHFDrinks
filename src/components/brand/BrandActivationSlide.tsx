"use client";

import React from "react";
import { Brand } from "@/types/brand";
import { getBrandImages } from "@/lib/brand-images";

export function BrandActivationSlide({ brand }: { brand: Brand }) {
  if (!brand.activations || brand.activations.length === 0) return null;

  const local = getBrandImages(brand.slug);
  const act1 = brand.activations[0];
  const act2 = brand.activations[1];

  const act1Photo =
    local?.activations?.[0] || act1.photo1?.url || act1.image?.url || "";
  const act2Photo =
    local?.activations?.[1] || act2?.photo1?.url || act2?.image?.url || "";

  const allDates = brand.activations.flatMap((a) => a.keyDates || []);
  const tickerText = allDates.length > 0 ? allDates.join("    ·    ") : "";

  return (
    <section className="w-full h-screen flex flex-col overflow-hidden bg-[var(--background)]">

      {/* MAIN ROW */}
      <div className="flex flex-1 min-h-0 overflow-hidden">

        {/* LEFT COLUMN — activation type badge + mixer strip, fixed 90px */}
        <div
          className="h-full flex-shrink-0 flex flex-col items-center justify-between py-10 border-r border-[var(--border)]"
          style={{ width: "90px" }}
        >
          {act1?.activationType ? (
            <div
              className="w-16 h-16 rounded-full border-2 flex items-center justify-center text-center p-1"
              style={{ borderColor: "var(--accent)", color: "var(--accent)" }}
            >
              <span className="text-[8px] font-bold leading-tight uppercase">
                {act1.activationType}
              </span>
            </div>
          ) : (
            <div />
          )}

          {act1?.mixerPairings && act1.mixerPairings[0] ? (
            <div className="flex flex-col items-center gap-3">
              <span
                className="text-[9px] tracking-widest uppercase text-[var(--muted-foreground)]"
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
          ) : (
            <div />
          )}
        </div>

        {/* ACTIVATION COLUMNS */}
        {[act1, act2].map((act, idx) => {
          if (!act) return null;
          const photo = idx === 0 ? act1Photo : act2Photo;
          return (
            <div
              key={act.id}
              className={
                "flex-1 min-w-0 h-full flex flex-col" +
                (idx === 0 ? " border-r border-[var(--border)]" : "")
              }
            >
              {/* Photo — fills top 62% */}
              <div className="overflow-hidden" style={{ height: "62%" }}>
                {photo ? (
                  <img
                    src={photo}
                    alt={act.title}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div
                    className="w-full h-full"
                    style={{ backgroundColor: "var(--muted)" }}
                  />
                )}
              </div>

              {/* Text */}
              <div className="flex-1 min-h-0 px-8 py-6 overflow-hidden">
                <p className="text-[11px] tracking-[0.2em] uppercase text-[var(--muted-foreground)] mb-2">
                  Activation
                </p>
                <h3
                  className="text-2xl font-light mb-3 leading-tight"
                  style={{ color: "var(--accent)" }}
                >
                  {act.title}
                </h3>
                <p className="text-sm text-[var(--foreground)]/80 leading-relaxed mb-4">
                  {act.description}
                </p>
                {act.keyDates && act.keyDates.length > 0 && (
                  <div>
                    <p className="text-[11px] font-bold tracking-[0.2em] uppercase mb-1">
                      Key Dates
                    </p>
                    <p className="text-sm text-[var(--foreground)]/80 leading-relaxed">
                      {act.keyDates.join(" | ")}
                    </p>
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>

      {/* SCROLLING TICKER */}
      {tickerText && (
        <div
          className="h-9 flex-shrink-0 flex items-center overflow-hidden border-t border-[var(--border)]"
          style={{ backgroundColor: "var(--muted)" }}
        >
          <div className="flex animate-marquee whitespace-nowrap">
            <span className="text-[11px] tracking-[0.2em] uppercase text-gray-500 px-10">
              · {tickerText} · {tickerText} ·
            </span>
          </div>
        </div>
      )}
    </section>
  );
}
