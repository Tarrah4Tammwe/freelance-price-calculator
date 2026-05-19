import { Metadata } from 'next'
export const metadata: Metadata = { title: 'UI/UX Designer Rates', description: 'Freelance UX/UI design rates by experience level.' }
export default function Page() {
  return (
    <article className="max-w-3xl mx-auto px-4 md:px-8 py-12">
      <h1 className="font-display text-4xl mb-4">UI/UX Designer Rates</h1>
      <p className="text-muted mb-8">UX/UI design pricing by experience.</p>
      <div className="space-y-4"><div className="border border-border p-4 rounded"><h3 className="font-medium mb-2">Hourly</h3><p className="text-sm"><strong>Junior:</strong> $25–50/hr | <strong>Mid:</strong> $60–120/hr | <strong>Senior:</strong> $120–200+/hr</p></div><div className="border border-border p-4 rounded"><h3 className="font-medium mb-2">Project</h3><p className="text-sm">Landing page: $1,500–5,000 | App design: $3,000–15,000+ | Full product redesign: $5,000–20,000+</p></div></div>
    </article>
  )
}
