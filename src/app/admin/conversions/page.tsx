import { createAdminClient } from '@/lib/supabase/admin'

type Conversion = {
  id: string; tool: string; plan: string | null; file_size_bytes: number | null
  processing_ms: number | null; via_api: boolean; created_at: string
}

function fmt(ts: string) {
  return new Date(ts).toLocaleString('en-IE', { day: 'numeric', month: 'short', hour: '2-digit', minute: '2-digit' })
}
function fmtBytes(b: number | null) {
  if (!b) return '—'
  if (b < 1024) return `${b} B`
  if (b < 1024 * 1024) return `${(b / 1024).toFixed(1)} KB`
  return `${(b / 1024 / 1024).toFixed(1)} MB`
}

export default async function ConversionsPage() {
  const admin = createAdminClient()

  let conversions: Conversion[] = []
  let totalCount = 0

  if (admin) {
    const today = new Date(); today.setHours(0, 0, 0, 0)
    const { data, count } = await admin
      .from('conversions')
      .select('*', { count: 'exact' })
      .order('created_at', { ascending: false })
      .limit(200)
    conversions = (data ?? []) as Conversion[]
    totalCount = count ?? 0
  }

  // Aggregate by tool
  const byTool = conversions.reduce<Record<string, number>>((acc, c) => {
    acc[c.tool] = (acc[c.tool] ?? 0) + 1
    return acc
  }, {})
  const topTools = Object.entries(byTool).sort((a, b) => b[1] - a[1]).slice(0, 5)

  const todayCount = conversions.filter(c => new Date(c.created_at) >= (() => { const d = new Date(); d.setHours(0,0,0,0); return d })()).length
  const apiCount = conversions.filter(c => c.via_api).length
  const avgMs = conversions.filter(c => c.processing_ms).reduce((s, c) => s + (c.processing_ms ?? 0), 0) / (conversions.filter(c => c.processing_ms).length || 1)

  return (
    <div style={{ padding: '32px 40px' }}>
      <div style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', marginBottom: '28px' }}>
        <div>
          <h1 style={{ fontFamily: "'Instrument Serif', serif", fontSize: '32px', fontWeight: 400, color: '#FFFFFF', marginBottom: '4px' }}>Conversions</h1>
          <p style={{ fontSize: '12px', color: 'rgba(255,255,255,.4)', fontFamily: "'DM Mono', monospace" }}>{totalCount} total</p>
        </div>
      </div>

      {/* Quick stats */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '16px', marginBottom: '32px' }}>
        {[
          { label: 'Total', value: totalCount },
          { label: 'Today', value: todayCount },
          { label: 'Via API', value: apiCount },
          { label: 'Avg speed', value: conversions.length ? `${Math.round(avgMs)}ms` : '—' },
        ].map(s => (
          <div key={s.label} style={{ background: '#13102B', border: '1px solid rgba(139,135,200,.15)', borderRadius: '10px', padding: '16px 20px' }}>
            <div style={{ fontFamily: "'Instrument Serif', serif", fontSize: '26px', color: '#FFFFFF', lineHeight: 1 }}>{s.value}</div>
            <div style={{ fontSize: '11px', color: 'rgba(255,255,255,.4)', fontFamily: "'DM Mono', monospace", marginTop: '4px' }}>{s.label}</div>
          </div>
        ))}
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '240px 1fr', gap: '24px' }}>
        {/* Top tools */}
        <div style={{ background: '#13102B', border: '1px solid rgba(139,135,200,.15)', borderRadius: '12px', padding: '20px' }}>
          <div style={{ fontSize: '12px', fontWeight: 600, color: '#FFFFFF', fontFamily: "'Urbanist', sans-serif", marginBottom: '16px' }}>Top Tools</div>
          {topTools.length === 0 ? (
            <p style={{ fontSize: '13px', color: 'rgba(255,255,255,.25)', fontFamily: "'Urbanist', sans-serif" }}>No data yet</p>
          ) : topTools.map(([tool, count]) => (
            <div key={tool} style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '12px' }}>
              <div style={{ flex: 1 }}>
                <div style={{ fontSize: '12px', color: '#FFFFFF', fontFamily: "'Urbanist', sans-serif", marginBottom: '4px' }}>{tool}</div>
                <div style={{ height: '4px', background: 'rgba(255,255,255,.08)', borderRadius: '2px', overflow: 'hidden' }}>
                  <div style={{ height: '100%', width: `${(count / (topTools[0]?.[1] ?? 1)) * 100}%`, background: '#7C3AED', borderRadius: '2px' }} />
                </div>
              </div>
              <span style={{ fontFamily: "'DM Mono', monospace", fontSize: '11px', color: '#C4B5FD', flexShrink: 0 }}>{count}</span>
            </div>
          ))}
        </div>

        {/* Table */}
        <div style={{ background: '#13102B', border: '1px solid rgba(139,135,200,.15)', borderRadius: '12px', overflow: 'hidden' }}>
          {conversions.length === 0 ? (
            <div style={{ padding: '64px', textAlign: 'center', color: 'rgba(255,255,255,.25)', fontSize: '14px', fontFamily: "'Urbanist', sans-serif" }}>
              {!admin ? 'Supabase not configured.' : 'No conversions yet.'}
            </div>
          ) : (
            <div style={{ overflowX: 'auto' }}>
              <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                <thead>
                  <tr style={{ borderBottom: '1px solid rgba(139,135,200,.15)', background: 'rgba(255,255,255,.02)' }}>
                    {['Tool', 'Plan', 'File size', 'Speed', 'Source', 'When'].map(h => (
                      <th key={h} style={{ padding: '11px 16px', textAlign: 'left', fontFamily: "'DM Mono', monospace", fontSize: '10px', color: 'rgba(255,255,255,.35)', fontWeight: 500, letterSpacing: '.08em', textTransform: 'uppercase', whiteSpace: 'nowrap' }}>{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {conversions.map((c, i) => (
                    <tr key={c.id} style={{ borderBottom: i < conversions.length - 1 ? '1px solid rgba(139,135,200,.08)' : 'none' }}>
                      <td style={{ padding: '10px 16px', fontSize: '13px', color: '#FFFFFF', fontFamily: "'Urbanist', sans-serif" }}>{c.tool}</td>
                      <td style={{ padding: '10px 16px', fontSize: '11px', color: 'rgba(255,255,255,.5)', fontFamily: "'DM Mono', monospace" }}>{c.plan ?? 'free'}</td>
                      <td style={{ padding: '10px 16px', fontSize: '12px', color: 'rgba(255,255,255,.5)', fontFamily: "'DM Mono', monospace" }}>{fmtBytes(c.file_size_bytes)}</td>
                      <td style={{ padding: '10px 16px', fontSize: '12px', color: 'rgba(255,255,255,.5)', fontFamily: "'DM Mono', monospace" }}>{c.processing_ms != null ? `${c.processing_ms}ms` : '—'}</td>
                      <td style={{ padding: '10px 16px' }}>
                        <span style={{ fontFamily: "'DM Mono', monospace", fontSize: '9px', padding: '2px 7px', borderRadius: '4px', color: c.via_api ? '#22c55e' : 'rgba(255,255,255,.35)', background: c.via_api ? 'rgba(34,197,94,.1)' : 'rgba(255,255,255,.05)' }}>{c.via_api ? 'API' : 'Web'}</span>
                      </td>
                      <td style={{ padding: '10px 16px', fontSize: '12px', color: 'rgba(255,255,255,.4)', fontFamily: "'DM Mono', monospace", whiteSpace: 'nowrap' }}>{fmt(c.created_at)}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
