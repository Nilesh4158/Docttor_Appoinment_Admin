#!/bin/bash

# Prescripto Deployment Preparation Script
# Run this before deploying to ensure everything is ready

echo "🚀 Preparing Prescripto for Deployment..."

# Check if we're in the right directory
if [ ! -d "frontend" ] || [ ! -d "admin" ] || [ ! -d "backend" ]; then
    echo "❌ Error: Please run this script from the prescripto-full-stack root directory"
    exit 1
fi

echo "📦 Installing dependencies..."

# Install frontend dependencies
echo "Installing frontend dependencies..."
cd frontend
npm install
echo "Building frontend..."
npm run build
cd ..

# Install admin dependencies  
echo "Installing admin dependencies..."
cd admin
npm install
echo "Building admin panel..."
npm run build
cd ..

# Install backend dependencies
echo "Installing backend dependencies..."
cd backend
npm install
cd ..

echo "✅ All dependencies installed and builds completed!"

echo "🔧 Next steps:"
echo "1. Push your code to GitHub"
echo "2. Deploy backend to Render.com or Railway"
echo "3. Deploy frontend to Vercel"
echo "4. Deploy admin to Vercel"
echo "5. Update environment variables with live URLs"

echo "📋 Quick deployment links:"
echo "• Render: https://render.com"
echo "• Vercel: https://vercel.com"
echo "• Railway: https://railway.app"
echo "• Netlify: https://netlify.com"

echo "🎉 Ready for deployment!"