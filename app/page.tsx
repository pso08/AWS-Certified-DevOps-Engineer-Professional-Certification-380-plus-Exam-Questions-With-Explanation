'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Button } from '../src/components/ui/button';
import { ThemeToggle } from '@/components/theme-toggle';
import { Search, BarChart, BookOpen, Menu, X } from 'lucide-react';
import { getProgressData } from '@/lib/progress-tracker';

export default function Home() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [progressData, setProgressData] = useState<any>(null);
  
  // Load progress data
  useEffect(() => {
    setProgressData(getProgressData());
  }, []);
  
  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-900 to-slate-800 dark:from-slate-950 dark:to-slate-900 text-white">
      {/* Navigation Bar */}
      <nav className="border-b border-slate-700 dark:border-slate-800">
        <div className="container mx-auto px-4 py-4">
          <div className="flex justify-between items-center">
            <div className="flex items-center">
              <h1 className="text-xl md:text-2xl font-bold">AWS DevOps Quiz</h1>
            </div>
            
            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center space-x-4">
              <Link href="/search">
                <Button variant="ghost" className="text-white hover:bg-slate-700">
                  <Search className="h-4 w-4 mr-2" />
                  Search
                </Button>
              </Link>
              <Link href="/progress">
                <Button variant="ghost" className="text-white hover:bg-slate-700">
                  <BarChart className="h-4 w-4 mr-2" />
                  Progress
                </Button>
              </Link>
              <Link href="/download">
                <Button variant="ghost" className="text-white hover:bg-slate-700">
                  <BookOpen className="h-4 w-4 mr-2" />
                  Study Materials
                </Button>
              </Link>
              <ThemeToggle />
            </div>
            
            {/* Mobile Menu Button */}
            <div className="md:hidden flex items-center">
              <ThemeToggle />
              <Button 
                variant="ghost" 
                size="icon" 
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="ml-2"
              >
                {isMobileMenuOpen ? (
                  <X className="h-6 w-6" />
                ) : (
                  <Menu className="h-6 w-6" />
                )}
              </Button>
            </div>
          </div>
          
          {/* Mobile Navigation */}
          {isMobileMenuOpen && (
            <div className="md:hidden pt-4 pb-3 border-t border-slate-700 mt-4">
              <div className="flex flex-col space-y-3">
                <Link href="/search" onClick={() => setIsMobileMenuOpen(false)}>
                  <Button variant="ghost" className="w-full justify-start text-white hover:bg-slate-700">
                    <Search className="h-4 w-4 mr-2" />
                    Search
                  </Button>
                </Link>
                <Link href="/progress" onClick={() => setIsMobileMenuOpen(false)}>
                  <Button variant="ghost" className="w-full justify-start text-white hover:bg-slate-700">
                    <BarChart className="h-4 w-4 mr-2" />
                    Progress
                  </Button>
                </Link>
                <Link href="/download" onClick={() => setIsMobileMenuOpen(false)}>
                  <Button variant="ghost" className="w-full justify-start text-white hover:bg-slate-700">
                    <BookOpen className="h-4 w-4 mr-2" />
                    Study Materials
                  </Button>
                </Link>
              </div>
            </div>
          )}
        </div>
      </nav>
      
      <div className="container mx-auto px-4 py-8 md:py-16">
        <header className="text-center mb-8 md:mb-16">
          <h1 className="text-3xl md:text-5xl lg:text-6xl font-bold mb-4">
            AWS Certified DevOps Engineer Professional
          </h1>
          <p className="text-lg md:text-xl text-slate-300 max-w-3xl mx-auto">
            Prepare for your certification with our comprehensive quiz application featuring 350+ exam questions with detailed explanations
          </p>
        </header>

        {/* Progress Summary (if available) */}
        {progressData && progressData.quizProgress.answeredQuestions.length > 0 && (
          <div className="bg-slate-800/50 dark:bg-slate-800/30 p-4 md:p-6 rounded-lg border border-slate-700 mb-8 max-w-4xl mx-auto">
            <h2 className="text-xl font-bold mb-3">Your Progress</h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div>
                <p className="text-sm text-slate-400">Quiz Completion</p>
                <p className="text-2xl font-bold">
                  {Math.round((progressData.quizProgress.answeredQuestions.length / 384) * 100)}%
                </p>
              </div>
              <div>
                <p className="text-sm text-slate-400">Tests Completed</p>
                <p className="text-2xl font-bold">
                  {Object.keys(progressData.testHistory).length}
                </p>
              </div>
              <div>
                <p className="text-sm text-slate-400">Study Streak</p>
                <p className="text-2xl font-bold">
                  {progressData.studyStats.streakDays} days
                </p>
              </div>
              <div>
                <p className="text-sm text-slate-400">Total Study Time</p>
                <p className="text-2xl font-bold">
                  {progressData.studyStats.totalTimeSpent} min
                </p>
              </div>
            </div>
            <div className="mt-4">
              <Link href="/progress">
                <Button variant="outline" className="border-slate-600 text-white hover:bg-slate-700">
                  View Detailed Progress
                </Button>
              </Link>
            </div>
          </div>
        )}

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-8 max-w-6xl mx-auto">
          <div className="bg-slate-800/50 dark:bg-slate-800/30 p-6 md:p-8 rounded-lg border border-slate-700 shadow-xl">
            <h2 className="text-xl md:text-2xl font-bold mb-4">Practice Quiz</h2>
            <p className="text-slate-300 mb-6">
              Test your knowledge with our interactive quiz featuring real exam-style questions. Track your progress and identify areas for improvement.
            </p>
            <Link href="/quiz" className="block">
              <Button className="w-full bg-blue-600 hover:bg-blue-700 text-white">
                Start Quiz
              </Button>
            </Link>
          </div>

          <div className="bg-slate-800/50 dark:bg-slate-800/30 p-6 md:p-8 rounded-lg border border-slate-700 shadow-xl">
            <h2 className="text-xl md:text-2xl font-bold mb-4">Flashcards</h2>
            <p className="text-slate-300 mb-6">
              Study with interactive flashcards to memorize key concepts and test your knowledge. Flip cards to reveal answers and explanations.
            </p>
            <Link href="/flashcards" className="block">
              <Button className="w-full bg-purple-600 hover:bg-purple-700 text-white">
                Study Flashcards
              </Button>
            </Link>
          </div>

          <div className="bg-slate-800/50 dark:bg-slate-800/30 p-6 md:p-8 rounded-lg border border-slate-700 shadow-xl">
            <h2 className="text-xl md:text-2xl font-bold mb-4">Full Exam Simulation</h2>
            <p className="text-slate-300 mb-6">
              Take a timed, full-length practice exam that simulates the actual AWS DevOps Professional certification test with domain-specific scoring.
            </p>
            <Link href="/test" className="block">
              <Button className="w-full bg-amber-600 hover:bg-amber-700 text-white">
                Start Test Mode
              </Button>
            </Link>
          </div>

          <div className="bg-slate-800/50 dark:bg-slate-800/30 p-6 md:p-8 rounded-lg border border-slate-700 shadow-xl">
            <h2 className="text-xl md:text-2xl font-bold mb-4">Study Materials</h2>
            <p className="text-slate-300 mb-6">
              Access our collection of study materials, including sample questions, explanations, and reference guides to help you prepare for the exam.
            </p>
            <Link href="/download" className="block">
              <Button className="w-full bg-emerald-600 hover:bg-emerald-700 text-white">
                Download Resources
              </Button>
            </Link>
          </div>
        </div>

        <div className="mt-8 md:mt-16 bg-slate-800/50 dark:bg-slate-800/30 p-6 md:p-8 rounded-lg border border-slate-700 shadow-xl max-w-5xl mx-auto">
          <h2 className="text-xl md:text-2xl font-bold mb-4">Key Exam Topics</h2>
          <div className="grid md:grid-cols-2 gap-4">
            <div className="flex items-start">
              <div className="bg-blue-600 p-2 rounded-full mr-3 mt-1">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                </svg>
              </div>
              <div>
                <h3 className="font-semibold">SDLC Automation</h3>
                <p className="text-slate-300">CI/CD pipelines, infrastructure as code, and automated testing</p>
              </div>
            </div>
            <div className="flex items-start">
              <div className="bg-blue-600 p-2 rounded-full mr-3 mt-1">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                </svg>
              </div>
              <div>
                <h3 className="font-semibold">Configuration Management</h3>
                <p className="text-slate-300">Managing and deploying application configurations</p>
              </div>
            </div>
            <div className="flex items-start">
              <div className="bg-blue-600 p-2 rounded-full mr-3 mt-1">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                </svg>
              </div>
              <div>
                <h3 className="font-semibold">Monitoring & Logging</h3>
                <p className="text-slate-300">Implementing monitoring solutions and analyzing logs</p>
              </div>
            </div>
            <div className="flex items-start">
              <div className="bg-blue-600 p-2 rounded-full mr-3 mt-1">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                </svg>
              </div>
              <div>
                <h3 className="font-semibold">High Availability & Disaster Recovery</h3>
                <p className="text-slate-300">Designing resilient architectures and recovery strategies</p>
              </div>
            </div>
          </div>
        </div>

        <footer className="mt-8 md:mt-16 text-center text-slate-400">
          <p>© 2025 AWS DevOps Quiz App. All rights reserved.</p>
          <p className="mt-2">
            <Link href="/about" className="underline hover:text-white">About</Link> • 
            <Link href="/contact" className="underline hover:text-white ml-3">Contact</Link> • 
            <Link href="/privacy" className="underline hover:text-white ml-3">Privacy Policy</Link>
          </p>
        </footer>
      </div>
    </div>
  );
}
