export const dynamic = 'force-dynamic'
import { NextRequest, NextResponse } from 'next/server'
import { createServiceClient } from '@/lib/supabase/server'
import { mergePdfs } from '@/lib/pdf/merge'

export async function POST(request: NextRequest) {
  const start = Date.now()
  try {
    const formData = await request.formData()
    const files = formData.getAll('file') as File[]
    if (files.length < 2) return NextResponse.json({ error: 'At least 2 files required' }, { status: 400 })

    const buffers = await Promise.all(files.map(f => f.arrayBuffer().then(ab => Buffer.from(ab))))
    const outputBuffer = await mergePdfs(buffers)

    const supabase = await createServiceClient()
    const jobId = crypto.randomUUID()
    const outputPath = `anonymous/${jobId}/merged.pdf`

    const { error: uploadError } = await supabase.storage
      .from('conversions')
      .upload(outputPath, outputBuffer, { contentType: 'application/pdf', upsert: false })

    if (uploadError) throw uploadError

    const { data: { publicUrl } } = supabase.storage.from('conversions').getPublicUrl(outputPath)
    const processingMs = Date.now() - start

    await supabase.from('jobs').insert({
      id: jobId, tool: 'merge-pdf', status: 'complete',
      output_url: outputPath, output_filename: 'merged.pdf', processing_ms: processingMs,
      metadata: { input_count: files.length, output_size: outputBuffer.length }
    })

    return NextResponse.json({
      success: true, job_id: jobId, download_url: publicUrl,
      filename: 'merged.pdf', pages_merged: files.length, processing_ms: processingMs
    })
  } catch (error) {
    console.error('Merge error:', error)
    return NextResponse.json({ error: 'Processing failed' }, { status: 500 })
  }
}
