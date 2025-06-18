import { getAuthUser } from '@/lib/dal/user'
import { SessionProvider } from '@/components/shared/SessionProvider'
import { getSafeUser } from '@/lib/dto/user'

export default async function SessionWrapper({ children }: { children: React.ReactNode }) {
  
  const user = await getAuthUser()
  let safeUser = null
  
  if (!!user) safeUser = getSafeUser(user)
  
  return (
    <SessionProvider value={{ isAuth: !!safeUser, user: safeUser }}>
      {children}
    </SessionProvider>
  )
}
