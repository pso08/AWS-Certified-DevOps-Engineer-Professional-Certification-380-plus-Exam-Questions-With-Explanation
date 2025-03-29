# Cloudflare Pages Deployment Guide

This document provides instructions for deploying the AWS DevOps Quiz Application to Cloudflare Pages.

## Deployment Configuration

The application uses OpenNext to build a Next.js application for Cloudflare Pages. The deployment process has been configured to ensure proper compatibility between OpenNext's output structure and Cloudflare Pages' expected directory structure.

### Key Components

1. **Post-Build Script**: A custom script that reorganizes the build output to match Cloudflare Pages requirements
2. **Wrangler Configuration**: Configured with the correct Cloudflare Pages properties
3. **Package Scripts**: Enhanced to include the post-build process in the deployment workflow

## Wrangler Configuration

The `wrangler.toml` file must use the correct Cloudflare Pages configuration format:

```toml
# Basic configuration
name = "aws-devops-quiz-app"
compatibility_date = "2025-03-24"
compatibility_flags = ["nodejs_compat"]

# Cloudflare Pages configuration (correct format)
pages_build_command = "npm install --legacy-peer-deps && npm run build && npm run build:worker && npm run post-build"
pages_build_output_dir = ".output/public"

# Environment variables
[vars]
NODE_ENV = "production"
NEXT_PUBLIC_API_URL = "/api"

# Additional configuration sections as needed...
```

> **IMPORTANT**: Cloudflare Pages requires the `pages_build_command` and `pages_build_output_dir` properties to be at the root level of the configuration file, not nested under a [pages] section.

## Deployment Process

### Local Development

To run the application locally:

```bash
# Install dependencies
npm install --legacy-peer-deps

# Start development server
npm run dev
```

### Preview Deployment

To preview the application with Wrangler:

```bash
npm run preview
```

This command:
1. Builds the Next.js application
2. Generates the OpenNext worker
3. Runs the post-build script to create the proper directory structure
4. Starts a local Wrangler development server

### Production Deployment

To deploy to Cloudflare Pages:

```bash
npm run deploy
```

This command:
1. Builds the Next.js application
2. Generates the OpenNext worker
3. Runs the post-build script to create the proper directory structure
4. Deploys the application to Cloudflare Pages

## Directory Structure

The deployment process creates the following directory structure:

```
.output/
├── public/           # Static assets served by Cloudflare Pages
│   ├── _next/        # Next.js static assets
│   ├── BUILD_ID      # Build identifier
│   └── ...           # Other public assets
└── worker.js         # OpenNext worker script
```

## Troubleshooting

If you encounter deployment issues:

1. Ensure the post-build script is executable: `chmod +x scripts/post-build.js`
2. Verify the `.output/public` directory is created after building
3. Check that `wrangler.toml` has the correct `pages_build_output_dir` property at the root level (not nested under a [pages] section)
4. Confirm that all required environment variables are set in `wrangler.toml`
5. If you see a 404 error after deployment, verify your wrangler.toml configuration format matches Cloudflare's requirements

## Cloudflare Dashboard Deployment

If you're deploying through the Cloudflare Dashboard:

1. Log in to your Cloudflare dashboard
2. Navigate to Pages > Your project
3. Go to Settings > Build & deployments
4. Update the build settings:
   - Build command: `npm install --legacy-peer-deps && npm run build && npm run build:worker && npm run post-build`
   - Build output directory: `.output/public`
5. Save changes and trigger a new deployment

## Additional Resources

- [Cloudflare Pages Documentation](https://developers.cloudflare.com/pages/)
- [Cloudflare Wrangler Documentation](https://developers.cloudflare.com/workers/wrangler/)
- [OpenNext Documentation](https://open-next.js.org/)
- [Next.js Documentation](https://nextjs.org/docs)
