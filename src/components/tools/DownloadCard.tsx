import { Download, CheckCircle2 } from 'lucide-react'
import { Button } from '@/components/ui/Button'
import { formatBytes } from '@/lib/utils'

interface DownloadCardProps {
  url: string
  filename: string
  meta?: Record<string, unknown>
  onReset: () => void
}

export function DownloadCard({ url, filename, meta, onReset }: DownloadCardProps) {
  return (
    <div className="text-center space-y-6 py-4">
      <div className="flex flex-col items-center gap-3">
        <div className="w-16 h-16 bg-green-500 rounded-full flex items-center justify-center shadow-lg shadow-green-500/30">
          <CheckCircle2 className="w-9 h-9 text-white" />
        </div>
        <div>
          <h3 className="text-xl font-light" style={{ fontFamily: 'Instrument Serif, serif' }}>
            Done!
          </h3>
          <p className="text-white/60 text-sm mt-1">Your file is ready to download</p>
        </div>
      </div>

      {meta && (
        <div className="grid grid-cols-2 gap-3 text-sm">
          {!!(meta.original_size && meta.compressed_size) && (
            <>
              <div className="bg-white/5 rounded-lg p-3">
                <p className="text-white/50 text-xs mb-1">Original</p>
                <p className="text-white font-mono">{formatBytes(meta.original_size as number)}</p>
              </div>
              <div className="bg-white/5 rounded-lg p-3">
                <p className="text-white/50 text-xs mb-1">Compressed</p>
                <p className="text-white font-mono">{formatBytes(meta.compressed_size as number)}</p>
              </div>
            </>
          )}
          {meta.reduction_percent !== undefined && (
            <div className="col-span-2 bg-green-500/10 border border-green-500/20 rounded-lg p-3">
              <p className="text-green-400 font-mono font-medium">
                {meta.reduction_percent as number}% smaller
              </p>
            </div>
          )}
        </div>
      )}

      <div className="space-y-3">
        <a
          href={url}
          download={filename}
          className="flex items-center justify-center gap-2 w-full py-3 rounded-xl bg-gradient-to-r from-violet-600 to-indigo-600 text-white font-bold text-sm shadow-lg shadow-violet-500/30 hover:opacity-90 transition-opacity"
        >
          <Download className="w-4 h-4" />
          Download {filename}
        </a>
        <button
          onClick={onReset}
          className="text-white/50 text-sm hover:text-white transition-colors"
        >
          Convert another file
        </button>
      </div>
    </div>
  )
}
