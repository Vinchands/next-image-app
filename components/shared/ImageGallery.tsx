import Image from 'next/image'
import RenderList from '@/components/ui/RenderList'
import { type Image as ImageType } from '@prisma/client'

type ImageGalleryProps = {
  images: ImageType[]
  limit?: number
  
}

export default function ImageGallery({ images }: ImageGalleryProps) {
  return (
    <section className="columns-2 md:columns-3 gap-3">
      <RenderList
        items={images}
        getKey={image => image.id}
        renderItem={image => (
          <div className="relative w-full h-64 mb-3 bg-secondary rounded-2xl">
            <Image
              src={image.url}
              alt={image.title}
              sizes="(max-width: 768px) 100vw, 33vw"
              className="rounded-2xl object-cover"
              fill
            />
          </div>
        )}
      />
    </section>
  )
}
