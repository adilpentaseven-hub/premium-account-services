import type { MetadataRoute } from 'next'

export default function robots(): MetadataRoute.Robots {
  const vercelHost = process.env.VERCEL_PROJECT_PRODUCTION_URL || process.env.VERCEL_URL
  const base = process.env.NEXT_PUBLIC_SERVER_URL || (vercelHost ? `https://${vercelHost}` : 'http://localhost:3000')
  return {
    rules: [{ userAgent: '*', allow: '/', disallow: ['/admin/', '/api/'] }],
    sitemap: `${base}/sitemap.xml`,
  }
}
