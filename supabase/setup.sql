-- ============================================================================
-- GHF Drinks — Supabase setup (run ONCE in the Supabase SQL editor)
-- ----------------------------------------------------------------------------
-- Idempotent: safe to re-run. Creates every table/column the app + admin
-- back-office read and write, and sets Row Level Security so the (login-less)
-- admin panel can actually save.
--
-- SECURITY: reads are public (the portfolio site is public); WRITES require an
-- authenticated Supabase Auth session. The /admin back-office is gated behind a
-- login (middleware.ts + /admin/login), so only signed-in admins can write.
-- Create admin users in Supabase → Authentication → Users, and disable public
-- email sign-ups (Authentication → Providers → Email) so only trusted accounts exist.
-- ============================================================================

create extension if not exists "uuid-ossp";

-- ---------------------------------------------------------------------------
-- BRANDS
-- ---------------------------------------------------------------------------
create table if not exists public.brands (
  id uuid default uuid_generate_v4() primary key,
  slug text unique not null,
  name text not null,
  category text not null,
  tagline text,
  description text,
  story_title text,
  story_description text,
  story_founders text[],
  hero_image_url text,
  logo_url text,
  lifestyle_image_1 text,
  lifestyle_image_2 text,
  lifestyle_image_3 text,
  venue_badges jsonb default '[]',
  promotion_active boolean default false,
  bcorp boolean default false,
  video_url text,
  brand_insights jsonb default '[]',
  promotions jsonb default '[]',
  halo_outlets jsonb default '[]',
  case_studies jsonb default '[]',
  pos_library jsonb default '[]',
  serves_data jsonb default '[]',
  packages text[] default '{}',        -- occasion/culture/product package slugs this brand belongs to
  created_at timestamptz default timezone('utc', now()) not null,
  updated_at timestamptz default timezone('utc', now()) not null
);

-- Columns added over time (safe if the table already existed from schema.sql)
alter table public.brands add column if not exists description text;
alter table public.brands add column if not exists hero_image_url text;
alter table public.brands add column if not exists bcorp boolean default false;
alter table public.brands add column if not exists video_url text;
alter table public.brands add column if not exists brand_insights jsonb default '[]';
alter table public.brands add column if not exists promotions jsonb default '[]';
alter table public.brands add column if not exists halo_outlets jsonb default '[]';
alter table public.brands add column if not exists case_studies jsonb default '[]';
alter table public.brands add column if not exists pos_library jsonb default '[]';
alter table public.brands add column if not exists serves_data jsonb default '[]';
alter table public.brands add column if not exists packages text[] default '{}';

-- ---------------------------------------------------------------------------
-- BRAND VARIANTS (products / SKUs)
-- ---------------------------------------------------------------------------
create table if not exists public.brand_variants (
  id uuid default uuid_generate_v4() primary key,
  brand_id uuid references public.brands(id) on delete cascade not null,
  name text not null,
  description text,
  abv text,
  volume text,
  image_url text,
  sort_order integer default 0,
  taste_profile_radar jsonb,
  product_features jsonb,
  created_at timestamptz default timezone('utc', now()) not null
);
alter table public.brand_variants add column if not exists taste_profile_radar jsonb;
alter table public.brand_variants add column if not exists product_features jsonb;

-- ---------------------------------------------------------------------------
-- MEDIA / ASSETS
-- ---------------------------------------------------------------------------
create table if not exists public.media_assets (
  id uuid default uuid_generate_v4() primary key,
  brand_id uuid references public.brands(id) on delete cascade,
  url text not null,
  alt text,
  type text not null,
  created_at timestamptz default timezone('utc', now()) not null
);

-- Uploaded images (stored as base64 by the admin image uploader)
create table if not exists public.brand_assets (
  id uuid primary key default gen_random_uuid(),
  brand_slug text not null,
  asset_type text not null,       -- 'hero','logo','bottle','lifestyle','activation','video',...
  asset_index int default 0,
  filename text,
  data text,                      -- base64 data URL or external URL
  mime_type text,
  uploaded_at timestamptz default now(),
  constraint brand_assets_slug_type_index_key unique (brand_slug, asset_type, asset_index)
);

-- ---------------------------------------------------------------------------
-- TASTING NOTES
-- ---------------------------------------------------------------------------
create table if not exists public.tasting_notes (
  id uuid default uuid_generate_v4() primary key,
  variant_id uuid references public.brand_variants(id) on delete cascade not null,
  flavor text not null,
  intensity integer check (intensity >= 1 and intensity <= 100),
  description text
);

-- ---------------------------------------------------------------------------
-- ACTIVATIONS
-- ---------------------------------------------------------------------------
create table if not exists public.activations (
  id uuid default uuid_generate_v4() primary key,
  brand_id uuid references public.brands(id) on delete cascade not null,
  title text not null,
  date text,
  location text,
  description text,
  type text check (type in ('upcoming', 'past')),
  image_url text,
  activation_type text,
  key_dates text[] default '{}',
  mixer_pairings jsonb default '[]',
  photo_1_url text,
  photo_2_url text,
  created_at timestamptz default timezone('utc', now()) not null
);

-- ---------------------------------------------------------------------------
-- SUPPORT PACKAGES / SERVES / PRESENTATION TEMPLATES
-- ---------------------------------------------------------------------------
create table if not exists public.support_packages (
  id uuid default uuid_generate_v4() primary key,
  brand_id uuid references public.brands(id) on delete cascade not null,
  tier text not null,
  title text not null,
  investment text,
  benefits text[]
);

create table if not exists public.serves (
  id uuid default uuid_generate_v4() primary key,
  brand_id uuid references public.brands(id) on delete cascade not null,
  name text not null,
  ingredients text[],
  instructions text,
  image_url text
);

create table if not exists public.presentation_templates (
  id uuid default uuid_generate_v4() primary key,
  name text not null,
  description text,
  brand_slugs text[],
  created_at timestamptz default timezone('utc', now()) not null
);

-- ---------------------------------------------------------------------------
-- CALENDAR + EVENTS (admin-managed)
-- ---------------------------------------------------------------------------
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

create table if not exists public.calendar_dates (
  id uuid primary key default gen_random_uuid(),
  name text not null unique,
  month jsonb not null,           -- number or array of numbers
  day int,
  day_range int[],                -- [start, end]
  relevant_brands text[] default '{}',
  created_at timestamptz default now()
);

-- ---------------------------------------------------------------------------
-- PRESENTATIONS (saved by users). Kept user-scoped; needs Supabase Auth to
-- persist to the DB, otherwise the app falls back to localStorage.
-- ---------------------------------------------------------------------------
create table if not exists public.presentations (
  id uuid default uuid_generate_v4() primary key,
  user_id uuid references auth.users(id) on delete cascade,
  name text not null,
  brands text[],
  slides jsonb,
  created_at timestamptz default timezone('utc', now()) not null
);

-- ---------------------------------------------------------------------------
-- ROW LEVEL SECURITY
-- ---------------------------------------------------------------------------
alter table public.brands                 enable row level security;
alter table public.brand_variants         enable row level security;
alter table public.brand_assets           enable row level security;
alter table public.media_assets           enable row level security;
alter table public.tasting_notes          enable row level security;
alter table public.activations            enable row level security;
alter table public.support_packages       enable row level security;
alter table public.serves                 enable row level security;
alter table public.presentation_templates enable row level security;
alter table public.upcoming_events        enable row level security;
alter table public.calendar_dates         enable row level security;
alter table public.presentations          enable row level security;

-- Public READ for every content table; WRITE limited to authenticated admins.
-- Drops ALL pre-existing policies on each table first (from any earlier run) so
-- this script is the single source of truth, then creates one read + one write.
do $$
declare t text; p record;
begin
  foreach t in array array[
    'brands','brand_variants','brand_assets','media_assets','tasting_notes',
    'activations','support_packages','serves','presentation_templates',
    'upcoming_events','calendar_dates'
  ]
  loop
    for p in select policyname from pg_policies where schemaname = 'public' and tablename = t
    loop
      execute format('drop policy if exists %I on public.%I;', p.policyname, t);
    end loop;
    execute format('create policy "public_read_%1$s" on public.%1$s for select using (true);', t);
    execute format('create policy "auth_write_%1$s" on public.%1$s for all to authenticated using (true) with check (true);', t);
  end loop;

  -- Presentations stay private to their owner.
  for p in select policyname from pg_policies where schemaname = 'public' and tablename = 'presentations'
  loop
    execute format('drop policy if exists %I on public.presentations;', p.policyname);
  end loop;
end $$;

create policy "presentations_owner" on public.presentations
  for all to authenticated using (auth.uid() = user_id) with check (auth.uid() = user_id);

-- keep brands.updated_at fresh
create or replace function public.set_updated_at() returns trigger as $$
begin new.updated_at = now(); return new; end; $$ language plpgsql;
drop trigger if exists brands_set_updated_at on public.brands;
create trigger brands_set_updated_at before update on public.brands
  for each row execute function public.set_updated_at();
