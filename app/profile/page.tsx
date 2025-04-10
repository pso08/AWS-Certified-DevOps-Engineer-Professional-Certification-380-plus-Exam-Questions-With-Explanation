'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Separator } from '@/components/ui/separator';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { AlertCircle, Check, User, Mail, Key, Shield, LogOut } from 'lucide-react';
import { z } from 'zod';

// Form validation schemas
const profileSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters'),
  email: z.string().email('Please enter a valid email address'),
});

const passwordSchema = z.object({
  currentPassword: z.string().min(1, 'Current password is required'),
  newPassword: z.string().min(6, 'New password must be at least 6 characters'),
  confirmPassword: z.string(),
}).refine(data => data.newPassword === data.confirmPassword, {
  message: "Passwords don't match",
  path: ['confirmPassword'],
});

export default function ProfilePage() {
  const router = useRouter();
  
  // User state
  const [user, setUser] = useState<{
    id: string;
    name: string;
    email: string;
    isAdmin: boolean;
    hasPaid: boolean;
  } | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  
  // Profile update state
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [profileErrors, setProfileErrors] = useState<Record<string, string>>({});
  const [profileIsLoading, setProfileIsLoading] = useState(false);
  const [profileError, setProfileError] = useState('');
  const [profileSuccess, setProfileSuccess] = useState('');
  
  // Password update state
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [passwordErrors, setPasswordErrors] = useState<Record<string, string>>({});
  const [passwordIsLoading, setPasswordIsLoading] = useState(false);
  const [passwordError, setPasswordError] = useState('');
  const [passwordSuccess, setPasswordSuccess] = useState('');
  
  // Load user data
  useEffect(() => {
    const loadUserData = () => {
      // In a real application, this would be a fetch request to get user data
      // For this mock implementation, we'll use localStorage
      if (typeof window !== 'undefined') {
        const session = JSON.parse(localStorage.getItem('user_session') || '{}');
        if (!session.isLoggedIn) {
          router.push('/auth/login');
          return;
        }
        
        setUser({
          id: session.userId || '1',
          name: session.name || 'User',
          email: session.email || 'user@example.com',
          isAdmin: session.isAdmin || false,
          hasPaid: session.hasPaid || false,
        });
        
        setName(session.name || 'User');
        setEmail(session.email || 'user@example.com');
        setIsLoading(false);
      }
    };
    
    loadUserData();
  }, [router]);
  
  // Handle profile update
  const handleProfileUpdate = async (e: React.FormEvent) => {
    e.preventDefault();
    setProfileError('');
    setProfileSuccess('');
    setProfileErrors({});
    setProfileIsLoading(true);
    
    try {
      // Validate form
      const result = profileSchema.safeParse({
        name,
        email,
      });
      
      if (!result.success) {
        const formattedErrors: Record<string, string> = {};
        result.error.errors.forEach(error => {
          formattedErrors[error.path[0]] = error.message;
        });
        setProfileErrors(formattedErrors);
        setProfileIsLoading(false);
        return;
      }
      
      // In a real application, this would be a fetch request to update user data
      // For this mock implementation, we'll update localStorage
      if (typeof window !== 'undefined' && user) {
        const session = JSON.parse(localStorage.getItem('user_session') || '{}');
        session.name = name;
        session.email = email;
        localStorage.setItem('user_session', JSON.stringify(session));
        
        setUser({
          ...user,
          name,
          email,
        });
        
        setProfileSuccess('Profile updated successfully');
      }
    } catch (error) {
      console.error('Profile update error:', error);
      setProfileError('An error occurred while updating your profile');
    } finally {
      setProfileIsLoading(false);
    }
  };
  
  // Handle password update
  const handlePasswordUpdate = async (e: React.FormEvent) => {
    e.preventDefault();
    setPasswordError('');
    setPasswordSuccess('');
    setPasswordErrors({});
    setPasswordIsLoading(true);
    
    try {
      // Validate form
      const result = passwordSchema.safeParse({
        currentPassword,
        newPassword,
        confirmPassword,
      });
      
      if (!result.success) {
        const formattedErrors: Record<string, string> = {};
        result.error.errors.forEach(error => {
          formattedErrors[error.path[0]] = error.message;
        });
        setPasswordErrors(formattedErrors);
        setPasswordIsLoading(false);
        return;
      }
      
      // In a real application, this would be a fetch request to update password
      // For this mock implementation, we'll simulate a successful update
      
      // Simulate password verification
      if (currentPassword !== 'admin') {
        setPasswordError('Current password is incorrect');
        setPasswordIsLoading(false);
        return;
      }
      
      setPasswordSuccess('Password updated successfully');
      
      // Reset form
      setCurrentPassword('');
      setNewPassword('');
      setConfirmPassword('');
    } catch (error) {
      console.error('Password update error:', error);
      setPasswordError('An error occurred while updating your password');
    } finally {
      setPasswordIsLoading(false);
    }
  };
  
  // Handle logout
  const handleLogout = () => {
    if (typeof window !== 'undefined') {
      localStorage.removeItem('user_session');
      router.push('/auth/login');
    }
  };
  
  if (isLoading) {
    return (
      <div className="min-h-screen bg-slate-900 text-white flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-white"></div>
      </div>
    );
  }
  
  return (
    <div className="min-h-screen bg-slate-900 text-white">
      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col md:flex-row gap-8">
          {/* Sidebar */}
          <div className="w-full md:w-64 space-y-4">
            <div className="bg-slate-800 rounded-lg p-6 flex flex-col items-center">
              <Avatar className="h-24 w-24 mb-4">
                <AvatarImage src={`https://api.dicebear.com/7.x/initials/svg?seed=${user?.name}`} alt={user?.name} />
                <AvatarFallback>{user?.name.charAt(0)}</AvatarFallback>
              </Avatar>
              <h2 className="text-xl font-bold">{user?.name}</h2>
              <p className="text-slate-400 text-sm">{user?.email}</p>
              {user?.isAdmin && (
                <div className="mt-2 bg-amber-900/30 text-amber-400 px-2 py-1 rounded text-xs flex items-center">
                  <Shield className="h-3 w-3 mr-1" />
                  Admin
                </div>
              )}
              {user?.hasPaid && (
                <div className="mt-2 bg-green-900/30 text-green-400 px-2 py-1 rounded text-xs flex items-center">
                  <Check className="h-3 w-3 mr-1" />
                  Premium
                </div>
              )}
            </div>
            
            <div className="bg-slate-800 rounded-lg p-4 space-y-2">
              <Link href="/protected" className="block p-2 hover:bg-slate-700 rounded-lg">
                Dashboard
              </Link>
              <Link href="/profile" className="block p-2 bg-slate-700 rounded-lg">
                Profile Settings
              </Link>
              <Link href="/profile/progress" className="block p-2 hover:bg-slate-700 rounded-lg">
                Progress Tracking
              </Link>
              {user?.isAdmin && (
                <Link href="/admin/dashboard" className="block p-2 hover:bg-slate-700 rounded-lg">
                  Admin Dashboard
                </Link>
              )}
              <button
                onClick={handleLogout}
                className="w-full text-left p-2 hover:bg-slate-700 rounded-lg text-red-400"
              >
                Logout
              </button>
            </div>
          </div>
          
          {/* Main content */}
          <div className="flex-1">
            <h1 className="text-3xl font-bold mb-6">Profile Settings</h1>
            
            <Tabs defaultValue="profile" className="w-full">
              <TabsList className="bg-slate-800 mb-6">
                <TabsTrigger value="profile" className="data-[state=active]:bg-slate-700">
                  <User className="h-4 w-4 mr-2" />
                  Profile Information
                </TabsTrigger>
                <TabsTrigger value="password" className="data-[state=active]:bg-slate-700">
                  <Key className="h-4 w-4 mr-2" />
                  Change Password
                </TabsTrigger>
              </TabsList>
              
              <TabsContent value="profile">
                <Card className="bg-slate-800 border-slate-700 text-white">
                  <CardHeader>
                    <CardTitle>Profile Information</CardTitle>
                    <CardDescription className="text-slate-300">
                      Update your account profile information
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    {profileError && (
                      <Alert variant="destructive" className="mb-4 bg-red-900/30 border-red-800 text-red-200">
                        <AlertCircle className="h-4 w-4" />
                        <AlertDescription>{profileError}</AlertDescription>
                      </Alert>
                    )}
                    
                    {profileSuccess && (
                      <Alert className="mb-4 bg-green-900/30 border-green-800 text-green-200">
                        <Check className="h-4 w-4" />
                        <AlertDescription>{profileSuccess}</AlertDescription>
                      </Alert>
                    )}
                    
                    <form onSubmit={handleProfileUpdate} className="space-y-4">
                      <div className="space-y-2">
                        <Label htmlFor="name" className="text-white">Full Name</Label>
                        <div className="relative">
                          <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                            <User className="h-4 w-4 text-slate-400" />
                          </div>
                          <Input
                            id="name"
                            placeholder="John Doe"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            className={`bg-slate-700 border-slate-600 text-white pl-10 ${
                              profileErrors.name ? 'border-red-500' : ''
                            }`}
                          />
                        </div>
                        {profileErrors.name && (
                          <p className="text-red-400 text-sm mt-1">{profileErrors.name}</p>
                        )}
                      </div>
                      
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
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className={`bg-slate-700 border-slate-600 text-white pl-10 ${
                              profileErrors.email ? 'border-red-500' : ''
                            }`}
                          />
                        </div>
                        {profileErrors.email && (
                          <p className="text-red-400 text-sm mt-1">{profileErrors.email}</p>
                        )}
                      </div>
                      
                      <Button 
                        type="submit" 
                        className="bg-blue-600 hover:bg-blue-700"
                        disabled={profileIsLoading}
                      >
                        {profileIsLoading ? (
                          <>
                            <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                            Updating profile...
                          </>
                        ) : (
                          'Update Profile'
                        )}
                      </Button>
                    </form>
                  </CardContent>
                </Card>
              </TabsContent>
              
              <TabsContent value="password">
                <Card className="bg-slate-800 border-slate-700 text-white">
                  <CardHeader>
                    <CardTitle>Change Password</CardTitle>
                    <CardDescription className="text-slate-300">
                      Update your account password
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    {passwordError && (
                      <Alert variant="destructive" className="mb-4 bg-red-900/30 border-red-800 text-red-200">
                        <AlertCircle className="h-4 w-4" />
                        <AlertDescription>{passwordError}</AlertDescription>
                      </Alert>
                    )}
                    
                    {passwordSuccess && (
                      <Alert className="mb-4 bg-green-900/30 border-green-800 text-green-200">
                        <Check className="h-4 w-4" />
                        <AlertDescription>{passwordSuccess}</AlertDescription>
                      </Alert>
                    )}
                    
                    <form onSubmit={handlePasswordUpdate} className="space-y-4">
                      <div className="space-y-2">
                        <Label htmlFor="current-password" className="text-white">Current Password</Label>
                        <div className="relative">
                          <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                            <Key className="h-4 w-4 text-slate-400" />
                          </div>
                          <Input
                            id="current-password"
                            type="password"
                            placeholder="••••••••"
                            value={currentPassword}
                            onChange={(e) => setCurrentPassword(e.target.value)}
                            className={`bg-slate-700 border-slate-600 text-white pl-10 ${
                              passwordErrors.currentPassword ? 'border-red-500' : ''
                            }`}
                          />
                        </div>
                        {passwordErrors.currentPassword && (
                          <p className="text-red-400 text-sm mt-1">{passwordErrors.currentPassword}</p>
                        )}
                      </div>
                      
                      <div className="space-y-2">
                        <Label htmlFor="new-password" className="text-white">New Password</Label>
                        <Input
                          id="new-password"
                          type="password"
                          placeholder="••••••••"
                          value={newPassword}
                          onChange={(e) => setNewPassword(e.target.value)}
                          className={`bg-slate-700 border-slate-600 text-white ${
                            passwordErrors.newPassword ? 'border-red-500' : ''
                          }`}
                        />
                        {passwordErrors.newPassword && (
                          <p className="text-red-400 text-sm mt-1">{passwordErrors.newPassword}</p>
                        )}
                      </div>
                      
                      <div className="space-y-2">
                        <Label htmlFor="confirm-password" className="text-white">Confirm New Password</Label>
                        <Input
                          id="confirm-password"
                          type="password"
                          placeholder="••••••••"
                          value={confirmPassword}
                          onChange={(e) => setConfirmPassword(e.target.value)}
                          className={`bg-slate-700 border-slate-600 text-white ${
                            passwordErrors.confirmPassword ? 'border-red-500' : ''
                          }`}
                        />
                        {passwordErrors.confirmPassword && (
                          <p className="text-red-400 text-sm mt-1">{passwordErrors.confirmPassword}</p>
                        )}
                      </div>
                      
                      <Button 
                        type="submit" 
                        className="bg-blue-600 hover:bg-blue-700"
                        disabled={passwordIsLoading}
                      >
                        {passwordIsLoading ? (
                          <>
                            <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                            Updating password...
                          </>
                        ) : (
                          'Update Password'
                        )}
                      </Button>
                    </form>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
            
            <div className="mt-8">
              <h2 className="text-xl font-bold mb-4">Danger Zone</h2>
              <Card className="bg-slate-800 border-red-800 text-white">
                <CardHeader>
                  <CardTitle className="text-red-400">Delete Account</CardTitle>
                  <CardDescription className="text-slate-300">
                    Permanently delete your account and all associated data
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-slate-400 mb-4">
                    Once you delete your account, there is no going back. Please be certain.
                  </p>
                  <Button 
                    variant="destructive" 
                    className="bg-red-600 hover:bg-red-700"
                    onClick={() => alert('This feature would delete your account in a real application.')}
                  >
                    Delete Account
                  </Button>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
