/** @type {import('next').NextConfig} */
const nextConfig = {
  // Vercel optimizations
  images: {
    domains: ['images.unsplash.com', 'cdn.builder.io'],
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'cdn.builder.io',
        pathname: '/api/v1/image/assets/**',
      },
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
        pathname: '/**',
      }
    ]
  },
  
  // Redirects for domain management
  async redirects() {
    return [
      // Redirect apex domain to www subdomain
      {
        source: '/(.*)',
        has: [
          {
            type: 'host',
            value: 'gogethires.com',
          },
        ],
        destination: 'https://www.gogethires.com/:path*',
        permanent: true,
      },
      // Keep existing redirect
      {
        source: '/home',
        destination: '/',
        permanent: true,
      },
    ]
  },

  // Remove development-only components
  ...(process.env.NODE_ENV === 'production' && {
    compiler: {
      removeConsole: {
        exclude: ['error'],
      },
    },
  }),
}

module.exports = nextConfig
