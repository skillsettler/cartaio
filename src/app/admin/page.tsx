import { createAdminClient } from '@/lib/supabase/admin'
import { Users, FileText, Zap, Key, TrendingUp, Activity } from 'lucide-react'

type Profile = {
  id: string; email: string | null; plan: string; created_at: string
  api_calls_this_month: number; files_today: number
}
type Job = {
  id: string; tool: string; status: string; user_id: string | null
  processing_ms: number | null; created_at: string; output_filename: string | null
}
type Conversion = { id: string; tool: string; file_size_bytes: number | null; via_api: boolean; created_at: string }

const PLAN_COLORS: Record<string, string> = {
  free: 'rgba(255,255,255,.3)',
  pro: '#7C3AED',
  teams: '#6366F1',
}
const PLAN_BG: Record<string, string> = {
  free: 'rgba(255,255,255,.06)',
  pro: 'rgba(124,58,237,.2)',
  teams: 'rgba(99,102,241,.2)',
}
const STATUS_COLOR: Record<string, string> = {
  complete: '#22c55e', failed: '#ef4444', processing: '#7C3AED',
  pending: '#f59e0b', expired: 'rgba(255,255,255,.3)',
}
const STATUS_BG: Record<string, string> = {
  complete: 'rgba(34,197,94,.12)', failed: 'rgba(239,68,68,.12)',
  processing: 'rgba(124,58,237,.18)', pending: 'rgba(245,158,11,.12)',
  expired: 'rgba(255,255,255,.06)',
}

function fmt(ts: string) {
  return new Date(ts).toLocaleDateString('en-IE', { day: 'numeric', month: 'short', year: '2-digit', hour: '2-digit', minute: '2-digit' })
}
function fmtBytes(b: number | null) {
  if (!b) return '—'
  if (b < 1024) return `${b} B`
  if (b < 1024 * 1024) return `${(b / 1024).toFixed(1)} KB`
  return `${(b / 1024 / 1024).toFixed(1)} MB`
}

export default async function AdminDashboard() {
  const admin = createAdminClient()
  const unconfigured = !admin

  let totalUsers = 0, proCount = 0, teamsCount = 0, totalJobs = 0
  let todayConversions = 0, totalApiKeys = 0
  let recentUsers: Profile[] = []
  let recentJobs: Job[] = []
  let recentConversions: Conversion[] = []

  if (admin) {
    const today = new Date(); today.setHours(0, 0, 0, 0)

    const [
      { count: uc }, { count: pro }, { count: teams },
      { count: jc }, { count: tc }, { count: ak },
      { data: ru }, { data: rj }, { data: rc },
    ] = await Promise.all([
      admin.from('profiles').select('*', { count: 'exact', head: true }),
      admin.from('profiles').select('*', { count: 'exact', head: true }).eq('plan', 'pro'),
      admin.from('profiles').select('*', { count: 'exact', head: true }).eq('plan', 'teams'),
      admin.from('jobs').select('*', { count: 'exact', head: true }),
      admin.from('conversions').select('*', { count: 'exact', head: true }).gte('created_at', today.toISOString()),
      admin.from('api_keys').select('*', { count: 'exact', head: true }).eq('is_active', true),
      admin.from('profiles').select('id,email,plan,created_at,api_calls_this_month,files_today').order('created_at', { ascending: false }).limit(8),
      admin.from('jobs').select('id,tool,status,user_id,processing_ms,created_at,output_filename').order('created_at', { ascending: false }).limit(8),
      admin.from('conversions').select('id,tool,file_size_bytes,via_api,created_at').order('created_at', { ascending: false }).limit(8),
    ])

    totalUsers = uc ?? 0; proCount = pro ?? 0; teamsCount = teams ?? 0
    totalJobs = jc ?? 0; todayConversions = tc ?? 0; totalApiKeys = ak ?? 0
    recentUsers = (ru ?? []) as Profile[]
    recentJobs = (rj ?? []) as Job[]
    recentConversions = (rc ?? []) as Conversion[]
  }

  const stats = [
    { label: 'Total Users', value: totalUsers, icon: Users, color: '#7C3AED', bg: 'rgba(124,58,237,.15)' },
    { label: 'Pro Subscribers', value: proCount, icon: TrendingUp, color: '#6366F1', bg: 'rgba(99,102,241,.15)' },
    { label: 'Teams Subscribers', value: teamsCount, icon: Activity, color: '#8B5CF6', bg: 'rgba(139,92,246,.15)' },
    { label: 'Total Jobs', value: totalJobs, icon: FileText, color: '#22c55e', bg: 'rgba(34,197,94,.12)' },
    { label: "Today's Conversions", value: todayConversions, icon: Zap, color: '#f59e0b', bg: 'rgba(245,158,11,.12)' },
    { label: 'Active API Keys', value: totalApiKeys, icon: Key, color: '#C4B5FD', bg: 'rgba(196,181,253,.1)' },
  ]

  return (
    <div style={{ padding: '32px 40px', maxWidth: '1200px' }}>
      {/* Header */}
      <div style={{ marginBottom: '32px' }}>
        <h1 style={{ fontFamily: "'Instrument Serif', serif", fontSize: '32px', fontWeight: 400, color: '#FFFFFF', marginBottom: '4px' }}>Dashboard</h1>
        <p style={{ fontSize: '13px', color: 'rgba(255,255,255,.4)', fontFamily: "'DM Mono', monospace" }}>
          {unconfigured ? 'Supabase not configured — showing empty state' : `Live data · ${new Date().toLocaleString('en-IE')}`}
        </p>
      </div>

      {unconfigured && (
        <div style={{ background: 'rgba(245,158,11,.1)', border: '1px solid rgba(245,158,11,.3)', borderRadius: '10px', padding: '14px 18px', marginBottom: '28px', display: 'flex', alignItems: 'center', gap: '10px' }}>
          <span style={{ fontSize: '16px' }}>⚠️</span>
          <div>
            <div style={{ fontSize: '13px', fontWeight: 600, color: '#FCD34D', fontFamily: "'Urbanist', sans-serif" }}>Supabase not configured</div>
            <div style={{ fontSize: '12px', color: 'rgba(252,211,77,.7)', fontFamily: "'DM Mono', monospace" }}>Add NEXT_PUBLIC_SUPABASE_URL, NEXT_PUBLIC_SUPABASE_ANON_KEY, and SUPABASE_SERVICE_ROLE_KEY to see live data.</div>
          </div>
        </div>
      )}

      {/* Stats grid */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '16px', marginBottom: '40px' }}>
        {stats.map(s => (
          <div key={s.label} style={{ background: '#13102B', border: '1px solid rgba(139,135,200,.15)', borderRadius: '12px', padding: '20px 24px', display: 'flex', alignItems: 'center', gap: '16px' }}>
            <div style={{ width: '42px', height: '42px', borderRadius: '10px', background: s.bg, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
              <s.icon size={18} color={s.color} />
            </div>
            <div>
              <div style={{ fontFamily: "'Instrument Serif', serif", fontSize: '28px', color: '#FFFFFF', lineHeight: 1 }}>{s.value.toLocaleString()}</div>
              <div style={{ fontSize: '12px', color: 'rgba(255,255,255,.45)', fontFamily: "'Urbanist', sans-serif", marginTop: '3px' }}>{s.label}</div>
            </div>
          </div>
        ))}
      </div>

      {/* Recent rows — 3 columns */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '24px' }}>

        {/* Recent Users */}
        <div style={{ background: '#13102B', border: '1px solid rgba(139,135,200,.15)', borderRadius: '12px', overflow: 'hidden' }}>
          <div style={{ padding: '16px 20px', borderBottom: '1px solid rgba(139,135,200,.12)', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <span style={{ fontSize: '13px', fontWeight: 600, color: '#FFFFFF', fontFamily: "'Urbanist', sans-serif" }}>Recent Users</span>
            <a href="/admin/users" style={{ fontSize: '11px', color: '#9F6BF5', fontFamily: "'DM Mono', monospace", textDecoration: 'none' }}>View all →</a>
          </div>
          {recentUsers.length === 0 ? (
            <div style={{ padding: '32px', textAlign: 'center', color: 'rgba(255,255,255,.25)', fontSize: '13px' }}>No users yet</div>
          ) : recentUsers.map((u, i) => (
            <div key={u.id} style={{ display: 'flex', alignItems: 'center', gap: '12px', padding: '11px 20px', borderBottom: i < recentUsers.length - 1 ? '1px solid rgba(139,135,200,.08)' : 'none' }}>
              <div style={{ width: '28px', height: '28px', borderRadius: '50%', background: 'rgba(124,58,237,.2)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '11px', fontWeight: 700, color: '#C4B5FD', flexShrink: 0, fontFamily: "'Urbanist', sans-serif" }}>
                {(u.email ?? '?')[0].toUpperCase()}
              </div>
              <div style={{ flex: 1, minWidth: 0 }}>
                <div style={{ fontSize: '13px', color: '#FFFFFF', fontFamily: "'Urbanist', sans-serif", overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{u.email ?? '—'}</div>
                <div style={{ fontSize: '10px', color: 'rgba(255,255,255,.35)', fontFamily: "'DM Mono', monospace', marginTop: '1px" }}>{fmt(u.created_at)}</div>
              </div>
              <span style={{ fontFamily: "'DM Mono', monospace", fontSize: '9px', fontWeight: 600, padding: '3px 8px', borderRadius: '4px', color: PLAN_COLORS[u.plan] ?? '#fff', background: PLAN_BG[u.plan] ?? 'rgba(255,255,255,.06)', textTransform: 'uppercase', letterSpacing: '.06em', flexShrink: 0 }}>{u.plan}</span>
            </div>
          ))}
        </div>

        {/* Recent Jobs */}
        <div style={{ background: '#13102B', border: '1px solid rgba(139,135,200,.15)', borderRadius: '12px', overflow: 'hidden' }}>
          <div style={{ padding: '16px 20px', borderBottom: '1px solid rgba(139,135,200,.12)', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <span style={{ fontSize: '13px', fontWeight: 600, color: '#FFFFFF', fontFamily: "'Urbanist', sans-serif" }}>Recent Jobs</span>
            <a href="/admin/jobs" style={{ fontSize: '11px', color: '#9F6BF5', fontFamily: "'DM Mono', monospace", textDecoration: 'none' }}>View all →</a>
          </div>
          {recentJobs.length === 0 ? (
            <div style={{ padding: '32px', textAlign: 'center', color: 'rgba(255,255,255,.25)', fontSize: '13px' }}>No jobs yet</div>
          ) : recentJobs.map((j, i) => (
            <div key={j.id} style={{ display: 'flex', alignItems: 'center', gap: '12px', padding: '11px 20px', borderBottom: i < recentJobs.length - 1 ? '1px solid rgba(139,135,200,.08)' : 'none' }}>
              <div style={{ flex: 1, minWidth: 0 }}>
                <div style={{ fontSize: '13px', color: '#FFFFFF', fontFamily: "'Urbanist', sans-serif", overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{j.tool}</div>
                <div style={{ fontSize: '10px', color: 'rgba(255,255,255,.35)', fontFamily: "'DM Mono', monospace", marginTop: '1px' }}>{fmt(j.created_at)}{j.processing_ms ? ` · ${j.processing_ms}ms` : ''}</div>
              </div>
              <span style={{ fontFamily: "'DM Mono', monospace", fontSize: '9px', fontWeight: 600, padding: '3px 8px', borderRadius: '4px', color: STATUS_COLOR[j.status] ?? '#fff', background: STATUS_BG[j.status] ?? 'rgba(255,255,255,.06)', textTransform: 'uppercase', letterSpacing: '.06em', flexShrink: 0 }}>{j.status}</span>
            </div>
          ))}
        </div>

        {/* Recent Conversions */}
        <div style={{ background: '#13102B', border: '1px solid rgba(139,135,200,.15)', borderRadius: '12px', overflow: 'hidden', gridColumn: '1 / -1' }}>
          <div style={{ padding: '16px 20px', borderBottom: '1px solid rgba(139,135,200,.12)', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <span style={{ fontSize: '13px', fontWeight: 600, color: '#FFFFFF', fontFamily: "'Urbanist', sans-serif" }}>Recent Conversions</span>
            <a href="/admin/conversions" style={{ fontSize: '11px', color: '#9F6BF5', fontFamily: "'DM Mono', monospace", textDecoration: 'none' }}>View all →</a>
          </div>
          {recentConversions.length === 0 ? (
            <div style={{ padding: '32px', textAlign: 'center', color: 'rgba(255,255,255,.25)', fontSize: '13px' }}>No conversions yet</div>
          ) : (
            <div style={{ overflowX: 'auto' }}>
              <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                <thead>
                  <tr style={{ borderBottom: '1px solid rgba(139,135,200,.1)' }}>
                    {['Tool', 'File size', 'Via API', 'When'].map(h => (
                      <th key={h} style={{ padding: '10px 20px', textAlign: 'left', fontFamily: "'DM Mono', monospace", fontSize: '10px', color: 'rgba(255,255,255,.35)', fontWeight: 500, letterSpacing: '.08em', textTransform: 'uppercase', whiteSpace: 'nowrap' }}>{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {recentConversions.map((c, i) => (
                    <tr key={c.id} style={{ borderBottom: i < recentConversions.length - 1 ? '1px solid rgba(139,135,200,.07)' : 'none' }}>
                      <td style={{ padding: '10px 20px', fontSize: '13px', color: '#FFFFFF', fontFamily: "'Urbanist', sans-serif" }}>{c.tool}</td>
                      <td style={{ padding: '10px 20px', fontSize: '12px', color: 'rgba(255,255,255,.5)', fontFamily: "'DM Mono', monospace" }}>{fmtBytes(c.file_size_bytes)}</td>
                      <td style={{ padding: '10px 20px' }}>
                        <span style={{ fontFamily: "'DM Mono', monospace", fontSize: '9px', padding: '2px 7px', borderRadius: '4px', color: c.via_api ? '#22c55e' : 'rgba(255,255,255,.3)', background: c.via_api ? 'rgba(34,197,94,.1)' : 'rgba(255,255,255,.05)' }}>{c.via_api ? 'API' : 'Web'}</span>
                      </td>
                      <td style={{ padding: '10px 20px', fontSize: '12px', color: 'rgba(255,255,255,.4)', fontFamily: "'DM Mono', monospace", whiteSpace: 'nowrap' }}>{fmt(c.created_at)}</td>
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
