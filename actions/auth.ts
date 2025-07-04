'use server'
import { z } from 'zod'
import bcrypt from 'bcrypt'
import prisma from '@/lib/prisma'
import { createSession, deleteSession } from '@/lib/auth/session'
import { redirect } from 'next/navigation'

export type FormState =
  | {
      errors?: {
        name?: string[]
        email?: string[]
        password?: string[]
      },
      success?: {
        name?: string[]
        email?: string[]
        password?: string[]
      },
      message?: string
    }
  | undefined


const SignupSchema = z.object({
  name: z
    .string()
    .min(2, { message: 'Name must be at least 2 characters long.' })
    .trim(),
  email: z
    .string()
    .email({ message: 'Please enter a valid email.' })
    .trim(),
  password: z
    .string()
    .min(8, { message: 'Password must be at least 8 characters long.' })
    .regex(/[a-zA-Z]/, { message: 'Contain at least one letter.' })
    .regex(/[0-9]/, { message: 'Contain at least one number.' })
    .regex(/[^a-zA-Z0-9]/, {
      message: 'Contain at least one special character.',
    })
    .trim(),
})

export async function signup(state: FormState, formData: FormData) {
  const validation = SignupSchema.safeParse(Object.fromEntries(formData))
  
  if (!validation.success) {
    return {
      errors: validation.error.flatten().fieldErrors,
    }
  }
  
  const { name, email, password } = validation.data
  
  const user = await prisma.user.findFirst({
    where: { email }
  })
  
  if (user) {
    return {
      errors: {
        password: ['Unable to sign up. Use different email or try again later.']
      }
    }
  }
  
  const passwordHash = await bcrypt.hash(password, 10)
  const newUser = await prisma.user.create({
    data: {
      name, email, password: passwordHash
    }
  })
  
  await createSession(newUser.id, 'refresh')
  await createSession(newUser.id, 'access')
  
  redirect('/profile')
}


const SigninSchema = z.object({
  email: z
    .string()
    .email({ message: 'Please enter a valid email.' })
    .trim(),
  password: z
    .string()
    .min(1, { message: 'Password is required.' })
})

export async function signin(state: FormState, formData: FormData) {
  const validation = SigninSchema.safeParse(Object.fromEntries(formData))
  
  if (!validation.success) {
    return {
      errors: validation.error.flatten().fieldErrors,
    }
  }
  
  const { email, password } = validation.data
  const user = await prisma.user.findFirst({
    where: { email }
  })
  
  if (!user) {
    return {
      errors: {
        password: ['Invalid email or password.']
      }
    }
  }
  
  const isValid = await bcrypt.compare(password, user.password)
  if (!isValid) {
    return {
      errors: {
        password: ['Invalid email or password.']
      }
    }
  }

  await createSession(user.id, 'refresh')
  await createSession(user.id, 'access')
  
  redirect('/profile')
}

export async function signout() {
  await deleteSession()
  redirect('/')
}

const ResetPasswordSchema = z.object({
  email: z
    .string()
    .email({ message: 'Please enter a valid email.' })
    .trim(),
})

export async function resetPassword(state: FormState, formData: FormData): Promise<FormState> {
  
  const validation = ResetPasswordSchema.safeParse(Object.fromEntries(formData))
  
  if (!validation.success) {
    return {
      errors: validation.error.flatten().fieldErrors,
    }
  }
  
  const { email } = validation.data
  
  const user = await prisma.user.findFirst({
    where: { email }
  })
  
  if (!user) {
    return {
      errors: {
        email: ['No user found with this email.']
      }
    }
  }
  
  // TODO: Add real email verification here...
  
  return {
    success: {
      email: ['Verification email already sent.']
    }
  }
}
