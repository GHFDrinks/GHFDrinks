-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Brands Table
CREATE TABLE public.brands (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  slug TEXT UNIQUE NOT NULL,
  name TEXT NOT NULL,
  category TEXT NOT NULL,
  tagline TEXT,
  description TEXT,
  story_title TEXT,
  story_description TEXT,
  story_founders TEXT[],
  logo_url TEXT,
  lifestyle_image_1 TEXT,
  lifestyle_image_2 TEXT,
  lifestyle_image_3 TEXT,
  venue_badges JSONB DEFAULT '[]',
  promotion_active BOOLEAN DEFAULT false,
  bcorp BOOLEAN DEFAULT false,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Media Assets
CREATE TABLE public.media_assets (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  brand_id UUID REFERENCES public.brands(id) ON DELETE CASCADE,
  url TEXT NOT NULL,
  alt TEXT,
  type TEXT NOT NULL, -- 'hero', 'story', 'variant', 'activation', 'serve', 'gallery'
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Brand Variants
CREATE TABLE public.brand_variants (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  brand_id UUID REFERENCES public.brands(id) ON DELETE CASCADE NOT NULL,
  name TEXT NOT NULL,
  description TEXT,
  abv TEXT,
  volume TEXT,
  image_url TEXT,
  sort_order INTEGER DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Tasting Notes
CREATE TABLE public.tasting_notes (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  variant_id UUID REFERENCES public.brand_variants(id) ON DELETE CASCADE NOT NULL,
  flavor TEXT NOT NULL,
  intensity INTEGER CHECK (intensity >= 1 AND intensity <= 100),
  description TEXT
);

-- Activations
CREATE TABLE public.activations (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  brand_id UUID REFERENCES public.brands(id) ON DELETE CASCADE NOT NULL,
  title TEXT NOT NULL,
  date TEXT,
  location TEXT,
  description TEXT,
  type TEXT CHECK (type IN ('upcoming', 'past')),
  image_url TEXT,
  activation_type TEXT,
  key_dates TEXT[] DEFAULT '{}',
  mixer_pairings JSONB DEFAULT '[]',
  photo_1_url TEXT,
  photo_2_url TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Support Packages
CREATE TABLE public.support_packages (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  brand_id UUID REFERENCES public.brands(id) ON DELETE CASCADE NOT NULL,
  tier TEXT NOT NULL,
  title TEXT NOT NULL,
  investment TEXT,
  benefits TEXT[]
);

-- Serves / Pairings
CREATE TABLE public.serves (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  brand_id UUID REFERENCES public.brands(id) ON DELETE CASCADE NOT NULL,
  name TEXT NOT NULL,
  ingredients TEXT[],
  instructions TEXT,
  image_url TEXT
);

-- Presentation Templates
CREATE TABLE public.presentation_templates (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  name TEXT NOT NULL,
  description TEXT,
  brand_slugs TEXT[],
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Presentations (Saved by users)
CREATE TABLE public.presentations (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  name TEXT NOT NULL,
  brands TEXT[], -- Array of brand IDs
  slides JSONB, -- Stored as JSONB for dynamic slide ordering
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- RLS Policies
ALTER TABLE public.brands ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.brand_variants ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.media_assets ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.tasting_notes ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.activations ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.support_packages ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.serves ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.presentation_templates ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.presentations ENABLE ROW LEVEL SECURITY;

-- Allow read access to all users (for public portfolio)
CREATE POLICY "Allow public read access on brands" ON public.brands FOR SELECT USING (true);
CREATE POLICY "Allow public read access on brand_variants" ON public.brand_variants FOR SELECT USING (true);
CREATE POLICY "Allow public read access on media_assets" ON public.media_assets FOR SELECT USING (true);
CREATE POLICY "Allow public read access on tasting_notes" ON public.tasting_notes FOR SELECT USING (true);
CREATE POLICY "Allow public read access on activations" ON public.activations FOR SELECT USING (true);
CREATE POLICY "Allow public read access on support_packages" ON public.support_packages FOR SELECT USING (true);
CREATE POLICY "Allow public read access on serves" ON public.serves FOR SELECT USING (true);
CREATE POLICY "Allow public read access on presentation_templates" ON public.presentation_templates FOR SELECT USING (true);

-- Presentations are private to the user
CREATE POLICY "Users can manage their own presentations" ON public.presentations FOR ALL USING (auth.uid() = user_id);

-- Write access requires authenticated role (Admin)
CREATE POLICY "Admins can insert brands" ON public.brands FOR INSERT WITH CHECK (auth.role() = 'authenticated');
CREATE POLICY "Admins can update brands" ON public.brands FOR UPDATE USING (auth.role() = 'authenticated');
CREATE POLICY "Admins can delete brands" ON public.brands FOR DELETE USING (auth.role() = 'authenticated');

-- Repeat for other tables...
