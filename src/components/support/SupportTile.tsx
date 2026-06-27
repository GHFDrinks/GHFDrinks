import React from "react";

export function SupportTile({ title, badge }: { title: string; badge?: string }) {
  return (
    <div className="rounded-lg border border-[var(--border)] bg-[var(--card)] p-5 flex flex-col gap-2 shadow-md hover:border-[var(--sage)]/50 transition-all duration-300">
      <h3 className="text-base font-semibold uppercase tracking-wide text-[var(--foreground)]">{title}</h3>
      {badge && (
        <span className="text-xs uppercase tracking-widest text-[var(--sage)]">{badge}</span>
      )}
    </div>
  );
}
