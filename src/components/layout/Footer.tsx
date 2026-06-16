import Link from 'next/link'
import { Zap } from 'lucide-react'

const links = {
  Tools: [
    { label: 'Compress PDF', href: '/tools/compress-pdf' },
    { label: 'Merge PDF', href: '/tools/merge-pdf' },
    { label: 'Split PDF', href: '/tools/split-pdf' },
    { label: 'Bank Statement Converter', href: '/tools/bank-statement-converter' },
    { label: 'Invoice Extractor', href: '/tools/invoice-extractor' },
  ],
  Company: [
    { label: 'Pricing', href: '/pricing' },
    { label: 'API Docs', href: '/docs' },
    { label: 'Blog', href: '/blog' },
  ],
  Legal: [
    { label: 'Privacy Policy', href: '/privacy' },
    { label: 'Terms of Service', href: '/terms' },
  ]
}

export function Footer() {
  return (
    <footer className="bg-[#13102B] border-t border-white/10 py-16 px-6">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-12">
          <div className="col-span-2 md:col-span-1">
            <div className="flex items-center gap-2 mb-4">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-violet-600 to-indigo-600 flex items-center justify-center">
                <Zap className="w-4 h-4 text-white" />
              </div>
              <span className="font-bold text-white">Cartaio</span>
            </div>
            <p className="text-white/40 text-sm leading-relaxed">
              Professional PDF tools for individuals and teams. Fast, secure, browser-based.
            </p>
          </div>

          {Object.entries(links).map(([category, items]) => (
            <div key={category}>
              <h4 className="text-white font-semibold text-sm mb-4">{category}</h4>
              <ul className="space-y-2">
                {items.map(item => (
                  <li key={item.href}>
                    <Link href={item.href} className="text-white/50 hover:text-white text-sm transition-colors">
                      {item.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="border-t border-white/10 pt-8 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-white/30 text-sm">© 2025 Cartaio. All rights reserved.</p>
          <p className="text-white/30 text-sm">cartaio.io</p>
        </div>
      </div>
    </footer>
  )
}
