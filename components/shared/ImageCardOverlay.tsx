'use client'
import Link from 'next/link'
import LikeButton from '@/components/shared/LikeButton'
import DownloadButton from '@/components/shared/DownloadButton'
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar'
import { Button } from '@/components/ui/button'
import { Heart, Download } from 'lucide-react'
import { useRouter } from 'next/navigation'
import { type ImageDetail } from '@/lib/definitions'
import profile from '@/public/user.png'
import { getInitials } from '@/lib/utils'

export default function ImageCardOverlay({ image }: { image: ImageDetail }) {
  
  const router = useRouter()
  
  function handleClick() {
    if (!image.user) return
    router.push(`/profile/${image.user.username}`)
  }
  
  return (
    <div className="absolute inset-0 md:hover:bg-black/25 transition-all ease-in duration-100 group">
      <Link href={`/images/${image.id}`} className="absolute inset-0" />
      <LikeButton
        image={image}
        variant="ghost"
        size="icon"
        className={() => 'absolute top-2 right-2 z-10 size-8 max-sm:hidden opacity-0 group-hover:opacity-100 rounded-full'}
      >
        {liked => (
          <Heart className={`size-6 ${liked? 'stroke-destructive fill-destructive' : 'stroke-white'}`} />
        )}
      </LikeButton>
      <DownloadButton
        image={image}
        variant="ghost"
        className="absolute bottom-2 right-2 z-10 size-8 max-sm:hidden opacity-0 group-hover:opacity-100 rounded-full hover:bg-primary"
      >
        <Download className="size-6 stroke-white" />
      </DownloadButton>
      <Button
        variant="ghost"
        className="absolute bottom-2 left-2 z-10 max-sm:hidden opacity-0 group-hover:opacity-100 p-1 text-white"
        onClick={handleClick}
      >
        <Avatar>
          <AvatarImage src={image.user?.photoUrl || profile.src} />
          <AvatarFallback>{getInitials(image.user?.name || 'NN')}</AvatarFallback>
        </Avatar>
        {image.user?.name}
      </Button>
    </div>
  )
}
