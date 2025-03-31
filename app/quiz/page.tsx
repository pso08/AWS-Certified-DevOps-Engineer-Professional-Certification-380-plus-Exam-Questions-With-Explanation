'use client';

import { useState, useEffect } from 'react';
import { Button } from '../../src/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '../../src/components/ui/card';
import { RadioGroup, RadioGroupItem } from '../../src/components/ui/radio-group';
import { Label } from '../../src/components/ui/label';
import { Progress } from '../../src/components/ui/progress';
import Link from 'next/link';
import questionsData from '../../questions.json';
import QuizQuestion from '@/components/quiz-question';
import { Question } from '@/lib/types';

// Convert the questions from the JSON file to the format expected by the quiz
const quizQuestions = questionsData.questions.map(q => {
  // Convert options object to array
  const optionsArray = Object.entries(q.options).map(([id, text]) => ({
    id,
    text
  }));
  
  // Check if answer contains multiple options (comma-separated or "and" format)
  let correctAnswers: string[];
  if (q.answer.includes(',')) {
    correctAnswers = q.answer.split(',').map(a => a.trim());
  } else if (q.answer.includes(' and ')) {
    correctAnswers = q.answer.split(' and ').map(a => a.trim());
  } else {
    correctAnswers = [q.answer.trim()];
  }
  
  return {
    id: q.id,
    text: q.question,
    options: optionsArray,
    correctAnswers: correctAnswers,
    explanation: q.explanation,
    isMultipleAnswer: correctAnswers.length > 1,
    domain: q.domain,
    difficulty: q.difficulty
  } as Question;
});

// Interface for tracking answered questions
interface AnsweredQuestion {
  questionId: string;
  selectedAnswers: string[];
  isCorrect: boolean;
}

export default function QuizPage() {
  const [currentQuestion, setCurrentQuestion] = useState(() => {
    // Try to get saved position from localStorage
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('quiz_current_question');
      return saved ? parseInt(saved, 10) : 0;
    }
    return 0;
  });
  
  // Track answered questions and their selections
  const [answeredQuestions, setAnsweredQuestions] = useState<AnsweredQuestion[]>([]);
  
  const [score, setScore] = useState(() => {
    // Try to get saved score from localStorage
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('quiz_score');
      return saved ? parseInt(saved, 10) : 0;
    }
    return 0;
  });
  
  const [quizCompleted, setQuizCompleted] = useState(() => {
    // Try to get saved completion status from localStorage
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('quiz_completed');
      return saved === 'true';
    }
    return false;
  });

  // Load saved answered questions from localStorage
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const savedAnswers = localStorage.getItem('quiz_answered_questions');
      if (savedAnswers) {
        try {
          setAnsweredQuestions(JSON.parse(savedAnswers));
        } catch (e) {
          console.error('Failed to parse saved answers:', e);
        }
      }
    }
  }, []);

  // Save answered questions to localStorage whenever it changes
  useEffect(() => {
    if (typeof window !== 'undefined' && answeredQuestions.length > 0) {
      localStorage.setItem('quiz_answered_questions', JSON.stringify(answeredQuestions));
    }
  }, [answeredQuestions]);

  // Handle answer submission
  const handleSubmit = (isCorrect: boolean, selectedAnswers: string[]) => {
    // Update answered questions
    const updatedAnsweredQuestions = [...answeredQuestions];
    const existingIndex = updatedAnsweredQuestions.findIndex(
      q => q.questionId === quizQuestions[currentQuestion].id
    );
    
    if (existingIndex >= 0) {
      // Update existing answer
      updatedAnsweredQuestions[existingIndex] = {
        questionId: quizQuestions[currentQuestion].id,
        selectedAnswers,
        isCorrect
      };
    } else {
      // Add new answer
      updatedAnsweredQuestions.push({
        questionId: quizQuestions[currentQuestion].id,
        selectedAnswers,
        isCorrect
      });
    }
    
    setAnsweredQuestions(updatedAnsweredQuestions);
    
    // Update score if correct
    if (isCorrect) {
      // Only increment score if this is a new correct answer
      if (existingIndex < 0 || !answeredQuestions[existingIndex].isCorrect) {
        const newScore = score + 1;
        setScore(newScore);
        // Save score to localStorage
        if (typeof window !== 'undefined') {
          localStorage.setItem('quiz_score', newScore.toString());
        }
      }
    }
  };

  // Handle moving to next question
  const handleNextQuestion = () => {
    if (currentQuestion < quizQuestions.length - 1) {
      const nextQuestion = currentQuestion + 1;
      setCurrentQuestion(nextQuestion);
      // Save progress to localStorage
      if (typeof window !== 'undefined') {
        localStorage.setItem('quiz_current_question', nextQuestion.toString());
      }
    } else {
      setQuizCompleted(true);
      // Save completion status to localStorage
      if (typeof window !== 'undefined') {
        localStorage.setItem('quiz_completed', 'true');
      }
    }
  };

  // Handle moving to previous question
  const handlePreviousQuestion = () => {
    if (currentQuestion > 0) {
      const prevQuestion = currentQuestion - 1;
      setCurrentQuestion(prevQuestion);
      // Save progress to localStorage
      if (typeof window !== 'undefined') {
        localStorage.setItem('quiz_current_question', prevQuestion.toString());
      }
    }
  };

  const resetQuiz = () => {
    setCurrentQuestion(0);
    setAnsweredQuestions([]);
    setScore(0);
    setQuizCompleted(false);
    
    // Clear localStorage for quiz
    if (typeof window !== 'undefined') {
      localStorage.removeItem('quiz_current_question');
      localStorage.removeItem('quiz_score');
      localStorage.removeItem('quiz_completed');
      localStorage.removeItem('quiz_answered_questions');
    }
  };

  const progress = ((currentQuestion + 1) / quizQuestions.length) * 100;

  // Check if current question has been answered
  const currentQuestionAnswered = answeredQuestions.find(
    q => q.questionId === quizQuestions[currentQuestion].id
  );
  
  // Get selected answers for current question (if previously answered)
  const currentSelectedAnswers = currentQuestionAnswered?.selectedAnswers || [];
  const isCurrentQuestionAnswered = !!currentQuestionAnswered;

  if (quizCompleted) {
    return (
      <div className="min-h-screen bg-slate-900 text-white flex items-center justify-center p-4">
        <Card className="w-full max-w-3xl bg-slate-800 border-slate-700 text-white">
          <CardHeader className="text-center">
            <CardTitle className="text-3xl">Quiz Completed!</CardTitle>
            <CardDescription className="text-slate-300 text-lg">
              You scored {score} out of {quizQuestions.length}
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="text-center">
              <div className="text-6xl font-bold mb-4">
                {Math.round((score / quizQuestions.length) * 100)}%
              </div>
              <Progress 
                value={(score / quizQuestions.length) * 100} 
                className="h-4 bg-slate-700"
              />
            </div>
            
            <div className="bg-slate-700/50 p-6 rounded-lg border border-slate-600">
              <h3 className="text-xl font-semibold mb-3">Performance Summary</h3>
              <p className="text-slate-300">
                {score === quizQuestions.length ? (
                  "Excellent! You've mastered all the concepts in this quiz."
                ) : score >= quizQuestions.length * 0.7 ? (
                  "Great job! You have a good understanding of AWS DevOps concepts."
                ) : score >= quizQuestions.length * 0.5 ? (
                  "Good effort! Review the areas where you made mistakes to improve your knowledge."
                ) : (
                  "Keep practicing! Review the AWS DevOps concepts and try again."
                )}
              </p>
            </div>
          </CardContent>
          <CardFooter className="flex flex-col sm:flex-row gap-3 justify-center">
            <Button 
              onClick={resetQuiz}
              className="bg-blue-600 hover:bg-blue-700 w-full sm:w-auto"
            >
              Restart Quiz
            </Button>
            <Link href="/" className="w-full sm:w-auto">
              <Button 
                variant="outline" 
                className="border-slate-600 text-white hover:bg-slate-700 w-full"
              >
                Back to Home
              </Button>
            </Link>
          </CardFooter>
        </Card>
      </div>
    );
  }

  const question = quizQuestions[currentQuestion];

  return (
    <div className="min-h-screen bg-slate-900 text-white flex items-center justify-center p-4">
      <div className="w-full max-w-3xl">
        <div className="flex justify-between items-center mb-4">
          <div className="text-sm text-slate-400">Question {currentQuestion + 1} of {quizQuestions.length}</div>
          <div className="text-sm text-slate-400">Score: {score}/{quizQuestions.length}</div>
        </div>
        <Progress value={progress} className="h-2 bg-slate-700 mb-6" />
        
        <QuizQuestion 
          question={question}
          onSubmit={handleSubmit}
          onNext={handleNextQuestion}
          onPrevious={currentQuestion > 0 ? handlePreviousQuestion : undefined}
          initialSelectedAnswers={currentSelectedAnswers}
          isAnswered={isCurrentQuestionAnswered}
        />
        
        <div className="mt-6 flex justify-center">
          <Button 
            onClick={resetQuiz}
            variant="destructive"
            className="w-full sm:w-auto"
          >
            Reset Quiz
          </Button>
        </div>
      </div>
    </div>
  );
}
