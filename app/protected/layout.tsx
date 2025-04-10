'use client';

import { useState, useEffect } from 'react';
import { ThemeProvider } from '@/components/theme-provider';
import { ResponsiveNavbar } from '@/components/responsive-navbar';

export default function ProtectedLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [isClient, setIsClient] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    setIsClient(true);
    // Check if user is authenticated
    const session = JSON.parse(localStorage.getItem('user_session') || '{}');
    if (session.isLoggedIn) {
      setIsAuthenticated(true);
    } else {
      // Redirect to login if not authenticated
      window.location.href = '/auth/login';
    }
  }, []);

  if (!isClient || !isAuthenticated) {
    return (
      <div className="min-h-screen bg-slate-900 text-white flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-white"></div>
      </div>
    );
  }

  return (
    <ThemeProvider attribute="class" defaultTheme="dark" enableSystem>
      <div className="min-h-screen bg-background text-foreground">
        <ResponsiveNavbar />
        <main>{children}</main>
      </div>
    </ThemeProvider>
  );
}
