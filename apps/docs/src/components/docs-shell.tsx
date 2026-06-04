import type { Root } from "fumadocs-core/page-tree";
import type * as React from "react";
import { DocsSidebar } from "./docs-sidebar";
import { SiteHeader } from "./site-header";

export function DocsShell({ tree, children }: { tree: Root; children: React.ReactNode }) {
  return (
    <div className="flex min-h-screen flex-col">
      <SiteHeader />
      <div className="mx-auto flex w-full max-w-7xl flex-1 gap-8 px-4 sm:px-6">
        <DocsSidebar tree={tree} />
        <main className="flex min-w-0 flex-1">{children}</main>
      </div>
    </div>
  );
}
