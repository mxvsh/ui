import { TooltipProvider } from "@mxv/ui";
import { createRootRoute, HeadContent, Outlet, Scripts } from "@tanstack/react-router";
import { themeInitScript } from "@/components/theme-toggle";
import { appName } from "@/lib/shared";
import appCss from "@/styles/app.css?url";

export const Route = createRootRoute({
  head: () => ({
    meta: [
      { charSet: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { title: `${appName} — opinionated Tailwind + Radix components` },
    ],
    links: [{ rel: "stylesheet", href: appCss }],
  }),
  component: RootComponent,
});

function RootComponent() {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        {/* Apply saved theme before paint to avoid a flash. */}
        {/* biome-ignore lint/security/noDangerouslySetInnerHtml: tiny inline theme bootstrap */}
        <script dangerouslySetInnerHTML={{ __html: themeInitScript }} />
        <HeadContent />
      </head>
      <body className="flex min-h-screen flex-col">
        <TooltipProvider>
          <Outlet />
        </TooltipProvider>
        <Scripts />
      </body>
    </html>
  );
}
