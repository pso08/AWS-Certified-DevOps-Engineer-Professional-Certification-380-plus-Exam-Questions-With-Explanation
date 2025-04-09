'use client';

import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { ArrowLeft, Shield } from 'lucide-react';

export default function PrivacyPolicyPage() {
  return (
    <div className="min-h-screen bg-slate-900 text-white p-4">
      <div className="container mx-auto max-w-4xl">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold flex items-center">
            <Shield className="mr-2 h-6 w-6" />
            Privacy Policy
          </h1>
          <Link href="/">
            <Button variant="outline" className="border-slate-600 text-white hover:bg-slate-700">
              Back to Home
            </Button>
          </Link>
        </div>
        
        <Card className="bg-slate-800 border-slate-700 text-white mb-8">
          <CardHeader>
            <CardTitle>Privacy Policy</CardTitle>
            <CardDescription className="text-slate-300">
              Effective Date: March 2025
            </CardDescription>
          </CardHeader>
          <CardContent className="prose prose-invert max-w-none">
            <p>
              This Privacy Policy describes how [Your App Name] ("we," "us," or "our") collects, uses, and discloses your information when you use our application (the "App"), designed to help you prepare for the AWS Certified DevOps Professional exam. By accessing or using the App, you agree to the collection and use of information in accordance with this Privacy Policy.
            </p>
            
            <h2 className="text-xl font-semibold mt-6 mb-3">1. Information We Collect</h2>
            
            <h3 className="text-lg font-medium mt-4 mb-2">1.1 Personal Information</h3>
            <p>
              When you use our App, we may collect personally identifiable information ("Personal Information") that you voluntarily provide. This may include, but is not limited to:
            </p>
            <ul className="list-disc pl-6 space-y-1 mb-4">
              <li>Account Information: Your name, email address, username, password, and other registration details.</li>
              <li>Profile Information: Any additional details you choose to provide while setting up or updating your account.</li>
              <li>Communication Data: Any information you send to us through support inquiries, feedback forms, or other communications.</li>
            </ul>
            
            <h3 className="text-lg font-medium mt-4 mb-2">1.2 Non-Personal Information</h3>
            <p>
              We also automatically collect non-personal information that does not directly identify you. This includes:
            </p>
            <ul className="list-disc pl-6 space-y-1 mb-4">
              <li>Usage Data: Information about how you interact with the App, such as pages visited, features used, and other activities.</li>
              <li>Device Information: Device type, operating system, browser type, IP address, and usage patterns.</li>
              <li>Cookies and Tracking: Data collected through cookies and similar tracking technologies (see Section 4).</li>
            </ul>
            
            <h2 className="text-xl font-semibold mt-6 mb-3">2. How We Use Your Information</h2>
            <p>
              We use your information for several purposes, including:
            </p>
            <ul className="list-disc pl-6 space-y-3 mb-4">
              <li>
                <strong>To Provide and Improve Our Service:</strong><br />
                Delivering the App and its features to you, troubleshooting issues, and enhancing user experience.
              </li>
              <li>
                <strong>Account Management:</strong><br />
                Creating and managing your account and communicating with you about account-related activities and updates.
              </li>
              <li>
                <strong>Personalization:</strong><br />
                Tailoring the App content and study materials to your preferences and progress.
              </li>
              <li>
                <strong>Communication:</strong><br />
                Sending announcements, updates, newsletters, and promotional materials (if you opt in).
              </li>
              <li>
                <strong>Analytics and Research:</strong><br />
                Analyzing user behavior and usage patterns to improve the App's functionality and performance.
              </li>
            </ul>
            
            <h2 className="text-xl font-semibold mt-6 mb-3">3. Data Sharing and Disclosure</h2>
            <p>
              We value your privacy and do not sell your personal information. However, we may share information in the following circumstances:
            </p>
            <ul className="list-disc pl-6 space-y-3 mb-4">
              <li>
                <strong>Service Providers:</strong><br />
                With third-party vendors and service providers who perform services on our behalf (e.g., hosting, data analysis, customer support). These partners are obligated to use your information only to provide services to us.
              </li>
              <li>
                <strong>Legal Compliance:</strong><br />
                When required by law, regulation, or legal process, or to protect the rights, property, or safety of our users, our company, or others.
              </li>
              <li>
                <strong>Business Transfers:</strong><br />
                In connection with, or during negotiations of, any merger, sale of company assets, financing, or acquisition of all or a portion of our business.
              </li>
              <li>
                <strong>Consent:</strong><br />
                With your consent or at your direction.
              </li>
            </ul>
            
            <h2 className="text-xl font-semibold mt-6 mb-3">4. Cookies and Tracking Technologies</h2>
            <p>
              We use cookies, web beacons, and similar tracking technologies to collect data about your interactions with our App. You can control cookie preferences through your browser settings; however, disabling cookies may affect your ability to use certain features of the App.
            </p>
            
            <h2 className="text-xl font-semibold mt-6 mb-3">5. Data Security</h2>
            <p>
              We implement and maintain commercially reasonable security measures to protect your information from unauthorized access, disclosure, alteration, and destruction. While we strive to protect your data, no method of transmission over the internet or electronic storage is completely secure, and we cannot guarantee absolute security.
            </p>
            
            <h2 className="text-xl font-semibold mt-6 mb-3">6. Third-Party Links and Services</h2>
            <p>
              Our App may contain links to third-party websites or services that are not governed by this Privacy Policy. We encourage you to review the privacy policies of these third parties. We are not responsible for the content, privacy practices, or security of any third-party sites or services.
            </p>
            
            <h2 className="text-xl font-semibold mt-6 mb-3">7. User Rights and Choices</h2>
            <p>
              Depending on your jurisdiction, you may have certain rights regarding your personal data, including the right to:
            </p>
            <ul className="list-disc pl-6 space-y-1 mb-4">
              <li>Access: Request access to the personal data we have collected about you.</li>
              <li>Correction: Request that we correct any inaccuracies in your personal data.</li>
              <li>Deletion: Request that we delete your personal data, subject to certain exceptions.</li>
              <li>Objection/Restriction: Object to or request restrictions on our processing of your data.</li>
              <li>Data Portability: Request the transfer of your information to another organization.</li>
            </ul>
            <p>
              To exercise these rights, please contact us using the contact information provided below. We will respond to your request in accordance with applicable law.
            </p>
            
            <h2 className="text-xl font-semibold mt-6 mb-3">8. Data Retention</h2>
            <p>
              We will retain your personal information for as long as necessary to fulfill the purposes for which it was collected, including for the purposes of satisfying any legal, accounting, or reporting requirements. When the data is no longer required, we will securely delete or anonymize it.
            </p>
            
            <h2 className="text-xl font-semibold mt-6 mb-3">9. Children's Privacy</h2>
            <p>
              Our App is not directed toward children under the age of 13. We do not knowingly collect personal information from children under 13. If you believe that we have inadvertently collected such information, please contact us immediately so that we can take appropriate steps to delete it.
            </p>
            
            <h2 className="text-xl font-semibold mt-6 mb-3">10. International Data Transfers</h2>
            <p>
              If you are accessing our App from outside your home country, please note that your information may be transferred to and maintained on computers located in jurisdictions that may not offer the same level of data protection as your jurisdiction. By using the App, you consent to such transfers and the processing of your data in accordance with this Privacy Policy.
            </p>
            
            <h2 className="text-xl font-semibold mt-6 mb-3">11. Changes to This Privacy Policy</h2>
            <p>
              We may update our Privacy Policy from time to time. Any changes will be posted on this page with an updated "Effective Date." We encourage you to review this Privacy Policy periodically to stay informed about how we are protecting your information.
            </p>
            
            <h2 className="text-xl font-semibold mt-6 mb-3">12. Contact Information</h2>
            <p>
              If you have any questions, concerns, or requests regarding this Privacy Policy or our data practices, please contact us using the contact form or write us an email.
            </p>
            <ul className="list-disc pl-6 space-y-1 mb-4">
              <li>Email: admin@duinx.com</li>
              <li>Address: Dallas Texas, 75231</li>
            </ul>
          </CardContent>
          <CardFooter className="flex justify-between border-t border-slate-700 pt-6">
            <Link href="/contact">
              <Button variant="outline" className="border-slate-600 text-white hover:bg-slate-700">
                <ArrowLeft className="mr-2 h-4 w-4" />
                Contact Us
              </Button>
            </Link>
            <Link href="/">
              <Button className="bg-blue-600 hover:bg-blue-700">
                Back to Home
              </Button>
            </Link>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
}
