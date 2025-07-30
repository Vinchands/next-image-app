import prisma from '@/lib/prisma'
import type { Prisma } from '@prisma/client'
import { getAuthUser } from './user.dal'
import { cache } from 'react'

type GetImagesOptions = Omit<Prisma.ImageFindManyArgs, 'include'>

export const getImages = cache(async (options?: GetImagesOptions) => {
  const images = await prisma.image.findMany({
    include: {
      user: {
        omit: { password: true }
      },
      likes: true,
      _count: {
        select: { likes: true }
      }
    },
    ...options
  })
  return images
})

type WithoutUserIdWhere<T> = T extends { where?: infer W }
  ? Omit<T, 'where'> & {
      where?: Omit<W, 'userId'>
    }
  : T

type GetUserImagesOptions = WithoutUserIdWhere<GetImagesOptions>

export const getUserImages = cache(async (options?: GetUserImagesOptions) => {
  const user = await getAuthUser()
  if (!user) return null
  
  const images = await getImages({
    where: { userId: user.id },
    ...options
  })
  
  return images
})
