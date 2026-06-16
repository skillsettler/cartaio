import { PDFDocument } from 'pdf-lib'

export async function splitPdf(
  buffer: Buffer,
  ranges?: { start: number; end: number }[]
): Promise<Buffer[]> {
  const srcPdf = await PDFDocument.load(buffer)
  const totalPages = srcPdf.getPageCount()
  const splitRanges = ranges || Array.from({ length: totalPages }, (_, i) => ({ start: i, end: i }))
  const results: Buffer[] = []
  for (const range of splitRanges) {
    const newPdf = await PDFDocument.create()
    const indices = Array.from(
      { length: range.end - range.start + 1 },
      (_, i) => range.start + i
    ).filter(i => i < totalPages)
    const pages = await newPdf.copyPages(srcPdf, indices)
    pages.forEach(p => newPdf.addPage(p))
    results.push(Buffer.from(await newPdf.save()))
  }
  return results
}
