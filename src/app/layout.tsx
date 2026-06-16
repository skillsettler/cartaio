import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'Cartaio — PDF Tools & Financial Document Extraction',
  description: 'Compress, merge, split PDFs and extract data from bank statements and invoices using AI. Fast, secure, free to start.',
  keywords: 'PDF tools, compress PDF, merge PDF, bank statement converter, invoice extractor',
  openGraph: {
    title: 'Cartaio — PDF Tools',
    description: 'Professional PDF tools with AI-powered financial document extraction.',
    url: 'https://cartaio.io',
    siteName: 'Cartaio',
    type: 'website',
  }
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="antialiased">
        {children}
      </body>
    </html>
  )
}
