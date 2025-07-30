import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'
import React from 'react'

type TextLinkProps = React.AnchorHTMLAttributes<HTMLAnchorElement> & {
  href: string
  children: React.ReactNode
  className?: string
}

export default function TextLink({ href, children, className, ...props }: TextLinkProps) {
  return (
    <Button variant="link" className={cn('h-fit p-0 m-0', className)} asChild>
      <Link href={href} {...props}>
        {children}
      </Link>
    </Button>
  )
}
