import 'server-only'
import { SignJWT, jwtVerify } from 'jose'
import { cookies } from 'next/headers'

type SessionPayload = {
  userId: string
  expiresAt: Date
}

type TokenType = 'access' | 'refresh'

const encodedAccessKey = new TextEncoder().encode(process.env.JWT_ACCESS_SECRET)
const encodedRefreshKey = new TextEncoder().encode(process.env.JWT_REFRESH_SECRET)

// Encrypt
export function generateToken(payload: SessionPayload, type: TokenType) {
  const isAccess = type === 'access'
  
  return new SignJWT(payload)
    .setProtectedHeader({ alg: 'HS256' })
    .setIssuedAt()
    .setExpirationTime(isAccess? '1h' : '7d')
    .sign(isAccess? encodedAccessKey : encodedRefreshKey)
}

// Decrypt
export async function verifyToken(token: string | undefined = '', type: TokenType) {
  const key = type === 'access'? encodedAccessKey : encodedRefreshKey
  try {
    const { payload } = await jwtVerify(token, key, {
      algorithms: ['HS256'],
    })
    return payload
  } catch (err) {
    console.error(`Failed to verify ${type} token`, err)
    return null
  }
}

// Session
export async function createSession(userId: string, type: TokenType) {
  //* 7d for refresh token and 1h for access token
  const expiration = (type === 'refresh'? 7 * 24 : 1) * 3600 * 1000
  
  const expiresAt = new Date(Date.now() + expiration)
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
