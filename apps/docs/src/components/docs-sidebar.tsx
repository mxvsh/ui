import { Link, useLocation } from "@tanstack/react-router";
import type { Item, Node, Root } from "fumadocs-core/page-tree";
import { cn } from "@/lib/cn";
import { docsRoute } from "@/lib/shared";

function urlToSplat(url: string): string {
  return url.replace(new RegExp(`^${docsRoute}/?`), "");
}

function TreeItem({ item }: { item: Item }) {
  const { pathname } = useLocation();
  const active = pathname === item.url;
  return (
    <Link
      to="/docs/$"
      params={{ _splat: urlToSplat(item.url) }}
      className={cn(
        "flex items-center gap-2 rounded-lg px-3 py-1.5 text-sm transition-colors",
        active
          ? "bg-primary/10 font-medium text-primary"
          : "text-muted-foreground hover:bg-muted hover:text-foreground",
      )}
    >
      {item.icon}
      {item.name}
    </Link>
  );
}

function TreeNodes({ nodes }: { nodes: Node[] }) {
  return (
    <ul className="flex flex-col gap-0.5">
      {nodes.map((node, i) => {
        if (node.type === "separator") {
          return (
            <li
              // biome-ignore lint/suspicious/noArrayIndexKey: separators have no stable id
              key={`sep-${i}`}
              className="px-3 pb-1 pt-4 text-xs font-medium uppercase tracking-wide text-muted-foreground/70"
            >
              {node.name}
            </li>
          );
        }
        if (node.type === "folder") {
          return (
            <li key={node.$id ?? `folder-${i}`} className="mt-2">
              <div className="px-3 pb-1 text-xs font-medium uppercase tracking-wide text-muted-foreground/70">
                {node.name}
              </div>
              <TreeNodes nodes={node.children} />
            </li>
          );
        }
        return (
          <li key={node.url}>
            <TreeItem item={node} />
          </li>
        );
      })}
    </ul>
  );
}

export function DocsSidebar({ tree }: { tree: Root }) {
  return (
    <aside className="sticky top-14 hidden h-[calc(100vh-3.5rem)] w-60 shrink-0 overflow-y-auto border-r border-border py-6 pr-4 lg:block">
      <nav>
        <TreeNodes nodes={tree.children} />
      </nav>
    </aside>
  );
}
