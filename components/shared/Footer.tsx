import Image from 'next/image'
import Link from 'next/link'
import { Separator } from '@/components/ui/separator'
import { links } from '@/lib/data'
import gmail from '@/public/socials/gmail.svg'
import facebook from '@/public/socials/facebook.svg'
import instagram from '@/public/socials/instagram.svg'
import x from '@/public/socials/x.svg'
import github from '@/public/socials/github.svg'

const socials = [
  {
    name: 'Gmail',
    href: 'mailto:kevinchandra031@gmail.com',
    logo: gmail
  },
  {
    name: 'Facebook',
    href: 'https://www.facebook.com/profile.php?id=100089467666586',
    logo: facebook
  },
  {
    name: 'Instagram',
    href: 'https://instagram.com/Vinchands',
    logo: instagram
  },
  {
    name: 'X',
    href: 'https://x.com/Vinchands',
    logo: x
  },
  {
    name: 'GitHub',
    href: 'https://github.com/Vinchands',
    logo: github
  },
]

const year = new Date().getFullYear()

export default function Footer() {
  return (
    <footer className="flex flex-col px-5 bg-card border">
      <div className="grid grid-cols-1 sm:grid-cols-3 md:grid-cols-4 gap-5 py-5">
        <div className="col-span-full md:col-span-1">
          <p className="max-w-64 font-bold text-xl">Free and open source images for everyone.</p>
        </div>
        <nav className="flex flex-col gap-y-2 *:w-fit *:not-[h5]:hover:underline text-muted-foreground">
          <h5 className="font-bold text-primary">Main</h5>
          {links.main.map(link => (
            <Link key={link.name} href={link.href}>
              {link.name}
            </Link>
          ))}
        </nav>
        <nav className="flex flex-col gap-y-2 *:w-fit *:not-[h5]:hover:underline text-muted-foreground">
          <h5 className="font-bold text-primary">Legal</h5>
          {links.legal.map(link => (
            <Link key={link.name} href={link.href}>
              {link.name}
            </Link>
          ))}
        </nav>
        <nav className="flex flex-col gap-y-2 *:w-fit *:not-[h5]:hover:underline text-muted-foreground">
          <h5 className="font-bold text-primary">Misc</h5>
          {links.misc.map(link => (
            <Link key={link.name} href={link.href}>
              {link.name}
            </Link>
          ))}
        </nav>
      </div>
      <Separator />
      <div className="flex flex-col-reverse sm:flex-row items-center justify-between gap-3 py-5">
        <p className="text-muted-foreground">
          &copy; {year === 2025? '2025' : `2025-${year}`} Kevin CS
        </p>
        <div className="flex items-center gap-x-3">
          {socials.map(social => (
            <Link key={social.name} href={social.href} target="_blank" title={social.name}>
              <Image src={social.logo} alt={social.name} />
            </Link>
          ))}
        </div>
      </div>
    </footer>
  )
}
