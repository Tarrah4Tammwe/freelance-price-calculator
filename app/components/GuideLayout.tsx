import Link from 'next/link'

interface GuideLayoutProps {
  title: string
  subtitle: string
  children: React.ReactNode
}

export default function GuideLayout({ title, subtitle, children }: GuideLayoutProps) {
  return (
    <div className="min-h-screen bg-paper">
      {/* Header */}
      <header className="bg-gradient-to-r from-ink to-[#1a1a1a] text-paper py-12 px-4">
        <div className="max-w-3xl mx-auto">
          <span className="font-mono text-xs text-[#FF4D00] uppercase tracking-widest block mb-3">Guide</span>
          <h1 className="font-display text-4xl md:text-5xl leading-tight text-balance mb-4">{title}</h1>
          <p className="text-lg text-[#B8B5AE] max-w-2xl">{subtitle}</p>
        </div>
      </header>

      {/* Content */}
      <main className="max-w-3xl mx-auto px-4 md:px-8 py-12 md:py-16">
        <article className="prose prose-sm max-w-none">
          {children}
        </article>

        {/* CTA Box */}
        <section className="bg-gradient-to-br from-[#FFF5F0] to-[#FFE8DC] border-2 border-[#FF4D00] rounded-lg p-8 mt-16">
          <h2 className="font-display text-2xl text-ink mb-3">Ready to Calculate Your Rate?</h2>
          <p className="text-ink mb-6">Use our freelance price calculator to automate all of this. Enter your expenses and desired income — we'll calculate your break-even rate instantly.</p>
          <Link href="/" className="inline-block bg-[#FF4D00] text-white px-6 py-3 rounded font-medium hover:bg-[#E64400] transition-colors">
            Try the calculator free →
          </Link>
        </section>

        {/* Back to resources */}
        <div className="mt-12 pt-8 border-t border-border">
          <Link href="/" className="text-accent hover:text-[#E64400] transition-colors font-medium">
            ← Back to homepage & all guides
          </Link>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-ink text-[#B8B5AE] py-8 px-4 mt-16">
        <div className="max-w-5xl mx-auto text-xs text-center">
          <p>© {new Date().getFullYear()} freelancepricecalculator.com — Free freelance pricing guides for professionals worldwide.</p>
        </div>
      </footer>
    </div>
  )
}
