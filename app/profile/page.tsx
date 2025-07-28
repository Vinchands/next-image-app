import Link from 'next/link'
import Image from 'next/image'
import Container from '@/components/ui/container'
import { Button } from '@/components/ui/button'
import { getAuthUser } from '@/lib/dal/user.dal'
import { toSafeUser } from '@/lib/dto/user.dto'
import { Metadata } from 'next'
import { Edit } from 'lucide-react'
import profile from '@/public/user.png'

export const metadata: Metadata = {
  title: 'Profile'
}

export default async function Profile() {
  
  const authUser = await getAuthUser()
  const user = toSafeUser(authUser!)
  
  return (
    <Container className="py-8 space-y-6">
      <section className="flex flex-col items-center gap-y-1 p-5">
        <Image src={user?.photoUrl || profile} alt="Profile photo" className="w-36 rounded-full aspect-square" />
        <h3 className="font-bold text-3xl">{user.name}</h3>
        <p className="mb-5 text-muted-foreground">{user.email}</p>
        <Button asChild>
          <Link href="/profile/edit">
            <Edit /> Edit Profile
          </Link>
        </Button>
      </section>
    </Container>
  )
}
