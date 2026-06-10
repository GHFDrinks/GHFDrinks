export interface CampaignTier {
  label: string;
  color: string;
  lines: string[];
  benefits: string[];
}

export interface GHFCampaign {
  id: string;
  name: string;
  description: string;
  period: string;
  month: string;
  heroImage: string;
  relevantBrandSlugs: string[];
  tiers: CampaignTier[];
}

const BRONZE = "#8B3A1A";
const SILVER = "#1D5A73";
const GOLD = "#8A6D1D";

export const GHF_CAMPAIGNS: GHFCampaign[] = [
  {
    id: "dry-january",
    name: "Dry January",
    description:
      "Drinks packages designed for moderators and those taking part in Dry January. Celebrate the start of the year with non-alc serves that are uncompromising on taste and quality.",
    period: "January",
    month: "January",
    heroImage: "/brands/everleaf/lifestyle-1.jpg",
    relevantBrandSlugs: ["wild-idol", "everleaf", "big-drop"],
    tiers: [
      { label: "EVERLEAF", color: GOLD, lines: ["1 x Month Activation", "Min. 2 x Everleaf SKUs", "Min. 3 x Cocktails"], benefits: ["Menu Printing", "Staff Training"] },
      { label: "WILD IDOL", color: GOLD, lines: ["1 x Month Activation", "Min. 2 x Wild Idol SKUs", "Min. 2 x BTG or Cocktails"], benefits: ["Menu Printing", "Staff Training"] },
      { label: "COMBO", color: GOLD, lines: ["1 x Month Activation", "Min. 3 x GHF SKUs", "Min. 3 x BTG or Cocktails"], benefits: ["Individual Support +", "Staff Incentive", "Stock Support"] },
    ],
  },
  {
    id: "earth-month",
    name: "Earth Month",
    description:
      "Drinks packages designed to champion the most sustainable drinks without compromising on quality of flavour. Premium environmentally-conscious serves to shine a light on your sustainability initiatives.",
    period: "April",
    month: "April",
    heroImage: "/brands/sapling/lifestyle-1.jpg",
    relevantBrandSlugs: ["sapling", "desdeya", "pensador", "mirabeau", "fielden", "everleaf"],
    tiers: [
      { label: "BRONZE", color: BRONZE, lines: ["1 x Month Activation", "Min. 3 x B-Corp SKUs", "Min. 3 x BTG or Cocktails"], benefits: ["Menu Printing", "Staff Training", "Staff Incentive"] },
      { label: "SILVER", color: SILVER, lines: ["1 x Month Activation", "Min. 4 x B-Corp SKUs", "Min. 4 x BTG or Cocktails"], benefits: ["Bronze Support +", "Stock Support"] },
      { label: "GOLD", color: GOLD, lines: ["1 x Month Activation", "Min. 5 x B-Corp SKUs", "Min. 5 x BTG or Cocktails"], benefits: ["Silver Support +", "2 x 70/75cl Bottles for Staff Drinks"] },
    ],
  },
  {
    id: "summer-sip-and-spritz",
    name: "Summer Sip & Spritz",
    description:
      "Drinks packages designed to make the most of the British summer. Curate an ever-popular Spritz menu or serve up perfectly chilled glasses of premium drinks.",
    period: "May, June, July, August",
    month: "May",
    heroImage: "/brands/mirabeau/lifestyle-1.jpg",
    relevantBrandSlugs: ["craggy-range", "wignac", "noam", "cote-citron", "coates-and-seely", "fielden", "sapling", "wild-idol", "mirabeau", "everleaf", "dropworks", "dreamsake"],
    tiers: [
      { label: "BRONZE", color: BRONZE, lines: ["2 x Month Activation", "Min. 3 x GHF SKUs", "Min. 3 x Summer Sip & Spritz Serves"], benefits: ["Menu Printing", "Staff Training", "Staff Incentive"] },
      { label: "SILVER", color: SILVER, lines: ["2 x Month Activation", "Min. 4 x GHF SKUs", "Min. 4 x Summer Sip & Spritz Serves"], benefits: ["Bronze Support +", "Stock Support"] },
      { label: "GOLD", color: GOLD, lines: ["2 x Month Activation", "Min. 5 x GHF SKUs", "Min. 5 x Summer Sip & Spritz Serves"], benefits: ["Silver Support +", "4 x 70/75cl Bottles for Staff Drinks"] },
    ],
  },
  {
    id: "negroni-week",
    name: "Negroni Week",
    description:
      "Drinks packages designed to elevate your Negroni Week specials menu. Offer consistently high quality and complex serves using premium spirits.",
    period: "September",
    month: "September",
    heroImage: "/brands/sapling/activation-2.jpg",
    relevantBrandSlugs: ["sapling", "fielden", "pensador", "mirabeau", "everleaf", "dropworks"],
    tiers: [
      { label: "BRONZE", color: BRONZE, lines: ["1 x Month Activation", "Min. 3 x GHF SKUs", "Min. 3 x Negroni Cocktails"], benefits: ["Menu Printing", "Staff Training", "Staff Incentive"] },
      { label: "SILVER", color: SILVER, lines: ["1 x Month Activation", "Min. 4 x GHF SKUs", "Min. 4 x Negroni Cocktails"], benefits: ["Bronze Support +", "Stock Support"] },
      { label: "GOLD", color: GOLD, lines: ["1 x Month Activation", "Min. 5 x GHF SKUs", "Min. 5 x Negroni Cocktails"], benefits: ["Silver Support +", "2 x 70/75cl Bottles for Staff Drinks"] },
    ],
  },
  {
    id: "festive-spirit",
    name: "Festive Spirit",
    description:
      "Drinks packages designed to get the Christmas Party started. Premium spirits to elevate your cocktail specials menu for the festive period.",
    period: "December",
    month: "December",
    heroImage: "/brands/fielden/lifestyle-1.jpg",
    relevantBrandSlugs: ["sapling", "desdeya", "pensador", "fielden", "everleaf", "dropworks"],
    tiers: [
      { label: "BRONZE", color: BRONZE, lines: ["1 x Month Activation", "Min. 3 x GHF SKUs", "Min. 3 x Festive Cocktails"], benefits: ["Menu Printing", "Staff Training", "Staff Incentive"] },
      { label: "SILVER", color: SILVER, lines: ["1 x Month Activation", "Min. 4 x GHF SKUs", "Min. 4 x Festive Cocktails"], benefits: ["Bronze Support +", "Stock Support"] },
      { label: "GOLD", color: GOLD, lines: ["1 x Month Activation", "Min. 5 x GHF SKUs", "Min. 5 x Festive Cocktails"], benefits: ["Silver Support +", "2 x 70cl Bottles for Staff Drinks"] },
    ],
  },
  {
    id: "festive-dining",
    name: "Festive Dining",
    description:
      "Drinks packages designed for restaurants and food-led outlets. Pre-dinner fizz followed by premium serves to complement your festive food offerings.",
    period: "December",
    month: "December",
    heroImage: "/brands/craggy-range/lifestyle-1.jpg",
    relevantBrandSlugs: ["craggy-range", "wild-idol", "noam", "dreamsake", "wignac", "coates-and-seely", "big-drop", "quinta-da-romaneira"],
    tiers: [
      { label: "BRONZE", color: BRONZE, lines: ["1 x Month Activation", "Min. 3 x GHF SKUs", "Min. 3 x BTG or 33/34cl Bottles"], benefits: ["Menu Printing", "Staff Training", "Staff Incentive"] },
      { label: "SILVER", color: SILVER, lines: ["1 x Month Activation", "Min. 4 x GHF SKUs", "Min. 4 x BTG or 33/34cl Bottles"], benefits: ["Bronze Support +", "Stock Support"] },
      { label: "GOLD", color: GOLD, lines: ["1 x Month Activation", "Min. 5 x GHF SKUs", "Min. 5 x BTG or 33/34cl Bottles"], benefits: ["Silver Support +", "2 x 75cl Btls / 1 x 33/34cl Case for Staff Drinks"] },
    ],
  },
];
