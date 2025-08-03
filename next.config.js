/** @type {import('next').NextConfig} */
const nextConfig = {
  // Improve development experience
  experimental: {
    // Reduce memory usage and improve HMR performance
    optimizePackageImports: ['@heroicons/react'],
  },
  
  // Development optimizations
  ...(process.env.NODE_ENV === 'development' && {
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
  
  // Production optimizations
  ...(process.env.NODE_ENV === 'production' && {
    reactStrictMode: true,
    swcMinify: true,
    
    // Optimize images
    images: {
      domains: ['images.unsplash.com'],
      formats: ['image/webp'],
    },
    
    // Compress output
    compress: true,
    
    // Remove console logs in production
    compiler: {
      removeConsole: {
        exclude: ['error'],
      },
    },
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
            key: 'X-Frame-Options',
            value: 'DENY',
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
