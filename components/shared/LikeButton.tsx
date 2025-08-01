'use client'
import { Button } from '@/components/ui/button'
import { useRouter } from 'next/navigation'
import { useSession } from '@/hooks/useSession'
import { useMemo, useOptimistic, useTransition } from 'react'
import { cn } from '@/lib/utils'
import { toggleLike } from '@/actions/image'
import { type ImageDetail } from '@/lib/definitions'

type LikeButtonProps = {
  image: ImageDetail
  variant?: 'default' | 'link' | 'destructive' | 'outline' | 'secondary' | 'ghost'
  size?: 'default' | 'sm' | 'lg' | 'icon'
  className?: (liked?: boolean) => string
  children: (liked?: boolean) => React.ReactNode
}

export default function LikeButton({ image, variant, size, className, children }: LikeButtonProps) {
  
  const { user } = useSession()
  
  const router = useRouter()
  
  const isLiked = useMemo(() => {
    return user? image.likes.some(like => like.userId === user.id) : false
  }, [image.likes, user])
  
  // Optimistic UI states
  const [loading, startTransition] = useTransition()
  const [optimisticLike, addOptimisticLike] = useOptimistic<boolean>(isLiked)
  const priorLike = optimisticLike ?? isLiked
  
  function handleToggle() {
    if (!user) return
    
    startTransition(async () => {
      addOptimisticLike(prev => !prev)
      await toggleLike(user.id, image.id)
      router.refresh()
    })
  }
  
  return (
    <Button
      variant={variant}
      size={size}
      className={cn(priorLike? 'hover:bg-white' : 'hover:bg-destructive', loading && 'pointer-events-none animate-like', className && className(priorLike))}
      title={priorLike? 'Unlike' : 'Like'}
      onClick={handleToggle}
      disabled={loading}
    >
      {children(priorLike)}
    </Button>
  )
}
