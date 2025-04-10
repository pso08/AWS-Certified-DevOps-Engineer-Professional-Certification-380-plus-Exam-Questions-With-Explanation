import NextAuth from 'next-auth';
import GoogleProvider from 'next-auth/providers/google';
import GithubProvider from 'next-auth/providers/github';
import CredentialsProvider from 'next-auth/providers/credentials';
import { comparePassword } from './password';
import { JWTPayload, signToken, setAuthCookie } from './jwt';

// In a real application, this would be stored in a database
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

// Find user by email
const findUserByEmail = (email: string): User | undefined => {
  return users.find(user => user.email === email);
};

// OAuth configuration
export const authOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID || 'mock-google-client-id',
      clientSecret: process.env.GOOGLE_CLIENT_SECRET || 'mock-google-client-secret',
    }),
    GithubProvider({
      clientId: process.env.GITHUB_CLIENT_ID || 'mock-github-client-id',
      clientSecret: process.env.GITHUB_CLIENT_SECRET || 'mock-github-client-secret',
    }),
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        email: { label: 'Email', type: 'email' },
        password: { label: 'Password', type: 'password' }
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          return null;
        }

        const user = findUserByEmail(credentials.email);
        if (!user) {
          return null;
        }

        const isPasswordValid = await comparePassword(credentials.password, user.password);
        if (!isPasswordValid) {
          return null;
        }

        if (!user.emailVerified) {
          throw new Error('Email not verified');
        }

        return {
          id: user.id,
          name: user.name,
          email: user.email,
          isAdmin: user.isAdmin,
          hasPaid: user.hasPaid
        };
      }
    })
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.userId = user.id;
        token.isAdmin = user.isAdmin;
        token.hasPaid = user.hasPaid;
      }
      return token;
    },
    async session({ session, token }) {
      if (token) {
        session.user.id = token.userId;
        session.user.isAdmin = token.isAdmin;
        session.user.hasPaid = token.hasPaid;
      }
      return session;
    },
    async signIn({ user, account }) {
      // For OAuth sign-ins, create or update the user in your database
      if (account?.provider === 'google' || account?.provider === 'github') {
        // In a real application, you would create or update the user in your database
        // For this mock implementation, we'll just return true
        return true;
      }
      
      return true;
    }
  },
  pages: {
    signIn: '/auth/login',
    signOut: '/auth/logout',
    error: '/auth/error',
    verifyRequest: '/auth/verify-request',
    newUser: '/auth/new-user'
  },
  session: {
    strategy: 'jwt',
    maxAge: 7 * 24 * 60 * 60, // 7 days
  },
  secret: process.env.NEXTAUTH_SECRET || 'your-secret-key-change-in-production',
};

export const handler = NextAuth(authOptions);

// Helper function to create a custom JWT token and set it as a cookie
export const createCustomSession = async (user: User): Promise<void> => {
  const payload: JWTPayload = {
    userId: user.id,
    email: user.email,
    name: user.name,
    isAdmin: user.isAdmin,
    hasPaid: user.hasPaid
  };
  
  const token = signToken(payload);
  setAuthCookie(token);
};
