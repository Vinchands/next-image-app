import Hero from './Hero'
import ExploreHeader from './ExploreHeader'
import Container from '@/components/ui/container'
import ImageGallery from '@/components/shared/ImageGallery'
import { getImages } from '@/lib/dal/image.dal'

export default async function Home({ searchParams }: { searchParams: Promise<{ [key: string]: string | string[] | undefined }> }) {
  
  const params = await searchParams
  let images = []
  
  if (params.sort === 'popular') {
    images = await getImages({
      include: {
        _count: {
          select: { likes: true }
        }
      },
      orderBy: {
        likes: { _count: 'desc' }
      }
    })
  } else {
    images = await getImages()
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
