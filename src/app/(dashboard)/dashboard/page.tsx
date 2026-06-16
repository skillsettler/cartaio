export const dynamic = 'force-dynamic'
import { redirect } from 'next/navigation'
import { createClient } from '@/lib/supabase/server'
import { Nav } from '@/components/layout/Nav'
import { Card } from '@/components/ui/Card'
import { Badge } from '@/components/ui/Badge'
import { UsageBar } from '@/components/dashboard/UsageBar'
import { TOOLS } from '@/types'
import Link from 'next/link'
import { FileText, Zap, Key, CreditCard, History } from 'lucide-react'

export default async function DashboardPage() {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) redirect('/login')

  const { data: profile } = await supabase
    .from('profiles')
    .select('*')
    .eq('id', user.id)
    .single()

  const { data: recentJobs } = await supabase
    .from('jobs')
    .select('*')
    .eq('user_id', user.id)
    .order('created_at', { ascending: false })
    .limit(5)

  const planBadgeVariant = profile?.plan === 'pro' ? 'pro' : profile?.plan === 'teams' ? 'teams' : 'free'

  return (
    <div className="min-h-screen" style={{ background: '#0A0618' }}>
      <Nav user={user} />
      <div className="pt-24 pb-16 px-6">
        <div className="max-w-5xl mx-auto space-y-8">

          {/* Header */}
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-light" style={{ fontFamily: 'Instrument Serif, serif' }}>
                Dashboard
              </h1>
              <p className="text-white/50 text-sm mt-1">{user.email}</p>
            </div>
            <Badge variant={planBadgeVariant} className="text-sm px-3 py-1">
              {profile?.plan || 'free'} plan
            </Badge>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[
              { label: 'Files today', value: profile?.files_today || 0, icon: FileText },
              { label: 'API calls this month', value: profile?.api_calls_this_month || 0, icon: Zap },
              { label: 'Active API keys', value: 0, icon: Key },
              { label: 'Total conversions', value: 0, icon: History },
            ].map(stat => (
              <Card key={stat.label} className="p-4">
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-8 h-8 bg-violet-500/20 rounded-lg flex items-center justify-center">
                    <stat.icon className="w-4 h-4 text-violet-400" />
                  </div>
                </div>
                <p className="text-2xl font-bold text-white">{stat.value.toLocaleString()}</p>
                <p className="text-white/50 text-xs mt-1">{stat.label}</p>
              </Card>
            ))}
          </div>

          {/* Usage */}
          <Card>
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-white font-semibold">Usage</h2>
              <Link href="/dashboard/billing" className="text-violet-400 hover:text-violet-300 text-sm transition-colors">
                Manage plan →
              </Link>
            </div>
            <div className="space-y-4">
              <UsageBar
                label="Files today"
                used={profile?.files_today || 0}
                limit={profile?.files_limit || 5}
              />
              <UsageBar
                label="API calls this month"
                used={profile?.api_calls_this_month || 0}
                limit={profile?.api_calls_limit || 0}
              />
            </div>
          </Card>

          {/* Quick Tools */}
          <div>
            <h2 className="text-white font-semibold mb-4">Quick access</h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
              {['compress-pdf', 'merge-pdf', 'split-pdf', 'bank-statement-converter'].map(toolName => {
                const tool = TOOLS[toolName as keyof typeof TOOLS]
                return (
                  <Link
                    key={toolName}
                    href={`/tools/${toolName}`}
                    className="p-4 bg-[#13102B] border border-white/10 rounded-xl hover:border-violet-500/30 hover:bg-[#1C1842] transition-all text-sm text-white/70 hover:text-white"
                  >
                    {tool.title}
                  </Link>
                )
              })}
            </div>
          </div>

          {/* Recent Jobs */}
          {recentJobs && recentJobs.length > 0 && (
            <Card>
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-white font-semibold">Recent activity</h2>
                <Link href="/dashboard/history" className="text-violet-400 hover:text-violet-300 text-sm">
                  View all →
                </Link>
              </div>
              <div className="space-y-2">
                {recentJobs.map(job => (
                  <div key={job.id} className="flex items-center justify-between py-2 border-b border-white/5 last:border-0">
                    <div>
                      <p className="text-white text-sm font-medium">{job.tool}</p>
                      <p className="text-white/40 text-xs font-mono">{job.id.slice(0, 8)}...</p>
                    </div>
                    <div className="flex items-center gap-3">
                      {job.processing_ms && (
                        <span className="text-white/30 text-xs font-mono">{job.processing_ms}ms</span>
                      )}
                      <Badge variant={job.status === 'complete' ? 'success' : job.status === 'failed' ? 'error' : 'default'}>
                        {job.status}
                      </Badge>
                    </div>
                  </div>
                ))}
              </div>
            </Card>
          )}

          {/* Nav Links */}
          <div className="grid grid-cols-3 gap-4">
            {[
              { href: '/dashboard/api-keys', icon: Key, label: 'API Keys', desc: 'Manage your API keys' },
              { href: '/dashboard/billing', icon: CreditCard, label: 'Billing', desc: 'Manage subscription' },
              { href: '/dashboard/history', icon: History, label: 'History', desc: 'View conversion history' },
            ].map(item => (
              <Link key={item.href} href={item.href}>
                <Card hover className="h-full">
                  <item.icon className="w-5 h-5 text-violet-400 mb-3" />
                  <p className="text-white font-medium text-sm">{item.label}</p>
                  <p className="text-white/40 text-xs mt-1">{item.desc}</p>
                </Card>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
