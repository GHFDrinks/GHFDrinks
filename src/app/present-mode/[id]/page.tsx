"use client";

import React, { useEffect, useState, useCallback } from "react";
import { useParams, useRouter } from "next/navigation";
import { usePresentation } from "@/lib/presentation-store";
import { useBrands } from "@/hooks/useBrands";
import { BrandIntroSlide } from "@/components/brand/BrandIntroSlide";
import { BrandActivationSlide } from "@/components/brand/BrandActivationSlide";
import { Brand } from "@/types/brand";
import { mockBrands } from "@/data/brands";

export default function PresentModePage() {
  const { id } = useParams<{ id: string }>();
  const router = useRouter();
  const { savedPresentations } = usePresentation();
  const { brands } = useBrands();

  const [slideIndex, setSlideIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);

  const presentation = savedPresentations.find((p) => p.id === id);

  // Build ordered slide list:
  // For each brand, include intro, and include activation ONLY if the brand has activations
  const slides = presentation
    ? (() => {
        const availableBrands = brands.length > 0 ? brands : mockBrands;
        const list: { brand: Brand; type: "intro" | "activation" }[] = [];

        // If saved presentation has a slides array, map it
        if (presentation.slides && presentation.slides.length > 0) {
          presentation.slides.forEach((slide) => {
            const brand = availableBrands.find((b) => b.id === slide.brandId);
            if (brand) {
              if (slide.type === "intro") {
                list.push({ brand, type: "intro" });
              } else if (slide.type === "activation") {
                if (brand.activations && brand.activations.length > 0) {
                  list.push({ brand, type: "activation" });
                }
              }
            }
          });
        }

        // Compatibility fallback: if slides list is still empty, build from brand IDs
        if (list.length === 0) {
          presentation.brands.forEach((brandId) => {
            const brand = availableBrands.find((b) => b.id === brandId);
            if (brand) {
              list.push({ brand, type: "intro" });
              if (brand.activations && brand.activations.length > 0) {
                list.push({ brand, type: "activation" });
              }
            }
          });
        }

        return list;
      })()
    : [];

  const total = slides.length;
  const current = slides[slideIndex];

  const goNext = useCallback(() => {
    setSlideIndex((i) => Math.min(i + 1, total - 1));
  }, [total]);

  const goPrev = useCallback(() => {
    setSlideIndex((i) => Math.max(i - 1, 0));
  }, []);

  const exit = useCallback(() => {
    router.push("/presentations");
  }, [router]);

  // Slideshow auto-play effect
  useEffect(() => {
    if (!isPlaying || total === 0) return;

    const timer = setInterval(() => {
      setSlideIndex((prevIndex) => {
        if (prevIndex === total - 1) {
          return 0; // Wrap back to the beginning
        }
        return prevIndex + 1;
      });
    }, 4500); // 4.5 seconds per slide

    return () => clearInterval(timer);
  }, [isPlaying, total]);

  // Keyboard navigation
  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      if (e.key === "ArrowRight" || e.key === " ") goNext();
      if (e.key === "ArrowLeft") goPrev();
      if (e.key === "Escape") exit();
    }
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [goNext, goPrev, exit]);

  if (!presentation) {
    return (
      <div className="flex items-center justify-center h-screen" style={{ backgroundColor: "var(--background)" }}>
        <div className="text-center">
          <p
            className="text-lg mb-4"
            style={{ color: "var(--muted-foreground)" }}
          >
            Presentation not found.
          </p>
          <button
            onClick={exit}
            className="text-sm underline"
            style={{ color: "var(--gold)" }}
          >
            Back to Presentations
          </button>
        </div>
      </div>
    );
  }

  if (total === 0 || !current) {
    return (
      <div className="flex items-center justify-center h-screen" style={{ backgroundColor: "var(--background)" }}>
        <p style={{ color: "var(--muted-foreground)" }}>Loading slides...</p>
      </div>
    );
  }

  return (
    <div className="relative h-screen w-screen overflow-hidden" style={{ backgroundColor: "var(--background)" }}>

      {/* Slide content */}
      {current.type === "intro" ? (
        <BrandIntroSlide brand={current.brand} />
      ) : (
        <BrandActivationSlide brand={current.brand} />
      )}

      {/* Navigation overlay */}
      <div className="absolute bottom-0 left-0 right-0 flex items-center justify-between px-6 py-3 z-50"
           style={{ backgroundColor: "rgba(11,19,16,0.95)", borderTop: "1px solid var(--border)", backdropFilter: "blur(8px)" }}>

        {/* Exit */}
        <button
          onClick={exit}
          className="text-xs tracking-widest uppercase hover:text-[var(--gold)] transition-colors"
          style={{ color: "var(--muted-foreground)" }}
        >
          ✕ Exit
        </button>

        {/* Progress */}
        <div className="flex items-center gap-2">
          {slides.map((_, i) => (
            <button
              key={i}
              onClick={() => setSlideIndex(i)}
              className="rounded-full transition-all"
              style={{
                width: i === slideIndex ? "20px" : "6px",
                height: "6px",
                backgroundColor:
                  i === slideIndex
                    ? "var(--gold)"
                    : "var(--border)",
              }}
            />
          ))}
        </div>

        {/* Arrows */}
        <div className="flex items-center gap-4">
          <button
            onClick={goPrev}
            disabled={slideIndex === 0}
            className="text-xs tracking-widest uppercase disabled:opacity-30 hover:text-[var(--gold)] transition-colors"
            style={{ color: "var(--gold)" }}
          >
            ← Prev
          </button>

          {/* Slideshow Play/Pause Toggle */}
          <button
            onClick={() => setIsPlaying(!isPlaying)}
            className="w-8 h-8 rounded-full border border-[var(--border)] flex items-center justify-center hover:border-[var(--gold)] hover:text-[var(--gold)] hover:scale-105 active:scale-95 transition-all bg-[var(--card)]"
            title={isPlaying ? "Pause Slideshow" : "Play Slideshow"}
            style={{ color: isPlaying ? "var(--gold)" : "var(--muted-foreground)" }}
          >
            {isPlaying ? (
              <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24">
                <path d="M6 19h4V5H6v14zm8-14v14h4V5h-4z" />
              </svg>
            ) : (
              <svg className="w-3.5 h-3.5 fill-current ml-0.5" viewBox="0 0 24 24">
                <path d="M8 5v14l11-7z" />
              </svg>
            )}
          </button>

          <span
            className="text-xs"
            style={{ color: "var(--muted-foreground)" }}
          >
            {slideIndex + 1} / {total}
          </span>
          
          <button
            onClick={goNext}
            disabled={slideIndex === total - 1}
            className="text-xs tracking-widest uppercase disabled:opacity-30 hover:text-[var(--gold)] transition-colors"
            style={{ color: "var(--gold)" }}
          >
            Next →
          </button>
        </div>
      </div>
    </div>
  );
}
