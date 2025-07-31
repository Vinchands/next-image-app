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
    
    if (item?.kind === 'file' && accept?.length) {
      if (!isAcceptedType(item.type, accept)) {
        e.dataTransfer.dropEffect = 'none'
        setIsDragging(false)
        return
      }
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
    
    const file = e.dataTransfer.files?.[0]
    
    if (file && accept?.length) {
      if (!isAcceptedType(file.type, accept)) return
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

function isAcceptedType(type: string, accepted: string[]) {
  return accepted.some((pattern) => {
    if (pattern.endsWith('/*')) {
      const base = pattern.slice(0, pattern.indexOf('/'))
      return type.startsWith(base + '/')
    }
    return pattern === type
  })
}
