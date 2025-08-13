'use server'
import prisma from '@/lib/prisma'
import { generateBlurDataUrl, resizeImage } from '@/lib/sharp'
import { generateUniqueSlug } from '@/lib/utils'
import { put, del, type PutCommandOptions } from '@vercel/blob'
import { z } from 'zod'

export type FormState =
  | {
      errors?: {
        title?: string[]
        file?: string[]
      },
      success?: {
        title?: string[]
        file?: string[]
      },
      message?: string
    }
  | undefined

const UploadImageSchema = z.object({
  title: z.string().min(1, 'Title is required'),
  description: z
    .string()
    .max(250, 'Description must be less than 250 characters')
    .optional(),
  file: z
    .instanceof(File)
    .refine(file => file.type.startsWith('image/'), 'File must be an image')
    .refine(file => file.size > 0, 'File is required')
    .refine(file => file.size <= 10 * 1024 * 1024, 'File size must be less than 10MB')
})

export async function uploadImage(state: FormState, formData: FormData) {
  const validation = UploadImageSchema.safeParse(Object.fromEntries(formData.entries()))
  
  if (!validation.success) {
    return {
      errors: validation.error.flatten().fieldErrors,
    }
  }
  
  const { file, title, description } = validation.data
  const slug = generateUniqueSlug(title)
  const userId = formData.get('userId')
  
  // Convert file to buffer
  const arrayBuffer = await file.arrayBuffer()
  const originalBuffer = Buffer.from(arrayBuffer)
  
  // Resize and blur (image optimization process)
  const previewImageBuffer = await resizeImage(originalBuffer, { width: 640 })
  const blurImageUrl = await generateBlurDataUrl(originalBuffer)
  
  // Upload files
  try {
    const uploadOptions: PutCommandOptions = { access: 'public', addRandomSuffix: true }
    const [preview, download] = await Promise.all([
      put(`images/preview/${file.name}`, previewImageBuffer, uploadOptions),
      put(`images/download/${file.name}`, originalBuffer, uploadOptions)
    ])
    
    await prisma.image.create({
      data: {
        title,
        description,
        slug,
        blurUrl: blurImageUrl,
        previewUrl: preview.url,
        downloadUrl: download.url,
        userId: userId as string
      }
    })
  } catch (err) {
    console.error('Error when uploading file:', err)
    
    if (file?.name) {
      await Promise.allSettled([
        del(`images/preview/${file.name}`),
        del(`images/download/${file.name}`)
      ])
    }
    
    return {
      errors: {
        file: ['Error when uploading image ☹️. Try again later.']
      }
    }
  }
  
  return {
    success: {
      file: ['Image uploaded successfully 🥳.'],
    }
  }
}

export async function toggleLike(userId: string, imageId: string) {
  const existing = await prisma.like.findUnique({
    where: {
      userId_imageId: { userId, imageId }
    }
  })
  
  if (existing) {
    await prisma.like.delete({
      where: {
        id: existing.id
      }
    })
    
    return { liked: false }
  }
  
  await prisma.like.create({
    data: { userId, imageId }
  })
  
  return { liked: true }
}
