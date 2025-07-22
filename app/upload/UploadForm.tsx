'use client'
import Image from 'next/image'
import { Label } from '@/components/ui/label'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { useSession } from '@/hooks/useSession'
import { useState, useEffect, useActionState } from 'react'
import { uploadImage } from '@/actions/image'
import { LoaderCircle } from 'lucide-react'
import { toast } from 'sonner'
import Dropzone from './Dropzone'

export default function UploadForm() {
  
  // * Get the current user
  const { user } = useSession()
  
  const [state, action, loading] = useActionState(uploadImage, undefined)
  
  // * Local state for form inputs
  const [title, setTitle] = useState('')
  const [file, setFile] = useState<File | null>(null)
  const [previewUrl, setPreviewUrl] = useState<string | null>(null)
  
  function handleFileChange(e: React.ChangeEvent<HTMLInputElement>) {
    const selectedFile = e.target.files?.[0] || null
    setFile(selectedFile)
  }
  
  useEffect(() => {
    if (!file) {
      setPreviewUrl(null)
      return
    }
    const url = URL.createObjectURL(file)
    setPreviewUrl(url)
    return () => URL.revokeObjectURL(url)
  }, [file])
  
  useEffect(() => {
    if (state) {
      if (state?.success?.file) {
        toast.success(state.success.file[0])
        setFile(null)
        setTitle('')
      }
    }
  }, [state])
  
  return (
    <form action={action} className="grid grid-cols-1 items-center gap-5 py-5">
      {/* <input type="hidden" name="userId" value={user?.id} />
      {
        previewUrl? (
          <div className="relative col-span-4 aspect-square bg-secondary border rounded-2xl overflow-hidden">
            <Image src={previewUrl} alt="Preview" fill style={{ objectFit: 'contain' }} />
          </div>
        ) : (
          <div className="w-full flex items-center justify-center col-span-4 mx-auto bg-secondary border rounded-2xl aspect-square">
            No preview
          </div>
        )
      }
      <div className="w-full col-span-8 space-y-6">
        <div className="space-y-2">
          <Label className="text-sm font-medium">File</Label>
          <Input
            type="file"
            name="file"
            accept="image/*"
            onChange={handleFileChange}
            required
          />
          {state?.errors?.file && <p className="text-sm text-destructive">{state.errors.file[0]}</p>}
        </div>
        <div className="space-y-2">
          <Label className="text-sm font-medium">Title</Label>
          <Input
            type="text"
            name="title"
            placeholder="The Beautiful Image"
            value={title}
            onChange={e => setTitle(e.target.value)}
            required
          />
          {state?.errors?.title && <p className="text-sm text-destructive">{state.errors.title[0]}</p>}
        </div>
        <Button type="submit" disabled={loading}>
          {
            loading? (
              <><LoaderCircle className="animate-spin" /> Wait a minute...</>
            ) : 'Upload'
          }
        </Button>
      </div> */}
      <Dropzone required />
    </form>
  )
}
