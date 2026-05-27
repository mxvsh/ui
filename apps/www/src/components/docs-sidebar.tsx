import { Link, useRouterState } from '@tanstack/react-router'
import type { PlainNode } from '@/lib/tree'
import { cn } from '@/lib/cn'

type Props = {
  items: PlainNode[]
  /** Optional URL rewriter (used to remap /docs/components/* → /components/*). */
  mapUrl?: (url: string) => string
}

export function DocsSidebar({ items, mapUrl }: Props) {
  const pathname = useRouterState({ select: (s) => s.location.pathname })

  return (
    <nav className="hidden w-48 shrink-0 border-r md:block">
      <div className="sticky top-[105px] max-h-[calc(100vh-105px)] overflow-y-auto py-6 pr-4">
        <ul className="space-y-0.5">
          {items.map((node, i) => {
            if (node.type === 'separator') {
              return (
                <li
                  key={`sep-${i}`}
                  className="px-2 pt-5 pb-1 text-xs font-semibold uppercase tracking-wider text-fd-muted-foreground"
                >
                  {node.name}
                </li>
              )
            }
            const url = mapUrl ? mapUrl(node.url) : node.url
            const active = pathname === url
            return (
              <li key={node.url}>
                <Link
                  to={url}
                  className={cn(
                    'block rounded-md px-2 py-1.5 text-sm transition-colors',
                    active
                      ? 'bg-fd-accent font-medium text-fd-accent-foreground'
                      : 'text-fd-muted-foreground hover:bg-fd-accent/50 hover:text-fd-foreground',
                  )}
                >
                  {node.name}
                </Link>
              </li>
            )
          })}
        </ul>
      </div>
    </nav>
  )
}
