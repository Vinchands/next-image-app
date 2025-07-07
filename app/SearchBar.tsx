'use client'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Search } from 'lucide-react'
import { useState } from 'react'
import { useRouter } from 'next/navigation'

export default function SearchBar() {
  
  const router = useRouter()
  const [text, setText] = useState('')
  const searchUrl = `/images?search=${encodeURIComponent(text)}`
  
  function handleSearch() {
    router.push(searchUrl)
  }
  
  function handleKeyDown(e: React.KeyboardEvent<HTMLInputElement>) {
    if (e.key === 'Enter' && text) {
      e.preventDefault()
      handleSearch()
    }
  }
  
  return (
    <div className="w-full max-w-2xl flex items-center text-black">
      <Input
        type="text"
        placeholder="What are you looking for?"
        value={text}
        onChange={(e) => setText(e.target.value)}
        onKeyDown={handleKeyDown}
        className={`bg-card rounded-r-none focus-visible:ring-0 focus-visible:border-0`}
      />
      <Button
        variant="secondary"
        className="rounded-l-none"
        onClick={handleSearch}
        disabled={!text}
      >
        <Search />
      </Button>
    </div>
  )
}
