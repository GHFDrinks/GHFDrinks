"use client";

import React, { useState, useRef, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import { STATIC_BRANDS } from "@/lib/static-brands";
import { BRAND_INSIGHTS, BrandInsightStat } from "@/data/brand-insights";

export default function BrandInsightsDetailPage() {
  const params = useParams();
  const router = useRouter();
  const brandSlug = params.brandSlug as string;

  const brand = STATIC_BRANDS.find((b) => b.slug === brandSlug);
  const insights = BRAND_INSIGHTS.find((i) => i.brandSlug === brandSlug);

  const [expandedIndex, setExpandedIndex] = useState<number | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  // Click outside to collapse
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setExpandedIndex(null);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  if (!brand) {
    return (
      <div className="min-h-screen px-12 py-10" style={{ backgroundColor: "var(--background)" }}>
        <h1 className="text-2xl font-light text-[var(--foreground)]">Brand not found</h1>
        <button
          onClick={() => router.push("/insights")}
          className="text-sm underline mt-4 block text-[var(--sage)] cursor-pointer"
        >
          ← Back to Insights
        </button>
      </div>
    );
  }

  // Fallback to standard placeholder stats if not defined
  const statsList: BrandInsightStat[] = insights?.stats || [
    {
      headline: "42%",
      caption: "YoY growth",
      detail: "Placeholder detail copy. Back-office will populate with real insights.",
      image: brand.heroImage.url,
    },
    {
      headline: "150+",
      caption: "Stockists",
      detail: "Placeholder detail copy. Back-office will populate with real insights.",
      image: brand.lifestyleImages[0]?.url || brand.heroImage.url,
    },
    {
      headline: "5.0",
      caption: "Customer rating",
      detail: "Placeholder detail copy. Back-office will populate with real insights.",
      image: brand.lifestyleImages[1]?.url || brand.heroImage.url,
    },
  ];

  const handleTileClick = (idx: number) => {
    if (expandedIndex === idx) {
      setExpandedIndex(null);
    } else {
      setExpandedIndex(idx);
    }
  };

  return (
    <div className="min-h-screen px-12 py-10 flex flex-col justify-between" style={{ backgroundColor: "var(--background)" }}>
      <div className="space-y-10">
        {/* Top Header */}
        <div className="flex items-center justify-between border-b border-[var(--border)] pb-6">
          <button
            onClick={() => router.push("/insights")}
            className="flex items-center gap-2 text-xs font-bold tracking-widest uppercase text-[var(--sage)] hover:text-[var(--foreground)] transition-colors border border-[var(--sage)]/30 hover:border-[var(--sage)] px-4 py-2 rounded-full bg-[var(--card)] cursor-pointer"
          >
            ← Back to insights
          </button>
          <div className="text-right">
            <span className="text-[10px] tracking-[0.35em] uppercase text-[var(--sage)] font-bold block mb-1">
              {brand.category} Insights
            </span>
            <h1 className="text-2xl font-light text-[var(--foreground)]">{brand.name}</h1>
          </div>
        </div>

        {/* 3-Stat Tile Grid */}
        <div ref={containerRef} className="grid grid-cols-1 md:grid-cols-3 gap-6 items-start">
          {statsList.map((stat, idx) => {
            const isExpanded = expandedIndex === idx;
            const isDimmed = expandedIndex !== null && !isExpanded;

            return (
              <div
                key={idx}
                onClick={() => handleTileClick(idx)}
                className={`bg-[var(--card)] border border-[var(--border)] rounded-xl overflow-hidden shadow-xl transition-all duration-300 cursor-pointer ${
                  isDimmed ? "opacity-45 scale-[0.98] blur-[0.5px]" : "opacity-100 scale-100"
                } ${isExpanded ? "border-[var(--sage)] ring-1 ring-[var(--sage)]/40" : "hover:border-[var(--sage)]/40"}`}
              >
                {/* Top Half: Image */}
                <div className="aspect-[16/9] overflow-hidden relative bg-[var(--muted)]">
                  {stat.image ? (
                    <img
                      src={stat.image}
                      alt=""
                      className="absolute inset-0 w-full h-full object-cover"
                    />
                  ) : (
                    <div className="w-full h-full bg-gradient-to-br from-[var(--muted)] to-[var(--background)]" />
                  )}
                </div>

                {/* Bottom Half: Headline + Caption */}
                <div className="p-6 space-y-4">
                  <div className="space-y-1">
                    <p className="text-5xl font-light text-[var(--foreground)] tracking-tight">
                      {stat.headline}
                    </p>
                    <p className="text-xs uppercase tracking-widest text-[var(--sage)] font-bold">
                      {stat.caption}
                    </p>
                  </div>

                  {/* Expandable detailed copy */}
                  <div
                    className={`overflow-hidden transition-all duration-300 ease-in-out`}
                    style={{
                      maxHeight: isExpanded ? "160px" : "0px",
                      opacity: isExpanded ? 1 : 0,
                      marginTop: isExpanded ? "1rem" : "0px",
                    }}
                  >
                    <p className="text-xs text-[var(--foreground)]/90 leading-relaxed border-t border-[var(--border)]/60 pt-3">
                      {stat.detail}
                    </p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Footer copyright */}
      <div className="text-[9px] tracking-wider text-[var(--muted-foreground)]/65 mt-16 text-center uppercase border-t border-[var(--border)]/50 pt-4">
        * Market statistics are based on 2025/2026 sales logs. Full live updates will sync in Batch L.
      </div>
    </div>
  );
}
