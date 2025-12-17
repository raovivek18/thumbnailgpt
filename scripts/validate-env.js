#!/usr/bin/env node

/**
 * Environment variable validation script
 * Run before deployment to ensure security requirements are met
 */

const requiredEnvVars = {
  // Public (safe to expose)
  public: ['NEXT_PUBLIC_SITE_URL'],
  
  // Server-only (must NOT be NEXT_PUBLIC_*)
  server: [],
}

const forbiddenPrefixes = ['NEXT_PUBLIC_']
const forbiddenKeys = [
  'SUPABASE_SERVICE_ROLE_KEY',
  'DATABASE_URL',
  'SUPABASE_SERVICE_KEY',
  'SUPABASE_ANON_KEY', // Should be NEXT_PUBLIC_SUPABASE_ANON_KEY if needed client-side
]

function validateEnv() {
  const errors = []
  const warnings = []
  
  // Check for forbidden NEXT_PUBLIC_ variables
  Object.keys(process.env).forEach(key => {
    if (key.startsWith('NEXT_PUBLIC_')) {
      const lowerKey = key.toLowerCase()
      if (lowerKey.includes('key') || 
          lowerKey.includes('secret') || 
          lowerKey.includes('password') ||
          lowerKey.includes('token') ||
          lowerKey.includes('service_role')) {
        errors.push(`SECURITY: ${key} exposes sensitive data to client! Remove NEXT_PUBLIC_ prefix or use server-only variable.`)
      }
    }
  })
  
  // Check for forbidden keys
  forbiddenKeys.forEach(key => {
    if (process.env[key] && !process.env[key].startsWith('NEXT_PUBLIC_')) {
      // This is fine - server-only
    } else if (process.env[`NEXT_PUBLIC_${key}`]) {
      errors.push(`SECURITY: NEXT_PUBLIC_${key} exposes sensitive data! Use ${key} (server-only) instead.`)
    }
  })
  
  // Check required public vars
  requiredEnvVars.public.forEach(key => {
    if (!process.env[key]) {
      warnings.push(`Missing recommended variable: ${key}`)
    }
  })
  
  // Validate NEXT_PUBLIC_SITE_URL format
  if (process.env.NEXT_PUBLIC_SITE_URL) {
    try {
      const url = new URL(process.env.NEXT_PUBLIC_SITE_URL)
      if (url.protocol !== 'https:') {
        warnings.push('NEXT_PUBLIC_SITE_URL should use HTTPS in production')
      }
    } catch (e) {
      errors.push(`NEXT_PUBLIC_SITE_URL is not a valid URL: ${process.env.NEXT_PUBLIC_SITE_URL}`)
    }
  }
  
  // Report results
  if (errors.length > 0) {
    console.error('\n❌ ENVIRONMENT VARIABLE SECURITY ERRORS:\n')
    errors.forEach(error => console.error(`  ${error}`))
    console.error('\n')
    process.exit(1)
  }
  
  if (warnings.length > 0) {
    console.warn('\n⚠️  ENVIRONMENT VARIABLE WARNINGS:\n')
    warnings.forEach(warning => console.warn(`  ${warning}`))
    console.warn('\n')
  }
  
  if (errors.length === 0 && warnings.length === 0) {
    console.log('✅ Environment variables validated successfully\n')
  }
}

// Run validation
validateEnv()

