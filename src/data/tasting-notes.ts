export interface TastingServe { name: string; ingredients: string[]; }
export interface TastingPairing { category: string; detail: string; }

export type TasteProfileRadar = {
  sweet: number;    // 0-5
  fruity: number;   // 0-5
  fresh: number;    // 0-5
  savoury: number;  // 0-5
  herbal: number;   // 0-5
  spicy: number;    // 0-5
  floral: number;   // 0-5
};

export type ProductFeature = {
  title: string;
  description: string;  // expand-on-click body, one-line sentence
};

export interface VariantTasting {
  brandSlug: string;
  variant: string;
  intro: string;
  features: string[];
  tasteProfile: string[];
  abv: string;
  serves?: TastingServe[];
  pairings?: TastingPairing[];
  listings?: string[];
  tasteProfileRadar?: TasteProfileRadar;   // NEW — preferred over tasteProfile bullets
  productFeatures?: ProductFeature[];      // NEW — up to 3
  carouselImages?: string[];               // NEW — up to 3 per variant
}

export const TASTING_NOTES: VariantTasting[] = [
  // ─── SAPLING ───
  { brandSlug: "sapling", variant: "Sapling Vodka",
    intro: "Smooth by nature and considered by craft, this is vodka made for those who savour the sip, not the spotlight.",
    features: ["Organic Winter Wheat", "Gluten Free & Vegan", "4x Distilled"],
    tasteProfile: ["Smooth, buttery, and naturally sweet", "Hints of citrus and soft vanilla"], abv: "40% ABV",
    serves: [
      { name: "Apple & Ginger Spritz", ingredients: ["50ml Sapling Vodka", "10ml Ginger Cordial", "30ml Apple Juice", "Elderflower Tonic"] },
      { name: "Smooth Martini", ingredients: ["50ml Sapling Vodka", "10ml Dry Vermouth"] },
    ],
    tasteProfileRadar: { sweet: 3, fruity: 3, fresh: 3, savoury: 2, herbal: 2, spicy: 2, floral: 3 },
    productFeatures: [
      { title: "Feature One", description: "Detailed explanation of feature one and why it matters to the customer." },
      { title: "Feature Two", description: "Detailed explanation of feature two." },
      { title: "Feature Three", description: "Detailed explanation of feature three." }
    ],
    carouselImages: []},
  { brandSlug: "sapling", variant: "Sapling Raspberry Vodka",
    intro: "Full of colour and character, it's a bright, fruit-forward spirit that turns second chances into first pours.",
    features: ["Organic Winter Wheat", "Wonky Raspberries", "4x Distilled"],
    tasteProfile: ["Bright, real raspberry fruitiness", "Floral hibiscus lift"], abv: "40% ABV",
    serves: [
      { name: "Raspberry & Apple Spritz", ingredients: ["50ml Sapling Raspberry Vodka", "20ml Apple Juice", "Light Tonic"] },
      { name: "Raspberry Cosmopolitan", ingredients: ["50ml Sapling Raspberry Vodka", "30ml Cointreau", "10ml Raspberry Syrup", "20ml Cranberry Juice", "10ml Lime Juice"] },
    ],
    tasteProfileRadar: { sweet: 3, fruity: 3, fresh: 3, savoury: 2, herbal: 2, spicy: 2, floral: 3 },
    productFeatures: [
      { title: "Feature One", description: "Detailed explanation of feature one and why it matters to the customer." },
      { title: "Feature Two", description: "Detailed explanation of feature two." },
      { title: "Feature Three", description: "Detailed explanation of feature three." }
    ],
    carouselImages: []},
  { brandSlug: "sapling", variant: "Sapling Gin",
    intro: "A refreshingly zesty take on tradition, distilled with quiet confidence and a love for the wild.",
    features: ["Organic Winter Wheat", "Gluten Free & Vegan", "London Dry"],
    tasteProfile: ["Juniper forward, with bright citrus notes", "Notes of rosemary and wild botanicals"], abv: "40% ABV",
    serves: [
      { name: "Gin & Tonic", ingredients: ["50ml Sapling Gin", "Indian Tonic"] },
      { name: "Sapling Negroni", ingredients: ["25ml Sapling Gin", "20ml Sweet Vermouth", "25ml Campari", "15ml Sage Syrup"] },
    ],
    tasteProfileRadar: { sweet: 3, fruity: 3, fresh: 3, savoury: 2, herbal: 2, spicy: 2, floral: 3 },
    productFeatures: [
      { title: "Feature One", description: "Detailed explanation of feature one and why it matters to the customer." },
      { title: "Feature Two", description: "Detailed explanation of feature two." },
      { title: "Feature Three", description: "Detailed explanation of feature three." }
    ],
    carouselImages: []},
  // ─── FIELDEN ───
  { brandSlug: "fielden", variant: "Rye Whisky",
    intro: "A fruity, herbal Rye Whisky with the typical spiced finish. Made with diverse grain, in healthier soils with deeper roots, resulting in a fuller flavour.",
    features: ["Diverse Rye Grains", "No Chemical Farming", "25% Light Dessert Wine Matured"],
    tasteProfile: ["Caramel, hazelnut, and freshly baked bread", "Wild berry notes with peppercorn spice finish"], abv: "48% ABV",
    serves: [
      { name: "Boulevardier", ingredients: ["40ml Fielden Rye Whisky", "20ml Campari", "20ml Sweet Vermouth", "Orange Peel garnish"] },
      { name: "Whisky & Soda", ingredients: ["30ml Fielden Rye Whisky", "Soda top"] },
    ],
    tasteProfileRadar: { sweet: 3, fruity: 3, fresh: 3, savoury: 2, herbal: 2, spicy: 2, floral: 3 },
    productFeatures: [
      { title: "Feature One", description: "Detailed explanation of feature one and why it matters to the customer." },
      { title: "Feature Two", description: "Detailed explanation of feature two." },
      { title: "Feature Three", description: "Detailed explanation of feature three." }
    ],
    carouselImages: []},
  // ─── DROPWORKS ───
  { brandSlug: "dropworks", variant: "Clear Drop",
    intro: "Crystal-clear, copper-pot distilled white rum with a smooth, fruity profile.",
    features: ["Wild Trinity Yeast", "Distilled in Britain", "Zero Added Sugar"],
    tasteProfile: ["Velvety texture with fresh orchard fruit", "Subtle tropical sweetness"], abv: "40% ABV",
    serves: [
      { name: "Clear & Cloudy", ingredients: ["50ml Clear Drop", "75ml Apple Juice", "Elderflower Tonic top", "Apple garnish"] },
      { name: "Grapefruit Daiquiri", ingredients: ["50ml Clear Drop", "35ml Grapefruit", "15ml Lime", "10ml Maraschino", "5ml Sugar"] },
    ],
    tasteProfileRadar: { sweet: 3, fruity: 3, fresh: 3, savoury: 2, herbal: 2, spicy: 2, floral: 3 },
    productFeatures: [
      { title: "Feature One", description: "Detailed explanation of feature one and why it matters to the customer." },
      { title: "Feature Two", description: "Detailed explanation of feature two." },
      { title: "Feature Three", description: "Detailed explanation of feature three." }
    ],
    carouselImages: []},
  { brandSlug: "dropworks", variant: "Spice Drop",
    intro: "Spiced rum with no added spices; flavours created entirely through traditional rum-making and maturation.",
    features: ["Wild Trinity Yeast", "Flash Aged with Wood Chips", "Distilled in Britain"],
    tasteProfile: ["Naturally sweet spice and baked fruit", "Rounded, warming finish"], abv: "40% ABV",
    serves: [
      { name: "Spice Rum & Ginger", ingredients: ["50ml Spice Drop", "Ginger Ale top", "Lime wedge garnish"] },
      { name: "Spiced British Mojito", ingredients: ["50ml Spice Drop", "25ml Apple Juice", "25ml Lime", "Fresh Mint", "Ginger Beer top"] },
    ],
    tasteProfileRadar: { sweet: 3, fruity: 3, fresh: 3, savoury: 2, herbal: 2, spicy: 2, floral: 3 },
    productFeatures: [
      { title: "Feature One", description: "Detailed explanation of feature one and why it matters to the customer." },
      { title: "Feature Two", description: "Detailed explanation of feature two." },
      { title: "Feature Three", description: "Detailed explanation of feature three." }
    ],
    carouselImages: []},
  { brandSlug: "dropworks", variant: "Barrel Drop",
    intro: "British cask-matured rum aged in hand-selected oak to layer in rich spice and dried fruit complexity.",
    features: ["Wild Trinity Yeast", "Distilled in Britain", "American & Portuguese Oak"],
    tasteProfile: ["Smooth, buttery, and naturally sweet", "Hints of citrus and soft vanilla"], abv: "40% ABV",
    serves: [
      { name: "Rum & Fig Old Fashioned", ingredients: ["50ml Barrel Drop", "10ml Fig & Honey Syrup", "2 Dash Walnut Bitters", "Fig garnish"] },
      { name: "English Espresso Rumtini", ingredients: ["50ml Barrel Drop", "20ml Coffee Liqueur", "50ml Espresso", "10ml Sugar Syrup"] },
    ],
    tasteProfileRadar: { sweet: 3, fruity: 3, fresh: 3, savoury: 2, herbal: 2, spicy: 2, floral: 3 },
    productFeatures: [
      { title: "Feature One", description: "Detailed explanation of feature one and why it matters to the customer." },
      { title: "Feature Two", description: "Detailed explanation of feature two." },
      { title: "Feature Three", description: "Detailed explanation of feature three." }
    ],
    carouselImages: []},
  { brandSlug: "dropworks", variant: "Dark Drop",
    intro: "A rich, full-bodied dark rum with deep molasses sweetness and spice.",
    features: ["Wild Trinity Yeast", "Twice Pot Distilled", "Distilled in Britain"],
    tasteProfile: ["Toffee, treacle, and warming spice", "Smooth yet robust"], abv: "40% ABV",
    serves: [
      { name: "Dark Bramble", ingredients: ["50ml Dark Drop", "10ml Crème de Mure", "15ml Lemon Juice", "10ml Sugar Syrup", "Crushed Ice"] },
      { name: "Dark & Stormy", ingredients: ["50ml Dark Drop", "15ml Lime Juice", "3 dash Angostura Bitters", "Ginger Beer top"] },
    ],
    tasteProfileRadar: { sweet: 3, fruity: 3, fresh: 3, savoury: 2, herbal: 2, spicy: 2, floral: 3 },
    productFeatures: [
      { title: "Feature One", description: "Detailed explanation of feature one and why it matters to the customer." },
      { title: "Feature Two", description: "Detailed explanation of feature two." },
      { title: "Feature Three", description: "Detailed explanation of feature three." }
    ],
    carouselImages: []},
  { brandSlug: "dropworks", variant: "Funk Drop",
    intro: "High-ester, overproof rum, bringing bold tropical funk without harsh burn.",
    features: ["Wild Trinity Yeast", "30 Day Fermentation", "Distilled in Britain"],
    tasteProfile: ["Explosive tropical fruit aroma", "Creamy coconut and rich molasses"], abv: "63% ABV",
    serves: [
      { name: "Nuclear Daiquiri", ingredients: ["25ml Funk Drop", "25ml Clear Drop", "15ml Crème de Banane", "20ml Lime Juice", "10ml Sugar Syrup"] },
      { name: "Overproof Negroni", ingredients: ["25ml Funk Drop", "25ml Campari", "25ml Sweet Red Vermouth"] },
    ],
    tasteProfileRadar: { sweet: 3, fruity: 3, fresh: 3, savoury: 2, herbal: 2, spicy: 2, floral: 3 },
    productFeatures: [
      { title: "Feature One", description: "Detailed explanation of feature one and why it matters to the customer." },
      { title: "Feature Two", description: "Detailed explanation of feature two." },
      { title: "Feature Three", description: "Detailed explanation of feature three." }
    ],
    carouselImages: []},
  // ─── EVERLEAF ───
  { brandSlug: "everleaf", variant: "Forest",
    intro: "A blend of exotic saffron, Madagascan vanilla, and honeyed orange blossom to evoke the dappled warmth of the forest floor.",
    features: ["Saffron", "Madagascan Vanilla", "Orange Blossom"],
    tasteProfile: ["Warming vanilla, cassia, gentian root", "Bittersweet earthy finish from orris root"], abv: "0.0% ABV",
    serves: [
      { name: "Orange & Vanilla Spritz", ingredients: ["50ml Everleaf Forest", "Light Tonic top", "Orange wedge garnish"] },
      { name: "Orange Blossom Daiquiri", ingredients: ["60ml Everleaf Forest", "20ml Lime Juice", "15ml Honey", "Lime/Orange wedge garnish"] },
    ],
    tasteProfileRadar: { sweet: 3, fruity: 3, fresh: 3, savoury: 2, herbal: 2, spicy: 2, floral: 3 },
    productFeatures: [
      { title: "Feature One", description: "Detailed explanation of feature one and why it matters to the customer." },
      { title: "Feature Two", description: "Detailed explanation of feature two." },
      { title: "Feature Three", description: "Detailed explanation of feature three." }
    ],
    carouselImages: []},
  { brandSlug: "everleaf", variant: "Marine",
    intro: "A coastal-inspired aperitif with zesty bergamot, tangy sea buckthorn, and umami kelp for a bright, saline freshness.",
    features: ["Kelp", "Sea Buckthorn", "Bergamot"],
    tasteProfile: ["Refreshing sea air, eucalyptus, kelp", "Zesty bergamot citrus"], abv: "0.0% ABV",
    serves: [
      { name: "Bergamot Coastal Spritz", ingredients: ["50ml Everleaf Marine", "Light Tonic top", "Lime/Cucumber garnish"] },
      { name: "Bergamot Margarita", ingredients: ["60ml Everleaf Marine", "20ml Lime Juice", "15ml Agave Syrup", "Salt/Lime garnish"] },
    ],
    tasteProfileRadar: { sweet: 3, fruity: 3, fresh: 3, savoury: 2, herbal: 2, spicy: 2, floral: 3 },
    productFeatures: [
      { title: "Feature One", description: "Detailed explanation of feature one and why it matters to the customer." },
      { title: "Feature Two", description: "Detailed explanation of feature two." },
      { title: "Feature Three", description: "Detailed explanation of feature three." }
    ],
    carouselImages: []},
  { brandSlug: "everleaf", variant: "Mountain",
    intro: "Floral and aromatic, capturing mountain cherry blossom, sweet strawberry, and bittersweet rosehip.",
    features: ["Cherry Blossom", "Wild Strawberry", "Rosehip"],
    tasteProfile: ["Almondy cherry blossom, sweet strawberry", "Tart rosehip and herbal wormwood lift"], abv: "0.0% ABV",
    serves: [
      { name: "Strawberry & Cherry Blossom Spritz", ingredients: ["50ml Everleaf Mountain", "Light Tonic top", "Strawberry/Lemon garnish"] },
      { name: "Cherry Clover", ingredients: ["60ml Everleaf Mountain", "25ml Lemon Juice", "25ml Sugar Syrup", "Raspberries", "Egg White/Vegan Foamer"] },
    ],
    tasteProfileRadar: { sweet: 3, fruity: 3, fresh: 3, savoury: 2, herbal: 2, spicy: 2, floral: 3 },
    productFeatures: [
      { title: "Feature One", description: "Detailed explanation of feature one and why it matters to the customer." },
      { title: "Feature Two", description: "Detailed explanation of feature two." },
      { title: "Feature Three", description: "Detailed explanation of feature three." }
    ],
    carouselImages: []},
  // ─── DESDEYA ───
  { brandSlug: "desdeya", variant: "Tequila Blanco Desdeya Uno",
    intro: "Additive-free, 100% Altos agave. Fermented with a red wine yeast from Burgundy.",
    features: ["Burgundy Wine Yeast", "100% Altos Agave", "Bottled at 42%"],
    tasteProfile: ["Slow roasted agave honey, creamy cashew", "Full bodied with a long finish"], abv: "42% ABV",
    serves: [
      { name: "Tequila Soda", ingredients: ["50ml Tequila Blanco", "Soda top", "Lime Wedge garnish"] },
      { name: "Tequila Martini", ingredients: ["60ml Tequila Blanco", "10ml White Vermouth", "2 Dash Orange Bitters", "Olive garnish"] },
    ],
    tasteProfileRadar: { sweet: 3, fruity: 3, fresh: 3, savoury: 2, herbal: 2, spicy: 2, floral: 3 },
    productFeatures: [
      { title: "Feature One", description: "Detailed explanation of feature one and why it matters to the customer." },
      { title: "Feature Two", description: "Detailed explanation of feature two." },
      { title: "Feature Three", description: "Detailed explanation of feature three." }
    ],
    carouselImages: []},
  // ─── PENSADOR ───
  { brandSlug: "pensador", variant: "Ensamble",
    intro: "A traditional mezcal blend of espadín and madrecuishe agave, offering layered complexity and natural wine-like funk.",
    features: ["Ground Oven Roast", "Tahona Crushed", "Natural Fermentation"],
    tasteProfile: ["Leather, sandalwood, ripe tropical fruit", "Creamy oak sweetness with light smoke"], abv: "48% ABV",
    serves: [
      { name: "Mezcal Paloma", ingredients: ["50ml Pensador Ensamble", "25ml Fresh Grapefruit", "100ml Pink Grapefruit Soda", "Grapefruit Slice & Rosemary"] },
      { name: "Mezcal Old Fashioned", ingredients: ["60ml Pensador Ensamble", "10ml Agave", "4 dashes Peychaud's Bitters", "Grapefruit zest garnish"] },
    ],
    tasteProfileRadar: { sweet: 3, fruity: 3, fresh: 3, savoury: 2, herbal: 2, spicy: 2, floral: 3 },
    productFeatures: [
      { title: "Feature One", description: "Detailed explanation of feature one and why it matters to the customer." },
      { title: "Feature Two", description: "Detailed explanation of feature two." },
      { title: "Feature Three", description: "Detailed explanation of feature three." }
    ],
    carouselImages: []},
  { brandSlug: "pensador", variant: "Espadin",
    intro: "Artisanal mezcal from Miahuatlán, made from 100% Espadín agave, roasted underground, fermented naturally, and double distilled.",
    features: ["Ground Oven Roast", "2x Copper Distilled", "Natural Fermentation"],
    tasteProfile: ["BBQ roasted corn, peppery, and lightly smoked", "Ancho chillies, tobacco, rosemary"], abv: "48% ABV",
    serves: [
      { name: "Tommy's Margarita", ingredients: ["50ml Pensador Espadin", "20ml Lime Juice", "12.5ml Honey", "Orange twist garnish"] },
      { name: "Mezcal Negroni", ingredients: ["30ml Pensador Espadin", "20ml Campari", "20ml Sweet Red Vermouth", "Orange twist garnish"] },
    ],
    tasteProfileRadar: { sweet: 3, fruity: 3, fresh: 3, savoury: 2, herbal: 2, spicy: 2, floral: 3 },
    productFeatures: [
      { title: "Feature One", description: "Detailed explanation of feature one and why it matters to the customer." },
      { title: "Feature Two", description: "Detailed explanation of feature two." },
      { title: "Feature Three", description: "Detailed explanation of feature three." }
    ],
    carouselImages: []},
  // ─── MIRABEAU ───
  { brandSlug: "mirabeau", variant: "Dry Rosé Gin",
    intro: "Pale pink gin inspired by Provence's wild botanicals and perfumery heritage, distilled from wine spirit.",
    features: ["100% Grape Spirit", "Made in France", "Copper Pot Distilled"],
    tasteProfile: ["Fragrant citrus and floral bouquet", "Balanced juniper backbone, herbal depth"], abv: "43% ABV",
    serves: [
      { name: "Riviera Spritz", ingredients: ["35ml Mirabeau Dry Rosé Gin", "25ml Pink Grapefruit Juice", "20ml Pink Peppercorn Syrup", "Soda top", "Grapefruit wedge garnish"] },
      { name: "Rosé Negroni", ingredients: ["25ml Mirabeau Dry Rosé Gin", "25ml Lilet Rosé Vermouth", "25ml Aperol", "Grapefruit wedge garnish"] },
    ],
    tasteProfileRadar: { sweet: 3, fruity: 3, fresh: 3, savoury: 2, herbal: 2, spicy: 2, floral: 3 },
    productFeatures: [
      { title: "Feature One", description: "Detailed explanation of feature one and why it matters to the customer." },
      { title: "Feature Two", description: "Detailed explanation of feature two." },
      { title: "Feature Three", description: "Detailed explanation of feature three." }
    ],
    carouselImages: []},
  { brandSlug: "mirabeau", variant: "Pure | Côtes de Provence",
    intro: "Very pale pink in colour, with peachy reflections. Bright and mouth-watering with a lasting, mineral finish. A superbly crafted and seductive rosé for a myriad of occasions.",
    features: ["Night Harvest", "South Sainte-Victoire", "Limestone, Clay, Sand"],
    tasteProfile: ["Light notes of vineyard peaches, clementine zest and woody Provençal herbs", "Varietals: 58% Grenache, 18% Syrah, 16% Cinsault, 8% Rolle, Carignan, Cabernet Sauvignon, Mourvèdre"], abv: "12.8% ABV",
    pairings: [
      { category: "Seafood", detail: "Esp. Grilled John Dory; fresh sushi and sashimi" },
      { category: "Vegetarian Dishes", detail: "Esp. Marinated tofu; chopped vegetable salad" },
      { category: "Desserts", detail: "Esp. Matcha ice cream; apple tarte" },
    ],
    tasteProfileRadar: { sweet: 3, fruity: 3, fresh: 3, savoury: 2, herbal: 2, spicy: 2, floral: 3 },
    productFeatures: [
      { title: "Feature One", description: "Detailed explanation of feature one and why it matters to the customer." },
      { title: "Feature Two", description: "Detailed explanation of feature two." },
      { title: "Feature Three", description: "Detailed explanation of feature three." }
    ],
    carouselImages: []},
  { brandSlug: "mirabeau", variant: "Étoile | Côtes de Provence",
    intro: "A pale rosé with peach reflections. Elegant on the nose, playful complexity with a lovely layered structure. Powerful but refined, a wine to savour and a perfect partner to more sophisticated food.",
    features: ["Maures & Sainte-Baume Foothills", "Red Clay & Sand", "Night Harvest"],
    tasteProfile: ["Mineral-accented, fresh pear, candied ginger, apricots & peach", "Varietals: 57% Grenache, 22% Cinsault, 21% Mourvèdre, Syrah, Carignan, Tibouren"], abv: "13% ABV",
    pairings: [
      { category: "Seafood", detail: "Esp. Langoustine salad; gratinéed oysters" },
      { category: "Vegetarian Dishes", detail: "Esp. White truffle risotto; spinach and Parmesan salad" },
      { category: "Desserts", detail: "Esp. Chestnut Mont Blanc cake; creamy cheeses" },
    ],
    tasteProfileRadar: { sweet: 3, fruity: 3, fresh: 3, savoury: 2, herbal: 2, spicy: 2, floral: 3 },
    productFeatures: [
      { title: "Feature One", description: "Detailed explanation of feature one and why it matters to the customer." },
      { title: "Feature Two", description: "Detailed explanation of feature two." },
      { title: "Feature Three", description: "Detailed explanation of feature three." }
    ],
    carouselImages: []},
  { brandSlug: "mirabeau", variant: "Classic | Côtes de Provence",
    intro: "A salmon-pink rosé made with night-harvested grapes from some of the best growing areas of Provence, blended to give a lively fruit expression with a beautifully crisp finish.",
    features: ["Night Harvest", "Var & Sainte-Victoire", "Limestone, Clay, Sand"],
    tasteProfile: ["Red berries and aromatic notes of black pepper", "Varietals: 44% Grenache, 27% Cinsault, 17% Syrah, 7% Carignan, 5% Cabernet Sauvignon, Rolle, Ugni Blanc"], abv: "12.6% ABV",
    pairings: [
      { category: "Meat", detail: "Esp. Chicken tagine; charcuterie" },
      { category: "Vegetarian Dishes", detail: "Esp. Tomato and aubergine tart; aromatic dishes" },
      { category: "Desserts", detail: "Fruit-based baked desserts" },
    ],
    tasteProfileRadar: { sweet: 3, fruity: 3, fresh: 3, savoury: 2, herbal: 2, spicy: 2, floral: 3 },
    productFeatures: [
      { title: "Feature One", description: "Detailed explanation of feature one and why it matters to the customer." },
      { title: "Feature Two", description: "Detailed explanation of feature two." },
      { title: "Feature Three", description: "Detailed explanation of feature three." }
    ],
    carouselImages: []},
  { brandSlug: "mirabeau", variant: "One Day | Côtes de Provence",
    intro: "A pale pink rosé with a fine nose of small berries, red and blackcurrant, notes of fresh mint and clementine. The palate is elegant, with more juicy red fruits and flavours of pomegranate.",
    features: ["Certified Organic", "100% Regenerative", "Red Clay & Sand"],
    tasteProfile: ["Red berries and aromatic notes of black pepper", "Varietals: 51% Grenache, 22% Cinsault, 10% Mourvèdre, 6% Syrah, 6% Caladoc, 5% Carignan"], abv: "12.6% ABV",
    pairings: [
      { category: "Seafood", detail: "Esp. Roasted Sea Bass, Clam Linguine" },
      { category: "Meat", detail: "Esp. Thai Beef Salad, Spicy Asian Cuisine" },
      { category: "Desserts", detail: "Esp. Raspberry or Cherry Pannacotta" },
    ],
    tasteProfileRadar: { sweet: 3, fruity: 3, fresh: 3, savoury: 2, herbal: 2, spicy: 2, floral: 3 },
    productFeatures: [
      { title: "Feature One", description: "Detailed explanation of feature one and why it matters to the customer." },
      { title: "Feature Two", description: "Detailed explanation of feature two." },
      { title: "Feature Three", description: "Detailed explanation of feature three." }
    ],
    carouselImages: []},
  // ─── CRAGGY RANGE ───
  { brandSlug: "craggy-range", variant: "Sauvignon Blanc | Te Muna, Martinborough",
    intro: "Fermented in 97% stainless steel and 3% new French oak — retaining the steeliness and purity of the fruit but with a rounded, rich and complex finish. Widely regarded as New Zealand's finest Sauvignon Blanc.",
    features: ["Te Muna Valley", "Cool Climate", "Ancient Alluvial Soils"],
    tasteProfile: ["Notes of kaffir lime leaf, citrus and white flowers, and a fresh minerality that showcases the cool climate of Martinborough", "Varietals: 100% Sauvignon Blanc"], abv: "13% ABV",
    pairings: [
      { category: "Seafood", detail: "Esp. Fresh oysters; shellfish; grilled white fish" },
      { category: "Cuisine", detail: "Esp. Asian cuisine; aromatic dishes" },
      { category: "Desserts", detail: "Esp. Goat cheese" },
    ],
    tasteProfileRadar: { sweet: 3, fruity: 3, fresh: 3, savoury: 2, herbal: 2, spicy: 2, floral: 3 },
    productFeatures: [
      { title: "Feature One", description: "Detailed explanation of feature one and why it matters to the customer." },
      { title: "Feature Two", description: "Detailed explanation of feature two." },
      { title: "Feature Three", description: "Detailed explanation of feature three." }
    ],
    carouselImages: []},
  { brandSlug: "craggy-range", variant: "Chardonnay | Kidnappers, Hawke's Bay",
    intro: "A stunning reflection of the cool coastal climate of Hawke's Bay. Fermented in stainless steel and French oak, this Chardonnay is a vibrant and beautifully balanced expression of the region.",
    features: ["Hawke's Bay", "Coastal Influence", "French Chablis-Style Oak"],
    tasteProfile: ["Notes of oyster shell, sea spray, lemon curd, and almond, with lively acidity, subtle oak, and a clean fresh finish", "Varietals: 100% Chardonnay"], abv: "13% ABV",
    pairings: [
      { category: "Seafood", detail: "Esp. Grilled lobster; oysters" },
      { category: "Pasta Dishes", detail: "Esp. Creamy chicken; mushroom and truffle" },
      { category: "Vegetarian", detail: "Esp. Fresh summer salads; fresh garden herbs" },
    ],
    tasteProfileRadar: { sweet: 3, fruity: 3, fresh: 3, savoury: 2, herbal: 2, spicy: 2, floral: 3 },
    productFeatures: [
      { title: "Feature One", description: "Detailed explanation of feature one and why it matters to the customer." },
      { title: "Feature Two", description: "Detailed explanation of feature two." },
      { title: "Feature Three", description: "Detailed explanation of feature three." }
    ],
    carouselImages: []},
  { brandSlug: "craggy-range", variant: "Pinot Noir | Te Muna Road, Martinborough",
    intro: "The higher terrace of the Te Muna Road vineyard comprises of old, stony clay-infused soils that are perfect for producing aromatic, elegant, Burgundy-esque Pinot Noir.",
    features: ["Te Muna Road", "Cool Climate", "Stony Clay-Infused Soils"],
    tasteProfile: ["Notes of sweet spice, lavender, jasmine, cherry and raspberry with silky tannins and a long moreish finish", "Varietals: 100% Pinot Noir"], abv: "14% ABV",
    pairings: [
      { category: "Meat", detail: "Esp. Duck; spring lamb" },
      { category: "Fish", detail: "Esp. Grilled salmon" },
      { category: "Vegetarian", detail: "Esp. Mushroom risotto" },
    ],
    tasteProfileRadar: { sweet: 3, fruity: 3, fresh: 3, savoury: 2, herbal: 2, spicy: 2, floral: 3 },
    productFeatures: [
      { title: "Feature One", description: "Detailed explanation of feature one and why it matters to the customer." },
      { title: "Feature Two", description: "Detailed explanation of feature two." },
      { title: "Feature Three", description: "Detailed explanation of feature three." }
    ],
    carouselImages: []},
  // ─── COATES & SEELY ───
  { brandSlug: "coates-and-seely", variant: "Brut NV",
    intro: "Champagne varietals grown on English chalk soils and clay caps. Estate-grown grapes are hand-harvested and vinified in stainless steel and concrete amphorae to preserve fruit purity and encourage gentle micro-oxygenation for depth and complexity.",
    features: ["Chalk Soils", "24-36m Lees-Aged", "6-12m Bottle-Aged"],
    tasteProfile: ["Notes of apple, lemon curd, melon, brioche, biscuit", "Varietals: 40% Chardonnay, 50% Pinot Noir, 10% Pinot Meunier"], abv: "12% ABV",
    listings: ["Buckingham Palace", "Hampton Court", "Banqueting House"],
    tasteProfileRadar: { sweet: 3, fruity: 3, fresh: 3, savoury: 2, herbal: 2, spicy: 2, floral: 3 },
    productFeatures: [
      { title: "Feature One", description: "Detailed explanation of feature one and why it matters to the customer." },
      { title: "Feature Two", description: "Detailed explanation of feature two." },
      { title: "Feature Three", description: "Detailed explanation of feature three." }
    ],
    carouselImages: []},
  { brandSlug: "coates-and-seely", variant: "Rosé NV",
    intro: "Champagne varietals grown on English chalk soils and clay caps. Estate-grown grapes are hand-harvested and vinified in stainless steel and concrete amphorae to preserve fruit purity and encourage gentle micro-oxygenation for depth and complexity.",
    features: ["Chalk Soils", "24-36m Lees-Aged", "6-12m Bottle-Aged"],
    tasteProfile: ["Notes of strawberry, raspberry, peach and brioche", "Varietals: 80% Pinot Noir, 20% Pinot Meunier"], abv: "11.5% ABV",
    listings: ["Kensington Palace", "Royal Academy", "Tower of London"],
    tasteProfileRadar: { sweet: 3, fruity: 3, fresh: 3, savoury: 2, herbal: 2, spicy: 2, floral: 3 },
    productFeatures: [
      { title: "Feature One", description: "Detailed explanation of feature one and why it matters to the customer." },
      { title: "Feature Two", description: "Detailed explanation of feature two." },
      { title: "Feature Three", description: "Detailed explanation of feature three." }
    ],
    carouselImages: []},
  // ─── QUINTA DA ROMANEIRA ───
  { brandSlug: "quinta-da-romaneira", variant: "Reserva Vinho Branco | Douro DOC",
    intro: "This blend presents itself with a translucent pale golden colour. The aroma is striking, with an invigorating potency, accompanied by a refreshing acidity and a lingering finish.",
    features: ["Douro DOC", "91 Wine Enthusiast", "French Oak Barrels"],
    tasteProfile: ["Subtly mineral, and bursting with fruit, delicate floral notes, and nuanced hints of oak", "Varietals: Viosinho, Gouveio, Rabigato, Boal"], abv: "13% ABV",
    pairings: [
      { category: "Seafood", detail: "Grilled white fish; shellfish" },
      { category: "Meat", detail: "Lemon chicken; Mediterranean marinated poultry" },
    ],
    tasteProfileRadar: { sweet: 3, fruity: 3, fresh: 3, savoury: 2, herbal: 2, spicy: 2, floral: 3 },
    productFeatures: [
      { title: "Feature One", description: "Detailed explanation of feature one and why it matters to the customer." },
      { title: "Feature Two", description: "Detailed explanation of feature two." },
      { title: "Feature Three", description: "Detailed explanation of feature three." }
    ],
    carouselImages: []},
  { brandSlug: "quinta-da-romaneira", variant: "Três Parcelas | Douro DOC",
    intro: "100% Touriga Nacional varietal wine, uniquely sourced from three distinct terroirs contributing valuable character to this expressive wine.",
    features: ["Douro DOC", "93 Wine Enthusiast", "Blend from 3 Sites"],
    tasteProfile: ["Notes of wild berries, violets, chocolate, and pepper, supported by a firm tannic backbone and a rounded, rich, and intense finish", "Varietals: 100% Touriga Nacional"], abv: "13% ABV",
    listings: ["Apontador — South/Southwest, Altitude: 253-303m", "Tomba Chapeus — South/Southeast/Southwest, Altitude: 155-241m", "Mina — South/Southwest, Altitude: 185-222m"],
    tasteProfileRadar: { sweet: 3, fruity: 3, fresh: 3, savoury: 2, herbal: 2, spicy: 2, floral: 3 },
    productFeatures: [
      { title: "Feature One", description: "Detailed explanation of feature one and why it matters to the customer." },
      { title: "Feature Two", description: "Detailed explanation of feature two." },
      { title: "Feature Three", description: "Detailed explanation of feature three." }
    ],
    carouselImages: []},
  { brandSlug: "quinta-da-romaneira", variant: "Sino da Romaneira | Douro DOC",
    intro: "Fresh, elegant and balanced. The grapes are fermented in stainless steel where Malolactic Fermentation occurs, before being aged in French Oak for 10 months.",
    features: ["Douro DOC", "93 Wine Enthusiast", "Aged 10m Oak Barrels"],
    tasteProfile: ["Rich and rounded, with soft delicate tannins and silky black fruit — an exceptional value wine", "Varietals: 30% Touriga Franca, 10% Touriga Nacional, 50% Tinta Roriz, 10% Tinto Cão"], abv: "13% ABV",
    tasteProfileRadar: { sweet: 3, fruity: 3, fresh: 3, savoury: 2, herbal: 2, spicy: 2, floral: 3 },
    productFeatures: [
      { title: "Feature One", description: "Detailed explanation of feature one and why it matters to the customer." },
      { title: "Feature Two", description: "Detailed explanation of feature two." },
      { title: "Feature Three", description: "Detailed explanation of feature three." }
    ],
    carouselImages: []},
  // ─── DREAMSAKE ───
  { brandSlug: "dreamsake", variant: "Daiginjo No.1",
    intro: "Crafted with only clean, all natural ingredients, with zero sulfites or preservatives. An exceptionally smooth, high umami sake with low acidity.",
    features: ["Yamada Nishiki Rice", "Miyamizu Water", "All Natural, Nothing Added"],
    tasteProfile: ["Notes of honeydew melon and pear", "Velvet smooth with low acidity"], abv: "15.5% ABV",
    serves: [
      { name: "Dreamsake Highball", ingredients: ["40ml Daiginjo No.1", "20ml Elderflower Liqueur", "Soda top"] },
      { name: "Peach & Dreams", ingredients: ["50ml Daiginjo No.1", "20ml Peach Liqueur", "10ml Fino Sherry", "Peach garnish"] },
    ],
    tasteProfileRadar: { sweet: 3, fruity: 3, fresh: 3, savoury: 2, herbal: 2, spicy: 2, floral: 3 },
    productFeatures: [
      { title: "Feature One", description: "Detailed explanation of feature one and why it matters to the customer." },
      { title: "Feature Two", description: "Detailed explanation of feature two." },
      { title: "Feature Three", description: "Detailed explanation of feature three." }
    ],
    carouselImages: []},
  // ─── WILD IDOL ───
  { brandSlug: "wild-idol", variant: "Brut",
    intro: "A pure expression of Müller-Thurgau, with grapes harvested and chilled for up to 12 months to prevent fermentation. The juice is then blended with rectified grape must to enhance complexity, body, and balance, and gently carbonated for a velvety mousse.",
    features: ["Naturally Alcohol Free", "Gluten Free & Vegan"],
    tasteProfile: ["Green apple, white peach, and honeyed melon", "Varietals: Müller-Thurgau"], abv: "0.0% ABV",
    serves: [
      { name: "Orange Bellini", ingredients: ["50ml Everleaf Forest", "Wild Idol Brut top", "Orange spiral garnish"] },
      { name: "Mango Highball", ingredients: ["50ml Everleaf Forest", "25ml Mango Syrup", "Wild Idol Brut top"] },
    ],
    tasteProfileRadar: { sweet: 3, fruity: 3, fresh: 3, savoury: 2, herbal: 2, spicy: 2, floral: 3 },
    productFeatures: [
      { title: "Feature One", description: "Detailed explanation of feature one and why it matters to the customer." },
      { title: "Feature Two", description: "Detailed explanation of feature two." },
      { title: "Feature Three", description: "Detailed explanation of feature three." }
    ],
    carouselImages: []},
  { brandSlug: "wild-idol", variant: "Rosé",
    intro: "A pure expression of Merlot and Müller-Thurgau, with grapes harvested and chilled for up to 12 months to prevent fermentation. The juice is then blended with rectified grape must to enhance complexity, body, and balance, and gently carbonated for a velvety mousse.",
    features: ["Naturally Alcohol Free", "Gluten Free & Vegan"],
    tasteProfile: ["Grapefruit, citrus, apple and gooseberry", "Varietals: Merlot, Müller-Thurgau"], abv: "0.0% ABV",
    serves: [
      { name: "Raspberry Bellini", ingredients: ["50ml Everleaf Mountain", "Wild Idol Rosé top", "Raspberry garnish"] },
      { name: "Rose Hugo Spritz", ingredients: ["25ml Rose Syrup", "Wild Idol Rosé top", "Lemon wedge garnish"] },
    ],
    tasteProfileRadar: { sweet: 3, fruity: 3, fresh: 3, savoury: 2, herbal: 2, spicy: 2, floral: 3 },
    productFeatures: [
      { title: "Feature One", description: "Detailed explanation of feature one and why it matters to the customer." },
      { title: "Feature Two", description: "Detailed explanation of feature two." },
      { title: "Feature Three", description: "Detailed explanation of feature three." }
    ],
    carouselImages: []},
  // ─── NOAM ───
  { brandSlug: "noam", variant: "NOAM Lager",
    intro: "Unfiltered Bavarian Helles lager brewed in Bavaria adhering to the stringent German Purity Laws. A balanced blend of traditional and rare hops. Additive-free. Vegan.",
    features: ["Bavarian Barley Malt", "Hallertauer Tradition & Smaragd", "Made in Germany", "Unfiltered"],
    tasteProfile: ["Soft bready, slightly malty texture and mild bitterness", "Crisp and smooth, with subtle floral and savoury hop notes"], abv: "5.2% ABV",
    tasteProfileRadar: { sweet: 3, fruity: 3, fresh: 3, savoury: 2, herbal: 2, spicy: 2, floral: 3 },
    productFeatures: [
      { title: "Feature One", description: "Detailed explanation of feature one and why it matters to the customer." },
      { title: "Feature Two", description: "Detailed explanation of feature two." },
      { title: "Feature Three", description: "Detailed explanation of feature three." }
    ],
    carouselImages: []},
  // ─── CÔTE CITRON ───
  { brandSlug: "cote-citron", variant: "Côte Citron",
    intro: "Côte Citron is a lemon Radler crafted by an independent brewery, and made from a proper crisp lager and real Menton lemons from the Côte d'Azur.",
    features: ["Menton Lemons", "Mid-Strength ABV", "Aromatic & Mineral"],
    tasteProfile: ["Refreshing and zesty Radler", "Bittersweet quality with an aromatic nose"], abv: "3.4% ABV",
    tasteProfileRadar: { sweet: 3, fruity: 3, fresh: 3, savoury: 2, herbal: 2, spicy: 2, floral: 3 },
    productFeatures: [
      { title: "Feature One", description: "Detailed explanation of feature one and why it matters to the customer." },
      { title: "Feature Two", description: "Detailed explanation of feature two." },
      { title: "Feature Three", description: "Detailed explanation of feature three." }
    ],
    carouselImages: []},
  // ─── WIGNAC ───
  { brandSlug: "wignac", variant: "Organic Cidre",
    intro: "Organic French cider made with 100% pure apple juice from organic apples grown in the Ardennes region of Northern France. Nothing added.",
    features: ["100% Organic", "65% Cider Apples", "35% Sweet Apples", "Made in France"],
    tasteProfile: ["Softly effervescent with crisp apple freshness", "Gentle sweetness balanced by soft tannins"], abv: "4.5% VOL",
    tasteProfileRadar: { sweet: 3, fruity: 3, fresh: 3, savoury: 2, herbal: 2, spicy: 2, floral: 3 },
    productFeatures: [
      { title: "Feature One", description: "Detailed explanation of feature one and why it matters to the customer." },
      { title: "Feature Two", description: "Detailed explanation of feature two." },
      { title: "Feature Three", description: "Detailed explanation of feature three." }
    ],
    carouselImages: []},
  { brandSlug: "wignac", variant: "Organic Rosé Cidre",
    intro: "Organic French rosé cider made from a subtle blend of organic apple cider and grape juice. No added sugar, colouring, or sulphites.",
    features: ["100% Organic", "59% Cider Apples", "29% Sweet Apples", "12% Pinot Noir Grape Juice"],
    tasteProfile: ["Softly effervescent with notes of red fruits", "Smooth sweetness from apple and grape blend"], abv: "4.5% VOL",
    tasteProfileRadar: { sweet: 3, fruity: 3, fresh: 3, savoury: 2, herbal: 2, spicy: 2, floral: 3 },
    productFeatures: [
      { title: "Feature One", description: "Detailed explanation of feature one and why it matters to the customer." },
      { title: "Feature Two", description: "Detailed explanation of feature two." },
      { title: "Feature Three", description: "Detailed explanation of feature three." }
    ],
    carouselImages: []},
  { brandSlug: "wignac", variant: "Organic Cidre 0.0",
    intro: "Organic French 0.0 cider made with 100% pure apple juice from organic apples grown in the Ardennes region of Northern France. Nothing added.",
    features: ["100% Organic", "65% Cider Apples", "35% Sweet Apples", "Made in France"],
    tasteProfile: ["Fresh and naturally sweet apple flavour", "Softly effervescent, crisp and juicy"], abv: "0.0% VOL",
    tasteProfileRadar: { sweet: 3, fruity: 3, fresh: 3, savoury: 2, herbal: 2, spicy: 2, floral: 3 },
    productFeatures: [
      { title: "Feature One", description: "Detailed explanation of feature one and why it matters to the customer." },
      { title: "Feature Two", description: "Detailed explanation of feature two." },
      { title: "Feature Three", description: "Detailed explanation of feature three." }
    ],
    carouselImages: []},
  // ─── BIG DROP ───
  { brandSlug: "big-drop", variant: "Pine Trail Pale Ale",
    intro: "Alcohol-free Pale Ale. A delight for the senses, this beer delivers on all levels. Rosy floral aromas are immediate as you pour, with a light and limey citrus bite on the palate and a balanced but obvious bitterness to finish.",
    features: ["Gluten-Free", "Vegan"],
    tasteProfile: ["Rosy floral aromas", "Light and limey citrus, with bitter finish"], abv: "0.5% VOL",
    tasteProfileRadar: { sweet: 3, fruity: 3, fresh: 3, savoury: 2, herbal: 2, spicy: 2, floral: 3 },
    productFeatures: [
      { title: "Feature One", description: "Detailed explanation of feature one and why it matters to the customer." },
      { title: "Feature Two", description: "Detailed explanation of feature two." },
      { title: "Feature Three", description: "Detailed explanation of feature three." }
    ],
    carouselImages: []},
  { brandSlug: "big-drop", variant: "Paradiso Citra IPA",
    intro: "This IPA radiates citrus fruit from the moment you pour it to the second you finish that last sip with a satisfied sigh. The bright, sharp twist of bitterness on the end makes you want to dive back in for one more.",
    features: ["Gluten-Free", "Vegan"],
    tasteProfile: ["Citrusy throughout", "Bright, sharp twist of bitterness to finish"], abv: "0.5% VOL",
    tasteProfileRadar: { sweet: 3, fruity: 3, fresh: 3, savoury: 2, herbal: 2, spicy: 2, floral: 3 },
    productFeatures: [
      { title: "Feature One", description: "Detailed explanation of feature one and why it matters to the customer." },
      { title: "Feature Two", description: "Detailed explanation of feature two." },
      { title: "Feature Three", description: "Detailed explanation of feature three." }
    ],
    carouselImages: []},
];

export function getTastingNotesForBrand(slug: string): VariantTasting[] {
  return TASTING_NOTES.filter((t) => t.brandSlug === slug);
}
