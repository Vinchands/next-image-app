'use client'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { useEffect, useState } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import { Search } from 'lucide-react'
import { cn } from '@/lib/utils'

type SearchBarProps = {
  basePath?: string
  className?: string
  placeholder?: string
}

export default function SearchBar({ basePath = '/', className, placeholder }: SearchBarProps) {
  
  const router = useRouter()
  const searchParams = useSearchParams()
  
  const [query, setQuery] = useState('')
  const searchURI = `${basePath}?q=${encodeURIComponent(query)}`
  
  function handleSearch(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    router.push(searchURI)
  }
  
  // * Initialize query from search params on component mount
  useEffect(() => {
    const initialQuery = searchParams.get('q') || ''
    setQuery(initialQuery)
  }, [searchParams])
  
  return (
    <form onSubmit={handleSearch} className={cn('flex items-center text-black', className)}>
      <Input
        type="text"
        placeholder={placeholder || 'Search...'}
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        className={`bg-card rounded-r-none focus-visible:ring-0 focus-visible:border-0`}
        required
      />
      <Button
        type="submit"
        className="rounded-l-none"
        disabled={!query}
      >
        <Search />
      </Button>
    </form>
  )
}
