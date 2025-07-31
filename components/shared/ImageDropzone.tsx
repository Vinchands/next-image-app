'use client'
import Image from 'next/image'
import Dropzone from '@/components/shared/Dropzone'
import { H4 } from '@/components/ui/typography'
import { Button } from '@/components/ui/button'
import { useRef, useState } from 'react'
import { ArrowBigDown, ImageIcon } from 'lucide-react'

export default function ImageDropzone() {
  
  const inputRef = useRef<HTMLInputElement>(null)
  const [imagePreviewUrl, setImagePreviewUrl] = useState('')
  
  function handleDrop(file: File | null) {
    if (!file) {
      setImagePreviewUrl('')
      return
    }
    
    const url = URL.createObjectURL(file)
    setImagePreviewUrl(url)
  }
  
  function handleReset() {
    if (inputRef.current) inputRef.current.files = null
    setImagePreviewUrl('')
    handleDrop(null)
  }
  
  return (
    <Dropzone onDrop={handleDrop} accept={['image/*']}>
      {({ isDragging, getRootProps }) => (
        <div
          {...getRootProps()}
          className={`w-full flex flex-col items-center gap-y-3 p-3 border-4 border-dashed ${isDragging? 'border-primary bg-primary/10' : 'border-primary/25'} rounded-2xl`}
        >
          {imagePreviewUrl? <Image src={imagePreviewUrl} alt="Preview" width={500} height={500} /> : (
            isDragging? (
              <>
                <ArrowBigDown size={64} className="stroke-1 stroke-primary animate-bounce" />
                <H4 className="text-primary">Drop it here!</H4>
              </>
            ) : (
              <>
                <ImageIcon size={64} className="stroke-1 stroke-primary" />
                <H4 className="md:hidden">Share your image</H4>
                <H4 className="max-md:hidden">Drop your image here, or</H4>
              </>
            )
          )}
          <input ref={inputRef} type="file" name="file" />
          <div className="inline-flex items-center gap-x-2">
            <Button
              type="button"
              onClick={() => inputRef.current?.click()}
              disabled={isDragging}
            >
              Browse
            </Button>
            {imagePreviewUrl && <Button variant="secondary" onClick={handleReset}>Reset</Button>}
          </div>
        </div>
      )}
    </Dropzone>
  )
}
