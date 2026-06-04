import type { TableOfContents } from "fumadocs-core/toc";
import { cn } from "@/lib/cn";

export function DocsToc({ toc }: { toc: TableOfContents }) {
  if (!toc || toc.length === 0) return <div className="hidden w-56 shrink-0 xl:block" />;

  return (
    <aside className="sticky top-14 hidden h-[calc(100vh-3.5rem)] w-56 shrink-0 overflow-y-auto py-8 xl:block">
      <p className="mb-3 text-xs font-medium uppercase tracking-wide text-muted-foreground/70">
        On this page
      </p>
      <ul className="flex flex-col gap-1 text-sm">
        {toc.map((item) => (
          <li key={item.url}>
            <a
              href={item.url}
              className={cn(
                "block text-muted-foreground transition-colors hover:text-foreground",
                item.depth >= 3 && "pl-3",
                item.depth >= 4 && "pl-6",
              )}
            >
              {item.title}
            </a>
          </li>
        ))}
      </ul>
    </aside>
  );
}
