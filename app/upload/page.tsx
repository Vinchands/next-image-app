import Container from '@/components/ui/container'
import UploadForm from './UploadForm'
import TextLink from '@/components/ui/TextLink'
import { H1, Lead } from '@/components/ui/typography'
import { CheckCircle } from 'lucide-react'
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Upload'
}

const rules = [
  'Original content only',
  'Respect the copyright of others',
  'No explicit or offensive content',
  'Keep the file size reasonable',
  'Appropriate titles and descriptions',
  <>
    <span>
      Read our <TextLink href="/tos">Terms of Service</TextLink>
    </span>
  </>
]

export default function Upload() {
  return (
    <Container className="py-8 space-y-6">
      <H1 className="mb-0">Share</H1>
      <Lead>Get ready to share your image to the world and inspire them.</Lead>
      <UploadForm />
      <ul className="w-full max-w-lg sm:max-w-2xl md:max-w-6xl grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3 mx-auto mt-12 text-sm text-muted-foreground">
        {
          rules.map((rule, index) => (
            <li key={index} className="flex items-center gap-x-2">
              <CheckCircle size={16} className="stroke-primary" />
              {rule}
            </li>
          ))
        }
      </ul>
    </Container>
  )
}
