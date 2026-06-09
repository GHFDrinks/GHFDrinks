"use client";

import React from "react";
import Link from "next/link";
import { useBrands } from "@/hooks/useBrands";
import { PRESENTATION_TEMPLATES } from "@/types/presentation";
import { getBrandImages } from "@/lib/brand-images";

export default function PackagesPage() {
  const { brands, loading } = useBrands();

  return (
    <div className="p-10 min-h-screen bg-[var(--background)]">
      <h1
        className="text-4xl font-light mb-1 tracking-tight"
        style={{ color: "var(--accent)" }}
      >
        Packages
      </h1>
      <p className="text-sm mb-10 tracking-wide" style={{ color: "var(--muted-foreground)" }}>
        Pre-curated presentations for trade customers
      </p>

      <div className="grid grid-cols-3 gap-8">
        {PRESENTATION_TEMPLATES.map((template) => {
          const templateBrands = brands.filter((b) =>
            template.brandSlugs.includes(b.slug)
          );

          return (
            <Link
              key={template.id}
              href={`/packages/${template.id}`}
              className="group block rounded-xl overflow-hidden border border-[var(--border)] hover:border-[var(--gold)] transition-colors bg-[var(--background)]"
            >
              {/* Bottle grid */}
              <div
                className="h-52 flex items-center justify-center gap-2 p-6 overflow-hidden border-b border-[var(--border)]"
                style={{ background: "linear-gradient(to bottom, #ffffff, #f9f9f6)" }}
              >
                {loading ? (
                  <div className="text-xs text-[var(--muted-foreground)]">Loading...</div>
                ) : templateBrands.length > 0 ? (
                  templateBrands.slice(0, 5).map((b) => {
                    const imgUrl = (() => {
                      const local = getBrandImages(b.slug);
                      return local?.variants?.[0] || local?.hero || b.heroImage?.url || "";
                    })();
                    return imgUrl ? (
                      <img
                        key={b.slug}
                        src={imgUrl}
                        alt={b.name}
                        className="object-contain transition-transform duration-500 group-hover:scale-105"
                        style={{
                          maxHeight: "150px",
                          maxWidth: "60px",
                          width: "auto",
                          height: "auto",
                          mixBlendMode: "multiply"
                        }}
                      />
                    ) : (
                      <div
                        key={b.slug}
                        className="flex items-center justify-center"
                        style={{ height: "150px", width: "50px" }}
                      >
                        <span className="text-[10px] text-center text-[var(--muted-foreground)] leading-tight">
                          {b.name}
                        </span>
                      </div>
                    );
                  })
                ) : (
                  <div className="text-xs text-[var(--muted-foreground)]">No brands yet</div>
                )}
              </div>

              {/* Package info */}
              <div className="p-5 border-t border-[var(--border)]">
                <h2
                  className="text-lg font-medium mb-1"
                  style={{ color: "var(--accent)" }}
                >
                  {template.name}
                </h2>
                <p className="text-xs leading-relaxed" style={{ color: "var(--muted-foreground)" }}>
                  {template.description}
                </p>
                <div className="mt-3 flex items-center justify-between">
                  <span
                    className="text-xs tracking-widest uppercase font-semibold"
                    style={{ color: "var(--gold)" }}
                  >
                    {templateBrands.length} brands
                  </span>
                  <span
                    className="text-xs tracking-widest uppercase"
                    style={{ color: "var(--accent)" }}
                  >
                    View &rarr;
                  </span>
                </div>
              </div>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
