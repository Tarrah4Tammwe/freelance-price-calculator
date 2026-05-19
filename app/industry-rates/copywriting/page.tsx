import { Metadata } from 'next'
export const metadata: Metadata = { title: 'Copywriter Rates', description: 'Freelance copywriting rates for blogs, sales pages, and content.' }
export default function Page() {
  return (
    <article className="max-w-3xl mx-auto px-4 md:px-8 py-12">
      <h1 className="font-display text-4xl mb-4">Copywriter Rates</h1>
      <p className="text-muted mb-8">Blog posts, sales copy, and content pricing.</p>
      <div className="space-y-4"><div className="border border-border p-4 rounded"><h3 className="font-medium mb-2">Blog Posts</h3><p className="text-sm">$0.10–0.50/word | $150–1,000 per 1,500–2,000 word article</p></div><div className="border border-border p-4 rounded"><h3 className="font-medium mb-2">Sales Copy</h3><p className="text-sm">$500–3,000+ per page | Email sequences: $300–1,500</p></div><div className="border border-border p-4 rounded"><h3 className="font-medium mb-2">Retainer</h3><p className="text-sm">Blog writer: $800–2,500/month | Email: $1,000–3,000/month</p></div></div>
    </article>
  )
}
