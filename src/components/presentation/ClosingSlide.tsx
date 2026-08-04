"use client";

import React from "react";
import Link from "next/link";
import { PACKAGE_BRANDS } from "@/data/package-brands";
import { TileImageCarousel } from "@/components/shared/TileImageCarousel";

export function ClosingSlide() {
  const categories = [
    { title: "Spirits", href: "/brands/spirits", slug: "spirits" },
    { title: "Wines", href: "/brands/wines", slug: "wines" },
    { title: "Packaged", href: "/brands/beer", slug: "beer" },
  ];

  return (
    <section className="w-full h-screen flex flex-col items-center justify-center p-16 relative bg-[var(--background)]">
      {/* Centered Large Heading */}
      <h2
        className="text-4xl md:text-5xl lg:text-6xl font-light tracking-tight text-center max-w-3xl"
        style={{ color: "var(--foreground)" }}
      >
        Discover more of our brands
      </h2>

      {/* Row of 3 Category Tiles */}
      <div className="flex flex-col md:flex-row items-stretch justify-center gap-6 mt-12 w-full max-w-4xl">
        {categories.map((cat) => {
          const brandSlugs = PACKAGE_BRANDS[cat.slug] || [];

          return (
            <Link
              key={cat.title}
              href={cat.href}
              className="flex-1 group relative rounded-lg border overflow-hidden flex items-center justify-center text-center px-8 transition-all hover:border-[var(--sage)] hover:scale-[1.02]"
              style={{
                borderColor: "var(--border)",
                minHeight: "160px",
              }}
            >
              <TileImageCarousel brandSlugs={brandSlugs} minIntervalMs={5000} maxJitterMs={2000} />
              <span
                className="relative z-10 text-2xl font-light tracking-wider text-[var(--pearl)] drop-shadow-md group-hover:text-[var(--sage)] transition-colors text-center"
              >
                {cat.title}
              </span>
            </Link>
          );
        })}
      </div>
    </section>
  );
}
