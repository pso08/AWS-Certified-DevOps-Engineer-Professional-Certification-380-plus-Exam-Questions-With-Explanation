'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { 
  BarChart, 
  Users, 
  BookOpen, 
  FileText, 
  Settings, 
  PlusCircle, 
  Shield, 
  DollarSign,
  Tag,
  Percent
} from 'lucide-react';

// Mock analytics data
const mockAnalytics = {
  totalUsers: 1245,
  activeUsers: 876,
  premiumUsers: 342,
  totalQuestions: 450,
  totalTests: 3567,
  averageScore: 72,
  passRate: 68,
  revenue: 12450,
  growthRate: 15
};

// Mock recent user registrations
const mockRecentUsers = [
  { id: 1, name: 'John Doe', email: 'john@example.com', date: '2025-04-08', isPremium: true },
  { id: 2, name: 'Jane Smith', email: 'jane@example.com', date: '2025-04-07', isPremium: false },
  { id: 3, name: 'Robert Johnson', email: 'robert@example.com', date: '2025-04-07', isPremium: true },
  { id: 4, name: 'Emily Davis', email: 'emily@example.com', date: '2025-04-06', isPremium: false },
  { id: 5, name: 'Michael Wilson', email: 'michael@example.com', date: '2025-04-05', isPremium: true },
];

// Mock popular categories
const mockPopularCategories = [
  { name: 'EC2 & Compute', tests: 876, avgScore: 75 },
  { name: 'S3 & Storage', tests: 754, avgScore: 68 },
  { name: 'VPC & Networking', tests: 623, avgScore: 65 },
  { name: 'IAM & Security', tests: 589, avgScore: 72 },
  { name: 'Lambda & Serverless', tests: 456, avgScore: 70 },
];

export default function AdminDashboardPage() {
  const router = useRouter();
  
  // Admin user state
  const [user, setUser] = useState<{
    id: string;
    name: string;
    email: string;
    isAdmin: boolean;
  } | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  
  // Analytics state
  const [analytics, setAnalytics] = useState(mockAnalytics);
  const [recentUsers, setRecentUsers] = useState(mockRecentUsers);
  const [popularCategories, setPopularCategories] = useState(mockPopularCategories);
  
  // Load admin user data
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
        
        if (!session.isAdmin) {
          router.push('/protected');
          return;
        }
        
        setUser({
          id: session.userId || '1',
          name: session.name || 'Admin',
          email: session.email || 'admin@example.com',
          isAdmin: true,
        });
        
        setIsLoading(false);
      }
    };
    
    loadUserData();
  }, [router]);
  
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
              <div className="mt-2 bg-amber-900/30 text-amber-400 px-2 py-1 rounded text-xs flex items-center">
                <Shield className="h-3 w-3 mr-1" />
                Admin
              </div>
            </div>
            
            <div className="bg-slate-800 rounded-lg p-4 space-y-2">
              <Link href="/admin/dashboard" className="block p-2 bg-slate-700 rounded-lg">
                <BarChart className="h-4 w-4 inline-block mr-2" />
                Dashboard
              </Link>
              <Link href="/admin/users" className="block p-2 hover:bg-slate-700 rounded-lg">
                <Users className="h-4 w-4 inline-block mr-2" />
                User Management
              </Link>
              <Link href="/admin/categories" className="block p-2 hover:bg-slate-700 rounded-lg">
                <Tag className="h-4 w-4 inline-block mr-2" />
                Categories
              </Link>
              <Link href="/admin/content" className="block p-2 hover:bg-slate-700 rounded-lg">
                <FileText className="h-4 w-4 inline-block mr-2" />
                Content Management
              </Link>
              <Link href="/admin/coupons" className="block p-2 hover:bg-slate-700 rounded-lg">
                <Percent className="h-4 w-4 inline-block mr-2" />
                Coupon Management
              </Link>
              <Link href="/admin/settings" className="block p-2 hover:bg-slate-700 rounded-lg">
                <Settings className="h-4 w-4 inline-block mr-2" />
                Settings
              </Link>
              <Link href="/protected" className="block p-2 hover:bg-slate-700 rounded-lg">
                Back to App
              </Link>
            </div>
          </div>
          
          {/* Main content */}
          <div className="flex-1">
            <div className="flex justify-between items-center mb-6">
              <h1 className="text-3xl font-bold">Admin Dashboard</h1>
              <div className="flex gap-2">
                <Button className="bg-blue-600 hover:bg-blue-700">
                  <PlusCircle className="h-4 w-4 mr-2" />
                  New User
                </Button>
              </div>
            </div>
            
            {/* Analytics Overview */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
              <Card className="bg-slate-800 border-slate-700 text-white">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-slate-400 text-sm">Total Users</p>
                      <h3 className="text-3xl font-bold mt-1">{analytics.totalUsers}</h3>
                      <p className="text-green-400 text-sm mt-1">
                        +{analytics.growthRate}% from last month
                      </p>
                    </div>
                    <div className="bg-blue-900/30 p-3 rounded-full">
                      <Users className="h-6 w-6 text-blue-400" />
                    </div>
                  </div>
                </CardContent>
              </Card>
              
              <Card className="bg-slate-800 border-slate-700 text-white">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-slate-400 text-sm">Premium Users</p>
                      <h3 className="text-3xl font-bold mt-1">{analytics.premiumUsers}</h3>
                      <p className="text-slate-400 text-sm mt-1">
                        {Math.round((analytics.premiumUsers / analytics.totalUsers) * 100)}% of total users
                      </p>
                    </div>
                    <div className="bg-amber-900/30 p-3 rounded-full">
                      <Shield className="h-6 w-6 text-amber-400" />
                    </div>
                  </div>
                </CardContent>
              </Card>
              
              <Card className="bg-slate-800 border-slate-700 text-white">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-slate-400 text-sm">Total Revenue</p>
                      <h3 className="text-3xl font-bold mt-1">${analytics.revenue}</h3>
                      <p className="text-green-400 text-sm mt-1">
                        +{analytics.growthRate}% from last month
                      </p>
                    </div>
                    <div className="bg-green-900/30 p-3 rounded-full">
                      <DollarSign className="h-6 w-6 text-green-400" />
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
            
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
              {/* Recent Users */}
              <Card className="bg-slate-800 border-slate-700 text-white">
                <CardHeader>
                  <CardTitle>Recent User Registrations</CardTitle>
                  <CardDescription className="text-slate-300">
                    Latest users who joined the platform
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {recentUsers.map((user) => (
                      <div key={user.id} className="flex items-center justify-between">
                        <div className="flex items-center">
                          <Avatar className="h-10 w-10 mr-3">
                            <AvatarImage src={`https://api.dicebear.com/7.x/initials/svg?seed=${user.name}`} alt={user.name} />
                            <AvatarFallback>{user.name.charAt(0)}</AvatarFallback>
                          </Avatar>
                          <div>
                            <p className="font-medium">{user.name}</p>
                            <p className="text-sm text-slate-400">{user.email}</p>
                          </div>
                        </div>
                        <div className="flex items-center">
                          {user.isPremium && (
                            <div className="bg-amber-900/30 text-amber-400 px-2 py-1 rounded text-xs mr-3">
                              Premium
                            </div>
                          )}
                          <p className="text-sm text-slate-400">{new Date(user.date).toLocaleDateString()}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
                <CardFooter className="flex justify-center">
                  <Link href="/admin/users">
                    <Button variant="outline" className="border-slate-600 text-white hover:bg-slate-700">
                      View All Users
                    </Button>
                  </Link>
                </CardFooter>
              </Card>
              
              {/* Popular Categories */}
              <Card className="bg-slate-800 border-slate-700 text-white">
                <CardHeader>
                  <CardTitle>Popular Categories</CardTitle>
                  <CardDescription className="text-slate-300">
                    Most tested categories and average scores
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {popularCategories.map((category, index) => (
                      <div key={index} className="flex items-center justify-between">
                        <div>
                          <p className="font-medium">{category.name}</p>
                          <p className="text-sm text-slate-400">{category.tests} tests taken</p>
                        </div>
                        <div className="bg-slate-700 px-3 py-1 rounded-full">
                          <p className="text-sm">
                            Avg: <span className="font-bold">{category.avgScore}%</span>
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
                <CardFooter className="flex justify-center">
                  <Link href="/admin/categories">
                    <Button variant="outline" className="border-slate-600 text-white hover:bg-slate-700">
                      Manage Categories
                    </Button>
                  </Link>
                </CardFooter>
              </Card>
            </div>
            
            {/* Quick Actions */}
            <Card className="bg-slate-800 border-slate-700 text-white">
              <CardHeader>
                <CardTitle>Quick Actions</CardTitle>
                <CardDescription className="text-slate-300">
                  Common administrative tasks
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <Button className="bg-blue-600 hover:bg-blue-700 h-auto py-4 flex flex-col items-center">
                    <Users className="h-6 w-6 mb-2" />
                    <span>Create Free Account</span>
                  </Button>
                  <Button className="bg-green-600 hover:bg-green-700 h-auto py-4 flex flex-col items-center">
                    <Percent className="h-6 w-6 mb-2" />
                    <span>Generate Coupon</span>
                  </Button>
                  <Button className="bg-purple-600 hover:bg-purple-700 h-auto py-4 flex flex-col items-center">
                    <FileText className="h-6 w-6 mb-2" />
                    <span>Add Study Material</span>
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
