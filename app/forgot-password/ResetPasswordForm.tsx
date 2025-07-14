'use client'
import Link from 'next/link'
import { Label } from '@/components/ui/label'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { resetPassword } from '@/actions/auth'
import { LoaderCircle } from 'lucide-react'
import { toast } from 'sonner'
import { useActionState, useEffect, useState } from 'react'

export default function ResetPasswordForm() {
  
  const [state, action, loading] = useActionState(resetPassword, undefined)
  const [email, setEmail] = useState('')
  
  useEffect(() => {
    if (state) {
      
      if (state.errors?.email) toast.error(state?.errors?.email?.[0])
      else if (state.success?.email) toast.success(state?.success?.email?.[0])
    }
  }, [state])
  
  return (
    <form action={action} className="max-w-lg w-full flex flex-col gap-y-5 p-5 -mt-20 bg-card rounded-md">
      <div className="text-center">
        <h1 className="font-bold text-2xl">Forgot your password?</h1>
        <p className="text-muted-foreground">Don&apos;t worry, we&apos;ll help you quickly.</p>
      </div>
      <div className="space-y-2">
        <Label>Email</Label>
        <Input
          type="email"
          name="email"
          placeholder="johndoe@example.com"
          value={email}
          onChange={e => setEmail(e.target.value)}
          autoFocus
          required
        />
      </div>
      <Button type="submit" disabled={loading}>
        {
          loading? (
            <>
              <LoaderCircle /> Wait a minute...
            </>
          ) : 'Reset password'
        }
      </Button>
      <Button variant="link" className="p-0 mx-auto" asChild>
        <Link href="/sign-in">Back to sign in page</Link>
      </Button>
    </form>
  )
}
