'use client'
import { useState, useCallback } from 'react'

type DropzoneChildrenArgs = {
  isDragging: boolean
  getRootProps: () => {
    onDragOver: (e: React.DragEvent) => void
    onDragLeave: (e: React.DragEvent) => void
    onDrop: (e: React.DragEvent) => void
  }
}

type DropzoneProps = {
  onDrop: (acceptedFile: File | null) => void
  accept?: string[]
  children: ({ isDragging, getRootProps }: DropzoneChildrenArgs) => React.ReactNode
}

export default function Dropzone({ onDrop, accept, children }: DropzoneProps) {
  
  const [isDragging, setIsDragging] = useState(false)
  
  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault()
    e.stopPropagation()
    
    const item = e.dataTransfer.items?.[0]
    
    if (accept?.length && item?.type && !accept.includes(item?.type)) {
      e.dataTransfer.effectAllowed = 'none'
      setIsDragging(false)
      return
    }
    
    setIsDragging(true)
  }, [accept])
  
  const handleDragLeave = useCallback((e: React.DragEvent) => {
    e.preventDefault()
    e.stopPropagation()
    setIsDragging(false)
  }, [])
  
  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault()
    e.stopPropagation()
    setIsDragging(false)
    
    const file = e.dataTransfer?.files[0] || null
    
    if (file && accept?.length) {
      if (accept.includes(file.type)) return
    }
    
    onDrop(file)
  }, [onDrop, accept])
  
  const getRootProps = useCallback(() => ({
    onDragOver: handleDragOver,
    onDragLeave: handleDragLeave,
    onDrop: handleDrop
  }), [handleDragOver, handleDragLeave, handleDrop])
  
  return children({ isDragging, getRootProps })
}
