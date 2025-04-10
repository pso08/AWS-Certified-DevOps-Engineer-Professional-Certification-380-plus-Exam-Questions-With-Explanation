import { v4 as uuidv4 } from 'uuid';

// In a real application, this would be stored in a database
const verificationTokens = new Map<string, { email: string; expires: Date }>();
const passwordResetTokens = new Map<string, { email: string; expires: Date }>();

// Email verification functions
export const generateVerificationToken = (email: string): string => {
  const token = uuidv4();
  const expires = new Date();
  expires.setHours(expires.getHours() + 24); // Token expires in 24 hours
  
  verificationTokens.set(token, { email, expires });
  return token;
};

export const verifyEmailToken = (token: string): string | null => {
  const verification = verificationTokens.get(token);
  
  if (!verification) return null;
  if (verification.expires < new Date()) {
    verificationTokens.delete(token);
    return null;
  }
  
  const { email } = verification;
  verificationTokens.delete(token);
  return email;
};

// Password reset functions
export const generatePasswordResetToken = (email: string): string => {
  const token = uuidv4();
  const expires = new Date();
  expires.setHours(expires.getHours() + 1); // Token expires in 1 hour
  
  passwordResetTokens.set(token, { email, expires });
  return token;
};

export const verifyPasswordResetToken = (token: string): string | null => {
  const reset = passwordResetTokens.get(token);
  
  if (!reset) return null;
  if (reset.expires < new Date()) {
    passwordResetTokens.delete(token);
    return null;
  }
  
  return reset.email;
};

export const consumePasswordResetToken = (token: string): void => {
  passwordResetTokens.delete(token);
};

// Email sending function (mock implementation)
export const sendEmail = async (to: string, subject: string, body: string): Promise<boolean> => {
  // In a real application, this would use a service like SendGrid, Mailgun, etc.
  console.log(`Sending email to ${to}`);
  console.log(`Subject: ${subject}`);
  console.log(`Body: ${body}`);
  
  // Simulate successful email sending
  return true;
};

// Send verification email
export const sendVerificationEmail = async (email: string, token: string): Promise<boolean> => {
  const verificationUrl = `${process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000'}/auth/verify-email?token=${token}`;
  
  const subject = 'Verify your email address';
  const body = `
    Please verify your email address by clicking the link below:
    
    ${verificationUrl}
    
    This link will expire in 24 hours.
    
    If you did not create an account, you can safely ignore this email.
  `;
  
  return await sendEmail(email, subject, body);
};

// Send password reset email
export const sendPasswordResetEmail = async (email: string, token: string): Promise<boolean> => {
  const resetUrl = `${process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000'}/auth/reset-password?token=${token}`;
  
  const subject = 'Reset your password';
  const body = `
    You requested to reset your password. Please click the link below to set a new password:
    
    ${resetUrl}
    
    This link will expire in 1 hour.
    
    If you did not request a password reset, you can safely ignore this email.
  `;
  
  return await sendEmail(email, subject, body);
};
