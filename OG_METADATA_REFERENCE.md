# Open Graph (OG) Metadata Implementation Guide

## ✅ Implementation Complete

Your Next.js App Router implementation has been updated in `app/layout.tsx` with complete OG metadata.

---

## 📋 Complete OG Tag Reference

### App Router Implementation (Current Setup)

**Location:** `app/layout.tsx`

The metadata includes:
- ✅ `og:title`
- ✅ `og:description`
- ✅ `og:image` (https://yourdomain.com/og-image.webp)
- ✅ `og:image:width` (1800)
- ✅ `og:image:height` (942)
- ✅ `og:type` (website)
- ✅ `og:url` (auto-detected)
- ✅ `twitter:card` (summary_large_image)
- ✅ `twitter:title`
- ✅ `twitter:description`
- ✅ `twitter:image`

---

## 🔧 Configuration

### Set Your Domain

Update the base URL in `app/layout.tsx` or set an environment variable:

**Option 1: Environment Variable (Recommended)**
Create `.env.local`:
```env
NEXT_PUBLIC_SITE_URL=https://thumbnailgpt.com
```

**Option 2: Update Default in Code**
In `app/layout.tsx`, change the fallback:
```typescript
return 'https://yourdomain.com' // Update this
```

---

## 📄 Pages Router Alternative (Reference)

If you were using Pages Router, here's how to implement it:

### Option 1: Global Setup in `pages/_app.tsx`

```tsx
import type { AppProps } from 'next/app'
import Head from 'next/head'

function getBaseUrl() {
  if (process.env.NEXT_PUBLIC_SITE_URL) {
    return process.env.NEXT_PUBLIC_SITE_URL
  }
  if (process.env.VERCEL_URL) {
    return `https://${process.env.VERCEL_URL}`
  }
  return 'https://yourdomain.com' // Update with your domain
}

const baseUrl = getBaseUrl()
const ogImageUrl = `${baseUrl}/og-image.webp`

export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head>
        {/* Open Graph Meta Tags */}
        <meta property="og:title" content="ThumbnailGPT - AI YouTube Thumbnail Generator" />
        <meta property="og:description" content="Create viral YouTube thumbnails with AI. Best AI thumbnail generator for YouTube automation, faceless channels & CTR optimization." />
        <meta property="og:image" content={ogImageUrl} />
        <meta property="og:image:width" content="1800" />
        <meta property="og:image:height" content="942" />
        <meta property="og:type" content="website" />
        <meta property="og:url" content={baseUrl} />

        {/* Twitter Card Meta Tags */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="ThumbnailGPT - AI YouTube Thumbnail Generator" />
        <meta name="twitter:description" content="Create viral YouTube thumbnails with AI. Best AI thumbnail generator for YouTube automation, faceless channels & CTR optimization." />
        <meta name="twitter:image" content={ogImageUrl} />
      </Head>
      <Component {...pageProps} />
    </>
  )
}
```

### Option 2: Page-Specific Setup in `pages/index.tsx`

```tsx
import Head from 'next/head'

function getBaseUrl() {
  if (process.env.NEXT_PUBLIC_SITE_URL) {
    return process.env.NEXT_PUBLIC_SITE_URL
  }
  if (process.env.VERCEL_URL) {
    return `https://${process.env.VERCEL_URL}`
  }
  return 'https://yourdomain.com'
}

const baseUrl = getBaseUrl()
const ogImageUrl = `${baseUrl}/og-image.webp`

export default function Home() {
  return (
    <>
      <Head>
        <meta property="og:title" content="ThumbnailGPT - AI YouTube Thumbnail Generator" />
        <meta property="og:description" content="Create viral YouTube thumbnails with AI. Best AI thumbnail generator for YouTube automation, faceless channels & CTR optimization." />
        <meta property="og:image" content={ogImageUrl} />
        <meta property="og:image:width" content="1800" />
        <meta property="og:image:height" content="942" />
        <meta property="og:type" content="website" />
        <meta property="og:url" content={baseUrl} />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="ThumbnailGPT - AI YouTube Thumbnail Generator" />
        <meta name="twitter:description" content="Create viral YouTube thumbnails with AI. Best AI thumbnail generator for YouTube automation, faceless channels & CTR optimization." />
        <meta name="twitter:image" content={ogImageUrl} />
      </Head>
      {/* Your page content */}
    </>
  )
}
```

---

## 🖼️ OG Image Requirements

1. **File Location:** Place your OG image at `public/og-image.webp`
2. **Dimensions:** 1800x942 pixels (recommended ratio: 1.91:1)
3. **Format:** WebP (as specified)
4. **File Size:** Keep under 1MB for best performance

---

## ✅ Testing Your OG Tags

1. **Facebook Debugger:** https://developers.facebook.com/tools/debug/
2. **Twitter Card Validator:** https://cards-dev.twitter.com/validator
3. **LinkedIn Post Inspector:** https://www.linkedin.com/post-inspector/

Paste your URL to preview how it will appear when shared.

---

## 📝 Summary

- ✅ App Router implementation complete in `app/layout.tsx`
- ✅ All required OG tags included
- ✅ Twitter/X card tags included
- ✅ Auto-detects URL from environment variables
- ✅ Pages Router reference provided above

**Next Steps:**
1. Update `NEXT_PUBLIC_SITE_URL` in your environment variables
2. Place `og-image.webp` in the `public` folder
3. Test using the validators above

