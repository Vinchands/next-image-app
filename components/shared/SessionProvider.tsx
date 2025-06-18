'use client'
import { SafeUser } from '@/lib/definitions'
import { createContext } from 'react'

type UserSession = {
  isAuth: boolean
  user: SafeUser | null
}

export const SessionContext = createContext<UserSession>({
  isAuth: false,
  user: null
})

export function SessionProvider({ value, children }: { value: UserSession, children: React.ReactNode }) {
  return (
    <SessionContext.Provider value={value}>
      {children}
    </SessionContext.Provider>
  )
}
