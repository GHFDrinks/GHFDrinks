export interface BrandAsset {
  url: string;
  alt: string;
}

export interface TastingNote {
  flavor: string;
  intensity: number; // 1-100
  description?: string;
}

export interface BrandVariant {
  id: string;
  name: string;
  description: string;
  image: BrandAsset;
  tastingNotes: TastingNote[];
  abv: string;
  volume: string;
}

export interface Serve {
  name: string;
  ingredients: string[];
  instructions: string;
  image: BrandAsset;
}

export interface Activation {
  id: string;
  title: string;
  date: string;
  location: string;
  description: string;
  image: BrandAsset;
  type: "upcoming" | "past";
}

export interface SupportPackage {
  id: string;
  tier: string;
  title: string;
  benefits: string[];
  investment?: string;
}

export interface Brand {
  id: string;
  slug: string;
  name: string;
  category: string;
  tagline: string;
  heroImage: BrandAsset;
  logo?: BrandAsset;
  story: {
    title?: string;
    headline?: string;
    description?: string;
    content?: string[];
    founders?: string[];
    image?: BrandAsset;
  };
  variants: BrandVariant[];
  serves: Serve[];
  activations: Activation[];
  supportPackages: SupportPackage[];
  mediaGallery: BrandAsset[];
}
