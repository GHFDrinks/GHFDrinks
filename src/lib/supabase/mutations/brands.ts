"use server";

import { createClient } from '../server';
import { revalidatePath } from 'next/cache';

export async function saveBrand(brandData: any) {
  const supabase = await createClient();

  const { id, ...data } = brandData;

  const payload = {
    slug: data.slug,
    name: data.name,
    category: data.category,
    packages: data.packages || [],
    tagline: data.tagline,
    story_title: data.story?.title || (data.name + ' Story'),
    story_description: data.story?.description || data.tagline || '',
    promotion_active: data.promotionActive,
    bcorp: data.bcorp || false,
    video_url: data.videoUrl || '',
    brand_insights: data.brandInsights || [],
    promotions: data.promotions || [],
    halo_outlets: data.haloOutlets || [],
    case_studies: data.caseStudies || [],
    pos_library: data.posLibrary || [],
    serves_data: data.servesData || [],
  };

  let brandId = id;
  let response;

  if (id && id !== 'new') {
    response = await supabase.from('brands').update(payload).eq('id', id).select().single();
  } else {
    response = await supabase.from('brands').insert(payload).select().single();
  }

  if (response.error) {
    console.error('Save brand error:', response.error);
    throw new Error('Failed to save brand: ' + response.error.message);
  }

  brandId = response.data.id;

  // Save variants if they are passed in
  if (data.variants && Array.isArray(data.variants)) {
    for (const v of data.variants) {
      const variantPayload = {
        brand_id: brandId,
        name: v.name,
        description: v.description || '',
        abv: v.abv || '',
        volume: v.volume || '',
        image_url: v.image?.url || '',
        taste_profile_radar: v.taste_profile_radar || null,
        product_features: v.product_features || null,
      };

      if (v.id && !v.id.includes('-v-') && v.id.length > 5) { // Check if it's a real uuid from DB
        await supabase.from('brand_variants').update(variantPayload).eq('id', v.id);
      } else {
        await supabase.from('brand_variants').insert(variantPayload);
      }
    }
  }

  revalidatePath('/admin/brands');
  revalidatePath('/brands');
  
  return response.data;
}

export async function deleteBrand(id: string) {
  const supabase = await createClient();
  
  const { error } = await supabase.from('brands').delete().eq('id', id);
  if (error) throw new Error('Failed to delete brand');

  revalidatePath('/admin/brands');
  revalidatePath('/brands');
}
