import { Button } from "@mxv/ui";
import { Moon, Sun } from "lucide-react";
import * as React from "react";

/**
 * Minimal theme toggle. Our @mxv/ui tokens switch on `[data-theme="dark"]`
 * on <html>; we persist the choice in localStorage. A blocking script in
 * __root applies the stored theme before paint to avoid a flash.
 */
export function ThemeToggle() {
  const [theme, setTheme] = React.useState<"light" | "dark">("light");

  React.useEffect(() => {
    const current = document.documentElement.getAttribute("data-theme");
    setTheme(current === "dark" ? "dark" : "light");
  }, []);

  function toggle() {
    const next = theme === "dark" ? "light" : "dark";
    setTheme(next);
    document.documentElement.setAttribute("data-theme", next);
    try {
      localStorage.setItem("theme", next);
    } catch {}
  }

  return (
    <Button
      variant="ghost"
      size="icon"
      onClick={toggle}
      aria-label="Toggle theme"
      title="Toggle theme"
    >
      {theme === "dark" ? <Moon /> : <Sun />}
    </Button>
  );
}

/** Inline, render-blocking script that applies the saved theme before paint. */
export const themeInitScript = `(function(){try{var t=localStorage.getItem('theme');if(t==='dark'||(!t&&window.matchMedia('(prefers-color-scheme: dark)').matches)){document.documentElement.setAttribute('data-theme','dark');}else{document.documentElement.setAttribute('data-theme','light');}}catch(e){}})();`;
