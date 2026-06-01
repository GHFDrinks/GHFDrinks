-- AI Sales Copilot Schema
-- Architecture for contextual presentation assistance, meeting prep, and intelligent follow-ups

-- AI Sessions (Tracks an AI context window for a specific meeting/presentation)
CREATE TABLE IF NOT EXISTS public.ai_sessions (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  presentation_id UUID REFERENCES public.presentations(id) ON DELETE SET NULL,
  client_id TEXT, -- Logical link to CRM client ID
  meeting_type TEXT, -- E.g., 'Pitch', 'Tasting', 'Review'
  status TEXT DEFAULT 'active' CHECK (status IN ('active', 'completed', 'archived')),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Recommendation Logs (Tracks AI suggestions during live presentations)
CREATE TABLE IF NOT EXISTS public.recommendation_logs (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  session_id UUID REFERENCES public.ai_sessions(id) ON DELETE CASCADE,
  slide_index INTEGER,
  suggestion_type TEXT, -- 'talking_point', 'upsell', 'objection_handling'
  content TEXT NOT NULL,
  was_used BOOLEAN DEFAULT false,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Generated Followups (AI synthesized post-meeting summaries)
CREATE TABLE IF NOT EXISTS public.generated_followups (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  session_id UUID REFERENCES public.ai_sessions(id) ON DELETE CASCADE,
  summary_text TEXT NOT NULL,
  suggested_actions JSONB, -- E.g., [{ "action": "Send Portal Link", "brand": "Maison Mirabeau" }]
  status TEXT DEFAULT 'draft' CHECK (status IN ('draft', 'sent', 'discarded')),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Sales Insights & Coaching Feedback (Post-presentation analysis)
CREATE TABLE IF NOT EXISTS public.sales_insights (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  session_id UUID REFERENCES public.ai_sessions(id) ON DELETE CASCADE,
  engagement_score INTEGER CHECK (engagement_score >= 0 AND engagement_score <= 100),
  coaching_notes TEXT,
  key_objections JSONB,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Row Level Security
ALTER TABLE public.ai_sessions ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.recommendation_logs ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.generated_followups ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.sales_insights ENABLE ROW LEVEL SECURITY;

-- Basic RLS (Users see their own AI sessions and data)
DROP POLICY IF EXISTS "Users can manage their own AI sessions" ON public.ai_sessions;
CREATE POLICY "Users can manage their own AI sessions" ON public.ai_sessions
  FOR ALL USING (auth.uid() = user_id);

DROP POLICY IF EXISTS "Users can manage their own recommendations" ON public.recommendation_logs;
CREATE POLICY "Users can manage their own recommendations" ON public.recommendation_logs
  FOR ALL USING (
    session_id IN (SELECT id FROM public.ai_sessions WHERE user_id = auth.uid())
  );

DROP POLICY IF EXISTS "Users can manage their own followups" ON public.generated_followups;
CREATE POLICY "Users can manage their own followups" ON public.generated_followups
  FOR ALL USING (
    session_id IN (SELECT id FROM public.ai_sessions WHERE user_id = auth.uid())
  );

DROP POLICY IF EXISTS "Users can view their own insights" ON public.sales_insights;
CREATE POLICY "Users can view their own insights" ON public.sales_insights
  FOR ALL USING (
    session_id IN (SELECT id FROM public.ai_sessions WHERE user_id = auth.uid())
  );
