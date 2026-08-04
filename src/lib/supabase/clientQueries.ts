import { createClient } from './client';
import { Brand } from '@/types/brand';
import { getCuratedBrandAssets } from '@/lib/brand-images';

export async function fetchBrandsClient(): Promise<Brand[]> {
  return [];
}

export async function syncBrandsClient(
  onSuccess: (brands: Brand[]) => void
): Promise<void> {
  try {
    const supabase = createClient();

    const { data, error } = await supabase
      .from('brands')
      .select(`*, brand_variants(*), activations(*)`)
      .order('name');

    if (error) {
      console.error('Supabase error:', error.message);
      return;
    }

    if (!data || data.length === 0) {
      console.warn('No brands returned');
      return;
    }

    const mapped: Brand[] = data.map((b: any) => {
      const curated = getCuratedBrandAssets(b.slug);

      return {
        id: b.id,
        slug: b.slug,
        name: b.name,
        category: b.category,
        packages: b.packages || [],
        tagline: b.tagline || '',
        heroImage: { url: curated.hero || b.hero_image_url || '', alt: b.name },
        logo: curated.logo ? { url: curated.logo, alt: b.name } : undefined,
        lifestyleImages: curated.lifestyle.map((url: string) => ({ url, alt: '' })),
        venueBadges: b.venue_badges || [],
        promotionActive: b.promotion_active || false,
        bcorp: b.bcorp || false,
        videoUrl: b.video_url || '',
        brandInsights: b.brand_insights || [],
        promotions: b.promotions || [],
        haloOutlets: b.halo_outlets || [],
        caseStudies: b.case_studies || [],
        posLibrary: b.pos_library || [],
        servesData: b.serves_data || [],
        story: {
          title: b.story_title || '',
          description: b.story_description || b.tagline || '',
          founders: b.story_founders || [],
        },
        variants: (b.brand_variants || [])
          .sort((a: any, z: any) => (a.sort_order || 0) - (z.sort_order || 0))
          .map((v: any, index: number) => ({
            id: v.id,
            name: v.name,
            description: v.description || '',
            abv: v.abv || '',
            volume: v.volume || '',
            image: { url: curated.bottleShots[index] || curated.bottleShots[0] || v.image_url || '', alt: v.name },
            tastingNotes: [],
            mixerPairings: [],
            serveInspiration: '',
            taste_profile_radar: v.taste_profile_radar || null,
            product_features: v.product_features || [],
          })),
        activations: (b.activations || []).map((a: any, index: number) => ({
          id: a.id,
          title: a.title,
          date: a.date || '',
          location: a.location || '',
          description: a.description || '',
          type: a.type || 'upcoming',
          image: { url: curated.lifestyle[index % curated.lifestyle.length] || a.image_url || '', alt: a.title },
          photo1: a.photo_1_url ? { url: a.photo_1_url, alt: a.title } : undefined,
          photo2: a.photo_2_url ? { url: a.photo_2_url, alt: a.title } : undefined,
          activationType: a.activation_type || '',
          keyDates: a.key_dates || [],
          mixerPairings: a.mixer_pairings || [],
        })),
        supportPackages: [],
        serves: [],
        mediaGallery: [],
      };
    });

    onSuccess(mapped);
  } catch (err) {
    console.error('Sync failed:', err);
  }
}
