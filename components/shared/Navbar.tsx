import Link from 'next/link'
import Image from 'next/image'
import MainNavigation from '@/components/shared/MainNavigation'
import logo from '@/public/logo.svg'

export default function Navbar() {
  
  return (
    <header className="sticky top-0 z-50 flex items-center justify-between md:justify-around p-3 bg-card shadow">
      <Link href="/" className="flex items-center gap-x-2">
        <Image src={logo} alt="imagenation" className="w-8" />
        <span className="hidden sm:inline font-bold text-2xl">imagenation</span>
      </Link>
      <MainNavigation />
    </header>
  )
}
