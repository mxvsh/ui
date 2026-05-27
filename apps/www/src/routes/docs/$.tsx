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

export const Route = createFileRoute('/docs/$')({
  component: Page,
  loader: async ({ params }) => {
    const slugs = params._splat?.split('/') ?? [];
    const data = await serverLoader({ data: slugs });
    await clientLoader.preload(data.path);
    return data;
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
