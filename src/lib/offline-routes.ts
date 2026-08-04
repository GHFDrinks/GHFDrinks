import { Brand } from "@/types/brand";
import { BRAND_SUPPORT } from "@/data/brand-support";
import { TASTING_NOTES } from "@/data/tasting-notes";
import { SERVES_DATA } from "@/data/serves";
import { CASE_STUDIES } from "@/data/case-studies";
import { HALO_OUTLETS } from "@/data/halo-outlets";
import { POS_LIBRARY } from "@/data/pos-library";
import { BRAND_INSIGHTS } from "@/data/brand-insights";
import { BRAND_STORIES } from "@/data/brand-stories";
import { PROMOTIONS } from "@/data/promotions";
import { GHF_CAMPAIGNS } from "@/data/ghf-campaigns";
import { PACKAGE_PRESENTATIONS } from "@/data/package-presentations";

/**
 * Same slugify the app uses to build tasting-notes variant URLs
 * (see BrandIntroSlide.tsx). Kept in sync so warmed URLs match real links.
 */
function slugify(text: string): string {
  return text
    .toString()
    .toLowerCase()
    .trim()
    .replace(/\s+/g, "-")
    .replace(/[^\w-]+/g, "")
    .replace(/--+/g, "-")
    .replace(/^-+/, "")
    .replace(/-+$/, "");
}

/** Static, non-parameterised content pages (mirrors the app route table). */
const STATIC_ROUTES: string[] = [
  "/",
  "/brands",
  "/brands/spirits",
  "/brands/wines",
  "/brands/beer",
  "/activations",
  "/insights",
  "/calendar",
  "/support",
  "/tasting-notes",
  "/packages",
  "/presentations",
  "/presentations/new",
  "/profile",
  "/resources",
  "/resources/serves",
  "/resources/videos",
  "/resources/upcoming-events",
  "/resources/case-studies",
  "/resources/halo-outlets",
  "/resources/pos",
];

/**
 * Build the full list of content URLs to make available offline.
 *
 * Dynamic routes are derived straight from the same data modules that power
 * them, so the list stays authoritative as content changes. `brands` (the live
 * list from useBrands) contributes the top-level per-brand pages; the data
 * modules contribute the deeper nested pages.
 *
 * Admin (`/admin/*`) and user-generated presentation routes (present-mode,
 * immersive, presentation-scenes, promotions/packages by id) are intentionally
 * excluded — they are auth-gated or session data, not browsable content.
 */
export function collectOfflineRoutes(brands: Brand[] = []): string[] {
  const urls = new Set<string>(STATIC_ROUTES);

  // Per-brand top-level pages (from the live brand list).
  for (const b of brands) {
    if (!b?.slug) continue;
    urls.add(`/brands/${b.slug}`);
    urls.add(`/insights/${b.slug}`);
    urls.add(`/serves/${b.slug}`);
    urls.add(`/tasting-notes/${b.slug}`);
    urls.add(`/resources/case-studies/${b.slug}`);
    urls.add(`/resources/halo-outlets/${b.slug}`);
    urls.add(`/resources/pos/${b.slug}`);

    // Per-variant tasting notes (/tasting-notes/[brandSlug]/[variant]).
    for (const v of b.variants || []) {
      if (v?.name) urls.add(`/tasting-notes/${b.slug}/${slugify(v.name)}`);
    }
  }

  // Nested support options: /support/[brandSlug]/[optionSlug].
  for (const [brandSlug, options] of Object.entries(BRAND_SUPPORT)) {
    for (const opt of options) {
      if (opt?.slug) urls.add(`/support/${brandSlug}/${opt.slug}`);
    }
  }

  // Tasting notes — cover every (brand, variant) pair present in the data,
  // even for brands not in the live list yet.
  for (const t of TASTING_NOTES) {
    if (!t?.brandSlug) continue;
    urls.add(`/tasting-notes/${t.brandSlug}`);
    if (t.variant) urls.add(`/tasting-notes/${t.brandSlug}/${slugify(t.variant)}`);
  }

  for (const s of SERVES_DATA) {
    if (s?.brandSlug) urls.add(`/serves/${s.brandSlug}`);
  }

  for (const c of CASE_STUDIES) {
    if (c?.tier) urls.add(`/case-studies/${c.tier}`);
    if (c?.brandSlug) urls.add(`/resources/case-studies/${c.brandSlug}`);
  }

  for (const h of HALO_OUTLETS) {
    if (h?.brandSlug) urls.add(`/resources/halo-outlets/${h.brandSlug}`);
  }

  for (const p of POS_LIBRARY) {
    if (p?.brandSlug) urls.add(`/resources/pos/${p.brandSlug}`);
  }

  for (const i of BRAND_INSIGHTS) {
    if (i?.brandSlug) urls.add(`/insights/${i.brandSlug}`);
  }

  for (const slug of Object.keys(BRAND_STORIES)) {
    urls.add(`/brand-stories/${slug}`);
  }

  for (const promo of PROMOTIONS) {
    if (promo?.id) urls.add(`/promotions/${promo.id}`);
  }

  for (const campaign of GHF_CAMPAIGNS) {
    if (campaign?.id) urls.add(`/activations/${campaign.id}`);
  }

  for (const slug of Object.keys(PACKAGE_PRESENTATIONS)) {
    urls.add(`/packages/${slug}`);
  }

  return Array.from(urls);
}
