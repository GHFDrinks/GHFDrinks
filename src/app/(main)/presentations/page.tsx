"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { usePresentation } from "@/lib/presentation-store";
import { useBrands } from "@/hooks/useBrands";
import { getBrandImages } from "@/lib/brand-images";
import { Presentation } from "@/types/presentation";

export default function PresentationsPage() {
  const { savedPresentations, deletePresentation } = usePresentation();
  const { brands } = useBrands();
  const router = useRouter();
  const [generatingId, setGeneratingId] = useState<string | null>(null);

  const handleDownloadPdf = async (presentation: Presentation) => {
    setGeneratingId(presentation.id);
    try {
      const { generatePresentationPdf } = await import("@/lib/presentation-pdf");
      await generatePresentationPdf(presentation, brands);
    } catch (err) {
      console.error("Failed to generate PDF:", err);
    } finally {
      setGeneratingId(null);
    }
  };

  return (
    <div className="p-10 min-h-screen bg-[var(--background)]">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1
            className="text-4xl font-light mb-1 tracking-tight"
            style={{ color: "var(--accent)" }}
          >
            Presentations
          </h1>
          <p className="text-sm" style={{ color: "var(--muted-foreground)" }}>
            Saved bespoke presentations for trade customers
          </p>
        </div>
        <Link
          href="/presentations/new"
          className="px-5 py-2.5 text-sm font-medium rounded-lg text-white transition-opacity whitespace-nowrap"
          style={{ backgroundColor: "var(--accent)" }}
        >
          + New Presentation
        </Link>
      </div>

      {savedPresentations.length === 0 ? (
        <div
          className="border border-dashed rounded-xl p-16 text-center"
          style={{ borderColor: "var(--border)" }}
        >
          <p
            className="text-sm mb-4"
            style={{ color: "var(--muted-foreground)" }}
          >
            No presentations saved yet.
          </p>
          <Link
            href="/presentations/new"
            className="text-sm underline"
            style={{ color: "var(--accent)" }}
          >
            Build your first presentation
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-3 gap-6">
          {savedPresentations.map((p) => {
            const presentationBrands = p.brands
              .map((id) => brands.find((b) => b.id === id))
              .filter(Boolean) as typeof brands;

            return (
              <div
                key={p.id}
                className="border border-[var(--border)] rounded-xl overflow-hidden bg-[var(--background)] hover:border-[var(--sage)] transition-colors"
              >
                {/* Mini brand strip */}
                <div
                  className="h-28 flex items-end justify-center gap-2 px-4 pb-3"
                  style={{ backgroundColor: "var(--muted)" }}
                >
                  {presentationBrands.slice(0, 5).map((b) => {
                    const local = getBrandImages(b.slug);
                    const imgUrl = b.variants[0]?.image?.url || local?.variants?.[0] || b.heroImage?.url || local?.hero || "";
                    return imgUrl ? (
                      <img
                        key={b.id}
                        src={imgUrl}
                        alt={b.name}
                        className="object-contain"
                        style={{ maxHeight: "90px", maxWidth: "50px" }}
                      />
                    ) : (
                      <div
                        key={b.id}
                        className="text-[9px] text-center text-[var(--muted-foreground)] leading-tight"
                        style={{ width: "50px" }}
                      >
                        {b.name}
                      </div>
                    );
                  })}
                </div>

                {/* Info */}
                <div className="p-4">
                  <h2
                    className="text-base font-medium mb-1 leading-tight"
                    style={{ color: "var(--accent)" }}
                  >
                    {p.name}
                  </h2>
                  <p
                    className="text-xs mb-3"
                    style={{ color: "var(--muted-foreground)" }}
                  >
                    {presentationBrands.length} brand
                    {presentationBrands.length !== 1 ? "s" : ""} ·{" "}
                    {new Date(p.dateCreated).toLocaleDateString("en-GB", {
                      day: "numeric",
                      month: "short",
                      year: "numeric",
                    })}
                  </p>

                  <div className="flex items-center gap-3">
                    <Link
                      href={`/presentations/new?clone=${p.id}`}
                      className="text-xs underline hover:text-[var(--sage)] transition-colors"
                      style={{ color: "var(--muted-foreground)" }}
                    >
                      Edit
                    </Link>
                    <button
                      onClick={() => deletePresentation(p.id)}
                      className="text-xs text-red-400 hover:text-red-600 transition-colors"
                    >
                      Delete
                    </button>
                    <button
                      onClick={() => handleDownloadPdf(p)}
                      disabled={generatingId !== null}
                      className="text-xs text-[var(--sage)] hover:text-[var(--foreground)] transition-colors disabled:opacity-50"
                    >
                      {generatingId === p.id ? "Preparing PDF..." : "Download PDF"}
                    </button>
                    <div className="flex-1" />
                    <button
                      onClick={() =>
                        router.push(`/present-mode/${p.id}`)
                      }
                      className="px-3 py-1.5 text-xs font-medium rounded-lg text-white hover:opacity-90 transition-opacity"
                      style={{ backgroundColor: "var(--accent)" }}
                    >
                      Present
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
