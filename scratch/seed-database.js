const { createClient } = require("@supabase/supabase-js");
const fs = require("fs");
const path = require("path");

let url = process.env.NEXT_PUBLIC_SUPABASE_URL;
let key = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!url || !key) {
  try {
    const env = fs.readFileSync(path.join(__dirname, "../.env.local"), "utf8");
    env.split("\n").forEach((line) => {
      const match = line.match(/^\s*([^#=\s]+)\s*=\s*(.*)$/);
      if (match) {
        const k = match[1];
        const v = match[2].trim();
        if (k === "NEXT_PUBLIC_SUPABASE_URL") url = v;
        if (k === "SUPABASE_SERVICE_ROLE_KEY") key = v;
      }
    });
  } catch (e) {
    console.error("Failed to read .env.local", e);
  }
}

const supabase = createClient(url, key);

const brands = [
  // ─── SPIRITS ───────────────────────────────────────────
  {
    slug: "sapling",
    name: "Sapling",
    category: "Spirits",
    tagline: "Climate Positive Spirits.",
    description:
      "Sapling is a British vodka brand that takes a proactive approach to sustainability, without compromising on quality. A premium vodka that supports your sustainability efforts by planting a tree for every bottle sold.",
    bcorp: true,
    promotion_active: false,
    variants: [
      { name: "Climate Positive Vodka", volume: "70cl, 5L", abv: "40%", sort_order: 1 },
      { name: "Raspberry & Hibiscus Vodka", volume: "70cl, 5L", abv: "40%", sort_order: 2 },
      { name: "Climate Positive Gin", volume: "70cl, 5L", abv: "40%", sort_order: 3 },
    ],
    activations: [
      {
        title: "Buy-One-Get-One-Tree",
        description:
          "For every cocktail you sell, Sapling will plant a tree. Specials menu, staff incentives, and POS available. *up to agreed target.",
        activation_type: "SUPPORT & LAUNCH",
        key_dates: ["Earth Day", "Zero Waste Week", "Environment Day", "Martini Day", "G&T Day"],
        type: "upcoming",
      },
      {
        title: "British Spritz Menu",
        description:
          "Celebrate the Best of British with a top-selling serve, supported with menu printing, training, staff incentives.",
        activation_type: "ROTATING COCKTAIL",
        key_dates: ["Spritz Day", "Buy British Day", "Spring/Summer", "Cocktail Day", "Vodka Day"],
        type: "upcoming",
      },
    ],
  },
  {
    slug: "fielden",
    name: "Fielden",
    category: "Spirits",
    tagline: "Whisky of England.",
    description:
      "Fielden is a pioneering English Rye Whisky, made with diverse heritage grains grown in fields across England. Made for new luxury consumers to enjoy in brighter, lighter moments.",
    bcorp: false,
    promotion_active: false,
    variants: [
      { name: "Signature Rye Whisky", volume: "70cl, 5L", abv: "43%", sort_order: 1 },
      { name: "Harvest Release 2019", volume: "70cl", abv: "46%", sort_order: 2 },
      { name: "Harvest Release 2020", volume: "70cl", abv: "46%", sort_order: 3 },
      { name: "Fieldnotes Collection (Limited Editions)", volume: "70cl", abv: "46%", sort_order: 4 },
    ],
    activations: [
      {
        title: "Whisky Dinner",
        description:
          "An evening of discovery with Fielden's Brand Ambassador and perfectly paired tasting menu. Menu printing, photography and tablescaping.",
        activation_type: "SUPPORT & LAUNCH",
        key_dates: ["Spring/Summer", "Whisky Day", "Earth Day", "Environment Day", "Zero Waste Week"],
        type: "upcoming",
      },
      {
        title: "Harvest Cocktail",
        description:
          "Enjoy the taste of the English countryside with a creative cocktail menu that celebrates the harvest. Menu printing, development support, photography.",
        activation_type: "ROTATING COCKTAIL",
        key_dates: ["Autumn/Winter", "Harvest Moon", "Harvest Festival", "Lammas Day", "Buy British Day"],
        type: "upcoming",
      },
    ],
  },
  {
    slug: "dropworks",
    name: "DropWorks",
    category: "Spirits",
    tagline: "Crafted in Great Britain.",
    description:
      "DropWorks is a premium British rum created by bartenders, for bartenders. This is a high-quality spirit, made for mixing and for discovering the possibilities of rum.",
    bcorp: false,
    promotion_active: false,
    variants: [
      { name: "Clear Drop Rum", volume: "70cl, 5L", abv: "40%", sort_order: 1 },
      { name: "Barrel Drop Rum", volume: "70cl, 5L", abv: "40%", sort_order: 2 },
      { name: "Spice Drop Rum", volume: "70cl, 5L", abv: "40%", sort_order: 3 },
      { name: "Dark Drop Rum", volume: "70cl, 5L", abv: "40%", sort_order: 4 },
      { name: "Funk Drop Overproof Rum", volume: "70cl, 5L", abv: "57%", sort_order: 5 },
      { name: "Distiller's Drop", volume: "50cl (Trade Exclusive)", abv: "40%", sort_order: 6 },
    ],
    activations: [
      {
        title: "Rum Masterclass",
        description:
          "An immersive tasting experience exploring the full DropWorks range with the founders. Staff training, menu development and photography.",
        activation_type: "SUPPORT & LAUNCH",
        key_dates: ["Rum Day", "Cocktail Day", "Negroni Week", "Summer Sip & Spritz"],
        type: "upcoming",
      },
      {
        title: "Rotating Rum Cocktail",
        description:
          "Feature a DropWorks signature cocktail on your menu with full support — menu printing, staff incentives and POS.",
        activation_type: "ROTATING COCKTAIL",
        key_dates: ["Rum Day", "Festive", "Earth Month", "Summer Sip & Spritz"],
        type: "upcoming",
      },
    ],
  },
  {
    slug: "desdeya",
    name: "Desdeya",
    category: "Spirits",
    tagline: "Tequila Blanco.",
    description:
      "Desdeya Tequila Blanco. Hecho en Mexico. 100% Agave. Artesanal.",
    bcorp: false,
    promotion_active: false,
    variants: [
      { name: "Tequila Blanco", volume: "70cl", abv: "38%", sort_order: 1 },
    ],
    activations: [],
  },
  {
    slug: "pensador",
    name: "Pensador",
    category: "Spirits",
    tagline: "Mezcal Artesanal.",
    description:
      "El Camino del Pensador — Mezcal Artesanal. Envasado en Mexico. Denominación de Origen Protegida.",
    bcorp: false,
    promotion_active: false,
    variants: [
      { name: "Mezcal Artesanal", volume: "70cl", abv: "43%", sort_order: 1 },
    ],
    activations: [],
  },
  {
    slug: "everleaf",
    name: "Everleaf",
    category: "Spirits",
    tagline: "Non-Alcoholic Aperitif.",
    description:
      "Complex. Botanical. Non-Alcoholic. Founded by a conservation biologist, Everleaf creates complex non-alcoholic aperitifs sourced sustainably from around the globe.",
    bcorp: false,
    promotion_active: false,
    variants: [
      { name: "Forest", volume: "50cl", abv: "0%", sort_order: 1 },
      { name: "Mountain", volume: "50cl", abv: "0%", sort_order: 2 },
      { name: "Marine", volume: "50cl", abv: "0%", sort_order: 3 },
    ],
    activations: [],
  },

  // ─── WINES ─────────────────────────────────────────────
  {
    slug: "mirabeau",
    name: "Mirabeau",
    category: "Wines",
    tagline: "Provence Rosé.",
    description:
      "Mirabeau is a market-leading Provence rosé offering a range of premium, BCorp wines from the region's best vineyards. Founded by a British couple looking to redefine winemaking and lead the charge on regenerative viticulture.",
    bcorp: true,
    promotion_active: false,
    variants: [
      { name: "Pure", volume: "75cl, 150cl, 3L, 6L", abv: "13%", sort_order: 1 },
      { name: "Classic", volume: "75cl, 150cl, 3L, 6L", abv: "13%", sort_order: 2 },
      { name: "Etoile", volume: "75cl", abv: "13%", sort_order: 3 },
      { name: "Forever Summer", volume: "75cl", abv: "13%", sort_order: 4 },
      { name: "X", volume: "75cl", abv: "13%", sort_order: 5 },
      { name: "Prêt-à-Porter Rosé Canettes", volume: "75cl", abv: "13%", sort_order: 6 },
      { name: "Mirabeau Dry Rosé Gin", volume: "75cl", abv: "40%", sort_order: 7 },
      { name: "Azure", volume: "75cl", abv: "13%", sort_order: 8 },
      { name: "La Réserve", volume: "75cl", abv: "13%", sort_order: 9 },
      { name: "Belle Année", volume: "75cl", abv: "13%", sort_order: 10 },
      { name: "Rosé Spritz", volume: "75cl", abv: "8%", sort_order: 11 },
      { name: "One Day", volume: "75cl", abv: "13%", sort_order: 12 },
      { name: "La Folie", volume: "75cl", abv: "13%", sort_order: 13 },
    ],
    activations: [
      {
        title: "Rosé All Day",
        description:
          "Feature Mirabeau Pure on your summer menu with a dedicated rosé promotion. Menu printing, staff training and social media support.",
        activation_type: "WINE BUNDLE",
        key_dates: ["Rosé Day", "Spring/Summer", "Spritz Day", "Festive"],
        type: "upcoming",
      },
    ],
  },
  {
    slug: "craggy-range",
    name: "Craggy Range",
    category: "Wines",
    tagline: "New Zealand Fine Wine.",
    description:
      "Craggy Range produces fine wine from New Zealand's best single vineyards. World-class Sauvignon Blanc, Syrah, Chardonnay and Pinot Noir.",
    bcorp: false,
    promotion_active: false,
    variants: [
      { name: "Sauvignon Blanc", volume: "75cl", abv: "13%", sort_order: 1 },
      { name: "Syrah", volume: "75cl", abv: "14%", sort_order: 2 },
      { name: "Chardonnay", volume: "75cl", abv: "13%", sort_order: 3 },
      { name: "Pinot Noir", volume: "75cl", abv: "13.5%", sort_order: 4 },
    ],
    activations: [
      {
        title: "Wine Flight",
        description:
          "In collaboration with your chefs, curate a tasting menu paired with a Craggy Range wine flight. Menu printing, training.",
        activation_type: "WINE BUNDLE",
        key_dates: ["Sauvignon Blanc Day", "Syrah Day", "Chardonnay Day", "Pinot Noir Day"],
        type: "upcoming",
      },
      {
        title: "Guided Tasting Event",
        description:
          "Host a ticketed tasting event to sample a range of Craggy Range wines and light bites. Training and hosting support.",
        activation_type: "WINE BUNDLE",
        key_dates: ["Waitangi Day (NZ National Day)", "Easter"],
        type: "upcoming",
      },
    ],
  },
  {
    slug: "coates-and-seely",
    name: "Coates & Seely",
    category: "Wines",
    tagline: "English Sparkling Wine.",
    description:
      "Coates & Seely produces world-class English sparkling wine from Hampshire. Handcrafted using traditional methods.",
    bcorp: false,
    promotion_active: false,
    variants: [
      { name: "Brut Reserve NV", volume: "75cl", abv: "12%", sort_order: 1 },
      { name: "Blanc de Blancs", volume: "75cl", abv: "12%", sort_order: 2 },
      { name: "Rosé", volume: "75cl", abv: "12%", sort_order: 3 },
    ],
    activations: [],
  },
  {
    slug: "quinta-da-romaneira",
    name: "Quinta da Romaneira",
    category: "Wines",
    tagline: "Douro Valley.",
    description:
      "Quinta da Romaneira is one of the Douro Valley's most spectacular estates, producing premium Port and still wines.",
    bcorp: false,
    promotion_active: false,
    variants: [
      { name: "Douro Red", volume: "75cl", abv: "14%", sort_order: 1 },
      { name: "Porto LBV", volume: "75cl", abv: "20%", sort_order: 2 },
    ],
    activations: [],
  },
  {
    slug: "dreamsake",
    name: "Dreamsake",
    category: "Wines",
    tagline: "Smooth Japanese Sake.",
    description:
      "A high-grade sake made in Hyōgo, Japan from finely polished Yamada Nishiki rice and Miyamizu water from Mt. Rokko. Crafted for the modern consumer.",
    bcorp: false,
    promotion_active: false,
    variants: [
      { name: "Daiginjo No.1", volume: "75cl", abv: "15.5%", sort_order: 1 },
    ],
    activations: [
      {
        title: "Pairing Menu",
        description:
          "Pair sake with contemporary cuisine to offer customers a new taste experience. Guided tasting and serve training available.",
        activation_type: "WINE BUNDLE",
        key_dates: ["Sushi Day", "Spring/Summer"],
        type: "upcoming",
      },
      {
        title: "Sake + Sounds",
        description:
          "Pair sake-serves with Dreamsake's official playlists, curated by the founders for the smooth drinking experience.",
        activation_type: "WINE BUNDLE",
        key_dates: ["World Sake Day", "Autumn/Winter", "Record Store Day", "Martini Day"],
        type: "upcoming",
      },
    ],
  },
  {
    slug: "wild-idol",
    name: "Wild Idol",
    category: "Wines",
    tagline: "Alcohol-Free Sparkling Rosé.",
    description:
      "Wild Idol is a premium alcohol-free sparkling rosé. Beautifully crafted for those who want the occasion without the alcohol.",
    bcorp: false,
    promotion_active: false,
    variants: [
      { name: "Alcohol-Free Sparkling Rosé", volume: "75cl", abv: "0%", sort_order: 1 },
      { name: "Alcohol-Free Sparkling White", volume: "75cl", abv: "0%", sort_order: 2 },
    ],
    activations: [],
  },

  // ─── BEER, CIDER & MIXER ────────────────────────────────
  {
    slug: "noam",
    name: "NOAM",
    category: "Beer, Cider & Mixer",
    tagline: "Austrian Organic Lager.",
    description:
      "NOAM is a premium Austrian organic lager brewed with the finest natural ingredients.",
    bcorp: false,
    promotion_active: false,
    variants: [
      { name: "Organic Lager", volume: "33cl", abv: "5%", sort_order: 1 },
    ],
    activations: [],
  },
  {
    slug: "wignac",
    name: "Wignac",
    category: "Beer, Cider & Mixer",
    tagline: "French Cider.",
    description:
      "Wignac is a premium French cider from Normandy. Crafted from heritage apple varieties for a refined, elegant serve.",
    bcorp: false,
    promotion_active: false,
    variants: [
      { name: "Wignac Brut", volume: "75cl", abv: "5.5%", sort_order: 1 },
    ],
    activations: [],
  },
  {
    slug: "cote-citron",
    name: "Côte Citron",
    category: "Beer, Cider & Mixer",
    tagline: "Super-Premium Radler.",
    description:
      "A super-premium Radler, made with Menton lemons from the Cote d'Azur. Crisp and refreshing, Côte Citron is on a mission to keep the good life of the French Riviera alive.",
    bcorp: false,
    promotion_active: false,
    variants: [
      { name: "Radler", volume: "33cl Bottle/Can", abv: "2.4%", sort_order: 1 },
    ],
    activations: [],
  },
  {
    slug: "big-drop",
    name: "Big Drop",
    category: "Beer, Cider & Mixer",
    tagline: "Alcohol-Free Craft Beer.",
    description:
      "From Britain's most awarded brewery, a range of naturally brewed alcohol-free craft beer. Full of high-quality flavour with no-added ingredients, for an uncompromising moderation experience.",
    bcorp: false,
    promotion_active: false,
    variants: [
      { name: "Reef Point Craft Lager", volume: "33cl Bottle/Can", abv: "0.5%", sort_order: 1 },
      { name: "Paradiso Citra IPA", volume: "33cl Bottle/Can", abv: "0.5%", sort_order: 2 },
      { name: "Poolside DDH IPA", volume: "33cl Bottle/Can", abv: "0.5%", sort_order: 3 },
      { name: "Pine Trail Pale Ale", volume: "33cl Bottle/Can", abv: "0.5%", sort_order: 4 },
      { name: "Galactic Milk Stout", volume: "33cl Bottle/Can", abv: "0.5%", sort_order: 5 },
    ],
    activations: [],
  },
  {
    slug: "fever-tree",
    name: "Fever-Tree",
    category: "Beer, Cider & Mixer",
    tagline: "If 3/4 of your drink is the mixer, mix with the best.",
    description:
      "Fever-Tree is the world's leading producer of premium carbonated mixers. By using the finest natural ingredients from around the world, Fever-Tree has created a range of mixers that complement and enhance premium spirits.",
    bcorp: false,
    promotion_active: false,
    variants: [
      { name: "Premium Indian Tonic Water", volume: "20cl", abv: "0%", sort_order: 1 },
      { name: "Ginger Beer", volume: "20cl", abv: "0%", sort_order: 2 },
    ],
    activations: [],
  },
];


async function seed() {
  console.log("Starting seed...");

  for (const brand of brands) {
    const { variants, activations, ...brandData } = brand;

    // Upsert brand row
    const { data: inserted, error: brandError } = await supabase
      .from("brands")
      .upsert(
        { ...brandData },
        { onConflict: "slug" }
      )
      .select()
      .single();

    if (brandError) {
      console.error(`Error inserting brand ${brand.slug}:`, brandError.message);
      continue;
    }

    console.log(`Brand inserted: ${brand.name}`);

    // Insert variants
    if (variants.length > 0) {
      // Delete existing first to avoid duplicates on re-seed
      await supabase.from("brand_variants").delete().eq("brand_id", inserted.id);

      const { error: variantError } = await supabase.from("brand_variants").insert(
        variants.map((v) => ({ ...v, brand_id: inserted.id }))
      );
      if (variantError) {
        console.error(`Error inserting variants for ${brand.slug}:`, variantError.message);
      } else {
        console.log(`  ${variants.length} variants inserted`);
      }
    }

    // Insert activations
    if (activations.length > 0) {
      await supabase.from("activations").delete().eq("brand_id", inserted.id);

      const { error: actError } = await supabase.from("activations").insert(
        activations.map((a) => ({ ...a, brand_id: inserted.id }))
      );
      if (actError) {
        console.error(`Error inserting activations for ${brand.slug}:`, actError.message);
      } else {
        console.log(`  ${activations.length} activations inserted`);
      }
    }
  }

  console.log("Seed complete.");
}

seed();
