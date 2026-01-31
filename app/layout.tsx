import type React from "react"
import type { Metadata, Viewport } from "next"
import { Inter } from "next/font/google"
import { LenisProvider } from "@/components/lenis-provider"
import LaunchBanner from "@/components/launch-banner"
import { BannerProvider } from "@/components/banner-context"
import { GoogleAnalytics } from "@/components/analytics"
import "./globals.css"

// Simple flag to enable/disable banner - set to false to hide banner
const BANNER_ENABLED = false

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
// Use static OG image for better social media compatibility
const ogImageUrl = `${baseUrl}/og/thumbnailgpt.-og-image.png`

export const metadata: Metadata = {
  metadataBase: new URL(baseUrl),
  title: {
    default: "ThumbnailGPT | AI Thumbnail Generator & YouTube Thumbnail Maker",
    template: "%s | ThumbnailGPT"
  },
  description:
    "Create YouTube thumbnails with AI using ThumbnailGPT. Generate eye-catching designs, change thumbnail backgrounds, and boost CTR with creator-focused tools.",
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
    title: "ThumbnailGPT | AI Thumbnail Generator & YouTube Thumbnail Maker",
    description:
      "Create YouTube thumbnails with AI using ThumbnailGPT. Generate eye-catching designs, change thumbnail backgrounds, and boost CTR with creator-focused tools.",
    images: [
      {
        url: ogImageUrl,
        width: 1200,
        height: 630,
        alt: "ThumbnailGPT | AI Thumbnail Generator & YouTube Thumbnail Maker",
        type: "image/png",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "ThumbnailGPT | AI Thumbnail Generator & YouTube Thumbnail Maker",
    description:
      "Create YouTube thumbnails with AI using ThumbnailGPT. Generate eye-catching designs, change thumbnail backgrounds, and boost CTR with creator-focused tools.",
    images: [ogImageUrl],
    creator: "@thumbnailgpt",
    site: "@thumbnailgpt",
  },
  alternates: {
    canonical: baseUrl,
  },
  manifest: "/manifest.json",
  generator: "Next.js",
  verification: {
    google: "DR9fULaZKpwfSdk5HdJU7rQwOG7YUeiAAw-fVHUchtw",
  },
}

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
  themeColor: "#000000",
  colorScheme: "dark",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className="bg-black">
      <body 
        className={`${inter.variable} font-sans antialiased overflow-x-hidden bg-black`} 
        style={{ backgroundColor: "#000000" }}
        suppressHydrationWarning
      >
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
        <BannerProvider initialVisible={BANNER_ENABLED}>
          <LaunchBanner enabled={BANNER_ENABLED} />
          <LenisProvider>{children}</LenisProvider>
        </BannerProvider>
      </body>
    </html>
  )
}
