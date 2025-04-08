/**
 * Test Script for Question Transformer
 * 
 * This script tests the question transformer functionality with the questions.json file.
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

// Get the current file's directory
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Define the transformer function inline since we can't easily import TypeScript
function transformQuestions(jsonData) {
  return jsonData.questions.map(transformQuestion);
}

function transformQuestion(jsonQuestion) {
  // Parse options
  const options = Object.entries(jsonQuestion.options).map(([key, value]) => ({
    id: key,
    text: value.trim()
  }));

  // Parse correct answers
  const correctAnswers = parseCorrectAnswers(jsonQuestion.answer);
  
  // Determine if question has multiple correct answers
  const isMultipleAnswer = correctAnswers.length > 1;

  // Determine domain based on question content
  const domain = determineDomain(jsonQuestion.question);

  // Extract tags from question content
  const tags = extractTags(jsonQuestion.question);

  return {
    id: jsonQuestion.id,
    text: jsonQuestion.question.trim(),
    options,
    correctAnswers,
    explanation: jsonQuestion.explanation.trim(),
    domain,
    difficulty: 'medium', // Default to medium difficulty
    tags,
    isMultipleAnswer
  };
}

function parseCorrectAnswers(answerStr) {
  // Check if the answer contains multiple options (e.g., "A, C, and D")
  if (answerStr.includes(',') || answerStr.includes('and')) {
    // Replace "and" with comma and split by comma
    const parts = answerStr.replace(/\s+and\s+/g, ',').split(',');
    
    // Extract letter options and trim whitespace
    return parts.map(part => part.trim().charAt(0)).filter(char => /[A-E]/.test(char));
  }
  
  // Single answer
  return [answerStr.trim()];
}

function determineDomain(text) {
  const lowerText = text.toLowerCase();
  
  if (lowerText.includes('ci/cd') || lowerText.includes('pipeline') || lowerText.includes('deployment') || lowerText.includes('codecommit')) {
    return 'SDLC Automation';
  }
  
  if (lowerText.includes('cloudformation') || lowerText.includes('infrastructure as code') || lowerText.includes('terraform')) {
    return 'Configuration Management and Infrastructure as Code';
  }
  
  if (lowerText.includes('cloudwatch') || lowerText.includes('logging') || lowerText.includes('monitoring')) {
    return 'Monitoring and Logging';
  }
  
  if (lowerText.includes('policy') || lowerText.includes('compliance') || lowerText.includes('standard')) {
    return 'Policies and Standards Automation';
  }
  
  if (lowerText.includes('incident') || lowerText.includes('event') || lowerText.includes('response')) {
    return 'Incident and Event Response';
  }
  
  if (lowerText.includes('availability') || lowerText.includes('fault') || lowerText.includes('disaster') || lowerText.includes('recovery')) {
    return 'High Availability, Fault Tolerance, and Disaster Recovery';
  }
  
  // Default domain if no match
  return 'SDLC Automation';
}

function extractTags(text) {
  const tags = [];
  const lowerText = text.toLowerCase();
  
  // AWS services
  const awsServices = [
    'ec2', 's3', 'lambda', 'cloudformation', 'cloudwatch', 'codepipeline', 
    'codecommit', 'codebuild', 'codedeploy', 'ecs', 'eks', 'dynamodb', 
    'rds', 'route53', 'iam', 'kms', 'sns', 'sqs', 'cloudfront'
  ];
  
  awsServices.forEach(service => {
    if (lowerText.includes(service)) {
      tags.push(service);
    }
  });
  
  // DevOps concepts
  const devOpsConcepts = [
    'ci/cd', 'continuous integration', 'continuous delivery', 'continuous deployment',
    'infrastructure as code', 'monitoring', 'logging', 'security', 'automation',
    'scaling', 'high availability', 'disaster recovery'
  ];
  
  devOpsConcepts.forEach(concept => {
    if (lowerText.includes(concept)) {
      tags.push(concept.replace(/\s+/g, '-'));
    }
  });
  
  return tags;
}

// Read the questions.json file
const filePath = path.join(__dirname, '..', 'questions.json');
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
