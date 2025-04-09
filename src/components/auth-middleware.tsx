'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function AuthMiddleware({ children }: { children: React.ReactNode }) {
  const router = useRouter();

  useEffect(() => {
    // Check if user is logged in
    if (typeof window !== 'undefined') {
      const session = JSON.parse(localStorage.getItem('user_session') || '{}');
      if (!session.isLoggedIn) {
        router.push('/auth/login');
      }
    }
  }, [router]);

  return <>{children}</>;
}
