import { createFileRoute, notFound } from "@tanstack/react-router";
import { createServerFn } from "@tanstack/react-start";
import browserCollections from "collections/browser";
import { useFumadocsLoader } from "fumadocs-core/source/client";
import { Suspense } from "react";
import { DocsShell } from "@/components/docs-shell";
import { DocsToc } from "@/components/docs-toc";
import { getMDXComponents } from "@/components/mdx";
import { source } from "@/lib/source";

export const Route = createFileRoute("/docs/$")({
  component: Page,
  loader: async ({ params }) => {
    const slugs = params._splat?.split("/") ?? [];
    const data = await serverLoader({ data: slugs });
    await clientLoader.preload(data.path);
    return data;
  },
});

const serverLoader = createServerFn({ method: "GET" })
  .inputValidator((slugs: string[]) => slugs)
  .handler(async ({ data: slugs }) => {
    const page = source.getPage(slugs);
    if (!page) throw notFound();

    return {
      path: page.path,
      pageTree: await source.serializePageTree(source.getPageTree()),
    };
  });

const clientLoader = browserCollections.docs.createClientLoader({
  component({ toc, frontmatter, default: MDX }) {
    return (
      <>
        <article className="mx-auto w-full min-w-0 max-w-3xl py-10">
          <h1 className="mb-2 text-3xl font-semibold tracking-tight text-foreground">
            {frontmatter.title}
          </h1>
          {frontmatter.description ? (
            <p className="mb-10 text-lg text-muted-foreground">{frontmatter.description}</p>
          ) : null}
          <div className="space-y-5 text-[15px] leading-7">
            <MDX components={getMDXComponents()} />
          </div>
        </article>
        <DocsToc toc={toc} />
      </>
    );
  },
});

function Page() {
  const { path, pageTree } = useFumadocsLoader(Route.useLoaderData());

  return (
    <DocsShell tree={pageTree}>
      <div className="flex w-full gap-8">
        <Suspense>{clientLoader.useContent(path)}</Suspense>
      </div>
    </DocsShell>
  );
}
