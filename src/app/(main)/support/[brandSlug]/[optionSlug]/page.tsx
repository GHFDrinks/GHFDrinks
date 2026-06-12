"use client";

import React from "react";
import { useParams, useRouter } from "next/navigation";
import { getBrandSupportOptions } from "@/data/brand-support";
import { useBrands } from "@/hooks/useBrands";

export default function SupportOptionDetailPage() {
  const router = useRouter();
  const { brandSlug, optionSlug } = useParams<{ brandSlug: string; optionSlug: string }>();
  const { brands } = useBrands();

  const brand = brands.find((b) => b.slug === brandSlug);
  const options = getBrandSupportOptions(brandSlug);
  const option = options.find((o) => o.slug === optionSlug);

  if (!option) {
    return (
      <div className="min-h-screen bg-[var(--background)] p-12 flex flex-col items-center justify-center">
        <p className="text-[var(--cream)] mb-4">Support package option not found.</p>
        <button
          onClick={() => router.back()}
          className="px-5 py-2.5 rounded-full border border-[var(--sage)] bg-[var(--card)] text-[var(--cream)] hover:bg-[var(--sage)] hover:text-[var(--background)] transition-colors"
        >
          ← Back to presentation
        </button>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[var(--background)] p-12 text-[var(--cream)] flex flex-col justify-between max-w-4xl mx-auto">
      
      {/* Header back button */}
      <div className="flex items-center justify-between border-b border-[var(--border)] pb-6 mb-8">
        <button
          onClick={() => router.back()}
          className="flex items-center gap-2 text-xs font-bold tracking-widest uppercase text-[var(--sage)] hover:text-white transition-colors border border-[var(--sage)]/30 hover:border-[var(--sage)] px-4 py-2 rounded-full bg-[var(--card)]"
        >
          ← Back to presentation
        </button>
        {brand && (
          <span className="text-xs tracking-widest uppercase text-[var(--muted-foreground)]">
            {brand.name} Support
          </span>
        )}
      </div>

      {/* Main Content Card */}
      <div className="bg-[var(--card)] border border-[var(--border)] rounded-2xl p-8 shadow-2xl flex flex-col md:flex-row gap-8 items-center flex-1">
        
        {/* Left column: Text */}
        <div className="flex-1 space-y-6">
          <span className="text-[10px] tracking-[0.35em] uppercase text-[var(--sage)] font-bold">
            PROMOTION & SUPPORT PACKAGE
          </span>
          <h1 className="text-4xl font-light tracking-tight text-[var(--cream)]">
            {option.label}
          </h1>
          <p className="text-sm leading-relaxed text-[var(--muted-foreground)]">
            {option.description}
          </p>
          <div className="pt-4 border-t border-[var(--border)] space-y-2">
            <p className="text-xs font-bold uppercase tracking-wider text-[var(--sage)]">
              Availability
            </p>
            <p className="text-xs text-[var(--muted-foreground)]">
              Available immediately upon placement. Menu design, print coordination, and staff masterclasses included.
            </p>
          </div>
        </div>

        {/* Right column: Image */}
        {option.image ? (
          <div className="w-full md:w-80 aspect-[4/3] rounded-xl overflow-hidden border border-[var(--border)] shadow-xl relative bg-[#070b09]">
            <img
              src={option.image}
              alt={option.label}
              className="absolute inset-0 w-full h-full object-cover"
            />
          </div>
        ) : (
          <div className="w-full md:w-80 aspect-[4/3] rounded-xl border border-[var(--border)] bg-[var(--background)] flex flex-col items-center justify-center p-6 text-center text-[var(--muted-foreground)]">
            <svg className="w-12 h-12 text-[var(--sage)]/30 mb-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
            <span className="text-xs">Visual assets supplied upon campaign booking.</span>
          </div>
        )}
      </div>

      {/* Footer copyright */}
      <div className="text-center text-[9px] tracking-widest text-[var(--muted-foreground)] uppercase mt-12 border-t border-[var(--border)] pt-4">
        GHF Drinks Portfolio © 2026
      </div>
    </div>
  );
}
