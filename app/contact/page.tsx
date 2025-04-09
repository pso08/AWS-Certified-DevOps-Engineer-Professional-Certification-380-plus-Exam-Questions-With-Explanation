'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { User, Mail, Phone, Send, CheckCircle } from 'lucide-react';

export default function ContactPage() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [note, setNote] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate form submission
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSubmitted(true);
      
      // Reset form
      setName('');
      setEmail('');
      setPhoneNumber('');
      setNote('');
    }, 1500);
  };
  
  return (
    <div className="min-h-screen bg-slate-900 text-white flex items-center justify-center p-4">
      <div className="w-full max-w-3xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold">Contact Me</h1>
          <Link href="/">
            <Button variant="outline" className="border-slate-600 text-white hover:bg-slate-700">
              Back to Home
            </Button>
          </Link>
        </div>
        
        <Card className="bg-slate-800 border-slate-700 text-white">
          <CardHeader>
            <CardTitle>Get in Touch</CardTitle>
            <CardDescription className="text-slate-300">
              Fill out the form below to send me a message. I'll get back to you as soon as possible.
            </CardDescription>
          </CardHeader>
          
          {!isSubmitted ? (
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="space-y-2">
                  <Label htmlFor="name" className="text-white">
                    Name <span className="text-red-500">*</span>
                  </Label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                      <User className="h-4 w-4 text-slate-400" />
                    </div>
                    <Input
                      id="name"
                      placeholder="Your full name"
                      required
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      className="bg-slate-700 border-slate-600 text-white pl-10"
                    />
                  </div>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="email" className="text-white">
                    Email <span className="text-red-500">*</span>
                  </Label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                      <Mail className="h-4 w-4 text-slate-400" />
                    </div>
                    <Input
                      id="email"
                      type="email"
                      placeholder="your@email.com"
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="bg-slate-700 border-slate-600 text-white pl-10"
                    />
                  </div>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="phone" className="text-white">
                    Phone Number <span className="text-slate-400 text-sm">(Optional)</span>
                  </Label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                      <Phone className="h-4 w-4 text-slate-400" />
                    </div>
                    <Input
                      id="phone"
                      type="tel"
                      placeholder="+1 (123) 456-7890"
                      value={phoneNumber}
                      onChange={(e) => setPhoneNumber(e.target.value)}
                      className="bg-slate-700 border-slate-600 text-white pl-10"
                    />
                  </div>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="note" className="text-white">
                    Note <span className="text-red-500">*</span>
                  </Label>
                  <Textarea
                    id="note"
                    placeholder="Your message or inquiry..."
                    required
                    value={note}
                    onChange={(e) => setNote(e.target.value)}
                    className="bg-slate-700 border-slate-600 text-white min-h-[150px]"
                  />
                </div>
                
                <Button 
                  type="submit" 
                  className="w-full bg-blue-600 hover:bg-blue-700"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? (
                    <>
                      <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                      Sending...
                    </>
                  ) : (
                    <>
                      <Send className="mr-2 h-4 w-4" />
                      Send Message
                    </>
                  )}
                </Button>
              </form>
            </CardContent>
          ) : (
            <CardContent className="py-10">
              <div className="flex flex-col items-center justify-center text-center space-y-4">
                <div className="bg-green-500/20 p-3 rounded-full w-16 h-16 flex items-center justify-center mb-2">
                  <CheckCircle className="h-8 w-8 text-green-500" />
                </div>
                <h3 className="text-xl font-semibold">Message Sent!</h3>
                <p className="text-slate-300 max-w-md">
                  Thank you for reaching out. I've received your message and will get back to you as soon as possible.
                </p>
                <Button 
                  onClick={() => setIsSubmitted(false)} 
                  className="mt-4 bg-blue-600 hover:bg-blue-700"
                >
                  Send Another Message
                </Button>
              </div>
            </CardContent>
          )}
          
          <CardFooter className="flex flex-col space-y-4 border-t border-slate-700 pt-6">
            <div className="text-center text-sm text-slate-400">
              <p>You can also reach me directly via:</p>
            </div>
            <div className="flex flex-col sm:flex-row gap-3 justify-center w-full">
              <Button variant="outline" className="border-slate-600 text-white hover:bg-slate-700 w-full sm:w-auto">
                <Mail className="mr-2 h-4 w-4" />
                Email
              </Button>
              <Button variant="outline" className="border-slate-600 text-white hover:bg-slate-700 w-full sm:w-auto">
                <Phone className="mr-2 h-4 w-4" />
                Phone
              </Button>
            </div>
          </CardFooter>
        </Card>
        
        <div className="mt-8 text-center">
          <Link href="/privacy-policy">
            <Button variant="outline" className="border-slate-600 text-white hover:bg-slate-700">
              Privacy Policy
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
