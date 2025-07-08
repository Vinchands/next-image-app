import SearchBar from './SearchBar'
import bg from '@/public/city.png'

export default function Hero() {
  return (
    <section
      style={{
        backgroundImage: `linear-gradient(rgba(0, 0, 0, 0), rgba(0, 0, 0, .75)), url(${bg.src})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundAttachment: 'fixed',
      }}
      className="h-[75vh] p-5"
    >
      <div className="h-full flex flex-col items-center justify-center gap-y-3 md:gap-y-5 mx-auto text-center text-white">
        <h1 className="text-3xl md:text-4xl font-bold">Free and open source images for everyone</h1>
        <p className="">No attribution required, no subscription, just images.</p>
        <SearchBar
          basePath="/"
          className="w-full max-w-2xl"
          placeholder="What are you looking for?"
        />
      </div>
    </section>
  )
}
