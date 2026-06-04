import { Button } from "@mxv/ui";
import { Link } from "@tanstack/react-router";
import { SiteHeader } from "./site-header";

export function NotFound() {
  return (
    <>
      <SiteHeader />
      <main className="mx-auto flex w-full max-w-2xl flex-1 flex-col items-center justify-center px-6 py-32 text-center">
        <p className="text-sm font-medium text-primary">404</p>
        <h1 className="mt-2 text-3xl font-semibold tracking-tight">Page not found</h1>
        <p className="mt-3 text-muted-foreground">
          The page you’re looking for doesn’t exist or has moved.
        </p>
        <Button asChild variant="primary" className="mt-8">
          <Link to="/">Back home</Link>
        </Button>
      </main>
    </>
  );
}
