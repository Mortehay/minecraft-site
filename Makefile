# Variables to keep things clean
COMPOSE_FILE := compose/develop/docker-compose.yml
SERVICE_NAME := next-app

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