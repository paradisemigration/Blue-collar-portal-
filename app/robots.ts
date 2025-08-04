import { MetadataRoute } from 'next'

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        disallow: [
          '/admin/',
          '/admin-login/',
          '/dashboard/',
          '/edit-profile/',
          '/profile-preview/',
          '/api/',
          '/*?*', // Disallow URLs with query parameters to avoid duplicate content
        ],
        crawlDelay: 1, // Be respectful to server resources
      },
      {
        userAgent: 'Googlebot',
        allow: '/',
        disallow: [
          '/admin/',
          '/admin-login/',
          '/dashboard/',
          '/edit-profile/',
          '/profile-preview/',
          '/api/',
        ],
        crawlDelay: 0.5, // Faster for Google
      },
      {
        userAgent: 'Bingbot',
        allow: '/',
        disallow: [
          '/admin/',
          '/admin-login/',
          '/dashboard/',
          '/edit-profile/',
          '/profile-preview/',
          '/api/',
        ],
        crawlDelay: 1,
      },
    ],
    sitemap: 'https://www.gogethires.com/sitemap.xml',
    host: 'https://www.gogethires.com',
  }
}
