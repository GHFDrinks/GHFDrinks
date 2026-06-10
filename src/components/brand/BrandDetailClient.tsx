"use client";

import React, { useEffect, useState } from "react";
import { Brand } from "@/types/brand";
import { useBrands } from "@/hooks/useBrands";
import { getBrandImages } from "@/lib/brand-images";
import { getTastingNotesForBrand } from "@/data/tasting-notes";
import { BrandActivationSlide } from "./BrandActivationSlide";

export function BrandDetailClient({ initialBrand }: { initialBrand: Brand }) {
  const [brand, setBrand] = useState<Brand>(initialBrand);
  const { brands } = useBrands();
  const [variantIdx, setVariantIdx] = useState(0);

  useEffect(() => {
    const live = brands.find((b) => b.slug === initialBrand.slug);
    if (live) setBrand(live);
  }, [brands, initialBrand.slug]);

  useEffect(() => { setVariantIdx(0); }, [brand.slug]);

  const local = getBrandImages(brand.slug);
  const notes = getTastingNotesForBrand(brand.slug);
  const note = notes[Math.min(variantIdx, Math.max(notes.length - 1, 0))];
  const heroBg = local?.lifestyle?.[0] || "";
  const bottle = local?.variants?.[variantIdx] || local?.hero || "";

  const sections = [
    { id: "overview", label: "Overview" },
    ...(note?.features?.length ? [{ id: "features", label: "Key Features" }] : []),
    ...(note?.serves?.length || note?.pairings?.length ? [{ id: "serves", label: note?.serves ? "Serves" : "Pairings" }] : []),
    ...(brand.activations?.length ? [{ id: "activations", label: "Activations" }] : []),
  ];

  function scrollTo(id: string) {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  }

  return (
    <div style={{ backgroundColor: "var(--background)" }}>

      {/* ───── HERO: text left, bottle right over lifestyle backdrop ───── */}
      <section id="overview" className="relative h-screen w-full overflow-hidden flex">
        {heroBg && (
          <img src={heroBg} alt="" className="absolute inset-0 w-full h-full object-cover" style={{ filter: "brightness(0.35)" }} />
        )}
        <div className="absolute inset-0 bg-gradient-to-r from-[rgba(11,19,16,0.95)] via-[rgba(11,19,16,0.7)] to-transparent" />

        {/* LEFT — nav + text */}
        <div className="relative z-10 flex flex-col justify-center pl-14 pr-8" style={{ width: "46%" }}>
          {local?.logo ? (
            <img src={local.logo} alt={brand.name} className="max-h-16 max-w-[200px] object-contain mb-6" />
          ) : null}
          <h1 className="text-5xl font-light tracking-tight mb-5" style={{ color: "var(--gold)" }}>
            {brand.name}
          </h1>
          <p className="text-base leading-relaxed mb-8 max-w-md" style={{ color: "var(--foreground)" }}>
            {brand.story?.description || brand.tagline}
          </p>

          {/* Section nav */}
          <div className="flex flex-col gap-2 mb-8">
            {sections.map((s) => (
              <button key={s.id} onClick={() => scrollTo(s.id)}
                      className="text-left text-xs tracking-[0.25em] uppercase py-1.5 transition-colors hover:text-[var(--gold)]"
                      style={{ color: "var(--muted-foreground)" }}>
                — {s.label}
              </button>
            ))}
          </div>

          {/* Variant switcher */}
          {notes.length > 1 && (
            <div className="flex gap-2 flex-wrap">
              {notes.map((n, i) => (
                <button key={n.variant} onClick={() => setVariantIdx(i)}
                        className="px-3 py-1.5 text-[10px] tracking-widest uppercase border rounded"
                        style={{
                          borderColor: i === variantIdx ? "var(--gold)" : "var(--border)",
                          color: i === variantIdx ? "var(--gold)" : "var(--muted-foreground)",
                        }}>
                  {n.variant.split("|")[0].trim()}
                </button>
              ))}
            </div>
          )}

          {brand.bcorp && (
            <span className="mt-6 inline-block w-fit text-[10px] font-semibold border rounded-full px-3 py-1"
                  style={{ borderColor: "var(--gold)", color: "var(--gold)" }}>
              Certified B Corporation
            </span>
          )}
        </div>

        {/* RIGHT — hero bottle */}
        <div className="relative z-10 flex-1 flex items-end justify-center pb-10">
          {bottle && (
            <img src={bottle} alt={brand.name} className="object-contain drop-shadow-2xl" style={{ maxHeight: "82vh", maxWidth: "70%" }} />
          )}
        </div>
      </section>

      {/* ───── KEY FEATURES (Botanicals style) ───── */}
      {note?.features?.length ? (
        <section id="features" className="min-h-screen flex items-center px-14 py-16 gap-12">
          <div className="flex-1">
            <p className="text-[11px] tracking-[0.3em] uppercase mb-2" style={{ color: "var(--muted-foreground)" }}>
              {note.variant}
            </p>
            <h2 className="text-4xl font-light tracking-tight mb-8" style={{ color: "var(--gold)" }}>
              Key Product Features
            </h2>
            <div className="grid grid-cols-3 gap-5 max-w-lg mb-10">
              {note.features.map((f) => (
                <div key={f} className="aspect-square rounded-full border-2 flex items-center justify-center text-center p-3"
                     style={{ borderColor: "var(--gold)", backgroundColor: "var(--card)" }}>
                  <span className="text-[11px] font-semibold leading-tight" style={{ color: "var(--foreground)" }}>{f}</span>
                </div>
              ))}
            </div>
            <p className="text-sm font-bold mb-3" style={{ color: "var(--foreground)" }}>Taste Profile</p>
            <ul className="space-y-2 max-w-md mb-6">
              {note.tasteProfile.map((t, i) => (
                <li key={i} className="text-sm leading-relaxed" style={{ color: "var(--foreground)" }}>• {t}</li>
              ))}
            </ul>
            <p className="text-3xl font-bold" style={{ color: "var(--gold)" }}>{note.abv}</p>
          </div>
          <div className="flex-shrink-0 rounded-xl overflow-hidden" style={{ width: "34%" }}>
            {(local?.lifestyle?.[1] || heroBg) && (
              <img src={local?.lifestyle?.[1] || heroBg} alt="" className="w-full object-cover" style={{ height: "70vh" }} />
            )}
          </div>
        </section>
      ) : null}

      {/* ───── SERVES / PAIRINGS ───── */}
      {(note?.serves?.length || note?.pairings?.length || note?.listings?.length) ? (
        <section id="serves" className="min-h-screen flex items-center px-14 py-16 gap-12">
          <div className="flex-shrink-0 rounded-xl overflow-hidden" style={{ width: "38%" }}>
            {(local?.lifestyle?.[2] || heroBg) && (
              <img src={local?.lifestyle?.[2] || heroBg} alt="" className="w-full object-cover" style={{ height: "74vh" }} />
            )}
          </div>
          <div className="flex-1">
            <h2 className="text-4xl font-light tracking-tight mb-8" style={{ color: "var(--gold)" }}>
              {note.serves ? "Serves" : note.pairings ? "Food Pairings" : "Listings"}
            </h2>
            <div className="grid grid-cols-2 gap-5 max-w-2xl">
              {note.serves?.map((s) => (
                <div key={s.name} className="border rounded-xl p-5" style={{ borderColor: "var(--border)", backgroundColor: "var(--card)" }}>
                  <p className="text-base font-bold mb-3" style={{ color: "var(--gold)" }}>{s.name}</p>
                  {s.ingredients.map((ing, i) => (
                    <p key={i} className="text-sm leading-relaxed" style={{ color: "var(--foreground)" }}>{ing}</p>
                  ))}
                </div>
              ))}
              {note.pairings?.map((p) => (
                <div key={p.category} className="border rounded-xl p-5" style={{ borderColor: "var(--border)", backgroundColor: "var(--card)" }}>
                  <p className="text-base font-bold mb-2" style={{ color: "var(--gold)" }}>{p.category}</p>
                  <p className="text-sm leading-relaxed" style={{ color: "var(--foreground)" }}>{p.detail}</p>
                </div>
              ))}
              {note.listings?.map((l, i) => (
                <div key={i} className="border rounded-xl p-5" style={{ borderColor: "var(--border)", backgroundColor: "var(--card)" }}>
                  <p className="text-sm leading-relaxed font-medium" style={{ color: "var(--foreground)" }}>{l}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      ) : null}

      {/* ───── ACTIVATIONS (existing slide) ───── */}
      {brand.activations?.length ? (
        <section id="activations">
          <BrandActivationSlide brand={brand} />
        </section>
      ) : null}
    </div>
  );
}
