/** @type {import('next').NextConfig} */
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
  },
}

export default nextConfig
