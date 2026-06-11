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

  const hasTwo = !!act2;

  return (
    <section className="w-full h-screen flex flex-col overflow-hidden bg-[var(--background)] p-12 justify-between">
      
      {/* Top Editorial Header */}
      <div className="flex items-center justify-between border-b border-[var(--border)] pb-4 flex-shrink-0">
        <div className="flex items-center gap-4">
          <span className="w-2.5 h-2.5 rounded-full bg-[var(--gold)] animate-pulse" />
          <span className="text-[10px] tracking-[0.35em] uppercase text-[var(--gold)] font-bold">
            Activations & Campaigns
          </span>
        </div>
        <div className="flex items-center gap-3">
          <span className="text-xs tracking-[0.2em] uppercase text-[var(--muted-foreground)]">
            {brand.name}
          </span>
          <a
            href={`/brands/${brand.slug}`}
            target="_blank"
            rel="noopener noreferrer"
            className="text-[9px] font-bold tracking-widest uppercase text-[var(--gold)] hover:text-white transition-colors border border-[var(--gold)]/30 hover:border-[var(--gold)] px-2.5 py-1 rounded bg-[var(--card)]"
          >
            Story ↗
          </a>
        </div>
      </div>

      {/* Main Activation Area */}
      <div className="flex-1 my-auto flex items-center justify-center py-6">
        <div className={`grid ${hasTwo ? "grid-cols-2 gap-8" : "grid-cols-1 max-w-2xl"} w-full h-full max-h-[70vh]`}>
          {[act1, act2].map((act, idx) => {
            if (!act) return null;
            const photo = idx === 0 ? act1Photo : act2Photo;
            
            return (
              <div
                key={act.id}
                className="flex flex-col bg-[var(--card)] border border-[var(--border)] rounded-2xl overflow-hidden shadow-2xl transition-all duration-300 hover:border-[var(--gold)]/30 group"
              >
                {/* Photo container with fixed ratio & border bottom */}
                <div className="relative aspect-[16/9] w-full overflow-hidden border-b border-[var(--border)] flex-shrink-0 bg-[#070b09] flex items-center justify-center">
                  {photo ? (
                    <>
                      {/* Blurred background image to fill the 16/9 space */}
                      <img
                        src={photo}
                        alt=""
                        className="absolute inset-0 w-full h-full object-cover blur-lg opacity-25 scale-110 pointer-events-none"
                      />
                      {/* Crisp foreground image contained cleanly */}
                      <img
                        src={photo}
                        alt={act.title}
                        className="relative z-10 h-full w-auto object-contain transition-transform duration-700 ease-out group-hover:scale-105"
                      />
                    </>
                  ) : (
                    <div className="w-full h-full bg-gradient-to-br from-[#13201b] to-[#0b1310]" />
                  )}
                  
                  {/* Category overlay badge */}
                  <div className="absolute top-4 left-4 bg-[var(--background)]/90 backdrop-blur px-3 py-1 rounded-full border border-[var(--border)]">
                    <span className="text-[9px] font-bold tracking-widest uppercase text-[var(--gold)]">
                      {act.activationType || "Campaign"}
                    </span>
                  </div>

                  {/* Mixer Pairing overlay */}
                  {act.mixerPairings && act.mixerPairings[0] && (
                    <div className="absolute bottom-4 right-4 bg-[var(--background)]/90 backdrop-blur px-3 py-1.5 rounded-xl border border-[var(--border)] flex items-center gap-2">
                      <span className="text-[9px] tracking-wider uppercase text-[var(--muted-foreground)]">
                        Serve with:
                      </span>
                      <img
                        src={act.mixerPairings[0].imageUrl}
                        alt={act.mixerPairings[0].name}
                        className="w-5 h-5 object-contain"
                      />
                    </div>
                  )}
                </div>

                {/* Content Body */}
                <div className="flex-1 p-6 flex flex-col justify-between min-h-0 overflow-y-auto scrollbar-hide">
                  <div className="space-y-3">
                    <h3 className="text-xl font-light tracking-wide text-[var(--foreground)] group-hover:text-[var(--gold)] transition-colors">
                      {act.title}
                    </h3>
                    <p className="text-xs text-[var(--muted-foreground)] leading-relaxed">
                      {act.description}
                    </p>
                  </div>

                  {act.keyDates && act.keyDates.length > 0 && (
                    <div className="pt-4 border-t border-[var(--border)] mt-4">
                      <p className="text-[9px] font-bold tracking-[0.2em] uppercase text-[var(--muted-foreground)] mb-2">
                        Key Activation Windows
                      </p>
                      <div className="flex flex-wrap gap-1.5">
                        {act.keyDates.map((date, i) => (
                          <span
                            key={i}
                            className="text-[9px] px-2.5 py-1 rounded bg-[var(--background)] border border-[var(--border)] text-[var(--foreground)]/80 font-medium"
                          >
                            {date}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Bottom Ticker */}
      {tickerText ? (
        <div
          className="h-8 flex-shrink-0 flex items-center overflow-hidden border-t border-[var(--border)] mt-4 bg-[var(--card)] rounded-lg"
        >
          <div className="flex animate-marquee whitespace-nowrap">
            <span className="text-[10px] tracking-[0.3em] uppercase text-[var(--muted-foreground)] px-10">
              · {tickerText} · {tickerText} · {tickerText} ·
            </span>
          </div>
        </div>
      ) : (
        <div className="h-4" />
      )}
    </section>
  );
}
