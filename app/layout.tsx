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
    default: "ThumbnailGPT – AI YouTube Thumbnail Generator for High CTR",
    template: "%s | ThumbnailGPT"
  },
  description:
    "Create high-CTR YouTube thumbnails with AI. ThumbnailGPT helps creators generate, analyze, and fix thumbnails designed to get more clicks and views.",
  keywords: [
    "ai thumbnail generator",
    "ai youtube thumbnail generator",
    "youtube thumbnail generator",
    "thumbnail generator ai",
    "ai thumbnail creator",
    "thumbnail maker ai",
    "ai thumbnails for youtube",
    "youtube thumbnails with ai",
    "text to thumbnail",
    "image to thumbnail",
    "recreate thumbnail",
    "title to thumbnail",
    "sketch to thumbnail",
    "thumbnail upscaling",
    "thumbnail enhancement",
    "thumbnail background change",
    "thumbnail design optimization",
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
    title: "ThumbnailGPT – AI YouTube Thumbnail Generator for High CTR",
    description:
      "Create high-CTR YouTube thumbnails with AI. ThumbnailGPT helps creators generate, analyze, and fix thumbnails designed to get more clicks and views.",
    images: [
      {
        url: ogImageUrl,
        width: 1200,
        height: 630,
        alt: "ThumbnailGPT – AI YouTube Thumbnail Generator for High CTR",
        type: "image/png",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "ThumbnailGPT – AI YouTube Thumbnail Generator for High CTR",
    description:
      "Create high-CTR YouTube thumbnails with AI. ThumbnailGPT helps creators generate, analyze, and fix thumbnails designed to get more clicks and views.",
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
