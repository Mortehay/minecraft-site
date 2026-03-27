# Use Node 20 (required for React Router v7+) on Alpine
FROM node:20-alpine AS base

# Install system dependencies for build tools and Alpine compatibility
RUN apk add --no-cache \
    libc6-compat \
    gcompat \
    libstdc++ \
    bash \
    curl \
    wget \
    make \
    g++

WORKDIR /app

# Install dependencies stage
FROM base AS deps
WORKDIR /app
COPY package*.json ./

# Run install as root initially to avoid permission issues during the fetch/build process
RUN npm install

# Build the app stage
FROM base AS builder
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . . 
RUN npm run build

# Final Stage / Development Base
FROM base AS runner
WORKDIR /app

# Ensure the node user has a home directory and correct permissions
# We set ownership of /app to 'node' so it can handle package-lock.json updates
RUN chown -R node:node /app

# Switch to the non-root 'node' user
USER node

ENV NODE_ENV development

# In development, the command is usually overridden by docker-compose,
# but we provide a sensible default here.
EXPOSE 3000
CMD ["npm", "run", "dev"]