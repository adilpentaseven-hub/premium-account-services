export function ZipSearch({ compact = false }: { compact?: boolean }) {
  return (
    <form action="/results" method="get" className={`flex w-full gap-3 ${compact ? 'max-w-xl' : 'max-w-2xl'}`}>
      <label htmlFor={compact ? 'zip-compact' : 'zip'} className="sr-only">ZIP code</label>
      <input
        id={compact ? 'zip-compact' : 'zip'}
        name="zip"
        inputMode="numeric"
        pattern="[0-9]{5}"
        maxLength={5}
        required
        placeholder="Enter ZIP code"
        className="min-w-0 flex-1 rounded-xl border border-slate-300 bg-white px-4 py-3.5 text-slate-950 shadow-sm outline-none transition focus:border-blue-600 focus:ring-4 focus:ring-blue-100"
      />
      <button className="rounded-xl bg-blue-600 px-5 py-3.5 font-bold text-white shadow-sm transition hover:bg-blue-700">
        View plans
      </button>
    </form>
  )
}
