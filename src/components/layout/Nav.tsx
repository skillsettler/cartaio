'use client'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useState } from 'react'
import { Menu, X, Zap } from 'lucide-react'
import { Button } from '@/components/ui/Button'
import { cn } from '@/lib/utils'

interface NavProps {
  user?: { email?: string } | null
}

const tools = [
  { label: 'Compress PDF', href: '/tools/compress-pdf' },
  { label: 'Merge PDF', href: '/tools/merge-pdf' },
  { label: 'Split PDF', href: '/tools/split-pdf' },
  { label: 'Bank Statement', href: '/tools/bank-statement-converter' },
  { label: 'Invoice Extractor', href: '/tools/invoice-extractor' },
]

export function Nav({ user }: NavProps) {
  const pathname = usePathname()
  const [mobileOpen, setMobileOpen] = useState(false)

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-[#0A0618]/80 backdrop-blur-xl border-b border-white/10">
      <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-violet-600 to-indigo-600 flex items-center justify-center">
            <Zap className="w-4 h-4 text-white" />
          </div>
          <span className="font-bold text-white tracking-tight">Cartaio</span>
        </Link>

        <div className="hidden md:flex items-center gap-6">
          <Link href="/tools/compress-pdf" className="text-white/60 hover:text-white text-sm transition-colors">Tools</Link>
          <Link href="/pricing" className="text-white/60 hover:text-white text-sm transition-colors">Pricing</Link>
          <Link href="/docs" className="text-white/60 hover:text-white text-sm transition-colors">API Docs</Link>
        </div>

        <div className="hidden md:flex items-center gap-3">
          {user ? (
            <Link href="/dashboard">
              <Button variant="secondary" size="sm">Dashboard</Button>
            </Link>
          ) : (
            <>
              <Link href="/login">
                <Button variant="ghost" size="sm">Sign in</Button>
              </Link>
              <Link href="/signup">
                <Button size="sm">Get started free</Button>
              </Link>
            </>
          )}
        </div>

        <button
          className="md:hidden text-white/70 hover:text-white"
          onClick={() => setMobileOpen(!mobileOpen)}
        >
          {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </button>
      </div>

      {mobileOpen && (
        <div className="md:hidden bg-[#13102B] border-t border-white/10 px-6 py-4 space-y-4">
          {tools.map(t => (
            <Link key={t.href} href={t.href} className="block text-white/70 hover:text-white py-2 text-sm" onClick={() => setMobileOpen(false)}>
              {t.label}
            </Link>
          ))}
          <div className="pt-2 border-t border-white/10 flex flex-col gap-2">
            {user ? (
              <Link href="/dashboard"><Button className="w-full" size="sm">Dashboard</Button></Link>
            ) : (
              <>
                <Link href="/login"><Button variant="ghost" className="w-full" size="sm">Sign in</Button></Link>
                <Link href="/signup"><Button className="w-full" size="sm">Get started free</Button></Link>
              </>
            )}
          </div>
        </div>
      )}
    </nav>
  )
}
