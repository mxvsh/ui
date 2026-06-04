import * as mxv from "@mxv/ui";
import type { MDXComponents } from "mdx/types";
import type * as React from "react";
import { cn } from "@/lib/cn";
import { ComponentPreview } from "./component-preview";

type ElProps<T extends keyof React.JSX.IntrinsicElements> = React.JSX.IntrinsicElements[T];

const typography = {
  h1: (props: ElProps<"h1">) => (
    <h1 className="mt-10 scroll-m-20 text-2xl font-semibold tracking-tight" {...props} />
  ),
  h2: (props: ElProps<"h2">) => (
    <h2
      className="mt-12 scroll-m-20 border-b border-border pb-2 text-xl font-semibold tracking-tight first:mt-0"
      {...props}
    />
  ),
  h3: (props: ElProps<"h3">) => (
    <h3 className="mt-8 scroll-m-20 text-lg font-semibold tracking-tight" {...props} />
  ),
  p: (props: ElProps<"p">) => <p className="leading-7" {...props} />,
  a: (props: ElProps<"a">) => (
    <a className="font-medium text-primary underline underline-offset-4" {...props} />
  ),
  ul: (props: ElProps<"ul">) => <ul className="my-2 ml-6 list-disc space-y-2" {...props} />,
  ol: (props: ElProps<"ol">) => <ol className="my-2 ml-6 list-decimal space-y-2" {...props} />,
  code: (props: ElProps<"code">) => (
    <code
      className="rounded-md border border-border bg-muted px-1.5 py-0.5 font-mono text-[0.85em]"
      {...props}
    />
  ),
  pre: ({ className, ...props }: ElProps<"pre">) => (
    <pre
      className={cn(
        "not-prose my-6 overflow-x-auto rounded-xl border border-border bg-card p-4 text-sm shadow-soft [&_code]:border-0 [&_code]:bg-transparent [&_code]:p-0",
        className,
      )}
      {...props}
    />
  ),
  table: (props: ElProps<"table">) => (
    <div className="my-6 overflow-x-auto rounded-xl border border-border">
      <table className="w-full border-collapse text-sm" {...props} />
    </div>
  ),
  th: (props: ElProps<"th">) => (
    <th className="border-b border-border bg-muted px-4 py-2 text-left font-medium" {...props} />
  ),
  td: (props: ElProps<"td">) => (
    <td className="border-b border-border px-4 py-2 align-top" {...props} />
  ),
  hr: (props: ElProps<"hr">) => <hr className="my-8 border-border" {...props} />,
} satisfies MDXComponents;

export function getMDXComponents(components?: MDXComponents): MDXComponents {
  return {
    ...typography,
    // Live-demo helper + every @mxv/ui component, usable directly in MDX.
    ComponentPreview,
    ...mxv,
    ...components,
  };
}

export const useMDXComponents = getMDXComponents;

declare global {
  type MDXProvidedComponents = ReturnType<typeof getMDXComponents>;
}
