"use client";

import React from "react";
import { useParams, useRouter } from "next/navigation";
import { STATIC_BRANDS } from "@/lib/static-brands";
import { POS_LIBRARY } from "@/data/pos-library";
import { Download } from "lucide-react";

export default function BrandPosLibraryPage() {
  const params = useParams();
  const router = useRouter();
  const brandSlug = params.brandSlug as string;

  const brand = STATIC_BRANDS.find((b) => b.slug === brandSlug);

  if (!brand) {
    return (
      <div className="min-h-screen px-12 py-10" style={{ backgroundColor: "var(--background)" }}>
        <h1 className="text-2xl font-light text-[var(--foreground)]">Brand not found</h1>
        <button
          onClick={() => router.push("/resources/pos")}
          className="text-xs uppercase tracking-widest text-[var(--sage)] hover:underline mt-4 cursor-pointer"
        >
          ← Back to POS Library
        </button>
      </div>
    );
  }

  // Filter and cap at 15 items total
  const posItems = POS_LIBRARY.filter((item) => item.brandSlug === brandSlug).slice(0, 15);

  return (
    <div className="min-h-screen px-12 py-10 flex flex-col justify-between" style={{ backgroundColor: "var(--background)" }}>
      <div className="space-y-8">
        {/* Header */}
        <div className="flex items-center justify-between border-b border-[var(--border)] pb-6">
          <button
            onClick={() => router.push("/resources/pos")}
            className="flex items-center gap-2 text-xs font-bold tracking-widest uppercase text-[var(--sage)] hover:text-[var(--foreground)] transition-colors border border-[var(--sage)]/30 hover:border-[var(--sage)] px-4 py-2 rounded-full bg-[var(--card)] cursor-pointer"
          >
            ← Back to brand list
          </button>
          <div className="text-right">
            <span className="text-[10px] tracking-[0.35em] uppercase text-[var(--sage)] font-bold block mb-1">
              {brand.name} Collateral
            </span>
            <h1 className="text-2xl font-light text-[var(--foreground)]">POS Library</h1>
          </div>
        </div>

        {/* POS Grid list */}
        {posItems.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {posItems.map((item) => (
              <div
                key={item.id}
                className="bg-[var(--card)] border border-[var(--border)] rounded-xl overflow-hidden shadow-lg hover:border-[var(--sage)]/50 transition-all duration-300 flex flex-col justify-between h-full group"
              >
                <div>
                  {/* Image with overlay title */}
                  <div className="aspect-[16/10] overflow-hidden relative bg-[var(--muted)] border-b border-[var(--border)]/20">
                    <img
                      src={item.image}
                      alt={item.title}
                      className="absolute inset-0 w-full h-full object-cover transition-transform duration-75 group-hover:scale-[1.01]"
                    />
                    <div className="absolute inset-0 bg-black/45" />

                    <div className="absolute bottom-4 left-4 right-4">
                      <h3 className="text-base font-light text-[var(--pearl)] tracking-wide leading-tight">
                        {item.title}
                      </h3>
                    </div>
                  </div>

                  <div className="p-6">
                    {item.description && (
                      <p className="text-xs text-[var(--muted-foreground)] leading-relaxed">
                        {item.description}
                      </p>
                    )}
                  </div>
                </div>

                {/* Footer action */}
                <div className="p-6 pt-0 flex justify-between items-center border-t border-[var(--border)]/40 mt-4">
                  <span className="text-[9px] uppercase tracking-wider text-[var(--muted-foreground)]">
                    POS PDF / Asset package
                  </span>
                  {item.downloadUrl && (
                    <a
                      href={item.downloadUrl}
                      onClick={(e) => {
                        e.stopPropagation();
                        alert("Starting resource download mock...");
                      }}
                      className="flex items-center gap-1.5 px-3.5 py-2 rounded-lg bg-[var(--foreground)] text-[var(--background)] hover:opacity-95 text-[10px] font-bold uppercase tracking-wider transition-opacity"
                    >
                      <Download className="w-3.5 h-3.5" />
                      Download
                    </a>
                  )}
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="py-20 text-center border border-dashed border-[var(--border)] rounded-xl bg-[var(--card)]/20">
            <p className="text-sm text-[var(--muted-foreground)] leading-relaxed">
              No point-of-sale catalog items registered for {brand.name} yet.
            </p>
            <p className="text-xs text-[var(--sage)] mt-1">
              Collateral packs and menu print mockups can be added in the Back Office dashboard.
            </p>
          </div>
        )}
      </div>

      {/* Footer copyright */}
      <div className="text-[9px] tracking-wider text-[var(--muted-foreground)]/65 mt-16 text-center uppercase border-t border-[var(--border)]/50 pt-4">
        * Brand POS materials can be requested via marketing coordinator.
      </div>
    </div>
  );
}
