import { SupportConfig, scenarioTiles } from "@/lib/support-config";

export type SupportCategory = "spirits-launch" | "rotating-cocktail" | "wine-bundle" | "packaged-launch";

export type SupportInputs = {
  category: SupportCategory;
  numberOfSkus?: number;
  positioning?: "back-bar" | "cocktail-1-month" | "cocktail-3-month" | "cocktail-12-month" | "special-1-month";
  skusByBottle?: number;
  skusByGlass?: number;
};

export type SupportTileSpec = {
  title: string;
  badge?: string;
  exclusivityGroup?: string; // tiles sharing a group are mutually exclusive — user picks one
};

export type SupportResult = {
  tiles: SupportTileSpec[];
  message?: string; // e.g. "No Support Available" or footer text
  constraints?: string[]; // e.g. ["Menus must feature minimum 1 x GHF Cocktail at all times"]
  choiceMode?: "all" | "pick-one" | "complex"; // how user selects from tiles
};

// Short holding descriptions per support tile (shown on the tile — no price).
export const SUPPORT_TILE_DETAILS: Record<string, string> = {
  "2&1 Stock Support": "Buy-two-get-one stock support to drive trial and volume.",
  "Stock Support": "Stock support to underpin the activation (volume dependent).",
  "Photos & Social Media Support": "Professional photography and social content for the activation.",
  "Staff Training": "Brand and product training for your team.",
  "Staff Incentives": "Incentives and rewards to motivate your team.",
  "Brand Merch": "Branded merchandise and POS for the venue.",
  "Cocktail Competition": "A staff cocktail competition with brand support.",
  "Founder/Ambassador Masterclass": "A masterclass hosted by the founder or brand ambassador.",
  "WSET Courses": "Funded WSET education for your team.",
  "WSET x1": "One funded WSET course for your team.",
  "WSET x2": "Two funded WSET courses for your team.",
  "Brand Immersion": "An immersive brand experience for key staff.",
  "Retro Pricing Support": "Retrospective pricing support on qualifying volume.",
  "Event Tickets": "Tickets to brand and trade events.",
  "Brand Activations": "In-venue brand activations and events.",
  "Local Experiences": "A local brand experience for your team.",
  "Abroad Experiences": "An overseas brand experience for your team.",
  "1st Case FOC": "First case free of charge to support launch.",
};

export function getSupportTiles(inputs: SupportInputs, config?: SupportConfig): SupportResult {
  switch (inputs.category) {
    case "spirits-launch":
      return spiritsLaunch(inputs, config);
    case "rotating-cocktail":
      return rotatingCocktail(inputs, config);
    case "wine-bundle":
      return wineBundle(inputs, config);
    case "packaged-launch":
      return packagedLaunch(inputs, config);
  }
}

/**
 * Like getSupportTiles, but also returns the tiles a HIGHER SKU count would
 * unlock for the same category/positioning — so the UI can render them greyed
 * out ("unlock with more SKUs") instead of hiding them entirely.
 *
 * "Locked" = a tile that appears at the top SKU tier for this positioning but
 * not in the currently-available set. Derived by re-running the same rules at a
 * saturating SKU count, so it stays in sync with the rules automatically.
 */
export function getSupportTilesWithLocked(
  inputs: SupportInputs,
  config?: SupportConfig
): SupportResult & { lockedTiles: SupportTileSpec[] } {
  const current = getSupportTiles(inputs, config);
  const maxInputs: SupportInputs = {
    ...inputs,
    numberOfSkus: 99,
    skusByBottle: 99,
    skusByGlass: 99,
  };
  const max = getSupportTiles(maxInputs, config);
  const availableTitles = new Set(current.tiles.map((t) => t.title));
  const lockedTiles = max.tiles.filter((t) => !availableTitles.has(t.title));
  return { ...current, lockedTiles };
}

// The tile lists below now come from the admin-editable support config
// (support-config.ts), keyed by scenario. Defaults preserve the original tiles,
// so behaviour is identical until an admin overrides a scenario. The SKU/tier
// SELECTION logic (which scenario applies) stays here.
function spiritsLaunch(i: SupportInputs, config?: SupportConfig): SupportResult {
  const skus = i.numberOfSkus ?? 0;
  switch (i.positioning) {
    case "back-bar":
      return { tiles: [], message: "No Support Available" };
    case "cocktail-1-month": {
      if (skus <= 2) return { tiles: scenarioTiles(config, "spirits:cocktail-1mo:1-2") };
      if (skus <= 4) return { tiles: scenarioTiles(config, "spirits:cocktail-1mo:3-4") };
      // 5 or more.
      return { tiles: scenarioTiles(config, "spirits:cocktail-1mo:5+") };
    }
    case "cocktail-3-month":
    case "cocktail-12-month": {
      if (skus <= 2) return { tiles: scenarioTiles(config, "spirits:cocktail-3-12mo:1-2") };
      return { tiles: scenarioTiles(config, "spirits:cocktail-3-12mo:3+") };
    }
    default:
      return { tiles: [] };
  }
}

function rotatingCocktail(i: SupportInputs, config?: SupportConfig): SupportResult {
  const skus = i.numberOfSkus ?? 0;
  if (skus <= 2) return { tiles: [], message: "No Support Available" };
  if (skus === 3) return {
    tiles: scenarioTiles(config, "rotating:3"),
    choiceMode: "pick-one",
    constraints: ["Menus must feature minimum 1 x GHF Cocktail at all times"]
  };
  if (skus === 5) return {
    tiles: scenarioTiles(config, "rotating:5"),
    choiceMode: "complex",
    constraints: [
      "Menus must feature minimum 2 x GHF Cocktail at all times",
      "Choose either ALL THREE from Staff Incentives / Cocktail Competition / Photos & Social Media, OR Founder/Ambassador Masterclass + 1 other support option"
    ]
  };
  if (skus >= 7) return {
    tiles: scenarioTiles(config, "rotating:7+"),
    choiceMode: "complex",
    constraints: [
      "Menus must feature minimum 3 x GHF Cocktail at all times",
      "Choose either ALL THREE from Staff Incentives / Cocktail Competition / Photos & Social Media PLUS Founder/Ambassador Masterclass, OR WSET Courses, OR Brand Immersion"
    ]
  };
  // SKUs 4 or 6 — fall back to nearest lower tier
  if (skus === 4) return rotatingCocktail({ ...i, numberOfSkus: 3 }, config);
  if (skus === 6) return rotatingCocktail({ ...i, numberOfSkus: 5 }, config);
  return rotatingCocktail({ ...i, numberOfSkus: 7 }, config);
}

function wineBundle(i: SupportInputs, config?: SupportConfig): SupportResult {
  const skus = i.skusByBottle ?? i.numberOfSkus ?? 0;
  if (skus === 2) return { tiles: scenarioTiles(config, "wine:2") };
  if (skus >= 3) return {
    tiles: scenarioTiles(config, "wine:3+"),
    choiceMode: "complex",
    constraints: ["Choose between Local Experiences OR Abroad Experiences"]
  };
  return { tiles: [] };
}

function packagedLaunch(_i: SupportInputs, config?: SupportConfig): SupportResult {
  return { tiles: scenarioTiles(config, "packaged:default") };
}
