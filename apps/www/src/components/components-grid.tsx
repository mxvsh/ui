import { Link } from '@tanstack/react-router'
import type { PlainNode } from '@/lib/tree'

type Group = {
  label: string | null
  items: Extract<PlainNode, { type: 'page' }>[]
}

function groupByCategory(nodes: PlainNode[]): Group[] {
  const groups: Group[] = [{ label: null, items: [] }]
  for (const node of nodes) {
    if (node.type === 'separator') {
      groups.push({ label: node.name || 'Components', items: [] })
    } else if (node.type === 'page') {
      groups[groups.length - 1]!.items.push(node)
    }
  }
  return groups.filter((g) => g.items.length > 0)
}

function mapToComponentUrl(docsUrl: string): string {
  return docsUrl.replace(/^\/docs\/components\//, '/components/')
}

export function ComponentsGrid({ items }: { items: PlainNode[] }) {
  const groups = groupByCategory(items)

  return (
    <div className="space-y-8">
      {groups.map((group) => (
        <section key={group.label ?? 'default'}>
          {group.label && (
            <h2 className="mb-3 text-sm font-semibold uppercase tracking-wider text-fd-muted-foreground">
              {group.label}
            </h2>
          )}
          <ul className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4">
            {group.items.map((item) => (
              <li key={item.url}>
                <Link
                  to={mapToComponentUrl(item.url)}
                  className="group block overflow-hidden rounded-md border bg-fd-card transition-colors hover:border-fd-foreground/40"
                >
                  <div className="flex aspect-[5/3] items-center justify-center border-b bg-fd-muted/30 text-[10px] uppercase tracking-wider text-fd-muted-foreground">
                    {item.name}
                  </div>
                  <div className="px-3 py-2">
                    <div className="text-sm font-medium">{item.name}</div>
                    {item.description && (
                      <p className="mt-0.5 line-clamp-1 text-xs text-fd-muted-foreground">
                        {item.description}
                      </p>
                    )}
                  </div>
                </Link>
              </li>
            ))}
          </ul>
        </section>
      ))}
    </div>
  )
}
