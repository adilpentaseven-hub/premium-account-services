import type { Metadata } from 'next'
import { PlanCard } from '@/components/PlanCard'
import { LeadForm } from '@/components/LeadForm'
import { ZipSearch } from '@/components/ZipSearch'
import { getPlansForZip } from '@/lib/cms'

export const dynamic = 'force-dynamic'
export const metadata: Metadata = { title: 'Plans Available Near You' }

type Props = { searchParams: Promise<{ zip?: string }> }

export default async function ResultsPage({ searchParams }: Props) {
  const { zip = '' } = await searchParams
  const valid = /^\d{5}$/.test(zip)
  const plans = valid ? await getPlansForZip(zip) : []

  return (
    <section className="mx-auto max-w-7xl px-4 py-14 lg:px-8">
      <div className="rounded-3xl bg-blue-700 p-8 text-white">
        <h1 className="text-3xl font-black">{valid ? `Plans associated with ZIP ${zip}` : 'Enter a valid five-digit ZIP code'}</h1>
        <p className="mt-3 max-w-3xl text-blue-100">ZIP results are preliminary. Exact serviceability and promotions must be verified for the complete street address.</p>
        <div className="mt-6"><ZipSearch compact /></div>
      </div>
      {valid && (
        <div className="mt-10 grid gap-10 lg:grid-cols-[1fr_380px]">
          <div>
            <div className="grid gap-6 md:grid-cols-2">{plans.map((plan: any) => <PlanCard key={plan.id} plan={plan} />)}</div>
          </div>
          <aside><LeadForm zip={zip} /></aside>
        </div>
      )}
    </section>
  )
}
