"use client";

import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";
import { Loader2 } from "lucide-react";
import * as React from "react";
import { cn } from "@/lib/cn";

export const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap font-medium transition-colors outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg]:size-4",
  {
    variants: {
      variant: {
        primary: "bg-primary text-primary-foreground shadow-soft hover:bg-primary/90",
        secondary:
          "bg-secondary text-secondary-foreground border border-border shadow-soft hover:bg-muted",
        outline: "border border-border bg-transparent hover:bg-muted text-foreground",
        ghost: "bg-transparent hover:bg-muted text-foreground",
        destructive:
          "bg-destructive text-destructive-foreground shadow-soft hover:bg-destructive/90",
      },
      size: {
        sm: "h-8 px-3 text-sm",
        md: "h-10 px-4 text-sm",
        lg: "h-11 px-6 text-base",
        icon: "size-10",
      },
      rounded: {
        full: "rounded-full",
        lg: "rounded-lg",
        md: "rounded-md",
      },
    },
    defaultVariants: {
      variant: "secondary",
      size: "md",
      rounded: "full",
    },
  },
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
  loading?: boolean;
  leadingIcon?: React.ReactNode;
  trailingIcon?: React.ReactNode;
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      className,
      variant,
      size,
      rounded,
      asChild = false,
      loading = false,
      leadingIcon,
      trailingIcon,
      disabled,
      children,
      ...props
    },
    ref,
  ) => {
    const Comp = asChild ? Slot : "button";
    const content = (
      <>
        {loading ? <Loader2 className="animate-spin" aria-hidden /> : leadingIcon}
        {children}
        {!loading && trailingIcon}
      </>
    );
    return (
      <Comp
        ref={ref}
        className={cn(buttonVariants({ variant, size, rounded }), className)}
        disabled={disabled || loading}
        {...props}
      >
        {asChild ? children : content}
      </Comp>
    );
  },
);
Button.displayName = "Button";
