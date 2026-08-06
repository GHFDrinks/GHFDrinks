"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Brand } from "@/types/brand";
import { useBrands } from "@/hooks/useBrands";
import { getBrandImages } from "@/lib/brand-images";
import { getTastingNotesForBrand } from "@/data/tasting-notes";
import { SERVES_DATA } from "@/data/serves";
import { BrandActivationSlide } from "./BrandActivationSlide";
import { getBrandVideo } from "@/data/brand-videos";
import { getBrandStory } from "@/data/brand-stories";
import { getBrandSupportOptions } from "@/data/brand-support";

// Holding awards content — to be populated per brand by the client (up to 10).
const AWARDS_HOLDING = [
  { title: "Winner: Gold Medal, San Francisco World Spirits Awards 2024", variant: "Signature Release" },
  { title: "Double Gold, The Global Spirits Masters 2023", variant: "Harvest 2019" },
  { title: "Best in Class, International Wine & Spirit Competition 2023", variant: "Core Range" },
  { title: "Winner: Design & Packaging Award 2024", variant: "Full Range" },
];

export function BrandDetailClient({ initialBrand }: { initialBrand: Brand }) {
  const router = useRouter();
  const [brand, setBrand] = useState<Brand>(initialBrand);
  const { brands } = useBrands();
  const [currentIdx, setCurrentIdx] = useState(0);
  const [returnTo, setReturnTo] = useState<{ url: string; label: string } | null>(null);
  const [serveSeason, setServeSeason] = useState<"spring-summer" | "autumn-winter">("spring-summer");

  useEffect(() => {
    const live = brands.find((b) => b.slug === initialBrand.slug);
    if (live) setBrand(live);
  }, [brands, initialBrand.slug]);

  // Honour a return context (e.g. set by "Discover More" in a presentation) so Back
  // returns to the exact slide the user came from, instead of relying on tab history.
  useEffect(() => {
    if (typeof window !== "undefined") {
      const url = sessionStorage.getItem("ghf_return_to");
      const label = sessionStorage.getItem("ghf_return_label") || "Back";
      if (url) setReturnTo({ url, label });
    }
  }, []);

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

  const local = getBrandImages(brand.slug);
  const videoUrl = getBrandVideo(brand.slug);
  const storyText = getBrandStory(brand.slug, brand.story?.description || brand.tagline);
  
  // Resolve support options
  const supportOptions = getBrandSupportOptions(brand.slug);
  const firstSupportSlug = supportOptions?.[0]?.slug || "rotating-cocktail";

  // Build carousel images
  const carouselImages = [
    local?.hero,
    local?.lifestyle?.[0],
    local?.lifestyle?.[1],
    local?.lifestyle?.[2],
    local?.variants?.[0]
  ].filter(Boolean) as string[];

  // Auto-playing carousel effect
  useEffect(() => {
    if (carouselImages.length <= 1) return;
    const interval = setInterval(() => {
      setCurrentIdx((prev) => (prev + 1) % carouselImages.length);
    }, 5000);
    return () => clearInterval(interval);
  }, [carouselImages]);

  // Section 3: Serves (spirits brands only)
  const isSpirits = brand.category?.toLowerCase() === "spirits";
  const tastingNotes = getTastingNotesForBrand(brand.slug);
  const allServes = tastingNotes.flatMap(note => note.serves || []);
  const uniqueServes = allServes.filter((serve, index, self) =>
    self.findIndex(s => s.name === serve.name) === index
  );
  
  // Pad serves to exactly 3 items
  const displayServes = [...uniqueServes];
  const defaultDescriptions = [
    "A clean, crisp showcase that accents the bright botanical complexity.",
    "Sophisticated and aromatic, bringing out the deep, rich undertones of the spirit.",
    "A refreshing, modern twist perfect for warm afternoons or casual celebrations."
  ];
  while (displayServes.length < 3) {
    const idx = displayServes.length;
    displayServes.push({
      name: idx === 0 ? "Signature Highball" : idx === 1 ? "Classic Serve" : "Bespoke Spritz",
      ingredients: ["50ml Spirit", "Top with premium mixer", "Fresh botanical garnish"],
      description: defaultDescriptions[idx]
    } as any);
  }

  // Season-split serves (Serve Inspiration data). When present, the serves section
  // gets a Spring/Summer ↔ Autumn/Winter toggle; otherwise it falls back to the
  // tasting-note serves above. Normalised to a common {name, lines, note} shape.
  const brandServeVariants = SERVES_DATA.filter((v) => v.brandSlug === brand.slug);
  const hasSeasonServes = brandServeVariants.length > 0;
  const servesToShow: { name: string; lines: string[]; note: string }[] = hasSeasonServes
    ? (serveSeason === "spring-summer"
        ? brandServeVariants.flatMap((v) => v.springSummer)
        : brandServeVariants.flatMap((v) => v.autumnWinter)
      )
        .slice(0, 3)
        .map((s) => ({ name: s.name, lines: s.flavourDescriptors, note: s.recipe }))
    : displayServes.slice(0, 3).map((s) => ({
        name: s.name,
        lines: s.ingredients,
        note: (s as any).description || "A pristine serve crafted to accentuate the premium distillates.",
      }));

  return (
    <div style={{ backgroundColor: "var(--background)" }} className="min-h-screen pb-20">

      {/* 1. BRAND VIDEO */}
      <section className="relative w-full aspect-[16/9] bg-[var(--muted)] overflow-hidden border-b border-[var(--border)]/20">
        {/* Back Button overlay */}
        <div className="absolute top-6 left-6 z-20">
          <button
            onClick={handleBack}
            className="flex items-center gap-2 px-4 py-2 rounded-full bg-black/40 hover:bg-black/60 border border-[var(--border)]/20 text-xs tracking-widest uppercase text-[var(--pearl)] hover:text-[var(--sage)] hover:border-[var(--sage)] transition-all cursor-pointer"
          >
            ← {returnTo ? returnTo.label : "Back"}
          </button>
        </div>

        {videoUrl ? (
          <video 
            controls 
            poster={local?.hero || brand.heroImage?.url || ""} 
            className="w-full h-full object-cover"
          >
            <source src={videoUrl} type="video/mp4" />
          </video>
        ) : (
          <div className="absolute inset-0 flex flex-col items-center justify-center bg-[var(--card)] p-6">
            {local?.logo ? (
              <img
                src={local.logo}
                alt={brand.name}
                className="max-h-24 max-w-[280px] object-contain opacity-90 select-none mb-6"
              />
            ) : (
              <h1 className="text-4xl font-light tracking-widest uppercase text-[var(--cream)]/70 mb-4">
                {brand.name}
              </h1>
            )}
            <span className="text-xs tracking-[0.25em] uppercase text-[var(--sage)] font-bold">
              Brand film coming soon
            </span>
          </div>
        )}
      </section>

      {/* 2. STORY */}
      <section className="py-24 px-6 md:px-14 max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
        {/* Left: Carousel */}
        <div className="w-full aspect-[4/3] relative rounded-2xl overflow-hidden border border-[var(--border)]/20 bg-[var(--muted)] shadow-2xl">
          {carouselImages.length > 0 ? (
            carouselImages.map((src, idx) => (
              <img
                key={src}
                src={src}
                alt=""
                className="absolute inset-0 w-full h-full object-cover transition-opacity duration-700 ease-in-out"
                style={{ opacity: idx === currentIdx ? 1 : 0 }}
              />
            ))
          ) : (
            <div className="absolute inset-0 bg-[var(--card)]" />
          )}
          {carouselImages.length > 1 && (
            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2 z-10">
              {carouselImages.map((_, idx) => (
                <div
                  key={idx}
                  className="w-1.5 h-1.5 rounded-full transition-all"
                  style={{
                    backgroundColor: idx === currentIdx ? "var(--cream)" : "var(--sage)",
                    opacity: idx === currentIdx ? 1 : 0.4
                  }}
                />
              ))}
            </div>
          )}
        </div>

        {/* Right: Text Content */}
        <div className="space-y-6">
          <span className="text-[10px] tracking-[0.35em] uppercase text-[var(--sage)] font-bold block">
            Our Story
          </span>
          <h2 className="text-4xl font-light tracking-tight text-[var(--cream)]">
            {brand.name}
          </h2>
          <p className="text-sm leading-relaxed text-[var(--foreground)]/90">
            {storyText}
          </p>
          {brand.bcorp && (
            <div className="pt-2">
              <img
                src="/b-corp-logo.svg"
                alt="Certified B Corporation"
                className="w-10 h-[60px] object-contain"
              />
            </div>
          )}
        </div>
      </section>

      {/* 3. SERVES (Spirits only) */}
      {isSpirits && (
        <section className="py-20 bg-[var(--card)]/30 border-y border-[var(--border)]/20">
          <div className="max-w-6xl mx-auto px-6 md:px-14">
            <div className="mb-8 flex flex-col md:flex-row md:items-end md:justify-between gap-4">
              <div>
                <span className="text-[10px] tracking-[0.35em] uppercase text-[var(--sage)] font-bold block mb-1">
                  Signature Serves
                </span>
                <h2 className="text-4xl font-light tracking-tight text-[var(--cream)]">
                  How to Serve
                </h2>
              </div>
              {/* Season switch — slide between Spring/Summer and Autumn/Winter serves */}
              {hasSeasonServes && (
                <div className="inline-flex items-center gap-3 self-start md:self-auto">
                  <span
                    className={`text-xs font-bold uppercase tracking-wider transition-colors ${
                      serveSeason === "spring-summer" ? "text-[var(--foreground)]" : "text-[var(--foreground)]/40"
                    }`}
                  >
                    Spring / Summer
                  </span>
                  <button
                    role="switch"
                    aria-checked={serveSeason === "autumn-winter"}
                    aria-label="Toggle between Spring/Summer and Autumn/Winter serves"
                    onClick={() =>
                      setServeSeason(serveSeason === "spring-summer" ? "autumn-winter" : "spring-summer")
                    }
                    className="relative w-14 h-7 rounded-full border border-[var(--border)] bg-[var(--card)] transition-colors cursor-pointer flex-shrink-0"
                  >
                    <span
                      className="absolute top-0.5 left-0.5 w-6 h-6 rounded-full bg-[var(--sage)] shadow-md transition-transform duration-300 ease-out"
                      style={{
                        transform: serveSeason === "autumn-winter" ? "translateX(28px)" : "translateX(0)",
                      }}
                    />
                  </button>
                  <span
                    className={`text-xs font-bold uppercase tracking-wider transition-colors ${
                      serveSeason === "autumn-winter" ? "text-[var(--foreground)]" : "text-[var(--foreground)]/40"
                    }`}
                  >
                    Autumn / Winter
                  </span>
                </div>
              )}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {servesToShow.map((serve, idx) => (
                <div
                  key={idx}
                  className="border border-[var(--border)]/20 rounded-2xl p-6 bg-[var(--card)] flex flex-col justify-between h-full shadow-lg hover:border-[var(--sage)]/20 transition-all duration-300"
                >
                  <div className="space-y-4">
                    {/* Image Area Placeholder */}
                    <div className="w-full aspect-[16/9] rounded-lg bg-[var(--background)] border border-[var(--border)]/20 flex flex-col items-center justify-center text-[var(--sage)]/40 text-[9px] tracking-[0.2em] uppercase p-4">
                      <svg className="w-6 h-6 mb-2 text-[var(--sage)]/30" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M12 2v20m0-20H6a6 6 0 000 12h6M12 2h6a6 6 0 010 12h-6" />
                      </svg>
                      {serve.name}
                    </div>
                    <h3 className="text-base font-semibold text-[var(--cream)] tracking-wide">{serve.name}</h3>
                    <ul className="text-xs text-[var(--foreground)]/80 space-y-1.5 pt-2">
                      {serve.lines.map((line, i) => (
                        <li key={i} className="flex items-start gap-2">
                          <span className="text-[var(--sage)]">•</span>
                          <span>{line}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div className="pt-6 mt-6 border-t border-[var(--border)]/20">
                    <p className="text-xs text-[var(--sage)] italic leading-relaxed">
                      {serve.note}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* 4. ACTIVATIONS */}
      {brand.activations?.length ? (
        <section className="border-b border-[var(--border)]/20">
          <BrandActivationSlide brand={brand} isWebPage={true} />
        </section>
      ) : null}

      {/* 4b. AWARDS & RECOGNITION — horizontally scrolling square tiles (holding content) */}
      <section className="py-20 border-b border-[var(--border)]/20">
        <div className="max-w-6xl mx-auto px-6 md:px-14">
          <div className="mb-8">
            <span className="text-[10px] tracking-[0.35em] uppercase text-[var(--sage)] font-bold block mb-1">
              Recognition
            </span>
            <h2 className="text-4xl font-light tracking-tight text-[var(--cream)]">
              Awards &amp; Recognition
            </h2>
          </div>
          <div className="flex gap-5 overflow-x-auto pb-4 scrollbar-hide">
            {AWARDS_HOLDING.map((award, idx) => (
              <div
                key={idx}
                className="flex-shrink-0 w-56 aspect-square rounded-2xl border border-[var(--border)]/30 bg-[var(--card)] p-6 flex flex-col justify-between shadow-md hover:border-[var(--sage)]/40 transition-all"
              >
                <svg className="w-8 h-8 text-[var(--sage)]" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="1.5">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M16.5 18.75h-9m9 0a3 3 0 013 3h-15a3 3 0 013-3m9 0v-3.375c0-.621-.503-1.125-1.125-1.125h-.871M7.5 18.75v-3.375c0-.621.504-1.125 1.125-1.125h.872m5.007 0H9.497m5.007 0a7.454 7.454 0 01-.982-3.172M9.497 14.25a7.454 7.454 0 00.981-3.172M5.25 4.236c-.982.143-1.954.317-2.916.52A6.003 6.003 0 007.73 9.728M5.25 4.236V4.5c0 2.108.966 3.99 2.48 5.228M5.25 4.236V2.721C7.456 2.41 9.71 2.25 12 2.25c2.291 0 4.545.16 6.75.47v1.516M7.73 9.728a6.726 6.726 0 002.748 1.35m8.272-6.842V4.5c0 2.108-.966 3.99-2.48 5.228m2.48-5.492a46.32 46.32 0 012.916.52 6.003 6.003 0 01-5.395 4.972m0 0a6.726 6.726 0 01-2.749 1.35m0 0a6.772 6.772 0 01-3.044 0" />
                </svg>
                <div>
                  <p className="text-sm font-semibold text-[var(--cream)] leading-snug">{award.title}</p>
                  {award.variant && (
                    <p className="text-xs text-[var(--muted-foreground)] mt-1.5">{award.variant}</p>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 5. BOTTOM TABS */}
      <section className="py-24 max-w-6xl mx-auto px-6 md:px-14">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Link 
            href={`/resources/case-studies/${brand.slug}`}
            className="group flex flex-col justify-center items-center h-32 rounded-2xl border border-[var(--sage)] bg-[var(--card)] shadow-xl transition-all duration-300 hover:bg-[var(--sage)] cursor-pointer"
          >
            <span className="text-xs tracking-[0.25em] uppercase font-bold text-[var(--cream)] group-hover:text-[var(--background)] transition-colors">
              Case Studies
            </span>
            <span className="text-[10px] text-[var(--sage)] group-hover:text-[var(--background)]/80 transition-colors mt-2 uppercase tracking-widest">
              Explore success stories →
            </span>
          </Link>

          <Link 
            href={`/tasting-notes?brand=${brand.slug}`}
            className="group flex flex-col justify-center items-center h-32 rounded-2xl border border-[var(--sage)] bg-[var(--card)] shadow-xl transition-all duration-300 hover:bg-[var(--sage)] cursor-pointer"
          >
            <span className="text-xs tracking-[0.25em] uppercase font-bold text-[var(--cream)] group-hover:text-[var(--background)] transition-colors">
              Tasting Notes
            </span>
            <span className="text-[10px] text-[var(--sage)] group-hover:text-[var(--background)]/80 transition-colors mt-2 uppercase tracking-widest">
              Detailed specifications →
            </span>
          </Link>

          <Link 
            href={`/support/${brand.slug}/${firstSupportSlug}`}
            className="group flex flex-col justify-center items-center h-32 rounded-2xl border border-[var(--sage)] bg-[var(--card)] shadow-xl transition-all duration-300 hover:bg-[var(--sage)] cursor-pointer"
          >
            <span className="text-xs tracking-[0.25em] uppercase font-bold text-[var(--cream)] group-hover:text-[var(--background)] transition-colors">
              Promotions & Support
            </span>
            <span className="text-[10px] text-[var(--sage)] group-hover:text-[var(--background)]/80 transition-colors mt-2 uppercase tracking-widest">
              Access support options →
            </span>
          </Link>
        </div>
      </section>

    </div>
  );
}
