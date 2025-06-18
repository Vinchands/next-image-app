import 'server-only'
import { SignJWT, jwtVerify } from 'jose'
import type { SessionPayload, TokenType } from '@/lib/definitions'

const encodedAccessKey = new TextEncoder().encode(process.env.JWT_ACCESS_SECRET)
const encodedRefreshKey = new TextEncoder().encode(process.env.JWT_REFRESH_SECRET)

// Encrypt
export async function generateToken(payload: SessionPayload, tokenType: TokenType) {
  
  const encodedKey = tokenType === 'access'? encodedAccessKey : encodedRefreshKey
  const expirationTime = tokenType === 'access'? '1h' : '7d'
  
  return new SignJWT(payload)
    .setProtectedHeader({ alg: 'HS256' })
    .setIssuedAt()
    .setExpirationTime(expirationTime)
    .sign(encodedKey)
}

// Decrypt
export async function parseToken(token: string | undefined = '', tokenType: TokenType) {
  if (!token) return null
  
  const encodedKey = tokenType === 'access'? encodedAccessKey : encodedRefreshKey
  
  try {
    const { payload } = await jwtVerify(token, encodedKey, {
      algorithms: ['HS256'],
    })
    return payload
  } catch (err) {
    console.error(`Failed to verify token`, err)
    return null
  }
}
