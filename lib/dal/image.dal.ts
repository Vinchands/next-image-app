import prisma from '@/lib/prisma'
import { getAuthUser } from '@/lib/dal/user.dal'
import { cache } from 'react'
import { type Prisma } from '@prisma/client'
import { type ImageDetail } from '@/lib/definitions'

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

export const getImageBySlug = cache(async (slug: string): Promise<ImageDetail | null> => {
  const image = await prisma.image.findFirst({
    where: { slug },
    include: {
      user: {
        omit: { password: true }
      },
      likes: true,
      _count: {
        select: { likes: true }
      }
    }
  })
  return image
})
