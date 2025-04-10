import { NextRequest, NextResponse } from 'next/server';
import { verifyEmailToken } from '@/lib/auth/email';

// In a real application, this would interact with a database
// This is a mock implementation for demonstration purposes
interface User {
  id: string;
  name: string;
  email: string;
  password: string;
  isAdmin: boolean;
  hasPaid: boolean;
  emailVerified: boolean;
}

// Mock user database (same as in register route)
const users: User[] = [
  {
    id: '1',
    name: 'Admin User',
    email: 'admin@example.com',
    password: '$2a$10$GQH.xZUBHMDqGYCLBZYJL.9Wf.4ZK6lZT5.fP6YH0Ld7x2OTsqULe', // 'admin'
    isAdmin: true,
    hasPaid: true,
    emailVerified: true
  }
];

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const token = searchParams.get('token');

    if (!token) {
      return NextResponse.json(
        { error: 'Verification token is required' },
        { status: 400 }
      );
    }

    // Verify token
    const email = verifyEmailToken(token);
    if (!email) {
      return NextResponse.json(
        { error: 'Invalid or expired verification token' },
        { status: 400 }
      );
    }

    // Find user by email
    const userIndex = users.findIndex(user => user.email === email);
    if (userIndex === -1) {
      return NextResponse.json(
        { error: 'User not found' },
        { status: 404 }
      );
    }

    // Update user's email verification status
    users[userIndex].emailVerified = true;

    return NextResponse.json(
      { message: 'Email verified successfully' },
      { status: 200 }
    );
  } catch (error) {
    console.error('Email verification error:', error);
    return NextResponse.json(
      { error: 'An error occurred during email verification' },
      { status: 500 }
    );
  }
}
