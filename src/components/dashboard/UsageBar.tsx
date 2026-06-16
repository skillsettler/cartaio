interface UsageBarProps {
  label: string
  used: number
  limit: number
  unit?: string
}

export function UsageBar({ label, used, limit, unit = '' }: UsageBarProps) {
  const unlimited = limit === -1
  const percent = unlimited ? 0 : Math.min((used / limit) * 100, 100)
  const isWarning = !unlimited && percent >= 80
  const isCritical = !unlimited && percent >= 95

  return (
    <div className="space-y-2">
      <div className="flex items-center justify-between text-sm">
        <span className="text-white/70">{label}</span>
        <span className="font-mono text-white/50">
          {unlimited
            ? `${used.toLocaleString()}${unit} / Unlimited`
            : `${used.toLocaleString()}${unit} / ${limit.toLocaleString()}${unit}`
          }
        </span>
      </div>
      {!unlimited && (
        <div className="h-1.5 bg-white/10 rounded-full overflow-hidden">
          <div
            className={`h-full rounded-full transition-all ${
              isCritical ? 'bg-red-500' : isWarning ? 'bg-amber-500' : 'bg-violet-500'
            }`}
            style={{ width: `${percent}%` }}
          />
        </div>
      )}
    </div>
  )
}
