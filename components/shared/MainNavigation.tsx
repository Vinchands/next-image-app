'use client'
import Link from 'next/link'
import AuthComponent from '@/components/ui/AuthComponent'
import UserAvatar from '@/components/shared/UserAvatar'
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
    name: 'Discover',
    alias: 'Discover',
    href: '/images',
  },
  {
    name: 'License',
    alias: 'License',
    href: '/license',
  },
  {
    name: 'Report Issue',
    alias: 'Report',
    href: '/report',
  },
  {
    name: 'About Us',
    alias: 'About',
    href: '/about',
  },
  {
    name: 'Terms of Service',
    alias: 'Terms',
    href: '/terms',
  }
]

export default function MainNavigation() {
  
  const path = usePathname()
  
  const isActive = useCallback((href: string) => {
    return path === href
  }, [path])
  
  return (
    <nav className="flex items-center gap-x-3">
      {
        links.slice(0, 2).map(link => (
          <Link
            key={link.name}
            href={link.href}
            className={`max-sm:not-first:hidden ${isActive(link.href)? 'font-bold pointer-events-none' : 'font-medium'} hover:font-bold`}
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
          <Button
            variant={isActive('/sign-up')? 'secondary' : 'default'}
            className={isActive('/sign-up')? 'pointer-events-none' : 'pointer-events-auto'}
            asChild
          >
            <Link href="/sign-up">Join Us</Link>
          </Button>
        }
      />
      <DropdownMenu>
        <DropdownMenuTrigger>
          <Ellipsis />
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          <DropdownMenuLabel className="font-bold">Menu</DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuGroup>
            <AuthComponent
              onAuth={user => (
                <>
                  <DropdownMenuItem asChild>
                    <Link href="/images/me">My Images</Link>
                  </DropdownMenuItem>
                </>
              )}
              fallback={
                <>
                  <DropdownMenuItem asChild>
                    <Link href="/sign-in">Sign in</Link>
                  </DropdownMenuItem>
                </>
              }
            />
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
