#!/bin/bash

echo "🚀 Deploying your proposal app..."
echo ""
echo "Choose deployment method:"
echo "1. Vercel (Recommended - Fastest & Easiest)"
echo "2. Netlify"
echo "3. Show instructions"
echo ""
read -p "Enter choice (1-3): " choice

case $choice in
  1)
    echo ""
    echo "📦 Installing Vercel CLI..."
    npm install -g vercel
    
    echo ""
    echo "🚀 Deploying to Vercel..."
    vercel --prod
    ;;
  2)
    echo ""
    echo "📦 Building your app..."
    npm run build
    
    echo ""
    echo "✅ Build complete! Now:"
    echo "1. Go to https://app.netlify.com"
    echo "2. Drag and drop the 'build' folder"
    echo "   OR connect your GitHub repo"
    ;;
  3)
    echo ""
    cat DEPLOYMENT.md
    ;;
  *)
    echo "Invalid choice"
    ;;
esac

