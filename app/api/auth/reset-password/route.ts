import { NextRequest, NextResponse } from 'next/server';
import { verifyPasswordResetToken, consumePasswordResetToken } from '@/lib/auth/email';
import { hashPassword } from '@/lib/auth/password';

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

// Mock user database (same as in other routes)
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

export async function POST(request: NextRequest) {
  try {
    const { token, password } = await request.json();

    if (!token || !password) {
      return NextResponse.json(
        { error: 'Token and password are required' },
        { status: 400 }
      );
    }

    // Verify token
    const email = verifyPasswordResetToken(token);
    if (!email) {
      return NextResponse.json(
        { error: 'Invalid or expired reset token' },
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

    // Hash new password
    const hashedPassword = await hashPassword(password);

    // Update user's password
    users[userIndex].password = hashedPassword;

    // Consume token to prevent reuse
    consumePasswordResetToken(token);

    return NextResponse.json(
      { message: 'Password reset successfully' },
      { status: 200 }
    );
  } catch (error) {
    console.error('Reset password error:', error);
    return NextResponse.json(
      { error: 'An error occurred while resetting your password' },
      { status: 500 }
    );
  }
}
