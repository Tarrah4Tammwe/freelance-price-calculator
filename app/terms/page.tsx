export default function TermsPage() {
  return (
    <div className="max-w-2xl mx-auto px-4 py-16">
      <a href="/" className="text-sm text-muted hover:text-ink transition-colors">← Back to Calculator</a>
      <h1 className="font-display text-4xl mt-6 mb-6">Terms of Use</h1>
      <div className="prose prose-sm text-muted space-y-4">
        <p><strong>Last updated:</strong> {new Date().getFullYear()}</p>
        <p>By using this calculator, you agree to these terms.</p>
        <h2 className="font-display text-2xl text-ink">No financial advice</h2>
        <p>This tool provides estimates only. It is not financial, legal, or tax advice. Always consult a qualified professional for your specific situation.</p>
        <h2 className="font-display text-2xl text-ink">Accuracy</h2>
        <p>Calculations are based on the inputs you provide. We cannot guarantee accuracy for your individual circumstances, jurisdiction, or tax situation.</p>
        <h2 className="font-display text-2xl text-ink">Premium downloads</h2>
        <p>Premium PDF downloads are non-refundable once generated, as they are digital goods personalised to your inputs.</p>
        <h2 className="font-display text-2xl text-ink">Affiliate links</h2>
        <p>Some links on this site are affiliate links. We may earn a small commission if you purchase through them, at no additional cost to you.</p>
      </div>
    </div>
  )
}
