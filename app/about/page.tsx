'use client';

import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { User, Mail, Phone, Github, Linkedin, FileText } from 'lucide-react';

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-slate-900 text-white flex items-center justify-center p-4">
      <div className="w-full max-w-4xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold">About Me</h1>
          <Link href="/">
            <Button variant="outline" className="border-slate-600 text-white hover:bg-slate-700">
              Back to Home
            </Button>
          </Link>
        </div>
        
        <Card className="bg-slate-800 border-slate-700 text-white mb-8">
          <CardHeader>
            <CardTitle>Professional Profile</CardTitle>
            <CardDescription className="text-slate-300">
              AWS DevOps Engineer
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="space-y-4">
              <p className="text-slate-300 leading-relaxed">
                Purposeful professional with a solid grasp of cloud architecture and DevOps principles,
                supported practical experience in architecting, building, and managing cloud infrastructure
                alongside implementing automation solutions.
              </p>
              
              <p className="text-slate-300 leading-relaxed">
                Proficient in key areas, including CI/CD, infrastructure as code, hybrid cloud environments, 
                and effective cross-team collaboration.
              </p>
              
              <p className="text-slate-300 leading-relaxed">
                Actively seeking employment opportunities in DevOps to leverage and enhance skills in
                automation, scalable architecture design, and the seamless integration of cloud services with
                on-premises systems.
              </p>
              
              <p className="text-slate-300 leading-relaxed">
                Eager to contribute to and thrive within a dynamic professional environment, actively expanding expertise.
              </p>
            </div>
            
            <div className="pt-4 border-t border-slate-700">
              <h3 className="text-lg font-semibold mb-4">Core Skills</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                <div className="bg-slate-700/50 p-3 rounded-lg">
                  <span className="font-medium">Cloud Architecture</span>
                </div>
                <div className="bg-slate-700/50 p-3 rounded-lg">
                  <span className="font-medium">AWS Services</span>
                </div>
                <div className="bg-slate-700/50 p-3 rounded-lg">
                  <span className="font-medium">CI/CD Pipelines</span>
                </div>
                <div className="bg-slate-700/50 p-3 rounded-lg">
                  <span className="font-medium">Infrastructure as Code</span>
                </div>
                <div className="bg-slate-700/50 p-3 rounded-lg">
                  <span className="font-medium">Containerization</span>
                </div>
                <div className="bg-slate-700/50 p-3 rounded-lg">
                  <span className="font-medium">Automation</span>
                </div>
                <div className="bg-slate-700/50 p-3 rounded-lg">
                  <span className="font-medium">Monitoring & Logging</span>
                </div>
                <div className="bg-slate-700/50 p-3 rounded-lg">
                  <span className="font-medium">Security Best Practices</span>
                </div>
              </div>
            </div>
          </CardContent>
          <CardFooter className="flex flex-col sm:flex-row gap-3 justify-center border-t border-slate-700 pt-6">
            <Button variant="outline" className="border-slate-600 text-white hover:bg-slate-700 w-full sm:w-auto">
              <Linkedin className="mr-2 h-4 w-4" />
              LinkedIn
            </Button>
            <Button variant="outline" className="border-slate-600 text-white hover:bg-slate-700 w-full sm:w-auto">
              <Github className="mr-2 h-4 w-4" />
              GitHub
            </Button>
            <Button variant="outline" className="border-slate-600 text-white hover:bg-slate-700 w-full sm:w-auto">
              <FileText className="mr-2 h-4 w-4" />
              Resume
            </Button>
          </CardFooter>
        </Card>
        
        <div className="flex justify-between items-center mt-8">
          <Link href="/contact">
            <Button className="bg-blue-600 hover:bg-blue-700">
              Contact Me
            </Button>
          </Link>
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
