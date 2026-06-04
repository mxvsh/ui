import { Badge, Button, ButtonGroup } from "@mxv/ui";
import { createFileRoute, Link } from "@tanstack/react-router";
import {
  ArrowUpRight,
  ChevronLeft,
  ChevronRight,
  FolderClosed,
  Heart,
  Link2,
  MoreHorizontal,
  Pencil,
  Upload,
  User,
  UserPlus,
} from "lucide-react";
import { SiteHeader } from "@/components/site-header";

export const Route = createFileRoute("/")({
  component: Home,
});

function Home() {
  return (
    <>
      <SiteHeader />
      <main className="mx-auto flex w-full max-w-5xl flex-1 flex-col items-center px-6 py-24 text-center">
        <Badge variant="secondary" size="md" className="mb-6">
          Tailwind + Radix · React 19
        </Badge>
        <h1 className="max-w-2xl text-balance text-4xl font-semibold tracking-tight sm:text-5xl">
          An opinionated UI library with a pill-shaped soul.
        </h1>
        <p className="mt-5 max-w-xl text-balance text-lg text-muted-foreground">
          Accessible components built on Radix primitives and styled with Tailwind v4 — fully
          tree-shakable, RSC-aware, and yours to theme.
        </p>

        <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
          <Button asChild variant="primary" size="lg" leadingIcon={<UserPlus />}>
            <Link to="/docs/$" params={{ _splat: "" }}>
              Get started
            </Link>
          </Button>
          <Button asChild variant="outline" size="lg" trailingIcon={<ArrowUpRight />}>
            <Link to="/docs/$" params={{ _splat: "components/button" }}>
              Browse components
            </Link>
          </Button>
        </div>

        {/* Showcase mirroring the design language */}
        <div className="mt-20 flex w-full flex-col items-center gap-5">
          <div className="flex flex-wrap items-center justify-center gap-3">
            <Button variant="secondary" leadingIcon={<Link2 />}>
              Copy link
            </Button>
            <Button variant="secondary" leadingIcon={<User />}>
              Login
            </Button>
            <Button variant="primary" leadingIcon={<UserPlus />}>
              Sign Up
            </Button>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-3">
            <ButtonGroup>
              <Button variant="ghost" leadingIcon={<FolderClosed />}>
                Documents
              </Button>
              <Button variant="ghost" leadingIcon={<Upload />}>
                Export
              </Button>
              <Button variant="ghost" size="icon" aria-label="More">
                <MoreHorizontal />
              </Button>
            </ButtonGroup>

            <ButtonGroup>
              <Button variant="ghost" size="icon" aria-label="Previous">
                <ChevronLeft />
              </Button>
              <Button variant="ghost" size="icon" aria-label="Next">
                <ChevronRight />
              </Button>
            </ButtonGroup>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-3">
            <Button variant="secondary">Cancel</Button>
            <Button variant="primary">Done</Button>
            <Button variant="secondary" size="icon" aria-label="Edit">
              <Pencil />
            </Button>
            <Button variant="secondary" leadingIcon={<Heart />}>
              Like
              <Badge variant="secondary" size="count">
                2
              </Badge>
            </Button>
          </div>
        </div>
      </main>
    </>
  );
}
