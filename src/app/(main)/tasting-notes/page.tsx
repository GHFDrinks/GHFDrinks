"use client";

import React from "react";
import Link from "next/link";
import { useBrands } from "@/hooks/useBrands";
import { getBrandImages } from "@/lib/brand-images";
import { TASTING_NOTES } from "@/data/tasting-notes";
import { BrandTileGrid } from "@/components/shared/BrandTileGrid";

const BRAND_ORDER = [
  "sapling", "fielden", "dropworks", "desdeya", "pensador", "everleaf",
  "mirabeau", "craggy-range", "coates-and-seely", "quinta-da-romaneira",
  "dreamsake", "wild-idol", "noam", "cote-citron", "wignac", "big-drop",
];

export default function TastingNotesPage() {
  const { brands } = useBrands();

  const brandSlugsWithNotes = BRAND_ORDER.filter((s) =>
    TASTING_NOTES.some((t) => t.brandSlug === s)
  );

  return (
    <div className="min-h-screen px-12 py-10" style={{ backgroundColor: "var(--background)" }}>
      {/* Title + Subtitle at top */}
      <div className="mb-10">
        <h1 className="text-5xl font-light tracking-tight mb-2" style={{ color: "var(--foreground)" }}>
          Tasting Notes
        </h1>
        <p className="text-sm animate-fade-in" style={{ color: "var(--muted-foreground)" }}>
          Select a brand to explore flavour profiles across the portfolio
        </p>
      </div>

      {/* Grid of brand tiles using shared component */}
      <div className="max-w-5xl">
        <BrandTileGrid
          basePath="/tasting-notes"
          filter={(brand) => brandSlugsWithNotes.includes(brand.slug)}
        />
      </div>
    </div>
  );
}
