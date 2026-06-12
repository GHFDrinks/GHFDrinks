"use client";

import React from "react";
import Link from "next/link";
import { STATIC_BRANDS } from "@/lib/static-brands";
import { getTastingNotesForBrand } from "@/data/tasting-notes";

export default function ServeInspirationPage() {
  const spirits = STATIC_BRANDS.filter(b => b.category?.toLowerCase() === "spirits");
  
  const allServes = spirits.flatMap(brand => {
    const notes = getTastingNotesForBrand(brand.slug);
    const serves = notes.flatMap(n => n.serves || []);
    return serves.map(s => ({ 
      ...s, 
      brandName: brand.name, 
      brandSlug: brand.slug,
      description: "A pristine serve crafted to showcase the premium qualities of the spirit."
    }));
  });

  return (
    <div className="min-h-screen py-16 px-6 md:px-14 bg-[var(--background)]">
      <div className="max-w-6xl mx-auto space-y-10">
        
        {/* Header & Back Link */}
        <div className="space-y-4">
          <Link
            href="/resources"
            className="text-xs tracking-widest uppercase text-[var(--sage)] hover:text-white transition-colors"
          >
            ← Back to resources
          </Link>
          <div>
            <h1 className="text-4xl font-light tracking-tight text-[var(--cream)]">
              Serve Inspiration
            </h1>
            <p className="text-sm text-[var(--sage)]">
              Explore signature serves and cocktails across all GHF spirits brands
            </p>
          </div>
        </div>

        {/* Serves Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {allServes.map((serve, idx) => (
            <div 
              key={idx} 
              className="border border-white/5 rounded-2xl p-6 bg-[var(--card)] flex flex-col justify-between h-full shadow-lg hover:border-[var(--sage)]/20 transition-all duration-300"
            >
              <div className="space-y-4">
                {/* Brand Tag Overlay */}
                <div className="flex justify-between items-center">
                  <span className="text-[9px] font-bold tracking-widest uppercase px-2.5 py-1 rounded bg-[var(--background)] border border-white/5 text-[var(--sage)]">
                    {serve.brandName}
                  </span>
                </div>

                <h3 className="text-base font-semibold text-[var(--cream)] tracking-wide pt-1">
                  {serve.name}
                </h3>
                
                <ul className="text-xs text-[var(--foreground)]/80 space-y-1.5 pt-2">
                  {serve.ingredients.map((ing, i) => (
                    <li key={i} className="flex items-start gap-2">
                      <span className="text-[var(--sage)]">•</span>
                      <span>{ing}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="pt-6 mt-6 border-t border-white/5 flex flex-col gap-4">
                <p className="text-xs text-[var(--sage)] italic leading-relaxed">
                  {serve.description}
                </p>
                <div className="flex justify-end">
                  <Link
                    href={`/brands/${serve.brandSlug}`}
                    className="text-[10px] tracking-widest uppercase font-bold text-[var(--sage)] hover:text-white transition-colors"
                  >
                    Brand Story →
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>

      </div>
    </div>
  );
}
