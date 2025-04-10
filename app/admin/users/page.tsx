'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { 
  BarChart, 
  Users, 
  FileText, 
  Settings, 
  Shield, 
  Search,
  Tag,
  Percent,
  Plus,
  Edit,
  Trash2,
  CheckCircle,
  XCircle,
  Download,
  Filter
} from 'lucide-react';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Alert, AlertDescription } from "@/components/ui/alert";

// Mock users data
const mockUsers = [
  { id: '1', name: 'Admin User', email: 'admin@example.com', role: 'admin', status: 'active', hasPaid: true, createdAt: '2025-01-15', lastLogin: '2025-04-09' },
  { id: '2', name: 'John Doe', email: 'john@example.com', role: 'user', status: 'active', hasPaid: true, createdAt: '2025-02-10', lastLogin: '2025-04-08' },
  { id: '3', name: 'Jane Smith', email: 'jane@example.com', role: 'user', status: 'active', hasPaid: false, createdAt: '2025-02-15', lastLogin: '2025-04-07' },
  { id: '4', name: 'Robert Johnson', email: 'robert@example.com', role: 'user', status: 'inactive', hasPaid: true, createdAt: '2025-03-01', lastLogin: '2025-03-20' },
  { id: '5', name: 'Emily Davis', email: 'emily@example.com', role: 'user', status: 'active', hasPaid: false, createdAt: '2025-03-10', lastLogin: '2025-04-05' },
  { id: '6', name: 'Michael Wilson', email: 'michael@example.com', role: 'user', status: 'active', hasPaid: true, createdAt: '2025-03-15', lastLogin: '2025-04-06' },
  { id: '7', name: 'Sarah Brown', email: 'sarah@example.com', role: 'user', status: 'active', hasPaid: false, createdAt: '2025-03-20', lastLogin: '2025-04-04' },
  { id: '8', name: 'David Miller', email: 'david@example.com', role: 'user', status: 'inactive', hasPaid: false, createdAt: '2025-03-25', lastLogin: '2025-03-30' },
  { id: '9', name: 'Jennifer Taylor', email: 'jennifer@example.com', role: 'user', status: 'active', hasPaid: true, createdAt: '2025-04-01', lastLogin: '2025-04-07' },
  { id: '10', name: 'James Anderson', email: 'james@example.com', role: 'user', status: 'active', hasPaid: false, createdAt: '2025-04-05', lastLogin: '2025-04-08' },
];

export default function UserManagementPage() {
  const router = useRouter();
  
  // Admin user state
  const [user, setUser] = useState<{
    id: string;
    name: string;
    email: string;
    isAdmin: boolean;
  } | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  
  // Users state
  const [users, setUsers] = useState(mockUsers);
  const [filteredUsers, setFilteredUsers] = useState(mockUsers);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [paymentFilter, setPaymentFilter] = useState('all');
  
  // New user state
  const [isNewUserDialogOpen, setIsNewUserDialogOpen] = useState(false);
  const [newUserName, setNewUserName] = useState('');
  const [newUserEmail, setNewUserEmail] = useState('');
  const [newUserPassword, setNewUserPassword] = useState('');
  const [newUserIsAdmin, setNewUserIsAdmin] = useState(false);
  const [newUserHasPaid, setNewUserHasPaid] = useState(false);
  
  // Edit user state
  const [isEditUserDialogOpen, setIsEditUserDialogOpen] = useState(false);
  const [editUserId, setEditUserId] = useState('');
  const [editUserName, setEditUserName] = useState('');
  const [editUserEmail, setEditUserEmail] = useState('');
  const [editUserRole, setEditUserRole] = useState('');
  const [editUserStatus, setEditUserStatus] = useState('');
  const [editUserHasPaid, setEditUserHasPaid] = useState(false);
  
  // Delete user state
  const [isDeleteUserDialogOpen, setIsDeleteUserDialogOpen] = useState(false);
  const [deleteUserId, setDeleteUserId] = useState('');
  const [deleteUserName, setDeleteUserName] = useState('');
  
  // Success/error state
  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  
  // Load admin user data
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
        
        if (!session.isAdmin) {
          router.push('/protected');
          return;
        }
        
        setUser({
          id: session.userId || '1',
          name: session.name || 'Admin',
          email: session.email || 'admin@example.com',
          isAdmin: true,
        });
        
        setIsLoading(false);
      }
    };
    
    loadUserData();
  }, [router]);
  
  // Filter users based on search term and filters
  useEffect(() => {
    let result = users;
    
    // Apply search filter
    if (searchTerm) {
      const term = searchTerm.toLowerCase();
      result = result.filter(user => 
        user.name.toLowerCase().includes(term) || 
        user.email.toLowerCase().includes(term)
      );
    }
    
    // Apply status filter
    if (statusFilter !== 'all') {
      result = result.filter(user => user.status === statusFilter);
    }
    
    // Apply payment filter
    if (paymentFilter !== 'all') {
      result = result.filter(user => 
        (paymentFilter === 'paid' && user.hasPaid) || 
        (paymentFilter === 'unpaid' && !user.hasPaid)
      );
    }
    
    setFilteredUsers(result);
  }, [users, searchTerm, statusFilter, paymentFilter]);
  
  // Handle new user creation
  const handleCreateUser = () => {
    // Validate inputs
    if (!newUserName || !newUserEmail || !newUserPassword) {
      setErrorMessage('Please fill in all required fields');
      return;
    }
    
    // Create new user
    const newUser = {
      id: `${users.length + 1}`,
      name: newUserName,
      email: newUserEmail,
      role: newUserIsAdmin ? 'admin' : 'user',
      status: 'active',
      hasPaid: newUserHasPaid,
      createdAt: new Date().toISOString().split('T')[0],
      lastLogin: '-'
    };
    
    // Add to users list
    setUsers([...users, newUser]);
    
    // Reset form and close dialog
    setNewUserName('');
    setNewUserEmail('');
    setNewUserPassword('');
    setNewUserIsAdmin(false);
    setNewUserHasPaid(false);
    setIsNewUserDialogOpen(false);
    
    // Show success message
    setSuccessMessage('User created successfully');
    setTimeout(() => setSuccessMessage(''), 3000);
  };
  
  // Handle edit user
  const handleEditUser = (userId: string) => {
    const userToEdit = users.find(u => u.id === userId);
    if (userToEdit) {
      setEditUserId(userToEdit.id);
      setEditUserName(userToEdit.name);
      setEditUserEmail(userToEdit.email);
      setEditUserRole(userToEdit.role);
      setEditUserStatus(userToEdit.status);
      setEditUserHasPaid(userToEdit.hasPaid);
      setIsEditUserDialogOpen(true);
    }
  };
  
  // Handle update user
  const handleUpdateUser = () => {
    // Validate inputs
    if (!editUserName || !editUserEmail) {
      setErrorMessage('Please fill in all required fields');
      return;
    }
    
    // Update user
    const updatedUsers = users.map(user => {
      if (user.id === editUserId) {
        return {
          ...user,
          name: editUserName,
          email: editUserEmail,
          role: editUserRole,
          status: editUserStatus,
          hasPaid: editUserHasPaid
        };
      }
      return user;
    });
    
    // Update users list
    setUsers(updatedUsers);
    
    // Reset form and close dialog
    setIsEditUserDialogOpen(false);
    
    // Show success message
    setSuccessMessage('User updated successfully');
    setTimeout(() => setSuccessMessage(''), 3000);
  };
  
  // Handle delete user dialog
  const handleDeleteUserDialog = (userId: string) => {
    const userToDelete = users.find(u => u.id === userId);
    if (userToDelete) {
      setDeleteUserId(userToDelete.id);
      setDeleteUserName(userToDelete.name);
      setIsDeleteUserDialogOpen(true);
    }
  };
  
  // Handle delete user
  const handleDeleteUser = () => {
    // Delete user
    const updatedUsers = users.filter(user => user.id !== deleteUserId);
    
    // Update users list
    setUsers(updatedUsers);
    
    // Reset form and close dialog
    setIsDeleteUserDialogOpen(false);
    
    // Show success message
    setSuccessMessage('User deleted successfully');
    setTimeout(() => setSuccessMessage(''), 3000);
  };
  
  // Handle export users
  const handleExportUsers = () => {
    // In a real application, this would generate a CSV file
    alert('This would export users to a CSV file in a real application');
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
              <div className="mt-2 bg-amber-900/30 text-amber-400 px-2 py-1 rounded text-xs flex items-center">
                <Shield className="h-3 w-3 mr-1" />
                Admin
              </div>
            </div>
            
            <div className="bg-slate-800 rounded-lg p-4 space-y-2">
              <Link href="/admin/dashboard" className="block p-2 hover:bg-slate-700 rounded-lg">
                <BarChart className="h-4 w-4 inline-block mr-2" />
                Dashboard
              </Link>
              <Link href="/admin/users" className="block p-2 bg-slate-700 rounded-lg">
                <Users className="h-4 w-4 inline-block mr-2" />
                User Management
              </Link>
              <Link href="/admin/categories" className="block p-2 hover:bg-slate-700 rounded-lg">
                <Tag className="h-4 w-4 inline-block mr-2" />
                Categories
              </Link>
              <Link href="/admin/content" className="block p-2 hover:bg-slate-700 rounded-lg">
                <FileText className="h-4 w-4 inline-block mr-2" />
                Content Management
              </Link>
              <Link href="/admin/coupons" className="block p-2 hover:bg-slate-700 rounded-lg">
                <Percent className="h-4 w-4 inline-block mr-2" />
                Coupon Management
              </Link>
              <Link href="/admin/settings" className="block p-2 hover:bg-slate-700 rounded-lg">
                <Settings className="h-4 w-4 inline-block mr-2" />
                Settings
              </Link>
              <Link href="/protected" className="block p-2 hover:bg-slate-700 rounded-lg">
                Back to App
              </Link>
            </div>
          </div>
          
          {/* Main content */}
          <div className="flex-1">
            <div className="flex justify-between items-center mb-6">
              <h1 className="text-3xl font-bold">User Management</h1>
              <div className="flex gap-2">
                <Button 
                  className="bg-blue-600 hover:bg-blue-700"
                  onClick={() => setIsNewUserDialogOpen(true)}
                >
                  <Plus className="h-4 w-4 mr-2" />
                  New User
                </Button>
                <Button 
                  variant="outline" 
                  className="border-slate-600 text-white hover:bg-slate-700"
                  onClick={handleExportUsers}
                >
                  <Download className="h-4 w-4 mr-2" />
                  Export
                </Button>
              </div>
            </div>
            
            {/* Success/Error Messages */}
            {successMessage && (
              <Alert className="mb-4 bg-green-900/30 border-green-800 text-green-200">
                <CheckCircle className="h-4 w-4 mr-2" />
                <AlertDescription>{successMessage}</AlertDescription>
              </Alert>
            )}
            
            {errorMessage && (
              <Alert className="mb-4 bg-red-900/30 border-red-800 text-red-200">
                <XCircle className="h-4 w-4 mr-2" />
                <AlertDescription>{errorMessage}</AlertDescription>
              </Alert>
            )}
            
            {/* Filters */}
            <Card className="bg-slate-800 border-slate-700 text-white mb-6">
              <CardContent className="p-4">
                <div className="flex flex-col md:flex-row gap-4">
                  <div className="flex-1 relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 h-4 w-4" />
                    <Input
                      placeholder="Search users..."
                      className="bg-slate-700 border-slate-600 text-white pl-10"
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                    />
                  </div>
                  <div className="flex gap-4">
                    <div className="w-40">
                      <Select value={statusFilter} onValueChange={setStatusFilter}>
                        <SelectTrigger className="bg-slate-700 border-slate-600 text-white">
                          <SelectValue placeholder="Status" />
                        </SelectTrigger>
                        <SelectContent className="bg-slate-700 border-slate-600 text-white">
                          <SelectItem value="all">All Status</SelectItem>
                          <SelectItem value="active">Active</SelectItem>
                          <SelectItem value="inactive">Inactive</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="w-40">
                      <Select value={paymentFilter} onValueChange={setPaymentFilter}>
                        <SelectTrigger className="bg-slate-700 border-slate-600 text-white">
                          <SelectValue placeholder="Payment" />
                        </SelectTrigger>
                        <SelectContent className="bg-slate-700 border-slate-600 text-white">
                          <SelectItem value="all">All Users</SelectItem>
                          <SelectItem value="paid">Premium</SelectItem>
                          <SelectItem value="unpaid">Free</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <Button 
                      variant="outline" 
                      className="border-slate-600 text-white hover:bg-slate-700"
                      onClick={() => {
                        setSearchTerm('');
                        setStatusFilter('all');
                        setPaymentFilter('all');
                      }}
                    >
                      <Filter className="h-4 w-4 mr-2" />
                      Reset
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
            
            {/* Users Table */}
            <Card className="bg-slate-800 border-slate-700 text-white">
              <CardContent className="p-0">
                <div className="overflow-x-auto">
                  <Table>
                    <TableHeader className="bg-slate-700">
                      <TableRow>
                        <TableHead className="text-white">Name</TableHead>
                        <TableHead className="text-white">Email</TableHead>
                        <TableHead className="text-white">Role</TableHead>
                        <TableHead className="text-white">Status</TableHead>
                        <TableHead className="text-white">Payment</TableHead>
                        <TableHead className="text-white">Created</TableHead>
                        <TableHead className="text-white">Last Login</TableHead>
                        <TableHead className="text-white text-right">Actions</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {filteredUsers.length === 0 ? (
                        <TableRow>
                          <TableCell colSpan={8} className="text-center py-8 text-slate-400">
                            No users found
                          </TableCell>
                        </TableRow>
                      ) : (
                        filteredUsers.map((user) => (
                          <TableRow key={user.id} className="border-slate-700">
                            <TableCell className="font-medium">
                              <div className="flex items-center">
                                <Avatar className="h-8 w-8 mr-2">
                                  <AvatarImage src={`https://api.dicebear.com/7.x/initials/svg?seed=${user.name}`} alt={user.name} />
                                  <AvatarFallback>{user.name.charAt(0)}</AvatarFallback>
                                </Avatar>
                                {user.name}
                              </div>
                            </TableCell>
                            <TableCell>{user.email}</TableCell>
                            <TableCell>
                              {user.role === 'admin' ? (
                                <div className="bg-amber-900/30 text-amber-400 px-2 py-1 rounded text-xs inline-flex items-center">
                                  <Shield className="h-3 w-3 mr-1" />
                                  Admin
                                </div>
                              ) : (
                                <div className="bg-blue-900/30 text-blue-400 px-2 py-1 rounded text-xs inline-flex items-center">
                                  <Users className="h-3 w-3 mr-1" />
                                  User
                                </div>
                              )}
                            </TableCell>
                            <TableCell>
                              {user.status === 'active' ? (
                                <div className="bg-green-900/30 text-green-400 px-2 py-1 rounded text-xs">
                                  Active
                                </div>
                              ) : (
                                <div className="bg-red-900/30 text-red-400 px-2 py-1 rounded text-xs">
                                  Inactive
                                </div>
                              )}
                            </TableCell>
                            <TableCell>
                              {user.hasPaid ? (
                                <div className="bg-purple-900/30 text-purple-400 px-2 py-1 rounded text-xs">
                                  Premium
                                </div>
                              ) : (
                                <div className="bg-slate-700 text-slate-400 px-2 py-1 rounded text-xs">
                                  Free
                                </div>
                              )}
                            </TableCell>
                            <TableCell>{user.createdAt}</TableCell>
                            <TableCell>{user.lastLogin}</TableCell>
                            <TableCell className="text-right">
                              <div className="flex justify-end gap-2">
                                <Button 
                                  variant="ghost" 
                                  size="icon"
                                  onClick={() => handleEditUser(user.id)}
                                >
                                  <Edit className="h-4 w-4" />
                                </Button>
                                <Button 
                                  variant="ghost" 
                                  size="icon"
                                  onClick={() => handleDeleteUserDialog(user.id)}
                                >
                                  <Trash2 className="h-4 w-4 text-red-400" />
                                </Button>
                              </div>
                            </TableCell>
                          </TableRow>
                        ))
                      )}
                    </TableBody>
                  </Table>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
      
      {/* New User Dialog */}
      <Dialog open={isNewUserDialogOpen} onOpenChange={setIsNewUserDialogOpen}>
        <DialogContent className="bg-slate-800 border-slate-700 text-white">
          <DialogHeader>
            <DialogTitle>Create New User</DialogTitle>
            <DialogDescription className="text-slate-400">
              Add a new user to the platform
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="name">Full Name</Label>
              <Input
                id="name"
                placeholder="John Doe"
                className="bg-slate-700 border-slate-600 text-white"
                value={newUserName}
                onChange={(e) => setNewUserName(e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="john@example.com"
                className="bg-slate-700 border-slate-600 text-white"
                value={newUserEmail}
                onChange={(e) => setNewUserEmail(e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                type="password"
                placeholder="••••••••"
                className="bg-slate-700 border-slate-600 text-white"
                value={newUserPassword}
                onChange={(e) => setNewUserPassword(e.target.value)}
              />
            </div>
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <Switch
                  id="admin"
                  checked={newUserIsAdmin}
                  onCheckedChange={setNewUserIsAdmin}
                />
                <Label htmlFor="admin">Admin User</Label>
              </div>
              <div className="flex items-center space-x-2">
                <Switch
                  id="premium"
                  checked={newUserHasPaid}
                  onCheckedChange={setNewUserHasPaid}
                />
                <Label htmlFor="premium">Premium Access</Label>
              </div>
            </div>
          </div>
          <DialogFooter>
            <Button 
              variant="outline" 
              className="border-slate-600 text-white hover:bg-slate-700"
              onClick={() => setIsNewUserDialogOpen(false)}
            >
              Cancel
            </Button>
            <Button 
              className="bg-blue-600 hover:bg-blue-700"
              onClick={handleCreateUser}
            >
              Create User
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
      
      {/* Edit User Dialog */}
      <Dialog open={isEditUserDialogOpen} onOpenChange={setIsEditUserDialogOpen}>
        <DialogContent className="bg-slate-800 border-slate-700 text-white">
          <DialogHeader>
            <DialogTitle>Edit User</DialogTitle>
            <DialogDescription className="text-slate-400">
              Update user information
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="edit-name">Full Name</Label>
              <Input
                id="edit-name"
                placeholder="John Doe"
                className="bg-slate-700 border-slate-600 text-white"
                value={editUserName}
                onChange={(e) => setEditUserName(e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="edit-email">Email</Label>
              <Input
                id="edit-email"
                type="email"
                placeholder="john@example.com"
                className="bg-slate-700 border-slate-600 text-white"
                value={editUserEmail}
                onChange={(e) => setEditUserEmail(e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="edit-role">Role</Label>
              <Select value={editUserRole} onValueChange={setEditUserRole}>
                <SelectTrigger className="bg-slate-700 border-slate-600 text-white">
                  <SelectValue placeholder="Select role" />
                </SelectTrigger>
                <SelectContent className="bg-slate-700 border-slate-600 text-white">
                  <SelectItem value="user">User</SelectItem>
                  <SelectItem value="admin">Admin</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="edit-status">Status</Label>
              <Select value={editUserStatus} onValueChange={setEditUserStatus}>
                <SelectTrigger className="bg-slate-700 border-slate-600 text-white">
                  <SelectValue placeholder="Select status" />
                </SelectTrigger>
                <SelectContent className="bg-slate-700 border-slate-600 text-white">
                  <SelectItem value="active">Active</SelectItem>
                  <SelectItem value="inactive">Inactive</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="flex items-center space-x-2">
              <Switch
                id="edit-premium"
                checked={editUserHasPaid}
                onCheckedChange={setEditUserHasPaid}
              />
              <Label htmlFor="edit-premium">Premium Access</Label>
            </div>
          </div>
          <DialogFooter>
            <Button 
              variant="outline" 
              className="border-slate-600 text-white hover:bg-slate-700"
              onClick={() => setIsEditUserDialogOpen(false)}
            >
              Cancel
            </Button>
            <Button 
              className="bg-blue-600 hover:bg-blue-700"
              onClick={handleUpdateUser}
            >
              Update User
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
      
      {/* Delete User Dialog */}
      <Dialog open={isDeleteUserDialogOpen} onOpenChange={setIsDeleteUserDialogOpen}>
        <DialogContent className="bg-slate-800 border-slate-700 text-white">
          <DialogHeader>
            <DialogTitle>Delete User</DialogTitle>
            <DialogDescription className="text-slate-400">
              Are you sure you want to delete this user? This action cannot be undone.
            </DialogDescription>
          </DialogHeader>
          <div className="py-4">
            <p className="text-white">
              You are about to delete user: <span className="font-bold">{deleteUserName}</span>
            </p>
          </div>
          <DialogFooter>
            <Button 
              variant="outline" 
              className="border-slate-600 text-white hover:bg-slate-700"
              onClick={() => setIsDeleteUserDialogOpen(false)}
            >
              Cancel
            </Button>
            <Button 
              variant="destructive"
              className="bg-red-600 hover:bg-red-700"
              onClick={handleDeleteUser}
            >
              Delete User
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
