"use client";

import React, { useState } from "react";
import { useBrands } from "@/hooks/useBrands";
import { getBrandImages } from "@/lib/brand-images";
import { TASTING_NOTES, VariantTasting } from "@/data/tasting-notes";

const BRAND_ORDER = [
  "sapling", "fielden", "dropworks", "desdeya", "pensador", "everleaf",
  "mirabeau", "craggy-range", "coates-and-seely", "quinta-da-romaneira",
  "dreamsake", "wild-idol", "noam", "cote-citron", "wignac", "big-drop",
];

export default function TastingNotesPage() {
  const { brands } = useBrands();
  const [activeSlug, setActiveSlug] = useState<string | null>(null);
  const [variantIdx, setVariantIdx] = useState(0);

  const brandSlugsWithNotes = BRAND_ORDER.filter((s) =>
    TASTING_NOTES.some((t) => t.brandSlug === s)
  );

  // ───────── INDEX VIEW (PDF page 49 grid) ─────────
  if (!activeSlug) {
    return (
      <div className="min-h-screen px-10 py-10" style={{ backgroundColor: "var(--background)" }}>
        <div className="grid grid-cols-3 gap-4 max-w-4xl">
          {brandSlugsWithNotes.map((slug) => {
            const brand = brands.find((b) => b.slug === slug);
            const local = getBrandImages(slug);
            return (
              <button
                key={slug}
                onClick={() => { setActiveSlug(slug); setVariantIdx(0); }}
                className="border rounded-lg px-6 py-8 flex items-center justify-center transition-colors hover:border-[var(--gold)]"
                style={{ borderColor: "var(--border)", backgroundColor: "var(--card)", minHeight: "110px" }}
              >
                {local?.logo ? (
                  <img src={local.logo} alt={brand?.name || slug} className="max-h-12 max-w-[140px] object-contain" />
                ) : (
                  <span className="text-base font-medium text-center" style={{ color: "var(--foreground)" }}>
                    {brand?.name || slug}
                  </span>
                )}
              </button>
            );
          })}
        </div>
        <h1 className="text-5xl font-light mt-10 tracking-tight" style={{ color: "var(--gold)" }}>
          Tasting Notes
        </h1>
        <p className="text-sm mt-1" style={{ color: "var(--muted-foreground)" }}>
          Select a brand to explore flavour profiles across the portfolio
        </p>
      </div>
    );
  }

  // ───────── VARIANT SLIDE VIEW ─────────
  const notes = TASTING_NOTES.filter((t) => t.brandSlug === activeSlug);
  const note: VariantTasting = notes[Math.min(variantIdx, notes.length - 1)];
  const brand = brands.find((b) => b.slug === activeSlug);
  const local = getBrandImages(activeSlug);
  const lifestyleImg = local?.lifestyle?.[variantIdx % (local?.lifestyle?.length || 1)] || local?.lifestyle?.[0] || "";

  const rightTitle = note.serves ? "Serves" : note.pairings ? "Food Pairings"
    : activeSlug === "coates-and-seely" ? "Prestigious Listings" : "Terroir";

  function goPrev() { setVariantIdx((i) => Math.max(0, i - 1)); }
  function goNext() { setVariantIdx((i) => Math.min(notes.length - 1, i + 1)); }

  return (
    <div className="min-h-screen flex flex-col" style={{ backgroundColor: "var(--background)" }}>

      {/* Top bar: back + variant tabs */}
      <div className="flex items-center gap-4 px-8 pt-6 flex-wrap">
        <button
          onClick={() => setActiveSlug(null)}
          className="text-xs tracking-widest uppercase"
          style={{ color: "var(--muted-foreground)" }}
        >
          ← All Brands
        </button>
        {notes.map((n, i) => (
          <button
            key={n.variant}
            onClick={() => setVariantIdx(i)}
            className="px-3 py-1.5 text-[11px] tracking-widest uppercase border rounded transition-colors"
            style={{
              borderColor: i === variantIdx ? "var(--gold)" : "var(--border)",
              backgroundColor: i === variantIdx ? "var(--gold)" : "transparent",
              color: i === variantIdx ? "#0b1310" : "var(--foreground)",
            }}
          >
            {n.variant.split("|")[0].trim()}
          </button>
        ))}
      </div>

      {/* Slide */}
      <div className="flex flex-1 gap-8 px-8 py-8 items-stretch">

        {/* LEFT — lifestyle image */}
        <div className="flex-shrink-0 rounded-xl overflow-hidden" style={{ width: "26%" }}>
          {lifestyleImg ? (
            <img src={lifestyleImg} alt="" className="w-full h-full object-cover" style={{ minHeight: "540px" }} />
          ) : (
            <div className="w-full h-full" style={{ backgroundColor: "var(--card)", minHeight: "540px" }} />
          )}
        </div>

        {/* CENTER — content */}
        <div className="flex-1 flex flex-col pt-2">
          {local?.logo && (
            <img src={local.logo} alt={brand?.name || ""} className="max-h-16 max-w-[180px] object-contain mb-5" />
          )}
          <h1 className="text-3xl font-light mb-3 tracking-tight" style={{ color: "var(--gold)" }}>
            {note.variant}
          </h1>
          <p className="text-sm leading-relaxed mb-7 max-w-xl" style={{ color: "var(--foreground)" }}>
            {note.intro}
          </p>

          <p className="text-sm font-bold mb-4" style={{ color: "var(--foreground)" }}>Key Product Features</p>
          <div className="flex gap-4 flex-wrap mb-8">
            {note.features.map((f) => (
              <div
                key={f}
                className="w-24 h-24 rounded-full border-2 flex items-center justify-center text-center p-2"
                style={{ borderColor: "var(--gold)", backgroundColor: "var(--card)" }}
              >
                <span className="text-[10px] font-semibold leading-tight" style={{ color: "var(--foreground)" }}>{f}</span>
              </div>
            ))}
          </div>

          <p className="text-sm font-bold mb-3" style={{ color: "var(--foreground)" }}>Taste Profile</p>
          <ul className="space-y-2 mb-8 max-w-xl">
            {note.tasteProfile.map((t, i) => (
              <li key={i} className="text-sm leading-relaxed" style={{ color: "var(--foreground)" }}>• {t}</li>
            ))}
          </ul>

          <p className="text-2xl font-bold mt-auto" style={{ color: "var(--gold)" }}>{note.abv}</p>
        </div>

        {/* RIGHT — serves / pairings / listings */}
        <div className="flex-shrink-0 flex flex-col gap-6 pt-2" style={{ width: "24%" }}>
          <p className="text-[11px] tracking-[0.3em] uppercase" style={{ color: "var(--muted-foreground)" }}>
            {rightTitle}
          </p>

          {note.serves?.map((s) => (
            <div key={s.name} className="border rounded-lg p-4" style={{ borderColor: "var(--border)", backgroundColor: "var(--card)" }}>
              <p className="text-sm font-bold mb-2" style={{ color: "var(--gold)" }}>{s.name}</p>
              {s.ingredients.map((ing, i) => (
                <p key={i} className="text-xs leading-relaxed" style={{ color: "var(--foreground)" }}>{ing}</p>
              ))}
            </div>
          ))}

          {note.pairings?.map((p) => (
            <div key={p.category} className="border rounded-lg p-4" style={{ borderColor: "var(--border)", backgroundColor: "var(--card)" }}>
              <p className="text-sm font-bold mb-1" style={{ color: "var(--gold)" }}>{p.category}</p>
              <p className="text-xs leading-relaxed" style={{ color: "var(--foreground)" }}>{p.detail}</p>
            </div>
          ))}

          {note.listings?.map((l, i) => (
            <div key={i} className="border rounded-lg p-4" style={{ borderColor: "var(--border)", backgroundColor: "var(--card)" }}>
              <p className="text-xs leading-relaxed font-medium" style={{ color: "var(--foreground)" }}>{l}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Bottom nav */}
      <div className="flex items-center justify-between px-8 pb-6">
        <button onClick={goPrev} disabled={variantIdx === 0}
                className="text-xs tracking-widest uppercase disabled:opacity-30"
                style={{ color: "var(--gold)" }}>
          ← Back
        </button>
        <span className="text-xs" style={{ color: "var(--muted-foreground)" }}>
          {variantIdx + 1} / {notes.length}
        </span>
        <button onClick={goNext} disabled={variantIdx === notes.length - 1}
                className="text-xs tracking-widest uppercase disabled:opacity-30"
                style={{ color: "var(--gold)" }}>
          Next →
        </button>
      </div>
    </div>
  );
}
