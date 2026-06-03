"use client";

import React from "react";
import Link from "next/link";
import { useBrands } from "@/hooks/useBrands";
import { PRESENTATION_TEMPLATES } from "@/types/presentation";

export default function PackagesPage() {
  const { brands, loading } = useBrands();

  return (
    <div className="p-10 min-h-screen bg-white">
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
              className="group block rounded-xl overflow-hidden border border-gray-200 hover:border-gray-400 transition-colors bg-white"
            >
              {/* Bottle grid */}
              <div
                className="h-52 flex items-end justify-center gap-2 px-4 pb-4 overflow-hidden"
                style={{ backgroundColor: "var(--muted)" }}
              >
                {loading ? (
                  <div className="text-xs text-gray-400">Loading...</div>
                ) : templateBrands.length > 0 ? (
                  templateBrands.slice(0, 5).map((b) => {
                    const imgUrl =
                      b.variants[0]?.image?.url || b.heroImage?.url || "";
                    return imgUrl ? (
                      <img
                        key={b.slug}
                        src={imgUrl}
                        alt={b.name}
                        className="object-contain"
                        style={{ maxHeight: "160px", maxWidth: "80px" }}
                      />
                    ) : (
                      <div
                        key={b.slug}
                        className="flex items-end justify-center"
                        style={{ height: "160px", width: "60px" }}
                      >
                        <span className="text-[10px] text-center text-gray-400 leading-tight">
                          {b.name}
                        </span>
                      </div>
                    );
                  })
                ) : (
                  <div className="text-xs text-gray-400">No brands yet</div>
                )}
              </div>

              {/* Package info */}
              <div className="p-5 border-t border-gray-100">
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
