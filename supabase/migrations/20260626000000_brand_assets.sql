create table if not exists brand_assets (
  id uuid primary key default gen_random_uuid(),
  brand_slug text not null,
  asset_type text not null, -- 'hero', 'logo', 'bottle', 'lifestyle', 'activation', 'video', etc.
  asset_index int default 0,
  filename text,
  data text, -- base64 or external URL
  mime_type text,
  uploaded_at timestamptz default now(),
  constraint brand_assets_slug_type_index_key unique (brand_slug, asset_type, asset_index)
);
alter table brand_assets enable row level security;
create policy "Public read brand_assets" on brand_assets for select using (true);
create policy "Authenticated insert brand_assets" on brand_assets for insert with check (true);
create policy "Authenticated update brand_assets" on brand_assets for update using (true);
create policy "Authenticated delete brand_assets" on brand_assets for delete using (true);

-- Add JSONB columns for taste radar profile and product features on brand_variants
alter table public.brand_variants add column if not exists taste_profile_radar jsonb;
alter table public.brand_variants add column if not exists product_features jsonb;

-- Add admin back-office columns on brands table
alter table public.brands add column if not exists bcorp boolean default false;
alter table public.brands add column if not exists video_url text;
alter table public.brands add column if not exists brand_insights jsonb default '[]';
alter table public.brands add column if not exists promotions jsonb default '[]';
alter table public.brands add column if not exists halo_outlets jsonb default '[]';
alter table public.brands add column if not exists case_studies jsonb default '[]';
alter table public.brands add column if not exists pos_library jsonb default '[]';
alter table public.brands add column if not exists serves_data jsonb default '[]';

-- Add upcoming_events table
create table if not exists public.upcoming_events (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  date text,
  image_url text,
  description text,
  location text,
  ticket_url text,
  created_at timestamptz default now()
);
alter table public.upcoming_events enable row level security;
create policy "Public read upcoming_events" on public.upcoming_events for select using (true);
create policy "Authenticated insert upcoming_events" on public.upcoming_events for insert with check (true);
create policy "Authenticated update upcoming_events" on public.upcoming_events for update using (true);
create policy "Authenticated delete upcoming_events" on public.upcoming_events for delete using (true);

-- Add calendar_dates table
create table if not exists public.calendar_dates (
  id uuid primary key default gen_random_uuid(),
  name text not null unique,
  month jsonb not null, -- number or array of numbers
  day int,
  day_range int[], -- [start, end]
  relevant_brands text[] default '{}',
  created_at timestamptz default now()
);
alter table public.calendar_dates enable row level security;
create policy "Public read calendar_dates" on public.calendar_dates for select using (true);
create policy "Authenticated insert calendar_dates" on public.calendar_dates for insert with check (true);
create policy "Authenticated update calendar_dates" on public.calendar_dates for update using (true);
create policy "Authenticated delete calendar_dates" on public.calendar_dates for delete using (true);
