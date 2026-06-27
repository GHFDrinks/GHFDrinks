"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import { useBrands } from "@/hooks/useBrands";
import { getBrandImages } from "@/lib/brand-images";
import { GHF_CAMPAIGNS } from "@/data/ghf-campaigns";

export default function CampaignDetailPage() {
  const params = useParams();
  const router = useRouter();
  const campaignSlug = params.campaignSlug as string;

  const { brands } = useBrands();
  const campaign = GHF_CAMPAIGNS.find((c) => c.id === campaignSlug);

  const [returnTo, setReturnTo] = useState<{ url: string; label: string } | null>(null);

  // Sync back-navigation destination
  useEffect(() => {
    if (typeof window !== "undefined") {
      const url = sessionStorage.getItem("ghf_return_to");
      const label = sessionStorage.getItem("ghf_return_label") || "Back";
      if (url) {
        setReturnTo({ url, label });
      }
    }
  }, []);

  if (!campaign) {
    return (
      <div className="min-h-screen px-12 py-10" style={{ backgroundColor: "var(--background)" }}>
        <h1 className="text-2xl font-light text-[var(--foreground)]">Campaign not found</h1>
        <Link href="/activations" className="text-sm underline mt-4 block text-[var(--sage)]">
          ← Back to Activations
        </Link>
      </div>
    );
  }

  const handleBack = () => {
    if (returnTo) {
      if (typeof window !== "undefined") {
        sessionStorage.removeItem("ghf_return_to");
        sessionStorage.removeItem("ghf_return_label");
      }
      router.push(returnTo.url);
    } else {
      router.back();
    }
  };

  const supportItems = campaign.supportItems || [
    "Menu development and bespoke cocktail curation.",
    "Comprehensive staff training modules on GHF brands.",
    "POS marketing kits, glass collections, and staff incentive schemes.",
  ];

  const galleryImages = campaign.galleryImages || [
    campaign.heroImage,
  ];

  return (
    <div className="min-h-screen flex flex-col px-12 py-10" style={{ backgroundColor: "var(--background)" }}>
      {/* Top Navigation Row */}
      <div className="flex items-center justify-between mb-8 border-b border-[var(--border)] pb-6">
        <button
          onClick={handleBack}
          className="text-xs tracking-widest uppercase text-[var(--muted-foreground)] hover:text-[var(--foreground)] transition-colors cursor-pointer font-bold"
        >
          ← {returnTo ? returnTo.label : "Back"}
        </button>
        <span className="text-xs tracking-widest uppercase text-[var(--sage)] font-bold">
          GHF Activation Details
        </span>
      </div>

      {/* Main Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 flex-1">
        {/* Left Column: Details & Brands */}
        <div className="space-y-8">
          <div>
            <span className="text-[10px] tracking-[0.35em] uppercase text-[var(--sage)] font-bold block mb-1">
              {campaign.period} 2026
            </span>
            <h1 className="text-4xl font-light tracking-tight text-[var(--foreground)]">
              {campaign.name}
            </h1>
          </div>

          <div className="space-y-4">
            <p className="text-sm text-[var(--foreground)] leading-relaxed">
              {campaign.description}
            </p>
            {campaign.longDescription && (
              <p className="text-sm text-[var(--muted-foreground)] leading-relaxed">
                {campaign.longDescription}
              </p>
            )}
          </div>

          {/* Support items bullet list */}
          <div className="space-y-3 pt-6 border-t border-[var(--border)]">
            <h3 className="text-xs font-bold uppercase tracking-widest text-[var(--sage)]">
              Support Available
            </h3>
            <ul className="space-y-2">
              {supportItems.map((item, index) => (
                <li key={index} className="text-xs text-[var(--muted-foreground)] leading-relaxed flex items-start gap-2">
                  <span className="text-[var(--sage)] font-bold">✓</span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Relevant brands */}
          <div className="space-y-3 pt-6 border-t border-[var(--border)]">
            <h3 className="text-xs font-bold uppercase tracking-widest text-[var(--sage)]">
              Relevant Brands
            </h3>
            <div className="flex flex-wrap gap-3">
              {campaign.relevantBrandSlugs.map((slug) => {
                const brandObj = brands.find((b) => b.slug === slug);
                const local = getBrandImages(slug);

                return (
                  <Link
                    key={slug}
                    href={`/brands/${slug}`}
                    className="h-12 px-4 rounded-lg bg-[var(--foreground)] border border-[var(--foreground)] flex items-center justify-center transition-all hover:opacity-85 shadow-sm"
                  >
                    {local?.logo ? (
                      <img
                        src={local.logo}
                        alt={brandObj?.name || slug}
                        className="max-h-8 max-w-[85px] object-contain"
                        style={{ filter: "brightness(0) invert(1)" }}
                      />
                    ) : (
                      <span className="text-[10px] font-bold uppercase tracking-wider text-[var(--background)]">
                        {brandObj?.name || slug}
                      </span>
                    )}
                  </Link>
                );
              })}
            </div>
          </div>
        </div>

        {/* Right Column: Tiers & Gallery */}
        <div className="space-y-8">
          {/* Tiers display */}
          <div className="space-y-4">
            <h3 className="text-xs font-bold uppercase tracking-widest text-[var(--sage)]">
              Activation Tiers
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {campaign.tiers.map((tier) => (
                <div key={tier.label} className="rounded-lg overflow-hidden border border-[var(--border)] bg-[var(--card)] flex flex-col justify-between">
                  <div
                    className="py-2 text-center text-[10px] font-bold tracking-[0.2em] uppercase text-white"
                    style={{ backgroundColor: tier.color }}
                  >
                    {tier.label}
                  </div>
                  <div className="p-4 flex-1 flex flex-col justify-between">
                    <div className="space-y-1 mb-4">
                      {tier.lines.map((line, i) => (
                        <p key={i} className="text-[11px] text-[var(--foreground)] leading-tight">
                          {line}
                        </p>
                      ))}
                    </div>
                    <div className="border-t border-[var(--border)] pt-3 space-y-1">
                      {tier.benefits.map((b, i) => (
                        <p key={i} className="text-[10px] text-[var(--muted-foreground)] leading-tight">
                          {b.endsWith("+") ? <em>{b}</em> : <>✓ {b}</>}
                        </p>
                      ))}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Photo Gallery */}
          <div className="space-y-4 pt-6 border-t border-[var(--border)]">
            <h3 className="text-xs font-bold uppercase tracking-widest text-[var(--sage)]">
              Gallery
            </h3>
            <div className="grid grid-cols-3 gap-3">
              {galleryImages.map((src, idx) => (
                <div key={idx} className="aspect-square rounded-lg overflow-hidden border border-[var(--border)] bg-[var(--muted)] relative">
                  <img
                    src={src}
                    alt=""
                    className="absolute inset-0 w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
