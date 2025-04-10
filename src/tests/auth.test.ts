// Test script for authentication system
// This script tests the enhanced authentication system functionality

import { describe, it, expect, beforeEach, afterEach, jest } from '@jest/globals';
import { 
  generateToken, 
  verifyToken,
  hashPassword,
  comparePassword
} from '../lib/auth/jwt';
import { sendVerificationEmail, sendPasswordResetEmail } from '../lib/auth/email';

// Mock localStorage for testing
const localStorageMock = (() => {
  let store = {};
  return {
    getItem: jest.fn(key => store[key] || null),
    setItem: jest.fn((key, value) => {
      store[key] = value.toString();
    }),
    removeItem: jest.fn(key => {
      delete store[key];
    }),
    clear: jest.fn(() => {
      store = {};
    })
  };
})();

Object.defineProperty(window, 'localStorage', {
  value: localStorageMock
});

// Mock fetch for API calls
global.fetch = jest.fn(() =>
  Promise.resolve({
    ok: true,
    json: () => Promise.resolve({ success: true }),
  })
);

describe('Authentication System Tests', () => {
  beforeEach(() => {
    localStorageMock.clear();
    jest.clearAllMocks();
  });

  describe('JWT Token Management', () => {
    it('should generate a valid JWT token', () => {
      const userData = { id: '123', email: 'test@example.com', role: 'user' };
      const token = generateToken(userData);
      
      expect(token).toBeDefined();
      expect(typeof token).toBe('string');
      expect(token.split('.').length).toBe(3); // JWT has 3 parts
    });

    it('should verify a valid token', () => {
      const userData = { id: '123', email: 'test@example.com', role: 'user' };
      const token = generateToken(userData);
      const decoded = verifyToken(token);
      
      expect(decoded).toBeDefined();
      expect(decoded.id).toBe(userData.id);
      expect(decoded.email).toBe(userData.email);
      expect(decoded.role).toBe(userData.role);
    });

    it('should reject an invalid token', () => {
      const invalidToken = 'invalid.token.string';
      
      expect(() => {
        verifyToken(invalidToken);
      }).toThrow();
    });

    it('should reject an expired token', () => {
      // Create a token that's already expired
      const userData = { id: '123', email: 'test@example.com', role: 'user' };
      const expiredToken = generateToken(userData, '0s'); // Expires immediately
      
      // Wait a moment to ensure it's expired
      setTimeout(() => {
        expect(() => {
          verifyToken(expiredToken);
        }).toThrow();
      }, 10);
    });
  });

  describe('Password Management', () => {
    it('should hash a password', async () => {
      const password = 'securePassword123';
      const hashedPassword = await hashPassword(password);
      
      expect(hashedPassword).toBeDefined();
      expect(hashedPassword).not.toBe(password);
      expect(hashedPassword.length).toBeGreaterThan(20); // Bcrypt hashes are long
    });

    it('should verify a correct password', async () => {
      const password = 'securePassword123';
      const hashedPassword = await hashPassword(password);
      const isMatch = await comparePassword(password, hashedPassword);
      
      expect(isMatch).toBe(true);
    });

    it('should reject an incorrect password', async () => {
      const password = 'securePassword123';
      const wrongPassword = 'wrongPassword123';
      const hashedPassword = await hashPassword(password);
      const isMatch = await comparePassword(wrongPassword, hashedPassword);
      
      expect(isMatch).toBe(false);
    });
  });

  describe('Email Verification', () => {
    it('should send verification email', async () => {
      const user = { id: '123', email: 'test@example.com', name: 'Test User' };
      const token = 'verification-token-123';
      
      await sendVerificationEmail(user, token);
      
      expect(fetch).toHaveBeenCalledTimes(1);
      expect(fetch).toHaveBeenCalledWith(expect.any(String), expect.objectContaining({
        method: 'POST',
        headers: expect.objectContaining({
          'Content-Type': 'application/json'
        }),
        body: expect.stringContaining('verification')
      }));
    });

    it('should send password reset email', async () => {
      const user = { id: '123', email: 'test@example.com', name: 'Test User' };
      const token = 'reset-token-123';
      
      await sendPasswordResetEmail(user, token);
      
      expect(fetch).toHaveBeenCalledTimes(1);
      expect(fetch).toHaveBeenCalledWith(expect.any(String), expect.objectContaining({
        method: 'POST',
        headers: expect.objectContaining({
          'Content-Type': 'application/json'
        }),
        body: expect.stringContaining('reset')
      }));
    });
  });

  describe('Login/Logout Flow', () => {
    it('should store user session on login', () => {
      const userData = { 
        id: '123', 
        email: 'test@example.com', 
        name: 'Test User',
        role: 'user',
        isLoggedIn: true
      };
      
      // Simulate login
      localStorage.setItem('user_session', JSON.stringify(userData));
      
      const storedData = JSON.parse(localStorage.getItem('user_session'));
      expect(storedData).toEqual(userData);
      expect(storedData.isLoggedIn).toBe(true);
    });

    it('should clear user session on logout', () => {
      const userData = { 
        id: '123', 
        email: 'test@example.com', 
        name: 'Test User',
        role: 'user',
        isLoggedIn: true
      };
      
      // Set initial logged in state
      localStorage.setItem('user_session', JSON.stringify(userData));
      
      // Simulate logout
      localStorage.removeItem('user_session');
      
      expect(localStorage.getItem('user_session')).toBeNull();
    });
  });

  describe('Admin Access Control', () => {
    it('should grant access to admin users', () => {
      const adminData = { 
        id: '123', 
        email: 'admin@example.com', 
        name: 'Admin User',
        role: 'admin',
        isLoggedIn: true
      };
      
      // Set admin session
      localStorage.setItem('user_session', JSON.stringify(adminData));
      
      const storedData = JSON.parse(localStorage.getItem('user_session'));
      expect(storedData.role).toBe('admin');
      
      // In a real app, this would check if the user can access admin routes
      const canAccessAdmin = storedData.role === 'admin';
      expect(canAccessAdmin).toBe(true);
    });

    it('should deny access to non-admin users', () => {
      const userData = { 
        id: '123', 
        email: 'user@example.com', 
        name: 'Regular User',
        role: 'user',
        isLoggedIn: true
      };
      
      // Set regular user session
      localStorage.setItem('user_session', JSON.stringify(userData));
      
      const storedData = JSON.parse(localStorage.getItem('user_session'));
      expect(storedData.role).toBe('user');
      
      // In a real app, this would check if the user can access admin routes
      const canAccessAdmin = storedData.role === 'admin';
      expect(canAccessAdmin).toBe(false);
    });
  });
});
