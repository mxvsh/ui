import { Dialog as RadixDialog } from "radix-ui"
import {
  forwardRef,
  type ComponentPropsWithoutRef,
  type ElementRef,
  type HTMLAttributes,
} from "react"
import { cn } from "../../lib/cn"

export const Dialog = RadixDialog.Root
export const DialogTrigger = RadixDialog.Trigger
export const DialogClose = RadixDialog.Close
export const DialogPortal = RadixDialog.Portal

export const DialogOverlay = forwardRef<
  ElementRef<typeof RadixDialog.Overlay>,
  ComponentPropsWithoutRef<typeof RadixDialog.Overlay>
>(function DialogOverlay({ className, ...props }, ref) {
  return (
    <RadixDialog.Overlay
      ref={ref}
      className={cn(
        "fixed inset-0 z-50 bg-[oklch(0_0_0_/_0.45)] backdrop-blur-sm",
        "data-[state=open]:animate-[mxvOverlayIn_180ms_cubic-bezier(0.2,0.7,0.2,1)]",
        "data-[state=closed]:animate-[mxvOverlayOut_140ms_cubic-bezier(0.2,0.7,0.2,1)_forwards]",
        className
      )}
      {...props}
    />
  )
})

export const DialogContent = forwardRef<
  ElementRef<typeof RadixDialog.Content>,
  ComponentPropsWithoutRef<typeof RadixDialog.Content>
>(function DialogContent({ className, children, ...props }, ref) {
  return (
    <DialogPortal>
      <DialogOverlay />
      <RadixDialog.Content
        ref={ref}
        className={cn(
          "fixed left-1/2 top-1/2 z-50 w-[calc(100vw-2rem)] max-w-md -translate-x-1/2 -translate-y-1/2",
          "overflow-hidden rounded-[var(--radius-lg)] border border-[var(--popover-border)]",
          "bg-[var(--popover)] text-[var(--popover-fg)] shadow-elevation-lg",
          "focus:outline-none",
          "data-[state=open]:animate-[mxvDialogIn_220ms_cubic-bezier(0.2,0.7,0.2,1)]",
          "data-[state=closed]:animate-[mxvDialogOut_180ms_cubic-bezier(0.2,0.7,0.2,1)_forwards]",
          className
        )}
        {...props}
      >
        {children}
      </RadixDialog.Content>
    </DialogPortal>
  )
})

export function DialogHeader({ className, ...props }: HTMLAttributes<HTMLDivElement>) {
  return <div className={cn("flex flex-col gap-1.5 px-5 pt-5", className)} {...props} />
}

export function DialogBody({ className, ...props }: HTMLAttributes<HTMLDivElement>) {
  return <div className={cn("px-5 py-4", className)} {...props} />
}

export function DialogFooter({ className, ...props }: HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn(
        "flex flex-row justify-end gap-2 border-t border-[var(--border)] bg-[oklch(0_0_0/0.04)] px-5 py-4 dark:bg-[oklch(1_0_0/0.03)]",
        className,
      )}
      {...props}
    />
  )
}

export const DialogTitle = forwardRef<
  ElementRef<typeof RadixDialog.Title>,
  ComponentPropsWithoutRef<typeof RadixDialog.Title>
>(function DialogTitle({ className, ...props }, ref) {
  return (
    <RadixDialog.Title
      ref={ref}
      className={cn("text-base font-semibold leading-none text-[var(--fg)]", className)}
      {...props}
    />
  )
})

export const DialogDescription = forwardRef<
  ElementRef<typeof RadixDialog.Description>,
  ComponentPropsWithoutRef<typeof RadixDialog.Description>
>(function DialogDescription({ className, ...props }, ref) {
  return (
    <RadixDialog.Description
      ref={ref}
      className={cn("text-sm text-[var(--fg-muted)]", className)}
      {...props}
    />
  )
})
