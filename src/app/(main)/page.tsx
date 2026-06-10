"use client";

import React from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";

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

  return (
    <div className="min-h-screen flex flex-col px-12 py-10" style={{ backgroundColor: "var(--background)" }}>

      {/* Header */}
      <div className="mb-10">
        <div
          className="w-14 h-14 rounded-full border-2 flex items-center justify-center mb-5"
          style={{ borderColor: "var(--gold)", color: "var(--gold)" }}
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
                <Link
                  key={card.title}
                  href={card.href}
                  className="group rounded-xl border flex items-center justify-center text-center px-6 transition-all hover:border-[var(--gold)] hover:scale-[1.02]"
                  style={{
                    borderColor: "var(--border)",
                    backgroundColor: "var(--card)",
                    minHeight: "150px",
                  }}
                >
                  <span
                    className="text-xl font-light tracking-wide group-hover:text-[var(--gold)] transition-colors"
                    style={{ color: "var(--foreground)" }}
                  >
                    {card.title}
                  </span>
                </Link>
              ))}
            </div>
          </div>
        ))}

        {/* Build your own CTA — arrow banner */}
        <div className="flex items-stretch gap-5 mt-1">
          <div className="flex-shrink-0" style={{ width: "34px" }} />
          <button
            onClick={() => router.push("/presentations/new")}
            className="flex-1 relative flex items-center justify-center py-5 transition-all hover:opacity-90"
            style={{
              backgroundColor: "var(--gold)",
              clipPath: "polygon(0 0, calc(100% - 36px) 0, 100% 50%, calc(100% - 36px) 100%, 0 100%)",
            }}
          >
            <span className="text-sm font-bold tracking-[0.25em] uppercase" style={{ color: "#0b1310" }}>
              Build your own drinks package&nbsp;&nbsp;→&nbsp;&nbsp;Brand Selection
            </span>
          </button>
        </div>
      </div>
    </div>
  );
}
