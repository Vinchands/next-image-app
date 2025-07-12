'use server'
import prisma from '@/lib/prisma'
import { put } from '@vercel/blob'
import { redirect } from 'next/navigation'
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
  file: z
    .instanceof(File)
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
  
  const { file, title } = validation.data
  const userId = formData.get('userId')
  
  const { url } = await put(`images/${file.name}`, file, { access: 'public' })
  
  await prisma.image.create({
    data: {
      title,
      url,
      userId: userId as string
    }
  })
  
  return {
    success: {
      file: ['Image uploaded successfully 🥳.'],
    }
  }
}
