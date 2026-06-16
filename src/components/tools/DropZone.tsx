'use client'
import { useCallback, useState } from 'react'
import { useDropzone } from 'react-dropzone'
import { Upload, File, X, AlertCircle } from 'lucide-react'
import { cn } from '@/lib/utils'

interface DropZoneProps {
  acceptedTypes: string[]
  maxFiles?: number
  maxSizeMb?: number
  onFilesAccepted: (files: File[]) => void
  disabled?: boolean
}

export function DropZone({
  acceptedTypes, maxFiles = 1, maxSizeMb = 100, onFilesAccepted, disabled
}: DropZoneProps) {
  const [error, setError] = useState<string | null>(null)
  const [files, setFiles] = useState<File[]>([])

  const onDrop = useCallback((accepted: File[], rejected: import('react-dropzone').FileRejection[]) => {
    setError(null)
    if (rejected.length > 0) {
      setError(rejected[0].errors[0]?.message || 'File rejected')
      return
    }
    setFiles(accepted)
    onFilesAccepted(accepted)
  }, [onFilesAccepted])

  const accept = acceptedTypes.reduce((acc, type) => ({ ...acc, [type]: [] }), {})

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop, accept, maxFiles, maxSize: maxSizeMb * 1024 * 1024, disabled
  })

  const removeFile = (index: number) => {
    const newFiles = files.filter((_, i) => i !== index)
    setFiles(newFiles)
    onFilesAccepted(newFiles)
  }

  return (
    <div className="space-y-3">
      <div
        {...getRootProps()}
        className={cn(
          'border-2 border-dashed rounded-xl p-10 text-center cursor-pointer transition-all',
          isDragActive
            ? 'border-violet-500 bg-violet-500/10'
            : 'border-white/20 bg-white/5 hover:border-violet-500/50 hover:bg-violet-500/5',
          disabled && 'opacity-50 cursor-not-allowed'
        )}
      >
        <input {...getInputProps()} />
        <div className="flex flex-col items-center gap-3">
          <div className="w-14 h-14 rounded-xl bg-violet-500/20 flex items-center justify-center">
            <Upload className="w-7 h-7 text-violet-400" />
          </div>
          <div>
            <p className="text-white font-semibold">
              {isDragActive ? 'Drop files here' : 'Drag & drop your file here'}
            </p>
            <p className="text-white/50 text-sm mt-1">or click to browse · Max {maxSizeMb}MB</p>
          </div>
        </div>
      </div>

      {error && (
        <div className="flex items-center gap-2 text-red-400 text-sm bg-red-500/10 border border-red-500/20 rounded-lg p-3">
          <AlertCircle className="w-4 h-4 flex-shrink-0" />
          {error}
        </div>
      )}

      {files.length > 0 && (
        <div className="space-y-2">
          {files.map((file, i) => (
            <div key={i} className="flex items-center gap-3 bg-white/5 border border-white/10 rounded-lg p-3">
              <div className="w-8 h-8 bg-violet-500/20 rounded-lg flex items-center justify-center flex-shrink-0">
                <File className="w-4 h-4 text-violet-400" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-white text-sm font-medium truncate">{file.name}</p>
                <p className="text-white/50 text-xs">{(file.size / 1024 / 1024).toFixed(2)} MB</p>
              </div>
              <button
                onClick={(e) => { e.stopPropagation(); removeFile(i) }}
                className="text-white/40 hover:text-white transition-colors"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
