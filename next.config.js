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
