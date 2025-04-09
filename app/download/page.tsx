// app/download/page.tsx
"use client";

import { useState } from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { CheckCircle, Lock, CreditCard, FileDown } from 'lucide-react';

export default function DownloadResources() {
  const [paymentStatus, setPaymentStatus] = useState<'unpaid' | 'processing' | 'paid'>('unpaid');
  const [activeTab, setActiveTab] = useState('credit-card');
  const [cardNumber, setCardNumber] = useState('');
  const [cardName, setCardName] = useState('');
  const [expiryDate, setExpiryDate] = useState('');
  const [cvv, setCvv] = useState('');
  const [email, setEmail] = useState('');
  
  const filePath = '/AWSCertifiedDevOpsEngineer-Sample.pdf';
  const fileName = 'AWS-Certified-DevOps-Engineer-Professional.pdf';

  const handlePayment = (e: React.FormEvent) => {
    e.preventDefault();
    setPaymentStatus('processing');
    
    // Simulate payment processing
    setTimeout(() => {
      setPaymentStatus('paid');
    }, 1500);
  };

  return (
    <div className="container mx-auto p-4 max-w-4xl">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Premium Resources</h1>
        <Link href="/">
          <Button variant="outline" className="border-slate-600 text-white hover:bg-slate-700">
            Back to Home
          </Button>
        </Link>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="md:col-span-2">
          <Card className="bg-slate-800 border-slate-700 text-white">
            <CardHeader>
              <CardTitle>AWS DevOps Professional Resources</CardTitle>
              <CardDescription className="text-slate-300">
                Get access to our complete set of AWS DevOps Professional exam preparation materials
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <div className="flex items-start gap-2">
                  <CheckCircle className="h-5 w-5 text-green-500 mt-0.5" />
                  <div>
                    <h3 className="font-medium">Complete Question Set</h3>
                    <p className="text-sm text-slate-400">Over 350 practice questions with detailed explanations</p>
                  </div>
                </div>
                <div className="flex items-start gap-2">
                  <CheckCircle className="h-5 w-5 text-green-500 mt-0.5" />
                  <div>
                    <h3 className="font-medium">Domain-Specific Practice Tests</h3>
                    <p className="text-sm text-slate-400">Focus on specific exam domains to strengthen weak areas</p>
                  </div>
                </div>
                <div className="flex items-start gap-2">
                  <CheckCircle className="h-5 w-5 text-green-500 mt-0.5" />
                  <div>
                    <h3 className="font-medium">Exam Strategy Guide</h3>
                    <p className="text-sm text-slate-400">Tips and strategies for tackling the AWS DevOps Professional exam</p>
                  </div>
                </div>
                <div className="flex items-start gap-2">
                  <CheckCircle className="h-5 w-5 text-green-500 mt-0.5" />
                  <div>
                    <h3 className="font-medium">Printable PDF Format</h3>
                    <p className="text-sm text-slate-400">Study offline with our professionally formatted PDF resources</p>
                  </div>
                </div>
              </div>
              
              <div className="mt-6 p-4 bg-slate-700/30 rounded-lg border border-slate-600">
                <div className="flex justify-between items-center">
                  <div>
                    <h3 className="text-lg font-semibold">Premium Package</h3>
                    <p className="text-sm text-slate-400">One-time payment, lifetime access</p>
                  </div>
                  <div className="text-2xl font-bold">$19.99</div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
        
        <div className="md:col-span-1">
          {paymentStatus === 'unpaid' && (
            <Card className="bg-slate-800 border-slate-700 text-white">
              <CardHeader>
                <CardTitle className="text-lg">Secure Checkout</CardTitle>
                <CardDescription className="text-slate-300">
                  Complete your purchase to access premium resources
                </CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={handlePayment}>
                  <Tabs defaultValue="credit-card" className="w-full" onValueChange={setActiveTab}>
                    <TabsList className="grid w-full grid-cols-2 mb-4">
                      <TabsTrigger value="credit-card">Credit Card</TabsTrigger>
                      <TabsTrigger value="paypal">PayPal</TabsTrigger>
                    </TabsList>
                    
                    <TabsContent value="credit-card" className="space-y-4">
                      <div className="space-y-2">
                        <Label htmlFor="email">Email</Label>
                        <Input
                          id="email"
                          type="email"
                          placeholder="your@email.com"
                          required
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          className="bg-slate-700 border-slate-600 text-white"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="card-number">Card Number</Label>
                        <Input
                          id="card-number"
                          placeholder="1234 5678 9012 3456"
                          required
                          value={cardNumber}
                          onChange={(e) => setCardNumber(e.target.value)}
                          className="bg-slate-700 border-slate-600 text-white"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="card-name">Name on Card</Label>
                        <Input
                          id="card-name"
                          placeholder="John Doe"
                          required
                          value={cardName}
                          onChange={(e) => setCardName(e.target.value)}
                          className="bg-slate-700 border-slate-600 text-white"
                        />
                      </div>
                      <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label htmlFor="expiry">Expiry Date</Label>
                          <Input
                            id="expiry"
                            placeholder="MM/YY"
                            required
                            value={expiryDate}
                            onChange={(e) => setExpiryDate(e.target.value)}
                            className="bg-slate-700 border-slate-600 text-white"
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="cvv">CVV</Label>
                          <Input
                            id="cvv"
                            placeholder="123"
                            required
                            value={cvv}
                            onChange={(e) => setCvv(e.target.value)}
                            className="bg-slate-700 border-slate-600 text-white"
                          />
                        </div>
                      </div>
                    </TabsContent>
                    
                    <TabsContent value="paypal" className="space-y-4">
                      <div className="p-4 text-center bg-slate-700/30 rounded-lg border border-slate-600">
                        <p className="text-sm text-slate-300 mb-4">
                          You'll be redirected to PayPal to complete your purchase securely.
                        </p>
                        <div className="flex justify-center">
                          <img 
                            src="https://www.paypalobjects.com/webstatic/en_US/i/buttons/checkout-logo-large.png" 
                            alt="PayPal Checkout" 
                            className="h-10"
                          />
                        </div>
                      </div>
                    </TabsContent>
                  </Tabs>
                  
                  <Button 
                    type="submit" 
                    className="w-full mt-6 bg-blue-600 hover:bg-blue-700"
                  >
                    <CreditCard className="mr-2 h-4 w-4" />
                    Pay $19.99
                  </Button>
                </form>
              </CardContent>
              <CardFooter className="text-xs text-slate-400 flex items-center justify-center">
                <Lock className="h-3 w-3 mr-1" />
                Secure, encrypted payment processing
              </CardFooter>
            </Card>
          )}
          
          {paymentStatus === 'processing' && (
            <Card className="bg-slate-800 border-slate-700 text-white">
              <CardHeader>
                <CardTitle className="text-lg text-center">Processing Payment</CardTitle>
              </CardHeader>
              <CardContent className="flex flex-col items-center justify-center p-6">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mb-4"></div>
                <p className="text-slate-300 text-center">
                  Please wait while we process your payment...
                </p>
              </CardContent>
            </Card>
          )}
          
          {paymentStatus === 'paid' && (
            <Card className="bg-slate-800 border-slate-700 text-white">
              <CardHeader className="text-center">
                <div className="mx-auto bg-green-500/20 p-3 rounded-full w-16 h-16 flex items-center justify-center mb-4">
                  <CheckCircle className="h-8 w-8 text-green-500" />
                </div>
                <CardTitle className="text-lg">Payment Successful!</CardTitle>
                <CardDescription className="text-slate-300">
                  Thank you for your purchase
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="p-4 bg-slate-700/30 rounded-lg border border-slate-600">
                  <h3 className="font-medium mb-2">Your Premium Resources</h3>
                  <p className="text-sm text-slate-400 mb-4">
                    You now have access to all our AWS DevOps Professional exam preparation materials.
                  </p>
                  
                  <a 
                    href={filePath}
                    download={fileName}
                    className="flex items-center justify-center w-full bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition-colors"
                  >
                    <FileDown className="mr-2 h-4 w-4" />
                    Download Complete PDF
                  </a>
                </div>
                
                <p className="text-xs text-slate-400 text-center">
                  A receipt has been sent to your email address.
                </p>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
}