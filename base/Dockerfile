FROM node:20-alpine AS base 
WORKDIR /app
RUN npm install -g pnpm
COPY package*.json pnpm-lock.yaml* ./
RUN pnpm install --frozen-lockfile
ENV NODE_ENV=development PORT=8080 

FROM base AS dev 
COPY . .
EXPOSE 8080
CMD ["pnpm", "run", "dev"]

