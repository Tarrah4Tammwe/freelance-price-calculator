import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'How to Price Freelance Projects: Formula & Examples',
  description: 'Learn how to calculate project-based pricing instead of hourly rates. Scope creep, estimation, and profit margins explained.',
  alternates: { canonical: 'https://freelancepricecalculator.com/guides/project-based-pricing' }
}

export default function Page() {
  return (
    <article className="max-w-3xl mx-auto px-4 md:px-8 py-12 md:py-16">
      <h1 className="font-display text-4xl md:text-5xl mb-3 text-balance">How to Price Freelance Projects: The Complete Formula</h1>
      <p className="text-muted mb-10 text-lg">Stop leaving money on the table. Learn to estimate, scope, and price projects profitably.</p>
      
      <div className="space-y-8">
        <section>
          <h2 className="font-display text-2xl mb-4">The Project Pricing Formula</h2>
          <div className="bg-paper border border-border rounded-sm p-6 mb-4">
            <p className="font-mono text-center text-sm">
              <strong>(Estimated Hours × Your Hourly Rate) + Scope Buffer + Profit = Project Price</strong>
            </p>
          </div>

          <div className="space-y-6">
            <div>
              <h3 className="font-medium mb-2">1. Estimate Hours Honestly</h3>
              <p className="text-sm mb-3">Write down every task. Add 30–50% buffer for unknowns:</p>
              <ul className="list-disc pl-6 space-y-1 text-sm">
                <li>Discovery call: 0.5 hours</li>
                <li>Design mockups: 8 hours</li>
                <li>Development: 20 hours</li>
                <li>Testing & QA: 4 hours</li>
                <li>Revisions: 6 hours</li>
                <li>Handover: 2 hours</li>
                <li><strong>Total: 40.5 hours + 30% buffer = 52.5 hours</strong></li>
              </ul>
            </div>

            <div>
              <h3 className="font-medium mb-2">2. Multiply by Your Rate</h3>
              <p className="font-mono text-sm bg-white p-3 rounded">52.5 hours × $75/hour = <strong>$3,937.50</strong></p>
            </div>

            <div>
              <h3 className="font-medium mb-2">3. Add Scope Creep Buffer (20–30%)</h3>
              <p className="font-mono text-sm bg-white p-3 rounded">$3,937.50 × 1.20 = <strong>$4,725</strong></p>
            </div>

            <div>
              <h3 className="font-medium mb-2">4. Round & Present</h3>
              <p className="font-mono text-sm bg-white p-3 rounded">$4,725 → <strong>$4,995</strong> (psychologically anchored)</p>
            </div>
          </div>
        </section>

        <section className="bg-paper border border-border rounded-sm p-6">
          <h2 className="font-display text-2xl mb-4">Real Example: Website Design</h2>
          <div className="space-y-2 text-sm font-mono">
            <div className="flex justify-between">
              <span>38 hours × $80/hour</span>
              <span>$3,040</span>
            </div>
            <div className="flex justify-between text-muted">
              <span>+ 25% scope buffer</span>
              <span>$760</span>
            </div>
            <div className="flex justify-between border-t border-border pt-2">
              <span><strong>Final quote:</strong></span>
              <span><strong>$3,995</strong></span>
            </div>
          </div>
        </section>

        <section>
          <h2 className="font-display text-2xl mb-6">Protect Against Scope Creep</h2>
          <div className="space-y-3 text-sm">
            <div className="border border-border rounded-sm p-4">
              <strong>1. Detailed scope document</strong> — List exactly what's included.</div>
            <div className="border border-border rounded-sm p-4">
              <strong>2. Charge for extra revisions</strong> — "2 rounds included; further: $100/round."</div>
            <div className="border border-border rounded-sm p-4">
              <strong>3. Use a contract</strong> — Specify scope, timeline, payment terms in writing.</div>
            <div className="border border-border rounded-sm p-4">
              <strong>4. Payment milestones</strong> — 50% upfront, 25% at approval, 25% at launch.</div>
          </div>
        </section>

        <section className="bg-paper border border-border rounded-sm p-6">
          <h2 className="font-display text-2xl mb-4">Get Help Pricing</h2>
          <p className="text-sm mb-4">Use our calculator to estimate project costs based on your hourly rate and desired profit.</p>
          <a href="/" className="inline-block text-accent font-medium hover:underline">Calculate project pricing →</a>
        </section>
      </div>
    </article>
  )
}
