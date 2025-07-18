import { NextRequest, NextResponse } from 'next/server'
import { createSession, deleteSession } from '@/lib/auth/session'
import { parseToken } from '@/lib/auth/jwt'

const protectedRoutes = ['/profile', '/upload', '/images/me']
const publicRoutes = ['/sign-up', '/sign-in']

export default async function middleware(req: NextRequest) {
  const path = req.nextUrl.pathname
  const isProtectedRoute = protectedRoutes.includes(path)
  const isPublicRoute = publicRoutes.includes(path)
  
  // Verify tokens
  const accessToken = req.cookies.get('access-token')?.value
  let payload = await parseToken(accessToken, 'access')
  
  if (!payload?.userId) {
    const refreshToken = req.cookies.get('refresh-token')?.value
    payload = await parseToken(refreshToken, 'refresh')
    
    if (!payload?.userId) await deleteSession()
    else await createSession(payload?.userId as string, 'access')
  }
  
  if (isProtectedRoute && !payload) return NextResponse.redirect(new URL('/sign-in', req.nextUrl))
  
  if (isPublicRoute && payload) return NextResponse.redirect(new URL('/', req.nextUrl))
  
  return NextResponse.next()
}

// Routes Middleware should not run on
export const config = {
  matcher: ['/((?!api|_next/static|_next/image|.*\\.png$).*)'],
}
