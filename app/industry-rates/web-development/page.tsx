import { Metadata } from 'next'
export const metadata: Metadata = { title: 'Web Developer Freelance Rates 2024', description: 'Freelance web development rates by speciality and experience level.', alternates: { canonical: 'https://freelancepricecalculator.com/industry-rates/web-development' } }
export default function Page() {
  return (
    <article className="max-w-3xl mx-auto px-4 md:px-8 py-12">
      <h1 className="font-display text-4xl mb-4">Web Developer Rates</h1>
      <p className="text-muted mb-8">Hourly rates for web developers by speciality.</p>
      <div className="space-y-4"><div className="border border-border p-4 rounded"><h3 className="font-medium mb-2">Frontend Developer</h3><p className="text-sm"><strong>Junior:</strong> $30–50/hr | <strong>Mid:</strong> $60–100/hr | <strong>Senior:</strong> $100–200+/hr</p></div><div className="border border-border p-4 rounded"><h3 className="font-medium mb-2">Full-Stack</h3><p className="text-sm"><strong>Junior:</strong> $40–60/hr | <strong>Mid:</strong> $75–120/hr | <strong>Senior:</strong> $120–250+/hr</p></div><div className="border border-border p-4 rounded"><h3 className="font-medium mb-2">Backend</h3><p className="text-sm"><strong>Junior:</strong> $35–55/hr | <strong>Mid:</strong> $70–110/hr | <strong>Senior:</strong> $110–200+/hr</p></div></div>
    </article>
  )
}
