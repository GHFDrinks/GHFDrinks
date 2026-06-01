export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export interface Database {
  public: {
    Tables: {
      brands: {
        Row: {
          id: string
          slug: string
          name: string
          category: string
          tagline: string | null
          description: string | null
          story_title: string | null
          story_description: string | null
          story_founders: string[] | null
          created_at: string
          updated_at: string
        }
        Insert: Omit<Database['public']['Tables']['brands']['Row'], 'id' | 'created_at' | 'updated_at'>
        Update: Partial<Database['public']['Tables']['brands']['Insert']>
      }
      brand_variants: {
        Row: {
          id: string
          brand_id: string
          name: string
          description: string | null
          abv: string | null
          volume: string | null
          image_url: string | null
          sort_order: number
          created_at: string
        }
        Insert: Omit<Database['public']['Tables']['brand_variants']['Row'], 'id' | 'created_at'>
        Update: Partial<Database['public']['Tables']['brand_variants']['Insert']>
      }
      media_assets: {
        Row: {
          id: string
          brand_id: string | null
          url: string
          alt: string | null
          type: string
          created_at: string
        }
      }
      activations: {
        Row: {
          id: string
          brand_id: string
          title: string
          date: string | null
          location: string | null
          description: string | null
          type: string | null
          image_url: string | null
          created_at: string
        }
      }
      support_packages: {
        Row: {
          id: string
          brand_id: string
          tier: string
          title: string
          investment: string | null
          benefits: string[] | null
        }
      }
      serves: {
        Row: {
          id: string
          brand_id: string
          name: string
          ingredients: string[] | null
          instructions: string | null
          image_url: string | null
        }
      }
      presentations: {
        Row: {
          id: string
          user_id: string | null
          name: string
          brands: string[] | null
          slides: Json | null
          created_at: string
        }
        Insert: Omit<Database['public']['Tables']['presentations']['Row'], 'id' | 'created_at'>
        Update: Partial<Database['public']['Tables']['presentations']['Insert']>
      }
    }
  }
}
