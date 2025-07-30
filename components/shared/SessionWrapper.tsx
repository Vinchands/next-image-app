import { getAuthUser } from '@/lib/dal/user.dal'
import { SessionProvider } from '@/components/shared/SessionProvider'

export default async function SessionWrapper({ children }: { children: React.ReactNode }) {
  
  const user = await getAuthUser()
  
  return (
    <SessionProvider value={{ isAuth: !!user, user }}>
      {children}
    </SessionProvider>
  )
}
