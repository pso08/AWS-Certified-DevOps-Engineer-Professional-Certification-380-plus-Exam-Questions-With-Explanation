'use client';

import { useState } from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '../../src/components/ui/card';
import { Button } from '../../src/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../../src/components/ui/tabs';
import { FileDown, BookOpen, FileText } from 'lucide-react';
import Link from 'next/link';

export default function StudyMaterialsPage() {
  const [activeTab, setActiveTab] = useState('pdf-materials');

  const pdfMaterials = [
    {
      id: 'aws-devops-sample',
      title: 'AWS Certified DevOps Engineer - Sample Questions',
      description: 'Official sample questions for the AWS DevOps Professional certification exam.',
      filename: 'AWSCertifiedDevOpsEngineer-Sample.pdf',
      size: '957 KB'
    }
  ];

  const additionalResources = [
    {
      id: 'aws-docs',
      title: 'AWS Documentation',
      description: 'Official AWS documentation for DevOps services and best practices.',
      url: 'https://docs.aws.amazon.com/whitepapers/latest/overview-aws-cloud-adoption-framework/devops-perspective.html'
    },
    {
      id: 'aws-devops-blog',
      title: 'AWS DevOps Blog',
      description: 'Latest articles and updates on AWS DevOps practices and services.',
      url: 'https://aws.amazon.com/blogs/devops/'
    },
    {
      id: 'aws-well-architected',
      title: 'AWS Well-Architected Framework',
      description: 'Best practices for building secure, high-performing, resilient, and efficient infrastructure.',
      url: 'https://aws.amazon.com/architecture/well-architected/'
    }
  ];

  return (
    <div className="min-h-screen bg-slate-900 text-white flex items-center justify-center p-4">
      <div className="w-full max-w-4xl mx-auto">
        <div className="mb-8 text-center">
          <h1 className="text-3xl font-bold mb-2">Study Materials</h1>
          <p className="text-slate-400">Access PDF materials and additional resources to prepare for your AWS DevOps certification</p>
        </div>

        <Tabs defaultValue="pdf-materials" className="w-full" onValueChange={setActiveTab}>
          <TabsList className="grid w-full grid-cols-2 mb-8">
            <TabsTrigger value="pdf-materials" className="text-base">
              <FileText className="mr-2 h-4 w-4" />
              PDF Materials
            </TabsTrigger>
            <TabsTrigger value="additional-resources" className="text-base">
              <BookOpen className="mr-2 h-4 w-4" />
              Additional Resources
            </TabsTrigger>
          </TabsList>

          <TabsContent value="pdf-materials" className="space-y-6">
            {pdfMaterials.map(material => (
              <Card key={material.id} className="bg-slate-800 border-slate-700 text-white">
                <CardHeader>
                  <CardTitle className="text-xl">{material.title}</CardTitle>
                  <CardDescription className="text-slate-400">{material.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center text-sm text-slate-400">
                    <FileText className="mr-2 h-4 w-4" />
                    <span>{material.filename} ({material.size})</span>
                  </div>
                </CardContent>
                <CardFooter className="flex flex-col sm:flex-row gap-3">
                  <a 
                    href={`/${material.filename}`} 
                    download
                    className="w-full sm:w-auto"
                  >
                    <Button className="w-full bg-blue-600 hover:bg-blue-700">
                      <FileDown className="mr-2 h-4 w-4" />
                      Download PDF
                    </Button>
                  </a>
                  <a 
                    href={`/${material.filename}`} 
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full sm:w-auto"
                  >
                    <Button variant="outline" className="w-full border-slate-600 text-white hover:bg-slate-700">
                      <BookOpen className="mr-2 h-4 w-4" />
                      View PDF
                    </Button>
                  </a>
                </CardFooter>
              </Card>
            ))}

            <div className="mt-8 p-6 bg-slate-800/50 rounded-lg border border-slate-700">
              <h3 className="text-lg font-medium mb-4">Practice with Interactive Tools</h3>
              <p className="text-slate-400 mb-6">
                Reinforce your knowledge with our interactive study tools designed to help you prepare for the AWS DevOps certification exam.
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <Link href="/flashcards">
                  <Button variant="outline" className="w-full border-slate-600 text-white hover:bg-slate-700 h-auto py-4">
                    <div className="flex flex-col items-center text-center">
                      <span className="text-base font-medium mb-1">Flashcards</span>
                      <span className="text-xs text-slate-400">Review key concepts with interactive flashcards</span>
                    </div>
                  </Button>
                </Link>
                <Link href="/quiz">
                  <Button variant="outline" className="w-full border-slate-600 text-white hover:bg-slate-700 h-auto py-4">
                    <div className="flex flex-col items-center text-center">
                      <span className="text-base font-medium mb-1">Practice Quiz</span>
                      <span className="text-xs text-slate-400">Test your knowledge with practice questions</span>
                    </div>
                  </Button>
                </Link>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="additional-resources" className="space-y-6">
            {additionalResources.map(resource => (
              <Card key={resource.id} className="bg-slate-800 border-slate-700 text-white">
                <CardHeader>
                  <CardTitle className="text-xl">{resource.title}</CardTitle>
                  <CardDescription className="text-slate-400">{resource.description}</CardDescription>
                </CardHeader>
                <CardFooter>
                  <a 
                    href={resource.url} 
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full sm:w-auto"
                  >
                    <Button className="w-full bg-blue-600 hover:bg-blue-700">
                      Visit Resource
                    </Button>
                  </a>
                </CardFooter>
              </Card>
            ))}
          </TabsContent>
        </Tabs>

        <div className="mt-8 text-center">
          <Link href="/">
            <Button variant="outline" className="border-slate-600 text-white hover:bg-slate-700">
              Back to Home
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
