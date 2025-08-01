// 'use client'
import Image from 'next/image'
import ImageCardOverlay from '@/components/shared/ImageCardOverlay'
import type { ImageDetail } from '@/lib/definitions'

export default function ImageCard({ image }: { image: ImageDetail }) {
  return (
    <div className="relative isolate w-full mb-3 bg-secondary rounded-2xl **:rounded-2xl group">
      <ImageCardOverlay image={image} />
      <Image
        src={image.previewUrl}
        alt={image.title}
        width={500}
        height={500}
        placeholder="blur"
        blurDataURL={image.blurUrl}
        className="w-full rounded-xl pointer-events-none"
      />
    </div>
  )
}
