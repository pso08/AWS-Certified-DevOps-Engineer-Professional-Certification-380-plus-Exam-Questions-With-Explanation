// Enhanced middleware with better error handling and TypeScript types
import { NextRequest, NextResponse } from 'next/server';
import { getToken } from 'next-auth/jwt';
import { authOptions } from '@/src/lib/auth/auth';
import NextAuth from 'next-auth';

// Define types for better code quality
interface AuthToken {
  userId: string;
  isAdmin: boolean;
  hasPaid: boolean;
  email: string;
  name: string;
}

// Initialize NextAuth handler
const handler = NextAuth(authOptions);

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  
  try {
    // Handle NextAuth API routes
    if (pathname.startsWith('/api/auth')) {
      const authPath = pathname.replace('/api/auth', '');
      
      if (authPath === '' || authPath === '/') {
        // Handle root auth endpoint
        if (request.method === 'GET') {
          return handler.GET(request);
        } else if (request.method === 'POST') {
          return handler.POST(request);
        }
      }
      
      // For other auth endpoints, pass through to their respective handlers
      return NextResponse.next();
    }
    
    // For protected routes, check authentication
    if (pathname.startsWith('/protected') || 
        pathname.startsWith('/admin') || 
        pathname.startsWith('/profile') ||
        pathname.startsWith('/payment')) {
      
      const token = await getToken({ req: request }) as AuthToken | null;
      
      if (!token) {
        // Redirect to login if not authenticated
        return NextResponse.redirect(new URL('/auth/login', request.url));
      }
      
      // Check admin access for admin routes
      if (pathname.startsWith('/admin') && !token.isAdmin) {
        return NextResponse.redirect(new URL('/', request.url));
      }
      
      // Check payment status for premium content
      if ((pathname.startsWith('/payment/invoices') || pathname.startsWith('/download')) && !token.hasPaid) {
        return NextResponse.redirect(new URL('/payment', request.url));
      }
    }
    
    return NextResponse.next();
  } catch (error) {
    console.error('Middleware error:', error);
    // Return a generic error response instead of crashing
    return new NextResponse('Internal Server Error', { status: 500 });
  }
}

export const config = {
  matcher: [
    '/api/auth/:path*',
    '/protected/:path*',
    '/admin/:path*',
    '/profile/:path*',
    '/payment/:path*',
    '/download/:path*'
  ],
};
