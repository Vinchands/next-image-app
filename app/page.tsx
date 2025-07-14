import Hero from './Hero'
import ExploreHeader from './ExploreHeader'
import Container from '@/components/ui/container'
import ImageGallery from '@/components/shared/ImageGallery'
import { getImagesWithDetail } from '@/lib/dal/image.dal'
import { ImageDetail } from '@/lib/definitions'

export default async function Home({ searchParams }: { searchParams: Promise<{ [key: string]: string | string[] | undefined }> }) {
  
  const params = await searchParams
  let images: ImageDetail[] = []
  
  if (params.sort === 'latest') {
    images = await getImagesWithDetail({
      orderBy: { updatedAt: 'desc' }
    })
  } else {
    images = await getImagesWithDetail({
      orderBy: {
        likes: { _count: 'desc' }
      }
    })
  }
  
  return (
    <>
      <Hero />
      <Container size="xl" className="py-5">
        <ExploreHeader />
        <ImageGallery images={images} />
      </Container>
    </>
  )
}
