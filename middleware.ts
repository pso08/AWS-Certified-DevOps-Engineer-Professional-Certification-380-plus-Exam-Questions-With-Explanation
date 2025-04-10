// Modified middleware with authentication bypass
import { NextRequest, NextResponse } from 'next/server';

export async function middleware(request: NextRequest) {
  // Always allow access to all routes without authentication
  return NextResponse.next();
}

// Keep the matcher configuration to ensure middleware is still applied to these routes
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
