import type { ReactNode } from 'react'
import { SiteShell, type TopTab } from './site-shell'
import { DocsSidebar } from './docs-sidebar'
import type { PlainNode } from '@/lib/tree'

export function DocsLayout({
  tabs,
  sidebar,
  sidebarUrlMap,
  children,
}: {
  tabs: TopTab[]
  sidebar: PlainNode[]
  sidebarUrlMap?: (url: string) => string
  children: ReactNode
}) {
  return (
    <SiteShell tabs={tabs}>
      <div className="mx-auto flex max-w-5xl gap-8 px-6 py-8">
        <DocsSidebar items={sidebar} mapUrl={sidebarUrlMap} />
        <article className="prose prose-sm prose-neutral min-w-0 flex-1 dark:prose-invert">
          {children}
        </article>
      </div>
    </SiteShell>
  )
}

export function CenteredLayout({
  tabs,
  children,
}: {
  tabs: TopTab[]
  children: ReactNode
}) {
  return (
    <SiteShell tabs={tabs}>
      <div className="mx-auto max-w-5xl px-6 py-12">{children}</div>
    </SiteShell>
  )
}
