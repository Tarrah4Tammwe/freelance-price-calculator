import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'How to Calculate Your Freelance Rate in 5 Steps',
  description: 'Learn the exact formula to calculate your freelance hourly rate, day rate, and project pricing. Step-by-step guide with examples.',
  alternates: { canonical: 'https://freelancepricecalculator.com/guides/how-to-calculate-freelance-rate' }
}

export default function Page() {
  return (
    <article className="max-w-3xl mx-auto px-4 md:px-8 py-12 md:py-16">
      <h1 className="font-display text-4xl md:text-5xl mb-3 text-balance">How to Calculate Your Freelance Rate in 5 Steps</h1>
      <p className="text-muted mb-10 text-lg">A practical guide to finding your minimum rate, project pricing, and profit targets.</p>
      
      <div className="space-y-8 text-ink leading-relaxed">
        <section>
          <h2 className="font-display text-2xl mb-4">Step 1: Calculate Your Annual Expenses</h2>
          <p>Start by adding up all the money you need to spend per year to stay in business:</p>
          <ul className="list-disc pl-6 space-y-2 mt-3">
            <li>Software subscriptions ($50–500/month)</li>
            <li>Hardware and equipment ($0–500/month)</li>
            <li>Internet and workspace ($50–300/month)</li>
            <li>Professional development ($100–300/month)</li>
            <li>Insurance and taxes ($500–2,000/month)</li>
            <li>Marketing ($100–500/month)</li>
          </ul>
          <p className="font-mono text-sm bg-paper p-3 rounded mt-4"><strong>Total annual business expenses = (monthly cost × 12)</strong></p>
        </section>

        <section>
          <h2 className="font-display text-2xl mb-4">Step 2: Add Your Desired Annual Income</h2>
          <p>Decide what you want to take home after taxes. This is your personal target.</p>
          <p className="mt-3"><em>Example: You want $60,000/year take-home.</em></p>
        </section>

        <section>
          <h2 className="font-display text-2xl mb-4">Step 3: Factor in Taxes</h2>
          <p>Self-employed freelancers pay 20–35% in taxes (varies by location and income).</p>
          <p className="font-mono text-sm bg-paper p-3 rounded mt-4"><strong>Gross income needed = (desired take-home ÷ (1 − tax rate))</strong></p>
          <p className="mt-3"><em>Example: $60,000 ÷ 0.75 = $80,000 gross</em></p>
        </section>

        <section>
          <h2 className="font-display text-2xl mb-4">Step 4: Calculate Your Billable Hours</h2>
          <p>Most freelancers work 46 weeks/year and 30–40 billable hours/week.</p>
          <p className="font-mono text-sm bg-paper p-3 rounded mt-4"><strong>Annual billable hours = hours/week × weeks/year</strong></p>
          <p className="mt-3"><em>Example: 35 hours × 46 weeks = 1,610 hours</em></p>
        </section>

        <section>
          <h2 className="font-display text-2xl mb-4">Step 5: Divide to Get Your Minimum Rate</h2>
          <p className="font-mono text-sm bg-paper p-3 rounded"><strong>Minimum hourly rate = (Gross income needed + annual expenses) ÷ annual billable hours</strong></p>
          <p className="mt-4"><em>Example: ($80,000 + $15,000) ÷ 1,610 = <strong>$58.88/hour minimum</strong></em></p>
        </section>

        <section>
          <h2 className="font-display text-2xl mb-4">Add Your Profit Margin</h2>
          <p>This is your break-even rate. Most freelancers add 20–50% on top for profit, risk, and downtime.</p>
          <p className="mt-3 font-mono"><strong>$58.88 + 30% = $76.45/hour</strong> — your actual rate.</p>
        </section>

        <section>
          <h2 className="font-display text-2xl mb-4">Apply This to Project Pricing</h2>
          <ul className="list-disc pl-6 space-y-2">
            <li><strong>Day rate</strong> (8 hours): $76.45 × 8 = $611</li>
            <li><strong>Project rate</strong>: estimate hours, multiply by your rate, add 20% buffer for scope creep</li>
            <li><strong>Retainer</strong>: charge for your committed hours/month</li>
          </ul>
        </section>

        <section className="bg-paper border border-border rounded-sm p-6">
          <h2 className="font-display text-xl mb-3">Use Our Calculator</h2>
          <p>This manual calculation is tedious and error-prone. Our freelance price calculator automates all of it in seconds and accounts for platform fees, currency conversions, and multiple pricing models.</p>
          <a href="/" className="inline-block mt-4 text-accent font-medium hover:underline">Try the calculator →</a>
        </section>
      </div>
    </article>
  )
}
