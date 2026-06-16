import { createAdminClient } from '@/lib/supabase/admin'

type ApiKey = {
  id: string; name: string; key_prefix: string; user_id: string
  is_active: boolean; last_used_at: string | null; created_at: string
}
type Profile = { id: string; email: string | null }

function fmt(ts: string | null) {
  if (!ts) return 'Never'
  return new Date(ts).toLocaleString('en-IE', { day: 'numeric', month: 'short', year: 'numeric', hour: '2-digit', minute: '2-digit' })
}

export default async function ApiKeysPage() {
  const admin = createAdminClient()

  let keys: ApiKey[] = []
  let profiles: Profile[] = []
  let totalCount = 0

  if (admin) {
    const [{ data: k, count }, { data: p }] = await Promise.all([
      admin.from('api_keys').select('*', { count: 'exact' }).order('created_at', { ascending: false }).limit(100),
      admin.from('profiles').select('id,email'),
    ])
    keys = (k ?? []) as ApiKey[]
    profiles = (p ?? []) as Profile[]
    totalCount = count ?? 0
  }

  const emailMap = Object.fromEntries(profiles.map(p => [p.id, p.email]))
  const activeCount = keys.filter(k => k.is_active).length

  return (
    <div style={{ padding: '32px 40px' }}>
      <div style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', marginBottom: '28px' }}>
        <div>
          <h1 style={{ fontFamily: "'Instrument Serif', serif", fontSize: '32px', fontWeight: 400, color: '#FFFFFF', marginBottom: '4px' }}>API Keys</h1>
          <p style={{ fontSize: '12px', color: 'rgba(255,255,255,.4)', fontFamily: "'DM Mono', monospace" }}>{totalCount} total · {activeCount} active</p>
        </div>
        <div style={{ display: 'flex', gap: '10px' }}>
          {[{ label: 'Active', value: activeCount, color: '#22c55e' }, { label: 'Inactive', value: totalCount - activeCount, color: 'rgba(255,255,255,.3)' }].map(s => (
            <div key={s.label} style={{ background: '#13102B', border: '1px solid rgba(139,135,200,.15)', borderRadius: '8px', padding: '10px 16px', textAlign: 'center' }}>
              <div style={{ fontFamily: "'Instrument Serif', serif", fontSize: '22px', color: s.color }}>{s.value}</div>
              <div style={{ fontFamily: "'DM Mono', monospace", fontSize: '9px', color: 'rgba(255,255,255,.35)', textTransform: 'uppercase', letterSpacing: '.08em' }}>{s.label}</div>
            </div>
          ))}
        </div>
      </div>

      <div style={{ background: '#13102B', border: '1px solid rgba(139,135,200,.15)', borderRadius: '12px', overflow: 'hidden' }}>
        {keys.length === 0 ? (
          <div style={{ padding: '64px', textAlign: 'center', color: 'rgba(255,255,255,.25)', fontSize: '14px', fontFamily: "'Urbanist', sans-serif" }}>
            {!admin ? 'Supabase not configured.' : 'No API keys yet.'}
          </div>
        ) : (
          <div style={{ overflowX: 'auto' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse' }}>
              <thead>
                <tr style={{ borderBottom: '1px solid rgba(139,135,200,.15)', background: 'rgba(255,255,255,.02)' }}>
                  {['Key', 'Name', 'User', 'Status', 'Last used', 'Created'].map(h => (
                    <th key={h} style={{ padding: '11px 16px', textAlign: 'left', fontFamily: "'DM Mono', monospace", fontSize: '10px', color: 'rgba(255,255,255,.35)', fontWeight: 500, letterSpacing: '.08em', textTransform: 'uppercase', whiteSpace: 'nowrap' }}>{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {keys.map((k, i) => (
                  <tr key={k.id} style={{ borderBottom: i < keys.length - 1 ? '1px solid rgba(139,135,200,.08)' : 'none' }}>
                    <td style={{ padding: '12px 16px' }}>
                      <code style={{ fontFamily: "'DM Mono', monospace", fontSize: '12px', color: '#C4B5FD', background: 'rgba(124,58,237,.1)', padding: '2px 8px', borderRadius: '4px' }}>{k.key_prefix}••••••••</code>
                    </td>
                    <td style={{ padding: '12px 16px', fontSize: '13px', color: '#FFFFFF', fontFamily: "'Urbanist', sans-serif" }}>{k.name}</td>
                    <td style={{ padding: '12px 16px', fontSize: '12px', color: 'rgba(255,255,255,.5)', fontFamily: "'Urbanist', sans-serif" }}>{emailMap[k.user_id] ?? k.user_id.slice(0, 8) + '…'}</td>
                    <td style={{ padding: '12px 16px' }}>
                      <span style={{ fontFamily: "'DM Mono', monospace", fontSize: '9px', fontWeight: 600, padding: '3px 9px', borderRadius: '4px', textTransform: 'uppercase', letterSpacing: '.07em', color: k.is_active ? '#22c55e' : 'rgba(255,255,255,.3)', background: k.is_active ? 'rgba(34,197,94,.12)' : 'rgba(255,255,255,.06)' }}>{k.is_active ? 'Active' : 'Revoked'}</span>
                    </td>
                    <td style={{ padding: '12px 16px', fontSize: '12px', color: 'rgba(255,255,255,.4)', fontFamily: "'DM Mono', monospace", whiteSpace: 'nowrap' }}>{fmt(k.last_used_at)}</td>
                    <td style={{ padding: '12px 16px', fontSize: '12px', color: 'rgba(255,255,255,.4)', fontFamily: "'DM Mono', monospace", whiteSpace: 'nowrap' }}>{fmt(k.created_at)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  )
}
