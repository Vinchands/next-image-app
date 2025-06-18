'use client'
import { useContext } from 'react'
import { SessionContext } from '@/components/shared/SessionProvider'

export function useSession() {
  return useContext(SessionContext)
}
