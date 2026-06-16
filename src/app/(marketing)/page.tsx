'use client'
import Link from 'next/link'
import { Nav } from '@/components/layout/Nav'
import { Footer } from '@/components/layout/Footer'
import { HeroWidget } from '@/components/marketing/HeroWidget'

/* ─── data ─── */

const tools = [
  { icon: 'doc', label: 'Word to PDF', desc: 'Convert .doc and .docx files to PDF online, free' },
  { icon: 'table', label: 'Excel to PDF', desc: 'Convert Excel spreadsheets to PDF in seconds' },
  { icon: 'slides', label: 'PowerPoint to PDF', desc: 'Convert .ppt and .pptx presentations to PDF' },
  { icon: 'image', label: 'JPG to PDF', desc: 'Convert JPG, PNG or TIFF images to PDF online' },
  { icon: 'code', label: 'PDF to Word', desc: 'Convert PDF to editable Word document free' },
  { icon: 'compress', label: 'Compress PDF', desc: 'Reduce PDF file size online without losing quality', badge: 'Popular' },
  { icon: 'merge', label: 'Merge PDF', desc: 'Combine multiple PDF files into one document', badge: 'Popular' },
  { icon: 'split', label: 'Split PDF', desc: 'Split a PDF into separate pages or page ranges' },
  { icon: 'lock', label: 'Protect PDF', desc: 'Password protect a PDF to restrict access' },
  { icon: 'edit', label: 'Edit PDF Online', desc: 'Add text, images and annotations to any PDF' },
  { icon: 'sign', label: 'Sign PDF Online', desc: 'Electronically sign a PDF document for free', badge: 'Popular' },
  { icon: 'search', label: 'PDF OCR', desc: 'Make scanned PDFs searchable and selectable' },
  { icon: 'redact', label: 'Redact PDF', desc: 'Permanently black out sensitive text in a PDF' },
  { icon: 'ai', label: 'Summarise PDF', desc: 'AI-powered summary of any PDF document', badge: 'AI' },
  { icon: 'globe', label: 'Translate PDF', desc: 'Translate PDF to 30+ languages, layout intact', badge: 'AI' },
  { icon: 'xls', label: 'PDF to Excel', desc: 'Extract tables from PDF into an Excel spreadsheet' },
]

const finTools = [
  { color: '#7C3AED', label: 'Bank Statement to CSV / Excel', desc: 'Upload any PDF bank statement and get a clean, structured spreadsheet. Works with any bank, any format.', formats: ['CSV', 'Excel', 'QBO', 'OFX'], badge: 'Popular' },
  { color: '#6366F1', label: 'Invoice Data Extraction', desc: 'Extract vendor, amount, date, line items and VAT from invoices automatically. Export to Excel or push to QuickBooks.', formats: ['Excel', 'CSV', 'QuickBooks', 'Xero'], badge: 'Popular' },
  { color: '#10B981', label: 'Receipt Scanning & Export', desc: 'Scan receipts and extract merchant, amount, date, and tax. Batch process dozens at once and export to your accounting tool.', formats: ['Excel', 'CSV', 'QuickBooks', 'Xero'] },
  { color: '#7C3AED', label: 'Transaction Categorisation', desc: 'AI automatically classifies every transaction — salary, rent, subscriptions, tax — ready for reconciliation.', formats: ['Excel', 'CSV', 'QuickBooks'], badge: 'AI' },
  { color: '#F59E0B', label: 'Cash Flow Analysis', desc: 'Generate instant cash flow reports from bank statements. Visualise income vs expenses by month, category, or account.', formats: ['Report', 'Excel', 'CSV'], badge: 'AI' },
  { color: '#7C3AED', label: 'Batch Document Processing', desc: 'Upload 100s of statements, invoices, or receipts at once. Cartaio processes them in parallel and delivers one clean export.', formats: ['Excel', 'CSV', 'ZIP'] },
  { color: '#6366F1', label: 'PDF to QuickBooks (QBO)', desc: 'Convert PDF bank statements directly to QBO format for one-click import into QuickBooks Online or Desktop.', formats: ['QBO', 'OFX', 'QFX'] },
  { color: '#10B981', label: 'Credit Card Statement Converter', desc: 'Extract all transactions from credit card statement PDFs. Split debits and credits, export to any format.', formats: ['CSV', 'Excel', 'OFX'] },
]

const whyItems = [
  { num: '01', title: 'No software to download', desc: 'Everything runs in your browser. Upload your file, get your result, download it. Done.' },
  { num: '02', title: 'Files deleted after download', desc: 'Your files are automatically removed from our servers once you\'re done. Nothing is stored.' },
  { num: '03', title: 'No ads, no upsell traps', desc: 'No pop-ups, no "upgrade to continue" walls mid-task. Free tools are genuinely free.' },
  { num: '04', title: 'Works on any device', desc: 'Mac, Windows, iPhone, Android — if it has a browser, Cartaio works on it.' },
]

const certRows = [
  { title: '20+ tools in one place', sub: 'vs paying separately for each tool elsewhere' },
  { title: 'No sign-up to use free tools', sub: 'vs forced registration on most competitors' },
  { title: '€9/mo vs Adobe\'s €15/mo', sub: 'Full feature access for a fraction of the cost' },
  { title: 'Works on any device, any OS', sub: 'Browser-based — nothing to install ever' },
  { title: 'AI tools built in', sub: 'Summarise, translate, and redact with AI' },
]

const testimonials = [
  { quote: '"I needed to compress a PDF quickly and Cartaio did it in seconds. No sign-up, no fuss. Way better than the other tools I\'ve tried."', name: 'Siobhán Murphy', role: 'Freelance designer · Dublin', initial: 'S', bg: '#0A0618' },
  { quote: '"We use Cartaio every day for converting Word docs and merging reports. It\'s clean, fast, and the team plan is a fraction of what Adobe costs."', name: 'Klaus Becker', role: 'Operations Manager · Frankfurt', initial: 'K', bg: '#7C3AED' },
  { quote: '"Finally a PDF tool with no annoying ads or upgrade walls. The AI summary feature alone is worth the Pro plan."', name: 'Aoife Brennan', role: 'Small business owner · Cork', initial: 'A', bg: '#A78BFA' },
]

/* ─── shared styles ─── */

const S = {
  section: { padding: '104px 56px' } as React.CSSProperties,
  wrap: { maxWidth: '1120px', margin: '0 auto' } as React.CSSProperties,
  eyebrow: {
    fontFamily: "'DM Mono', monospace", fontSize: '11px', fontWeight: 600,
    letterSpacing: '.12em', textTransform: 'uppercase' as const, color: '#C4B5FD',
    display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '16px',
  } as React.CSSProperties,
  sectionH: {
    fontFamily: "'Instrument Serif', serif",
    fontSize: 'clamp(36px,4vw,54px)', fontWeight: 400, lineHeight: 1.08,
    color: '#FFFFFF', marginBottom: '20px',
  } as React.CSSProperties,
  sectionP: {
    fontFamily: "'Urbanist', sans-serif", fontSize: '17px', fontWeight: 400,
    color: 'rgba(255,255,255,.65)', maxWidth: '520px', lineHeight: 1.75, marginBottom: '52px',
  } as React.CSSProperties,
}

/* ─── page ─── */

export default function LandingPage() {
  return (
    <div style={{ background: '#0A0618', minHeight: '100vh' }}>
      <Nav />

      {/* ── HERO ── */}
      <section style={{
        minHeight: '100vh', padding: '100px 56px 0',
        display: 'grid', gridTemplateColumns: '1.1fr .9fr',
        alignItems: 'center', gap: '48px', position: 'relative', overflow: 'hidden',
        background: 'linear-gradient(135deg,#0A0618 0%,#0F0A28 40%,#130D35 70%,#0A0618 100%)',
      }}>
        {/* blobs */}
        <div style={{ position: 'absolute', top: '-100px', left: '30%', width: '600px', height: '600px', background: 'radial-gradient(circle,rgba(124,58,237,.25) 0%,transparent 65%)', borderRadius: '50%', pointerEvents: 'none', animation: 'blobPulse 7s ease-in-out infinite' }} />
        <div style={{ content: '', position: 'absolute', bottom: '-100px', right: '-100px', width: '500px', height: '500px', background: 'radial-gradient(circle,rgba(99,102,241,.18) 0%,transparent 65%)', borderRadius: '50%', pointerEvents: 'none' }} />

        {/* Left */}
        <div style={{ paddingBottom: '80px', position: 'relative', zIndex: 1 }}>
          <span style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', background: 'rgba(124,58,237,.18)', border: '1px solid rgba(167,139,250,.35)', padding: '5px 14px', borderRadius: '100px', fontFamily: "'DM Mono', monospace", fontSize: '11px', fontWeight: 600, color: '#C4B5FD', letterSpacing: '.12em', textTransform: 'uppercase', marginBottom: '24px' }}>
            Free online PDF tools
          </span>
          <h1 style={{ fontFamily: "'Instrument Serif', serif", fontSize: 'clamp(50px,5.2vw,76px)', fontWeight: 400, lineHeight: 1.02, color: '#FFFFFF', marginBottom: '24px' }}>
            Convert, Edit<br />
            &amp; <span style={{ textDecoration: 'underline', textDecorationColor: '#7C3AED', textUnderlineOffset: '4px' }}>Sign PDFs</span><br />
            <em style={{ fontStyle: 'italic', color: '#C4B5FD' }}>Free. Online.</em>
          </h1>
          <p style={{ fontFamily: "'Urbanist', sans-serif", fontSize: '17px', fontWeight: 400, color: 'rgba(255,255,255,.7)', lineHeight: 1.75, maxWidth: '460px', marginBottom: '36px' }}>
            20+ PDF tools, right in your browser. No software to install, no account needed. Compress, merge, convert and sign — done in seconds.
          </p>
          <div style={{ display: 'flex', alignItems: 'center', gap: '14px', flexWrap: 'wrap', marginBottom: '52px' }}>
            <Link href="/#tools" style={{ background: 'linear-gradient(135deg,#7C3AED,#6366F1)', color: '#fff', padding: '13px 26px', borderRadius: '100px', fontSize: '15px', fontWeight: 700, textDecoration: 'none', display: 'inline-flex', alignItems: 'center', gap: '8px', boxShadow: '0 4px 24px rgba(124,58,237,.45)' }}>
              Get started free
              <svg width="14" height="14" viewBox="0 0 24 24" stroke="currentColor" fill="none" strokeWidth="2.5"><path d="M5 12h14M12 5l7 7-7 7" /></svg>
            </Link>
            <Link href="/#tools" style={{ color: 'rgba(255,255,255,.8)', fontSize: '14px', fontWeight: 500, textDecoration: 'none', display: 'inline-flex', alignItems: 'center', gap: '6px', border: '1px solid rgba(255,255,255,.2)', padding: '12px 22px', borderRadius: '100px', fontFamily: "'Urbanist', sans-serif" }}>
              Browse all tools ↓
            </Link>
          </div>
          <div style={{ display: 'flex', gap: 0, paddingTop: '32px', borderTop: '1px solid rgba(255,255,255,.12)' }}>
            {[{ num: '20+', label: 'Free PDF tools' }, { num: '€9', label: 'vs Adobe €180/yr' }, { num: '0', label: 'Sign-up needed' }].map((p, i) => (
              <div key={i} style={{ paddingRight: i < 2 ? '32px' : 0, marginRight: i < 2 ? '32px' : 0, borderRight: i < 2 ? '1px solid rgba(255,255,255,.12)' : 'none' }}>
                <div style={{ fontFamily: "'Instrument Serif', serif", fontSize: '32px', color: '#FFFFFF', lineHeight: 1 }}>{p.num}</div>
                <div style={{ fontSize: '12px', color: 'rgba(255,255,255,.6)', marginTop: '3px', fontFamily: "'Urbanist', sans-serif" }}>{p.label}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Right — widget */}
        <div style={{ position: 'relative', zIndex: 1, display: 'flex', alignItems: 'center', justifyContent: 'flex-start', paddingBottom: '80px' }}>
          <HeroWidget />
        </div>
      </section>

      {/* ── TRUST STRIP ── */}
      <div style={{ background: '#13102B', padding: '16px 56px', display: 'flex', alignItems: 'center', overflowX: 'auto', borderTop: '1px solid rgba(139,135,200,.22)', borderBottom: '1px solid rgba(139,135,200,.22)' }}>
        {['No sign-up required', 'No software to install', 'Works on any device', 'Files auto-deleted after download', 'Built in Ireland 🇮🇪'].map((item, i) => (
          <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '10px', fontFamily: "'DM Mono', monospace", fontSize: '11px', color: 'rgba(255,255,255,.7)', letterSpacing: '.06em', padding: '0 36px', borderRight: i < 4 ? '1px solid rgba(139,135,200,.22)' : 'none', whiteSpace: 'nowrap', flexShrink: 0, ...(i === 0 ? { paddingLeft: 0 } : {}) }}>
            <div style={{ width: '5px', height: '5px', borderRadius: '50%', background: '#A78BFA', flexShrink: 0 }} />
            {item}
          </div>
        ))}
      </div>

      {/* ── TOOLS ── */}
      <section style={{ ...S.section, background: '#13102B' }} id="tools">
        <div style={S.wrap}>
          <div style={S.eyebrow}>All PDF tools, free<span style={{ display: 'block', width: '32px', height: '1px', background: '#C4B5FD', opacity: .4 }} /></div>
          <div style={S.sectionH}>Every PDF tool you need.<br /><em style={{ fontStyle: 'italic', color: '#C4B5FD' }}>One place. No fuss.</em></div>
          <p style={S.sectionP}>Compress a PDF, convert Word to PDF, merge files, sign documents online — all in your browser. No downloads, no accounts, no ads.</p>

          {/* Filter row */}
          <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap', marginBottom: '32px' }}>
            {['All tools', 'Convert', 'Edit', 'Security', 'Sign', 'AI', '💰 Finance'].map((f, i) => (
              <button key={f} style={{
                padding: '7px 18px', borderRadius: '100px', fontSize: '13px', fontWeight: 500,
                border: '1px solid rgba(139,135,200,.22)', cursor: 'pointer', transition: 'all .15s',
                background: i === 0 ? '#7C3AED' : 'transparent',
                color: i === 0 ? '#fff' : '#B8B5D8',
                borderColor: i === 0 ? '#7C3AED' : 'rgba(139,135,200,.22)',
                fontFamily: "'Urbanist', sans-serif",
              }}>{f}</button>
            ))}
          </div>

          {/* Tools grid */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4,1fr)', gap: '1px', background: 'rgba(139,135,200,.22)', border: '1px solid rgba(139,135,200,.22)', borderRadius: '12px', overflow: 'hidden' }}>
            {tools.map((t) => (
              <div key={t.label} style={{ background: '#1C1842', padding: '24px 22px', transition: 'background .15s', cursor: 'pointer', position: 'relative' }}
                onMouseEnter={e => (e.currentTarget.style.background = '#252050')}
                onMouseLeave={e => (e.currentTarget.style.background = '#1C1842')}
              >
                <div style={{ width: '36px', height: '36px', borderRadius: '8px', background: 'rgba(124,58,237,.15)', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '12px' }}>
                  <svg width="18" height="18" viewBox="0 0 24 24" stroke="#9F6BF5" fill="none" strokeWidth="1.5" strokeLinecap="round">
                    <path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z" /><polyline points="14 2 14 8 20 8" />
                  </svg>
                </div>
                {t.badge && (
                  <span style={{ position: 'absolute', top: '14px', right: '14px', fontFamily: "'DM Mono', monospace", fontSize: '9px', fontWeight: 500, letterSpacing: '.06em', color: '#9F6BF5', background: 'rgba(124,58,237,.18)', border: '1px solid rgba(124,58,237,.25)', padding: '2px 7px', borderRadius: '3px' }}>{t.badge}</span>
                )}
                <h3 style={{ fontSize: '14px', fontWeight: 600, color: '#FFFFFF', marginBottom: '4px', fontFamily: "'Urbanist', sans-serif" }}>{t.label}</h3>
                <p style={{ fontSize: '12px', color: 'rgba(255,255,255,.6)', lineHeight: 1.5, fontFamily: "'Urbanist', sans-serif" }}>{t.desc}</p>
              </div>
            ))}
          </div>

          {/* Financial extraction sub-section */}
          <div style={{ marginTop: '64px', paddingTop: '64px', borderTop: '1px solid rgba(139,135,200,.22)' }}>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr auto', gap: '40px', alignItems: 'start', marginBottom: '36px' }}>
              <div>
                <div style={{ fontFamily: "'DM Mono', monospace", fontSize: '10px', fontWeight: 600, letterSpacing: '.14em', textTransform: 'uppercase', color: '#C4B5FD', marginBottom: '10px' }}>Financial &amp; Data Extraction</div>
                <div style={{ fontFamily: "'Instrument Serif', serif", fontSize: 'clamp(28px,3vw,40px)', fontWeight: 400, lineHeight: 1.1, color: '#FFFFFF', marginBottom: '12px' }}>Extract data from any<br />financial document</div>
                <p style={{ fontFamily: "'Urbanist', sans-serif", fontSize: '15px', fontWeight: 400, color: 'rgba(255,255,255,.65)', lineHeight: 1.7, maxWidth: '480px' }}>Convert bank statements, invoices, and receipts into structured data. Export directly to Excel, CSV, QuickBooks, or Xero — in seconds, not hours.</p>
              </div>
              <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap', justifyContent: 'flex-end', alignItems: 'flex-start', paddingTop: '8px' }}>
                {['Excel', 'CSV', 'QB', 'Xero', 'QBO', 'OFX'].map(b => (
                  <div key={b} style={{ display: 'flex', alignItems: 'center', gap: '5px', background: 'rgba(255,255,255,.06)', border: '1px solid rgba(139,135,200,.22)', borderRadius: '6px', padding: '6px 12px', fontFamily: "'DM Mono', monospace", fontSize: '10px', fontWeight: 500, color: 'rgba(255,255,255,.65)', whiteSpace: 'nowrap' }}>{b}</div>
                ))}
              </div>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4,1fr)', gap: '1px', background: 'rgba(139,135,200,.22)', border: '1px solid rgba(139,135,200,.22)', borderRadius: '12px', overflow: 'hidden' }}>
              {finTools.map((t) => (
                <div key={t.label} style={{ background: '#1C1842', padding: '24px 22px', transition: 'background .15s', cursor: 'pointer' }}
                  onMouseEnter={e => (e.currentTarget.style.background = '#252050')}
                  onMouseLeave={e => (e.currentTarget.style.background = '#1C1842')}
                >
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '14px' }}>
                    <div style={{ width: '40px', height: '40px', borderRadius: '10px', background: `${t.color}26`, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                      <svg width="20" height="20" viewBox="0 0 24 24" stroke={t.color === '#10B981' ? '#34D399' : t.color === '#F59E0B' ? '#FCD34D' : '#A78BFA'} fill="none" strokeWidth="1.5" strokeLinecap="round">
                        <path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z" /><polyline points="14 2 14 8 20 8" />
                      </svg>
                    </div>
                    {t.badge && <span style={{ fontFamily: "'DM Mono', monospace", fontSize: '9px', fontWeight: 500, letterSpacing: '.06em', color: '#C4B5FD', background: 'rgba(124,58,237,.18)', border: '1px solid rgba(124,58,237,.3)', padding: '2px 7px', borderRadius: '3px' }}>{t.badge}</span>}
                  </div>
                  <h3 style={{ fontFamily: "'Urbanist', sans-serif", fontSize: '14px', fontWeight: 700, color: '#FFFFFF', marginBottom: '6px', lineHeight: 1.3 }}>{t.label}</h3>
                  <p style={{ fontFamily: "'Urbanist', sans-serif", fontSize: '12px', color: 'rgba(255,255,255,.6)', lineHeight: 1.55, marginBottom: '14px' }}>{t.desc}</p>
                  <div style={{ display: 'flex', gap: '4px', flexWrap: 'wrap' }}>
                    {t.formats.map(f => <span key={f} style={{ fontFamily: "'DM Mono', monospace", fontSize: '9px', color: 'rgba(255,255,255,.55)', background: 'rgba(255,255,255,.06)', border: '1px solid rgba(139,135,200,.22)', padding: '2px 7px', borderRadius: '3px', whiteSpace: 'nowrap' }}>{f}</span>)}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── API ── */}
      <section style={{ background: '#0A0618', padding: '104px 56px' }} id="api">
        <div style={{ ...S.wrap, display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '72px', alignItems: 'start' }}>
          <div>
            <div style={S.eyebrow}>REST API<span style={{ display: 'block', width: '32px', height: '1px', background: '#C4B5FD', opacity: .4 }} /></div>
            <div style={S.sectionH}>Build PDF tools<br />into your <em style={{ fontStyle: 'italic', color: '#C4B5FD' }}>own app.</em></div>
            <p style={{ ...S.sectionP, marginBottom: '36px' }}>The Cartaio API gives developers full programmatic access to every PDF tool — convert, compress, sign, extract financial data — via simple REST endpoints. Ship in minutes.</p>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 0, marginBottom: '36px' }}>
              {[
                { title: 'Fast & reliable', desc: '99.9% uptime SLA. Average response under 2 seconds for most operations.' },
                { title: 'Secure by default', desc: 'API key auth, HTTPS only, files wiped after processing. No data stored.' },
                { title: 'Batch processing', desc: 'Submit up to 500 files per request. Async callbacks via webhooks when done.' },
                { title: 'EU data residency', desc: 'All API processing happens on EU servers. GDPR Article 28 compliant.' },
              ].map(f => (
                <div key={f.title} style={{ display: 'flex', gap: '14px', padding: '16px 0', borderBottom: '1px solid rgba(255,255,255,.07)' }}>
                  <div style={{ width: '32px', height: '32px', borderRadius: '8px', background: 'rgba(124,58,237,.2)', border: '1px solid rgba(124,58,237,.3)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, marginTop: '2px' }}>
                    <svg width="14" height="14" viewBox="0 0 24 24" stroke="#C4B5FD" fill="none" strokeWidth="1.5" strokeLinecap="round">
                      <polyline points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" />
                    </svg>
                  </div>
                  <div>
                    <h4 style={{ fontFamily: "'Urbanist', sans-serif", fontSize: '14px', fontWeight: 600, color: '#FFFFFF', marginBottom: '3px' }}>{f.title}</h4>
                    <p style={{ fontFamily: "'Urbanist', sans-serif", fontSize: '13px', color: 'rgba(255,255,255,.55)', lineHeight: 1.5 }}>{f.desc}</p>
                  </div>
                </div>
              ))}
            </div>
            <div style={{ display: 'flex', gap: '12px', alignItems: 'center', flexWrap: 'wrap' }}>
              <Link href="/docs" style={{ background: 'linear-gradient(135deg,#7C3AED,#6366F1)', color: '#fff', padding: '12px 24px', borderRadius: '8px', fontFamily: "'Urbanist', sans-serif", fontSize: '14px', fontWeight: 700, textDecoration: 'none', display: 'inline-flex', alignItems: 'center', gap: '7px', boxShadow: '0 4px 16px rgba(124,58,237,.35)' }}>
                View API docs
              </Link>
              <Link href="/signup" style={{ color: 'rgba(255,255,255,.7)', fontFamily: "'Urbanist', sans-serif", fontSize: '14px', fontWeight: 500, textDecoration: 'none', display: 'inline-flex', alignItems: 'center', gap: '6px', border: '1px solid rgba(255,255,255,.2)', padding: '11px 20px', borderRadius: '8px' }}>
                Get API key →
              </Link>
            </div>
          </div>

          {/* Code panel */}
          <div style={{ background: '#0D0A1A', border: '1px solid rgba(139,135,200,.2)', borderRadius: '16px', overflow: 'hidden', fontFamily: "'DM Mono', monospace" }}>
            <div style={{ display: 'flex', borderBottom: '1px solid rgba(139,135,200,.15)', background: '#0A0716' }}>
              {['Endpoints', 'cURL', 'Node.js', 'Python'].map((tab, i) => (
                <div key={tab} style={{ padding: '10px 18px', fontSize: '11px', fontWeight: 500, color: i === 0 ? '#C4B5FD' : 'rgba(255,255,255,.35)', borderBottom: i === 0 ? '2px solid #7C3AED' : '2px solid transparent', cursor: 'pointer', letterSpacing: '.04em' }}>{tab}</div>
              ))}
            </div>
            {[
              { method: 'POST', path: '/v1/convert', desc: 'Convert any file to PDF' },
              { method: 'POST', path: '/v1/compress', desc: 'Compress PDF file size' },
              { method: 'POST', path: '/v1/merge', desc: 'Merge multiple PDFs' },
              { method: 'POST', path: '/v1/extract/bank-statement', desc: 'Extract transactions' },
              { method: 'POST', path: '/v1/extract/invoice', desc: 'Extract invoice data' },
              { method: 'POST', path: '/v1/sign', desc: 'Apply e-signature' },
              { method: 'GET', path: '/v1/job/{id}', desc: 'Poll async job status' },
            ].map(ep => (
              <div key={ep.path} style={{ padding: '14px 20px', borderBottom: '1px solid rgba(139,135,200,.1)', display: 'flex', alignItems: 'center', gap: '10px' }}>
                <span style={{ fontSize: '10px', fontWeight: 700, padding: '3px 8px', borderRadius: '4px', letterSpacing: '.06em', flexShrink: 0, background: ep.method === 'GET' ? 'rgba(16,185,129,.15)' : 'rgba(124,58,237,.2)', color: ep.method === 'GET' ? '#34D399' : '#A78BFA' }}>{ep.method}</span>
                <span style={{ fontSize: '12px', color: 'rgba(255,255,255,.8)', flex: 1 }}>{ep.path}</span>
                <span style={{ fontSize: '10px', color: 'rgba(255,255,255,.35)', textAlign: 'right', whiteSpace: 'nowrap' }}>{ep.desc}</span>
              </div>
            ))}
            <div style={{ background: '#0A0716', borderTop: '1px solid rgba(139,135,200,.1)' }}>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '10px 16px', borderBottom: '1px solid rgba(139,135,200,.08)' }}>
                <span style={{ fontSize: '10px', color: 'rgba(255,255,255,.3)', letterSpacing: '.08em', textTransform: 'uppercase' }}>cURL</span>
              </div>
              <pre style={{ padding: '16px 20px', fontSize: '11px', lineHeight: 1.7, color: 'rgba(255,255,255,.7)', overflowX: 'auto', margin: 0 }}>{`curl -X POST https://api.cartaio.io/v1/extract/bank-statement \\
  -H "Authorization: Bearer sk_live_••••" \\
  -F file=@statement.pdf \\
  -F format="csv"`}</pre>
            </div>
          </div>
        </div>
      </section>

      {/* ── WHY ── */}
      <section style={{ ...S.section, background: '#0A0618' }} id="why">
        <div style={S.wrap}>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '80px', alignItems: 'start' }}>
            <div>
              <div style={S.eyebrow}>Why Cartaio<span style={{ display: 'block', width: '32px', height: '1px', background: '#C4B5FD', opacity: .4 }} /></div>
              <div style={S.sectionH}>Better than Adobe.<br /><em style={{ fontStyle: 'italic', color: '#C4B5FD' }}>A fraction</em> of the price.</div>
              <p style={{ ...S.sectionP, marginBottom: '40px' }}>Adobe Acrobat charges up to €180 a year. Smallpdf and iLovePDF are cluttered with ads and paywalls. Cartaio gives you everything you need — clean, fast, and affordable.</p>
              <div style={{ display: 'flex', flexDirection: 'column' }}>
                {whyItems.map(ci => (
                  <div key={ci.num} style={{ display: 'flex', gap: '16px', padding: '20px 0', borderBottom: '1px solid rgba(139,135,200,.22)' }}>
                    <div style={{ fontFamily: "'DM Mono', monospace", fontSize: '11px', color: '#C4B5FD', fontWeight: 500, paddingTop: '2px', flexShrink: 0, width: '20px' }}>{ci.num}</div>
                    <div>
                      <h4 style={{ fontSize: '15px', fontWeight: 600, marginBottom: '4px', fontFamily: "'Urbanist', sans-serif", color: '#FFFFFF' }}>{ci.title}</h4>
                      <p style={{ fontSize: '13px', color: 'rgba(255,255,255,.6)', lineHeight: 1.55, fontFamily: "'Urbanist', sans-serif" }}>{ci.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div>
              <div style={{ background: 'rgba(255,255,255,.03)', border: '1px solid rgba(139,135,200,.22)', borderRadius: '12px', overflow: 'hidden' }}>
                <div style={{ padding: '16px 24px', borderBottom: '1px solid rgba(139,135,200,.22)', fontFamily: "'DM Mono', monospace", fontSize: '9px', color: 'rgba(255,255,255,.4)', letterSpacing: '.14em', textTransform: 'uppercase' }}>Cartaio vs the alternatives</div>
                {certRows.map((row, i) => (
                  <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '16px', padding: '18px 24px', borderBottom: i < certRows.length - 1 ? '1px solid rgba(139,135,200,.22)' : 'none', transition: 'background .15s' }}
                    onMouseEnter={e => (e.currentTarget.style.background = 'rgba(124,58,237,.08)')}
                    onMouseLeave={e => (e.currentTarget.style.background = 'transparent')}
                  >
                    <div style={{ width: '38px', height: '38px', borderRadius: '8px', background: 'rgba(124,58,237,.15)', border: '1px solid rgba(124,58,237,.25)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                      <svg width="16" height="16" viewBox="0 0 24 24" stroke="#C4B5FD" fill="none" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M12 2L2 7l10 5 10-5-10-5z" /><path d="M2 17l10 5 10-5" /><path d="M2 12l10 5 10-5" />
                      </svg>
                    </div>
                    <div style={{ flex: 1 }}>
                      <h4 style={{ fontSize: '13px', fontWeight: 600, color: '#FFFFFF', marginBottom: '2px' }}>{row.title}</h4>
                      <p style={{ fontSize: '11px', color: 'rgba(255,255,255,.5)', lineHeight: 1.4 }}>{row.sub}</p>
                    </div>
                    <span style={{ fontFamily: "'DM Mono', monospace", fontSize: '9px', fontWeight: 600, letterSpacing: '.07em', padding: '4px 11px', borderRadius: '4px', color: '#6EE7A0', background: 'rgba(110,231,160,.1)', border: '1px solid rgba(110,231,160,.2)', flexShrink: 0 }}>Cartaio ✓</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── PRICING ── */}
      <section style={{ ...S.section, background: '#13102B' }} id="pricing">
        <div style={S.wrap}>
          <div style={{ textAlign: 'center', marginBottom: '56px' }}>
            <div style={{ ...S.eyebrow, justifyContent: 'center' }}>Simple pricing<span style={{ display: 'block', width: '32px', height: '1px', background: '#C4B5FD', opacity: .4 }} /></div>
            <div style={{ ...S.sectionH, textAlign: 'center' }}>Free to start.<br /><em style={{ fontStyle: 'italic', color: '#C4B5FD' }}>Affordable</em> to grow.</div>
            <p style={{ ...S.sectionP, margin: '0 auto' }}>Most tools are completely free. Upgrade for unlimited use, team features, and priority processing. No hidden fees.</p>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: '20px' }}>
            {[
              { name: 'Free', price: '€0', period: 'forever, no sign-up needed', desc: 'All core PDF tools free, right in your browser. No account required.', features: ['20+ PDF tools, free', 'No sign-up required', 'Files deleted after download', 'Works on any device', 'No ads'], cta: 'Use free tools', href: '/#tools', featured: false },
              { name: 'Pro', price: '€9', period: 'per month · cancel anytime', desc: 'Unlimited processing, larger files, faster conversions, and AI tools.', features: ['Everything in Free', 'Unlimited PDF processing', 'Files up to 5GB', 'AI summarise & translate', '50 e-signatures / month', 'Priority processing', 'Email support'], cta: 'Start 7-day free trial', href: '/signup?plan=pro', featured: true },
              { name: 'Teams', price: '€39', period: 'per month · up to 10 users', desc: 'For businesses and teams that need shared access, e-signing workflows, and bulk processing.', features: ['Everything in Pro', 'Up to 10 team members', 'Unlimited e-signatures', 'Shared document storage', 'Bulk PDF processing', 'Priority support'], cta: 'Start 7-day free trial', href: '/signup?plan=teams', featured: false },
            ].map(plan => (
              <div key={plan.name} style={{
                border: `1px solid ${plan.featured ? 'rgba(124,58,237,.5)' : 'rgba(139,135,200,.22)'}`,
                borderRadius: '16px', padding: '36px 30px',
                background: plan.featured ? 'linear-gradient(135deg,#3B1F8C,#4F46E5)' : '#1C1842',
                position: 'relative', transition: 'transform .18s,box-shadow .18s',
                boxShadow: plan.featured ? '0 0 40px rgba(124,58,237,.25)' : 'none',
              }}>
                {plan.featured && <div style={{ position: 'absolute', top: '-11px', left: '30px', background: '#7C3AED', color: '#fff', fontFamily: "'DM Mono', monospace", fontSize: '9px', fontWeight: 500, letterSpacing: '.1em', textTransform: 'uppercase', padding: '3px 12px', borderRadius: '3px' }}>Most popular</div>}
                <div style={{ fontFamily: "'DM Mono', monospace", fontSize: '10px', fontWeight: 600, letterSpacing: '.16em', textTransform: 'uppercase', color: 'rgba(255,255,255,.55)', marginBottom: '20px', paddingBottom: '20px', borderBottom: `1px solid ${plan.featured ? 'rgba(255,255,255,.12)' : 'rgba(139,135,200,.22)'}` }}>{plan.name}</div>
                <div style={{ display: 'flex', alignItems: 'flex-end', gap: '4px', marginBottom: '4px' }}>
                  {plan.price !== '€0' && <span style={{ fontFamily: "'Urbanist', sans-serif", fontSize: '18px', fontWeight: 500, color: 'rgba(255,255,255,.6)', lineHeight: 1, paddingBottom: '10px' }}>€</span>}
                  <span style={{ fontFamily: "'Instrument Serif', serif", fontSize: '62px', fontWeight: 400, color: '#FFFFFF', lineHeight: 1, letterSpacing: '-0.02em' }}>{plan.price.replace('€', '')}</span>
                </div>
                <div style={{ fontSize: '12px', color: 'rgba(255,255,255,.5)', marginBottom: '18px', fontFamily: "'DM Mono', monospace", letterSpacing: '.04em' }}>{plan.period}</div>
                <div style={{ fontSize: '13px', color: 'rgba(255,255,255,.6)', marginBottom: '24px', lineHeight: 1.6, fontFamily: "'Urbanist', sans-serif" }}>{plan.desc}</div>
                <div style={{ marginBottom: '28px' }}>
                  {plan.features.map(f => (
                    <div key={f} style={{ display: 'flex', alignItems: 'flex-start', gap: '10px', fontSize: '13px', color: plan.featured ? 'rgba(255,255,255,.85)' : 'rgba(255,255,255,.7)', padding: '9px 0', borderBottom: `1px solid ${plan.featured ? 'rgba(255,255,255,.1)' : 'rgba(139,135,200,.22)'}`, lineHeight: 1.4, fontFamily: "'Urbanist', sans-serif" }}>
                      <svg width="14" height="14" viewBox="0 0 24 24" stroke={plan.featured ? '#C4B5FD' : '#A78BFA'} fill="none" strokeWidth="2.5" style={{ flexShrink: 0, marginTop: '1px' }}><polyline points="20 6 9 17 4 12" /></svg>
                      {f}
                    </div>
                  ))}
                </div>
                <Link href={plan.href} style={{
                  display: 'block', width: '100%', padding: '13px', borderRadius: '8px',
                  fontSize: '14px', fontWeight: 600, textAlign: 'center', textDecoration: 'none',
                  fontFamily: "'Urbanist', sans-serif", letterSpacing: '.01em', transition: 'all .15s',
                  background: plan.featured ? '#7C3AED' : 'transparent',
                  border: plan.featured ? '1.5px solid #7C3AED' : '1.5px solid rgba(139,135,200,.22)',
                  color: plan.featured ? '#fff' : '#B8B5D8',
                  boxShadow: plan.featured ? '0 4px 16px rgba(124,58,237,.45)' : 'none',
                }}>{plan.cta}</Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── TESTIMONIALS ── */}
      <section style={{ ...S.section, background: '#0A0618' }}>
        <div style={S.wrap}>
          <div style={S.eyebrow}>What people say<span style={{ display: 'block', width: '32px', height: '1px', background: '#C4B5FD', opacity: .4 }} /></div>
          <div style={{ ...S.sectionH, marginBottom: '48px' }}>Used by thousands<br />of <em style={{ fontStyle: 'italic', color: '#C4B5FD' }}>happy customers.</em></div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: '20px' }}>
            {testimonials.map(t => (
              <div key={t.name} style={{ background: '#1C1842', border: '1px solid rgba(139,135,200,.22)', borderRadius: '12px', padding: '30px', transition: 'border-color .2s' }}
                onMouseEnter={e => (e.currentTarget.style.borderColor = 'rgba(124,58,237,.3)')}
                onMouseLeave={e => (e.currentTarget.style.borderColor = 'rgba(139,135,200,.22)')}
              >
                <div style={{ display: 'flex', gap: '3px', marginBottom: '16px', color: '#A78BFA', fontSize: '13px' }}>★★★★★</div>
                <div style={{ fontFamily: "'Instrument Serif', serif", fontSize: '17px', fontWeight: 400, fontStyle: 'italic', lineHeight: 1.55, color: '#FFFFFF', marginBottom: '22px' }}>{t.quote}</div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                  <div style={{ width: '36px', height: '36px', borderRadius: '50%', background: t.bg, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '14px', fontWeight: 700, color: '#fff', flexShrink: 0 }}>{t.initial}</div>
                  <div>
                    <div style={{ fontSize: '13px', fontWeight: 600, color: '#FFFFFF', fontFamily: "'Urbanist', sans-serif" }}>{t.name}</div>
                    <div style={{ fontSize: '11px', color: 'rgba(255,255,255,.55)', fontFamily: "'Urbanist', sans-serif" }}>{t.role}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA ── */}
      <section style={{ background: 'linear-gradient(135deg,#2D1B69,#3730A3,#1E1B4B)', padding: '96px 56px', textAlign: 'center', position: 'relative', overflow: 'hidden' }}>
        <div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%,-50%)', width: '600px', height: '300px', background: 'radial-gradient(ellipse,rgba(124,58,237,.3) 0%,transparent 70%)', pointerEvents: 'none' }} />
        <div style={{ fontFamily: "'DM Mono', monospace", fontSize: '11px', fontWeight: 600, letterSpacing: '.12em', textTransform: 'uppercase', color: 'rgba(167,139,250,.7)', display: 'flex', justifyContent: 'center', marginBottom: '16px' }}>Get started free</div>
        <h2 style={{ fontFamily: "'Instrument Serif', serif", fontSize: 'clamp(36px,4vw,56px)', fontWeight: 400, color: '#fff', lineHeight: 1.08, marginBottom: '18px', position: 'relative', zIndex: 1 }}>Stop paying Adobe.<br />Start using Cartaio.</h2>
        <p style={{ fontFamily: "'Urbanist', sans-serif", fontSize: '17px', fontWeight: 300, color: 'rgba(255,255,255,.6)', marginBottom: '40px', position: 'relative', zIndex: 1 }}>Free PDF tools, right in your browser. No sign-up. No software. No nonsense.</p>
        <Link href="/#tools" style={{ background: '#fff', color: '#7C3AED', padding: '15px 36px', borderRadius: '100px', fontSize: '15px', fontWeight: 700, textDecoration: 'none', display: 'inline-flex', alignItems: 'center', gap: '8px', transition: 'all .18s', position: 'relative', zIndex: 1, fontFamily: "'Urbanist', sans-serif" }}>
          Try free tools now
          <svg width="14" height="14" viewBox="0 0 24 24" stroke="currentColor" fill="none" strokeWidth="2.5"><path d="M5 12h14M12 5l7 7-7 7" /></svg>
        </Link>
        <div style={{ fontFamily: "'DM Mono', monospace", fontSize: '11px', color: 'rgba(255,255,255,.3)', marginTop: '16px', letterSpacing: '.06em', position: 'relative', zIndex: 1 }}>No sign-up required · Files deleted after download · Built in Ireland 🇮🇪</div>
      </section>

      <Footer />
    </div>
  )
}
