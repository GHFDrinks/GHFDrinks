-- Collaboration & Team Workspace Architecture
-- Designed for multi-user presentation management and enterprise sales teams

-- Workspaces (E.g. "UK Sales Team", "Global Key Accounts")
CREATE TABLE public.workspaces (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  name TEXT NOT NULL,
  description TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Workspace Members & Roles
CREATE TABLE public.workspace_members (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  workspace_id UUID REFERENCES public.workspaces(id) ON DELETE CASCADE,
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  role TEXT CHECK (role IN ('owner', 'admin', 'editor', 'viewer')),
  joined_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
  UNIQUE(workspace_id, user_id)
);

-- Presentations (Update to link to workspaces)
-- Assuming presentations table exists, we add a column (pseudo-code ALTER if it existed, but we'll define a mapping)
CREATE TABLE public.workspace_presentations (
  workspace_id UUID REFERENCES public.workspaces(id) ON DELETE CASCADE,
  presentation_id UUID REFERENCES public.presentations(id) ON DELETE CASCADE,
  added_by UUID REFERENCES auth.users(id),
  added_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
  PRIMARY KEY (workspace_id, presentation_id)
);

-- Internal Review Comments
CREATE TABLE public.presentation_comments (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  presentation_id UUID REFERENCES public.presentations(id) ON DELETE CASCADE,
  user_id UUID REFERENCES auth.users(id),
  slide_index INTEGER, -- Null means presentation-level comment
  content TEXT NOT NULL,
  status TEXT CHECK (status IN ('open', 'resolved', 'ignored')) DEFAULT 'open',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Realtime Collaborative Sessions (Ephemeral state tracking for presence)
-- In Supabase, this is often handled purely in-memory via Realtime Presence,
-- but a log can be kept for auditing who edited what when.
CREATE TABLE public.collaboration_logs (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  workspace_id UUID REFERENCES public.workspaces(id) ON DELETE CASCADE,
  presentation_id UUID REFERENCES public.presentations(id) ON DELETE CASCADE,
  user_id UUID REFERENCES auth.users(id),
  action TEXT NOT NULL, -- 'joined', 'edited_slide', 'left'
  timestamp TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Shared Asset Libraries
CREATE TABLE public.workspace_assets (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  workspace_id UUID REFERENCES public.workspaces(id) ON DELETE CASCADE,
  asset_url TEXT NOT NULL,
  asset_type TEXT CHECK (asset_type IN ('image', 'video', 'pdf', 'template')),
  name TEXT,
  uploaded_by UUID REFERENCES auth.users(id),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- RLS Policies
ALTER TABLE public.workspaces ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.workspace_members ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.workspace_presentations ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.presentation_comments ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.collaboration_logs ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.workspace_assets ENABLE ROW LEVEL SECURITY;

-- Allow authenticated users to see workspaces they are members of
CREATE POLICY "View joined workspaces" ON public.workspaces 
  FOR SELECT USING (
    id IN (SELECT workspace_id FROM public.workspace_members WHERE user_id = auth.uid())
  );

-- Admins/Owners can manage workspaces (Simplified policy for now)
CREATE POLICY "Manage workspaces" ON public.workspaces 
  FOR ALL USING (auth.role() = 'authenticated');
  
CREATE POLICY "Team Access" ON public.workspace_members FOR ALL USING (auth.role() = 'authenticated');
CREATE POLICY "Team Access" ON public.workspace_presentations FOR ALL USING (auth.role() = 'authenticated');
CREATE POLICY "Team Access" ON public.presentation_comments FOR ALL USING (auth.role() = 'authenticated');
CREATE POLICY "Team Access" ON public.collaboration_logs FOR ALL USING (auth.role() = 'authenticated');
CREATE POLICY "Team Access" ON public.workspace_assets FOR ALL USING (auth.role() = 'authenticated');
