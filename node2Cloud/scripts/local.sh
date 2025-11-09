#!/bin/bash
set -e

echo "🚀 Starting Neon Local & App in Local Mode"
docker compose -f docker-compose.local.yaml  --profile local up --build -d 

echo "⏳ Waiting for DB..."
docker compose exec neon-local psql -U neon -d neondb -c 'SELECT 1'

echo "📜 Running migrations..."
docker compose exec app npm run db:generate && npm run db:migrate

echo "🎉 Starting Node app..."
echo "🎉 Done! Node app is already running inside the container."
