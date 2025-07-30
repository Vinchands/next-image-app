import Image from 'next/image'
import Container from '@/components/ui/container'
import TextLink from '@/components/ui/TextLink'
import { H1, Lead } from '@/components/ui/typography'
import image from '@/public/404.svg'

export default function NotFound() {
  return (
    <Container size="lg" className="h-[75vh] max-h-[640px]" centered>
      <section className="flex flex-col-reverse md:flex-row items-center gap-5">
        <article className="space-y-2 text-center md:text-left">
          <H1>Oops!</H1>
          <Lead>The page you are looking for is not found in our system. Do you need some help?</Lead>
          <ul className="flex flex-wrap justify-center md:justify-start items-center gap-5 mt-5">
            <li>
              <TextLink href="/">Back to home page</TextLink>
            </li>
            <li>
              <TextLink href="/profile">Go to my profile</TextLink>
            </li>
            <li>
              <TextLink href="/upload">Upload image</TextLink>
            </li>
          </ul>
        </article>
        <Image src={image} alt="Not Found" width={320} />
      </section>
    </Container>
  )
}
