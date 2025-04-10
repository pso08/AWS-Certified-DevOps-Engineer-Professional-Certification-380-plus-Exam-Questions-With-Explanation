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
  Filter,
  Copy,
  Calendar
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
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Switch } from "@/components/ui/switch";

// Mock coupons data
const mockCoupons = [
  { id: '1', code: 'WELCOME25', discount: 25, type: 'percentage', maxUses: 100, usedCount: 45, expiresAt: '2025-06-30', isActive: true, createdAt: '2025-03-15' },
  { id: '2', code: 'SUMMER2025', discount: 30, type: 'percentage', maxUses: 200, usedCount: 78, expiresAt: '2025-08-31', isActive: true, createdAt: '2025-03-20' },
  { id: '3', code: 'FLASH15', discount: 15, type: 'percentage', maxUses: 50, usedCount: 50, expiresAt: '2025-04-15', isActive: false, createdAt: '2025-03-25' },
  { id: '4', code: 'NEWUSER', discount: 10, type: 'fixed', maxUses: null, usedCount: 132, expiresAt: null, isActive: true, createdAt: '2025-03-28' },
  { id: '5', code: 'PREMIUM50', discount: 50, type: 'percentage', maxUses: 20, usedCount: 12, expiresAt: '2025-05-15', isActive: true, createdAt: '2025-04-01' },
  { id: '6', code: 'SPRING20', discount: 20, type: 'percentage', maxUses: 150, usedCount: 67, expiresAt: '2025-05-31', isActive: true, createdAt: '2025-04-05' },
];

export default function CouponsPage() {
  const router = useRouter();
  
  // Admin user state
  const [user, setUser] = useState<{
    id: string;
    name: string;
    email: string;
    isAdmin: boolean;
  } | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  
  // Coupons state
  const [coupons, setCoupons] = useState(mockCoupons);
  const [filteredCoupons, setFilteredCoupons] = useState(mockCoupons);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  
  // New coupon state
  const [isNewCouponDialogOpen, setIsNewCouponDialogOpen] = useState(false);
  const [newCouponCode, setNewCouponCode] = useState('');
  const [newCouponDiscount, setNewCouponDiscount] = useState('');
  const [newCouponType, setNewCouponType] = useState('percentage');
  const [newCouponMaxUses, setNewCouponMaxUses] = useState('');
  const [newCouponExpiresAt, setNewCouponExpiresAt] = useState('');
  const [newCouponIsActive, setNewCouponIsActive] = useState(true);
  
  // Edit coupon state
  const [isEditCouponDialogOpen, setIsEditCouponDialogOpen] = useState(false);
  const [editCouponId, setEditCouponId] = useState('');
  const [editCouponCode, setEditCouponCode] = useState('');
  const [editCouponDiscount, setEditCouponDiscount] = useState('');
  const [editCouponType, setEditCouponType] = useState('');
  const [editCouponMaxUses, setEditCouponMaxUses] = useState('');
  const [editCouponExpiresAt, setEditCouponExpiresAt] = useState('');
  const [editCouponIsActive, setEditCouponIsActive] = useState(false);
  
  // Delete coupon state
  const [isDeleteCouponDialogOpen, setIsDeleteCouponDialogOpen] = useState(false);
  const [deleteCouponId, setDeleteCouponId] = useState('');
  const [deleteCouponCode, setDeleteCouponCode] = useState('');
  
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
  
  // Filter coupons based on search term and filters
  useEffect(() => {
    let result = coupons;
    
    // Apply search filter
    if (searchTerm) {
      const term = searchTerm.toLowerCase();
      result = result.filter(coupon => 
        coupon.code.toLowerCase().includes(term)
      );
    }
    
    // Apply status filter
    if (statusFilter !== 'all') {
      const isActive = statusFilter === 'active';
      result = result.filter(coupon => coupon.isActive === isActive);
    }
    
    setFilteredCoupons(result);
  }, [coupons, searchTerm, statusFilter]);
  
  // Generate random coupon code
  const generateCouponCode = () => {
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
    let result = '';
    for (let i = 0; i < 8; i++) {
      result += characters.charAt(Math.floor(Math.random() * characters.length));
    }
    setNewCouponCode(result);
  };
  
  // Handle new coupon creation
  const handleCreateCoupon = () => {
    // Validate inputs
    if (!newCouponCode || !newCouponDiscount) {
      setErrorMessage('Please fill in all required fields');
      return;
    }
    
    // Validate discount
    const discount = parseFloat(newCouponDiscount);
    if (isNaN(discount) || discount <= 0 || (newCouponType === 'percentage' && discount > 100)) {
      setErrorMessage('Please enter a valid discount amount');
      return;
    }
    
    // Create new coupon
    const newCoupon = {
      id: `${coupons.length + 1}`,
      code: newCouponCode.toUpperCase(),
      discount: discount,
      type: newCouponType,
      maxUses: newCouponMaxUses ? parseInt(newCouponMaxUses) : null,
      usedCount: 0,
      expiresAt: newCouponExpiresAt || null,
      isActive: newCouponIsActive,
      createdAt: new Date().toISOString().split('T')[0]
    };
    
    // Add to coupons list
    setCoupons([...coupons, newCoupon]);
    
    // Reset form and close dialog
    setNewCouponCode('');
    setNewCouponDiscount('');
    setNewCouponType('percentage');
    setNewCouponMaxUses('');
    setNewCouponExpiresAt('');
    setNewCouponIsActive(true);
    setIsNewCouponDialogOpen(false);
    
    // Show success message
    setSuccessMessage('Coupon created successfully');
    setTimeout(() => setSuccessMessage(''), 3000);
  };
  
  // Handle edit coupon
  const handleEditCoupon = (couponId: string) => {
    const couponToEdit = coupons.find(c => c.id === couponId);
    if (couponToEdit) {
      setEditCouponId(couponToEdit.id);
      setEditCouponCode(couponToEdit.code);
      setEditCouponDiscount(couponToEdit.discount.toString());
      setEditCouponType(couponToEdit.type);
      setEditCouponMaxUses(couponToEdit.maxUses ? couponToEdit.maxUses.toString() : '');
      setEditCouponExpiresAt(couponToEdit.expiresAt || '');
      setEditCouponIsActive(couponToEdit.isActive);
      setIsEditCouponDialogOpen(true);
    }
  };
  
  // Handle update coupon
  const handleUpdateCoupon = () => {
    // Validate inputs
    if (!editCouponCode || !editCouponDiscount) {
      setErrorMessage('Please fill in all required fields');
      return;
    }
    
    // Validate discount
    const discount = parseFloat(editCouponDiscount);
    if (isNaN(discount) || discount <= 0 || (editCouponType === 'percentage' && discount > 100)) {
      setErrorMessage('Please enter a valid discount amount');
      return;
    }
    
    // Update coupon
    const updatedCoupons = coupons.map(coupon => {
      if (coupon.id === editCouponId) {
        return {
          ...coupon,
          code: editCouponCode.toUpperCase(),
          discount: discount,
          type: editCouponType,
          maxUses: editCouponMaxUses ? parseInt(editCouponMaxUses) : null,
          expiresAt: editCouponExpiresAt || null,
          isActive: editCouponIsActive
        };
      }
      return coupon;
    });
    
    // Update coupons list
    setCoupons(updatedCoupons);
    
    // Reset form and close dialog
    setIsEditCouponDialogOpen(false);
    
    // Show success message
    setSuccessMessage('Coupon updated successfully');
    setTimeout(() => setSuccessMessage(''), 3000);
  };
  
  // Handle delete coupon dialog
  const handleDeleteCouponDialog = (couponId: string) => {
    const couponToDelete = coupons.find(c => c.id === couponId);
    if (couponToDelete) {
      setDeleteCouponId(couponToDelete.id);
      setDeleteCouponCode(couponToDelete.code);
      setIsDeleteCouponDialogOpen(true);
    }
  };
  
  // Handle delete coupon
  const handleDeleteCoupon = () => {
    // Delete coupon
    const updatedCoupons = coupons.filter(coupon => coupon.id !== deleteCouponId);
    
    // Update coupons list
    setCoupons(updatedCoupons);
    
    // Reset form and close dialog
    setIsDeleteCouponDialogOpen(false);
    
    // Show success message
    setSuccessMessage('Coupon deleted successfully');
    setTimeout(() => setSuccessMessage(''), 3000);
  };
  
  // Handle toggle coupon status
  const handleToggleCouponStatus = (couponId: string) => {
    const updatedCoupons = coupons.map(coupon => {
      if (coupon.id === couponId) {
        return {
          ...coupon,
          isActive: !coupon.isActive
        };
      }
      return coupon;
    });
    
    setCoupons(updatedCoupons);
    
    // Show success message
    setSuccessMessage('Coupon status updated successfully');
    setTimeout(() => setSuccessMessage(''), 3000);
  };
  
  // Copy coupon code to clipboard
  const handleCopyCouponCode = (code: string) => {
    navigator.clipboard.writeText(code);
    
    // Show success message
    setSuccessMessage('Coupon code copied to clipboard');
    setTimeout(() => setSuccessMessage(''), 3000);
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
              <Link href="/admin/users" className="block p-2 hover:bg-slate-700 rounded-lg">
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
              <Link href="/admin/coupons" className="block p-2 bg-slate-700 rounded-lg">
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
              <h1 className="text-3xl font-bold">Coupon Management</h1>
              <div className="flex gap-2">
                <Button 
                  className="bg-blue-600 hover:bg-blue-700"
                  onClick={() => setIsNewCouponDialogOpen(true)}
                >
                  <Plus className="h-4 w-4 mr-2" />
                  New Coupon
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
                      placeholder="Search coupons..."
                      className="bg-slate-700 border-slate-600 text-white pl-10"
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                    />
                  </div>
                  <div className="flex gap-4">
                    <div className="w-40">
                      <select
                        className="w-full h-10 rounded-md border border-slate-600 bg-slate-700 px-3 py-2 text-sm text-white"
                        value={statusFilter}
                        onChange={(e) => setStatusFilter(e.target.value)}
                      >
                        <option value="all">All Status</option>
                        <option value="active">Active</option>
                        <option value="inactive">Inactive</option>
                      </select>
                    </div>
                    <Button 
                      variant="outline" 
                      className="border-slate-600 text-white hover:bg-slate-700"
                      onClick={() => {
                        setSearchTerm('');
                        setStatusFilter('all');
                      }}
                    >
                      <Filter className="h-4 w-4 mr-2" />
                      Reset
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
            
            {/* Coupons Table */}
            <Card className="bg-slate-800 border-slate-700 text-white">
              <CardContent className="p-0">
                <div className="overflow-x-auto">
                  <Table>
                    <TableHeader className="bg-slate-700">
                      <TableRow>
                        <TableHead className="text-white">Code</TableHead>
                        <TableHead className="text-white">Discount</TableHead>
                        <TableHead className="text-white">Usage</TableHead>
                        <TableHead className="text-white">Expires</TableHead>
                        <TableHead className="text-white">Status</TableHead>
                        <TableHead className="text-white">Created</TableHead>
                        <TableHead className="text-white text-right">Actions</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {filteredCoupons.length === 0 ? (
                        <TableRow>
                          <TableCell colSpan={7} className="text-center py-8 text-slate-400">
                            No coupons found
                          </TableCell>
                        </TableRow>
                      ) : (
                        filteredCoupons.map((coupon) => (
                          <TableRow key={coupon.id} className="border-slate-700">
                            <TableCell className="font-medium">
                              <div className="flex items-center">
                                <span className="font-mono">{coupon.code}</span>
                                <Button 
                                  variant="ghost" 
                                  size="icon"
                                  className="ml-2"
                                  onClick={() => handleCopyCouponCode(coupon.code)}
                                >
                                  <Copy className="h-3 w-3 text-slate-400" />
                                </Button>
                              </div>
                            </TableCell>
                            <TableCell>
                              {coupon.type === 'percentage' ? (
                                <span>{coupon.discount}%</span>
                              ) : (
                                <span>${coupon.discount.toFixed(2)}</span>
                              )}
                            </TableCell>
                            <TableCell>
                              {coupon.usedCount} / {coupon.maxUses ? coupon.maxUses : '∞'}
                            </TableCell>
                            <TableCell>
                              {coupon.expiresAt ? (
                                <div className="flex items-center">
                                  <Calendar className="h-3 w-3 mr-1 text-slate-400" />
                                  {coupon.expiresAt}
                                </div>
                              ) : (
                                <span className="text-slate-400">Never</span>
                              )}
                            </TableCell>
                            <TableCell>
                              <div className="flex items-center">
                                <Switch
                                  checked={coupon.isActive}
                                  onCheckedChange={() => handleToggleCouponStatus(coupon.id)}
                                  className="mr-2"
                                />
                                {coupon.isActive ? (
                                  <span className="text-green-400">Active</span>
                                ) : (
                                  <span className="text-red-400">Inactive</span>
                                )}
                              </div>
                            </TableCell>
                            <TableCell>{coupon.createdAt}</TableCell>
                            <TableCell className="text-right">
                              <div className="flex justify-end gap-2">
                                <Button 
                                  variant="ghost" 
                                  size="icon"
                                  onClick={() => handleEditCoupon(coupon.id)}
                                >
                                  <Edit className="h-4 w-4" />
                                </Button>
                                <Button 
                                  variant="ghost" 
                                  size="icon"
                                  onClick={() => handleDeleteCouponDialog(coupon.id)}
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
      
      {/* New Coupon Dialog */}
      <Dialog open={isNewCouponDialogOpen} onOpenChange={setIsNewCouponDialogOpen}>
        <DialogContent className="bg-slate-800 border-slate-700 text-white">
          <DialogHeader>
            <DialogTitle>Create New Coupon</DialogTitle>
            <DialogDescription className="text-slate-400">
              Add a new discount coupon to the platform
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <div className="flex justify-between items-center">
                <Label htmlFor="code">Coupon Code</Label>
                <Button 
                  variant="outline" 
                  size="sm"
                  className="border-slate-600 text-white hover:bg-slate-700 text-xs h-7"
                  onClick={generateCouponCode}
                >
                  Generate
                </Button>
              </div>
              <Input
                id="code"
                placeholder="SUMMER25"
                className="bg-slate-700 border-slate-600 text-white font-mono"
                value={newCouponCode}
                onChange={(e) => setNewCouponCode(e.target.value.toUpperCase())}
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="discount">Discount Amount</Label>
                <Input
                  id="discount"
                  type="number"
                  placeholder={newCouponType === 'percentage' ? '25' : '10'}
                  className="bg-slate-700 border-slate-600 text-white"
                  value={newCouponDiscount}
                  onChange={(e) => setNewCouponDiscount(e.target.value)}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="type">Discount Type</Label>
                <select
                  id="type"
                  className="w-full h-10 rounded-md border border-slate-600 bg-slate-700 px-3 py-2 text-sm text-white"
                  value={newCouponType}
                  onChange={(e) => setNewCouponType(e.target.value)}
                >
                  <option value="percentage">Percentage (%)</option>
                  <option value="fixed">Fixed Amount ($)</option>
                </select>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="maxUses">Max Uses (optional)</Label>
                <Input
                  id="maxUses"
                  type="number"
                  placeholder="100"
                  className="bg-slate-700 border-slate-600 text-white"
                  value={newCouponMaxUses}
                  onChange={(e) => setNewCouponMaxUses(e.target.value)}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="expiresAt">Expiration Date (optional)</Label>
                <Input
                  id="expiresAt"
                  type="date"
                  className="bg-slate-700 border-slate-600 text-white"
                  value={newCouponExpiresAt}
                  onChange={(e) => setNewCouponExpiresAt(e.target.value)}
                />
              </div>
            </div>
            <div className="flex items-center space-x-2">
              <Switch
                id="isActive"
                checked={newCouponIsActive}
                onCheckedChange={setNewCouponIsActive}
              />
              <Label htmlFor="isActive">Active</Label>
            </div>
          </div>
          <DialogFooter>
            <Button 
              variant="outline" 
              className="border-slate-600 text-white hover:bg-slate-700"
              onClick={() => setIsNewCouponDialogOpen(false)}
            >
              Cancel
            </Button>
            <Button 
              className="bg-blue-600 hover:bg-blue-700"
              onClick={handleCreateCoupon}
            >
              Create Coupon
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
      
      {/* Edit Coupon Dialog */}
      <Dialog open={isEditCouponDialogOpen} onOpenChange={setIsEditCouponDialogOpen}>
        <DialogContent className="bg-slate-800 border-slate-700 text-white">
          <DialogHeader>
            <DialogTitle>Edit Coupon</DialogTitle>
            <DialogDescription className="text-slate-400">
              Update coupon information
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="edit-code">Coupon Code</Label>
              <Input
                id="edit-code"
                placeholder="SUMMER25"
                className="bg-slate-700 border-slate-600 text-white font-mono"
                value={editCouponCode}
                onChange={(e) => setEditCouponCode(e.target.value.toUpperCase())}
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="edit-discount">Discount Amount</Label>
                <Input
                  id="edit-discount"
                  type="number"
                  placeholder={editCouponType === 'percentage' ? '25' : '10'}
                  className="bg-slate-700 border-slate-600 text-white"
                  value={editCouponDiscount}
                  onChange={(e) => setEditCouponDiscount(e.target.value)}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="edit-type">Discount Type</Label>
                <select
                  id="edit-type"
                  className="w-full h-10 rounded-md border border-slate-600 bg-slate-700 px-3 py-2 text-sm text-white"
                  value={editCouponType}
                  onChange={(e) => setEditCouponType(e.target.value)}
                >
                  <option value="percentage">Percentage (%)</option>
                  <option value="fixed">Fixed Amount ($)</option>
                </select>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="edit-maxUses">Max Uses (optional)</Label>
                <Input
                  id="edit-maxUses"
                  type="number"
                  placeholder="100"
                  className="bg-slate-700 border-slate-600 text-white"
                  value={editCouponMaxUses}
                  onChange={(e) => setEditCouponMaxUses(e.target.value)}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="edit-expiresAt">Expiration Date (optional)</Label>
                <Input
                  id="edit-expiresAt"
                  type="date"
                  className="bg-slate-700 border-slate-600 text-white"
                  value={editCouponExpiresAt}
                  onChange={(e) => setEditCouponExpiresAt(e.target.value)}
                />
              </div>
            </div>
            <div className="flex items-center space-x-2">
              <Switch
                id="edit-isActive"
                checked={editCouponIsActive}
                onCheckedChange={setEditCouponIsActive}
              />
              <Label htmlFor="edit-isActive">Active</Label>
            </div>
          </div>
          <DialogFooter>
            <Button 
              variant="outline" 
              className="border-slate-600 text-white hover:bg-slate-700"
              onClick={() => setIsEditCouponDialogOpen(false)}
            >
              Cancel
            </Button>
            <Button 
              className="bg-blue-600 hover:bg-blue-700"
              onClick={handleUpdateCoupon}
            >
              Update Coupon
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
      
      {/* Delete Coupon Dialog */}
      <Dialog open={isDeleteCouponDialogOpen} onOpenChange={setIsDeleteCouponDialogOpen}>
        <DialogContent className="bg-slate-800 border-slate-700 text-white">
          <DialogHeader>
            <DialogTitle>Delete Coupon</DialogTitle>
            <DialogDescription className="text-slate-400">
              Are you sure you want to delete this coupon? This action cannot be undone.
            </DialogDescription>
          </DialogHeader>
          <div className="py-4">
            <p className="text-white">
              You are about to delete coupon: <span className="font-bold font-mono">{deleteCouponCode}</span>
            </p>
          </div>
          <DialogFooter>
            <Button 
              variant="outline" 
              className="border-slate-600 text-white hover:bg-slate-700"
              onClick={() => setIsDeleteCouponDialogOpen(false)}
            >
              Cancel
            </Button>
            <Button 
              variant="destructive"
              className="bg-red-600 hover:bg-red-700"
              onClick={handleDeleteCoupon}
            >
              Delete Coupon
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
