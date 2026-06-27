export type PosItem = {
  id: string;
  brandSlug: string;
  title: string;
  image: string;
  description?: string;
  downloadUrl?: string;
};

export const POS_LIBRARY: PosItem[] = [
  {
    id: "sapling-table-talkers",
    brandSlug: "sapling",
    title: "Seed-Paper Table Talkers",
    image: "/brands/sapling/lifestyle-1.jpg",
    description: "A6 folded table talkers printed on plantable seed paper containing wildflower seeds. Custom QR code tree-tracking map integrations.",
    downloadUrl: "#",
  },
  {
    id: "sapling-wooden-menus",
    brandSlug: "sapling",
    title: "Branded Oak Menu Boards",
    image: "/brands/sapling/lifestyle-2.jpg",
    description: "Premium oak clipboards engraved with Sapling branding. Handcrafted in the UK using sustainable timber.",
    downloadUrl: "#",
  },
  {
    id: "fielden-rye-flutes",
    brandSlug: "fielden",
    title: "Fielden Highball Glassware",
    image: "/brands/fielden/lifestyle-1.jpg",
    description: "Ribbed signature highball glasses with embossed gold crest. Boxed in sets of six for trade venues.",
    downloadUrl: "#",
  },
  {
    id: "mirabeau-ice-buckets",
    brandSlug: "mirabeau",
    title: "Mirabeau Acrylic Ice Buckets",
    image: "/brands/mirabeau/lifestyle-1.jpg",
    description: "Premium double-walled translucent pink ice buckets, holds up to 3 bottles of Mirabeau Pure.",
    downloadUrl: "#",
  }
];
