"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { getPackageBrandSlugs } from "@/data/package-presentations";
import { useBrands } from "@/hooks/useBrands";
import { TileImageCarousel } from "@/components/shared/TileImageCarousel";
import { DEFAULT_LANDING, fetchLandingConfig, type LandingSection } from "@/lib/landing-config";

export default function HomePage() {
  const { brands } = useBrands();
  // Start from the built-in layout so the page renders instantly, then swap in
  // the admin-managed layout once it loads. Falls back to the default if the
  // config is missing (pre-migration) or unreachable (offline).
  const [sections, setSections] = useState<LandingSection[]>(DEFAULT_LANDING.sections);

  useEffect(() => {
    let active = true;
    fetchLandingConfig().then((cfg) => {
      if (active && cfg?.sections?.length) setSections(cfg.sections);
    });
    return () => {
      active = false;
    };
  }, []);

  return (
    <div className="relative min-h-full flex flex-col px-12 py-8" style={{ backgroundColor: "var(--background)" }}>
      {/* GHF logo now lives in the global menu button (HiddenMenu) — clicking it opens the menu */}

      {/* Header */}
      <div className="mb-10">
        <h1 className="text-5xl font-light tracking-tight mb-2" style={{ color: "var(--foreground)" }}>
          GHF Drinks Packages
        </h1>
        <p className="text-sm" style={{ color: "var(--muted-foreground)" }}>
          Tailored packages of pioneering premium drinks brands
        </p>
      </div>

      <div className="flex-1 flex flex-col gap-8">
        {sections.map((section) => (
          <section key={section.id}>
            {section.label && (
              <h2
                className="text-xs font-semibold uppercase tracking-[0.2em] mb-3"
                style={{ color: "var(--muted-foreground)" }}
              >
                {section.label}
              </h2>
            )}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {section.tiles.map((tile) => {
                const brandSlugs = getPackageBrandSlugs(tile.slug, brands);
                return (
                  <Link
                    key={tile.id}
                    href={`/present-mode/${tile.slug}`}
                    className="group relative rounded-lg border overflow-hidden flex items-center justify-center text-center px-6 transition-all hover:border-[var(--sage)] hover:scale-[1.02]"
                    style={{ borderColor: "var(--border)", minHeight: "140px" }}
                  >
                    <TileImageCarousel brandSlugs={brandSlugs} />
                    <span className="relative z-10 text-xl font-light tracking-wide text-[var(--pearl)] drop-shadow-md group-hover:text-[var(--sage)] transition-colors text-center">
                      {tile.title}
                    </span>
                  </Link>
                );
              })}
            </div>
          </section>
        ))}

        {/* Build your own CTA — Action buttons */}
        <div className="flex flex-col md:flex-row gap-4 items-stretch mt-2">
          <Link
            href="/presentations/new"
            className="flex-1 py-5 px-8 rounded-lg flex items-center justify-center text-center transition-all hover:opacity-90 bg-[var(--accent)] text-[var(--accent-foreground)] font-bold tracking-[0.2em] text-xs uppercase"
          >
            Build your own drinks package
          </Link>

          <Link
            href="/resources"
            className="flex-1 py-5 px-8 rounded-lg flex items-center justify-center text-center transition-all hover:opacity-90 bg-[var(--accent)] text-[var(--accent-foreground)] font-bold tracking-[0.2em] text-xs uppercase"
          >
            Brand Resources Hub
          </Link>
        </div>
      </div>
    </div>
  );
}
