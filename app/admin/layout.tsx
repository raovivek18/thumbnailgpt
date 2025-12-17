import { redirect } from 'next/navigation'
import { validateAdminAccess } from '@/lib/auth'

/**
 * Admin layout - protects all admin routes
 * This runs on the server and cannot be bypassed client-side
 */
export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const hasAccess = await validateAdminAccess()
  
  if (!hasAccess) {
    redirect('/')
  }
  
  return <>{children}</>
}

