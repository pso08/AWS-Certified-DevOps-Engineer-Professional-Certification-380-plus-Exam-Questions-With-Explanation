#!/bin/bash

# AWS DevOps Quiz App - Setup Script
# This script builds and prepares the application for Cloudflare Pages deployment

echo "🚀 Setting up AWS DevOps Quiz App for Cloudflare Pages..."

# Ensure test directory structure exists
echo "📁 Creating test directory structure..."
mkdir -p test/data

# Copy placeholder PDF file if it doesn't exist
if [ ! -f "test/data/05-versions-space.pdf" ]; then
  echo "📄 Creating placeholder PDF file for tests..."
  if [ -f "[ FreeCourseWeb.com ] AWS Certified DevOps Engineer - Professio....pdf" ]; then
    cp "[ FreeCourseWeb.com ] AWS Certified DevOps Engineer - Professio....pdf" test/data/05-versions-space.pdf
  else
    echo "⚠️ Warning: Source PDF not found. Build may fail if test PDF is required."
  fi
fi

# Install dependencies
echo "📦 Installing dependencies..."
npm install --legacy-peer-deps
npm install @cloudflare/kv-asset-handler bcryptjs jsonwebtoken --save --legacy-peer-deps
npm install @types/bcryptjs @types/jsonwebtoken --save-dev --legacy-peer-deps

# Build the Next.js application
echo "🏗️ Building Next.js application..."
npm run build

# Generate Cloudflare-specific output
echo "☁️ Generating Cloudflare-specific output..."
npm run build:worker

# Create .output directory structure if it doesn't exist
echo "📂 Creating Cloudflare Pages output structure..."
if [ -d ".open-next" ]; then
  mkdir -p .output/public
  
  # Copy static assets
  if [ -d ".next/static" ]; then
    mkdir -p .output/public/_next/static
    cp -r .next/static/* .output/public/_next/static/
  fi
  
  # Copy build ID file
  if [ -f ".next/BUILD_ID" ]; then
    cp .next/BUILD_ID .output/public/
  fi
  
  # Copy server assets
  if [ -d ".next/server" ]; then
    mkdir -p .output/server
    cp -r .next/server/* .output/server/ 2>/dev/null || true
  fi
  
  # Copy public assets
  if [ -d "public" ]; then
    cp -r public/* .output/public/ 2>/dev/null || true
  fi
  
  # Copy worker script
  if [ -f ".open-next/worker.js" ]; then
    cp .open-next/worker.js .output/worker.js
  fi
  
  # Copy all .next build output
  mkdir -p .output/.next
  cp -r .next/* .output/.next/ 2>/dev/null || true
  
  # Copy index.html if it exists
  if [ -f ".next/server/pages/index.html" ]; then
    cp .next/server/pages/index.html .output/public/
  fi
  
  # Create a simple index.html if it doesn't exist
  if [ ! -f ".output/public/index.html" ]; then
    echo "Creating fallback index.html..."
    echo '<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>AWS DevOps Quiz App</title>
  <meta http-equiv="refresh" content="0;url=/_next/static/chunks/pages/index.html">
</head>
<body>
  <p>Redirecting to application...</p>
</body>
</html>' > .output/public/index.html
  fi
  
  echo "✅ Created .output directory with required structure"
else
  echo "⚠️ .open-next directory not found. Build may not have completed successfully."
fi

# Verify the output directory exists
if [ -d ".output" ]; then
  echo "✅ .output directory successfully created"
  echo "✅ Setup complete! You can now run the application with:"
  echo "   wrangler pages dev .output/public --local"
else
  echo "❌ Failed to create .output directory"
  echo "   Please check the build logs for errors"
fi
