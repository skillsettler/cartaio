import { Loader2 } from 'lucide-react'

export function ProcessingState() {
  return (
    <div className="flex flex-col items-center gap-4 py-12">
      <div className="relative">
        <div className="w-16 h-16 rounded-full border-2 border-violet-500/20 flex items-center justify-center">
          <Loader2 className="w-8 h-8 text-violet-400 animate-spin" />
        </div>
        <div className="absolute inset-0 rounded-full bg-violet-500/10 animate-ping" />
      </div>
      <div className="text-center">
        <p className="text-white font-semibold">Processing your file...</p>
        <p className="text-white/50 text-sm mt-1">This usually takes a few seconds</p>
      </div>
    </div>
  )
}
