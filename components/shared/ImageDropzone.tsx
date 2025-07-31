'use client'
import Image from 'next/image'
import Dropzone from '@/components/shared/Dropzone'
import { H4 } from '@/components/ui/typography'
import { Button } from '@/components/ui/button'
import React, { useState, useEffect, useRef, useCallback } from 'react'
import { ArrowBigDown, ImageIcon } from 'lucide-react'

type ImageDropzoneProps = {
  name?: string
  required?: boolean
  onFileAccepted: (file: File | null) => void
}

export default function ImageDropzone({ name, required, onFileAccepted }: ImageDropzoneProps) {
  
  const inputRef = useRef<HTMLInputElement>(null)
  const [file, setFile] = useState<File | null>(null)
  const [imagePreviewUrl, setImagePreviewUrl] = useState<string | null>(null)
  
  const forceChangeInput = useCallback((file: File) => {
    if (inputRef.current) {
      const dataTransfer = new DataTransfer
      dataTransfer.items.add(file)
      inputRef.current.files = dataTransfer.files
    }
  }, [])
  
  function handleDrop(acceptedFile: File | null) {
    if (!acceptedFile) return
    
    setFile(acceptedFile)
    onFileAccepted(acceptedFile)
  }
  
  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    if (file) {
      forceChangeInput(file)
      return
    }
    
    const acceptedFile = e.target.files?.[0]
    if (!acceptedFile) return
    
    handleDrop(acceptedFile)
  }
  
  function handleReset() {
    if (inputRef.current) {
      inputRef.current.files = null
      inputRef.current.value = ''
    }
    setFile(null)
    setImagePreviewUrl(null)
    onFileAccepted(null)
  }
  
  useEffect(() => {
    if (file) forceChangeInput(file)
  }, [file, forceChangeInput])

  useEffect(() => {
    if (!file) return
    const url = URL.createObjectURL(file)
    setImagePreviewUrl(url)
    return () => {
      URL.revokeObjectURL(url)
    }
  }, [file])
  
  return (
    <Dropzone onDrop={handleDrop} accept={['image/*']}>
      {({ isDragging, getRootProps }) => (
        <div
          {...getRootProps()}
          className={`w-full min-h-56 flex flex-col items-center justify-center gap-y-3 p-3 border-4 border-dashed ${isDragging? 'border-primary bg-primary/10' : 'border-primary/25'} rounded-2xl`}
        >
          {imagePreviewUrl? <Image src={imagePreviewUrl} alt="Preview" width={500} height={500} className="w-auto h-auto" /> : (
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
          <input
            ref={inputRef}
            type="file"
            name={name}
            accept="image/*"
            onChange={handleChange}
            required={required}
            style={{ display: 'none' }}
          />
          <div className="inline-flex items-center gap-x-2">
            <Button
              type="button"
              onClick={() => inputRef.current?.click()}
              hidden={isDragging}
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
