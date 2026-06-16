import Link from 'next/link'
import { Nav } from '@/components/layout/Nav'
import { Footer } from '@/components/layout/Footer'
import { Badge } from '@/components/ui/Badge'
import {
  FileText, Zap, Shield, Brain, ArrowRight,
  ChevronRight, Check, FileSearch, Receipt, TrendingDown
} from 'lucide-react'

const tools = [
  { icon: TrendingDown, label: 'Compress PDF', href: '/tools/compress-pdf', badge: 'Free', color: 'text-violet-400' },
  { icon: FileText, label: 'Merge PDF', href: '/tools/merge-pdf', badge: 'Free', color: 'text-indigo-400' },
  { icon: FileText, label: 'Split PDF', href: '/tools/split-pdf', badge: 'Free', color: 'text-blue-400' },
  { icon: Brain, label: 'Bank Statement Converter', href: '/tools/bank-statement-converter', badge: 'AI', color: 'text-cyan-400' },
  { icon: FileSearch, label: 'Invoice Extractor', href: '/tools/invoice-extractor', badge: 'Pro', color: 'text-violet-400' },
  { icon: Receipt, label: 'Receipt Scanner', href: '/tools/receipt-scanner', badge: 'Pro', color: 'text-indigo-400' },
]

const features = [
  { icon: Zap, title: 'Blazing fast', desc: 'Process PDFs in seconds with server-side rendering. No waiting.' },
  { icon: Shield, title: 'Private by design', desc: 'Files auto-deleted after 1 hour. We never read your documents.' },
  { icon: Brain, title: 'AI-powered extraction', desc: 'Claude extracts structured data from any financial document.' },
]

const pricingPlans = [
  {
    name: 'Free', price: '€0', period: '/mo',
    features: ['5 files per day', '10MB max file size', 'All basic tools', 'No account needed'],
    cta: 'Start for free', href: '/signup', highlight: false
  },
  {
    name: 'Pro', price: '€9', period: '/mo',
    features: ['Unlimited files', '100MB max file size', 'All AI tools', 'API access (1,000 calls/mo)', 'Priority processing'],
    cta: 'Start Pro', href: '/signup?plan=pro', highlight: true
  },
  {
    name: 'Teams', price: '€39', period: '/mo',
    features: ['Everything in Pro', 'Up to 10 team members', '500MB max file size', '10,000 API calls/mo', 'Webhooks', 'Priority support'],
    cta: 'Start Teams', href: '/signup?plan=teams', highlight: false
  }
]

export default function LandingPage() {
  return (
    <div className="min-h-screen" style={{ background: '#0A0618' }}>
      <Nav />

      {/* Hero */}
      <section className="relative pt-32 pb-24 px-6 overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_50%_0%,rgba(124,58,237,0.15),transparent_70%)]" />
        <div className="max-w-5xl mx-auto text-center relative">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-violet-500/10 border border-violet-500/20 text-violet-300 text-sm font-medium mb-8">
            <Brain className="w-4 h-4" />
            AI-powered PDF tools
          </div>

          <h1 className="text-5xl md:text-7xl font-light leading-tight mb-6" style={{ fontFamily: 'Instrument Serif, serif' }}>
            PDF tools that{' '}
            <span className="italic text-violet-400">actually</span>
            <br />understand your documents
          </h1>

          <p className="text-xl text-white/60 mb-10 max-w-2xl mx-auto">
            Compress, merge, split, and extract data from PDFs. Convert bank statements and invoices to structured data with AI.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              href="/tools/compress-pdf"
              className="flex items-center gap-2 px-8 py-4 rounded-xl bg-gradient-to-r from-violet-600 to-indigo-600 text-white font-bold text-base shadow-2xl shadow-violet-500/30 hover:opacity-90 transition-opacity"
            >
              Start for free
              <ArrowRight className="w-4 h-4" />
            </Link>
            <Link
              href="/tools/bank-statement-converter"
              className="flex items-center gap-2 px-8 py-4 rounded-xl bg-white/5 border border-white/15 text-white font-semibold text-base hover:bg-white/10 transition-colors"
            >
              Try Bank Statement Converter
              <ChevronRight className="w-4 h-4" />
            </Link>
          </div>

          <p className="text-white/30 text-sm mt-6">No account required · Files deleted after 1 hour · Free forever plan</p>
        </div>
      </section>

      {/* Tools Grid */}
      <section className="py-24 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-light mb-4" style={{ fontFamily: 'Instrument Serif, serif' }}>
              Every PDF tool you need
            </h2>
            <p className="text-white/50">Process files instantly in your browser. No software to install.</p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {tools.map((tool) => (
              <Link
                key={tool.href}
                href={tool.href}
                className="group p-6 bg-[#13102B] border border-white/10 rounded-2xl hover:border-violet-500/40 hover:bg-[#1C1842] transition-all"
              >
                <div className="flex items-start justify-between mb-4">
                  <div className="w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center">
                    <tool.icon className={`w-5 h-5 ${tool.color}`} />
                  </div>
                  <Badge variant={tool.badge === 'AI' ? 'ai' : tool.badge === 'Pro' ? 'pro' : 'default'}>
                    {tool.badge}
                  </Badge>
                </div>
                <p className="text-white font-medium text-sm group-hover:text-violet-300 transition-colors">
                  {tool.label}
                </p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-24 px-6 bg-[#13102B]/50">
        <div className="max-w-5xl mx-auto">
          <div className="grid md:grid-cols-3 gap-8">
            {features.map((f) => (
              <div key={f.title} className="text-center">
                <div className="w-12 h-12 rounded-xl bg-violet-500/20 flex items-center justify-center mx-auto mb-4">
                  <f.icon className="w-6 h-6 text-violet-400" />
                </div>
                <h3 className="text-white font-semibold mb-2">{f.title}</h3>
                <p className="text-white/50 text-sm leading-relaxed">{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Bank Statement Feature */}
      <section className="py-24 px-6">
        <div className="max-w-5xl mx-auto">
          <div className="bg-gradient-to-br from-violet-900/40 to-indigo-900/20 border border-violet-500/20 rounded-3xl p-10 md:p-16">
            <div className="grid md:grid-cols-2 gap-12 items-center">
              <div>
                <Badge variant="ai" className="mb-6">AI-Powered</Badge>
                <h2 className="text-3xl md:text-4xl font-light mb-6" style={{ fontFamily: 'Instrument Serif, serif' }}>
                  Bank statements to CSV in seconds
                </h2>
                <p className="text-white/60 mb-8 leading-relaxed">
                  Upload any PDF bank statement. Our AI extracts every transaction, categorises it, and exports to CSV or Excel — ready for your accounting software.
                </p>
                <ul className="space-y-3 mb-8">
                  {['Works with any bank worldwide', 'Detects all transactions automatically', 'Export to CSV, Excel, or QBO', 'Preserves dates, amounts, descriptions'].map(f => (
                    <li key={f} className="flex items-center gap-3 text-white/80 text-sm">
                      <Check className="w-4 h-4 text-green-400 flex-shrink-0" />
                      {f}
                    </li>
                  ))}
                </ul>
                <Link
                  href="/tools/bank-statement-converter"
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-violet-600 text-white font-bold text-sm hover:bg-violet-500 transition-colors"
                >
                  Try it free
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
              <div className="bg-[#0A0618]/60 rounded-2xl p-6 border border-white/10 font-mono text-xs space-y-2">
                <div className="text-white/40 mb-3">transactions.csv</div>
                <div className="grid grid-cols-4 gap-2 text-white/30 text-[10px]">
                  <span>Date</span><span>Description</span><span>Amount</span><span>Type</span>
                </div>
                {[
                  ['2025-01-03', 'Stripe payout', '+€2,450.00', 'credit'],
                  ['2025-01-04', 'AWS invoice', '-€89.20', 'debit'],
                  ['2025-01-05', 'Notion Pro', '-€16.00', 'debit'],
                  ['2025-01-07', 'Client payment', '+€1,200.00', 'credit'],
                ].map(([date, desc, amount, type]) => (
                  <div key={date} className="grid grid-cols-4 gap-2 text-[10px]">
                    <span className="text-white/50">{date}</span>
                    <span className="text-white/70 truncate">{desc}</span>
                    <span className={type === 'credit' ? 'text-green-400' : 'text-red-400'}>{amount}</span>
                    <span className="text-white/40">{type}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Pricing */}
      <section className="py-24 px-6 bg-[#13102B]/50" id="pricing">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-light mb-4" style={{ fontFamily: 'Instrument Serif, serif' }}>
              Simple, transparent pricing
            </h2>
            <p className="text-white/50">Start free. Upgrade when you need more.</p>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {pricingPlans.map((plan) => (
              <div
                key={plan.name}
                className={`relative p-8 rounded-2xl border ${
                  plan.highlight
                    ? 'bg-gradient-to-b from-violet-900/40 to-[#13102B] border-violet-500/40'
                    : 'bg-[#13102B] border-white/10'
                }`}
              >
                {plan.highlight && (
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                    <span className="px-3 py-1 bg-violet-500 text-white text-xs font-bold rounded-full">Most popular</span>
                  </div>
                )}
                <div className="mb-6">
                  <p className="text-white/60 text-sm font-medium mb-2">{plan.name}</p>
                  <div className="flex items-baseline gap-1">
                    <span className="text-4xl font-bold text-white">{plan.price}</span>
                    <span className="text-white/40">{plan.period}</span>
                  </div>
                </div>
                <ul className="space-y-3 mb-8">
                  {plan.features.map(f => (
                    <li key={f} className="flex items-center gap-3 text-white/70 text-sm">
                      <Check className="w-4 h-4 text-green-400 flex-shrink-0" />
                      {f}
                    </li>
                  ))}
                </ul>
                <Link
                  href={plan.href}
                  className={`block text-center py-3 rounded-xl font-bold text-sm transition-all ${
                    plan.highlight
                      ? 'bg-gradient-to-r from-violet-600 to-indigo-600 text-white shadow-lg shadow-violet-500/30 hover:opacity-90'
                      : 'bg-white/10 text-white hover:bg-white/15'
                  }`}
                >
                  {plan.cta}
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  )
}
