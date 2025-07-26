import { Metadata } from 'next'
import ResetPasswordForm from './ResetPasswordForm'
import bg from '@/public/river.jpg'

export const metadata: Metadata = {
  title: 'Forgot Password'
}

export default function ForgetPassword() {
  return (
    <div
      className="min-h-screen flex items-center justify-center p-3"
      style={{
        backgroundImage: `url(${bg.src})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundAttachment: 'fixed'
      }}
    >
      <ResetPasswordForm />
    </div>
  )
}
