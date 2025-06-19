'use client'
import Link from 'next/link'
import { Label } from '@/components/ui/label'
import { Input } from '@/components/ui/input'
import { PasswordInput } from '@/components/ui/PasswordInput'
import { Button } from '@/components/ui/button'
import { useActionState, useState } from 'react'
import { LoaderCircle } from 'lucide-react'
import { signin } from '@/actions/auth'

export default function SigninForm() {
  
  const [state, action, loading] = useActionState(signin, undefined)
  const [email, setEmail] = useState('')
  
  return (
    <form action={action} className="w-full max-w-lg flex flex-col gap-y-5 p-3 -mt-8">
      <h1 className="font-bold text-center text-2xl">Welcome back!</h1>
      <div className="space-y-2">
        <Label>Email</Label>
        <Input
          type="email"
          name="email"
          placeholder="johndoe@example.com"
          value={email}
          onChange={e => setEmail(e.target.value)}
          required
        />
      </div>
      <div className="space-y-2">
        <Label>Password</Label>
        <PasswordInput name="password" required />
        {state?.errors.password && <p className="text-sm text-center text-destructive">{state.errors.password[0]}</p>}
      </div>
      
      <Button disabled={loading}>
        {
          loading? (
            <>
              <LoaderCircle /> Wait a minute...
            </>
          ) : 'Submit'
        }
      </Button>
      <p className="text-sm text-center text-muted-foreground">
        Have no account?{' '}
        <Button variant="link" type="button" className="p-0" asChild>
          <Link href="/sign-up">Sign up</Link>
        </Button>
      </p>
    </form>
  )
}
