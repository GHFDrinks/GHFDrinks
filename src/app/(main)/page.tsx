"use client";

import React from "react";
import Link from "next/link";
import { PACKAGE_BRANDS } from "@/data/package-brands";
import { TileImageCarousel } from "@/components/shared/TileImageCarousel";

const ROWS = [
  {
    label: "CATEGORY",
    cards: [
      { title: "Spirits", href: "/brands/spirits" },
      { title: "Wines", href: "/brands/wines" },
      { title: "Packaged", href: "/brands/beer" },
    ],
  },
  {
    label: "OCCASION",
    cards: [
      { title: "Crafted & Discerning", href: "/packages/crafted-and-discerning" },
      { title: "Elevated & Sophisticated", href: "/packages/elevated-and-sophisticated" },
      { title: "Contemporary & Creative", href: "/packages/contemporary-and-creative" },
    ],
  },
  {
    label: "CULTURE",
    cards: [
      { title: "Best of British", href: "/packages/best-of-british" },
      { title: "European Lifestyle", href: "/packages/european-lifestyle" },
      { title: "Sustainability Focus", href: "/packages/sustainable" },
    ],
  },
  {
    label: "PRODUCTS",
    cards: [
      { title: "No/Low", href: "/products/no-low" },
      { title: "Whisky", href: "/products/whisky" },
      { title: "Exclusives", href: "/products/exclusives" },
    ],
  },
];

function slugFromHref(href: string): string {
  const parts = href.split("/");
  return parts[parts.length - 1] || "";
}

export default function HomePage() {
  return (
    <div className="relative min-h-screen flex flex-col px-12 py-10" style={{ backgroundColor: "var(--background)" }}>
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

      {/* 4x3 grid with row labels */}
      <div className="flex-1 flex flex-col gap-4 max-w-5xl">
        {ROWS.map((row) => (
          <div key={row.label} className="flex items-stretch gap-4">
            {/* Rotated row label */}
            <div className="flex-shrink-0 flex items-center justify-center" style={{ width: "34px" }}>
              <span
                className="text-[10px] font-bold tracking-[0.35em] uppercase select-none"
                style={{
                  color: "var(--sage)",
                  writingMode: "vertical-rl",
                  transform: "rotate(180deg)",
                }}
              >
                {row.label}
              </span>
            </div>

            {/* Cards */}
            <div className="flex-1 grid grid-cols-3 gap-4">
              {row.cards.map((card) => {
                const slug = slugFromHref(card.href);
                const brandSlugs = PACKAGE_BRANDS[slug] || [];

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
                    <TileImageCarousel brandSlugs={brandSlugs} intervalMs={1000} />
                    <span
                      className="relative z-10 text-xl font-light tracking-wide text-[var(--foreground)] drop-shadow-md group-hover:text-[var(--sage)] transition-colors text-center"
                    >
                      {card.title}
                    </span>
                  </Link>
                );
              })}
            </div>
          </div>
        ))}

        {/* Build your own CTA — Action buttons */}
        <div className="flex items-stretch gap-4 mt-2">
          <div className="flex-shrink-0" style={{ width: "34px" }} />
          <div className="flex-1 flex flex-col md:flex-row gap-4 items-stretch">
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
    </div>
  );
}
