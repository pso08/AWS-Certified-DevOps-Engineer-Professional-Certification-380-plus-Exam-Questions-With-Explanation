import { NextRequest, NextResponse } from 'next/server';
import { hashPassword } from '@/lib/auth/password';
import { generateVerificationToken, sendVerificationEmail } from '@/lib/auth/email';

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

// Mock user database
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
    const { name, email, password } = await request.json();

    // Validate input
    if (!name || !email || !password) {
      return NextResponse.json(
        { error: 'Name, email, and password are required' },
        { status: 400 }
      );
    }

    // Check if user already exists
    if (users.some(user => user.email === email)) {
      return NextResponse.json(
        { error: 'User with this email already exists' },
        { status: 409 }
      );
    }

    // Hash password
    const hashedPassword = await hashPassword(password);

    // Create new user
    const newUser: User = {
      id: `${users.length + 1}`,
      name,
      email,
      password: hashedPassword,
      isAdmin: false,
      hasPaid: false,
      emailVerified: false
    };

    // Add user to mock database
    users.push(newUser);

    // Generate verification token and send verification email
    const verificationToken = generateVerificationToken(email);
    await sendVerificationEmail(email, verificationToken);

    return NextResponse.json(
      { 
        message: 'User registered successfully. Please check your email to verify your account.',
        userId: newUser.id
      },
      { status: 201 }
    );
  } catch (error) {
    console.error('Registration error:', error);
    return NextResponse.json(
      { error: 'An error occurred during registration' },
      { status: 500 }
    );
  }
}
