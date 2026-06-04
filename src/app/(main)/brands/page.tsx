"use client";

import React from "react";
import Link from "next/link";
import { useBrands } from "@/hooks/useBrands";
import { getBrandImages } from "@/lib/brand-images";

export default function BrandsPage() {
  const { brands, loading } = useBrands();

  return (
    <div className="p-10 min-h-screen bg-white">
      <h1
        className="text-4xl font-light mb-1 tracking-tight"
        style={{ color: "var(--accent)" }}
      >
        All Brands
      </h1>
      <p className="text-sm mb-10" style={{ color: "var(--muted-foreground)" }}>
        {brands.length} brands across the GHF portfolio
      </p>

      {loading ? (
        <p className="text-sm" style={{ color: "var(--muted-foreground)" }}>Loading...</p>
      ) : (
        <div className="grid grid-cols-3 gap-8">
          {brands.map((b) => {
            const local = getBrandImages(b.slug);
            const heroSrc = local?.hero || local?.variants?.[0] || b.heroImage?.url || "";
            return (
              <Link
                key={b.slug}
                href={`/brands/${b.slug}`}
                className="group block border border-gray-200 rounded-xl overflow-hidden hover:border-gray-400 transition-colors"
              >
                <div
                  className="h-52 flex items-end justify-center pb-4"
                  style={{ backgroundColor: "var(--muted)" }}
                >
                  {heroSrc && (
                    <img
                      src={heroSrc}
                      alt={b.name}
                      className="object-contain group-hover:scale-105 transition-transform duration-300"
                      style={{ maxHeight: "180px" }}
                    />
                  )}
                </div>
                <div className="p-5 border-t border-gray-100">
                  <p
                    className="text-xs tracking-widest uppercase mb-1"
                    style={{ color: "var(--muted-foreground)" }}
                  >
                    {b.category}
                  </p>
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
                  <div className="flex items-center gap-3 mt-3">
                    {b.variants.length > 0 && (
                      <p
                        className="text-xs tracking-widest uppercase font-semibold"
                        style={{ color: "var(--gold)" }}
                      >
                        {b.variants.length} SKUs
                      </p>
                    )}
                    {b.bcorp && (
                      <p
                        className="text-xs tracking-widest uppercase border rounded px-1.5 py-0.5"
                        style={{ borderColor: "var(--gold)", color: "var(--gold)" }}
                      >
                        B Corp
                      </p>
                    )}
                  </div>
                </div>
              </Link>
            );
          })}
        </div>
      )}
    </div>
  );
}
