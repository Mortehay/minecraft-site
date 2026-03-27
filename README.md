# 🟩 Epic MC – Minecraft Server Website

A React + Vite frontend for a Minecraft server community, with Supabase-powered auth, news management, wiki pages, and user profiles — all running in Docker for local development.

## Tech Stack

| Layer       | Technology                                             |
| ----------- | ------------------------------------------------------ |
| Frontend    | React 18 + Vite + TypeScript                           |
| Styling     | Tailwind CSS 4                                         |
| Auth & DB   | Supabase (GoTrue auth, PostgREST API, Postgres 15)    |
| ORM         | Prisma (optional, for direct DB access)                |
| Containers  | Docker Compose                                         |
| Mail (dev)  | MailHog (catches all outbound emails locally)          |

---

## Project Structure

```
minecraft-site/
├── compose/develop/
│   ├── docker-compose.yml      # Dev stack definition
│   ├── .env                    # Local environment variables (git-ignored)
│   ├── .env.example            # Template for .env
│   ├── db/
│   │   ├── Dockerfile          # Supabase Postgres + SSL certs
│   │   └── init.sql            # Schema auto-applied on first start
│   └── next-app/
│       └── Dockerfile          # Node 20 Alpine image for Vite
├── src/                        # React application source
│   ├── app/                    # Pages and components
│   ├── lib/supabase.ts         # Supabase client init
│   └── package.json
├── supabase/
│   ├── config.toml             # Supabase CLI config
│   ├── migrations/             # SQL migrations (run by `supabase db reset`)
│   └── seed.sql                # Test data seeded after migrations
├── Makefile                    # Shortcuts for common tasks
└── README.md                   # ← You are here
```

---

## Prerequisites

### Linux (Ubuntu / Debian)

```bash
# 1. Docker Engine + Compose plugin
sudo apt update
sudo apt install -y ca-certificates curl gnupg
sudo install -m 0755 -d /etc/apt/keyrings
curl -fsSL https://download.docker.com/linux/ubuntu/gpg | sudo gpg --dearmor -o /etc/apt/keyrings/docker.gpg
echo "deb [arch=$(dpkg --print-architecture) signed-by=/etc/apt/keyrings/docker.gpg] \
  https://download.docker.com/linux/ubuntu $(lsb_release -cs) stable" \
  | sudo tee /etc/apt/sources.list.d/docker.list > /dev/null
sudo apt update
sudo apt install -y docker-ce docker-ce-cli containerd.io docker-compose-plugin

# 2. Add your user to the docker group (avoids needing sudo)
sudo usermod -aG docker $USER
newgrp docker

# 3. Node.js 20+ (via nvm or NodeSource)
curl -fsSL https://deb.nodesource.com/setup_20.x | sudo -E bash -
sudo apt install -y nodejs

# 4. Make (usually pre-installed)
sudo apt install -y make

# 5. Verify
docker --version        # Docker 24+
docker compose version  # v2+
node -v                 # v20+
npm -v                  # 10+
make --version
```

### Windows (WSL2)

```powershell
# ── In PowerShell (Admin) ──

# 1. Enable WSL2
wsl --install -d Ubuntu

# 2. Install Docker Desktop for Windows
#    → https://docs.docker.com/desktop/install/windows-install/
#    → In Settings → Resources → WSL Integration: enable your Ubuntu distro

# 3. Restart and open Ubuntu terminal
```

Then **inside the WSL2 Ubuntu terminal**, follow the same Linux steps above for Node.js and Make. Docker commands work automatically through Docker Desktop's WSL2 backend.

> **⚠️ WSL2 tip:** Clone the repo inside the Linux filesystem (`~/`) — **not** under `/mnt/c/`. The Windows filesystem mount is extremely slow for `node_modules`.

---

## Quick Start

### 1. Clone the repo

```bash
git clone https://github.com/your-org/minecraft-site.git
cd minecraft-site
```

### 2. Create the `.env` file

```bash
cp compose/develop/.env.example compose/develop/.env
```

Edit `compose/develop/.env` and fill in the values:

```env
# Supabase API URL (local Docker DB uses PostgREST-compatible API at this address)
VITE_SUPABASE_URL=http://localhost:54321

# Anon key for the local Supabase instance
VITE_SUPABASE_ANON_KEY=<your-anon-key>

# Postgres password
DB_PASSWORD=password

# Admin account email
ADMIN_EMAIL=admin@yourdomain.com
```

### 3. Start the dev containers

```bash
make dev
```

This runs `docker compose up -d` which starts:

| Service    | URL / Port                            |
| ---------- | ------------------------------------- |
| Vite app   | http://localhost:13000                 |
| PostgreSQL | `localhost:5432` (user: `postgres`)   |
| MailHog UI | http://localhost:18025                 |
| MailHog SMTP | `localhost:11025`                   |

### 4. Apply the database schema + seed data

```bash
make db-refresh
```

This does three things:
1. Ensures the `db` container is running
2. Waits for Postgres to be ready
3. Runs `supabase db reset` which applies all migrations from `supabase/migrations/` and seeds data from `supabase/seed.sql`

### 5. Open the app

Navigate to **http://localhost:13000** in your browser.

---

## Makefile Commands

Run these from the project root:

| Command               | Description                                            |
| --------------------- | ------------------------------------------------------ |
| `make dev`            | Start all containers in the background                 |
| `make build`          | Rebuild images and start                               |
| `make stop`           | Stop containers (keep data)                            |
| `make down`           | Stop and remove containers + network                   |
| `make clean`          | Full teardown — removes volumes and local images       |
| `make logs`           | Tail logs for `next-app`                               |
| `make shell`          | Open a shell inside the `next-app` container           |
| `make rebuild`        | Rebuild images (with cache) and start                  |
| `make rebuild-clean`  | Rebuild images from scratch (no cache) and start       |
| `make rebuild-app`    | Rebuild only `next-app` (no cache) and start           |
| **NPM**               |                                                        |
| `make npm-install`    | Run `npm install` inside the container                 |
| `make npm-update`     | Run `npm update` inside the container                  |
| `make npm-add PKG=x`  | Install a new package (e.g. `make npm-add PKG=axios`)  |
| **Database**           |                                                        |
| `make db-refresh`     | Reset DB: apply migrations + seed data                 |
| `make db-reset`       | Reset DB via Supabase CLI (local mode)                 |
| `make db-push`        | Push Prisma schema to DB                               |
| `make db-gen`         | Regenerate Prisma client                               |
| `make db-init`        | Initialize Supabase project structure                  |

---

## Database Schema

The schema is defined in `supabase/migrations/` and auto-applied by `make db-refresh`.

### Tables

#### `public.profiles`
| Column       | Type      | Notes                                          |
| ------------ | --------- | ---------------------------------------------- |
| `id`         | uuid (PK) | References `auth.users(id)`, cascade on delete |
| `full_name`  | text      |                                                |
| `avatar_url` | text      |                                                |
| `role`       | text      | `'player'` (default) or `'admin'`              |
| `bio`        | text      |                                                |
| `mc_username`| text      | Minecraft username                             |
| `updated_at` | timestamptz |                                              |

#### `public.news`
| Column       | Type      | Notes                                  |
| ------------ | --------- | -------------------------------------- |
| `id`         | uuid (PK) | Auto-generated                         |
| `title`      | text      | Required                               |
| `content`    | text      | Required                               |
| `excerpt`    | text      |                                        |
| `image_url`  | text      | Cover image URL                        |
| `published`  | boolean   | Default `false`                        |
| `author_id`  | uuid (FK) | References `auth.users(id)`            |
| `created_at` | timestamptz |                                      |
| `updated_at` | timestamptz |                                      |

#### `public.page_content`
| Column       | Type      | Notes                                                    |
| ------------ | --------- | -------------------------------------------------------- |
| `id`         | uuid (PK) | Auto-generated                                           |
| `page_slug`  | text      | Unique. Values: `'how-to-join'`, `'about'`, `'wiki'`    |
| `title`      | text      |                                                          |
| `content`    | jsonb     | Default `{}`                                             |
| `updated_at` | timestamptz |                                                        |
| `updated_by` | uuid (FK) | References `auth.users(id)`                              |

### Row Level Security (RLS)

All tables have RLS enabled:

- **profiles** — readable by everyone; users can only update/insert their own row
- **news** — published posts readable by everyone; admins can manage all posts
- **page_content** — readable by everyone; only admins can edit

### Auto-Profile Trigger

When a user signs up through Supabase Auth, a trigger automatically creates a row in `public.profiles` with data from the user's metadata.

---

## Seed Data

After `make db-refresh`, the database is seeded with test data (from `supabase/seed.sql`):

| User                | Role   | MC Username   |
| ------------------- | ------ | ------------- |
| admin@epicmc.com    | admin  | Markunn       |
| moderator@epicmc.com| player | JoeTheMod     |
| player_test@example.com | player | SteveBuilds |

Plus 3 sample news articles (2 published, 1 draft).

---

## Switching to Production Supabase

To point the app at a hosted Supabase project instead of the local Docker DB:

1. Edit `compose/develop/.env`:
   ```env
   VITE_SUPABASE_URL=https://your-project.supabase.co
   VITE_SUPABASE_ANON_KEY=sb_publishable_your-key-here
   ```

2. Apply the migration to your remote DB via the Supabase dashboard SQL editor, or link and push:
   ```bash
   npx supabase link --project-ref your-project-ref
   npx supabase db push
   ```

3. Restart the app: `make rebuild`

---

## Troubleshooting

### Port conflicts

If port `5432` is already used (e.g., by a system Postgres), either stop it or change the port in `docker-compose.yml`:
```yaml
ports:
  - "15432:5432"  # maps host:15432 → container:5432
```
Then update `DB_URL` in the Makefile and `.env` accordingly.

### `PGRST301 — None of the keys was able to decode the JWT`

Your `VITE_SUPABASE_ANON_KEY` doesn't match the JWT secret used by your Supabase instance. Get the correct key from your Supabase project settings or from the running containers.

### `PGRST205 — Could not find the table`

The migration hasn't been applied. Run:
```bash
make db-refresh
```

### WSL2: Slow `npm install`

Make sure the project lives inside the Linux filesystem:
```bash
# ✅ Good
~/projects/minecraft-site

# ❌ Bad — extremely slow
/mnt/c/Users/you/minecraft-site
```

### Container won't start after schema changes

To fully wipe the DB volume and start fresh:
```bash
make clean
make dev
make db-refresh
```
