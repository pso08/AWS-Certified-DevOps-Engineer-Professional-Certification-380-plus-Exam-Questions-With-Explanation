"use client";

/**
 * Quiz Question Component
 * 
 * This component displays a question in quiz mode with multiple choice options
 * and handles the answer submission flow as required by the user.
 * Now includes navigation buttons to move between questions.
 */

import { useState, useEffect } from 'react';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';
import { Question } from '@/lib/types';
import { AlertCircle, CheckCircle2, ChevronLeft, ChevronRight } from 'lucide-react';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';

interface QuizQuestionProps {
  question: Question;
  onSubmit: (isCorrect: boolean, selectedAnswers: string[]) => void;
  onNext: () => void;
  onPrevious?: () => void;
  showTimer?: boolean;
  timeLimit?: number; // in seconds
  initialSelectedAnswers?: string[]; // For preserving previous selections
  isAnswered?: boolean; // To track if question was already answered
}

export default function QuizQuestion({
  question,
  onSubmit,
  onNext,
  onPrevious,
  showTimer = false,
  timeLimit = 0,
  initialSelectedAnswers = [],
  isAnswered = false
}: QuizQuestionProps) {
  const [selectedAnswers, setSelectedAnswers] = useState<string[]>(initialSelectedAnswers);
  const [submitted, setSubmitted] = useState(isAnswered);
  const [isCorrect, setIsCorrect] = useState(false);
  const [timeRemaining, setTimeRemaining] = useState(timeLimit);

  // Initialize state based on props when question changes
  useEffect(() => {
    // Only update state if the question ID changes or on initial render
    if (question.id) {
      setSelectedAnswers(initialSelectedAnswers);
      setSubmitted(isAnswered);
      
      // If the question is already answered, determine if it was correct
      if (isAnswered && initialSelectedAnswers.length > 0) {
        let correct = false;
        
        if (question.isMultipleAnswer) {
          const allCorrectAnswersSelected = question.correctAnswers.every(
            answer => initialSelectedAnswers.includes(answer)
          );
          const noIncorrectAnswersSelected = initialSelectedAnswers.every(
            answer => question.correctAnswers.includes(answer)
          );
          
          correct = allCorrectAnswersSelected && noIncorrectAnswersSelected;
        } else {
          correct = question.correctAnswers.includes(initialSelectedAnswers[0]);
        }
        
        setIsCorrect(correct);
      } else {
        setIsCorrect(false);
      }
    }
  }, [question.id, isAnswered]); // Only depend on question.id and isAnswered

  // Handle single answer selection (radio buttons)
  const handleSingleAnswerChange = (value: string) => {
    if (submitted) return; // Prevent changes after submission
    setSelectedAnswers([value]);
  };

  // Handle multiple answer selection (checkboxes)
  const handleMultipleAnswerChange = (checked: boolean, value: string) => {
    if (submitted) return; // Prevent changes after submission
    
    if (checked) {
      setSelectedAnswers(prev => [...prev, value]);
    } else {
      setSelectedAnswers(prev => prev.filter(item => item !== value));
    }
  };

  // Handle answer submission
  const handleSubmit = () => {
    // Validate that at least one answer is selected
    if (selectedAnswers.length === 0) {
      return;
    }

    // Check if the answer is correct
    let correct = false;
    
    if (question.isMultipleAnswer) {
      // For multiple-answer questions, all correct answers must be selected
      // and no incorrect answers can be selected
      const allCorrectAnswersSelected = question.correctAnswers.every(
        answer => selectedAnswers.includes(answer)
      );
      const noIncorrectAnswersSelected = selectedAnswers.every(
        answer => question.correctAnswers.includes(answer)
      );
      
      correct = allCorrectAnswersSelected && noIncorrectAnswersSelected;
    } else {
      // For single-answer questions, the selected answer must be the correct one
      correct = question.correctAnswers.includes(selectedAnswers[0]);
    }

    setIsCorrect(correct);
    setSubmitted(true);
    onSubmit(correct, selectedAnswers);
  };

  // Render options based on question type (single or multiple answer)
  const renderOptions = () => {
    if (question.isMultipleAnswer) {
      // Render checkboxes for multiple-answer questions
      return (
        <div className="space-y-3">
          {question.options.map(option => (
            <div key={option.id} className="flex items-start space-x-3">
              <div className="flex items-center justify-center h-4 w-4 mt-1 shrink-0">
                <Checkbox
                  id={`option-${option.id}`}
                  checked={selectedAnswers.includes(option.id)}
                  onCheckedChange={(checked) => 
                    handleMultipleAnswerChange(checked as boolean, option.id)
                  }
                  disabled={submitted}
                  className="h-4 w-4 cursor-pointer"
                />
              </div>
              <div className="grid gap-1.5 leading-none">
                <Label
                  htmlFor={`option-${option.id}`}
                  className={`text-base cursor-pointer ${
                    submitted && question.correctAnswers.includes(option.id)
                      ? 'font-medium text-green-600 dark:text-green-400'
                      : ''
                  }`}
                >
                  {option.id}. {option.text}
                </Label>
              </div>
            </div>
          ))}
          <p className="text-sm text-muted-foreground mt-2">
            Select all that apply. This question has multiple correct answers.
          </p>
        </div>
      );
    } else {
      // Render radio buttons for single-answer questions
      return (
        <div className="space-y-3">
          {question.options.map(option => (
            <div key={option.id} className="flex items-start space-x-3">
              <input
                type="radio"
                id={`option-${option.id}`}
                name="single-answer"
                value={option.id}
                checked={selectedAnswers[0] === option.id}
                onChange={() => handleSingleAnswerChange(option.id)}
                disabled={submitted}
                className="h-4 w-4 mt-1 cursor-pointer"
              />
              <Label
                htmlFor={`option-${option.id}`}
                className={`text-base cursor-pointer ${
                  submitted && question.correctAnswers.includes(option.id)
                    ? 'font-medium text-green-600 dark:text-green-400'
                    : ''
                }`}
              >
                {option.id}. {option.text}
              </Label>
            </div>
          ))}
        </div>
      );
    }
  };

  return (
    <Card className="w-full max-w-3xl mx-auto">
      <CardHeader>
        <div className="flex justify-between items-center">
          <CardTitle className="text-xl">Question</CardTitle>
          {showTimer && timeLimit > 0 && (
            <div className="text-sm font-medium">
              Time Remaining: {Math.floor(timeRemaining / 60)}:{(timeRemaining % 60).toString().padStart(2, '0')}
            </div>
          )}
        </div>
      </CardHeader>
      
      <CardContent className="space-y-6">
        <p className="text-lg break-words whitespace-normal overflow-auto max-h-[300px]">{question.text}</p>
        
        <div className="mt-4">
          {renderOptions()}
        </div>
        
        {submitted && (
          <Alert variant={isCorrect ? "default" : "destructive"} className="mt-4">
            <div className="flex items-center gap-2">
              {isCorrect ? (
                <CheckCircle2 className="h-5 w-5 text-green-500" />
              ) : (
                <AlertCircle className="h-5 w-5" />
              )}
              <AlertTitle>
                {isCorrect ? 'Correct!' : 'Incorrect'}
              </AlertTitle>
            </div>
            <AlertDescription className="mt-2 overflow-auto max-h-[300px]">
              <div className="mb-2">
                <span className="font-medium">Correct Answer: </span>
                <div className="break-words whitespace-normal">
                  {question.correctAnswers.join(' and ')}
                </div>
              </div>
              <div className="mt-2">
                <span className="font-medium">Explanation: </span>
                <div className="break-words whitespace-normal">
                  {question.explanation}
                </div>
              </div>
            </AlertDescription>
          </Alert>
        )}
      </CardContent>
      
      <CardFooter className="flex flex-col gap-4">
        {!submitted ? (
          <Button 
            onClick={handleSubmit} 
            disabled={selectedAnswers.length === 0}
            className="w-full"
          >
            Submit Answer
          </Button>
        ) : (
          <div className="flex flex-col sm:flex-row gap-2 w-full">
            <Button 
              onClick={() => {
                // Reset the submission state but keep the selected answers
                setSubmitted(false);
                setIsCorrect(false);
              }}
              variant="secondary"
              className="w-full sm:w-1/2"
            >
              Try Again
            </Button>
            <Button 
              onClick={() => {
                onNext();
              }}
              className="w-full sm:w-1/2"
            >
              Next Question
            </Button>
          </div>
        )}
        
        {/* Navigation buttons */}
        <div className="flex justify-between w-full">
          <Button 
            variant="outline" 
            onClick={() => onPrevious && onPrevious()}
            disabled={!onPrevious}
            size="sm"
            className="w-1/3"
          >
            <ChevronLeft className="mr-2 h-4 w-4" />
            Previous
          </Button>
          
          <Button 
            variant="outline"
            onClick={() => {
              if (submitted) {
                onNext();
              } else {
                handleSubmit();
              }
            }}
            size="sm"
            className="w-1/3"
            disabled={!submitted && selectedAnswers.length === 0}
          >
            {submitted ? (
              <>
                Next
                <ChevronRight className="ml-2 h-4 w-4" />
              </>
            ) : (
              'Check Answer'
            )}
          </Button>
        </div>
      </CardFooter>
    </Card>
  );
}
