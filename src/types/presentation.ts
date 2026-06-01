import { Brand } from "./brand";

export type SlideType = "intro" | "activation" | "tasting" | "support";

export interface Slide {
  id: string;
  brandId: string;
  type: SlideType;
}

export interface Presentation {
  id: string;
  name: string;
  dateCreated: string;
  brands: string[]; // array of brand IDs
  slides: Slide[];
}

export interface PresentationTemplate {
  id: string;
  name: string;
  description: string;
  brandSlugs: string[]; // slugs of the brands included
}

export const PRESENTATION_TEMPLATES: PresentationTemplate[] = [
  {
    id: "t1",
    name: "Low/No Alcohol Package",
    description: "A curated selection of premium non-alcoholic and low ABV options.",
    brandSlugs: ["everleaf"], // Currently we only have Everleaf as no-alc in mock
  },
  {
    id: "t2",
    name: "Best of British",
    description: "Highlighting exceptional spirits distilled in the UK.",
    brandSlugs: ["sapling"],
  },
  {
    id: "t3",
    name: "Sustainable Brands",
    description: "Brands making a positive impact on the environment.",
    brandSlugs: ["sapling", "everleaf", "mirabeau"],
  },
  {
    id: "t4",
    name: "Contemporary & Creative",
    description: "Modern brands pushing the boundaries of category norms.",
    brandSlugs: ["everleaf", "mirabeau"],
  },
  {
    id: "t5",
    name: "Crafted & Discerning",
    description: "Premium, highly crafted liquids for the discerning palate.",
    brandSlugs: ["sapling", "mirabeau"],
  }
];
