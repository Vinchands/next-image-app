'use client'
import { Label } from '@/components/ui/label'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Button } from '@/components/ui/button'
import ImageDropzone from './ImageDropzone'
import { useActionState, useEffect, useRef, useState } from 'react'
import { LoaderCircle } from 'lucide-react'
import { uploadImage } from '@/actions/image'
import { toast } from 'sonner'
import { useSession } from '@/hooks/useSession'

export default function UploadForm() {
  
  const { user } = useSession()
  
  const formRef = useRef<HTMLFormElement>(null)
  const [state, action, loading] = useActionState(uploadImage, undefined)
  
  const [file, setFile] = useState<File | null>(null)
  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  
  function handleFileAccepted(acceptedFile: File | null) {
    setFile(acceptedFile)
  }
  
  useEffect(() => {
    if (state?.success?.file) {
      toast.success(state.success.file[0])
      formRef.current?.reset()
      
      setTitle('')
      setDescription('')
      setFile(null)
    }
  }, [state])
  
  return (
    <form ref={formRef} action={action} className="grid grid-cols-1 md:grid-cols-2 items-center gap-3">
      <input type="hidden" name="userId" value={user?.id} />
      <div className={`${file? '' : 'col-span-full'} space-y-2`}>
        <ImageDropzone name="file" onFileAccepted={handleFileAccepted} required />
        {state?.errors?.file && <p className="text-sm text-center text-destructive">{state.errors.file[0]}</p>}
      </div>
      <div className={`${file? 'block' : 'hidden'} space-y-6 p-5 bg-secondary rounded-2xl`}>
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
          {state?.errors?.title && <p className="text-sm text-destructive">{state.errors.title[0]}</p>}
        </div>
        <div className="hidden space-y-2">
          <Label>Description</Label>
          <Textarea
            name="description"
            className="bg-white field-sizing-fixed resize-none"
            rows={3}
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </div>
        <Button type="submit" disabled={loading}>
          {
            loading? (
              <>
                <LoaderCircle className="animate-spin" /> Wait a minute...
              </>
            ) : 'Upload'
          }
        </Button>
      </div>
    </form>
  )
}
