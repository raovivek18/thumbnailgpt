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
  // Headers for caching and security
  async headers() {
    return [
      {
        source: '/:path*',
        headers: [
          {
            key: 'X-DNS-Prefetch-Control',
            value: 'on'
          },
          {
            key: 'X-Frame-Options',
            value: 'SAMEORIGIN'
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
            value: 'origin-when-cross-origin'
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
