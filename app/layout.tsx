import type React from "react"
import type { Metadata } from "next"
import { Analytics } from "@vercel/analytics/next"
import { Inter } from "next/font/google"
import { LenisProvider } from "@/components/lenis-provider"
import LaunchBanner from "@/components/launch-banner"
import "./globals.css"

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-inter",
})

export const metadata: Metadata = {
  title: "ThumbnailGPT - AI YouTube Thumbnail Generator",
  description:
    "Create viral YouTube thumbnails with AI. Best AI thumbnail generator for YouTube automation, faceless channels & CTR optimization. Free AI thumbnail maker with 1-click generation. Join the waitlist for early access to ThumbnailGPT.",
  keywords: [
    "thumbnail gpt",
    "ai thumbnail generator",
    "ai youtube thumbnail generator",
    "ai youtube thumbnail maker",
    "youtube thumbnail ai",
    "ai thumbnail creator",
    "automatic thumbnail generator",
    "best ai thumbnail generator",
    "ai thumbnail maker",
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
    "thumbnailgpt ai thumbnail maker",
    "youtube thumbnail generator 2025",
  ],
  openGraph: {
    title: "ThumbnailGPT - AI YouTube Thumbnail Generator",
    description:
      "Create viral YouTube thumbnails with AI. Best AI thumbnail generator for YouTube automation, faceless channels & CTR optimization.",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "ThumbnailGPT - AI YouTube Thumbnail Generator",
    description:
      "Create viral YouTube thumbnails with AI. Best AI thumbnail generator for YouTube automation, faceless channels & CTR optimization.",
  },
    generator: 'v0.app'
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body className={`${inter.variable} font-sans antialiased overflow-x-hidden`}>
        <LaunchBanner />
        <LenisProvider>{children}</LenisProvider>
        <Analytics />
      </body>
    </html>
  )
}
