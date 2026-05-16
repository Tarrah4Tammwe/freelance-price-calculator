import { Metadata } from 'next'
export const metadata: Metadata = { title: 'Graphic Designer Rates', description: 'Freelance graphic design rates for logos, branding, and design work.', alternates: { canonical: 'https://freelancepricecalculator.com/industry-rates/graphic-design' } }
export default function Page() {
  return (
    <article className="max-w-3xl mx-auto px-4 md:px-8 py-12">
      <h1 className="font-display text-4xl mb-4">Graphic Designer Rates</h1>
      <p className="text-muted mb-8">Hourly and project rates.</p>
      <div className="space-y-4"><div className="border border-border p-4 rounded"><h3 className="font-medium mb-2">Hourly</h3><p className="text-sm"><strong>Junior:</strong> $20–35/hr | <strong>Mid:</strong> $40–80/hr | <strong>Senior:</strong> $80–150+/hr</p></div><div className="border border-border p-4 rounded"><h3 className="font-medium mb-2">Project</h3><p className="text-sm"><strong>Logo:</strong> $300–2,000 | <strong>Brand Identity:</strong> $1,500–5,000+ | <strong>Social Graphics:</strong> $500–2,000/month</p></div></div>
    </article>
  )
}
