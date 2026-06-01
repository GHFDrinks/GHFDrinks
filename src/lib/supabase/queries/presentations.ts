import { createClient } from '../client'; // Using client for LocalStorage parity fallback if needed
import { Presentation } from '@/types/presentation';

// Get presentations from Supabase
export async function getPresentations(): Promise<Presentation[]> {
  const supabase = createClient();
  
  const { data, error } = await supabase
    .from('presentations')
    .select('*')
    .order('created_at', { ascending: false });

  if (error) {
    console.error('Error fetching presentations:', error);
    return [];
  }

  return data.map((p: any) => ({
    id: p.id,
    name: p.name,
    dateCreated: p.created_at || new Date().toISOString(),
    brands: p.brands || [],
    slides: p.slides || [],
  }));
}

export async function getPresentationById(id: string): Promise<Presentation | null> {
  const supabase = createClient();
  
  const { data, error } = await supabase
    .from('presentations')
    .select('*')
    .eq('id', id)
    .single();

  if (error || !data) return null;

  return {
    id: data.id,
    name: data.name,
    dateCreated: data.created_at || new Date().toISOString(),
    brands: data.brands || [],
    slides: data.slides || [],
  };
}
