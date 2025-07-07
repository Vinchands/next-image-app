'use client'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Search } from 'lucide-react'
import { useState } from 'react'
import { useRouter } from 'next/navigation'

export default function SearchBar() {
  
  const router = useRouter()
  const [query, setQuery] = useState('')
  const searchURI = `/images?search=${encodeURIComponent(query)}`
  
  function handleSearch(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    router.push(searchURI)
  }
  
  return (
    <form onSubmit={handleSearch} className="w-full max-w-2xl flex items-center text-black">
      <Input
        type="text"
        placeholder="What are you looking for?"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        className={`bg-card rounded-r-none focus-visible:ring-0 focus-visible:border-0`}
      />
      <Button
        variant="secondary"
        type="submit"
        className="rounded-l-none"
        disabled={!query}
      >
        <Search />
      </Button>
    </form>
  )
}
