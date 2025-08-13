import Image from 'next/image'
import Container from '@/components/ui/container'
import { H2 } from '@/components/ui/typography'
import { notFound } from 'next/navigation'
import { getImageBySlug } from '@/lib/dal/image.dal'

export default async function ImageDetail({ params }: { params: Promise<{ slug: string }> }) {
  
  const { slug } = await params
  const image = await getImageBySlug(slug)
  
  if (!image) notFound()
  
  return (
    <Container className="py-8">
      <section className="relative max-w-2xl space-y-3 p-5 mx-auto">
        <Image
          src={image.previewUrl}
          alt={image.title}
          width={500}
          height={500}
          className="w-full"
        />
        <div className="text-center">
          <H2>{image.title}</H2>
          <p className="text-muted-foreground">{image.description}</p>
        </div>
      </section>
    </Container>
  )
}
