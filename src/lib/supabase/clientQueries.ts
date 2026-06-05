import { createClient } from './client';
import { Brand } from '@/types/brand';

export async function fetchBrandsClient(): Promise<Brand[]> {
  // Always return empty on first load — let syncBrandsClient populate
  return [];
}

export async function syncBrandsClient(onSuccess: (brands: Brand[]) => void): Promise<void> {
  try {
    const supabase = createClient();

    const { data: brandsData, error } = await supabase
      .from('brands')
      .select(`
        *,
        brand_variants (*),
        activations (*)
      `)
      .order('name');

    if (error || !brandsData || brandsData.length === 0) {
      console.error('Supabase fetch error or empty:', error);
      return;
    }

    const mapped: Brand[] = brandsData.map((b: any) => {
      const variants = (b.brand_variants || [])
        .sort((a: any, b: any) => (a.sort_order || 0) - (b.sort_order || 0))
        .map((v: any) => ({
          id: v.id,
          name: v.name,
          description: v.description || '',
          abv: v.abv || '',
          volume: v.volume || '',
          image: { url: v.image_url || '', alt: v.name },
          tastingNotes: v.tasting_notes || [],
          mixerPairings: v.mixer_pairings || [],
          serveInspiration: v.serve_inspiration || '',
        }));

      const activations = (b.activations || []).map((a: any) => ({
        id: a.id,
        title: a.title,
        date: a.date || '',
        location: a.location || '',
        description: a.description || '',
        type: a.type || 'upcoming',
        image: { url: a.image_url || '', alt: a.title },
        photo1: a.photo_1_url ? { url: a.photo_1_url, alt: a.title } : undefined,
        photo2: a.photo_2_url ? { url: a.photo_2_url, alt: a.title } : undefined,
        activationType: a.activation_type || '',
        keyDates: a.key_dates || [],
        mixerPairings: a.mixer_pairings || [],
      }));

      return {
        id: b.id,
        slug: b.slug,
        name: b.name,
        category: b.category,
        tagline: b.tagline || '',
        heroImage: { url: b.hero_image_url || '', alt: b.name },
        logo: b.logo_url ? { url: b.logo_url, alt: b.name + ' logo' } : undefined,
        lifestyleImages: [
          b.lifestyle_image_1 ? { url: b.lifestyle_image_1, alt: '' } : null,
          b.lifestyle_image_2 ? { url: b.lifestyle_image_2, alt: '' } : null,
          b.lifestyle_image_3 ? { url: b.lifestyle_image_3, alt: '' } : null,
        ].filter(Boolean) as any[],
        venueBadges: b.venue_badges || [],
        promotionActive: b.promotion_active || false,
        bcorp: b.bcorp || false,
        story: {
          title: b.story_title || '',
          description: b.story_description || b.tagline || '',
          founders: b.story_founders || [],
        },
        variants,
        activations,
        supportPackages: [],
        serves: [],
        mediaGallery: [],
      };
    });

    onSuccess(mapped);
  } catch (err) {
    console.error('Failed to sync brands:', err);
  }
}
