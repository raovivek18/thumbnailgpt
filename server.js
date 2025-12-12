/**
 * Express server for serving static exports (out directory)
 * 
 * NOTE: This file is only used when Next.js is configured with `output: 'export'` 
 * in next.config.mjs. Currently, the app uses SSR mode, so Next.js handles the server.
 * 
 * If you switch to static export mode, uncomment the `output: 'export'` option
 * in next.config.mjs and use this server to serve the static files.
 * 
 * For SSR mode (current setup), Next.js handles the server automatically via `next start`.
 */
const express = require('express');
const path = require('path');
const fs = require('fs');

const app = express();
const PORT = process.env.PORT || 3000;
const OUT_DIR = path.join(__dirname, 'out');

// Serve static files from the out directory
app.use(express.static(OUT_DIR, {
  // Don't rewrite URLs for static assets
  index: false,
  redirect: false
}));

// Rewrite clean URLs to .html files (no trailing slashes, no .html extension)
app.get('*', (req, res, next) => {
  const urlPath = req.path;
  
  // Skip Next.js static assets and files with extensions
  if (urlPath.startsWith('/_next/') || 
      urlPath.includes('.') && !urlPath.endsWith('/') && !urlPath.endsWith('.html')) {
    return next();
  }
  
  // Remove trailing slash
  const cleanPath = urlPath.replace(/\/$/, '') || '/';
  
  // Try to serve the .html file
  const htmlPath = cleanPath === '/' 
    ? path.join(OUT_DIR, 'index.html')
    : path.join(OUT_DIR, `${cleanPath}.html`);
  
  // Check if file exists
  if (fs.existsSync(htmlPath)) {
    return res.sendFile(htmlPath);
  }
  
  // If not found, serve 404.html
  const notFoundPath = path.join(OUT_DIR, '404.html');
  if (fs.existsSync(notFoundPath)) {
    res.status(404);
    return res.sendFile(notFoundPath);
  }
  
  next();
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
  console.log(`Serving static files from: ${OUT_DIR}`);
});

