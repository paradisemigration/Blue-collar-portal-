/** @type {import('next').NextConfig} */
// Alternative configuration for static export (if Node.js isn't available)
const nextConfig = {
  // Enable static export
  output: 'export',
  
  // Add trailing slash for better compatibility
  trailingSlash: true,
  
  // Disable image optimization for static export
  images: {
    unoptimized: true,
    domains: ['images.unsplash.com', 'cdn.builder.io'],
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'cdn.builder.io',
        port: '',
        pathname: '/api/v1/image/assets/**',
      },
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
        port: '',
        pathname: '/**',
      }
    ]
  },
  
  // Compress output
  compress: true,
  
  // Remove console logs in production
  compiler: {
    removeConsole: {
      exclude: ['error'],
    },
  },
  
  // Disable server-side features for static export
  experimental: {
    appDir: true
  },
  
  // Headers for better SEO and security (will be handled by .htaccess)
  async headers() {
    return [
      {
        source: '/(.*)',
        headers: [
          {
            key: 'X-Content-Type-Options',
            value: 'nosniff',
          },
          {
            key: 'X-XSS-Protection',
            value: '1; mode=block',
          },
          {
            key: 'Referrer-Policy',
            value: 'strict-origin-when-cross-origin',
          },
        ],
      },
    ]
  }
}

module.exports = nextConfig
