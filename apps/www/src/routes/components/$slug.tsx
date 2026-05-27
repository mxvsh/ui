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
import { OG_IMAGE, SITE_DESCRIPTION, SITE_NAME, absoluteUrl } from '@/lib/site'

export const Route = createFileRoute('/components/$slug')({
  component: Page,
  loader: async ({ params }) => {
    const data = await serverLoader({ data: params.slug })
    await clientLoader.preload(data.path)
    return data
  },
  head: ({ loaderData, params }) => {
    const title = loaderData?.title
      ? `${loaderData.title} — ${SITE_NAME}`
      : `${params.slug} — ${SITE_NAME}`
    const description = loaderData?.description ?? SITE_DESCRIPTION
    const canonical = absoluteUrl(`/components/${params.slug}`)
    return {
      meta: [
        { title },
        { name: 'description', content: description },
        { property: 'og:type', content: 'article' },
        { property: 'og:title', content: title },
        { property: 'og:description', content: description },
        { property: 'og:url', content: canonical },
        { property: 'og:image', content: OG_IMAGE },
        { name: 'twitter:title', content: title },
        { name: 'twitter:description', content: description },
        { name: 'twitter:image', content: OG_IMAGE },
      ],
      links: [{ rel: 'canonical', href: canonical }],
    }
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
      title: page.data.title as string | undefined,
      description: page.data.description as string | undefined,
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
