"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useBrands } from "@/hooks/useBrands";

export default function TastingNotesPage() {
  const { brands, loading } = useBrands();
  const [activeSlug, setActiveSlug] = useState<string | null>(null);

  const brandsWithNotes = brands.filter(
    (b) => b.variants?.some((v) => v.tastingNotes?.length > 0)
  );

  return (
    <div className="p-10 min-h-screen bg-white">
      <h1
        className="text-4xl font-light mb-1 tracking-tight"
        style={{ color: "var(--accent)" }}
      >
        Tasting Notes
      </h1>
      <p className="text-sm mb-10" style={{ color: "var(--muted-foreground)" }}>
        Flavour profiles across the GHF portfolio
      </p>

      {loading ? (
        <p className="text-sm" style={{ color: "var(--muted-foreground)" }}>Loading...</p>
      ) : brandsWithNotes.length === 0 ? (
        <div>
          <p className="text-sm mb-6" style={{ color: "var(--muted-foreground)" }}>
            Tasting notes will appear here once added via the admin panel.
            Below is the full portfolio for reference.
          </p>
          <div className="grid grid-cols-3 gap-6">
            {brands.map((b) => (
              <Link
                key={b.slug}
                href={`/brands/${b.slug}`}
                className="border border-gray-200 rounded-xl p-5 hover:border-gray-400 transition-colors"
              >
                <p
                  className="text-xs tracking-widest uppercase mb-1"
                  style={{ color: "var(--muted-foreground)" }}
                >
                  {b.category}
                </p>
                <h2
                  className="text-base font-medium mb-1"
                  style={{ color: "var(--accent)" }}
                >
                  {b.name}
                </h2>
                <p
                  className="text-xs leading-relaxed"
                  style={{ color: "var(--muted-foreground)" }}
                >
                  {b.tagline}
                </p>
              </Link>
            ))}
          </div>
        </div>
      ) : (
        <div className="space-y-6">
          {brandsWithNotes.map((b) => (
            <div
              key={b.slug}
              className="border border-gray-200 rounded-xl overflow-hidden"
            >
              <button
                onClick={() =>
                  setActiveSlug(activeSlug === b.slug ? null : b.slug)
                }
                className="w-full flex items-center justify-between px-6 py-4 hover:bg-gray-50 transition-colors"
              >
                <div className="flex items-center gap-3">
                  <span
                    className="text-base font-medium"
                    style={{ color: "var(--accent)" }}
                  >
                    {b.name}
                  </span>
                  <span
                    className="text-xs tracking-widest uppercase"
                    style={{ color: "var(--muted-foreground)" }}
                  >
                    {b.category}
                  </span>
                </div>
                <span
                  className="text-xs"
                  style={{ color: "var(--muted-foreground)" }}
                >
                  {b.variants.length} variant{b.variants.length !== 1 ? "s" : ""}
                </span>
              </button>

              {activeSlug === b.slug && (
                <div className="border-t border-gray-100 px-6 py-5 grid grid-cols-2 gap-6">
                  {b.variants.map((v) => (
                    <div key={v.id}>
                      <p
                        className="text-sm font-semibold mb-3"
                        style={{ color: "var(--accent)" }}
                      >
                        {v.name}
                      </p>
                      {v.tastingNotes?.length > 0 ? (
                        <div className="space-y-2">
                          {v.tastingNotes.map((note, i) => (
                            <div key={i}>
                              <div className="flex items-center justify-between mb-1">
                                <span
                                  className="text-xs"
                                  style={{ color: "var(--foreground)" }}
                                >
                                  {note.flavor}
                                </span>
                                <span
                                  className="text-xs"
                                  style={{ color: "var(--muted-foreground)" }}
                                >
                                  {note.intensity}%
                                </span>
                              </div>
                              <div
                                className="h-1.5 rounded-full overflow-hidden"
                                style={{ backgroundColor: "var(--muted)" }}
                              >
                                <div
                                  className="h-full rounded-full"
                                  style={{
                                    width: `${note.intensity}%`,
                                    backgroundColor: "var(--accent)",
                                  }}
                                />
                              </div>
                            </div>
                          ))}
                        </div>
                      ) : (
                        <p
                          className="text-xs"
                          style={{ color: "var(--muted-foreground)" }}
                        >
                          No tasting notes yet.
                        </p>
                      )}
                    </div>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
