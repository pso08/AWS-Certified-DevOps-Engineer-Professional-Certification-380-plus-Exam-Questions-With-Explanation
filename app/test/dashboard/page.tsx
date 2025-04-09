'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { BarChart, PieChart, Clock, Award, ArrowRight } from 'lucide-react';

export default function TestDashboardPage() {
  const [testHistory, setTestHistory] = useState<any[]>([]);
  
  // Simulate loading test history from localStorage
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const savedTestResults = localStorage.getItem('test_results');
      if (savedTestResults) {
        try {
          const results = JSON.parse(savedTestResults);
          setTestHistory([
            {
              id: 1,
              date: new Date().toLocaleDateString(),
              score: Math.round((results.correctAnswers / results.totalQuestions) * 100),
              correctAnswers: results.correctAnswers,
              totalQuestions: results.totalQuestions,
              timeTaken: results.timeTaken
            }
          ]);
        } catch (e) {
          console.error('Failed to parse test results:', e);
        }
      }
    }
  }, []);
  
  return (
    <div className="min-h-screen bg-slate-900 text-white flex items-center justify-center p-4">
      <div className="w-full max-w-4xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold">Test Dashboard</h1>
          <Link href="/">
            <Button variant="outline" className="border-slate-600 text-white hover:bg-slate-700">
              Back to Home
            </Button>
          </Link>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <Card className="bg-slate-800 border-slate-700 text-white">
            <CardHeader className="pb-2">
              <CardTitle className="text-lg">Tests Taken</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-4xl font-bold">{testHistory.length}</div>
            </CardContent>
          </Card>
          
          <Card className="bg-slate-800 border-slate-700 text-white">
            <CardHeader className="pb-2">
              <CardTitle className="text-lg">Average Score</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-4xl font-bold">
                {testHistory.length > 0 
                  ? Math.round(testHistory.reduce((acc, test) => acc + test.score, 0) / testHistory.length)
                  : 0}%
              </div>
            </CardContent>
          </Card>
          
          <Card className="bg-slate-800 border-slate-700 text-white">
            <CardHeader className="pb-2">
              <CardTitle className="text-lg">Last Test</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-4xl font-bold">
                {testHistory.length > 0 
                  ? testHistory[0].score + '%'
                  : 'N/A'}
              </div>
            </CardContent>
          </Card>
        </div>
        
        <Card className="bg-slate-800 border-slate-700 text-white mb-8">
          <CardHeader>
            <CardTitle>Test History</CardTitle>
            <CardDescription className="text-slate-300">
              Your recent test attempts and performance
            </CardDescription>
          </CardHeader>
          <CardContent>
            {testHistory.length > 0 ? (
              <div className="space-y-6">
                {testHistory.map(test => (
                  <div key={test.id} className="p-4 bg-slate-700/30 rounded-lg border border-slate-600">
                    <div className="flex justify-between items-center mb-2">
                      <div className="font-medium">{test.date}</div>
                      <div className={`font-bold ${test.score >= 72 ? 'text-green-500' : 'text-red-500'}`}>
                        {test.score}%
                      </div>
                    </div>
                    <Progress value={test.score} className="h-2 mb-4" />
                    <div className="grid grid-cols-2 gap-4 text-sm text-slate-300">
                      <div className="flex items-center">
                        <Award className="h-4 w-4 mr-2 text-blue-500" />
                        {test.correctAnswers} of {test.totalQuestions} correct
                      </div>
                      <div className="flex items-center">
                        <Clock className="h-4 w-4 mr-2 text-blue-500" />
                        {Math.floor(test.timeTaken / 60)} minutes
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-8 text-slate-400">
                <p>You haven't taken any tests yet.</p>
                <p className="mt-2">Complete a test to see your performance history.</p>
              </div>
            )}
          </CardContent>
          <CardFooter>
            <Link href="/test" className="w-full">
              <Button className="w-full bg-blue-600 hover:bg-blue-700">
                Take a New Test
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
          </CardFooter>
        </Card>
        
        <div className="flex justify-center">
          <Link href="/">
            <Button variant="outline" className="border-slate-600 text-white hover:bg-slate-700">
              Back to Home
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
