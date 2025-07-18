import Container from '@/components/ui/container'
import { H1, P } from '@/components/ui/typography'
import ReportForm from './ReportForm'
import bg from '@/public/office.png'

export default function Report() {
  return (
    <>
      <Container size="lg" className="space-y-6 py-8">
        <H1>Report Issue</H1>
        <P>
          Got problems? Quickly report us and help improve our service!
          Just describe what issue you might encounter and we will directly contact you for further information.
        </P>
      </Container>
      <div
        style={{
          backgroundImage: `linear-gradient(rgba(0, 0, 0, .3), rgba(0, 0, 0, .3)), url(${bg.src})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundAttachment: 'fixed'
        }}
        className="h-[80vh] max-h-[640px] flex items-center justify-center p-3"
      >
        <ReportForm />        
      </div>
    </>
  )
}
