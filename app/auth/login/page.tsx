'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Lock, User, LogIn, UserPlus, AlertCircle, Mail, Eye, EyeOff } from 'lucide-react';
import { signIn } from 'next-auth/react';
import { z } from 'zod';

// Form validation schemas
const loginSchema = z.object({
  email: z.string().email('Please enter a valid email address'),
  password: z.string().min(6, 'Password must be at least 6 characters'),
});

const registerSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters'),
  email: z.string().email('Please enter a valid email address'),
  password: z.string().min(6, 'Password must be at least 6 characters'),
  confirmPassword: z.string(),
}).refine(data => data.password === data.confirmPassword, {
  message: "Passwords don't match",
  path: ['confirmPassword'],
});

export default function LoginPage() {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState('login');
  
  // Login state
  const [loginEmail, setLoginEmail] = useState('');
  const [loginPassword, setLoginPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loginErrors, setLoginErrors] = useState<Record<string, string>>({});
  const [loginIsLoading, setLoginIsLoading] = useState(false);
  const [loginError, setLoginError] = useState('');
  
  // Register state
  const [registerName, setRegisterName] = useState('');
  const [registerEmail, setRegisterEmail] = useState('');
  const [registerPassword, setRegisterPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showRegisterPassword, setShowRegisterPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [registerErrors, setRegisterErrors] = useState<Record<string, string>>({});
  const [registerIsLoading, setRegisterIsLoading] = useState(false);
  const [registerError, setRegisterError] = useState('');
  const [registerSuccess, setRegisterSuccess] = useState('');
  
  // Forgot password state
  const [forgotPasswordEmail, setForgotPasswordEmail] = useState('');
  const [forgotPasswordIsLoading, setForgotPasswordIsLoading] = useState(false);
  const [forgotPasswordError, setForgotPasswordError] = useState('');
  const [forgotPasswordSuccess, setForgotPasswordSuccess] = useState('');
  
  // Handle login form submission
  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoginError('');
    setLoginErrors({});
    setLoginIsLoading(true);
    
    try {
      // Validate form
      const result = loginSchema.safeParse({ email: loginEmail, password: loginPassword });
      if (!result.success) {
        const formattedErrors: Record<string, string> = {};
        result.error.errors.forEach(error => {
          formattedErrors[error.path[0]] = error.message;
        });
        setLoginErrors(formattedErrors);
        setLoginIsLoading(false);
        return;
      }
      
      // Sign in with credentials
      const response = await signIn('credentials', {
        redirect: false,
        email: loginEmail,
        password: loginPassword,
      });
      
      if (response?.error) {
        setLoginError(response.error === 'Email not verified' 
          ? 'Please verify your email before logging in' 
          : 'Invalid email or password');
        setLoginIsLoading(false);
        return;
      }
      
      // Redirect to home page on success
      router.push('/protected');
    } catch (error) {
      console.error('Login error:', error);
      setLoginError('An error occurred during login');
      setLoginIsLoading(false);
    }
  };
  
  // Handle register form submission
  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setRegisterError('');
    setRegisterSuccess('');
    setRegisterErrors({});
    setRegisterIsLoading(true);
    
    try {
      // Validate form
      const result = registerSchema.safeParse({
        name: registerName,
        email: registerEmail,
        password: registerPassword,
        confirmPassword: confirmPassword,
      });
      
      if (!result.success) {
        const formattedErrors: Record<string, string> = {};
        result.error.errors.forEach(error => {
          formattedErrors[error.path[0]] = error.message;
        });
        setRegisterErrors(formattedErrors);
        setRegisterIsLoading(false);
        return;
      }
      
      // Register user
      const response = await fetch('/api/auth/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: registerName,
          email: registerEmail,
          password: registerPassword,
        }),
      });
      
      const data = await response.json();
      
      if (!response.ok) {
        setRegisterError(data.error || 'Registration failed');
        setRegisterIsLoading(false);
        return;
      }
      
      // Show success message
      setRegisterSuccess(data.message || 'Registration successful! Please check your email to verify your account.');
      
      // Reset form
      setRegisterName('');
      setRegisterEmail('');
      setRegisterPassword('');
      setConfirmPassword('');
    } catch (error) {
      console.error('Registration error:', error);
      setRegisterError('An error occurred during registration');
    } finally {
      setRegisterIsLoading(false);
    }
  };
  
  // Handle forgot password form submission
  const handleForgotPassword = async (e: React.FormEvent) => {
    e.preventDefault();
    setForgotPasswordError('');
    setForgotPasswordSuccess('');
    setForgotPasswordIsLoading(true);
    
    try {
      if (!forgotPasswordEmail) {
        setForgotPasswordError('Email is required');
        setForgotPasswordIsLoading(false);
        return;
      }
      
      // Send password reset email
      const response = await fetch('/api/auth/forgot-password', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: forgotPasswordEmail,
        }),
      });
      
      const data = await response.json();
      
      if (!response.ok) {
        setForgotPasswordError(data.error || 'Failed to send password reset email');
        setForgotPasswordIsLoading(false);
        return;
      }
      
      // Show success message
      setForgotPasswordSuccess(data.message || 'Password reset email sent successfully');
      
      // Reset form
      setForgotPasswordEmail('');
    } catch (error) {
      console.error('Forgot password error:', error);
      setForgotPasswordError('An error occurred while processing your request');
    } finally {
      setForgotPasswordIsLoading(false);
    }
  };
  
  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-900 to-slate-800 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-white">AWS DevOps Quiz App</h1>
          <p className="text-slate-300 mt-2">Sign in to access your study materials</p>
        </div>
        
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-2 bg-slate-800">
            <TabsTrigger value="login" className="data-[state=active]:bg-slate-700">
              <LogIn className="h-4 w-4 mr-2" />
              Login
            </TabsTrigger>
            <TabsTrigger value="register" className="data-[state=active]:bg-slate-700">
              <UserPlus className="h-4 w-4 mr-2" />
              Register
            </TabsTrigger>
          </TabsList>
          
          <TabsContent value="login">
            <Card className="bg-slate-800 border-slate-700 text-white">
              <CardHeader>
                <CardTitle>Login</CardTitle>
                <CardDescription className="text-slate-300">
                  Enter your credentials to access your account
                </CardDescription>
              </CardHeader>
              <CardContent>
                {loginError && (
                  <Alert variant="destructive" className="mb-4 bg-red-900/30 border-red-800 text-red-200">
                    <AlertCircle className="h-4 w-4" />
                    <AlertDescription>{loginError}</AlertDescription>
                  </Alert>
                )}
                
                <form onSubmit={handleLogin} className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="email" className="text-white">Email</Label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                        <Mail className="h-4 w-4 text-slate-400" />
                      </div>
                      <Input
                        id="email"
                        type="email"
                        placeholder="you@example.com"
                        value={loginEmail}
                        onChange={(e) => setLoginEmail(e.target.value)}
                        className={`bg-slate-700 border-slate-600 text-white pl-10 ${
                          loginErrors.email ? 'border-red-500' : ''
                        }`}
                      />
                    </div>
                    {loginErrors.email && (
                      <p className="text-red-400 text-sm mt-1">{loginErrors.email}</p>
                    )}
                  </div>
                  
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <Label htmlFor="password" className="text-white">Password</Label>
                      <button
                        type="button"
                        onClick={() => setActiveTab('forgot-password')}
                        className="text-sm text-blue-400 hover:text-blue-300"
                      >
                        Forgot password?
                      </button>
                    </div>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                        <Lock className="h-4 w-4 text-slate-400" />
                      </div>
                      <Input
                        id="password"
                        type={showPassword ? "text" : "password"}
                        placeholder="••••••••"
                        value={loginPassword}
                        onChange={(e) => setLoginPassword(e.target.value)}
                        className={`bg-slate-700 border-slate-600 text-white pl-10 pr-10 ${
                          loginErrors.password ? 'border-red-500' : ''
                        }`}
                      />
                      <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute inset-y-0 right-0 flex items-center pr-3 text-slate-400 hover:text-slate-300 focus:outline-none"
                        tabIndex={-1}
                        aria-label={showPassword ? "Hide password" : "Show password"}
                      >
                        {showPassword ? (
                          <EyeOff className="h-4 w-4" />
                        ) : (
                          <Eye className="h-4 w-4" />
                        )}
                      </button>
                    </div>
                    {loginErrors.password && (
                      <p className="text-red-400 text-sm mt-1">{loginErrors.password}</p>
                    )}
                  </div>
                  
                  <Button 
                    type="submit" 
                    className="w-full bg-blue-600 hover:bg-blue-700"
                    disabled={loginIsLoading}
                  >
                    {loginIsLoading ? (
                      <>
                        <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                        Signing in...
                      </>
                    ) : (
                      <>
                        <LogIn className="mr-2 h-4 w-4" />
                        Sign In
                      </>
                    )}
                  </Button>
                </form>
                
                <div className="mt-6">
                  <div className="relative">
                    <div className="absolute inset-0 flex items-center">
                      <div className="w-full border-t border-slate-600"></div>
                    </div>
                    <div className="relative flex justify-center text-sm">
                      <span className="px-2 bg-slate-800 text-slate-400">Or continue with</span>
                    </div>
                  </div>
                  
                  <div className="mt-6 grid grid-cols-2 gap-3">
                    <Button
                      type="button"
                      onClick={() => signIn('google', { callbackUrl: '/protected' })}
                      className="bg-white hover:bg-gray-200 text-gray-800"
                    >
                      <svg className="h-5 w-5 mr-2" viewBox="0 0 24 24">
                        <g transform="matrix(1, 0, 0, 1, 27.009001, -39.238998)">
                          <path fill="#4285F4" d="M -3.264 51.509 C -3.264 50.719 -3.334 49.969 -3.454 49.239 L -14.754 49.239 L -14.754 53.749 L -8.284 53.749 C -8.574 55.229 -9.424 56.479 -10.684 57.329 L -10.684 60.329 L -6.824 60.329 C -4.564 58.239 -3.264 55.159 -3.264 51.509 Z"/>
                          <path fill="#34A853" d="M -14.754 63.239 C -11.514 63.239 -8.804 62.159 -6.824 60.329 L -10.684 57.329 C -11.764 58.049 -13.134 58.489 -14.754 58.489 C -17.884 58.489 -20.534 56.379 -21.484 53.529 L -25.464 53.529 L -25.464 56.619 C -23.494 60.539 -19.444 63.239 -14.754 63.239 Z"/>
                          <path fill="#FBBC05" d="M -21.484 53.529 C -21.734 52.809 -21.864 52.039 -21.864 51.239 C -21.864 50.439 -21.724 49.669 -21.484 48.949 L -21.484 45.859 L -25.464 45.859 C -26.284 47.479 -26.754 49.299 -26.754 51.239 C -26.754 53.179 -26.284 54.999 -25.464 56.619 L -21.484 53.529 Z"/>
                          <path fill="#EA4335" d="M -14.754 43.989 C -12.984 43.989 -11.404 44.599 -10.154 45.789 L -6.734 42.369 C -8.804 40.429 -11.514 39.239 -14.754 39.239 C -19.444 39.239 -23.494 41.939 -25.464 45.859 L -21.484 48.949 C -20.534 46.099 -17.884 43.989 -14.754 43.989 Z"/>
                        </g>
                      </svg>
                      Google
                    </Button>
                    <Button
                      type="button"
                      onClick={() => signIn('github', { callbackUrl: '/protected' })}
                      className="bg-gray-800 hover:bg-gray-900 text-white"
                    >
                      <svg className="h-5 w-5 mr-2" viewBox="0 0 24 24" fill="currentColor">
                        <path fillRule="evenodd" clipRule="evenodd" d="M12 2C6.477 2 2 6.477 2 12c0 4.42 2.865 8.166 6.839 9.489.5.092.682-.217.682-.482 0-.237-.008-.866-.013-1.7-2.782.603-3.369-1.342-3.369-1.342-.454-1.155-1.11-1.462-1.11-1.462-.908-.62.069-.608.069-.608 1.003.07 1.531 1.03 1.531 1.03.892 1.529 2.341 1.087 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.11-4.555-4.943 0-1.091.39-1.984 1.029-2.683-.103-.253-.446-1.27.098-2.647 0 0 .84-.269 2.75 1.025A9.578 9.578 0 0112 6.836c.85.004 1.705.114 2.504.336 1.909-1.294 2.747-1.025 2.747-1.025.546 1.377.202 2.394.1 2.647.64.699 1.028 1.592 1.028 2.683 0 3.842-2.339 4.687-4.566 4.935.359.309.678.919.678 1.852 0 1.336-.012 2.415-.012 2.743 0 .267.18.578.688.48C19.138 20.161 22 16.416 22 12c0-5.523-4.477-10-10-10z"/>
                      </svg>
                      GitHub
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="register">
            <Card className="bg-slate-800 border-slate-700 text-white">
              <CardHeader>
                <CardTitle>Create an Account</CardTitle>
                <CardDescription className="text-slate-300">
                  Register to access AWS DevOps study materials
                </CardDescription>
              </CardHeader>
              <CardContent>
                {registerError && (
                  <Alert variant="destructive" className="mb-4 bg-red-900/30 border-red-800 text-red-200">
                    <AlertCircle className="h-4 w-4" />
                    <AlertDescription>{registerError}</AlertDescription>
                  </Alert>
                )}
                
                {registerSuccess && (
                  <Alert className="mb-4 bg-green-900/30 border-green-800 text-green-200">
                    <AlertDescription>{registerSuccess}</AlertDescription>
                  </Alert>
                )}
                
                <form onSubmit={handleRegister} className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="name" className="text-white">Full Name</Label>
                    <Input
                      id="name"
                      placeholder="John Doe"
                      value={registerName}
                      onChange={(e) => setRegisterName(e.target.value)}
                      className={`bg-slate-700 border-slate-600 text-white ${
                        registerErrors.name ? 'border-red-500' : ''
                      }`}
                    />
                    {registerErrors.name && (
                      <p className="text-red-400 text-sm mt-1">{registerErrors.name}</p>
                    )}
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="register-email" className="text-white">Email</Label>
                    <Input
                      id="register-email"
                      type="email"
                      placeholder="you@example.com"
                      value={registerEmail}
                      onChange={(e) => setRegisterEmail(e.target.value)}
                      className={`bg-slate-700 border-slate-600 text-white ${
                        registerErrors.email ? 'border-red-500' : ''
                      }`}
                    />
                    {registerErrors.email && (
                      <p className="text-red-400 text-sm mt-1">{registerErrors.email}</p>
                    )}
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="register-password" className="text-white">Password</Label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                        <Lock className="h-4 w-4 text-slate-400" />
                      </div>
                      <Input
                        id="register-password"
                        type={showRegisterPassword ? "text" : "password"}
                        placeholder="••••••••"
                        value={registerPassword}
                        onChange={(e) => setRegisterPassword(e.target.value)}
                        className={`bg-slate-700 border-slate-600 text-white pl-10 pr-10 ${
                          registerErrors.password ? 'border-red-500' : ''
                        }`}
                      />
                      <button
                        type="button"
                        onClick={() => setShowRegisterPassword(!showRegisterPassword)}
                        className="absolute inset-y-0 right-0 flex items-center pr-3 text-slate-400 hover:text-slate-300 focus:outline-none"
                        tabIndex={-1}
                        aria-label={showRegisterPassword ? "Hide password" : "Show password"}
                      >
                        {showRegisterPassword ? (
                          <EyeOff className="h-4 w-4" />
                        ) : (
                          <Eye className="h-4 w-4" />
                        )}
                      </button>
                    </div>
                    {registerErrors.password && (
                      <p className="text-red-400 text-sm mt-1">{registerErrors.password}</p>
                    )}
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="confirm-password" className="text-white">Confirm Password</Label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                        <Lock className="h-4 w-4 text-slate-400" />
                      </div>
                      <Input
                        id="confirm-password"
                        type={showConfirmPassword ? "text" : "password"}
                        placeholder="••••••••"
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        className={`bg-slate-700 border-slate-600 text-white pl-10 pr-10 ${
                          registerErrors.confirmPassword ? 'border-red-500' : ''
                        }`}
                      />
                      <button
                        type="button"
                        onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                        className="absolute inset-y-0 right-0 flex items-center pr-3 text-slate-400 hover:text-slate-300 focus:outline-none"
                        tabIndex={-1}
                        aria-label={showConfirmPassword ? "Hide password" : "Show password"}
                      >
                        {showConfirmPassword ? (
                          <EyeOff className="h-4 w-4" />
                        ) : (
                          <Eye className="h-4 w-4" />
                        )}
                      </button>
                    </div>
                    {registerErrors.confirmPassword && (
                      <p className="text-red-400 text-sm mt-1">{registerErrors.confirmPassword}</p>
                    )}
                  </div>
                  
                  <Button 
                    type="submit" 
                    className="w-full bg-blue-600 hover:bg-blue-700"
                    disabled={registerIsLoading}
                  >
                    {registerIsLoading ? (
                      <>
                        <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                        Creating account...
                      </>
                    ) : (
                      <>
                        <UserPlus className="mr-2 h-4 w-4" />
                        Create Account
                      </>
                    )}
                  </Button>
                </form>
              </CardContent>
              <CardFooter className="text-center text-sm text-slate-400">
                <p>
                  By registering, you agree to our{' '}
                  <Link href="/privacy-policy" className="text-blue-400 hover:text-blue-300">
                    Privacy Policy
                  </Link>
                </p>
              </CardFooter>
            </Card>
          </TabsContent>
          
          <TabsContent value="forgot-password">
            <Card className="bg-slate-800 border-slate-700 text-white">
              <CardHeader>
                <CardTitle>Forgot Password</CardTitle>
                <CardDescription className="text-slate-300">
                  Enter your email to receive a password reset link
                </CardDescription>
              </CardHeader>
              <CardContent>
                {forgotPasswordError && (
                  <Alert variant="destructive" className="mb-4 bg-red-900/30 border-red-800 text-red-200">
                    <AlertCircle className="h-4 w-4" />
                    <AlertDescription>{forgotPasswordError}</AlertDescription>
                  </Alert>
                )}
                
                {forgotPasswordSuccess && (
                  <Alert className="mb-4 bg-green-900/30 border-green-800 text-green-200">
                    <AlertDescription>{forgotPasswordSuccess}</AlertDescription>
                  </Alert>
                )}
                
                <form onSubmit={handleForgotPassword} className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="forgot-password-email" className="text-white">Email</Label>
                    <Input
                      id="forgot-password-email"
                      type="email"
                      placeholder="you@example.com"
                      value={forgotPasswordEmail}
                      onChange={(e) => setForgotPasswordEmail(e.target.value)}
                      className="bg-slate-700 border-slate-600 text-white"
                    />
                  </div>
                  
                  <Button 
                    type="submit" 
                    className="w-full bg-blue-600 hover:bg-blue-700"
                    disabled={forgotPasswordIsLoading}
                  >
                    {forgotPasswordIsLoading ? (
                      <>
                        <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                        Sending reset link...
                      </>
                    ) : (
                      'Send Reset Link'
                    )}
                  </Button>
                  
                  <Button
                    type="button"
                    variant="outline"
                    className="w-full border-slate-600 text-white hover:bg-slate-700 mt-2"
                    onClick={() => setActiveTab('login')}
                  >
                    Back to Login
                  </Button>
                </form>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
