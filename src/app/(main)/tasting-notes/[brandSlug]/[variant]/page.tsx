"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import { useBrands } from "@/hooks/useBrands";
import { getBrandImages } from "@/lib/brand-images";
import { TASTING_NOTES, VariantTasting } from "@/data/tasting-notes";
import { TasteRadarChart } from "@/components/tasting/TasteRadarChart";
import { ProductFeaturesList } from "@/components/tasting/ProductFeaturesList";
import { SeasonSelectorModal } from "@/components/serves/SeasonSelectorModal";
import { Season } from "@/data/serves";

function slugify(text: string) {
  return text
    .toString()
    .toLowerCase()
    .trim()
    .replace(/\s+/g, "-")
    .replace(/[^\w\-]+/g, "")
    .replace(/\-\-+/g, "-")
    .replace(/^-+/, "")
    .replace(/-+$/, "");
}

export default function VariantDetailPage() {
  const params = useParams();
  const router = useRouter();
  const brandSlug = params.brandSlug as string;
  const variantSlug = params.variant as string;

  const { brands } = useBrands();
  const brand = brands.find((b) => b.slug === brandSlug);
  const local = getBrandImages(brandSlug);

  const notes = TASTING_NOTES.filter((t) => t.brandSlug === brandSlug);
  const variantIdx = notes.findIndex((n) => slugify(n.variant) === variantSlug);
  const note = notes[variantIdx];

  const [carouselIdx, setCarouselIdx] = useState(0);
  const [isServeModalOpen, setIsServeModalOpen] = useState(false);
  const [returnTo, setReturnTo] = useState<{ url: string; label: string } | null>(null);

  // Check sessionStorage for presentation return context
  useEffect(() => {
    if (typeof window !== "undefined") {
      const url = sessionStorage.getItem("ghf_return_to");
      const label = sessionStorage.getItem("ghf_return_label") || "Back";
      if (url) {
        setReturnTo({ url, label });
      }
    }
  }, []);

  // Carousel images configuration
  const carouselImages = React.useMemo(() => {
    if (!note) return [];
    if (note.carouselImages && note.carouselImages.length > 0) {
      return note.carouselImages;
    }
    return [
      local?.lifestyle?.[0],
      local?.lifestyle?.[1],
      local?.lifestyle?.[2],
      local?.variants?.[0]
    ].filter(Boolean) as string[];
  }, [note, local]);

  // Carousel auto-play effect
  useEffect(() => {
    if (carouselImages.length <= 1) return;
    const interval = setInterval(() => {
      setCarouselIdx((prev) => (prev + 1) % carouselImages.length);
    }, 2000);
    return () => clearInterval(interval);
  }, [carouselImages]);

  if (!brand || !note) {
    return (
      <div className="min-h-screen px-12 py-10" style={{ backgroundColor: "var(--background)" }}>
        <h1 className="text-2xl font-light text-[var(--foreground)]">Variant not found</h1>
        <Link href="/tasting-notes" className="text-sm underline mt-4 block text-[var(--sage)]">
          ← Back to Tasting Notes
        </Link>
      </div>
    );
  }

  const goPrev = () => {
    const prevNote = notes[variantIdx - 1];
    if (prevNote) {
      router.push(`/tasting-notes/${brandSlug}/${slugify(prevNote.variant)}`);
    }
  };

  const goNext = () => {
    const nextNote = notes[variantIdx + 1];
    if (nextNote) {
      router.push(`/tasting-notes/${brandSlug}/${slugify(nextNote.variant)}`);
    }
  };

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

  const handleSeasonSelect = (selectedSeason: Season) => {
    if (typeof window !== "undefined") {
      sessionStorage.setItem("ghf_return_to", `/tasting-notes/${brandSlug}/${variantSlug}`);
      sessionStorage.setItem("ghf_return_label", "Back to Tasting Notes");
    }
    router.push(`/serves/${brandSlug}?season=${selectedSeason}`);
  };

  const isSpirits = brand.category?.toLowerCase() === "spirits";

  return (
    <div className="min-h-screen flex flex-col px-12 py-10" style={{ backgroundColor: "var(--background)" }}>
      {/* Top Navigation Row: Back (left) + centred Brand Logo */}
      <div className="relative flex items-center mb-8 min-h-12">
        <button
          onClick={handleBack}
          className="relative z-10 text-xs tracking-widest uppercase text-[var(--muted-foreground)] hover:text-[var(--foreground)] transition-colors cursor-pointer font-bold text-left"
        >
          ← {returnTo ? returnTo.label : `${brand.name} Collection`}
        </button>
        {local?.logo && (
          <img
            src={local.logo}
            alt={brand.name}
            className="absolute left-1/2 -translate-x-1/2 max-h-12 max-w-[140px] object-contain"
          />
        )}
      </div>

      {/* Header Info */}
      <div className="mb-10">
        <span className="text-[10px] tracking-[0.35em] uppercase text-[var(--sage)] font-bold block mb-1">
          {brand.name}
        </span>
        <h1 className="text-4xl font-light tracking-tight text-[var(--foreground)]">
          {note.variant}
        </h1>
      </div>

      {/* Two-Column Layout */}
      <div className="flex-1 grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
        {/* LEFT COLUMN: Carousel + Radar Chart */}
        <div className="space-y-10">
          {/* Image Carousel */}
          <div className="relative rounded-xl overflow-hidden h-[340px] bg-[var(--card)] border border-[var(--border)]">
            {carouselImages.length > 0 ? (
              carouselImages.map((src, idx) => (
                <img
                  key={src}
                  src={src}
                  alt=""
                  className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-1000 ${
                    idx === carouselIdx ? "opacity-100 z-10" : "opacity-0 z-0"
                  }`}
                />
              ))
            ) : (
              <div className="w-full h-full flex items-center justify-center text-[var(--muted-foreground)] text-xs">
                No images available
              </div>
            )}
          </div>

          {/* Taste Profile Radar Section */}
          <div className="space-y-4">
            <h2 className="text-lg font-light tracking-wider uppercase text-[var(--foreground)]">
              Taste Profile
            </h2>
            {note.tasteProfileRadar ? (
              <div className="p-4 rounded-xl border border-[var(--border)] bg-[var(--card)]">
                <TasteRadarChart data={note.tasteProfileRadar} />
              </div>
            ) : (
              <p className="text-sm text-[var(--muted-foreground)]">Radar profile data not available</p>
            )}
          </div>
        </div>

        {/* RIGHT COLUMN: Description + Features + Details */}
        <div className="space-y-8">
          {/* Product Description (holding text — to be populated per variant) */}
          <div className="space-y-4">
            <h2 className="text-lg font-light tracking-wider uppercase text-[var(--foreground)]">
              Product Description
            </h2>
            <p className="text-sm text-[var(--muted-foreground)] leading-relaxed">
              A considered expression, crafted with intent. Full product description to follow.
            </p>
          </div>

          {/* Product Features — moved down to sit alongside the Taste Profile */}
          <div className="space-y-4">
            <h2 className="text-lg font-light tracking-wider uppercase text-[var(--foreground)]">
              Product Features
            </h2>
            {note.productFeatures && note.productFeatures.length > 0 ? (
              <ProductFeaturesList features={note.productFeatures} />
            ) : (
              <p className="text-sm text-[var(--muted-foreground)]">No product features listed</p>
            )}
          </div>

          {/* ABV Display — value only (label removed per feedback) */}
          <div className="pt-4 border-t border-[var(--border)]">
            <p className="text-2xl font-bold" style={{ color: "var(--foreground)" }}>
              {note.abv}
            </p>
          </div>

          {/* Serve Inspiration Button (Spirits Only) */}
          {isSpirits && (
            <div className="pt-4">
              <button
                onClick={() => setIsServeModalOpen(true)}
                className="w-full py-4 px-6 rounded-lg transition-all bg-[var(--foreground)] hover:bg-[var(--foreground)]/80 text-[var(--background)] font-bold tracking-[0.2em] text-xs uppercase"
              >
                Serve Inspiration
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Bottom Traversal Nav */}
      <div className="flex items-center justify-between mt-12 border-t border-[var(--border)] pt-6">
        <button
          onClick={goPrev}
          disabled={variantIdx === 0}
          className="text-xs tracking-widest uppercase disabled:opacity-30 text-[var(--sage)] hover:opacity-85 transition-opacity"
        >
          ← Back
        </button>
        <span className="text-xs text-[var(--muted-foreground)]">
          {variantIdx + 1} / {notes.length}
        </span>
        <button
          onClick={goNext}
          disabled={variantIdx === notes.length - 1}
          className="text-xs tracking-widest uppercase disabled:opacity-30 text-[var(--sage)] hover:opacity-85 transition-opacity"
        >
          Next →
        </button>
      </div>

      {/* Season Selector Modal */}
      <SeasonSelectorModal
        isOpen={isServeModalOpen}
        onClose={() => setIsServeModalOpen(false)}
        onSelect={handleSeasonSelect}
      />
    </div>
  );
}
