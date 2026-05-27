import { Switch as RadixSwitch } from "radix-ui"
import type { ComponentPropsWithoutRef } from "react"
import { cn } from "@/lib/cn"

export type SwitchProps = ComponentPropsWithoutRef<typeof RadixSwitch.Root>

export function Switch({ className, ...props }: SwitchProps) {
  return (
    <RadixSwitch.Root
      className={cn(
        "peer inline-flex h-5 w-9 shrink-0 cursor-pointer items-center rounded-full",
        "border-2 border-transparent bg-[var(--bg-muted)]",
        "transition-[background-color,box-shadow]",
        "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--ring)]",
        "focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--bg)]",
        "data-[state=checked]:bg-[var(--accent)]",
        "disabled:pointer-events-none disabled:opacity-50",
        className,
      )}
      {...props}
    >
      <RadixSwitch.Thumb
        className={cn(
          "pointer-events-none block size-4 rounded-full bg-white shadow-sm",
          "transition-transform duration-150",
          "data-[state=checked]:translate-x-4 data-[state=unchecked]:translate-x-0",
        )}
      />
    </RadixSwitch.Root>
  )
}
