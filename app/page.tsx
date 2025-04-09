'use client';

import { redirect } from 'next/navigation';

export default function Home() {
  if (typeof window !== 'undefined') {
    const session = JSON.parse(localStorage.getItem('user_session') || '{}');
    if (!session.isLoggedIn) {
      redirect('/auth/login');
    } else {
      redirect('/protected');
    }
  }
  
  // This is a fallback for server-side rendering
  return (
    <div className="min-h-screen bg-slate-900 text-white flex items-center justify-center">
      <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-white"></div>
    </div>
  );
}
