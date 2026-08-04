export interface BrandAsset {
  url: string;
  alt: string;
}

export interface TastingNote {
  flavor: string;
  intensity: number; // 1-100
  description?: string;
}

export interface MixerPairing {
  name: string;
  imageUrl: string;
}

export interface VenueBadge {
  name: string;
  logoUrl: string;
}

export interface BrandVariant {
  id: string;
  name: string;
  description: string;
  image: BrandAsset;
  tastingNotes: TastingNote[];
  abv: string;
  volume: string;
  mixerPairings?: MixerPairing[];
  serveInspiration?: string;
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
  photo1?: BrandAsset;
  photo2?: BrandAsset;
  type: "upcoming" | "past";
  activationType: string; // e.g. "ROTATING COCKTAIL" — circular badge label
  keyDates: string[];     // e.g. ["Earth Day", "Negroni Week", "Martini Day"]
  mixerPairings: MixerPairing[]; // "Try with..." strip
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
  packages?: string[]; // Occasion/Culture/Product package slugs this brand belongs to (admin-managed)
  tagline: string;
  heroImage: BrandAsset;
  logo?: BrandAsset;
  lifestyleImages: BrandAsset[];   // mosaic of 3 on left panel
  venueBadges: VenueBadge[];       // circular partner logos on mosaic
  promotionActive: boolean;        // admin toggle for live promotions
  bcorp?: boolean;                 // show B-Corp badge
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
