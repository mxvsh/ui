import type { Root, Node } from 'fumadocs-core/page-tree'

/** Serializable shape passed from server loaders to the client. */
export type PlainNode =
  | { type: 'page'; name: string; url: string; description?: string }
  | { type: 'separator'; name: string }

function plainName(name: unknown): string {
  return typeof name === 'string' ? name : ''
}

function toPlain(nodes: readonly Node[]): PlainNode[] {
  const out: PlainNode[] = []
  for (const node of nodes) {
    if (node.type === 'separator') {
      out.push({ type: 'separator', name: plainName(node.name) })
    } else if (node.type === 'page') {
      out.push({
        type: 'page',
        name: plainName(node.name),
        url: node.url,
        description:
          typeof node.description === 'string' ? node.description : undefined,
      })
    } else if (node.type === 'folder') {
      out.push(...toPlain(node.children))
    }
  }
  return out
}

/**
 * Extract the section slug (the first path segment after /docs) from a docs URL.
 * e.g. "/docs/get-started/installation" → "get-started"
 */
export function sectionSlugFromUrl(url: string): string | null {
  const m = url.match(/^\/docs\/([^/]+)/)
  return m ? m[1]! : null
}

/**
 * Return the scoped sidebar for a section, identified by its slug.
 * Matches the folder whose children share the `/docs/<slug>/` URL prefix.
 */
export function sectionSidebar(tree: Root, sectionSlug: string | null): PlainNode[] {
  if (!sectionSlug) return []
  const prefix = `/docs/${sectionSlug}`
  for (const node of tree.children) {
    if (node.type !== 'folder') continue
    const belongs = node.children.some((c) => {
      if (c.type !== 'page') return false
      return c.url === prefix || c.url.startsWith(`${prefix}/`)
    })
    if (belongs) return toPlain(node.children)
  }
  return []
}

/** Plain serializable list of component pages (with group separators preserved). */
export function componentsSection(tree: Root): PlainNode[] {
  return sectionSidebar(tree, 'components')
}
