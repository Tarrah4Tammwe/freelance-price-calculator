'use client'

import { useState, useCallback } from 'react'
import {
  calculate,
  CURRENCY_SYMBOLS,
  AFFILIATE_LINKS,
  PREMIUM_PRICE_DISPLAY,
  type CalculatorInputs,
  type CalculatorResults,
  type Currency,
  type Industry,
  type Platform,
} from '@/config/calculator.config'

const DEFAULT_INPUTS: CalculatorInputs = {
  desiredMonthlyIncome: 3000,
  currency: 'USD',
  monthlyBusinessExpenses: 300,
  monthlyPersonalExpenses: 1500,
  hoursPerWeek: 30,
  weeksPerYear: 46,
  taxRate: 25,
  platform: 'independent',
  industry: 'design',
}

export default function Calculator() {
  const [inputs, setInputs] = useState<CalculatorInputs>(DEFAULT_INPUTS)
  const [results, setResults] = useState<CalculatorResults | null>(null)
  const [loading, setLoading] = useState(false)
  const [checkoutLoading, setCheckoutLoading] = useState(false)
  const [calculated, setCalculated] = useState(false)

  const sym = CURRENCY_SYMBOLS[inputs.currency]

  const handleChange = useCallback(
    (field: keyof CalculatorInputs, value: string | number) => {
      setInputs((prev) => ({ ...prev, [field]: value }))
      if (calculated) setCalculated(false)
    },
    [calculated]
  )

  const handleCalculate = useCallback(() => {
    setLoading(true)
    setTimeout(() => {
      const res = calculate(inputs)
      setResults(res)
      setCalculated(true)
      setLoading(false)
      setTimeout(() => {
        document.getElementById('results')?.scrollIntoView({ behavior: 'smooth', block: 'start' })
      }, 100)
    }, 400)
  }, [inputs])

  const handlePremiumDownload = async () => {
    if (!results) return
    setCheckoutLoading(true)
    try {
      const res = await fetch('/api/create-checkout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ inputs }),
      })
      const data = await res.json()
      if (data.url) window.location.href = data.url
      else console.error('No checkout URL returned', data)
    } catch (e) {
      console.error('Checkout error:', e)
    } finally {
      setCheckoutLoading(false)
    }
  }

  const inputClass =
    'w-full bg-white border border-border rounded-sm px-3 py-2.5 text-sm text-ink focus:outline-none focus:border-ink transition-colors'
  const labelClass = 'block text-xs font-medium text-muted uppercase tracking-wider mb-1.5'

  return (
    <div className="w-full">
      {/* ─── Header ─── */}
      <header className="bg-ink text-paper py-6 px-4 md:px-8">
        <div className="max-w-5xl mx-auto">
          <div className="flex items-start justify-between">
            <div>
              <p className="font-mono text-xs text-muted tracking-widest mb-2 uppercase">
                Freelance Price Calculator
              </p>
              <h1 className="font-display text-3xl md:text-5xl leading-none text-balance">
                Set Your Rate.<br />
                <em className="text-accent">Know Your Worth.</em>
              </h1>
              <p className="mt-3 text-sm text-[#B8B5AE] max-w-xl leading-relaxed">
                The most comprehensive freelance rate calculator online. Calculate your ideal hourly rate, day rate, project price and true take-home profit — in any currency.
              </p>
            </div>
            <div className="hidden md:block text-right">
              <span className="font-mono text-xs text-muted">4th tool</span>
            </div>
          </div>
        </div>
      </header>

      {/* ─── Top Ad ─── */}
      <div className="max-w-5xl mx-auto px-4 md:px-8 py-4">
        <div className="ad-slot h-[90px] w-full rounded">
          {process.env.NEXT_PUBLIC_GOOGLE_ADSENSE_CLIENT_ID ? (
            <ins
              className="adsbygoogle"
              style={{ display: 'block', width: '100%', height: '90px' }}
              data-ad-client={process.env.NEXT_PUBLIC_GOOGLE_ADSENSE_CLIENT_ID}
              data-ad-slot="TOP_AD_SLOT_ID"
              data-ad-format="horizontal"
            />
          ) : (
            <span>Advertisement</span>
          )}
        </div>
      </div>

      {/* ─── Main content ─── */}
      <main className="max-w-5xl mx-auto px-4 md:px-8 pb-16">
        <div className="grid md:grid-cols-[1fr_280px] gap-8">
          {/* ─── Calculator Form ─── */}
          <div className="space-y-6">
            {/* Section: Goals */}
            <section className="bg-card border border-border rounded-sm p-6">
              <div className="flex items-center gap-3 mb-5">
                <span className="accent-line" />
                <h2 className="font-display text-xl">Income Goals</h2>
              </div>
              <div className="grid sm:grid-cols-2 gap-4">
                <div>
                  <label className={labelClass}>Currency</label>
                  <select
                    className={inputClass}
                    value={inputs.currency}
                    onChange={(e) => handleChange('currency', e.target.value as Currency)}
                  >
                    <optgroup label="Major Currencies">
                      <option value="USD">USD — US Dollar</option>
                      <option value="GBP">GBP — British Pound</option>
                      <option value="EUR">EUR — Euro</option>
                      <option value="CHF">CHF — Swiss Franc</option>
                      <option value="AUD">AUD — Australian Dollar</option>
                      <option value="CAD">CAD — Canadian Dollar</option>
                      <option value="SGD">SGD — Singapore Dollar</option>
                      <option value="SEK">SEK — Swedish Krona</option>
                    </optgroup>
                    <optgroup label="Asia & Pacific">
                      <option value="INR">INR — Indian Rupee</option>
                      <option value="PHP">PHP — Philippine Peso</option>
                      <option value="PKR">PKR — Pakistani Rupee</option>
                    </optgroup>
                    <optgroup label="Middle East">
                      <option value="AED">AED — UAE Dirham</option>
                    </optgroup>
                    <optgroup label="Africa">
                      <option value="NGN">NGN — Nigerian Naira</option>
                      <option value="ZAR">ZAR — South African Rand</option>
                      <option value="KES">KES — Kenyan Shilling</option>
                    </optgroup>
                    <optgroup label="Latin America">
                      <option value="BRL">BRL — Brazilian Real</option>
                      <option value="MXN">MXN — Mexican Peso</option>
                    </optgroup>
                  </select>
                </div>
                <div>
                  <label className={labelClass}>
                    Desired Monthly Take-Home ({sym})
                  </label>
                  <input
                    type="number"
                    className={inputClass}
                    value={inputs.desiredMonthlyIncome}
                    onChange={(e) => handleChange('desiredMonthlyIncome', Number(e.target.value))}
                    min={0}
                    placeholder="3000"
                  />
                </div>
              </div>
            </section>

            {/* Section: Expenses */}
            <section className="bg-card border border-border rounded-sm p-6">
              <div className="flex items-center gap-3 mb-5">
                <span className="accent-line" />
                <h2 className="font-display text-xl">Monthly Expenses</h2>
              </div>
              <div className="grid sm:grid-cols-2 gap-4">
                <div>
                  <label className={labelClass}>Business Expenses ({sym})</label>
                  <input
                    type="number"
                    className={inputClass}
                    value={inputs.monthlyBusinessExpenses}
                    onChange={(e) => handleChange('monthlyBusinessExpenses', Number(e.target.value))}
                    min={0}
                    placeholder="300"
                  />
                  <p className="text-xs text-muted mt-1">Software, equipment, marketing</p>
                </div>
                <div>
                  <label className={labelClass}>Personal Expenses ({sym})</label>
                  <input
                    type="number"
                    className={inputClass}
                    value={inputs.monthlyPersonalExpenses}
                    onChange={(e) => handleChange('monthlyPersonalExpenses', Number(e.target.value))}
                    min={0}
                    placeholder="1500"
                  />
                  <p className="text-xs text-muted mt-1">Rent, food, transport, utilities</p>
                </div>
              </div>
            </section>

            {/* Section: Work Pattern */}
            <section className="bg-card border border-border rounded-sm p-6">
              <div className="flex items-center gap-3 mb-5">
                <span className="accent-line" />
                <h2 className="font-display text-xl">Work Pattern</h2>
              </div>
              <div className="grid sm:grid-cols-2 gap-6">
                <div>
                  <label className={labelClass}>
                    Billable Hours / Week: <strong className="text-ink">{inputs.hoursPerWeek}</strong>
                  </label>
                  <input
                    type="range"
                    min={5} max={60} step={1}
                    value={inputs.hoursPerWeek}
                    onChange={(e) => handleChange('hoursPerWeek', Number(e.target.value))}
                    className="mt-2"
                  />
                  <div className="flex justify-between text-xs text-muted mt-1">
                    <span>5 hrs</span><span>60 hrs</span>
                  </div>
                </div>
                <div>
                  <label className={labelClass}>
                    Weeks Working / Year: <strong className="text-ink">{inputs.weeksPerYear}</strong>
                  </label>
                  <input
                    type="range"
                    min={20} max={52} step={1}
                    value={inputs.weeksPerYear}
                    onChange={(e) => handleChange('weeksPerYear', Number(e.target.value))}
                    className="mt-2"
                  />
                  <div className="flex justify-between text-xs text-muted mt-1">
                    <span>20 wks</span><span>52 wks</span>
                  </div>
                </div>
              </div>
            </section>

            {/* Section: Tax + Platform + Industry */}
            <section className="bg-card border border-border rounded-sm p-6">
              <div className="flex items-center gap-3 mb-5">
                <span className="accent-line" />
                <h2 className="font-display text-xl">Tax, Platform & Industry</h2>
              </div>
              <div className="grid sm:grid-cols-3 gap-4">
                <div>
                  <label className={labelClass}>
                    Tax Rate: <strong className="text-ink">{inputs.taxRate}%</strong>
                  </label>
                  <input
                    type="range"
                    min={0} max={50} step={1}
                    value={inputs.taxRate}
                    onChange={(e) => handleChange('taxRate', Number(e.target.value))}
                    className="mt-2"
                  />
                  <div className="flex justify-between text-xs text-muted mt-1">
                    <span>0%</span><span>50%</span>
                  </div>
                </div>
                <div>
                  <label className={labelClass}>Platform / How You Sell</label>
                  <select
                    className={inputClass}
                    value={inputs.platform}
                    onChange={(e) => handleChange('platform', e.target.value as Platform)}
                  >
                    <optgroup label="No Platform Fee">
                      <option value="independent">Independent (own website / referrals)</option>
                      <option value="direct">Direct Client Contract (0%)</option>
                      <option value="toptal">Toptal (0% to freelancer)</option>
                      <option value="contra">Contra (0%)</option>
                      <option value="solidgigs">SolidGigs (subscription, 0% commission)</option>
                      <option value="marketerHire">MarketerHire (0% to freelancer)</option>
                    </optgroup>
                    <optgroup label="Low–Mid Fee Platforms">
                      <option value="freelancer">Freelancer.com (10%)</option>
                      <option value="guru">Guru (9%)</option>
                      <option value="upwork">Upwork (~15% averaged)</option>
                      <option value="99designs">99designs (~15%)</option>
                      <option value="designhill">Designhill (~15%)</option>
                    </optgroup>
                    <optgroup label="Higher Fee Platforms">
                      <option value="fiverr">Fiverr (20%)</option>
                      <option value="peopleperhour">PeoplePerHour (up to 20%)</option>
                    </optgroup>
                    <optgroup label="Other">
                      <option value="other">Other Platform (~10%)</option>
                    </optgroup>
                  </select>
                </div>
                <div>
                  <label className={labelClass}>Your Industry</label>
                  <select
                    className={inputClass}
                    value={inputs.industry}
                    onChange={(e) => handleChange('industry', e.target.value as Industry)}
                  >
                    <option value="design">Design</option>
                    <option value="development">Development</option>
                    <option value="writing">Writing / Copy</option>
                    <option value="marketing">Marketing / SEO</option>
                    <option value="consulting">Consulting</option>
                    <option value="video">Video / Motion</option>
                    <option value="finance">Finance / Accounting</option>
                    <option value="other">Other</option>
                  </select>
                </div>
              </div>
            </section>

            {/* ─── Calculate Button ─── */}
            <button
              onClick={handleCalculate}
              disabled={loading}
              className="w-full bg-accent text-white font-semibold text-base py-4 rounded-sm hover:bg-[#E04400] transition-colors disabled:opacity-60 flex items-center justify-center gap-2"
            >
              {loading ? (
                <>
                  <svg className="animate-spin h-4 w-4" viewBox="0 0 24 24" fill="none">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                  </svg>
                  Calculating…
                </>
              ) : (
                <>
                  Calculate My Freelance Rate →
                </>
              )}
            </button>

            {/* ─── Results ─── */}
            {results && calculated && (
              <div id="results" className="animate-slide-up space-y-4">
                {/* Primary rate */}
                <div className="bg-ink text-paper rounded-sm p-6">
                  <p className="font-mono text-xs tracking-widest text-muted uppercase mb-1">Your Recommended Rate</p>
                  <div className="flex items-end gap-3">
                    <span className="font-display text-5xl text-accent">{sym}{results.recommendedHourlyRate}</span>
                    <span className="text-[#B8B5AE] mb-1">/hour</span>
                  </div>
                  <p className="text-sm text-[#B8B5AE] mt-2">
                    Minimum (cost floor): {sym}{results.minimumHourlyRate}/hr
                    {results.platformFeePercent > 0 && (
                      <span className="ml-3">
                        After {results.platformFeePercent}% platform fee: {sym}{results.rateAfterPlatformFees}/hr
                      </span>
                    )}
                  </p>
                </div>

                {/* Rate grid */}
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                  {[
                    { label: 'Day Rate', value: `${sym}${results.dayRate}`, sub: '8 hrs' },
                    { label: 'Week Rate', value: `${sym}${results.weekRate}`, sub: `${inputs.hoursPerWeek} hrs` },
                    { label: 'Month Rate', value: `${sym}${results.monthRate}`, sub: 'approx.' },
                    { label: 'Annual Gross', value: `${sym}${(results.annualGrossNeeded / 1000).toFixed(0)}k`, sub: 'needed' },
                  ].map((item) => (
                    <div key={item.label} className="bg-card border border-border rounded-sm p-4 text-center">
                      <p className="text-xs text-muted uppercase tracking-wider mb-1">{item.label}</p>
                      <p className="font-display text-2xl text-ink">{item.value}</p>
                      <p className="text-xs text-muted mt-0.5">{item.sub}</p>
                    </div>
                  ))}
                </div>

                {/* Annual financial breakdown */}
                <div className="bg-card border border-border rounded-sm p-5">
                  <h3 className="font-display text-lg mb-3">Annual Financial Picture</h3>
                  <div className="space-y-2">
                    {[
                      { label: 'Billable Hours / Year', value: `${results.totalBillableHours} hrs` },
                      { label: 'Annual Gross Revenue Needed', value: `${sym}${results.annualGrossNeeded.toLocaleString()}` },
                      { label: 'Estimated Tax', value: `${sym}${results.annualTaxEstimate.toLocaleString()}` },
                      { label: 'Annual Net Take-Home', value: `${sym}${(inputs.desiredMonthlyIncome * 12).toLocaleString()}` },
                    ].map((row) => (
                      <div key={row.label} className="flex justify-between items-center py-1 border-b border-border last:border-0">
                        <span className="text-sm text-muted">{row.label}</span>
                        <span className="text-sm font-medium text-ink">{row.value}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Project pricing */}
                <div className="bg-card border border-border rounded-sm p-5">
                  <h3 className="font-display text-lg mb-3">Project Pricing Guide</h3>
                  <div className="grid grid-cols-3 gap-3">
                    {[
                      { label: 'Small Project', value: results.smallProjectRate, hrs: '~10 hrs' },
                      { label: 'Medium Project', value: results.mediumProjectRate, hrs: '~40 hrs' },
                      { label: 'Large Project', value: results.largeProjectRate, hrs: '~160 hrs' },
                    ].map((p) => (
                      <div key={p.label} className="text-center">
                        <p className="text-xs text-muted uppercase tracking-wider mb-1">{p.label}</p>
                        <p className="font-display text-xl">{sym}{p.value.toLocaleString()}</p>
                        <p className="text-xs text-muted">{p.hrs}</p>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Benchmark */}
                <div className="bg-card border border-border rounded-sm p-5">
                  <h3 className="font-display text-lg mb-3">Market Rate Benchmark</h3>
                  <p className="text-xs text-muted mb-2 uppercase tracking-wider">
                    {inputs.industry} industry — global mid-market
                  </p>
                  <div className="relative h-2 bg-border rounded-full mb-2">
                    <div
                      className="absolute top-0 left-0 h-full bg-accent rounded-full transition-all duration-700"
                      style={{
                        width: `${Math.min(
                          ((results.recommendedHourlyRate - results.industryLow) /
                            (results.industryHigh - results.industryLow)) * 100,
                          100
                        )}%`,
                      }}
                    />
                  </div>
                  <div className="flex justify-between text-xs text-muted">
                    <span>Low {sym}{results.industryLow}/hr</span>
                    <span>Mid {sym}{results.industryMid}/hr</span>
                    <span>High {sym}{results.industryHigh}/hr</span>
                  </div>
                  <p
                    className={`mt-3 text-sm font-medium ${
                      results.benchmarkPosition === 'below' ? 'text-red-600' : 'text-success'
                    }`}
                  >
                    {results.benchmarkPosition === 'below'
                      ? '⚠ Your rate is below market. Consider raising it.'
                      : results.benchmarkPosition === 'above'
                      ? '✓ Your rate is above market — strong positioning.'
                      : '✓ Your rate aligns with market rates.'}
                  </p>
                </div>

                {/* ─── Premium CTA ─── */}
                <div className="border-2 border-accent rounded-sm p-6 bg-[#FFF7F4]">
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <p className="font-mono text-xs text-accent tracking-widest uppercase mb-1">Premium Excel Pack — {PREMIUM_PRICE_DISPLAY} one-off</p>
                      <h3 className="font-display text-2xl mb-2">Your Numbers. Your Pack. Ready to Use.</h3>
                      <ul className="text-sm text-muted space-y-1 mb-4">
                        <li>✓ <strong className="text-ink">📊 Rate Dashboard</strong> — all your rates & annual breakdown, pre-filled</li>
                        <li>✓ <strong className="text-ink">📅 Monthly Tracker</strong> — 12-month income & expense tracker with auto profit formula</li>
                        <li>✓ <strong className="text-ink">🧾 Invoice Template</strong> — pre-filled with your hourly rate, ready to send to clients</li>
                        <li>✓ <strong className="text-ink">📈 Rate Benchmarks</strong> — all industries compared in your currency</li>
                      </ul>
                      <p className="text-xs text-muted mb-4">Delivered as an editable Excel file (.xlsx) — open in Excel, Google Sheets, or Numbers.</p>
                      <button
                        onClick={handlePremiumDownload}
                        disabled={checkoutLoading}
                        className="bg-accent text-white font-semibold px-6 py-3 rounded-sm hover:bg-[#E04400] transition-colors disabled:opacity-60 flex items-center gap-2"
                      >
                        {checkoutLoading ? 'Redirecting to checkout…' : `Get the Excel Pack — ${PREMIUM_PRICE_DISPLAY}`}
                      </button>
                    </div>
                  </div>
                </div>

                {/* Middle ad */}
                <div className="ad-slot h-[250px] w-full rounded">
                  {process.env.NEXT_PUBLIC_GOOGLE_ADSENSE_CLIENT_ID ? (
                    <ins
                      className="adsbygoogle"
                      style={{ display: 'block', width: '100%', height: '250px' }}
                      data-ad-client={process.env.NEXT_PUBLIC_GOOGLE_ADSENSE_CLIENT_ID}
                      data-ad-slot="MID_AD_SLOT_ID"
                      data-ad-format="rectangle"
                    />
                  ) : (
                    <span>Advertisement</span>
                  )}
                </div>
              </div>
            )}
          </div>

          {/* ─── Sidebar ─── */}
          <aside className="space-y-5">
            {/* Sidebar ad */}
            <div className="ad-slot h-[250px] w-full rounded">
              {process.env.NEXT_PUBLIC_GOOGLE_ADSENSE_CLIENT_ID ? (
                <ins
                  className="adsbygoogle"
                  style={{ display: 'block', width: '100%', height: '250px' }}
                  data-ad-client={process.env.NEXT_PUBLIC_GOOGLE_ADSENSE_CLIENT_ID}
                  data-ad-slot="SIDEBAR_AD_SLOT_ID"
                  data-ad-format="rectangle"
                />
              ) : (
                <span>Advertisement</span>
              )}
            </div>

            {/* Affiliate links */}
            <div className="bg-card border border-border rounded-sm p-4">
              <p className="font-mono text-xs text-muted uppercase tracking-wider mb-3">Freelancer Tools</p>
              <div className="space-y-3">
                {Object.values(AFFILIATE_LINKS).map((link) => (
                  <a
                    key={link.name}
                    href={link.url}
                    target="_blank"
                    rel="noopener noreferrer sponsored"
                    className="block group"
                  >
                    <p className="text-sm font-medium text-ink group-hover:text-accent transition-colors">
                      {link.name} →
                    </p>
                    <p className="text-xs text-muted leading-snug">{link.description}</p>
                  </a>
                ))}
              </div>
              <p className="text-[10px] text-muted mt-3 leading-tight">
                Some links are affiliate links. We may earn a small commission at no cost to you.
              </p>
            </div>

            {/* Quick tips */}
            <div className="bg-card border border-border rounded-sm p-4">
              <p className="font-mono text-xs text-muted uppercase tracking-wider mb-3">Freelance Rate Tips</p>
              <ul className="text-xs text-muted space-y-2 leading-relaxed">
                <li><strong className="text-ink">Never price below your floor.</strong> Your minimum rate is your survival threshold.</li>
                <li><strong className="text-ink">Add a 30% buffer</strong> for non-billable admin, chasing invoices, and dry spells.</li>
                <li><strong className="text-ink">Platform fees compound.</strong> Fiverr's 20% on a {sym}50 rate means you earn {sym}40.</li>
                <li><strong className="text-ink">Raise rates yearly.</strong> Inflation is real. Your rate should grow with your skills.</li>
              </ul>
            </div>
          </aside>
        </div>

        {/* ─── SEO Content / FAQ ─── */}
        <section className="mt-16 max-w-2xl">
          <span className="accent-line mb-4" />
          <h2 className="font-display text-3xl mb-6">
            How to Use This Freelance Price Calculator
          </h2>
          <div className="prose prose-sm text-muted space-y-4">
            <p>
              This <strong>freelance price calculator</strong> — also known as a <strong>freelance rate calculator</strong> — helps independent professionals worldwide calculate the exact hourly rate, day rate, and project price they need to charge to meet their income goals, cover their expenses, and account for tax.
            </p>
            <p>
              Unlike generic tools, this calculator accounts for <strong>platform fees</strong> (Upwork, Fiverr, Freelancer.com), your specific industry benchmarks, and gives you a full project pricing guide based on your real numbers.
            </p>
            <h3 className="font-display text-xl text-ink">How to calculate your freelance rate</h3>
            <p>
              The formula is: <em>(Annual income goal + expenses) ÷ (1 − tax rate) ÷ billable hours = minimum hourly rate.</em> We then add a 30% buffer to give you a sustainable recommended rate.
            </p>
          </div>
        </section>

        {/* ─── FAQ Schema ─── */}
        <section className="mt-12 max-w-2xl space-y-4">
          <span className="accent-line mb-4" />
          <h2 className="font-display text-3xl mb-6">Frequently Asked Questions</h2>
          {[
            {
              q: 'How do I calculate my freelance rate?',
              a: 'Add up your desired annual income, all business and personal expenses, and estimated taxes. Divide by your annual billable hours (typically 1,000–1,200). Add a 30% buffer for reliability. Our freelance price calculator does this instantly.',
            },
            {
              q: 'What is a good freelance hourly rate?',
              a: 'Globally, freelance rates range from $25–$250/hour depending on skill, experience, and industry. Use this freelance rate calculator to find your personal minimum based on your actual costs — not someone else\'s.',
            },
            {
              q: 'How do platform fees affect my freelance income?',
              a: 'Significantly. Upwork charges 10–20%, Fiverr charges 20%, and Freelancer.com charges 10%. Our calculator factors these in automatically so you see your true take-home rate.',
            },
            {
              q: 'How do I price a freelance project?',
              a: 'Estimate hours, multiply by your hourly rate, and add 10% for revisions. Our tool generates small, medium, and large project prices based on your calculated rate.',
            },
            {
              q: 'Is this freelance calculator free?',
              a: `Yes, completely free. The optional ${PREMIUM_PRICE_DISPLAY} download gives you a personalised PDF with your profit dashboard, expense tracker, rate benchmarking, and a pre-filled invoice template.`,
            },
          ].map((faq, i) => (
            <details key={i} className="group bg-card border border-border rounded-sm">
              <summary className="p-4 font-medium text-sm cursor-pointer list-none flex justify-between items-center">
                {faq.q}
                <span className="text-accent font-mono group-open:rotate-180 transition-transform inline-block">↓</span>
              </summary>
              <p className="px-4 pb-4 text-sm text-muted leading-relaxed">{faq.a}</p>
            </details>
          ))}
        </section>
      </main>

      {/* ─── Footer ─── */}
      <footer className="bg-ink text-[#B8B5AE] py-8 px-4 mt-12">
        <div className="max-w-5xl mx-auto flex flex-col sm:flex-row justify-between items-start gap-4">
          <div>
            <p className="font-display text-paper text-lg mb-1">Freelance Price Calculator</p>
            <p className="text-xs">The free freelance rate calculator for professionals worldwide.</p>
          </div>
          <div className="text-xs space-y-1 text-right">
            <p>© {new Date().getFullYear()} freelancepricecalculator.com</p>
            <p>Free to use. No data collected.</p>
            <p>
              <a href="/privacy" className="hover:text-paper transition-colors">Privacy Policy</a>
              {' · '}
              <a href="/terms" className="hover:text-paper transition-colors">Terms</a>
            </p>
          </div>
        </div>
      </footer>
    </div>
  )
}
