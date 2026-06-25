"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Brand } from "@/types/brand";
import { useBrands } from "@/hooks/useBrands";
import { getBrandImages } from "@/lib/brand-images";
import { getTastingNotesForBrand } from "@/data/tasting-notes";
import { BrandActivationSlide } from "./BrandActivationSlide";
import { getBrandVideo } from "@/data/brand-videos";
import { getBrandStory } from "@/data/brand-stories";
import { getBrandSupportOptions } from "@/data/brand-support";

export function BrandDetailClient({ initialBrand }: { initialBrand: Brand }) {
  const router = useRouter();
  const [brand, setBrand] = useState<Brand>(initialBrand);
  const { brands } = useBrands();
  const [currentIdx, setCurrentIdx] = useState(0);

  useEffect(() => {
    const live = brands.find((b) => b.slug === initialBrand.slug);
    if (live) setBrand(live);
  }, [brands, initialBrand.slug]);

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
    }, 4500);
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

  return (
    <div style={{ backgroundColor: "var(--background)" }} className="min-h-screen pb-20">

      {/* 1. BRAND VIDEO */}
      <section className="relative w-full aspect-[16/9] bg-[var(--muted)] overflow-hidden border-b border-[var(--border)]/20">
        {/* Back Button overlay */}
        <div className="absolute top-6 left-6 z-20">
          <button 
            onClick={() => router.back()} 
            className="flex items-center gap-2 px-4 py-2 rounded-full bg-black/40 hover:bg-black/60 border border-[var(--border)]/20 text-xs tracking-widest uppercase text-[var(--cream)] hover:text-[var(--sage)] hover:border-[var(--sage)] transition-all cursor-pointer"
          >
            ← Back
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
                className="max-h-20 max-w-[280px] object-contain opacity-30 select-none mb-6" 
              />
            ) : (
              <h1 className="text-4xl font-light tracking-widest uppercase text-[var(--cream)]/30 mb-4">
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
              <span className="inline-block text-[9px] font-bold tracking-widest uppercase border border-[var(--sage)] text-[var(--sage)] px-3.5 py-1.5 rounded-full bg-[var(--sage)]/5">
                Certified B Corporation
              </span>
            </div>
          )}
        </div>
      </section>

      {/* 3. SERVES (Spirits only) */}
      {isSpirits && (
        <section className="py-20 bg-[var(--card)]/30 border-y border-[var(--border)]/20">
          <div className="max-w-6xl mx-auto px-6 md:px-14">
            <div className="mb-12">
              <span className="text-[10px] tracking-[0.35em] uppercase text-[var(--sage)] font-bold block mb-1">
                Signature Serves
              </span>
              <h2 className="text-4xl font-light tracking-tight text-[var(--cream)]">
                How to Serve
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {displayServes.slice(0, 3).map((serve, idx) => (
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
                      {serve.ingredients.map((ing, i) => (
                        <li key={i} className="flex items-start gap-2">
                          <span className="text-[var(--sage)]">•</span>
                          <span>{ing}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div className="pt-6 mt-6 border-t border-[var(--border)]/20">
                    <p className="text-xs text-[var(--sage)] italic leading-relaxed">
                      {(serve as any).description || "A pristine serve crafted to accentuate the premium distillates."}
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

      {/* 5. BOTTOM TABS */}
      <section className="py-24 max-w-6xl mx-auto px-6 md:px-14">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Link 
            href="/case-studies/prestige"
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
