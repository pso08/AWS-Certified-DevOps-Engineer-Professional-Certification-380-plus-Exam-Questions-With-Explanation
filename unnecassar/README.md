# AWS DevOps Quiz Application

An interactive quiz application to help prepare for the AWS Certified DevOps Engineer Professional exam, featuring 350+ practice questions with detailed explanations.

## Features

- **Interactive Quiz**: Test your knowledge with real exam-style questions
- **Detailed Explanations**: Learn from comprehensive explanations for each question
- **Progress Tracking**: Monitor your performance and identify areas for improvement
- **Study Materials**: Access downloadable resources to enhance your preparation

## Technology Stack

- **Frontend**: Next.js 15, React 19, Tailwind CSS
- **Styling**: Radix UI components with custom theming
- **Deployment**: Cloudflare Pages

## Getting Started

### Prerequisites

- Node.js 20.x or later
- npm or pnpm

### Installation

```bash
# Clone the repository
git clone https://github.com/yourusername/AWS-Certified-DevOps-Engineer-Professional-Certification-380-plus-Exam-Questions-With-Explanation.git
cd AWS-Certified-DevOps-Engineer-Professional-Certification-380-plus-Exam-Questions-With-Explanation/

# Install dependencies
npm install --legacy-peer-deps
# or
pnpm install --no-frozen-lockfile
```

### Development

```bash
# Start the development server
npm run dev
# or
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser to see the application.

### Building for Production

```bash
# Build the application
npm run build
# or
pnpm build
```

## Deployment

This application is configured for deployment to Cloudflare Pages. See [CLOUDFLARE_DEPLOYMENT.md](./CLOUDFLARE_DEPLOYMENT.md) for detailed deployment instructions.

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



## Project Structure

```
aws-devops-quiz-app/
├── app/                  # Next.js app directory
│   ├── quiz/             # Quiz page
│   ├── download/         # Download resources page
│   ├── globals.css       # Global styles
│   ├── layout.tsx        # Root layout
│   └── page.tsx          # Home page
├── public/               # Static assets
├── src/                  # Source code
│   ├── components/       # UI components
│   └── lib/              # Utility functions
├── scripts/              # Build and deployment scripts
│   └── post-build.js     # Post-build script for Cloudflare Pages
└── wrangler.toml         # Cloudflare Wrangler configuration
```

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Acknowledgments

- AWS Certification Program
- Next.js and React teams
- Cloudflare Pages for hosting
