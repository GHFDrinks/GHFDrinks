import React from "react";

/**
 * A support option tile — half image, half description (no price), matching the
 * GHF Support page style. The "image half" is a branded placeholder that real
 * imagery can replace later.
 */
export function SupportTile({
  title,
  description,
  badge,
}: {
  title: string;
  description?: string;
  badge?: string;
}) {
  const initials = title
    .replace(/[^A-Za-z0-9& ]/g, "")
    .split(" ")
    .filter(Boolean)
    .map((w) => w[0])
    .join("")
    .slice(0, 3)
    .toUpperCase();

  return (
    <div className="rounded-lg border border-[var(--border)] bg-[var(--card)] overflow-hidden shadow-md hover:border-[var(--sage)]/50 transition-all duration-300 flex flex-col h-full">
      {/* Image half — branded placeholder */}
      <div className="relative aspect-[16/9] w-full bg-gradient-to-br from-[var(--sage)]/25 to-[var(--foreground)]/10 flex items-center justify-center">
        <span className="text-[var(--sage)] text-lg font-semibold tracking-[0.25em] uppercase opacity-70">
          {initials}
        </span>
        {badge && (
          <span className="absolute bottom-2 right-2 text-[9px] uppercase tracking-widest text-[var(--sage)] bg-[var(--background)]/85 px-2 py-0.5 rounded">
            {badge}
          </span>
        )}
      </div>
      {/* Description half */}
      <div className="p-4 flex flex-col gap-1.5 flex-1">
        <h3 className="text-sm font-semibold uppercase tracking-wide text-[var(--foreground)] leading-tight">
          {title}
        </h3>
        {description && (
          <p className="text-xs text-[var(--muted-foreground)] leading-relaxed">{description}</p>
        )}
      </div>
    </div>
  );
}
