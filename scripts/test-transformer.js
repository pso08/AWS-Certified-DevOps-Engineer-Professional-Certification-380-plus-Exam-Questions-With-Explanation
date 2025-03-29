/**
 * Test Script for Question Transformer
 * 
 * This script tests the question transformer functionality with the questions.json file.
 */

import fs from 'fs';
import path from 'path';
import { transformQuestions } from '../src/lib/question-transformer';

// Read the questions.json file
const filePath = path.join(process.cwd(), 'questions.json');
const fileContents = fs.readFileSync(filePath, 'utf8');
const jsonData = JSON.parse(fileContents);

// Transform the questions
const transformedQuestions = transformQuestions(jsonData);

// Print some statistics
console.log(`Total questions: ${transformedQuestions.length}`);
console.log(`Multiple answer questions: ${transformedQuestions.filter(q => q.isMultipleAnswer).length}`);

// Print a sample transformed question
const sampleQuestion = transformedQuestions[0];
console.log('\nSample transformed question:');
console.log(JSON.stringify(sampleQuestion, null, 2));

// Verify all questions have the required fields
const validQuestions = transformedQuestions.filter(question => {
  return (
    question.id &&
    question.text &&
    question.options && question.options.length > 0 &&
    question.correctAnswers && question.correctAnswers.length > 0 &&
    question.domain &&
    question.difficulty
  );
});

console.log(`\nValid questions: ${validQuestions.length}`);
console.log(`Invalid questions: ${transformedQuestions.length - validQuestions.length}`);

// If there are invalid questions, print the first one
if (validQuestions.length < transformedQuestions.length) {
  const invalidQuestion = transformedQuestions.find(q => {
    return !(
      q.id &&
      q.text &&
      q.options && q.options.length > 0 &&
      q.correctAnswers && q.correctAnswers.length > 0 &&
      q.domain &&
      q.difficulty
    );
  });
  
  console.log('\nSample invalid question:');
  console.log(JSON.stringify(invalidQuestion, null, 2));
}

console.log('\nTransformation test completed.');
