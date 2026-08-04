import { createClient } from "@/lib/supabase/client";
import { PACKAGE_LABELS } from "@/data/package-presentations";

/**
 * The home landing layout — the groups of tiles shown on the front page. This is
 * now admin-managed (see /admin/home) and stored in the `site_config` table under
 * the key below. Everything degrades gracefully to DEFAULT_LANDING when the config
 * is missing (e.g. before the migration runs, or offline), so the site never breaks.
 */

export const HOME_LANDING_KEY = "home_landing";

export type LandingTile = {
  id: string;
  title: string;
  /** Target present-mode slug — links to /present-mode/{slug}. */
  slug: string;
};

export type LandingSection = {
  id: string;
  label: string;
  tiles: LandingTile[];
};

export type LandingConfig = {
  sections: LandingSection[];
};

/** The built-in layout — used as the fallback and the editor's starting point. */
export const DEFAULT_LANDING: LandingConfig = {
  sections: [
    {
      id: "category",
      label: "Category",
      tiles: [
        { id: "t-spirits", title: "Spirits", slug: "spirits" },
        { id: "t-wines", title: "Wines", slug: "wines" },
        { id: "t-packaged", title: "Packaged", slug: "beer" },
      ],
    },
    {
      id: "occasion",
      label: "Occasion",
      tiles: [
        { id: "t-crafted", title: "Crafted & Discerning", slug: "crafted-and-discerning" },
        { id: "t-elevated", title: "Elevated & Sophisticated", slug: "elevated-and-sophisticated" },
        { id: "t-contemporary", title: "Contemporary & Creative", slug: "contemporary-and-creative" },
      ],
    },
    {
      id: "culture",
      label: "Culture",
      tiles: [
        { id: "t-british", title: "Best of British", slug: "best-of-british" },
        { id: "t-european", title: "European Lifestyle", slug: "european-lifestyle" },
        { id: "t-sustainable", title: "Sustainability Focus", slug: "sustainable" },
      ],
    },
    {
      id: "products",
      label: "Products",
      tiles: [
        { id: "t-nolow", title: "No/Low", slug: "no-low" },
        { id: "t-whisky", title: "Whisky", slug: "whisky" },
        { id: "t-exclusives", title: "Exclusives", slug: "exclusives" },
      ],
    },
  ],
};

/** Valid tile targets the admin can pick from — categories plus every package. */
export const TILE_TARGET_OPTIONS: { slug: string; label: string }[] = [
  { slug: "spirits", label: "Category · Spirits" },
  { slug: "wines", label: "Category · Wines" },
  { slug: "beer", label: "Category · Packaged" },
  ...Object.entries(PACKAGE_LABELS).map(([slug, label]) => ({
    slug,
    label: `Package · ${label}`,
  })),
];

/** True when the config looks structurally valid. */
export function isValidLandingConfig(cfg: unknown): cfg is LandingConfig {
  if (!cfg || typeof cfg !== "object") return false;
  const sections = (cfg as LandingConfig).sections;
  if (!Array.isArray(sections)) return false;
  return sections.every(
    (s) =>
      s &&
      typeof s.label === "string" &&
      Array.isArray(s.tiles) &&
      s.tiles.every((t) => t && typeof t.title === "string" && typeof t.slug === "string")
  );
}

/**
 * Read the admin-managed landing layout. Returns null on any problem (table not
 * created yet, offline, malformed data) so callers fall back to DEFAULT_LANDING.
 */
export async function fetchLandingConfig(): Promise<LandingConfig | null> {
  try {
    const supabase = createClient();
    const { data, error } = await supabase
      .from("site_config")
      .select("value")
      .eq("key", HOME_LANDING_KEY)
      .maybeSingle();

    if (error || !data?.value) return null;
    return isValidLandingConfig(data.value) ? (data.value as LandingConfig) : null;
  } catch {
    return null;
  }
}
