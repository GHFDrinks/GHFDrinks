export type Season = "spring-summer" | "autumn-winter";

export type Serve = {
  name: string;
  recipe: string;
  flavourDescriptors: [string, string, string];
  image?: string;
};

export type VariantServes = {
  brandSlug: string;
  variantSlug: string;
  variantDisplayName: string;
  springSummer: Serve[]; // exactly 3
  autumnWinter: Serve[]; // exactly 3
  feverTree?: Serve[]; // optional Fever-Tree mixer serves (3) — spirits only
};

// Default Fever-Tree mixer serves shown for spirit brands (holding content).
export const FEVER_TREE_SERVES: Serve[] = [
  { name: "with Premium Indian Tonic", recipe: "50ml spirit over ice, top with Fever-Tree Premium Indian Tonic, garnish to suit.", flavourDescriptors: ["Crisp", "Balanced", "Classic"] },
  { name: "with Ginger Beer", recipe: "50ml spirit over ice, top with Fever-Tree Ginger Beer, lime wedge.", flavourDescriptors: ["Spiced", "Zesty", "Warming"] },
  { name: "with Mediterranean Tonic", recipe: "50ml spirit over ice, top with Fever-Tree Mediterranean Tonic, rosemary sprig.", flavourDescriptors: ["Floral", "Herbal", "Light"] },
];

export const SERVES_DATA: VariantServes[] = [
  // --- SAPLING ---
  {
    brandSlug: "sapling",
    variantSlug: "sapling-vodka",
    variantDisplayName: "Sapling Vodka",
    springSummer: [
      { name: "Sapling Spritz", recipe: "50ml Sapling Vodka, 15ml elderflower cordial, top with soda and a squeeze of lime.", flavourDescriptors: ["Fresh", "Citrus", "Light"] },
      { name: "Garden Martini", recipe: "50ml Sapling Vodka, 10ml dry vermouth, stir with ice and garnish with a cucumber ribbon.", flavourDescriptors: ["Herbal", "Crisp", "Bright"] },
      { name: "Vodka Tonic", recipe: "50ml Sapling Vodka, top with premium tonic water, garnish with a lime wheel.", flavourDescriptors: ["Clean", "Zesty", "Refreshing"] },
    ],
    autumnWinter: [
      { name: "Spiced Sapling", recipe: "50ml Sapling Vodka, top with warm ginger beer, dash of Angostura bitters.", flavourDescriptors: ["Warm", "Spice", "Rich"] },
      { name: "Old Vodka Fashioned", recipe: "50ml Sapling Vodka, 1 tsp sugar, 2 dashes bitters, stir over large ice cube.", flavourDescriptors: ["Bitter", "Sweet", "Aromatic"] },
      { name: "Vodka Hot Toddy", recipe: "50ml Sapling Vodka, 1 tbsp honey, squeeze of lemon, top with boiling water.", flavourDescriptors: ["Honey", "Lemon", "Warm"] },
    ],
  },
  {
    brandSlug: "sapling",
    variantSlug: "sapling-raspberry-vodka",
    variantDisplayName: "Sapling Raspberry Vodka",
    springSummer: [
      { name: "Raspberry Spritz", recipe: "50ml Raspberry Vodka, top with prosecco and soda, garnish with fresh mint.", flavourDescriptors: ["Sweet", "Fruity", "Bubbling"] },
      { name: "Summer Berry Collins", recipe: "50ml Raspberry Vodka, 15ml lemon juice, 10ml sugar syrup, top with soda.", flavourDescriptors: ["Tart", "Berry", "Fresh"] },
      { name: "Raspberry Tonic", recipe: "50ml Raspberry Vodka, top with light tonic, garnish with fresh raspberries.", flavourDescriptors: ["Zesty", "Light", "Floral"] },
    ],
    autumnWinter: [
      { name: "Raspberry Mulled Toddy", recipe: "50ml Raspberry Vodka, warm apple juice, clove, cinnamon stick.", flavourDescriptors: ["Spice", "Berry", "Warm"] },
      { name: "Dark Berry Sour", recipe: "50ml Raspberry Vodka, 20ml lemon juice, 15ml simple syrup, egg white.", flavourDescriptors: ["Sour", "Rich", "Silky"] },
      { name: "Raspberry Hot Chocolate", recipe: "50ml Raspberry Vodka stirred into rich hot chocolate, topped with cream.", flavourDescriptors: ["Sweet", "Chocolate", "Indulgent"] },
    ],
  },
  {
    brandSlug: "sapling",
    variantSlug: "sapling-gin",
    variantDisplayName: "Sapling Gin",
    springSummer: [
      { name: "Sapling G&T", recipe: "50ml Sapling Gin, top with Mediterranean tonic, garnish with rosemary & lemon.", flavourDescriptors: ["Herbal", "Piney", "Zesty"] },
      { name: "Basil Smash", recipe: "50ml Sapling Gin, 20ml lemon juice, 15ml sugar syrup, muddle with fresh basil.", flavourDescriptors: ["Herbaceous", "Sour", "Bright"] },
      { name: "Gin & Rose", recipe: "50ml Sapling Gin, 15ml rose syrup, top with soda and a cucumber slice.", flavourDescriptors: ["Floral", "Sweet", "Delicate"] },
    ],
    autumnWinter: [
      { name: "Winter Negroni", recipe: "25ml Sapling Gin, 25ml Campari, 25ml sweet vermouth, orange peel garnish.", flavourDescriptors: ["Bitter", "Complex", "Bold"] },
      { name: "Spiced Gin Toddy", recipe: "50ml Sapling Gin, hot water, honey, star anise, lemon wheel.", flavourDescriptors: ["Warm", "Anise", "Soothing"] },
      { name: "Cranberry French 75", recipe: "35ml Sapling Gin, 15ml cranberry juice, top with sparkling wine.", flavourDescriptors: ["Tart", "Festive", "Dry"] },
    ],
  },
  // --- FIELDEN ---
  {
    brandSlug: "fielden",
    variantSlug: "rye-whisky",
    variantDisplayName: "Rye Whisky",
    springSummer: [
      { name: "Fielden Highball", recipe: "50ml Rye Whisky, top with ginger ale, squeeze of fresh lime.", flavourDescriptors: ["Spicy", "Effervescent", "Crisp"] },
      { name: "Summer Rye Sour", recipe: "50ml Rye Whisky, 25ml lemon juice, 15ml honey water, fresh peach slice.", flavourDescriptors: ["Fruity", "Tart", "Rich"] },
      { name: "Rye Mint Julep", recipe: "50ml Rye Whisky, muddle mint leaves with sugar, serve over crushed ice.", flavourDescriptors: ["Minty", "Sweet", "Refreshing"] },
    ],
    autumnWinter: [
      { name: "Fielden Manhattan", recipe: "50ml Rye Whisky, 20ml sweet vermouth, 2 dashes Angostura, cherry.", flavourDescriptors: ["Bold", "Sweet", "Rich"] },
      { name: "Rye Old Fashioned", recipe: "50ml Rye Whisky, brown sugar, orange bitters, large ice cube.", flavourDescriptors: ["Classic", "Oak", "Spicy"] },
      { name: "Whisky Hot Toddy", recipe: "50ml Rye Whisky, squeeze of lemon, hot honey tea, cinnamon stick.", flavourDescriptors: ["Spiced", "Warm", "Zesty"] },
    ],
  },
  // --- DROPWORKS ---
  {
    brandSlug: "dropworks",
    variantSlug: "clear-drop",
    variantDisplayName: "Clear Drop Rum",
    springSummer: [
      { name: "Clear Daiquiri", recipe: "50ml Clear Drop, 20ml lime juice, 15ml simple syrup, shake with ice.", flavourDescriptors: ["Sour", "Lime", "Clean"] },
      { name: "Mojito Clasico", recipe: "50ml Clear Drop, top with soda, fresh mint leaves, sugar, lime juice.", flavourDescriptors: ["Minty", "Fresh", "Zesty"] },
      { name: "Rum & Coconut Water", recipe: "50ml Clear Drop over ice, top with fresh coconut water, lime wedge.", flavourDescriptors: ["Tropical", "Light", "Hydrating"] },
    ],
    autumnWinter: [
      { name: "Rum Old Fashioned", recipe: "50ml Clear Drop, brown sugar syrup, dark chocolate bitters, orange twist.", flavourDescriptors: ["Cocoa", "Sweet", "Smooth"] },
      { name: "Hot Buttered Rum", recipe: "50ml Clear Drop, warm water, spiced butter batter, brown sugar.", flavourDescriptors: ["Rich", "Spiced", "Warm"] },
      { name: "Winter Rum Punch", recipe: "50ml Clear Drop, cranberry juice, pineapple juice, cinnamon syrup.", flavourDescriptors: ["Spicy", "Fruity", "Sweet"] },
    ],
  },
  {
    brandSlug: "dropworks",
    variantSlug: "spice-drop",
    variantDisplayName: "Spice Drop Rum",
    springSummer: [
      { name: "Spiced Mule", recipe: "50ml Spice Drop, top with ginger beer, fresh lime squeeze, mint sprig.", flavourDescriptors: ["Fiery", "Zesty", "Fresh"] },
      { name: "Tropical Spiced Punch", recipe: "50ml Spice Drop, mango juice, passion fruit syrup, lime.", flavourDescriptors: ["Fruity", "Exotic", "Sweet"] },
      { name: "Spiced & Tonic", recipe: "50ml Spice Drop, top with dry tonic, orange slice.", flavourDescriptors: ["Spice", "Dry", "Citrus"] },
    ],
    autumnWinter: [
      { name: "Dark & Stormy Winter", recipe: "50ml Spice Drop, fiery ginger beer, dash of dark stout beer float.", flavourDescriptors: ["Warm", "Rich", "Bold"] },
      { name: "Spiced Toddy", recipe: "50ml Spice Drop, hot water, honey, clove, lemon slice.", flavourDescriptors: ["Honey", "Citrus", "Warm"] },
      { name: "Spiced Cocoa", recipe: "50ml Spice Drop stirred into dark hot chocolate, whipped cream.", flavourDescriptors: ["Chocolate", "Sweet", "Creamy"] },
    ],
  },
  {
    brandSlug: "dropworks",
    variantSlug: "barrel-drop",
    variantDisplayName: "Barrel Drop Rum",
    springSummer: [
      { name: "Barrel & Ginger", recipe: "50ml Barrel Drop, top with ginger ale, orange peel garnish.", flavourDescriptors: ["Spicy", "Woody", "Sweet"] },
      { name: "Rum Sour", recipe: "50ml Barrel Drop, 20ml lemon juice, 15ml simple syrup, Angostura bitters.", flavourDescriptors: ["Sour", "Oak", "Smooth"] },
      { name: "Island Highball", recipe: "50ml Barrel Drop, pineapple soda, squeeze of fresh lime.", flavourDescriptors: ["Fruity", "Crisp", "Dry"] },
    ],
    autumnWinter: [
      { name: "Barrel Manhattan", recipe: "50ml Barrel Drop, 20ml sweet vermouth, orange bitters, cherry.", flavourDescriptors: ["Rich", "Bold", "Herbaceous"] },
      { name: "Classic Rum Fashioned", recipe: "50ml Barrel Drop, demerara sugar, orange peel, angostura.", flavourDescriptors: ["Oak", "Spicy", "Sweet"] },
      { name: "Rum & Cider Warm", recipe: "50ml Barrel Drop, warm apple cider, nutmeg, cinnamon.", flavourDescriptors: ["Spiced", "Warm", "Fruity"] },
    ],
  },
  {
    brandSlug: "dropworks",
    variantSlug: "dark-drop",
    variantDisplayName: "Dark Drop Rum",
    springSummer: [
      { name: "Dark Daiquiri", recipe: "50ml Dark Drop, 20ml lime juice, 15ml molasses syrup.", flavourDescriptors: ["Rich", "Tart", "Treacle"] },
      { name: "Dark & Stormy", recipe: "50ml Dark Drop, top with ginger beer, squeeze of lime juice.", flavourDescriptors: ["Fiery", "Sweet", "Refreshing"] },
      { name: "Tropical Dark Punch", recipe: "50ml Dark Drop, pineapple juice, orange juice, grenadine.", flavourDescriptors: ["Fruity", "Tropical", "Sweet"] },
    ],
    autumnWinter: [
      { name: "Espresso Rumtini", recipe: "50ml Dark Drop, 30ml fresh espresso, 15ml coffee liqueur, shake.", flavourDescriptors: ["Coffee", "Rich", "Bold"] },
      { name: "Dark Buttered Toddy", recipe: "50ml Dark Drop, hot water, spiced butter, brown sugar.", flavourDescriptors: ["Warm", "Spiced", "Sweet"] },
      { name: "Dark Old Fashioned", recipe: "50ml Dark Drop, demerara syrup, chocolate bitters, orange twist.", flavourDescriptors: ["Treacle", "Oak", "Cocoa"] },
    ],
  },
  {
    brandSlug: "dropworks",
    variantSlug: "funk-drop",
    variantDisplayName: "Funk Drop Rum",
    springSummer: [
      { name: "Overproof Daiquiri", recipe: "35ml Funk Drop, 20ml lime juice, 15ml simple syrup, shake hard.", flavourDescriptors: ["Estery", "Sour", "Intense"] },
      { name: "Funk Collins", recipe: "35ml Funk Drop, 15ml lemon juice, 10ml syrup, top with soda.", flavourDescriptors: ["Bright", "Tart", "Earthy"] },
      { name: "Mai Tai", recipe: "25ml Funk Drop, 25ml clear rum, 15ml triple sec, 15ml orgeat, lime.", flavourDescriptors: ["Almond", "Tropical", "Complex"] },
    ],
    autumnWinter: [
      { name: "Funk Blazer", recipe: "50ml Funk Drop, hot water, brown sugar, flamed orange peel.", flavourDescriptors: ["Flambeed", "Zesty", "Warm"] },
      { name: "Funk & Stout", recipe: "35ml Funk Drop poured into a pint of dry Irish stout.", flavourDescriptors: ["Bitter", "Malty", "Estery"] },
      { name: "Spiced Funk Brew", recipe: "35ml Funk Drop, warm apple juice, star anise, clove.", flavourDescriptors: ["Warm", "Anise", "Fruity"] },
    ],
  },
  // --- EVERLEAF ---
  {
    brandSlug: "everleaf",
    variantSlug: "forest",
    variantDisplayName: "Everleaf Forest",
    springSummer: [
      { name: "Forest Spritz", recipe: "50ml Everleaf Forest, top with light tonic, garnish with an orange wedge.", flavourDescriptors: ["Bittersweet", "Orange", "Floral"] },
      { name: "Garden Collins", recipe: "50ml Everleaf Forest, 15ml lemon juice, top with soda, cucumber ribbon.", flavourDescriptors: ["Fresh", "Clean", "Botanical"] },
      { name: "Sunset Highball", recipe: "50ml Everleaf Forest, top with ginger ale, orange peel garnish.", flavourDescriptors: ["Spicy", "Saffron", "Dry"] },
    ],
    autumnWinter: [
      { name: "Forest Hot Toddy", recipe: "50ml Everleaf Forest, hot water, honey, slice of orange, clove.", flavourDescriptors: ["Warm", "Citrus", "Honey"] },
      { name: "Nogroni Forest", recipe: "50ml Everleaf Forest, 25ml non-alcoholic bitter aperitif, orange peel.", flavourDescriptors: ["Bitter", "Herbal", "Complex"] },
      { name: "Forest & Ginger", recipe: "50ml Everleaf Forest, top with warm ginger beer, cinnamon stick.", flavourDescriptors: ["Spicy", "Sweet", "Warm"] },
    ],
  },
  {
    brandSlug: "everleaf",
    variantSlug: "marine",
    variantDisplayName: "Everleaf Marine",
    springSummer: [
      { name: "Marine & Tonic", recipe: "50ml Everleaf Marine, top with premium tonic, garnish with lime & mint.", flavourDescriptors: ["Crisp", "Salty", "Refreshing"] },
      { name: "Sea Spritz", recipe: "50ml Everleaf Marine, white grape juice, top with soda water.", flavourDescriptors: ["Fruity", "Light", "Bubbling"] },
      { name: "Marine Gimlet", recipe: "50ml Everleaf Marine, 15ml lime cordial, shake with ice and strain.", flavourDescriptors: ["Sour", "Lime", "Clean"] },
    ],
    autumnWinter: [
      { name: "Coastal Sour", recipe: "50ml Everleaf Marine, 20ml lemon juice, 15ml thyme syrup, egg white.", flavourDescriptors: ["Herbal", "Sour", "Velvety"] },
      { name: "Winter Marine Highball", recipe: "50ml Everleaf Marine, top with dry ginger ale, rosemary sprig.", flavourDescriptors: ["Piney", "Dry", "Spicy"] },
      { name: "Warm Marine Toddy", recipe: "50ml Everleaf Marine, hot water, lemon thyme, honey.", flavourDescriptors: ["Citrus", "Herbal", "Warm"] },
    ],
  },
  {
    brandSlug: "everleaf",
    variantSlug: "mountain",
    variantDisplayName: "Everleaf Mountain",
    springSummer: [
      { name: "Mountain Spritz", recipe: "50ml Everleaf Mountain, top with light tonic, garnish with a strawberry slice.", flavourDescriptors: ["Fruity", "Floral", "Pink"] },
      { name: "Alpine Collins", recipe: "50ml Everleaf Mountain, 15ml lemon juice, top with soda, mint.", flavourDescriptors: ["Fresh", "Berry", "Crisp"] },
      { name: "Mountain Rose", recipe: "50ml Everleaf Mountain, top with rose soda, rose petal garnish.", flavourDescriptors: ["Floral", "Sweet", "Delicate"] },
    ],
    autumnWinter: [
      { name: "Mountain Spiced Toddy", recipe: "50ml Everleaf Mountain, hot water, lemon wheel, cinnamon.", flavourDescriptors: ["Warm", "Spiced", "Sweet"] },
      { name: "Mountain Sour", recipe: "50ml Everleaf Mountain, 20ml lemon juice, 15ml cherry syrup, egg white.", flavourDescriptors: ["Fruity", "Sour", "Rich"] },
      { name: "Alpine Winter Tonic", recipe: "50ml Everleaf Mountain, tonic water, star anise, clove.", flavourDescriptors: ["Warm", "Anise", "Dry"] },
    ],
  },
  // --- DESDEYA ---
  {
    brandSlug: "desdeya",
    variantSlug: "tequila-blanco-desdeya-uno",
    variantDisplayName: "Tequila Blanco Desdeya Uno",
    springSummer: [
      { name: "Desdeya Margarita", recipe: "50ml Tequila Blanco, 20ml lime juice, 15ml agave nectar, shake hard.", flavourDescriptors: ["Zesty", "Sour", "Crisp"] },
      { name: "Paloma Fresca", recipe: "50ml Tequila Blanco, top with grapefruit soda, squeeze of lime, salt rim.", flavourDescriptors: ["Tart", "Fruity", "Salpy"] },
      { name: "Tequila Sunrise Spritz", recipe: "50ml Tequila Blanco, 30ml orange juice, top with prosecco, grenadine.", flavourDescriptors: ["Sweet", "Fruity", "Bright"] },
    ],
    autumnWinter: [
      { name: "Desdeya Old Fashioned", recipe: "50ml Tequila Blanco, 10ml agave nectar, orange bitters, flamed orange peel.", flavourDescriptors: ["Smoky", "Agave", "Zesty"] },
      { name: "Spiced Tequila Toddy", recipe: "50ml Tequila Blanco, hot water, honey, lime, cinnamon stick.", flavourDescriptors: ["Warm", "Spiced", "Citrus"] },
      { name: "Tequila Espresso Martini", recipe: "50ml Tequila Blanco, 30ml espresso, 15ml coffee liqueur.", flavourDescriptors: ["Coffee", "Rich", "Roasted"] },
    ],
  },
  // --- PENSADOR ---
  {
    brandSlug: "pensador",
    variantSlug: "ensamble",
    variantDisplayName: "Ensamble Mezcal",
    springSummer: [
      { name: "Mezcal Paloma", recipe: "50ml Ensamble Mezcal, grapefruit soda, lime, pinch of salt.", flavourDescriptors: ["Smoky", "Tart", "Zesty"] },
      { name: "Summer Mezcal Tonic", recipe: "50ml Ensamble Mezcal, top with tonic, garnish with orange.", flavourDescriptors: ["Bittersweet", "Smoke", "Fresh"] },
      { name: "Mezcal Mule", recipe: "50ml Ensamble Mezcal, top with ginger beer, fresh lime squeeze.", flavourDescriptors: ["Smoky", "Fiery", "Zesty"] },
    ],
    autumnWinter: [
      { name: "Oaxacan Old Fashioned", recipe: "40ml Ensamble Mezcal, 10ml Tequila, agave, chocolate bitters.", flavourDescriptors: ["Smoky", "Rich", "Cocoa"] },
      { name: "Smoky Toddy", recipe: "50ml Ensamble Mezcal, hot water, agave nectar, lemon wheel.", flavourDescriptors: ["Smoke", "Honey", "Warm"] },
      { name: "Mezcal Hot Chocolate", recipe: "50ml Ensamble Mezcal stirred into spiced Mexican hot chocolate.", flavourDescriptors: ["Spicy", "Chocolate", "Smoky"] },
    ],
  },
  {
    brandSlug: "pensador",
    variantSlug: "espadin",
    variantDisplayName: "Espadin Mezcal",
    springSummer: [
      { name: "Espadin Margarita", recipe: "50ml Espadin Mezcal, 20ml lime juice, 15ml agave nectar.", flavourDescriptors: ["Smoky", "Sour", "Lime"] },
      { name: "Green Mezcal Smash", recipe: "50ml Espadin Mezcal, muddle cucumber & mint, top with soda.", flavourDescriptors: ["Crisp", "Cool", "Herbal"] },
      { name: "Espadin Highball", recipe: "50ml Espadin Mezcal, top with club soda, lemon twist.", flavourDescriptors: ["Smoke", "Clean", "Dry"] },
    ],
    autumnWinter: [
      { name: "Espadin Manhattan", recipe: "50ml Espadin Mezcal, 20ml sweet vermouth, orange bitters.", flavourDescriptors: ["Smoky", "Complex", "Bold"] },
      { name: "Mezcal Negroni", recipe: "25ml Espadin Mezcal, 25ml Campari, 25ml sweet vermouth.", flavourDescriptors: ["Smoky", "Bitter", "Sweet"] },
      { name: "Warm Espadin Toddy", recipe: "50ml Espadin Mezcal, hot water, honey, cinnamon stick.", flavourDescriptors: ["Warm", "Spiced", "Sweet"] },
    ],
  },
];
