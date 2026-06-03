"use client";

import React from "react";
import { useParams, useRouter } from "next/navigation";
import Link from "next/link";
import { useBrands } from "@/hooks/useBrands";
import { PRESENTATION_TEMPLATES } from "@/types/presentation";

export default function PackageDetailPage() {
  const { id } = useParams<{ id: string }>();
  const router = useRouter();
  const { brands } = useBrands();

  const template = PRESENTATION_TEMPLATES.find((t) => t.id === id);

  if (!template) {
    return (
      <div className="p-10">
        <p className="text-gray-400">Package not found.</p>
        <Link href="/packages" className="text-sm underline mt-4 block" style={{ color: "var(--accent)" }}>
          Back to Packages
        </Link>
      </div>
    );
  }

  const templateBrands = brands.filter((b) =>
    template.brandSlugs.includes(b.slug)
  );

  return (
    <div className="p-10 min-h-screen bg-white">

      {/* Header */}
      <button
        onClick={() => router.push("/packages")}
        className="text-xs tracking-widest uppercase mb-6 block"
        style={{ color: "var(--muted-foreground)" }}
      >
        &larr; All Packages
      </button>

      <h1
        className="text-4xl font-light mb-1 tracking-tight"
        style={{ color: "var(--accent)" }}
      >
        {template.name}
      </h1>
      <p className="text-sm mb-10" style={{ color: "var(--muted-foreground)" }}>
        {template.description}
      </p>

      {/* Brand grid */}
      <div className="grid grid-cols-3 gap-8">
        {templateBrands.map((brand) => (
          <Link
            key={brand.slug}
            href={`/brands/${brand.slug}`}
            className="group block rounded-xl overflow-hidden border border-gray-200 hover:border-gray-400 transition-colors bg-white"
          >
            {/* Bottle shot */}
            <div
              className="h-52 flex items-end justify-center px-4 pb-4"
              style={{ backgroundColor: "var(--muted)" }}
            >
              {brand.variants[0]?.image?.url || brand.heroImage?.url ? (
                <img
                  src={brand.variants[0]?.image?.url || brand.heroImage?.url}
                  alt={brand.name}
                  className="object-contain"
                  style={{ maxHeight: "180px" }}
                />
              ) : (
                <div className="text-xs text-gray-400">{brand.name}</div>
              )}
            </div>

            {/* Brand info */}
            <div className="p-5 border-t border-gray-100">
              <p
                className="text-xs tracking-widest uppercase mb-1"
                style={{ color: "var(--muted-foreground)" }}
              >
                {brand.category}
              </p>
              <h2
                className="text-lg font-medium mb-1"
                style={{ color: "var(--accent)" }}
              >
                {brand.name}
              </h2>
              <p className="text-xs leading-relaxed line-clamp-2" style={{ color: "var(--muted-foreground)" }}>
                {brand.tagline}
              </p>
              {brand.variants.length > 0 && (
                <p
                  className="text-xs mt-3 tracking-widest uppercase font-semibold"
                  style={{ color: "var(--gold)" }}
                >
                  {brand.variants.length} SKUs
                </p>
              )}
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
