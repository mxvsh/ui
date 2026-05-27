import { createFileRoute, notFound } from '@tanstack/react-router';
import { createServerFn } from '@tanstack/react-start';
import { Suspense } from 'react';
import browserCollections from 'collections/browser';
import { useFumadocsLoader } from 'fumadocs-core/source/client';
import { source } from '@/lib/source';
import { sectionSidebar, sectionSlugFromUrl } from '@/lib/tree';
import { DocsLayout } from '@/components/docs-layout';
import { deriveTabs } from '@/components/site-shell';
import { useMDXComponents } from '@/components/mdx';
import { OG_IMAGE, SITE_DESCRIPTION, SITE_NAME, absoluteUrl } from '@/lib/site';

export const Route = createFileRoute('/docs/$')({
  component: Page,
  loader: async ({ params }) => {
    const slugs = params._splat?.split('/') ?? [];
    const data = await serverLoader({ data: slugs });
    await clientLoader.preload(data.path);
    return data;
  },
  head: ({ loaderData }) => {
    const title = loaderData?.title
      ? `${loaderData.title} — ${SITE_NAME}`
      : `Docs — ${SITE_NAME}`;
    const description = loaderData?.description ?? SITE_DESCRIPTION;
    const canonical = loaderData?.url ? absoluteUrl(loaderData.url) : undefined;
    return {
      meta: [
        { title },
        { name: 'description', content: description },
        { property: 'og:type', content: 'article' },
        { property: 'og:title', content: title },
        { property: 'og:description', content: description },
        ...(canonical ? [{ property: 'og:url', content: canonical }] : []),
        { property: 'og:image', content: OG_IMAGE },
        { name: 'twitter:title', content: title },
        { name: 'twitter:description', content: description },
        { name: 'twitter:image', content: OG_IMAGE },
      ],
      links: canonical ? [{ rel: 'canonical', href: canonical }] : [],
    };
  },
});

const serverLoader = createServerFn({ method: 'GET' })
  .inputValidator((slugs: string[]) => slugs)
  .handler(async ({ data: slugs }) => {
    const page = source.getPage(slugs);
    if (!page) throw notFound();

    const tree = source.getPageTree();
    return {
      path: page.path,
      url: page.url,
      title: page.data.title as string | undefined,
      description: page.data.description as string | undefined,
      tabs: deriveTabs(tree),
      sidebar: sectionSidebar(tree, sectionSlugFromUrl(page.url)),
      pageTree: await source.serializePageTree(tree),
    };
  });

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
    );
  },
});

function Page() {
  const { path, tabs, sidebar } = useFumadocsLoader(Route.useLoaderData());
  return (
    <DocsLayout tabs={tabs} sidebar={sidebar}>
      <Suspense>{clientLoader.useContent(path)}</Suspense>
    </DocsLayout>
  );
}
