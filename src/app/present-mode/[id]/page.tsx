"use client";

import React, { useEffect, useState, useCallback, useRef } from "react";
import { useParams, useRouter } from "next/navigation";
import { usePresentation } from "@/lib/presentation-store";
import { useBrands } from "@/hooks/useBrands";
import { BrandIntroSlide } from "@/components/brand/BrandIntroSlide";
import { BrandActivationSlide } from "@/components/brand/BrandActivationSlide";
import { ClosingSlide } from "@/components/presentation/ClosingSlide";
import { Brand } from "@/types/brand";
import { Presentation } from "@/types/presentation";
import { mockBrands } from "@/data/brands";
import { PACKAGE_PRESENTATIONS, PACKAGE_LABELS, getPackageBrandSlugs } from "@/data/package-presentations";

export default function PresentModePage() {
  const { id } = useParams<{ id: string }>();
  const router = useRouter();
  const { savedPresentations } = usePresentation();
  const { brands } = useBrands();

  const [slideIndex, setSlideIndex] = useState(0);
  // Slides never advance on their own — the presenter drives navigation manually.
  // The play button is still available for anyone who wants timed auto-play.
  const [isPlaying, setIsPlaying] = useState(false);
  // Gate the first paint until we've resolved the resume slide (from ?slide= or
  // sessionStorage). Without this the view renders slide 0 (the first brand) for
  // one frame before jumping to the real slide — the "wrong brand flash".
  const [resumeResolved, setResumeResolved] = useState(false);

  // Resolve the presentation: a saved one by id, otherwise build an ephemeral
  // presentation on the fly from a package/category slug (e.g. "crafted-and-discerning").
  const presentation = React.useMemo<Presentation | undefined>(() => {
    const saved = savedPresentations.find((p) => p.id === id);
    if (saved) return saved;

    // Only build for a recognised package slug.
    if (!PACKAGE_PRESENTATIONS[id]) return undefined;

    const source = brands.length > 0 ? brands : mockBrands;
    // Membership resolves from admin-assigned packages (category from brand.category),
    // falling back to the static mapping.
    const packageSlugs = getPackageBrandSlugs(id, source);
    const brandIds = packageSlugs
      .map((slug) => source.find((b) => b.slug === slug)?.id)
      .filter((x): x is string => Boolean(x));

    return {
      id,
      name: PACKAGE_LABELS[id] ?? id,
      dateCreated: "",
      brands: brandIds,
      slides: [],
    };
  }, [savedPresentations, brands, id]);

  // Build ordered slide list:
  // For each brand, include intro and activation, then append closing slide
  const slides = presentation
    ? (() => {
        const availableBrands = brands.length > 0 ? brands : mockBrands;
        const list: { brand?: Brand; type: "intro" | "activation" | "closing" }[] = [];

        // If saved presentation has a slides array, map it
        if (presentation.slides && presentation.slides.length > 0) {
          presentation.slides.forEach((slide) => {
            const brand = availableBrands.find((b) => b.id === slide.brandId);
            if (brand) {
              if (slide.type === "intro") {
                list.push({ brand, type: "intro" });
              } else if (slide.type === "activation") {
                list.push({ brand, type: "activation" });
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
              list.push({ brand, type: "activation" });
            }
          });
        }

        // Append the final closing slide
        list.push({ type: "closing" });

        return list;
      })()
    : [];

  const total = slides.length;
  // Clamp so a stale resume target (e.g. slide count shrank) can never leave the
  // view stuck on an undefined slide.
  const safeIndex = total > 0 ? Math.min(Math.max(slideIndex, 0), total - 1) : 0;
  const current = slides[safeIndex];

  const goNext = useCallback(() => {
    setSlideIndex((i) => Math.min(i + 1, total - 1));
  }, [total]);

  const goPrev = useCallback(() => {
    setSlideIndex((i) => Math.max(i - 1, 0));
  }, []);

  const exit = useCallback(() => {
    // Leaving the presentation entirely — forget the resume point so the next
    // launch from a home tile starts fresh at slide 0.
    if (typeof window !== "undefined") sessionStorage.removeItem(`ghf_present_slide_${id}`);
    router.push("/");
  }, [router, id]);

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

  // On entry, resume where the user left: an explicit ?slide=N (deep link) wins,
  // otherwise the last slide viewed for THIS presentation (covers every return
  // path — tasting notes, brand pages, support, case studies, activations…).
  // A fresh launch from a home tile has no stored slide, so it starts at 0.
  useEffect(() => {
    const param = new URLSearchParams(window.location.search).get("slide");
    let target: number | null = null;
    if (param !== null) {
      const n = parseInt(param, 10);
      if (Number.isFinite(n) && n >= 0) target = n;
    } else {
      const stored = sessionStorage.getItem(`ghf_present_slide_${id}`);
      if (stored !== null) {
        const n = parseInt(stored, 10);
        if (Number.isFinite(n) && n >= 0) target = n;
      }
    }
    if (target !== null) {
      setSlideIndex(target);
      setIsPlaying(false); // land where they left, paused
    }
    // Resume point resolved (whether or not one was found) — safe to paint now.
    setResumeResolved(true);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Persist the current slide so any return path can restore it. Skip the very
  // first run so the initial 0 doesn't clobber a stored resume point.
  const persistReady = useRef(false);
  useEffect(() => {
    if (!persistReady.current) {
      persistReady.current = true;
      return;
    }
    if (typeof window !== "undefined") {
      sessionStorage.setItem(`ghf_present_slide_${id}`, String(slideIndex));
    }
  }, [id, slideIndex]);

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
            style={{ color: "var(--sage)" }}
          >
            Back to Home
          </button>
        </div>
      </div>
    );
  }

  // Hold the first paint on a neutral backdrop until the resume slide is resolved,
  // so we never flash slide 0 (the wrong brand) before jumping to the real slide.
  if (!resumeResolved || total === 0 || !current) {
    return (
      <div className="flex items-center justify-center h-screen" style={{ backgroundColor: "var(--background)" }}>
        {total === 0 && resumeResolved ? (
          <p style={{ color: "var(--muted-foreground)" }}>Loading slides...</p>
        ) : null}
      </div>
    );
  }

  return (
    <div className="relative h-screen w-screen overflow-hidden" style={{ backgroundColor: "var(--background)" }}>

      {/* Presentation Name */}
      <div className="absolute top-4 left-6 z-50 pointer-events-none">
        <span className="text-[10px] tracking-[0.25em] uppercase text-[var(--cream)]/80 font-medium font-mono">
          {presentation.name}
        </span>
      </div>

      {/* Slide content */}
      {current.type === "intro" && current.brand ? (
        <BrandIntroSlide brand={current.brand} slideIndex={slideIndex} />
      ) : current.type === "activation" && current.brand ? (
        <BrandActivationSlide brand={current.brand} slideIndex={slideIndex} />
      ) : (
        <ClosingSlide />
      )}

      {/* Navigation overlay */}
      <div className="absolute bottom-0 left-0 right-0 flex items-center justify-between px-6 py-3 z-50"
           style={{ backgroundColor: "rgba(13,47,27,0.95)", borderTop: "1px solid var(--sage)", backdropFilter: "blur(8px)" }}>

        {/* Exit & Logo */}
        <div className="flex items-center gap-4">
          <img
            src="/ghf-logo-light.png"
            alt="GHF"
            className="w-8 h-8 object-contain"
          />
          <button
            onClick={exit}
            className="text-xs tracking-widest uppercase hover:text-[var(--sage)] transition-colors"
            style={{ color: "var(--sage)" }}
          >
            ✕ Exit
          </button>
        </div>

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
                    ? "var(--sage)"
                    : "rgba(134,166,143,0.3)",
              }}
            />
          ))}
        </div>

        {/* Arrows */}
        <div className="flex items-center gap-4">
          <button
            onClick={goPrev}
            disabled={slideIndex === 0}
            className="text-xs tracking-widest uppercase disabled:opacity-30 hover:opacity-80 transition-colors"
            style={{ color: "var(--sage)" }}
          >
            ← Prev
          </button>

          {/* Slideshow Play/Pause Toggle */}
          <button
            onClick={() => setIsPlaying(!isPlaying)}
            className="w-8 h-8 rounded-full border flex items-center justify-center hover:scale-105 active:scale-95 transition-all bg-transparent"
            title={isPlaying ? "Pause Slideshow" : "Play Slideshow"}
            style={{ color: "var(--sage)", borderColor: "var(--sage)" }}
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
            style={{ color: "var(--sage)" }}
          >
            {slideIndex + 1} / {total}
          </span>
          
          <button
            onClick={goNext}
            disabled={slideIndex === total - 1}
            className="text-xs tracking-widest uppercase disabled:opacity-30 hover:opacity-80 transition-colors"
            style={{ color: "var(--sage)" }}
          >
            Next →
          </button>
        </div>
      </div>
    </div>
  );
}
