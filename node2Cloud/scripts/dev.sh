#!/bin/bash
set -e
# Development startup script for Acquisition App with Neon Local
# This script starts the application in development mode with Neon Local

echo "🚀 Starting Acquisition App in Development Mode"
echo "================================================"

# Check if .env.development exists
if [ ! -f .env.dev ]; then
    echo "❌ Error: .env.dev file not found!"
    echo "   Please copy .env.dev from the template and update with your Neon credentials."
    exit 1
fi

# Check if Docker is running
if ! docker info >/dev/null 2>&1; then
    echo "❌ Error: Docker is not running!"
    echo "   Please start Docker Desktop and try again."
    exit 1
fi

# Start development environment
docker compose -f docker-compose.dev.yaml --profile dev up -d --build  

# Run migrations with Drizzle
echo "📜 Applying latest schema with Drizzle..."
docker compose exec app npm run db:migrate 

echo ""
echo "🎉 Development environment started!"
echo "   Application: http://localhost:5000"

echo "To stop the environment, press Ctrl+C or run: docker compose down"

