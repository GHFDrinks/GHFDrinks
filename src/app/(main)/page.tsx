"use client";

import React from "react";
import Link from "next/link";
import { getPackageBrandSlugs } from "@/data/package-presentations";
import { useBrands } from "@/hooks/useBrands";
import { TileImageCarousel } from "@/components/shared/TileImageCarousel";

const ROWS = [
  {
    label: "CATEGORY",
    cards: [
      { title: "Spirits", href: "/present-mode/spirits" },
      { title: "Wines", href: "/present-mode/wines" },
      { title: "Packaged", href: "/present-mode/beer" },
    ],
  },
  {
    label: "OCCASION",
    cards: [
      { title: "Crafted & Discerning", href: "/present-mode/crafted-and-discerning" },
      { title: "Elevated & Sophisticated", href: "/present-mode/elevated-and-sophisticated" },
      { title: "Contemporary & Creative", href: "/present-mode/contemporary-and-creative" },
    ],
  },
  {
    label: "CULTURE",
    cards: [
      { title: "Best of British", href: "/present-mode/best-of-british" },
      { title: "European Lifestyle", href: "/present-mode/european-lifestyle" },
      { title: "Sustainability Focus", href: "/present-mode/sustainable" },
    ],
  },
  {
    label: "PRODUCTS",
    cards: [
      { title: "No/Low", href: "/present-mode/no-low" },
      { title: "Whisky", href: "/present-mode/whisky" },
      { title: "Exclusives", href: "/present-mode/exclusives" },
    ],
  },
];

const CARDS = ROWS.flatMap((row) => row.cards);

function slugFromHref(href: string): string {
  const parts = href.split("/");
  return parts[parts.length - 1] || "";
}

export default function HomePage() {
  const { brands } = useBrands();
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

      {/* Flat responsive grid: 1 col (mobile) → 2 (tablet) → 4 (desktop) */}
      <div className="flex-1 flex flex-col gap-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {CARDS.map((card) => {
            const slug = slugFromHref(card.href);
            const brandSlugs = getPackageBrandSlugs(slug, brands);

            return (
              <Link
                key={card.title}
                href={card.href}
                className="group relative rounded-lg border overflow-hidden flex items-center justify-center text-center px-6 transition-all hover:border-[var(--sage)] hover:scale-[1.02]"
                style={{
                  borderColor: "var(--border)",
                  minHeight: "140px",
                }}
              >
                <TileImageCarousel brandSlugs={brandSlugs} />
                <span
                  className="relative z-10 text-xl font-light tracking-wide text-[var(--pearl)] drop-shadow-md group-hover:text-[var(--sage)] transition-colors text-center"
                >
                  {card.title}
                </span>
              </Link>
            );
          })}
        </div>

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
