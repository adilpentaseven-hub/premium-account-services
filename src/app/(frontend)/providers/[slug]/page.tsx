import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { PlanCard } from '@/components/PlanCard'
import { ZipSearch } from '@/components/ZipSearch'
import { getPlansByProvider, getProviderBySlug } from '@/lib/cms'

export const dynamic = 'force-dynamic'

type Props = { params: Promise<{ slug: string }> }

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  const provider: any = await getProviderBySlug(slug)
  if (!provider) return { title: 'Provider not found' }
  return {
    title: provider.seo?.title || `${provider.name} Plans, Pricing and Availability`,
    description: provider.seo?.description || provider.shortDescription,
  }
}

export default async function ProviderPage({ params }: Props) {
  const { slug } = await params
  const provider: any = await getProviderBySlug(slug)
  if (!provider) notFound()
  const plans = await getPlansByProvider(provider.id)

  return (
    <>
      <section className="bg-slate-950 text-white">
        <div className="mx-auto max-w-7xl px-4 py-16 lg:px-8">
          <div className="text-sm font-bold uppercase tracking-wider text-cyan-300">Provider overview</div>
          <h1 className="mt-3 text-4xl font-black sm:text-5xl">{provider.name} plans and availability</h1>
          <p className="mt-5 max-w-3xl text-lg leading-8 text-slate-300">{provider.shortDescription}</p>
          <div className="mt-8"><ZipSearch compact /></div>
        </div>
      </section>
      <section className="mx-auto max-w-7xl px-4 py-16 lg:px-8">
        <div className="grid gap-6 md:grid-cols-3">
          <div className="rounded-2xl border border-slate-200 bg-white p-6"><div className="text-sm text-slate-500">Starting price</div><div className="mt-2 text-3xl font-black">{provider.startingPrice ? `$${provider.startingPrice}/mo.` : 'Varies'}</div></div>
          <div className="rounded-2xl border border-slate-200 bg-white p-6"><div className="text-sm text-slate-500">Maximum download</div><div className="mt-2 text-3xl font-black">{provider.maxDownloadSpeed ? `${provider.maxDownloadSpeed} Mbps` : 'Varies'}</div></div>
          <div className="rounded-2xl border border-slate-200 bg-white p-6"><div className="text-sm text-slate-500">Connection types</div><div className="mt-2 text-xl font-black capitalize">{provider.connectionTypes?.join(', ') || 'Varies'}</div></div>
        </div>
        <div className="mt-14 flex items-end justify-between"><div><div className="text-sm font-bold uppercase tracking-wider text-blue-700">Plans</div><h2 className="mt-2 text-3xl font-black">Available plan records</h2></div></div>
        {plans.length ? <div className="mt-8 grid gap-6 md:grid-cols-2 lg:grid-cols-3">{plans.map((plan: any) => <PlanCard key={plan.id} plan={plan} />)}</div> : <div className="mt-8 rounded-2xl border border-amber-200 bg-amber-50 p-6 text-amber-900">No verified plans have been entered for this provider yet.</div>}
        <div className="mt-14 rounded-2xl bg-slate-100 p-7 text-sm leading-6 text-slate-600"><strong className="text-slate-950">Important:</strong> Prices, speeds, promotions and availability can change by location and eligibility. Confirm all terms before ordering.</div>
      </section>
    </>
  )
}
