'use client'
import { Input } from '@/components/ui/input'
import { useState } from 'react'
import { Eye, EyeClosed } from 'lucide-react'

function PasswordInput({ ...props }: Omit<React.ComponentProps<'input'>, 'type'>) {
  const [showPassword, setShowPassword] = useState(false)

  function handleToggle() {
    setShowPassword(prev => !prev)
  }

  return (
    <div className="relative w-full flex items-center">
      <Input
        type={showPassword? 'text' : 'password'}
        {...props}
        className="pr-10"
      />
      <button
        type="button"
        onClick={handleToggle}
        tabIndex={-1}
        className="absolute right-2 text-gray-500 hover:text-gray-700"
        aria-label={showPassword ? 'Hide password' : 'Show password'}
      >
        {showPassword ? <EyeClosed size={18} /> : <Eye size={18} />}
      </button>
    </div>
  )
}

export { PasswordInput }
