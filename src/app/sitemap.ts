import type { MetadataRoute } from 'next'

export default function sitemap(): MetadataRoute.Sitemap {
  const vercelHost = process.env.VERCEL_PROJECT_PRODUCTION_URL || process.env.VERCEL_URL
  const base = process.env.NEXT_PUBLIC_SERVER_URL || (vercelHost ? `https://${vercelHost}` : 'http://localhost:3000')
  const routes = ['', '/internet', '/fiber-internet', '/tv', '/mobile', '/bundles', '/providers', '/about', '/contact']
  return routes.map((route) => ({ url: `${base}${route}`, lastModified: new Date(), changeFrequency: route === '' ? 'daily' : 'weekly', priority: route === '' ? 1 : 0.7 }))
}
