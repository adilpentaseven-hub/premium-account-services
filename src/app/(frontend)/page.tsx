import Link from 'next/link'
import { ZipSearch } from '@/components/ZipSearch'
import { ProviderCard } from '@/components/ProviderCard'
import { PlanCard } from '@/components/PlanCard'
import { getFeaturedPlans, getFeaturedProviders } from '@/lib/cms'

export const dynamic = 'force-dynamic'

export default async function HomePage() {
  const [providers, plans] = await Promise.all([getFeaturedProviders(), getFeaturedPlans()])

  return (
    <>
      <section className="overflow-hidden bg-gradient-to-br from-blue-700 via-blue-600 to-cyan-500 text-white">
        <div className="mx-auto grid max-w-7xl items-center gap-12 px-4 py-20 lg:grid-cols-2 lg:px-8 lg:py-28">
          <div>
            <div className="inline-flex rounded-full bg-white/15 px-4 py-2 text-sm font-semibold ring-1 ring-white/25">Internet · TV · Mobile · Bundles</div>
            <h1 className="mt-6 max-w-3xl text-4xl font-black leading-tight sm:text-5xl lg:text-6xl">Find plans available near you.</h1>
            <p className="mt-6 max-w-2xl text-lg leading-8 text-blue-50">Compare providers, speeds and plan details, then call to confirm exact address availability and current promotional terms.</p>
            <div className="mt-8"><ZipSearch /></div>
            <p className="mt-4 text-sm text-blue-100">Or call <a className="font-bold text-white underline" href="tel:18334928778">833-492-8778</a></p>
          </div>
          <div className="rounded-3xl bg-white p-7 text-slate-950 shadow-2xl ring-1 ring-white/30">
            <div className="text-sm font-bold uppercase tracking-wider text-blue-700">How it works</div>
            <ol className="mt-6 space-y-5">
              {[
                ['1', 'Enter your ZIP code', 'See providers and plan types associated with your area.'],
                ['2', 'Compare your options', 'Review speed, technology, pricing and important conditions.'],
                ['3', 'Confirm and order', 'Call to verify exact address serviceability and final terms.'],
              ].map(([number, title, copy]) => (
                <li key={number} className="flex gap-4">
                  <span className="grid h-10 w-10 shrink-0 place-items-center rounded-full bg-blue-100 font-black text-blue-700">{number}</span>
                  <div><strong>{title}</strong><p className="mt-1 text-sm leading-6 text-slate-600">{copy}</p></div>
                </li>
              ))}
            </ol>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-20 lg:px-8">
        <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
          <div><div className="text-sm font-bold uppercase tracking-wider text-blue-700">Providers</div><h2 className="mt-2 text-3xl font-black text-slate-950">Compare leading service providers</h2></div>
          <Link href="/providers" className="font-bold text-blue-700">View all providers →</Link>
        </div>
        <div className="mt-10 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {providers.slice(0, 6).map((provider: any) => <ProviderCard key={provider.id} provider={provider} />)}
        </div>
      </section>

      <section className="bg-slate-100 py-20">
        <div className="mx-auto max-w-7xl px-4 lg:px-8">
          <div className="max-w-3xl"><div className="text-sm font-bold uppercase tracking-wider text-blue-700">Plan comparison</div><h2 className="mt-2 text-3xl font-black">Featured plan examples</h2><p className="mt-3 text-slate-600">All starter prices are placeholders until authorized offer data is entered in the admin dashboard.</p></div>
          <div className="mt-10 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {plans.slice(0, 6).map((plan: any) => <PlanCard key={plan.id} plan={plan} />)}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-20 lg:px-8">
        <div className="grid gap-6 md:grid-cols-3">
          {[
            ['Clear comparisons', 'See speeds, technologies, fees and plan conditions in one consistent format.'],
            ['Location-based results', 'Use ZIP-level availability first, then add provider address APIs as access becomes available.'],
            ['Human assistance', 'Call a representative to verify exact serviceability, promotions and ordering requirements.'],
          ].map(([title, text]) => (
            <div key={title} className="rounded-2xl border border-slate-200 bg-white p-7"><h3 className="text-xl font-bold">{title}</h3><p className="mt-3 leading-7 text-slate-600">{text}</p></div>
          ))}
        </div>
      </section>
    </>
  )
}
