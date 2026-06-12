"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { useBrands } from "@/hooks/useBrands";
import { usePresentationStore } from "@/lib/presentation-store";
import { v4 as uuidv4 } from "uuid";
import { Brand } from "@/types/brand";
import { SlideType } from "@/types/presentation";
import { mockBrands } from "@/data/brands";
import { PACKAGE_PRESENTATIONS } from "@/data/package-presentations";

const ROWS = [
  {
    label: "CATEGORY",
    cards: [
      { title: "Spirits", href: "/brands/spirits" },
      { title: "Wines", href: "/brands/wines" },
      { title: "Beer. Cider. Mixer.", href: "/brands/beer" },
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
];

export default function HomePage() {
  const router = useRouter();
  const { brands } = useBrands();
  const { savePresentation } = usePresentationStore();
  const [building, setBuilding] = useState(false);

  async function launchPackage(href: string, title: string) {
    if (building) return;
    setBuilding(true);

    try {
      const parts = href.split("/");
      const slug = parts[parts.length - 1];
      const brandSlugs = PACKAGE_PRESENTATIONS[slug];

      if (!brandSlugs) {
        console.error("No brand slugs mapped for package:", slug);
        setBuilding(false);
        return;
      }

      const id = uuidv4();
      const availableBrands = brands.length > 0 ? brands : mockBrands;

      // Map selection order to full brand objects
      const selectedBrands = brandSlugs
        .map((s) => availableBrands.find((b) => b.slug === s))
        .filter(Boolean) as Brand[];

      // Auto-generate slides based on brand capabilities
      const slides = selectedBrands.flatMap((brand) => {
        const brandSlides = [
          { id: `s_${brand.id}_intro`, brandId: brand.id, type: "intro" as SlideType }
        ];
        if (brand.variants && brand.variants.length > 0) {
          brandSlides.push({ id: `s_${brand.id}_tasting`, brandId: brand.id, type: "tasting" as SlideType });
        }
        if (brand.activations && brand.activations.length > 0) {
          brandSlides.push({ id: `s_${brand.id}_act`, brandId: brand.id, type: "activation" as SlideType });
        }
        if (brand.supportPackages && brand.supportPackages.length > 0) {
          brandSlides.push({ id: `s_${brand.id}_sup`, brandId: brand.id, type: "support" as SlideType });
        }
        return brandSlides;
      });

      const name = `${title} Presentation`;

      await savePresentation({
        id,
        name,
        dateCreated: new Date().toISOString(),
        brands: selectedBrands.map((b) => b.id),
        slides
      });

      router.push(`/present-mode/${id}`);
    } catch (err) {
      console.error("Failed to build presentation:", err);
      setBuilding(false);
    }
  }

  return (
    <div className="min-h-screen flex flex-col px-12 py-10" style={{ backgroundColor: "var(--background)" }}>

      {/* Header */}
      <div className="mb-10">
        <div
          className="w-14 h-14 rounded-full border-2 flex items-center justify-center mb-5"
          style={{ borderColor: "var(--sage)", color: "var(--sage)" }}
        >
          <span className="text-[11px] font-bold tracking-widest">GHF</span>
        </div>
        <h1 className="text-5xl font-light tracking-tight mb-2" style={{ color: "var(--foreground)" }}>
          GHF Drinks Packages
        </h1>
        <p className="text-sm" style={{ color: "var(--muted-foreground)" }}>
          Tailored packages of drinks brands, perfect for your customers.
        </p>
      </div>

      {/* 3x3 grid with row labels */}
      <div className="flex-1 flex flex-col gap-5 max-w-5xl">
        {ROWS.map((row) => (
          <div key={row.label} className="flex items-stretch gap-5">
            {/* Rotated row label */}
            <div className="flex-shrink-0 flex items-center justify-center" style={{ width: "34px" }}>
              <span
                className="text-[10px] font-bold tracking-[0.35em] uppercase select-none"
                style={{
                  color: "var(--muted-foreground)",
                  writingMode: "vertical-rl",
                  transform: "rotate(180deg)",
                }}
              >
                {row.label}
              </span>
            </div>

            {/* Cards */}
            <div className="flex-1 grid grid-cols-3 gap-5">
              {row.cards.map((card) => (
                <button
                  key={card.title}
                  onClick={() => launchPackage(card.href, card.title)}
                  disabled={building}
                  className="group rounded-xl border flex items-center justify-center text-center px-6 transition-all hover:border-[var(--sage)] hover:scale-[1.02] disabled:opacity-50"
                  style={{
                    borderColor: "var(--border)",
                    backgroundColor: "var(--card)",
                    minHeight: "150px",
                  }}
                >
                  <span
                    className="text-xl font-light tracking-wide group-hover:text-[var(--sage)] transition-colors"
                    style={{ color: "var(--foreground)" }}
                  >
                    {card.title}
                  </span>
                </button>
              ))}
            </div>
          </div>
        ))}

        {/* Build your own CTA — arrow banner & Resources Hub */}
        <div className="flex items-stretch gap-5 mt-1">
          <div className="flex-shrink-0" style={{ width: "34px" }} />
          <div className="flex-1 flex flex-col md:flex-row gap-4 items-stretch">
            <button
              onClick={() => router.push("/presentations/new")}
              disabled={building}
              className="flex-1 relative flex items-center justify-center py-5 transition-all hover:opacity-90 disabled:opacity-50"
              style={{
                backgroundColor: "var(--accent-orange)",
                clipPath: "polygon(0 0, calc(100% - 36px) 0, 100% 50%, calc(100% - 36px) 100%, 0 100%)",
              }}
            >
              <span className="text-sm font-bold tracking-[0.25em] uppercase" style={{ color: "var(--cream)" }}>
                Build your own drinks package&nbsp;&nbsp;→&nbsp;&nbsp;Brand Selection
              </span>
            </button>

            <button
              onClick={() => router.push("/resources")}
              disabled={building}
              className="px-8 py-5 md:py-0 rounded-xl border flex items-center justify-center text-center transition-all hover:border-[var(--sage)] hover:bg-[var(--card)] hover:scale-[1.01] disabled:opacity-50"
              style={{
                borderColor: "var(--border)",
                backgroundColor: "var(--card)",
              }}
            >
              <span className="text-xs font-bold tracking-[0.2em] uppercase text-[var(--cream)] hover:text-[var(--sage)] transition-colors">
                Brand Resources Hub →
              </span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
