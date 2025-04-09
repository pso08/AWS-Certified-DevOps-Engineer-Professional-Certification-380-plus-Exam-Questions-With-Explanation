'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { 
  Users, 
  CreditCard, 
  Tag, 
  Home, 
  LogOut, 
  UserPlus, 
  Download, 
  Settings,
  BarChart
} from 'lucide-react';

export default function AdminDashboard() {
  const router = useRouter();
  const [isAdmin, setIsAdmin] = useState(false);
  const [loading, setLoading] = useState(true);
  const [users, setUsers] = useState<any[]>([]);
  const [newUserEmail, setNewUserEmail] = useState('');
  const [newUserName, setNewUserName] = useState('');
  const [newUserPassword, setNewUserPassword] = useState('');
  const [couponCode, setCouponCode] = useState('');
  const [couponDiscount, setCouponDiscount] = useState('');
  
  // Check if user is admin
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const session = JSON.parse(localStorage.getItem('user_session') || '{}');
      if (!session.isLoggedIn || !session.isAdmin) {
        router.push('/auth/login');
      } else {
        setIsAdmin(true);
        
        // Load registered users
        const registeredUsers = JSON.parse(localStorage.getItem('registered_users') || '[]');
        setUsers(registeredUsers);
      }
      setLoading(false);
    }
  }, [router]);
  
  const handleLogout = () => {
    if (typeof window !== 'undefined') {
      localStorage.removeItem('user_session');
      router.push('/auth/login');
    }
  };
  
  const handleCreateFreeUser = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (typeof window !== 'undefined') {
      const registeredUsers = JSON.parse(localStorage.getItem('registered_users') || '[]');
      
      // Check if email already exists
      if (registeredUsers.some((u: any) => u.email === newUserEmail)) {
        alert('Email already registered');
        return;
      }
      
      // Add new user with hasPaid set to true
      registeredUsers.push({
        name: newUserName,
        email: newUserEmail,
        password: newUserPassword,
        createdAt: new Date().toISOString(),
        hasPaid: true,
        createdByAdmin: true
      });
      
      localStorage.setItem('registered_users', JSON.stringify(registeredUsers));
      setUsers(registeredUsers);
      
      // Reset form
      setNewUserEmail('');
      setNewUserName('');
      setNewUserPassword('');
      
      alert('Free user account created successfully');
    }
  };
  
  const handleCreateCoupon = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (typeof window !== 'undefined') {
      const coupons = JSON.parse(localStorage.getItem('discount_coupons') || '[]');
      
      // Check if coupon code already exists
      if (coupons.some((c: any) => c.code === couponCode)) {
        alert('Coupon code already exists');
        return;
      }
      
      // Add new coupon
      coupons.push({
        code: couponCode,
        discount: parseInt(couponDiscount, 10),
        createdAt: new Date().toISOString(),
        active: true
      });
      
      localStorage.setItem('discount_coupons', JSON.stringify(coupons));
      
      // Reset form
      setCouponCode('');
      setCouponDiscount('');
      
      alert('Discount coupon created successfully');
    }
  };
  
  if (loading) {
    return (
      <div className="min-h-screen bg-slate-900 text-white flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-white"></div>
      </div>
    );
  }
  
  if (!isAdmin) {
    return null; // Router will redirect, this prevents flash of content
  }
  
  return (
    <div className="min-h-screen bg-slate-900 text-white">
      <div className="flex">
        {/* Sidebar */}
        <div className="w-64 bg-slate-800 min-h-screen p-4 hidden md:block">
          <div className="mb-8">
            <h2 className="text-xl font-bold">Admin Dashboard</h2>
            <p className="text-slate-400 text-sm">Manage your application</p>
          </div>
          
          <nav className="space-y-2">
            <Link href="/admin/dashboard" className="flex items-center p-3 bg-slate-700 rounded-lg">
              <BarChart className="mr-3 h-5 w-5 text-blue-400" />
              <span>Dashboard</span>
            </Link>
            <Link href="/" className="flex items-center p-3 hover:bg-slate-700 rounded-lg">
              <Home className="mr-3 h-5 w-5 text-slate-400" />
              <span>View Site</span>
            </Link>
            <Link href="/admin/users" className="flex items-center p-3 hover:bg-slate-700 rounded-lg">
              <Users className="mr-3 h-5 w-5 text-slate-400" />
              <span>Users</span>
            </Link>
            <Link href="/admin/payments" className="flex items-center p-3 hover:bg-slate-700 rounded-lg">
              <CreditCard className="mr-3 h-5 w-5 text-slate-400" />
              <span>Payments</span>
            </Link>
            <Link href="/admin/resources" className="flex items-center p-3 hover:bg-slate-700 rounded-lg">
              <Download className="mr-3 h-5 w-5 text-slate-400" />
              <span>Resources</span>
            </Link>
            <Link href="/admin/settings" className="flex items-center p-3 hover:bg-slate-700 rounded-lg">
              <Settings className="mr-3 h-5 w-5 text-slate-400" />
              <span>Settings</span>
            </Link>
            <button 
              onClick={handleLogout}
              className="flex items-center p-3 hover:bg-slate-700 rounded-lg w-full text-left"
            >
              <LogOut className="mr-3 h-5 w-5 text-red-400" />
              <span>Logout</span>
            </button>
          </nav>
        </div>
        
        {/* Main content */}
        <div className="flex-1 p-6">
          <div className="flex justify-between items-center mb-8">
            <h1 className="text-3xl font-bold">Admin Dashboard</h1>
            <div className="flex items-center gap-4">
              <Link href="/">
                <Button variant="outline" className="border-slate-600 text-white hover:bg-slate-700">
                  <Home className="mr-2 h-4 w-4" />
                  View Site
                </Button>
              </Link>
              <Button 
                variant="outline" 
                className="border-slate-600 text-white hover:bg-slate-700"
                onClick={handleLogout}
              >
                <LogOut className="mr-2 h-4 w-4" />
                Logout
              </Button>
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <Card className="bg-slate-800 border-slate-700 text-white">
              <CardHeader className="pb-2">
                <CardTitle className="text-lg">Total Users</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-4xl font-bold">{users.length}</div>
              </CardContent>
            </Card>
            
            <Card className="bg-slate-800 border-slate-700 text-white">
              <CardHeader className="pb-2">
                <CardTitle className="text-lg">Paid Users</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-4xl font-bold">
                  {users.filter(u => u.hasPaid).length}
                </div>
              </CardContent>
            </Card>
            
            <Card className="bg-slate-800 border-slate-700 text-white">
              <CardHeader className="pb-2">
                <CardTitle className="text-lg">Free Users</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-4xl font-bold">
                  {users.filter(u => u.createdByAdmin).length}
                </div>
              </CardContent>
            </Card>
          </div>
          
          <Tabs defaultValue="users" className="w-full">
            <TabsList className="bg-slate-800 mb-6">
              <TabsTrigger value="users" className="data-[state=active]:bg-slate-700">
                <UserPlus className="h-4 w-4 mr-2" />
                Create Free User
              </TabsTrigger>
              <TabsTrigger value="coupons" className="data-[state=active]:bg-slate-700">
                <Tag className="h-4 w-4 mr-2" />
                Create Coupon
              </TabsTrigger>
            </TabsList>
            
            <TabsContent value="users">
              <Card className="bg-slate-800 border-slate-700 text-white">
                <CardHeader>
                  <CardTitle>Create Free User Account</CardTitle>
                  <CardDescription className="text-slate-300">
                    Create accounts for users who qualify to use the app for free
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <form onSubmit={handleCreateFreeUser} className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="user-name" className="text-white">Full Name</Label>
                      <Input
                        id="user-name"
                        placeholder="John Doe"
                        value={newUserName}
                        onChange={(e) => setNewUserName(e.target.value)}
                        required
                        className="bg-slate-700 border-slate-600 text-white"
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="user-email" className="text-white">Email</Label>
                      <Input
                        id="user-email"
                        type="email"
                        placeholder="john@example.com"
                        value={newUserEmail}
                        onChange={(e) => setNewUserEmail(e.target.value)}
                        required
                        className="bg-slate-700 border-slate-600 text-white"
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="user-password" className="text-white">Password</Label>
                      <Input
                        id="user-password"
                        type="password"
                        placeholder="••••••••"
                        value={newUserPassword}
                        onChange={(e) => setNewUserPassword(e.target.value)}
                        required
                        className="bg-slate-700 border-slate-600 text-white"
                      />
                    </div>
                    
                    <Button 
                      type="submit" 
                      className="bg-blue-600 hover:bg-blue-700"
                    >
                      <UserPlus className="mr-2 h-4 w-4" />
                      Create Free Account
                    </Button>
                  </form>
                </CardContent>
              </Card>
            </TabsContent>
            
            <TabsContent value="coupons">
              <Card className="bg-slate-800 border-slate-700 text-white">
                <CardHeader>
                  <CardTitle>Create Discount Coupon</CardTitle>
                  <CardDescription className="text-slate-300">
                    Create discount coupons for users to reduce the cost of using the app
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <form onSubmit={handleCreateCoupon} className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="coupon-code" className="text-white">Coupon Code</Label>
                      <Input
                        id="coupon-code"
                        placeholder="SUMMER2025"
                        value={couponCode}
                        onChange={(e) => setCouponCode(e.target.value)}
                        required
                        className="bg-slate-700 border-slate-600 text-white"
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="coupon-discount" className="text-white">Discount Percentage</Label>
                      <Input
                        id="coupon-discount"
                        type="number"
                        min="1"
                        max="100"
                        placeholder="25"
                        value={couponDiscount}
                        onChange={(e) => setCouponDiscount(e.target.value)}
                        required
                        className="bg-slate-700 border-slate-600 text-white"
                      />
                    </div>
                    
                    <Button 
                      type="submit" 
                      className="bg-blue-600 hover:bg-blue-700"
                    >
                      <Tag className="mr-2 h-4 w-4" />
                      Create Coupon
                    </Button>
                  </form>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
          
          <div className="mt-8">
            <h2 className="text-xl font-bold mb-4">Recent Users</h2>
            <div className="bg-slate-800 border border-slate-700 rounded-lg overflow-hidden">
              <table className="w-full">
                <thead>
                  <tr className="bg-slate-700">
                    <th className="text-left p-4">Name</th>
                    <th className="text-left p-4">Email</th>
                    <th className="text-left p-4">Status</th>
                    <th className="text-left p-4">Created</th>
                  </tr>
                </thead>
                <tbody>
                  {users.slice(0, 5).map((user, index) => (
                    <tr key={index} className="border-t border-slate-700">
                      <td className="p-4">{user.name}</td>
                      <td className="p-4">{user.email}</td>
                      <td className="p-4">
                        {user.hasPaid ? (
                          <span className="bg-green-900/30 text-green-400 px-2 py-1 rounded text-xs">
                            {user.createdByAdmin ? 'Free Access' : 'Paid'}
                          </span>
                        ) : (
                          <span className="bg-amber-900/30 text-amber-400 px-2 py-1 rounded text-xs">
                            Unpaid
                          </span>
                        )}
                      </td>
                      <td className="p-4 text-slate-400">
                        {new Date(user.createdAt).toLocaleDateString()}
                      </td>
                    </tr>
                  ))}
                  {users.length === 0 && (
                    <tr>
                      <td colSpan={4} className="p-4 text-center text-slate-400">
                        No users registered yet
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
