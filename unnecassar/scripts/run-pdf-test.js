/**
 * PDF Test Runner
 * 
 * This script sets up the environment for testing the PDF parser
 * and runs the test script with the correct TypeScript configuration.
 */

const { execSync } = require('child_process');
const path = require('path');
const fs = require('fs');

// Ensure uploads directory exists
const uploadsDir = path.join(process.cwd(), 'uploads');
if (!fs.existsSync(uploadsDir)) {
  fs.mkdirSync(uploadsDir, { recursive: true });
  console.log(`Created uploads directory: ${uploadsDir}`);
}

// Run the TypeScript test script
try {
  console.log('Running PDF parsing test...');
  execSync('npx tsx scripts/test-pdf-parsing.ts', { stdio: 'inherit' });
} catch (error) {
  console.error('Error running test script:', error);
  process.exit(1);
}
