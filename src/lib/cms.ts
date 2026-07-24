import config from '@payload-config'
import { getPayload } from 'payload'

export const demoProviders = [
  {
    id: 'demo-att',
    name: 'AT&T',
    slug: 'att',
    shortDescription: 'Fiber and home internet options with availability varying by address.',
    startingPrice: 55,
    maxDownloadSpeed: 5000,
    connectionTypes: ['fiber', 'dsl'],
    featured: true,
  },
  {
    id: 'demo-spectrum',
    name: 'Spectrum',
    slug: 'spectrum',
    shortDescription: 'Cable and fiber-powered internet, TV and mobile services in eligible areas.',
    startingPrice: 50,
    maxDownloadSpeed: 2000,
    connectionTypes: ['cable', 'fiber'],
    featured: true,
  },
  {
    id: 'demo-viasat',
    name: 'Viasat',
    slug: 'viasat',
    shortDescription: 'Satellite internet designed for locations with limited wired options.',
    startingPrice: 50,
    maxDownloadSpeed: 150,
    connectionTypes: ['satellite'],
    featured: true,
  },
]

export const demoPlans = [
  {
    id: 'demo-plan-1',
    name: 'Fiber Internet 300',
    promotionalPrice: 55,
    downloadSpeed: 300,
    uploadSpeed: 300,
    technology: 'fiber',
    disclaimer: 'Illustrative starter data. Replace with authorized, verified provider pricing before launch.',
    provider: demoProviders[0],
  },
  {
    id: 'demo-plan-2',
    name: 'Internet Premier',
    promotionalPrice: 50,
    downloadSpeed: 500,
    uploadSpeed: 20,
    technology: 'cable',
    disclaimer: 'Illustrative starter data. Replace with authorized, verified provider pricing before launch.',
    provider: demoProviders[1],
  },
  {
    id: 'demo-plan-3',
    name: 'Satellite Internet',
    promotionalPrice: 50,
    downloadSpeed: 150,
    technology: 'satellite',
    disclaimer: 'Illustrative starter data. Replace with authorized, verified provider pricing before launch.',
    provider: demoProviders[2],
  },
]

export async function getFeaturedProviders() {
  try {
    const payload = await getPayload({ config })
    const result = await payload.find({
      collection: 'providers',
      where: { status: { equals: 'active' } },
      sort: '-featured',
      limit: 12,
      depth: 1,
    })
    return result.docs.length ? result.docs : demoProviders
  } catch {
    return demoProviders
  }
}

export async function getFeaturedPlans() {
  try {
    const payload = await getPayload({ config })
    const result = await payload.find({
      collection: 'plans',
      where: { status: { equals: 'active' } },
      sort: '-featured',
      limit: 8,
      depth: 1,
    })
    return result.docs.length ? result.docs : demoPlans
  } catch {
    return demoPlans
  }
}

export async function getProviderBySlug(slug: string) {
  try {
    const payload = await getPayload({ config })
    const result = await payload.find({
      collection: 'providers',
      where: { slug: { equals: slug } },
      limit: 1,
      depth: 1,
    })
    return result.docs[0] || demoProviders.find((item) => item.slug === slug) || null
  } catch {
    return demoProviders.find((item) => item.slug === slug) || null
  }
}

export async function getPlansByProvider(providerID: string | number) {
  if (String(providerID).startsWith('demo-')) {
    return demoPlans.filter((plan) => String((plan.provider as { id: string }).id) === String(providerID))
  }
  try {
    const payload = await getPayload({ config })
    const result = await payload.find({
      collection: 'plans',
      where: {
        and: [
          { provider: { equals: providerID } },
          { status: { equals: 'active' } },
        ],
      },
      limit: 20,
      depth: 1,
    })
    return result.docs
  } catch {
    return []
  }
}

export async function getPlansForZip(zip: string) {
  if (!/^\d{5}$/.test(zip)) return []
  try {
    const payload = await getPayload({ config })
    const areas = await payload.find({
      collection: 'service-areas',
      where: { zipCode: { equals: zip } },
      limit: 100,
      depth: 1,
    })

    const explicitPlans = areas.docs
      .map((area) => area.plan)
      .filter((plan) => plan && typeof plan === 'object')

    if (explicitPlans.length) return explicitPlans

    const providerIDs = Array.from(
      new Set(
        areas.docs
          .map((area) => (typeof area.provider === 'object' ? area.provider.id : area.provider))
          .filter(Boolean),
      ),
    )

    if (!providerIDs.length) return demoPlans

    const plans = await payload.find({
      collection: 'plans',
      where: {
        and: [
          { provider: { in: providerIDs } },
          { status: { equals: 'active' } },
        ],
      },
      limit: 100,
      depth: 1,
    })
    return plans.docs.length ? plans.docs : demoPlans
  } catch {
    return demoPlans
  }
}
