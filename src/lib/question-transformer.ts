/**
 * Question Transformer Module
 * 
 * This module transforms questions from the JSON format to the application's expected data model.
 * Improved parsing of multiple answer formats (comma-separated and "and" format).
 */

import { Question, Option, Domain, QuestionDifficulty } from './types';

interface JsonQuestion {
  id: string;
  question: string;
  options: {
    [key: string]: string;
  };
  answer: string;
  explanation: string;
}

interface JsonQuestions {
  questions: JsonQuestion[];
}

/**
 * Transform questions from JSON format to application data model
 * @param jsonData The JSON data containing questions
 * @returns Array of transformed questions
 */
export function transformQuestions(jsonData: JsonQuestions): Question[] {
  // Ensure we're processing the full array of questions
  if (!jsonData.questions || !Array.isArray(jsonData.questions)) {
    console.error('Invalid questions data format:', jsonData);
    return [];
  }
  
  console.log(`Transforming ${jsonData.questions.length} questions`);
  
  // Process all questions in the array
  return jsonData.questions.map((q, index) => {
    try {
      return transformQuestion(q);
    } catch (error) {
      console.error(`Error transforming question ${index}:`, error);
      // Return a placeholder question to avoid breaking the app
      return {
        id: `error-${index}`,
        text: `Error processing question ${index}`,
        options: [{ id: 'A', text: 'Error' }],
        correctAnswers: ['A'],
        explanation: 'This question could not be processed correctly.',
        domain: Domain.SDLC_AUTOMATION,
        difficulty: QuestionDifficulty.MEDIUM,
        tags: ['error'],
        isMultipleAnswer: false
      };
    }
  });
}

/**
 * Transform a single question from JSON format to application data model
 * @param jsonQuestion The JSON question object
 * @returns Transformed question
 */
export function transformQuestion(jsonQuestion: JsonQuestion): Question {
  // Parse options
  const options: Option[] = Object.entries(jsonQuestion.options).map(([key, value]) => ({
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
    id: jsonQuestion.id || `q-${Math.random().toString(36).substr(2, 9)}`,
    text: jsonQuestion.question.trim(),
    options,
    correctAnswers,
    explanation: jsonQuestion.explanation ? jsonQuestion.explanation.trim() : 'No explanation provided.',
    domain,
    difficulty: QuestionDifficulty.MEDIUM, // Default to medium difficulty
    tags,
    isMultipleAnswer
  };
}

/**
 * Parse correct answers from answer string
 * @param answerStr The answer string (e.g., "A" or "A, C, and D")
 * @returns Array of correct answer IDs
 */
function parseCorrectAnswers(answerStr: string): string[] {
  if (!answerStr) {
    console.warn('Empty answer string provided');
    return ['A']; // Default to A if no answer provided
  }
  
  // Normalize the answer string by trimming whitespace
  const normalizedAnswer = answerStr.trim();
  
  // Check if the answer contains multiple options
  if (normalizedAnswer.includes(',') || normalizedAnswer.toLowerCase().includes(' and ')) {
    // First replace "and" with comma (case insensitive)
    let processedAnswer = normalizedAnswer.replace(/\s+and\s+/gi, ',');
    
    // Split by comma and process each part
    const parts = processedAnswer.split(',');
    
    // Extract letter options, trim whitespace, and filter out any non-letter parts
    return parts
      .map(part => part.trim())
      .filter(part => part.length > 0)
      .map(part => {
        // If the part is just a single letter (A-Z), return it directly
        if (/^[A-Z]$/i.test(part)) {
          return part.toUpperCase();
        }
        // If it's something like "A." or "A:", extract just the letter
        if (/^[A-Z][.:]?$/i.test(part)) {
          return part.charAt(0).toUpperCase();
        }
        // Return the full part (this could be a letter ID like "A", "B", etc.)
        return part;
      })
      .filter(part => part.length > 0); // Filter out any empty parts
  }
  
  // Single answer - check if it's a valid option ID
  return [normalizedAnswer];
}

/**
 * Determine the domain of a question based on its content
 * @param text Question text
 * @returns Domain enum value
 */
function determineDomain(text: string): Domain {
  const lowerText = text.toLowerCase();
  
  if (lowerText.includes('ci/cd') || lowerText.includes('pipeline') || lowerText.includes('deployment') || lowerText.includes('codecommit')) {
    return Domain.SDLC_AUTOMATION;
  }
  
  if (lowerText.includes('cloudformation') || lowerText.includes('infrastructure as code') || lowerText.includes('terraform')) {
    return Domain.CONFIG_MANAGEMENT;
  }
  
  if (lowerText.includes('cloudwatch') || lowerText.includes('logging') || lowerText.includes('monitoring')) {
    return Domain.MONITORING_LOGGING;
  }
  
  if (lowerText.includes('policy') || lowerText.includes('compliance') || lowerText.includes('standard')) {
    return Domain.POLICIES_STANDARDS;
  }
  
  if (lowerText.includes('incident') || lowerText.includes('event') || lowerText.includes('response')) {
    return Domain.INCIDENT_RESPONSE;
  }
  
  if (lowerText.includes('availability') || lowerText.includes('fault') || lowerText.includes('disaster') || lowerText.includes('recovery')) {
    return Domain.HIGH_AVAILABILITY;
  }
  
  // Default domain if no match
  return Domain.SDLC_AUTOMATION;
}

/**
 * Extract tags from question text
 * @param text Question text
 * @returns Array of tags
 */
function extractTags(text: string): string[] {
  const tags: string[] = [];
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
