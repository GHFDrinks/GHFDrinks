const BASE = '/brands';

export const BRAND_IMAGES: Record<string, {
  hero: string;
  logo?: string;
  lifestyle: string[];
  activations: string[];
  variants: string[];
}> = {
  'sapling': {
    hero:       `${BASE}/sapling/hero.png`,
    logo:       `${BASE}/sapling/logo.png`,
    lifestyle:  [`${BASE}/sapling/lifestyle-1.jpg`, `${BASE}/sapling/lifestyle-2.jpg`, `${BASE}/sapling/lifestyle-3.jpg`],
    activations:[`${BASE}/sapling/activation-1.jpg`, `${BASE}/sapling/activation-2.jpg`],
    variants:   [`${BASE}/sapling/bottle-1.png`, `${BASE}/sapling/bottle-2.png`, `${BASE}/sapling/bottle-3.png`],
  },
  'fielden': {
    hero:       `${BASE}/fielden/hero.png`,
    logo:       `${BASE}/fielden/logo.png`,
    lifestyle:  [`${BASE}/fielden/lifestyle-1.jpg`, `${BASE}/fielden/lifestyle-2.jpg`, `${BASE}/fielden/lifestyle-3.jpg`],
    activations:[`${BASE}/fielden/activation-1.jpg`, `${BASE}/fielden/activation-2.jpg`],
    variants:   [`${BASE}/fielden/bottle-1.png`, `${BASE}/fielden/bottle-2.png`],
  },
  'dropworks': {
    hero:       `${BASE}/dropworks/hero.png`,
    lifestyle:  [`${BASE}/dropworks/lifestyle-1.jpg`, `${BASE}/dropworks/lifestyle-2.jpg`, `${BASE}/dropworks/lifestyle-3.jpg`],
    activations:[`${BASE}/dropworks/activation-1.jpg`, `${BASE}/dropworks/activation-2.jpg`],
    variants:   [`${BASE}/dropworks/bottle-1.png`, `${BASE}/dropworks/bottle-2.png`, `${BASE}/dropworks/bottle-3.png`],
  },
  'desdeya': {
    hero:       `${BASE}/desdeya/hero.png`,
    logo:       `${BASE}/desdeya/logo.png`,
    lifestyle:  [`${BASE}/desdeya/lifestyle-1.jpg`, `${BASE}/desdeya/lifestyle-2.jpg`, `${BASE}/desdeya/lifestyle-3.jpg`],
    activations:[`${BASE}/desdeya/activation-1.jpg`, `${BASE}/desdeya/activation-2.jpg`],
    variants:   [`${BASE}/desdeya/bottle-1.png`],
  },
  'pensador': {
    hero:       `${BASE}/pensador/hero.png`,
    logo:       `${BASE}/pensador/logo.png`,
    lifestyle:  [`${BASE}/pensador/lifestyle-1.jpg`, `${BASE}/pensador/lifestyle-2.jpg`, `${BASE}/pensador/lifestyle-3.jpg`],
    activations:[`${BASE}/pensador/activation-1.jpg`, `${BASE}/pensador/activation-2.jpg`],
    variants:   [`${BASE}/pensador/bottle-1.png`, `${BASE}/pensador/bottle-2.png`],
  },
  'everleaf': {
    hero:       `${BASE}/everleaf/hero.png`,
    logo:       `${BASE}/everleaf/logo.png`,
    lifestyle:  [`${BASE}/everleaf/lifestyle-1.jpg`, `${BASE}/everleaf/lifestyle-2.jpg`, `${BASE}/everleaf/lifestyle-3.jpg`],
    activations:[`${BASE}/everleaf/activation-1.jpg`, `${BASE}/everleaf/activation-2.jpg`],
    variants:   [`${BASE}/everleaf/bottle-1.png`, `${BASE}/everleaf/bottle-2.png`, `${BASE}/everleaf/bottle-3.png`],
  },
  'mirabeau': {
    hero:       `${BASE}/mirabeau/hero.png`,
    lifestyle:  [`${BASE}/mirabeau/lifestyle-1.jpg`, `${BASE}/mirabeau/lifestyle-2.jpg`, `${BASE}/mirabeau/lifestyle-3.jpg`],
    activations:[`${BASE}/mirabeau/activation-1.jpg`, `${BASE}/mirabeau/activation-2.jpg`],
    variants:   [`${BASE}/mirabeau/bottle-1.png`, `${BASE}/mirabeau/bottle-2.png`, `${BASE}/mirabeau/bottle-3.png`],
  },
  'craggy-range': {
    hero:       `${BASE}/craggy-range/hero.png`,
    logo:       `${BASE}/craggy-range/logo.png`,
    lifestyle:  [`${BASE}/craggy-range/lifestyle-1.jpg`, `${BASE}/craggy-range/lifestyle-2.jpg`, `${BASE}/craggy-range/lifestyle-3.jpg`],
    activations:[`${BASE}/craggy-range/activation-1.jpg`, `${BASE}/craggy-range/activation-2.jpg`],
    variants:   [`${BASE}/craggy-range/bottle-1.png`, `${BASE}/craggy-range/bottle-2.png`],
  },
  'coates-and-seely': {
    hero:       `${BASE}/coates-and-seely/hero.png`,
    logo:       `${BASE}/coates-and-seely/logo.png`,
    lifestyle:  [`${BASE}/coates-and-seely/lifestyle-1.jpg`, `${BASE}/coates-and-seely/lifestyle-2.jpg`, `${BASE}/coates-and-seely/lifestyle-3.jpg`],
    activations:[`${BASE}/coates-and-seely/activation-1.jpg`, `${BASE}/coates-and-seely/activation-2.jpg`],
    variants:   [`${BASE}/coates-and-seely/bottle-1.png`, `${BASE}/coates-and-seely/bottle-2.png`],
  },
  'quinta-da-romaneira': {
    hero:       `${BASE}/quinta-da-romaneira/hero.png`,
    logo:       `${BASE}/quinta-da-romaneira/logo.png`,
    lifestyle:  [`${BASE}/quinta-da-romaneira/lifestyle-1.jpg`, `${BASE}/quinta-da-romaneira/lifestyle-2.jpg`, `${BASE}/quinta-da-romaneira/lifestyle-3.jpg`],
    activations:[`${BASE}/quinta-da-romaneira/activation-1.jpg`, `${BASE}/quinta-da-romaneira/activation-2.jpg`],
    variants:   [`${BASE}/quinta-da-romaneira/bottle-1.png`, `${BASE}/quinta-da-romaneira/bottle-2.png`],
  },
  'dreamsake': {
    hero:       `${BASE}/dreamsake/hero.png`,
    logo:       `${BASE}/dreamsake/logo.png`,
    lifestyle:  [`${BASE}/dreamsake/lifestyle-1.jpg`, `${BASE}/dreamsake/lifestyle-2.jpg`, `${BASE}/dreamsake/lifestyle-3.jpg`],
    activations:[`${BASE}/dreamsake/activation-1.jpg`, `${BASE}/dreamsake/activation-2.jpg`],
    variants:   [`${BASE}/dreamsake/bottle-1.png`, `${BASE}/dreamsake/bottle-2.png`],
  },
  'wild-idol': {
    hero:       `${BASE}/wild-idol/hero.png`,
    logo:       `${BASE}/wild-idol/logo.png`,
    lifestyle:  [`${BASE}/wild-idol/lifestyle-1.jpg`, `${BASE}/wild-idol/lifestyle-2.jpg`, `${BASE}/wild-idol/lifestyle-3.jpg`],
    activations:[`${BASE}/wild-idol/activation-1.jpg`, `${BASE}/wild-idol/activation-2.jpg`],
    variants:   [`${BASE}/wild-idol/bottle-1.png`, `${BASE}/wild-idol/bottle-2.png`],
  },
  'noam': {
    hero:       `${BASE}/noam/hero.png`,
    lifestyle:  [`${BASE}/noam/lifestyle-1.jpg`, `${BASE}/noam/lifestyle-2.jpg`, `${BASE}/noam/lifestyle-3.jpg`],
    activations:[`${BASE}/noam/activation-1.jpg`, `${BASE}/noam/activation-2.jpg`],
    variants:   [`${BASE}/noam/bottle-1.png`],
  },
  'cote-citron': {
    hero:       `${BASE}/cote-citron/hero.png`,
    logo:       `${BASE}/cote-citron/logo.png`,
    lifestyle:  [`${BASE}/cote-citron/lifestyle-1.jpg`, `${BASE}/cote-citron/lifestyle-2.jpg`, `${BASE}/cote-citron/lifestyle-3.jpg`],
    activations:[`${BASE}/cote-citron/activation-1.jpg`, `${BASE}/cote-citron/activation-2.jpg`],
    variants:   [`${BASE}/cote-citron/bottle-1.png`],
  },
  'wignac': {
    hero:       `${BASE}/wignac/hero.png`,
    lifestyle:  [`${BASE}/wignac/lifestyle-1.jpg`, `${BASE}/wignac/lifestyle-2.jpg`, `${BASE}/wignac/lifestyle-3.jpg`],
    activations:[`${BASE}/wignac/activation-1.jpg`, `${BASE}/wignac/activation-2.jpg`],
    variants:   [`${BASE}/wignac/bottle-1.png`, `${BASE}/wignac/bottle-2.png`],
  },
  'big-drop': {
    hero:       `${BASE}/big-drop/hero.png`,
    lifestyle:  [`${BASE}/big-drop/lifestyle-1.jpg`, `${BASE}/big-drop/lifestyle-2.jpg`, `${BASE}/big-drop/lifestyle-3.jpg`],
    activations:[`${BASE}/big-drop/activation-1.jpg`, `${BASE}/big-drop/activation-2.jpg`],
    variants:   [`${BASE}/big-drop/bottle-1.png`, `${BASE}/big-drop/bottle-2.png`],
  },
  'fever-tree': {
    hero:       `${BASE}/fever-tree/hero.png`,
    lifestyle:  [`${BASE}/fever-tree/lifestyle-1.jpg`, `${BASE}/fever-tree/lifestyle-2.jpg`, `${BASE}/fever-tree/lifestyle-3.jpg`],
    activations:[`${BASE}/fever-tree/activation-1.jpg`, `${BASE}/fever-tree/activation-2.jpg`],
    variants:   [`${BASE}/fever-tree/bottle-1.png`, `${BASE}/fever-tree/bottle-2.png`],
  },
};

export function getBrandImages(slug: string) {
  return BRAND_IMAGES[slug] ?? null;
}
