import type { ReactNode } from 'react'
import { Link, useRouterState } from '@tanstack/react-router'
import type { Root, Node } from 'fumadocs-core/page-tree'
import { cn } from '@/lib/cn'
import { ThemeSwitch } from 'fumadocs-ui/layouts/shared/slots/theme-switch'

export type TopTab = {
  label: string
  href: string
  /** route prefixes that should mark this tab active */
  match: string[]
}

/**
 * Derive top-tab list from the docs page tree.
 * Each top-level folder becomes a tab.
 * Components tab is rerouted to the custom /components grid.
 */
export function deriveTabs(tree: Root): TopTab[] {
  const tabs: TopTab[] = []
  for (const node of tree.children) {
    if (node.type !== 'folder') continue
    const folderUrl = node.index?.url ?? `/docs/${slugFromName(node.name)}`
    const isComponents = folderUrl === '/docs/components'
    tabs.push({
      label: typeof node.name === 'string' ? node.name : 'Section',
      href: isComponents ? '/components' : folderUrl,
      match: isComponents ? ['/components'] : [folderUrl],
    })
  }
  return tabs
}

function slugFromName(name: unknown) {
  return typeof name === 'string' ? name.toLowerCase().replace(/\s+/g, '-') : ''
}


export function SiteShell({
  tabs,
  showTabs = true,
  children,
}: {
  tabs: TopTab[]
  showTabs?: boolean
  children: ReactNode
}) {
  const pathname = useRouterState({ select: (s) => s.location.pathname })

  return (
    <div className="flex min-h-screen flex-col">
      <header className="sticky top-0 z-40 border-b bg-fd-background/95 backdrop-blur supports-[backdrop-filter]:bg-fd-background/75">
        <div className="mx-auto flex max-w-5xl items-center justify-between px-6 py-4">
          <Link to="/" className="flex items-center gap-2 font-semibold tracking-tight">
            <img src="/favicon.svg" className="inline-block h-8 w-8 rounded-md" />
            UI
          </Link>
          <nav className="flex items-center gap-4 text-sm text-fd-muted-foreground">
            <ThemeSwitch />
            <a
              href="https://github.com/mxvsh/mxvsh-ui"
              className="hover:text-fd-foreground"
              rel="noreferrer"
            >
              GitHub
            </a>
          </nav>
        </div>

        {showTabs && (
        <div className="border-t">
          <div className="mx-auto flex max-w-5xl items-center gap-8 px-6">
            {tabs.map((tab) => {
              const active = tab.match.some(
                (m) => pathname === m || pathname.startsWith(`${m}/`),
              )
              return (
                <Link
                  key={tab.href}
                  to={tab.href}
                  className={cn(
                    'relative py-3 text-sm transition-colors',
                    active
                      ? 'font-medium text-fd-foreground'
                      : 'text-fd-muted-foreground hover:text-fd-foreground',
                  )}
                >
                  {tab.label}
                  {active && (
                    <span className="absolute inset-x-0 -bottom-px h-0.5 bg-fd-primary" />
                  )}
                </Link>
              )
            })}
          </div>
        </div>
        )}
      </header>

      <main className="flex-1">{children}</main>
    </div>
  )
}
