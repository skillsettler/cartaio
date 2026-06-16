'use client'
import { useState, useEffect } from 'react'

type Step = 1 | 2 | 3
type DocType = 'Bank Statement' | 'Invoice' | 'Receipt' | 'Any PDF'
type FmtType = 'CSV' | 'Excel' | 'QBO' | 'OFX' | 'Xero' | 'JSON'

const DOC_NAMES: Record<DocType, string> = {
  'Bank Statement': 'bank_statement_jan_2026.pdf',
  'Invoice': 'invoice_0042_acme.pdf',
  'Receipt': 'receipt_lidl_jan05.jpg',
  'Any PDF': 'document.pdf',
}

const FMT_DESC: Record<FmtType, string> = {
  CSV: 'Universal', Excel: 'Most popular', QBO: 'QuickBooks',
  OFX: 'Accounting', Xero: 'Direct import', JSON: 'API / Dev',
}

const PROC_LABELS = (fmt: FmtType) => [
  'Reading document structure',
  'Extracting transactions',
  `Formatting ${fmt} output`,
]

export function HeroWidget() {
  const [step, setStep] = useState<Step>(1)
  const [docType, setDocType] = useState<DocType>('Bank Statement')
  const [fmt, setFmt] = useState<FmtType>('CSV')
  const [liveCount, setLiveCount] = useState(48)
  const [procStep, setProcStep] = useState(0)
  const [done, setDone] = useState(false)

  useEffect(() => {
    const id = setInterval(() => setLiveCount(42 + Math.floor(Math.random() * 18)), 4000)
    return () => clearInterval(id)
  }, [])

  const handleUpload = () => setStep(2)

  const handleConvert = () => {
    setStep(3)
    setProcStep(0)
    setDone(false)
    setTimeout(() => setProcStep(1), 200)
    setTimeout(() => setProcStep(2), 1100)
    setTimeout(() => setProcStep(3), 2000)
    setTimeout(() => setDone(true), 2500)
  }

  const handleReset = () => {
    setStep(1)
    setProcStep(0)
    setDone(false)
  }

  const stepDotStyle = (n: number): React.CSSProperties => ({
    width: '18px', height: '18px', borderRadius: '50%',
    background: step > n ? '#22c55e' : step === n ? '#7C3AED' : '#E5E3EF',
    display: 'flex', alignItems: 'center', justifyContent: 'center',
    fontFamily: "'DM Mono', monospace", fontSize: '9px', fontWeight: 500,
    color: step >= n ? '#fff' : '#6B6884',
    boxShadow: step === n ? '0 0 10px rgba(124,58,237,.4)' : 'none',
    flexShrink: 0, transition: 'all .3s',
  })

  const procDotBg = (i: number) => {
    if (done || procStep > i) return '#22c55e'
    if (procStep === i) return '#7C3AED'
    return '#E5E3EF'
  }

  return (
    <div style={{
      background: '#FFFFFF', border: '1px solid #E5E3EF', borderRadius: '16px',
      overflow: 'hidden', boxShadow: '0 8px 40px rgba(0,0,0,.35),0 0 0 1px rgba(124,58,237,.08)',
      width: '100%', maxWidth: '440px',
    }}>
      {/* Header */}
      <div style={{
        padding: '14px 20px', borderBottom: '1px solid #E5E3EF',
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        background: '#F5F4FA', gap: '12px',
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <div style={{
            width: '7px', height: '7px', borderRadius: '50%', background: '#22c55e',
            flexShrink: 0, animation: 'livePulse 2s ease-in-out infinite',
          }} />
          <span style={{ fontFamily: "'DM Mono', monospace", fontSize: '10px', color: '#6B6884', letterSpacing: '.04em', whiteSpace: 'nowrap' }}>
            {liveCount} people converting right now
          </span>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: 0 }}>
          {([1, 2, 3] as Step[]).map(n => (
            <div key={n} style={{ display: 'flex', alignItems: 'center' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '5px', opacity: step === n ? 1 : step > n ? 0.7 : 0.35 }}>
                <div style={stepDotStyle(n)}>{step > n ? '✓' : n}</div>
                <span style={{ fontFamily: "'DM Mono', monospace", fontSize: '9px', color: '#6B6884', letterSpacing: '.06em', textTransform: 'uppercase' }}>
                  {n === 1 ? 'Upload' : n === 2 ? 'Format' : 'Download'}
                </span>
              </div>
              {n < 3 && <div style={{ width: '20px', height: '1px', background: '#E5E3EF', margin: '0 4px', flexShrink: 0 }} />}
            </div>
          ))}
        </div>
      </div>

      {/* Step 1 — Upload */}
      {step === 1 && (
        <div style={{ padding: '20px', background: '#FFFFFF' }}>
          <div style={{ display: 'flex', gap: '6px', marginBottom: '16px', flexWrap: 'wrap' }}>
            {(['Bank Statement', 'Invoice', 'Receipt', 'Any PDF'] as DocType[]).map(type => (
              <button key={type} onClick={() => setDocType(type)} style={{
                display: 'flex', alignItems: 'center', gap: '5px', padding: '6px 12px',
                borderRadius: '100px', border: `1px solid ${docType === type ? '#7C3AED' : '#E5E3EF'}`,
                background: docType === type ? '#7C3AED' : '#FFFFFF',
                color: docType === type ? '#fff' : '#6B6884',
                fontFamily: "'Urbanist', sans-serif", fontSize: '12px', fontWeight: 500, cursor: 'pointer',
              }}>
                {type}
              </button>
            ))}
          </div>

          <div
            onClick={handleUpload}
            role="button"
            tabIndex={0}
            onKeyDown={e => e.key === 'Enter' && handleUpload()}
            style={{ border: '2px dashed #D4D0E8', borderRadius: '10px', padding: '28px 20px', textAlign: 'center', cursor: 'pointer', background: '#F8F7FC', transition: 'all .2s' }}
            onMouseEnter={e => { (e.currentTarget as HTMLDivElement).style.borderColor = '#7C3AED'; (e.currentTarget as HTMLDivElement).style.background = '#F3F0FD' }}
            onMouseLeave={e => { (e.currentTarget as HTMLDivElement).style.borderColor = '#D4D0E8'; (e.currentTarget as HTMLDivElement).style.background = '#F8F7FC' }}
          >
            <div style={{ width: '48px', height: '48px', background: 'rgba(124,58,237,.1)', borderRadius: '12px', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 12px', color: '#7C3AED' }}>
              <svg width="32" height="32" viewBox="0 0 24 24" stroke="currentColor" fill="none" strokeWidth="1.2" strokeLinecap="round">
                <path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4" /><polyline points="7 10 12 15 17 10" /><line x1="12" y1="15" x2="12" y2="3" />
              </svg>
            </div>
            <div style={{ fontFamily: "'Urbanist', sans-serif", fontSize: '14px', fontWeight: 600, color: '#1A1635', marginBottom: '4px' }}>Drag &amp; drop your file here</div>
            <div style={{ fontFamily: "'Urbanist', sans-serif", fontSize: '12px', color: '#6B6884', marginBottom: '12px' }}>or click to browse — PDF, JPG, PNG</div>
            <div style={{ display: 'flex', gap: '6px', justifyContent: 'center', flexWrap: 'wrap' }}>
              {['PDF', 'JPG', 'PNG', 'Excel'].map(f => (
                <span key={f} style={{ fontFamily: "'DM Mono', monospace", fontSize: '9px', color: '#6B6884', background: '#FFFFFF', border: '1px solid #E5E3EF', padding: '2px 8px', borderRadius: '4px' }}>{f}</span>
              ))}
            </div>
          </div>
          <div style={{ fontFamily: "'DM Mono', monospace", fontSize: '9px', color: '#A09BC0', textAlign: 'center', marginTop: '10px', letterSpacing: '.04em' }}>
            Max file size: 20MB · Files deleted after download
          </div>
        </div>
      )}

      {/* Step 2 — Format */}
      {step === 2 && (
        <div style={{ padding: '20px', background: '#FFFFFF' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px', background: '#F8F7FC', border: '1px solid #E5E3EF', borderRadius: '8px', padding: '12px 14px', marginBottom: '16px' }}>
            <div style={{ width: '32px', height: '32px', background: 'rgba(124,58,237,.1)', borderRadius: '6px', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
              <svg width="18" height="18" viewBox="0 0 24 24" stroke="#7C3AED" fill="none" strokeWidth="1.5">
                <path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z" /><polyline points="14 2 14 8 20 8" />
              </svg>
            </div>
            <div>
              <div style={{ fontFamily: "'Urbanist', sans-serif", fontSize: '13px', fontWeight: 600, color: '#1A1635' }}>{DOC_NAMES[docType]}</div>
              <div style={{ fontFamily: "'DM Mono', monospace", fontSize: '10px', color: '#6B6884' }}>2.4 MB · Ready to convert</div>
            </div>
            <div style={{ marginLeft: 'auto', width: '22px', height: '22px', background: '#22c55e', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff', fontSize: '11px', fontWeight: 700, flexShrink: 0 }}>✓</div>
          </div>

          <div style={{ fontFamily: "'DM Mono', monospace", fontSize: '10px', fontWeight: 500, letterSpacing: '.1em', textTransform: 'uppercase', color: '#6B6884', marginBottom: '10px' }}>Select output format</div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: '8px', marginBottom: '16px' }}>
            {(['CSV', 'Excel', 'QBO', 'OFX', 'Xero', 'JSON'] as FmtType[]).map(f => (
              <button key={f} onClick={() => setFmt(f)} style={{
                background: fmt === f ? '#F3F0FD' : '#F8F7FC',
                border: `1.5px solid ${fmt === f ? '#7C3AED' : '#E5E3EF'}`,
                borderRadius: '8px', padding: '10px 8px', cursor: 'pointer',
                textAlign: 'center', position: 'relative', transition: 'all .15s',
              }}>
                <div style={{ fontFamily: "'DM Mono', monospace", fontSize: '12px', fontWeight: 600, color: '#1A1635', marginBottom: '2px' }}>{f}</div>
                <div style={{ fontFamily: "'Urbanist', sans-serif", fontSize: '10px', color: '#6B6884' }}>{FMT_DESC[f]}</div>
                {f === 'Excel' && <div style={{ position: 'absolute', top: '-6px', right: '-6px', fontSize: '10px' }}>⭐</div>}
              </button>
            ))}
          </div>

          <button onClick={handleConvert} style={{
            width: '100%', background: 'linear-gradient(135deg,#7C3AED,#6366F1)', color: '#fff',
            border: 'none', borderRadius: '8px', padding: '13px',
            fontFamily: "'Urbanist', sans-serif", fontSize: '14px', fontWeight: 700,
            cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center',
            gap: '8px', boxShadow: '0 4px 16px rgba(124,58,237,.35)', letterSpacing: '.01em',
          }}>
            <svg width="14" height="14" viewBox="0 0 24 24" stroke="currentColor" fill="none" strokeWidth="2.5">
              <polyline points="23 4 23 10 17 10" /><path d="M20.49 15a9 9 0 11-2.12-9.36L23 10" />
            </svg>
            Convert Now
          </button>
        </div>
      )}

      {/* Step 3 — Processing / Done */}
      {step === 3 && (
        <div style={{ padding: '20px', background: '#FFFFFF' }}>
          {!done ? (
            <div style={{ textAlign: 'center', padding: '12px 0' }}>
              <div style={{ width: '40px', height: '40px', border: '3px solid #E5E3EF', borderTopColor: '#7C3AED', borderRadius: '50%', animation: 'spin .8s linear infinite', margin: '0 auto 16px' }} />
              <div style={{ fontFamily: "'Urbanist', sans-serif", fontSize: '15px', fontWeight: 600, color: '#1A1635', marginBottom: '16px' }}>Converting your file…</div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', textAlign: 'left' }}>
                {PROC_LABELS(fmt).map((label, i) => {
                  const active = procStep === i + 1
                  const done_ = done || procStep > i + 1
                  return (
                    <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '10px', fontFamily: "'Urbanist', sans-serif", fontSize: '13px', color: done_ ? '#1A1635' : '#6B6884' }}>
                      <div style={{
                        width: '16px', height: '16px', borderRadius: '50%', flexShrink: 0,
                        background: procDotBg(i + 1),
                        animation: active ? 'spin .6s linear infinite' : 'none',
                        display: 'flex', alignItems: 'center', justifyContent: 'center',
                        fontSize: '9px', color: '#fff', fontWeight: 700, transition: 'background .3s',
                      }}>{done_ ? '✓' : ''}</div>
                      <span>{label}</span>
                    </div>
                  )
                })}
              </div>
            </div>
          ) : (
            <div style={{ textAlign: 'center' }}>
              <div style={{ width: '48px', height: '48px', background: '#22c55e', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '22px', margin: '0 auto 12px', color: '#fff', animation: 'popIn .4s cubic-bezier(.34,1.56,.64,1) forwards' }}>✓</div>
              <div style={{ fontFamily: "'Instrument Serif', serif", fontSize: '22px', color: '#1A1635', marginBottom: '4px' }}>Conversion complete!</div>
              <div style={{ fontFamily: "'Urbanist', sans-serif", fontSize: '13px', color: '#6B6884', marginBottom: '16px' }}>Your file is ready to download</div>
              <div style={{ background: '#F8F7FC', border: '1px solid #E5E3EF', borderRadius: '8px', overflow: 'hidden', marginBottom: '16px', textAlign: 'left' }}>
                <div style={{ display: 'grid', gridTemplateColumns: '60px 1fr 70px 70px', gap: '8px', padding: '7px 12px', background: '#EEEAF8', fontFamily: "'DM Mono', monospace", fontSize: '10px', color: '#6B6884', fontWeight: 500 }}>
                  <span>Date</span><span>Description</span><span>Amount</span><span>Balance</span>
                </div>
                {[
                  { cells: ['01 Jan', 'Salary — Acme Ltd', '+€3,200', '€4,812'], posIdx: 2 },
                  { cells: ['03 Jan', 'Rent — Dublin 2', '-€1,450', '€3,362'], negIdx: 2 },
                  { cells: ['05 Jan', 'Lidl Grocery', '-€87.40', '€3,274'], negIdx: 2 },
                ].map((row, ri) => (
                  <div key={ri} style={{ display: 'grid', gridTemplateColumns: '60px 1fr 70px 70px', gap: '8px', padding: '7px 12px', borderTop: '1px solid #E5E3EF', fontFamily: "'DM Mono', monospace", fontSize: '10px' }}>
                    {row.cells.map((cell, ci) => (
                      <span key={ci} style={{ color: ('posIdx' in row && ci === row.posIdx) ? '#16a34a' : ('negIdx' in row && ci === row.negIdx) ? '#DC2626' : '#3D3A52', fontWeight: ('posIdx' in row && ci === row.posIdx) || ('negIdx' in row && ci === row.negIdx) ? 500 : 400 }}>{cell}</span>
                    ))}
                  </div>
                ))}
              </div>
              <div style={{ display: 'flex', gap: '8px' }}>
                <button onClick={handleReset} style={{ flex: 1, background: 'linear-gradient(135deg,#7C3AED,#6366F1)', color: '#fff', border: 'none', borderRadius: '8px', padding: '11px', fontFamily: "'Urbanist', sans-serif", fontSize: '13px', fontWeight: 700, cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '6px', boxShadow: '0 4px 12px rgba(124,58,237,.3)' }}>
                  <svg width="13" height="13" viewBox="0 0 24 24" stroke="currentColor" fill="none" strokeWidth="2.5"><path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4" /><polyline points="7 10 12 15 17 10" /><line x1="12" y1="15" x2="12" y2="3" /></svg>
                  Download {fmt}
                </button>
                <button onClick={handleReset} style={{ background: '#F8F7FC', color: '#3D3A52', border: '1px solid #E5E3EF', borderRadius: '8px', padding: '11px 14px', fontFamily: "'Urbanist', sans-serif", fontSize: '13px', fontWeight: 500, cursor: 'pointer', whiteSpace: 'nowrap' }}>Convert another</button>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  )
}
