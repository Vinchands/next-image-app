'use client'
import Link from 'next/link'
import LikeButton from '@/components/ui/LikeButton'
import DownloadButton from '@/components/shared/DownloadButton'
import AuthComponent from '@/components/ui/AuthComponent'
import { Button } from '@/components/ui/button'
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar'
import { getInitials } from '@/lib/utils'
import { ImageDetail } from '@/lib/definitions'
import icon from '@/public/user.png'

export default function ImageCardOverlay({ image }: { image: ImageDetail }) {
  return (
    <div className="absolute inset-0 flex flex-col opacity-0 p-3 group-hover:opacity-100 transition-all ease-in duration-100 bg-black/30 text-white">
      <Link href={`/images/${image.id}`} className="absolute z-0 inset-0" />
      <AuthComponent
        onAuth={() => <LikeButton className="absolute top-3 right-3" image={image} />}
        fallback={null}
      />
      <Button variant="ghost" className="absolute bottom-3 left-3 flex items-center gap-x-2 px-1" asChild>
        <Link href={`/users/${image.userId}`}>
          <Avatar>
            <AvatarImage src={image?.user?.photoUrl || icon.src} />
            <AvatarFallback>{getInitials(image?.user?.name || 'NN')}</AvatarFallback>
          </Avatar>
          <p className="max-w-[100px] truncate">{image?.user?.name || 'No user'}</p>
        </Link>
      </Button>
      <DownloadButton className="absolute bottom-3 right-3" />
    </div>
  )
}
