'use client'
import { H2 } from '@/components/ui/typography'
import {
  Select,
  SelectTrigger,
  SelectContent,
  SelectValue,
  SelectItem,
} from '@/components/ui/select'
import { useRouter, useSearchParams } from 'next/navigation'

export default function ExploreHeader() {
  
  const router = useRouter()
  const searchParams = useSearchParams()
  const sort = searchParams.get('sort') || 'popular'
  
  function handleValueChange(value: string) {
    router.push(`/?sort=${value}`, { scroll: false })
  }
  
  return (
    <section className="flex items-center justify-between gap-x-3 mb-5">
      <H2>Explore</H2>
      <Select onValueChange={handleValueChange} defaultValue={sort}>
        <SelectTrigger>
          <SelectValue placeholder="Select category" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="popular">Popular</SelectItem>
          <SelectItem value="latest">Latest</SelectItem>
        </SelectContent>
      </Select>
    </section>
  )
}
