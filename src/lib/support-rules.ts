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

export function getSupportTiles(inputs: SupportInputs): SupportResult {
  switch (inputs.category) {
    case "spirits-launch":
      return spiritsLaunch(inputs);
    case "rotating-cocktail":
      return rotatingCocktail(inputs);
    case "wine-bundle":
      return wineBundle(inputs);
    case "packaged-launch":
      return packagedLaunch(inputs);
  }
}

function spiritsLaunch(i: SupportInputs): SupportResult {
  const skus = i.numberOfSkus ?? 0;
  switch (i.positioning) {
    case "back-bar":
      return { tiles: [], message: "No Support Available" };
    case "cocktail-1-month": {
      if (skus <= 2) return { tiles: [{ title: "2&1 Stock Support" }] };
      if (skus <= 4) return {
        tiles: [
          { title: "2&1 Stock Support" },
          { title: "Photos & Social Media Support" },
          { title: "Staff Training" }
        ]
      };
      // 4 or more (Ed says "4 or more" overlapping — treat 5+ as more)
      return {
        tiles: [
          { title: "2&1 Stock Support" },
          { title: "Photos & Social Media Support" },
          { title: "Staff Training" },
          { title: "Staff Incentives" },
          { title: "Brand Merch" }
        ]
      };
    }
    case "cocktail-3-month":
    case "cocktail-12-month": {
      if (skus <= 2) return {
        tiles: [
          { title: "Stock Support", badge: "*Volume Dependent" },
          { title: "Photos & Social Media Support" },
          { title: "Staff Training" }
        ]
      };
      return {
        tiles: [
          { title: "Stock Support", badge: "*Volume Dependent" },
          { title: "Photos & Social Media Support" },
          { title: "Staff Training" },
          { title: "Staff Incentives" },
          { title: "Brand Merch" }
        ]
      };
    }
    default:
      return { tiles: [] };
  }
}

function rotatingCocktail(i: SupportInputs): SupportResult {
  const skus = i.numberOfSkus ?? 0;
  if (skus <= 2) return { tiles: [], message: "No Support Available" };
  if (skus === 3) return {
    tiles: [
      { title: "Staff Incentives", exclusivityGroup: "A" },
      { title: "Cocktail Competition", exclusivityGroup: "A" },
      { title: "Photos & Social Media Support", exclusivityGroup: "A" }
    ],
    choiceMode: "pick-one",
    constraints: ["Menus must feature minimum 1 x GHF Cocktail at all times"]
  };
  if (skus === 5) return {
    tiles: [
      { title: "Staff Incentives", exclusivityGroup: "trio" },
      { title: "Cocktail Competition", exclusivityGroup: "trio" },
      { title: "Photos & Social Media Support", exclusivityGroup: "trio" },
      { title: "Founder/Ambassador Masterclass", exclusivityGroup: "alt" }
    ],
    choiceMode: "complex",
    constraints: [
      "Menus must feature minimum 2 x GHF Cocktail at all times",
      "Choose either ALL THREE from Staff Incentives / Cocktail Competition / Photos & Social Media, OR Founder/Ambassador Masterclass + 1 other support option"
    ]
  };
  if (skus >= 7) return {
    tiles: [
      { title: "Staff Incentives" },
      { title: "Cocktail Competition" },
      { title: "Photos & Social Media Support" },
      { title: "Founder/Ambassador Masterclass" },
      { title: "WSET Courses" },
      { title: "Brand Immersion" }
    ],
    choiceMode: "complex",
    constraints: [
      "Menus must feature minimum 3 x GHF Cocktail at all times",
      "Choose either ALL THREE from Staff Incentives / Cocktail Competition / Photos & Social Media PLUS Founder/Ambassador Masterclass, OR WSET Courses, OR Brand Immersion"
    ]
  };
  // SKUs 4 or 6 — fall back to nearest lower tier
  if (skus === 4) return rotatingCocktail({ ...i, numberOfSkus: 3 });
  if (skus === 6) return rotatingCocktail({ ...i, numberOfSkus: 5 });
  return rotatingCocktail({ ...i, numberOfSkus: 7 });
}

function wineBundle(i: SupportInputs): SupportResult {
  const skus = i.skusByBottle ?? i.numberOfSkus ?? 0;
  // Note: Ed's PDF has SKUs 3 listed twice with different tiles. Treat second as "SKUs 4+" since logic suggests progression.
  if (skus === 2) return {
    tiles: [
      { title: "Retro Pricing Support" },
      { title: "Staff Training" },
      { title: "WSET x1" },
      { title: "Staff Incentives" },
      { title: "Event Tickets" }
    ]
  };
  if (skus >= 3) return {
    tiles: [
      { title: "Retro Pricing Support" },
      { title: "Staff Training" },
      { title: "WSET x2" },
      { title: "Staff Incentives" },
      { title: "Event Tickets" },
      { title: "Brand Activations" },
      { title: "Local Experiences", exclusivityGroup: "experiences" },
      { title: "Abroad Experiences", exclusivityGroup: "experiences" }
    ],
    choiceMode: "complex",
    constraints: ["Choose between Local Experiences OR Abroad Experiences"]
  };
  return { tiles: [] };
}

function packagedLaunch(i: SupportInputs): SupportResult {
  return {
    tiles: [
      { title: "Staff Training" },
      { title: "Staff Incentives" },
      { title: "1st Case FOC" }
    ]
  };
}
