# AWS DevOps Quiz App - Production Deployment Guide

This comprehensive guide will help you deploy the AWS DevOps Quiz App to Cloudflare Pages using GitHub integration.

## Prerequisites

- GitHub account
- Cloudflare account
- Node.js v20 (recommended) or v18

## Deployment Options

### Option 1: Direct Deployment from Local Environment

1. Clone the repository:
   ```bash
   git clone <your-github-repo-url>
   cd aws-devops-quiz-app
   ```

2. Install dependencies:
   ```bash
   npm install --legacy-peer-deps
   ```

3. Build and deploy:
   ```bash
   npm run deploy
   ```
   This will build the application and deploy it to Cloudflare Pages.

### Option 2: GitHub Integration with Cloudflare Pages (Recommended)

1. Push your code to GitHub:
   ```bash
   git init
   git add .
   git commit -m "Initial commit"
   git branch -M main
   git remote add origin <your-github-repo-url>
   git push -u origin main
   ```

2. Set up Cloudflare Pages:
   - Log in to your Cloudflare dashboard
   - Navigate to Pages
   - Click "Create a project"
   - Select "Connect to Git"
   - Select your GitHub repository
   - Configure build settings:
     - Framework preset: Custom
     - Build command: `npm install --legacy-peer-deps && npm run build && npm run build:worker`
     - Build output directory: `.output/public`
     - Node.js version: 20
   - Click "Save and Deploy"

3. Set up environment variables in Cloudflare Pages:
   - Navigate to your project in Cloudflare Pages
   - Go to Settings > Environment variables
   - Add the following variables:
     - `NODE_ENV`: `production`
     - `NEXT_PUBLIC_API_URL`: `/api`

### Option 3: GitHub Actions Automated Deployment

This repository includes a GitHub Actions workflow that automatically builds and deploys the application to Cloudflare Pages whenever changes are pushed to the main branch.

To set up:

1. Push your code to GitHub as described in Option 2.

2. Add the following secrets to your GitHub repository:
   - `CLOUDFLARE_API_TOKEN`: Your Cloudflare API token with Pages permissions
   - `CLOUDFLARE_ACCOUNT_ID`: Your Cloudflare account ID

3. The workflow will automatically run on every push to the main branch.

## Configuration Files

### wrangler.toml

This file configures the Cloudflare Workers settings for local development:

```toml
name = "aws-devops-quiz-app"
compatibility_date = "2025-03-24"
compatibility_flags = ["nodejs_compat"]
main = "workers-site/index.js"

# D1 Database configuration
[[d1_databases]]
binding = "DB"
database_name = "aws-quiz-app-db"
database_id = "def7f03b-c291-4016-a126-163dbccd88a5"

# R2 Storage configuration
[[r2_buckets]]
binding = "STORAGE"
bucket_name = "aws-quiz-app-storage"

# Environment variables
[vars]
NODE_ENV = "production"
NEXT_PUBLIC_API_URL = "/api"

# Routes configuration
routes = [
  { pattern = "/api/*" }
]

# Deployment configuration
[site]
bucket = "./.output/public"
```

### cloudflare.toml

This file configures the Cloudflare Pages settings for production deployment:

```toml
# Cloudflare Pages configuration
[build]
command = "npm install --legacy-peer-deps && npm run build && npm run build:worker"
output_directory = ".output/public"
node_version = "20"

[build.environment]
NODE_ENV = "production"

[site]
bucket = ".output/public"

[env.production]
NODE_ENV = "production"
NEXT_PUBLIC_API_URL = "/api"

[env.preview]
NODE_ENV = "development"
NEXT_PUBLIC_API_URL = "/api"
```

## GitHub Actions Workflow

The included GitHub Actions workflow automates the build and deployment process:

```yaml
name: Deploy to Cloudflare Pages

on:
  push:
    branches: [main]
  pull_request:
    branches: [main]

jobs:
  deploy:
    runs-on: ubuntu-latest
    permissions:
      contents: read
      deployments: write

    steps:
      - name: Checkout
        uses: actions/checkout@v3

      - name: Setup Node.js
        uses: actions/setup-node@v3
        with:
          node-version: 20
          cache: 'npm'

      - name: Create test directory and PDF
        run: |
          mkdir -p test/data
          touch test/data/05-versions-space.pdf

      - name: Install dependencies
        run: npm install --legacy-peer-deps

      - name: Install Cloudflare dependencies
        run: npm install @cloudflare/kv-asset-handler bcryptjs jsonwebtoken --save --legacy-peer-deps

      - name: Build application
        run: npm run build

      - name: Generate Cloudflare output
        run: npm run build:worker

      - name: Create output directory structure
        run: |
          # (Script to create output directory structure)

      - name: Deploy to Cloudflare Pages
        uses: cloudflare/pages-action@v1
        with:
          apiToken: ${{ secrets.CLOUDFLARE_API_TOKEN }}
          accountId: ${{ secrets.CLOUDFLARE_ACCOUNT_ID }}
          projectName: aws-devops-quiz-app
          directory: .output/public
          gitHubToken: ${{ secrets.GITHUB_TOKEN }}
```

## Troubleshooting

### Build Failures

If the build fails in Cloudflare Pages:

1. Check the build logs for specific errors
2. Ensure all dependencies are correctly specified in package.json
3. Verify that the test directory structure exists
4. Make sure the Node.js version is set to 20 in the build settings

### Missing Test Files

The GitHub Actions workflow automatically creates the necessary test files. If you're deploying manually, ensure you create:
- `test/data/05-versions-space.pdf` (can be an empty file)

### 404 Errors

If you encounter 404 errors after deployment:

1. Verify that the output directory is set to `.output/public`
2. Check that the build process completed successfully
3. Ensure the fallback index.html file was created
4. Check the routes configuration in your Cloudflare Pages settings

## Additional Resources

- [Cloudflare Pages Documentation](https://developers.cloudflare.com/pages/)
- [GitHub Actions Documentation](https://docs.github.com/en/actions)
- [Next.js on Cloudflare Pages](https://developers.cloudflare.com/pages/framework-guides/deploy-a-nextjs-site/)
- [OpenNext Documentation](https://open-next.js.org/)
