/**
 * Server-side authentication utilities
 * DO NOT expose sensitive logic to client components
 */

import { cookies, headers } from 'next/headers'

export interface AdminUser {
  id: string
  email: string
  role: 'admin' | 'user'
  isAdmin: boolean
}

/**
 * Get admin status from server-side session
 * This should be called from Server Components or Server Actions only
 */
export async function getAdminUser(): Promise<AdminUser | null> {
  // TODO: Implement actual authentication check with Supabase
  // This is a placeholder that must be replaced with real auth logic
  
  const cookieStore = await cookies()
  const sessionToken = cookieStore.get('session_token')
  
  if (!sessionToken) {
    return null
  }
  
  // TODO: Validate session token with Supabase
  // Example:
  // const { data: { user }, error } = await supabase.auth.getUser(sessionToken.value)
  // if (error || !user) return null
  // 
  // const { data: profile } = await supabase
  //   .from('profiles')
  //   .select('role')
  //   .eq('id', user.id)
  //   .single()
  // 
  // return {
  //   id: user.id,
  //   email: user.email,
  //   role: profile?.role === 'admin' ? 'admin' : 'user',
  //   isAdmin: profile?.role === 'admin'
  // }
  
  return null
}

/**
 * Require admin access - throws if user is not admin
 * Use in Server Components or Server Actions
 */
export async function requireAdmin(): Promise<AdminUser> {
  const user = await getAdminUser()
  
  if (!user || !user.isAdmin) {
    throw new Error('Unauthorized: Admin access required')
  }
  
  return user
}

/**
 * Check if request is from admin subdomain
 */
export async function isAdminDomain(): Promise<boolean> {
  const headersList = await headers()
  const host = headersList.get('host') || ''
  const adminDomain = process.env.ADMIN_DOMAIN
  
  if (!adminDomain) {
    return false
  }
  
  return host.includes(adminDomain)
}

/**
 * Validate admin route access
 * Returns true if access is allowed, false otherwise
 */
export async function validateAdminAccess(): Promise<boolean> {
  // Must be from admin domain
  if (!(await isAdminDomain())) {
    return false
  }
  
  // Must have admin user session
  const user = await getAdminUser()
  if (!user || !user.isAdmin) {
    return false
  }
  
  return true
}

