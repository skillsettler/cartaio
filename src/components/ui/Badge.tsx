import { cn } from '@/lib/utils'

interface BadgeProps {
  children: React.ReactNode
  variant?: 'default' | 'pro' | 'teams' | 'free' | 'ai' | 'success' | 'error'
  className?: string
}

export function Badge({ children, variant = 'default', className }: BadgeProps) {
  return (
    <span className={cn(
      'inline-flex items-center px-2 py-0.5 rounded-md text-xs font-mono font-medium',
      {
        'bg-white/10 text-white/70': variant === 'default',
        'bg-violet-500/20 text-violet-300 border border-violet-500/30': variant === 'pro',
        'bg-indigo-500/20 text-indigo-300 border border-indigo-500/30': variant === 'teams',
        'bg-white/5 text-white/40 border border-white/10': variant === 'free',
        'bg-cyan-500/20 text-cyan-300 border border-cyan-500/30': variant === 'ai',
        'bg-green-500/20 text-green-300 border border-green-500/30': variant === 'success',
        'bg-red-500/20 text-red-300 border border-red-500/30': variant === 'error',
      },
      className
    )}>
      {children}
    </span>
  )
}
