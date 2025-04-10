// Enhanced version of the post-build script with better error handling and logging
const fs = require('fs');
const path = require('path');

// Improved logging function
function log(message, type = 'info') {
  const timestamp = new Date().toISOString();
  const prefix = type === 'error' ? '❌ ERROR' : type === 'warning' ? '⚠️ WARNING' : '✅ INFO';
  console.log(`[${timestamp}] ${prefix}: ${message}`);
}

// Error handling wrapper
function safeExecute(fn, errorMessage) {
  try {
    fn();
    return true;
  } catch (error) {
    log(`${errorMessage}: ${error.message}`, 'error');
    return false;
  }
}

// Ensure output directories exist
const outputDir = path.join(process.cwd(), '.output');
const publicDir = path.join(outputDir, 'public');
const staticDir = path.join(publicDir, '_next', 'static');

// Create directories if they don't exist
safeExecute(() => {
  if (!fs.existsSync(outputDir)) {
    fs.mkdirSync(outputDir, { recursive: true });
  }
  
  if (!fs.existsSync(publicDir)) {
    fs.mkdirSync(publicDir, { recursive: true });
  }
  
  if (!fs.existsSync(staticDir)) {
    fs.mkdirSync(staticDir, { recursive: true });
  }
}, 'Failed to create output directories');

// Copy necessary files from .next to .output
const nextDir = path.join(process.cwd(), '.next');
if (fs.existsSync(nextDir)) {
  // Copy static assets
  const nextStaticDir = path.join(nextDir, 'static');
  if (fs.existsSync(nextStaticDir)) {
    safeExecute(() => {
      copyDirectory(nextStaticDir, staticDir);
      log('Copied static assets to .output/public/_next/static');
    }, 'Failed to copy static assets');
  } else {
    log('Static directory not found at ' + nextStaticDir, 'warning');
  }

  // Copy server files
  const serverDir = path.join(nextDir, 'server');
  const outputServerDir = path.join(outputDir, 'server');
  if (fs.existsSync(serverDir)) {
    safeExecute(() => {
      if (!fs.existsSync(outputServerDir)) {
        fs.mkdirSync(outputServerDir, { recursive: true });
      }
      copyDirectory(serverDir, outputServerDir);
      log('Copied server files to .output/server');
    }, 'Failed to copy server files');
  } else {
    log('Server directory not found at ' + serverDir, 'warning');
  }

  // Copy BUILD_ID file
  const buildIdPath = path.join(nextDir, 'BUILD_ID');
  if (fs.existsSync(buildIdPath)) {
    safeExecute(() => {
      fs.copyFileSync(buildIdPath, path.join(outputDir, 'BUILD_ID'));
      log('Copied BUILD_ID file to .output/');
    }, 'Failed to copy BUILD_ID file');
  } else {
    log('BUILD_ID file not found at ' + buildIdPath, 'warning');
  }
} else {
  log('Next.js build directory not found at ' + nextDir, 'warning');
}

// Copy public directory contents to .output/public
const appPublicDir = path.join(process.cwd(), 'public');
if (fs.existsSync(appPublicDir)) {
  safeExecute(() => {
    copyDirectory(appPublicDir, publicDir);
    log('Copied public directory to .output/public');
  }, 'Failed to copy public directory');
} else {
  log('Public directory not found at ' + appPublicDir, 'warning');
}

// Copy worker.js if it exists from .open-next
const openNextDir = path.join(process.cwd(), '.open-next');
const workerPath = path.join(openNextDir, 'worker.js');
if (fs.existsSync(workerPath)) {
  safeExecute(() => {
    fs.copyFileSync(workerPath, path.join(outputDir, 'worker.js'));
    log('Copied worker.js to .output/');
  }, 'Failed to copy worker.js');
} else {
  // Try to generate a minimal worker.js if it doesn't exist
  safeExecute(() => {
    const minimalWorker = `
    export default {
      async fetch(request, env) {
        return new Response("Worker is running", { status: 200 });
      }
    };
    `;
    fs.writeFileSync(path.join(outputDir, 'worker.js'), minimalWorker);
    log('Created minimal worker.js in .output/ as fallback');
  }, 'Failed to create minimal worker.js');
}

log('Post-build tasks completed');

// Helper function to copy a directory recursively with better error handling
function copyDirectory(source, destination) {
  if (!fs.existsSync(destination)) {
    fs.mkdirSync(destination, { recursive: true });
  }

  try {
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
  } catch (error) {
    log(`Error copying directory from ${source} to ${destination}: ${error.message}`, 'error');
    throw error;
  }
}
