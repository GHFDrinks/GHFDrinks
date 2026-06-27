export type BrandInsightStat = {
  headline: string;        // e.g. "42%"
  caption: string;         // e.g. "Year-on-year growth"
  detail: string;          // expanded text shown on click
  image?: string;          // top-half image
};

export type BrandInsights = {
  brandSlug: string;
  stats: [BrandInsightStat, BrandInsightStat, BrandInsightStat]; // exactly 3
};

export const BRAND_INSIGHTS: BrandInsights[] = [
  {
    brandSlug: "sapling",
    stats: [
      { headline: "42%", caption: "YoY growth", detail: "Sapling has seen unprecedented growth in the premium eco-spirits category, driven by strong on-trade demand for climate-conscious alternatives.", image: "/brands/sapling/lifestyle-1.jpg" },
      { headline: "150+", caption: "Stockists", detail: "Over 150 independent bars, Michelin-starred restaurants, and high-end hotels across the UK now list Sapling as their house pour.", image: "/brands/sapling/lifestyle-2.jpg" },
      { headline: "5.0", caption: "Customer rating", detail: "Consistently rated 5 stars by key trade accounts for clean finish, excellent mixability, and narrative appeal at table service.", image: "/brands/sapling/activation-1.jpg" }
    ]
  },
  {
    brandSlug: "fielden",
    stats: [
      { headline: "+38%", caption: "English Rye category surge", detail: "English Rye is outperforming imported whiskies in the premium segment, with Fielden leading the charge on heritage grain narratives.", image: "/brands/fielden/lifestyle-1.jpg" },
      { headline: "100%", detail: "All grain utilized in distilling is sourced from British regenerative farms, ensuring a climate positive supply chain with full trace capabilities.", caption: "Heritage grains", image: "/brands/fielden/lifestyle-2.jpg" },
      { headline: "43%", caption: "Signature ABV", detail: "Perfect strength computed by master distillers to maintain maximum volatile oil profiles when served over blocks of ice.", image: "/brands/fielden/activation-1.jpg" }
    ]
  },
  {
    brandSlug: "dropworks",
    stats: [
      { headline: "1st", caption: "Premium British Rum Distillery", detail: "The largest rum distillery in Europe, dropworks is changing the perception of rum by bringing innovative production methods to Nottinghamshire.", image: "/brands/dropworks/lifestyle-1.jpg" },
      { headline: "57%", caption: "Funk Drop Strength", detail: "High ester profile overproof rum designed specifically to hold its unique flavour in complex tiki serves.", image: "/brands/dropworks/lifestyle-2.jpg" },
      { headline: "Zero", caption: "Added sugars", detail: "100% natural fermentation and distillation profiles. No artificial colorings or additives are ever blended post-still.", image: "/brands/dropworks/activation-1.jpg" }
    ]
  },
  {
    brandSlug: "desdeya",
    stats: [
      { headline: "100%", caption: "Blue Weber Agave", detail: "Sourced directly from single-estate farms in Jalisco, cooked in traditional brick ovens for a smooth, complex finish.", image: "/brands/desdeya/lifestyle-1.jpg" },
      { headline: "38%", caption: "Tequila Blanco strength", detail: "The perfect ABV to deliver crisp herbal notes and citrus undertones without any harsh alcoholic burn on the finish.", image: "/brands/desdeya/lifestyle-2.jpg" },
      { headline: "Agave", caption: "Artisanal production", detail: "Traditional slow cooking methods capture the sweet caramel notes of the agave heart, creating a tequila perfect for sipping.", image: "/brands/desdeya/activation-1.jpg" }
    ]
  },
  {
    brandSlug: "pensador",
    stats: [
      { headline: "43%", caption: "Espadín & Madrecuishe Blend", detail: "An ensemble blend crafted by Mezcalero Atenogenes García, providing a delicate balance of smoke, mineral, and sweet earthy profiles.", image: "/brands/pensador/lifestyle-1.jpg" },
      { headline: "D.O.P.", caption: "Protected Origin Status", detail: "100% artisanal Mezcal bottled in Oaxaca under strict heritage standards to preserve ancestral production techniques.", image: "/brands/pensador/lifestyle-2.jpg" },
      { headline: "Earth", caption: "Pit-roasted agave", detail: "Agave hearts are roasted underground with oak and local stones for five days, introducing a rich, complex smoke element.", image: "/brands/pensador/activation-1.jpg" }
    ]
  },
  {
    brandSlug: "everleaf",
    stats: [
      { headline: "0.0%", caption: "Alcohol content", detail: "Using advanced cold vacuum distillation to capture delicate botanical oils, providing full cocktail weight without the alcohol.", image: "/brands/everleaf/lifestyle-1.jpg" },
      { headline: "3x", caption: "Bespoke expressions", detail: "Forest, Mountain, and Marine variants map to distinct flavor profiles (bitter, floral, crisp) for infinite non-alcoholic cocktail options.", image: "/brands/everleaf/lifestyle-2.jpg" },
      { headline: "Eco", caption: "Sustainably sourced", detail: "Founded by a conservation biologist, everleaf sources key botanicals through fair-trade farms to protect fragile ecosystems.", image: "/brands/everleaf/lifestyle-3.jpg" }
    ]
  },
  {
    brandSlug: "mirabeau",
    stats: [
      { headline: "B-Corp", caption: "Regenerative viticulture", detail: "Leading the wine industry in soil restoration and biodiversity initiatives in Provence to counter climate impact on vineyards.", image: "/brands/mirabeau/lifestyle-1.jpg" },
      { headline: "13%", caption: "Provence Rosé ABV", detail: "Chilled to perfection, the classic dry rosé profile delivers crisp strawberry and raspberry notes suited for summer terraces.", image: "/brands/mirabeau/lifestyle-2.jpg" },
      { headline: "Provence", caption: "Côtes de Provence", detail: "Consistently rated among the top premium rosés globally, driving high-volume sales across luxury beach clubs and summer venues.", image: "/brands/mirabeau/activation-1.jpg" }
    ]
  },
  {
    brandSlug: "craggy-range",
    stats: [
      { headline: "Single", caption: "Vineyard Philosophy", detail: "Sourced from the prestigious Te Muna Road and Gimblett Gravels vineyards, ensuring a pure expression of terroir in every glass.", image: "/brands/craggy-range/lifestyle-1.jpg" },
      { headline: "Fine", caption: "New Zealand Classic", detail: "Consistently scoring 95+ points with wine critics globally, making Craggy Range a staple for premium fine dining pairings.", image: "/brands/craggy-range/lifestyle-2.jpg" },
      { headline: "Pure", caption: "Sauvignon & Syrah", detail: "Exemplary cool-climate winemaking techniques yield vibrant acidity and rich, structured tannins.", image: "/brands/craggy-range/activation-1.jpg" }
    ]
  },
  {
    brandSlug: "coates-and-seely",
    stats: [
      { headline: "NV", caption: "Hampshire Chalk Terroir", detail: "English sparkling wine grown on pure chalk slopes, mirroring the geological profile of Champagne for pristine minerality.", image: "/brands/coates-and-seely/lifestyle-1.jpg" },
      { headline: "12%", caption: "Brut Reserve ABV", detail: "A perfect balance of Chardonnay, Pinot Noir, and Pinot Meunier, aged on lees to develop a rich brioche character.", image: "/brands/coates-and-seely/lifestyle-2.jpg" },
      { headline: "Gold", caption: "Traditional Method", detail: "Aged for years in deep chalk cellars to create fine bubbles and complex green apple and citrus profiles.", image: "/brands/coates-and-seely/activation-1.jpg" }
    ]
  },
  {
    brandSlug: "quinta-da-romaneira",
    stats: [
      { headline: "Douro", caption: "Historic Valley Estate", detail: "Romaneira is one of the grandest estates in the Douro, pioneering dry table wines alongside single-quinta Ports.", image: "/brands/quinta-da-romaneira/lifestyle-1.jpg" },
      { headline: "Port", caption: "Single Quinta Port", detail: "Famous for Late Bottled Vintage (LBV) and vintage declarations, offering deep dark fruit, chocolate, and spice notes.", image: "/brands/quinta-da-romaneira/lifestyle-2.jpg" },
      { headline: "Estate", caption: "Terraced vineyards", detail: "Grown on dramatic shale terraces overlooking the Douro River, capturing optimal heat for rich, concentrated flavors.", image: "/brands/quinta-da-romaneira/activation-1.jpg" }
    ]
  },
  {
    brandSlug: "dreamsake",
    stats: [
      { headline: "No.1", caption: "Daiginjo Craft Sake", detail: "Brewed using highly polished Yamada Nishiki rice and legendary mountain water, delivering a smooth melon-led finish.", image: "/brands/dreamsake/lifestyle-1.jpg" },
      { headline: "15.5%", caption: "Refined Sake ABV", detail: "The optimal alcohol level to maintain a silky, light mouthfeel while pairing beautifully with contemporary gastronomy.", image: "/brands/dreamsake/lifestyle-2.jpg" },
      { headline: "Hyogo", caption: "Sake Heartland", detail: "Crafted in Kobe's Nada district, using generational brewing secrets to appeal to the modern luxury consumer.", image: "/brands/dreamsake/activation-1.jpg" }
    ]
  },
  {
    brandSlug: "wild-idol",
    stats: [
      { headline: "0.0%", caption: "Gluten-Free & Vegan", detail: "A naturally alcohol-free sparkling beverage with zero fermentation, preserving the pure floral grape character without sulfites.", image: "/brands/wild-idol/lifestyle-1.jpg" },
      { headline: "Zero", caption: "Alcohol by volume", detail: "Award-winning sparkling wine alternative, offering a premium choice for high-end celebrations and wellness moderation.", image: "/brands/wild-idol/lifestyle-2.jpg" },
      { headline: "Spark", caption: "Elegant Bubbles", detail: "Delicate effervescence with notes of green apple, white peach, and wild flowers, designed to be served in premium flutes.", image: "/brands/wild-idol/activation-1.jpg" }
    ]
  },
  {
    brandSlug: "noam",
    stats: [
      { headline: "5.0%", caption: "Bavarian Lager strength", detail: "Brewed in accordance with the German Purity Law (Reinheitsgebot), offering a clean, floral, herbal hop finish.", image: "/brands/noam/lifestyle-1.jpg" },
      { headline: "Glass", caption: "Iconic Ribbed Bottle", detail: "A design icon in the beer industry, NOAM is served in luxury fashion shows and high-end hotels globally.", image: "/brands/noam/lifestyle-2.jpg" },
      { headline: "Pure", caption: "Organic Barley", detail: "All ingredients are organically grown in the Hallertau valley, ensuring a crisp taste that pairs well with fine dining.", image: "/brands/noam/activation-1.jpg" }
    ]
  },
  {
    brandSlug: "wignac",
    stats: [
      { headline: "100%", caption: "Organic Apple Cider", detail: "Produced in the French Ardennes from pure apple juice. No added sugars, sulfites, or artificial colorings.", image: "/brands/wignac/lifestyle-1.jpg" },
      { headline: "5.5%", caption: "Brut Cider ABV", detail: "A dry and sparkling organic cider with a crisp, refreshing green apple taste that acts as a perfect alternative to Prosecco.", image: "/brands/wignac/lifestyle-2.jpg" },
      { headline: "Forest", caption: "Biodiversity focus", detail: "Apples are harvested from traditional orchards that support local wildlife, maintaining a carbon-neutral footprint.", image: "/brands/wignac/activation-1.jpg" }
    ]
  },
  {
    brandSlug: "cote-citron",
    stats: [
      { headline: "2.4%", caption: "Light Radler Strength", detail: "A refreshing blend of organic lager and fresh Menton lemon juice, designed for sunshine sessions and mid-day dining.", image: "/brands/cote-citron/lifestyle-1.jpg" },
      { headline: "Menton", caption: "Menton Lemons", detail: "Uses lemons from the Côte d'Azur, globally famous for their rich, aromatic oils and sweet, less-acidic juice.", image: "/brands/cote-citron/lifestyle-2.jpg" },
      { headline: "Sunny", caption: "Riviera Lifestyle", detail: "A modern interpretation of the classic shandy, bringing French Mediterranean elegance to the premium packaged market.", image: "/brands/cote-citron/activation-1.jpg" }
    ]
  },
  {
    brandSlug: "big-drop",
    stats: [
      { headline: "0.5%", caption: "Naturally Brewed", detail: "Naturally brewed below 0.5% ABV without dealcoholization, keeping all original grain and hop flavor structures intact.", image: "/brands/big-drop/lifestyle-1.jpg" },
      { headline: "5x", caption: "Core Beer Styles", detail: "Includes stout, IPA, pale ale, craft lager, and sour variants to ensure a match for every consumer profile.", image: "/brands/big-drop/lifestyle-2.jpg" },
      { headline: "Gold", caption: "Award-winning craft", detail: "Winner of numerous global beer awards, often outclassing full-strength equivalents in blind tastings.", image: "/brands/big-drop/activation-1.jpg" }
    ]
  },
  {
    brandSlug: "fever-tree",
    stats: [
      { headline: "3/4", caption: "Of your drink is the mixer", detail: "Pioneered the premium mixer category by sourcing the highest-quality quinine from the Democratic Republic of Congo.", image: "/brands/fever-tree/lifestyle-1.jpg" },
      { headline: "Zero", caption: "Artificial sweeteners", detail: "Made with 100% natural spring water and real fruit sugars, ensuring a clean taste that highlights the spirit rather than masking it.", image: "/brands/fever-tree/lifestyle-2.jpg" },
      { headline: "Mix", caption: "Carbonation focus", detail: "High carbonation with fine bubbles to hold aromatic oils at the surface of premium gin, vodka, and rum serves.", image: "/brands/fever-tree/activation-1.jpg" }
    ]
  }
];
