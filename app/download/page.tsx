// app/download/page.tsx
"use client";

export default function DownloadSample() {
  // Define the correct file path (relative to public directory)
  const filePath = '/AWSCertifiedDevOpsEngineer-Sample/sample.pdf';
  const fileName = 'AWS-Certified-DevOps-Engineer-Sample-Questions.pdf';

  return (
    <div className="container mx-auto p-4 max-w-3xl">
      <h1 className="text-2xl font-bold mb-4">Download Sample PDF</h1>
      <p className="mb-6 text-gray-700">
        Download our sample AWS Certified DevOps Engineer Professional exam questions PDF.
      </p>

      {/* Download link */}
      <a
        href={filePath}
        className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors inline-block"
        download={fileName}
      >
        Download Sample PDF
      </a>

      {/* File details */}
      <div className="mt-6 p-4 bg-gray-100 rounded-lg">
        <p className="text-sm text-gray-600">
          <strong>File details:</strong> {fileName} (PDF format)
        </p>
        <p className="text-sm text-gray-600 mt-2">
          <strong>Location:</strong> public{filePath}
        </p>
      </div>
    </div>
  );
}