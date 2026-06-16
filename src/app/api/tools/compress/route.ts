export const dynamic = 'force-dynamic'
import { NextRequest, NextResponse } from 'next/server'
import { createServiceClient } from '@/lib/supabase/server'
import { compressPdf } from '@/lib/pdf/compress'

export async function POST(request: NextRequest) {
  const start = Date.now()
  try {
    const formData = await request.formData()
    const file = formData.get('file') as File | null
    if (!file) return NextResponse.json({ error: 'No file provided' }, { status: 400 })
    if (file.type !== 'application/pdf') return NextResponse.json({ error: 'File must be a PDF' }, { status: 400 })
    if (file.size > 100 * 1024 * 1024) return NextResponse.json({ error: 'File too large. Max 100MB' }, { status: 413 })

    const inputBuffer = Buffer.from(await file.arrayBuffer())
    const outputBuffer = await compressPdf(inputBuffer)
    const reduction = Math.round((1 - outputBuffer.length / inputBuffer.length) * 100)

    const supabase = await createServiceClient()
    const jobId = crypto.randomUUID()
    const outputPath = `anonymous/${jobId}/compressed.pdf`

    const { error: uploadError } = await supabase.storage
      .from('conversions')
      .upload(outputPath, outputBuffer, { contentType: 'application/pdf', upsert: false })

    if (uploadError) throw uploadError

    const { data: { publicUrl } } = supabase.storage
      .from('conversions')
      .getPublicUrl(outputPath)

    const processingMs = Date.now() - start

    await supabase.from('jobs').insert({
      id: jobId,
      tool: 'compress-pdf',
      status: 'complete',
      output_url: outputPath,
      output_filename: 'compressed.pdf',
      processing_ms: processingMs,
      metadata: {
        input_size: inputBuffer.length,
        output_size: outputBuffer.length,
        reduction_percent: reduction
      }
    })

    return NextResponse.json({
      success: true,
      job_id: jobId,
      download_url: publicUrl,
      filename: 'compressed.pdf',
      original_size: inputBuffer.length,
      compressed_size: outputBuffer.length,
      reduction_percent: reduction,
      processing_ms: processingMs
    })
  } catch (error) {
    console.error('Compress error:', error)
    return NextResponse.json({ error: 'Processing failed' }, { status: 500 })
  }
}
