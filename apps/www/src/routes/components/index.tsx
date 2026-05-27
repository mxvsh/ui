import { createFileRoute } from '@tanstack/react-router'
import { createServerFn } from '@tanstack/react-start'
import { source } from '@/lib/source'
import { componentsSection } from '@/lib/tree'
import { deriveTabs } from '@/components/site-shell'
import { CenteredLayout } from '@/components/docs-layout'
import { ComponentsGrid } from '@/components/components-grid'

export const Route = createFileRoute('/components/')({
  component: Page,
  loader: async () => loader(),
})

const loader = createServerFn({ method: 'GET' }).handler(async () => {
  const tree = source.getPageTree()
  return {
    tabs: deriveTabs(tree),
    items: componentsSection(tree),
  }
})

function Page() {
  const { tabs, items } = Route.useLoaderData()
  return (
    <CenteredLayout tabs={tabs}>
      <header className="mb-8">
        <h1 className="mb-1 text-xl font-semibold tracking-tight">Components</h1>
        <p className="text-sm text-fd-muted-foreground">
          Drop-in React components built on Tailwind v4 and radix-ui.
        </p>
      </header>
      <ComponentsGrid items={items} />
    </CenteredLayout>
  )
}
