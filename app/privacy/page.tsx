export default function PrivacyPage() {
  return (
    <div className="max-w-2xl mx-auto px-4 py-16">
      <a href="/" className="text-sm text-muted hover:text-ink transition-colors">← Back to Calculator</a>
      <h1 className="font-display text-4xl mt-6 mb-6">Privacy Policy</h1>
      <div className="prose prose-sm text-muted space-y-4">
        <p><strong>Last updated:</strong> {new Date().getFullYear()}</p>
        <h2 className="font-display text-2xl text-ink">What we collect</h2>
        <p>We collect no personal data. You do not need to create an account. No calculator inputs are stored or transmitted to our servers.</p>
        <h2 className="font-display text-2xl text-ink">Payments</h2>
        <p>Payments are processed by Stripe. We do not store payment card details. Stripe's privacy policy governs payment data.</p>
        <h2 className="font-display text-2xl text-ink">Analytics</h2>
        <p>We may use privacy-respecting analytics (e.g. aggregate page views) to understand usage. No personally identifiable information is collected.</p>
        <h2 className="font-display text-2xl text-ink">Advertising</h2>
        <p>We display Google AdSense advertisements. Google may use cookies to serve personalised ads. You can opt out via Google's ad settings.</p>
        <h2 className="font-display text-2xl text-ink">Cookies</h2>
        <p>We use no first-party cookies. Third-party services (Stripe, Google AdSense) may set cookies subject to their own policies.</p>
        <h2 className="font-display text-2xl text-ink">Contact</h2>
        <p>Questions? Contact us via the domain registrar contact form.</p>
      </div>
    </div>
  )
}
