import { createClient } from './client';
import { Brand } from '@/types/brand';
import { mockBrands } from '@/data/brands';

const CACHE_KEY = 'ghf_brands_cache';

export async function fetchBrandsClient(): Promise<Brand[]> {
  try {
    if (typeof window !== 'undefined') {
      const cached = localStorage.getItem(CACHE_KEY);
      if (cached) {
        try {
          return JSON.parse(cached);
        } catch (e) {
          console.error('Error parsing cached brands', e);
        }
      }
    }
  } catch (err) {
    console.error('Failed to access localStorage:', err);
  }

  // Fallback to mockBrands initially
  return mockBrands;
}

export async function syncBrandsClient(onSuccess: (brands: Brand[]) => void): Promise<void> {
  try {
    const supabase = createClient();
    
    // Fetch live brands
    const { data: brandsData, error } = await supabase
      .from('brands')
      .select(`
        *,
        media_assets (*),
        brand_variants (*),
        activations (*),
        support_packages (*),
        serves (*)
      `);

    if (error) {
      console.error('Error fetching brands client:', error);
      return;
    }

    if (!brandsData || brandsData.length === 0) {
      return;
    }

    // Map to frontend Brand type
    const mapped = brandsData.map((b: any) => {
      const mock = mockBrands.find(m => m.slug === b.slug);

      const heroImage = b.media_assets?.find((m: any) => m.type === 'hero') || mock?.heroImage || { url: '', alt: '' };
      const storyImage = b.media_assets?.find((m: any) => m.type === 'story') || mock?.story?.image || null;

      const variants = b.brand_variants && b.brand_variants.length > 0
        ? b.brand_variants.map((v: any) => ({
            id: v.id,
            name: v.name,
            description: v.description || '',
            abv: v.abv || '',
            volume: v.volume || '',
            image: { url: v.image_url || '', alt: v.name },
          }))
        : mock?.variants || [];

      const activations = b.activations && b.activations.length > 0
        ? b.activations.map((a: any) => ({
            id: a.id,
            title: a.title,
            date: a.date || '',
            location: a.location || '',
            description: a.description || '',
            type: (a.type as any) || 'upcoming',
            image: { url: a.image_url || '', alt: a.title },
          }))
        : mock?.activations || [];

      const supportPackages = b.support_packages && b.support_packages.length > 0
        ? b.support_packages.map((p: any) => ({
            id: p.id,
            tier: p.tier as any,
            title: p.title,
            investment: p.investment || '',
            benefits: p.benefits || [],
          }))
        : mock?.supportPackages || [];

      const serves = b.serves && b.serves.length > 0
        ? b.serves.map((s: any) => ({
            id: s.id,
            name: s.name,
            ingredients: s.ingredients || [],
            instructions: s.instructions || '',
            image: s.image_url ? { url: s.image_url, alt: s.name } : undefined,
          }))
        : mock?.serves || [];

      const mediaGallery = b.media_assets?.filter((m: any) => m.type === 'gallery').map((m: any) => ({
        id: m.id,
        url: m.url,
        alt: m.alt || '',
      })) || mock?.mediaGallery || [];

      return {
        id: b.id,
        slug: b.slug,
        name: b.name,
        category: b.category,
        tagline: b.tagline || mock?.tagline || '',
        heroImage: { url: heroImage.url, alt: heroImage.alt || '' },
        story: {
          title: b.story_title || mock?.story?.title || '',
          description: b.story_description || mock?.story?.description || '',
          founders: b.story_founders || mock?.story?.founders || [],
          image: storyImage ? { url: storyImage.url, alt: storyImage.alt || '' } : undefined,
        },
        variants,
        activations,
        supportPackages,
        serves,
        mediaGallery,
      };
    });

    // Save to cache
    if (typeof window !== 'undefined') {
      localStorage.setItem(CACHE_KEY, JSON.stringify(mapped));
    }

    onSuccess(mapped);
  } catch (err) {
    console.error('Failed to sync brands client (might be offline):', err);
  }
}
