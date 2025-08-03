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
          '/*?*', // Disallow URLs with query parameters to avoid duplicate content
        ],
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
        ],
      },
    ],
    sitemap: 'https://gogethire.com/sitemap.xml',
    host: 'https://gogethire.com',
  }
}
