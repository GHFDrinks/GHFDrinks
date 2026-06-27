"use client";

import React, { useState, useRef, useEffect } from "react";
import { useRouter, useParams } from "next/navigation";
import { STATIC_BRANDS } from "@/lib/static-brands";
import { SeasonSelectorModal } from "@/components/serves/SeasonSelectorModal";
import { Season } from "@/data/serves";
import { PROMOTIONS } from "@/data/promotions";

export function ConstantTabs({ brandSlug }: { brandSlug: string }) {
  const router = useRouter();
  const params = useParams();
  const presentationId = params?.id as string;

  const [openTab, setOpenTab] = useState<"support" | "case" | null>(null);
  const [showServeModal, setShowServeModal] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const brand = STATIC_BRANDS.find((b) => b.slug === brandSlug);
  const category = brand?.category?.toLowerCase() || "";
  const isSpirits = category === "spirits";

  // Build category-specific support options
  const supportOptions: { label: string; slug: string; description: string }[] = [];
  if (category === "spirits") {
    supportOptions.push(
      {
        slug: "launch-support",
        label: "Launch Support",
        description: "Comprehensive launch event support, staff incentives, and POS kits.",
      },
      {
        slug: "rotating-cocktail",
        label: "Rotating Cocktail",
        description: "Seasonal bespoke serve featured on menus with support for staff training and menu printing.",
      }
    );
  } else if (category === "wines") {
    supportOptions.push({
      slug: "wine-bundle",
      label: "Wine Bundle",
      description: "Curate a tasting menu or selection of multiple wines by bottle or glass.",
    });
  } else if (category === "packaged") {
    supportOptions.push({
      slug: "packaged-launch",
      label: "Launch Support",
      description: "Promotional support, custom table-talkers, and staff training.",
    });
  }

  // Filter active promotions
  const [activePromos, setActivePromos] = useState<any[]>([]);
  useEffect(() => {
    const now = new Date();
    const filtered = PROMOTIONS.filter((p) => {
      if (p.brandSlug !== brandSlug) return false;
      const start = new Date(p.startDate);
      const end = new Date(p.endDate);
      return start <= now && now <= end;
    });
    setActivePromos(filtered);
  }, [brandSlug]);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setOpenTab(null);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleSeasonSelect = (selectedSeason: Season) => {
    if (typeof window !== "undefined" && presentationId) {
      sessionStorage.setItem("ghf_return_to", `/present-mode/${presentationId}`);
      sessionStorage.setItem("ghf_return_label", "Back to Presentation");
    }
    router.push(`/serves/${brandSlug}?season=${selectedSeason}`);
  };

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
            {/* Category Options */}
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

            {/* Active Promotions */}
            {activePromos.length > 0 && (
              <>
                <div className="border-t border-[var(--border)] my-1.5" />
                <span className="text-[9px] font-bold tracking-widest uppercase text-[var(--sage)] px-2.5 py-1">
                  Active Promotions
                </span>
                {activePromos.map((promo) => (
                  <button
                    key={promo.id}
                    onClick={() => {
                      router.push(promo.targetUrl || `/promotions/${promo.id}`);
                    }}
                    className="w-full text-left p-2.5 rounded-lg hover:bg-[var(--sage)]/10 transition-colors group cursor-pointer"
                  >
                    <p className="text-[11px] font-bold text-[var(--cream)] group-hover:text-[var(--sage)] transition-colors">
                      {promo.title}
                    </p>
                    <p className="text-[10px] text-[var(--muted-foreground)] line-clamp-2 mt-0.5">
                      {promo.description}
                    </p>
                  </button>
                ))}
              </>
            )}
          </div>
        )}
      </div>

      {/* Serve Inspiration (Spirits Only) */}
      {isSpirits && (
        <div className="relative">
          <button
            onClick={() => setShowServeModal(true)}
            className="px-4 py-2 text-[10px] font-bold tracking-wider uppercase rounded-full border border-[var(--sage)] bg-[var(--card)] text-[var(--cream)] hover:bg-[var(--sage)] hover:text-[var(--background)] transition-all duration-150 shadow-lg cursor-pointer"
          >
            Serve Inspiration
          </button>
        </div>
      )}

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

      {/* Season Selector Modal */}
      <SeasonSelectorModal
        isOpen={showServeModal}
        onClose={() => setShowServeModal(false)}
        onSelect={handleSeasonSelect}
      />
    </div>
  );
}
