import { Brand } from "@/types/brand";

export const mockBrands: Brand[] = [
  {
    id: "b1",
    slug: "sapling",
    name: "Sapling",
    category: "Spirits",
    tagline: "Climate Positive Spirits.",
    heroImage: {
      url: "https://images.unsplash.com/photo-1574586597379-0da87157a5eb?auto=format&fit=crop&q=80&w=2000",
      alt: "Sapling Hero Image"
    },
    story: {
      headline: "Rooted in sustainability, crafted for taste.",
      content: [
        "Sapling was founded with a clear mission: to create high-quality spirits while giving back to the environment. For every bottle sold, we plant a tree.",
        "Our vodka is distilled exclusively from British wheat, resulting in a smooth, refined profile that stands up in any premium serve."
      ],
      image: {
        url: "https://images.unsplash.com/photo-1542273917363-3b1817f69a2d?auto=format&fit=crop&q=80&w=1200",
        alt: "Sapling Trees"
      }
    },
    variants: [
      {
        id: "v1",
        name: "Sapling Vodka",
        description: "Four times distilled British wheat vodka.",
        image: { url: "https://images.unsplash.com/photo-1614316345634-110034a70617?auto=format&fit=crop&q=80&w=800", alt: "Sapling Vodka Bottle" },
        abv: "40%",
        volume: "70cl",
        tastingNotes: [
          { flavor: "Clean", intensity: 90 },
          { flavor: "Citrus", intensity: 40 },
          { flavor: "Vanilla", intensity: 30 }
        ]
      },
      {
        id: "v2",
        name: "Sapling Gin",
        description: "A classic London Dry with a climate positive twist.",
        image: { url: "https://images.unsplash.com/photo-1609845768806-767f740d24d7?auto=format&fit=crop&q=80&w=800", alt: "Sapling Gin Bottle" },
        abv: "40%",
        volume: "70cl",
        tastingNotes: [
          { flavor: "Juniper", intensity: 85 },
          { flavor: "Rosemary", intensity: 60 },
          { flavor: "Grapefruit", intensity: 50 }
        ]
      }
    ],
    serves: [
      {
        name: "The Sapling Martini",
        ingredients: ["50ml Sapling Vodka", "10ml Dry Vermouth", "Lemon Twist"],
        instructions: "Stir ingredients over ice and strain into a chilled martini glass. Garnish with a lemon twist.",
        image: { url: "https://images.unsplash.com/photo-1551538827-9c037cb4f32a?auto=format&fit=crop&q=80&w=800", alt: "Martini" }
      }
    ],
    activations: [
      {
        id: "a1",
        title: "London Tree Planting Initiative",
        date: "October 2026",
        location: "London, UK",
        description: "Join us as we plant 500 trees in urban London spaces, followed by a zero-waste cocktail reception.",
        type: "upcoming",
        image: { url: "https://images.unsplash.com/photo-1582213709088-3486c429712a?auto=format&fit=crop&q=80&w=1200", alt: "Tree Planting" }
      }
    ],
    supportPackages: [
      {
        id: "sp1",
        tier: "Gold Partner",
        title: "Sustainability Integration",
        benefits: ["Staff training on sustainable pours", "Custom zero-waste cocktail menus", "Co-branded tree planting certificate"]
      }
    ],
    mediaGallery: [
      { url: "https://images.unsplash.com/photo-1470337458703-415120a41f67?auto=format&fit=crop&q=80&w=1000", alt: "Gallery 1" },
      { url: "https://images.unsplash.com/photo-1436076863939-06870fe779c2?auto=format&fit=crop&q=80&w=1000", alt: "Gallery 2" }
    ]
  },
  {
    id: "b2",
    slug: "everleaf",
    name: "Everleaf",
    category: "Non-Alcoholic",
    tagline: "Complex. Botanical. Non-Alcoholic.",
    heroImage: {
      url: "https://images.unsplash.com/photo-1508595165502-3e2652e5a405?auto=format&fit=crop&q=80&w=2000",
      alt: "Everleaf Hero Image"
    },
    story: {
      headline: "Rooted in nature, crafted by a conservationist.",
      content: [
        "Founded by a conservation biologist, Everleaf creates complex non-alcoholic aperitifs sourced sustainably from around the globe.",
        "Our unique blends provide the depth, mouthfeel, and complexity usually reserved for alcoholic spirits."
      ],
      image: {
        url: "https://images.unsplash.com/photo-1466692476868-aef1dfb1e735?auto=format&fit=crop&q=80&w=1200",
        alt: "Everleaf Botanicals"
      }
    },
    variants: [
      {
        id: "v3",
        name: "Everleaf Forest",
        description: "Complex and bittersweet, with notes of vanilla, saffron, and orange blossom.",
        image: { url: "https://images.unsplash.com/photo-1596733430284-f743728fc112?auto=format&fit=crop&q=80&w=800", alt: "Everleaf Forest" },
        abv: "0.0%",
        volume: "50cl",
        tastingNotes: [
          { flavor: "Vanilla", intensity: 80 },
          { flavor: "Saffron", intensity: 65 },
          { flavor: "Orange Blossom", intensity: 75 }
        ]
      }
    ],
    serves: [
      {
        name: "Forest Spritz",
        ingredients: ["50ml Everleaf Forest", "150ml Light Tonic", "Orange Slice"],
        instructions: "Pour over ice, top with light tonic, and garnish with an orange slice.",
        image: { url: "https://images.unsplash.com/photo-1587884144458-1f1737e409b3?auto=format&fit=crop&q=80&w=800", alt: "Forest Spritz" }
      }
    ],
    activations: [
      {
        id: "a2",
        title: "Dry January Masterclass",
        date: "January 2027",
        location: "Manchester, UK",
        description: "A deep dive into non-alcoholic mixology for premium bar staff.",
        type: "upcoming",
        image: { url: "https://images.unsplash.com/photo-1514362545857-3bc16c4c7d1b?auto=format&fit=crop&q=80&w=1200", alt: "Masterclass" }
      }
    ],
    supportPackages: [
      {
        id: "sp2",
        tier: "Standard",
        title: "Nolo Menu Takeover",
        benefits: ["Dedicated Non-Alc menu design", "Glassware support", "Masterclass training"]
      }
    ],
    mediaGallery: [
      { url: "https://images.unsplash.com/photo-1615887023516-9bfa6da845df?auto=format&fit=crop&q=80&w=1000", alt: "Gallery 3" }
    ]
  },
  {
    id: "b3",
    slug: "mirabeau",
    name: "Mirabeau",
    category: "Wines",
    tagline: "The essence of the Riviera.",
    heroImage: {
      url: "https://images.unsplash.com/photo-1506377247377-2a5b3b417ebb?auto=format&fit=crop&q=80&w=2000",
      alt: "Mirabeau Hero"
    },
    story: {
      headline: "Crafting the finest rosé from Provence.",
      content: [
        "Mirabeau embodies the elegant, relaxed lifestyle of the French Riviera. Our wines are crafted with precision to deliver a beautiful, pale pink rosé.",
        "We believe in creating moments of pure joy, captured in every bottle."
      ],
      image: {
        url: "https://images.unsplash.com/photo-1516594915697-87eb3b1c14ea?auto=format&fit=crop&q=80&w=1200",
        alt: "Mirabeau Vineyard"
      }
    },
    variants: [
      {
        id: "v4",
        name: "Pure Provence Rosé",
        description: "Delicate, dry, and elegantly pale with notes of citrus and wild strawberry.",
        image: { url: "https://images.unsplash.com/photo-1585553616435-2dc0a54e271d?auto=format&fit=crop&q=80&w=800", alt: "Mirabeau Pure" },
        abv: "12.5%",
        volume: "75cl",
        tastingNotes: [
          { flavor: "Wild Strawberry", intensity: 80 },
          { flavor: "Citrus", intensity: 70 },
          { flavor: "White Peach", intensity: 60 }
        ]
      }
    ],
    serves: [
      {
        name: "Riviera Summer",
        ingredients: ["Chilled Mirabeau Pure", "Good company"],
        instructions: "Serve chilled between 8-10°C.",
        image: { url: "https://images.unsplash.com/photo-1559564484-e48b3e040ff4?auto=format&fit=crop&q=80&w=800", alt: "Riviera Summer" }
      }
    ],
    activations: [
      {
        id: "a3",
        title: "Summer Solstice Terrace Party",
        date: "June 2026",
        location: "Ibiza",
        description: "Kick off the summer season with an exclusive sunset tasting event.",
        type: "past",
        image: { url: "https://images.unsplash.com/photo-1533143708019-ea5cfa80213e?auto=format&fit=crop&q=80&w=1200", alt: "Terrace Party" }
      }
    ],
    supportPackages: [
      {
        id: "sp3",
        tier: "Platinum",
        title: "Terrace Transformation",
        benefits: ["Branded parasols and cushions", "Exclusive ice buckets", "Social media campaign amplification"]
      }
    ],
    mediaGallery: [
      { url: "https://images.unsplash.com/photo-1506377247377-2a5b3b417ebb?auto=format&fit=crop&q=80&w=1000", alt: "Gallery 4" }
    ]
  }
];

export function getBrandBySlug(slug: string): Brand | undefined {
  return mockBrands.find(b => b.slug === slug);
}
