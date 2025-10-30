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
