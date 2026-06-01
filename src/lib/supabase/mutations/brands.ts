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
    tagline: data.tagline,
    story_title: data.story?.title,
    story_description: data.story?.description,
  };

  let response;

  if (id && id !== 'new') {
    response = await supabase.from('brands').update(payload).eq('id', id).select().single();
  } else {
    response = await supabase.from('brands').insert(payload).select().single();
  }

  if (response.error) {
    console.error('Save brand error:', response.error);
    throw new Error('Failed to save brand');
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
