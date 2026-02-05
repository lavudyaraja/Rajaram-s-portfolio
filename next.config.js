/** @type {import('next').NextConfig} */
const nextConfig = {
  // Use static exports for better compatibility with Vercel
  output: 'export',
  
  // Optional: Add basePath if your site is served from a subdirectory
  // basePath: '/your-base-path',
  
  // Disable Turbopack for production builds
  experimental: {
    turbo: process.env.NODE_ENV === 'development' ? { root: __dirname } : undefined,
  },
  
  reactStrictMode: true,
  
  // Image optimization configuration
  images: {
    unoptimized: true, // Required for static exports
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
      },
      {
        protocol: 'http',
        hostname: 'localhost',
      },
    ],
  },
}

export default nextConfig
