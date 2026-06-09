const fs = require('fs');

const fileContent = fs.readFileSync('scratch/seed-database.js', 'utf8');

// Extract the brands array literal
const match = fileContent.match(/const brands = (\[[\s\S]*?\]);/);
if (!match) {
  console.error('Could not find brands array');
  process.exit(1);
}

const brandsRaw = match[1];

const outputContent = `import { Brand } from '@/types/brand';
import { getBrandImages } from './brand-images';

const RAW_BRANDS: any[] = ${brandsRaw};

export const STATIC_BRANDS: Brand[] = RAW_BRANDS.map((b, bIndex) => {
  const local = getBrandImages(b.slug);
  const id = String(bIndex + 1);

  return {
    id,
    slug: b.slug,
    name: b.name,
    category: b.category,
    tagline: b.tagline || '',
    heroImage: { url: local?.hero || b.hero_image_url || '', alt: b.name },
    logo: local?.logo ? { url: local.logo, alt: b.name } : undefined,
    lifestyleImages: local?.lifestyle && local.lifestyle.length > 0
      ? local.lifestyle.map((url: string) => ({ url, alt: '' }))
      : [],
    venueBadges: [],
    promotionActive: b.promotion_active || false,
    bcorp: b.bcorp || false,
    story: {
      title: b.name + ' Story',
      description: b.description || b.tagline || '',
      founders: [],
    },
    variants: (b.variants || []).map((v: any, index: number) => ({
      id: \`\${id}-v-\${index + 1}\`,
      name: v.name,
      description: v.description || '',
      abv: v.abv || '',
      volume: v.volume || '',
      image: { url: local?.variants?.[index] || '', alt: v.name },
      tastingNotes: [],
      serveInspiration: '',
    })),
    activations: (b.activations || []).map((a: any, index: number) => ({
      id: \`\${id}-a-\${index + 1}\`,
      title: a.title,
      date: a.date || '',
      location: a.location || '',
      description: a.description || '',
      type: a.type || 'upcoming',
      image: { url: local?.activations?.[index] || '', alt: a.title },
      activationType: a.activation_type || '',
      keyDates: a.key_dates || [],
      mixerPairings: [],
    })),
    supportPackages: [],
    serves: [],
    mediaGallery: [],
  };
});
`;

fs.writeFileSync('src/lib/static-brands.ts', outputContent, 'utf8');
console.log('Successfully generated src/lib/static-brands.ts');
