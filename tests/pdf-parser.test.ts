/**
 * Unit Test Script for PDF Parser
 * 
 * This script tests the PDF parsing functionality to ensure it correctly
 * extracts questions, options, answers, and explanations from the PDF file.
 */

import { processPdf } from '../src/lib/pdf-parser';
import fs from 'fs';
import path from 'path';
import { expect, test, describe } from 'vitest';

// Path to the test PDF file
const PDF_PATH = path.join(process.cwd(), '[ FreeCourseWeb.com ] AWS Certified DevOps Engineer - Professio....pdf');

describe('PDF Parser', () => {
  test('should extract questions from PDF', async () => {
    // Check if the PDF file exists
    expect(fs.existsSync(PDF_PATH)).toBe(true);
    
    // Process the PDF file
    const questions = await processPdf(PDF_PATH);
    
    // Verify questions were extracted
    expect(questions).toBeDefined();
    expect(Array.isArray(questions)).toBe(true);
    expect(questions.length).toBeGreaterThan(0);
    
    // Verify question structure
    const firstQuestion = questions[0];
    expect(firstQuestion).toHaveProperty('id');
    expect(firstQuestion).toHaveProperty('text');
    expect(firstQuestion).toHaveProperty('options');
    expect(firstQuestion).toHaveProperty('correctAnswers');
    expect(firstQuestion).toHaveProperty('explanation');
    expect(firstQuestion).toHaveProperty('isMultipleAnswer');
    
    // Verify options structure
    expect(Array.isArray(firstQuestion.options)).toBe(true);
    expect(firstQuestion.options.length).toBeGreaterThan(0);
    
    const firstOption = firstQuestion.options[0];
    expect(firstOption).toHaveProperty('id');
    expect(firstOption).toHaveProperty('text');
    
    // Verify correctAnswers structure
    expect(Array.isArray(firstQuestion.correctAnswers)).toBe(true);
    expect(firstQuestion.correctAnswers.length).toBeGreaterThan(0);
    
    // Verify multiple-answer questions are correctly identified
    const multipleAnswerQuestions = questions.filter(q => q.isMultipleAnswer);
    const singleAnswerQuestions = questions.filter(q => !q.isMultipleAnswer);
    
    console.log(`Found ${multipleAnswerQuestions.length} multiple-answer questions`);
    console.log(`Found ${singleAnswerQuestions.length} single-answer questions`);
    
    // Check a multiple-answer question
    if (multipleAnswerQuestions.length > 0) {
      const multiQuestion = multipleAnswerQuestions[0];
      expect(multiQuestion.correctAnswers.length).toBeGreaterThan(1);
      expect(multiQuestion.isMultipleAnswer).toBe(true);
    }
    
    // Check a single-answer question
    if (singleAnswerQuestions.length > 0) {
      const singleQuestion = singleAnswerQuestions[0];
      expect(singleQuestion.correctAnswers.length).toBe(1);
      expect(singleQuestion.isMultipleAnswer).toBe(false);
    }
  });
  
  test('should handle questions with different formats', async () => {
    const questions = await processPdf(PDF_PATH);
    
    // Check for questions with different formats
    const questionsWithBulletPoints = questions.filter(q => 
      q.text.includes('•') || q.options.some(o => o.text.includes('•'))
    );
    
    const questionsWithNumberedLists = questions.filter(q => 
      /\d+\.\s/.test(q.text) || q.options.some(o => /\d+\.\s/.test(o.text))
    );
    
    console.log(`Found ${questionsWithBulletPoints.length} questions with bullet points`);
    console.log(`Found ${questionsWithNumberedLists.length} questions with numbered lists`);
    
    // Verify that the parser can handle these different formats
    if (questionsWithBulletPoints.length > 0) {
      const bulletQuestion = questionsWithBulletPoints[0];
      expect(bulletQuestion).toHaveProperty('text');
      expect(bulletQuestion).toHaveProperty('options');
      expect(bulletQuestion).toHaveProperty('correctAnswers');
    }
    
    if (questionsWithNumberedLists.length > 0) {
      const numberedQuestion = questionsWithNumberedLists[0];
      expect(numberedQuestion).toHaveProperty('text');
      expect(numberedQuestion).toHaveProperty('options');
      expect(numberedQuestion).toHaveProperty('correctAnswers');
    }
  });
});
