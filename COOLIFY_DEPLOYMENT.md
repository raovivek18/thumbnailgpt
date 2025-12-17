# Coolify Deployment Security Configuration

## Container Security Settings

### Required Coolify Settings

1. **User/Group**: Set to `nextjs:nodejs` (UID: 1001, GID: 1001)
   - Or use: `1001:1001`

2. **Capabilities**: Drop all capabilities
   ```yaml
   cap_drop:
     - ALL
   ```

3. **Security Options**:
   ```yaml
   security_opt:
     - no-new-privileges:true
   ```

4. **Read-only Root Filesystem** (recommended):
   ```yaml
   read_only: true
   tmpfs:
     - /tmp
     - /app/.next/cache
   ```

### Docker Socket
**DO NOT** mount Docker socket (`/var/run/docker.sock`)

### Host Filesystem
**DO NOT** mount host filesystem paths

## Environment Variables

### Required Variables
Set these in Coolify's environment variable section:

```bash
# Public (safe to expose)
NEXT_PUBLIC_SITE_URL=https://thumbnailgpt.com

# Server-only (keep secret)
SUPABASE_SERVICE_ROLE_KEY=your_service_role_key_here
SUPABASE_URL=your_supabase_url_here

# Optional
ADMIN_DOMAIN=admin.thumbnailgpt.com
ALLOWED_ORIGINS=https://thumbnailgpt.com,https://admin.thumbnailgpt.com
NODE_ENV=production
```

### Security Checklist
- [ ] No secrets in `NEXT_PUBLIC_*` variables
- [ ] `SUPABASE_SERVICE_ROLE_KEY` is NOT prefixed with `NEXT_PUBLIC_`
- [ ] All URLs use HTTPS
- [ ] `NODE_ENV=production` is set

## Build Configuration

### Build Command
```bash
pnpm install --frozen-lockfile && pnpm run build
```

### Start Command
```bash
pnpm run start
```

Or if using Dockerfile directly:
```bash
node server.js
```

## Port Configuration
- **Internal Port**: 3000
- **External Port**: Configure as needed (e.g., 80/443 with reverse proxy)

## Health Check
```bash
curl http://localhost:3000/api/health
```

## Post-Deployment Verification

1. **Security Headers**: Check with https://securityheaders.com
2. **Rate Limiting**: Verify with multiple rapid requests
3. **Admin Routes**: Test access from wrong domain (should be blocked)
4. **Environment Variables**: Run `pnpm run validate-env` locally with production env

## Troubleshooting

### Container Fails to Start
- Check logs for permission errors
- Verify user is set to `nextjs` or `1001`
- Ensure `.next/standalone` directory exists after build

### Rate Limiting Too Strict
- Adjust limits in `middleware.ts`
- Consider Redis for multi-instance deployments

### CSP Blocks Resources
- Review CSP in `next.config.mjs`
- Add necessary domains to CSP directives
- Test in development first

## Monitoring

### Recommended Monitoring
- Application logs
- Security event logs
- Rate limit violations
- Failed authentication attempts
- Admin route access attempts

