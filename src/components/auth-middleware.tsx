'use client';

// Modified to bypass authentication completely
export default function AuthMiddleware({ children }: { children: React.ReactNode }) {
  // No authentication checks, just render children directly
  return <>{children}</>;
}
