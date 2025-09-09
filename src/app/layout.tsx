import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import { Navigation } from '@/components/Navigation'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'FreshFetch - South Africa&apos;s Freshest Delivery',
  description: 'Fresh food & groceries, fetched fast. Nationwide across South Africa. Local stores, local jobs.',
  keywords: ['grocery delivery', 'food delivery', 'South Africa', 'fresh food'],
  authors: [{ name: 'FreshFetch' }],
}

export const viewport = {
  width: 'device-width',
  initialScale: 1,
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Navigation />
        <main className="min-h-screen bg-gray-50">
          {children}
        </main>
        <footer className="bg-gray-900 text-white py-12">
          <div className="max-w-7xl mx-auto px-6">
            <div className="grid md:grid-cols-4 gap-8">
              <div>
                <h3 className="font-bold text-lg mb-4">FreshFetch</h3>
                <p className="text-gray-400 text-sm">South Africa's freshest delivery platform</p>
              </div>
              <div>
                <h4 className="font-semibold mb-4">Company</h4>
                <ul className="space-y-2 text-sm">
                  <li><a href="/about" className="text-gray-400 hover:text-white">About Us</a></li>
                  <li><a href="/careers" className="text-gray-400 hover:text-white">Careers</a></li>
                  <li><a href="/press" className="text-gray-400 hover:text-white">Press</a></li>
                </ul>
              </div>
              <div>
                <h4 className="font-semibold mb-4">Support</h4>
                <ul className="space-y-2 text-sm">
                  <li><a href="/help" className="text-gray-400 hover:text-white">Help Center</a></li>
                  <li><a href="/contact" className="text-gray-400 hover:text-white">Contact Us</a></li>
                  <li><a href="/safety" className="text-gray-400 hover:text-white">Safety</a></li>
                </ul>
              </div>
              <div>
                <h4 className="font-semibold mb-4">Legal</h4>
                <ul className="space-y-2 text-sm">
                  <li><a href="/terms" className="text-gray-400 hover:text-white">Terms of Service</a></li>
                  <li><a href="/privacy" className="text-gray-400 hover:text-white">Privacy Policy</a></li>
                </ul>
              </div>
            </div>
            <div className="border-t border-gray-800 mt-8 pt-8 text-center">
              <p className="text-gray-400 text-sm">© 2024 FreshFetch. All rights reserved.</p>
            </div>
          </div>
        </footer>
      </body>
    </html>
  )
}