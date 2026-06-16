'use client'
import Link from 'next/link'

const footerLinks = {
  'PDF Tools': [
    { label: 'Compress PDF', href: '/tools/compress-pdf' },
    { label: 'Merge PDF', href: '/tools/merge-pdf' },
    { label: 'Word to PDF', href: '/tools/word-to-pdf' },
    { label: 'Sign PDF Online', href: '/tools/sign-pdf' },
    { label: 'Edit PDF Online', href: '/tools/edit-pdf' },
    { label: 'PDF OCR', href: '/tools/ocr' },
  ],
  Company: [
    { label: 'About', href: '/about' },
    { label: 'Blog', href: '/blog' },
    { label: 'Pricing', href: '/#pricing' },
    { label: 'API', href: '/#api' },
    { label: 'Status', href: '/status' },
  ],
  Legal: [
    { label: 'Privacy Policy', href: '/privacy' },
    { label: 'Terms of Service', href: '/terms' },
    { label: 'Cookie Policy', href: '/cookies' },
  ],
}

function FooterLogoMark() {
  return (
    <svg width="26" height="30" viewBox="0 0 28 32" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M5 4 H18 L23 9 V29 H5 Z" fill="rgba(245,240,232,0.05)" transform="translate(1,1)" />
      <path d="M4 3 H17 L22 8 V28 H4 Z" fill="rgba(245,240,232,0.06)" stroke="rgba(245,240,232,0.1)" strokeWidth="0.75" />
      <path d="M17 3 L17 8 L22 8" stroke="rgba(245,240,232,0.12)" strokeWidth="0.75" fill="none" />
      <path d="M17 3 L22 8 L17 8 Z" fill="rgba(245,240,232,0.08)" />
      <path d="M4 4 Q4 3 5 3 H7.5 V28 H4 Z" fill="#9F6BF5" />
      <rect x="10.5" y="13" width="8" height="1.5" rx="0.75" fill="rgba(245,240,232,0.2)" />
      <rect x="10.5" y="17" width="10" height="1.5" rx="0.75" fill="rgba(245,240,232,0.2)" />
      <rect x="10.5" y="21" width="6.5" height="1.5" rx="0.75" fill="rgba(245,240,232,0.2)" />
      <circle cx="5.75" cy="6" r="1.2" fill="rgba(255,255,255,0.2)" />
    </svg>
  )
}

export function Footer() {
  return (
    <footer style={{ background: '#0A0618', color: '#B8B5D8', padding: '60px 56px 32px', borderTop: '1px solid rgba(139,135,200,.22)' }}>
      <div style={{ maxWidth: '1120px', margin: '0 auto' }}>
        <div style={{ display: 'grid', gridTemplateColumns: '1.8fr 1fr 1fr 1fr', gap: '48px', marginBottom: '48px', paddingBottom: '48px', borderBottom: '1px solid rgba(139,135,200,.22)' }}>
          {/* Brand */}
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '9px', marginBottom: '12px' }}>
              <FooterLogoMark />
              <div style={{ display: 'flex', alignItems: 'baseline', gap: '2px' }}>
                <span style={{ fontFamily: "'Instrument Serif', serif", fontSize: '21px', fontWeight: 400, color: '#FFFFFF', lineHeight: 1 }}>Cartaio</span>
                <span style={{ fontFamily: "'DM Mono', monospace", fontSize: '11px', color: '#9F6BF5' }}>.io</span>
              </div>
            </div>
            <p style={{ fontSize: '13px', lineHeight: 1.65, maxWidth: '240px', fontFamily: "'Urbanist', sans-serif", color: 'rgba(255,255,255,.55)' }}>
              Free online PDF tools. Convert, compress, merge, sign and edit PDFs in your browser. Built in Ireland.
            </p>
            <div style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', marginTop: '18px', fontFamily: "'DM Mono', monospace", fontSize: '10px', color: 'rgba(255,255,255,.35)', letterSpacing: '.06em' }}>
              🇮🇪 Built in Ireland · Files deleted after download
            </div>
          </div>

          {/* Link columns */}
          {Object.entries(footerLinks).map(([col, items]) => (
            <div key={col}>
              <h4 style={{ fontFamily: "'DM Mono', monospace", fontSize: '10px', fontWeight: 500, letterSpacing: '.12em', textTransform: 'uppercase', color: 'rgba(255,255,255,.55)', marginBottom: '16px' }}>{col}</h4>
              {items.map(item => (
                <Link key={item.href} href={item.href}
                  style={{ display: 'block', fontSize: '13px', color: 'rgba(255,255,255,.5)', textDecoration: 'none', marginBottom: '10px', fontFamily: "'Urbanist', sans-serif", transition: 'color .15s' }}
                  onMouseEnter={e => (e.currentTarget.style.color = '#fff')}
                  onMouseLeave={e => (e.currentTarget.style.color = 'rgba(255,255,255,.5)')}
                >
                  {item.label}
                </Link>
              ))}
            </div>
          ))}
        </div>

        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontFamily: "'DM Mono', monospace", fontSize: '11px', color: 'rgba(255,255,255,.3)', letterSpacing: '.04em' }}>
          <span>© 2026 Cartaio Ltd. Registered in Ireland.</span>
          <span>Free online PDF tools · No sign-up required</span>
        </div>
      </div>
    </footer>
  )
}
