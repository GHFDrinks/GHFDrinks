"use client";

import React, { useState, useEffect } from "react";
import { ImmersiveBrandStage } from "@/components/media/ImmersiveBrandStage";
import { OfflineMediaPackager } from "@/components/media/OfflineMediaPackager";
import { SwipeSlideNavigator } from "@/components/tablet/SwipeSlideNavigator";
import { motion, AnimatePresence } from "framer-motion";
import { Download, CheckCircle2, X, Loader2 } from "lucide-react";
import Link from "next/link";
import { usePresentationStore } from "@/lib/presentation-store";
import { useBrands } from "@/hooks/useBrands";
import { Brand } from "@/types/brand";

const MOCK_SCENES = [
  {
    id: "scene-1",
    brand: "Maison Mirabeau",
    tagline: "The essence of the Riviera, crafted sustainably.",
    media: "https://videos.pexels.com/video-files/3191578/3191578-uhd_2560_1440_25fps.mp4",
    type: "video" as const,
    hotspots: [
      { x: 30, y: 40, label: "Sustainable Packaging" },
      { x: 70, y: 60, label: "Botanical Profile" }
    ]
  },
  {
    id: "scene-2",
    brand: "Sapling Spirits",
    tagline: "Climate positive spirits. One tree planted per bottle.",
    media: "https://videos.pexels.com/video-files/4255577/4255577-uhd_2560_1440_30fps.mp4",
    type: "video" as const,
    hotspots: []
  },
  {
    id: "scene-3",
    brand: "Everleaf",
    tagline: "Complex, non-alcoholic aperitifs born from conservation.",
    media: "https://images.pexels.com/photos/10350734/pexels-photo-10350734.jpeg?auto=compress&cs=tinysrgb&w=2560&h=1440",
    type: "image" as const,
    hotspots: [
      { x: 50, y: 50, label: "Forest Sourced" }
    ]
  }
];

export default function ImmersivePresentationViewer({ params }: { params: Promise<{ presentationId: string }> }) {
  const resolvedParams = React.use(params);
  const presentationId = resolvedParams.presentationId;
  
  const { getPresentation } = usePresentationStore();
  const { brands, loading } = useBrands();
  
  const [currentSceneIdx, setCurrentSceneIdx] = useState(0);
  const [isOfflineReady, setIsOfflineReady] = useState(false);
  const [isDownloading, setIsDownloading] = useState(false);
  const [downloadProgress, setDownloadProgress] = useState(0);
  const [showHotspotDetails, setShowHotspotDetails] = useState<string | null>(null);

  const presentation = getPresentation(presentationId);
  
  // Resolve brands in this presentation
  const presentationBrands = presentation
    ? presentation.brands.map(id => brands.find(b => b.id === id || b.slug === id)).filter(Boolean) as Brand[]
    : [];

  // Fallback to all brands if presentation has no brands, or if it is just a direct view
  const activeBrands = presentationBrands.length > 0 
    ? presentationBrands 
    : (brands.length > 0 ? brands.slice(0, 3) : []);

  const scenes = activeBrands.map((brand) => {
    const preset = MOCK_SCENES.find(s => s.brand.toLowerCase().includes(brand.name.toLowerCase()) || brand.name.toLowerCase().includes(s.brand.toLowerCase()));
    
    const hotspots = brand.variants.map((v, i) => ({
      x: 30 + i * 25,
      y: 40 + i * 15,
      label: `${v.name} (${v.abv})`
    }));

    return {
      id: brand.id,
      brand: brand.name,
      tagline: brand.tagline || brand.story?.headline || "Curated presentation deck.",
      media: preset?.media || brand.heroImage.url,
      type: preset?.type || ("image" as const),
      hotspots: hotspots.length > 0 ? hotspots : [{ x: 50, y: 50, label: brand.tagline || brand.name }]
    };
  });

  const currentScene = scenes[currentSceneIdx];

  // Pre-check if all media is cached
  useEffect(() => {
    if (scenes.length > 0) {
      const urls = scenes.map(s => s.media);
      OfflineMediaPackager.checkOfflineStatus(urls).then(setIsOfflineReady);
    }
  }, [scenes]);

  const handleDownload = async () => {
    if (scenes.length === 0) return;
    setIsDownloading(true);
    const urls = scenes.map(s => s.media);
    await OfflineMediaPackager.preloadMediaPack(urls, setDownloadProgress);
    setIsDownloading(false);
    setIsOfflineReady(true);
  };

  const nextScene = () => {
    if (currentSceneIdx < scenes.length - 1) {
      setCurrentSceneIdx(prev => prev + 1);
    }
  };

  const prevScene = () => {
    if (currentSceneIdx > 0) {
      setCurrentSceneIdx(prev => prev - 1);
    }
  };

  if (scenes.length === 0) {
    return (
      <div className="h-screen flex items-center justify-center bg-black">
        <Loader2 className="w-8 h-8 animate-spin text-accent" />
      </div>
    );
  }

  return (
    <div className="fixed inset-0 bg-black text-white overflow-hidden selection:bg-accent touch-pan-y">
      <SwipeSlideNavigator
        currentIndex={currentSceneIdx}
        totalSlides={scenes.length}
        onNext={nextScene}
        onPrev={prevScene}
      >
        <ImmersiveBrandStage 
          brandName={currentScene.brand}
          tagline={currentScene.tagline}
          backgroundMediaUrl={currentScene.media}
          mediaType={currentScene.type}
        >
          {/* Interactive Hotspots */}
          {currentScene.hotspots.map((hotspot, i) => (
            <div 
              key={i}
              className="absolute z-40 pointer-events-auto"
              style={{ top: `${hotspot.y}%`, left: `${hotspot.x}%` }}
            >
              <button 
                onMouseEnter={() => setShowHotspotDetails(hotspot.label)}
                onMouseLeave={() => setShowHotspotDetails(null)}
                className="w-8 h-8 rounded-full bg-[var(--background)]/20 backdrop-blur-md border border-white/40 flex items-center justify-center group transition-transform hover:scale-125"
              >
                <div className="w-2 h-2 rounded-full bg-[var(--background)] group-hover:bg-accent transition-colors" />
              </button>
              <AnimatePresence>
                {showHotspotDetails === hotspot.label && (
                  <motion.div 
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 10 }}
                    className="absolute top-10 left-1/2 -translate-x-1/2 whitespace-nowrap px-4 py-2 bg-black/80 backdrop-blur-xl border border-white/10 rounded-lg text-sm font-medium tracking-wide"
                  >
                    {hotspot.label}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ))}
        </ImmersiveBrandStage>
      </SwipeSlideNavigator>

      {/* Persistent Presentation Overlay UI */}
      <div className="absolute top-0 left-0 right-0 p-8 flex justify-between items-start z-50 pointer-events-none">
        <Link href="/presentations" className="pointer-events-auto">
          <button className="w-12 h-12 rounded-full bg-black/40 backdrop-blur-xl border border-white/10 flex items-center justify-center hover:bg-[var(--background)]/10 transition-colors">
            <X className="w-5 h-5 text-white/70" />
          </button>
        </Link>
        
        <div className="flex flex-col items-end pointer-events-auto">
          {isOfflineReady ? (
            <div className="flex items-center space-x-2 px-4 py-2 bg-black/40 backdrop-blur-xl border border-white/10 rounded-full text-xs font-medium uppercase tracking-widest text-green-400">
              <CheckCircle2 className="w-4 h-4" />
              <span>Offline Ready</span>
            </div>
          ) : (
            <button 
              onClick={handleDownload}
              disabled={isDownloading}
              className="flex items-center space-x-2 px-4 py-2 bg-black/40 backdrop-blur-xl border border-white/10 hover:border-accent hover:text-accent transition-colors rounded-full text-xs font-medium uppercase tracking-widest text-white/70 disabled:opacity-50"
            >
              {isDownloading ? (
                <span>Downloading {downloadProgress}%</span>
              ) : (
                <>
                  <Download className="w-4 h-4" />
                  <span>Cache for Offline</span>
                </>
              )}
            </button>
          )}
        </div>
      </div>
      
      {/* Scene Progress Indicators */}
      <div className="absolute bottom-16 right-12 z-50 flex items-center space-x-3">
        {scenes.map((_, idx) => (
          <button 
            key={idx}
            onClick={() => setCurrentSceneIdx(idx)}
            className={`h-1.5 rounded-full transition-all duration-500 ${idx === currentSceneIdx ? 'w-12 bg-[var(--background)]' : 'w-4 bg-[var(--background)]/20 hover:bg-[var(--background)]/40'}`}
          />
        ))}
      </div>
    </div>
  );
}
