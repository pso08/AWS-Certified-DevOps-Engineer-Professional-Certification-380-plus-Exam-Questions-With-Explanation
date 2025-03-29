import { useEffect } from 'react';

// Define the structure for analytics events
export interface AnalyticsEvent {
  eventName: string;
  properties?: Record<string, any>;
  timestamp: number;
}

// Define the structure for user session
export interface UserSession {
  sessionId: string;
  startTime: number;
  lastActivity: number;
  pageViews: number;
  events: AnalyticsEvent[];
}

// Initialize analytics session
export function initAnalytics(): UserSession {
  if (typeof window === 'undefined') {
    return createNewSession();
  }

  try {
    const savedSession = localStorage.getItem('aws_devops_analytics_session');
    if (savedSession) {
      const session = JSON.parse(savedSession) as UserSession;
      
      // Check if session is expired (30 minutes of inactivity)
      const now = Date.now();
      if (now - session.lastActivity > 30 * 60 * 1000) {
        // Session expired, create new one
        return createNewSession();
      }
      
      // Update last activity
      session.lastActivity = now;
      saveSession(session);
      return session;
    }
    
    return createNewSession();
  } catch (error) {
    console.error('Error initializing analytics:', error);
    return createNewSession();
  }
}

// Create a new analytics session
function createNewSession(): UserSession {
  const session: UserSession = {
    sessionId: generateSessionId(),
    startTime: Date.now(),
    lastActivity: Date.now(),
    pageViews: 1,
    events: []
  };
  
  saveSession(session);
  return session;
}

// Generate a unique session ID
function generateSessionId(): string {
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
    const r = Math.random() * 16 | 0;
    const v = c === 'x' ? r : (r & 0x3 | 0x8);
    return v.toString(16);
  });
}

// Save session to localStorage
function saveSession(session: UserSession): void {
  if (typeof window === 'undefined') return;
  
  try {
    localStorage.setItem('aws_devops_analytics_session', JSON.stringify(session));
  } catch (error) {
    console.error('Error saving analytics session:', error);
  }
}

// Track an analytics event
export function trackEvent(eventName: string, properties?: Record<string, any>): void {
  if (typeof window === 'undefined') return;
  
  try {
    const session = initAnalytics();
    
    const event: AnalyticsEvent = {
      eventName,
      properties,
      timestamp: Date.now()
    };
    
    session.events.push(event);
    session.lastActivity = Date.now();
    
    saveSession(session);
    
    // In a real application, you might want to send this to a server
    // For now, we'll just log it to the console in development
    if (process.env.NODE_ENV === 'development') {
      console.log('Analytics event:', event);
    }
  } catch (error) {
    console.error('Error tracking event:', error);
  }
}

// Track page view
export function trackPageView(pageName: string): void {
  if (typeof window === 'undefined') return;
  
  try {
    const session = initAnalytics();
    
    session.pageViews += 1;
    session.lastActivity = Date.now();
    
    trackEvent('page_view', { pageName });
  } catch (error) {
    console.error('Error tracking page view:', error);
  }
}

// Get analytics data for reporting
export function getAnalyticsData(): UserSession | null {
  if (typeof window === 'undefined') return null;
  
  try {
    const savedSession = localStorage.getItem('aws_devops_analytics_session');
    if (savedSession) {
      return JSON.parse(savedSession) as UserSession;
    }
    return null;
  } catch (error) {
    console.error('Error getting analytics data:', error);
    return null;
  }
}

// Clear analytics data
export function clearAnalyticsData(): void {
  if (typeof window === 'undefined') return;
  
  try {
    localStorage.removeItem('aws_devops_analytics_session');
  } catch (error) {
    console.error('Error clearing analytics data:', error);
  }
}

// React hook to track page views
export function usePageView(pageName: string): void {
  useEffect(() => {
    trackPageView(pageName);
  }, [pageName]);
}

// Analytics categories
export const AnalyticsCategory = {
  QUIZ: 'quiz',
  TEST: 'test',
  FLASHCARD: 'flashcard',
  SEARCH: 'search',
  PROGRESS: 'progress',
  THEME: 'theme',
  NAVIGATION: 'navigation',
  STUDY_MATERIALS: 'study_materials'
};

// Analytics actions
export const AnalyticsAction = {
  VIEW: 'view',
  CLICK: 'click',
  SUBMIT: 'submit',
  COMPLETE: 'complete',
  START: 'start',
  TOGGLE: 'toggle',
  SEARCH: 'search',
  DOWNLOAD: 'download',
  RESET: 'reset',
  NAVIGATE: 'navigate'
};
