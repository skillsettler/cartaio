import { PDFDocument } from 'pdf-lib'

export async function compressPdf(inputBuffer: Buffer): Promise<Buffer> {
  const pdfDoc = await PDFDocument.load(inputBuffer, { updateMetadata: false })
  pdfDoc.setTitle('')
  pdfDoc.setAuthor('')
  pdfDoc.setSubject('')
  pdfDoc.setKeywords([])
  pdfDoc.setProducer('Cartaio')
  pdfDoc.setCreator('Cartaio')
  const compressed = await pdfDoc.save({
    useObjectStreams: true,
    addDefaultPage: false,
    objectsPerTick: 50
  })
  return Buffer.from(compressed)
}
