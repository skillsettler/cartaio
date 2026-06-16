import { createAdminClient } from '@/lib/supabase/admin'

type Profile = {
  id: string; email: string | null; full_name: string | null; plan: string
  stripe_customer_id: string | null; api_calls_this_month: number
  files_today: number; created_at: string; updated_at: string
}

const PLAN_COLOR: Record<string, string> = { free: 'rgba(255,255,255,.4)', pro: '#C4B5FD', teams: '#818CF8' }
const PLAN_BG: Record<string, string> = { free: 'rgba(255,255,255,.06)', pro: 'rgba(124,58,237,.2)', teams: 'rgba(99,102,241,.2)' }

function fmt(ts: string) {
  return new Date(ts).toLocaleDateString('en-IE', { day: 'numeric', month: 'short', year: 'numeric' })
}

export default async function UsersPage() {
  const admin = createAdminClient()

  let users: Profile[] = []
  let totalCount = 0

  if (admin) {
    const { data, count } = await admin
      .from('profiles')
      .select('*', { count: 'exact' })
      .order('created_at', { ascending: false })
      .limit(100)
    users = (data ?? []) as Profile[]
    totalCount = count ?? 0
  }

  const planCount = (plan: string) => users.filter(u => u.plan === plan).length

  return (
    <div style={{ padding: '32px 40px' }}>
      {/* Header */}
      <div style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', marginBottom: '28px' }}>
        <div>
          <h1 style={{ fontFamily: "'Instrument Serif', serif", fontSize: '32px', fontWeight: 400, color: '#FFFFFF', marginBottom: '4px' }}>Users</h1>
          <p style={{ fontSize: '12px', color: 'rgba(255,255,255,.4)', fontFamily: "'DM Mono', monospace" }}>{totalCount} total</p>
        </div>
        <div style={{ display: 'flex', gap: '10px' }}>
          {[{ label: 'Free', key: 'free' }, { label: 'Pro', key: 'pro' }, { label: 'Teams', key: 'teams' }].map(p => (
            <div key={p.key} style={{ background: '#13102B', border: '1px solid rgba(139,135,200,.15)', borderRadius: '8px', padding: '10px 16px', textAlign: 'center' }}>
              <div style={{ fontFamily: "'Instrument Serif', serif", fontSize: '22px', color: PLAN_COLOR[p.key] }}>{planCount(p.key)}</div>
              <div style={{ fontFamily: "'DM Mono', monospace", fontSize: '9px', color: 'rgba(255,255,255,.35)', textTransform: 'uppercase', letterSpacing: '.08em' }}>{p.label}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Table */}
      <div style={{ background: '#13102B', border: '1px solid rgba(139,135,200,.15)', borderRadius: '12px', overflow: 'hidden' }}>
        {users.length === 0 ? (
          <div style={{ padding: '64px', textAlign: 'center', color: 'rgba(255,255,255,.25)', fontSize: '14px', fontFamily: "'Urbanist', sans-serif" }}>
            {!admin ? 'Supabase not configured.' : 'No users yet.'}
          </div>
        ) : (
          <div style={{ overflowX: 'auto' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse' }}>
              <thead>
                <tr style={{ borderBottom: '1px solid rgba(139,135,200,.15)', background: 'rgba(255,255,255,.02)' }}>
                  {['User', 'Plan', 'API calls', 'Files today', 'Stripe', 'Joined'].map(h => (
                    <th key={h} style={{ padding: '11px 16px', textAlign: 'left', fontFamily: "'DM Mono', monospace", fontSize: '10px', color: 'rgba(255,255,255,.35)', fontWeight: 500, letterSpacing: '.08em', textTransform: 'uppercase', whiteSpace: 'nowrap' }}>{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {users.map((u, i) => (
                  <tr key={u.id}
                    style={{ borderBottom: i < users.length - 1 ? '1px solid rgba(139,135,200,.08)' : 'none' }}
                  >
                    <td style={{ padding: '12px 16px' }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                        <div style={{ width: '28px', height: '28px', borderRadius: '50%', background: 'rgba(124,58,237,.2)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '11px', fontWeight: 700, color: '#C4B5FD', flexShrink: 0, fontFamily: "'Urbanist', sans-serif" }}>
                          {(u.email ?? '?')[0].toUpperCase()}
                        </div>
                        <div>
                          <div style={{ fontSize: '13px', color: '#FFFFFF', fontFamily: "'Urbanist', sans-serif" }}>{u.email ?? '—'}</div>
                          {u.full_name && <div style={{ fontSize: '11px', color: 'rgba(255,255,255,.35)', fontFamily: "'Urbanist', sans-serif" }}>{u.full_name}</div>}
                        </div>
                      </div>
                    </td>
                    <td style={{ padding: '12px 16px' }}>
                      <span style={{ fontFamily: "'DM Mono', monospace", fontSize: '9px', fontWeight: 600, padding: '3px 9px', borderRadius: '4px', color: PLAN_COLOR[u.plan] ?? '#fff', background: PLAN_BG[u.plan] ?? 'rgba(255,255,255,.06)', textTransform: 'uppercase', letterSpacing: '.07em' }}>{u.plan}</span>
                    </td>
                    <td style={{ padding: '12px 16px', fontSize: '13px', color: 'rgba(255,255,255,.7)', fontFamily: "'DM Mono', monospace" }}>{u.api_calls_this_month ?? 0}</td>
                    <td style={{ padding: '12px 16px', fontSize: '13px', color: 'rgba(255,255,255,.7)', fontFamily: "'DM Mono', monospace" }}>{u.files_today ?? 0}</td>
                    <td style={{ padding: '12px 16px', fontSize: '11px', color: 'rgba(255,255,255,.35)', fontFamily: "'DM Mono', monospace" }}>
                      {u.stripe_customer_id ? <span title={u.stripe_customer_id}>{u.stripe_customer_id.slice(0, 14)}…</span> : '—'}
                    </td>
                    <td style={{ padding: '12px 16px', fontSize: '12px', color: 'rgba(255,255,255,.4)', fontFamily: "'DM Mono', monospace", whiteSpace: 'nowrap' }}>{fmt(u.created_at)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {users.length >= 100 && (
        <p style={{ textAlign: 'center', marginTop: '16px', fontSize: '12px', color: 'rgba(255,255,255,.3)', fontFamily: "'DM Mono', monospace" }}>Showing first 100 users</p>
      )}
    </div>
  )
}
