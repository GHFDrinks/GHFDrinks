import { createClient } from '../client';
import { Brand } from '@/types/brand';
import { mockBrands } from '@/data/brands';
import { getCuratedBrandAssets } from '@/lib/brand-images';
import { STATIC_BRANDS } from '@/lib/static-brands';

export async function getBrands(): Promise<Brand[]> {
  try {
    const supabase = await createClient();
    
    const { data: brandsData, error } = await supabase
      .from('brands')
      .select(`
        *,
        brand_variants (*),
        activations (*),
        support_packages (*),
        serves (*)
      `);

    if (error || !brandsData || brandsData.length === 0) {
      console.warn('Error fetching brands from Supabase, using static fallback:', error);
      return STATIC_BRANDS;
    }

    // Map to frontend Brand type
    return brandsData.map((b: any) => {
      // Find mock brand with same slug to use as fallback
      const mock = mockBrands.find(m => m.slug === b.slug);
      const curated = getCuratedBrandAssets(b.slug);

      const heroImage = { url: curated.hero || b.hero_image_url || '', alt: b.name };
      const logo = curated.logo ? { url: curated.logo, alt: b.name + " logo" } : undefined;

      const variants = b.brand_variants && b.brand_variants.length > 0
        ? b.brand_variants
            .sort((x: any, y: any) => (x.sort_order || 0) - (y.sort_order || 0))
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
            }))
        : mock?.variants || [];

      const activations = b.activations && b.activations.length > 0
        ? b.activations.map((a: any, index: number) => ({
            id: a.id,
            title: a.title,
            date: a.date || "",
            location: a.location || "",
            description: a.description || "",
            type: (a.type as any) || "upcoming",
            image: { url: curated.lifestyle[index % curated.lifestyle.length] || a.image_url || "", alt: a.title },
            photo1: a.photo_1_url ? { url: a.photo_1_url, alt: a.title } : undefined,
            photo2: a.photo_2_url ? { url: a.photo_2_url, alt: a.title } : undefined,
            activationType: a.activation_type || "",
            keyDates: a.key_dates || [],
            mixerPairings: a.mixer_pairings || [],
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

      const lifestyleImages = curated.lifestyle.map((url: string) => ({ url, alt: '' }));

      return {
        id: b.id,
        slug: b.slug,
        name: b.name,
        category: b.category,
        packages: b.packages || [],
        tagline: b.tagline || mock?.tagline || '',
        heroImage,
        logo,
        lifestyleImages,
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
          title: b.story_title || mock?.story?.title || '',
          description: b.story_description || mock?.story?.description || mock?.tagline || '',
          founders: b.story_founders || mock?.story?.founders || [],
          image: curated.lifestyle[0] ? { url: curated.lifestyle[0], alt: b.name } : undefined,
        },
        variants,
        activations,
        supportPackages,
        serves,
        mediaGallery: mock?.mediaGallery || [],
      };
    });
  } catch (err) {
    console.error('Error in getBrands query, using static fallback:', err);
    return STATIC_BRANDS;
  }
}

export async function getBrandBySlug(slug: string): Promise<Brand | null> {
  const brands = await getBrands();
  return brands.find(b => b.slug === slug) || null;
}
