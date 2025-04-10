'use client';

import { useState, useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { AlertCircle, Check } from 'lucide-react';

export default function VerifyEmailPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const token = searchParams.get('token');
  
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  
  useEffect(() => {
    const verifyEmail = async () => {
      if (!token) {
        setError('Invalid or missing verification token');
        setIsLoading(false);
        return;
      }
      
      try {
        const response = await fetch(`/api/auth/verify-email?token=${token}`, {
          method: 'GET',
        });
        
        const data = await response.json();
        
        if (!response.ok) {
          setError(data.error || 'Failed to verify email');
          setIsLoading(false);
          return;
        }
        
        setSuccess(data.message || 'Email verified successfully');
        setIsLoading(false);
      } catch (error) {
        console.error('Email verification error:', error);
        setError('An error occurred while verifying your email');
        setIsLoading(false);
      }
    };
    
    verifyEmail();
  }, [token, router]);
  
  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-900 to-slate-800 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-white">Email Verification</h1>
          <p className="text-slate-300 mt-2">Verifying your email address</p>
        </div>
        
        <Card className="bg-slate-800 border-slate-700 text-white">
          <CardHeader>
            <CardTitle>Email Verification</CardTitle>
            <CardDescription className="text-slate-300">
              Confirming your email address
            </CardDescription>
          </CardHeader>
          <CardContent>
            {isLoading && (
              <div className="flex flex-col items-center justify-center py-8">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-white mb-4"></div>
                <p className="text-slate-300">Verifying your email address...</p>
              </div>
            )}
            
            {error && (
              <Alert variant="destructive" className="mb-4 bg-red-900/30 border-red-800 text-red-200">
                <AlertCircle className="h-4 w-4" />
                <AlertDescription>{error}</AlertDescription>
              </Alert>
            )}
            
            {success && (
              <Alert className="mb-4 bg-green-900/30 border-green-800 text-green-200">
                <Check className="h-4 w-4" />
                <AlertDescription>{success}</AlertDescription>
              </Alert>
            )}
          </CardContent>
          <CardFooter className="flex justify-center">
            <Link href="/auth/login">
              <Button 
                variant="outline" 
                className="border-slate-600 text-white hover:bg-slate-700"
                disabled={isLoading}
              >
                {success ? 'Proceed to Login' : 'Back to Login'}
              </Button>
            </Link>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
}
