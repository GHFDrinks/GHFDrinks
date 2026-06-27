"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { STATIC_BRANDS } from "@/lib/static-brands";
import { getBrandImages } from "@/lib/brand-images";
import { getBrandVideo } from "@/data/brand-videos";
import { Play, X } from "lucide-react";

export default function BrandVideosPage() {
  const router = useRouter();
  const [activeVideoUrl, setActiveVideoUrl] = useState<string | null>(null);

  // Close overlay on ESC key
  useEffect(() => {
    function handleKeyDown(e: KeyboardEvent) {
      if (e.key === "Escape") {
        setActiveVideoUrl(null);
      }
    }
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  return (
    <div className="min-h-screen px-12 py-10 flex flex-col justify-between" style={{ backgroundColor: "var(--background)" }}>
      <div className="space-y-10">
        {/* Header */}
        <div className="flex items-center justify-between border-b border-[var(--border)] pb-6">
          <div>
            <span className="text-[10px] tracking-[0.35em] uppercase text-[var(--sage)] font-bold block mb-1">
              Resources Hub
            </span>
            <h1 className="text-4xl font-light tracking-tight text-[var(--foreground)]">
              Brand Videos
            </h1>
            <p className="text-xs text-[var(--muted-foreground)] mt-1">
              Explore promotional films, brand documentaries, and digital storytelling assets
            </p>
          </div>
          <button
            onClick={() => router.push("/resources")}
            className="text-xs tracking-widest uppercase text-[var(--muted-foreground)] hover:text-[var(--foreground)] transition-colors cursor-pointer font-bold"
          >
            ← Resources
          </button>
        </div>

        {/* Video Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {STATIC_BRANDS.map((brand) => {
            const local = getBrandImages(brand.slug);
            const videoUrl = getBrandVideo(brand.slug);
            const posterImg = local?.hero || local?.lifestyle?.[0] || "/placeholder.jpg";

            return (
              <div
                key={brand.id}
                onClick={() => {
                  if (videoUrl) setActiveVideoUrl(videoUrl);
                }}
                className={`bg-[var(--card)] border border-[var(--border)] rounded-xl overflow-hidden shadow-xl flex flex-col justify-between transition-all duration-300 ${
                  videoUrl
                    ? "cursor-pointer hover:border-[var(--sage)]/50 hover:scale-[1.01]"
                    : "opacity-75"
                }`}
              >
                {/* 16:9 Thumbnail / Play overlay */}
                <div className="relative aspect-[16/9] bg-[var(--muted)] overflow-hidden">
                  <img
                    src={posterImg}
                    alt=""
                    className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 hover:scale-103"
                  />
                  <div className="absolute inset-0 bg-black/45 flex items-center justify-center transition-colors hover:bg-black/40">
                    {videoUrl ? (
                      <div className="w-14 h-14 rounded-full bg-[var(--foreground)] text-[var(--background)] flex items-center justify-center shadow-lg transition-transform duration-300 hover:scale-110">
                        <Play className="w-6 h-6 fill-current translate-x-0.5" />
                      </div>
                    ) : (
                      <div className="text-center p-4">
                        <span className="text-[10px] tracking-[0.25em] uppercase text-[var(--sage)] font-bold block mb-1">
                          Video Coming Soon
                        </span>
                        <span className="text-[9px] text-[var(--muted-foreground)] uppercase">
                          Asset uploading in Batch L
                        </span>
                      </div>
                    )}
                  </div>
                </div>

                {/* Info block */}
                <div className="p-5 flex justify-between items-center border-t border-[var(--border)]">
                  <div>
                    <h3 className="text-sm font-semibold text-[var(--foreground)] tracking-wide">
                      {brand.name}
                    </h3>
                    <p className="text-[9px] tracking-widest uppercase text-[var(--sage)] font-bold mt-0.5">
                      {brand.category}
                    </p>
                  </div>
                  <span className="text-[10px] uppercase tracking-wider text-[var(--muted-foreground)]">
                    {videoUrl ? "Play Video" : "Inactive"}
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Fullscreen Video Modal Overlay */}
      {activeVideoUrl && (
        <div className="fixed inset-0 z-50 bg-black flex items-center justify-center p-4 animate-fade-in">
          {/* Close button */}
          <button
            onClick={() => setActiveVideoUrl(null)}
            className="absolute top-6 right-6 text-white/70 hover:text-white p-2 rounded-full bg-white/10 hover:bg-white/20 transition-all cursor-pointer z-50"
            title="Close video (Esc)"
          >
            <X className="w-6 h-6" />
          </button>

          {/* Centered HTML5 Video Element */}
          <div className="w-full max-w-5xl aspect-[16/9] rounded-lg overflow-hidden border border-white/10 bg-black shadow-2xl relative">
            <video
              src={activeVideoUrl}
              autoPlay
              controls
              className="w-full h-full object-contain"
            />
          </div>
        </div>
      )}

      {/* Footer copyright */}
      <div className="text-[9px] tracking-wider text-[var(--muted-foreground)]/65 mt-16 text-center uppercase border-t border-[var(--border)]/50 pt-4">
        * Brand films represent verified GHF campaigns.
      </div>
    </div>
  );
}
