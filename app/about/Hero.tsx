import bg from '@/public/village.png'

export default function Hero() {
  return (
    <section
      style={{
        backgroundImage: `linear-gradient(rgba(0, 0, 0, 0), rgba(0, 0, 0, .75)), url(${bg.src})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundAttachment: 'fixed',
      }}
      className="h-[60vh] max-h-[640px] p-5"
    >
      <div className="max-w-2xl h-full flex flex-col items-center justify-center gap-y-3 md:gap-y-5 mx-auto text-center text-white">
        <h1 className="text-3xl md:text-4xl font-bold">In all things of nature there is something of the marvelous.</h1>
        <p className="">Aristotle</p>
      </div>
    </section>
  )
}
