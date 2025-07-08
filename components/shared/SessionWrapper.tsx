import { getAuthUser } from '@/lib/dal/user.dal'
import { SessionProvider } from '@/components/shared/SessionProvider'
import { toSafeUser } from '@/lib/dto/user.dto'

export default async function SessionWrapper({ children }: { children: React.ReactNode }) {
  
  const user = await getAuthUser()
  let safeUser = null
  
  if (!!user) safeUser = toSafeUser(user)
  
  return (
    <SessionProvider value={{ isAuth: !!safeUser, user: safeUser }}>
      {children}
    </SessionProvider>
  )
}
