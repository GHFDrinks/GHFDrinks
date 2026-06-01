-- Enterprise Analytics & Executive Insight Platform Schema

-- Analytics Events (Granular event tracking for deep engagement insights)
CREATE TABLE IF NOT EXISTS public.analytics_events (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  user_id UUID REFERENCES auth.users(id) ON DELETE SET NULL,
  session_id UUID, -- Optional link to ai_sessions or presentation sessions
  event_type TEXT NOT NULL, -- 'presentation_view', 'slide_view', 'brand_interaction', 'portal_visit'
  resource_id TEXT, -- ID of the presentation, brand, or slide
  metadata JSONB DEFAULT '{}'::jsonb, -- Additional context (duration, scroll depth, etc.)
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Performance Scores (Aggregated scores for quick executive dashboard rendering)
CREATE TABLE IF NOT EXISTS public.performance_scores (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  entity_type TEXT NOT NULL, -- 'brand', 'team', 'presentation', 'activation'
  entity_id TEXT NOT NULL,
  period TEXT NOT NULL, -- 'daily', 'weekly', 'monthly', 'quarterly'
  period_date DATE NOT NULL,
  engagement_score INTEGER,
  conversion_rate NUMERIC,
  momentum_index NUMERIC, -- AI-calculated trend vector
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
  UNIQUE(entity_type, entity_id, period, period_date)
);

-- Trend Analysis (AI-generated insights stored for reporting)
CREATE TABLE IF NOT EXISTS public.trend_analysis (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  insight_category TEXT NOT NULL, -- 'growth', 'risk', 'opportunity'
  title TEXT NOT NULL,
  description TEXT,
  impact_level TEXT CHECK (impact_level IN ('high', 'medium', 'low')),
  related_entities JSONB, -- Array of brand/team IDs
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Executive Reports (Saved/Generated report snapshots)
CREATE TABLE IF NOT EXISTS public.executive_reports (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  author_id UUID REFERENCES auth.users(id) ON DELETE SET NULL,
  title TEXT NOT NULL,
  report_type TEXT, -- 'portfolio_review', 'team_performance', 'activation_roi'
  data_snapshot JSONB NOT NULL,
  pdf_url TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Enable RLS
ALTER TABLE public.analytics_events ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.performance_scores ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.trend_analysis ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.executive_reports ENABLE ROW LEVEL SECURITY;

-- Analytics Policies
DROP POLICY IF EXISTS "Anyone can insert events" ON public.analytics_events;
CREATE POLICY "Anyone can insert events" ON public.analytics_events
  FOR INSERT WITH CHECK (true);

DROP POLICY IF EXISTS "Authorized users can view events" ON public.analytics_events;
CREATE POLICY "Authorized users can view events" ON public.analytics_events
  FOR SELECT USING (auth.role() = 'authenticated');

DROP POLICY IF EXISTS "Authorized users can view performance" ON public.performance_scores;
CREATE POLICY "Authorized users can view performance" ON public.performance_scores
  FOR SELECT USING (auth.role() = 'authenticated');

DROP POLICY IF EXISTS "Authorized users can view trends" ON public.trend_analysis;
CREATE POLICY "Authorized users can view trends" ON public.trend_analysis
  FOR SELECT USING (auth.role() = 'authenticated');

DROP POLICY IF EXISTS "Users can view executive reports" ON public.executive_reports;
CREATE POLICY "Users can view executive reports" ON public.executive_reports
  FOR SELECT USING (auth.role() = 'authenticated');
