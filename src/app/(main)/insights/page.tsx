"use client";

import React from "react";
import Link from "next/link";
import { useBrands } from "@/hooks/useBrands";

export default function InsightsPage() {
  const { brands, loading } = useBrands();

  const totalSKUs = brands.reduce((acc, b) => acc + b.variants.length, 0);
  const spirits = brands.filter((b) => b.category === "Spirits");
  const wines = brands.filter((b) => b.category === "Wines");
  const beer = brands.filter((b) => b.category === "Packaged");
  const bcorpBrands = brands.filter((b) => b.bcorp);
  const noAlcBrands = brands.filter((b) =>
    b.variants.some((v) => v.abv === "0%" || v.abv === "0.5%")
  );

  const stats = [
    { label: "Total Brands", value: brands.length },
    { label: "Total SKUs", value: totalSKUs },
    { label: "Spirits", value: spirits.length },
    { label: "Wines", value: wines.length },
    { label: "Packaged", value: beer.length },
    { label: "B Corp Certified", value: bcorpBrands.length },
    { label: "Low / No Alcohol", value: noAlcBrands.length },
  ];

  return (
    <div className="p-10 min-h-screen bg-[var(--background)]">
      <h1
        className="text-4xl font-light mb-1 tracking-tight"
        style={{ color: "var(--accent)" }}
      >
        Category Insights
      </h1>
      <p className="text-sm mb-10" style={{ color: "var(--muted-foreground)" }}>
        Portfolio overview to support the sell-in story
      </p>

      {loading ? (
        <p className="text-sm" style={{ color: "var(--muted-foreground)" }}>Loading...</p>
      ) : (
        <>
          {/* Stats grid */}
          <div className="grid grid-cols-4 gap-4 mb-12">
            {stats.map((s) => (
              <div
                key={s.label}
                className="border border-[var(--border)] rounded-lg p-5"
              >
                <p
                  className="text-4xl font-light mb-1"
                  style={{ color: "var(--accent)" }}
                >
                  {s.value}
                </p>
                <p
                  className="text-xs tracking-widest uppercase"
                  style={{ color: "var(--muted-foreground)" }}
                >
                  {s.label}
                </p>
              </div>
            ))}
          </div>

          {/* Category breakdown */}
          {[
            { label: "Spirits", list: spirits },
            { label: "Wines", list: wines },
            { label: "Packaged", list: beer },
          ].map(({ label, list }) => (
            <div key={label} className="mb-10">
              <div className="flex items-center justify-between mb-4">
                <h2
                  className="text-xl font-medium"
                  style={{ color: "var(--accent)" }}
                >
                  {label}
                </h2>
                <span
                  className="text-xs tracking-widest uppercase"
                  style={{ color: "var(--muted-foreground)" }}
                >
                  {list.length} brands ·{" "}
                  {list.reduce((a, b) => a + b.variants.length, 0)} SKUs
                </span>
              </div>
              <div className="grid grid-cols-3 gap-4">
                {list.map((b) => (
                  <Link
                    key={b.slug}
                    href={`/brands/${b.slug}`}
                    className="border border-[var(--border)] rounded-lg p-4 hover:border-[var(--sage)] transition-colors"
                  >
                    <div className="flex items-start justify-between mb-1">
                      <p
                        className="text-sm font-medium"
                        style={{ color: "var(--accent)" }}
                      >
                        {b.name}
                      </p>
                      {b.bcorp && (
                        <span
                          className="text-[9px] tracking-widest uppercase border rounded px-1 py-0.5"
                          style={{
                            borderColor: "var(--sage)",
                            color: "var(--sage)",
                          }}
                        >
                          B Corp
                        </span>
                      )}
                    </div>
                    <p
                      className="text-xs leading-relaxed line-clamp-2"
                      style={{ color: "var(--muted-foreground)" }}
                    >
                      {b.tagline}
                    </p>
                    <p
                      className="text-xs mt-2 font-semibold"
                      style={{ color: "var(--sage)" }}
                    >
                      {b.variants.length} SKUs
                    </p>
                  </Link>
                ))}
              </div>
            </div>
          ))}
        </>
      )}
    </div>
  );
}
