import type { User } from '@prisma/client'
import type { SafeUser } from '@/lib/definitions'

export function toSafeUser(user: User): SafeUser {
  return {
    id: user.id,
    name: user.name,
    email: user.email,
    bio: user.bio,
    photoUrl: user.photoUrl,
    createdAt: user.createdAt,
    updatedAt: user.updatedAt
  }
}
