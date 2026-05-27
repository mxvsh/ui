import { createFileRoute, notFound } from '@tanstack/react-router'
import { createServerFn } from '@tanstack/react-start'
import { Suspense } from 'react'
import browserCollections from 'collections/browser'
import { useFumadocsLoader } from 'fumadocs-core/source/client'
import { source } from '@/lib/source'
import { componentsSection } from '@/lib/tree'
import { deriveTabs } from '@/components/site-shell'
import { DocsLayout } from '@/components/docs-layout'
import { useMDXComponents } from '@/components/mdx'

export const Route = createFileRoute('/components/$slug')({
  component: Page,
  loader: async ({ params }) => {
    const data = await serverLoader({ data: params.slug })
    await clientLoader.preload(data.path)
    return data
  },
})

const serverLoader = createServerFn({ method: 'GET' })
  .inputValidator((slug: string) => slug)
  .handler(async ({ data: slug }) => {
    const page = source.getPage(['components', slug])
    if (!page) throw notFound()

    const tree = source.getPageTree()
    return {
      path: page.path,
      tabs: deriveTabs(tree),
      sidebar: componentsSection(tree),
    }
  })

const clientLoader = browserCollections.docs.createClientLoader({
  component({ frontmatter, default: MDX }) {
    return (
      <>
        <h1 className="!mb-2">{frontmatter.title}</h1>
        {frontmatter.description && (
          <p className="!mt-0 text-fd-muted-foreground">{frontmatter.description}</p>
        )}
        <MDX components={useMDXComponents()} />
      </>
    )
  },
})

function remapComponentsUrl(url: string): string {
  return url.replace(/^\/docs\/components\//, '/components/')
}

function Page() {
  const { path, tabs, sidebar } = useFumadocsLoader(Route.useLoaderData())
  return (
    <DocsLayout tabs={tabs} sidebar={sidebar} sidebarUrlMap={remapComponentsUrl}>
      <Suspense>{clientLoader.useContent(path)}</Suspense>
    </DocsLayout>
  )
}
