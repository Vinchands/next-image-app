'use client'
import Link from 'next/link'
import AuthComponent from '@/components/ui/AuthComponent'
import UserAvatar from '@/components/ui/UserAvatar'
import { Button } from '@/components/ui/button'
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuSeparator
} from '@/components/ui/dropdown-menu'
import { usePathname } from 'next/navigation'
import { useCallback } from 'react'
import { Ellipsis } from 'lucide-react'

const links = [
  {
    name: 'Home',
    alias: 'Home',
    href: '/',
  },
  {
    name: 'Images',
    alias: 'Images',
    href: '/images',
  },
  {
    name: 'License',
    alias: 'License',
    href: '/license',
  },
]

export default function MainNavigation() {
  
  const path = usePathname()
  
  const isActive = useCallback((href: string) => {
    return path === href
  }, [path])
  
  return (
    <nav className="flex items-center gap-x-3">
      {
        links.map(link => (
          <Link
            key={link.name}
            href={link.href}
            className={`max-md:not-[:nth-child(2)]:hidden ${isActive(link.href)? 'font-bold pointer-events-none' : 'font-medium'} hover:font-bold`}
          >
            {link.name}
          </Link>
        ))
      }
      <AuthComponent
        onAuth={user => (
          <>
            <Button asChild>
              <Link href="/upload">Upload</Link>
            </Button>
            <UserAvatar user={user} />
          </>
        )}
        fallback={
          <>
            <Link
              href="/sign-in"
              className={`${isActive('/sign-in')? 'font-bold' : 'font-medium'} hover:font-bold`}
            >
              Sign in
            </Link>
            <Button asChild>
              <Link href="/sign-up">Join Us</Link>
            </Button>
          </>
        }
      />
      <DropdownMenu>
        <DropdownMenuTrigger className="md:hidden">
          <Ellipsis />
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          <DropdownMenuLabel className="font-bold">Menu</DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuGroup>
            {
              links.map(link => (
                <DropdownMenuItem key={link.name} asChild>
                  <Link href={link.href}>{link.name}</Link>
                </DropdownMenuItem>
              ))
            }
          </DropdownMenuGroup>
        </DropdownMenuContent>
      </DropdownMenu>
    </nav>
  )
}
