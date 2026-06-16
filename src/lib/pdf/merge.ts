import { PDFDocument } from 'pdf-lib'

export async function mergePdfs(buffers: Buffer[]): Promise<Buffer> {
  const mergedPdf = await PDFDocument.create()
  for (const buffer of buffers) {
    const pdf = await PDFDocument.load(buffer)
    const pages = await mergedPdf.copyPages(pdf, pdf.getPageIndices())
    pages.forEach(page => mergedPdf.addPage(page))
  }
  const merged = await mergedPdf.save()
  return Buffer.from(merged)
}
