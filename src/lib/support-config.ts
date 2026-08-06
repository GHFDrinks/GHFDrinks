import { createClient } from "@/lib/supabase/client";
import type { SupportTileSpec } from "@/lib/support-rules";

/**
 * Admin-editable support-package tiles. The SKU/positioning *selection* logic
 * (which SKU count maps to which scenario) stays in support-rules.ts; what this
 * controls is WHICH product tiles show for each scenario — i.e. "change what
 * products show when different SKU numbers are selected".
 *
 * Stored in the `site_config` table under the key below. Every scenario falls
 * back to its built-in default, so the calculator behaves exactly as before
 * until an admin overrides a scenario (and never breaks if the config is
 * missing, offline, or partial).
 */

export const SUPPORT_CONFIG_KEY = "support_rules";

export type SupportConfig = {
  // scenario key -> ordered tile list
  scenarios: Record<string, SupportTileSpec[]>;
};

/** A scenario the admin can edit, with its human label and built-in tiles. */
export type SupportScenarioDef = {
  key: string;
  label: string;
  hint?: string;
  tiles: SupportTileSpec[];
};

/**
 * The canonical scenario list. `tiles` here are the current hardcoded defaults —
 * keep these in sync with support-rules.ts. The admin editor renders one card
 * per entry; getSupportTiles reads the (possibly overridden) tiles by key.
 */
export const SUPPORT_SCENARIOS: SupportScenarioDef[] = [
  {
    key: "spirits:cocktail-1mo:1-2",
    label: "Spirits Launch · Cocktail 1 Month · 1–2 SKUs",
    tiles: [{ title: "2&1 Stock Support" }],
  },
  {
    key: "spirits:cocktail-1mo:3-4",
    label: "Spirits Launch · Cocktail 1 Month · 3–4 SKUs",
    tiles: [
      { title: "2&1 Stock Support" },
      { title: "Photos & Social Media Support" },
      { title: "Staff Training" },
    ],
  },
  {
    key: "spirits:cocktail-1mo:5+",
    label: "Spirits Launch · Cocktail 1 Month · 5+ SKUs",
    tiles: [
      { title: "2&1 Stock Support" },
      { title: "Photos & Social Media Support" },
      { title: "Staff Training" },
      { title: "Staff Incentives" },
      { title: "Brand Merch" },
    ],
  },
  {
    key: "spirits:cocktail-3-12mo:1-2",
    label: "Spirits Launch · Cocktail 3 / 12 Month · 1–2 SKUs",
    tiles: [
      { title: "Stock Support", badge: "*Volume Dependent" },
      { title: "Photos & Social Media Support" },
      { title: "Staff Training" },
    ],
  },
  {
    key: "spirits:cocktail-3-12mo:3+",
    label: "Spirits Launch · Cocktail 3 / 12 Month · 3+ SKUs",
    tiles: [
      { title: "Stock Support", badge: "*Volume Dependent" },
      { title: "Photos & Social Media Support" },
      { title: "Staff Training" },
      { title: "Staff Incentives" },
      { title: "Brand Merch" },
    ],
  },
  {
    key: "rotating:3",
    label: "Rotating Cocktail · 3 SKUs",
    hint: "Pick one",
    tiles: [
      { title: "Staff Incentives", exclusivityGroup: "A" },
      { title: "Cocktail Competition", exclusivityGroup: "A" },
      { title: "Photos & Social Media Support", exclusivityGroup: "A" },
    ],
  },
  {
    key: "rotating:5",
    label: "Rotating Cocktail · 5 SKUs",
    tiles: [
      { title: "Staff Incentives", exclusivityGroup: "trio" },
      { title: "Cocktail Competition", exclusivityGroup: "trio" },
      { title: "Photos & Social Media Support", exclusivityGroup: "trio" },
      { title: "Founder/Ambassador Masterclass", exclusivityGroup: "alt" },
    ],
  },
  {
    key: "rotating:7+",
    label: "Rotating Cocktail · 7+ SKUs",
    tiles: [
      { title: "Staff Incentives" },
      { title: "Cocktail Competition" },
      { title: "Photos & Social Media Support" },
      { title: "Founder/Ambassador Masterclass" },
      { title: "WSET Courses" },
      { title: "Brand Immersion" },
    ],
  },
  {
    key: "wine:2",
    label: "Wine Bundle · 2 SKUs",
    tiles: [
      { title: "Retro Pricing Support" },
      { title: "Staff Training" },
      { title: "WSET x1" },
      { title: "Staff Incentives" },
      { title: "Event Tickets" },
    ],
  },
  {
    key: "wine:3+",
    label: "Wine Bundle · 3+ SKUs",
    tiles: [
      { title: "Retro Pricing Support" },
      { title: "Staff Training" },
      { title: "WSET x2" },
      { title: "Staff Incentives" },
      { title: "Event Tickets" },
      { title: "Brand Activations" },
      { title: "Local Experiences", exclusivityGroup: "experiences" },
      { title: "Abroad Experiences", exclusivityGroup: "experiences" },
    ],
  },
  {
    key: "packaged:default",
    label: "Packaged Launch",
    tiles: [
      { title: "Staff Training" },
      { title: "Staff Incentives" },
      { title: "1st Case FOC" },
    ],
  },
];

export const DEFAULT_SUPPORT_CONFIG: SupportConfig = {
  scenarios: Object.fromEntries(SUPPORT_SCENARIOS.map((s) => [s.key, s.tiles])),
};

/** Resolve the tiles for a scenario: admin override → built-in default → []. */
export function scenarioTiles(config: SupportConfig | undefined, key: string): SupportTileSpec[] {
  return config?.scenarios?.[key] ?? DEFAULT_SUPPORT_CONFIG.scenarios[key] ?? [];
}

export function isValidSupportConfig(v: unknown): v is SupportConfig {
  return (
    !!v &&
    typeof v === "object" &&
    !Array.isArray(v) &&
    typeof (v as SupportConfig).scenarios === "object" &&
    (v as SupportConfig).scenarios !== null
  );
}

/** Read admin-managed support tiles, merged over defaults. Never throws. */
export async function fetchSupportConfig(): Promise<SupportConfig> {
  try {
    const supabase = createClient();
    const { data, error } = await supabase
      .from("site_config")
      .select("value")
      .eq("key", SUPPORT_CONFIG_KEY)
      .maybeSingle();

    if (error || !data?.value || !isValidSupportConfig(data.value)) {
      return DEFAULT_SUPPORT_CONFIG;
    }
    return {
      scenarios: { ...DEFAULT_SUPPORT_CONFIG.scenarios, ...(data.value as SupportConfig).scenarios },
    };
  } catch {
    return DEFAULT_SUPPORT_CONFIG;
  }
}
