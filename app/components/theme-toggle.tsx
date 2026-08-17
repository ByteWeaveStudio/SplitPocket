import { useEffect, useState } from "react";
import { MoonIcon, SunIcon } from "~/components/feature-icons";

/**
 * Light/dark switch, light by default. The chosen theme lives on <html> as
 * `.theme-dark` (applied pre-paint by the inline script in root.tsx) and
 * persists in localStorage under `theme` — the same key the app uses.
 */
export function ThemeToggle() {
  const [dark, setDark] = useState(false);

  // SSR renders the light state; sync with the class the head script set.
  useEffect(() => {
    setDark(document.documentElement.classList.contains("theme-dark"));
  }, []);

  function toggle() {
    const next = !dark;
    setDark(next);
    document.documentElement.classList.toggle("theme-dark", next);
    document
      .querySelector('meta[name="theme-color"]')
      ?.setAttribute("content", next ? "#04060a" : "#faf9f6");
    try {
      localStorage.setItem("theme", next ? "dark" : "light");
    } catch {
      // Private mode: the toggle still works for this page view.
    }
  }

  return (
    <button
      type="button"
      onClick={toggle}
      aria-label={dark ? "Switch to light theme" : "Switch to dark theme"}
      className="flex size-9 items-center justify-center rounded-lg text-muted-foreground transition-colors hover:bg-secondary hover:text-foreground focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring"
    >
      {dark ? <SunIcon /> : <MoonIcon />}
    </button>
  );
}
