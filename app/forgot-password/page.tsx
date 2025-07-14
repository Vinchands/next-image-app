import ResetPasswordForm from './ResetPasswordForm'
import bg from '@/public/river.jpg'

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
