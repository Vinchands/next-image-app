'use client'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { usePathname } from 'next/navigation'
import { useCallback } from 'react'

export default function Navbar() {
  
  const path = usePathname()
  
  const isActive = useCallback((href: string) => {
    return path === href
  }, [path])
  
  return (
    <header className="sticky top-0 flex items-center justify-between md:justify-around p-3 bg-card shadow">
      <div className="flex items-center gap-x-2">
        <span className="font-bold text-2xl">imagenation</span>
      </div>
      <nav className="flex items-center gap-x-3">
        <Link href="/">
          Home
        </Link>
        <Link href="/images">
          Images
        </Link>
        <Link href="/sign-in">
          Sign In
        </Link>
        <Button asChild>
          <Link href="/sign-up">Join Us</Link>
        </Button>
      </nav>
    </header>
  )
}
