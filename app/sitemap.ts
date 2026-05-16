import { MetadataRoute } from 'next'
import { seoConfig } from '@/config/seo.config'

export default function sitemap(): MetadataRoute.Sitemap {
  const guides = [
    'how-to-calculate-freelance-rate',
    'freelance-rates-by-industry',
    'freelance-platform-fees',
    'project-based-pricing',
    'retainer-pricing',
    'value-based-pricing',
    'pricing-psychology',
    'hourly-vs-project-pricing',
  ]

  const industries = [
    'web-development',
    'graphic-design',
    'copywriting',
    'uiux-design',
    'virtual-assistant',
    'seo-marketing',
  ]

  const baseURLs = [
    {
      url: seoConfig.siteUrl,
      changeFrequency: 'weekly' as const,
      priority: 1,
    },
    {
      url: `${seoConfig.siteUrl}/faq`,
      changeFrequency: 'monthly' as const,
      priority: 0.8,
    },
    {
      url: `${seoConfig.siteUrl}/success`,
      changeFrequency: 'yearly' as const,
      priority: 0.3,
    },
  ]

  const guideURLs = guides.map(slug => ({
    url: `${seoConfig.siteUrl}/guides/${slug}`,
    changeFrequency: 'monthly' as const,
    priority: 0.7,
  }))

  const industryURLs = industries.map(slug => ({
    url: `${seoConfig.siteUrl}/industry-rates/${slug}`,
    changeFrequency: 'monthly' as const,
    priority: 0.7,
  }))

  return [
    ...baseURLs,
    ...guideURLs,
    ...industryURLs,
  ].map(item => ({
    ...item,
    lastModified: new Date(),
  }))
}
