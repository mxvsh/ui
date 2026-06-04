"use client";

import * as React from "react";
import { cn } from "@/lib/cn";

export interface ButtonGroupProps extends React.HTMLAttributes<HTMLDivElement> {}

/**
 * Segmented container that joins child buttons into a single pill
 * (e.g. Documents | Export | ⋯). Children should use `rounded="md"` /
 * variant="ghost" or "secondary"; the group applies the outer rounding,
 * shared border, and dividers.
 */
export const ButtonGroup = React.forwardRef<HTMLDivElement, ButtonGroupProps>(
  ({ className, ...props }, ref) => {
    return (
      <div
        ref={ref}
        role="group"
        className={cn(
          "inline-flex items-center rounded-full border border-border bg-background shadow-soft",
          "[&>*]:rounded-none [&>*]:border-0 [&>*]:shadow-none",
          "[&>*:not(:last-child)]:border-r [&>*:not(:last-child)]:border-border",
          "[&>*:first-child]:rounded-l-full [&>*:last-child]:rounded-r-full",
          className,
        )}
        {...props}
      />
    );
  },
);
ButtonGroup.displayName = "ButtonGroup";
