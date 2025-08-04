/** @type {import('next').NextConfig} */
const nextConfig = {
  // Production optimizations
  reactStrictMode: true,
  swcMinify: true,
  
  // Output configuration for static export (if needed)
  output: 'standalone',
  
  // Image optimization for production
  images: {
    domains: ['images.unsplash.com', 'cdn.builder.io'],
    formats: ['image/webp', 'image/avif'],
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
  
  // Development optimizations (only apply in dev)
  ...(process.env.NODE_ENV === 'development' && {
    experimental: {
      // Reduce memory usage and improve HMR performance
      optimizePackageImports: ['@heroicons/react'],
    },
    
    webpack: (config, { dev, isServer }) => {
      if (dev && !isServer) {
        // Reduce HMR noise and improve stability
        config.watchOptions = {
          poll: 1000,
          aggregateTimeout: 300,
        }
        
        // Ignore analytics and tracking scripts during development
        config.externals = config.externals || []
        config.externals.push({
          'fullstory': 'FullStory',
          'google-analytics': 'ga',
          'gtag': 'gtag'
        })
      }
      
      return config
    },
    
    // Disable strict mode in development to prevent double rendering issues
    reactStrictMode: false,
  }),
  
  // General configurations
  poweredByHeader: false,
  
  // Headers for better SEO and security
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
  },
  
  // Redirects for better SEO
  async redirects() {
    return [
      {
        source: '/home',
        destination: '/',
        permanent: true,
      },
    ]
  },
}

module.exports = nextConfig
