import { Button } from "@mxv/ui";
import { Link } from "@tanstack/react-router";
import { appName, gitConfig } from "@/lib/shared";
import { ThemeToggle } from "./theme-toggle";

// lucide v1 dropped brand icons, so inline the GitHub mark.
function GithubIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" role="img" aria-label="GitHub" className="size-4">
      <title>GitHub</title>
      <path d="M12 .5C5.7.5.5 5.7.5 12c0 5.1 3.3 9.4 7.9 10.9.6.1.8-.3.8-.6v-2c-3.2.7-3.9-1.4-3.9-1.4-.5-1.3-1.3-1.7-1.3-1.7-1-.7.1-.7.1-.7 1.2.1 1.8 1.2 1.8 1.2 1 1.8 2.7 1.3 3.4 1 .1-.8.4-1.3.7-1.6-2.6-.3-5.3-1.3-5.3-5.7 0-1.3.5-2.3 1.2-3.1-.1-.3-.5-1.5.1-3.1 0 0 1-.3 3.3 1.2a11.5 11.5 0 0 1 6 0C17.3 4.9 18.3 5.2 18.3 5.2c.6 1.6.2 2.8.1 3.1.8.8 1.2 1.8 1.2 3.1 0 4.4-2.7 5.4-5.3 5.7.4.4.8 1.1.8 2.2v3.3c0 .3.2.7.8.6 4.6-1.5 7.9-5.8 7.9-10.9C23.5 5.7 18.3.5 12 .5Z" />
    </svg>
  );
}

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-40 border-b border-border bg-background/80 backdrop-blur-md">
      <div className="mx-auto flex h-14 max-w-7xl items-center gap-4 px-4 sm:px-6">
        <Link to="/" className="flex items-center gap-2 font-semibold tracking-tight">
          <span className="grid size-6 place-items-center rounded-md bg-primary text-primary-foreground text-xs font-bold">
            m
          </span>
          {appName}
        </Link>

        <nav className="ml-2 hidden items-center gap-1 text-sm sm:flex">
          <Link
            to="/docs/$"
            params={{ _splat: "" }}
            className="rounded-full px-3 py-1.5 text-muted-foreground transition-colors hover:text-foreground"
          >
            Docs
          </Link>
          <Link
            to="/docs/$"
            params={{ _splat: "components/button" }}
            className="rounded-full px-3 py-1.5 text-muted-foreground transition-colors hover:text-foreground"
          >
            Components
          </Link>
        </nav>

        <div className="ml-auto flex items-center gap-1">
          <Button asChild variant="ghost" size="icon" aria-label="GitHub">
            <a
              href={`https://github.com/${gitConfig.user}/${gitConfig.repo}`}
              target="_blank"
              rel="noreferrer"
            >
              <GithubIcon />
            </a>
          </Button>
          <ThemeToggle />
        </div>
      </div>
    </header>
  );
}
