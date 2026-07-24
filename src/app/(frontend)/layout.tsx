import type { Metadata } from 'next'
import './globals.css'
import { Header } from '@/components/Header'
import { Footer } from '@/components/Footer'

export const metadata: Metadata = {
  title: {
    default: 'Premium Account Services | Compare Internet and TV Plans',
    template: '%s | Premium Account Services',
  },
  description: 'Compare internet, fiber, TV, mobile and bundle options available near you.',
}

export default function FrontendLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body>
        <Header />
        <main>{children}</main>
        <Footer />
        <a href="tel:18334928778" className="fixed bottom-4 left-4 right-4 z-40 rounded-xl bg-emerald-600 px-5 py-3 text-center font-bold text-white shadow-xl md:hidden">
          Call 833-492-8778
        </a>
      </body>
    </html>
  )
}
