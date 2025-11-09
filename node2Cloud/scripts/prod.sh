#!/bin/bash
set -e 
# Production deployment script for Acquisition App
# This script starts the application in production mode with Neon Cloud Database

echo "🚀 Starting Acquisition App in Production Mode"
echo "==============================================="

# Check if .env.production exists
if [ ! -f .env.prod ]; then
    echo "❌ Error: .env.prod file not found!"
    echo "   Please create .env.prod with your production environment variables."
    exit 1
fi

# Check if Docker is running
if ! docker info >/dev/null 2>&1; then
    echo "❌ Error: Docker is not running!"
    echo "   Please start Docker and try again."
    exit 1
fi


# Start production environment
docker compose -f docker-compose.prod.yaml --profile prod up -d --build 

# Wait for DB to be ready (basic health check)
echo "⏳ Waiting for Neon Local to be ready..."
sleep 5

# Run migrations with Drizzle
echo "📜 Applying latest schema with Drizzle..."
docker compose exec app npm run db:migrate

echo ""
echo "🎉 Production environment started!"
echo "   Application: http://localhost:8080"
echo "   Logs: docker logs acquisition-app-prod"
echo ""
echo "Useful commands:"
echo "   View logs: docker logs -f acquisition-app-prod"
echo "   Stop app: docker compose -f docker-compose.prod.yaml down"

