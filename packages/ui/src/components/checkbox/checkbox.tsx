import { Check, Minus } from "lucide-react"
import { Checkbox as RadixCheckbox } from "radix-ui"
import type { ComponentPropsWithoutRef } from "react"
import { cn } from "@/lib/cn"

export interface CheckboxProps
  extends ComponentPropsWithoutRef<typeof RadixCheckbox.Root> {
  indeterminate?: boolean
}

export function Checkbox({ className, indeterminate, checked, ...props }: CheckboxProps) {
  const resolvedChecked = indeterminate ? "indeterminate" : checked

  return (
    <RadixCheckbox.Root
      checked={resolvedChecked}
      className={cn(
        "peer size-4 shrink-0 rounded-[var(--radius-sm)] border border-[var(--border)]",
        "bg-[var(--bg-subtle)] transition-[background-color,border-color,box-shadow]",
        "focus-visible:outline-none focus-visible:border-[var(--ring)]",
        "focus-visible:shadow-[0_0_0_3px_oklch(from_var(--ring)_l_c_h_/_0.2)]",
        "data-[state=checked]:bg-[var(--accent)] data-[state=checked]:border-[var(--accent)]",
        "data-[state=indeterminate]:bg-[var(--accent)] data-[state=indeterminate]:border-[var(--accent)]",
        "disabled:pointer-events-none disabled:opacity-50",
        className,
      )}
      {...props}
    >
      <RadixCheckbox.Indicator className="flex items-center justify-center text-[var(--accent-fg)]">
        {resolvedChecked === "indeterminate" ? (
          <Minus size={11} strokeWidth={3} />
        ) : (
          <Check size={11} strokeWidth={3} />
        )}
      </RadixCheckbox.Indicator>
    </RadixCheckbox.Root>
  )
}
