import { useRef, useState } from 'react'

export default function useImageDropzone(onFileAccepted?: (file: File) => void) {
  
  const inputRef = useRef<HTMLInputElement>(null)
  const [isDragging, setIsDragging] = useState(false)
  const [imagePreviewURL, setImagePreviewURL] = useState<string | null>(null)
  
  function acceptFile(file: File) {
    const url = URL.createObjectURL(file)
    setImagePreviewURL(url)
    
    onFileAccepted?.(file)
  }
  
  function handleDragOver(e: React.DragEvent<HTMLDivElement>) {
    e.preventDefault()
    e.stopPropagation()
    
    const item = e.dataTransfer.items[0]
    if (item.kind !== 'file' || !item.type.startsWith('image/')) {
      e.dataTransfer.dropEffect = 'none'
      return
    }
    
    setIsDragging(true)
  }
  
  function handleDragLeave(e: React.DragEvent<HTMLDivElement>) {
    e.preventDefault()
    e.stopPropagation()
    setIsDragging(false)
  }
  
  function handleDrop(e: React.DragEvent<HTMLDivElement>) {
    e.preventDefault()
    e.stopPropagation()
    
    const file = e.dataTransfer.files[0]
    if (!file || file.size === 0 || !file.type.startsWith('image/')) return
    
    setIsDragging(false)
    acceptFile(file)
  }
  
  function handleInputChange(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0]
    if (!file || file.size === 0) return
    acceptFile(file)
  }
  
  return {
    inputRef,
    isDragging,
    imagePreviewURL,
    setImagePreviewURL,
    handleDragOver,
    handleDragLeave,
    handleDrop,
    handleInputChange,
  }
}
