-- Add PDF processing jobs table to the database schema

-- Create table for tracking PDF processing jobs
CREATE TABLE IF NOT EXISTS pdf_processing_jobs (
  id TEXT PRIMARY KEY,
  status TEXT NOT NULL CHECK (status IN ('pending', 'processing', 'completed', 'failed')),
  data TEXT, -- JSON data with additional information
  created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
);
