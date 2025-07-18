import Container from '@/components/ui/container'
import { H1 } from '@/components/ui/typography'
import ImageGallery from '@/components/shared/ImageGallery'
import SearchBar from '@/components/shared/SearchBar'
import { getImages } from '@/lib/dal/image.dal'

export default async function Images() {
  
  const images = await getImages()
  
  return (
    <Container size="xl" className="py-8">
      <div className="space-y-5 mb-5">
        <H1>Discover</H1>
        <SearchBar basePath="/images" />
      </div>
      <ImageGallery images={images} />
    </Container>
  )
}
