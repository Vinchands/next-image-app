// import Link from 'next/link'
import Image from 'next/image'
import Container from '@/components/ui/container'
import { getUser } from '@/lib/dal/user.dal'
import { Metadata, ResolvingMetadata } from 'next'
import profile from '@/public/user.png'
import { notFound } from 'next/navigation'

type ProfileParams = {
  params: Promise<{ username: string }>
}

export async function generateMetadata({ params }: ProfileParams, parent: ResolvingMetadata): Promise<Metadata> {
  const { username } = await params
  
  const user = await getUser({
    where: { username }
  })
  
  return {
    title: `Profile | ${user?.name}`,
    description: `${user?.name}'s profile page`
  }
}

export default async function Profile({ params }: { params: Promise<{ username: string }> }) {
  
  const { username } = await params
  const user = await getUser({
    where: { username },
    include: {
      images: true,
      likes: true
    }
  })
  
  if (!user) notFound()
  
  return (
    <Container className="py-8 space-y-6">
      <section className="flex flex-col items-center gap-y-1 p-5">
        <Image src={user?.photoUrl || profile} alt="Profile photo" className="w-36 rounded-full aspect-square" />
        <h3 className="font-bold text-3xl">{user?.name}</h3>
        <p className="mb-5 text-center text-muted-foreground">{user?.bio}</p>
      </section>
    </Container>
  )
}
