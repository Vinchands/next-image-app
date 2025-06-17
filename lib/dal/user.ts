import 'server-only'
import { parseToken } from '@/lib/auth/jwt'
import { cache } from 'react'
import { cookies } from 'next/headers'
import prisma from '../prisma'

export const verifySession = cache(async () => {
  const token = (await cookies()).get('access-token')?.value
  const payload = await parseToken(token, 'access')
  
  if (!payload?.userId) return null
  
  return { isAuth: true, userId: payload?.userId }
})

export const getAuthUser = cache(async () => {
  const session = await verifySession()
  if (!session) return null
  
  try {
    const user = await prisma.user.findFirst({
      where: {
        id: session.userId
      }
    })
    return user
  } catch (err) {
    console.error('Failed to get user data', err)
    return null
  }
})
