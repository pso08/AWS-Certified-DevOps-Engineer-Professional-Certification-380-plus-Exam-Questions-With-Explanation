import jwt from 'jsonwebtoken';
import { cookies } from 'next/headers';

// In a production environment, these should be environment variables
const JWT_SECRET = process.env.JWT_SECRET || 'your-secret-key-change-in-production';
const JWT_EXPIRES_IN = '7d';

export interface JWTPayload {
  userId: string;
  email: string;
  name: string;
  isAdmin: boolean;
  hasPaid: boolean;
}

export const signToken = (payload: JWTPayload): string => {
  return jwt.sign(payload, JWT_SECRET, { expiresIn: JWT_EXPIRES_IN });
};

export const verifyToken = (token: string): JWTPayload | null => {
  try {
    return jwt.verify(token, JWT_SECRET) as JWTPayload;
  } catch (error) {
    return null;
  }
};

export const setAuthCookie = (token: string): void => {
  cookies().set({
    name: 'auth_token',
    value: token,
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'strict',
    maxAge: 60 * 60 * 24 * 7, // 7 days
    path: '/',
  });
};

export const getAuthCookie = (): string | undefined => {
  return cookies().get('auth_token')?.value;
};

export const removeAuthCookie = (): void => {
  cookies().delete('auth_token');
};

export const getCurrentUser = (): JWTPayload | null => {
  const token = getAuthCookie();
  if (!token) return null;
  
  return verifyToken(token);
};
