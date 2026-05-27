import { createFileRoute, Link } from '@tanstack/react-router'
import { createServerFn } from '@tanstack/react-start'
import { source } from '@/lib/source'
import { SiteShell, deriveTabs } from '@/components/site-shell'
import {
  NPM_PACKAGE,
  OG_IMAGE,
  SITE_DESCRIPTION,
  SITE_NAME,
  SITE_REPO,
  SITE_TITLE,
  SITE_URL,
} from '@/lib/site'

const softwareJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'SoftwareApplication',
  name: SITE_NAME,
  description: SITE_DESCRIPTION,
  applicationCategory: 'DeveloperApplication',
  operatingSystem: 'Any',
  url: SITE_URL,
  downloadUrl: `https://www.npmjs.com/package/${NPM_PACKAGE}`,
  codeRepository: SITE_REPO,
  programmingLanguage: 'TypeScript',
  offers: { '@type': 'Offer', price: '0', priceCurrency: 'USD' },
}

export const Route = createFileRoute('/')({
  component: Home,
  loader: () => loader(),
  head: () => ({
    meta: [
      { title: SITE_TITLE },
      { name: 'description', content: SITE_DESCRIPTION },
      { property: 'og:title', content: SITE_TITLE },
      { property: 'og:description', content: SITE_DESCRIPTION },
      { property: 'og:url', content: SITE_URL },
      { property: 'og:image', content: OG_IMAGE },
      { name: 'twitter:title', content: SITE_TITLE },
      { name: 'twitter:description', content: SITE_DESCRIPTION },
      { name: 'twitter:image', content: OG_IMAGE },
    ],
    links: [{ rel: 'canonical', href: SITE_URL }],
    scripts: [
      {
        type: 'application/ld+json',
        children: JSON.stringify(softwareJsonLd),
      },
    ],
  }),
})

const loader = createServerFn({ method: 'GET' }).handler(async () => ({
  tabs: deriveTabs(source.getPageTree()),
}))

function Home() {
  const { tabs } = Route.useLoaderData()
  return (
    <SiteShell tabs={tabs} showTabs={false}>
      <section className="mx-auto flex max-w-3xl flex-col items-center px-6 py-24 text-center">
        <p className="mb-4 text-xs uppercase tracking-[0.18em] text-fd-muted-foreground">
          React · Tailwind v4 · radix-ui
        </p>
        <h1 className="mb-5 text-4xl font-semibold tracking-tight sm:text-5xl">
          A small, opinionated UI library.
        </h1>
        <p className="mb-10 max-w-xl text-balance text-fd-muted-foreground sm:text-lg">
          Drop-in React components built on Tailwind v4 and radix-ui. One npm install,
          oklch tokens, no CLI, no registry, no boilerplate.
        </p>

        <div className="mb-10 flex w-full max-w-md items-center justify-center gap-3 rounded-lg border bg-fd-card px-4 py-3 font-mono text-sm">
          <span className="text-fd-muted-foreground">$</span>
          <code>bun add @mxv/ui</code>
        </div>

        <div className="flex flex-wrap items-center justify-center gap-3">
          <Link
            to="/docs/$"
            params={{ _splat: 'get-started' }}
            className="rounded-lg bg-fd-primary px-4 py-2 text-sm font-medium text-fd-primary-foreground"
          >
            Read the docs
          </Link>
          <Link
            to="/components"
            className="rounded-lg border px-4 py-2 text-sm font-medium hover:bg-fd-accent"
          >
            Browse components
          </Link>
        </div>
      </section>

      <section className="mx-auto grid w-full max-w-5xl grid-cols-1 gap-6 px-6 pb-24 sm:grid-cols-3">
        <Feature
          title="Single package"
          body="bun add @mxv/ui and import. No CLI, no per-component packages, no source-copy registry."
        />
        <Feature
          title="Tailwind v4 native"
          body="oklch CSS variables, @theme tokens. Override --accent, the whole library follows."
        />
        <Feature
          title="radix-ui under the hood"
          body="Accessibility, focus management, keyboard behavior inherited from radix primitives."
        />
      </section>
    </SiteShell>
  )
}

function Feature({ title, body }: { title: string; body: string }) {
  return (
    <div className="rounded-lg border bg-fd-card p-5">
      <h3 className="mb-1.5 font-medium">{title}</h3>
      <p className="text-sm text-fd-muted-foreground">{body}</p>
    </div>
  )
}
