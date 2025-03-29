// app/download/page.tsx
import Link from 'next/link';

export default function DownloadSample() {
  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Download Sample PDF</h1>
      <p className="mb-4">
        Download our sample AWS Certified DevOps Engineer Professional exam questions PDF:
      </p>
      <Link 
        href="/AWSCertifiedDevOpsEngineer-Sample/sample.pdf"
        className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
        download
      >
        Download Sample PDF
      </Link>
    </div>
  );
}