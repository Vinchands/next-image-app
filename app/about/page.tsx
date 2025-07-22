import Container from '@/components/ui/container'
import { H1, H2, P } from '@/components/ui/typography'
import { Button } from '@/components/ui/button'
import Link from 'next/link'
import Hero from './Hero'
import { ArrowRight, HandHeart } from 'lucide-react'
import Image from 'next/image'

export default function About() {
  return (
    <>
      <Hero />
      <Container size="lg" className="space-y-6 py-8">
        <H1>About Us</H1>
        <P>
          Imagenation is an image sharing platform mainly inspired by{' '}
          <Button variant="link" className="p-0 text-base" asChild>
            <Link href="https://www.pexels.com" target="_blank">Pexels</Link>
          </Button>
          {' '}and{' '}
          <Button variant="link" className="p-0 text-base" asChild>
            <Link href="https://unsplash.com" target="_blank">Unsplash</Link>
          </Button>
          , two of the biggest image sharing platforms in the world.
        </P>
        
        <H2>Goals 🎯</H2>
        <P>
          Our goal is to make a simple image sharing platform where you can find images for free with no need for attribution or subscription.
          However, giving attribution to the platform or the creators is highly appreciated.
        </P>
        
        <H2>Open Source 📖</H2>
        <P>
          This project is available as open source.
          Everyone is welcome to contribute, report issues, request a feature, or send a feedback.
          You can click{' '}
          <Button variant="link" className="p-0 text-base" asChild>
            <Link href="https://github.com/Vinchands/next-image-app" target="_blank">here</Link>
          </Button>
          {' '} for the source code.
        </P>
        
        <H2>Team Behind 🧑🏻‍💻</H2>
        <P>
          To be honest, this site is created alone by myself, Kevin. I developed this site as one of my portofolio projects. You can know more about me and my social media on my{' '}
          <Button variant="link" className="p-0 text-base" asChild>
            <Link href="https://github.com/Vinchands" target="_blank">GitHub</Link>
          </Button>
          .
        </P>
        
        <H2>Contribute 📸</H2>
        <P>
          You can contribute to this site by uploading your images or giving any form of appreciation to keep this platform alive. Thank you so much! ❤️
        </P>
        
        <div className="inline-flex flex-col gap-y-2">
          <Button size="lg" asChild>
            <Link href="/upload">
              Upload now <ArrowRight />
            </Link>
          </Button>
          <Button variant="ghost" size="lg" className="p-0" asChild>
            <a href="https://trakteer.id/vinchands-id/tip" target="_blank">
              <Image
                id="wse-buttons-preview"
                src="https://edge-cdn.trakteer.id/images/embed/trbtn-red-1.png?v=14-05-2025"
                alt="Trakteer Button"
                width={100}
                height={50}
                style={{
                  border: 0,
                  width: 'auto',
                  height: '3rem'
                }}
                className="animate-pulse hover:animate-none"
              />
            </a>
          </Button>
        </div>
      </Container>
    </>
  )
}
