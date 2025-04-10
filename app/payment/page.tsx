'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { 
  CreditCard, 
  Check, 
  Lock, 
  Shield, 
  ArrowRight,
  CheckCircle,
  XCircle,
  Download,
  Tag
} from 'lucide-react';
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Label } from "@/components/ui/label";

export default function PaymentPage() {
  const router = useRouter();
  
  // User state
  const [user, setUser] = useState<{
    id: string;
    name: string;
    email: string;
    isAdmin: boolean;
  } | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  
  // Payment state
  const [paymentStep, setPaymentStep] = useState<'select-plan' | 'payment-details' | 'processing' | 'success'>('select-plan');
  const [selectedPlan, setSelectedPlan] = useState<'monthly' | 'annual' | 'lifetime' | null>(null);
  const [couponCode, setCouponCode] = useState('');
  const [couponApplied, setCouponApplied] = useState(false);
  const [couponDiscount, setCouponDiscount] = useState(0);
  const [originalPrice, setOriginalPrice] = useState(0);
  const [finalPrice, setFinalPrice] = useState(0);
  
  // Credit card state
  const [cardNumber, setCardNumber] = useState('');
  const [cardName, setCardName] = useState('');
  const [cardExpiry, setCardExpiry] = useState('');
  const [cardCvc, setCardCvc] = useState('');
  
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
        
        setUser({
          id: session.userId || '1',
          name: session.name || 'User',
          email: session.email || 'user@example.com',
          isAdmin: session.isAdmin || false,
        });
        
        setIsLoading(false);
      }
    };
    
    loadUserData();
  }, [router]);
  
  // Handle plan selection
  const handleSelectPlan = (plan: 'monthly' | 'annual' | 'lifetime') => {
    setSelectedPlan(plan);
    
    // Set original price based on plan
    let price = 0;
    switch (plan) {
      case 'monthly':
        price = 19.99;
        break;
      case 'annual':
        price = 199.99;
        break;
      case 'lifetime':
        price = 499.99;
        break;
    }
    
    setOriginalPrice(price);
    setFinalPrice(price);
    
    // Reset coupon if changing plans
    setCouponCode('');
    setCouponApplied(false);
    setCouponDiscount(0);
    
    // Move to payment details step
    setPaymentStep('payment-details');
  };
  
  // Format card number with spaces
  const formatCardNumber = (value: string) => {
    const v = value.replace(/\s+/g, '').replace(/[^0-9]/gi, '');
    const matches = v.match(/\d{4,16}/g);
    const match = matches && matches[0] || '';
    const parts = [];
    
    for (let i = 0, len = match.length; i < len; i += 4) {
      parts.push(match.substring(i, i + 4));
    }
    
    if (parts.length) {
      return parts.join(' ');
    } else {
      return value;
    }
  };
  
  // Format card expiry date
  const formatCardExpiry = (value: string) => {
    const v = value.replace(/\s+/g, '').replace(/[^0-9]/gi, '');
    
    if (v.length > 2) {
      return `${v.substring(0, 2)}/${v.substring(2, 4)}`;
    }
    
    return value;
  };
  
  // Apply coupon code
  const handleApplyCoupon = () => {
    if (!couponCode) {
      setErrorMessage('Please enter a coupon code');
      return;
    }
    
    // Mock coupon validation
    // In a real application, this would be a fetch request to validate the coupon
    const validCoupons = [
      { code: 'WELCOME25', discount: 25, type: 'percentage' },
      { code: 'SUMMER2025', discount: 30, type: 'percentage' },
      { code: 'NEWUSER', discount: 10, type: 'fixed' },
    ];
    
    const coupon = validCoupons.find(c => c.code === couponCode.toUpperCase());
    
    if (coupon) {
      setCouponApplied(true);
      
      // Calculate discount
      let discount = 0;
      if (coupon.type === 'percentage') {
        discount = originalPrice * (coupon.discount / 100);
      } else {
        discount = coupon.discount;
      }
      
      setCouponDiscount(discount);
      setFinalPrice(Math.max(originalPrice - discount, 0));
      
      setSuccessMessage(`Coupon applied: ${coupon.discount}${coupon.type === 'percentage' ? '%' : '$'} off`);
      setTimeout(() => setSuccessMessage(''), 3000);
    } else {
      setErrorMessage('Invalid coupon code');
      setTimeout(() => setErrorMessage(''), 3000);
    }
  };
  
  // Process payment
  const handleProcessPayment = () => {
    // Validate inputs
    if (!cardNumber || !cardName || !cardExpiry || !cardCvc) {
      setErrorMessage('Please fill in all payment details');
      return;
    }
    
    // Simple validation
    if (cardNumber.replace(/\s+/g, '').length < 16) {
      setErrorMessage('Please enter a valid card number');
      return;
    }
    
    if (cardExpiry.length < 5) {
      setErrorMessage('Please enter a valid expiry date (MM/YY)');
      return;
    }
    
    if (cardCvc.length < 3) {
      setErrorMessage('Please enter a valid CVC code');
      return;
    }
    
    // Move to processing step
    setPaymentStep('processing');
    
    // Simulate payment processing
    setTimeout(() => {
      // In a real application, this would be a fetch request to process the payment
      // For this mock implementation, we'll simulate a successful payment
      
      // Update user session with premium access
      if (typeof window !== 'undefined') {
        const session = JSON.parse(localStorage.getItem('user_session') || '{}');
        session.hasPremiumAccess = true;
        
        // Add subscription details
        session.subscription = {
          plan: selectedPlan,
          startDate: new Date().toISOString(),
          endDate: selectedPlan === 'lifetime' ? null : new Date(Date.now() + (selectedPlan === 'monthly' ? 30 : 365) * 24 * 60 * 60 * 1000).toISOString(),
          price: finalPrice,
          status: 'active'
        };
        
        localStorage.setItem('user_session', JSON.stringify(session));
      }
      
      // Move to success step
      setPaymentStep('success');
    }, 2000);
  };
  
  // Handle back to plans
  const handleBackToPlans = () => {
    setPaymentStep('select-plan');
    setSelectedPlan(null);
    setCouponCode('');
    setCouponApplied(false);
    setCouponDiscount(0);
    setOriginalPrice(0);
    setFinalPrice(0);
  };
  
  // Handle go to downloads
  const handleGoToDownloads = () => {
    router.push('/download');
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
        <div className="max-w-3xl mx-auto">
          <div className="mb-8 text-center">
            <h1 className="text-3xl font-bold mb-2">Premium Access</h1>
            <p className="text-slate-400">
              Unlock all premium features and resources to accelerate your AWS certification journey
            </p>
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
          
          {/* Payment Steps */}
          {paymentStep === 'select-plan' && (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {/* Monthly Plan */}
              <Card className="bg-slate-800 border-slate-700 text-white hover:border-blue-500 transition-all cursor-pointer">
                <CardHeader className="pb-4">
                  <CardTitle className="text-xl">Monthly</CardTitle>
                  <CardDescription className="text-slate-400">
                    Perfect for short-term preparation
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="mb-4">
                    <span className="text-3xl font-bold">$19.99</span>
                    <span className="text-slate-400 ml-1">/month</span>
                  </div>
                  <ul className="space-y-2">
                    <li className="flex items-start">
                      <Check className="h-5 w-5 text-green-400 mr-2 shrink-0" />
                      <span>Full access to all 350+ practice questions</span>
                    </li>
                    <li className="flex items-start">
                      <Check className="h-5 w-5 text-green-400 mr-2 shrink-0" />
                      <span>Unlimited practice tests and quizzes</span>
                    </li>
                    <li className="flex items-start">
                      <Check className="h-5 w-5 text-green-400 mr-2 shrink-0" />
                      <span>Download all study materials</span>
                    </li>
                    <li className="flex items-start">
                      <Check className="h-5 w-5 text-green-400 mr-2 shrink-0" />
                      <span>Progress tracking and analytics</span>
                    </li>
                  </ul>
                </CardContent>
                <CardFooter>
                  <Button 
                    className="w-full bg-blue-600 hover:bg-blue-700"
                    onClick={() => handleSelectPlan('monthly')}
                  >
                    Select Plan
                  </Button>
                </CardFooter>
              </Card>
              
              {/* Annual Plan */}
              <Card className="bg-slate-800 border-blue-500 text-white relative hover:shadow-lg transition-all cursor-pointer">
                <div className="absolute -top-3 left-1/2 transform -translate-x-1/2 bg-blue-600 text-white px-3 py-1 rounded-full text-xs font-bold">
                  BEST VALUE
                </div>
                <CardHeader className="pb-4">
                  <CardTitle className="text-xl">Annual</CardTitle>
                  <CardDescription className="text-slate-400">
                    Save 17% compared to monthly
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="mb-4">
                    <span className="text-3xl font-bold">$199.99</span>
                    <span className="text-slate-400 ml-1">/year</span>
                  </div>
                  <ul className="space-y-2">
                    <li className="flex items-start">
                      <Check className="h-5 w-5 text-green-400 mr-2 shrink-0" />
                      <span>Everything in Monthly plan</span>
                    </li>
                    <li className="flex items-start">
                      <Check className="h-5 w-5 text-green-400 mr-2 shrink-0" />
                      <span>Priority email support</span>
                    </li>
                    <li className="flex items-start">
                      <Check className="h-5 w-5 text-green-400 mr-2 shrink-0" />
                      <span>Advanced performance analytics</span>
                    </li>
                    <li className="flex items-start">
                      <Check className="h-5 w-5 text-green-400 mr-2 shrink-0" />
                      <span>Early access to new questions</span>
                    </li>
                  </ul>
                </CardContent>
                <CardFooter>
                  <Button 
                    className="w-full bg-blue-600 hover:bg-blue-700"
                    onClick={() => handleSelectPlan('annual')}
                  >
                    Select Plan
                  </Button>
                </CardFooter>
              </Card>
              
              {/* Lifetime Plan */}
              <Card className="bg-slate-800 border-slate-700 text-white hover:border-blue-500 transition-all cursor-pointer">
                <CardHeader className="pb-4">
                  <CardTitle className="text-xl">Lifetime</CardTitle>
                  <CardDescription className="text-slate-400">
                    One-time payment, forever access
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="mb-4">
                    <span className="text-3xl font-bold">$499.99</span>
                    <span className="text-slate-400 ml-1">/lifetime</span>
                  </div>
                  <ul className="space-y-2">
                    <li className="flex items-start">
                      <Check className="h-5 w-5 text-green-400 mr-2 shrink-0" />
                      <span>Everything in Annual plan</span>
                    </li>
                    <li className="flex items-start">
                      <Check className="h-5 w-5 text-green-400 mr-2 shrink-0" />
                      <span>Lifetime access to all future updates</span>
                    </li>
                    <li className="flex items-start">
                      <Check className="h-5 w-5 text-green-400 mr-2 shrink-0" />
                      <span>Access to all AWS certification courses</span>
                    </li>
                    <li className="flex items-start">
                      <Check className="h-5 w-5 text-green-400 mr-2 shrink-0" />
                      <span>Dedicated support channel</span>
                    </li>
                  </ul>
                </CardContent>
                <CardFooter>
                  <Button 
                    className="w-full bg-blue-600 hover:bg-blue-700"
                    onClick={() => handleSelectPlan('lifetime')}
                  >
                    Select Plan
                  </Button>
                </CardFooter>
              </Card>
            </div>
          )}
          
          {/* Payment Details */}
          {paymentStep === 'payment-details' && (
            <Card className="bg-slate-800 border-slate-700 text-white">
              <CardHeader>
                <CardTitle>Payment Details</CardTitle>
                <CardDescription className="text-slate-400">
                  Complete your purchase securely
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                {/* Selected Plan Summary */}
                <div className="bg-slate-700 rounded-lg p-4">
                  <div className="flex justify-between items-center mb-2">
                    <h3 className="font-medium">
                      {selectedPlan === 'monthly' && 'Monthly Plan'}
                      {selectedPlan === 'annual' && 'Annual Plan'}
                      {selectedPlan === 'lifetime' && 'Lifetime Plan'}
                    </h3>
                    <Button 
                      variant="link" 
                      className="text-blue-400 p-0 h-auto"
                      onClick={handleBackToPlans}
                    >
                      Change
                    </Button>
                  </div>
                  <div className="text-slate-400 text-sm mb-4">
                    {selectedPlan === 'monthly' && 'Billed monthly. Cancel anytime.'}
                    {selectedPlan === 'annual' && 'Billed annually. Save 17% compared to monthly.'}
                    {selectedPlan === 'lifetime' && 'One-time payment. Lifetime access.'}
                  </div>
                  
                  {/* Price Breakdown */}
                  <div className="space-y-2 border-t border-slate-600 pt-3">
                    <div className="flex justify-between">
                      <span>Subtotal</span>
                      <span>${originalPrice.toFixed(2)}</span>
                    </div>
                    
                    {couponApplied && (
                      <div className="flex justify-between text-green-400">
                        <span>Discount ({couponCode})</span>
                        <span>-${couponDiscount.toFixed(2)}</span>
                      </div>
                    )}
                    
                    <div className="flex justify-between font-bold text-lg pt-2 border-t border-slate-600">
                      <span>Total</span>
                      <span>${finalPrice.toFixed(2)}</span>
                    </div>
                  </div>
                  
                  {/* Coupon Code */}
                  {!couponApplied ? (
                    <div className="flex gap-2 mt-3">
                      <div className="relative flex-1">
                        <Tag className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 h-4 w-4" />
                        <Input
                          placeholder="Coupon code"
                          className="bg-slate-700 border-slate-600 text-white pl-10"
                          value={couponCode}
                          onChange={(e) => setCouponCode(e.target.value.toUpperCase())}
                        />
                      </div>
                      <Button 
                        variant="outline" 
                        className="border-slate-600 text-white hover:bg-slate-700"
                        onClick={handleApplyCoupon}
                      >
                        Apply
                      </Button>
                    </div>
                  ) : (
                    <div className="flex items-center mt-3 text-green-400">
                      <CheckCircle className="h-4 w-4 mr-2" />
                      <span>Coupon {couponCode} applied</span>
                    </div>
                  )}
                </div>
                
                {/* Payment Method Tabs */}
                <Tabs defaultValue="card" className="w-full">
                  <TabsList className="bg-slate-700 border-slate-600 w-full">
                    <TabsTrigger value="card" className="flex-1 data-[state=active]:bg-slate-600">
                      <CreditCard className="h-4 w-4 mr-2" />
                      Credit Card
                    </TabsTrigger>
                    <TabsTrigger value="paypal" className="flex-1 data-[state=active]:bg-slate-600">
                      <svg className="h-4 w-4 mr-2" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M7.076 21.337H2.47a.641.641 0 0 1-.633-.74L4.944.901C5.026.382 5.474 0 5.998 0h7.46c2.57 0 4.578.543 5.69 1.81 1.01 1.15 1.304 2.42 1.012 4.287-.023.143-.047.288-.077.437-.983 5.05-4.349 6.797-8.647 6.797h-2.19c-.524 0-.968.382-1.05.9l-1.12 7.106zm14.146-14.42a3.35 3.35 0 0 0-.607-.541c-.013.076-.026.175-.041.254-.59 3.025-2.566 4.643-5.813 4.643h-2.189c-.988 0-1.829.722-1.968 1.698l-1.12 7.106c-.022.132-.004.267.05.385h3.578c.466 0 .865-.34.937-.8l.038-.227.732-4.654.047-.251c.072-.46.47-.8.937-.8h.59c3.818 0 6.803-1.549 7.676-6.036.36-1.852.174-3.398-.858-4.777z" />
                      </svg>
                      PayPal
                    </TabsTrigger>
                  </TabsList>
                  
                  {/* Credit Card Tab */}
                  <TabsContent value="card" className="mt-4">
                    <div className="space-y-4">
                      <div className="space-y-2">
                        <Label htmlFor="card-number">Card Number</Label>
                        <div className="relative">
                          <CreditCard className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 h-4 w-4" />
                          <Input
                            id="card-number"
                            placeholder="1234 5678 9012 3456"
                            className="bg-slate-700 border-slate-600 text-white pl-10 font-mono"
                            value={cardNumber}
                            onChange={(e) => setCardNumber(formatCardNumber(e.target.value))}
                            maxLength={19}
                          />
                        </div>
                      </div>
                      
                      <div className="space-y-2">
                        <Label htmlFor="card-name">Cardholder Name</Label>
                        <Input
                          id="card-name"
                          placeholder="John Doe"
                          className="bg-slate-700 border-slate-600 text-white"
                          value={cardName}
                          onChange={(e) => setCardName(e.target.value)}
                        />
                      </div>
                      
                      <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label htmlFor="card-expiry">Expiry Date</Label>
                          <Input
                            id="card-expiry"
                            placeholder="MM/YY"
                            className="bg-slate-700 border-slate-600 text-white font-mono"
                            value={cardExpiry}
                            onChange={(e) => setCardExpiry(formatCardExpiry(e.target.value))}
                            maxLength={5}
                          />
                        </div>
                        
                        <div className="space-y-2">
                          <Label htmlFor="card-cvc">CVC</Label>
                          <Input
                            id="card-cvc"
                            placeholder="123"
                            className="bg-slate-700 border-slate-600 text-white font-mono"
                            value={cardCvc}
                            onChange={(e) => setCardCvc(e.target.value.replace(/[^0-9]/g, ''))}
                            maxLength={4}
                            type="password"
                          />
                        </div>
                      </div>
                    </div>
                  </TabsContent>
                  
                  {/* PayPal Tab */}
                  <TabsContent value="paypal" className="mt-4">
                    <div className="text-center py-6">
                      <svg className="h-12 w-12 mx-auto mb-4 text-blue-400" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M7.076 21.337H2.47a.641.641 0 0 1-.633-.74L4.944.901C5.026.382 5.474 0 5.998 0h7.46c2.57 0 4.578.543 5.69 1.81 1.01 1.15 1.304 2.42 1.012 4.287-.023.143-.047.288-.077.437-.983 5.05-4.349 6.797-8.647 6.797h-2.19c-.524 0-.968.382-1.05.9l-1.12 7.106zm14.146-14.42a3.35 3.35 0 0 0-.607-.541c-.013.076-.026.175-.041.254-.59 3.025-2.566 4.643-5.813 4.643h-2.189c-.988 0-1.829.722-1.968 1.698l-1.12 7.106c-.022.132-.004.267.05.385h3.578c.466 0 .865-.34.937-.8l.038-.227.732-4.654.047-.251c.072-.46.47-.8.937-.8h.59c3.818 0 6.803-1.549 7.676-6.036.36-1.852.174-3.398-.858-4.777z" />
                      </svg>
                      <p className="text-slate-400 mb-4">
                        Click the button below to pay with PayPal. You will be redirected to PayPal to complete your purchase securely.
                      </p>
                      <Button className="bg-blue-600 hover:bg-blue-700">
                        Continue with PayPal
                      </Button>
                    </div>
                  </TabsContent>
                </Tabs>
                
                {/* Security Notice */}
                <div className="flex items-center justify-center text-sm text-slate-400">
                  <Lock className="h-4 w-4 mr-2" />
                  <span>Your payment information is secure and encrypted</span>
                </div>
              </CardContent>
              <CardFooter className="flex flex-col space-y-2">
                <Button 
                  className="w-full bg-blue-600 hover:bg-blue-700"
                  onClick={handleProcessPayment}
                >
                  Pay ${finalPrice.toFixed(2)}
                </Button>
                <Button 
                  variant="link" 
                  className="text-slate-400"
                  onClick={handleBackToPlans}
                >
                  Back to Plans
                </Button>
              </CardFooter>
            </Card>
          )}
          
          {/* Processing Payment */}
          {paymentStep === 'processing' && (
            <Card className="bg-slate-800 border-slate-700 text-white">
              <CardContent className="flex flex-col items-center justify-center py-12">
                <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-white mb-6"></div>
                <h2 className="text-xl font-bold mb-2">Processing Your Payment</h2>
                <p className="text-slate-400 text-center max-w-md">
                  Please wait while we process your payment. This may take a few moments. Do not refresh or close this page.
                </p>
              </CardContent>
            </Card>
          )}
          
          {/* Payment Success */}
          {paymentStep === 'success' && (
            <Card className="bg-slate-800 border-slate-700 text-white">
              <CardContent className="flex flex-col items-center justify-center py-12">
                <div className="bg-green-900/30 p-4 rounded-full mb-6">
                  <CheckCircle className="h-16 w-16 text-green-400" />
                </div>
                <h2 className="text-xl font-bold mb-2">Payment Successful!</h2>
                <p className="text-slate-400 text-center max-w-md mb-6">
                  Thank you for your purchase! Your premium access has been activated and you now have full access to all features and resources.
                </p>
                <div className="bg-slate-700 rounded-lg p-4 w-full max-w-md mb-6">
                  <h3 className="font-medium mb-2">Order Summary</h3>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-slate-400">Plan</span>
                      <span>
                        {selectedPlan === 'monthly' && 'Monthly Plan'}
                        {selectedPlan === 'annual' && 'Annual Plan'}
                        {selectedPlan === 'lifetime' && 'Lifetime Plan'}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-400">Order Date</span>
                      <span>{new Date().toLocaleDateString()}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-400">Order ID</span>
                      <span className="font-mono">ORD-{Math.floor(Math.random() * 1000000).toString().padStart(6, '0')}</span>
                    </div>
                    <div className="flex justify-between font-medium pt-2 border-t border-slate-600 mt-2">
                      <span>Total Paid</span>
                      <span>${finalPrice.toFixed(2)}</span>
                    </div>
                  </div>
                </div>
                <div className="flex gap-4">
                  <Button 
                    className="bg-blue-600 hover:bg-blue-700"
                    onClick={handleGoToDownloads}
                  >
                    <Download className="h-4 w-4 mr-2" />
                    Access Downloads
                  </Button>
                  <Button 
                    variant="outline" 
                    className="border-slate-600 text-white hover:bg-slate-700"
                    onClick={() => router.push('/protected')}
                  >
                    <ArrowRight className="h-4 w-4 mr-2" />
                    Go to Dashboard
                  </Button>
                </div>
              </CardContent>
            </Card>
          )}
          
          {/* Trust Badges */}
          {paymentStep !== 'success' && (
            <div className="mt-8 flex flex-wrap justify-center gap-6 text-slate-400">
              <div className="flex items-center">
                <Shield className="h-5 w-5 mr-2" />
                <span>Secure Payment</span>
              </div>
              <div className="flex items-center">
                <Lock className="h-5 w-5 mr-2" />
                <span>256-bit SSL Encryption</span>
              </div>
              <div className="flex items-center">
                <Check className="h-5 w-5 mr-2" />
                <span>Money-back Guarantee</span>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
