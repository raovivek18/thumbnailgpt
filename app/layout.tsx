import type React from "react"
import type { Metadata } from "next"
import { Analytics } from "@vercel/analytics/next"
import { Inter } from "next/font/google"
import { LenisProvider } from "@/components/lenis-provider"
import LaunchBanner from "@/components/launch-banner"
import { GoogleAnalytics } from "@/components/analytics"
import "./globals.css"

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-inter",
})

// Helper function to get base URL
function getBaseUrl() {
  // Use environment variable if available (for production)
  if (process.env.NEXT_PUBLIC_SITE_URL) {
    return process.env.NEXT_PUBLIC_SITE_URL
  }
  // Fallback for development
  if (process.env.VERCEL_URL) {
    return `https://${process.env.VERCEL_URL}`
  }
  // Default fallback (update with your actual domain)
  return 'https://thumbnailgpt.com'
}

const baseUrl = getBaseUrl()
const ogImageUrl = `${baseUrl}/opengraph-image`

export const metadata: Metadata = {
  metadataBase: new URL(baseUrl),
  title: {
    default: "ThumbnailGPT – Make Stunning Thumbnails with AI",
    template: "%s | ThumbnailGPT"
  },
  description:
    "Create eye-catching thumbnails with ThumbnailGPT, the AI thumbnail maker that designs viral, high-CTR thumbnails in seconds for videos and social media.",
  keywords: [
    "ai thumbnail maker",
    "ai thumbnail generator tool",
    "ai thumbnail creator",
    "thumbnailgpt ai thumbnail maker",
    "viral thumbnail generator",
    "social media thumbnail generator",
    "high ctr thumbnail maker",
    "create thumbnails online with ai",
    "best ai thumbnail maker 2025",
    "thumbnail gpt",
    "ai youtube thumbnail generator",
    "ai youtube thumbnail maker",
    "youtube thumbnail ai",
    "automatic thumbnail generator",
    "best ai thumbnail generator",
    "ai tool to make youtube thumbnails",
    "create youtube thumbnail with ai",
    "generate youtube thumbnail ai",
    "thumbnail generator online",
    "free ai thumbnail generator",
    "ai youtube thumbnail generator free",
    "youtube video thumbnail generator ai",
    "ai design thumbnails for youtube",
    "auto thumbnail creator for youtubers",
    "ctr optimized thumbnail generator",
    "ai viral thumbnail generator",
    "thumbnail maker for youtube automation",
    "thumbnail maker for faceless channels",
    "ai thumbnail presets",
    "1 click youtube thumbnail generator",
    "upload and auto thumbnail ai",
    "ai thumbnail text generator",
    "thumbnail generator for youtube growth",
    "best paid thumbnail generator",
    "youtube thumbnail generator for creators",
    "ai thumbnail maker saas",
    "ai for youtube automation tools",
    "ai for viral thumbnails",
    "youtube ctr thumbnail tool",
    "clickable thumbnails ai",
    "high ctr thumbnail generator",
    "shorts thumbnail generator ai",
    "mrbeast style thumbnail generator",
    "youtube thumbnail trends 2025",
    "ai thumbnail generator no watermark",
    "ai thumbnail generator with template",
    "thumbnail maker using gpt",
    "youtube seo thumbnail tool",
    "ai tool for youtube click through rate",
    "faceless youtube thumbnail generator",
    "ai for youtube growth",
    "thumbnailgpt waitlist",
    "thumbnailgpt launch",
    "youtube thumbnail generator 2025",
  ],
  authors: [{ name: "ThumbnailGPT" }],
  creator: "ThumbnailGPT",
  publisher: "ThumbnailGPT",
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: baseUrl,
    siteName: "ThumbnailGPT",
    title: "ThumbnailGPT – Make Stunning Thumbnails with AI",
    description:
      "Create eye-catching thumbnails with ThumbnailGPT, the AI thumbnail maker that designs viral, high-CTR thumbnails in seconds for videos and social media.",
    images: [
      {
        url: ogImageUrl,
        width: 1200,
        height: 630,
        alt: "ThumbnailGPT – Make Stunning Thumbnails with AI",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "ThumbnailGPT – Make Stunning Thumbnails with AI",
    description:
      "Create eye-catching thumbnails with ThumbnailGPT, the AI thumbnail maker that designs viral, high-CTR thumbnails in seconds for videos and social media.",
    images: [ogImageUrl],
    creator: "@thumbnailgpt",
  },
  alternates: {
    canonical: baseUrl,
  },
  manifest: "/manifest.json",
  themeColor: "#000000",
  colorScheme: "dark",
  viewport: {
    width: "device-width",
    initialScale: 1,
    maximumScale: 5,
  },
  generator: "Next.js",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className="bg-black">
      <head>
        <link rel="manifest" href="/manifest.json" />
        <meta name="theme-color" content="#000000" />
      </head>
      <body className={`${inter.variable} font-sans antialiased overflow-x-hidden bg-black`} style={{ backgroundColor: "#000000" }}>
        {/* Google Tag Manager (noscript) */}
        <noscript>
          <iframe
            src="https://www.googletagmanager.com/ns.html?id=GTM-MMT6QV52"
            height="0"
            width="0"
            style={{ display: 'none', visibility: 'hidden' }}
          />
        </noscript>
        {/* End Google Tag Manager (noscript) */}
        
        <GoogleAnalytics />
        <LaunchBanner />
        <LenisProvider>{children}</LenisProvider>
        <Analytics />
      </body>
    </html>
  )
}
