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
  longDescription?: string;
  supportItems?: string[];
  galleryImages?: string[];
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
    longDescription: "Kick off the year with a premium wellness-focused portfolio activation. Dry January is no longer about compromise — our select non-alcoholic brands offer full complexity and flavor profiles that mirror their alcoholic counterparts, ensuring high-margin customer satisfaction.",
    supportItems: ["Custom non-alcoholic menu designs and premium card printing", "Dedicated staff training on crafting alcohol-free serves", "Stock discounts and POS kits including glassware and table talkers"],
    galleryImages: ["/brands/everleaf/lifestyle-1.jpg", "/brands/everleaf/lifestyle-2.jpg", "/brands/wild-idol/lifestyle-1.jpg"]
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
    longDescription: "Showcase the sustainable credentials of your back bar with our Certified B-Corp and eco-conscious brands. Earth Month is the perfect opportunity to highlight organic farming, carbon offsetting, and tree-planting initiatives directly on your drinks menu.",
    supportItems: ["Co-branded menus highlighting product sustainability credentials", "Distillery trip opportunities and tree planting days for key bar staff", "Premium recycled POS materials and digital marketing assets"],
    galleryImages: ["/brands/sapling/lifestyle-1.jpg", "/brands/sapling/lifestyle-2.jpg", "/brands/fielden/lifestyle-1.jpg"]
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
    longDescription: "Maximize outdoor and summer trading with light, refreshing, and high-visual-appeal serves. From botanical spritzes to sparkling wines and crisp lagers, this bundle ensures a versatile menu suited for warm weather occasions.",
    supportItems: ["Summer terrace activation kits and branded parasols", "Staff incentives featuring festival tickets and brand merch", "Exclusive retro pricing on high-volume sprits and mixers"],
    galleryImages: ["/brands/mirabeau/lifestyle-1.jpg", "/brands/wignac/lifestyle-1.jpg", "/brands/cote-citron/lifestyle-1.jpg"]
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
    longDescription: "Negroni Week is a landmark on the global cocktail calendar. Harness the versatility of our gin, rye whisky, mezcal, and non-alcoholic options to create a sophisticated, high-value Negroni flight for your menu.",
    supportItems: ["Premium Negroni list menu designs with bespoke artwork", "Staff masterclasses led by brand ambassadors and guest bartenders", "Stock incentives and POS barware kits"],
    galleryImages: ["/brands/sapling/activation-2.jpg", "/brands/pensador/lifestyle-1.jpg", "/brands/dropworks/lifestyle-1.jpg"]
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
    longDescription: "Capture the high-spend Christmas party season with indulgent winter warming serves. Elevate your cocktail offering with rich spiced rums, bold rye whiskies, and festive tequila/mezcal cocktails designed for sharing.",
    supportItems: ["Festive-themed menu design and table card print runs", "Staff sales competition with premium GHF hampers and prizes", "Stock allocation support to ensure no out-of-stock key ingredients"],
    galleryImages: ["/brands/fielden/lifestyle-1.jpg", "/brands/desdeya/lifestyle-1.jpg", "/brands/everleaf/lifestyle-3.jpg"]
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
    longDescription: "Transform the dining table into a profit center with perfectly paired wine flights, premium sakes, and festive cider serves. Elevate lunch and dinner packages with sophisticated pre-dinner glass pairings and digestif options.",
    supportItems: ["Tailored wine/cider pairing menus matching your food offering", "Staff wine service training and presentation tutorials", "Co-branded POS and wine buckets/coolers supplied for service"],
    galleryImages: ["/brands/craggy-range/lifestyle-1.jpg", "/brands/coates-and-seely/lifestyle-1.jpg", "/brands/dreamsake/lifestyle-1.jpg"]
  },
];
