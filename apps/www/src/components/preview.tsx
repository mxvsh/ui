import type { ReactNode } from 'react'

export function Preview({ children }: { children: ReactNode }) {
  return (
    <div className="mxv-preview not-prose my-6 flex min-h-50 items-center justify-center rounded-lg border p-10">
      {children}
    </div>
  )
}
