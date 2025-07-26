import { useCallback, useEffect, useMemo, useRef, useState } from 'react'

export default function useImageDropzone(onFileAccepted: (file: File | null) => void) {
  
  const inputRef = useRef<HTMLInputElement>(null)
  const [isDragging, setIsDragging] = useState(false)
  const [acceptedFile, setAcceptedFile] = useState<File | null>(null)
  const imagePreviewURL = useMemo(() => acceptedFile? URL.createObjectURL(acceptedFile) : null, [acceptedFile])
  
  // ! WARNING: This function is still in controversy
  const forceChangeInput = useCallback((file: File) => {
    if (inputRef.current) {
      const dataTransfer = new DataTransfer
      dataTransfer.items.add(file)
      inputRef.current.files = dataTransfer.files
    }
  }, [])
    
  const acceptFile = useCallback((file: File) => {
    setAcceptedFile(file)
    onFileAccepted(file)
  }, [onFileAccepted])
  
  // Drag and drop handlers
  const handleDragOver = useCallback((e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault()
    e.stopPropagation()
    
    const item = e.dataTransfer.items[0]
    if (item.kind !== 'file' || !item.type.startsWith('image/')) {
      e.dataTransfer.dropEffect = 'none'
      return
    }
    
    setIsDragging(true)
  }, [])
  
  const handleDragLeave = useCallback((e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault()
    e.stopPropagation()
    setIsDragging(false)
  }, [])
  
  const handleDrop = useCallback((e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault()
    e.stopPropagation()
    
    const file = e.dataTransfer.files[0]
    if (!file || file.size === 0 || !file.type.startsWith('image/')) return
    
    setAcceptedFile(file)
    setIsDragging(false)
    acceptFile(file)
  }, [acceptFile])
  
  // Hidden input handlers
  const handleInputChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    
    if (acceptedFile) forceChangeInput(acceptedFile)
    
    const file = e.target.files?.[0]
    if (!file || file.size === 0 || !file.type.startsWith('image/')) return
    acceptFile(file)
  }, [acceptedFile, acceptFile, forceChangeInput])
  
  const handleReset = useCallback(() => {
    if (inputRef.current) {
      inputRef.current.value = ''
      inputRef.current.files = null
    }
    
    setAcceptedFile(null)
    onFileAccepted(null)
  }, [onFileAccepted])
  
  useEffect(() => {
    if (acceptedFile) forceChangeInput(acceptedFile)
  }, [acceptedFile, forceChangeInput])
  
  return {
    inputRef,
    isDragging,
    imagePreviewURL,
    handleDragOver,
    handleDragLeave,
    handleDrop,
    handleInputChange,
    handleReset
  }
}
