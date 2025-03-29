'use client';

import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import Link from 'next/link';
import ProgressDashboard from '@/components/progress-dashboard';

export default function ProgressPage() {
  // Track study time
  const [startTime, setStartTime] = useState<number>(Date.now());
  
  // Initialize timer for tracking study time
  useEffect(() => {
    setStartTime(Date.now());
    
    // Set up interval to update study time every 5 minutes
    const interval = setInterval(() => {
      const elapsedMinutes = Math.floor((Date.now() - startTime) / (1000 * 60));
      if (elapsedMinutes >= 5) {
        // Import here to avoid circular dependency
        const { updateStudyTime } = require('@/lib/progress-tracker');
        updateStudyTime(5);
        setStartTime(Date.now());
      }
    }, 5 * 60 * 1000);
    
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="min-h-screen bg-slate-900 text-white">
      <div className="container mx-auto px-4 py-8">
        <div className="mb-6 flex justify-between items-center">
          <h1 className="text-3xl font-bold">Your Progress Dashboard</h1>
          <Link href="/">
            <Button variant="outline" className="border-slate-600 text-white hover:bg-slate-700">
              Back to Home
            </Button>
          </Link>
        </div>
        
        <ProgressDashboard />
        
        <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-6">
          <Link href="/quiz">
            <Card className="bg-slate-800 border-slate-700 hover:bg-slate-700 transition-colors cursor-pointer h-full">
              <CardHeader>
                <CardTitle>Continue Quiz</CardTitle>
                <CardDescription className="text-slate-400">
                  Resume your practice quiz from where you left off
                </CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-slate-300">
                  Test your knowledge with interactive questions and track your progress over time.
                </p>
              </CardContent>
            </Card>
          </Link>
          
          <Link href="/test">
            <Card className="bg-slate-800 border-slate-700 hover:bg-slate-700 transition-colors cursor-pointer h-full">
              <CardHeader>
                <CardTitle>Take a Test</CardTitle>
                <CardDescription className="text-slate-400">
                  Challenge yourself with a timed exam simulation
                </CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-slate-300">
                  Simulate the real exam experience with timed tests and detailed performance analysis.
                </p>
              </CardContent>
            </Card>
          </Link>
          
          <Link href="/flashcards">
            <Card className="bg-slate-800 border-slate-700 hover:bg-slate-700 transition-colors cursor-pointer h-full">
              <CardHeader>
                <CardTitle>Study Flashcards</CardTitle>
                <CardDescription className="text-slate-400">
                  Review key concepts with interactive flashcards
                </CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-slate-300">
                  Reinforce your knowledge with flashcards that help you memorize important concepts.
                </p>
              </CardContent>
            </Card>
          </Link>
        </div>
        
        <div className="mt-8">
          <Card className="bg-slate-800 border-slate-700">
            <CardHeader>
              <CardTitle>Export Your Progress</CardTitle>
              <CardDescription className="text-slate-400">
                Backup your progress data or transfer it to another device
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-slate-300">
                You can export your progress data as a JSON file and import it later or on another device.
              </p>
              <div className="flex flex-col sm:flex-row gap-3">
                <Button 
                  onClick={() => {
                    const { exportProgressData } = require('@/lib/progress-tracker');
                    const data = exportProgressData();
                    const blob = new Blob([data], { type: 'application/json' });
                    const url = URL.createObjectURL(blob);
                    const a = document.createElement('a');
                    a.href = url;
                    a.download = `aws-devops-progress-${new Date().toISOString().split('T')[0]}.json`;
                    document.body.appendChild(a);
                    a.click();
                    document.body.removeChild(a);
                    URL.revokeObjectURL(url);
                  }}
                  className="bg-blue-600 hover:bg-blue-700"
                >
                  Export Progress Data
                </Button>
                <Button 
                  onClick={() => {
                    const input = document.createElement('input');
                    input.type = 'file';
                    input.accept = '.json';
                    input.onchange = (e) => {
                      const file = (e.target as HTMLInputElement).files?.[0];
                      if (file) {
                        const reader = new FileReader();
                        reader.onload = (event) => {
                          const { importProgressData } = require('@/lib/progress-tracker');
                          const success = importProgressData(event.target?.result as string);
                          if (success) {
                            alert('Progress data imported successfully! Refreshing page...');
                            window.location.reload();
                          } else {
                            alert('Failed to import progress data. Please check the file format.');
                          }
                        };
                        reader.readAsText(file);
                      }
                    };
                    document.body.appendChild(input);
                    input.click();
                    document.body.removeChild(input);
                  }}
                  variant="outline"
                  className="border-slate-600 text-white hover:bg-slate-700"
                >
                  Import Progress Data
                </Button>
                <Button 
                  onClick={() => {
                    if (confirm('Are you sure you want to reset all progress data? This cannot be undone.')) {
                      const { resetAllProgress } = require('@/lib/progress-tracker');
                      resetAllProgress();
                      alert('All progress data has been reset. Refreshing page...');
                      window.location.reload();
                    }
                  }}
                  variant="destructive"
                >
                  Reset All Progress
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
