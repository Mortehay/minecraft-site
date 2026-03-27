# Variables to keep things clean
COMPOSE_FILE := compose/develop/docker-compose.yml
SERVICE_NAME := next-app
DB_PASSWORD ?= password
DB_URL=postgresql://postgres:$(DB_PASSWORD)@127.0.0.1:5432/postgres

.PHONY: dev build stop clean logs shell

# Start containers in the background
dev:
	docker compose -f $(COMPOSE_FILE) up -d

# Force a rebuild of the images and start
build:
	docker compose -f $(COMPOSE_FILE) up -d --build

# Stop the containers
stop:
	docker compose -f $(COMPOSE_FILE) stop

# Down the containers (removes network/containers)
down:
	docker compose -f $(COMPOSE_FILE) down

# View logs for the next-app
logs:
	docker compose -f $(COMPOSE_FILE) logs -f next-app

# Clean up Docker (removes unused volumes/images)
clean:
	docker compose -f $(COMPOSE_FILE) down -v --rmi local

# Jump inside the container shell for debugging
shell:
	docker compose -f $(COMPOSE_FILE) exec next-app sh

# 1. Install new packages without rebuilding the whole image
npm-install:
	docker compose -f $(COMPOSE_FILE) exec $(SERVICE_NAME) npm install

# 2. Update existing packages based on package.json
npm-update:
	docker compose -f $(COMPOSE_FILE) exec $(SERVICE_NAME) npm update

# 3. Add a specific package (Usage: make npm-add PKG=lucide-react)
npm-add:
	docker compose -f $(COMPOSE_FILE) exec $(SERVICE_NAME) npm install $(PKG)

# Force a total rebuild from scratch (no cache)
rebuild-clean:
	docker compose -f $(COMPOSE_FILE) build --no-cache
	docker compose -f $(COMPOSE_FILE) up -d

# Rebuild
rebuild:
	docker compose -f $(COMPOSE_FILE) build
	docker compose -f $(COMPOSE_FILE) up -d

# Shortcut to just rebuild the specific service without cache
rebuild-app:
	docker compose -f $(COMPOSE_FILE) build --no-cache $(SERVICE_NAME)
	docker compose -f $(COMPOSE_FILE) up -d $(SERVICE_NAME)

# Database Sync (Run from /app, pointing to the schema file)
db-push:
	docker compose -f $(COMPOSE_FILE) exec $(SERVICE_NAME) npx prisma db push --schema=./prisma/schema.prisma

# Generate Prisma Client
db-gen:
	docker compose -f $(COMPOSE_FILE) exec $(SERVICE_NAME) npx prisma generate --schema=./prisma/schema.prisma

# 1. Initialize Supabase project structure
db-init:
	npx supabase init

# 2. Reset the database
# We use the --db-url flag to point the CLI to your existing Docker DB
db-reset:
	npx supabase db reset --local --db-url "$(DB_URL)"

# 3. Combined command to refresh everything
db-refresh:
	docker compose -f compose/develop/docker-compose.yml up -d db
	@echo "Waiting for database to be ready..."
	@sleep 5
	npx supabase db reset --db-url "$(DB_URL)" --yes