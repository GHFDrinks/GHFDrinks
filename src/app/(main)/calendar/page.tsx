"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useBrands } from "@/hooks/useBrands";

const MONTHS = [
  "January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December",
];

export default function CalendarPage() {
  const { brands, loading } = useBrands();
  const [activeMonth, setActiveMonth] = useState<string | null>(null);

  // Build a flat list of all key dates across all activations
  const allEntries = brands.flatMap((b) =>
    (b.activations || []).flatMap((a) =>
      (a.keyDates || []).map((date) => ({
        date,
        activationTitle: a.title,
        activationType: a.activationType,
        brandName: b.name,
        brandSlug: b.slug,
      }))
    )
  );

  // Group by which month keyword appears in the date string
  const byMonth: Record<string, typeof allEntries> = {};
  MONTHS.forEach((m) => {
    const matches = allEntries.filter((e) =>
      e.date.toLowerCase().includes(m.toLowerCase())
    );
    if (matches.length > 0) byMonth[m] = matches;
  });

  // Entries not matching any month
  const ungrouped = allEntries.filter(
    (e) => !MONTHS.some((m) => e.date.toLowerCase().includes(m.toLowerCase()))
  );

  return (
    <div className="p-10 min-h-screen bg-[var(--background)]">
      <h1
        className="text-4xl font-light mb-1 tracking-tight"
        style={{ color: "var(--accent)" }}
      >
        Activation Calendar
      </h1>
      <p className="text-sm mb-10" style={{ color: "var(--muted-foreground)" }}>
        Key dates across the GHF portfolio
      </p>

      {loading ? (
        <p className="text-sm" style={{ color: "var(--muted-foreground)" }}>Loading...</p>
      ) : (
        <div className="space-y-4">
          {Object.entries(byMonth).map(([month, entries]) => (
            <div
              key={month}
              className="border border-[var(--border)] rounded-xl overflow-hidden"
            >
              <button
                onClick={() =>
                  setActiveMonth(activeMonth === month ? null : month)
                }
                className="w-full flex items-center justify-between px-6 py-4 hover:bg-[var(--card)] transition-colors"
              >
                <span
                  className="text-base font-medium"
                  style={{ color: "var(--accent)" }}
                >
                  {month}
                </span>
                <span
                  className="text-xs tracking-widest"
                  style={{ color: "var(--muted-foreground)" }}
                >
                  {entries.length} event{entries.length !== 1 ? "s" : ""}
                </span>
              </button>

              {activeMonth === month && (
                <div className="border-t border-[var(--border)]">
                  {entries.map((e, i) => (
                    <Link
                      key={i}
                      href={`/brands/${e.brandSlug}`}
                      className="flex items-start gap-4 px-6 py-3 border-b border-[var(--border)] last:border-0 hover:bg-[var(--card)] transition-colors"
                    >
                      <div className="flex-1">
                        <p
                          className="text-xs font-semibold tracking-widest uppercase mb-0.5"
                          style={{ color: "var(--gold)" }}
                        >
                          {e.brandName}
                        </p>
                        <p
                          className="text-sm"
                          style={{ color: "var(--accent)" }}
                        >
                          {e.activationTitle}
                        </p>
                        <p
                          className="text-xs mt-0.5"
                          style={{ color: "var(--muted-foreground)" }}
                        >
                          {e.date}
                        </p>
                      </div>
                      {e.activationType && (
                        <span
                          className="text-[10px] tracking-widest uppercase border rounded px-2 py-0.5 flex-shrink-0"
                          style={{
                            borderColor: "var(--border)",
                            color: "var(--muted-foreground)",
                          }}
                        >
                          {e.activationType}
                        </span>
                      )}
                    </Link>
                  ))}
                </div>
              )}
            </div>
          ))}

          {/* Ungrouped dates */}
          {ungrouped.length > 0 && (
            <div className="border border-[var(--border)] rounded-xl overflow-hidden">
              <button
                onClick={() =>
                  setActiveMonth(activeMonth === "other" ? null : "other")
                }
                className="w-full flex items-center justify-between px-6 py-4 hover:bg-[var(--card)] transition-colors"
              >
                <span
                  className="text-base font-medium"
                  style={{ color: "var(--accent)" }}
                >
                  Seasonal / Ongoing
                </span>
                <span
                  className="text-xs tracking-widest"
                  style={{ color: "var(--muted-foreground)" }}
                >
                  {ungrouped.length} events
                </span>
              </button>
              {activeMonth === "other" && (
                <div className="border-t border-[var(--border)]">
                  {ungrouped.map((e, i) => (
                    <Link
                      key={i}
                      href={`/brands/${e.brandSlug}`}
                      className="flex items-start gap-4 px-6 py-3 border-b border-[var(--border)] last:border-0 hover:bg-[var(--card)] transition-colors"
                    >
                      <div className="flex-1">
                        <p
                          className="text-xs font-semibold tracking-widest uppercase mb-0.5"
                          style={{ color: "var(--gold)" }}
                        >
                          {e.brandName}
                        </p>
                        <p className="text-sm" style={{ color: "var(--accent)" }}>
                          {e.activationTitle}
                        </p>
                        <p
                          className="text-xs mt-0.5"
                          style={{ color: "var(--muted-foreground)" }}
                        >
                          {e.date}
                        </p>
                      </div>
                    </Link>
                  ))}
                </div>
              )}
            </div>
          )}

          {Object.keys(byMonth).length === 0 && ungrouped.length === 0 && (
            <p className="text-sm" style={{ color: "var(--muted-foreground)" }}>
              No key dates yet. Add them to activations via the admin panel.
            </p>
          )}
        </div>
      )}
    </div>
  );
}
