import Container from '@/components/ui/container'
import { H2 } from '@/components/ui/typography'
import ImageGallery from '@/components/shared/ImageGallery'
import Hero from './Hero'
import prisma from '@/lib/prisma'

export default async function Home() {
  
  const images = await prisma.image.findMany()
  
  return (
    <>
      <Hero />
      <Container size="xl" className="py-5">
        <section className="flex items-center justify-between gap-x-3 mb-5">
          <H2>Explore</H2>
          <p className="text-sm text-muted-foreground">
            Browse through our collection of free and open source images.
          </p>
        </section>
        <ImageGallery images={images} />
      </Container>
    </>
  )
}
