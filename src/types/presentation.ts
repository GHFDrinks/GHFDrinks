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
  brands: string[];
  slides: Slide[];
}

export interface PresentationTemplate {
  id: string;
  name: string;
  description: string;
  brandSlugs: string[];
}

export const PRESENTATION_TEMPLATES: PresentationTemplate[] = [
  {
    id: "best-of-british",
    name: "Best of British",
    description:
      "Exceptional spirits and sparkling wines distilled and produced in the UK.",
    brandSlugs: ["sapling", "fielden", "dropworks", "coates-and-seely"],
  },
  {
    id: "sustainable",
    name: "Sustainable",
    description:
      "Brands making a measurable positive impact on the environment.",
    brandSlugs: ["sapling", "mirabeau", "everleaf", "big-drop"],
  },
  {
    id: "european-lifestyle",
    name: "European Lifestyle",
    description:
      "Sun-drenched, convivial brands from France and across Europe.",
    brandSlugs: ["mirabeau", "wignac", "cote-citron", "noam", "dreamsake"],
  },
  {
    id: "crafted-and-discerning",
    name: "Crafted & Discerning",
    description:
      "Premium, highly crafted liquids for the discerning on-trade buyer.",
    brandSlugs: ["fielden", "craggy-range", "quinta-da-romaneira", "coates-and-seely"],
  },
  {
    id: "elevated-and-sophisticated",
    name: "Elevated & Sophisticated",
    description:
      "Brands that elevate the guest experience and command premium positioning.",
    brandSlugs: ["sapling", "fielden", "mirabeau", "dreamsake", "cote-citron", "wild-idol"],
  },
  {
    id: "contemporary-and-creative",
    name: "Contemporary & Creative",
    description:
      "Modern brands pushing the boundaries of category norms.",
    brandSlugs: ["dropworks", "desdeya", "pensador", "everleaf", "dreamsake", "wignac", "big-drop"],
  },
];
