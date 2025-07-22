'use client'
import { H4 } from '@/components/ui/typography'
import { Button } from '@/components/ui/button'
import { useRef, useState } from 'react'
import { ArrowBigDown, ImageIcon } from 'lucide-react'

type DropzoneProps = Omit<React.InputHTMLAttributes<HTMLInputElement>, 'type' | 'className' | 'onChange'> & {
  onDrop: (e: React.DragEvent<HTMLDivElement>) => void
}

export default function Dropzone({ onDrop, ...inputProps }: DropzoneProps) {
  
  const inputRef = useRef<HTMLInputElement>(null)
  const [isDragging, setIsDragging] = useState(false)
  
  function handleDragOver(e: React.DragEvent<HTMLDivElement>) {
    e.preventDefault()
    e.stopPropagation()
    setIsDragging(true)
  }
  
  function handleDragLeave(e: React.DragEvent<HTMLDivElement>) {
    e.preventDefault()
    e.stopPropagation()
    setIsDragging(false)
  }
  
  function handleBrowse() {
    inputRef.current?.click()
  }
  
  return (
    <div
      className={`w-full flex flex-col items-center gap-y-3 px-3 py-12 border-4 border-dashed ${isDragging? 'border-primary bg-primary/10' : 'border-primary/25'} rounded-2xl`}
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
      onDrop={onDrop}
    >
      <input ref={inputRef} type="file" className="hidden" {...inputProps} />
      {
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
      }
      <Button type="button" onClick={handleBrowse} disabled={isDragging}>Browse</Button>
    </div>
  )
}
