'use client'
import { Download } from 'lucide-react'
import { cn } from '@/lib/utils'

export default function DownloadButton({ className, onDownload }: { className?: string, onDownload: () => void }) {
  return (
    <button
      className={cn('p-1 hover:bg-primary rounded-full', className)}
      title="Download"
      onClick={onDownload}
    >
      <Download className="stroke-white" />
    </button>
  )
}
