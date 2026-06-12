"use client";

import React, { useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { getCaseStudies } from "@/data/case-studies";

export default function CaseStudiesDetailPage() {
  const router = useRouter();
  const { tier } = useParams<{ tier: string }>();
  const studies = getCaseStudies(tier);

  // Track expanded case study ID
  const [expandedId, setExpandedId] = useState<string | null>(null);

  const tierLabels: Record<string, string> = {
    prestige: "Prestige Outlets",
    independent: "Independent Outlets",
    national: "National & Group"
  };

  const title = tierLabels[tier.toLowerCase()] || `${tier.toUpperCase()} Outlets`;

  return (
    <div className="min-h-screen bg-[var(--background)] p-12 text-[var(--cream)] flex flex-col justify-between max-w-5xl mx-auto">
      
      {/* Header back button */}
      <div className="flex items-center justify-between border-b border-[var(--border)] pb-6 mb-8">
        <button
          onClick={() => router.back()}
          className="flex items-center gap-2 text-xs font-bold tracking-widest uppercase text-[var(--sage)] hover:text-white transition-colors border border-[var(--sage)]/30 hover:border-[var(--sage)] px-4 py-2 rounded-full bg-[var(--card)]"
        >
          ← Back to presentation
        </button>
        <span className="text-xs tracking-widest uppercase text-[var(--muted-foreground)]">
          Case Studies
        </span>
      </div>

      <div className="space-y-6 flex-1">
        <div className="space-y-2">
          <span className="text-[10px] tracking-[0.35em] uppercase text-[var(--sage)] font-bold">
            PARTNERSHIP PERFORMANCE
          </span>
          <h1 className="text-4xl font-light tracking-tight text-[var(--cream)]">
            {title}
          </h1>
        </div>

        {/* 3 large tiles */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 pt-4">
          {studies.map((study) => {
            const isExpanded = expandedId === study.id;
            return (
              <div
                key={study.id}
                onClick={() => setExpandedId(isExpanded ? null : study.id)}
                className="flex flex-col bg-[var(--card)] border border-[var(--border)] rounded-2xl overflow-hidden shadow-2xl transition-all duration-300 hover:border-[var(--sage)]/50 cursor-pointer group"
              >
                {/* 16:9 Image Area */}
                <div className="relative aspect-[16/9] w-full bg-[var(--card)] border-b border-[var(--border)] flex items-center justify-center p-6 bg-gradient-to-br from-[#123A23] to-[#0c2417] overflow-hidden">
                  {/* Outlet Logo Overlay Placeholder */}
                  <div className="w-16 h-16 rounded-full bg-[var(--background)]/80 backdrop-blur border border-[var(--border)]/40 flex items-center justify-center p-2 shadow-lg group-hover:scale-110 transition-transform duration-300">
                    <span className="text-[9px] font-bold tracking-wider text-[var(--sage)] text-center leading-none">
                      {study.outletName.slice(0, 3).toUpperCase()}
                    </span>
                  </div>
                  
                  <div className="absolute top-4 left-4">
                    <span className="text-[8px] font-bold tracking-widest uppercase bg-[var(--background)]/90 border border-[var(--border)] px-2 py-0.5 rounded text-[var(--sage)]">
                      OUTLET
                    </span>
                  </div>
                </div>

                {/* Content Body */}
                <div className="p-6 flex-1 flex flex-col justify-between space-y-4">
                  <div className="space-y-2">
                    <h3 className="text-lg font-light tracking-wide text-[var(--cream)] group-hover:text-[var(--sage)] transition-colors">
                      {study.outletName}
                    </h3>
                    <p className="text-xs text-[var(--muted-foreground)] leading-relaxed">
                      {study.description}
                    </p>
                  </div>

                  {/* Accordion Expansion Block */}
                  <div className={`transition-all duration-300 overflow-hidden ${isExpanded ? "max-h-60 opacity-100 mt-2" : "max-h-0 opacity-0"}`}>
                    <div className="p-3.5 bg-[var(--background)]/60 border border-[var(--border)] rounded-lg text-xs leading-relaxed text-[var(--muted-foreground)]">
                      <p className="font-bold text-[var(--accent-orange)] text-[9px] uppercase tracking-wider mb-1">
                        Key Performance Insight
                      </p>
                      {study.details}
                    </div>
                  </div>

                  <div className="pt-2 text-right">
                    <span className="text-[9px] font-bold tracking-widest uppercase text-[var(--sage)] hover:text-white transition-colors">
                      {isExpanded ? "Show Less" : "Expand Case Study"}
                    </span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Footer copyright */}
      <div className="text-center text-[9px] tracking-widest text-[var(--muted-foreground)] uppercase mt-12 border-t border-[var(--border)] pt-4">
        GHF Drinks Portfolio © 2026
      </div>
    </div>
  );
}
