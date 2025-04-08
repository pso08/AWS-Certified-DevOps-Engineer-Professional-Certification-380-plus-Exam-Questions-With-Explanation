#!/usr/bin/env node

/**
 * Post-build script to prepare the OpenNext output for Cloudflare Pages deployment
 * 
 * This script creates the proper directory structure expected by Cloudflare Pages
 * by copying files from the OpenNext output directory to the Cloudflare Pages
 * expected directory structure.
 */

const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

// Define paths
const rootDir = path.resolve(__dirname, '..');
const openNextDir = path.join(rootDir, '.open-next');
const outputDir = path.join(rootDir, '.output');
const outputPublicDir = path.join(outputDir, 'public');
const nextStaticDir = path.join(rootDir, '.next', 'static');
const publicDir = path.join(rootDir, 'public');

console.log('🚀 Starting post-build process for Cloudflare Pages deployment...');

// Create output directories
console.log('📁 Creating output directories...');
if (!fs.existsSync(outputDir)) {
  fs.mkdirSync(outputDir, { recursive: true });
}
if (!fs.existsSync(outputPublicDir)) {
  fs.mkdirSync(outputPublicDir, { recursive: true });
}

// Copy worker.js to .output/
console.log('📋 Copying worker.js...');
if (fs.existsSync(path.join(openNextDir, 'worker.js'))) {
  fs.copyFileSync(
    path.join(openNextDir, 'worker.js'),
    path.join(outputDir, 'worker.js')
  );
} else {
  console.error('❌ worker.js not found in .open-next directory!');
  process.exit(1);
}

// Copy static assets to .output/public/_next/static
console.log('📋 Copying static assets...');
const outputNextStaticDir = path.join(outputPublicDir, '_next', 'static');
if (fs.existsSync(nextStaticDir)) {
  fs.mkdirSync(outputNextStaticDir, { recursive: true });
  execSync(`cp -r ${nextStaticDir}/* ${outputNextStaticDir}`);
} else {
  console.warn('⚠️ .next/static directory not found, skipping static assets copy');
}

// Copy public assets to .output/public
console.log('📋 Copying public assets...');
if (fs.existsSync(publicDir)) {
  execSync(`cp -r ${publicDir}/* ${outputPublicDir}`);
} else {
  console.warn('⚠️ public directory not found, skipping public assets copy');
}

// Copy any other necessary files from .open-next to .output
console.log('📋 Copying additional OpenNext assets...');
if (fs.existsSync(path.join(openNextDir, 'static'))) {
  execSync(`cp -r ${path.join(openNextDir, 'static')}/* ${outputPublicDir}`);
}

// Create a BUILD_ID file if it doesn't exist
console.log('📋 Creating BUILD_ID file...');
const buildIdPath = path.join(rootDir, '.next', 'BUILD_ID');
const outputBuildIdPath = path.join(outputPublicDir, 'BUILD_ID');
if (fs.existsSync(buildIdPath)) {
  fs.copyFileSync(buildIdPath, outputBuildIdPath);
} else {
  // Generate a timestamp-based BUILD_ID if the original doesn't exist
  fs.writeFileSync(outputBuildIdPath, new Date().toISOString());
}

console.log('✅ Post-build process completed successfully!');
console.log('📂 Output directory structure:');
execSync(`find ${outputDir} -type f | sort`).toString().split('\n').forEach(file => {
  if (file) console.log(`  ${file}`);
});
