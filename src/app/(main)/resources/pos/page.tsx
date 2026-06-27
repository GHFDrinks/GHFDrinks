"use client";

import React from "react";
import { useRouter } from "next/navigation";
import { BrandTileGrid } from "@/components/shared/BrandTileGrid";

export default function PosLibraryPage() {
  const router = useRouter();

  return (
    <div className="min-h-screen px-12 py-10" style={{ backgroundColor: "var(--background)" }}>
      {/* Header */}
      <div className="flex items-center justify-between mb-10 border-b border-[var(--border)] pb-6">
        <div>
          <span className="text-[10px] tracking-[0.35em] uppercase text-[var(--sage)] font-bold block mb-1">
            Resources Hub
          </span>
          <h1 className="text-4xl font-light tracking-tight text-[var(--foreground)]">
            POS Library
          </h1>
          <p className="text-xs text-[var(--muted-foreground)] mt-1">
            Select a brand to view and download point-of-sale materials, printed menu cards, and venue kits
          </p>
        </div>
        <button
          onClick={() => router.push("/resources")}
          className="text-xs tracking-widest uppercase text-[var(--muted-foreground)] hover:text-[var(--foreground)] transition-colors cursor-pointer font-bold"
        >
          ← Resources
        </button>
      </div>

      {/* Brand Grid */}
      <BrandTileGrid basePath="/resources/pos" />
    </div>
  );
}
