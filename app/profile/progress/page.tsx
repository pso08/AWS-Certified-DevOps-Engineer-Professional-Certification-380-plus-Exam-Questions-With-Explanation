'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Separator } from '@/components/ui/separator';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { BarChart, Calendar, CheckCircle, Clock, Shield, User, BookOpen, Award } from 'lucide-react';
import { Progress } from '@/components/ui/progress';

// Mock test history data
const mockTestHistory = [
  { id: 1, date: '2025-04-08', score: 85, totalQuestions: 20, timeTaken: '18:45', passed: true },
  { id: 2, date: '2025-04-05', score: 70, totalQuestions: 20, timeTaken: '19:30', passed: true },
  { id: 3, date: '2025-04-01', score: 60, totalQuestions: 20, timeTaken: '20:15', passed: false },
  { id: 4, date: '2025-03-28', score: 75, totalQuestions: 20, timeTaken: '17:20', passed: true },
  { id: 5, date: '2025-03-25', score: 90, totalQuestions: 20, timeTaken: '16:45', passed: true },
];

// Mock category progress data
const mockCategoryProgress = [
  { name: 'EC2 & Compute', progress: 85 },
  { name: 'S3 & Storage', progress: 70 },
  { name: 'VPC & Networking', progress: 60 },
  { name: 'IAM & Security', progress: 90 },
  { name: 'Lambda & Serverless', progress: 75 },
  { name: 'RDS & Databases', progress: 65 },
  { name: 'CloudFormation & IaC', progress: 80 },
];

export default function ProgressPage() {
  const router = useRouter();
  
  // User state
  const [user, setUser] = useState<{
    id: string;
    name: string;
    email: string;
    isAdmin: boolean;
    hasPaid: boolean;
  } | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  
  // Test history state
  const [testHistory, setTestHistory] = useState(mockTestHistory);
  
  // Category progress state
  const [categoryProgress, setCategoryProgress] = useState(mockCategoryProgress);
  
  // Statistics
  const [stats, setStats] = useState({
    testsCompleted: 0,
    averageScore: 0,
    passRate: 0,
    studyTime: 0,
  });
  
  // Load user data
  useEffect(() => {
    const loadUserData = () => {
      // In a real application, this would be a fetch request to get user data
      // For this mock implementation, we'll use localStorage
      if (typeof window !== 'undefined') {
        const session = JSON.parse(localStorage.getItem('user_session') || '{}');
        if (!session.isLoggedIn) {
          router.push('/auth/login');
          return;
        }
        
        setUser({
          id: session.userId || '1',
          name: session.name || 'User',
          email: session.email || 'user@example.com',
          isAdmin: session.isAdmin || false,
          hasPaid: session.hasPaid || false,
        });
        
        // Calculate statistics
        const completed = testHistory.length;
        const totalScore = testHistory.reduce((sum, test) => sum + test.score, 0);
        const averageScore = completed > 0 ? Math.round(totalScore / completed) : 0;
        const passed = testHistory.filter(test => test.passed).length;
        const passRate = completed > 0 ? Math.round((passed / completed) * 100) : 0;
        
        setStats({
          testsCompleted: completed,
          averageScore: averageScore,
          passRate: passRate,
          studyTime: 42, // Mock study time in hours
        });
        
        setIsLoading(false);
      }
    };
    
    loadUserData();
  }, [router, testHistory]);
  
  // Handle logout
  const handleLogout = () => {
    if (typeof window !== 'undefined') {
      localStorage.removeItem('user_session');
      router.push('/auth/login');
    }
  };
  
  if (isLoading) {
    return (
      <div className="min-h-screen bg-slate-900 text-white flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-white"></div>
      </div>
    );
  }
  
  return (
    <div className="min-h-screen bg-slate-900 text-white">
      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col md:flex-row gap-8">
          {/* Sidebar */}
          <div className="w-full md:w-64 space-y-4">
            <div className="bg-slate-800 rounded-lg p-6 flex flex-col items-center">
              <Avatar className="h-24 w-24 mb-4">
                <AvatarImage src={`https://api.dicebear.com/7.x/initials/svg?seed=${user?.name}`} alt={user?.name} />
                <AvatarFallback>{user?.name.charAt(0)}</AvatarFallback>
              </Avatar>
              <h2 className="text-xl font-bold">{user?.name}</h2>
              <p className="text-slate-400 text-sm">{user?.email}</p>
              {user?.isAdmin && (
                <div className="mt-2 bg-amber-900/30 text-amber-400 px-2 py-1 rounded text-xs flex items-center">
                  <Shield className="h-3 w-3 mr-1" />
                  Admin
                </div>
              )}
              {user?.hasPaid && (
                <div className="mt-2 bg-green-900/30 text-green-400 px-2 py-1 rounded text-xs flex items-center">
                  <CheckCircle className="h-3 w-3 mr-1" />
                  Premium
                </div>
              )}
            </div>
            
            <div className="bg-slate-800 rounded-lg p-4 space-y-2">
              <Link href="/protected" className="block p-2 hover:bg-slate-700 rounded-lg">
                Dashboard
              </Link>
              <Link href="/profile" className="block p-2 hover:bg-slate-700 rounded-lg">
                Profile Settings
              </Link>
              <Link href="/profile/progress" className="block p-2 bg-slate-700 rounded-lg">
                Progress Tracking
              </Link>
              {user?.isAdmin && (
                <Link href="/admin/dashboard" className="block p-2 hover:bg-slate-700 rounded-lg">
                  Admin Dashboard
                </Link>
              )}
              <button
                onClick={handleLogout}
                className="w-full text-left p-2 hover:bg-slate-700 rounded-lg text-red-400"
              >
                Logout
              </button>
            </div>
          </div>
          
          {/* Main content */}
          <div className="flex-1">
            <h1 className="text-3xl font-bold mb-6">Progress Tracking</h1>
            
            {/* Statistics */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
              <Card className="bg-slate-800 border-slate-700 text-white">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-slate-400 text-sm">Tests Completed</p>
                      <h3 className="text-3xl font-bold mt-1">{stats.testsCompleted}</h3>
                    </div>
                    <div className="bg-blue-900/30 p-3 rounded-full">
                      <BookOpen className="h-6 w-6 text-blue-400" />
                    </div>
                  </div>
                </CardContent>
              </Card>
              
              <Card className="bg-slate-800 border-slate-700 text-white">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-slate-400 text-sm">Average Score</p>
                      <h3 className="text-3xl font-bold mt-1">{stats.averageScore}%</h3>
                    </div>
                    <div className="bg-green-900/30 p-3 rounded-full">
                      <BarChart className="h-6 w-6 text-green-400" />
                    </div>
                  </div>
                </CardContent>
              </Card>
              
              <Card className="bg-slate-800 border-slate-700 text-white">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-slate-400 text-sm">Pass Rate</p>
                      <h3 className="text-3xl font-bold mt-1">{stats.passRate}%</h3>
                    </div>
                    <div className="bg-amber-900/30 p-3 rounded-full">
                      <Award className="h-6 w-6 text-amber-400" />
                    </div>
                  </div>
                </CardContent>
              </Card>
              
              <Card className="bg-slate-800 border-slate-700 text-white">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-slate-400 text-sm">Study Time</p>
                      <h3 className="text-3xl font-bold mt-1">{stats.studyTime}h</h3>
                    </div>
                    <div className="bg-purple-900/30 p-3 rounded-full">
                      <Clock className="h-6 w-6 text-purple-400" />
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
            
            {/* Category Progress */}
            <Card className="bg-slate-800 border-slate-700 text-white mb-8">
              <CardHeader>
                <CardTitle>Category Progress</CardTitle>
                <CardDescription className="text-slate-300">
                  Your performance across different AWS categories
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {categoryProgress.map((category, index) => (
                    <div key={index}>
                      <div className="flex justify-between mb-1">
                        <span className="text-sm font-medium text-white">{category.name}</span>
                        <span className="text-sm font-medium text-white">{category.progress}%</span>
                      </div>
                      <Progress value={category.progress} className="h-2" />
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
            
            {/* Test History */}
            <Card className="bg-slate-800 border-slate-700 text-white">
              <CardHeader>
                <CardTitle>Test History</CardTitle>
                <CardDescription className="text-slate-300">
                  Your recent test attempts and results
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="overflow-x-auto">
                  <table className="w-full text-sm text-left">
                    <thead className="text-xs uppercase bg-slate-700">
                      <tr>
                        <th scope="col" className="px-6 py-3 rounded-l-lg">Date</th>
                        <th scope="col" className="px-6 py-3">Score</th>
                        <th scope="col" className="px-6 py-3">Questions</th>
                        <th scope="col" className="px-6 py-3">Time</th>
                        <th scope="col" className="px-6 py-3 rounded-r-lg">Result</th>
                      </tr>
                    </thead>
                    <tbody>
                      {testHistory.map((test) => (
                        <tr key={test.id} className="border-b border-slate-700">
                          <td className="px-6 py-4">
                            <div className="flex items-center">
                              <Calendar className="h-4 w-4 mr-2 text-slate-400" />
                              {new Date(test.date).toLocaleDateString()}
                            </div>
                          </td>
                          <td className="px-6 py-4">{test.score}%</td>
                          <td className="px-6 py-4">{test.totalQuestions}</td>
                          <td className="px-6 py-4">{test.timeTaken}</td>
                          <td className="px-6 py-4">
                            {test.passed ? (
                              <span className="bg-green-900/30 text-green-400 px-2 py-1 rounded text-xs">
                                Passed
                              </span>
                            ) : (
                              <span className="bg-red-900/30 text-red-400 px-2 py-1 rounded text-xs">
                                Failed
                              </span>
                            )}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </CardContent>
              <CardFooter className="flex justify-center">
                <Button variant="outline" className="border-slate-600 text-white hover:bg-slate-700">
                  View All History
                </Button>
              </CardFooter>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
