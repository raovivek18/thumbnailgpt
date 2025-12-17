import { NextRequest, NextResponse } from 'next/server'

// Rate limiting store (in-memory, use Redis in production)
const rateLimitStore = new Map<string, { count: number; resetTime: number }>()

// Allowed origins for RSC/Server Actions
const getAllowedOrigins = (): string[] => {
  const origins = process.env.ALLOWED_ORIGINS?.split(',') || []
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL
  const adminDomain = process.env.ADMIN_DOMAIN
  
  const allowed = new Set<string>()
  
  if (siteUrl) allowed.add(siteUrl)
  if (adminDomain) allowed.add(`https://${adminDomain}`)
  origins.forEach(origin => {
    const trimmed = origin.trim()
    if (trimmed) allowed.add(trimmed)
  })
  
  // Allow localhost in development only
  if (process.env.NODE_ENV === 'development') {
    allowed.add('http://localhost:3000')
    allowed.add('http://127.0.0.1:3000')
  }
  
  return Array.from(allowed)
}

// Rate limiting configuration
const RATE_LIMIT_WINDOW_MS = 15 * 60 * 1000 // 15 minutes
const RATE_LIMIT_MAX_REQUESTS = 100
const RATE_LIMIT_MAX_RSC_REQUESTS = 50 // Stricter for RSC endpoints

// Get client IP address
function getClientIP(request: NextRequest): string {
  const forwarded = request.headers.get('x-forwarded-for')
  const realIP = request.headers.get('x-real-ip')
  const ip = forwarded?.split(',')[0] || realIP || request.ip || 'unknown'
  return ip.trim()
}

// Rate limiting check
function checkRateLimit(ip: string, isRSC: boolean = false): boolean {
  const now = Date.now()
  const key = `${ip}:${isRSC ? 'rsc' : 'general'}`
  const limit = isRSC ? RATE_LIMIT_MAX_RSC_REQUESTS : RATE_LIMIT_MAX_REQUESTS
  
  const record = rateLimitStore.get(key)
  
  if (!record || now > record.resetTime) {
    rateLimitStore.set(key, {
      count: 1,
      resetTime: now + RATE_LIMIT_WINDOW_MS
    })
    return true
  }
  
  if (record.count >= limit) {
    return false
  }
  
  record.count++
  return true
}

// Clean up old rate limit entries periodically
setInterval(() => {
  const now = Date.now()
  for (const [key, record] of rateLimitStore.entries()) {
    if (now > record.resetTime) {
      rateLimitStore.delete(key)
    }
  }
}, 60 * 1000) // Clean up every minute

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl
  const ip = getClientIP(request)
  
  // Check rate limiting
  const isRSC = pathname.startsWith('/_next/static/chunks/') || 
                pathname.includes('__rsc') ||
                pathname.startsWith('/api/') ||
                request.headers.get('rsc') === '1' ||
                request.headers.get('next-router-prefetch') === '1'
  
  if (!checkRateLimit(ip, isRSC)) {
    return new NextResponse(
      JSON.stringify({ error: 'Too many requests. Please try again later.' }),
      {
        status: 429,
        headers: {
          'Content-Type': 'application/json',
          'Retry-After': '900', // 15 minutes in seconds
        },
      }
    )
  }
  
  // Protect RSC and Server Actions endpoints
  if (isRSC || pathname.startsWith('/api/')) {
    const origin = request.headers.get('origin')
    const referer = request.headers.get('referer')
    const allowedOrigins = getAllowedOrigins()
    
    // Validate origin header for RSC/Server Actions
    if (origin) {
      const originUrl = new URL(origin)
      const originHost = originUrl.origin
      
      if (!allowedOrigins.some(allowed => {
        try {
          const allowedUrl = new URL(allowed)
          return allowedUrl.origin === originHost
        } catch {
          return allowed === originHost
        }
      })) {
        return new NextResponse(
          JSON.stringify({ error: 'Forbidden: Invalid origin' }),
          {
            status: 403,
            headers: { 'Content-Type': 'application/json' },
          }
        )
      }
    } else if (referer) {
      // Fallback to referer validation if origin is missing
      try {
        const refererUrl = new URL(referer)
        const refererOrigin = refererUrl.origin
        
        if (!allowedOrigins.some(allowed => {
          try {
            const allowedUrl = new URL(allowed)
            return allowedUrl.origin === refererOrigin
          } catch {
            return allowed === refererOrigin
          }
        })) {
          return new NextResponse(
            JSON.stringify({ error: 'Forbidden: Invalid referer' }),
            {
              status: 403,
              headers: { 'Content-Type': 'application/json' },
            }
          )
        }
      } catch {
        // Invalid referer URL
        return new NextResponse(
          JSON.stringify({ error: 'Forbidden: Invalid request' }),
          {
            status: 403,
            headers: { 'Content-Type': 'application/json' },
          }
        )
      }
    } else {
      // No origin or referer for RSC/API request - reject
      return new NextResponse(
        JSON.stringify({ error: 'Forbidden: Missing origin' }),
        {
          status: 403,
          headers: { 'Content-Type': 'application/json' },
        }
      )
    }
    
    // Validate Content-Type for POST requests
    if (request.method === 'POST') {
      const contentType = request.headers.get('content-type') || ''
      if (!contentType.includes('application/json') && 
          !contentType.includes('text/plain') &&
          !contentType.includes('multipart/form-data')) {
        return new NextResponse(
          JSON.stringify({ error: 'Invalid content type' }),
          {
            status: 400,
            headers: { 'Content-Type': 'application/json' },
          }
        )
      }
    }
  }
  
  // Block admin routes if accessed from wrong domain
  if (pathname.startsWith('/admin') || pathname.startsWith('/dashboard')) {
    const host = request.headers.get('host') || ''
    const adminDomain = process.env.ADMIN_DOMAIN
    
    if (adminDomain && !host.includes(adminDomain)) {
      return new NextResponse(
        JSON.stringify({ error: 'Forbidden: Admin routes must be accessed from admin subdomain' }),
        {
          status: 403,
          headers: { 'Content-Type': 'application/json' },
        }
      )
    }
  }
  
  return NextResponse.next()
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - Static files with extensions
     */
    '/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp|ico|css|js|woff|woff2|ttf|eot|json|xml)).*)',
    // Explicitly include API routes and RSC endpoints
    '/api/:path*',
  ],
}

