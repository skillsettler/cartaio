export const dynamic = 'force-dynamic'
import { NextRequest, NextResponse } from 'next/server'
import { createServiceClient } from '@/lib/supabase/server'
import { extractBankStatement } from '@/lib/ai/extract-bank-statement'
import { PDFDocument } from 'pdf-lib'

export async function POST(request: NextRequest) {
  const start = Date.now()
  try {
    const formData = await request.formData()
    const file = formData.get('file') as File | null
    const format = (formData.get('format') as string) || 'csv'
    if (!file) return NextResponse.json({ error: 'No file provided' }, { status: 400 })

    const inputBuffer = Buffer.from(await file.arrayBuffer())
    const pdfDoc = await PDFDocument.load(inputBuffer)
    const pageCount = pdfDoc.getPageCount()

    // In production, use a proper PDF text extractor; pdf-lib does layout, not text extraction
    const pdfText = `Bank statement PDF: ${file.name}, ${pageCount} pages`

    const result = await extractBankStatement(pdfText)

    let outputBuffer: Buffer
    let contentType: string
    let filename: string

    if (format === 'csv') {
      const headers = 'Date,Description,Amount,Currency,Type,Balance\n'
      const rows = result.transactions.map(t =>
        `${t.date},"${t.description}",${t.amount},${t.currency},${t.type},${t.balance || ''}`
      ).join('\n')
      outputBuffer = Buffer.from(headers + rows, 'utf-8')
      contentType = 'text/csv'
      filename = 'transactions.csv'
    } else {
      outputBuffer = Buffer.from(JSON.stringify(result, null, 2), 'utf-8')
      contentType = 'application/json'
      filename = 'transactions.json'
    }

    const supabase = await createServiceClient()
    const jobId = crypto.randomUUID()
    const outputPath = `anonymous/${jobId}/${filename}`

    await supabase.storage.from('conversions').upload(outputPath, outputBuffer, {
      contentType, upsert: false
    })

    const { data: { publicUrl } } = supabase.storage.from('conversions').getPublicUrl(outputPath)

    return NextResponse.json({
      success: true, job_id: jobId, download_url: publicUrl, filename,
      data: result, transaction_count: result.transactions.length,
      processing_ms: Date.now() - start
    })
  } catch (error) {
    console.error('Extract error:', error)
    return NextResponse.json({ error: 'Processing failed' }, { status: 500 })
  }
}
