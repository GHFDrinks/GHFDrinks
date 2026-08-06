"use client";

import React from "react";
import { useParams, useRouter } from "next/navigation";
import { STATIC_BRANDS } from "@/lib/static-brands";
import { useBrands } from "@/hooks/useBrands";
import { POS_LIBRARY } from "@/data/pos-library";
import { Download } from "lucide-react";

export default function BrandPosLibraryPage() {
  const params = useParams();
  const router = useRouter();
  const brandSlug = params.brandSlug as string;

  const { brands } = useBrands();
  const brand =
    brands.find((b) => b.slug === brandSlug) || STATIC_BRANDS.find((b) => b.slug === brandSlug);

  if (!brand) {
    return (
      <div className="min-h-screen px-12 py-10" style={{ backgroundColor: "var(--background)" }}>
        <h1 className="text-2xl font-light text-[var(--foreground)]">Brand not found</h1>
        <button
          onClick={() => router.push("/resources/pos")}
          className="text-xs uppercase tracking-widest text-[var(--sage)] hover:underline mt-4 cursor-pointer"
        >
          ← Back to POS Library
        </button>
      </div>
    );
  }

  // Prefer admin-managed POS items (from the brand record); fall back to the
  // bundled static library. Cap at 15 items total.
  const brandPos = (brand as { posLibrary?: Array<Record<string, string>> }).posLibrary;
  const posItems = (
    brandPos && brandPos.length > 0
      ? brandPos
      : POS_LIBRARY.filter((item) => item.brandSlug === brandSlug)
  ).slice(0, 15);

  const hasFile = (url?: string) => !!url && url !== "#" && url.trim() !== "";

  // SharePoint / OneDrive share links open a viewer by default; appending the
  // download flag makes them fetch the actual file. Left untouched for any other
  // host (e.g. a direct PDF or Supabase Storage link already downloads).
  const resolveDownloadUrl = (url: string) => {
    try {
      const u = new URL(url);
      if (u.hostname.endsWith("sharepoint.com") || u.hostname.endsWith("onedrive.live.com") || u.hostname.endsWith("1drv.ms")) {
        if (!u.searchParams.has("download")) u.searchParams.set("download", "1");
        return u.toString();
      }
    } catch {
      /* not an absolute URL — leave as-is */
    }
    return url;
  };

  return (
    <div className="min-h-screen px-12 py-10 flex flex-col justify-between" style={{ backgroundColor: "var(--background)" }}>
      <div className="space-y-8">
        {/* Header */}
        <div className="flex items-center justify-between border-b border-[var(--border)] pb-6">
          <button
            onClick={() => router.push("/resources/pos")}
            className="flex items-center gap-2 text-xs font-bold tracking-widest uppercase text-[var(--sage)] hover:text-[var(--foreground)] transition-colors border border-[var(--sage)]/30 hover:border-[var(--sage)] px-4 py-2 rounded-full bg-[var(--card)] cursor-pointer"
          >
            ← Back to brand list
          </button>
          <div className="text-right">
            <span className="text-[10px] tracking-[0.35em] uppercase text-[var(--sage)] font-bold block mb-1">
              {brand.name} Collateral
            </span>
            <h1 className="text-2xl font-light text-[var(--foreground)]">POS Library</h1>
          </div>
        </div>

        {/* POS Grid list */}
        {posItems.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {posItems.map((item) => (
              <div
                key={item.id}
                className="group flex flex-col bg-[var(--card)] border border-[var(--border)] rounded-2xl overflow-hidden transition-all duration-300 hover:border-[var(--sage)]/50 hover:shadow-[0_12px_32px_-14px_rgba(0,0,0,0.3)]"
              >
                {/* Preview image */}
                <div className="aspect-[4/3] overflow-hidden bg-[var(--muted)]">
                  <img
                    src={item.image}
                    alt={item.title}
                    loading="lazy"
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-[1.04]"
                  />
                </div>

                {/* Body */}
                <div className="flex flex-col flex-1 p-5">
                  <span className="text-[10px] font-semibold uppercase tracking-[0.2em] text-[var(--sage)]">
                    POS · Asset Package
                  </span>
                  <h3 className="mt-2 text-[15px] font-semibold text-[var(--foreground)] leading-snug">
                    {item.title}
                  </h3>
                  {item.description && (
                    <p className="mt-1.5 text-[13px] text-[var(--muted-foreground)] leading-relaxed line-clamp-3">
                      {item.description}
                    </p>
                  )}

                  {/* Footer action */}
                  <div className="mt-auto pt-5 flex items-center justify-between">
                    {hasFile(item.downloadUrl) ? (
                      <a
                        href={resolveDownloadUrl(item.downloadUrl!)}
                        download
                        target="_blank"
                        rel="noopener noreferrer"
                        onClick={(e) => e.stopPropagation()}
                        className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-[var(--foreground)] text-[var(--background)] hover:opacity-90 text-[11px] font-bold uppercase tracking-wider transition-opacity"
                      >
                        <Download className="w-4 h-4" />
                        Download PDF
                      </a>
                    ) : (
                      <span className="text-[11px] uppercase tracking-wider text-[var(--muted-foreground)]/70 italic">
                        File coming soon
                      </span>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="py-20 text-center border border-dashed border-[var(--border)] rounded-xl bg-[var(--card)]/20">
            <p className="text-sm text-[var(--muted-foreground)] leading-relaxed">
              No point-of-sale catalog items registered for {brand.name} yet.
            </p>
            <p className="text-xs text-[var(--sage)] mt-1">
              Collateral packs and menu print mockups can be added in the Back Office dashboard.
            </p>
          </div>
        )}
      </div>

      {/* Footer copyright */}
      <div className="text-[9px] tracking-wider text-[var(--muted-foreground)]/65 mt-16 text-center uppercase border-t border-[var(--border)]/50 pt-4">
        * Brand POS materials can be requested via marketing coordinator.
      </div>
    </div>
  );
}
