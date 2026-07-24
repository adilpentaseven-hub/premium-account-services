export function PlanCard({ plan }: { plan: any }) {
  const provider = typeof plan.provider === 'object' ? plan.provider : null
  return (
    <article className="flex h-full flex-col rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
      <div className="text-sm font-bold text-blue-700">{provider?.name || 'Provider plan'}</div>
      <h3 className="mt-2 text-xl font-bold text-slate-950">{plan.name}</h3>
      <div className="mt-5 flex items-end gap-1">
        <span className="text-4xl font-black text-slate-950">${plan.promotionalPrice ?? plan.regularPrice ?? '—'}</span>
        <span className="pb-1 text-sm text-slate-500">/mo.</span>
      </div>
      <div className="mt-5 grid grid-cols-2 gap-3 rounded-xl bg-slate-50 p-4 text-sm">
        <div><div className="text-slate-500">Download</div><strong>{plan.downloadSpeed ?? '—'} Mbps</strong></div>
        <div><div className="text-slate-500">Technology</div><strong className="capitalize">{plan.technology || 'Varies'}</strong></div>
      </div>
      <p className="mt-5 flex-1 text-xs leading-5 text-slate-500">{plan.disclaimer}</p>
      <a href="tel:18334928778" className="mt-5 rounded-xl bg-emerald-600 px-4 py-3 text-center font-bold text-white hover:bg-emerald-700">
        Call to confirm availability
      </a>
    </article>
  )
}
