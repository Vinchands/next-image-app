import 'server-only'
import { generateToken, parseToken } from '@/lib/auth/jwt'
import type { TokenType } from '@/lib/definitions'
import { cookies } from 'next/headers'

export async function createSession(userId: string, type: TokenType) {
  // * 1h for access token and 7d for refresh token
  const expiresAt = new Date(
    Date.now() + (type === 'access'? 1 : 7 * 24) * 3600 * 1000
  )
  const token = await generateToken({ userId, expiresAt }, type)
  const cookieStore = await cookies()
  
  cookieStore.set(`${type}-token`, token, {
    httpOnly: true,
    secure: true,
    expires: expiresAt,
    sameSite: 'lax',
    path: '/'
  })
}

export async function deleteSession() {
  const cookieStore = await cookies()
  cookieStore.delete('access-token')
  cookieStore.delete('refresh-token')
}

export async function regenerateAccessToken() {
  const cookieStore = await cookies()
  const accessToken = cookieStore.get('access-token')?.value
  const payload = await parseToken(accessToken, 'access')
  
  if (!payload?.userId) return null
}
