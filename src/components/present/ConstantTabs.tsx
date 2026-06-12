"use client";

import React, { useState, useRef, useEffect } from "react";
import { useRouter } from "next/navigation";
import { getBrandSupportOptions } from "@/data/brand-support";

export function ConstantTabs({ brandSlug }: { brandSlug: string }) {
  const router = useRouter();
  const [openTab, setOpenTab] = useState<"support" | "case" | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  const supportOptions = getBrandSupportOptions(brandSlug);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setOpenTab(null);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div ref={containerRef} className="absolute bottom-20 right-8 z-40 flex gap-3">
      {/* Tab A: PROMOTIONS & SUPPORT */}
      <div className="relative">
        <button
          onClick={() => setOpenTab(openTab === "support" ? null : "support")}
          className="px-4 py-2 text-[10px] font-bold tracking-wider uppercase rounded-full border border-[var(--sage)] bg-[var(--card)] text-[var(--cream)] hover:bg-[var(--sage)] hover:text-[var(--background)] transition-all duration-150 shadow-lg cursor-pointer"
        >
          Promotions & Support
        </button>

        {openTab === "support" && (
          <div className="absolute bottom-full mb-2 right-0 w-64 rounded-xl border border-[var(--sage)] bg-[var(--card)] shadow-2xl p-2 flex flex-col gap-1 transition-all duration-150">
            {supportOptions.map((opt) => (
              <button
                key={opt.slug}
                onClick={() => {
                  router.push(`/support/${brandSlug}/${opt.slug}`);
                }}
                className="w-full text-left p-2.5 rounded-lg hover:bg-[var(--sage)]/10 transition-colors group cursor-pointer"
              >
                <p className="text-[11px] font-bold text-[var(--cream)] group-hover:text-[var(--sage)] transition-colors">
                  {opt.label}
                </p>
                <p className="text-[10px] text-[var(--muted-foreground)] line-clamp-2 mt-0.5">
                  {opt.description}
                </p>
              </button>
            ))}
          </div>
        )}
      </div>

      {/* Tab B: CASE STUDIES */}
      <div className="relative">
        <button
          onClick={() => setOpenTab(openTab === "case" ? null : "case")}
          className="px-4 py-2 text-[10px] font-bold tracking-wider uppercase rounded-full border border-[var(--sage)] bg-[var(--card)] text-[var(--cream)] hover:bg-[var(--sage)] hover:text-[var(--background)] transition-all duration-150 shadow-lg cursor-pointer"
        >
          Case Studies
        </button>

        {openTab === "case" && (
          <div className="absolute bottom-full mb-2 right-0 w-48 rounded-xl border border-[var(--sage)] bg-[var(--card)] shadow-2xl p-2 flex flex-col gap-1 transition-all duration-150">
            {[
              { tier: "prestige", label: "Prestige" },
              { tier: "independent", label: "Independent" },
              { tier: "national", label: "National & Group" }
            ].map((tier) => (
              <button
                key={tier.tier}
                onClick={() => {
                  router.push(`/case-studies/${tier.tier}`);
                }}
                className="w-full text-left p-2.5 rounded-lg hover:bg-[var(--sage)]/10 text-[11px] font-bold text-[var(--cream)] hover:text-[var(--sage)] transition-colors cursor-pointer"
              >
                {tier.label}
              </button>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
