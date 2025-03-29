// app/download/page.tsx
import { existsSync } from 'fs';
import path from 'path';

export default function DownloadSample() {
  // Define the correct file path (relative to public directory)
  const filePath = '/AWSCertifiedDevOpsEngineer-Sample/sample.pdf';
  const fileName = 'AWS-Certified-DevOps-Engineer-Sample-Questions.pdf';

  // In production, we can't use fs, so we'll assume the file exists
  // In development, we can check if the file exists
  let fileExists = true;
  if (process.env.NODE_ENV === 'development') {
    try {
      const fullPath = path.join(process.cwd(), 'public', filePath);
      fileExists = existsSync(fullPath);
    } catch (error) {
      fileExists = false;
    }
  }

  return (
    <div className="container mx-auto p-4 max-w-3xl">
      <h1 className="text-2xl font-bold mb-4">Download Sample PDF</h1>
      <p className="mb-6 text-gray-700">
        Download our sample AWS Certified DevOps Engineer Professional exam questions PDF.
      </p>

      {fileExists ? (
        <a
          href={filePath}
          className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors inline-block"
          download={fileName}
        >
          Download Sample PDF
        </a>
      ) : (
        <div className="bg-red-50 border-l-4 border-red-500 p-4 mb-4">
          <p className="text-red-700">
            Error: The sample file is not available at the expected location.
            <br />
            Expected path: <code>public{filePath}</code>
          </p>
        </div>
      )}

      <div className="mt-6 p-4 bg-gray-100 rounded-lg">
        <p className="text-sm text-gray-600">
          <strong>File details:</strong> {fileName} (PDF format)
        </p>
      </div>
    </div>
  );
}