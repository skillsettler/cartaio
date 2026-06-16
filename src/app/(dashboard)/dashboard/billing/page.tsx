export const dynamic = 'force-dynamic'
import { redirect } from 'next/navigation'
import { createClient } from '@/lib/supabase/server'
import { Nav } from '@/components/layout/Nav'
import { Card } from '@/components/ui/Card'
import { Badge } from '@/components/ui/Badge'
import { PLANS } from '@/lib/stripe'
import { Check } from 'lucide-react'
import Link from 'next/link'

export default async function BillingPage() {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) redirect('/login')

  const { data: profile } = await supabase
    .from('profiles')
    .select('*')
    .eq('id', user.id)
    .single()

  const currentPlan = profile?.plan || 'free'

  return (
    <div className="min-h-screen" style={{ background: '#0A0618' }}>
      <Nav user={user} />
      <div className="pt-24 pb-16 px-6">
        <div className="max-w-4xl mx-auto space-y-8">

          <div className="flex items-center gap-4 mb-2">
            <Link href="/dashboard" className="text-white/40 hover:text-white text-sm transition-colors">← Dashboard</Link>
          </div>

          <h1 className="text-3xl font-light" style={{ fontFamily: 'Instrument Serif, serif' }}>Billing</h1>

          {/* Current Plan */}
          <Card>
            <div className="flex items-center justify-between">
              <div>
                <p className="text-white/50 text-sm mb-1">Current plan</p>
                <div className="flex items-center gap-3">
                  <p className="text-white text-xl font-semibold capitalize">{currentPlan}</p>
                  <Badge variant={currentPlan === 'pro' ? 'pro' : currentPlan === 'teams' ? 'teams' : 'free'}>
                    {currentPlan}
                  </Badge>
                </div>
              </div>
              {profile?.stripe_customer_id && (
                <form action="/api/stripe/portal" method="POST">
                  <button
                    type="submit"
                    className="px-4 py-2 bg-white/10 text-white text-sm rounded-lg border border-white/15 hover:bg-white/15 transition-colors"
                  >
                    Manage billing →
                  </button>
                </form>
              )}
            </div>
          </Card>

          {/* Plan Comparison */}
          <div className="grid md:grid-cols-2 gap-6">
            {Object.entries(PLANS).map(([key, plan]) => {
              const isCurrentPlan = currentPlan === key
              return (
                <Card key={key} className={isCurrentPlan ? 'border-violet-500/40' : ''}>
                  <div className="flex items-center justify-between mb-4">
                    <div>
                      <p className="text-white font-semibold">{plan.name}</p>
                      <div className="flex items-baseline gap-1 mt-1">
                        <span className="text-2xl font-bold text-white">€{plan.price / 100}</span>
                        <span className="text-white/40 text-sm">/mo</span>
                      </div>
                    </div>
                    {isCurrentPlan && <Badge variant="success">Current</Badge>}
                  </div>
                  <ul className="space-y-2 mb-6">
                    {plan.features.map(f => (
                      <li key={f} className="flex items-center gap-2 text-white/70 text-sm">
                        <Check className="w-4 h-4 text-green-400 flex-shrink-0" />
                        {f}
                      </li>
                    ))}
                  </ul>
                  {!isCurrentPlan && (
                    <form action="/api/stripe/checkout" method="POST">
                      <input type="hidden" name="plan" value={key} />
                      <button
                        type="submit"
                        className="w-full py-2.5 rounded-xl bg-gradient-to-r from-violet-600 to-indigo-600 text-white font-bold text-sm hover:opacity-90 transition-opacity"
                      >
                        Upgrade to {plan.name}
                      </button>
                    </form>
                  )}
                </Card>
              )
            })}
          </div>
        </div>
      </div>
    </div>
  )
}
