import Stripe from 'stripe'

let _stripe: Stripe | null = null

export function getStripe(): Stripe {
  if (!_stripe) {
    _stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
      apiVersion: '2026-05-27.dahlia',
      appInfo: { name: 'Cartaio', version: '1.0.0' }
    })
  }
  return _stripe
}

export const stripe = new Proxy({} as Stripe, {
  get(_target, prop) {
    return getStripe()[prop as keyof Stripe]
  }
})

export const PLANS = {
  pro: {
    name: 'Pro',
    price: 900,
    priceId: process.env.STRIPE_PRO_PRICE_ID!,
    features: ['Unlimited files', '100MB max', 'API access', '1,000 API calls/mo']
  },
  teams: {
    name: 'Teams',
    price: 3900,
    priceId: process.env.STRIPE_TEAMS_PRICE_ID!,
    features: ['Everything in Pro', '10 users', '500MB max', '10,000 API calls/mo', 'Webhooks']
  }
}
