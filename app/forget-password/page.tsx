import ResetPasswordForm from './ResetPasswordForm'
import bg from '@/public/river.jpg'

export default function ForgetPassword() {
  return (
    <div
      className="absolute min-h-screen flex items-center justify-center inset-0 mt-14"
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
