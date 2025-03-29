/**
 * Test Runner Script
 * 
 * This script sets up the environment and runs all tests for the application.
 */

const { execSync } = require('child_process');
const path = require('path');
const fs = require('fs');

// Ensure the test directory exists
const testDir = path.join(process.cwd(), 'tests');
if (!fs.existsSync(testDir)) {
  console.error('Test directory not found. Make sure you are in the project root.');
  process.exit(1);
}

// Install test dependencies if needed
try {
  console.log('Installing test dependencies...');
  execSync('pnpm add -D vitest @playwright/test', { stdio: 'inherit' });
  console.log('Test dependencies installed successfully.');
} catch (error) {
  console.error('Error installing test dependencies:', error);
  process.exit(1);
}

// Run the PDF parser unit tests
try {
  console.log('\n=== Running PDF Parser Unit Tests ===');
  execSync('npx vitest run tests/pdf-parser.test.ts', { stdio: 'inherit' });
} catch (error) {
  console.error('PDF parser tests failed:', error);
}

// Start the development server for API and integration tests
let serverProcess;
try {
  console.log('\n=== Starting Development Server ===');
  serverProcess = require('child_process').spawn('pnpm', ['dev'], {
    stdio: 'inherit',
    detached: true
  });
  
  // Give the server some time to start
  console.log('Waiting for server to start...');
  execSync('sleep 5');
  
  // Run the API tests
  console.log('\n=== Running API Tests ===');
  execSync('npx playwright test tests/api.spec.ts', { stdio: 'inherit' });
  
  // Run the integration tests
  console.log('\n=== Running Integration Tests ===');
  execSync('npx playwright test tests/integration.spec.ts', { stdio: 'inherit' });
  
} catch (error) {
  console.error('Tests failed:', error);
} finally {
  // Clean up the server process
  if (serverProcess) {
    console.log('Stopping development server...');
    process.kill(-serverProcess.pid);
  }
}

console.log('\n=== All Tests Completed ===');
