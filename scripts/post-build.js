// This script handles post-build tasks for Cloudflare Pages deployment
const fs = require('fs');
const path = require('path');

// Ensure output directories exist
const outputDir = path.join(process.cwd(), '.output');
const publicDir = path.join(outputDir, 'public');
const staticDir = path.join(publicDir, '_next', 'static');

// Create directories if they don't exist
if (!fs.existsSync(outputDir)) {
  fs.mkdirSync(outputDir, { recursive: true });
}

if (!fs.existsSync(publicDir)) {
  fs.mkdirSync(publicDir, { recursive: true });
}

if (!fs.existsSync(staticDir)) {
  fs.mkdirSync(staticDir, { recursive: true });
}

// Copy necessary files from .next to .output
const nextDir = path.join(process.cwd(), '.next');
if (fs.existsSync(nextDir)) {
  // Copy static assets
  const nextStaticDir = path.join(nextDir, 'static');
  if (fs.existsSync(nextStaticDir)) {
    copyDirectory(nextStaticDir, staticDir);
    console.log('✅ Copied static assets to .output/public/_next/static');
  }

  // Copy server files
  const serverDir = path.join(nextDir, 'server');
  const outputServerDir = path.join(outputDir, 'server');
  if (fs.existsSync(serverDir)) {
    if (!fs.existsSync(outputServerDir)) {
      fs.mkdirSync(outputServerDir, { recursive: true });
    }
    copyDirectory(serverDir, outputServerDir);
    console.log('✅ Copied server files to .output/server');
  }

  // Copy BUILD_ID file
  const buildIdPath = path.join(nextDir, 'BUILD_ID');
  if (fs.existsSync(buildIdPath)) {
    fs.copyFileSync(buildIdPath, path.join(outputDir, 'BUILD_ID'));
    console.log('✅ Copied BUILD_ID file to .output/');
  }
}

// Copy public directory contents to .output/public
const appPublicDir = path.join(process.cwd(), 'public');
if (fs.existsSync(appPublicDir)) {
  copyDirectory(appPublicDir, publicDir);
  console.log('✅ Copied public directory to .output/public');
}

// Copy worker.js if it exists from .open-next
const openNextDir = path.join(process.cwd(), '.open-next');
const workerPath = path.join(openNextDir, 'worker.js');
if (fs.existsSync(workerPath)) {
  fs.copyFileSync(workerPath, path.join(outputDir, 'worker.js'));
  console.log('✅ Copied worker.js to .output/');
}

console.log('✅ Post-build tasks completed successfully');

// Helper function to copy a directory recursively
function copyDirectory(source, destination) {
  if (!fs.existsSync(destination)) {
    fs.mkdirSync(destination, { recursive: true });
  }

  const files = fs.readdirSync(source);
  for (const file of files) {
    const sourcePath = path.join(source, file);
    const destPath = path.join(destination, file);
    
    const stat = fs.statSync(sourcePath);
    if (stat.isDirectory()) {
      copyDirectory(sourcePath, destPath);
    } else {
      fs.copyFileSync(sourcePath, destPath);
    }
  }
}
