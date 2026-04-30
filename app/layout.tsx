import type { Metadata } from 'next'
import './globals.css'
import { seoConfig } from '@/config/seo.config'

export const metadata: Metadata = {
  metadataBase: new URL(seoConfig.siteUrl),
  title: {
    default: seoConfig.title,
    template: `%s | ${seoConfig.siteName}`,
  },
  description: seoConfig.description,
  keywords: seoConfig.keywords,
  authors: [{ name: seoConfig.siteName }],
  creator: seoConfig.siteName,
  openGraph: {
    type: 'website',
    locale: 'en_GB',
    url: seoConfig.siteUrl,
    siteName: seoConfig.siteName,
    title: seoConfig.title,
    description: seoConfig.description,
    images: [
      {
        url: seoConfig.ogImage,
        width: 1200,
        height: 630,
        alt: 'Freelance Price Calculator — Set Your Rate & Profit with Confidence',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: seoConfig.title,
    description: seoConfig.description,
    images: [seoConfig.ogImage],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, 'max-image-preview': 'large' },
  },
  alternates: { canonical: seoConfig.siteUrl },
}

const jsonLd = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'WebApplication',
      '@id': `${seoConfig.siteUrl}/#app`,
      name: 'Freelance Price Calculator',
      url: seoConfig.siteUrl,
      description: seoConfig.description,
      applicationCategory: 'FinanceApplication',
      operatingSystem: 'Web Browser',
      offers: {
        '@type': 'Offer',
        price: '0',
        priceCurrency: 'USD',
        description: 'Free freelance price and rate calculator',
      },
      featureList: [
        'Freelance rate calculator',
        'Freelance price calculator',
        'Platform fee calculator',
        'Project pricing calculator',
        'Industry rate benchmarking',
        'Premium PDF report',
      ],
    },
    {
      '@type': 'WebSite',
      '@id': `${seoConfig.siteUrl}/#website`,
      url: seoConfig.siteUrl,
      name: seoConfig.siteName,
      description: seoConfig.description,
      potentialAction: {
        '@type': 'SearchAction',
        target: { '@type': 'EntryPoint', urlTemplate: `${seoConfig.siteUrl}/?q={search_term_string}` },
        'query-input': 'required name=search_term_string',
      },
    },
    {
      '@type': 'FAQPage',
      mainEntity: seoConfig.faqs.map((faq) => ({
        '@type': 'Question',
        name: faq.question,
        acceptedAnswer: { '@type': 'Answer', text: faq.answer },
      })),
    },
  ],
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const adsenseId = process.env.NEXT_PUBLIC_GOOGLE_ADSENSE_CLIENT_ID

  return (
    <html lang="en">
      <head>
        <meta name="theme-color" content="#0D0D0D" />
        <link rel="icon" href="/favicon.ico" sizes="any" />
        {adsenseId && (
          <script
            async
            src={`https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${adsenseId}`}
            crossOrigin="anonymous"
          />
        )}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className="min-h-screen bg-paper">
        {children}
      </body>
    </html>
  )
}
