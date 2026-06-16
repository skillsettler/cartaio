'use client'
import { useState } from 'react'
import { useParams } from 'next/navigation'
import { TOOLS } from '@/types'
import { DropZone } from '@/components/tools/DropZone'
import { ProcessingState } from '@/components/tools/ProcessingState'
import { DownloadCard } from '@/components/tools/DownloadCard'
import { Nav } from '@/components/layout/Nav'
import { Badge } from '@/components/ui/Badge'
import { Button } from '@/components/ui/Button'
import { Brain, Lock } from 'lucide-react'
import Link from 'next/link'

type State = 'idle' | 'processing' | 'done' | 'error'

const ENDPOINT_MAP: Partial<Record<string, string>> = {
  'compress-pdf': '/api/tools/compress',
  'merge-pdf': '/api/tools/merge',
  'split-pdf': '/api/tools/split',
  'bank-statement-converter': '/api/tools/extract',
  'invoice-extractor': '/api/tools/extract',
}

export default function ToolPage() {
  const { tool } = useParams<{ tool: string }>()
  const config = TOOLS[tool as keyof typeof TOOLS]
  const [state, setState] = useState<State>('idle')
  const [files, setFiles] = useState<File[]>([])
  const [result, setResult] = useState<{ url: string; filename: string; meta?: Record<string, unknown> } | null>(null)
  const [error, setError] = useState<string | null>(null)

  if (!config) {
    return (
      <div className="min-h-screen" style={{ background: '#0A0618' }}>
        <Nav />
        <div className="flex items-center justify-center min-h-screen">
          <div className="text-center">
            <p className="text-white/50">Tool not found</p>
            <Link href="/" className="text-violet-400 hover:text-violet-300 text-sm mt-2 block">
              ← Back to home
            </Link>
          </div>
        </div>
      </div>
    )
  }

  const handleProcess = async () => {
    if (files.length === 0) return
    setState('processing')
    setError(null)
    try {
      const formData = new FormData()
      files.forEach(f => formData.append('file', f))

      const endpoint = ENDPOINT_MAP[config.name]
      if (!endpoint) {
        throw new Error('This tool is coming soon')
      }

      const res = await fetch(endpoint, { method: 'POST', body: formData })
      const data = await res.json()

      if (!res.ok) throw new Error(data.error || 'Processing failed')

      setResult({ url: data.download_url, filename: data.filename, meta: data })
      setState('done')
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : 'Processing failed')
      setState('error')
    }
  }

  return (
    <div className="min-h-screen" style={{ background: '#0A0618' }}>
      <Nav />
      <div className="pt-24 pb-16 px-6">
        <div className="max-w-2xl mx-auto">

          {/* Header */}
          <div className="mb-8 text-center">
            <div className="flex items-center justify-center gap-2 mb-4">
              {config.isAI && <Badge variant="ai"><Brain className="w-3 h-3 mr-1" />AI-powered</Badge>}
              {config.requiresPro && <Badge variant="pro"><Lock className="w-3 h-3 mr-1" />Pro</Badge>}
            </div>
            <h1 className="text-4xl md:text-5xl font-light mb-3" style={{ fontFamily: 'Instrument Serif, serif' }}>
              {config.title}
            </h1>
            <p className="text-white/60">{config.description}</p>
          </div>

          {/* Tool Card */}
          <div className="bg-[#13102B] border border-white/10 rounded-2xl p-6 space-y-6">

            {state === 'idle' && (
              <>
                <DropZone
                  acceptedTypes={config.acceptedTypes}
                  maxFiles={config.maxFiles}
                  onFilesAccepted={setFiles}
                />
                {files.length > 0 && (
                  <Button onClick={handleProcess} className="w-full" size="lg">
                    {config.isAI ? 'Extract with AI' : 'Convert Now'}
                  </Button>
                )}
              </>
            )}

            {state === 'processing' && <ProcessingState />}

            {state === 'done' && result && (
              <DownloadCard
                url={result.url}
                filename={result.filename}
                meta={result.meta}
                onReset={() => { setState('idle'); setFiles([]); setResult(null) }}
              />
            )}

            {state === 'error' && (
              <div className="text-center space-y-4 py-8">
                <div className="w-12 h-12 bg-red-500/20 rounded-full flex items-center justify-center mx-auto">
                  <span className="text-red-400 text-xl">!</span>
                </div>
                <div>
                  <p className="text-white font-semibold">Something went wrong</p>
                  <p className="text-red-400 text-sm mt-1">{error}</p>
                </div>
                <button
                  onClick={() => { setState('idle'); setError(null) }}
                  className="text-white/50 text-sm hover:text-white transition-colors"
                >
                  Try again
                </button>
              </div>
            )}
          </div>

          {/* Security note */}
          <p className="text-center text-white/30 text-xs mt-6">
            Files are processed securely and deleted automatically after 1 hour
          </p>
        </div>
      </div>
    </div>
  )
}
