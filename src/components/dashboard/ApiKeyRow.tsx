'use client'
import { useState } from 'react'
import { ApiKey } from '@/types'
import { formatDate } from '@/lib/utils'
import { Trash2, Eye, EyeOff } from 'lucide-react'
import { Badge } from '@/components/ui/Badge'
import { Button } from '@/components/ui/Button'

interface ApiKeyRowProps {
  apiKey: ApiKey
  onDelete: (id: string) => void
}

export function ApiKeyRow({ apiKey, onDelete }: ApiKeyRowProps) {
  const [deleting, setDeleting] = useState(false)

  const handleDelete = async () => {
    setDeleting(true)
    onDelete(apiKey.id)
  }

  return (
    <div className="flex items-center gap-4 p-4 bg-white/5 border border-white/10 rounded-xl">
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-2 mb-1">
          <p className="text-white font-medium text-sm">{apiKey.name}</p>
          <Badge variant={apiKey.is_active ? 'success' : 'error'}>
            {apiKey.is_active ? 'active' : 'inactive'}
          </Badge>
        </div>
        <p className="font-mono text-white/40 text-xs">{apiKey.key_prefix}••••••••••••••••</p>
        <p className="text-white/30 text-xs mt-1">
          Created {formatDate(apiKey.created_at)}
          {apiKey.last_used_at && ` · Last used ${formatDate(apiKey.last_used_at)}`}
        </p>
      </div>
      <Button
        variant="danger"
        size="sm"
        loading={deleting}
        onClick={handleDelete}
      >
        <Trash2 className="w-3.5 h-3.5" />
        Delete
      </Button>
    </div>
  )
}
