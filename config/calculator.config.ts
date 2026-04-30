export type Industry =
  | 'design'
  | 'development'
  | 'writing'
  | 'marketing'
  | 'consulting'
  | 'video'
  | 'finance'
  | 'other'

export type Platform =
  | 'independent'
  | 'direct'
  | 'upwork'
  | 'fiverr'
  | 'freelancer'
  | 'toptal'
  | 'contra'
  | 'peopleperhour'
  | 'guru'
  | 'designhill'
  | '99designs'
  | 'solidgigs'
  | 'marketerHire'
  | 'other'

export type Currency =
  | 'USD' | 'GBP' | 'EUR' | 'AUD' | 'CAD' | 'INR' | 'BRL' | 'ZAR'
  | 'PHP' | 'PKR' | 'NGN' | 'MXN' | 'AED' | 'KES' | 'SGD' | 'SEK' | 'CHF'

export interface CalculatorInputs {
  // Income goals
  desiredMonthlyIncome: number
  currency: Currency
  // Expenses
  monthlyBusinessExpenses: number
  monthlyPersonalExpenses: number
  // Work pattern
  hoursPerWeek: number
  weeksPerYear: number
  // Tax
  taxRate: number
  // Platform
  platform: Platform
  // Industry (for benchmarking)
  industry: Industry
}

export interface CalculatorResults {
  // Rates
  minimumHourlyRate: number
  recommendedHourlyRate: number
  dayRate: number
  weekRate: number
  monthRate: number
  // Project pricing
  smallProjectRate: number   // ~10hrs
  mediumProjectRate: number  // ~40hrs
  largeProjectRate: number   // ~160hrs
  // After fees
  platformFeePercent: number
  rateAfterPlatformFees: number
  // Annual picture
  annualGrossNeeded: number
  annualTaxEstimate: number
  totalBillableHours: number
  // Benchmarks
  industryLow: number
  industryMid: number
  industryHigh: number
  benchmarkPosition: 'below' | 'at' | 'above'
  currency: Currency
}

// Platform fee percentages
export const PLATFORM_FEES: Record<Platform, number> = {
  independent:   0,    // Own clients, own website, referrals — no platform cut
  direct:        0,    // Direct contract outside any platform
  upwork:        0.15, // Averaged: 20% <$500, 10% $500–$10k, 5% >$10k per client
  fiverr:        0.20, // Flat 20% on all earnings
  freelancer:    0.10, // 10% service fee
  toptal:        0,    // Toptal absorbs the fee from their client margin
  contra:        0,    // 0% commission
  peopleperhour: 0.20, // Up to 20% on first £250/month per client, then 7.5%
  guru:          0.09, // 9% on Basic plan (lower on paid plans)
  designhill:    0.15, // ~15% platform commission
  '99designs':   0.15, // 15% on repeat clients, higher on first project
  solidgigs:     0,    // Job board subscription — no commission on earnings
  marketerHire:  0,    // Vetted network — no commission taken from freelancer
  other:         0.10, // Conservative estimate for unlisted platforms
}

// Global industry rate benchmarks (USD/hour, mid-market global)
export const INDUSTRY_BENCHMARKS: Record<Industry, { low: number; mid: number; high: number }> = {
  design: { low: 35, mid: 75, high: 150 },
  development: { low: 40, mid: 90, high: 200 },
  writing: { low: 25, mid: 60, high: 120 },
  marketing: { low: 30, mid: 70, high: 150 },
  consulting: { low: 50, mid: 120, high: 300 },
  video: { low: 35, mid: 75, high: 150 },
  finance: { low: 50, mid: 100, high: 250 },
  other: { low: 25, mid: 65, high: 150 },
}

// Currency symbols
export const CURRENCY_SYMBOLS: Record<Currency, string> = {
  // Original
  USD: '$',
  GBP: '£',
  EUR: '€',
  AUD: 'A$',
  CAD: 'C$',
  INR: '₹',
  BRL: 'R$',
  ZAR: 'R',
  // Added — top freelance markets globally
  PHP: '₱',   // Philippines — ~1.5m online freelancers
  PKR: '₨',   // Pakistan — ~3m freelancers, top Upwork country
  NGN: '₦',   // Nigeria — fastest-growing African freelance market
  MXN: 'MX$', // Mexico — large and growing Latin American market
  AED: 'د.إ', // UAE — high-value Gulf market, strong rates
  KES: 'KSh', // Kenya — East Africa's primary freelance hub
  SGD: 'S$',  // Singapore — top-ranked country for freelancers globally
  SEK: 'kr',  // Sweden/Scandinavia — high rates, strong freelance culture
  CHF: 'CHF', // Switzerland — highest average freelance rates globally
}

// Approximate USD conversion multipliers for benchmark display
// These are indicative — benchmarks are global mid-market in USD, converted for display
export const CURRENCY_MULTIPLIERS: Record<Currency, number> = {
  // Original
  USD: 1,
  GBP: 0.79,
  EUR: 0.92,
  AUD: 1.52,
  CAD: 1.36,
  INR: 83.5,
  BRL: 5.0,
  ZAR: 18.6,
  // Added
  PHP: 56.5,
  PKR: 278.0,
  NGN: 1580.0,
  MXN: 17.2,
  AED: 3.67,
  KES: 129.0,
  SGD: 1.34,
  SEK: 10.4,
  CHF: 0.90,
}

export function calculate(inputs: CalculatorInputs): CalculatorResults {
  const {
    desiredMonthlyIncome,
    monthlyBusinessExpenses,
    monthlyPersonalExpenses,
    hoursPerWeek,
    weeksPerYear,
    taxRate,
    platform,
    industry,
    currency,
  } = inputs

  const totalBillableHours = hoursPerWeek * weeksPerYear

  // Annual figures
  const annualDesiredIncome = desiredMonthlyIncome * 12
  const annualExpenses = (monthlyBusinessExpenses + monthlyPersonalExpenses) * 12
  const annualGrossNeeded = (annualDesiredIncome + annualExpenses) / (1 - taxRate / 100)
  const annualTaxEstimate = annualGrossNeeded * (taxRate / 100)

  // Platform fees
  const platformFeePercent = PLATFORM_FEES[platform] * 100
  const feeMultiplier = 1 / (1 - PLATFORM_FEES[platform])

  // Minimum hourly (just covering costs)
  const rawMinimumHourly = annualGrossNeeded / totalBillableHours
  const minimumHourlyRate = rawMinimumHourly * feeMultiplier

  // Recommended = minimum + 30% profit buffer
  const recommendedHourlyRate = minimumHourlyRate * 1.3

  // Derived rates
  const dayRate = recommendedHourlyRate * 8
  const weekRate = recommendedHourlyRate * hoursPerWeek
  const monthRate = weekRate * (weeksPerYear / 12)

  // Project rates (recommended rate * hours * 1.1 revision buffer)
  const smallProjectRate = recommendedHourlyRate * 10 * 1.1
  const mediumProjectRate = recommendedHourlyRate * 40 * 1.1
  const largeProjectRate = recommendedHourlyRate * 160 * 1.1

  const rateAfterPlatformFees = recommendedHourlyRate * (1 - PLATFORM_FEES[platform])

  // Industry benchmarks adjusted for currency
  const multiplier = CURRENCY_MULTIPLIERS[currency]
  const benchmarks = INDUSTRY_BENCHMARKS[industry]
  const industryLow = benchmarks.low * multiplier
  const industryMid = benchmarks.mid * multiplier
  const industryHigh = benchmarks.high * multiplier

  let benchmarkPosition: 'below' | 'at' | 'above' = 'at'
  if (recommendedHourlyRate < industryLow) benchmarkPosition = 'below'
  else if (recommendedHourlyRate > industryHigh) benchmarkPosition = 'above'

  return {
    minimumHourlyRate: Math.ceil(minimumHourlyRate),
    recommendedHourlyRate: Math.ceil(recommendedHourlyRate),
    dayRate: Math.ceil(dayRate),
    weekRate: Math.ceil(weekRate),
    monthRate: Math.ceil(monthRate),
    smallProjectRate: Math.ceil(smallProjectRate),
    mediumProjectRate: Math.ceil(mediumProjectRate),
    largeProjectRate: Math.ceil(largeProjectRate),
    platformFeePercent,
    rateAfterPlatformFees: Math.ceil(rateAfterPlatformFees),
    annualGrossNeeded: Math.ceil(annualGrossNeeded),
    annualTaxEstimate: Math.ceil(annualTaxEstimate),
    totalBillableHours,
    industryLow: Math.ceil(industryLow),
    industryMid: Math.ceil(industryMid),
    industryHigh: Math.ceil(industryHigh),
    benchmarkPosition,
    currency,
  }
}

// ─── AFFILIATE LINKS ────────────────────────────────────────────────────────
// All programmes below are confirmed open to international applicants (2026).
// BEFORE GOING LIVE: Sign up to each programme, get your unique affiliate URL,
// and replace each `url` value below with YOUR personal affiliate link.
// The `signupUrl` is where YOU apply — it is NOT shown to users.
// ─────────────────────────────────────────────────────────────────────────────

export const AFFILIATE_LINKS = {

  bonsai: {
    name: 'Bonsai — Contracts & Invoicing',
    url: 'https://www.hellobonsai.com', // ← REPLACE with your affiliate link
    description: 'All-in-one contracts, proposals, invoicing & time tracking. Used by 500k+ freelancers.',
    commission: '200% of first month or 30% on annual plans',
    signupUrl: 'https://www.hellobonsai.com/affiliates',
    openTo: 'International — anyone can join',
  },

  fiverr: {
    name: 'Fiverr — Find Clients Fast',
    url: 'https://www.fiverr.com', // ← REPLACE with your affiliate link
    description: 'The world\'s largest freelance marketplace. Get your first gig live in minutes.',
    commission: '25–70% CPA on first order + 10% revenue share for 12 months',
    signupUrl: 'https://www.fiverr.com/partnerships/affiliates',
    openTo: 'International — open globally',
  },

  freshbooks: {
    name: 'FreshBooks — Freelance Accounting',
    url: 'https://www.freshbooks.com', // ← REPLACE with your affiliate link
    description: 'Accounting, invoicing & expense tracking built for freelancers and self-employed.',
    commission: '$10 per free trial + up to $200 per paid conversion',
    signupUrl: 'https://www.freshbooks.com/partners', // Via ShareASale network
    openTo: 'Most countries — NOTE: does NOT accept India, Pakistan, Bangladesh, Nigeria',
  },

  wise: {
    name: 'Wise Business — Get Paid Globally',
    url: 'https://wise.com/business', // ← REPLACE with your affiliate link
    description: 'Send and receive international payments at real exchange rates. No hidden fees.',
    commission: 'Referral bonus per qualifying signup (varies by region)',
    signupUrl: 'https://wise.com/partnerships',
    openTo: 'International — widely accessible',
  },

  solidgigs: {
    name: 'SolidGigs — Curated Freelance Jobs',
    url: 'https://solidgigs.com', // ← REPLACE with your affiliate link
    description: 'Hand-picked freelance job leads delivered daily. Skip the job board grind.',
    commission: '35% recurring commission on every paid signup',
    signupUrl: 'https://solidgigs.com/affiliates',
    openTo: 'International',
  },

  contra: {
    name: 'Contra — 0% Commission Platform',
    url: 'https://contra.com', // ← REPLACE with your affiliate link
    description: 'Keep 100% of what you earn. Zero platform fees, ever.',
    commission: 'Referral programme — check current terms',
    signupUrl: 'https://contra.com',
    openTo: 'International',
  },

}

// ─── AFFILIATE SETUP CHECKLIST ───────────────────────────────────────────────
// [ ] Sign up to Bonsai affiliate:   https://www.hellobonsai.com/affiliates
// [ ] Sign up to Fiverr affiliate:   https://www.fiverr.com/partnerships/affiliates
// [ ] Sign up to FreshBooks:         https://www.freshbooks.com/partners (via ShareASale)
// [ ] Sign up to Wise:               https://wise.com/partnerships
// [ ] Sign up to SolidGigs:          https://solidgigs.com/affiliates
// [ ] Replace ALL `url` values above with YOUR unique affiliate links
// [ ] Remove the signupUrl and commission fields before deploying (internal only)
// ─────────────────────────────────────────────────────────────────────────────

export const PREMIUM_PRICE_DISPLAY = '$4.99'
export const PREMIUM_PRICE_CENTS = 499
