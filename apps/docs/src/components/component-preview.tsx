import type * as React from "react";
import { cn } from "@/lib/cn";

/**
 * Frames a live component demo in a surface that matches the @mxv/ui design
 * language (hairline border, soft shadow, neutral surface). Used inside MDX.
 */
export function ComponentPreview({
  children,
  className,
  center = true,
}: {
  children: React.ReactNode;
  className?: string;
  center?: boolean;
}) {
  return (
    <div className="not-prose my-6 overflow-hidden rounded-xl border border-border bg-card shadow-soft">
      <div
        className={cn(
          "flex min-h-44 flex-wrap gap-3 p-8",
          center && "items-center justify-center",
          className,
        )}
      >
        {children}
      </div>
    </div>
  );
}
