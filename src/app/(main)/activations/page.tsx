"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useBrands } from "@/hooks/useBrands";
import { getBrandImages } from "@/lib/brand-images";
import { GHF_CAMPAIGNS } from "@/data/ghf-campaigns";

export default function GHFActivationsPage() {
  const [activeId, setActiveId] = useState(GHF_CAMPAIGNS[0].id);
  const { brands } = useBrands();
  const campaign = GHF_CAMPAIGNS.find((c) => c.id === activeId)!;

  return (
    <div className="min-h-screen" style={{ backgroundColor: "var(--background)" }}>

      {/* Campaign tabs */}
      <div className="flex gap-3 px-10 pt-8 flex-wrap">
        {GHF_CAMPAIGNS.map((c) => {
          const isActive = c.id === activeId;
          return (
            <button
              key={c.id}
              onClick={() => setActiveId(c.id)}
              className="px-4 py-2 text-xs tracking-widest uppercase border rounded transition-colors"
              style={{
                borderColor: isActive ? "var(--gold)" : "var(--border)",
                backgroundColor: isActive ? "var(--gold)" : "transparent",
                color: isActive ? "#0b1310" : "var(--foreground)",
              }}
            >
              {c.name}
            </button>
          );
        })}
      </div>

      {/* Campaign slide */}
      <div className="flex px-10 py-8 gap-10 items-stretch">

        {/* Hero image */}
        <div className="flex-shrink-0 rounded-xl overflow-hidden" style={{ width: "38%" }}>
          <img src={campaign.heroImage} alt={campaign.name} className="w-full h-full object-cover" style={{ minHeight: "560px" }} />
        </div>

        {/* Content */}
        <div className="flex-1 flex flex-col">
          <p className="text-[11px] tracking-[0.3em] uppercase mb-2" style={{ color: "var(--muted-foreground)" }}>
            GHF Activation
          </p>
          <h1 className="text-5xl font-light mb-5 tracking-tight" style={{ color: "var(--gold)" }}>
            {campaign.name}
          </h1>
          <p className="text-base leading-relaxed mb-6 max-w-2xl" style={{ color: "var(--foreground)" }}>
            {campaign.description}
          </p>

          <p className="text-sm mb-6">
            <span className="font-bold" style={{ color: "var(--foreground)" }}>Activation Period: </span>
            <span style={{ color: "var(--gold)" }}>{campaign.period}</span>
          </p>

          {/* Relevant brands */}
          <p className="text-sm font-bold mb-3" style={{ color: "var(--foreground)" }}>Relevant Brands:</p>
          <div className="flex flex-wrap gap-3 mb-8">
            {campaign.relevantBrandSlugs.map((slug) => {
              const brand = brands.find((b) => b.slug === slug);
              const local = getBrandImages(slug);
              return (
                <Link
                  key={slug}
                  href={`/brands/${slug}`}
                  className="h-14 px-4 rounded-lg border flex items-center justify-center transition-colors hover:border-[var(--gold)]"
                  style={{ borderColor: "var(--border)", backgroundColor: "var(--card)", minWidth: "110px" }}
                >
                  {local?.logo ? (
                    <img src={local.logo} alt={brand?.name || slug} className="max-h-9 max-w-[90px] object-contain" />
                  ) : (
                    <span className="text-xs font-semibold tracking-wide text-center" style={{ color: "var(--foreground)" }}>
                      {brand?.name || slug}
                    </span>
                  )}
                </Link>
              );
            })}
          </div>

          {/* Support tiers */}
          <p className="text-sm font-bold mb-3" style={{ color: "var(--foreground)" }}>Support Available:</p>
          <div className="grid grid-cols-3 gap-5">
            {campaign.tiers.map((tier) => (
              <div key={tier.label} className="rounded-lg overflow-hidden border" style={{ borderColor: "var(--border)" }}>
                <div className="py-2 text-center text-xs font-bold tracking-[0.3em] uppercase text-white" style={{ backgroundColor: tier.color }}>
                  {tier.label}
                </div>
                <div className="p-4" style={{ backgroundColor: "var(--card)" }}>
                  {tier.lines.map((line, i) => (
                    <p key={i} className="text-xs leading-relaxed" style={{ color: "var(--foreground)" }}>{line}</p>
                  ))}
                  <div className="border-t my-3" style={{ borderColor: "var(--border)" }} />
                  {tier.benefits.map((b, i) => (
                    <p key={i} className="text-xs leading-relaxed" style={{ color: "var(--muted-foreground)" }}>
                      {b.endsWith("+") ? <em>{b}</em> : <>✓ {b}</>}
                    </p>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
