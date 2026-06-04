"use client";

import React, { useEffect, useState, useCallback } from "react";
import { useParams, useRouter } from "next/navigation";
import { usePresentation } from "@/lib/presentation-store";
import { useBrands } from "@/hooks/useBrands";
import { BrandIntroSlide } from "@/components/brand/BrandIntroSlide";
import { BrandActivationSlide } from "@/components/brand/BrandActivationSlide";
import { Brand } from "@/types/brand";

export default function PresentModePage() {
  const { id } = useParams<{ id: string }>();
  const router = useRouter();
  const { savedPresentations } = usePresentation();
  const { brands } = useBrands();

  const [slideIndex, setSlideIndex] = useState(0);

  const presentation = savedPresentations.find((p) => p.id === id);

  // Build ordered slide list: for each brand, intro then activation
  const slides = presentation
    ? presentation.brands.flatMap((brandId) => {
        const brand = brands.find((b) => b.id === brandId);
        if (!brand) return [];
        return [
          { brand, type: "intro" as const },
          { brand, type: "activation" as const },
        ];
      })
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
      <div className="flex items-center justify-center h-screen bg-white">
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
            style={{ color: "var(--accent)" }}
          >
            Back to Presentations
          </button>
        </div>
      </div>
    );
  }

  if (total === 0 || !current) {
    return (
      <div className="flex items-center justify-center h-screen bg-white">
        <p style={{ color: "var(--muted-foreground)" }}>Loading slides...</p>
      </div>
    );
  }

  return (
    <div className="relative h-screen w-screen overflow-hidden bg-white">

      {/* Slide content */}
      {current.type === "intro" ? (
        <BrandIntroSlide brand={current.brand} />
      ) : (
        <BrandActivationSlide brand={current.brand} />
      )}

      {/* Navigation overlay */}
      <div className="absolute bottom-0 left-0 right-0 flex items-center justify-between px-6 py-3 z-50"
           style={{ backgroundColor: "rgba(255,255,255,0.9)", borderTop: "1px solid var(--border)" }}>

        {/* Exit */}
        <button
          onClick={exit}
          className="text-xs tracking-widest uppercase"
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
                    ? "var(--accent)"
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
            className="text-xs tracking-widest uppercase disabled:opacity-30"
            style={{ color: "var(--accent)" }}
          >
            ← Prev
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
            className="text-xs tracking-widest uppercase disabled:opacity-30"
            style={{ color: "var(--accent)" }}
          >
            Next →
          </button>
        </div>
      </div>
    </div>
  );
}
