import { redirect } from 'next/navigation'
import { createClient } from '@/lib/supabase/server'
import { AdminNav } from '@/components/admin/AdminNav'

export const dynamic = 'force-dynamic'

export default async function AdminLayout({ children }: { children: React.ReactNode }) {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
  const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
  const adminEmail = process.env.ADMIN_EMAIL

  if (supabaseUrl && supabaseKey) {
    const supabase = await createClient()
    const { data: { user } } = await supabase.auth.getUser()
    if (!user) redirect('/login')
    if (adminEmail && user.email !== adminEmail) redirect('/dashboard')
  }

  return (
    <div style={{ display: 'flex', minHeight: '100vh', background: '#0A0618', fontFamily: "'Urbanist', sans-serif" }}>
      <AdminNav />
      <main style={{ flex: 1, overflow: 'auto', minWidth: 0 }}>
        {children}
      </main>
    </div>
  )
}
