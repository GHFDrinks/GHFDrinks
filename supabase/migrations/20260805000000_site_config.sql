-- Editable site configuration (key/value JSON). Currently stores the home
-- landing layout ("home_landing") that the admin manages from the back office.
-- Mirrors the brands table's RLS: anyone can read (the public site renders it),
-- only authenticated admins can write.

CREATE TABLE IF NOT EXISTS public.site_config (
  key TEXT PRIMARY KEY,
  value JSONB NOT NULL DEFAULT '{}'::jsonb,
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT timezone('utc'::text, now())
);

ALTER TABLE public.site_config ENABLE ROW LEVEL SECURITY;

-- Public read (the home page renders this on the public site).
CREATE POLICY "Allow public read access on site_config"
  ON public.site_config FOR SELECT USING (true);

-- Write access requires an authenticated admin.
CREATE POLICY "Admins can insert site_config"
  ON public.site_config FOR INSERT WITH CHECK (auth.role() = 'authenticated');
CREATE POLICY "Admins can update site_config"
  ON public.site_config FOR UPDATE USING (auth.role() = 'authenticated');
