'use client'
import { useState, useEffect } from 'react'
import Link from 'next/link'
import { createClient } from '@/lib/supabase/client'
import { Nav } from '@/components/layout/Nav'
import { Card } from '@/components/ui/Card'
import { Button } from '@/components/ui/Button'
import { Input } from '@/components/ui/Input'
import { ApiKeyRow } from '@/components/dashboard/ApiKeyRow'
import { ApiKey } from '@/types'
import { Key, Plus, Copy, Check } from 'lucide-react'

export default function ApiKeysPage() {
  const [apiKeys, setApiKeys] = useState<ApiKey[]>([])
  const [loading, setLoading] = useState(true)
  const [newKeyName, setNewKeyName] = useState('')
  const [creating, setCreating] = useState(false)
  const [newKey, setNewKey] = useState<string | null>(null)
  const [copied, setCopied] = useState(false)
  const supabase = createClient()

  useEffect(() => {
    loadKeys()
  }, [])

  const loadKeys = async () => {
    const { data: { user } } = await supabase.auth.getUser()
    if (!user) return
    const { data } = await supabase
      .from('api_keys')
      .select('*')
      .eq('user_id', user.id)
      .order('created_at', { ascending: false })
    setApiKeys(data || [])
    setLoading(false)
  }

  const createKey = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!newKeyName.trim()) return
    setCreating(true)

    const { data: { user } } = await supabase.auth.getUser()
    if (!user) return

    const rawKey = `ck_${crypto.randomUUID().replace(/-/g, '')}`
    const prefix = rawKey.slice(0, 12)

    const encoder = new TextEncoder()
    const data = encoder.encode(rawKey)
    const hashBuffer = await crypto.subtle.digest('SHA-256', data)
    const hashArray = Array.from(new Uint8Array(hashBuffer))
    const keyHash = hashArray.map(b => b.toString(16).padStart(2, '0')).join('')

    const { error } = await supabase.from('api_keys').insert({
      user_id: user.id,
      name: newKeyName,
      key_hash: keyHash,
      key_prefix: prefix
    })

    if (!error) {
      setNewKey(rawKey)
      setNewKeyName('')
      loadKeys()
    }
    setCreating(false)
  }

  const deleteKey = async (id: string) => {
    await supabase.from('api_keys').delete().eq('id', id)
    setApiKeys(keys => keys.filter(k => k.id !== id))
  }

  const copyKey = async () => {
    if (!newKey) return
    await navigator.clipboard.writeText(newKey)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <div className="min-h-screen" style={{ background: '#0A0618' }}>
      <Nav />
      <div className="pt-24 pb-16 px-6">
        <div className="max-w-2xl mx-auto space-y-6">
          <Link href="/dashboard" className="text-white/40 hover:text-white text-sm transition-colors">← Dashboard</Link>

          <div className="flex items-center gap-3">
            <Key className="w-6 h-6 text-violet-400" />
            <h1 className="text-3xl font-light" style={{ fontFamily: 'Instrument Serif, serif' }}>API Keys</h1>
          </div>

          {/* New key banner */}
          {newKey && (
            <div className="bg-green-500/10 border border-green-500/30 rounded-xl p-4">
              <p className="text-green-400 text-sm font-semibold mb-2">API key created — copy it now, you won&apos;t see it again</p>
              <div className="flex items-center gap-2">
                <code className="flex-1 font-mono text-xs text-white bg-black/30 rounded-lg px-3 py-2 truncate">
                  {newKey}
                </code>
                <button onClick={copyKey} className="p-2 bg-white/10 rounded-lg hover:bg-white/20 transition-colors">
                  {copied ? <Check className="w-4 h-4 text-green-400" /> : <Copy className="w-4 h-4 text-white/60" />}
                </button>
              </div>
            </div>
          )}

          {/* Create key form */}
          <Card>
            <h2 className="text-white font-semibold mb-4">Create new key</h2>
            <form onSubmit={createKey} className="flex gap-3">
              <Input
                placeholder="Key name (e.g. production)"
                value={newKeyName}
                onChange={e => setNewKeyName(e.target.value)}
                className="flex-1"
              />
              <Button type="submit" loading={creating} size="md">
                <Plus className="w-4 h-4" />
                Create
              </Button>
            </form>
          </Card>

          {/* Key list */}
          <div className="space-y-3">
            {loading ? (
              <div className="text-white/40 text-sm text-center py-8">Loading...</div>
            ) : apiKeys.length === 0 ? (
              <div className="text-center py-12 text-white/30">
                <Key className="w-8 h-8 mx-auto mb-3 opacity-50" />
                <p className="text-sm">No API keys yet</p>
              </div>
            ) : (
              apiKeys.map(key => (
                <ApiKeyRow key={key.id} apiKey={key} onDelete={deleteKey} />
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
