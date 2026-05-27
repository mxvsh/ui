import { forwardRef, type HTMLAttributes } from "react"
import { cn } from "../../lib/cn"

export type CardTone = "default" | "subtle" | "outline" | "elevated" | "accent"

export interface CardProps extends HTMLAttributes<HTMLDivElement> {
  tone?: CardTone
}

const toneStyles: Record<CardTone, string> = {
  default: "border-[var(--border)] bg-[var(--popover)] text-[var(--fg)]",
  subtle: "border-[var(--border)] bg-[var(--bg-subtle)] text-[var(--fg)]",
  outline: "border-[var(--border-strong)] bg-transparent text-[var(--fg)]",
  elevated: "border-transparent bg-[var(--popover)] text-[var(--fg)] shadow-elevation-lg",
  accent: "border-[var(--accent)] bg-[var(--accent-soft)] text-[var(--accent-soft-fg)]",
}

export const Card = forwardRef<HTMLDivElement, CardProps>(function Card(
  { tone = "default", className, ...props },
  ref
) {
  return (
    <div
      ref={ref}
      data-tone={tone}
      className={cn(
        "overflow-hidden rounded-[var(--radius-lg)] border",
        toneStyles[tone],
        className
      )}
      {...props}
    />
  )
})

export function CardHeader({ className, ...props }: HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn(
        "flex items-start justify-between gap-4 px-5 pt-5 pb-4",
        className
      )}
      {...props}
    />
  )
}

export function CardTitle({ className, ...props }: HTMLAttributes<HTMLHeadingElement>) {
  return (
    <h3
      className={cn("text-base font-semibold leading-none text-inherit", className)}
      {...props}
    />
  )
}

export function CardDescription({ className, ...props }: HTMLAttributes<HTMLParagraphElement>) {
  return (
    <p
      className={cn("mt-1.5 text-sm text-[var(--fg-muted)]", className)}
      {...props}
    />
  )
}

export function CardAction({ className, ...props }: HTMLAttributes<HTMLDivElement>) {
  return <div className={cn("flex shrink-0 items-center gap-2", className)} {...props} />
}

export function CardContent({ className, ...props }: HTMLAttributes<HTMLDivElement>) {
  return <div className={cn("px-5 py-4", className)} {...props} />
}

export function CardFooter({ className, ...props }: HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn(
        "flex items-center justify-end gap-2 border-t border-[var(--border)] bg-[oklch(0_0_0/0.03)] px-5 py-4 dark:bg-[oklch(1_0_0/0.03)]",
        className
      )}
      {...props}
    />
  )
}
