'use client'
import Image from 'next/image'
import { H4 } from '@/components/ui/typography'
import { Button } from '@/components/ui/button'
import { ArrowBigDown, ImageIcon } from 'lucide-react'
import useImageDropzone from './useImageDropzone'

type DropzoneProps = Omit<React.InputHTMLAttributes<HTMLInputElement>, 'type' | 'accept' | 'onChange' | 'hidden'> & {
  onFileAccepted: (file: File | null) => void
}

export default function ImageDropzone({ onFileAccepted, ...inputProps }: DropzoneProps) {
  
  const { inputRef, isDragging, imagePreviewURL, handleDragOver, handleDragLeave, handleDrop, handleInputChange, handleReset } = useImageDropzone(onFileAccepted)
  const dropzoneContent = isDragging? (
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
  
  return (
    <div
      className={`w-full flex flex-col items-center gap-y-3 p-3 border-4 border-dashed ${isDragging? 'border-primary bg-primary/10' : 'border-primary/25'} rounded-2xl`}
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
      onDrop={handleDrop}
    >
      <input
        ref={inputRef}
        type="file"
        accept="image/*"
        onChange={handleInputChange}
        // hidden
        {...inputProps}
      />
      {
        imagePreviewURL? (
          <Image src={imagePreviewURL} alt="Preview" width={500} height={500} />
        ) : dropzoneContent
      }
      <div className="inline-flex items-center gap-x-2">
        <Button
          type="button"
          onClick={() => inputRef.current?.click()}
          disabled={isDragging}
        >
          Browse
        </Button>
        {imagePreviewURL && <Button variant="secondary" onClick={handleReset}>Reset</Button>}
      </div>
    </div>
  )
}
