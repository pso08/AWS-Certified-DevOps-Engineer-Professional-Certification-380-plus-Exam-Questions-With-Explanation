#!/bin/bash

# Cloudflare Deployment Setup Script for AWS DevOps Quiz App
# This script sets up the environment for deploying to Cloudflare Pages

# Install Wrangler CLI if not already installed
if ! command -v wrangler &> /dev/null; then
    echo "Installing Wrangler CLI..."
    npm install -g wrangler
fi

# Install dependencies
echo "Installing dependencies..."
npm install --legacy-peer-deps

# Create D1 database if it doesn't exist
echo "Setting up D1 database..."
wrangler d1 create aws-quiz-app-db --local

# Initialize database with schema
echo "Initializing database schema..."
mkdir -p migrations
cat > migrations/0001_initial.sql << EOL
CREATE TABLE IF NOT EXISTS users (
  id TEXT PRIMARY KEY,
  name TEXT,
  email TEXT UNIQUE,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS sessions (
  id TEXT PRIMARY KEY,
  user_id TEXT,
  date TEXT,
  questions_attempted INTEGER,
  correct_percentage REAL,
  duration INTEGER,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (user_id) REFERENCES users(id)
);

CREATE TABLE IF NOT EXISTS question_attempts (
  id TEXT PRIMARY KEY,
  user_id TEXT,
  question_id TEXT,
  session_id TEXT,
  is_correct BOOLEAN,
  domain TEXT,
  topics TEXT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (user_id) REFERENCES users(id),
  FOREIGN KEY (session_id) REFERENCES sessions(id)
);
EOL

# Apply migrations
echo "Applying database migrations..."
wrangler d1 execute aws-quiz-app-db --local --file=migrations/0001_initial.sql

# Build the application
echo "Building the application..."
npm run build

# Deploy to Cloudflare Pages (local preview)
echo "Starting local preview..."
echo "You can access the application at http://localhost:8788"
wrangler pages dev .output/public --local

# Instructions for production deployment
echo ""
echo "To deploy to Cloudflare Pages production:"
echo "1. Login to Cloudflare: wrangler login"
echo "2. Update wrangler.toml with your Cloudflare account ID and database ID"
echo "3. Deploy: wrangler pages deploy .output/public --project-name aws-devops-quiz-app"
