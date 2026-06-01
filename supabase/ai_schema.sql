-- AI Recommendation & Intelligence Architecture
-- Designed for contextual presentation curation and sales intelligence

-- Venue Profiles (Used for contextual recommendations)
CREATE TABLE public.venue_profiles (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  name TEXT NOT NULL,
  category TEXT CHECK (category IN ('Cocktail Bar', 'Luxury Hotel', 'Restaurant', 'Rooftop', 'Premium Retail', 'Members Club', 'Event Venue')),
  average_spend_tier TEXT,
  preferred_categories TEXT[], -- E.g., ['Spirits', 'Low-ABV', 'Wine']
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Client Preferences (Learned behavior over time)
CREATE TABLE public.client_preferences (
  client_id UUID REFERENCES public.clients(id) ON DELETE CASCADE PRIMARY KEY,
  favorite_brands UUID[], -- References to brand IDs
  ignored_brands UUID[],
  preferred_activation_types TEXT[],
  avg_presentation_completion_rate DECIMAL(5,2),
  seasonal_bias TEXT, -- E.g., 'Summer Rosé Focus', 'Winter Dark Spirits'
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- AI Recommendation Events (Audit log of what the engine suggested and why)
CREATE TABLE public.recommendation_events (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  client_id UUID REFERENCES public.clients(id) ON DELETE CASCADE,
  user_id UUID REFERENCES auth.users(id),
  context_type TEXT NOT NULL, -- 'meeting_prep', 'seasonal_pitch', 'venue_match'
  recommended_brands UUID[],
  recommended_activations UUID[],
  confidence_score DECIMAL(5,2),
  reasoning JSONB, -- Explainability payload (e.g., {"matched_tier": true, "seasonal": "summer"})
  was_accepted BOOLEAN DEFAULT false,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Presentation Performance Scoring (Feedback loop for AI)
CREATE TABLE public.ai_presentation_scores (
  presentation_id UUID REFERENCES public.presentations(id) ON DELETE CASCADE PRIMARY KEY,
  engagement_potential DECIMAL(5,2),
  portfolio_balance DECIMAL(5,2),
  seasonal_relevance DECIMAL(5,2),
  client_fit_score DECIMAL(5,2),
  overall_score DECIMAL(5,2),
  insights TEXT[],
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Enable RLS
ALTER TABLE public.venue_profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.client_preferences ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.recommendation_events ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.ai_presentation_scores ENABLE ROW LEVEL SECURITY;

-- Policies for Authenticated Users (Sales Reps / Admins)
CREATE POLICY "AI Access for Authenticated Users" ON public.venue_profiles FOR ALL USING (auth.role() = 'authenticated');
CREATE POLICY "AI Access for Authenticated Users" ON public.client_preferences FOR ALL USING (auth.role() = 'authenticated');
CREATE POLICY "AI Access for Authenticated Users" ON public.recommendation_events FOR ALL USING (auth.role() = 'authenticated');
CREATE POLICY "AI Access for Authenticated Users" ON public.ai_presentation_scores FOR ALL USING (auth.role() = 'authenticated');
