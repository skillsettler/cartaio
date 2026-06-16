export const dynamic = 'force-dynamic'
import { NextRequest, NextResponse } from 'next/server'
import { createServiceClient } from '@/lib/supabase/server'
import { splitPdf } from '@/lib/pdf/split'

export async function POST(request: NextRequest) {
  const start = Date.now()
  try {
    const formData = await request.formData()
    const file = formData.get('file') as File | null
    if (!file) return NextResponse.json({ error: 'No file provided' }, { status: 400 })

    const inputBuffer = Buffer.from(await file.arrayBuffer())
    const pages = await splitPdf(inputBuffer)

    const supabase = await createServiceClient()
    const jobId = crypto.randomUUID()
    const urls: string[] = []

    for (let i = 0; i < pages.length; i++) {
      const outputPath = `anonymous/${jobId}/page-${i + 1}.pdf`
      await supabase.storage.from('conversions').upload(outputPath, pages[i], {
        contentType: 'application/pdf', upsert: false
      })
      const { data: { publicUrl } } = supabase.storage.from('conversions').getPublicUrl(outputPath)
      urls.push(publicUrl)
    }

    const processingMs = Date.now() - start

    await supabase.from('jobs').insert({
      id: jobId, tool: 'split-pdf', status: 'complete',
      processing_ms: processingMs, metadata: { page_count: pages.length }
    })

    return NextResponse.json({
      success: true, job_id: jobId, pages: urls.map((url, i) => ({
        page: i + 1, download_url: url, filename: `page-${i + 1}.pdf`
      })),
      page_count: pages.length, processing_ms: processingMs
    })
  } catch (error) {
    console.error('Split error:', error)
    return NextResponse.json({ error: 'Processing failed' }, { status: 500 })
  }
}
