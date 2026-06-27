export type HaloOutlet = {
  brandSlug: string;
  tier: "prestige" | "independent" | "national-group";
  outletName: string;
  outletLogo?: string; // path to logo image
  outletImage: string; // full-bleed background
};

export const HALO_OUTLETS: HaloOutlet[] = [
  // Sapling
  {
    brandSlug: "sapling",
    tier: "prestige",
    outletName: "The Savoy Hotel",
    outletImage: "/brands/sapling/lifestyle-1.jpg",
  },
  {
    brandSlug: "sapling",
    tier: "independent",
    outletName: "The Ned London",
    outletImage: "/brands/sapling/lifestyle-2.jpg",
  },
  {
    brandSlug: "sapling",
    tier: "national-group",
    outletName: "Soho House & Co",
    outletImage: "/brands/sapling/activation-1.jpg",
  },
  // Fielden
  {
    brandSlug: "fielden",
    tier: "prestige",
    outletName: "Claridge's Bar",
    outletImage: "/brands/fielden/lifestyle-1.jpg",
  },
  {
    brandSlug: "fielden",
    tier: "independent",
    outletName: "Scarfes Bar",
    outletImage: "/brands/fielden/lifestyle-2.jpg",
  },
  // Desdeya
  {
    brandSlug: "desdeya",
    tier: "prestige",
    outletName: "Annabel's",
    outletImage: "/brands/desdeya/lifestyle-1.jpg",
  },
  {
    brandSlug: "desdeya",
    tier: "independent",
    outletName: "KOL Restaurant",
    outletImage: "/brands/desdeya/lifestyle-2.jpg",
  },
  // Mirabeau
  {
    brandSlug: "mirabeau",
    tier: "prestige",
    outletName: "Club 55 St Tropez",
    outletImage: "/brands/mirabeau/lifestyle-1.jpg",
  },
  {
    brandSlug: "mirabeau",
    tier: "national-group",
    outletName: "D&D London Group",
    outletImage: "/brands/mirabeau/lifestyle-2.jpg",
  }
];
