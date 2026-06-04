import { cva, type VariantProps } from "class-variance-authority";
import type * as React from "react";
import { cn } from "@/lib/cn";

export const badgeVariants = cva(
  "inline-flex items-center justify-center gap-1 font-medium whitespace-nowrap",
  {
    variants: {
      variant: {
        default: "bg-primary text-primary-foreground",
        secondary: "bg-muted text-muted-foreground",
        outline: "border border-border text-foreground",
        destructive: "bg-destructive text-destructive-foreground",
      },
      size: {
        sm: "h-5 px-2 text-xs rounded-full",
        md: "h-6 px-2.5 text-xs rounded-full",
        // Compact count chip used inside buttons (e.g. Like · 2)
        count: "min-w-5 h-5 px-1.5 text-xs rounded-full",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "md",
    },
  },
);

export interface BadgeProps
  extends React.HTMLAttributes<HTMLSpanElement>,
    VariantProps<typeof badgeVariants> {}

export function Badge({ className, variant, size, ...props }: BadgeProps) {
  return <span className={cn(badgeVariants({ variant, size }), className)} {...props} />;
}
