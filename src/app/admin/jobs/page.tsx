import { createAdminClient } from '@/lib/supabase/admin'

type Job = {
  id: string; tool: string; status: string; user_id: string | null
  output_filename: string | null; processing_ms: number | null
  error_message: string | null; created_at: string; expires_at: string | null
}

const STATUS_COLOR: Record<string, string> = {
  complete: '#22c55e', failed: '#ef4444', processing: '#C4B5FD', pending: '#FCD34D', expired: 'rgba(255,255,255,.3)',
}
const STATUS_BG: Record<string, string> = {
  complete: 'rgba(34,197,94,.12)', failed: 'rgba(239,68,68,.12)', processing: 'rgba(124,58,237,.18)', pending: 'rgba(252,211,77,.1)', expired: 'rgba(255,255,255,.05)',
}

function fmt(ts: string) {
  return new Date(ts).toLocaleString('en-IE', { day: 'numeric', month: 'short', hour: '2-digit', minute: '2-digit' })
}

export default async function JobsPage() {
  const admin = createAdminClient()

  let jobs: Job[] = []
  let totalCount = 0

  if (admin) {
    const { data, count } = await admin
      .from('jobs')
      .select('*', { count: 'exact' })
      .order('created_at', { ascending: false })
      .limit(100)
    jobs = (data ?? []) as Job[]
    totalCount = count ?? 0
  }

  const statusCount = (s: string) => jobs.filter(j => j.status === s).length

  return (
    <div style={{ padding: '32px 40px' }}>
      {/* Header */}
      <div style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', marginBottom: '28px' }}>
        <div>
          <h1 style={{ fontFamily: "'Instrument Serif', serif", fontSize: '32px', fontWeight: 400, color: '#FFFFFF', marginBottom: '4px' }}>Jobs</h1>
          <p style={{ fontSize: '12px', color: 'rgba(255,255,255,.4)', fontFamily: "'DM Mono', monospace" }}>{totalCount} total</p>
        </div>
        <div style={{ display: 'flex', gap: '10px' }}>
          {['complete', 'processing', 'pending', 'failed'].map(s => (
            <div key={s} style={{ background: '#13102B', border: '1px solid rgba(139,135,200,.15)', borderRadius: '8px', padding: '10px 16px', textAlign: 'center' }}>
              <div style={{ fontFamily: "'Instrument Serif', serif", fontSize: '22px', color: STATUS_COLOR[s] }}>{statusCount(s)}</div>
              <div style={{ fontFamily: "'DM Mono', monospace", fontSize: '9px', color: 'rgba(255,255,255,.35)', textTransform: 'uppercase', letterSpacing: '.08em' }}>{s}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Table */}
      <div style={{ background: '#13102B', border: '1px solid rgba(139,135,200,.15)', borderRadius: '12px', overflow: 'hidden' }}>
        {jobs.length === 0 ? (
          <div style={{ padding: '64px', textAlign: 'center', color: 'rgba(255,255,255,.25)', fontSize: '14px', fontFamily: "'Urbanist', sans-serif" }}>
            {!admin ? 'Supabase not configured.' : 'No jobs yet.'}
          </div>
        ) : (
          <div style={{ overflowX: 'auto' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse' }}>
              <thead>
                <tr style={{ borderBottom: '1px solid rgba(139,135,200,.15)', background: 'rgba(255,255,255,.02)' }}>
                  {['Tool', 'Status', 'Output file', 'Duration', 'Error', 'When'].map(h => (
                    <th key={h} style={{ padding: '11px 16px', textAlign: 'left', fontFamily: "'DM Mono', monospace", fontSize: '10px', color: 'rgba(255,255,255,.35)', fontWeight: 500, letterSpacing: '.08em', textTransform: 'uppercase', whiteSpace: 'nowrap' }}>{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {jobs.map((j, i) => (
                  <tr key={j.id}
                    style={{ borderBottom: i < jobs.length - 1 ? '1px solid rgba(139,135,200,.08)' : 'none' }}
                  >
                    <td style={{ padding: '12px 16px', fontSize: '13px', color: '#FFFFFF', fontFamily: "'Urbanist', sans-serif", whiteSpace: 'nowrap' }}>{j.tool}</td>
                    <td style={{ padding: '12px 16px' }}>
                      <span style={{ fontFamily: "'DM Mono', monospace", fontSize: '9px', fontWeight: 600, padding: '3px 9px', borderRadius: '4px', color: STATUS_COLOR[j.status] ?? '#fff', background: STATUS_BG[j.status] ?? 'rgba(255,255,255,.06)', textTransform: 'uppercase', letterSpacing: '.07em' }}>{j.status}</span>
                    </td>
                    <td style={{ padding: '12px 16px', fontSize: '12px', color: 'rgba(255,255,255,.5)', fontFamily: "'DM Mono', monospace", maxWidth: '180px', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                      {j.output_filename ?? '—'}
                    </td>
                    <td style={{ padding: '12px 16px', fontSize: '12px', color: 'rgba(255,255,255,.5)', fontFamily: "'DM Mono', monospace", whiteSpace: 'nowrap' }}>
                      {j.processing_ms != null ? `${j.processing_ms}ms` : '—'}
                    </td>
                    <td style={{ padding: '12px 16px', fontSize: '12px', color: '#ef4444', fontFamily: "'Urbanist', sans-serif", maxWidth: '180px', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                      {j.error_message ?? '—'}
                    </td>
                    <td style={{ padding: '12px 16px', fontSize: '12px', color: 'rgba(255,255,255,.4)', fontFamily: "'DM Mono', monospace", whiteSpace: 'nowrap' }}>{fmt(j.created_at)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {jobs.length >= 100 && (
        <p style={{ textAlign: 'center', marginTop: '16px', fontSize: '12px', color: 'rgba(255,255,255,.3)', fontFamily: "'DM Mono', monospace" }}>Showing latest 100 jobs</p>
      )}
    </div>
  )
}
