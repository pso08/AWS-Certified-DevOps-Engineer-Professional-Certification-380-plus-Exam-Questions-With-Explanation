'use client';

// Modified to bypass authentication completely
export default function Home() {
  // Redirect directly to protected content without authentication
  if (typeof window !== 'undefined') {
    window.location.href = '/protected';
  }
  
  // This is a fallback for server-side rendering
  return (
    <div className="min-h-screen bg-slate-900 text-white flex items-center justify-center">
      <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-white"></div>
    </div>
  );
}
