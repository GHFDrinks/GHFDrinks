"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { useParams, useRouter, useSearchParams } from "next/navigation";
import { useBrands } from "@/hooks/useBrands";
import { getBrandImages } from "@/lib/brand-images";
import { SERVES_DATA, Season, Serve, FEVER_TREE_SERVES } from "@/data/serves";

export default function ServesPage() {
  const params = useParams();
  const router = useRouter();
  const searchParams = useSearchParams();

  const brandSlug = params.brandSlug as string;
  const { brands } = useBrands();
  const brand = brands.find((b) => b.slug === brandSlug);
  const local = getBrandImages(brandSlug);

  // Read initial season from query parameters, default to spring-summer.
  // "fever-tree" is a third tab (spirits only) alongside the two seasons.
  const initialSeason = (searchParams.get("season") as Season | "fever-tree") || "spring-summer";
  const [season, setSeason] = useState<Season | "fever-tree">(initialSeason);

  // Filter available variants for this brand in SERVES_DATA
  const variants = SERVES_DATA.filter((v) => v.brandSlug === brandSlug);

  const [activeVariantSlug, setActiveVariantSlug] = useState<string>("");
  const [returnTo, setReturnTo] = useState<{ url: string; label: string } | null>(null);

  // Initialize active variant slug
  useEffect(() => {
    if (variants.length > 0 && !activeVariantSlug) {
      setActiveVariantSlug(variants[0].variantSlug);
    }
  }, [variants, activeVariantSlug]);

  // Handle return url from sessionStorage
  useEffect(() => {
    if (typeof window !== "undefined") {
      const url = sessionStorage.getItem("ghf_return_to");
      const label = sessionStorage.getItem("ghf_return_label") || "Back";
      if (url) {
        setReturnTo({ url, label });
      }
    }
  }, []);

  if (!brand || variants.length === 0) {
    return (
      <div className="min-h-screen px-12 py-10" style={{ backgroundColor: "var(--background)" }}>
        <h1 className="text-2xl font-light text-[var(--foreground)]">Brand serves not found</h1>
        <Link href="/tasting-notes" className="text-sm underline mt-4 block text-[var(--sage)]">
          ← Back to Tasting Notes
        </Link>
      </div>
    );
  }

  const activeVariant = variants.find((v) => v.variantSlug === activeVariantSlug) || variants[0];
  const isSpirits = brand.category?.toLowerCase() === "spirits";
  const serves =
    season === "spring-summer"
      ? activeVariant?.springSummer
      : season === "autumn-winter"
      ? activeVariant?.autumnWinter
      : (activeVariant?.feverTree ?? FEVER_TREE_SERVES);

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

  // Determine standard placeholder images if specific serve image isn't set
  const getServeImage = (serve: Serve, index: number) => {
    if (serve.image) return serve.image;
    if (local?.lifestyle && local.lifestyle.length > 0) {
      return local.lifestyle[index % local.lifestyle.length];
    }
    if (local?.hero) return local.hero;
    return "";
  };

  return (
    <div className="min-h-screen flex flex-col px-12 py-10" style={{ backgroundColor: "var(--background)" }}>
      
      {/* Top Header Row: Back Button (left) + centred Brand Logo */}
      <div className="relative flex items-center mb-8 min-h-12">
        <button
          onClick={handleBack}
          className="relative z-10 text-xs tracking-widest uppercase text-[var(--muted-foreground)] hover:text-[var(--foreground)] transition-colors cursor-pointer font-bold"
        >
          ← {returnTo ? returnTo.label : "Back"}
        </button>
        {local?.logo && (
          <img
            src={local.logo}
            alt={brand.name}
            className="absolute left-1/2 -translate-x-1/2 max-h-12 max-w-[140px] object-contain"
          />
        )}
      </div>

      {/* Page Title */}
      <div className="mb-8">
        <span className="text-[10px] tracking-[0.35em] uppercase text-[var(--sage)] font-bold block mb-1">
          Serve Inspiration
        </span>
        <h1 className="text-4xl font-light tracking-tight text-[var(--foreground)]">
          {brand.name} Signature Serves
        </h1>
      </div>

      {/* Variant Tabs */}
      <div className="flex gap-2 border-b border-[var(--border)] pb-4 mb-6 overflow-x-auto scrollbar-hide">
        {variants.map((v) => {
          const isActive = v.variantSlug === activeVariantSlug;
          return (
            <button
              key={v.variantSlug}
              onClick={() => setActiveVariantSlug(v.variantSlug)}
              className={`px-4 py-2 text-xs font-semibold uppercase tracking-wider rounded-lg transition-all border ${
                isActive
                  ? "bg-[var(--foreground)] text-[var(--background)] border-[var(--foreground)]"
                  : "border-[var(--border)] bg-[var(--card)] text-[var(--foreground)]/80 hover:border-[var(--sage)]"
              }`}
            >
              {v.variantDisplayName}
            </button>
          );
        })}
      </div>

      {/* Season Toggle */}
      <div className="flex justify-center mb-10">
        <div className="inline-flex rounded-lg border border-[var(--border)] bg-[var(--card)] p-1">
          <button
            onClick={() => setSeason("spring-summer")}
            className={`px-6 py-2 text-xs font-bold uppercase tracking-wider rounded-md transition-all ${
              season === "spring-summer"
                ? "bg-[var(--sage)] text-[var(--background)] font-black"
                : "text-[var(--foreground)]/70 hover:text-[var(--foreground)]"
            }`}
          >
            Spring / Summer
          </button>
          <button
            onClick={() => setSeason("autumn-winter")}
            className={`px-6 py-2 text-xs font-bold uppercase tracking-wider rounded-md transition-all ${
              season === "autumn-winter"
                ? "bg-[var(--sage)] text-[var(--background)] font-black"
                : "text-[var(--foreground)]/70 hover:text-[var(--foreground)]"
            }`}
          >
            Autumn / Winter
          </button>
          {isSpirits && (
            <button
              onClick={() => setSeason("fever-tree")}
              className={`px-6 py-2 text-xs font-bold uppercase tracking-wider rounded-md transition-all ${
                season === "fever-tree"
                  ? "bg-[var(--sage)] text-[var(--background)] font-black"
                  : "text-[var(--foreground)]/70 hover:text-[var(--foreground)]"
              }`}
            >
              Fever-Tree
            </button>
          )}
        </div>
      </div>

      {/* 3 Serve Tiles Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full flex-1 items-stretch">
        {serves?.map((serve, idx) => {
          const img = getServeImage(serve, idx);
          return (
            <div
              key={serve.name}
              className="rounded-lg border border-[var(--border)] bg-[var(--card)] overflow-hidden flex flex-col shadow-lg hover:border-[var(--sage)]/50 transition-all duration-300 group"
            >
              {/* Top Half: Serve Image */}
              <div className="relative aspect-[16/10] bg-[var(--muted)] overflow-hidden flex-shrink-0">
                {img ? (
                  <img
                    src={img}
                    alt={serve.name}
                    className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                ) : (
                  <div className="w-full h-full bg-gradient-to-br from-[var(--muted)] to-[var(--background)]" />
                )}
              </div>

              {/* Bottom Half: Details */}
              <div className="p-6 flex-1 flex flex-col justify-between space-y-4">
                <div className="space-y-2">
                  <h4 className="text-lg font-bold text-[var(--foreground)] group-hover:text-[var(--sage)] transition-colors">
                    {serve.name}
                  </h4>
                  <p className="text-sm text-[var(--muted-foreground)] leading-relaxed">
                    {serve.recipe}
                  </p>
                </div>

                {/* Flavour descriptors row */}
                <div className="flex flex-wrap gap-2 pt-4 border-t border-[var(--border)]/40">
                  {serve.flavourDescriptors.map((desc, i) => (
                    <span
                      key={i}
                      className="text-[10px] font-semibold uppercase tracking-widest text-[var(--sage)] bg-[var(--sage)]/10 px-2.5 py-1 rounded"
                    >
                      {desc}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
