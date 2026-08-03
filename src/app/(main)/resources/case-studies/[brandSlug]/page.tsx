"use client";

import React, { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import { STATIC_BRANDS } from "@/lib/static-brands";
import { CASE_STUDIES, CaseStudy } from "@/data/case-studies";
import { X } from "lucide-react";

type Tier = "prestige" | "independent" | "national-group";

const TIER_TABS: { label: string; value: Tier }[] = [
  { label: "Prestige Accounts", value: "prestige" },
  { label: "Independent Venues", value: "independent" },
  { label: "National & Group", value: "national-group" },
];

export default function BrandCaseStudiesPage() {
  const params = useParams();
  const router = useRouter();
  const brandSlug = params.brandSlug as string;

  const brand = STATIC_BRANDS.find((b) => b.slug === brandSlug);
  const [activeTab, setActiveTab] = useState<Tier>("prestige");
  const [selectedStudy, setSelectedStudy] = useState<CaseStudy | null>(null);

  // Close modal on ESC key
  useEffect(() => {
    function handleKeyDown(e: KeyboardEvent) {
      if (e.key === "Escape") {
        setSelectedStudy(null);
      }
    }
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  if (!brand) {
    return (
      <div className="min-h-screen px-12 py-10" style={{ backgroundColor: "var(--background)" }}>
        <h1 className="text-2xl font-light text-[var(--foreground)]">Brand not found</h1>
        <button
          onClick={() => router.push("/resources/case-studies")}
          className="text-xs uppercase tracking-widest text-[var(--sage)] hover:underline mt-4 cursor-pointer"
        >
          ← Back to Case Studies
        </button>
      </div>
    );
  }

  const brandStudies = CASE_STUDIES.filter((c) => c.brandSlug === brandSlug);
  const activeStudies = brandStudies.filter((c) => c.tier === activeTab);

  return (
    <div className="min-h-screen px-12 py-10 flex flex-col justify-between" style={{ backgroundColor: "var(--background)" }}>
      <div className="space-y-8">
        {/* Header */}
        <div className="flex items-center justify-between border-b border-[var(--border)] pb-6">
          <button
            onClick={() => router.push("/resources/case-studies")}
            className="flex items-center gap-2 text-xs font-bold tracking-widest uppercase text-[var(--sage)] hover:text-[var(--foreground)] transition-colors border border-[var(--sage)]/30 hover:border-[var(--sage)] px-4 py-2 rounded-full bg-[var(--card)] cursor-pointer"
          >
            ← Back to brand list
          </button>
          <div className="text-right">
            <span className="text-[10px] tracking-[0.35em] uppercase text-[var(--sage)] font-bold block mb-1">
              {brand.name} Performance
            </span>
            <h1 className="text-2xl font-light text-[var(--foreground)]">Case Studies</h1>
          </div>
        </div>

        {/* Tabs */}
        <div className="flex gap-2 border-b border-[var(--border)] pb-4 overflow-x-auto scrollbar-hide">
          {TIER_TABS.map((tab) => {
            const count = brandStudies.filter((c) => c.tier === tab.value).length;
            const isActive = activeTab === tab.value;

            return (
              <button
                key={tab.value}
                onClick={() => setActiveTab(tab.value)}
                className={`px-4 py-2 text-xs font-semibold uppercase tracking-wider rounded-lg transition-all border cursor-pointer ${
                  isActive
                    ? "bg-[var(--foreground)] text-[var(--background)] border-[var(--foreground)]"
                    : "border-[var(--border)] bg-[var(--card)] text-[var(--foreground)]/80 hover:border-[var(--sage)]"
                }`}
              >
                {tab.label} ({count})
              </button>
            );
          })}
        </div>

        {/* List of Case Studies */}
        {activeStudies.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {activeStudies.map((study) => (
              <div
                key={study.id}
                onClick={() => setSelectedStudy(study)}
                className="bg-[var(--card)] border border-[var(--border)] rounded-xl overflow-hidden shadow-lg hover:border-[var(--sage)]/50 transition-all duration-300 cursor-pointer flex flex-col justify-between h-full group"
              >
                <div>
                  <div className="aspect-[16/10] overflow-hidden relative bg-[var(--muted)]">
                    <img
                      src={study.image}
                      alt={study.title}
                      className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-103"
                    />
                    <div className="absolute inset-0 bg-black/40 group-hover:bg-black/35 transition-colors" />
                    <div className="absolute bottom-4 left-4 right-4">
                      <span className="text-[9px] font-bold tracking-widest uppercase text-[var(--sage)]">
                        {study.outletName}
                      </span>
                      <h3 className="text-base font-light text-[var(--pearl)] mt-0.5 tracking-wide leading-snug">
                        {study.title}
                      </h3>
                    </div>
                  </div>
                  <div className="p-6">
                    <p className="text-xs text-[var(--muted-foreground)] leading-relaxed">
                      {study.summary}
                    </p>
                  </div>
                </div>
                <div className="p-6 pt-0 flex justify-end">
                  <span className="text-[10px] font-bold uppercase tracking-widest text-[var(--sage)] group-hover:text-[var(--foreground)] transition-colors">
                    Read Case Study →
                  </span>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="py-20 text-center border border-dashed border-[var(--border)] rounded-xl bg-[var(--card)]/20">
            <p className="text-sm text-[var(--muted-foreground)] leading-relaxed">
              No case studies documented under this tier for {brand.name} yet.
            </p>
            <p className="text-xs text-[var(--sage)] mt-1">
              New case study reports can be created in the Back Office dashboard.
            </p>
          </div>
        )}
      </div>

      {/* Case Study Detail Modal Overlay */}
      {selectedStudy && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 animate-fade-in" onClick={() => setSelectedStudy(null)}>
          <div
            className="w-full max-w-2xl bg-[var(--card)] border border-[var(--border)] rounded-xl shadow-2xl overflow-hidden flex flex-col justify-between relative max-h-[90vh] animate-scale-up"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close button */}
            <button
              onClick={() => setSelectedStudy(null)}
              className="absolute top-4 right-4 text-[var(--muted-foreground)] hover:text-[var(--foreground)] p-2 rounded-full bg-[var(--background)] border border-[var(--border)] transition-all cursor-pointer z-50"
            >
              <X className="w-4 h-4" />
            </button>

            {/* Content scroll area */}
            <div className="overflow-y-auto">
              <div className="aspect-[21/9] relative bg-[var(--muted)]">
                <img
                  src={selectedStudy.image}
                  alt={selectedStudy.title}
                  className="absolute inset-0 w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-black/45" />
                <div className="absolute bottom-6 left-6 right-6">
                  <span className="text-[10px] font-bold tracking-widest uppercase text-[var(--sage)]">
                    {selectedStudy.outletName} • {selectedStudy.tier.replace("-", " ")}
                  </span>
                  <h2 className="text-2xl font-light text-[var(--pearl)] tracking-wide mt-1">
                    {selectedStudy.title}
                  </h2>
                </div>
              </div>

              <div className="p-8 space-y-6">
                <div className="border-l-2 border-[var(--sage)] pl-4">
                  <p className="text-sm font-semibold text-[var(--foreground)] leading-relaxed italic">
                    "{selectedStudy.summary}"
                  </p>
                </div>

                {selectedStudy.fullText && (
                  <p className="text-xs text-[var(--muted-foreground)] leading-relaxed whitespace-pre-line">
                    {selectedStudy.fullText}
                  </p>
                )}
              </div>
            </div>

            {/* Footer */}
            <div className="p-6 border-t border-[var(--border)] bg-[var(--background)]/50 flex justify-between items-center">
              <span className="text-[9px] uppercase tracking-widest text-[var(--muted-foreground)]">
                GHF performance reports
              </span>
              <button
                onClick={() => setSelectedStudy(null)}
                className="px-5 py-2.5 rounded-lg bg-[var(--foreground)] text-[var(--background)] text-[10px] font-bold uppercase tracking-wider hover:opacity-95 transition-opacity cursor-pointer"
              >
                Close Report
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Footer copyright */}
      <div className="text-[9px] tracking-wider text-[var(--muted-foreground)]/65 mt-16 text-center uppercase border-t border-[var(--border)]/50 pt-4">
        * Case studies reflect verified sales uplift and campaign logs.
      </div>
    </div>
  );
}
