"use client";

import React from "react";
import Link from "next/link";
import { useBrands } from "@/hooks/useBrands";
import { getBrandImages } from "@/lib/brand-images";

export default function BeerPage() {
  const { brands, loading } = useBrands();
  const beer = brands.filter((b) => b.category === "Beer, Cider & Mixer");

  return (
    <div className="p-10 min-h-screen bg-white">
      <h1
        className="text-4xl font-light mb-1 tracking-tight"
        style={{ color: "var(--accent)" }}
      >
        Beer. Cider. Mixer.
      </h1>
      <p className="text-sm mb-10" style={{ color: "var(--muted-foreground)" }}>
        {beer.length} brands
      </p>

      {loading ? (
        <p className="text-sm" style={{ color: "var(--muted-foreground)" }}>Loading...</p>
      ) : (
        <div className="grid grid-cols-3 gap-8">
          {beer.map((b) => (
            <Link
              key={b.slug}
              href={`/brands/${b.slug}`}
              className="group block border border-gray-200 rounded-xl overflow-hidden hover:border-gray-400 transition-colors"
            >
              <div className="h-52 flex items-center justify-center p-6 border-b border-gray-100" style={{ background: "linear-gradient(to bottom, #ffffff, #f9f9f6)" }}>
                {(() => {
                  const local = getBrandImages(b.slug);
                  const src = local?.hero || local?.variants?.[0] || b.heroImage?.url || "";
                  return src ? (
                    <img src={src} alt={b.name}
                         className="object-contain transition-transform duration-500 group-hover:scale-105"
                         style={{
                           maxHeight: "170px",
                           maxWidth: "100%",
                           width: "auto",
                           height: "auto",
                           mixBlendMode: "multiply"
                         }} />
                  ) : null;
                })()}
              </div>
              <div className="p-5 border-t border-gray-100">
                <h2
                  className="text-lg font-medium mb-1"
                  style={{ color: "var(--accent)" }}
                >
                  {b.name}
                </h2>
                <p
                  className="text-xs leading-relaxed line-clamp-2"
                  style={{ color: "var(--muted-foreground)" }}
                >
                  {b.tagline}
                </p>
                {b.variants.length > 0 && (
                  <p
                    className="text-xs mt-3 tracking-widest uppercase font-semibold"
                    style={{ color: "var(--gold)" }}
                  >
                    {b.variants.length} SKUs
                  </p>
                )}
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
