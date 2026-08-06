-- Per-variant carousel images. The admin brand editor lets you upload up to 3
-- carousel images per variant, but there was no column to persist them, so the
-- uploaded URLs were lost on save/reload. This adds the column; saveBrand writes
-- it best-effort and getBrands reads it back.
alter table public.brand_variants
  add column if not exists carousel_images jsonb default '[]'::jsonb;
