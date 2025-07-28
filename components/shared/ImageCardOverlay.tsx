'use client'
import Link from 'next/link'
import LikeButton from '@/components/shared/LikeButton'
import DownloadButton from '@/components/shared/DownloadButton'
import AuthComponent from '@/components/ui/AuthComponent'
import { useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar'
import { getInitials } from '@/lib/utils'
import { ImageDetail } from '@/lib/definitions'
import icon from '@/public/user.png'

export default function ImageCardOverlay({ image }: { image: ImageDetail }) {
  
  const router = useRouter()
  
  function handleClick() {
    if (!image.user) return
    router.push(`/users/${image.user.id}`)
  }
  
  return (
    <div className="absolute inset-0 flex flex-col opacity-0 p-3 group-hover:opacity-100 transition-all ease-in duration-100 bg-black/25 text-white">
      <Link href={`/images/${image.id}`} className="absolute z-0 inset-0" />
      <AuthComponent
        onAuth={() => <LikeButton className="hidden md:inline absolute top-3 right-3" image={image} />}
        fallback={null}
      />
      <Button
        variant="ghost"
        className="absolute bottom-3 left-3 hidden md:inline-flex items-center gap-x-2 px-1"
        onClick={handleClick}
      >
        <Avatar>
          <AvatarImage src={image?.user?.photoUrl || icon.src} />
          <AvatarFallback>{getInitials(image?.user?.name || 'NN')}</AvatarFallback>
        </Avatar>
        <p className="max-w-[100px] truncate">{image?.user?.name || 'No user'}</p>
      </Button>
      <DownloadButton className="absolute bottom-3 right-3 hidden md:inline" />
    </div>
  )
}
