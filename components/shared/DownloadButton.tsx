'use client'
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'
import { type ImageDetail } from '@/lib/definitions'
import { getDownloadUrl } from '@vercel/blob'
import { useRouter } from 'next/navigation'

type DownloadButtonProps = {
  image: ImageDetail
  variant?: 'default' | 'link' | 'destructive' | 'outline' | 'secondary' | 'ghost'
  size?: 'default' | 'sm' | 'lg' | 'icon'
  className?: string
  children: React.ReactNode
}

export default function DownloadButton({ image, variant, size, className, children }: DownloadButtonProps) {
  
  const router = useRouter()
  
  function handleClick() {
    const url = getDownloadUrl(image.downloadUrl)
    router.push(url)
  }
  
  return (
    <Button
      variant={variant}
      size={size}
      className={cn('', className)}
      title="Download"
      onClick={handleClick}
    >
      {children}
    </Button>
  )
}
