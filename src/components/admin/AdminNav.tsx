'use client'
import Link from 'next/link'
import { usePathname, useRouter } from 'next/navigation'
import { LayoutDashboard, Users, FileText, BarChart3, Key, LogOut, ChevronRight } from 'lucide-react'
import { createClient } from '@/lib/supabase/client'

const navItems = [
  { href: '/admin', label: 'Dashboard', icon: LayoutDashboard, exact: true },
  { href: '/admin/users', label: 'Users', icon: Users },
  { href: '/admin/jobs', label: 'Jobs', icon: FileText },
  { href: '/admin/conversions', label: 'Conversions', icon: BarChart3 },
  { href: '/admin/api-keys', label: 'API Keys', icon: Key },
]

function LogoMark() {
  return (
    <svg width="22" height="25" viewBox="0 0 28 32" fill="none">
      <path d="M4 3 H17 L22 8 V28 H4 Z" fill="rgba(255,255,255,0.07)" stroke="rgba(139,135,200,0.3)" strokeWidth="0.75" />
      <path d="M17 3 L22 8 L17 8 Z" fill="rgba(255,255,255,0.06)" />
      <path d="M4 4 Q4 3 5 3 H7.5 V28 H4 Z" fill="#7C3AED" />
      <rect x="10.5" y="13" width="8" height="1.5" rx="0.75" fill="rgba(167,139,250,0.5)" />
      <rect x="10.5" y="17" width="10" height="1.5" rx="0.75" fill="rgba(167,139,250,0.5)" />
      <rect x="10.5" y="21" width="6.5" height="1.5" rx="0.75" fill="rgba(167,139,250,0.5)" />
    </svg>
  )
}

export function AdminNav() {
  const pathname = usePathname()
  const router = useRouter()
  const supabase = createClient()

  const isActive = (item: typeof navItems[0]) => {
    if (item.exact) return pathname === item.href
    return pathname.startsWith(item.href)
  }

  const signOut = async () => {
    await supabase.auth.signOut()
    router.push('/login')
  }

  return (
    <aside style={{
      width: '220px', flexShrink: 0,
      background: '#0D0A20', borderRight: '1px solid rgba(139,135,200,.15)',
      display: 'flex', flexDirection: 'column', height: '100vh',
      position: 'sticky', top: 0,
    }}>
      {/* Logo */}
      <div style={{ padding: '20px 16px 16px', borderBottom: '1px solid rgba(139,135,200,.12)' }}>
        <Link href="/admin" style={{ display: 'flex', alignItems: 'center', gap: '8px', textDecoration: 'none' }}>
          <LogoMark />
          <div>
            <div style={{ fontFamily: "'Instrument Serif', serif", fontSize: '16px', color: '#FFFFFF', lineHeight: 1 }}>Cartaio</div>
            <div style={{ fontFamily: "'DM Mono', monospace", fontSize: '9px', color: '#7C3AED', letterSpacing: '.1em', textTransform: 'uppercase', marginTop: '1px' }}>Admin</div>
          </div>
        </Link>
      </div>

      {/* Nav items */}
      <nav style={{ flex: 1, padding: '12px 8px', overflowY: 'auto' }}>
        {navItems.map(item => {
          const active = isActive(item)
          return (
            <Link key={item.href} href={item.href} style={{
              display: 'flex', alignItems: 'center', gap: '10px', padding: '9px 12px',
              borderRadius: '8px', textDecoration: 'none', marginBottom: '2px',
              background: active ? 'rgba(124,58,237,.18)' : 'transparent',
              color: active ? '#C4B5FD' : 'rgba(255,255,255,.55)',
              fontSize: '13px', fontWeight: active ? 600 : 400,
              fontFamily: "'Urbanist', sans-serif",
              transition: 'all .15s',
            }}>
              <item.icon size={15} />
              <span style={{ flex: 1 }}>{item.label}</span>
              {active && <ChevronRight size={12} />}
            </Link>
          )
        })}
      </nav>

      {/* Back to site + sign out */}
      <div style={{ padding: '12px 8px', borderTop: '1px solid rgba(139,135,200,.12)' }}>
        <Link href="/" style={{
          display: 'flex', alignItems: 'center', gap: '10px', padding: '9px 12px',
          borderRadius: '8px', textDecoration: 'none', marginBottom: '4px',
          color: 'rgba(255,255,255,.35)', fontSize: '12px',
          fontFamily: "'Urbanist', sans-serif",
        }}>
          ← Back to site
        </Link>
        <button onClick={signOut} style={{
          display: 'flex', alignItems: 'center', gap: '10px', padding: '9px 12px',
          borderRadius: '8px', background: 'none', border: 'none', cursor: 'pointer',
          color: 'rgba(255,255,255,.4)', fontSize: '13px', width: '100%', textAlign: 'left',
          fontFamily: "'Urbanist', sans-serif",
        }}>
          <LogOut size={15} />
          Sign out
        </button>
      </div>
    </aside>
  )
}
