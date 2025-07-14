import prisma from '@/lib/prisma'
import type { ImageDetail } from '@/lib/definitions'
import type { Prisma } from '@prisma/client'

export async function getImagesWithDetail(options?: Omit<Prisma.ImageFindManyArgs, 'include'>): Promise<ImageDetail[]> {
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
}
