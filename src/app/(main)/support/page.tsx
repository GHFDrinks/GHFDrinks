"use client";

import React, { useState } from "react";

const SUPPORT_BUNDLES = [
  {
    id: "spirits-launch",
    name: "Spirits Launch",
    tier: "Gold Support",
    badgeLabel: "SUPPORT & LAUNCH",
    columns: {
      Education: [
        {
          title: "Staff Incentives",
          description:
            "Sales incentives for your team, including stock, brand merchandise, vouchers and tickets (inc. CITC, TASTE London).",
          price: "£100",
        },
        {
          title: "WSET Courses",
          description:
            "Sponsorship for key members of your bar team to achieve their WSET Qualification in Spirits.",
          price: "£500",
        },
      ],
      Engagement: [
        {
          title: "Founder Masterclasses",
          description:
            "Offer your guests a unique chance to learn more about the brand directly from the Founder or Head Distiller.",
          price: "£200",
        },
        {
          title: "Cocktail Competitions",
          description:
            "Challenge your team to a creative and engaging internal cocktail competition including training and prizes.",
          price: "£100",
        },
      ],
      Experience: [
        {
          title: "Brand Immersions",
          description:
            "Immerse your team in the brand's world with exclusive distillery trips, tree planting days, nature walks, etc.",
          price: "£500",
        },
        {
          title: "Cocktail Photography",
          description:
            "Capture your bar team's proudest creations for promotion across social media channels.",
          price: "£100",
        },
      ],
    },
  },
  {
    id: "rotating-cocktail",
    name: "Rotating Cocktail",
    tier: "Gold Support",
    badgeLabel: "ROTATING COCKTAIL",
    columns: {
      Education: [
        {
          title: "Staff Incentives",
          description:
            "Sales incentives for your team, including stock, brand merchandise, vouchers and tickets (inc. CITC, TASTE London).",
          price: "£100",
        },
        {
          title: "WSET Courses",
          description:
            "Sponsorship for key members of your bar team to achieve their WSET Qualification in Spirits.",
          price: "£500",
        },
      ],
      Engagement: [
        {
          title: "Founder Masterclasses",
          description:
            "Offer your guests a unique chance to learn more about the brand directly from the Founder or Head Distiller.",
          price: "£200",
        },
        {
          title: "Cocktail Competitions",
          description:
            "Challenge your team to a creative and engaging internal cocktail competition including training and prizes.",
          price: "£100",
        },
      ],
      Experience: [
        {
          title: "Brand Immersions",
          description:
            "Immerse your team in the brand's world with exclusive distillery trips, tree planting days, nature walks, etc.",
          price: "£500",
        },
        {
          title: "Cocktail Photography",
          description:
            "Capture your bar team's proudest creations for promotion across social media channels.",
          price: "£100",
        },
      ],
    },
  },
  {
    id: "wine-bundle",
    name: "Wine Bundle",
    tier: "Gold Support",
    badgeLabel: "WINE BUNDLE",
    columns: {
      Education: [
        {
          title: "Staff Wine Training",
          description:
            "In-depth training sessions with our wine specialists to upskill your floor team on the full wine range.",
          price: "£100",
        },
        {
          title: "WSET Wine Courses",
          description:
            "Sponsorship for key members of your team to achieve their WSET Qualification in Wines.",
          price: "£500",
        },
      ],
      Engagement: [
        {
          title: "Winemaker Dinners",
          description:
            "Host an intimate dinner with the winemaker, paired menu and storytelling for your best guests.",
          price: "£200",
        },
        {
          title: "Wine Flight Menus",
          description:
            "Curated guided tasting menus for your guests, with full menu printing and POS support.",
          price: "£100",
        },
      ],
      Experience: [
        {
          title: "Vineyard Trips",
          description:
            "Immerse your team in the world of the wine with exclusive vineyard visits and harvest experiences.",
          price: "£500",
        },
        {
          title: "Wine Photography",
          description:
            "Professional photography of your wine serves and pairings for social media and menu use.",
          price: "£100",
        },
      ],
    },
  },
  {
    id: "other-launch",
    name: "Other Launch",
    tier: "Gold Support",
    badgeLabel: "OTHER LAUNCH",
    columns: {
      Education: [
        {
          title: "Staff Incentives",
          description:
            "Sales incentives for your team, including stock, brand merchandise, vouchers and tickets.",
          price: "£100",
        },
        {
          title: "Brand Training",
          description:
            "Bespoke brand training session delivered by the brand ambassador to your full team.",
          price: "£200",
        },
      ],
      Engagement: [
        {
          title: "Launch Event",
          description:
            "Host a brand launch event at your venue with full brand support, POS, and guest activation.",
          price: "£500",
        },
        {
          title: "Tasting Sessions",
          description:
            "Guided consumer-facing tasting sessions to drive trial and build awareness with your guests.",
          price: "£100",
        },
      ],
      Experience: [
        {
          title: "Brand Immersions",
          description:
            "Behind-the-scenes brand experience for your team — distillery, brewery or producer visits.",
          price: "£500",
        },
        {
          title: "Content Creation",
          description:
            "Professional photography and short-form video content for your social media channels.",
          price: "£100",
        },
      ],
    },
  },
];

const COLUMNS = ["Education", "Engagement", "Experience"] as const;

type ColumnKey = (typeof COLUMNS)[number];

function getSupportItemImage(title: string): string {
  const mapping: Record<string, string> = {
    "Staff Incentives": "/brands/sapling/lifestyle-2.jpg",
    "WSET Courses": "/brands/pensador/lifestyle-2.jpg",
    "Founder Masterclasses": "/brands/fielden/lifestyle-1.jpg",
    "Cocktail Competitions": "/brands/dropworks/lifestyle-3.jpg",
    "Brand Immersions": "/brands/sapling/lifestyle-3.jpg",
    "Cocktail Photography": "/brands/everleaf/lifestyle-1.jpg",
    "Staff Wine Training": "/brands/mirabeau/lifestyle-2.jpg",
    "WSET Wine Courses": "/brands/craggy-range/lifestyle-2.jpg",
    "Winemaker Dinners": "/brands/mirabeau/lifestyle-1.jpg",
    "Wine Flight Menus": "/brands/coates-and-seely/lifestyle-2.jpg",
    "Vineyard Trips": "/brands/quinta-da-romaneira/lifestyle-3.jpg",
    "Wine Photography": "/brands/coates-and-seely/lifestyle-3.jpg",
    "Brand Training": "/brands/pensador/lifestyle-1.jpg",
    "Launch Event": "/brands/desdeya/lifestyle-3.jpg",
    "Tasting Sessions": "/brands/dreamsake/lifestyle-2.jpg",
    "Content Creation": "/brands/cote-citron/lifestyle-3.jpg",
  };
  return mapping[title] || "/brands/sapling/lifestyle-1.jpg";
}

export default function SupportPage() {
  const [activeId, setActiveId] = useState(SUPPORT_BUNDLES[0].id);

  const bundle = SUPPORT_BUNDLES.find((b) => b.id === activeId)!;

  return (
    <div
      className="flex flex-col min-h-screen bg-[var(--background)] overflow-hidden"
      style={{ maxHeight: "100vh" }}
    >
      {/* Bundle selector tabs */}
      <div className="flex gap-3 px-10 pt-8 pb-0 flex-shrink-0">
        {SUPPORT_BUNDLES.map((b) => {
          const isActive = b.id === activeId;
          return (
            <button
              key={b.id}
              onClick={() => setActiveId(b.id)}
              className="px-4 py-2 text-xs tracking-widest uppercase border rounded transition-colors"
              style={{
                borderColor: isActive ? "var(--accent)" : "var(--border)",
                backgroundColor: isActive ? "var(--accent)" : "transparent",
                color: isActive ? "white" : "var(--foreground)",
              }}
            >
              {b.name}
            </button>
          );
        })}
      </div>

      {/* Header row */}
      <div className="px-10 pt-5 pb-3 flex items-center gap-6 flex-shrink-0">
        {/* Circular activation badge */}
        <div
          className="w-14 h-14 rounded-full border-2 flex items-center justify-center text-center p-1 flex-shrink-0"
          style={{ borderColor: "var(--accent)", color: "var(--accent)" }}
        >
          <span className="text-[7px] font-bold leading-tight uppercase">
            {bundle.badgeLabel}
          </span>
        </div>
        <div>
          <p
            className="text-xs tracking-widest uppercase mb-0.5"
            style={{ color: "var(--muted-foreground)" }}
          >
            {bundle.tier}
          </p>
          <h1
            className="text-3xl font-light tracking-tight"
            style={{ color: "var(--accent)" }}
          >
            {bundle.name}
          </h1>
        </div>
      </div>

      {/* Divider */}
      <div className="mx-10 border-t border-[var(--border)] flex-shrink-0" />

      {/* 3-column grid */}
      <div className="flex-1 grid grid-cols-3 gap-6 px-10 py-6 overflow-auto">
        {COLUMNS.map((col) => (
          <div key={col} className="flex flex-col">
            {/* Column header */}
            <h2
              className="text-center text-sm font-semibold tracking-widest uppercase mb-4 pb-2 border-b"
              style={{ color: "var(--accent)", borderColor: "var(--border)" }}
            >
              {col}
            </h2>

            {/* Support item cards */}
            <div className="flex flex-col gap-4">
              {(bundle.columns[col as ColumnKey] || []).map((item, i) => (
                <div
                  key={i}
                  className="relative border border-[var(--border)] rounded-xl overflow-hidden bg-gray-50"
                >
                  {/* Photo for the support bundle item */}
                  <div
                    className="w-full overflow-hidden flex items-center justify-center bg-gray-100"
                    style={{ height: "145px" }}
                  >
                    <img
                      src={getSupportItemImage(item.title)}
                      alt={item.title}
                      className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
                    />
                  </div>

                  {/* Price circle — top right over photo */}
                  <div
                    className="absolute top-2 right-2 w-11 h-11 rounded-full bg-[var(--background)] border-2 flex items-center justify-center text-xs font-bold shadow-sm"
                    style={{
                      borderColor: "var(--accent)",
                      color: "var(--accent)",
                    }}
                  >
                    {item.price}
                  </div>

                  {/* Text content */}
                  <div className="p-4">
                    <h3
                      className="text-sm font-semibold mb-1.5"
                      style={{ color: "var(--accent)" }}
                    >
                      {item.title}
                    </h3>
                    <p
                      className="text-xs leading-relaxed"
                      style={{ color: "var(--muted-foreground)" }}
                    >
                      {item.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
