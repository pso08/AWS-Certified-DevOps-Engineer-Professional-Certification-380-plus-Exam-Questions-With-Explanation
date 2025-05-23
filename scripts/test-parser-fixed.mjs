/**
 * Test Script for PDF Parser
 * 
 * This script tests the PDF parser functionality with a sample text.
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

// Get the current file's directory
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Define a simple PDF parser that doesn't rely on pdf-parse
// This is a simplified version for testing purposes
function extractQuestionsFromText(text) {
  const questions = [];
  
  // Split text into lines for processing
  const lines = text.split('\n').filter(line => line.trim() !== '');
  
  // Regular expression to identify question numbers (e.g., "1.", "2.", etc.)
  const questionRegex = /^\s*(\d+)\.\s+(.+)/;
  
  // Regular expression to identify options (e.g., "A.", "B.", etc.)
  const optionRegex = /^\s*([A-E])\.\s+(.+)/;
  
  // Regular expression to identify the answer line - improved to better match multiple answers
  const answerRegex = /^\s*Answer:\s+([A-E](?:[,\s]+(?:and\s+)?[A-E])*)/i;
  
  // Regular expression to identify the explanation
  const explanationRegex = /^\s*Explanation:\s+(.+)/i;
  
  let currentQuestion = null;
  let currentOptions = [];
  let parsingExplanation = false;
  let explanationText = '';
  
  for (let i = 0; i < lines.length; i++) {
    const line = lines[i].trim();
    
    // Check if this line starts a new question
    const questionMatch = line.match(questionRegex);
    if (questionMatch) {
      // If we were parsing a question, save it before starting a new one
      if (currentQuestion && currentQuestion.text && currentOptions.length > 0) {
        questions.push(completeQuestion(currentQuestion, currentOptions, explanationText));
      }
      
      // Start a new question
      currentQuestion = {
        id: `q-${questionMatch[1]}`,
        text: questionMatch[2],
        options: [],
        correctAnswers: [],
        explanation: '',
        domain: determineDomain(questionMatch[2]),
        difficulty: 'medium',
        tags: extractTags(questionMatch[2]),
        isMultipleAnswer: false
      };
      
      currentOptions = [];
      parsingExplanation = false;
      explanationText = '';
      continue;
    }
    
    // If we're not currently parsing a question, skip this line
    if (!currentQuestion) continue;
    
    // Check if this line is an option
    const optionMatch = line.match(optionRegex);
    if (optionMatch && !parsingExplanation) {
      currentOptions.push({
        id: optionMatch[1],
        text: optionMatch[2]
      });
      continue;
    }
    
    // Check if this line indicates the answer
    const answerMatch = line.match(answerRegex);
    if (answerMatch && !parsingExplanation) {
      // Parse answers like "A, B, and C" or "A and B" or just "A"
      const answerText = answerMatch[1];
      const answers = parseAnswers(answerText);
      
      currentQuestion.correctAnswers = answers;
      currentQuestion.isMultipleAnswer = answers.length > 1;
      continue;
    }
    
    // Check if this line starts the explanation
    const explanationMatch = line.match(explanationRegex);
    if (explanationMatch) {
      parsingExplanation = true;
      explanationText = explanationMatch[1];
      continue;
    }
    
    // If we're parsing an explanation, append this line to it
    if (parsingExplanation) {
      explanationText += ' ' + line;
    }
  }
  
  // Don't forget to add the last question
  if (currentQuestion && currentQuestion.text && currentOptions.length > 0) {
    questions.push(completeQuestion(currentQuestion, currentOptions, explanationText));
  }
  
  return questions;
}

function parseAnswers(answerText) {
  console.log(`Parsing answer text: "${answerText}"`);
  
  // Replace "and" with comma and split by comma
  const cleanedText = answerText.replace(/\s+and\s+/g, ', ');
  console.log(`Cleaned text: "${cleanedText}"`);
  
  // Split by comma and trim whitespace
  const answers = cleanedText.split(/,\s*/).map(part => part.trim());
  console.log(`Split answers: ${JSON.stringify(answers)}`);
  
  // Filter out any non-letter parts and return unique answers
  const filteredAnswers = [...new Set(answers.filter(answer => /^[A-E]$/.test(answer)))];
  console.log(`Filtered answers: ${JSON.stringify(filteredAnswers)}`);
  
  return filteredAnswers;
}

function completeQuestion(question, options, explanation) {
  return {
    id: question.id || `q-${Math.random().toString(36).substring(2, 9)}`,
    text: question.text || '',
    options: options,
    correctAnswers: question.correctAnswers || [],
    explanation: explanation || '',
    domain: question.domain || 'SDLC Automation',
    difficulty: question.difficulty || 'medium',
    tags: question.tags || [],
    isMultipleAnswer: question.isMultipleAnswer || false
  };
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

// Create a sample text for testing
const sampleText = `1. What is AWS CodeDeploy?
A. A service that automates code deployments to any instance
B. A service that builds and tests code in the cloud
C. A service that stores code in private Git repositories
D. A service that monitors application performance

Answer: A

Explanation: AWS CodeDeploy is a service that automates code deployments to any instance, including Amazon EC2 instances and instances running on-premises.

2. Which of the following are valid deployment targets for AWS CodeDeploy? (Select THREE)
A. S3 buckets
B. GitHub Repositories
C. Subversion Repositories
D. Bitbucket Repositories
E. EC2 instances
F. Lambda functions

Answer: A, E, and F

Explanation: AWS CodeDeploy can deploy to Amazon EC2 instances, AWS Lambda functions, and Amazon S3 buckets.`;

// Test the parser with the sample text
function testParser() {
  try {
    console.log('Testing PDF parser with sample text');
    
    const questions = extractQuestionsFromText(sampleText);
    
    console.log(`Extracted ${questions.length} questions from sample text`);
    console.log(`Multiple answer questions: ${questions.filter(q => q.isMultipleAnswer).length}`);
    
    if (questions.length > 0) {
      console.log('\nSample extracted questions:');
      questions.forEach((q, i) => {
        console.log(`\nQuestion ${i+1}:`);
        console.log(`Text: ${q.text}`);
        console.log(`Options: ${q.options.map(o => `${o.id}: ${o.text}`).join(' | ')}`);
        console.log(`Correct Answers: ${q.correctAnswers.join(', ')}`);
        console.log(`Is Multiple Answer: ${q.isMultipleAnswer}`);
      });
    }
    
    console.log('\nPDF parsing test completed.');
  } catch (error) {
    console.error('Error testing parser:', error);
  }
}

// Run the test
testParser();
