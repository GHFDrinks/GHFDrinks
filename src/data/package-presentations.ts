export const PACKAGE_PRESENTATIONS: Record<string, string[]> = {
  spirits: ["sapling", "dropworks", "desdeya", "pensador", "fielden", "everleaf"],
  wines: ["mirabeau", "craggy-range", "coates-and-seely", "quinta-da-romaneira", "dreamsake", "wild-idol"],
  beer: ["noam", "wignac", "cote-citron", "big-drop", "fever-tree"],
  "crafted-and-discerning": ["fielden", "craggy-range", "quinta-da-romaneira", "coates-and-seely"],
  "elevated-and-sophisticated": ["sapling", "fielden", "mirabeau", "dreamsake", "cote-citron", "wild-idol"],
  "contemporary-and-creative": ["dropworks", "desdeya", "pensador", "everleaf", "dreamsake", "wignac", "big-drop"],
  "best-of-british": ["sapling", "fielden", "dropworks", "coates-and-seely"],
  "european-lifestyle": ["mirabeau", "wignac", "cote-citron", "noam", "dreamsake"],
  "sustainable": ["sapling", "mirabeau", "everleaf", "big-drop"],

  // Products — proposed default line-ups (pending client confirmation).
  // No/Low: the portfolio's alcohol-free / low-ABV brands.
  "no-low": ["everleaf", "big-drop", "wild-idol"],
  // Whisky: Fielden is the only whisky in the portfolio today.
  "whisky": ["fielden"],
  // Exclusives: placeholder — prestige/premium brands until the client confirms the list.
  "exclusives": ["craggy-range", "quinta-da-romaneira", "coates-and-seely"],
};

// Display names for each package/category slug — used as the presentation title.
export const PACKAGE_LABELS: Record<string, string> = {
  spirits: "Spirits",
  wines: "Wines",
  beer: "Packaged",
  "crafted-and-discerning": "Crafted & Discerning",
  "elevated-and-sophisticated": "Elevated & Sophisticated",
  "contemporary-and-creative": "Contemporary & Creative",
  "best-of-british": "Best of British",
  "european-lifestyle": "European Lifestyle",
  "sustainable": "Sustainability Focus",
  "no-low": "No/Low",
  "whisky": "Whisky",
  "exclusives": "Exclusives",
};
