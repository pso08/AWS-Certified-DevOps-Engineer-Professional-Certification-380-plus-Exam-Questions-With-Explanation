/**
 * Test script for PDF parsing module
 * 
 * This script tests the PDF parsing functionality by processing a sample PDF file
 * and outputting the extracted questions to a JSON file.
 */

import { processPdf } from '../src/lib/pdf-parser';
import fs from 'fs/promises';
import path from 'path';

// Path to the PDF file
const PDF_PATH = path.join(process.cwd(), '[ FreeCourseWeb.com ] AWS Certified DevOps Engineer - Professio....pdf');
// Output JSON file
const OUTPUT_PATH = path.join(process.cwd(), 'extracted-questions.json');

async function testPdfParsing() {
  try {
    console.log('Starting PDF parsing test...');
    console.log(`Processing PDF file: ${PDF_PATH}`);
    
    // Process the PDF file
    const questions = await processPdf(PDF_PATH);
    
    console.log(`Successfully extracted ${questions.length} questions from the PDF.`);
    
    // Count multiple-answer questions
    const multipleAnswerQuestions = questions.filter(q => q.isMultipleAnswer);
    console.log(`Found ${multipleAnswerQuestions.length} multiple-answer questions.`);
    
    // Write the questions to a JSON file
    await fs.writeFile(OUTPUT_PATH, JSON.stringify(questions, null, 2));
    
    console.log(`Questions saved to ${OUTPUT_PATH}`);
    
    // Print a sample question
    if (questions.length > 0) {
      console.log('\nSample Question:');
      console.log(JSON.stringify(questions[0], null, 2));
    }
    
    console.log('\nPDF parsing test completed successfully.');
  } catch (error) {
    console.error('Error testing PDF parsing:', error);
  }
}

// Run the test
testPdfParsing();
