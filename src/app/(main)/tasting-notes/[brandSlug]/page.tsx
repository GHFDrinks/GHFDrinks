"use client";

import React from "react";
import Link from "next/link";
import { useParams } from "next/navigation";
import { useBrands } from "@/hooks/useBrands";
import { getBrandImages } from "@/lib/brand-images";
import { TASTING_NOTES } from "@/data/tasting-notes";

function slugify(text: string) {
  return text
    .toString()
    .toLowerCase()
    .trim()
    .replace(/\s+/g, "-")
    .replace(/[^\w\-]+/g, "")
    .replace(/\-\-+/g, "-")
    .replace(/^-+/, "")
    .replace(/-+$/, "");
}

export default function BrandVariantsPage() {
  const params = useParams();
  const brandSlug = params.brandSlug as string;

  const { brands } = useBrands();
  const brand = brands.find((b) => b.slug === brandSlug);
  const images = getBrandImages(brandSlug);

  const notes = TASTING_NOTES.filter((t) => t.brandSlug === brandSlug);

  if (!brand) {
    return (
      <div className="min-h-screen px-12 py-10" style={{ backgroundColor: "var(--background)" }}>
        <h1 className="text-2xl font-light text-[var(--foreground)]">Brand not found</h1>
        <Link href="/tasting-notes" className="text-sm underline mt-4 block text-[var(--sage)]">
          ← Back to Tasting Notes
        </Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen px-12 py-10" style={{ backgroundColor: "var(--background)" }}>
      {/* Back button */}
      <Link
        href="/tasting-notes"
        className="text-xs tracking-widest uppercase mb-6 inline-block text-[var(--muted-foreground)] hover:text-[var(--foreground)] transition-colors"
      >
        ← All Brands
      </Link>

      {/* Header — logo centred at the top, heading below */}
      <div className="mb-10">
        {images?.logo && (
          <img
            src={images.logo}
            alt={brand.name}
            className="max-h-16 max-w-[180px] object-contain mx-auto mb-6"
          />
        )}
        <div>
          <h1 className="text-5xl font-light tracking-tight mb-2" style={{ color: "var(--foreground)" }}>
            {brand.name}
          </h1>
          <p className="text-sm" style={{ color: "var(--muted-foreground)" }}>
            Select a variant to view detailed tasting profiles and product features
          </p>
        </div>
      </div>

      {/* Grid of variant tiles */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 max-w-5xl">
        {notes.map((note, idx) => {
          const bgImage = images?.lifestyle?.[idx % (images?.lifestyle?.length || 1)] || images?.hero || "";
          const variantSlug = slugify(note.variant);

          return (
            <Link
              key={note.variant}
              href={`/tasting-notes/${brandSlug}/${variantSlug}`}
              className="group relative overflow-hidden rounded-lg border flex items-center justify-center text-center transition-all hover:border-[var(--sage)] hover:scale-[1.02]"
              style={{
                borderColor: "var(--border)",
                minHeight: "140px",
              }}
            >
              {/* Background Image */}
              {bgImage && (
                <img
                  src={bgImage}
                  alt=""
                  className="absolute inset-0 w-full h-full object-cover brightness-[0.4] group-hover:brightness-[0.5] transition-all duration-300"
                />
              )}

              {/* Variant Name Overlay */}
              <span className="relative z-10 text-xl font-light text-white tracking-wider px-4">
                {note.variant}
              </span>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
