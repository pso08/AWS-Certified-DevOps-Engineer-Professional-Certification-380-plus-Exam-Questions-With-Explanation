'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { 
  Download, 
  FileText, 
  CheckCircle, 
  XCircle,
  ArrowRight,
  Search,
  Filter,
  Clock,
  Calendar,
  FileDown
} from 'lucide-react';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Alert, AlertDescription } from "@/components/ui/alert";

// Mock invoices data
const mockInvoices = [
  { id: 'INV-001234', date: '2025-04-01', amount: 199.99, plan: 'Annual', status: 'paid' },
  { id: 'INV-001233', date: '2025-03-01', amount: 19.99, plan: 'Monthly', status: 'paid' },
  { id: 'INV-001232', date: '2025-02-01', amount: 19.99, plan: 'Monthly', status: 'paid' },
  { id: 'INV-001231', date: '2025-01-01', amount: 19.99, plan: 'Monthly', status: 'paid' },
  { id: 'INV-001230', date: '2024-12-01', amount: 19.99, plan: 'Monthly', status: 'paid' },
];

export default function InvoicesPage() {
  const router = useRouter();
  
  // User state
  const [user, setUser] = useState<{
    id: string;
    name: string;
    email: string;
    isAdmin: boolean;
    subscription?: {
      plan: string;
      startDate: string;
      endDate: string | null;
      price: number;
      status: string;
    };
  } | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  
  // Invoices state
  const [invoices, setInvoices] = useState(mockInvoices);
  const [filteredInvoices, setFilteredInvoices] = useState(mockInvoices);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  
  // Success/error state
  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  
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
        
        if (!session.hasPremiumAccess) {
          router.push('/payment');
          return;
        }
        
        setUser({
          id: session.userId || '1',
          name: session.name || 'User',
          email: session.email || 'user@example.com',
          isAdmin: session.isAdmin || false,
          subscription: session.subscription || {
            plan: 'annual',
            startDate: '2025-04-01',
            endDate: '2026-04-01',
            price: 199.99,
            status: 'active'
          }
        });
        
        setIsLoading(false);
      }
    };
    
    loadUserData();
  }, [router]);
  
  // Filter invoices based on search term and filters
  useEffect(() => {
    let result = invoices;
    
    // Apply search filter
    if (searchTerm) {
      const term = searchTerm.toLowerCase();
      result = result.filter(invoice => 
        invoice.id.toLowerCase().includes(term) || 
        invoice.plan.toLowerCase().includes(term)
      );
    }
    
    // Apply status filter
    if (statusFilter !== 'all') {
      result = result.filter(invoice => invoice.status === statusFilter);
    }
    
    setFilteredInvoices(result);
  }, [invoices, searchTerm, statusFilter]);
  
  // Handle download invoice
  const handleDownloadInvoice = (invoiceId: string) => {
    // In a real application, this would be a fetch request to download the invoice
    // For this mock implementation, we'll just show a success message
    setSuccessMessage(`Invoice ${invoiceId} downloaded successfully`);
    setTimeout(() => setSuccessMessage(''), 3000);
  };
  
  // Format date
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });
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
        <div className="max-w-4xl mx-auto">
          <div className="flex justify-between items-center mb-6">
            <h1 className="text-3xl font-bold">Billing & Invoices</h1>
            <Button 
              variant="outline" 
              className="border-slate-600 text-white hover:bg-slate-700"
              onClick={() => router.push('/protected')}
            >
              Back to Dashboard
            </Button>
          </div>
          
          {/* Success/Error Messages */}
          {successMessage && (
            <Alert className="mb-6 bg-green-900/30 border-green-800 text-green-200">
              <CheckCircle className="h-4 w-4 mr-2" />
              <AlertDescription>{successMessage}</AlertDescription>
            </Alert>
          )}
          
          {errorMessage && (
            <Alert className="mb-6 bg-red-900/30 border-red-800 text-red-200">
              <XCircle className="h-4 w-4 mr-2" />
              <AlertDescription>{errorMessage}</AlertDescription>
            </Alert>
          )}
          
          {/* Subscription Info */}
          <Card className="bg-slate-800 border-slate-700 text-white mb-6">
            <CardHeader>
              <CardTitle>Current Subscription</CardTitle>
              <CardDescription className="text-slate-400">
                Your current plan and billing information
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="space-y-2">
                  <div className="text-sm text-slate-400">Plan</div>
                  <div className="font-medium text-lg">
                    {user?.subscription?.plan === 'monthly' && 'Monthly Plan'}
                    {user?.subscription?.plan === 'annual' && 'Annual Plan'}
                    {user?.subscription?.plan === 'lifetime' && 'Lifetime Plan'}
                  </div>
                </div>
                
                <div className="space-y-2">
                  <div className="text-sm text-slate-400">Status</div>
                  <div className="font-medium">
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-900/30 text-green-400">
                      <CheckCircle className="h-3 w-3 mr-1" />
                      Active
                    </span>
                  </div>
                </div>
                
                <div className="space-y-2">
                  <div className="text-sm text-slate-400">Price</div>
                  <div className="font-medium text-lg">
                    ${user?.subscription?.price.toFixed(2)}
                    {user?.subscription?.plan === 'monthly' && '/month'}
                    {user?.subscription?.plan === 'annual' && '/year'}
                  </div>
                </div>
                
                <div className="space-y-2">
                  <div className="text-sm text-slate-400">Start Date</div>
                  <div className="font-medium flex items-center">
                    <Calendar className="h-4 w-4 mr-2 text-slate-400" />
                    {formatDate(user?.subscription?.startDate || '')}
                  </div>
                </div>
                
                <div className="space-y-2">
                  <div className="text-sm text-slate-400">
                    {user?.subscription?.plan === 'lifetime' ? 'Valid Until' : 'Next Billing Date'}
                  </div>
                  <div className="font-medium flex items-center">
                    <Clock className="h-4 w-4 mr-2 text-slate-400" />
                    {user?.subscription?.plan === 'lifetime' ? (
                      'Forever'
                    ) : (
                      formatDate(user?.subscription?.endDate || '')
                    )}
                  </div>
                </div>
                
                <div className="space-y-2">
                  <div className="text-sm text-slate-400">Payment Method</div>
                  <div className="font-medium flex items-center">
                    <svg className="h-4 w-4 mr-2 text-slate-400" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M22 4H2c-1.11 0-2 .89-2 2v12c0 1.11.89 2 2 2h20c1.11 0 2-.89 2-2V6c0-1.11-.89-2-2-2zm0 14H2V8h20v10zm-7-3h-3v-2h3v2z" />
                    </svg>
                    •••• •••• •••• 4242
                  </div>
                </div>
              </div>
            </CardContent>
            <CardFooter className="flex justify-end gap-4">
              <Button 
                variant="outline" 
                className="border-slate-600 text-white hover:bg-slate-700"
              >
                Update Payment Method
              </Button>
              {user?.subscription?.plan !== 'lifetime' && (
                <Button 
                  className="bg-blue-600 hover:bg-blue-700"
                  onClick={() => router.push('/payment')}
                >
                  Upgrade Plan
                </Button>
              )}
            </CardFooter>
          </Card>
          
          {/* Invoices */}
          <div className="mb-6">
            <h2 className="text-xl font-bold mb-4">Invoice History</h2>
            
            {/* Filters */}
            <Card className="bg-slate-800 border-slate-700 text-white mb-4">
              <CardContent className="p-4">
                <div className="flex flex-col md:flex-row gap-4">
                  <div className="flex-1 relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 h-4 w-4" />
                    <Input
                      placeholder="Search invoices..."
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
                        <option value="paid">Paid</option>
                        <option value="pending">Pending</option>
                        <option value="failed">Failed</option>
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
            
            {/* Invoices Table */}
            <Card className="bg-slate-800 border-slate-700 text-white">
              <CardContent className="p-0">
                <div className="overflow-x-auto">
                  <Table>
                    <TableHeader className="bg-slate-700">
                      <TableRow>
                        <TableHead className="text-white">Invoice #</TableHead>
                        <TableHead className="text-white">Date</TableHead>
                        <TableHead className="text-white">Plan</TableHead>
                        <TableHead className="text-white">Amount</TableHead>
                        <TableHead className="text-white">Status</TableHead>
                        <TableHead className="text-white text-right">Actions</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {filteredInvoices.length === 0 ? (
                        <TableRow>
                          <TableCell colSpan={6} className="text-center py-8 text-slate-400">
                            No invoices found
                          </TableCell>
                        </TableRow>
                      ) : (
                        filteredInvoices.map((invoice) => (
                          <TableRow key={invoice.id} className="border-slate-700">
                            <TableCell className="font-medium">
                              <div className="flex items-center">
                                <FileText className="h-4 w-4 text-slate-400 mr-2" />
                                {invoice.id}
                              </div>
                            </TableCell>
                            <TableCell>{formatDate(invoice.date)}</TableCell>
                            <TableCell>{invoice.plan}</TableCell>
                            <TableCell>${invoice.amount.toFixed(2)}</TableCell>
                            <TableCell>
                              {invoice.status === 'paid' && (
                                <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-900/30 text-green-400">
                                  Paid
                                </span>
                              )}
                              {invoice.status === 'pending' && (
                                <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-yellow-900/30 text-yellow-400">
                                  Pending
                                </span>
                              )}
                              {invoice.status === 'failed' && (
                                <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-red-900/30 text-red-400">
                                  Failed
                                </span>
                              )}
                            </TableCell>
                            <TableCell className="text-right">
                              <Button 
                                variant="ghost" 
                                size="sm"
                                className="text-blue-400 hover:text-blue-300 hover:bg-slate-700"
                                onClick={() => handleDownloadInvoice(invoice.id)}
                              >
                                <FileDown className="h-4 w-4 mr-2" />
                                Download
                              </Button>
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
          
          {/* Need Help */}
          <Card className="bg-slate-800 border-slate-700 text-white">
            <CardHeader>
              <CardTitle>Need Help?</CardTitle>
              <CardDescription className="text-slate-400">
                Contact our support team for billing inquiries
              </CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-slate-400 mb-4">
                If you have any questions about your subscription or billing, please don't hesitate to contact our support team. We're here to help!
              </p>
              <Button 
                variant="outline" 
                className="border-slate-600 text-white hover:bg-slate-700"
                onClick={() => router.push('/contact')}
              >
                <ArrowRight className="h-4 w-4 mr-2" />
                Contact Support
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
