"use client";

import React, { useState, useEffect, useCallback } from "react";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { usePresentationStore } from "@/lib/presentation-store";
import { mockBrands } from "@/data/brands";
import { X, ChevronLeft, ChevronRight } from "lucide-react";
import { SlideType } from "@/types/presentation";
import { RevealAnimation } from "@/components/experience/RevealAnimation";
import { SwipeSlideNavigator } from "@/components/tablet/SwipeSlideNavigator";
import { TabletPresentationDock } from "@/components/tablet/TabletPresentationDock";
import { useBrands } from "@/hooks/useBrands";
import { Brand } from "@/types/brand";
import { getBrandImages } from "@/lib/brand-images";

// Simplified generic components for the presentation mode slide renderer
// Real implementation would reuse the actual components but wrapped for 100vh layout

function SlideRenderer({ brandId, type, brands }: { brandId: string, type: SlideType, brands: Brand[] }) {
  const brand = brands.find(b => b.id === brandId || b.slug === brandId) || mockBrands.find(b => b.id === brandId || b.slug === brandId);
  if (!brand) return null;

  switch (type) {
    case "intro":
      return (
        <div className="w-full h-full relative flex flex-col justify-end p-24 text-white overflow-hidden">
          {(() => {
            const local = getBrandImages(brand.slug);
            const imgSrc = brand.heroImage.url || local?.hero || "";
            return imgSrc ? (
              <motion.img 
                initial={{ scale: 1.1 }}
                animate={{ scale: 1 }}
                transition={{ duration: 1.5, ease: [0.16, 1, 0.3, 1] }}
                src={imgSrc} 
                alt="" 
                className="absolute inset-0 w-full h-full object-cover opacity-60" 
              />
            ) : null;
          })()}
          <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent" />
          <div className="relative z-10 max-w-4xl">
            <RevealAnimation direction="up" delay={0.2}>
              <span className="text-accent tracking-widest uppercase mb-4 block font-medium">{brand.category}</span>
            </RevealAnimation>
            <RevealAnimation direction="up" delay={0.3}>
              <h1 className="text-8xl font-light mb-6 uppercase tracking-tight drop-shadow-2xl">{brand.name}</h1>
            </RevealAnimation>
            <RevealAnimation direction="up" delay={0.4}>
              <p className="text-4xl font-serif italic text-white/80 drop-shadow-xl">{brand.tagline}</p>
            </RevealAnimation>
          </div>
        </div>
      );
    case "tasting":
      return (
        <div className="w-full h-full bg-[#0a0a0a] flex items-center p-24 overflow-hidden">
          <div className="max-w-7xl w-full mx-auto grid grid-cols-2 gap-24">
            <div className="flex flex-col justify-center">
              <RevealAnimation direction="up" delay={0.2}>
                <h2 className="text-sm tracking-widest uppercase text-accent font-medium mb-4">The Collection</h2>
              </RevealAnimation>
              <RevealAnimation direction="up" delay={0.3}>
                <h3 className="text-5xl font-light mb-12">Signature Serves</h3>
              </RevealAnimation>
              <div className="space-y-8">
                {brand.variants.map((v, i) => {
                  const local = getBrandImages(brand.slug);
                  const vImg = v.image.url || local?.variants?.[i] || "";
                  return (
                    <RevealAnimation key={v.id} direction="up" delay={0.4 + i * 0.1}>
                      <div className="glass p-8 rounded-3xl flex space-x-6 items-center">
                        <img src={vImg} alt="" className="w-20 h-40 object-contain hover:scale-105 transition-transform duration-500" />
                        <div>
                          <h4 className="text-2xl font-medium mb-2">{v.name}</h4>
                          <p className="text-white/60 mb-4 font-light">{v.description}</p>
                          <span className="text-accent tracking-widest uppercase text-xs font-medium">{v.abv} • {v.volume}</span>
                        </div>
                      </div>
                    </RevealAnimation>
                  );
                })}
              </div>
            </div>
            <div className="flex items-center justify-center">
              {(() => {
                const local = getBrandImages(brand.slug);
                const storyImg = brand.story.image?.url || local?.lifestyle?.[0] || "";
                return storyImg ? (
                  <RevealAnimation direction="left" delay={0.4}>
                    <img src={storyImg} alt="" className="rounded-[2rem] h-[700px] w-full object-cover shadow-2xl" />
                  </RevealAnimation>
                ) : null;
              })()}
            </div>
          </div>
        </div>
      );
    case "activation":
      const act = brand.activations[0];
      if (!act) return null;
      return (
        <div className="w-full h-full relative overflow-hidden">
          {(() => {
            const local = getBrandImages(brand.slug);
            const actImg = act.image.url || local?.activations?.[0] || "";
            return actImg ? (
              <motion.img 
                initial={{ scale: 1.1 }}
                animate={{ scale: 1 }}
                transition={{ duration: 1.5, ease: [0.16, 1, 0.3, 1] }}
                src={actImg} 
                alt="" 
                className="absolute inset-0 w-full h-full object-cover opacity-40" 
              />
            ) : null;
          })()}
          <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" />
          <div className="relative z-10 h-full flex flex-col items-center justify-center text-center p-24 max-w-5xl mx-auto">
            <RevealAnimation direction="up" delay={0.2}>
              <span className="text-accent tracking-widest uppercase mb-6 block font-medium">Upcoming Activation</span>
            </RevealAnimation>
            <RevealAnimation direction="up" delay={0.3}>
              <h2 className="text-7xl font-light mb-8 drop-shadow-2xl">{act.title}</h2>
            </RevealAnimation>
            <RevealAnimation direction="up" delay={0.4}>
              <p className="text-3xl text-white/80 font-light mb-12 leading-relaxed font-serif italic drop-shadow-xl">{act.description}</p>
            </RevealAnimation>
            <RevealAnimation direction="up" delay={0.5}>
              <div className="flex items-center justify-center space-x-12 text-xl font-medium px-8 py-4 bg-[var(--background)]/5 backdrop-blur-md rounded-full border border-white/10">
                <span>{act.date}</span>
                <span className="text-accent">•</span>
                <span>{act.location}</span>
              </div>
            </RevealAnimation>
          </div>
        </div>
      );
    case "support":
      const pkg = brand.supportPackages[0];
      if (!pkg) return null;
      return (
        <div className="w-full h-full bg-[#0a0a0a] flex flex-col items-center justify-center p-24 overflow-hidden relative">
          <div className="absolute inset-0 bg-[url('/noise.png')] opacity-[0.03] mix-blend-overlay pointer-events-none" />
          <RevealAnimation direction="up" delay={0.2}>
            <h2 className="text-6xl font-light mb-16 text-center">Partner Support</h2>
          </RevealAnimation>
          <RevealAnimation direction="up" delay={0.4} className="w-full max-w-4xl">
            <div className="glass p-16 rounded-[3rem] border border-white/10 text-center relative overflow-hidden group">
              <div className="absolute inset-0 bg-gradient-to-br from-accent/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-1000" />
              <span className="text-accent text-xl tracking-widest uppercase block mb-6 font-medium relative z-10">{pkg.tier}</span>
              <h3 className="text-5xl font-medium mb-12 relative z-10">{pkg.title}</h3>
              <ul className="space-y-6 text-2xl font-light text-white/80 inline-block text-left relative z-10">
                {pkg.benefits.map((b, i) => (
                  <li key={i} className="flex items-center space-x-6">
                    <span className="w-3 h-3 rounded-full bg-accent" />
                    <span>{b}</span>
                  </li>
                ))}
              </ul>
            </div>
          </RevealAnimation>
        </div>
      );
    default:
      return null;
  }
}

export function FullscreenViewer({ presentationId }: { presentationId: string }) {
  const router = useRouter();
  const { getPresentation } = usePresentationStore();
  const { brands } = useBrands();
  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState(0); // 1 for forward, -1 for backward

  const presentation = getPresentation(presentationId);

  const nextSlide = useCallback(() => {
    if (!presentation) return;
    if (currentIndex < presentation.slides.length - 1) {
      setDirection(1);
      setCurrentIndex(prev => prev + 1);
    }
  }, [currentIndex, presentation]);

  const prevSlide = useCallback(() => {
    if (currentIndex > 0) {
      setDirection(-1);
      setCurrentIndex(prev => prev - 1);
    }
  }, [currentIndex]);

  const exitFullscreen = useCallback(() => {
    router.push("/presentations");
  }, [router]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "ArrowRight" || e.key === "Space" || e.key === "Enter") nextSlide();
      if (e.key === "ArrowLeft") prevSlide();
      if (e.key === "Escape") exitFullscreen();
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [nextSlide, prevSlide, exitFullscreen]);

  if (!presentation) {
    return <div className="h-screen flex items-center justify-center">Presentation not found.</div>;
  }

  const currentSlide = presentation.slides[currentIndex];

  const variants = {
    enter: (direction: number) => ({
      x: direction > 0 ? 1000 : -1000,
      opacity: 0,
      scale: 0.95
    }),
    center: {
      zIndex: 1,
      x: 0,
      opacity: 1,
      scale: 1
    },
    exit: (direction: number) => ({
      zIndex: 0,
      x: direction < 0 ? 1000 : -1000,
      opacity: 0,
      scale: 1.05
    })
  };

  return (
    <div className="fixed inset-0 bg-black z-50 overflow-hidden flex flex-col">
      {/* Main Slide Canvas */}
      <div className="flex-1 relative bg-black touch-pan-y overflow-hidden">
        <SwipeSlideNavigator 
          currentIndex={currentIndex} 
          totalSlides={presentation.slides.length}
          onNext={nextSlide}
          onPrev={prevSlide}
        >
          {currentSlide ? (
            <SlideRenderer brandId={currentSlide.brandId} type={currentSlide.type} brands={brands} />
          ) : (
            <div className="w-full h-full flex flex-col items-center justify-center text-white p-24 text-center">
              <h1 className="text-6xl font-light mb-8">Presentation Complete</h1>
              <button onClick={exitFullscreen} className="px-8 py-4 rounded-full bg-[var(--background)] text-black font-medium text-lg">
                Exit Presentation
              </button>
            </div>
          )}
        </SwipeSlideNavigator>
      </div>
      
      {/* Absolute Header (for Exit) */}
      <div className="absolute top-0 inset-x-0 h-24 p-8 flex justify-between items-center z-50 opacity-0 hover:opacity-100 transition-opacity bg-gradient-to-b from-black/80 to-transparent pointer-events-none md:pointer-events-auto">
        <div className="text-white/60 font-medium tracking-widest text-sm uppercase">
          {presentation.name}
        </div>
        <button onClick={exitFullscreen} className="w-12 h-12 rounded-full bg-[var(--background)]/10 hover:bg-[var(--background)]/20 flex items-center justify-center backdrop-blur-md transition-colors text-white pointer-events-auto">
          <X className="w-6 h-6" />
        </button>
      </div>

      {/* Progress & Tablet Dock */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-50 pointer-events-none flex flex-col items-center space-y-4">
        <div className="text-white/40 font-medium tracking-widest text-sm bg-black/40 px-4 py-2 rounded-full backdrop-blur-md">
          {currentIndex + 1} / {presentation.slides.length}
        </div>
        <TabletPresentationDock />
      </div>
    </div>
  );
}
