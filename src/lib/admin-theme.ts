import type { CSSProperties } from "react";

/**
 * The admin back office renders on a near-black surface, but the global
 * `--accent` is near-black Ivy — so `text-accent` / `border-accent` / `bg-accent`
 * elements are invisible there. Apply this to a dark admin page's root to scope a
 * legible sage accent, with a dark accent-foreground so the sage-background
 * buttons keep their contrast.
 */
export const DARK_ADMIN_ACCENT: CSSProperties = {
  ["--accent" as string]: "#8fb08f",
  ["--accent-foreground" as string]: "#0a1410",
  ["--color-accent" as string]: "#8fb08f",
  ["--color-accent-foreground" as string]: "#0a1410",
};
