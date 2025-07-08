import { getAuthUser } from '@/lib/dal/user.dal'
import { toSafeUser } from '@/lib/dto/user.dto'

export default async function Profile() {
  
  const user = await getAuthUser()
  const safeUser = toSafeUser(user!)
  
  return (
    <>
      {safeUser?.name}
    </>
  )
}
