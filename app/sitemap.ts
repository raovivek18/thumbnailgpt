import { MetadataRoute } from 'next'

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL ||
    (process.env.VERCEL_URL ? `https://${process.env.VERCEL_URL}` : 'https://thumbnailgpt.com')

  const routes = [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: 'weekly' as const,
      priority: 1,
      images: [
        {
          url: `${baseUrl}/og/thumbnailgpt.-og-image.png`,
          title: 'ThumbnailGPT – Make Stunning Thumbnails with AI',
          alt: 'ThumbnailGPT – Make Stunning Thumbnails with AI',
        },
      ],
    },
    {
      url: `${baseUrl}/about`,
      lastModified: new Date(),
      changeFrequency: 'monthly' as const,
      priority: 0.8,
      images: [
        {
          url: `${baseUrl}/og/thumbnailgpt.-og-image.png`,
          title: 'About ThumbnailGPT',
          alt: 'About ThumbnailGPT',
        },
      ],
    },
    {
      url: `${baseUrl}/contact`,
      lastModified: new Date(),
      changeFrequency: 'monthly' as const,
      priority: 0.7,
      images: [
        {
          url: `${baseUrl}/og/thumbnailgpt.-og-image.png`,
          title: 'Contact ThumbnailGPT',
          alt: 'Contact ThumbnailGPT',
        },
      ],
    },
    {
      url: `${baseUrl}/privacy`,
      lastModified: new Date(),
      changeFrequency: 'yearly' as const,
      priority: 0.5,
      images: [
        {
          url: `${baseUrl}/og/thumbnailgpt.-og-image.png`,
          title: 'Privacy Policy | ThumbnailGPT',
          alt: 'Privacy Policy | ThumbnailGPT',
        },
      ],
    },
    {
      url: `${baseUrl}/terms`,
      lastModified: new Date(),
      changeFrequency: 'yearly' as const,
      priority: 0.5,
      images: [
        {
          url: `${baseUrl}/og/thumbnailgpt.-og-image.png`,
          title: 'Terms & Conditions | ThumbnailGPT',
          alt: 'Terms & Conditions | ThumbnailGPT',
        },
      ],
    },
    {
      url: `${baseUrl}/refund`,
      lastModified: new Date(),
      changeFrequency: 'yearly' as const,
      priority: 0.5,
      images: [
        {
          url: `${baseUrl}/og/thumbnailgpt.-og-image.png`,
          title: 'Refund Policy | ThumbnailGPT',
          alt: 'Refund Policy | ThumbnailGPT',
        },
      ],
    },
    ...[
      '/image-to-thumbnail',
      '/text-to-thumbnail',
      '/recreate-thumbnail',
      '/analyze-thumbnail',
      '/fix-thumbnail',
      '/title-to-thumbnail',
      '/upscale-thumbnail',
      '/sketch-to-thumbnail'
    ].map((route) => ({
      url: `${baseUrl}${route}`,
      lastModified: new Date(),
      changeFrequency: 'weekly' as const,
      priority: 0.9,
    })),
  ]

  // Cast to any because Next.js sitemap image types can be restrictive
  // depending on the version, but the output XML handles object images correctly.
  return routes as any
}

