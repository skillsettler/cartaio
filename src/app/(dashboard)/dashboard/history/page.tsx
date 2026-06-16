export const dynamic = 'force-dynamic'
import { redirect } from 'next/navigation'
import { createClient } from '@/lib/supabase/server'
import { Nav } from '@/components/layout/Nav'
import { Card } from '@/components/ui/Card'
import { Badge } from '@/components/ui/Badge'
import { History, Download } from 'lucide-react'
import Link from 'next/link'
import { formatDate } from '@/lib/utils'

export default async function HistoryPage() {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) redirect('/login')

  const { data: jobs } = await supabase
    .from('jobs')
    .select('*')
    .eq('user_id', user.id)
    .order('created_at', { ascending: false })
    .limit(50)

  return (
    <div className="min-h-screen" style={{ background: '#0A0618' }}>
      <Nav user={user} />
      <div className="pt-24 pb-16 px-6">
        <div className="max-w-4xl mx-auto space-y-6">
          <Link href="/dashboard" className="text-white/40 hover:text-white text-sm transition-colors">← Dashboard</Link>

          <div className="flex items-center gap-3">
            <History className="w-6 h-6 text-violet-400" />
            <h1 className="text-3xl font-light" style={{ fontFamily: 'Instrument Serif, serif' }}>History</h1>
          </div>

          <Card>
            {!jobs || jobs.length === 0 ? (
              <div className="text-center py-16 text-white/30">
                <History className="w-8 h-8 mx-auto mb-3 opacity-50" />
                <p className="text-sm">No conversions yet</p>
                <Link href="/" className="text-violet-400 hover:text-violet-300 text-sm mt-2 block">
                  Start converting files →
                </Link>
              </div>
            ) : (
              <div className="divide-y divide-white/5">
                {jobs.map(job => (
                  <div key={job.id} className="flex items-center gap-4 py-4 first:pt-0 last:pb-0">
                    <div className="flex-1 min-w-0">
                      <p className="text-white text-sm font-medium">{job.tool}</p>
                      <p className="text-white/40 text-xs font-mono mt-0.5">{formatDate(job.created_at)}</p>
                    </div>
                    <div className="flex items-center gap-3">
                      {job.processing_ms && (
                        <span className="text-white/30 text-xs font-mono hidden sm:block">{job.processing_ms}ms</span>
                      )}
                      {job.output_filename && (
                        <span className="text-white/40 text-xs hidden sm:block">{job.output_filename}</span>
                      )}
                      <Badge variant={job.status === 'complete' ? 'success' : job.status === 'failed' ? 'error' : 'default'}>
                        {job.status}
                      </Badge>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </Card>
        </div>
      </div>
    </div>
  )
}
