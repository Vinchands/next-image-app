'use client'
import { cn } from '@/lib/utils'
import ActionAlert from '@/components/shared/ActionAlert'
import { Button } from '@/components/ui/button'
import { signout } from '@/actions/auth'

type SignoutButtonProps = {
  children: React.ReactNode
  className?: string
}

export default function SignoutButton({ children, className }: SignoutButtonProps) {
  return (
    <ActionAlert
      title="Are you sure?"
      renderTrigger={
        <button className={cn('text-destructive', className)}>{children}</button>
      }
      renderAction={
        <Button
          variant="destructive"
          onClick={async () => await signout()}
        >
          Yes
        </Button>
      }
    />
  )
}
