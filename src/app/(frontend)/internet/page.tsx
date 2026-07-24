import type { Metadata } from 'next'

export const metadata: Metadata = { title: 'Home Internet' }

export default function Page() {
  return (
    <section className="mx-auto max-w-5xl px-4 py-16 lg:px-8">
      <h1 className="text-4xl font-black">Home Internet</h1>
      <p className="mt-5 max-w-3xl text-lg leading-8 text-slate-600">Compare home internet technologies, speeds, prices and terms available by location.</p>
      <div className="mt-10 rounded-2xl border border-slate-200 bg-white p-8 shadow-sm">
        <h2 className="text-2xl font-bold">Page template ready</h2>
        <p className="mt-3 leading-7 text-slate-600">This starter route is ready for original content, comparison modules and database-driven offers in the next build phase.</p>
      </div>
    </section>
  )
}
