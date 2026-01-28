#!/bin/bash

# Portfolio Site Deployment Script
# Run this script on your EC2 instance

set -e

echo "🚀 Starting deployment..."

# Install dependencies
echo "📦 Installing server dependencies..."
cd server
npm install

echo "📦 Installing client dependencies..."
cd ../client
npm install

# Build the React app
echo "🔨 Building React client..."
npm run build

# Seed the database with admin user
echo "🌱 Seeding database..."
cd ../server
node scripts/seedDb.js

echo "✅ Deployment setup complete!"
echo ""
echo "Next steps:"
echo "1. Make sure MongoDB is running"
echo "2. Update server/.env with production settings"
echo "3. Start the server with PM2: pm2 start server/index.js --name portfolio-server"
echo "4. Check nginx config is pointing to the built client and proxying API to server"
echo ""
echo "Admin credentials: hcharper / HCh10192001$"
