"use client";

import React from "react";
import Link from "next/link";
import { useBrands } from "@/hooks/useBrands";
import { getCuratedBrandAssets } from "@/lib/brand-images";

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
          {beer.map((b) => {
            const curated = getCuratedBrandAssets(b.slug);
            const bottleShot = curated.bottleShots[0];
            const hasRealBottle = bottleShot && !['dropworks'].includes(b.slug);
            const coverPhoto = curated.lifestyle[0] || curated.hero || b.heroImage?.url || "";

            return (
              <Link
                key={b.slug}
                href={`/brands/${b.slug}`}
                className="group block border border-gray-200 rounded-xl overflow-hidden hover:border-gray-400 transition-colors bg-white shadow-sm hover:shadow-md"
              >
                <div
                  className="h-52 relative flex items-center justify-center p-6 border-b border-gray-100 overflow-hidden"
                  style={{ background: "linear-gradient(to bottom, #ffffff, #f9f9f6)" }}
                >
                  {hasRealBottle ? (
                    <>
                      {/* Blurred beautiful lifestyle background */}
                      {coverPhoto && (
                        <img
                          src={coverPhoto}
                          alt=""
                          className="absolute inset-0 w-full h-full object-cover opacity-15 filter blur-[2px] transition-opacity duration-300 group-hover:opacity-20"
                        />
                      )}
                      {/* Clean floating bottle shot */}
                      <img
                        src={bottleShot}
                        alt={b.name}
                        className="relative z-10 object-contain transition-transform duration-500 group-hover:scale-105"
                        style={{
                          maxHeight: "170px",
                          maxWidth: "100%",
                          width: "auto",
                          height: "auto",
                          mixBlendMode: "multiply",
                          filter: "drop-shadow(0 12px 10px rgba(0,0,0,0.06))"
                        }}
                      />
                    </>
                  ) : (
                    /* Elegant full cover lifestyle photo for brands without standalone bottles */
                    coverPhoto && (
                      <>
                        <img
                          src={coverPhoto}
                          alt={b.name}
                          className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                        />
                        <div className="absolute inset-0 bg-black/5" />
                      </>
                    )
                  )}
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
            );
          })}
        </div>
      )}
    </div>
  );
}
