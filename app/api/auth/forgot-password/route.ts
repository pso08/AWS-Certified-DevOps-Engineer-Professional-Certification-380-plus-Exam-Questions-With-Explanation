import { NextRequest, NextResponse } from 'next/server';
import { generatePasswordResetToken, sendPasswordResetEmail } from '@/lib/auth/email';

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
    const { email } = await request.json();

    if (!email) {
      return NextResponse.json(
        { error: 'Email is required' },
        { status: 400 }
      );
    }

    // Find user by email
    const user = users.find(user => user.email === email);
    if (!user) {
      // For security reasons, don't reveal that the user doesn't exist
      return NextResponse.json(
        { message: 'If your email is registered, you will receive a password reset link' },
        { status: 200 }
      );
    }

    // Generate password reset token and send email
    const resetToken = generatePasswordResetToken(email);
    await sendPasswordResetEmail(email, resetToken);

    return NextResponse.json(
      { message: 'Password reset email sent successfully' },
      { status: 200 }
    );
  } catch (error) {
    console.error('Forgot password error:', error);
    return NextResponse.json(
      { error: 'An error occurred while processing your request' },
      { status: 500 }
    );
  }
}
