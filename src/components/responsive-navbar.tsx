'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useTheme } from 'next-themes';
import { ThemeToggle } from '@/components/theme-toggle';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { 
  Menu, 
  Search, 
  Home, 
  BookOpen, 
  FileText, 
  BarChart, 
  Download, 
  User, 
  LogOut,
  Shield
} from 'lucide-react';
import { 
  Sheet, 
  SheetContent, 
  SheetHeader, 
  SheetTitle, 
  SheetTrigger 
} from '@/components/ui/sheet';

export function ResponsiveNavbar() {
  const [mounted, setMounted] = useState(false);
  const { theme } = useTheme();
  const [user, setUser] = useState<{
    name: string;
    email: string;
    isAdmin: boolean;
    hasPaid: boolean;
  } | null>(null);

  // Ensure component is mounted before accessing theme and localStorage
  useEffect(() => {
    setMounted(true);
    
    // Get user from localStorage
    if (typeof window !== 'undefined') {
      const session = JSON.parse(localStorage.getItem('user_session') || '{}');
      if (session.isLoggedIn) {
        setUser({
          name: session.name || 'User',
          email: session.email || 'user@example.com',
          isAdmin: session.isAdmin || false,
          hasPaid: session.hasPaid || false,
        });
      }
    }
  }, []);

  if (!mounted) {
    return null;
  }

  const isDark = theme === 'dark';
  const bgColor = isDark ? 'bg-slate-900' : 'bg-white';
  const textColor = isDark ? 'text-white' : 'text-slate-900';
  const borderColor = isDark ? 'border-slate-700' : 'border-slate-200';
  const navBgColor = isDark ? 'bg-slate-800' : 'bg-slate-50';

  return (
    <header className={`sticky top-0 z-50 w-full ${navBgColor} ${borderColor} border-b`}>
      <div className="container mx-auto px-4 flex h-16 items-center justify-between">
        <div className="flex items-center">
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" className="md:hidden">
                <Menu className={`h-6 w-6 ${textColor}`} />
                <span className="sr-only">Toggle menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="left" className={`${bgColor} ${textColor}`}>
              <SheetHeader>
                <SheetTitle className={textColor}>Menu</SheetTitle>
              </SheetHeader>
              <nav className="mt-6 flex flex-col gap-4">
                <Link href="/protected" className="flex items-center gap-2 py-2">
                  <Home className="h-5 w-5" />
                  Home
                </Link>
                <Link href="/flashcards" className="flex items-center gap-2 py-2">
                  <BookOpen className="h-5 w-5" />
                  Flashcards
                </Link>
                <Link href="/quiz" className="flex items-center gap-2 py-2">
                  <FileText className="h-5 w-5" />
                  Practice Quiz
                </Link>
                <Link href="/test" className="flex items-center gap-2 py-2">
                  <BarChart className="h-5 w-5" />
                  Test
                </Link>
                <Link href="/download" className="flex items-center gap-2 py-2">
                  <Download className="h-5 w-5" />
                  Download Resources
                </Link>
                <Link href="/profile" className="flex items-center gap-2 py-2">
                  <User className="h-5 w-5" />
                  Profile
                </Link>
                {user?.isAdmin && (
                  <Link href="/admin/dashboard" className="flex items-center gap-2 py-2">
                    <Shield className="h-5 w-5" />
                    Admin Dashboard
                  </Link>
                )}
                <button 
                  onClick={() => {
                    localStorage.removeItem('user_session');
                    window.location.href = '/auth/login';
                  }}
                  className="flex items-center gap-2 py-2 text-red-500"
                >
                  <LogOut className="h-5 w-5" />
                  Logout
                </button>
              </nav>
            </SheetContent>
          </Sheet>
          
          <Link href="/protected" className="flex items-center gap-2">
            <span className={`text-xl font-bold ${textColor}`}>AWS DevOps Quiz</span>
          </Link>
        </div>
        
        <nav className="hidden md:flex items-center gap-6">
          <Link href="/protected" className={`text-sm font-medium ${textColor} hover:opacity-80`}>
            Home
          </Link>
          <Link href="/flashcards" className={`text-sm font-medium ${textColor} hover:opacity-80`}>
            Flashcards
          </Link>
          <Link href="/quiz" className={`text-sm font-medium ${textColor} hover:opacity-80`}>
            Practice Quiz
          </Link>
          <Link href="/test" className={`text-sm font-medium ${textColor} hover:opacity-80`}>
            Test
          </Link>
          <Link href="/download" className={`text-sm font-medium ${textColor} hover:opacity-80`}>
            Download Resources
          </Link>
        </nav>
        
        <div className="flex items-center gap-4">
          <ThemeToggle />
          
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" className="rounded-full">
                <Avatar className="h-8 w-8">
                  <AvatarImage 
                    src={user?.name ? `https://api.dicebear.com/7.x/initials/svg?seed=${user.name}` : undefined} 
                    alt={user?.name || "User"} 
                  />
                  <AvatarFallback>{user?.name?.charAt(0) || "U"}</AvatarFallback>
                </Avatar>
              </Button>
            </SheetTrigger>
            <SheetContent className={`${bgColor} ${textColor}`}>
              <div className="flex flex-col items-center justify-center py-6">
                <Avatar className="h-24 w-24 mb-4">
                  <AvatarImage 
                    src={user?.name ? `https://api.dicebear.com/7.x/initials/svg?seed=${user.name}` : undefined} 
                    alt={user?.name || "User"} 
                  />
                  <AvatarFallback>{user?.name?.charAt(0) || "U"}</AvatarFallback>
                </Avatar>
                <h2 className="text-xl font-bold">{user?.name || "User"}</h2>
                <p className="text-sm opacity-70">{user?.email || "user@example.com"}</p>
                
                {user?.isAdmin && (
                  <div className="mt-2 bg-amber-500/10 text-amber-500 px-2 py-1 rounded text-xs flex items-center">
                    <Shield className="h-3 w-3 mr-1" />
                    Admin
                  </div>
                )}
              </div>
              
              <nav className="mt-6 flex flex-col gap-2">
                <Link href="/profile" className="flex items-center gap-2 py-2">
                  <User className="h-5 w-5" />
                  Profile Settings
                </Link>
                <Link href="/profile/progress" className="flex items-center gap-2 py-2">
                  <BarChart className="h-5 w-5" />
                  Progress Tracking
                </Link>
                {user?.isAdmin && (
                  <Link href="/admin/dashboard" className="flex items-center gap-2 py-2">
                    <Shield className="h-5 w-5" />
                    Admin Dashboard
                  </Link>
                )}
                <button 
                  onClick={() => {
                    localStorage.removeItem('user_session');
                    window.location.href = '/auth/login';
                  }}
                  className="flex items-center gap-2 py-2 text-red-500"
                >
                  <LogOut className="h-5 w-5" />
                  Logout
                </button>
              </nav>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}
