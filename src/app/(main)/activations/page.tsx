"use client";

import React from "react";
import Link from "next/link";
import { useBrands } from "@/hooks/useBrands";

export default function ActivationsPage() {
  const { brands, loading } = useBrands();

  const allActivations = brands.flatMap((b) =>
    (b.activations || []).map((a) => ({ ...a, brandName: b.name, brandSlug: b.slug }))
  );

  return (
    <div className="p-10 min-h-screen bg-[var(--background)]">
      <h1
        className="text-4xl font-light mb-1 tracking-tight"
        style={{ color: "var(--accent)" }}
      >
        GHF Activations
      </h1>
      <p className="text-sm mb-10" style={{ color: "var(--muted-foreground)" }}>
        All activation concepts across the portfolio
      </p>

      {loading ? (
        <p className="text-sm" style={{ color: "var(--muted-foreground)" }}>Loading...</p>
      ) : allActivations.length === 0 ? (
        <p className="text-sm" style={{ color: "var(--muted-foreground)" }}>
          No activations yet. Add them via the admin panel.
        </p>
      ) : (
        <div className="grid grid-cols-2 gap-8">
          {allActivations.map((a) => (
            <Link
              key={a.id}
              href={`/brands/${a.brandSlug}`}
              className="group block border border-[var(--border)] rounded-xl overflow-hidden hover:border-[var(--gold)] transition-colors"
            >
              {a.image?.url && (
                <div className="h-48 overflow-hidden">
                  <img
                    src={a.image.url}
                    alt={a.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                </div>
              )}
              <div className="p-5">
                <div className="flex items-center justify-between mb-2">
                  <p
                    className="text-[10px] tracking-widest uppercase font-semibold"
                    style={{ color: "var(--gold)" }}
                  >
                    {a.brandName}
                  </p>
                  {a.activationType && (
                    <p
                      className="text-[10px] tracking-widest uppercase"
                      style={{ color: "var(--muted-foreground)" }}
                    >
                      {a.activationType}
                    </p>
                  )}
                </div>
                <h2
                  className="text-lg font-medium mb-2"
                  style={{ color: "var(--accent)" }}
                >
                  {a.title}
                </h2>
                <p
                  className="text-xs leading-relaxed line-clamp-2 mb-3"
                  style={{ color: "var(--muted-foreground)" }}
                >
                  {a.description}
                </p>
                {a.keyDates && a.keyDates.length > 0 && (
                  <div>
                    <p className="text-[10px] font-bold tracking-widest uppercase mb-1">
                      Key Dates
                    </p>
                    <p
                      className="text-xs"
                      style={{ color: "var(--muted-foreground)" }}
                    >
                      {a.keyDates.join(" · ")}
                    </p>
                  </div>
                )}
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
