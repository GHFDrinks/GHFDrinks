"use server";

import { createClient } from '../client';
import { Database } from '../types/database';
import { Brand } from '@/types/brand';
import { mockBrands } from '@/data/brands';

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
    // Find mock brand with same slug to use as fallback
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
}

export async function getBrandBySlug(slug: string): Promise<Brand | null> {
  const brands = await getBrands();
  return brands.find(b => b.slug === slug) || null;
}
