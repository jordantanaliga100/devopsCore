# --------------------
# Base stage: setup Node, user, deps
# --------------------
FROM node:20-alpine AS base

# 🔥 root user by default
RUN addgroup react-group && adduser -S -G react-group react-user 

WORKDIR /app

# Install global tools (root needed)
RUN npm install -g pnpm

# Copy only dependency files for caching
COPY package.json pnpm-lock.yaml ./

# Fix ownership so react-user can write
RUN chown -R react-user:react-group /app

# Switch to non-root user
USER react-user

# Install dependencies
RUN pnpm install --frozen-lockfile

# --------------------
# Dev stage: copy full source + run dev server
# --------------------
FROM base AS dev

# Copy full source, maintain ownership
COPY --chown=react-user:react-group . .

# Expose port for Vite dev server
EXPOSE 5173

# Start dev server
CMD ["pnpm", "run", "dev"]

