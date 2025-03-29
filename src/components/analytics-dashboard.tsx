'use client';

import React, { useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell, LineChart, Line } from 'recharts';
import { getAnalyticsData, AnalyticsCategory } from '@/lib/analytics';
import { Button } from '@/components/ui/button';
import Link from 'next/link';

export default function AnalyticsDashboard() {
  const [analyticsData, setAnalyticsData] = React.useState<any>(null);
  const [loading, setLoading] = React.useState(true);
  
  useEffect(() => {
    // Load analytics data
    const data = getAnalyticsData();
    setAnalyticsData(data);
    setLoading(false);
  }, []);
  
  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }
  
  if (!analyticsData) {
    return (
      <div className="text-center py-12">
        <h3 className="text-xl font-medium mb-2">No analytics data available</h3>
        <p className="text-slate-400 max-w-md mx-auto mb-6">
          Start using the application to generate analytics data.
        </p>
        <Link href="/">
          <Button className="bg-blue-600 hover:bg-blue-700">
            Go to Home
          </Button>
        </Link>
      </div>
    );
  }
  
  // Process analytics data
  const events = analyticsData.events || [];
  
  // Count events by category
  const eventsByCategory = events.reduce((acc: Record<string, number>, event: any) => {
    const category = event.properties?.category || 'uncategorized';
    acc[category] = (acc[category] || 0) + 1;
    return acc;
  }, {});
  
  // Format for chart
  const categoryData = Object.entries(eventsByCategory).map(([name, value]) => ({
    name,
    value
  }));
  
  // Count page views
  const pageViews = events.filter((event: any) => event.eventName === 'page_view');
  const pageViewsByPage = pageViews.reduce((acc: Record<string, number>, event: any) => {
    const pageName = event.properties?.pageName || 'unknown';
    acc[pageName] = (acc[pageName] || 0) + 1;
    return acc;
  }, {});
  
  // Format for chart
  const pageViewData = Object.entries(pageViewsByPage).map(([name, value]) => ({
    name,
    views: value
  }));
  
  // Get quiz and test events
  const quizEvents = events.filter((event: any) => 
    event.properties?.category === AnalyticsCategory.QUIZ
  );
  
  const testEvents = events.filter((event: any) => 
    event.properties?.category === AnalyticsCategory.TEST
  );
  
  // Calculate time spent
  const sessionDuration = analyticsData.lastActivity - analyticsData.startTime;
  const sessionDurationMinutes = Math.round(sessionDuration / (1000 * 60));
  
  // Colors for charts
  const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884d8', '#82ca9d'];
  
  return (
    <div className="w-full max-w-6xl mx-auto p-4">
      <h1 className="text-2xl font-bold mb-6">Analytics Dashboard</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        <Card className="bg-slate-800 border-slate-700">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Session Duration</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{sessionDurationMinutes} min</div>
            <p className="text-xs text-slate-400 mt-1">
              Current session started {new Date(analyticsData.startTime).toLocaleTimeString()}
            </p>
          </CardContent>
        </Card>
        
        <Card className="bg-slate-800 border-slate-700">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Page Views</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{analyticsData.pageViews}</div>
            <p className="text-xs text-slate-400 mt-1">
              {pageViews.length} unique page views
            </p>
          </CardContent>
        </Card>
        
        <Card className="bg-slate-800 border-slate-700">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Quiz Activity</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{quizEvents.length}</div>
            <p className="text-xs text-slate-400 mt-1">
              Quiz-related interactions
            </p>
          </CardContent>
        </Card>
        
        <Card className="bg-slate-800 border-slate-700">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Test Activity</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{testEvents.length}</div>
            <p className="text-xs text-slate-400 mt-1">
              Test-related interactions
            </p>
          </CardContent>
        </Card>
      </div>
      
      <Tabs defaultValue="overview" className="w-full">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="pages">Page Views</TabsTrigger>
          <TabsTrigger value="events">Event Timeline</TabsTrigger>
        </TabsList>
        
        <TabsContent value="overview" className="mt-4">
          <Card className="bg-slate-800 border-slate-700">
            <CardHeader>
              <CardTitle>Activity by Category</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-80 w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart
                    data={categoryData}
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
                    />
                    <Bar dataKey="value" name="Events" fill="#3b82f6" radius={[4, 4, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6">
                <div className="h-64">
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={categoryData}
                        cx="50%"
                        cy="50%"
                        labelLine={false}
                        outerRadius={80}
                        fill="#8884d8"
                        dataKey="value"
                        nameKey="name"
                        label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                      >
                        {categoryData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                        ))}
                      </Pie>
                      <Tooltip 
                        contentStyle={{ backgroundColor: '#1e293b', borderColor: '#475569', color: '#fff' }}
                      />
                    </PieChart>
                  </ResponsiveContainer>
                </div>
                
                <div className="space-y-4">
                  <h3 className="font-semibold">Activity Summary</h3>
                  {categoryData.map((category, index) => (
                    <div key={index} className="flex justify-between items-center">
                      <div className="flex items-center">
                        <div 
                          className="w-3 h-3 rounded-full mr-2" 
                          style={{ backgroundColor: COLORS[index % COLORS.length] }}
                        ></div>
                        <span className="capitalize">{category.name}</span>
                      </div>
                      <span className="font-medium">{category.value} events</span>
                    </div>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="pages" className="mt-4">
          <Card className="bg-slate-800 border-slate-700">
            <CardHeader>
              <CardTitle>Page Views</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-80 w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart
                    data={pageViewData}
                    margin={{ top: 20, right: 30, left: 20, bottom: 60 }}
                    layout="vertical"
                  >
                    <CartesianGrid strokeDasharray="3 3" stroke="#444" />
                    <XAxis type="number" tick={{ fill: '#ccc' }} />
                    <YAxis 
                      dataKey="name" 
                      type="category"
                      tick={{ fill: '#ccc', fontSize: 12 }} 
                      width={120}
                    />
                    <Tooltip 
                      contentStyle={{ backgroundColor: '#1e293b', borderColor: '#475569', color: '#fff' }}
                    />
                    <Bar dataKey="views" name="Views" fill="#3b82f6" radius={[0, 4, 4, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </div>
              
              <div className="mt-6">
                <h3 className="font-semibold mb-4">Page View Details</h3>
                <div className="bg-slate-700/50 rounded-lg border border-slate-600 overflow-hidden">
                  <table className="w-full">
                    <thead>
                      <tr className="border-b border-slate-600">
                        <th className="text-left p-3">Page</th>
                        <th className="text-right p-3">Views</th>
                        <th className="text-right p-3">% of Total</th>
                      </tr>
                    </thead>
                    <tbody>
                      {pageViewData.map((page, index) => (
                        <tr key={index} className="border-b border-slate-600 last:border-0">
                          <td className="p-3">{page.name}</td>
                          <td className="text-right p-3">{page.views}</td>
                          <td className="text-right p-3">
                            {((page.views / analyticsData.pageViews) * 100).toFixed(1)}%
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="events" className="mt-4">
          <Card className="bg-slate-800 border-slate-700">
            <CardHeader>
              <CardTitle>Event Timeline</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="bg-slate-700/50 rounded-lg border border-slate-600 overflow-hidden">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-slate-600">
                      <th className="text-left p-3">Time</th>
                      <th className="text-left p-3">Event</th>
                      <th className="text-left p-3">Category</th>
                      <th className="text-left p-3">Details</th>
                    </tr>
                  </thead>
                  <tbody>
                    {events.slice().reverse().slice(0, 20).map((event: any, index: number) => (
                      <tr key={index} className="border-b border-slate-600 last:border-0">
                        <td className="p-3 whitespace-nowrap">
                          {new Date(event.timestamp).toLocaleTimeString()}
                        </td>
                        <td className="p-3">{event.eventName}</td>
                        <td className="p-3">{event.properties?.category || '-'}</td>
                        <td className="p-3">
                          {event.properties ? (
                            <div className="text-xs">
                              {Object.entries(event.properties)
                                .filter(([key]) => key !== 'category')
                                .map(([key, value]) => (
                                  <div key={key}>
                                    <span className="text-slate-400">{key}:</span> {String(value)}
                                  </div>
                                ))
                              }
                            </div>
                          ) : '-'}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              
              <div className="text-center text-sm text-slate-400 mt-4">
                Showing the 20 most recent events. Total events: {events.length}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
