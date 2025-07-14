import type { Prisma, User } from '@prisma/client'

type SessionPayload = {
  userId: string
  expiresAt: Date
}

type TokenType = 'access' | 'refresh'

type SafeUser = Omit<User, 'password'>

type ImageDetail = Prisma.ImageGetPayload<{
  include: {
    user: {
      omit: { password: true }
    },
    likes: true,
    _count: {
      select: { likes: true }
    }
  }
}>

export type {
  SessionPayload,
  TokenType,
  SafeUser,
  ImageDetail
}
