'use client'
import Link from 'next/link'
import { Label } from '@/components/ui/label'
import { Input } from '@/components/ui/input'
import { PasswordInput } from '@/components/ui/PasswordInput'
import { Button } from '@/components/ui/button'
import { useActionState, useState } from 'react'
import { LoaderCircle } from 'lucide-react'
import { signup } from '@/actions/auth'

export default function SignupForm() {
  
  const [state, action, loading] = useActionState(signup, undefined)
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  
  return (
    <form action={action} className="w-full max-w-lg flex flex-col gap-y-5 p-3">
      <h1 className="font-bold text-center text-2xl">Let&apos;s get started!</h1>
      <div className="space-y-2">
        <Label>Name</Label>
        <Input
          type="text"
          name="name"
          placeholder="John Doe"
          value={name}
          onChange={e => setName(e.target.value)}
          autoFocus
          required
        />
        {state?.errors.name && <p className="text-sm text-center text-destructive">{state.errors.name[0]}</p>}
      </div>
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
        {state?.errors.email && <p className="text-sm text-center text-destructive">{state.errors.email[0]}</p>}
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
      <div className="space-y-3 text-center">
        <p className="text-sm text-muted-foreground">
          By creating an account you agree to our{' '}
          <Button variant="link" type="button" className="p-0" asChild>
            <Link href="/tos">Terms of Service</Link>
          </Button>
        </p>
        <p className="text-sm text-muted-foreground">
          Have an account?{' '}
          <Button variant="link" type="button" className="p-0" asChild>
            <Link href="/sign-in">Sign in</Link>
          </Button>
        </p>
      </div>
    </form>
  )
}
