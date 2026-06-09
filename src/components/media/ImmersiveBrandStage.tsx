"use client";

import React from "react";
import { motion } from "framer-motion";
import { CinematicVideoPlayer } from "./CinematicVideoPlayer";

interface ImmersiveBrandStageProps {
  brandName: string;
  tagline: string;
  backgroundMediaUrl: string;
  mediaType?: "video" | "image";
  children?: React.ReactNode;
}

export function ImmersiveBrandStage({ 
  brandName, 
  tagline, 
  backgroundMediaUrl, 
  mediaType = "image",
  children 
}: ImmersiveBrandStageProps) {
  return (
    <div className="relative w-full h-screen overflow-hidden bg-black flex items-center justify-center">
      {/* Background Media Layer */}
      <div className="absolute inset-0 z-0">
        <motion.div
          initial={{ scale: 1.1, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 1.5, ease: [0.16, 1, 0.3, 1] }}
          className="w-full h-full"
        >
          {mediaType === "video" ? (
            <CinematicVideoPlayer 
              src={backgroundMediaUrl} 
              autoPlay 
              loop 
              muted 
              className="w-full h-full"
            />
          ) : (
            <div 
              className="w-full h-full bg-cover bg-center"
              style={{ backgroundImage: `url(${backgroundMediaUrl})` }}
            />
          )}
        </motion.div>
        
        {/* Cinematic Gradient Overlays */}
        <div className="absolute inset-0 bg-black/40 z-10" />
        <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent z-10" />
        <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-transparent to-transparent z-10" />
      </div>

      {/* Typography & Storytelling Layer */}
      <div className="relative z-20 max-w-7xl mx-auto px-6 lg:px-12 w-full text-center flex flex-col items-center">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.5, ease: [0.16, 1, 0.3, 1] }}
          className="mb-6"
        >
          <span className="px-4 py-1.5 rounded-full bg-[var(--background)]/10 backdrop-blur-md border border-white/20 text-xs font-medium uppercase tracking-[0.2em] text-white">
            Featured Presentation
          </span>
        </motion.div>
        
        <motion.h1 
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.7, ease: [0.16, 1, 0.3, 1] }}
          className="text-6xl md:text-8xl lg:text-9xl font-light tracking-tighter text-white drop-shadow-2xl mb-8 leading-none"
        >
          {brandName}
        </motion.h1>
        
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 1.2 }}
          className="text-xl md:text-3xl font-light font-serif italic text-white/80 max-w-3xl drop-shadow-md"
        >
          "{tagline}"
        </motion.p>
      </div>

      {/* Floating Interactive Elements / Children */}
      {children && (
        <div className="absolute bottom-12 left-0 right-0 z-30">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 1.5 }}
          >
            {children}
          </motion.div>
        </div>
      )}
    </div>
  );
}
