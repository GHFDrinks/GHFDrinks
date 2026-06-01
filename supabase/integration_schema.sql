-- GHF Drinks Platform Integration & Extensibility Architecture Schema
-- Contains schemas for API keys, integrations, webhooks, automation, audits, and health monitoring.

-- Enable UUID extension (if not already enabled)
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- 1. Integrations Table
CREATE TABLE public.integrations (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  name TEXT NOT NULL,
  category TEXT NOT NULL CHECK (category IN ('CRM', 'Communication', 'ERP', 'Marketing', 'Collaboration', 'Workspace')),
  provider_type TEXT NOT NULL UNIQUE, -- 'salesforce', 'hubspot', 'dynamics', 'google_workspace', 'm365', 'slack', 'email', 'erp'
  status TEXT NOT NULL CHECK (status IN ('active', 'inactive', 'error')) DEFAULT 'inactive',
  config JSONB DEFAULT '{}'::jsonb,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 2. Connector Configs Table
CREATE TABLE public.connector_configs (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  integration_id UUID REFERENCES public.integrations(id) ON DELETE CASCADE NOT NULL,
  sync_direction TEXT NOT NULL CHECK (sync_direction IN ('inbound', 'outbound', 'bidirectional')) DEFAULT 'bidirectional',
  sync_interval_minutes INTEGER DEFAULT 60,
  mapping_rules JSONB DEFAULT '{}'::jsonb, -- Field mapping mappings
  auth_config JSONB DEFAULT '{}'::jsonb, -- Encrypted credentials or OAuth info
  last_synced_at TIMESTAMP WITH TIME ZONE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 3. API Keys Table
CREATE TABLE public.api_keys (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  key_name TEXT NOT NULL,
  key_prefix TEXT NOT NULL, -- e.g., 'ghf_live_'
  hashed_key TEXT NOT NULL UNIQUE,
  scopes TEXT[] DEFAULT '{}'::TEXT[], -- e.g., ['read:presentations', 'write:crm']
  status TEXT NOT NULL CHECK (status IN ('active', 'revoked')) DEFAULT 'active',
  expires_at TIMESTAMP WITH TIME ZONE,
  last_used_at TIMESTAMP WITH TIME ZONE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 4. Webhooks Table
CREATE TABLE public.webhooks (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  name TEXT NOT NULL,
  url TEXT NOT NULL,
  secret_token TEXT NOT NULL,
  status TEXT NOT NULL CHECK (status IN ('active', 'inactive')) DEFAULT 'active',
  events TEXT[] DEFAULT '{}'::TEXT[], -- e.g., ['presentation_created', 'client_viewed_portal']
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 5. Workflow Definitions (Automation Builder)
CREATE TABLE public.workflow_definitions (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  name TEXT NOT NULL,
  description TEXT,
  trigger_event TEXT NOT NULL, -- e.g., 'client_viewed_portal'
  trigger_conditions JSONB DEFAULT '{}'::jsonb,
  actions JSONB NOT NULL, -- Array of execution steps
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 6. Automation Runs Table
CREATE TABLE public.automation_runs (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  workflow_id UUID REFERENCES public.workflow_definitions(id) ON DELETE CASCADE NOT NULL,
  status TEXT NOT NULL CHECK (status IN ('success', 'failed', 'running', 'queued')) DEFAULT 'queued',
  trigger_payload JSONB DEFAULT '{}'::jsonb,
  error_message TEXT,
  started_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
  completed_at TIMESTAMP WITH TIME ZONE
);

-- 7. Event Logs Table (Event Bus Log)
CREATE TABLE public.event_logs (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  event_type TEXT NOT NULL, -- 'presentation_created', 'client_viewed_portal', etc.
  source TEXT NOT NULL, -- 'platform', 'webhook', 'crm'
  payload JSONB DEFAULT '{}'::jsonb,
  processed_status TEXT NOT NULL CHECK (processed_status IN ('pending', 'processed', 'failed')) DEFAULT 'pending',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 8. Sync Jobs Table (Data Reconciliation and Incremental Sync)
CREATE TABLE public.sync_jobs (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  integration_id UUID REFERENCES public.integrations(id) ON DELETE CASCADE NOT NULL,
  sync_type TEXT NOT NULL CHECK (sync_type IN ('incremental', 'full', 'realtime')) DEFAULT 'incremental',
  status TEXT NOT NULL CHECK (status IN ('success', 'failed', 'running')) DEFAULT 'running',
  records_processed INTEGER DEFAULT 0,
  records_failed INTEGER DEFAULT 0,
  conflict_count INTEGER DEFAULT 0,
  details JSONB DEFAULT '{}'::jsonb,
  started_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
  completed_at TIMESTAMP WITH TIME ZONE
);

-- 9. Platform Audits Table (Security Audits)
CREATE TABLE public.platform_audits (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  user_id UUID REFERENCES auth.users(id) ON DELETE SET NULL,
  action TEXT NOT NULL, -- 'api_key_created', 'integration_updated', etc.
  ip_address TEXT,
  details JSONB DEFAULT '{}'::jsonb,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 10. Integration Health Table
CREATE TABLE public.integration_health (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  integration_id UUID REFERENCES public.integrations(id) ON DELETE CASCADE NOT NULL,
  uptime_percentage DECIMAL(5,2) DEFAULT 100.00,
  latency_ms INTEGER DEFAULT 0,
  error_rate DECIMAL(5,2) DEFAULT 0.00,
  last_checked_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- RLS Policies
ALTER TABLE public.integrations ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.connector_configs ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.api_keys ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.webhooks ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.workflow_definitions ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.automation_runs ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.event_logs ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.sync_jobs ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.platform_audits ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.integration_health ENABLE ROW LEVEL SECURITY;

-- Allow authenticated administrative/executive users full access
CREATE POLICY "Manage integrations" ON public.integrations FOR ALL USING (auth.role() = 'authenticated');
CREATE POLICY "Manage connector configs" ON public.connector_configs FOR ALL USING (auth.role() = 'authenticated');
CREATE POLICY "Manage api keys" ON public.api_keys FOR ALL USING (auth.role() = 'authenticated');
CREATE POLICY "Manage webhooks" ON public.webhooks FOR ALL USING (auth.role() = 'authenticated');
CREATE POLICY "Manage workflows" ON public.workflow_definitions FOR ALL USING (auth.role() = 'authenticated');
CREATE POLICY "View automation runs" ON public.automation_runs FOR ALL USING (auth.role() = 'authenticated');
CREATE POLICY "View event logs" ON public.event_logs FOR ALL USING (auth.role() = 'authenticated');
CREATE POLICY "View sync jobs" ON public.sync_jobs FOR ALL USING (auth.role() = 'authenticated');
CREATE POLICY "View audits" ON public.platform_audits FOR ALL USING (auth.role() = 'authenticated');
CREATE POLICY "View integration health" ON public.integration_health FOR ALL USING (auth.role() = 'authenticated');
