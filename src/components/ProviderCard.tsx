import Link from 'next/link'

export function ProviderCard({ provider }: { provider: any }) {
  const types = Array.isArray(provider.connectionTypes) ? provider.connectionTypes.join(' · ') : 'Availability varies'
  return (
    <article className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm transition hover:-translate-y-1 hover:shadow-lg">
      <div className="flex items-center justify-between gap-4">
        <div className="grid h-14 min-w-14 place-items-center rounded-xl bg-slate-100 px-3 text-lg font-black text-slate-900">
          {provider.name}
        </div>
        {provider.featured && <span className="rounded-full bg-blue-50 px-3 py-1 text-xs font-bold text-blue-700">Featured</span>}
      </div>
      <p className="mt-5 min-h-16 text-sm leading-6 text-slate-600">{provider.shortDescription}</p>
      <dl className="mt-5 grid grid-cols-2 gap-4 border-y border-slate-100 py-4 text-sm">
        <div>
          <dt className="text-slate-500">Starting price</dt>
          <dd className="mt-1 font-bold text-slate-950">{provider.startingPrice ? `$${provider.startingPrice}/mo.` : 'Check availability'}</dd>
        </div>
        <div>
          <dt className="text-slate-500">Max speed</dt>
          <dd className="mt-1 font-bold text-slate-950">{provider.maxDownloadSpeed ? `${provider.maxDownloadSpeed} Mbps` : 'Varies'}</dd>
        </div>
      </dl>
      <div className="mt-4 text-xs uppercase tracking-wide text-slate-500">{types}</div>
      <Link href={`/providers/${provider.slug}`} className="mt-5 inline-flex font-bold text-blue-700 hover:text-blue-900">
        View provider details →
      </Link>
    </article>
  )
}
