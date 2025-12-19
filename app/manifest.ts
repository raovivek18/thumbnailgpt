import { MetadataRoute } from 'next'

export default function manifest(): MetadataRoute.Manifest {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 
                  (process.env.VERCEL_URL ? `https://${process.env.VERCEL_URL}` : 'https://thumbnailgpt.com')

  return {
    name: 'ThumbnailGPT – Make Stunning Thumbnails with AI',
    short_name: 'ThumbnailGPT',
    description: 'Create eye-catching thumbnails with ThumbnailGPT, the AI thumbnail maker that designs viral, high-CTR thumbnails in seconds for videos and social media.',
    start_url: '/',
    display: 'standalone',
    background_color: '#000000',
    theme_color: '#000000',
    orientation: 'portrait-primary',
    icons: [
      {
        src: '/icon-dark-32x32.png',
        sizes: '32x32',
        type: 'image/png',
        purpose: 'any',
      },
      {
        src: '/apple-icon.png',
        sizes: '180x180',
        type: 'image/png',
        purpose: 'any',
      },
    ],
    categories: ['design', 'productivity', 'utilities'],
    lang: 'en-US',
    dir: 'ltr',
    scope: '/',
    id: '/',
  }
}

