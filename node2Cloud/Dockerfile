

# 🔥 MODERN WAY 🔥 
# ============================
# Base minimal layer
# ============================
FROM node:20-alpine AS base
WORKDIR /app
COPY package*.json ./
# Create non-root user
RUN addgroup -g 1001 -S nodejs \
  && adduser -u 1001 -S nodejs
USER nodejs


# ============================
# Development stage (TS direct run)
# ============================
FROM base AS development
USER root
RUN npm ci && npm cache clean --force
USER nodejs
COPY . .
EXPOSE 5000
CMD ["npm", "run", "start:dev"]   

# ============================
# Local stage (TS direct run)
# ============================
FROM base AS local
USER root
RUN npm ci && npm cache clean --force
USER nodejs
COPY . .
EXPOSE 5000
CMD ["npm", "run", "start:local"]   


# ============================
# Builder stage (TS → JS compile)
# ============================
FROM base AS builder
USER root
RUN npm ci && npm cache clean --force
COPY . .
RUN npm run build
USER nodejs


# ============================
# Production (run JS only)
# ============================
FROM builder AS production
WORKDIR /app
USER root
RUN npm ci --only=production && npm cache clean --force
USER nodejs
EXPOSE 5000
CMD ["npm", "run", "start:prod"]



# 🔥 OLD WAY 🔥 

# # Multi-stage Dockerfile for Node.js acquisitions application

# # Base image with Node.js
# FROM node:20-alpine AS base

# # Set working directory
# WORKDIR /app

# # Copy package files
# COPY package*.json ./

# # Install dependencies
# RUN npm ci --only=production && npm cache clean --force

# # Copy source code
# COPY . .

# # Create non-root user for security
# RUN addgroup -g 1001 -S nodejs && \
#     adduser -S nodejs -u 1001

# # Change ownershipe of th app directory
# RUN chown -R nodejs:nodejs /app
# USER nodejs

# # Expose the port
# EXPOSE 5000

# # Health check
# HEALTHCHECK --interval=30s --timeout=3s --start-period=5s --retries=3 \
#   CMD node -e "require('http').get('http://localhost:5000/health', (res) => { process.exit(res.statusCode === 200 ? 0 : 1) }).on('error', () => { process.exit(1) })"

# # Development stage
# FROM base AS development
# USER root
# RUN npm ci && npm cache clean --force
# USER nodejs
# CMD ["npm", "run", "start:dev"]

# # Production stage
# FROM base AS production
# CMD ["npm", "start:prod"]"