/** @type {import('next').NextConfig} */
import { createRequire } from 'module'
const require = createRequire(import.meta.url)

// Conditionally load bundle analyzer if available
let withBundleAnalyzer = (config) => config

try {
  const bundleAnalyzer = require('@next/bundle-analyzer')
  withBundleAnalyzer = bundleAnalyzer({
    enabled: process.env.ANALYZE === 'true',
  })
} catch (e) {
  // Bundle analyzer not installed yet - config works without it
  // Install with: pnpm install
  // Then use: pnpm run analyze
}

const nextConfig = {
  // Enable standalone output for Docker
  output: 'standalone',
  // SSR mode (removed output: 'export' for server-side rendering)
  // No trailing slashes (e.g., /about instead of /about/)
  trailingSlash: false,
  // Prevent automatic redirects for trailing slashes
  skipTrailingSlashRedirect: true,
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    unoptimized: false, // Enable image optimization for SSR
    formats: ['image/avif', 'image/webp'],
    minimumCacheTTL: 60,
  },
  // Enable static page generation and caching
  experimental: {
    optimizeCss: true,
  },
  // Compress responses
  compress: true,
  // Power optimization
  poweredByHeader: false,
  // Redirects for SEO and 404 fixes
  async redirects() {
    return [
      {
        source: "/privacy-policy",
        destination: "/privacy",
        permanent: true,
      },
    ]
  },
  // Headers for caching and security
  async headers() {
    // Build CSP dynamically based on environment
    const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://thumbnailgpt.com'
    const adminDomain = process.env.ADMIN_DOMAIN
    
    // Content Security Policy
    const cspDirectives = [
      "default-src 'self'",
      "script-src 'self' 'unsafe-inline' 'unsafe-eval' https://www.googletagmanager.com https://www.google-analytics.com",
      "style-src 'self' 'unsafe-inline' https://fonts.googleapis.com",
      "img-src 'self' data: https: blob:",
      "font-src 'self' https://fonts.gstatic.com data:",
      "connect-src 'self' https://www.google-analytics.com https://*.supabase.co https://*.supabase.in",
      "frame-src 'self' https://www.googletagmanager.com",
      "object-src 'none'",
      "base-uri 'self'",
      "form-action 'self'",
      "frame-ancestors 'self'",
      "upgrade-insecure-requests",
    ]
    
    if (adminDomain) {
      cspDirectives.push(`frame-ancestors 'self' https://${adminDomain}`)
    }
    
    return [
      {
        source: '/:path*',
        headers: [
          {
            key: 'Strict-Transport-Security',
            value: 'max-age=63072000; includeSubDomains; preload'
          },
          {
            key: 'Content-Security-Policy',
            value: cspDirectives.join('; ')
          },
          {
            key: 'X-DNS-Prefetch-Control',
            value: 'on'
          },
          {
            key: 'X-Frame-Options',
            value: 'DENY'
          },
          {
            key: 'X-Content-Type-Options',
            value: 'nosniff'
          },
          {
            key: 'X-XSS-Protection',
            value: '1; mode=block'
          },
          {
            key: 'Referrer-Policy',
            value: 'strict-origin-when-cross-origin'
          },
          {
            key: 'Permissions-Policy',
            value: 'camera=(), microphone=(), geolocation=()'
          },
          {
            key: 'X-Permitted-Cross-Domain-Policies',
            value: 'none'
          }
        ],
      },
      {
        // Cache static assets
        source: '/_next/static/:path*',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=31536000, immutable',
          },
        ],
      },
      {
        // Cache images
        source: '/images/:path*',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=31536000, immutable',
          },
        ],
      },
      {
        // Cache fonts
        source: '/fonts/:path*',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=31536000, immutable',
          },
        ],
      },
    ]
  },
}

export default withBundleAnalyzer(nextConfig)
