import Container from '@/components/ui/container'
import ImageGallery from '@/components/shared/ImageGallery'
import { H1 } from '@/components/ui/typography'
import { getUserImages } from '@/lib/dal/image.dal'
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'My Gallery'
}

export default async function Me() {
  
  const images = await getUserImages()
  
  return (
    <Container className="py-8">
      <H1 className="mb-5">My Gallery</H1>
      <ImageGallery images={images} />
    </Container>
  )
}
