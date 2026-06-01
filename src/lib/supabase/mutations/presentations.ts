"use client";

import { createClient } from '../client';
import { Presentation } from '@/types/presentation';

export async function savePresentation(presentation: Presentation): Promise<void> {
  const supabase = createClient();
  
  // Upsert the presentation
  const { error } = await supabase
    .from('presentations')
    .upsert({
      id: presentation.id, // Using existing UUID from client
      name: presentation.name,
      brands: presentation.brands,
      slides: presentation.slides as any,
    });

  if (error) {
    console.error('Failed to save presentation:', error);
    throw new Error('Failed to save presentation');
  }
}

export async function deletePresentationAction(id: string): Promise<void> {
  const supabase = createClient();
  
  const { error } = await supabase
    .from('presentations')
    .delete()
    .eq('id', id);

  if (error) {
    console.error('Failed to delete presentation:', error);
    throw new Error('Failed to delete presentation');
  }
}
