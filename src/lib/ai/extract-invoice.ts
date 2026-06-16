import Anthropic from '@anthropic-ai/sdk'

const client = new Anthropic()

export interface InvoiceLineItem {
  description: string
  quantity: number
  unit_price: number
  total: number
  tax_rate?: number
}

export interface InvoiceResult {
  vendor_name: string | null
  vendor_address: string | null
  vendor_vat_number: string | null
  customer_name: string | null
  customer_address: string | null
  invoice_number: string | null
  invoice_date: string | null
  due_date: string | null
  currency: string
  subtotal: number
  tax_amount: number
  total: number
  line_items: InvoiceLineItem[]
  payment_terms: string | null
  notes: string | null
}

export async function extractInvoice(pdfText: string): Promise<InvoiceResult> {
  const message = await client.messages.create({
    model: 'claude-sonnet-4-6',
    max_tokens: 2048,
    messages: [{
      role: 'user',
      content: `Extract invoice data from this text. Return ONLY valid JSON, no markdown:
{
  "vendor_name": string | null,
  "vendor_address": string | null,
  "vendor_vat_number": string | null,
  "customer_name": string | null,
  "customer_address": string | null,
  "invoice_number": string | null,
  "invoice_date": "YYYY-MM-DD" | null,
  "due_date": "YYYY-MM-DD" | null,
  "currency": string,
  "subtotal": number,
  "tax_amount": number,
  "total": number,
  "line_items": [{ "description": string, "quantity": number, "unit_price": number, "total": number }],
  "payment_terms": string | null,
  "notes": string | null
}

Invoice text:
${pdfText}`
    }]
  })
  const text = message.content[0].type === 'text' ? message.content[0].text : ''
  return JSON.parse(text) as InvoiceResult
}
