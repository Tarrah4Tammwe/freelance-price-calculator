import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Freelance Rates by Industry 2024 — Hourly & Day Rates',
  description: 'Global freelance hourly rates, day rates, and project pricing by industry. Compare designers, writers, developers, virtual assistants, and more.',
  alternates: { canonical: 'https://freelancepricecalculator.com/guides/freelance-rates-by-industry' }
}

export default function Page() {
  const rates = [
    { industry: 'Web Development', hourly: '$50–150', dayRate: '$400–1,200', notes: 'Varies by speciality (frontend, full-stack, DevOps)' },
    { industry: 'Graphic Design', hourly: '$25–100', dayRate: '$200–800', notes: 'Logo design ranges $200–2,000+ for established designers' },
    { industry: 'UX/UI Design', hourly: '$40–120', dayRate: '$320–960', notes: 'Higher in US & UK, lower in Asia' },
    { industry: 'Copywriting', hourly: '$30–100', dayRate: '$240–800', notes: 'Content mills $10–30/hr; experienced writers $75+/hr' },
    { industry: 'Content Writing', hourly: '$20–75', dayRate: '$160–600', notes: 'Blog posts typically $50–200/article' },
    { industry: 'Virtual Assistant', hourly: '$15–50', dayRate: '$120–400', notes: 'Admin tasks on lower end; specialized tasks higher' },
    { industry: 'Social Media Management', hourly: '$25–75', dayRate: '$200–600', notes: 'Often quoted as monthly retainers ($500–3,000+)' },
    { industry: 'Video Editing', hourly: '$30–100', dayRate: '$240–800', notes: 'Project rates common: $200–1,000+ per video' },
    { industry: 'Illustration', hourly: '$40–150', dayRate: '$320–1,200', notes: 'Character design, technical illustration commands higher rates' },
    { industry: 'Translation', hourly: '$25–80', dayRate: '$200–640', notes: 'Often quoted per word ($0.05–0.25) or per language pair' },
    { industry: 'Coaching/Consulting', hourly: '$75–250', dayRate: '$600–2,000', notes: 'Industry expertise & reputation heavily influence rate' },
    { industry: 'SEO/Digital Marketing', hourly: '$40–120', dayRate: '$320–960', notes: 'Monthly retainers often $1,000–5,000+' },
  ]

  return (
    <article className="max-w-3xl mx-auto px-4 md:px-8 py-12 md:py-16">
      <h1 className="font-display text-4xl md:text-5xl mb-3 text-balance">Freelance Rates by Industry 2024</h1>
      <p className="text-muted mb-10 text-lg">Real hourly rates, day rates, and project pricing across 12 industries. Compare your rate to the market.</p>
      
      <div className="space-y-8">
        <section>
          <h2 className="font-display text-2xl mb-6">Global Freelance Rates by Speciality</h2>
          <div className="space-y-4">
            {rates.map((item) => (
              <div key={item.industry} className="border border-border rounded-sm p-4">
                <h3 className="font-medium text-lg mb-2">{item.industry}</h3>
                <div className="grid grid-cols-2 gap-4 mb-3 text-sm">
                  <div>
                    <span className="text-muted uppercase text-xs">Hourly</span>
                    <p className="font-mono font-medium">{item.hourly}</p>
                  </div>
                  <div>
                    <span className="text-muted uppercase text-xs">Day Rate (8h)</span>
                    <p className="font-mono font-medium">{item.dayRate}</p>
                  </div>
                </div>
                <p className="text-sm text-muted">{item.notes}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="bg-paper border border-border rounded-sm p-6">
          <h2 className="font-display text-2xl mb-4">Key Factors That Affect Your Rate</h2>
          <ul className="space-y-3 text-sm">
            <li><strong>Experience:</strong> Junior freelancers (0–2 years) charge 30–50% less than senior freelancers (5+ years)</li>
            <li><strong>Location:</strong> US/UK rates are 2–3× higher than Southeast Asia or Eastern Europe</li>
            <li><strong>Specialisation:</strong> Niche skills (Shopify + Facebook Ads + conversion) command higher rates than general skills</li>
            <li><strong>Portfolio:</strong> Proven results (case studies, testimonials) justify higher rates</li>
            <li><strong>Demand:</strong> In-demand skills (Python, React, UI/UX) pay 30–50% premium</li>
            <li><strong>Availability:</strong> Full-time retainer clients pay less; one-off projects can command higher rates</li>
          </ul>
        </section>

        <section className="bg-paper border border-border rounded-sm p-6">
          <h2 className="font-display text-2xl mb-4">Hourly vs Day Rate vs Project Pricing</h2>
          <div className="space-y-4 text-sm">
            <div>
              <h3 className="font-medium mb-2">Hourly Rate</h3>
              <p className="text-muted">Best for: Ongoing work, revisions, support roles, uncertain scope. Track hours with Toggl or Clockify.</p>
            </div>
            <div>
              <h3 className="font-medium mb-2">Day Rate</h3>
              <p className="text-muted">Best for: Workshops, intensive projects, on-site work. Usually 8–10 billable hours. Higher than hourly (no downtime gaps).</p>
            </div>
            <div>
              <h3 className="font-medium mb-2">Project Rate</h3>
              <p className="text-muted">Best for: Clear deliverables, fixed scope. Protects you from scope creep. Estimate hours, multiply by rate, add 20–30% buffer.</p>
            </div>
          </div>
        </section>

        <section className="bg-paper border border-border rounded-sm p-6">
          <h2 className="font-display text-2xl mb-4">Calculate Your Competitive Rate</h2>
          <p className="mb-4">Use our freelance rate calculator to benchmark your rate against your industry, experience level, and location. Enter your desired income and expenses — we'll tell you the exact rate you need.</p>
          <a href="/" className="inline-block text-accent font-medium hover:underline">Try the calculator →</a>
        </section>
      </div>
    </article>
  )
}
