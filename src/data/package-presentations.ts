import type { Brand } from "@/types/brand";

export const PACKAGE_PRESENTATIONS: Record<string, string[]> = {
  spirits: ["sapling", "dropworks", "desdeya", "pensador", "fielden", "everleaf", "whisky-a", "whisky-b", "non-alc-a"],
  wines: ["mirabeau", "craggy-range", "coates-and-seely", "quinta-da-romaneira", "dreamsake", "wild-idol"],
  beer: ["noam", "wignac", "cote-citron", "big-drop", "fever-tree"],
  "crafted-and-discerning": ["fielden", "craggy-range", "quinta-da-romaneira", "coates-and-seely", "whisky-a", "non-alc-a"],
  "elevated-and-sophisticated": ["sapling", "fielden", "mirabeau", "dreamsake", "cote-citron", "wild-idol"],
  "contemporary-and-creative": ["dropworks", "desdeya", "pensador", "everleaf", "dreamsake", "wignac", "big-drop", "whisky-b"],
  "best-of-british": ["sapling", "fielden", "dropworks", "coates-and-seely", "whisky-a", "whisky-b", "non-alc-a"],
  "european-lifestyle": ["mirabeau", "wignac", "cote-citron", "noam", "dreamsake"],
  "sustainable": ["sapling", "mirabeau", "everleaf", "big-drop"],

  // Products — proposed default line-ups (pending client confirmation).
  // No/Low: the portfolio's alcohol-free / low-ABV brands.
  "no-low": ["everleaf", "big-drop", "wild-idol", "non-alc-a"],
  // Whisky: Fielden plus the two holding whisky brands.
  "whisky": ["fielden", "whisky-a", "whisky-b"],
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

// Category packages are derived from a brand's `category` field (not admin-assigned).
const CATEGORY_PACKAGE_TO_CATEGORY: Record<string, string> = {
  spirits: "spirits",
  wines: "wines",
  beer: "packaged",
};

// The packages an admin assigns per brand (Occasion / Culture / Product).
// Category packages are excluded — those follow the brand's category automatically.
export const ASSIGNABLE_PACKAGE_GROUPS: { group: string; options: { slug: string; label: string }[] }[] = [
  {
    group: "Occasion",
    options: [
      { slug: "crafted-and-discerning", label: "Crafted & Discerning" },
      { slug: "elevated-and-sophisticated", label: "Elevated & Sophisticated" },
      { slug: "contemporary-and-creative", label: "Contemporary & Creative" },
    ],
  },
  {
    group: "Culture",
    options: [
      { slug: "best-of-british", label: "Best of British" },
      { slug: "european-lifestyle", label: "European Lifestyle" },
      { slug: "sustainable", label: "Sustainability Focus" },
    ],
  },
  {
    group: "Product",
    options: [
      { slug: "no-low", label: "No/Low" },
      { slug: "whisky", label: "Whisky" },
      { slug: "exclusives", label: "Exclusives" },
    ],
  },
];

// Resolve the brand slugs for a package tile.
//  - Category tiles (spirits/wines/beer) derive from each brand's `category`.
//  - All other tiles use the admin-assigned `brand.packages`.
//  - Falls back to the static mapping above when nothing is set yet (e.g. the DB
//    isn't populated), so behaviour is unchanged until packages are assigned.
export function getPackageBrandSlugs(packageSlug: string, brands: Brand[]): string[] {
  const cat = CATEGORY_PACKAGE_TO_CATEGORY[packageSlug];
  const matched = cat
    ? brands.filter((b) => b.category?.toLowerCase() === cat)
    : brands.filter((b) => Array.isArray(b.packages) && b.packages.includes(packageSlug));
  const slugs = matched.map((b) => b.slug);
  return slugs.length > 0 ? slugs : PACKAGE_PRESENTATIONS[packageSlug] || [];
}
