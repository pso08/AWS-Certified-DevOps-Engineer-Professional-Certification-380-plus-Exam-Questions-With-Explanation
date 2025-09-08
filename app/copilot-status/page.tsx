'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { 
  BookOpen, 
  Award, 
  Target, 
  TrendingUp, 
  Clock, 
  CheckCircle, 
  BarChart3,
  Home,
  Zap,
  Calendar
} from 'lucide-react';

interface CopilotStatus {
  quizProgress: {
    currentQuestion: number;
    totalQuestions: number;
    score: number;
    completed: boolean;
    accuracy: number;
  };
  studyStreak: {
    currentStreak: number;
    longestStreak: number;
    lastStudyDate: string;
  };
  performanceMetrics: {
    totalQuestionsAttempted: number;
    correctAnswers: number;
    averageScore: number;
    strongDomains: string[];
    improvementAreas: string[];
  };
  achievements: {
    firstQuizCompleted: boolean;
    perfectScore: boolean;
    weeklyGoalMet: boolean;
    studyStreak7Days: boolean;
  };
}

export default function CopilotStatusPage() {
  const [status, setStatus] = useState<CopilotStatus>({
    quizProgress: {
      currentQuestion: 0,
      totalQuestions: 0,
      score: 0,
      completed: false,
      accuracy: 0
    },
    studyStreak: {
      currentStreak: 0,
      longestStreak: 0,
      lastStudyDate: ''
    },
    performanceMetrics: {
      totalQuestionsAttempted: 0,
      correctAnswers: 0,
      averageScore: 0,
      strongDomains: [],
      improvementAreas: []
    },
    achievements: {
      firstQuizCompleted: false,
      perfectScore: false,
      weeklyGoalMet: false,
      studyStreak7Days: false
    }
  });

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      // Load quiz progress
      const currentQuestion = localStorage.getItem('quiz_current_question');
      const score = localStorage.getItem('quiz_score');
      const completed = localStorage.getItem('quiz_completed');
      const answeredQuestions = localStorage.getItem('quiz_answered_questions');

      // Load study streak data
      const studyDates = localStorage.getItem('copilot_study_dates');
      const longestStreak = localStorage.getItem('copilot_longest_streak');

      // Calculate study streak
      const today = new Date().toDateString();
      const storedDates = studyDates ? JSON.parse(studyDates) : [];
      
      // Update today's study session
      if (!storedDates.includes(today)) {
        storedDates.push(today);
        localStorage.setItem('copilot_study_dates', JSON.stringify(storedDates));
      }

      // Calculate current streak
      const sortedDates = storedDates.map(d => new Date(d)).sort((a, b) => b.getTime() - a.getTime());
      let currentStreak = 0;
      const todayDate = new Date(today);
      
      for (let i = 0; i < sortedDates.length; i++) {
        const daysDiff = Math.floor((todayDate.getTime() - sortedDates[i].getTime()) / (1000 * 60 * 60 * 24));
        if (daysDiff === i) {
          currentStreak++;
        } else {
          break;
        }
      }

      // Update longest streak
      const currentLongest = parseInt(longestStreak || '0');
      if (currentStreak > currentLongest) {
        localStorage.setItem('copilot_longest_streak', currentStreak.toString());
      }

      // Parse answered questions for performance metrics
      let totalAttempted = 0;
      let correctCount = 0;
      let answeredData = [];
      
      try {
        if (answeredQuestions) {
          answeredData = JSON.parse(answeredQuestions);
          totalAttempted = answeredData.length;
          correctCount = answeredData.filter(q => q.isCorrect).length;
        }
      } catch (e) {
        console.error('Failed to parse answered questions:', e);
      }

      // Determine strong domains and improvement areas (simplified)
      const strongDomains = correctCount > totalAttempted * 0.7 ? 
        ['SDLC Automation', 'Configuration Management'] : 
        ['Monitoring & Logging'];
      
      const improvementAreas = correctCount < totalAttempted * 0.6 ? 
        ['High Availability', 'Security'] : 
        [];

      // Calculate achievements
      const achievements = {
        firstQuizCompleted: completed === 'true',
        perfectScore: parseInt(score || '0') === totalAttempted && totalAttempted > 0,
        weeklyGoalMet: currentStreak >= 3,
        studyStreak7Days: currentStreak >= 7
      };

      setStatus({
        quizProgress: {
          currentQuestion: parseInt(currentQuestion || '0'),
          totalQuestions: 380, // Based on the app description
          score: parseInt(score || '0'),
          completed: completed === 'true',
          accuracy: totalAttempted > 0 ? (correctCount / totalAttempted) * 100 : 0
        },
        studyStreak: {
          currentStreak,
          longestStreak: Math.max(currentStreak, parseInt(longestStreak || '0')),
          lastStudyDate: today
        },
        performanceMetrics: {
          totalQuestionsAttempted: totalAttempted,
          correctAnswers: correctCount,
          averageScore: totalAttempted > 0 ? (correctCount / totalAttempted) * 100 : 0,
          strongDomains,
          improvementAreas
        },
        achievements
      });

      setLoading(false);
    }
  }, []);

  const getStatusLevel = () => {
    const { accuracy } = status.quizProgress;
    const { currentStreak } = status.studyStreak;
    
    if (accuracy >= 80 && currentStreak >= 7) return 'Expert';
    if (accuracy >= 70 && currentStreak >= 5) return 'Advanced';
    if (accuracy >= 60 && currentStreak >= 3) return 'Intermediate';
    if (accuracy >= 40) return 'Beginner';
    return 'Getting Started';
  };

  const getStatusColor = () => {
    const level = getStatusLevel();
    switch (level) {
      case 'Expert': return 'bg-emerald-600';
      case 'Advanced': return 'bg-blue-600';
      case 'Intermediate': return 'bg-amber-600';
      case 'Beginner': return 'bg-orange-600';
      default: return 'bg-slate-600';
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-slate-900 text-white flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-900 text-white p-4">
      <div className="max-w-6xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-4xl font-bold mb-2">Copilot Status</h1>
            <p className="text-slate-300">Your AWS DevOps learning journey overview</p>
          </div>
          <Link href="/">
            <Button variant="outline" className="border-slate-600 text-white hover:bg-slate-700">
              <Home className="w-4 h-4 mr-2" />
              Back to Home
            </Button>
          </Link>
        </div>

        {/* Status Overview */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <Card className="bg-slate-800 border-slate-700 text-white">
            <CardHeader className="pb-3">
              <CardTitle className="flex items-center justify-between">
                <span>Current Level</span>
                <Zap className="w-5 h-5 text-yellow-500" />
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold mb-2">{getStatusLevel()}</div>
              <Badge className={`${getStatusColor()} text-white`}>
                {Math.round(status.quizProgress.accuracy)}% Accuracy
              </Badge>
            </CardContent>
          </Card>

          <Card className="bg-slate-800 border-slate-700 text-white">
            <CardHeader className="pb-3">
              <CardTitle className="flex items-center justify-between">
                <span>Study Streak</span>
                <Calendar className="w-5 h-5 text-orange-500" />
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold mb-2">{status.studyStreak.currentStreak} days</div>
              <p className="text-sm text-slate-400">
                Best: {status.studyStreak.longestStreak} days
              </p>
            </CardContent>
          </Card>

          <Card className="bg-slate-800 border-slate-700 text-white">
            <CardHeader className="pb-3">
              <CardTitle className="flex items-center justify-between">
                <span>Questions Attempted</span>
                <Target className="w-5 h-5 text-blue-500" />
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold mb-2">
                {status.performanceMetrics.totalQuestionsAttempted}
              </div>
              <p className="text-sm text-slate-400">
                {status.performanceMetrics.correctAnswers} correct
              </p>
            </CardContent>
          </Card>

          <Card className="bg-slate-800 border-slate-700 text-white">
            <CardHeader className="pb-3">
              <CardTitle className="flex items-center justify-between">
                <span>Quiz Progress</span>
                <BookOpen className="w-5 h-5 text-green-500" />
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold mb-2">
                {status.quizProgress.currentQuestion + 1}/{status.quizProgress.totalQuestions}
              </div>
              <Progress 
                value={((status.quizProgress.currentQuestion + 1) / status.quizProgress.totalQuestions) * 100} 
                className="h-2 bg-slate-700"
              />
            </CardContent>
          </Card>
        </div>

        {/* Detailed Sections */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Performance Analytics */}
          <Card className="bg-slate-800 border-slate-700 text-white">
            <CardHeader>
              <CardTitle className="flex items-center">
                <BarChart3 className="w-5 h-5 mr-2" />
                Performance Analytics
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <div className="flex justify-between mb-2">
                  <span>Overall Accuracy</span>
                  <span>{Math.round(status.quizProgress.accuracy)}%</span>
                </div>
                <Progress 
                  value={status.quizProgress.accuracy} 
                  className="h-2 bg-slate-700"
                />
              </div>
              
              <div>
                <h4 className="font-semibold mb-2 text-green-400">Strong Areas</h4>
                <div className="flex flex-wrap gap-2">
                  {status.performanceMetrics.strongDomains.map((domain, index) => (
                    <Badge key={index} className="bg-green-600/20 text-green-400 border-green-600">
                      {domain}
                    </Badge>
                  ))}
                </div>
              </div>
              
              {status.performanceMetrics.improvementAreas.length > 0 && (
                <div>
                  <h4 className="font-semibold mb-2 text-yellow-400">Focus Areas</h4>
                  <div className="flex flex-wrap gap-2">
                    {status.performanceMetrics.improvementAreas.map((area, index) => (
                      <Badge key={index} className="bg-yellow-600/20 text-yellow-400 border-yellow-600">
                        {area}
                      </Badge>
                    ))}
                  </div>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Achievements */}
          <Card className="bg-slate-800 border-slate-700 text-white">
            <CardHeader>
              <CardTitle className="flex items-center">
                <Award className="w-5 h-5 mr-2" />
                Achievements
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div className={`flex items-center p-3 rounded-lg ${
                  status.achievements.firstQuizCompleted ? 'bg-green-600/20 border border-green-600' : 'bg-slate-700/50'
                }`}>
                  <CheckCircle className={`w-5 h-5 mr-3 ${
                    status.achievements.firstQuizCompleted ? 'text-green-400' : 'text-slate-500'
                  }`} />
                  <div>
                    <div className="font-medium">First Quiz Completed</div>
                    <div className="text-sm text-slate-400">Complete your first practice quiz</div>
                  </div>
                </div>

                <div className={`flex items-center p-3 rounded-lg ${
                  status.achievements.studyStreak7Days ? 'bg-blue-600/20 border border-blue-600' : 'bg-slate-700/50'
                }`}>
                  <CheckCircle className={`w-5 h-5 mr-3 ${
                    status.achievements.studyStreak7Days ? 'text-blue-400' : 'text-slate-500'
                  }`} />
                  <div>
                    <div className="font-medium">Week Warrior</div>
                    <div className="text-sm text-slate-400">Study for 7 consecutive days</div>
                  </div>
                </div>

                <div className={`flex items-center p-3 rounded-lg ${
                  status.achievements.perfectScore ? 'bg-yellow-600/20 border border-yellow-600' : 'bg-slate-700/50'
                }`}>
                  <CheckCircle className={`w-5 h-5 mr-3 ${
                    status.achievements.perfectScore ? 'text-yellow-400' : 'text-slate-500'
                  }`} />
                  <div>
                    <div className="font-medium">Perfect Score</div>
                    <div className="text-sm text-slate-400">Get 100% accuracy on any quiz</div>
                  </div>
                </div>

                <div className={`flex items-center p-3 rounded-lg ${
                  status.achievements.weeklyGoalMet ? 'bg-purple-600/20 border border-purple-600' : 'bg-slate-700/50'
                }`}>
                  <CheckCircle className={`w-5 h-5 mr-3 ${
                    status.achievements.weeklyGoalMet ? 'text-purple-400' : 'text-slate-500'
                  }`} />
                  <div>
                    <div className="font-medium">Consistency Champion</div>
                    <div className="text-sm text-slate-400">Study for 3+ days this week</div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Quick Actions */}
        <Card className="bg-slate-800 border-slate-700 text-white mt-8">
          <CardHeader>
            <CardTitle>Continue Your Learning Journey</CardTitle>
            <CardDescription className="text-slate-300">
              Pick up where you left off or try something new
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <Link href="/quiz">
                <Button className="w-full bg-blue-600 hover:bg-blue-700">
                  <BookOpen className="w-4 h-4 mr-2" />
                  Continue Quiz
                </Button>
              </Link>
              
              <Link href="/flashcards">
                <Button className="w-full bg-purple-600 hover:bg-purple-700">
                  <Target className="w-4 h-4 mr-2" />
                  Study Flashcards
                </Button>
              </Link>
              
              <Link href="/test">
                <Button className="w-full bg-amber-600 hover:bg-amber-700">
                  <Clock className="w-4 h-4 mr-2" />
                  Take Full Test
                </Button>
              </Link>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}