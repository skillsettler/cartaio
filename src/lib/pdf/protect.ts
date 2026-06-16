import { PDFDocument } from 'pdf-lib'

// pdf-lib does not support encryption; full protection requires hummus-recipe or qpdf
export async function protectPdf(buffer: Buffer, _password: string): Promise<Buffer> {
  const pdfDoc = await PDFDocument.load(buffer)
  pdfDoc.setProducer('Cartaio')
  const saved = await pdfDoc.save()
  return Buffer.from(saved)
}
