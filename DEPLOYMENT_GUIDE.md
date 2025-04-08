## Deployment Instructions

### Option 1: Update via Cloudflare Dashboard

1. Log in to your Cloudflare dashboard
2. Navigate to Pages > Your project
3. Go to Settings > Build & deployments
4. Update the build settings:
   - Build command: `npm install`
   - Build output directory: `.output`
5. Save changes and trigger a new deployment

### Option 2: Update Repository and Redeploy

1. Replace your current `wrangler.toml` file with your variables
2. Commit and push the changes to your repository
3. If you have CI/CD set up with Cloudflare Pages, it should automatically trigger a new deployment
4. If not, manually trigger a new deployment from the Cloudflare dashboard

### Option 3: Direct Upload

1. Build your application locally:
   ```bash
   npm install
   npm run build
   npm run build:worker
   npm run post-build
   ```
2. Deploy using Wrangler CLI:
   ```bash
   npx wrangler pages deploy .output/public
   ```

