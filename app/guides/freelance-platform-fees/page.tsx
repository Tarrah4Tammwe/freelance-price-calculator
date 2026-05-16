import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Freelance Platform Fees: How Much Do Upwork, Fiverr & Freelancer Take?',
  description: 'Compare platform fees on Upwork, Fiverr, Freelancer, PeoplePerHour, and Toptal. Learn which platform takes the biggest cut of your earnings.',
  alternates: { canonical: 'https://freelancepricecalculator.com/guides/freelance-platform-fees' }
}

export default function Page() {
  const platforms = [
    { name: 'Upwork', fee: '5–20%', details: 'First $500/client: 20%. Next $9.5k: 10%. $9.5k+: 5%. Monthly subscription tier available.' },
    { name: 'Fiverr', fee: '20%', details: '20% platform fee on all orders. No tiered discounts. Additional 2% payment processing fee.' },
    { name: 'Freelancer.com', fee: '10%', details: '10% commission on projects. Additional fees for upgrades and featured listings.' },
    { name: 'PeoplePerHour', fee: '10–20%', details: '20% for new freelancers, 10% after £500 lifetime earnings. Referral discounts available.' },
    { name: 'Toptal', fee: '10%', details: '10% commission + client fees. Top-tier screening; vetted clients pay premium.' },
    { name: 'Gun.io', fee: '10–15%', details: '10–15% depending on client acquisition method. For developers only.' },
    { name: 'Codementor', fee: '30%', details: '30% on live sessions, 20% on projects. Small community but high-quality clients.' },
    { name: 'Direct (own site)', fee: '0–5%', details: '0% if you handle payments yourself. 2.9% + $0.30 per transaction (Stripe/PayPal).' },
  ]

  return (
    <article className="max-w-3xl mx-auto px-4 md:px-8 py-12 md:py-16">
      <h1 className="font-display text-4xl md:text-5xl mb-3 text-balance">Freelance Platform Fees: Know Your Real Take-Home</h1>
      <p className="text-muted mb-10 text-lg">Compare Upwork, Fiverr, Freelancer, and other platforms. See how much they take and how it affects your profit.</p>
      
      <div className="space-y-8">
        <section>
          <h2 className="font-display text-2xl mb-6">Platform Fee Comparison</h2>
          <div className="overflow-x-auto">
            <table className="w-full text-sm border-collapse">
              <thead>
                <tr className="border-b border-border">
                  <th className="text-left py-3 px-2 font-medium">Platform</th>
                  <th className="text-left py-3 px-2 font-medium">Commission</th>
                  <th className="text-left py-3 px-2 font-medium">Details</th>
                </tr>
              </thead>
              <tbody>
                {platforms.map((p) => (
                  <tr key={p.name} className="border-b border-border">
                    <td className="py-3 px-2 font-medium">{p.name}</td>
                    <td className="py-3 px-2 font-mono text-accent">{p.fee}</td>
                    <td className="py-3 px-2 text-muted text-xs">{p.details}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        <section className="bg-paper border border-border rounded-sm p-6">
          <h2 className="font-display text-2xl mb-4">Real Take-Home Example</h2>
          <p className="mb-4">You charge $100/hour and work 40 hours on a project ($4,000 total).</p>
          <div className="space-y-3 font-mono text-sm">
            <div className="flex justify-between">
              <span>Gross earnings:</span>
              <strong>$4,000</strong>
            </div>
            <div className="flex justify-between text-muted">
              <span>Upwork 10% fee (mid-tier):</span>
              <span>−$400</span>
            </div>
            <div className="flex justify-between text-muted">
              <span>Payment processor fee (2.9%):</span>
              <span>−$116</span>
            </div>
            <div className="flex justify-between text-muted">
              <span>Taxes (25% estimated):</span>
              <span>−$971</span>
            </div>
            <div className="border-t border-border pt-3 flex justify-between">
              <span>Your take-home:</span>
              <strong>$2,513</strong>
            </div>
          </div>
        </section>

        <section>
          <h2 className="font-display text-2xl mb-6">Hidden Costs to Watch</h2>
          <div className="space-y-4">
            <div className="border border-border rounded-sm p-4">
              <h3 className="font-medium mb-2">Payment Processing Fees</h3>
              <p className="text-sm text-muted">Most platforms charge 2–3% + fixed fees per transaction. On a $4,000 payment, that's $116–120.</p>
            </div>
            <div className="border border-border rounded-sm p-4">
              <h3 className="font-medium mb-2">Withdrawal Fees</h3>
              <p className="text-sm text-muted">Some platforms charge $1–5 per withdrawal. Monthly withdrawals add up over time.</p>
            </div>
            <div className="border border-border rounded-sm p-4">
              <h3 className="font-medium mb-2">Featured Listings & Promoted Jobs</h3>
              <p className="text-sm text-muted">Upwork: $0.50–2 per job application. Fiverr: featured listings $5–10/month. These are optional but competitive.</p>
            </div>
            <div className="border border-border rounded-sm p-4">
              <h3 className="font-medium mb-2">Currency Exchange Rates</h3>
              <p className="text-sm text-muted">International clients = currency conversion fees (1–3%). Direct payment wallets like Wise charge less.</p>
            </div>
          </div>
        </section>

        <section className="bg-paper border border-border rounded-sm p-6">
          <h2 className="font-display text-2xl mb-4">How to Account for Platform Fees</h2>
          <p className="mb-4">When pricing your work, always factor in the platform's cut:</p>
          <p className="font-mono text-sm bg-white p-3 rounded mb-4"><strong>Desired take-home ÷ (1 − platform fee %) = Price to charge</strong></p>
          <div className="text-sm space-y-2">
            <p><em>Example: You want $100/hour after fees.</em></p>
            <p><em>On Upwork (10% fee): $100 ÷ 0.90 = charge $111.11/hour</em></p>
            <p><em>On Fiverr (20% fee): $100 ÷ 0.80 = charge $125/hour</em></p>
          </div>
        </section>

        <section className="bg-paper border border-border rounded-sm p-6">
          <h2 className="font-display text-2xl mb-4">Calculate Your Real Income</h2>
          <p className="mb-4">Our freelance calculator automatically factors in platform fees, payment processing, and taxes so you know exactly how much you'll actually earn.</p>
          <a href="/" className="inline-block text-accent font-medium hover:underline">See your real take-home →</a>
        </section>
      </div>
    </article>
  )
}
