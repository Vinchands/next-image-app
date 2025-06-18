import SignupForm from './SignupForm'
import bg from '@/public/bg.jpg'

export default function Signup() {
  return (
    <div className="min-h-[90vh] grid grid-cols-1 lg:grid-cols-2 justify-center">
      <div className="flex items-center justify-center inset-0">
        <SignupForm />
      </div>
      <div
        style={{
          backgroundImage: `url('${bg.src}')`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundAttachment: 'fixed'
        }}
        className="hidden lg:inline"
      />
    </div>
  )
}
