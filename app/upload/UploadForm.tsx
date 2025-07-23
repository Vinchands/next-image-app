'use client'
import { Label } from '@/components/ui/label'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import ImageDropzone from './ImageDropzone'
import { useActionState, useState } from 'react'
import { LoaderCircle } from 'lucide-react'
import { uploadImage } from '@/actions/image'

export default function UploadForm() {
  
  const [state, action, loading] = useActionState(uploadImage, undefined)
  const [isFileAccepted, setIsFileAccepted] = useState(false)
  const [title, setTitle] = useState('')
  
  function handleFileAccepted(file: File) {
    setIsFileAccepted(!!file)
  }
  
  return (
    <form action={action} className="grid grid-cols-1 md:grid-cols-2 items-center gap-3">
      <div className={isFileAccepted? '' : 'col-span-full'}>
        <ImageDropzone onFileAccepted={handleFileAccepted} required />        
      </div>
      <div className={`${isFileAccepted? 'block' : 'hidden'} space-y-6 p-5 bg-secondary rounded-2xl`}>
        <div className="space-y-2">
          <Label>Title</Label>
          <Input
            name="title"
            className="bg-white"
            placeholder="A Beautiful Image"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
        </div>
        <div className="space-y-2">
          <Label>Title</Label>
          <Input
            name="title"
            className="bg-white"
            placeholder="A Beautiful Image"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
        </div>
        <Button type="submit">
          {
            loading? (
              <>
                <LoaderCircle className="animate-spin" /> Uploading...
              </>
            ) : 'Upload'
          }
        </Button>
      </div>
    </form>
  )
}
