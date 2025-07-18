import * as React from "react"
import { cn } from "@/lib/utils"

type TypographyProps = React.HTMLAttributes<HTMLElement>

export function H1({ className, ...props }: TypographyProps) {
  return (
    <h1
      className={cn(
        "scroll-m-20 text-4xl font-bold tracking-tight lg:text-5xl",
        className
      )}
      {...props}
    />
  )
}

export function H2({ className, ...props }: TypographyProps) {
  return (
    <h2
      className={cn(
        "scroll-m-20 pb-2 text-3xl font-bold tracking-tight first:mt-0",
        className
      )}
      {...props}
    />
  )
}

export function H3({ className, ...props }: TypographyProps) {
  return (
    <h3
      className={cn("scroll-m-20 text-2xl font-bold tracking-tight", className)}
      {...props}
    />
  )
}

export function H4({ className, ...props }: TypographyProps) {
  return (
    <h4
      className={cn("scroll-m-20 text-xl font-semibold tracking-tight", className)}
      {...props}
    />
  )
}

export function P({ className, ...props }: TypographyProps) {
  return (
    <p className={cn("leading-7 [&:not(:first-child)]:mt-6", className)} {...props} />
  )
}

export function Blockquote({ className, ...props }: TypographyProps) {
  return (
    <blockquote
      className={cn("mt-6 border-l-2 pl-6 italic text-muted-foreground", className)}
      {...props}
    />
  )
}

export function InlineCode({ className, ...props }: TypographyProps) {
  return (
    <code
      className={cn(
        "relative rounded bg-muted px-[0.3rem] py-[0.2rem] font-mono text-sm font-semibold",
        className
      )}
      {...props}
    />
  )
}

export function Lead({ className, ...props }: TypographyProps) {
  return (
    <p className={cn("text-xl text-muted-foreground", className)} {...props} />
  )
}

export function Large({ className, ...props }: TypographyProps) {
  return (
    <div className={cn("text-lg font-semibold", className)} {...props} />
  )
}

export function Small({ className, ...props }: TypographyProps) {
  return (
    <small
      className={cn("text-sm font-medium leading-none", className)}
      {...props}
    />
  )
}

export function Muted({ className, ...props }: TypographyProps) {
  return (
    <p className={cn("text-sm text-muted-foreground", className)} {...props} />
  )
}
