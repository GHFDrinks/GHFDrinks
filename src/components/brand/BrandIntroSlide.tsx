"use client";

import React, { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import { Brand } from "@/types/brand";
import { getBrandImages } from "@/lib/brand-images";
import { ConstantTabs } from "@/components/present/ConstantTabs";
import { TASTING_NOTES } from "@/data/tasting-notes";

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

export function BrandIntroSlide({ brand, slideIndex }: { brand: Brand; slideIndex?: number }) {
  const params = useParams();
  const router = useRouter();
  const presentationId = params?.id as string;

  // The variants that actually have a tasting-notes page (source of truth for the links).
  const brandNotes = React.useMemo(
    () => TASTING_NOTES.filter((t) => t.brandSlug === brand.slug),
    [brand.slug]
  );

  // Where "Back" should return to — the exact presentation slide the user is on.
  const returnUrl = presentationId
    ? `/present-mode/${presentationId}${typeof slideIndex === "number" ? `?slide=${slideIndex}` : ""}`
    : null;

  const setReturnContext = () => {
    if (returnUrl && typeof window !== "undefined") {
      sessionStorage.setItem("ghf_return_to", returnUrl);
      sessionStorage.setItem("ghf_return_label", "Back to Presentation");
    }
  };

  const local = getBrandImages(brand.slug);
  const logoSrc = local?.logo || brand.logo?.url || "";
  const venueBadges = brand.venueBadges || [];

  // Carousel images: hero, lifestyle-1..3, bottle-1 (skip any that don't exist)
  const carouselImages = [
    local?.hero,
    local?.lifestyle?.[0],
    local?.lifestyle?.[1],
    local?.lifestyle?.[2],
    local?.variants?.[0]
  ].filter(Boolean) as string[];

  const [currentIdx, setCurrentIdx] = useState(0);

  useEffect(() => {
    if (carouselImages.length <= 1) return;
    const interval = setInterval(() => {
      setCurrentIdx((prev) => (prev + 1) % carouselImages.length);
    }, 5000);
    return () => clearInterval(interval);
  }, [carouselImages.length]);

  const handleRangeClick = (variantName: string) => {
    setReturnContext();
    router.push(`/tasting-notes/${brand.slug}/${slugify(variantName)}`);
  };

  return (
    <section className="w-full h-screen flex overflow-hidden bg-[var(--background)] relative">
      
      {/* LEFT 50% — Editorial Brand Info */}
      <div className="w-1/2 h-full flex flex-col justify-between p-16 relative z-10 border-r border-[var(--border)] bg-[var(--background)]">
        
        {/* Top Header with Logo */}
        <div className="flex items-center justify-between">
          {logoSrc ? (
            <img
              src={logoSrc}
              alt={brand.name}
              className="max-h-[64px] object-contain"
            />
          ) : (
            <span className="text-[10px] tracking-[0.35em] uppercase text-[var(--sage)] font-bold">
              {brand.category} Presentation
            </span>
          )}
          {brand.bcorp && (
            <img
              src="/b-corp-logo.svg"
              alt="Certified B Corporation"
              className="w-10 h-[60px] object-contain flex-shrink-0"
            />
          )}
        </div>

        {/* Center Info */}
        <div className="my-auto max-w-lg space-y-6">
          <h1 className="text-6xl font-light tracking-tight text-[var(--cream)] mb-4">
            {brand.name}
          </h1>
          
          <h2 className="text-xl font-light tracking-wide text-[var(--foreground)]/90 italic leading-relaxed">
            "{brand.tagline || brand.story?.headline || brand.story?.title || 'Crafted for discerning tastes.'}"
          </h2>

          <p className="text-sm leading-relaxed text-[var(--muted-foreground)]">
            {brand.story?.description || brand.tagline}
          </p>
          
          {brandNotes.length > 0 && (
            <div className="pt-4">
              <p className="text-xs font-bold tracking-[0.2em] uppercase text-[var(--foreground)] mb-3">
                Range Available
              </p>
              <div className="flex flex-wrap gap-2">
                {brandNotes.map((note) => (
                  <button
                    key={note.variant}
                    onClick={() => handleRangeClick(note.variant)}
                    className="text-[11px] font-medium px-3.5 py-1.5 rounded-full border border-[var(--border)] bg-[var(--card)] text-[var(--foreground)]/80 hover:border-[var(--sage)] hover:text-[var(--foreground)] active:scale-95 active:bg-[var(--sage)]/15 transition-all cursor-pointer"
                  >
                    {note.variant}
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Bottom indicator with brand story link */}
        <div className="flex items-center justify-between">
          <div className="text-[10px] tracking-widest text-[var(--muted-foreground)] uppercase">
            GHF Portfolio © 2026
          </div>
          <button
            onClick={() => { setReturnContext(); router.push(`/brands/${brand.slug}`); }}
            className="text-[10px] font-bold tracking-[0.2em] uppercase text-[var(--sage)] hover:text-[var(--foreground)] transition-colors flex items-center gap-1.5 border border-[var(--sage)]/30 hover:border-[var(--sage)] px-3.5 py-1.5 rounded-full bg-[var(--card)] cursor-pointer"
          >
            Discover More
          </button>
        </div>
      </div>

      {/* RIGHT 50% — Auto-playing Image Carousel */}
      <div className="w-1/2 h-full relative overflow-hidden bg-[var(--muted)]">
        {carouselImages.length > 0 ? (
          carouselImages.map((src, idx) => (
            <img
              key={src}
              src={src}
              alt=""
              className="absolute inset-0 w-full h-full object-cover transition-opacity duration-[1200ms] ease-in-out"
              style={{
                opacity: idx === currentIdx ? 1 : 0,
                zIndex: idx === currentIdx ? 1 : 0,
              }}
            />
          ))
        ) : (
          <div className="absolute inset-0 bg-gradient-to-br from-[#111c18] to-[#070b09]" />
        )}

        {/* Overlays for depth */}
        <div className="absolute inset-0 bg-gradient-to-t from-[var(--background)] via-transparent to-black/40 z-10 pointer-events-none" />
        <div className="absolute inset-0 bg-gradient-to-r from-[var(--background)] via-transparent to-transparent z-10 pointer-events-none" />

        {/* Dot Indicators */}
        {carouselImages.length > 1 && (
          <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex items-center gap-2 z-20">
            {carouselImages.map((_, idx) => (
              <button
                key={idx}
                onClick={() => setCurrentIdx(idx)}
                className="w-2.5 h-2.5 rounded-full transition-all duration-300"
                style={{
                  backgroundColor: idx === currentIdx ? "var(--cream)" : "var(--sage)",
                  opacity: idx === currentIdx ? 1 : 0.4,
                }}
                aria-label={`Go to slide ${idx + 1}`}
              />
            ))}
          </div>
        )}

        {/* Venue badges display bottom right */}
        {venueBadges.length > 0 && (
          <div className="absolute bottom-6 right-8 z-20 flex gap-3">
            {venueBadges.slice(0, 3).map((v, i) => (
              <div
                key={i}
                className="w-12 h-12 rounded-full bg-[var(--background)]/90 backdrop-blur border border-[var(--border)] flex items-center justify-center p-1.5 shadow-2xl"
              >
                {v.logoUrl ? (
                  <img src={v.logoUrl} alt={v.name} className="w-full h-full object-contain filter brightness-95" />
                ) : (
                  <span className="text-[7px] font-bold text-[var(--foreground)]/80 text-center leading-tight">
                    {v.name.slice(0, 3)}
                  </span>
                )}
              </div>
            ))}
          </div>
        )}
      </div>

      <ConstantTabs brandSlug={brand.slug} />
    </section>
  );
}
