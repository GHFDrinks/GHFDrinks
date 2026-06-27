"use client";

import React from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { BrandTileGrid } from "@/components/shared/BrandTileGrid";

export default function InsightsPage() {
  const router = useRouter();

  return (
    <div className="min-h-screen px-12 py-10" style={{ backgroundColor: "var(--background)" }}>
      {/* Top Header */}
      <div className="flex items-center justify-between mb-10 border-b border-[var(--border)] pb-6">
        <div>
          <span className="text-[10px] tracking-[0.35em] uppercase text-[var(--sage)] font-bold block mb-1">
            Sell-in Support
          </span>
          <h1 className="text-4xl font-light tracking-tight text-[var(--foreground)]">
            Category Insights
          </h1>
          <p className="text-xs text-[var(--muted-foreground)] mt-1 leading-relaxed">
            Portfolio statistics and market dynamics to back your sell-in story
          </p>
        </div>
        <button
          onClick={() => router.push("/")}
          className="text-xs tracking-widest uppercase text-[var(--muted-foreground)] hover:text-[var(--foreground)] transition-colors cursor-pointer font-bold"
        >
          ← Home
        </button>
      </div>

      {/* Grid of Brand Tiles using shared component */}
      <BrandTileGrid basePath="/insights" />

      {/* Footer copyright */}
      <div className="text-[9px] tracking-wider text-[var(--muted-foreground)]/65 mt-16 text-center uppercase border-t border-[var(--border)]/50 pt-4">
        GHF Drinks Portfolio © 2026
      </div>
    </div>
  );
}
