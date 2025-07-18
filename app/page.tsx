import Hero from './Hero'
import ExploreHeader from './ExploreHeader'
import Container from '@/components/ui/container'
import ImageGallery from '@/components/shared/ImageGallery'
import { getImages } from '@/lib/dal/image.dal'
import { ImageDetail } from '@/lib/definitions'
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Home',
}

export default async function Home({ searchParams }: { searchParams: Promise<{ [key: string]: string | string[] | undefined }> }) {
  
  const { sort } = await searchParams
  let images: ImageDetail[] = []
  
  if (sort === 'latest') {
    images = await getImages({
      orderBy: { updatedAt: 'desc' }
    })
  } else {
    images = await getImages({
      orderBy: {
        likes: { _count: 'desc' }
      }
    })
  }
  
  return (
    <>
      <Hero />
      <Container className="py-5">
        <ExploreHeader />
        <ImageGallery images={images} />
      </Container>
    </>
  )
}
