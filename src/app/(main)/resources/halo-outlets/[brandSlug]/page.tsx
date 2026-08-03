"use client";

import React, { useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { STATIC_BRANDS } from "@/lib/static-brands";
import { HALO_OUTLETS } from "@/data/halo-outlets";

type Tier = "prestige" | "independent" | "national-group";

const TIER_TABS: { label: string; value: Tier }[] = [
  { label: "Prestige Accounts", value: "prestige" },
  { label: "Independent Venues", value: "independent" },
  { label: "National & Group", value: "national-group" },
];

export default function BrandHaloOutletsPage() {
  const params = useParams();
  const router = useRouter();
  const brandSlug = params.brandSlug as string;

  const brand = STATIC_BRANDS.find((b) => b.slug === brandSlug);
  const [activeTab, setActiveTab] = useState<Tier>("prestige");

  if (!brand) {
    return (
      <div className="min-h-screen px-12 py-10" style={{ backgroundColor: "var(--background)" }}>
        <h1 className="text-2xl font-light text-[var(--foreground)]">Brand not found</h1>
        <button
          onClick={() => router.push("/resources/halo-outlets")}
          className="text-xs uppercase tracking-widest text-[var(--sage)] hover:underline mt-4 cursor-pointer"
        >
          ← Back to Halo Outlets
        </button>
      </div>
    );
  }

  // Filter outlets for this brand and slice to 50 max total across all tiers
  const brandOutlets = HALO_OUTLETS.filter((o) => o.brandSlug === brandSlug).slice(0, 50);
  const activeOutlets = brandOutlets.filter((o) => o.tier === activeTab);

  return (
    <div className="min-h-screen px-12 py-10 flex flex-col justify-between" style={{ backgroundColor: "var(--background)" }}>
      <div className="space-y-8">
        {/* Header */}
        <div className="flex items-center justify-between border-b border-[var(--border)] pb-6">
          <button
            onClick={() => router.push("/resources/halo-outlets")}
            className="flex items-center gap-2 text-xs font-bold tracking-widest uppercase text-[var(--sage)] hover:text-[var(--foreground)] transition-colors border border-[var(--sage)]/30 hover:border-[var(--sage)] px-4 py-2 rounded-full bg-[var(--card)] cursor-pointer"
          >
            ← Back to brand list
          </button>
          <div className="text-right">
            <span className="text-[10px] tracking-[0.35em] uppercase text-[var(--sage)] font-bold block mb-1">
              {brand.name} Showcases
            </span>
            <h1 className="text-2xl font-light text-[var(--foreground)]">Halo Outlets</h1>
          </div>
        </div>

        {/* Tabs */}
        <div className="flex gap-2 border-b border-[var(--border)] pb-4 overflow-x-auto scrollbar-hide">
          {TIER_TABS.map((tab) => {
            const count = brandOutlets.filter((o) => o.tier === tab.value).length;
            const isActive = activeTab === tab.value;

            return (
              <button
                key={tab.value}
                onClick={() => setActiveTab(tab.value)}
                className={`px-4 py-2 text-xs font-semibold uppercase tracking-wider rounded-lg transition-all border cursor-pointer ${
                  isActive
                    ? "bg-[var(--foreground)] text-[var(--background)] border-[var(--foreground)]"
                    : "border-[var(--border)] bg-[var(--card)] text-[var(--foreground)]/80 hover:border-[var(--sage)]"
                }`}
              >
                {tab.label} ({count})
              </button>
            );
          })}
        </div>

        {/* Content list */}
        {activeOutlets.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {activeOutlets.map((outlet, index) => (
              <div
                key={index}
                className="aspect-[16/10] rounded-xl border border-[var(--border)] overflow-hidden relative group bg-[var(--card)] flex items-center justify-center text-center shadow-lg"
              >
                <img
                  src={outlet.outletImage}
                  alt={outlet.outletName}
                  className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-black/55 group-hover:bg-black/50 transition-colors" />

                {/* Name / Logo overlay */}
                <div className="relative z-10 p-6 flex flex-col items-center justify-center">
                  {outlet.outletLogo ? (
                    <img
                      src={outlet.outletLogo}
                      alt={outlet.outletName}
                      className="max-h-12 object-contain"
                    />
                  ) : (
                    <span className="text-lg font-light text-[var(--pearl)] tracking-wider">
                      {outlet.outletName}
                    </span>
                  )}
                  <span className="text-[9px] uppercase tracking-widest text-[var(--sage)] mt-2 font-bold opacity-0 group-hover:opacity-100 transition-opacity">
                    {outlet.tier.replace("-", " ")} account
                  </span>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="py-20 text-center border border-dashed border-[var(--border)] rounded-xl bg-[var(--card)]/20">
            <p className="text-sm text-[var(--muted-foreground)] leading-relaxed">
              No halo outlets listed under this category for {brand.name} yet.
            </p>
            <p className="text-xs text-[var(--sage)] mt-1">
              New prestige accounts can be configured in the Back Office dashboard.
            </p>
          </div>
        )}
      </div>

      {/* Footer copyright */}
      <div className="text-[9px] tracking-wider text-[var(--muted-foreground)]/65 mt-16 text-center uppercase border-t border-[var(--border)]/50 pt-4">
        * Halo Outlet showcases represent verified portfolio installations.
      </div>
    </div>
  );
}
