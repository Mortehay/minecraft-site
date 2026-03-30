-- ============================================================
-- Epic MC – Local Development Database Init
-- This mirrors the Supabase schema so local dev matches production.
-- Run automatically on first `docker compose up`.
-- ============================================================



-- ────────────────────────────────────────────────────────────
-- auth.users stub (Supabase manages this in production)
-- In local dev we create a minimal compatible version.
-- ────────────────────────────────────────────────────────────
-- Fix collation mismatch and enable UUID support
ALTER DATABASE postgres REFRESH COLLATION VERSION;
CREATE EXTENSION IF NOT EXISTS "uuid-ossp"; 

-- auth.users is now managed directly by the official Supabase gotrue container!
-- (The stub was removed to prevent migration collision with real Supabase Auth)

-- ────────────────────────────────────────────────────────────
-- public.profiles  (user display info + role)
-- ────────────────────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS public.profiles (
  id          uuid PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  full_name   text,
  avatar_url  text,
  role        text NOT NULL DEFAULT 'player',   -- 'player' | 'admin'
  bio         text,
  mc_username text,
  updated_at  timestamp with time zone DEFAULT now()
);

-- ────────────────────────────────────────────────────────────
-- public.news  (admin-managed news posts)
-- ────────────────────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS public.news (
  id          uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
  title       text NOT NULL,
  content     text NOT NULL,
  excerpt     text,
  image_url   text,
  published   boolean NOT NULL DEFAULT false,
  author_id   uuid REFERENCES auth.users(id),
  created_at  timestamp with time zone DEFAULT now(),
  updated_at  timestamp with time zone DEFAULT now()
);

-- ────────────────────────────────────────────────────────────
-- public.page_content  (editable page sections: how-to-join, about, wiki)
-- ────────────────────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS public.page_content (
  id          uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
  page_slug   text UNIQUE NOT NULL,  -- 'how-to-join' | 'about' | 'wiki'
  title       text,
  content     jsonb NOT NULL DEFAULT '{}',
  updated_at  timestamp with time zone DEFAULT now(),
  updated_by  uuid REFERENCES auth.users(id)
);

-- Seed default page content slugs
INSERT INTO public.page_content (page_slug, title, content)
VALUES
  ('how-to-join', 'How to Join', '{}'),
  ('about',       'About Us',    '{}'),
  ('wiki',        'Plugin Wiki', '{}')
ON CONFLICT (page_slug) DO NOTHING;
