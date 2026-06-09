"use client";

import React, { useState } from "react";
import { AdaptiveMediaLoader } from "@/components/media/AdaptiveMediaLoader";
import { motion, AnimatePresence } from "framer-motion";
import { Play, ArrowLeft, ArrowRight, Expand } from "lucide-react";
import Link from "next/link";

export default function PresentationScenePage({ params }: { params: Promise<{ id: string }> }) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [showContent, setShowContent] = useState(true);

  return (
    <div className="fixed inset-0 bg-black text-white overflow-hidden">
      <AdaptiveMediaLoader 
        src="https://videos.pexels.com/video-files/4255577/4255577-uhd_2560_1440_30fps.mp4" 
        type="video" 
        className="w-full h-full absolute inset-0"
      />

      <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/20 to-transparent pointer-events-none" />

      <AnimatePresence>
        {showContent && (
          <motion.div 
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -50 }}
            className="relative z-10 h-full flex flex-col justify-center px-12 md:px-24 max-w-3xl pointer-events-auto"
          >
            <span className="px-4 py-1.5 rounded-full bg-accent/20 backdrop-blur-md border border-accent/40 text-xs font-medium uppercase tracking-[0.2em] text-accent w-fit mb-8">
              Scene 4: The Pour
            </span>
            <h1 className="text-6xl md:text-8xl font-light tracking-tighter mb-6 leading-none">
              Perfect<br />Serve.
            </h1>
            <p className="text-xl text-white/70 font-light leading-relaxed mb-10 max-w-xl">
              A meticulously balanced pour that enhances the botanical profile while delivering an unforgettable visual experience for the guest.
            </p>
            
            <div className="flex items-center space-x-6">
              <button 
                onClick={() => setIsPlaying(!isPlaying)}
                className="w-16 h-16 rounded-full bg-[var(--background)] text-black flex items-center justify-center hover:scale-110 transition-transform active:scale-95"
              >
                {isPlaying ? <Expand className="w-6 h-6" /> : <Play className="w-6 h-6 ml-1" />}
              </button>
              <span className="text-sm font-medium uppercase tracking-widest text-white/50">
                {isPlaying ? "Exit Fullscreen" : "Watch Sequence"}
              </span>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <button 
        onClick={() => setShowContent(!showContent)}
        className="absolute bottom-12 right-12 px-6 py-3 rounded-full bg-black/40 backdrop-blur-xl border border-white/20 text-sm font-medium uppercase tracking-widest hover:bg-[var(--background)]/10 transition-colors z-50"
      >
        {showContent ? "Hide UI" : "Show UI"}
      </button>

      <div className="absolute top-12 right-12 z-50 flex items-center space-x-4">
        <Link href="/presentations">
          <button className="w-12 h-12 rounded-full bg-black/40 backdrop-blur-xl border border-white/10 flex items-center justify-center hover:bg-[var(--background)]/10 transition-colors">
            <ArrowLeft className="w-5 h-5" />
          </button>
        </Link>
        <button className="w-12 h-12 rounded-full bg-accent text-black flex items-center justify-center hover:bg-[var(--background)] transition-colors">
          <ArrowRight className="w-5 h-5" />
        </button>
      </div>
    </div>
  );
}
