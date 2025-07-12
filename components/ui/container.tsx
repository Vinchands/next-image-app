import { cva, type VariantProps } from 'class-variance-authority'
import { cn } from '@/lib/utils'

const containerVariants = cva('w-full mx-auto', {
  variants: {
    size: {
      sm: 'max-w-sm px-3',
      md: 'max-w-md px-3',
      lg: 'max-w-4xl px-5',
      xl: 'max-w-7xl px-5',
      full: 'max-w-full px-5',
    },
    centered: {
      true: 'flex items-center justify-center',
      false: '',
    }
  },
  defaultVariants: {
    size: 'xl',
    centered: false,
  }
})

interface ContainerProps extends VariantProps<typeof containerVariants> {
  children: React.ReactNode
  className?: string
}

export default function Container({ children, className, size, centered }:  ContainerProps) {
  return (
    <div className={cn(containerVariants({ size, centered }), className)}>
      {children}
    </div>
  )
}
