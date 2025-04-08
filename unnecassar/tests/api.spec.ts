/**
 * API Test Script
 * 
 * This script tests the backend API routes to ensure they function correctly.
 */

import { test, expect } from '@playwright/test';

// Base URL for API requests
const API_BASE_URL = 'http://localhost:3000/api';

// Test the questions API
test('questions API', async ({ request }) => {
  // Test getting all questions
  const allQuestionsResponse = await request.get(`${API_BASE_URL}/questions`);
  expect(allQuestionsResponse.ok()).toBeTruthy();
  
  const allQuestionsData = await allQuestionsResponse.json();
  expect(allQuestionsData.questions).toBeDefined();
  expect(Array.isArray(allQuestionsData.questions)).toBe(true);
  
  // Test filtering questions by domain
  const domainFilterResponse = await request.get(`${API_BASE_URL}/questions?domain=Deployment%20and%20Infrastructure`);
  expect(domainFilterResponse.ok()).toBeTruthy();
  
  const domainFilterData = await domainFilterResponse.json();
  expect(domainFilterData.questions).toBeDefined();
  expect(Array.isArray(domainFilterData.questions)).toBe(true);
  
  // Test filtering questions by difficulty
  const difficultyFilterResponse = await request.get(`${API_BASE_URL}/questions?difficulty=hard`);
  expect(difficultyFilterResponse.ok()).toBeTruthy();
  
  const difficultyFilterData = await difficultyFilterResponse.json();
  expect(difficultyFilterData.questions).toBeDefined();
  expect(Array.isArray(difficultyFilterData.questions)).toBe(true);
  
  // Test filtering multiple-answer questions
  const multipleAnswerFilterResponse = await request.get(`${API_BASE_URL}/questions?isMultipleAnswer=true`);
  expect(multipleAnswerFilterResponse.ok()).toBeTruthy();
  
  const multipleAnswerFilterData = await multipleAnswerFilterResponse.json();
  expect(multipleAnswerFilterData.questions).toBeDefined();
  expect(Array.isArray(multipleAnswerFilterData.questions)).toBe(true);
  
  // If we have questions, test getting a specific question
  if (allQuestionsData.questions.length > 0) {
    const questionId = allQuestionsData.questions[0].id;
    const questionResponse = await request.get(`${API_BASE_URL}/questions/${questionId}`);
    expect(questionResponse.ok()).toBeTruthy();
    
    const questionData = await questionResponse.json();
    expect(questionData.id).toBe(questionId);
    expect(questionData.text).toBeDefined();
    expect(questionData.options).toBeDefined();
    expect(questionData.correctAnswers).toBeDefined();
  }
});

// Test the authentication API
test('authentication API', async ({ request }) => {
  // Test registration
  const registrationResponse = await request.post(`${API_BASE_URL}/auth/register`, {
    data: {
      email: `test-${Date.now()}@example.com`,
      password: 'Password123!',
      name: 'Test User'
    }
  });
  
  expect(registrationResponse.ok()).toBeTruthy();
  
  const registrationData = await registrationResponse.json();
  expect(registrationData.success).toBe(true);
  expect(registrationData.user).toBeDefined();
  
  // Test login
  const loginResponse = await request.post(`${API_BASE_URL}/auth/login`, {
    data: {
      email: registrationData.user.email,
      password: 'Password123!'
    }
  });
  
  expect(loginResponse.ok()).toBeTruthy();
  
  const loginData = await loginResponse.json();
  expect(loginData.success).toBe(true);
  expect(loginData.user).toBeDefined();
});

// Test the progress API
test('progress API', async ({ request }) => {
  // First login to get authentication
  const loginResponse = await request.post(`${API_BASE_URL}/auth/login`, {
    data: {
      email: 'test@example.com',
      password: 'Password123!'
    }
  });
  
  expect(loginResponse.ok()).toBeTruthy();
  
  // Get the auth cookie
  const cookies = await loginResponse.headerValues('set-cookie');
  
  // Test getting progress
  const progressResponse = await request.get(`${API_BASE_URL}/progress`, {
    headers: {
      Cookie: cookies.join('; ')
    }
  });
  
  expect(progressResponse.ok()).toBeTruthy();
  
  const progressData = await progressResponse.json();
  expect(progressData.progress).toBeDefined();
  
  // Test updating progress
  const updateProgressResponse = await request.post(`${API_BASE_URL}/progress`, {
    data: {
      questionId: 'q1',
      isCorrect: true,
      timeSpent: 30
    },
    headers: {
      Cookie: cookies.join('; ')
    }
  });
  
  expect(updateProgressResponse.ok()).toBeTruthy();
  
  const updateProgressData = await updateProgressResponse.json();
  expect(updateProgressData.success).toBe(true);
});

// Test the study sets API
test('study sets API', async ({ request }) => {
  // First login to get authentication
  const loginResponse = await request.post(`${API_BASE_URL}/auth/login`, {
    data: {
      email: 'test@example.com',
      password: 'Password123!'
    }
  });
  
  expect(loginResponse.ok()).toBeTruthy();
  
  // Get the auth cookie
  const cookies = await loginResponse.headerValues('set-cookie');
  
  // Test creating a study set
  const createSetResponse = await request.post(`${API_BASE_URL}/study-sets`, {
    data: {
      name: `Test Set ${Date.now()}`,
      description: 'A test study set',
      questionIds: ['q1', 'q2']
    },
    headers: {
      Cookie: cookies.join('; ')
    }
  });
  
  expect(createSetResponse.ok()).toBeTruthy();
  
  const createSetData = await createSetResponse.json();
  expect(createSetData.success).toBe(true);
  expect(createSetData.studySetId).toBeDefined();
  
  // Test getting all study sets
  const allSetsResponse = await request.get(`${API_BASE_URL}/study-sets`, {
    headers: {
      Cookie: cookies.join('; ')
    }
  });
  
  expect(allSetsResponse.ok()).toBeTruthy();
  
  const allSetsData = await allSetsResponse.json();
  expect(allSetsData.studySets).toBeDefined();
  expect(Array.isArray(allSetsData.studySets)).toBe(true);
  
  // Test getting a specific study set
  const setResponse = await request.get(`${API_BASE_URL}/study-sets?id=${createSetData.studySetId}`, {
    headers: {
      Cookie: cookies.join('; ')
    }
  });
  
  expect(setResponse.ok()).toBeTruthy();
  
  const setData = await setResponse.json();
  expect(setData.studySet).toBeDefined();
  expect(setData.questions).toBeDefined();
  
  // Test updating a study set
  const updateSetResponse = await request.put(`${API_BASE_URL}/study-sets`, {
    data: {
      id: createSetData.studySetId,
      name: `Updated Test Set ${Date.now()}`,
      description: 'An updated test study set'
    },
    headers: {
      Cookie: cookies.join('; ')
    }
  });
  
  expect(updateSetResponse.ok()).toBeTruthy();
  
  const updateSetData = await updateSetResponse.json();
  expect(updateSetData.success).toBe(true);
  
  // Test deleting a study set
  const deleteSetResponse = await request.delete(`${API_BASE_URL}/study-sets?id=${createSetData.studySetId}`, {
    headers: {
      Cookie: cookies.join('; ')
    }
  });
  
  expect(deleteSetResponse.ok()).toBeTruthy();
  
  const deleteSetData = await deleteSetResponse.json();
  expect(deleteSetData.success).toBe(true);
});

// Test the glossary API
test('glossary API', async ({ request }) => {
  // Test getting all glossary terms
  const allTermsResponse = await request.get(`${API_BASE_URL}/glossary`);
  expect(allTermsResponse.ok()).toBeTruthy();
  
  const allTermsData = await allTermsResponse.json();
  expect(allTermsData.terms).toBeDefined();
  expect(Array.isArray(allTermsData.terms)).toBe(true);
  
  // Test getting a specific term
  if (allTermsData.terms.length > 0) {
    const term = allTermsData.terms[0].term;
    const termResponse = await request.get(`${API_BASE_URL}/glossary?term=${term}`);
    expect(termResponse.ok()).toBeTruthy();
    
    const termData = await termResponse.json();
    expect(termData.term).toBe(term);
    expect(termData.definition).toBeDefined();
  }
});
