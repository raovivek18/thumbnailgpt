# SEO Testing Guide for ThumbnailGPT

This document provides instructions for testing all SEO metadata and site-level resources implemented in the Next.js application.

## 📋 Implemented Features

✅ **Site Metadata** (`app/layout.tsx`)
- Title: "ThumbnailGPT – Make Stunning Thumbnails with AI"
- Description with SEO keywords
- OpenGraph tags
- Twitter Card tags
- Canonical URL
- Robots meta tags
- Theme color
- Manifest link

✅ **PWA Manifest** (`app/manifest.ts`)
- Accessible at `/manifest.json`

✅ **Robots.txt** (`app/robots.ts`)
- Accessible at `/robots.txt`
- Allows all crawlers
- Disallows `/api/private` and `/dashboard`

✅ **Sitemap** (`app/sitemap.ts`)
- Accessible at `/sitemap.xml`
- Includes all pages with metadata
- Includes image references

✅ **Dynamic OG Image** (`app/opengraph-image.tsx`)
- Accessible at `/opengraph-image`
- Generates 1200×630 image dynamically

---

## 🧪 Testing Instructions

### 1. Test Robots.txt

**Local Development:**
```
http://localhost:3000/robots.txt
```

**Production:**
```
https://thumbnailgpt.com/robots.txt
```

**Expected Output:**
```
User-Agent: *
Allow: /
Disallow: /api/private
Disallow: /dashboard
Disallow: /api/

Sitemap: https://thumbnailgpt.com/sitemap.xml
```

---

### 2. Test Sitemap.xml

**Local Development:**
```
http://localhost:3000/sitemap.xml
```

**Production:**
```
https://thumbnailgpt.com/sitemap.xml
```

**Expected Content:**
- Homepage (`/`)
- About page (`/about`)
- Contact page (`/contact`)
- Privacy page (`/privacy`)
- Terms page (`/terms`)
- Refund page (`/refund`)

Each entry should include:
- `lastModified` date
- `changeFrequency`
- `priority`
- `images` array

**Validation:**
- Use Google Search Console to submit sitemap
- Validate XML structure: https://www.xml-sitemaps.com/validate-xml-sitemap.html

---

### 3. Test Manifest.json

**Local Development:**
```
http://localhost:3000/manifest.json
```

**Production:**
```
https://thumbnailgpt.com/manifest.json
```

**Expected JSON Structure:**
```json
{
  "name": "ThumbnailGPT – Make Stunning Thumbnails with AI",
  "short_name": "ThumbnailGPT",
  "description": "...",
  "start_url": "/",
  "display": "standalone",
  "background_color": "#000000",
  "theme_color": "#000000",
  "icons": [...]
}
```

**Testing:**
- Open in browser to verify JSON is valid
- Check Chrome DevTools → Application → Manifest
- Test PWA installation prompt

---

### 4. Test OpenGraph Image

**Local Development:**
```
http://localhost:3000/opengraph-image
```

**Production:**
```
https://thumbnailgpt.com/opengraph-image
```

**Expected:**
- 1200×630 PNG image
- Contains "ThumbnailGPT" title
- Contains "Make Stunning Thumbnails with AI" subtitle
- Black background with orange accent

**Testing:**
- Open URL directly in browser
- Should display as PNG image
- Verify dimensions are 1200×630

---

### 5. Test Page Source Metadata

**View Page Source:**
1. Open homepage: `http://localhost:3000` or `https://thumbnailgpt.com`
2. Right-click → "View Page Source" (or Ctrl+U / Cmd+U)
3. Search for `<head>` section

**Expected Meta Tags:**

```html
<!-- Title -->
<title>ThumbnailGPT – Make Stunning Thumbnails with AI</title>

<!-- Description -->
<meta name="description" content="Create eye-catching thumbnails with ThumbnailGPT..." />

<!-- Keywords -->
<meta name="keywords" content="ai thumbnail maker, ai thumbnail generator tool..." />

<!-- OpenGraph -->
<meta property="og:title" content="ThumbnailGPT – Make Stunning Thumbnails with AI" />
<meta property="og:description" content="Create eye-catching thumbnails..." />
<meta property="og:image" content="https://thumbnailgpt.com/opengraph-image" />
<meta property="og:image:width" content="1200" />
<meta property="og:image:height" content="630" />
<meta property="og:type" content="website" />
<meta property="og:url" content="https://thumbnailgpt.com" />

<!-- Twitter -->
<meta name="twitter:card" content="summary_large_image" />
<meta name="twitter:title" content="ThumbnailGPT – Make Stunning Thumbnails with AI" />
<meta name="twitter:description" content="Create eye-catching thumbnails..." />
<meta name="twitter:image" content="https://thumbnailgpt.com/opengraph-image" />

<!-- Canonical -->
<link rel="canonical" href="https://thumbnailgpt.com" />

<!-- Robots -->
<meta name="robots" content="index, follow" />

<!-- Theme Color -->
<meta name="theme-color" content="#000000" />

<!-- Manifest -->
<link rel="manifest" href="/manifest.json" />
```

---

### 6. Test with External Validators

#### Facebook Open Graph Debugger
1. Visit: https://developers.facebook.com/tools/debug/
2. Enter your URL: `https://thumbnailgpt.com`
3. Click "Debug"
4. Verify:
   - ✅ OG title appears
   - ✅ OG description appears
   - ✅ OG image displays correctly (1200×630)
   - ✅ No errors or warnings

#### Twitter Card Validator
1. Visit: https://cards-dev.twitter.com/validator
2. Enter your URL: `https://thumbnailgpt.com`
3. Click "Preview card"
4. Verify:
   - ✅ Card type: "summary_large_image"
   - ✅ Title displays correctly
   - ✅ Description displays correctly
   - ✅ Image displays correctly

#### LinkedIn Post Inspector
1. Visit: https://www.linkedin.com/post-inspector/
2. Enter your URL: `https://thumbnailgpt.com`
3. Click "Inspect"
4. Verify:
   - ✅ Title appears
   - ✅ Description appears
   - ✅ Image displays correctly

#### Google Rich Results Test
1. Visit: https://search.google.com/test/rich-results
2. Enter your URL: `https://thumbnailgpt.com`
3. Verify structured data is recognized

---

### 7. Test Search Engine Indexing

#### Google Search Console
1. Submit sitemap: `https://thumbnailgpt.com/sitemap.xml`
2. Request indexing for homepage
3. Monitor indexing status

#### Bing Webmaster Tools
1. Submit sitemap: `https://thumbnailgpt.com/sitemap.xml`
2. Verify pages are being crawled

---

## 🔍 Quick Verification Checklist

- [ ] `/robots.txt` returns valid robots.txt content
- [ ] `/sitemap.xml` returns valid XML with all pages
- [ ] `/manifest.json` returns valid JSON manifest
- [ ] `/opengraph-image` returns 1200×630 PNG image
- [ ] Page source contains all required meta tags
- [ ] Facebook Debugger shows correct OG tags
- [ ] Twitter Card Validator shows correct card
- [ ] LinkedIn Post Inspector shows correct preview
- [ ] Google Search Console accepts sitemap
- [ ] All pages have unique titles and descriptions

---

## 🚀 Production Checklist

Before launch, ensure:

1. **Environment Variables:**
   ```env
   NEXT_PUBLIC_SITE_URL=https://thumbnailgpt.com
   ```

2. **OG Image:**
   - Verify `/opengraph-image` generates correctly
   - Test image loads on social platforms

3. **Sitemap:**
   - Submit to Google Search Console
   - Submit to Bing Webmaster Tools

4. **Manifest:**
   - Test PWA installation
   - Verify icons load correctly

5. **Robots.txt:**
   - Verify crawlers can access public pages
   - Confirm private routes are blocked

---

## 📝 Notes

- All routes are server-side rendered for optimal SEO
- OG image is generated dynamically using Next.js ImageResponse
- Sitemap includes image metadata for better image search visibility
- Manifest enables PWA functionality
- Robots.txt follows SEO best practices

---

## 🐛 Troubleshooting

**Issue: OG image not showing**
- Check `/opengraph-image` route is accessible
- Verify image dimensions are 1200×630
- Clear Facebook/Twitter cache using their debuggers

**Issue: Sitemap not found**
- Verify `app/sitemap.ts` exists
- Check route is accessible at `/sitemap.xml`
- Verify XML structure is valid

**Issue: Manifest not loading**
- Check `app/manifest.ts` exists
- Verify route is accessible at `/manifest.json`
- Check JSON structure is valid

**Issue: Meta tags not appearing**
- Verify `app/layout.tsx` exports metadata correctly
- Check page source for meta tags
- Ensure no client-side rendering issues

---

## 📚 Additional Resources

- [Next.js Metadata API](https://nextjs.org/docs/app/api-reference/functions/generate-metadata)
- [Open Graph Protocol](https://ogp.me/)
- [Twitter Cards](https://developer.twitter.com/en/docs/twitter-for-websites/cards/overview/abouts-cards)
- [Google Search Central](https://developers.google.com/search)

