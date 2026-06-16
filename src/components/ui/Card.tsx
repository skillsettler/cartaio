import { cn } from '@/lib/utils'

interface CardProps {
  children: React.ReactNode
  className?: string
  hover?: boolean
}

export function Card({ children, className, hover }: CardProps) {
  return (
    <div className={cn(
      'bg-[#13102B] border border-white/10 rounded-2xl p-6',
      hover && 'hover:border-violet-500/30 hover:bg-[#1C1842] transition-all cursor-pointer',
      className
    )}>
      {children}
    </div>
  )
}
