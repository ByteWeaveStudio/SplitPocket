import { useEffect, useRef } from "react";

/**
 * Applies the app's `rise-in` entrance when the element scrolls into view.
 *
 * Prerendered HTML stays fully visible without JavaScript. On hydration,
 * only elements still BELOW the viewport are hidden and given an entrance —
 * anything the visitor may already have seen is left alone, so visible
 * content never blinks out and re-animates. Reduced motion skips all of it.
 */
export function Reveal({
  children,
  className,
  stagger = 0,
  as: Tag = "div",
}: {
  children: React.ReactNode;
  className?: string;
  stagger?: number;
  as?: "div" | "li" | "span";
}) {
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    if (el.getBoundingClientRect().top <= window.innerHeight) return;

    el.style.opacity = "0";
    const io = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            el.style.opacity = "";
            el.classList.add("rise-in");
            io.disconnect();
          }
        }
      },
      { rootMargin: "0px 0px -8% 0px" },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <Tag
      ref={ref as React.Ref<never>}
      className={className}
      style={{ "--stagger": stagger } as React.CSSProperties}
    >
      {children}
    </Tag>
  );
}
