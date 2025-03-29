'use client';

import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { getProgressData, getDomainPerformance } from '@/lib/progress-tracker';
import { Domain } from '@/lib/types';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';

export default function ProgressDashboard() {
  const progressData = getProgressData();
  const domainPerformance = getDomainPerformance();
  
  // Calculate overall stats
  const quizCompletion = (progressData.quizProgress.answeredQuestions.length / 384) * 100;
  const flashcardCompletion = (progressData.flashcardProgress.viewedCards.length / 384) * 100;
  const masteredPercentage = progressData.flashcardProgress.masteredCards.length > 0 
    ? (progressData.flashcardProgress.masteredCards.length / progressData.flashcardProgress.viewedCards.length) * 100 
    : 0;
  
  // Calculate average test score
  const testEntries = Object.values(progressData.testHistory);
  const averageTestScore = testEntries.length > 0
    ? testEntries.reduce((sum, entry) => sum + (entry.results.correctAnswers / entry.results.totalQuestions) * 100, 0) / testEntries.length
    : 0;
  
  // Format domain data for charts
  const domainChartData = domainPerformance.map(item => ({
    name: item.domain.split(' ')[0], // Use first word of domain for chart labels
    score: item.percentage,
    correct: item.correct,
    total: item.total
  }));
  
  // Colors for pie chart
  const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884d8', '#82ca9d'];
  
  return (
    <div className="w-full max-w-6xl mx-auto p-4">
      <h1 className="text-2xl font-bold mb-6">Your Progress Dashboard</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        <Card className="bg-slate-800 border-slate-700">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Quiz Progress</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{Math.round(quizCompletion)}%</div>
            <Progress value={quizCompletion} className="h-2 mt-2" />
            <p className="text-xs text-slate-400 mt-1">
              {progressData.quizProgress.answeredQuestions.length} of 384 questions answered
            </p>
          </CardContent>
        </Card>
        
        <Card className="bg-slate-800 border-slate-700">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Test Performance</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{Math.round(averageTestScore)}%</div>
            <Progress value={averageTestScore} className="h-2 mt-2" />
            <p className="text-xs text-slate-400 mt-1">
              {Object.keys(progressData.testHistory).length} tests completed
            </p>
          </CardContent>
        </Card>
        
        <Card className="bg-slate-800 border-slate-700">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Flashcards</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{Math.round(flashcardCompletion)}%</div>
            <Progress value={flashcardCompletion} className="h-2 mt-2" />
            <p className="text-xs text-slate-400 mt-1">
              {progressData.flashcardProgress.masteredCards.length} cards mastered
            </p>
          </CardContent>
        </Card>
        
        <Card className="bg-slate-800 border-slate-700">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Study Streak</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{progressData.studyStats.streakDays} days</div>
            <div className="flex items-center mt-2">
              {[...Array(7)].map((_, i) => (
                <div 
                  key={i} 
                  className={`h-2 w-full mr-1 rounded-full ${i < progressData.studyStats.streakDays % 7 ? 'bg-green-500' : 'bg-slate-700'}`}
                />
              ))}
            </div>
            <p className="text-xs text-slate-400 mt-1">
              {progressData.studyStats.totalTimeSpent} minutes total study time
            </p>
          </CardContent>
        </Card>
      </div>
      
      <Tabs defaultValue="performance" className="w-full">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="performance">Domain Performance</TabsTrigger>
          <TabsTrigger value="history">Test History</TabsTrigger>
        </TabsList>
        
        <TabsContent value="performance" className="mt-4">
          <Card className="bg-slate-800 border-slate-700">
            <CardHeader>
              <CardTitle>Performance by Domain</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-80 w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart
                    data={domainChartData}
                    margin={{ top: 20, right: 30, left: 20, bottom: 60 }}
                  >
                    <CartesianGrid strokeDasharray="3 3" stroke="#444" />
                    <XAxis 
                      dataKey="name" 
                      angle={-45} 
                      textAnchor="end" 
                      height={60} 
                      tick={{ fill: '#ccc', fontSize: 12 }} 
                    />
                    <YAxis tick={{ fill: '#ccc' }} />
                    <Tooltip 
                      contentStyle={{ backgroundColor: '#1e293b', borderColor: '#475569', color: '#fff' }}
                      formatter={(value) => [`${value}%`, 'Score']}
                    />
                    <Bar dataKey="score" fill="#3b82f6" radius={[4, 4, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6">
                <div className="h-64">
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={domainChartData}
                        cx="50%"
                        cy="50%"
                        labelLine={false}
                        outerRadius={80}
                        fill="#8884d8"
                        dataKey="correct"
                        nameKey="name"
                        label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                      >
                        {domainChartData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                        ))}
                      </Pie>
                      <Tooltip 
                        contentStyle={{ backgroundColor: '#1e293b', borderColor: '#475569', color: '#fff' }}
                        formatter={(value, name, props) => [`${value} correct answers`, props.payload.name]}
                      />
                    </PieChart>
                  </ResponsiveContainer>
                </div>
                
                <div className="space-y-4">
                  <h3 className="font-semibold">Domain Breakdown</h3>
                  {domainPerformance.map((domain, index) => (
                    <div key={index} className="space-y-1">
                      <div className="flex justify-between text-sm">
                        <span>{domain.domain}</span>
                        <span className="font-medium">{domain.percentage}%</span>
                      </div>
                      <Progress value={domain.percentage} className="h-1" />
                      <p className="text-xs text-slate-400">
                        {domain.correct} correct out of {domain.total} questions
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="history" className="mt-4">
          <Card className="bg-slate-800 border-slate-700">
            <CardHeader>
              <CardTitle>Test History</CardTitle>
            </CardHeader>
            <CardContent>
              {Object.entries(progressData.testHistory).length > 0 ? (
                <div className="space-y-4">
                  {Object.entries(progressData.testHistory)
                    .sort(([, a], [, b]) => new Date(b.date).getTime() - new Date(a.date).getTime())
                    .map(([testId, test]) => {
                      const date = new Date(test.date);
                      const score = (test.results.correctAnswers / test.results.totalQuestions) * 100;
                      
                      return (
                        <div key={testId} className="bg-slate-700/50 p-4 rounded-lg border border-slate-600">
                          <div className="flex justify-between items-center mb-2">
                            <h3 className="font-medium">
                              Test on {date.toLocaleDateString()} at {date.toLocaleTimeString()}
                            </h3>
                            <span className={`px-2 py-1 rounded text-xs font-medium ${
                              score >= 70 ? 'bg-green-500/20 text-green-400' : 
                              score >= 50 ? 'bg-yellow-500/20 text-yellow-400' : 
                              'bg-red-500/20 text-red-400'
                            }`}>
                              {Math.round(score)}%
                            </span>
                          </div>
                          
                          <Progress value={score} className="h-2 mb-2" />
                          
                          <div className="text-sm text-slate-300">
                            <p>Correct: {test.results.correctAnswers} / {test.results.totalQuestions}</p>
                            <p>Time taken: {Math.floor(test.results.timeTaken / 60)} minutes</p>
                          </div>
                        </div>
                      );
                    })}
                </div>
              ) : (
                <div className="text-center py-8 text-slate-400">
                  <p>You haven't taken any tests yet.</p>
                  <p className="mt-2">Complete a test to see your history here.</p>
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
