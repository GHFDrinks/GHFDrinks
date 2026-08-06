export type CaseStudy = {
  id: string;
  brandSlug: string;
  tier: "prestige" | "independent" | "national-group";
  title: string;
  image: string;        // background image
  logo?: string;        // optional outlet logo, overlaid on the background
  outletName: string;
  summary: string;
  fullText?: string;
};

export const CASE_STUDIES: CaseStudy[] = [
  // Sapling
  {
    id: "sapling-savoy-activation",
    brandSlug: "sapling",
    tier: "prestige",
    title: "Eco-Cocktail Integration at The Savoy",
    image: "/brands/sapling/lifestyle-1.jpg",
    outletName: "The Savoy Hotel",
    summary: "Integrated a custom climate-positive cocktail menu, planting over 400 trees in 30 days.",
    fullText: "By collaborating with The Savoy's head mixologist, Sapling developed a four-drink seasonal cocktail menu where each drink ordered funded a tree planting in the UK. The activation was supported by physical table talkers made of seed-paper. Results showed a 25% uplift in house spirit margins and high guest engagement with the QR code tree-tracking map."
  },
  {
    brandSlug: "sapling",
    id: "sapling-ned-volume",
    tier: "independent",
    title: "House Spirits Listing at The Ned",
    image: "/brands/sapling/lifestyle-2.jpg",
    outletName: "The Ned London",
    summary: "Volume listing across 4 restaurant bars yielding 15,000+ serves annually.",
    fullText: "Sapling replaced the standard entry-level vodka as the house pour across four major bars in The Ned. Staff training sessions focused on sustainability and cocktail speed-pouring. This listing has planted over 15,000 trees to date, providing a powerful marketing narrative for the venue's corporate events team."
  },
  {
    brandSlug: "fielden-scarfes-rye",
    id: "fielden-scarfes-rye",
    tier: "independent",
    title: "Signature Rye Menu at Scarfes Bar",
    image: "/brands/fielden/lifestyle-2.jpg",
    outletName: "Scarfes Bar",
    summary: "Pioneering English Rye cocktails featuring heritage grain stories.",
    fullText: "Scarfes Bar featured Fielden Signature Rye Whisky in their winter cocktail collection. The menu featured custom artwork detailing the heritage grains grown in English fields. The activation resulted in over 1,200 cocktails sold and established Fielden as a key player in the premium English whisky category."
  },
  {
    brandSlug: "mirabeau-beach-clubs",
    id: "mirabeau-beach-clubs",
    tier: "national-group",
    title: "Terrace takeover at Coq d'Argent driving high summer rosé volumes.",
    image: "/brands/mirabeau/lifestyle-1.jpg",
    outletName: "D&D London Group",
    summary: "Terrace takeover at Coq d'Argent driving high summer rosé volumes.",
    fullText: "A complete terrace takeover featuring custom pastel pink floral displays, branded parasols, and a dedicated Mirabeau Provence Rosé bar. The activation ran from June through August, driving a 45% increase in total wine sales for the venue compared to the previous summer season."
  }
];

export function getCaseStudies(tier: string) {
  // Map "national" to "national-group"
  const targetTier = tier.toLowerCase() === "national" ? "national-group" : tier.toLowerCase();
  
  return CASE_STUDIES.filter((c) => c.tier === targetTier).map((c) => ({
    id: c.id,
    outletName: c.outletName,
    description: c.summary,
    details: c.fullText || "",
  }));
}
