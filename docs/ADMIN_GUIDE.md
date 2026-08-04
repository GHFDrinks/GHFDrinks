# GHF Drinks — Admin Guide

This guide covers the back-office (admin panel): signing in, uploading content, and
managing brands, products, images, activations, and downloadable resources.

There are two parts:
- **[For content managers](#part-1--for-content-managers)** — day-to-day content editing.
- **[For the technical setup](#part-2--technical-setup-one-time)** — one-time Supabase config.

---

## Part 1 — For content managers

### 1. Signing in

1. Go to **`/admin`** (e.g. `https://your-site.com/admin`, or `http://localhost:3000/admin` locally).
2. You'll be redirected to the **Admin Sign In** page.
3. Enter your admin **email + password** and click **Sign In**.
4. Use **Sign Out** (top-right) when you're done.

> Don't have a login? Ask whoever set up the site to add you as an admin user
> (see [Creating admin users](#4-create-admin-users) in Part 2).

### 2. The dashboard

After signing in you land on the **GHF Admin** dashboard:
- Portfolio stats (total brands, spirits, wines, total SKUs).
- Quick links and a full brand list — click any brand to edit it.
- Top navigation: **Brands · Activations · Calendar · Events · Media · View Site · Sign Out.**

"View Site" opens the live public app so you can check your changes.

### 3. Managing brands

**Brands → list.** Search, then **Edit** (pencil) or **Delete** (trash) any brand, or click
**+ Add Brand** to create a new one.

The brand editor has five tabs. Click **Save Brand** (top-right) to publish — **your changes
aren't saved until you click Save.**

#### Tab: Core Identity
- **Brand Name**, **Slug** (the URL id — lowercase-with-dashes, auto-formatted), **Category**
  (Spirits / Wines / Packaged), **Tagline**.
- Toggles: **Certified B Corp**, **Active Promotion**.
- **Hero Image** — upload the main brand image.
- **Brand Video URL** — paste a hosted MP4 link for the brand film (optional).
- **Story Title / Story Description** — the brand's narrative.

#### Tab: Variants & Tasting (your products / SKUs)
Click **Add Variant** for each product. Per variant:
- **Name, ABV, Volume**, and a **Bottle Shot** image.
- **Tasting Profile Radar** — drag the 7 sliders (Sweet, Fruity, Fresh, Savoury, Herbal,
  Spicy, Floral, 0–5) to shape the taste chart.
- **Product Features** (3) — title + short description each.
- **Carousel Images** — up to 3 lifestyle shots.

Remove a variant with the trash icon.

#### Tab: Brand Insights
Exactly **3 stat tiles** (e.g. headline "42%", caption "YoY growth", a detail line, and an image).

#### Tab: Serves (Spirits only)
For each spirit variant, add **3 Spring/Summer** and **3 Autumn/Winter** serves — name,
recipe, three flavour descriptors, and an image each. (Wines/Packaged brands skip this.)

#### Tab: Marketing Lists
- **Promotions** — title, description, target URL.
- **Halo Outlets** — prestige / independent / national-group tabs; outlet name + image (+ optional logo).
- **Case Studies** — same tier tabs; title, outlet, summary, full text, image.
- **POS Library** (max 15) — see [Downloadable resources](#6-downloadable-resources-pos) below.

### 4. Uploading images

Anywhere you see a **file picker** (Hero, bottle shots, carousel, insight/promo/outlet/case/POS
images): click it, choose a **PNG or JPG (max 5 MB)**, and a preview appears. The image is
stored automatically. Click **Save Brand** to keep it. (Large/high-res images should be
optimised before upload.)

### 5. Activations, Calendar, Events, Media

The top-nav pages let you manage:
- **Activations** — brand activation campaigns.
- **Calendar** — the activation calendar / key dates.
- **Events** — upcoming trade/consumer events.
- **Media** — a view of uploaded media assets.

### 6. Downloadable resources (POS)

To make a POS pack downloadable on the public site:
1. Open the brand → **Marketing Lists → POS Library → Add POS Item**.
2. Fill in **Title**, **Description**, upload a **POS Image**, and paste a **Download URL** —
   a link to the hosted file (a PDF or asset-package on Supabase Storage or a CDN).
3. **Save Brand.**

On the public **Resources → POS Library → [brand]** page, items with a Download URL show a
working **Download** button; items without one show "File coming soon."

> Tip for hosting the files: in Supabase → **Storage**, create a public bucket, upload the
> PDF/zip, copy its public URL, and paste that into the Download URL field.

### 7. How changes go live

Saving writes to the shared database. Other people's apps pick up your changes:
- On their next visit / refresh, or
- Automatically when their device **reconnects** to the internet (the app re-syncs and shows
  an "Up to date" indicator).

### 8. Package membership

In the brand editor → **Core Identity → Package Membership**, tick which **Occasion**,
**Culture**, and **Product** tiles this brand should appear in (e.g. "Best of British",
"Crafted & Discerning", "Whisky"), then **Save Brand**. The home-page tiles — and the
presentation each tile launches — update to match.

The **Category** tiles (Spirits / Wines / Packaged) follow the brand's **Category** field
automatically, so you don't assign those.

---

## Part 2 — Technical setup (one-time)

### 1. Environment variables
Add to `.env.local` (and your host's env):
```bash
NEXT_PUBLIC_SUPABASE_URL=https://<project>.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=<anon key>
SUPABASE_SERVICE_ROLE_KEY=<service_role key>   # server-only, for seeding
```
Without these, the app runs on bundled static data (read-only fallback).

### 2. Create the database
In Supabase → **SQL Editor**, paste and run **`supabase/setup.sql`** (idempotent — safe to
re-run). It creates every table/column and sets Row Level Security: **public read, authenticated
write.**

### 3. Seed the initial brands
So the DB starts with the existing portfolio (otherwise the first save makes the static brands
"disappear" — see note): run **`npm run seed`**, or open **`/api/seed`** once. Both use the
service-role key.

> Why seed first: the app only falls back to the bundled brands while the DB is empty. The
> moment one brand exists in the DB, the DB becomes the source of truth.

### 4. Create admin users
Supabase → **Authentication → Users → Add user** → email + password → tick **Auto Confirm
User**. Then, in **Authentication → Providers → Email**, turn **off** "Enable Sign-ups" so only
users you add can exist.

### 5. Security notes
- `/admin` is gated by middleware (`src/middleware.ts`); unauthenticated visits redirect to
  `/admin/login`.
- Writes require an authenticated session. Reads are public (the portfolio is public).
- Keep the `service_role` key **server-side only** — never expose it in client code.

### Reference: key files
| Area | File |
|---|---|
| DB schema + RLS | `supabase/setup.sql` |
| Brand read (with static fallback) | `src/lib/supabase/queries/brands.ts`, `src/lib/supabase/clientQueries.ts` |
| Brand write | `src/lib/supabase/mutations/brands.ts` |
| Admin brand editor | `src/app/(admin)/admin/brands/[id]/page.tsx` |
| Image upload | `src/app/(admin)/admin/_lib/image-upload.ts` |
| Auth (login / middleware) | `src/app/(admin)/admin/login/page.tsx`, `src/middleware.ts` |
| Package membership (code) | `src/data/package-presentations.ts` |
| Seed data | `src/app/api/seed/route.ts`, `scratch/seed-database.js` |

### Troubleshooting
- **"Permission denied" on save** → not signed in / session expired. Sign in again. Confirm
  `setup.sql` was run (authenticated-write policies).
- **Brands look wrong / missing after first edit** → DB not seeded; run the seed step.
- **Images not showing** → re-upload; keep files under 5 MB; PNG/JPG only.
- **Editing but nothing changes on the site** → did you click **Save Brand**? Then refresh the
  public page (or reconnect).
