'use client'
import TextLink from '@/components/ui/TextLink'
import { Label } from '@/components/ui/label'
import { Input } from '@/components/ui/input'
import { PasswordInput } from '@/components/shared/PasswordInput'
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
          autoFocus
          required
        />
      </div>
      <div className="space-y-2">
        <Label>Password</Label>
        <PasswordInput name="password" required />
        <TextLink href="/forgot-password">Forgot password?</TextLink>
        {state?.errors.password && <p className="text-sm text-center text-destructive">{state.errors.password}</p>}
      </div>
      <Button type="submit" disabled={loading}>
        {
          loading? (
            <>
              <LoaderCircle /> Wait a minute...
            </>
          ) : 'Submit'
        }
      </Button>
      <p className="text-sm text-center text-muted-foreground">
        Have no account? <TextLink href="/sign-up">Sign up</TextLink>
      </p>
    </form>
  )
}
