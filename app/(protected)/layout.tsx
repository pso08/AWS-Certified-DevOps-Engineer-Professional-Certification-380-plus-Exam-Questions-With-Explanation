'use client';

import { useEffect, useState } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import { Metadata } from 'next';
import '../globals.css';
import { ThemeProvider } from '../../src/components/theme-provider';

export default function AppLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();
  const pathname = usePathname();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Skip auth check for login page and admin pages (they have their own auth)
    if (pathname.startsWith('/auth/') || pathname.startsWith('/admin/')) {
      setIsLoading(false);
      return;
    }

    // Check if user is logged in
    if (typeof window !== 'undefined') {
      const session = JSON.parse(localStorage.getItem('user_session') || '{}');
      if (!session.isLoggedIn) {
        router.push('/auth/login');
      } else {
        setIsLoading(false);
      }
    }
  }, [router, pathname]);

  if (isLoading && typeof window !== 'undefined' && 
      !pathname.startsWith('/auth/') && 
      !pathname.startsWith('/admin/')) {
    return (
      <div className="min-h-screen bg-slate-900 text-white flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-white"></div>
      </div>
    );
  }

  return (
    <ThemeProvider
      attribute="class"
      defaultTheme="dark"
      enableSystem
      disableTransitionOnChange
    >
      <main>{children}</main>
    </ThemeProvider>
  );
}
