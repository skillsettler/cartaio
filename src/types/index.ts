export type Plan = 'free' | 'pro' | 'teams'

export interface Profile {
  id: string
  email: string
  full_name: string | null
  plan: Plan
  stripe_customer_id: string | null
  stripe_subscription_id: string | null
  api_calls_this_month: number
  api_calls_limit: number
  files_today: number
  files_limit: number
  max_file_size_mb: number
  created_at: string
}

export interface ApiKey {
  id: string
  user_id: string
  name: string
  key_prefix: string
  last_used_at: string | null
  is_active: boolean
  created_at: string
}

export interface Job {
  id: string
  user_id: string | null
  tool: string
  status: 'pending' | 'processing' | 'complete' | 'failed' | 'expired'
  input_urls: string[]
  output_url: string | null
  output_filename: string | null
  error_message: string | null
  metadata: Record<string, unknown>
  expires_at: string
  processing_ms: number | null
  created_at: string
}

export type ToolName =
  | 'compress-pdf' | 'merge-pdf' | 'split-pdf'
  | 'word-to-pdf' | 'excel-to-pdf' | 'powerpoint-to-pdf'
  | 'jpg-to-pdf' | 'pdf-to-word' | 'pdf-to-excel'
  | 'protect-pdf' | 'unlock-pdf' | 'rotate-pdf'
  | 'edit-pdf' | 'sign-pdf' | 'pdf-ocr'
  | 'redact-pdf' | 'summarise-pdf' | 'translate-pdf'
  | 'bank-statement-converter' | 'invoice-extractor' | 'receipt-scanner'

export interface ToolConfig {
  name: ToolName
  title: string
  description: string
  acceptedTypes: string[]
  maxFiles: number
  outputFormat: string
  requiresPro: boolean
  isAI: boolean
}

export const TOOLS: Record<ToolName, ToolConfig> = {
  'compress-pdf': {
    name: 'compress-pdf', title: 'Compress PDF',
    description: 'Reduce PDF file size without losing quality',
    acceptedTypes: ['application/pdf'], maxFiles: 1,
    outputFormat: 'pdf', requiresPro: false, isAI: false
  },
  'merge-pdf': {
    name: 'merge-pdf', title: 'Merge PDF',
    description: 'Combine multiple PDFs into one document',
    acceptedTypes: ['application/pdf'], maxFiles: 20,
    outputFormat: 'pdf', requiresPro: false, isAI: false
  },
  'split-pdf': {
    name: 'split-pdf', title: 'Split PDF',
    description: 'Split a PDF into separate pages or ranges',
    acceptedTypes: ['application/pdf'], maxFiles: 1,
    outputFormat: 'zip', requiresPro: false, isAI: false
  },
  'word-to-pdf': {
    name: 'word-to-pdf', title: 'Word to PDF',
    description: 'Convert .doc and .docx files to PDF',
    acceptedTypes: ['application/vnd.openxmlformats-officedocument.wordprocessingml.document'],
    maxFiles: 1, outputFormat: 'pdf', requiresPro: false, isAI: false
  },
  'excel-to-pdf': {
    name: 'excel-to-pdf', title: 'Excel to PDF',
    description: 'Convert Excel spreadsheets to PDF',
    acceptedTypes: ['application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'],
    maxFiles: 1, outputFormat: 'pdf', requiresPro: false, isAI: false
  },
  'powerpoint-to-pdf': {
    name: 'powerpoint-to-pdf', title: 'PowerPoint to PDF',
    description: 'Convert presentations to PDF',
    acceptedTypes: ['application/vnd.openxmlformats-officedocument.presentationml.presentation'],
    maxFiles: 1, outputFormat: 'pdf', requiresPro: false, isAI: false
  },
  'jpg-to-pdf': {
    name: 'jpg-to-pdf', title: 'JPG to PDF',
    description: 'Convert images to PDF online',
    acceptedTypes: ['image/jpeg','image/png','image/tiff','image/webp'],
    maxFiles: 20, outputFormat: 'pdf', requiresPro: false, isAI: false
  },
  'pdf-to-word': {
    name: 'pdf-to-word', title: 'PDF to Word',
    description: 'Convert PDF to editable Word document',
    acceptedTypes: ['application/pdf'], maxFiles: 1,
    outputFormat: 'docx', requiresPro: false, isAI: false
  },
  'pdf-to-excel': {
    name: 'pdf-to-excel', title: 'PDF to Excel',
    description: 'Extract tables from PDF into Excel',
    acceptedTypes: ['application/pdf'], maxFiles: 1,
    outputFormat: 'xlsx', requiresPro: true, isAI: true
  },
  'protect-pdf': {
    name: 'protect-pdf', title: 'Protect PDF',
    description: 'Password protect a PDF',
    acceptedTypes: ['application/pdf'], maxFiles: 1,
    outputFormat: 'pdf', requiresPro: false, isAI: false
  },
  'unlock-pdf': {
    name: 'unlock-pdf', title: 'Unlock PDF',
    description: 'Remove password from your PDF',
    acceptedTypes: ['application/pdf'], maxFiles: 1,
    outputFormat: 'pdf', requiresPro: false, isAI: false
  },
  'rotate-pdf': {
    name: 'rotate-pdf', title: 'Rotate PDF',
    description: 'Rotate pages in a PDF',
    acceptedTypes: ['application/pdf'], maxFiles: 1,
    outputFormat: 'pdf', requiresPro: false, isAI: false
  },
  'edit-pdf': {
    name: 'edit-pdf', title: 'Edit PDF Online',
    description: 'Add text, images and annotations',
    acceptedTypes: ['application/pdf'], maxFiles: 1,
    outputFormat: 'pdf', requiresPro: false, isAI: false
  },
  'sign-pdf': {
    name: 'sign-pdf', title: 'Sign PDF Online',
    description: 'Electronically sign a PDF for free',
    acceptedTypes: ['application/pdf'], maxFiles: 1,
    outputFormat: 'pdf', requiresPro: false, isAI: false
  },
  'pdf-ocr': {
    name: 'pdf-ocr', title: 'PDF OCR',
    description: 'Make scanned PDFs searchable',
    acceptedTypes: ['application/pdf'], maxFiles: 1,
    outputFormat: 'pdf', requiresPro: true, isAI: true
  },
  'redact-pdf': {
    name: 'redact-pdf', title: 'Redact PDF',
    description: 'Permanently black out sensitive text',
    acceptedTypes: ['application/pdf'], maxFiles: 1,
    outputFormat: 'pdf', requiresPro: true, isAI: true
  },
  'summarise-pdf': {
    name: 'summarise-pdf', title: 'Summarise PDF',
    description: 'AI-powered summary of any PDF',
    acceptedTypes: ['application/pdf'], maxFiles: 1,
    outputFormat: 'txt', requiresPro: true, isAI: true
  },
  'translate-pdf': {
    name: 'translate-pdf', title: 'Translate PDF',
    description: 'Translate PDF to 30+ languages',
    acceptedTypes: ['application/pdf'], maxFiles: 1,
    outputFormat: 'pdf', requiresPro: true, isAI: true
  },
  'bank-statement-converter': {
    name: 'bank-statement-converter', title: 'Bank Statement Converter',
    description: 'Convert PDF bank statements to CSV, Excel, QBO',
    acceptedTypes: ['application/pdf'], maxFiles: 1,
    outputFormat: 'csv', requiresPro: false, isAI: true
  },
  'invoice-extractor': {
    name: 'invoice-extractor', title: 'Invoice Extractor',
    description: 'Extract data from invoice PDFs',
    acceptedTypes: ['application/pdf'], maxFiles: 1,
    outputFormat: 'json', requiresPro: true, isAI: true
  },
  'receipt-scanner': {
    name: 'receipt-scanner', title: 'Receipt Scanner',
    description: 'Scan receipts and export to Excel',
    acceptedTypes: ['application/pdf','image/jpeg','image/png'],
    maxFiles: 10, outputFormat: 'xlsx', requiresPro: true, isAI: true
  }
}

export const PLAN_LIMITS: Record<Plan, {
  filesPerDay: number
  maxFileSizeMb: number
  apiCallsPerMonth: number
  maxUsers: number
  hasApiAccess: boolean
  hasWebhooks: boolean
}> = {
  free: {
    filesPerDay: 5, maxFileSizeMb: 10,
    apiCallsPerMonth: 0, maxUsers: 1,
    hasApiAccess: false, hasWebhooks: false
  },
  pro: {
    filesPerDay: -1, maxFileSizeMb: 100,
    apiCallsPerMonth: 1000, maxUsers: 1,
    hasApiAccess: true, hasWebhooks: false
  },
  teams: {
    filesPerDay: -1, maxFileSizeMb: 500,
    apiCallsPerMonth: 10000, maxUsers: 10,
    hasApiAccess: true, hasWebhooks: true
  }
}
