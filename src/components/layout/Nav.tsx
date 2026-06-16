'use client'
import Link from 'next/link'
import { useState } from 'react'
import { Menu, X } from 'lucide-react'

interface NavProps {
  user?: { email?: string } | null
}

function LogoMark() {
  return (
    <svg width="28" height="32" viewBox="0 0 28 32" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M5 4 H18 L23 9 V29 H5 Z" fill="rgba(255,255,255,0.03)" transform="translate(0.8,0.8)" />
      <path d="M4 3 H17 L22 8 V28 H4 Z" fill="rgba(255,255,255,0.07)" stroke="rgba(139,135,200,0.3)" strokeWidth="0.75" />
      <path d="M17 3 L17 8 L22 8" stroke="rgba(139,135,200,0.25)" strokeWidth="0.75" fill="none" />
      <path d="M17 3 L22 8 L17 8 Z" fill="rgba(255,255,255,0.06)" />
      <path d="M4 4 Q4 3 5 3 H7.5 V28 H4 Z" fill="#7C3AED" />
      <rect x="10.5" y="13" width="8" height="1.5" rx="0.75" fill="rgba(167,139,250,0.5)" />
      <rect x="10.5" y="17" width="10" height="1.5" rx="0.75" fill="rgba(167,139,250,0.5)" />
      <rect x="10.5" y="21" width="6.5" height="1.5" rx="0.75" fill="rgba(167,139,250,0.5)" />
      <circle cx="5.75" cy="6" r="1.2" fill="rgba(255,255,255,0.4)" />
    </svg>
  )
}

const navLinks = [
  { label: 'PDF Tools', href: '/#tools' },
  { label: 'API', href: '/#api' },
  { label: 'Why Cartaio', href: '/#why' },
  { label: 'Pricing', href: '/#pricing' },
]

export function Nav({ user }: NavProps) {
  const [mobileOpen, setMobileOpen] = useState(false)

  return (
    <nav style={{
      position: 'fixed', top: 0, left: 0, right: 0, zIndex: 100,
      display: 'flex', alignItems: 'center', justifyContent: 'space-between',
      padding: '0 56px', height: '64px',
      background: 'rgba(13,10,32,.9)', backdropFilter: 'blur(20px)',
      borderBottom: '1px solid rgba(139,135,200,.22)',
    }}>
      <Link href="/" style={{ display: 'flex', alignItems: 'center', gap: '9px', textDecoration: 'none' }}>
        <LogoMark />
        <div style={{ display: 'flex', alignItems: 'baseline', gap: '2px' }}>
          <span style={{ fontFamily: "'Instrument Serif', serif", fontSize: '21px', fontWeight: 400, color: '#FFFFFF', letterSpacing: '-0.01em', lineHeight: 1 }}>Cartaio</span>
          <span style={{ fontFamily: "'DM Mono', monospace", fontSize: '11px', color: '#9F6BF5', fontWeight: 500 }}>.io</span>
        </div>
      </Link>

      {/* Desktop links */}
      <ul style={{ display: 'flex', alignItems: 'center', gap: '36px', listStyle: 'none', margin: 0, padding: 0 }} className="hidden md:flex">
        {navLinks.map(({ label, href }) => (
          <li key={href}>
            <Link href={href} style={{ fontSize: '14px', fontWeight: 500, color: 'rgba(255,255,255,.75)', textDecoration: 'none', fontFamily: "'Urbanist', sans-serif", transition: 'color .18s' }}
              onMouseEnter={e => (e.currentTarget.style.color = '#fff')}
              onMouseLeave={e => (e.currentTarget.style.color = 'rgba(255,255,255,.75)')}
            >{label}</Link>
          </li>
        ))}
        <li>
          <Link href={user ? '/dashboard' : '/signup'} style={{
            background: '#7C3AED', color: '#fff', padding: '9px 22px',
            borderRadius: '100px', fontWeight: 600, fontFamily: "'Urbanist', sans-serif",
            textDecoration: 'none', fontSize: '14px',
            boxShadow: '0 0 20px rgba(124,58,237,.45)', transition: 'background .18s',
          }}
            onMouseEnter={e => (e.currentTarget.style.background = '#9F6BF5')}
            onMouseLeave={e => (e.currentTarget.style.background = '#7C3AED')}
          >{user ? 'Dashboard' : 'Try free'}</Link>
        </li>
      </ul>

      {/* Mobile toggle */}
      <button
        className="md:hidden"
        onClick={() => setMobileOpen(!mobileOpen)}
        style={{ color: 'rgba(255,255,255,.7)', background: 'none', border: 'none', cursor: 'pointer', padding: '4px' }}
      >
        {mobileOpen ? <X size={20} /> : <Menu size={20} />}
      </button>

      {/* Mobile menu */}
      {mobileOpen && (
        <div style={{
          position: 'absolute', top: '64px', left: 0, right: 0,
          background: '#1A1035', borderTop: '1px solid rgba(139,135,200,.22)',
          padding: '16px 20px',
        }}>
          {navLinks.map(({ label, href }) => (
            <Link key={href} href={href} onClick={() => setMobileOpen(false)}
              style={{ display: 'block', color: 'rgba(255,255,255,.7)', textDecoration: 'none', padding: '12px 0', fontSize: '14px', borderBottom: '1px solid rgba(255,255,255,.08)', fontFamily: "'Urbanist', sans-serif" }}>
              {label}
            </Link>
          ))}
          <Link href={user ? '/dashboard' : '/signup'} onClick={() => setMobileOpen(false)}
            style={{ display: 'block', marginTop: '12px', background: '#7C3AED', color: '#fff', textAlign: 'center', padding: '11px', borderRadius: '8px', textDecoration: 'none', fontWeight: 600, fontSize: '14px', fontFamily: "'Urbanist', sans-serif" }}>
            {user ? 'Dashboard' : 'Try free'}
          </Link>
        </div>
      )}
    </nav>
  )
}
