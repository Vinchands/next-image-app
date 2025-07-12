import prisma from '@/lib/prisma'
import type { Image, Prisma } from '@prisma/client'

export async function getImages(options?: Prisma.ImageFindManyArgs): Promise<Image[]> {
  const images = await prisma.image.findMany(options)
  return images
}
