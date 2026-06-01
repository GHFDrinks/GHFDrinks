"use client";

import React, { useEffect, useState } from "react";
import { Activity } from "lucide-react";

export function PerformanceOverlay() {
  const [fps, setFps] = useState(60);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Only show in development or if a specific query param/flag is set
    if (process.env.NODE_ENV !== "development" && !window.location.search.includes("perf=true")) {
      return;
    }
    
    setIsVisible(true);

    let frameCount = 0;
    let lastTime = performance.now();
    let animationFrameId: number;

    const calculateFPS = () => {
      const now = performance.now();
      frameCount++;

      if (now - lastTime >= 1000) {
        setFps(Math.round((frameCount * 1000) / (now - lastTime)));
        frameCount = 0;
        lastTime = now;
      }

      animationFrameId = requestAnimationFrame(calculateFPS);
    };

    animationFrameId = requestAnimationFrame(calculateFPS);

    return () => cancelAnimationFrame(animationFrameId);
  }, []);

  if (!isVisible) return null;

  return (
    <div className="fixed bottom-4 left-4 z-[9999] bg-black/80 backdrop-blur-md border border-white/10 rounded-lg px-3 py-2 flex items-center space-x-2 font-mono text-xs shadow-2xl pointer-events-none">
      <Activity className={`w-3 h-3 ${fps >= 50 ? 'text-green-500' : fps >= 30 ? 'text-yellow-500' : 'text-red-500'}`} />
      <span className="text-white/80">{fps} FPS</span>
    </div>
  );
}
