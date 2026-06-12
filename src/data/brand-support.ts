export interface SupportOption {
  slug: string;
  label: string;
  description: string;
  image?: string;
}

export const BRAND_SUPPORT: Record<string, SupportOption[]> = {
  sapling: [
    {
      slug: "buy-one-get-one-tree",
      label: "Buy-One-Get-One-Tree Support",
      description: "For every cocktail you sell, Sapling will plant a tree. Specials menu, staff incentives, and POS available. *up to agreed target.",
      image: "/brands/sapling/lifestyle-1.jpg"
    },
    {
      slug: "british-spritz-menu",
      label: "British Spritz Menu Support",
      description: "Celebrate the Best of British with a top-selling serve, supported with menu printing, training, staff incentives.",
      image: "/brands/sapling/lifestyle-2.jpg"
    }
  ],
  fielden: [
    {
      slug: "whisky-dinner",
      label: "Whisky Dinner Support",
      description: "An evening of discovery with Fielden's Brand Ambassador and perfectly paired tasting menu. Menu printing, photography and tablescaping.",
      image: "/brands/fielden/lifestyle-1.jpg"
    },
    {
      slug: "harvest-cocktail",
      label: "Harvest Cocktail Support",
      description: "Enjoy the taste of the English countryside with a creative cocktail menu that celebrates the harvest. Menu printing, development support, photography.",
      image: "/brands/fielden/lifestyle-2.jpg"
    }
  ],
  dropworks: [
    {
      slug: "rum-masterclass",
      label: "Rum Masterclass Support",
      description: "An immersive tasting experience exploring the full DropWorks range with the founders. Staff training, menu development and photography.",
      image: "/brands/dropworks/lifestyle-1.jpg"
    },
    {
      slug: "rotating-rum-cocktail",
      label: "Rotating Rum Cocktail Support",
      description: "Feature a DropWorks signature cocktail on your menu with full support — menu printing, staff incentives and POS.",
      image: "/brands/dropworks/lifestyle-2.jpg"
    }
  ],
  mirabeau: [
    {
      slug: "rose-all-day",
      label: "Rosé All Day Support",
      description: "Feature Mirabeau Pure on your summer menu with a dedicated rosé promotion. Menu printing, staff training and social media support.",
      image: "/brands/mirabeau/lifestyle-1.jpg"
    }
  ],
  "craggy-range": [
    {
      slug: "wine-flight",
      label: "Wine Flight Support",
      description: "In collaboration with your chefs, curate a tasting menu paired with a Craggy Range wine flight. Menu printing, training.",
      image: "/brands/craggy-range/lifestyle-1.jpg"
    },
    {
      slug: "guided-tasting-event",
      label: "Guided Tasting Event Support",
      description: "Host a ticketed tasting event to sample a range of Craggy Range wines and light bites. Training and hosting support.",
      image: "/brands/craggy-range/lifestyle-2.jpg"
    }
  ],
  dreamsake: [
    {
      slug: "pairing-menu",
      label: "Pairing Menu Support",
      description: "Pair sake with contemporary cuisine to offer customers a new taste experience. Guided tasting and serve training available.",
      image: "/brands/dreamsake/lifestyle-1.jpg"
    },
    {
      slug: "sake-sounds",
      label: "Sake + Sounds Support",
      description: "Pair sake-serves with Dreamsake's official playlists, curated by the founders for the smooth drinking experience.",
      image: "/brands/dreamsake/lifestyle-2.jpg"
    }
  ]
};

const DEFAULT_SUPPORT: SupportOption[] = [
  {
    slug: "rotating-cocktail",
    label: "Rotating Cocktail",
    description: "Seasonal bespoke serve featured on menus with support for staff training and menu printing."
  },
  {
    slug: "launch-support",
    label: "Launch Support",
    description: "Comprehensive launch event support including marketing materials, staff incentives, and POS kits."
  }
];

export function getBrandSupportOptions(slug: string): SupportOption[] {
  return BRAND_SUPPORT[slug] || DEFAULT_SUPPORT;
}
