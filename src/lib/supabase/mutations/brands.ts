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

  // Save variants if they are passed in. We track a temp-id -> real-id map so
  // brand-level serves_data (which is keyed by variant id) can be re-pointed to
  // the real UUIDs after an insert — otherwise a newly added/duplicated variant's
  // serves silently detach on the next load.
  const idRemap: Record<string, string> = {};
  const keptVariantIds: string[] = [];
  if (data.variants && Array.isArray(data.variants)) {
    for (let i = 0; i < data.variants.length; i++) {
      const v = data.variants[i];
      const variantPayload = {
        brand_id: brandId,
        name: v.name,
        description: v.description || '',
        abv: v.abv || '',
        volume: v.volume || '',
        image_url: v.image?.url || '',
        taste_profile_radar: v.taste_profile_radar || null,
        product_features: v.product_features || null,
        sort_order: i, // preserve the editor's ordering (was never written before)
      };

      let realId: string | undefined = v.id;
      if (v.id && !v.id.includes('-v-') && v.id.length > 5) { // real uuid from DB
        const { error } = await supabase.from('brand_variants').update(variantPayload).eq('id', v.id);
        if (error) console.error('Variant update error:', error);
      } else {
        const { data: inserted, error } = await supabase
          .from('brand_variants')
          .insert(variantPayload)
          .select('id')
          .single();
        if (error) console.error('Variant insert error:', error);
        if (inserted?.id) {
          realId = inserted.id;
          idRemap[v.id] = inserted.id; // temp id -> real id
        }
      }

      if (realId) keptVariantIds.push(realId);

      // Carousel images live in an optional column added by a later migration.
      // Persist best-effort so saves still succeed if the migration hasn't been
      // applied yet (the error is swallowed rather than aborting the whole save).
      if (realId && Array.isArray(v.carousel_images)) {
        const { error: carouselErr } = await supabase
          .from('brand_variants')
          .update({ carousel_images: v.carousel_images })
          .eq('id', realId);
        if (carouselErr) {
          console.warn('carousel_images not persisted — apply the carousel_images migration:', carouselErr.message);
        }
      }
    }
  }

  // Delete variants the admin removed in the editor. removeVariant only filtered
  // them from local state, so without this they lingered as orphan DB rows.
  const { data: existingVariants } = await supabase
    .from('brand_variants')
    .select('id')
    .eq('brand_id', brandId);
  const orphanIds = (existingVariants || [])
    .map((r: any) => r.id)
    .filter((existingId: string) => !keptVariantIds.includes(existingId));
  if (orphanIds.length > 0) {
    await supabase.from('brand_variants').delete().in('id', orphanIds);
  }

  // Re-point serves_data from temp variant ids to the freshly-inserted real ids
  // and persist the corrected blob (the first brand upsert stored temp ids).
  if (Object.keys(idRemap).length > 0 && Array.isArray(data.servesData)) {
    const fixedServes = data.servesData.map((s: any) =>
      s && idRemap[s.variantSlug] ? { ...s, variantSlug: idRemap[s.variantSlug] } : s
    );
    await supabase.from('brands').update({ serves_data: fixedServes }).eq('id', brandId);
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
