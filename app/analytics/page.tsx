'use client';

import React from 'react';
import { usePageView, trackEvent, AnalyticsCategory, AnalyticsAction } from '@/lib/analytics';
import AnalyticsDashboard from '@/components/analytics-dashboard';
import { Button } from '@/components/ui/button';
import Link from 'next/link';

export default function AnalyticsPage() {
  // Track page view
  usePageView('analytics');
  
  return (
    <div className="min-h-screen bg-slate-900 text-white">
      <div className="container mx-auto px-4 py-8">
        <div className="mb-6 flex justify-between items-center">
          <h1 className="text-3xl font-bold">Analytics Dashboard</h1>
          <Link href="/">
            <Button 
              variant="outline" 
              className="border-slate-600 text-white hover:bg-slate-700"
              onClick={() => trackEvent('button_click', {
                category: AnalyticsCategory.NAVIGATION,
                action: AnalyticsAction.NAVIGATE,
                label: 'back_to_home_from_analytics'
              })}
            >
              Back to Home
            </Button>
          </Link>
        </div>
        
        <AnalyticsDashboard />
      </div>
    </div>
  );
}
