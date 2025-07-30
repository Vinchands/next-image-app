import { redirect } from 'next/navigation'
import { getAuthUser } from '@/lib/dal/user.dal'

export default async function Profile() {
  
  const user = await getAuthUser()
  
  if (!user) return redirect('/')
  redirect(`/profile/${user.username}`)
}
