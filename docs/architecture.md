/**
 * Application Architecture Document
 * AWS DevOps Quiz Application
 */

# AWS DevOps Quiz Application Architecture

## Overview

This document outlines the architecture for a self-hostable web-based application designed to help users prepare for the AWS Certified DevOps Professional Certification Exam. The application converts PDF files containing multiple-choice practice questions into a structured, interactive learning tool similar to Quizlet.

## System Architecture

The application follows a modern web application architecture with:

1. **Frontend**: Next.js-based React application with Tailwind CSS for styling
2. **Backend**: Next.js API routes with Cloudflare Workers for serverless functions
3. **Database**: D1 database (SQLite-compatible) for data storage
4. **PDF Processing**: Server-side PDF parsing using pdf-parse and pdfjs-dist

### Architecture Diagram

```
┌─────────────────┐     ┌─────────────────┐     ┌─────────────────┐
│                 │     │                 │     │                 │
│  User Interface │────▶│  Next.js API    │────▶│  D1 Database    │
│  (Next.js)      │◀────│  Routes         │◀────│  (SQLite)       │
│                 │     │                 │     │                 │
└─────────────────┘     └─────────────────┘     └─────────────────┘
        │                       │                        
        │                       │                        
        ▼                       ▼                        
┌─────────────────┐     ┌─────────────────┐             
│                 │     │                 │             
│  PDF Processing │     │  Authentication │             
│  Module         │     │  & User Mgmt    │             
│                 │     │                 │             
└─────────────────┘     └─────────────────┘             
```

## Core Components

### 1. PDF Parsing Module

- Extracts text from PDF files using pdf-parse and pdfjs-dist
- Identifies questions, options, correct answers, and explanations using pattern recognition
- Validates extracted content for accuracy
- Transforms extracted data into structured format for database storage

### 2. Data Models

The application uses the following data models:

- **User**: User account information and authentication
- **Question**: Question text, options, correct answers, domain, difficulty, and tags
- **UserProgress**: Tracks user performance on individual questions
- **StudySession**: Records of study sessions with performance metrics
- **StudySet**: Custom collections of questions created by users
- **ErrorReport**: User-submitted reports of errors in questions

### 3. Frontend Components

- **Layout**: Responsive layout with dark mode support
- **Flashcard Component**: Interactive flashcards with flip animation
- **Quiz Mode**: Timed quizzes with configurable question count
- **Test Mode**: Full-length practice tests simulating exam conditions
- **Answer Submission Flow**: Handles both single and multiple-answer questions
- **Progress Dashboard**: Visualizes user performance and progress
- **Study Set Manager**: Interface for creating and managing custom study sets

### 4. Backend Services

- **Authentication**: User registration, login, and session management
- **Question Management**: CRUD operations for questions and options
- **Progress Tracking**: Records and analyzes user performance
- **PDF Processing**: Handles PDF uploads and extraction
- **Error Reporting**: Allows users to report errors in questions

## Multiple-Answer Question Handling

The application specifically addresses multiple-answer questions with:

1. **Identification**: Questions are flagged as `isMultipleAnswer` in the data model
2. **UI Indication**: Clear visual indication when a question requires multiple selections
3. **Selection Interface**: Checkbox-style selection for multiple answers vs. radio buttons for single answers
4. **Validation**: Correct answers stored as arrays of option IDs for proper validation
5. **Submission Flow**:
   - Users must explicitly commit to their answer(s) by clicking a "Submit Answer" button
   - No feedback is provided until after submission
   - After submission, correct answer(s) and explanation are displayed

## Database Schema

The database schema includes tables for:

- Users and authentication
- Questions and options
- User progress tracking
- Study sessions and performance
- Custom study sets
- Error reports

## API Endpoints

The application exposes RESTful API endpoints for:

- User authentication and management
- Question retrieval and filtering
- Progress tracking and statistics
- Study session management
- Study set creation and management
- PDF upload and processing
- Error reporting

## Deployment

The application is designed for self-hosting with:

- Comprehensive setup instructions
- Docker containerization option
- Database migration scripts
- Environment configuration guidance

## Security Considerations

- User authentication with secure password handling
- Input validation and sanitization
- CSRF protection
- Rate limiting for API endpoints
- Secure PDF processing

## Performance Optimization

- Database indexing for frequent queries
- Caching of question data
- Optimized PDF processing
- Lazy loading of components
- Pagination for large data sets
