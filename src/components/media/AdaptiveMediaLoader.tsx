"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Loader2 } from "lucide-react";

interface AdaptiveMediaLoaderProps {
  src: string;
  type: "image" | "video";
  alt?: string;
  className?: string;
}

export function AdaptiveMediaLoader({ src, type, alt, className = "" }: AdaptiveMediaLoaderProps) {
  const [isLoaded, setIsLoaded] = useState(false);
  const [error, setError] = useState(false);

  useEffect(() => {
    setIsLoaded(false);
    setError(false);
  }, [src]);

  return (
    <div className={`relative overflow-hidden bg-[var(--background)]/5 ${className}`}>
      <AnimatePresence>
        {!isLoaded && !error && (
          <motion.div
            exit={{ opacity: 0 }}
            className="absolute inset-0 z-10 flex items-center justify-center bg-black backdrop-blur-md"
          >
            <Loader2 className="w-6 h-6 text-accent animate-spin" />
          </motion.div>
        )}
      </AnimatePresence>

      {error && (
        <div className="absolute inset-0 z-10 flex items-center justify-center bg-black">
          <span className="text-xs font-mono text-white/30 uppercase tracking-widest">Media Offline</span>
        </div>
      )}

      {type === "image" ? (
        <img
          src={src}
          alt={alt || "Media asset"}
          onLoad={() => setIsLoaded(true)}
          onError={() => setError(true)}
          className={`w-full h-full object-cover transition-opacity duration-700 ${isLoaded ? 'opacity-100' : 'opacity-0'}`}
        />
      ) : (
        <video
          src={src}
          autoPlay
          muted
          loop
          playsInline
          onCanPlay={() => setIsLoaded(true)}
          onError={() => setError(true)}
          className={`w-full h-full object-cover transition-opacity duration-700 ${isLoaded ? 'opacity-100' : 'opacity-0'}`}
        />
      )}
    </div>
  );
}
