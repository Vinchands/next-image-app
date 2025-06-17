type SessionPayload = {
  userId: string
  expiresAt: Date
}

type TokenType = 'access' | 'refresh'

export type { SessionPayload, TokenType }
