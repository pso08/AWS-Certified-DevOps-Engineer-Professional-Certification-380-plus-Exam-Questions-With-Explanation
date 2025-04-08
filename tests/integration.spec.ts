/**
 * Integration Test Script
 * 
 * This script tests the integration between frontend components and backend APIs.
 * It verifies that the application functions correctly as a whole.
 */

import { test, expect } from '@playwright/test';

// Test the main application flow
test('main application flow', async ({ page }) => {
  // Navigate to the application
  await page.goto('http://localhost:3000');
  
  // Verify the page title
  await expect(page).toHaveTitle(/AWS DevOps Professional Certification Quiz/);
  
  // Test navigation between tabs
  await page.click('text=Flashcards');
  await expect(page.locator('h3:has-text("Question")')).toBeVisible();
  
  await page.click('text=Quiz');
  await expect(page.locator('button:has-text("Submit Answer")')).toBeVisible();
  
  await page.click('text=Test');
  await expect(page.locator('text=AWS DevOps Professional Practice Test')).toBeVisible();
  
  await page.click('text=Study Sets');
  await expect(page.locator('text=Create New Set')).toBeVisible();
  
  await page.click('text=Glossary');
  await expect(page.locator('text=AWS DevOps Glossary')).toBeVisible();
  
  await page.click('text=Settings');
  await expect(page.locator('text=Application Settings')).toBeVisible();
  
  // Test PDF upload functionality
  await page.click('text=Upload PDF');
  await expect(page.locator('text=Upload AWS Exam PDF')).toBeVisible();
  
  // Return to dashboard
  await page.click('text=Dashboard');
  await expect(page.locator('text=Overall Progress')).toBeVisible();
});

// Test the flashcard functionality
test('flashcard functionality', async ({ page }) => {
  await page.goto('http://localhost:3000');
  await page.click('text=Flashcards');
  
  // Verify flashcard content
  await expect(page.locator('text=Question')).toBeVisible();
  
  // Test flipping the card
  await page.click('text=Show Answer');
  await expect(page.locator('text=Answer')).toBeVisible();
  
  // Test navigation between cards
  await page.click('text=Next');
  await page.click('text=Show Answer');
  await expect(page.locator('text=Answer')).toBeVisible();
  
  await page.click('text=Previous');
  await page.click('text=Show Answer');
  await expect(page.locator('text=Answer')).toBeVisible();
});

// Test the quiz functionality with answer submission
test('quiz functionality with answer submission', async ({ page }) => {
  await page.goto('http://localhost:3000');
  await page.click('text=Quiz');
  
  // Verify quiz question content
  await expect(page.locator('text=Question')).toBeVisible();
  
  // Test single-answer question
  await page.click('label:has-text("AWS CodeDeploy")');
  await page.click('text=Submit Answer');
  await expect(page.locator('text=Correct!')).toBeVisible();
  
  // Move to next question
  await page.click('text=Next Question');
  
  // Test multiple-answer question
  await page.click('label:has-text("Blue/Green deployment")');
  await page.click('label:has-text("In-place deployment")');
  await page.click('text=Submit Answer');
  await expect(page.locator('text=Correct!')).toBeVisible();
});

// Test the test mode functionality
test('test mode functionality', async ({ page }) => {
  await page.goto('http://localhost:3000');
  await page.click('text=Test');
  
  // Verify test mode content
  await expect(page.locator('text=AWS DevOps Professional Practice Test')).toBeVisible();
  
  // Answer first question
  await page.click('label:has-text("AWS CodeDeploy")');
  await page.click('text=Submit Answer');
  await page.click('text=Next Question');
  
  // Answer second question
  await page.click('label:has-text("Blue/Green deployment")');
  await page.click('label:has-text("In-place deployment")');
  await page.click('text=Submit Answer');
  
  // End the test
  await page.click('text=End Test');
  
  // Verify we're redirected to the dashboard
  await expect(page.locator('text=Overall Progress')).toBeVisible();
});

// Test the study set creation functionality
test('study set creation', async ({ page }) => {
  await page.goto('http://localhost:3000');
  await page.click('text=Study Sets');
  
  // Create a new study set
  await page.click('text=Create New Set');
  await page.fill('input[id="name"]', 'AWS CodeDeploy Questions');
  await page.fill('textarea[id="description"]', 'Questions about AWS CodeDeploy service');
  
  // Select questions
  await page.click('label:has-text("Which AWS service can be used to automate")');
  await page.click('label:has-text("Which of the following are valid deployment strategies")');
  
  // Create the set
  await page.click('text=Create Set');
  
  // Verify the set was created
  await expect(page.locator('text=AWS CodeDeploy Questions')).toBeVisible();
});

// Test the error reporting functionality
test('error reporting', async ({ page }) => {
  await page.goto('http://localhost:3000');
  await page.click('text=Quiz');
  
  // Open error report dialog
  await page.click('text=Report Error');
  
  // Fill in the report
  await page.fill('textarea[placeholder="Describe the issue with this question"]', 'The explanation is unclear');
  
  // Submit the report
  await page.click('text=Submit Report');
  
  // Verify confirmation message
  await expect(page.locator('text=Error report submitted successfully')).toBeVisible();
});
