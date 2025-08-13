'use client'
import Link from 'next/link'
import LikeButton from '@/components/shared/LikeButton'
import DownloadButton from '@/components/shared/DownloadButton'
import AuthComponent from '@/components/ui/AuthComponent'
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar'
import { Button } from '@/components/ui/button'
import { Heart, Download } from 'lucide-react'
import { type ImageDetail } from '@/lib/definitions'
import profile from '@/public/user.png'
import { getInitials } from '@/lib/utils'

export default function ImageCardOverlay({ image }: { image: ImageDetail }) {
  return (
    <div className="absolute inset-0 md:hover:bg-black/25 transition-all ease-in duration-100 group">
      <Link href={`/images/${image.slug}`} className="absolute inset-0" />
      <AuthComponent
        onAuth={() => (
          <LikeButton
            image={image}
            variant="ghost"
            size="icon"
            className={() => 'absolute top-1 md:top-2 right-1 md:right-2 z-10 size-8 max-md:hidden opacity-0 group-hover:opacity-100 rounded-full'}
          >
            {liked => (
              <Heart className={`size-6 ${liked? 'stroke-destructive fill-destructive' : 'stroke-white'}`} />
            )}
          </LikeButton>
        )}
      />
      <DownloadButton
        image={image}
        variant="ghost"
        className="absolute bottom-1 md:bottom-2 right-1 md:right-2 z-10 size-8 opacity-100 md:opacity-0 group-hover:opacity-100 rounded-full hover:bg-primary"
      >
        <Download className="size-6 stroke-white" />
      </DownloadButton>
      {
        image.user &&
        <Button
          variant="ghost"
          className="absolute bottom-1 md:bottom-2 left-1 md:left-2 z-10 max-md:hidden opacity-0 group-hover:opacity-100 p-1 text-white rounded-full"
          asChild
        >
          <Link href={`/profile/${image.user.username}`}>
            <Avatar>
              <AvatarImage src={image.user.photoUrl || profile.src} />
              <AvatarFallback>{getInitials(image.user.name)}</AvatarFallback>
            </Avatar>
            <span className="max-w-32 truncate">{image.user.name}</span>
          </Link>
        </Button>
      }
    </div>
  )
}
