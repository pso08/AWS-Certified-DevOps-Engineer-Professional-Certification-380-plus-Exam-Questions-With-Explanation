'use client';

/**
 * Progress Tracker Module
 * 
 * This module provides functionality to track user progress across the application,
 * including quiz completion, test results, and study statistics.
 */

import { TestResults } from './types';

// Define the structure for progress data
export interface ProgressData {
  // Quiz progress
  quizProgress: {
    currentQuestion: number;
    answeredQuestions: number[];
    score: number;
    completed: boolean;
    lastUpdated: string;
    questionResults: {
      [questionId: number]: {
        answered: boolean;
        correct: boolean;
        selectedOptions: number[];
        attempts: number;
      }
    };
  };
  
  // Test progress
  testHistory: {
    [testId: string]: {
      date: string;
      results: TestResults;
    }
  };
  
  // Flashcard progress
  flashcardProgress: {
    viewedCards: number[];
    masteredCards: number[];
    lastUpdated: string;
  };
  
  // Study statistics
  studyStats: {
    totalTimeSpent: number; // in minutes
    sessionsCompleted: number;
    lastStudyDate: string;
    streakDays: number;
    domainPerformance: {
      [domain: string]: {
        correct: number;
        total: number;
      }
    };
  };
}

// Default progress data
const defaultProgressData: ProgressData = {
  quizProgress: {
    currentQuestion: 0,
    answeredQuestions: [],
    score: 0,
    completed: false,
    lastUpdated: new Date().toISOString(),
    questionResults: {}
  },
  testHistory: {},
  flashcardProgress: {
    viewedCards: [],
    masteredCards: [],
    lastUpdated: new Date().toISOString()
  },
  studyStats: {
    totalTimeSpent: 0,
    sessionsCompleted: 0,
    lastStudyDate: new Date().toISOString(),
    streakDays: 0,
    domainPerformance: {}
  }
};

// Storage key for progress data
const PROGRESS_STORAGE_KEY = 'aws_devops_quiz_progress';

/**
 * Get the current progress data from localStorage
 */
export function getProgressData(): ProgressData {
  if (typeof window === 'undefined') {
    return defaultProgressData;
  }
  
  try {
    const storedData = localStorage.getItem(PROGRESS_STORAGE_KEY);
    if (!storedData) {
      return defaultProgressData;
    }
    
    return JSON.parse(storedData) as ProgressData;
  } catch (error) {
    console.error('Error retrieving progress data:', error);
    return defaultProgressData;
  }
}

/**
 * Save progress data to localStorage
 */
export function saveProgressData(data: ProgressData): void {
  if (typeof window === 'undefined') {
    return;
  }
  
  try {
    localStorage.setItem(PROGRESS_STORAGE_KEY, JSON.stringify(data));
  } catch (error) {
    console.error('Error saving progress data:', error);
  }
}

/**
 * Update quiz progress
 */
export function updateQuizProgress(
  questionId: number, 
  isCorrect: boolean, 
  selectedOptions: number[],
  currentQuestion: number,
  score: number,
  completed: boolean = false
): void {
  const progressData = getProgressData();
  
  // Update question results
  progressData.quizProgress.questionResults[questionId] = {
    answered: true,
    correct: isCorrect,
    selectedOptions,
    attempts: (progressData.quizProgress.questionResults[questionId]?.attempts || 0) + 1
  };
  
  // Update overall quiz progress
  progressData.quizProgress.currentQuestion = currentQuestion;
  progressData.quizProgress.score = score;
  progressData.quizProgress.completed = completed;
  progressData.quizProgress.lastUpdated = new Date().toISOString();
  
  // Add to answered questions if not already there
  if (!progressData.quizProgress.answeredQuestions.includes(questionId)) {
    progressData.quizProgress.answeredQuestions.push(questionId);
  }
  
  // Save updated progress
  saveProgressData(progressData);
}

/**
 * Save test results
 */
export function saveTestResults(results: TestResults): void {
  const progressData = getProgressData();
  const testId = `test_${Date.now()}`;
  
  // Add test to history
  progressData.testHistory[testId] = {
    date: new Date().toISOString(),
    results
  };
  
  // Update study stats
  progressData.studyStats.sessionsCompleted++;
  progressData.studyStats.lastStudyDate = new Date().toISOString();
  
  // Update domain performance
  results.domainResults.forEach(domainResult => {
    const domainName = domainResult.domain;
    if (!progressData.studyStats.domainPerformance[domainName]) {
      progressData.studyStats.domainPerformance[domainName] = {
        correct: 0,
        total: 0
      };
    }
    
    progressData.studyStats.domainPerformance[domainName].correct += domainResult.correctAnswers;
    progressData.studyStats.domainPerformance[domainName].total += domainResult.totalQuestions;
  });
  
  // Update streak
  updateStudyStreak(progressData);
  
  // Save updated progress
  saveProgressData(progressData);
}

/**
 * Update flashcard progress
 */
export function updateFlashcardProgress(
  cardId: number,
  mastered: boolean = false
): void {
  const progressData = getProgressData();
  
  // Add to viewed cards if not already there
  if (!progressData.flashcardProgress.viewedCards.includes(cardId)) {
    progressData.flashcardProgress.viewedCards.push(cardId);
  }
  
  // Add to mastered cards if marked as mastered
  if (mastered && !progressData.flashcardProgress.masteredCards.includes(cardId)) {
    progressData.flashcardProgress.masteredCards.push(cardId);
  }
  
  progressData.flashcardProgress.lastUpdated = new Date().toISOString();
  
  // Save updated progress
  saveProgressData(progressData);
}

/**
 * Update study time
 */
export function updateStudyTime(minutes: number): void {
  const progressData = getProgressData();
  
  progressData.studyStats.totalTimeSpent += minutes;
  progressData.studyStats.lastStudyDate = new Date().toISOString();
  
  // Update streak
  updateStudyStreak(progressData);
  
  // Save updated progress
  saveProgressData(progressData);
}

/**
 * Update study streak
 */
function updateStudyStreak(progressData: ProgressData): void {
  const today = new Date().toDateString();
  const lastStudyDate = new Date(progressData.studyStats.lastStudyDate).toDateString();
  
  if (lastStudyDate === today) {
    // Already studied today, no change to streak
    return;
  }
  
  const yesterday = new Date();
  yesterday.setDate(yesterday.getDate() - 1);
  const yesterdayString = yesterday.toDateString();
  
  if (lastStudyDate === yesterdayString) {
    // Studied yesterday, increment streak
    progressData.studyStats.streakDays++;
  } else if (lastStudyDate !== today) {
    // Didn't study yesterday, reset streak
    progressData.studyStats.streakDays = 1;
  }
}

/**
 * Get quiz completion percentage
 */
export function getQuizCompletionPercentage(): number {
  const progressData = getProgressData();
  const answeredCount = progressData.quizProgress.answeredQuestions.length;
  
  // Assuming we know the total number of questions
  // This should be replaced with the actual total from the application
  const totalQuestions = 384; // Update this with the actual count
  
  return Math.round((answeredCount / totalQuestions) * 100);
}

/**
 * Get domain performance data
 */
export function getDomainPerformance(): { 
  domain: string; 
  correct: number; 
  total: number; 
  percentage: number 
}[] {
  const progressData = getProgressData();
  const domainPerformance = progressData.studyStats.domainPerformance;
  
  return Object.entries(domainPerformance).map(([domain, data]) => {
    return {
      domain,
      correct: data.correct,
      total: data.total,
      percentage: data.total > 0 ? Math.round((data.correct / data.total) * 100) : 0
    };
  });
}

/**
 * Reset all progress data
 */
export function resetAllProgress(): void {
  if (typeof window === 'undefined') {
    return;
  }
  
  localStorage.setItem(PROGRESS_STORAGE_KEY, JSON.stringify(defaultProgressData));
}

/**
 * Reset quiz progress only
 */
export function resetQuizProgress(): void {
  const progressData = getProgressData();
  
  progressData.quizProgress = {
    currentQuestion: 0,
    answeredQuestions: [],
    score: 0,
    completed: false,
    lastUpdated: new Date().toISOString(),
    questionResults: {}
  };
  
  saveProgressData(progressData);
}

/**
 * Export progress data (for backup)
 */
export function exportProgressData(): string {
  const progressData = getProgressData();
  return JSON.stringify(progressData);
}

/**
 * Import progress data (from backup)
 */
export function importProgressData(jsonData: string): boolean {
  try {
    const data = JSON.parse(jsonData) as ProgressData;
    saveProgressData(data);
    return true;
  } catch (error) {
    console.error('Error importing progress data:', error);
    return false;
  }
}
