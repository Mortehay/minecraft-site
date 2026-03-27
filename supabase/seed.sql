-- 1. Insert multiple rows into auth.users
-- This establishes the base identities for your server
INSERT INTO auth.users (id, email)
VALUES 
  ('00000000-0000-0000-0000-000000000000', 'admin@epicmc.com'),
  ('11111111-1111-1111-1111-111111111111', 'moderator@epicmc.com'),
  ('22222222-2222-2222-2222-222222222222', 'player_test@example.com')
ON CONFLICT (id) DO NOTHING;

-- 2. Insert multiple rows into public.profiles
-- Links to the users above to test different roles
INSERT INTO public.profiles (id, full_name, role, mc_username, bio)
VALUES 
  ('00000000-0000-0000-0000-000000000000', 'Admin Mark', 'admin', 'Markunn', 'Server Owner'),
  ('11111111-1111-1111-1111-111111111111', 'Mod Joe', 'player', 'JoeTheMod', 'Community Moderator'),
  ('22222222-2222-2222-2222-222222222222', 'Tester Steve', 'player', 'SteveBuilds', 'Regular player account')
ON CONFLICT (id) DO NOTHING;

-- 3. Insert multiple news entries
-- This helps you test your Next.js frontend layout/scrolling
INSERT INTO public.news (title, content, published, author_id)
VALUES 
  ('Season 2 is Live!', 'Welcome to the new world. Explore the custom biomes now.', true, '00000000-0000-0000-0000-000000000000'),
  ('Economy Update', 'We have added a gold-based trading system at spawn.', true, '00000000-0000-0000-0000-000000000000'),
  ('Maintenance Scheduled', 'Brief downtime this Friday for database optimization.', false, '00000000-0000-0000-0000-000000000000')
ON CONFLICT DO NOTHING;