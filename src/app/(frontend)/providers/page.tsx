import type { Metadata } from 'next'
import { ProviderCard } from '@/components/ProviderCard'
import { getFeaturedProviders } from '@/lib/cms'

export const dynamic = 'force-dynamic'
export const metadata: Metadata = { title: 'Internet and TV Providers' }

export default async function ProvidersPage() {
  const providers = await getFeaturedProviders()
  return (
    <section className="mx-auto max-w-7xl px-4 py-16 lg:px-8">
      <div className="max-w-3xl"><h1 className="text-4xl font-black">Internet and home service providers</h1><p className="mt-4 text-lg leading-8 text-slate-600">Compare provider technologies and plan characteristics. Final availability and pricing must be verified for the exact service address.</p></div>
      <div className="mt-10 grid gap-6 md:grid-cols-2 lg:grid-cols-3">{providers.map((provider: any) => <ProviderCard key={provider.id} provider={provider} />)}</div>
    </section>
  )
}
