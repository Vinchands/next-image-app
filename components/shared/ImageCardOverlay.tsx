'use client'
import LikeButton from '@/components/ui/LikeButton'
import DownloadButton from '@/components/shared/DownloadButton'
import AuthComponent from '@/components/ui/AuthComponent'
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar'
import { getInitials } from '@/lib/utils'
import { ImageDetail } from '@/lib/definitions'
import icon from '@/public/user.png'

export default function ImageCardOverlay({ image }: { image: ImageDetail }) {
  return (
    <div className="absolute inset-0 flex flex-col opacity-0 p-3 group-hover:opacity-100 transition-all ease-in duration-100 bg-black/30 text-white">
      <div className="flex items-center gap-x-2">
        <AuthComponent
          onAuth={() => <LikeButton className="ml-auto" image={image} />}
          fallback={null}
        />
      </div>
      <div className="flex items-center gap-x-2 mt-auto">
        <Avatar>
          <AvatarImage src={image?.user?.photoUrl || icon.src} />
          <AvatarFallback>{getInitials(image?.user?.name || 'NN')}</AvatarFallback>
        </Avatar>
        <p className="max-w-[100px] truncate">{image?.user?.name || 'No user'}</p>
        <DownloadButton className="ml-auto" />
      </div>
    </div>
  )
}
