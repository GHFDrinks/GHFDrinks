"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { useBrands } from "@/hooks/useBrands";
import { getBrandImages } from "@/lib/brand-images";
import { usePresentationStore } from "@/lib/presentation-store";
import { v4 as uuidv4 } from "uuid";
import { Brand } from "@/types/brand";
import { SlideType } from "@/types/presentation";
import { mockBrands } from "@/data/brands";

export default function BrandSelectionPage() {
  const router = useRouter();
  const { brands, loading } = useBrands();
  const { savePresentation } = usePresentationStore();
  const [selected, setSelected] = useState<string[]>([]);
  const [name, setName] = useState("");
  const [building, setBuilding] = useState(false);

  function toggle(slug: string) {
    setSelected((prev) =>
      prev.includes(slug) ? prev.filter((s) => s !== slug) : [...prev, slug]
    );
  }

  async function buildPresentation() {
    if (selected.length === 0) return;
    setBuilding(true);

    try {
      const id = uuidv4();
      const availableBrands = brands.length > 0 ? brands : mockBrands;

      // Map selection order to full brand objects
      const selectedBrands = selected
        .map((slug) => availableBrands.find((b) => b.slug === slug))
        .filter(Boolean) as Brand[];

      // Auto-generate slides based on brand capabilities (matching PresentationBuilder)
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

      const dateStr = new Date().toLocaleDateString("en-GB", {
        day: "2-digit",
        month: "long",
        year: "numeric"
      });

      const finalName = name.trim() || `GHF Presentation — ${dateStr}`;

      await savePresentation({
        id,
        name: finalName,
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

  const ordered = brands.length > 0 ? brands : mockBrands;

  return (
    <div className="min-h-screen flex flex-col px-12 py-10" style={{ backgroundColor: "var(--background)" }}>

      {/* Header */}
      <div className="mb-8 space-y-4">
        <button onClick={() => router.push("/presentations")} className="text-xs tracking-widest uppercase mb-4 block"
                style={{ color: "var(--muted-foreground)" }}>
          ← Back
        </button>
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h1 className="text-4xl font-light tracking-tight mb-1" style={{ color: "var(--foreground)" }}>
              Brand Selection
            </h1>
            <p className="text-sm" style={{ color: "var(--muted-foreground)" }}>
              Select the brands most relevant to your customer, then build the presentation.
            </p>
          </div>

          <div className="w-full md:w-80">
            <label className="text-[10px] tracking-widest uppercase font-bold text-[var(--sage)] mb-1 block">
              Presentation Name
            </label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="e.g. The Grand Hotel — June Visit"
              className="w-full bg-[var(--card)] border border-white/10 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:border-[var(--sage)] text-[var(--cream)] transition-colors"
            />
          </div>
        </div>
      </div>

      {/* Brand photo-card grid */}
      {loading && brands.length === 0 ? (
        <p className="text-sm" style={{ color: "var(--muted-foreground)" }}>Loading brands...</p>
      ) : (
        <div className="grid grid-cols-4 gap-4 max-w-6xl pb-28">
          {ordered.map((b) => {
            const local = getBrandImages(b.slug);
            const photo = local?.lifestyle?.[0] || local?.hero || "";
            const isSelected = selected.includes(b.slug);
            return (
              <button
                key={b.slug}
                onClick={() => toggle(b.slug)}
                className="relative rounded-xl overflow-hidden text-left transition-all hover:scale-[1.02] group"
                style={{
                  border: isSelected ? "2px solid var(--sage)" : "2px solid var(--border)",
                  height: "170px",
                }}
              >
                {photo ? (
                  <img src={photo} alt={b.name}
                       className="absolute inset-0 w-full h-full object-cover"
                       style={{ filter: isSelected ? "brightness(0.85)" : "brightness(0.6)" }} />
                ) : (
                  <div className="absolute inset-0" style={{ backgroundColor: "var(--card)" }} />
                )}
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />

                {/* Selected check */}
                {isSelected && (
                  <div className="absolute top-3 right-3 w-7 h-7 rounded-full flex items-center justify-center"
                       style={{ backgroundColor: "var(--sage)" }}>
                    <span className="text-sm font-bold" style={{ color: "var(--background)" }}>✓</span>
                  </div>
                )}

                <div className="absolute bottom-0 left-0 right-0 p-4">
                  <p className="text-sm font-semibold tracking-wide text-white">{b.name}</p>
                  <p className="text-[10px] tracking-widest uppercase text-white/60">{b.category}</p>
                </div>
              </button>
            );
          })}
        </div>
      )}

      {/* Sticky build CTA */}
      <div className="fixed bottom-0 left-0 right-0 px-12 py-5 flex items-center justify-between"
           style={{ backgroundColor: "rgba(250,248,243,0.95)", borderTop: "1px solid var(--border)", backdropFilter: "blur(8px)" }}>
        <p className="text-xs tracking-widest uppercase" style={{ color: "var(--muted-foreground)" }}>
          {selected.length} brand{selected.length !== 1 ? "s" : ""} selected
        </p>
        <button
          onClick={buildPresentation}
          disabled={selected.length === 0 || building}
          className="px-8 py-3 text-sm font-bold tracking-[0.25em] uppercase rounded transition-opacity disabled:opacity-30"
          style={{ backgroundColor: "var(--accent-orange)", color: "var(--cream)" }}
        >
          {building ? "Building..." : "Build Presentation →"}
        </button>
      </div>
    </div>
  );
}