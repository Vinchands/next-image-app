import Link from 'next/link'
import RenderList from '@/components/ui/RenderList'
import ImageCard from '@/components/shared/ImageCard'
import { Button } from '@/components/ui/button'
import { H3 } from '@/components/ui/typography'
import type { ImageDetail } from '@/lib/definitions'

type ImageGalleryProps = {
  images: ImageDetail[]
  limit?: number
}

export default function ImageGallery({ images }: ImageGalleryProps) {
  
  if (!images.length) {
    return (
      <section className="p-5 text-center border rounded-2xl">
        <H3 className="mb-3 rounded-2xl">There are no images yet ☹️</H3>
        <p className="text-muted-foreground">
          Share your own or{' '}
          <Button variant="link" className="p-0 text-base" asChild>
            <Link href="/report">contact us</Link>
          </Button>
          {' '}if there is a problem.
        </p>
      </section>
    )
  }
  
  return (
    <section className="columns-2 md:columns-3 gap-3">
      <RenderList
        items={images}
        getKey={image => image.id}
        renderItem={image => <ImageCard image={image} />}
      />
    </section>
  )
}
