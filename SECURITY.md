# Security Hardening Documentation

## Overview
This document outlines the security measures implemented in the Next.js App Router SaaS application.

## Version Requirements

### Minimum Safe Versions
- **Next.js**: >=16.0.7 (patches React2Shell/CVE-2025-55182)
- **React**: >=19.2.3 (patches React2Shell/CVE-2025-55182)
- **React DOM**: >=19.2.3

These versions are enforced in `package.json` to prevent accidental downgrades.

## React Server Components / Server Actions Protection

### Origin Validation
- All RSC and Server Action requests must originate from allowed origins
- Configured via `ALLOWED_ORIGINS` environment variable (comma-separated)
- Automatically includes `NEXT_PUBLIC_SITE_URL` and `ADMIN_DOMAIN`
- Development mode allows localhost

### Request Validation
- POST requests must have valid Content-Type headers
- Malformed request bodies are rejected
- Rate limiting applied (50 requests per 15 minutes for RSC endpoints)

### Implementation
See `middleware.ts` for origin validation and rate limiting logic.

## Container Security

### Non-Root User
- Application runs as user `nextjs` (UID 1001) in group `nodejs` (GID 1001)
- Implemented in `Dockerfile` and `nixpacks.toml`

### Dockerfile Security
- Multi-stage build to minimize attack surface
- Only production dependencies in final image
- Non-root user execution
- Minimal base image (node:20-alpine)

### Nixpacks Configuration
- Non-root user creation during setup phase
- User switching before application start

### Runtime Security
When deploying with Coolify, ensure:
- Containers run with `--cap-drop=ALL`
- `--security-opt=no-new-privileges` is set
- Docker socket is NOT mounted
- Host filesystem is NOT mounted

## Environment Variables

### Public Variables (NEXT_PUBLIC_*)
**Allowed:**
- `NEXT_PUBLIC_SITE_URL` - Public site URL (safe to expose)

**Never expose:**
- API keys
- Service keys
- Database credentials
- Supabase service role keys
- Any secrets or tokens

### Server-Only Variables
These must NEVER be prefixed with `NEXT_PUBLIC_`:
- `SUPABASE_SERVICE_ROLE_KEY` - Supabase service role key
- `SUPABASE_URL` - Supabase project URL (if contains sensitive info)
- `DATABASE_URL` - Database connection string
- `ADMIN_DOMAIN` - Admin subdomain (optional, for admin route protection)
- `ALLOWED_ORIGINS` - Comma-separated list of allowed origins for RSC

### Required Environment Variables
```bash
# Public (safe to expose)
NEXT_PUBLIC_SITE_URL=https://thumbnailgpt.com

# Server-only (keep secret)
SUPABASE_SERVICE_ROLE_KEY=your_service_role_key
SUPABASE_URL=your_supabase_url
ADMIN_DOMAIN=admin.thumbnailgpt.com  # Optional
ALLOWED_ORIGINS=https://thumbnailgpt.com,https://admin.thumbnailgpt.com  # Optional, auto-configured
```

## Rate Limiting

### Configuration
- General requests: 100 per 15 minutes per IP
- RSC/API requests: 50 per 15 minutes per IP
- Implemented in `middleware.ts`

### Production Recommendations
- Replace in-memory rate limiting with Redis for multi-instance deployments
- Consider edge-level rate limiting (Cloudflare, Vercel Edge, etc.)

## Security Headers

### Implemented Headers
- **Strict-Transport-Security**: Forces HTTPS (2 years, includeSubDomains, preload)
- **Content-Security-Policy**: Restricts resource loading
- **X-Frame-Options**: DENY (prevents clickjacking)
- **X-Content-Type-Options**: nosniff (prevents MIME sniffing)
- **X-XSS-Protection**: 1; mode=block
- **Referrer-Policy**: strict-origin-when-cross-origin
- **Permissions-Policy**: Restricts browser features
- **X-Permitted-Cross-Domain-Policies**: none

### CSP Configuration
- Default: self only
- Scripts: self + Google Analytics, Vercel Analytics
- Styles: self + Google Fonts
- Images: self + data URLs + HTTPS
- Connects: self + Supabase domains
- Frames: self + admin domain (if configured)

See `next.config.mjs` for full CSP configuration.

## Admin Routes Protection

### Server-Side Protection
- All admin routes protected via `app/admin/layout.tsx`
- Uses `validateAdminAccess()` from `lib/auth.ts`
- Requires:
  1. Request from admin subdomain (if `ADMIN_DOMAIN` is set)
  2. Valid admin user session

### Implementation
1. Create admin routes under `app/admin/` directory
2. Layout automatically protects all routes
3. Use `requireAdmin()` in Server Actions for additional checks

### Example Admin Route
```typescript
// app/admin/dashboard/page.tsx
import { requireAdmin } from '@/lib/auth'

export default async function AdminDashboard() {
  const admin = await requireAdmin() // Throws if not admin
  
  return <div>Admin Dashboard</div>
}
```

## Responsible Disclosure

### Security Policy
- Contact: security@thumbnailgpt.com
- Response time: Within 48 hours
- Policy: https://thumbnailgpt.com/.well-known/security.txt

### Reporting Process
1. Email security@thumbnailgpt.com with details
2. Include steps to reproduce
3. Do not disclose publicly until resolved
4. We will acknowledge receipt and work with you

## Deployment Checklist

### Pre-Deployment
- [ ] Update dependencies: `pnpm install`
- [ ] Verify minimum versions in `package.json`
- [ ] Set all required environment variables
- [ ] Verify no secrets in `NEXT_PUBLIC_*` variables
- [ ] Test admin route protection
- [ ] Verify CSP doesn't break functionality

### Coolify Deployment
- [ ] Use Dockerfile (not nixpacks) for production
- [ ] Set container to run as non-root user
- [ ] Configure `--cap-drop=ALL`
- [ ] Configure `--security-opt=no-new-privileges`
- [ ] Do NOT mount Docker socket
- [ ] Do NOT mount host filesystem
- [ ] Set environment variables securely
- [ ] Enable HTTPS/TLS termination

### Post-Deployment
- [ ] Verify security headers with securityheaders.com
- [ ] Test rate limiting
- [ ] Verify admin routes are protected
- [ ] Check logs for security warnings
- [ ] Monitor for suspicious activity

## Additional Security Recommendations

### Production Enhancements
1. **WAF**: Implement Web Application Firewall (Cloudflare, AWS WAF)
2. **DDoS Protection**: Use CDN with DDoS mitigation
3. **Monitoring**: Set up security event monitoring
4. **Logging**: Centralized logging with alerting
5. **Backups**: Regular automated backups
6. **Updates**: Regular dependency updates
7. **Penetration Testing**: Periodic security audits

### Supabase Security
1. Enable Row Level Security (RLS) on all tables
2. Use service role key only on server-side
3. Never expose service role key to client
4. Use anon key for client-side operations
5. Implement proper RLS policies

## Support
For security concerns, contact: security@thumbnailgpt.com

