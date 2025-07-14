'use client'
import { useRouter } from 'next/navigation'
import { useSession } from '@/hooks/useSession'
import { Heart } from 'lucide-react'
import { useMemo, useOptimistic, useTransition } from 'react'
import { type ImageDetail } from '@/lib/definitions'
import { cn } from '@/lib/utils'
import { toggleLike } from '@/actions/image'

type LikeButtonProps = {
  image: ImageDetail
  className?: string
}

export default function LikeButton({ image, className }: LikeButtonProps) {
  
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
    <button
      className={cn('p-1 rounded-full', priorLike? 'hover:bg-white' : 'hover:bg-destructive', loading && 'pointer-events-none animate-like', className)}
      title={priorLike? 'Unlike' : 'Like'}
      onClick={handleToggle}
      disabled={loading}
    >
      <Heart className={`${priorLike? 'stroke-destructive fill-destructive' : 'stroke-white'}`} />
    </button>
  )
}
