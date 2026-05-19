import { Metadata } from 'next'
export const metadata: Metadata = { title: 'Virtual Assistant Rates', description: 'Freelance virtual assistant hourly rates and retainer pricing.' }
export default function Page() {
  return (
    <article className="max-w-3xl mx-auto px-4 md:px-8 py-12">
      <h1 className="font-display text-4xl mb-4">Virtual Assistant Rates</h1>
      <p className="text-muted mb-8">VA hourly and retainer pricing.</p>
      <div className="space-y-4"><div className="border border-border p-4 rounded"><h3 className="font-medium mb-2">Hourly</h3><p className="text-sm"><strong>General VA:</strong> $15–30/hr | <strong>Specialized:</strong> $30–60/hr | <strong>Expert:</strong> $60–100+/hr</p></div><div className="border border-border p-4 rounded"><h3 className="font-medium mb-2">Retainer (Monthly)</h3><p className="text-sm">10–20 hours/month: $500–1,500</p></div></div>
    </article>
  )
}
