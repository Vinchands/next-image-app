import Container from '@/components/ui/container'
import { H1, H3, P } from '@/components/ui/typography'

export default function License() {
  return (
    <Container size="lg" className="space-y-5 py-8">
      <H1>License</H1>
      
      <P>
        All photos and videos on this website are free to use. You can use them for commercial and noncommercial purposes. Attribution is not required, but always appreciated.
      </P>
      
      <H3>You are allowed to:</H3>
      <P>✔️ Use photos and videos for free in both personal and commercial projects.</P>
      <P>✔️ Modify and edit content as you like.</P>
      <P>✔️ Share or distribute the content without permission.</P>
      
      <H3>You are not allowed to:</H3>
      <P>❌ Sell unaltered copies of photos or videos (e.g. as a poster, print, or stock photo).</P>
      <P>❌ Portray identifiable people in a bad light or in a way that is offensive.</P>
      <P>❌ Redistribute the photos or videos on other stock platforms.</P>
      
      <H3>Attribution</H3>
      <P>
        Attribution is not required. However, giving credit to the photographer or the platform is encouraged as a sign of respect and to help more creators get discovered.
      </P>
      
      <H3>Disclaimer</H3>
      <P>
        While we strive to ensure that all content on this site is safe to use, we cannot guarantee that all content is free of rights. Please use responsibly.
      </P>
    </Container>
  )
}
