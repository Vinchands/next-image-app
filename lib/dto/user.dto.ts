import type { User } from '@prisma/client'
import type { SafeUser } from '@/lib/definitions'

export function toSafeUser(user: User): SafeUser {
  const safeUser = { ...user, password: undefined }
  return safeUser
}
