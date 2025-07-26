import Container from '@/components/ui/container'
import { H1 } from '@/components/ui/typography'
import { getAuthUser } from '@/lib/dal/user.dal'
import { toSafeUser } from '@/lib/dto/user.dto'
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Profile'
}

export default async function Profile() {
  
  const user = await getAuthUser()
  const safeUser = toSafeUser(user!)
  
  return (
    <Container className="py-8">
      <H1>Profile</H1>
      {safeUser?.name}
    </Container>
  )
}
