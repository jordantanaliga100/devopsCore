FROM node:20-alpine as base 
RUN addgroup -S app && adduser -S -G app app 
WORKDIR /app
RUN npm install -g pnpm 
COPY package.json pnpm-lock.yaml ./
RUN chown -R app:app /app 
USER app
RUN pnpm install --frozen-lockfile



FROM base AS dev

COPY --chown=app:app . .
EXPOSE 5173
CMD ["npm", "run", "dev"]

