import SignupForm from './SignupForm'
import bg from '@/public/mountain.jpg'

export default function Signup() {
  return (
    <div className="absolute min-h-screen grid grid-cols-1 lg:grid-cols-2 justify-center inset-0 mt-14">
      <div className="flex items-center justify-center inset-0 p-3 pb-20">
        <SignupForm />
      </div>
      <div
        style={{
          backgroundImage: `url(${bg.src})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundAttachment: 'fixed'
        }}
        className="hidden lg:inline"
      />
    </div>
  )
}
