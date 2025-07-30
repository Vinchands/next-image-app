import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'

type TextLinkProps = {
  href: string
  children: React.ReactNode
  className?: string
  
}

export default function TextLink({ href, children, className }: TextLinkProps) {
  return (
    <Button variant="link" className={cn('h-fit p-0 m-0', className)} asChild>
      <Link href={href}>
        {children}
      </Link>
    </Button>
  )
}
