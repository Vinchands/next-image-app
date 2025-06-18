import { useSession } from '@/hooks/useSession'
import { SafeUser } from '@/lib/definitions'

type AuthComponentProps = {
  onAuth: (user: SafeUser) => React.ReactNode
  fallback: React.ReactNode
}

export default function AuthComponent({ onAuth, fallback }: AuthComponentProps) {
  
  const { isAuth, user } = useSession()
  
  if (isAuth) return onAuth(user!)
  else return fallback
}
