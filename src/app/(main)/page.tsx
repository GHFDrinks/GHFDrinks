"use client";

import React from "react";
import Link from "next/link";
import { useBrands } from "@/hooks/useBrands";
import { getBrandImages } from "@/lib/brand-images";
import { PRESENTATION_TEMPLATES } from "@/types/presentation";

export default function HomePage() {
  const { brands, loading } = useBrands();

  const spirits = brands.filter((b) => b.category === "Spirits");
  const wines = brands.filter((b) => b.category === "Wines");
  const beer = brands.filter((b) => b.category === "Beer, Cider & Mixer");

  const categories = [
    { label: "Spirits", brands: spirits },
    { label: "Wines", brands: wines },
    { label: "Beer. Cider. Mixer.", brands: beer },
  ];

  return (
    <div className="min-h-screen bg-[var(--background)]">
      {/* Header */}
      <div className="px-12 py-14 border-b border-[var(--border)]" style={{ backgroundColor: "var(--accent)" }}>
        <div className="w-16 h-16 rounded-full border-2 flex items-center justify-center mb-6"
             style={{ borderColor: "var(--gold)", color: "var(--gold)" }}>
          <span className="text-xs font-bold tracking-widest">GHF</span>
        </div>
        <h1 className="text-5xl font-light text-white mb-2 tracking-tight">Portfolio Presenter</h1>
        <p className="text-sm tracking-widest uppercase" style={{ color: "var(--gold)" }}>
          Building Iconic Drinks Brands
        </p>
      </div>

      <div className="px-12 py-10">
        {loading && brands.length === 0 ? (
          <p className="text-sm" style={{ color: "var(--muted-foreground)" }}>Loading portfolio...</p>
        ) : (
          <div className="space-y-12">
            {categories.map(({ label, brands: catBrands }) => (
              <div key={label}>
                <div className="flex items-center justify-between mb-5">
                  <h2 className="text-xl font-medium tracking-tight" style={{ color: "var(--accent)" }}>{label}</h2>
                </div>
                {catBrands.length === 0 ? (
                  <p className="text-sm" style={{ color: "var(--muted-foreground)" }}>Loading...</p>
                ) : (
                  <div className="flex gap-6 overflow-x-auto pb-2">
                    {catBrands.map((b) => {
                      const local = getBrandImages(b.slug);
                      const src = local?.hero || local?.variants?.[0] || b.heroImage?.url || "";
                      return (
                        <Link key={b.slug} href={`/brands/${b.slug}`}
                              className="flex-shrink-0 group" style={{ width: "140px" }}>
                          <div className="w-full h-44 rounded-xl flex items-end justify-center pb-3 mb-3 overflow-hidden"
                               style={{ backgroundColor: "var(--muted)" }}>
                            {src ? (
                              <img src={src} alt={b.name}
                                   className="object-contain group-hover:scale-105 transition-transform duration-300"
                                   style={{ maxHeight: "160px", maxWidth: "100px" }} />
                            ) : (
                              <div className="text-xs text-center px-2 leading-tight"
                                   style={{ color: "var(--muted-foreground)" }}>{b.name}</div>
                            )}
                          </div>
                          <p className="text-xs font-semibold text-center leading-tight" style={{ color: "var(--accent)" }}>{b.name}</p>
                          {b.bcorp && (
                            <p className="text-[9px] text-center mt-0.5 tracking-widest uppercase" style={{ color: "var(--gold)" }}>B Corp</p>
                          )}
                        </Link>
                      );
                    })}
                  </div>
                )}
              </div>
            ))}
          </div>
        )}

        {/* Packages strip */}
        <div className="mt-14 pt-10 border-t border-[var(--border)]">
          <div className="flex items-center justify-between mb-5">
            <h2 className="text-xl font-medium tracking-tight" style={{ color: "var(--accent)" }}>Packages</h2>
            <Link href="/packages" className="text-xs tracking-widest uppercase" style={{ color: "var(--muted-foreground)" }}>
              View all →
            </Link>
          </div>
          <div className="grid grid-cols-3 gap-4">
            {PRESENTATION_TEMPLATES.map((t) => (
              <Link key={t.id} href={`/packages/${t.id}`}
                    className="border border-[var(--border)] rounded-xl p-4 hover:border-[var(--gold)] transition-colors">
                <p className="text-sm font-medium mb-1" style={{ color: "var(--accent)" }}>{t.name}</p>
                <p className="text-xs leading-relaxed" style={{ color: "var(--muted-foreground)" }}>{t.description}</p>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
