import Link from 'next/link'

export function Footer() {
  return (
    <footer className="mt-20 bg-slate-950 text-slate-300">
      <div className="mx-auto grid max-w-7xl gap-10 px-4 py-14 md:grid-cols-4 lg:px-8">
        <div className="md:col-span-2">
          <div className="text-xl font-bold text-white">Premium Account Services</div>
          <p className="mt-3 max-w-xl text-sm leading-6">
            Compare internet, TV and mobile options. Availability, pricing and promotional terms must be confirmed for the customer’s exact address.
          </p>
        </div>
        <div>
          <div className="font-semibold text-white">Company</div>
          <div className="mt-3 flex flex-col gap-2 text-sm">
            <Link href="/about">About</Link>
            <Link href="/contact">Contact</Link>
            <Link href="/advertising-disclosure">Advertising disclosure</Link>
          </div>
        </div>
        <div>
          <div className="font-semibold text-white">Legal</div>
          <div className="mt-3 flex flex-col gap-2 text-sm">
            <Link href="/privacy-policy">Privacy policy</Link>
            <Link href="/terms-and-conditions">Terms and conditions</Link>
          </div>
        </div>
      </div>
      <div className="border-t border-slate-800 px-4 py-6 text-center text-xs text-slate-500">
        © {new Date().getFullYear()} Premium Account Services. All rights reserved.
      </div>
    </footer>
  )
}
