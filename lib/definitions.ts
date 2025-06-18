import { User } from '@prisma/client'

type SessionPayload = {
  userId: string
  expiresAt: Date
}

type TokenType = 'access' | 'refresh'

type SafeUser = Omit<User, 'password'>

export type {
  SessionPayload,
  TokenType,
  SafeUser
}
