import SigninForm from './SigninForm'
import bg from '@/public/forest.jpg'

export default function Signup() {
  return (
    <div className="min-h-screen grid grid-cols-1 lg:grid-cols-2 justify-center">
      <div className="flex items-center justify-center inset-0 p-3 pb-20">
        <SigninForm />
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
