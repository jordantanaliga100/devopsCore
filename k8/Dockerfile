# Base stage
FROM node:20-alpine

RUN npm install -g pnpm
WORKDIR /app

COPY package.json pnpm-lock.yaml ./
RUN pnpm install --frozen-lockfile --prod

COPY . .
USER node
EXPOSE 5000

ENV NODE_ENV=production
CMD ["pnpm", "run", "dev"]


# For reference 👱 

# # Use a small base image
# FROM node:18-alpine AS base
# WORKDIR /app

# # Install deps separately for caching
# COPY package.json package-lock.json* ./
# RUN npm ci --omit=dev

# # Copy app source
# COPY . .

# # Run as non-root (alpine node image includes user 'node')
# USER node
# EXPOSE 3000
# ENV NODE_ENV=production
# CMD ["npm", "start"]