import Link from 'next/link'

const nav = [
  ['Internet', '/internet'],
  ['Fiber', '/fiber-internet'],
  ['TV', '/tv'],
  ['Mobile', '/mobile'],
  ['Bundles', '/bundles'],
  ['Providers', '/providers'],
]

export function Header() {
  return (
    <>
      <div className="bg-slate-950 px-4 py-2 text-center text-sm text-white">
        Compare plans, then call to confirm exact address availability.
      </div>
      <header className="sticky top-0 z-50 border-b border-slate-200 bg-white/95 backdrop-blur">
        <div className="mx-auto flex max-w-7xl items-center justify-between gap-6 px-4 py-4 lg:px-8">
          <Link href="/" className="flex items-center gap-3" aria-label="Premium Account Services home">
            <span className="grid h-10 w-10 place-items-center rounded-xl bg-blue-600 text-lg font-black text-white">P</span>
            <span className="leading-tight">
              <strong className="block text-base text-slate-950">Premium Account</strong>
              <span className="block text-sm text-slate-500">Services</span>
            </span>
          </Link>
          <nav className="hidden items-center gap-6 text-sm font-semibold text-slate-700 lg:flex" aria-label="Primary navigation">
            {nav.map(([label, href]) => (
              <Link key={href} href={href} className="transition hover:text-blue-600">{label}</Link>
            ))}
          </nav>
          <a href="tel:18334928778" className="rounded-xl bg-emerald-600 px-4 py-3 text-sm font-bold text-white shadow-sm transition hover:bg-emerald-700">
            Call 833-492-8778
          </a>
        </div>
      </header>
    </>
  )
}
