'use client'
import { Button } from '@/components/ui/button'
import { type ImageDetail } from '@/lib/definitions'
import { cn } from '@/lib/utils'
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
    router.push(image.downloadUrl)
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
