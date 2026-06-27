"use client";

import React from "react";
import { Season } from "@/data/serves";

interface SeasonSelectorModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSelect: (season: Season) => void;
}

export function SeasonSelectorModal({ isOpen, onClose, onSelect }: SeasonSelectorModalProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fade-in">
      {/* Modal Container */}
      <div
        className="w-full max-w-lg rounded-2xl border border-[var(--border)] p-8 shadow-2xl space-y-6 relative flex flex-col items-center text-center"
        style={{ backgroundColor: "var(--card)" }}
      >
        {/* Close Button Top Right */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-xs tracking-widest uppercase hover:text-[var(--sage)] transition-colors text-[var(--muted-foreground)] font-bold cursor-pointer"
        >
          ✕ Close
        </button>

        {/* Heading */}
        <div className="space-y-2">
          <span className="text-[10px] tracking-[0.35em] uppercase text-[var(--sage)] font-bold block">
            Serve Inspiration
          </span>
          <h3 className="text-2xl font-light text-[var(--foreground)]">Select Seasonal Menu</h3>
          <p className="text-xs text-[var(--muted-foreground)] max-w-sm">
            Choose a seasonal activation window to view tailored serve recommendations.
          </p>
        </div>

        {/* 2 Tile-Style Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 w-full pt-4">
          <button
            onClick={() => onSelect("spring-summer")}
            className="flex-1 py-5 px-6 rounded-lg text-sm font-bold tracking-[0.2em] uppercase border transition-all hover:scale-[1.03] active:scale-95 cursor-pointer"
            style={{
              backgroundColor: "var(--foreground)",
              color: "var(--background)",
              borderColor: "var(--foreground)",
            }}
          >
            Spring / Summer
          </button>
          <button
            onClick={() => onSelect("autumn-winter")}
            className="flex-1 py-5 px-6 rounded-lg text-sm font-bold tracking-[0.2em] uppercase border transition-all hover:scale-[1.03] active:scale-95 cursor-pointer"
            style={{
              backgroundColor: "var(--foreground)",
              color: "var(--background)",
              borderColor: "var(--foreground)",
            }}
          >
            Autumn / Winter
          </button>
        </div>
      </div>
    </div>
  );
}
