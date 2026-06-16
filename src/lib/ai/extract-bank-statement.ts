import Anthropic from '@anthropic-ai/sdk'

const client = new Anthropic()

export interface Transaction {
  date: string
  description: string
  amount: number
  currency: string
  type: 'credit' | 'debit'
  balance?: number
  category?: string
}

export interface BankStatementResult {
  bank_name?: string
  account_number?: string
  statement_period?: { from: string; to: string }
  opening_balance?: number
  closing_balance?: number
  currency: string
  transactions: Transaction[]
  total_credits: number
  total_debits: number
}

export async function extractBankStatement(pdfText: string): Promise<BankStatementResult> {
  const message = await client.messages.create({
    model: 'claude-sonnet-4-6',
    max_tokens: 4096,
    messages: [{
      role: 'user',
      content: `Extract all transaction data from this bank statement text. Return ONLY valid JSON matching this exact schema, no markdown, no explanation:
{
  "bank_name": string | null,
  "account_number": string | null,
  "statement_period": { "from": "YYYY-MM-DD", "to": "YYYY-MM-DD" } | null,
  "opening_balance": number | null,
  "closing_balance": number | null,
  "currency": string,
  "transactions": [
    {
      "date": "YYYY-MM-DD",
      "description": string,
      "amount": number,
      "currency": string,
      "type": "credit" | "debit",
      "balance": number | null,
      "category": string | null
    }
  ],
  "total_credits": number,
  "total_debits": number
}

Bank statement text:
${pdfText}`
    }]
  })
  const text = message.content[0].type === 'text' ? message.content[0].text : ''
  return JSON.parse(text) as BankStatementResult
}
