# AWS DevOps Quiz Application - Architecture Overview

This document provides an overview of the application architecture, explaining the design decisions, component interactions, and data flow.

## System Architecture

The AWS DevOps Quiz Application follows a modern web application architecture with the following key components:

### Frontend

- **Framework**: Next.js with React
- **Styling**: Tailwind CSS
- **State Management**: React Hooks and Context API
- **UI Components**: Custom components with shadcn/ui

### Backend

- **API Routes**: Next.js API routes
- **Database**: Cloudflare D1 (SQLite-compatible)
- **Authentication**: JWT-based authentication
- **File Processing**: PDF parsing with pdf-parse and pdfjs-dist

### Infrastructure

- **Hosting**: Self-hostable on various platforms (traditional servers, Docker, cloud platforms)
- **Deployment**: Multiple options including Docker containers and direct deployment

## Component Diagram

```
┌─────────────────────────────────────────────────────────────┐
│                        Client Browser                        │
└───────────────────────────────┬─────────────────────────────┘
                                │
                                ▼
┌─────────────────────────────────────────────────────────────┐
│                         Next.js Server                       │
│                                                             │
│  ┌─────────────────┐      ┌──────────────────────────────┐  │
│  │   React UI      │      │         API Routes           │  │
│  │                 │      │                              │  │
│  │  - Flashcards   │      │  - /api/questions           │  │
│  │  - Quiz Mode    │◄────►│  - /api/auth                │  │
│  │  - Test Mode    │      │  - /api/progress            │  │
│  │  - Dashboard    │      │  - /api/sessions            │  │
│  │  - Study Sets   │      │  - /api/study-sets          │  │
│  │                 │      │  - /api/error-reports       │  │
│  └─────────────────┘      │  - /api/settings            │  │
│                           │  - /api/glossary            │  │
│                           │  - /api/pdf                 │  │
│                           └──────────────┬─────────────┘   │
└───────────────────────────────┬──────────┼─────────────────┘
                                │          │
                                ▼          ▼
┌───────────────────────┐    ┌─────────────────────────────┐
│   File Storage        │    │         Database            │
│                       │    │                             │
│  - Uploaded PDFs      │    │  - Users                    │
│  - Extracted Questions│    │  - Questions                │
│  - User Data          │    │  - Options                  │
│                       │    │  - Progress                 │
└───────────────────────┘    │  - Study Sets               │
                             │  - Sessions                 │
                             │  - Error Reports            │
                             │  - Settings                 │
                             └─────────────────────────────┘
```

## Data Flow

1. **PDF Processing Flow**:
   - User uploads PDF file
   - Backend processes PDF and extracts questions, options, answers, and explanations
   - Extracted data is stored in the database
   - User is notified when processing is complete

2. **Study Flow**:
   - User selects study mode (Flashcards, Quiz, Test)
   - Frontend fetches questions from the backend
   - User interacts with questions
   - Progress is tracked and sent to the backend
   - Analytics are updated based on user performance

3. **Authentication Flow**:
   - User registers or logs in
   - Backend validates credentials and issues JWT token
   - Token is stored in HTTP-only cookie
   - Subsequent requests include the token for authentication

## Database Schema

### Users Table
```sql
CREATE TABLE users (
  id TEXT PRIMARY KEY,
  email TEXT UNIQUE NOT NULL,
  name TEXT NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

### Questions Table
```sql
CREATE TABLE questions (
  id TEXT PRIMARY KEY,
  text TEXT NOT NULL,
  explanation TEXT,
  domain TEXT,
  difficulty TEXT,
  is_multiple_answer INTEGER DEFAULT 0,
  tags TEXT
);
```

### Question Options Table
```sql
CREATE TABLE question_options (
  id TEXT NOT NULL,
  question_id TEXT NOT NULL,
  text TEXT NOT NULL,
  is_correct INTEGER DEFAULT 0,
  PRIMARY KEY (id, question_id),
  FOREIGN KEY (question_id) REFERENCES questions(id) ON DELETE CASCADE
);
```

### User Progress Table
```sql
CREATE TABLE user_progress (
  user_id TEXT NOT NULL,
  question_id TEXT NOT NULL,
  is_correct INTEGER DEFAULT 0,
  attempt_count INTEGER DEFAULT 0,
  last_attempt_date TIMESTAMP,
  time_spent INTEGER DEFAULT 0,
  PRIMARY KEY (user_id, question_id),
  FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
  FOREIGN KEY (question_id) REFERENCES questions(id) ON DELETE CASCADE
);
```

### Study Sets Table
```sql
CREATE TABLE study_sets (
  id TEXT PRIMARY KEY,
  user_id TEXT NOT NULL,
  name TEXT NOT NULL,
  description TEXT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
);
```

### Study Set Questions Table
```sql
CREATE TABLE study_set_questions (
  study_set_id TEXT NOT NULL,
  question_id TEXT NOT NULL,
  PRIMARY KEY (study_set_id, question_id),
  FOREIGN KEY (study_set_id) REFERENCES study_sets(id) ON DELETE CASCADE,
  FOREIGN KEY (question_id) REFERENCES questions(id) ON DELETE CASCADE
);
```

## Security Considerations

1. **Authentication**: JWT tokens with secure HTTP-only cookies
2. **Data Validation**: Input validation on both client and server
3. **Error Handling**: Proper error handling without exposing sensitive information
4. **CSRF Protection**: CSRF tokens for form submissions
5. **Content Security Policy**: Restrictive CSP headers
6. **Rate Limiting**: API rate limiting to prevent abuse

## Performance Optimizations

1. **Static Generation**: Pre-rendered pages where possible
2. **Code Splitting**: Dynamic imports for code splitting
3. **Image Optimization**: Next.js image optimization
4. **Caching**: API response caching
5. **Database Indexing**: Proper indexes for frequently queried fields

## Scalability Considerations

1. **Stateless Design**: Stateless API design for horizontal scaling
2. **Database Scaling**: Support for different database backends
3. **Containerization**: Docker support for easy deployment and scaling
4. **Cloud Readiness**: Designed to work with cloud platforms

## Future Enhancements

1. **OAuth Integration**: Support for social login
2. **Real-time Collaboration**: Collaborative study sessions
3. **AI-powered Recommendations**: Personalized study recommendations
4. **Mobile App**: Native mobile applications
5. **Offline Support**: Progressive Web App features for offline use
