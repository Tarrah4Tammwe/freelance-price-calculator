import { Metadata } from 'next'
export const metadata: Metadata = { title: 'SEO & Digital Marketing Rates', description: 'Freelance SEO and digital marketing rates, strategy, and management.', alternates: { canonical: 'https://freelancepricecalculator.com/industry-rates/seo-marketing' } }
export default function Page() {
  return (
    <article className="max-w-3xl mx-auto px-4 md:px-8 py-12">
      <h1 className="font-display text-4xl mb-4">SEO & Marketing Rates</h1>
      <p className="text-muted mb-8">SEO strategy, content marketing, and paid ads pricing.</p>
      <div className="space-y-4"><div className="border border-border p-4 rounded"><h3 className="font-medium mb-2">Hourly</h3><p className="text-sm"><strong>Junior:</strong> $25–50/hr | <strong>Mid:</strong> $60–120/hr | <strong>Senior:</strong> $120–200+/hr</p></div><div className="border border-border p-4 rounded"><h3 className="font-medium mb-2">Retainer (Monthly)</h3><p className="text-sm">SEO strategy: $1,000–5,000/month | Social management: $1,500–4,000/month | Paid ads: $2,000–10,000/month</p></div></div>
    </article>
  )
}
