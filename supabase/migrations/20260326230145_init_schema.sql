-- ============================================================
-- Epic MC – Schema Migration
-- Runs inside Supabase CLI local stack (auth schema already exists).
-- ============================================================

-- ────────────────────────────────────────────────────────────
-- public.profiles  (user display info + role)
-- References auth.users which is managed by GoTrue/Supabase.
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
  id          uuid PRIMARY KEY DEFAULT gen_random_uuid(),
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
  id          uuid PRIMARY KEY DEFAULT gen_random_uuid(),
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

-- ────────────────────────────────────────────────────────────
-- Row Level Security
-- ────────────────────────────────────────────────────────────

-- profiles: users can read all, update only their own
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Public profiles are viewable by everyone" ON public.profiles FOR SELECT USING (true);
CREATE POLICY "Users can update own profile" ON public.profiles FOR UPDATE USING (auth.uid() = id);
CREATE POLICY "Users can insert own profile" ON public.profiles FOR INSERT WITH CHECK (auth.uid() = id);

-- news: everyone can read published posts, admins can manage all
ALTER TABLE public.news ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Published news is viewable by everyone" ON public.news FOR SELECT USING (published = true);
CREATE POLICY "Admins can manage news" ON public.news USING (
  EXISTS (SELECT 1 FROM public.profiles WHERE id = auth.uid() AND role = 'admin')
);

-- page_content: everyone can read, admins can write
ALTER TABLE public.page_content ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Page content is viewable by everyone" ON public.page_content FOR SELECT USING (true);
CREATE POLICY "Admins can manage page content" ON public.page_content USING (
  EXISTS (SELECT 1 FROM public.profiles WHERE id = auth.uid() AND role = 'admin')
);

-- ────────────────────────────────────────────────────────────
-- Auto-create profile on new user signup
-- ────────────────────────────────────────────────────────────
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS trigger
LANGUAGE plpgsql
SECURITY DEFINER SET search_path = public
AS $$
BEGIN
  INSERT INTO public.profiles (id, full_name, avatar_url)
  VALUES (
    new.id,
    new.raw_user_meta_data->>'full_name',
    new.raw_user_meta_data->>'avatar_url'
  )
  ON CONFLICT (id) DO NOTHING;
  RETURN new;
END;
$$;

DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE PROCEDURE public.handle_new_user();
