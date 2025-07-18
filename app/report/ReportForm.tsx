'use client'
import { Label } from '@/components/ui/label'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Button } from '@/components/ui/button'
import { H2 } from '@/components/ui/typography'
import { useSession } from '@/hooks/useSession'
import { useState } from 'react'
import { toast } from 'sonner'

export default function ReportForm() {
  
  const { user } = useSession()
  const [isSubmitted, setIsSumbitted] = useState(false)
  
  function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setTimeout(() => {
      toast.success('Issue reported.')
      setIsSumbitted(true)
    }, 1000)
  }
  
  if (isSubmitted) {
    return (
      <div className="w-full max-w-lg flex flex-col gap-y-6 p-5 bg-card rounded-md shadow-md">
        <H2>✅ Thanks for your report.</H2>
      </div>
    )
  }
  
  return (
    <form onSubmit={handleSubmit} className="w-full max-w-lg flex flex-col gap-y-6 p-5 bg-card rounded-md shadow-md">
      <div className="text-center">
        <H2 className="text-center">Let us help you.</H2>
        <p className="text-muted-foreground">Fulfill the fields below to report your issues.</p>
      </div>
      <div className="space-y-2">
        <Label>Email</Label>
        <Input
          type="email"
          name="email"
          placeholder="johndoe@example.com"
          value={user?.email}
          autoFocus
          required
        />
      </div>
      <div className="space-y-2">
        <Label>Describe your issue</Label>
        <Textarea
          name="description"
          placeholder="I have an issue about..."
          className="field-sizing-fixed resize-none"
          rows={8}
          required
        />
      </div>
      <Button type="submit">Submit</Button>
    </form>
  )
}
