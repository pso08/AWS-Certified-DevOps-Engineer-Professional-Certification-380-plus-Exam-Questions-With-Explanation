/** @type {import('next').NextConfig} */
const nextConfig = {
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  // Using standard Next.js output directory for better compatibility
  // with both local development and Cloudflare Pages
  distDir: ".next",
  // Removed "output: export" to allow dynamic API routes
  images: {
    unoptimized: true, // Required for Cloudflare Pages
  },
  // Added experimental serverActions for better form handling
  experimental: {
    serverActions: true,
  },
};

module.exports = nextConfig;
