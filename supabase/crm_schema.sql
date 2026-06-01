-- CRM System Architecture
-- Built for Salesforce abstraction and luxury presentation tracking

-- Clients (Accounts)
CREATE TABLE public.clients (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  name TEXT NOT NULL,
  industry TEXT,
  tier TEXT CHECK (tier IN ('Platinum', 'Gold', 'Silver', 'Standard')),
  account_manager_id UUID REFERENCES auth.users(id),
  salesforce_id TEXT UNIQUE,
  last_contacted_at TIMESTAMP WITH TIME ZONE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Meetings / Activity Events
CREATE TABLE public.meetings (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  client_id UUID REFERENCES public.clients(id) ON DELETE CASCADE,
  title TEXT NOT NULL,
  meeting_date TIMESTAMP WITH TIME ZONE NOT NULL,
  location TEXT,
  notes TEXT,
  salesforce_event_id TEXT UNIQUE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Opportunities
CREATE TABLE public.opportunities (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  client_id UUID REFERENCES public.clients(id) ON DELETE CASCADE,
  title TEXT NOT NULL,
  stage TEXT CHECK (stage IN ('Discovery', 'Presentation', 'Negotiation', 'Closed Won', 'Closed Lost')),
  amount DECIMAL(10, 2),
  probability INTEGER CHECK (probability >= 0 AND probability <= 100),
  expected_close_date DATE,
  salesforce_opp_id TEXT UNIQUE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Presentation Sessions (Tracking presentation usage during meetings)
CREATE TABLE public.presentation_sessions (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  meeting_id UUID REFERENCES public.meetings(id) ON DELETE SET NULL,
  presentation_id UUID REFERENCES public.presentations(id) ON DELETE CASCADE,
  client_id UUID REFERENCES public.clients(id) ON DELETE CASCADE,
  duration_seconds INTEGER,
  brands_shown TEXT[],
  started_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
  completed_at TIMESTAMP WITH TIME ZONE
);

-- Follow-Up Tasks
CREATE TABLE public.follow_up_tasks (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  client_id UUID REFERENCES public.clients(id) ON DELETE CASCADE,
  title TEXT NOT NULL,
  description TEXT,
  due_date TIMESTAMP WITH TIME ZONE,
  status TEXT CHECK (status IN ('Pending', 'In Progress', 'Completed')),
  assigned_to UUID REFERENCES auth.users(id),
  salesforce_task_id TEXT UNIQUE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Engagement Scores
CREATE TABLE public.engagement_scores (
  client_id UUID REFERENCES public.clients(id) ON DELETE CASCADE PRIMARY KEY,
  total_score INTEGER DEFAULT 0,
  last_interaction_date TIMESTAMP WITH TIME ZONE,
  top_brands_interest TEXT[],
  portal_revisits INTEGER DEFAULT 0,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Activity Feed (Audit log & Timeline)
CREATE TABLE public.activity_events (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  client_id UUID REFERENCES public.clients(id) ON DELETE CASCADE,
  user_id UUID REFERENCES auth.users(id) ON DELETE SET NULL,
  event_type TEXT NOT NULL, -- 'meeting_logged', 'presentation_viewed', 'note_added', 'opportunity_advanced'
  description TEXT NOT NULL,
  metadata JSONB,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- RLS Policies
ALTER TABLE public.clients ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.meetings ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.opportunities ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.presentation_sessions ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.follow_up_tasks ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.engagement_scores ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.activity_events ENABLE ROW LEVEL SECURITY;

-- Allow authenticated users to manage CRM data
CREATE POLICY "CRM Access for Authenticated Users" ON public.clients FOR ALL USING (auth.role() = 'authenticated');
CREATE POLICY "CRM Access for Authenticated Users" ON public.meetings FOR ALL USING (auth.role() = 'authenticated');
CREATE POLICY "CRM Access for Authenticated Users" ON public.opportunities FOR ALL USING (auth.role() = 'authenticated');
CREATE POLICY "CRM Access for Authenticated Users" ON public.presentation_sessions FOR ALL USING (auth.role() = 'authenticated');
CREATE POLICY "CRM Access for Authenticated Users" ON public.follow_up_tasks FOR ALL USING (auth.role() = 'authenticated');
CREATE POLICY "CRM Access for Authenticated Users" ON public.engagement_scores FOR ALL USING (auth.role() = 'authenticated');
CREATE POLICY "CRM Access for Authenticated Users" ON public.activity_events FOR ALL USING (auth.role() = 'authenticated');
