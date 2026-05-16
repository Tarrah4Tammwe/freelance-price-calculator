import { Metadata } from 'next'
export const metadata: Metadata = { title: 'Freelance Pricing FAQ', description: 'Common questions about freelance pricing, rates, negotiation, and income.', alternates: { canonical: 'https://freelancepricecalculator.com/faq' } }
export default function Page() {
  const faqs = [
    { q: 'What is a good starting freelance rate?', a: 'Most beginners start at $20–40/hour. As you build skills/portfolio, increase to $50–100/hour. Senior freelancers charge $100–300+/hour depending on speciality.' },
    { q: 'How do I raise my rates without losing clients?', a: 'Give 30 days notice. New rates apply to new projects only. Offer 10–15% discounts to long-term clients to retain them. Value-add (faster delivery, better quality) justifies increases.' },
    { q: 'Should I charge more for rush projects?', a: 'Yes. Standard rate × 1.5–2 for tight deadlines. It compensates for dropped other work and stress.' },
    { q: 'How much should I negotiate?', a: 'Negotiate only if: (1) client budget is genuinely higher, or (2) scope is lower. Never discount just because they ask. Confidence + value = higher close rate.' },
    { q: 'Can I offer payment plans?', a: 'Yes. Break projects into milestones: 50% upfront, 25% at midpoint, 25% at delivery. Payment plans reduce client risk.' },
    { q: 'How do I price work I\'ve never done?', a: 'Research competitor rates. Add 20% premium for learning curve. Get clear scope in writing. Charge hourly if truly undefined.' },
    { q: 'Should I undercharge for portfolio building?', a: 'No. Charge 70–80% of market rate. Portfolio work should still pay. Undercharging attracts dealmakers, not serious clients.' },
    { q: 'How do I know if my rate is too low?', a: 'You\'re booked solid but stressed/unhappy. Raise rates 25% and see. If you lose clients, you were underpriced.' },
  ]

  return (
    <article className="max-w-3xl mx-auto px-4 md:px-8 py-12">
      <h1 className="font-display text-4xl md:text-5xl mb-4 text-balance">Freelance Pricing FAQ</h1>
      <p className="text-muted mb-12">Your most common pricing questions answered.</p>
      
      <div className="space-y-6">
        {faqs.map((faq, i) => (
          <div key={i} className="border border-border rounded-sm p-6">
            <h2 className="font-medium text-lg mb-3">{faq.q}</h2>
            <p className="text-sm text-ink leading-relaxed">{faq.a}</p>
          </div>
        ))}
      </div>

      <section className="bg-paper border border-border rounded-sm p-6 mt-12">
        <h2 className="font-display text-2xl mb-4">Still unsure about your rate?</h2>
        <p className="text-sm mb-4">Use our freelance calculator to find your break-even hourly rate based on your actual expenses and income goals.</p>
        <a href="/" className="inline-block text-accent font-medium hover:underline">Calculate your rate →</a>
      </section>
    </article>
  )
}
