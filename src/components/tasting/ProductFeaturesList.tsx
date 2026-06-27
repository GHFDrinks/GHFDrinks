"use client";
import { useState } from "react";
import type { ProductFeature } from "@/data/tasting-notes";

export function ProductFeaturesList({ features }: { features: ProductFeature[] }) {
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  return (
    <div className="flex flex-col gap-3">
      {features.map((f, i) => {
        const open = openIndex === i;
        return (
          <button
            key={i}
            onClick={() => setOpenIndex(open ? null : i)}
            className="text-left rounded-lg border border-[var(--border)] bg-[var(--card)] px-5 py-4 transition-all hover:border-[var(--sage)]"
          >
            <div className="flex items-center justify-between">
              <span className="text-sm font-semibold tracking-wide uppercase text-[var(--foreground)]">
                {f.title}
              </span>
              <span className="text-xs text-[var(--muted-foreground)]">
                {open ? "−" : "+"}
              </span>
            </div>
            <div
              className={`overflow-hidden transition-all duration-200 ${open ? "max-h-24 mt-2" : "max-h-0"}`}
            >
              <p className="text-sm text-[var(--muted-foreground)] leading-relaxed">
                {f.description}
              </p>
            </div>
          </button>
        );
      })}
    </div>
  );
}
