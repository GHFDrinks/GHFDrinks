"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useBrands } from "@/hooks/useBrands";
import { getBrandImages } from "@/lib/brand-images";
import { GHF_CAMPAIGNS, GHFCampaign } from "@/data/ghf-campaigns";

function CampaignCard({ campaign, brands }: { campaign: GHFCampaign; brands: any[] }) {
  const router = useRouter();
  
  // Collect images from all relevant brands for the auto-carousel
  const carouselImages = React.useMemo(() => {
    const imgs: string[] = [];
    campaign.relevantBrandSlugs.forEach((slug) => {
      const local = getBrandImages(slug);
      if (local) {
        if (local.hero) imgs.push(local.hero);
        if (local.lifestyle) imgs.push(...local.lifestyle);
      }
    });
    // Fallback to campaign hero image if no brand images exist
    if (imgs.length === 0) {
      imgs.push(campaign.heroImage);
    }
    return imgs;
  }, [campaign]);

  const [activeImgIdx, setActiveImgIdx] = useState(0);

  useEffect(() => {
    if (carouselImages.length <= 1) return;
    const interval = setInterval(() => {
      setActiveImgIdx((prev) => (prev + 1) % carouselImages.length);
    }, 2000);
    return () => clearInterval(interval);
  }, [carouselImages]);

  const handleFindOutMore = () => {
    if (typeof window !== "undefined") {
      sessionStorage.setItem("ghf_return_to", "/activations");
      sessionStorage.setItem("ghf_return_label", "Back to Activations");
    }
    router.push(`/activations/${campaign.id}`);
  };

  return (
    <div className="bg-[var(--card)] border border-[var(--border)] rounded-xl overflow-hidden flex flex-col md:flex-row shadow-xl hover:border-[var(--sage)]/50 transition-all duration-300 items-stretch">
      {/* Left side: Details */}
      <div className="flex-1 p-8 flex flex-col justify-between space-y-6">
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <span className="text-[10px] tracking-[0.35em] uppercase text-[var(--sage)] font-bold">
              Portfolio Activation
            </span>
            <span className="text-xs font-semibold text-[var(--muted-foreground)] bg-[var(--background)] border border-[var(--border)] px-3 py-1 rounded-full">
              {campaign.period} 2026
            </span>
          </div>

          <h2 className="text-3xl font-light text-[var(--foreground)] tracking-tight">
            {campaign.name}
          </h2>

          <p className="text-sm text-[var(--muted-foreground)] leading-relaxed max-w-2xl">
            {campaign.description}
          </p>
        </div>

        {/* Relevant Brands section */}
        <div className="space-y-3">
          <p className="text-[10px] tracking-widest uppercase text-[var(--muted-foreground)] font-bold">
            Relevant Brands
          </p>
          <div className="flex flex-wrap gap-2.5">
            {campaign.relevantBrandSlugs.map((slug) => {
              const brandObj = brands.find((b) => b.slug === slug);
              const local = getBrandImages(slug);

              return (
                <Link
                  key={slug}
                  href={`/brands/${slug}`}
                  className="h-10 px-4 rounded-lg bg-[var(--foreground)] border border-[var(--foreground)] flex items-center justify-center transition-all hover:opacity-85 shadow-sm group"
                >
                  {local?.logo ? (
                    <img
                      src={local.logo}
                      alt={brandObj?.name || slug}
                      className="max-h-6 max-w-[80px] object-contain"
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

        {/* Action Button */}
        <div className="pt-2">
          <button
            onClick={handleFindOutMore}
            className="px-6 py-3 rounded-lg text-xs font-bold tracking-widest uppercase bg-[var(--foreground)] text-[var(--background)] hover:opacity-90 transition-all cursor-pointer"
          >
            Find Out More
          </button>
        </div>
      </div>

      {/* Right side: Auto Carousel of Hero Images */}
      <div className="w-full md:w-[350px] aspect-[4/3] md:aspect-auto overflow-hidden relative bg-[var(--muted)] flex-shrink-0">
        {carouselImages.map((src, idx) => (
          <img
            key={src}
            src={src}
            alt=""
            className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-1000 ${
              idx === activeImgIdx ? "opacity-100 z-10" : "opacity-0 z-0"
            }`}
          />
        ))}
      </div>
    </div>
  );
}

export default function GHFActivationsPage() {
  const router = useRouter();
  const { brands } = useBrands();

  return (
    <div className="min-h-screen flex flex-col px-12 py-10" style={{ backgroundColor: "var(--background)" }}>
      {/* Top Header */}
      <div className="flex items-center justify-between mb-10 border-b border-[var(--border)] pb-6">
        <div>
          <span className="text-[10px] tracking-[0.35em] uppercase text-[var(--sage)] font-bold block mb-1">
            Campaign Hub
          </span>
          <h1 className="text-4xl font-light tracking-tight text-[var(--foreground)]">
            GHF Portfolio Activations
          </h1>
        </div>
        <button
          onClick={() => router.push("/")}
          className="text-xs tracking-widest uppercase text-[var(--muted-foreground)] hover:text-[var(--foreground)] transition-colors cursor-pointer font-bold"
        >
          ← Home
        </button>
      </div>

      {/* Activations List Grid */}
      <div className="space-y-8 flex-1">
        {GHF_CAMPAIGNS.map((campaign) => (
          <CampaignCard key={campaign.id} campaign={campaign} brands={brands} />
        ))}
      </div>

      {/* Footer disclaimer */}
      <div className="text-[9px] tracking-wider text-[var(--muted-foreground)]/65 mt-12 text-center uppercase border-t border-[var(--border)]/50 pt-4">
        * Brand logos are inverted to white dynamically. Custom white asset pathways will be supported in future releases.
      </div>
    </div>
  );
}
