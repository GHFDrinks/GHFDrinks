"use server";

import { createClient } from '../client';
import { Database } from '../types/database';
import { Brand } from '@/types/brand';

export async function getBrands(): Promise<Brand[]> {
  const supabase = await createClient();
  
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
    console.error('Error fetching brands:', error);
    return [];
  }

  // Map to frontend Brand type
  return brandsData.map((b: any) => {
    const heroImage = b.media_assets?.find((m: any) => m.type === 'hero') || { url: '', alt: '' };
    const storyImage = b.media_assets?.find((m: any) => m.type === 'story') || null;

    return {
      id: b.id,
      slug: b.slug,
      name: b.name,
      category: b.category,
      tagline: b.tagline || '',
      heroImage: { url: heroImage.url, alt: heroImage.alt || '' },
      story: {
        title: b.story_title || '',
        description: b.story_description || '',
        founders: b.story_founders || [],
        image: storyImage ? { url: storyImage.url, alt: storyImage.alt || '' } : undefined,
      },
      variants: (b.brand_variants || []).map((v: any) => ({
        id: v.id,
        name: v.name,
        description: v.description || '',
        abv: v.abv || '',
        volume: v.volume || '',
        image: { url: v.image_url || '', alt: v.name },
      })),
      activations: (b.activations || []).map((a: any) => ({
        id: a.id,
        title: a.title,
        date: a.date || '',
        location: a.location || '',
        description: a.description || '',
        type: (a.type as any) || 'upcoming',
        image: { url: a.image_url || '', alt: a.title },
      })),
      supportPackages: (b.support_packages || []).map((p: any) => ({
        id: p.id,
        tier: p.tier as any,
        title: p.title,
        investment: p.investment || '',
        benefits: p.benefits || [],
      })),
      serves: (b.serves || []).map((s: any) => ({
        id: s.id,
        name: s.name,
        ingredients: s.ingredients || [],
        instructions: s.instructions || '',
        image: s.image_url ? { url: s.image_url, alt: s.name } : undefined,
      })),
      mediaGallery: b.media_assets?.filter((m: any) => m.type === 'gallery').map((m: any) => ({
        id: m.id,
        url: m.url,
        alt: m.alt || '',
      })) || [],
    };
  });
}

export async function getBrandBySlug(slug: string): Promise<Brand | null> {
  const brands = await getBrands();
  return brands.find(b => b.slug === slug) || null;
}
